const axios = require('axios');
const fs = require('fs/promises');
const url = 'https://www.free-ebooks.net/'

const bookLink = (bookHTML) => {
    var matches;
    var matches2;        
    var re = /<h3 class="tlc"><a href=/g;
    var re2 = /src=/g;
    var pos = new Array();
    var pos2 = new Array();
    var uri = new Array();
    var book = new Array();

    while (matches = re.exec(bookHTML)) {
        if (matches.index === re.lastIndex)
            re.lastIndex++;

        pos.push(re.lastIndex);
    }

    while (matches2 = re2.exec(bookHTML)) {
        if (matches2.index === re2.lastIndex)
            re2.lastIndex++;

        pos2.push(re2.lastIndex);
    }

    pos.forEach((item) => {
        var pos1 = bookHTML.indexOf('"', item)
        var pos2 = bookHTML.indexOf('"', pos1+2)

        uri.push(`${url}${bookHTML.substr(pos1+2, (pos2 - pos1)-2)}`)
    })

    pos2.forEach((item, index) => {
        var pos1 = bookHTML.indexOf('"', item)
        var pos2 = bookHTML.indexOf('"', pos1+2)
        var pos3 = bookHTML.indexOf('alt="', pos2+2)
        var pos4 = bookHTML.indexOf('"', pos3+5)
        book.push({
            bookLink: uri[index],
            imgSrc: `${url}${bookHTML.substr(pos1+2, (pos2 - pos1)-2)}`,
            bookName: `${bookHTML.substr(pos3+5, (pos4 - pos3)-5)}`
        })
    })
    
    return book;
}

const searchBook = async (bookInformation) => {
    try {
        fullUrl = `${url}search/${bookInformation}`;
        const response = await axios.get(fullUrl);

        const lineBegin = response.data.search('<div class="col-sm-4 tac">')
        const lineEnd = response.data.lastIndexOf('3"></div>')
        const newResponse = response.data.substr(lineBegin, (lineEnd - lineBegin) + 9);
    
        const info = bookLink(newResponse)
        
        return {
            status_code: 200,
            data: info,
        };

        //fs.writeFile('newBook.html', newResponse)
    } catch (err) {
        return {
            status_code: 500,
            msg: 'Houve um problema ao processar a sua requisição',
            data: {},
        };
    }
}

module.exports = searchBook
const axios = require('axios');
const fs = require('fs/promises');
const url = 'https://www.free-ebooks.net/'

const bookLink = (bookHTML) => {
    var matches;        
    var re = /<h3 class="tlc"><a href=/g;
    var pos = new Array();
    var uri = new Array();

    while (matches = re.exec(bookHTML)) {
        if (matches.index === re.lastIndex)
            re.lastIndex++;

        pos.push(re.lastIndex);
    }

    pos.forEach((item) => {
        var pos1 = bookHTML.indexOf('"', item)
        var pos2 = bookHTML.indexOf('"', pos1+2)

        uri.push(`${url}${bookHTML.substr(pos1+2, (pos2 - pos1)-2)}`)
    })

    return uri;
}

const searchBook = async (bookInformation) => {
    try {
        fullUrl = `${url}search/${bookInformation}`;
        const response = await axios.get(fullUrl);

        const lineBegin = response.data.search('<h3 class="tlc">')
        const lineEnd = response.data.lastIndexOf('3"></div>')
        const newResponse = response.data.substr(lineBegin, (lineEnd - lineBegin) + 9);
    
        const uri = bookLink(newResponse)
        
        return {
            status_code: 200,
            data: uri,
        };

        // fs.writeFile('newBook.html', newResponse)
    } catch (err) {
        return {
            status_code: 500,
            msg: 'Houve um problema ao processar a sua requisição',
            data: {},
        };
    }
}

module.exports = searchBook
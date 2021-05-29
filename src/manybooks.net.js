const axios = require('axios');
const fs = require('fs/promises');
const url = 'https://manybooks.net/'

const bookLink = (bookHTML) => {
    var matches; 
    var re = /about="/g;
    var pos = new Array();
    var book = new Array();

    while (matches = re.exec(bookHTML)) {
        if (matches.index === re.lastIndex)
            re.lastIndex++;

        pos.push(re.lastIndex);
    }

    pos.forEach((item) => {
        var pos1 = bookHTML.indexOf('"', item-1)
        var pos2 = bookHTML.indexOf('"', pos1+2)
        var pos3 = bookHTML.indexOf('<img src="', pos2+2)
        var pos4 = bookHTML.indexOf('"', pos3+10)
        var pos5 = bookHTML.indexOf('alt="', pos4)
        var pos6 = bookHTML.indexOf('by', pos5+5)
        var pos7 = bookHTML.indexOf(' ', pos6)
        var pos8 = bookHTML.indexOf('"', pos7)
        
        book.push({
            bookLink: `${url}${bookHTML.substr(pos1+2, (pos2 - pos1)-2)}`,
            imgSrc: `${url}${bookHTML.substr(pos3+11, (pos4 - pos3)-11)}`,
            bookName: `${bookHTML.substr(pos5+5, (pos6 - pos5)-5)}`,
            author: `${bookHTML.substr(pos7, (pos8 - pos7))}`
        })
    })
    
    return book;
}

const searchMany = async (bookInformation) => {
    try {
        fullUrl = `${url}search-book?search=${bookInformation}`;
        const response = await axios.get(fullUrl);
        
        const lineBegin = response.data.search('about="')
        const lineEnd = response.data.lastIndexOf('</article>')
        const newResponse = response.data.substr(lineBegin, (lineEnd - lineBegin) + 10);

        if (newResponse == []){
            return {
                status_code: 404,
                data: [],
            };
        } else {
            const info = bookLink(newResponse)

            return {
                status_code: 200,
                data: info,
            };
        }

        //fs.writeFile('newBook1.html', newResponse)
    } catch (err) {
        return {
            status_code: 500,
            msg: 'Houve um problema ao processar a sua requisição',
            data: {},
        };
    }
}

module.exports = searchMany
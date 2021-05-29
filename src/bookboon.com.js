const axios = require('axios');
const fs = require('fs/promises');
const url = 'https://bookboon.com/en/'

const bookLink = (bookHTML) => {
    var matches;
    var matches2;        
    var re = /<a href="/g;
    var pos = new Array();
    var pos2 = new Array();
    var re2 = /data-book-title=/g;
    var books = new Array();
    var finalBooks = new Array();

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
        var pos1 = bookHTML.indexOf('"', item-1);
        var pos2 = bookHTML.indexOf('"', pos1+2);
        var pos3 = bookHTML.indexOf('"', pos2+55);
        var pos4 = bookHTML.indexOf('"', pos3+2);
        var uri = `https://bookboon.com/${bookHTML.substr(pos1+2, (pos2 - pos1)-2)}`;

        if(books.length == 0 || (books[books.length -1].bookLink !== uri)){
            books.push({
                bookLink: uri,
                imgSrc: `${bookHTML.substr(pos3+1, (pos4 - pos3)-1)}`,
            })
        }
    })

    pos2.forEach((item, index) => {
        var pos1 = bookHTML.indexOf('"', item);
        var pos2 = bookHTML.indexOf('"', pos1+2);
        finalBooks.push({
            ...books[index], 
            bookName: `${bookHTML.substr(pos1+1, (pos2 - pos1)-1)}`,
        })
    })
    
    return finalBooks;
}

const searchArchive = async (bookInformation) => {
    try {
        fullUrl = `${url}search?query=${bookInformation}`;
        const response = await axios.get(fullUrl);

        const lineBegin = response.data.search('<div class="search-results__item"');
        const lineEnd = response.data.lastIndexOf('<button');
        const newResponse = response.data.substr(lineBegin, (lineEnd - lineBegin));

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

module.exports = searchArchive
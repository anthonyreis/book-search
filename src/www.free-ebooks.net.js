const axios = require('axios');
const urls = require('../utils/urls');
const fs = require('fs/promises');

const bookLink = (bookHTML) => {
    var matches;        
    var re = /<h3 class="tlc"><a href=/g;
    var pos = new Array();
    var uri = new Array();
    let newHTML = bookHTML;

    while (matches = re.exec(bookHTML)) {
        if (matches.index === re.lastIndex)
            re.lastIndex++;

        pos.push(re.lastIndex);
    }

    /*pos.forEach((item, index) => {
        if (index == 0) {
            var pos1 = bookHTML.indexOf('"', item)
            newHTML = `${newHTML.substr(0, pos1+1)}www.free-ebooks.net${newHTML.substr(pos1+1)}`
        } else {
            var pos1 = newHTML.indexOf('"', item+(index * 19))
            newHTML = `${newHTML.substr(0, pos1+1)}www.free-ebooks.net${newHTML.substr(pos1+1)}`
        }
    })*/

    pos.forEach((item) => {
        var pos1 = bookHTML.indexOf('"', item)
        var pos2 = bookHTML.indexOf('"', pos1+2)

        uri.push(`www.free-ebooks.net${bookHTML.substr(pos1+1, (pos2 - pos1)-1)}`)
    })

    return uri;
}

const searchBook = async (bookInformation) => {
    try {
        url = `${urls[0]}search/${bookInformation}`;
        const response = await axios.get(url);

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
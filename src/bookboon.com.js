const axios = require('axios');
const _ = require('lodash')
const fs = require('fs/promises');
const url = 'https://bookboon.com/en/'

const bookLink = (bookHTML) => {
    var matches;        
    var re = /<a href="/g;
    var pos = new Array();
    var uri = new Array();

    while (matches = re.exec(bookHTML)) {
        if (matches.index === re.lastIndex)
            re.lastIndex++;

        pos.push(re.lastIndex);
    }

    pos.forEach((item) => {
        var pos1 = bookHTML.indexOf('"', item-1)
        var pos2 = bookHTML.indexOf('"', pos1+2)
        uri.push(`https://bookboon.com/${bookHTML.substr(pos1+2, (pos2 - pos1)-1)}`)
    })

    return uri;
}

const searchArchive = async (bookInformation) => {
    try {
        fullUrl = `${url}search?query=${bookInformation}`;
        const response = await axios.get(fullUrl);

        const lineBegin = response.data.search('<div class="search-results__item"')
        const lineEnd = response.data.lastIndexOf('<button')
        const newResponse = response.data.substr(lineBegin, (lineEnd - lineBegin));
    
        const uri = bookLink(newResponse) 
        const unicUri = _.uniq(uri)

        return {
            status_code: 200,
            data: unicUri,
        };

        // fs.writeFile('newBook1.html', newResponse)
    } catch (err) {
        return {
            status_code: 500,
            msg: 'Houve um problema ao processar a sua requisição',
            data: {},
        };
    }
}

module.exports = searchArchive
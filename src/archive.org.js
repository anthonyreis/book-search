const axios = require('axios');
const _ = require('lodash')
const fs = require('fs/promises');
const url = 'https://archive.org/'

const bookLink = (bookHTML) => {
    var matches;        
    var re = /data-id="/g;
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
        uri.push(`${url}details/${bookHTML.substr(pos1+1, (pos2 - pos1)-1)}`)
    })

    return uri;
}

const searchPdf = async (bookInformation) => {
    try {
        fullUrl = `${url}search.php?query=${bookInformation}&and[]=mediatype%3A%22texts%22`;
        const response = await axios.get(fullUrl);
        
        const lineBegin = response.data.search('<div class="item-ia" data-id="')
        const lineEnd = response.data.lastIndexOf('data-mediatype="texts"')
        const newResponse = response.data.substr(lineBegin, (lineEnd - lineBegin));
    
        const uri = bookLink(newResponse)

        return {
            status_code: 200,
            data: uri,
        };

        fs.writeFile('newBook.html', newResponse)
    } catch (err) {
        console.log(err)
        return {
            status_code: 500,
            msg: err || 'Houve um problema ao processar a sua requisição',
            data: {},
        };
    }
}

module.exports = searchPdf
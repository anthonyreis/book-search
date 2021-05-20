const axios = require('axios');
const urls = require('../utils/urls');
const fs = require('fs/promises');

const bookLink = async (bookHTML) => {
    var needle = '|'
    var re = new RegExp(needle,'gi');
    var haystack = bookHTML;

    var pipes = new Array();
    while (re.exec(haystack)){
        pipes.push(re.lastIndex);
    }

    console.log(pipes)
}

const searchBook = async (bookInformation) => {
    urls.forEach(async (url) => {
        try {
            url += `search/${bookInformation}`;
            const response = await axios.get(url);

            const lineBegin = response.data.search('<h3 class="tlc">')
            const lineEnd = response.data.lastIndexOf('3"></div>')
            const newResponse = response.data.substr(lineBegin, (lineEnd - lineBegin) + 9);
        
            bookLink(newResponse);

            // fs.writeFile('newBook.html', newResponse)
        } catch (err) {
            console.log(err)
        }
    })
}

module.exports = searchBook
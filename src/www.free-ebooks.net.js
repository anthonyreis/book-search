const axios = require('axios');
const urls = require('../utils/urls');
const fs = require('fs/promises');

const formatHTML = async () => {

}

const bookLink = async (bookHTML) => {
    var matches;        
    var re = /<h3 class="tlc"><a href=/g;
    var pos = new Array();
    var uri = new Array();
    let newHTML;

    while (matches = re.exec(bookHTML)) {
        if (matches.index === re.lastIndex)
            re.lastIndex++;

        pos.push(re.lastIndex);
    }

    pos.forEach((item, index) => {
        var pos1 = bookHTML.indexOf('"', item)
        newHTML = `${bookHTML.substr(0, pos1+1)}www.free-ebooks.net${bookHTML.substr(pos1)}`
        fs.writeFile(`newHTML${index}.html`, newHTML);
        //var pos2 = bookHTML.indexOf('"', item+2)
        //uri.push(bookHTML.substr(pos1+1, (pos2 - pos1)-1))
    })

    return newHTML;
}

const searchBook = async (bookInformation) => {
    urls.forEach(async (url) => {
        try {
            url += `search/${bookInformation}`;
            const response = await axios.get(url);

            const lineBegin = response.data.search('<h3 class="tlc">')
            const lineEnd = response.data.lastIndexOf('3"></div>')
            const newResponse = response.data.substr(lineBegin, (lineEnd - lineBegin) + 9);
        
            const uri = bookLink(newResponse);
            const html = formatHTML(uri);

            // fs.writeFile('newBook.html', newResponse)
        } catch (err) {
            console.log(err)
        }
    })
}

module.exports = searchBook
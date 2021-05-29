const axios = require('axios');
const fs = require('fs/promises');
const url = 'https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=10&hl=en&gss=.com&cselibv=323d4b81541ddb5b&cx=partner-pub-4693496837293740:6115398918'

const bookLink = (bookHTML) => {
    var books = new Array();
    var newHtml = JSON.parse(bookHTML);

    newHtml.results.map((item) => {
        books.push({
            bookLink: item.unescapedUrl,
            imgSrc: item.richSnippet.cseThumbnail.src,
            bookName: item.titleNoFormatting
        })
    })

    return books
}

const searchPdfBooks = async (bookInformation) => {
    try {
        fullUrl = `${url}&q=${bookInformation}&safe=active&cse_tok=AJvRUv19DOo7uHPHJj0beALLgHO1:1622262401504&exp=csqr,cc&callback=google.search.cse.api3469`;
        const response = await axios.get(fullUrl);
        
        const lineBegin = response.data.search('{')
        const newResponse = response.data.substr(lineBegin, (response.data.length - lineBegin) -2);
        
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

        //fs.writeFile('newBook1.json', newResponse)
    } catch (err) {
        console.log(err)
        return {
            status_code: 500,
            msg: err || 'Houve um problema ao processar a sua requisição',
            data: [],
        };
    }
}

module.exports = searchPdfBooks
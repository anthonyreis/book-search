const axios = require('axios')

const searchBible = async ({book, chapter, verseNumber}) => {
    if (!verseNumber){
        var url = `https://www.abibliadigital.com.br/api/verses/nvi/${book}/${chapter}`
    } else {
        var url = `https://www.abibliadigital.com.br/api/verses/nvi/${book}/${chapter}/${verseNumber}`
    }
    
    try {
        const response = await axios.get(url);
        
        if (!verseNumber) {
            responseFilter = response.data.verses.map((item, index) => ({
                capitulo: chapter,
                versiculo: index + 1,
                msg: item.text
            }))
        } else {
            responseFilter = {
                livro: response.data.book.name,
                autor: response.data.book.author,
                msg: response.data.text
            }
        }

        return {
            status_code: 200,
            data: responseFilter,
        }
    } catch (err) {
        return {
            status_code: 500,
            msg: 'Houve um problema ao processar a sua requisição',
            data: {}
        }
    }
}
module.exports = searchBible
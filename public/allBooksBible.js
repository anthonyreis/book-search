const axios = require('axios')

const bibleBooks = async () => {
    const url = `https://www.abibliadigital.com.br/api/books/`

    try {
        const response = await axios.get(url);

        mapResponse = response.data.map((item) => ({
            autor: item.author,
            capitulos: item.chapters,
            livro: item.name
        }))

        return {
            status_code: 200,
            data: mapResponse
        }
    } catch (err) {
        return {
            status_code: 500,
            msg: 'Houve um problema ao processar a sua requisição',
            data: {}
        }
    }
}

module.exports = bibleBooks
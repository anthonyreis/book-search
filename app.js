const express = require('express');
const bodyParser = require('body-parser');
const searchBook = require('./public/www.free-ebooks.net');
const searchBible = require('./public/searchBible');
const bibleBooks = require('./public/allBooksBible');

const app = express();
const port = process.env.PORT || 8081;

app.use(express.static(__dirname + '/public'));

app.get('/searchBook', async (req, res) => {
    try {
        const response = await searchBook(req.query.bookInfo);
        // res.status(response.status_code).send(response.data)
    } catch (err) {
        res.send(err)
    }
})

app.get('/bibleBooks', async (req, res) => {
    try {
        const response = await bibleBooks();
        res.status(response.status_code).send(response.data)
    } catch (err) {
        res.send(err)
    }
})

app.get('/bibleVerse', async (req, res) => {
    try {
        const response = await searchBible(req.query);
        response.status_code !== 200 ? res.status(response.status_code).send(response.msg) : res.status(response.status_code).send(response.data)
    } catch (err) {
        res.send(err)
    }
})

app.get('/*', (req, res) => {
    res.send('404 - Page Not Found');
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
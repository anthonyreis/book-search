const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs')
const path = require('path')
const searchBook = require('./src/www.free-ebooks.net');
const searchArchive = require('./src/https:/bookboon.com');
const searchBible = require('./src/searchBible');
const bibleBooks = require('./src/allBooksBible');

const app = express();
const port = process.env.PORT || 8081;

const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Search Books',
        name: 'Anthony Reis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Search Books',
        name: 'Anthony Reis'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Search Books',
        name: 'Anthony Reis',
        email: 'matheus.anthony1@gmail.com'
    })
})

app.get('/searchBook', async (req, res) => {
    try {
        const response1 = await searchBook(req.query.bookInfo);
        const response2 = await searchArchive(req.query.bookInfo);
        const response = [
            ...response1.data,...response2.data,
        ]
        res.send(response)
    } catch (err) {
        res.send(err)
    }
})

app.get('/searchArchive', async (req, res) => {
    try {
        const response = await searchArchive(req.query.bookInfo);
        
        res.send(response.data)
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
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Anthony Reis'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
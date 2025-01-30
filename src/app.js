const express = require('express');
const { validateUrl } = require('./middleware/validate');
const urlController = require('./controllers/urlController');

const app = express();

app.use(express.json());

// Routes
app.post('/shorten', validateUrl, urlController.shortenUrl);
app.get('/:shortId', urlController.redirectToUrl);

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

module.exports = app;
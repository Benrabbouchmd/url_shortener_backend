const urlService = require('../services/urlService');

class UrlController {
    async shortenUrl(req, res) {
        try {
            const shortId = await urlService.createShortUrl(req.body.url);
            res.json({ short_url: shortId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async redirectToUrl(req, res) {
        try {
            const { shortId } = req.params;
            
            if (shortId.length !== 7) {
                return res.status(400).json({ error: 'Invalid URL format' });
            }

            const longUrl = await urlService.getLongUrl(shortId);
            
            if (!longUrl) {
                return res.status(404).json({ error: 'URL not found' });
            }

            res.status(302).redirect(longUrl);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new UrlController();
const validateUrl = (req, res, next) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const urlRegex = new RegExp(
        '^([a-zA-Z]+:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
      );

    if (!urlRegex.test(url)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    try {
        new URL(url);
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid URL format' });
    }
};


module.exports = { validateUrl };
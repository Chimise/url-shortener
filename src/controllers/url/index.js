const {shortenUrl, deleleShortUrl, urlDetails, retrieveUrl} = require('./v1');
const safeWrap = require('../../middleware/safeWrap');

module.exports = (app) => {
    app.get('/:shortUrl', safeWrap(retrieveUrl));
    app.post('/', safeWrap(shortenUrl));
    app.get('/:shortUrl/details', safeWrap(urlDetails));
    app.delete('/:shortUrl', safeWrap(deleleShortUrl));
}
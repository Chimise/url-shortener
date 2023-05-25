const {nanoid} = require('nanoid');
const Url = require('../models/Url');
const {Error500} = require('../shared/errors');

class URLService {
    generateId(length = 8) {
        return nanoid(length);
    }

    async addShortenedUrl(longUrl, shortUrl = this.generateId(), retry = 3) {
        if(retry <= 0) {
            throw new Error500('Service not available');
        }

        try {
            const newUrl = await Url.create({
                longUrl,
                shortUrl
            })
            return newUrl;
        } catch (error) {
            await this.addShortenedUrl(longUrl, this.generateId(12 - retry), retry - 1);
        }
    }
}

module.exports = new URLService();
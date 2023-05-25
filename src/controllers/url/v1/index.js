const {Error400, Error404} = require('../../../shared/errors');
const Url = require('../../../models/Url');
const Click = require('../../../models/Click');
const {URL: HOSTURL} = require('../../../shared/config');
const UrlService = require('../../../services/UrlService');



exports.shortenUrl = async (req, res) => {
    const url = req.body.url;
    if(!url) {
        throw new Error400('url field is required');
    }

    try {
        new URL(url);
    } catch (error) {
        throw new Error400('Provide a valid url');
    }

    const newUrl = await UrlService.addShortenedUrl(url);

    res.status(201).json({
        ...newUrl.toJSON(),
        shortUrl: `${HOSTURL}/${newUrl.shortUrl}`
    });
}

exports.retrieveUrl = async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const oldUrl = await Url.findOne({shortUrl});
    if(!oldUrl) {
        throw new Error404('Url provided was not found');
    }

    await Click.create({urlId: oldUrl._id});

    res.status(308).redirect(oldUrl.longUrl);

}


exports.urlDetails = async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const oldUrl = await Url.findOne({shortUrl});
    if(!oldUrl) {
        throw new Error404('Url provided was not found');
    }

    const clicks = await Click.find({urlId: oldUrl._id}).select('clickedDate');

    res.json({
        clicks,
        totalClicks: clicks.length
    })
}


exports.deleleShortUrl = async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const oldUrl = await Url.findOneAndDelete({shortUrl});
    if(!oldUrl) {
        throw new Error404('Url provided was not found');
    }

    await Click.deleteMany({urlId: oldUrl._id});

    res.json(oldUrl);
    
}
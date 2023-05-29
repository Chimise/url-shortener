module.exports = (req, res, next) => {
    return res.status(404).json({
        message: 'The resource your are looking for could not be found'
    })
}
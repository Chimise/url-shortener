const RequestError = require('../shared/errors/RequestError');

const safeWrap = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        if(error instanceof RequestError) {
            return next(error);
        }

        if(process.env.NODE_ENV !== 'production') {
            return next(new RequestError(error.message, 500));
        }

        next(new RequestError('An error occured, please try again', 500));
    }
}

module.exports = safeWrap;
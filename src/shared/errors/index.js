const RequestError = require('./RequestError');

class Error400 extends RequestError {
    constructor(message, payload) {
        super(message, 400, payload)
    }
}

class Error404 extends RequestError {
    constructor(message, payload) {
        super(message, 404, payload);
    }
}

class Error500 extends RequestError {
    constructor(message, payload) {
        super(message, 500, payload);
    }
}

module.exports = {
    Error400,
    Error404,
    Error500,
    RequestError
}
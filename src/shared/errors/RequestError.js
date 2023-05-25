class RequestError extends Error {
    constructor(message, code, payload) {
        super(message);
        this.code = code;
        this.payload = payload;
    }

    toJSON() {
        const {message, code, payload} = this;
        return {
            message,
            code,
            payload
        }
    }
}

module.exports = RequestError;
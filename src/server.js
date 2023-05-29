const express = require('express');
const bodyParser = require('body-parser');
const rateLimiter = require('express-rate-limit');
const config = require('config');
const connectDb = require('./shared/connectDb');
const {PORT} = require('./shared/config');
const urlController = require('./controllers/url')
const errorController = require('./controllers/errorHandler');
const matchAll = require('./controllers/matchAll');

const rateConfig = config.get('rateLimiting');

const app = express();

app.use(bodyParser.json());

app.use(rateLimiter({
    standardHeaders: true,
    message: 'You have reached the limit',
    ...(rateConfig || {})
}))

urlController(app);

app.use(errorController);

app.use('*', matchAll);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on Port ${PORT}`);
    })
}).catch(() => {
    console.log('Could not connect to db');
    process.exit(1);
})






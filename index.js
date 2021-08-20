'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const CONST = require('./config').CONST;
const logger = require("morgan");

// Accept requests from all origins
app.use(cors());

// To parse post requests body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (CONST.ENV === 'dev') {
    app.use(logger('dev'));
} else {
    app.use(logger(':date :method :url :status :res[Content-Length] :response-time ms'));
}

logger.token('date', function (req, res) {
    return new Date();
});

// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack || err.message);
    res.status(500).send('Something broke!')
});

app.use(CONST.API_PREFIX, router);

require("./routes")(router);

app.set('port', CONST.PORT);

app.listen(app.get('port'), () => {
    console.log('Server running on port ' + app.get('port') + ' in ' + app.get('env'));
});

process.on('uncaughtException', function (err) {
     console.log('UNCAUGHT EXCEPTION ! CRITICAL');
     console.error("[Inside 'uncaughtException' event] ", err.stack || err.message);
});

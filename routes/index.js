'use strict';

const respond = require('./respond');
const error = require('./error');
const DATA = require('../service').DATA;

module.exports = function (app) {
    app.post(
        '/info',
        DATA.getInfo,
        respond,
        error
    );
}

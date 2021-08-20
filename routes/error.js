'use strict';

var CONST = require('../config').CONST;
var env = CONST.ENV;

module.exports = function (err, req, res, next) {
    if (err) {
        var response = {};
        response.error = true;
        response.emsg = err.emsg;
        response.info = err.info || null;
        response.message = (err.info) ? err.emsg + ' : ' + err.info : err.emsg;
        response.message = 'Error Code: ' + err.code + ' ' + response.message;
        response.stack = err.stack ? err.stack.split('\n') : '';

        console.log("[Error] Url:", req.url, "Method:", req.method, "Response:", response);

        if (env == 'PROD') {
            response.stack = '';
        }

        // We've already sent 200 OK in all cases. Don't do this now.
        if (!res.headersSent) {
            res.status(err.http_status).json(response);
        } else {
            console.log("Response already sent");
        }
    } else {
        res.json({});
    }
};

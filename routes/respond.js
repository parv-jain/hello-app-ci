'use strict';

module.exports = function respondfn(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    console.log("[Success] Url:", req.url, "Method:", req.method, "Response:", req.sendResult.data.length);

    if ((req.url & req.url.indexOf('jsonp') > -1) ||
    (req.query && (req.query.callback || req.query.CALLBACK))) {
      res.jsonp(req.sendResult);
    } else {
      res.json(req.sendResult);
    }
};

const error_codes = require('../config/error_codes');
const CONST = require('../config').CONST;
const flagship = require("@flagship.io/js-sdk");
const unleash = require('unleash-client');

const fsInstance = flagship.start("c4d3knrigt80d3fstn30", "kDpNlpgXxFsEOoVYmUGhtUqTlmAZQXMRGQsoDpJa", {
  /* sdk settings */
	enableConsoleLogs: true,
	timeout: 30
});

unleash.initialize({
	url: 'http://localhost:4242/api/',
	appName: 'hello-app-ci',
	environment: CONST.ENV,
	customHeaders: { Authorization: 'f549938795e1aedd91f92860761e4c932c9bf741baaba1ce2d5a7ffd07d5fbe2' },
});

module.exports = {
    getInfo: (req, res, next) => {
        fetchInfo(req, next);
    },
}

function fetchInfo(req, next) {
	// req.body must contains visitor context
	if(!req.body || !req.body.visitor_context) return next(error_codes.ERROR_RESPONSE("visitor_context - {'age': {age}} is required"));

	// auto generate visitor id - null is passed as first argument
	const fsVisitorInstance = fsInstance.newVisitor(null, req.body.visitor_context);

	fsVisitorInstance.on("ready", ({ withError, error }) => {
	  if (withError) {
	    console.error("Ouch, visitor is ready but with error : " + error.stack);
	    return next(error_codes.ERROR_RESPONSE("visitor error"));
	  } else {
	    console.log("visitor is ready without error ! ✨");
	  }
	});

	const unleashUserContext = {
		userId: req.body.visitor_context.age
	}
	const enabled = unleash.isEnabled('testFeature1', unleashUserContext);
console.log(enabled)
	fsVisitorInstance.getAllModifications().then((response) => {
            var campaigns = response.data.campaigns
	    var testFeature1 = campaigns[0].variation.modifications.value.testFeature1
console.log(testFeature1)
	    if(testFeature1 && enabled) {
	        req.sendResult = {
                    error: false,
                    data: "Hello World",
                }
	    } else {
	    	req.sendResult = {
		    error: false,
		    data: "This feature is not available"
		}
	    }
            return next();
	});

}

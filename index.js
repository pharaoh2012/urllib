var request = require('request');
var Iconv = require('iconv-lite');

var useragents = {
	"pc": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
	"android": "",
	"ios": ""
};
var defaultOption = {
	trycount: 1,
	encoding: null,
	useragent: "pc"
};

async function _get(option, encoding = null) {
	return new Promise(function(resolve, reject) {
		request.get(option, function(err, response, body) {
			if (err) {
				reject(err);
				return;
			}
			if (response.statusCode !== 200) {
				reject({
					statusCode: response.statusCode,
					body: body
				});
				return;
			}
			if (encoding) resolve(Iconv.decode(body, encoding));
			else resolve(body);
		});
	});
}

function getUserAgent(name) {
	if (!name) name = "pc";
	let useragent = useragents[name];
	if (!useragent) return useragents["pc"];
	return useragent;
}

async function get(option, params) {
	let dParams = Object.assign({}, defaultOption, params);
	let op = {};
	if (typeof option === "string") {
		op = {
			url: option
		};
	} else {
		op = option;
	}
	let headers = op.headers;
	if (!headers) {
		headers = {};
	}
	if (!headers["user-agent"]) {
		headers["user-agent"] = getUserAgent(dParams.useragent);
	}
	if (dParams.encoding) {
		op.encoding = null;
	}

	let err = null;
	for(let i=0;i<dParams.trycount;i++) {
		
		try {
			let ret = await _get(op, dParams.encoding);
			return ret;
		} catch (error) {
			console.error(`get ${op.url} error:`,error);
			err = error;
		}
	}
	throw err;

}


exports.get = get;
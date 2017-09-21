var urllib = require('./index.js');

async function test(url,params) {
	try {
		let body = await urllib.get(url,params);
		console.info(body);
	} catch (error) {
		console.info(error);
	}

}

//test("http://www.baidu.com/",{"useragent":"ios"});

test("http://www.whoishostingthis.com/tools/user-agent/",{"useragent":"android1"});

//test("http://www.cqkcy.com/",{encoding:"gb2312",trycount:3});
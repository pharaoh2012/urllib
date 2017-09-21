# urllib

# 安装
`npm i https://github.com/pharaoh2012/urllib.git --save`

# 使用
```
var urllib = require('urllib');
async function test(url,params) {
	try {
		let body = await urllib.get(url,params);
		console.info(body);
	} catch (error) {
		console.info(error);
	}
}

test("http://www.baidu.com/");
//test("http://www.whoishostingthis.com/tools/user-agent/",{"useragent":"android"});
//test("http://www.cqkcy.com/",{encoding:"gb2312",trycount:3});
```

# api
`urllib.get(option,params);` 获取网页文本   
`urllib.getJSON(option,params);` 获取JSON   
`urllib.get$(option,params);`  获取[cheerio](https://github.com/cheeriojs/cheerio)   

# 参数
`option` 见[request](https://github.com/request/request#requestoptions-callback)的参数
`params` Object,默认值如下：
```
var defaultOption = {
	trycount: 1,
	encoding: null,
	useragent: "pc" //pc,android,ios
};
```


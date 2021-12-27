## 概述
 京东联盟&淘宝联盟&拼多多 api小工具

## 安装
使用npm
```shell
npm i xwapi
```

###淘宝开放平台链接地址：[https://open.taobao.com/api.htm](https://open.taobao.com/api.htm)

###京东开放平台链接地址：[https://union.jd.com/openplatform/console/apiList](https://union.jd.com/openplatform/console/apiList)

###拼多多开放平台链接地址：[https://open.pinduoduo.com/#/apidocument](https://open.pinduoduo.com/#/apidocument)

## 调用淘宝`搜索商品详情`示例
```javascript
var TBclient = require('xwapi').TBclient
	let client = new TBclient({
	  appkey: '<你的appKey>',
	  appsecret: '<你的secretKey>',
	  'REST_URL':'http://gw.api.taobao.com/router/rest'
	});
	client.execute('taobao.tbk.dg.material.optional',{
	'q':'手机',
	'adzone_id':'您的adzone_id'
	},function (error,response) {
	   if(!error){
		    console.log(response.results);
		}else{
			console.log(error);
		}
})
```

## 调用拼多多`搜索商品详情`示例

```javascript
var PDDclient = require('xwapi').PDDclient
  //
  const client = new PDDclient({
    clientId: '<你的clientId>',
    clientSecret: '<你的clientSecret>',
  })
  client.execute('pdd.ddk.goods.search', {
    keyword: '手机',
    pid:'您的pid',
    custom_parameters:'您的自定义参数',
    page: 1,
    page_size: 20,
  }).then(res =>{
      console.log(res);
  })
```

## 调用京东`搜索商品详情`示例
```javascript
var JDclient = require('xwapi').JDclient

let client = new JDclient({
  appKey: '<你的appKey>',
  secretKey: '<你的secretKey>'
});

client.execute('jd.union.open.goods.bigfield.query', {
  goodsReq:{
    skuIds:[70874548081]
   }
}).then(res =>{
  console.log(res);
});
```

# 如果对您有帮助：

- 请为我点个Star
- 如需帮助请关注下面的公众号并留言


![小微数据weiyuh](http://www.weiyuh.cn/weiyuh/gzh.jpg)

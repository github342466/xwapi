const CryptoJS = require('crypto-js')
const MD5 = require('crypto-js/md5')
const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.post.Accept = 'application/json';
const qs = require('qs');

module.exports = class JDClient {
	constructor(opt) {
		if (!(this instanceof JDClient)) {
		  return new JDClient(opt);
		}
		opt = opt || {};
		
		if (!opt.appKey || !opt.secretKey) {
		  throw new Error('appKey and secretKey are necessary!');
		}
		this.appKey = opt.appKey;
		this.secretKey = opt.secretKey;
		this.url = opt.url || 'https://router.jd.com/api';
	}
	execute(apiname, params){
		params.method = apiname;
		return this.request(params).then(res => {
		  const field = `${apiname.replace(/\./g, '_')}_response`;
		  if (typeof res === 'string') {
		    res = JSON.parse(res);
		  }
		  if (res['error_response']) {
		    const error = res['error_response'];
		    return {
		      code: parseInt(error.code),
		      message: error.zh_desc
		    };
		  }
		  const resp = res[field];
		  return JSON.parse(resp.result);
		});
	}
	//get
	request(params, options = {}){
		
		const { method, ...rest } = params;
		let data = {
		  timestamp: this.dateFormat(new Date()),
		  v: '1.0',
		  sign_method: 'md5',
		  format: 'json',
		  app_key: this.appKey,
		  param_json: JSON.stringify(rest),
		  method
		};
		data.sign = this.sign(data);
		data = data || {};
		data = { params: data };
		let url = this.url;
		return new Promise((resolve, reject) =>
		  axios({
		    url,
		    method: 'get',
		    ...data,
		    ...options
		  })
		    .then(response => resolve(response.data))
		    .catch(error => {
		      reject(error);
		    })
		);
	}
	//md5加密
	md5(s) {
	  return MD5(s).toString(CryptoJS.enc.Hex)
	}
	//签名
	sign(p){
		let sorted = Object.keys(p).sort();
		let str = this.secretKey;
		for (let i = 0, l = sorted.length; i < l; i++) {
		  let s = sorted[i];
		  str += s + p[s];
		}
		str += this.secretKey;
		return this.md5(str).toUpperCase();
	}
	//时间格式化
	dateFormat(date, format = 'yyyy-MM-dd hh:mm:ss') {
	  if (typeof date === 'string') {
	    return date;
	  }
	  let d = {
	    'M+': date.getMonth() + 1,
	    'd+': date.getDate(),
	    'h+': date.getHours(),
	    'm+': date.getMinutes(),
	    's+': date.getSeconds(),
	    'q+': Math.floor((date.getMonth() + 3) / 3),
	    S: date.getMilliseconds()
	  };
	  if (/(y+)/.test(format)) {
	    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	  }
	  for (let i in d) {
	    if (new RegExp('(' + i + ')').test(format)) {
	      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? d[i] : ('00' + d[i]).substr(('' + d[i]).length));
	    }
	  }
	  return format;
	}
	
}

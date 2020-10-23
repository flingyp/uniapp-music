'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ' + event)
	//返回数据给客户端
	const payload = await uniID.checkToken(event.token)
	if (payload.code && payload.code > 0) {
		return payload
	}
	const res = await uniID.getUserInfo({
		uid: payload.uid
	})
	return res
};

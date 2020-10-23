// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const payload = await uniID.checkToken(event.token)
	// name是用户名  username是手机号
	const name = event.name || ""
	const username = event.username || ""
	if (payload.code && payload.code > 0) {
		return payload
	}
	if(name != "" && username === "") {
		const res = await uniID.updateUser({
			name,
			uid: payload.uid
		})
		return res
	} else if(username != "" && name === "") {
		const res = await uniID.updateUser({
			username,
			uid: payload.uid
		})
		return res
	} else if(name != "" || username != "") {
		const res = await uniID.updateUser({
			name,
			username,
			uid: payload.uid
		})
	}
}

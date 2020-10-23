const uniID = require('uni-id')
exports.main = async function(event, context) {	
	const {
		avatar
	} = event
	const payload = await uniID.checkToken(event.token)
	if (payload.code > 0) {
		return payload
	}
	const res = await uniID.setAvatar({
		uid: payload.uid,
		avatar
	})
	return res
}

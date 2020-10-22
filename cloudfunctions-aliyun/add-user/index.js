'use strict';
const uniID = require('uni-id')
const db = uniCloud.database()
exports.main = async (event, context) => {
  //event为客户端上传的参数
  // console.log('event : ' + event)
  //返回数据给客户端
  
  const { username, password } = event
  
  // 注册前 去云数据库查询是否已经注册过
  // 获取 `uni-id-users` 集合的引用
  const db_users = db.collection('uni-id-users');
  let user = await db_users.where({
	  username: username
  }).count()
  
	  
  if(user.total == 0) {
	// uni-id模块的 注册API
	const res = await uniID.register({
	  username,
	  password
	})    
	return res
  } else {
	  return {
		  message: "注册的用户已存在",
		  count: user
	  }
  }
};

'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
  //event为客户端上传的参数
  // console.log('event : ' + event)
  //返回数据给客户端
  const {username, password} = event
  
  const res = await uniID.login({ username, password })
  
  return res
};

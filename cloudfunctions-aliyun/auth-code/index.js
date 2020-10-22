'use strict';
exports.main = async (event, context) => {
  //event为客户端上传的参数
  // console.log('event : ' + event)
  //返回数据给客户端
  const date = new Date()
  // 生成随机数
  const random_number = Math.round((Math.random() * 10) + 1)
  const code_number = date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + random_number.toString()
  return {
	  message: "验证码获取成功",
	  data: {
		  code: code_number
	  },
	  code: 200
  }
};

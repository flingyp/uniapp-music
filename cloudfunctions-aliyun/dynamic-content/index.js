'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
  //event为客户端上传的参数
  // console.log('event : ' + event)
  const collection = db.collection('dynamic-content');
  const dynamic = event.dynamic
  const res = await collection.add(dynamic)
  
  //返回数据给客户端
  return {
	  message: "动态消息插入成功",
	  code: 200,
	  data: res
  }
};

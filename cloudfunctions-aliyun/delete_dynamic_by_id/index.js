'use strict';
const db = uniCloud.database()
const collection = db.collection('dynamic-content')
exports.main = async (event, context) => {
  //event为客户端上传的参数
  // console.log('event : ' + event)
  
  let res = await collection.where({
    _id: event.dynamic_id
  }).remove()
  //返回数据给客户端
  return res
};

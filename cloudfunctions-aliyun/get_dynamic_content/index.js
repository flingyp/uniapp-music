'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  //event为客户端上传的参数
  // console.log('event : ' + event)
  const collection = db.collection('dynamic-content')
  const keyword = event.keyword || ""
  let w = {}
  if(keyword.trim() != "") { // 关键词动态内容搜索
	  w = {
		dynamic_content: new RegExp(keyword, 'i')
	  }
	  const res = await collection.where(w).skip(0).get()
	  //返回数据给客户端
	  return res
  } else {
	  const res = await collection.where(w).skip(event.startPosition).limit((event.limit)).get()
	  //返回数据给客户端
	  return res
  }
  
};

const origin_url = "https://autumnfish.cn"

export default (URL, pro, methods="GET") => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: origin_url + URL,
			data: pro,
			methods: methods,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
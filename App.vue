<script>
	export default {
		onLaunch: function() {
			console.log("我是onLaunch生命周期")
			// 判断用户是否登录
			const token = uni.getStorageSync('token')
			if(!token) { // 没有 token 时
				uni.redirectTo({ url: '/pages/login/login' })
				console.log(token)
			} else {
				this.getUserInfo(token)
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 获取用户信息
			getUserInfo(token) {
				// 获取用户信息
				uniCloud.callFunction({
					name: 'get_userinfo',
					data: {
						token
					}
				}).then((res) => {
					if(res.result.code === 30203 || res.result.code === 30204) { 
						// 代表 token 过期   代表非法token 
						uni.showToast({
							title: "请重新登录",
							icon: "none"
						})
						uni.removeStorageSync('token')
						uni.removeStorageSync('userInfo')
						uni.redirectTo({ url: "../../login/login" })
					}
					uni.setStorageSync('userInfo', res.result.userInfo)
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/iconfont.css");
	@import url("static/css/simplepro.css");
	image {
		width: 100%;
		height: 100%;
	}
</style>

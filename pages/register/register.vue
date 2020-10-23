<template>
	<view class="s-page-wrapper">
		<view class="is-25vh is-flex is-align-center is-justify-center">
			<view class="is-flex is-column is-justify-center  is-align-center is-height-100">
				<image src="../../static/imgs/blog-actived.png" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="registercontent">
			<view class="has-mglr-10 ">
				<view class=" has-mgtb-10 ">
					<input type="text" maxlength="11" placeholder="请输入用户名" class="is-input1 " data-val="username" @input="BindInput" />
				</view>
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="11" placeholder="请输入手机号" class="is-input1 " data-val="phonenumber" @input="BindInput" />
				</view>
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="10" placeholder="短信验证码" class="is-input1 " data-val="code" @input="BindInput" />
					<view class="codeimg" @tap="getsmscode">{{smsbtn.text}}</view>
				</view>

				<view class=" has-radius has-mgtb-10">
					<input placeholder="请输入登录密码" :password="true" class="is-input1" data-val="password" @input="BindInput" />
				</view>
				<view class=" registerbtn has-radius has-mgtb-20">
					<button @tap="BindRegister">注 册</button>
					<button @tap="DumpToLogin" class="has-mgt-2">已有账号</button>
				</view>
			</view>
		</view>
		<view class="is-20vh has-mgt-80">
			<navigator url="#" class=" has-radius is-center is-grey " hover-class="">
				<text>注册即表示同意</text><text class="is-blue">《用户协议》</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				smsbtn: {
					text: '获取验证码',
					status: false,
					codeTime: 60
				},
				timerId: null,
				register: {
					phonenumber: "",
					username: "",
					password: "",
					code: ""
				},
				// 获取到的验证码
				auth_code: ""
			};
		},
		methods: {
			// 点击 获取验证码时的事件
			getsmscode() {
				if(this.register.username === "" || this.register.phonenumber === "") {
					uni.showToast({
						title: "请输入用户名和手机号",
						icon: "none",
						mask: true
					})
					return false
				}
				if (this.smsbtn.status == true ) {
					console.log('message：', "别着急！短信已经发送了~");
					return false;
				}
				this.smsbtn.status = true; 
				// 这段代码其实应该加在你request请求 短信发送成功后 
				uniCloud.callFunction({ name: 'auth-code' }).then((res) => {
					console.log(res)
					this.auth_code = res.result.data.code 
				})
				this.timerId = setInterval(() => {
						var codeTime = this.smsbtn.codeTime;
						codeTime--;
						this.smsbtn.codeTime = codeTime;
						this.smsbtn.text = codeTime + "S";
						if (codeTime < 1) {
							clearInterval(this.timerId);
							this.smsbtn.text = "重新获取";
							this.smsbtn.codeTime = 60;
							this.smsbtn.status = false;
							this.auth_code = ""
						}
				},1000);
				return false;
			},
			// 输入框输入
			BindInput(e) {
				const val = e.currentTarget.dataset.val
				this.register[val] = e.detail.value
			},
			// 点击注册时
			BindRegister(e) {
				if(this.register.code != this.auth_code) {
					uni.showToast({
						title: "验证码错误或验证码已过期，请重新获取",
						icon: "none",
						mask: true
					})
					return false
				}
				if(this.register.password === "" || this.register.username === "" || this.register.phonenumber==="") {
					uni.showToast({
						title: "用户名和密码不能为空",
						icon: "none",
						mask: true
					})
					return false
				}
				// 调接口， 将数据存储到云数据库中
				uniCloud.callFunction({
					name: 'add-user',
					data: {
						username: this.register.username,
						phonenumber: this.register.phonenumber,
						password: this.register.password
					}
				}).then((res) => {
					console.log(res)
					if(res.result.msg === "注册成功") {
						uni.showToast({
							title: "注册成功",
							icon: "success",
							mask: true
						})
						// 进行 token 的存储
						// uni.setStorageSync('token', res.result.token)
						// 跳转登录页面
						uni.navigateTo({ url: '../login/login' })
					} else if(res.result.message === "注册的用户已存在") {
						uni.showToast({
							title: "用户已存在",
							icon: "none",
							mask: true
						})
						return false
					} else {
						uni.showToast({
							title: "注册失败",
							icon: "none",
							mask: true
						})
						return false
					}
				})
			},
			// 点击已有账号 跳转到登录页面
			DumpToLogin() {
				// 跳转登录页面
				uni.navigateTo({
					url: '../login/login'
				})
			}

		}
	}
</script>

<style>
	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.registercontent {
		width: 85%;
		margin: 0 auto;
	}

	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.is-input1 {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding: 12rpx;
		color: #353535;
		font-size: 32rpx;
		box-sizing: border-box;
		appearance: none;
		border: 2rpx solid #e5e5e5;
		box-shadow: none;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
	}

	.iconfont {
		position: absolute;
		font-size: 40rpx;
		right: 12%;
		z-index: 999;
		width: 105rpx;
		text-align: center;
		color: #353535;
		margin-top: -11%;
		background: #fff;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.codeimg {
		position: absolute;
		font-size: 28rpx;
		right: 12%;
		z-index: 999;
		width: 200rpx;
		text-align: center;
		color: #353535;
		margin-top: -11%;
		background: #fff;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.registerbtn button {
		margin-top: 30rpx;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		background: #f35;
		opacity: 0.8;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}
</style>

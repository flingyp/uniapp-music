<template>
	<view class="s-page-wrapper">
		<hx-navbar :config="config"></hx-navbar>
		
		<view class="is-25vh is-flex is-align-center is-justify-center">
			<view class="is-flex is-column is-justify-center  is-align-center is-height-100">
				<image src="../../static/imgs/blog-actived.png" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="content">
			<view class="has-mglr-10 ">
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="11" v-model="login.phone" placeholder="请输入手机号" class="is-input1 " @input="BindInput" data-val="phonenumber" />
				</view>
				<view class=" has-radius has-mgtb-10">
					<input type="password" v-model="login.password" placeholder="请输入登录密码" class="is-input1"  @input="BindInput" data-val="password"/>
				</view>

				<view class=" loginbtn has-radius has-mgtb-20">
					<button :loading="login.loading" @tap="defaultHandlerLogin"> {{ login.loading ? "登录中...":"登 录"}} </button>
				</view>
			</view>
		</view>
		<view class="is-20vh has-mgt-80 content">
			<navigator url="../register/register" class=" has-radius is-right is-grey has-mgr-20" hover-class="">
				<text>暂未注册？</text><text class="is-blue">点击注册</text>
			</navigator>
			<navigator url="#" class=" has-radius is-right is-grey has-mgr-20" hover-class="">
				<text>忘记密码？</text><text class="is-blue">点击找回</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	import con from '../../api/navabar-config.js'
	export default {
		data() {
			return {
				login: {
					loading: false,
					phonenumber:"",
					password:""
				},
				config: con
			};
		},
		methods:{
			defaultHandlerLogin(){
				if(this.login.phonenumber === "" || this.login.password === "") {
					uni.showToast({
						title: "手机号和密码不能为空",
						icon: "none",
						mask: true
					})
					return false
				}
				this.login.loading = true;
				// 调用登录的云函数
				uniCloud.callFunction({ 
						name: 'user-login',
						data: {
							username: this.login.phonenumber,
							password: this.login.password
						}
				}).then((res) => {
					if(res.result.code === 10101) {
						uni.showToast({
							title: "用户名不存在",
							icon: "none",
							mask: true
						})
						return false
					}
					if(res.result.code != 0) {
						uni.showToast({
							title: "手机号或密码错误",
							icon: "none",
							mask: true
						})
						return false
					}
					uni.setStorageSync('token', res.result.token)
					uni.setStorageSync('userInfo', res.result.userInfo)
					uni.switchTab({
						url: "../tabBar/index/index"
					})
				})
				setTimeout((e=>{
					this.login.loading = false;
				}),1500);
			},
			BindInput(e){
				var dataval = e.currentTarget.dataset.val;
				this.login[dataval] = e.detail.value; 
			}
		}
	}
</script>

<style>
	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.content {
		width: 85%;
		margin: 0 auto;
	}

	.loginbtn button {
		margin-top: 20rpx;
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
</style>

<template>
	<view class="container">
		<textarea class="content" placeholder="分享新鲜事..." maxlength="140" auto-focus></textarea>

		<view class="image-list">
			<!-- 图片显示 -->
			<block>
				<view class="image-wrap">
					<image class="image" mode="aspectFill" src="../../static/imgs/blog-actived.png"></image>
					<i class="iconfont icon-shanchu"></i>
				</view>
			</block>
			<!-- 选择图片 -->
			<view class="image-wrap selectphoto">
				<i class="iconfont icon-jiahao"></i>
			</view>
		</view>
		
		<view class="footer" style="bottom:10px">
			<text class="words-num">0</text>
			<button class="send-btn">发布</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		const userInfo = this.getUserInfoToLocal()
		console.log(userInfo)
	},
	methods: {
		getUserInfoToLocal() {
			// 获取本地 token 和 用户的信息
			const token = uni.getStorageSync('token')
			const userInfo = uni.getStorageSync('userInfo')
			return {
				token, 
				userInfo
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 20rpx;
}

.content {
	width: 100%;
	height: 360rpx;
	box-sizing: border-box;
}

.footer {
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 0;
	padding: 20rpx;
	width: 100%;
	box-sizing: border-box;
	background: #f1f1f1;
}

.words-num {
	flex: 1;
	text-align: right;
	color: #474747;
	font-size: 32rpx;
	padding-right: 30rpx;
}

.send-btn {
	width: 100rpx !important;
	min-height: 60rpx !important;
	padding: 15rpx !important;
	background: #d43c33;
	color: #fff;
	font-size: 24rpx;
	margin-right: 20rpx;
}

/* 图片样式 */

.image-list {
	display: flex;
	flex-wrap: wrap;
	margin-top: 20rpx;
}

.image-wrap {
	width: 220rpx;
	height: 220rpx;
	margin-right: 10rpx;
	margin-bottom: 10rpx;
	position: relative;
	overflow: hidden;
	text-align: center;
}

.image {
	width: 100%;
	height: 100%;
}

.icon-shanchu {
	position: absolute;
	top: 0;
	right: 0;
	width: 40rpx;
	height: 40rpx;
	background-color: #000;
	opacity: 0.4;
	color: #fff;
	text-align: center;
	line-height: 40rpx;
	font-size: 38rpx;
	font-weight: bolder;
}

.selectphoto {
	border: 2rpx dashed #cbd1d7;
	position: relative;
}

.icon-jiahao {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #cbd1d7;
	font-size: 60rpx;
}
</style>

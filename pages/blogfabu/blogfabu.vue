<template>
	<view class="container">
		<textarea class="content" placeholder="分享新鲜事..." maxlength="140" focus @input="shareContent"></textarea>

		<view class="image-list">
			<!-- 图片显示 -->
			<block v-for="(item, index) in imgLocalFile" :key="index">
				<view class="image-wrap">
					<image class="image" mode="aspectFill" :src="item.imgLocalUrl"></image>
					<i class="iconfont icon-shanchu" @tap="deleteThisImg(index)"></i>
				</view>
			</block>
			<!-- 选择图片 -->
			<view class="image-wrap selectphoto" @tap="choseImgs">
				<i class="iconfont icon-jiahao"></i>
			</view>
		</view>
		
		<view class="footer" style="bottom:10px">
			<text class="words-num">{{shareFontNum}}</text>
			<button class="send-btn" @tap="publish">发布</button>
		</view>
	</view>
</template>

<script>
	import nowTime from '../../api/format_time.js'
export default {
	data() {
		return {
			// 输入的数量
			shareFontNum: 0,
			// 输入的内容
			inputShareContent: "",
			// 选择图片的图片数组
			imgLocalFile: [],
			userInfo: {}
		};
	},
	onLoad() {
		this.userInfo = this.getUserInfoToLocal()
	},
	methods: {
		// 获取用户信息 和 token
		getUserInfoToLocal() {
			// 获取本地 token 和 用户的信息
			const token = uni.getStorageSync('token')
			const userInfo = uni.getStorageSync('userInfo')
			return {
				token, 
				userInfo
			}
		},
		// 分享内容
		shareContent(e) {
			this.inputShareContent = e.detail.value
			this.shareFontNum = e.detail.cursor
		},
		// 选择图片
		choseImgs() {
			uni.chooseImage({
				count: 9,
				success: (res) => {
					for(let i=0; i<res.tempFilePaths.length; i++) {
						let obj = {}
						obj['imgLocalUrl'] = res.tempFilePaths[i] 
						obj['imgName'] = res.tempFiles[i].name != null ? res.tempFiles[i].name: `${Math.round((Math.random()*100))}-${this.userInfo.userInfo.name}-${Math.round((Math.random()*100))}.jpg`
						this.imgLocalFile.push(obj)
					}
					if(this.imgLocalFile.length > 9) {
						uni.showToast({
							title: "最多发布9张图片"
						})
						this.imgLocalFile.forEach((item,index) => {
							if(index >= 9) {
								this.imgLocalFile.splice(index, 1)
							}
						}) 
					}					
				}
			})
		},
		// 删除指定图片
		deleteThisImg(index) {
			this.imgLocalFile.splice(index,1)
		},
		// 发布动态
		async publish() {
			// 检测 发布内容不能为空
			if(this.shareFontNum == 0) {
				uni.showToast({
					title: "内容不能为空",
					icon: "none"
				})
				return
			}
			let imgInfo = []
			// 将图片上传至云存储中
			for(let i=0; i<this.imgLocalFile.length; i++) {
				let result = await uniCloud.uploadFile({
					filePath: this.imgLocalFile[i].imgLocalUrl,
					cloudPath: this.imgLocalFile[i].imgName
				})
				imgInfo.push(result)
			}
			let dynamic = {}
			let fabu_date = nowTime()
			dynamic['imgInfo'] = imgInfo
			dynamic['dynamic_content'] = this.inputShareContent
			dynamic['name'] = this.userInfo.userInfo.name
			dynamic['id'] = this.userInfo.userInfo._id
			dynamic['avatar'] = this.userInfo.userInfo.avatar
			dynamic['fabu_date'] = fabu_date
			// 将图片消息存储到云数据库中
			const res = await uniCloud.callFunction({
				name: 'dynamic-content',
				data: {
					dynamic
				}
			})
			if(res.result.code === 200) {
				uni.showToast({
					title: "动态发布成功",
					icon: "success"
				})
				setTimeout(() => {
					// 跳转回 found 页面
					uni.switchTab({ url: "../tabBar/found/found" })
				}, 1000)
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
	box-sizing: border-box;
	width: 220rpx;
	height: 220rpx;
	margin: 8rpx;
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

<template>
	<view class="blog-box">
		<!-- 用户动态头像 信息等 -->
		<view class="blog-useringfo">
			<view class="user-img">
				<image :src="dynamic.avatar"></image>
			</view>
			<view class="user-name-time">
				<view class="user-name">{{dynamic.name}}</view>
				<view class="create-time">{{dynamic.fabu_date}}</view>
			</view>
			<view class="blog-delete" v-if="isBlogDelete" @tap="deleteThisBlog">
				<i class="iconfont icon-shanchu"></i>
			</view>
		</view>
		<!-- 用户动态内容 -->
		<view class="blog-content">
			<view class="content-font">{{dynamic.dynamic_content}}</view>
			<view class="content-image">
				<view 
					class="image-item" 
					v-for="(item, index) in dynamic.imgInfo"  
					:key="index"
					@tap="previewImages(index, dynamic.imgInfo)"
				>
					<image :src="item.fileID"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		dynamic: {
			type: Object
		}
	},
	methods: {
		deleteThisBlog() {
			this.$emit('deleteBlog', this.dynamic._id)
		},
		// 预览图片
		previewImages(currentIndex, imgsInfo) {
			const imgsUrl = []
			imgsInfo.forEach((item) => {
				imgsUrl.push(item.fileID)
			})
			uni.previewImage({
				current: currentIndex,
				urls: imgsUrl,
				indicator: true,
				loop: true
			})
		}
	},
	computed:{
		isBlogDelete() {
			const user_id = uni.getStorageSync('userInfo')._id
			if(this.dynamic.id === user_id) {
				return true
			} else {
				return false
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.blog-box {
	width: 100%;
	border: 0.5px solid #ccc;
	margin: 10px auto;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.blog-useringfo {
		width: 100%;
		height: 60px;
		display: flex;
		box-sizing: border-box;
		padding: 10px 8px;
		position: relative;
		.user-img {
			width: 70rpx;
			height: 70rpx;

			image {
				border-radius: 50%;
			}
		}
		.user-name-time {
			margin-left: 6px;
			.user-name {
				font-size: 18px;
				font-weight: 500;
			}

			.create-time {
				font-size: 14px;
			}
		}
		
		.blog-delete {
			position: absolute;
			right: 5%;
			.icon-shanchu {
				font-size: 66rpx;
			}
		}
	}
	
	.blog-content {
		flex: 1;
		padding: 5px 10px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		.content-font {
			flex: 1;
			font-size: 18px;
			font-weight: 500;
		}

		.content-image {
			flex: 5;
			margin-top: 10px;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.image-item {
				flex: 1;
				text-align: center;
				margin-bottom: 5px;
				image {
					width: 160rpx;
					height: 160rpx;
					line-height: 120rpx;
				}
			}
		}
	}
	
	.blog-pinlun {

		.icon {
			margin-top: 8px;
		}
		
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 0.5px solid #CCC;
		padding: 6px 0;
	}
}
</style>

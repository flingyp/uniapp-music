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
		</view>
		<!-- 用户动态内容 -->
		<view class="blog-content">
			<view class="content-font">{{dynamic.dynamic_content}}</view>
			<view class="content-image">
				<view class="image-item" v-for="(item, index) in dynamic.imgInfo"  :key="index">
					<image :src="item.fileID"></image>
				</view>
			</view>
		</view>
		<!-- 评论 分享 -->
		<view class="blog-pinlun">
			<i class="iconfont icon-pinglun icon" />
			<text>评论</text>
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

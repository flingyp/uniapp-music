<template>
	<view class="playlist-box">
		<view class="detail-container" :style="{background: `url(${listInfo.picUrl}) no-repeat top center`}"></view>
		<!-- 遮罩层 -->
		<view class="detail-mask"></view>
		<view class="detail-info">
		  <image :src="listInfo.picUrl" class="detail-img"></image>
		  <view class="detail">
			<view class="detail-copywriter">{{listInfo.copywriter}}</view>
		    <view class="detail-nm">{{listInfo.name}}</view>
		  </view>
		</view>
		
		<!-- 歌单的音乐列表组件 -->
		<playlist-musiclist :musiclistData="listData"></playlist-musiclist>
	</view>
</template>

<script>
	import request from '../../api/request.js'
	export default {
		data() {
			return {
				playlistDetail_url: "/playlist/detail",
				// 歌单消息
				listInfo: {},
				// 歌单歌曲数据
				listData: []
			};
		},
		onLoad(option) {
			// 获取 首页出来的 歌单消息数据
			this.listInfo = JSON.parse(decodeURIComponent(option.item))
			// 获取歌单详情数据
			this.original()
		},
		methods: {
			original() {
				request(this.playlistDetail_url, {id: this.listInfo.id}).then((res) => {
					this.listData = res.data.playlist.tracks
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.playlist-box {
		position: relative;
		width: 100%;
		height: 320rpx;
		.detail-container {
			height: 100%;
			opacity: 0.4;
			filter: blur(30rpx);
		}
		
		.detail-mask {
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: #333;
			top: 0;
			left: 0;
			z-index: -1;
		}
		
		.detail-info {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			margin-left: 20rpx;
			
			.detail-img {
				width: 250rpx;
				height: 250rpx;
				border-radius: 10rpx;
			}
			
			.detail {
				height: 100%;
				flex-grow: 1;
				margin-left: 10rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				
				.detail-copywriter {
					width: 90%;
					overflow: hidden;
					font-size: 30rpx;
					font-weight: 600;
					color: #FFF;
				}
				.detail-nm {
					font-size: 25rpx;
					font-weight: 400;
				    color: #fff;
				}
			}
		}
	}

</style>

<template>
	<view class="playlist-box">
		<hx-navbar :config="config"></hx-navbar>
		
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
		<playlist-musiclist :musiclistData="listData" @goPlayer="jumpToPlayer"></playlist-musiclist>
	</view>
</template>

<script>
	import request from '../../api/request.js'
	import con from '../../api/navabar-config.js'
	import eventBus from '../../api/eventBus.js'
	export default {
		data() {
			return {
				config: con,
				playlistDetail_url: "/playlist/detail",
				// 歌单消息
				listInfo: {},
				// 歌单歌曲数据
				listData: [],
				// 下一首歌曲的下标值
				goPlayNextSongIndex: 0,
				// 上一首歌曲的下标值
				goPrevSongIndex: 0
			};
		},
		onLoad(option) {
			// 获取 首页出来的 歌单消息数据
			this.listInfo = JSON.parse(decodeURIComponent(option.item))
			// 获取歌单详情数据
			this.original()
			
			// 兄弟组件传值 player页面 播放下一首按钮的事件
			eventBus.$on('getNextSongInfo', (currentIndex) => {
				// currentIndex 问当前播放歌曲的下标值
				this.goPlayNextSongIndex = ++ currentIndex;
				if(currentIndex === this.listData.length) { // 判断 如果当前是歌单中的最后一首歌曲
					// 返回歌单中的第一首歌曲
					this.goPlayNextSongIndex = 0
				}
				// 把 值 传递 回给 player页面
				eventBus.$emit('nextSongInfo', this.listData[this.goPlayNextSongIndex], this.goPlayNextSongIndex)
			})
			
			eventBus.$on('getPrevSongInfo', (currentIndex) => {
				this.goPrevSongIndex = currentIndex - 1
				if(currentIndex === 0) {
					// 返回歌单中的最后一首歌曲下标
					this.goPrevSongIndex = this.listData.length - 1
				}
				// 把 值 传递 回给 player页面
				eventBus.$emit('prevSongInfo', this.listData[this.goPrevSongIndex], this.goPrevSongIndex)
			})
		},
		methods: {
			original() {
				request(this.playlistDetail_url, {id: this.listInfo.id}).then((res) => {
					this.listData = res.data.playlist.tracks
				})
			}, 
			// 跳转 播放器页面
			jumpToPlayer(songInfo, songIndex) {
				uni.navigateTo({
					url:`../player/player?index=${songIndex}&song=`+ encodeURIComponent(JSON.stringify(songInfo))
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
			top: 20%;
			left: 0;
			z-index: -1;
		}
		
		.detail-info {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 20%;
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
		
		// #ifdef MP-WEIXIN
		.detail-mask {
			top: 33%;
		}
		
		.detail-info {
			top: 33%;
		}
		// #endif
	}

</style>

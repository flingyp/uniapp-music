<template>
	<view class="player-box">
		<!-- 页面 背景图片 -->
		<view class="player-container" :style="{background:`url(${songInfo.al.picUrl}) no-repeat top center`}"></view>
		<!-- 遮罩层 -->
		<view class="player-mask"></view>
		
		<view class="player-info">
		  <!-- 封面信息 -->
		  <view class="player-disc play">
		    <image class="player-img rotation" :src="songInfo.al.picUrl"></image>
		  </view>
		
		  <!-- 进度条 -->
		  <view class="progress-bar">
		    <progress-bar></progress-bar>
		  </view>
		
		  <!-- 控制面板 -->
		  <view class="control">
		      <text class="iconfont icon-shangyishoushangyige"></text>
			  <text class="iconfont icon-zanting1"></text>
		      <!-- <text class="iconfont {{isPlaying?'icon-zanting1': 'icon-bofang1'}}"></text> -->
		      <text class="iconfont icon-xiayigexiayishou"></text>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 歌曲信息
				songInfo: {},
				// 歌曲 ID
				songID: 0
			};
		},
		onLoad(option) {
			this.songInfo = JSON.parse(decodeURIComponent(option.song))
			this.songID = JSON.parse(decodeURIComponent(option.song)).id
			console.log(this.songInfo)
		}
	}
</script>

<style lang="scss" scoped>
.player-box {
	width: 100%;
	
	.player-container {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: .5;
		filter: blur(15rpx);
		z-index: -1;
	}
	
	.player-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
		background: #222;
	}
	
	.player-info {
		text-align: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		
		
		.player-disc {
			position: absolute;
			width: 592rpx;
			height: 502rpx;
			background:url('https://s3.music.126.net/mobile-new/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f=') no-repeat center/contain;
			left: 50%;
			transform: translate(-50%, 140rpx);
			
			
			.player-img {
				width: 368rpx;
				height: 368rpx;
				border-radius: 50%;
			    position: absolute;
				left:50%;
				top: 50%;
				margin-top: -184rpx;
				margin-left: -184rpx;
			}
			
			.rotation {
				animation: playerImgRotate 12s linear infinite;
			}
			
			@keyframes playerImgRotate {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		}
		
		.player-disc::after {
			content: "";
			width: 192rpx;
			height: 274rpx;
			position: absolute;
			background: url('https://s3.music.126.net/m/s/img/needle.png?702cf6d95f29e2e594f53a3caab50e12') no-repeat center/contain;
			top: -150rpx;
			left: 266rpx;
			transform: rotate(-15deg);
			transform-origin: 24rpx 10rpx;
			transition: transform .5s ease;
		}
		
		.play.player-disc::after {
		  transform: rotate(0deg);
		}
		
		.progress-bar{
			position: absolute;
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
			bottom: 24%;
		}
		
		.control{
			position: absolute;
			bottom: 8%;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			align-items: center;
			
			.iconfont {
				color: red;
			}
			
			.icon-shangyishoushangyige, .icon-xiayigexiayishou{
			  font-size: 80rpx;
			}
			
			.icon-bofang1, .icon-zanting1{
			  font-size: 120rpx;
			  margin: 0 50rpx;
			}
		}
		
	}
	
}
</style>

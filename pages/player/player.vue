<template>
	<view class="player-box">
		<!-- 页面 背景图片 -->
		<view class="player-container" :style="{background:`url(${songInfo.al.picUrl}) no-repeat top center`}"></view>
		<!-- 遮罩层 -->
		<view class="player-mask"></view>
		
		<view class="player-info">
		  <!-- 封面信息 -->
		  <view class="player-disc" :class="{play: isPlay}">
		    <image class="player-img" :class="{rotation:isPlay}" :src="songInfo.al.picUrl"></image>
		  </view>
		  
		  <!-- #ifdef H5 -->
		  <view class="audio">
			  <imt-audio :src="song_url" autoplay continue @next="playNextSong" @prev="playPrevSong" @play="controlPlay" color="#ecf0f1"></imt-audio>
		  </view>
		  <!-- #endif -->
		  
		  <!-- #ifdef MP-WEIXIN -->
		  <view class="audio">
				<imt-audio :src="song_url" autoplay continue @next="playNextSong" @prev="playPrevSong" @play="controlPlay" color="#ecf0f1"></imt-audio>
		  </view>
		  <!-- #endif -->
		  
		</view>
	</view>
</template>

<script>
	import request from '../../api/request.js'
	import eventBus from '../../api/eventBus.js'
	export default {
		data() {
			return {
				// 歌曲信息
				songInfo: {},
				// 歌曲 ID
				songID: 0,
				// 歌曲下标
				songIndex: 0,
				// 请求歌曲播放地址
				songUrl: "/song/url",
				// 歌曲播放的地址
				song_url: "",
				// 歌曲是否播放
				isPlay: false,
			};
		},
		onLoad(option) { 
			// uniapp 音频 API
			this.songInfo = JSON.parse(decodeURIComponent(option.song))
			// 歌曲 id
			this.songID = JSON.parse(decodeURIComponent(option.song)).id
			// 歌曲在歌单数组中的下标值
			this.songIndex = option.index
			
			this.playSong(this.songID)
			
			
			// playlist_detail 把下一首歌曲信息 传递过来
			eventBus.$on('nextSongInfo', (nextSongInfo, nextSongIndex) => {
				// console.log(nextSongInfo ,nextSongIndex)
				this.songInfo = nextSongInfo
				this.songID = nextSongInfo.id
				this.songIndex = nextSongIndex
				this.playSong(this.songID)
			})
			// playlist_detail 把上一首歌曲信息 传递过来
			eventBus.$on('prevSongInfo', (prevSongInfo, prevSongIndex) => {
				console.log(prevSongInfo, prevSongIndex)
				this.songInfo = prevSongInfo
				this.songID = prevSongInfo.id
				this.songIndex = prevSongIndex
				this.playSong(this.songID)
			})
			
			// 歌曲播放结束后， 自动播放下一首
			this.endNextSong()
			
		
		},
		methods: {
			// 播放歌曲函数
			playSong(id) {
				// 歌曲开始播放
				uni.showToast({
					title: "加载中",
					icon: "loading",
					duration: 300
				})
				request(this.songUrl, {id: id}).then((res) => {
					this.song_url = res.data.data[0].url
					uni.setNavigationBarTitle({
					    title: this.songInfo.name
					});
					uni.hideToast()
				})
				this.isPlay = true
			},
			
			// 控制歌曲的播放和暂停
			controlPlay(noPlay) {
				// 改变 播放状态 noPlay 是 false 的就是歌曲在播放 | true 是歌曲未播放
				this.isPlay = !noPlay			
			}, 
			// 播放下一首歌曲
			playNextSong() {
				// 播放下一首歌曲时
				this.isPlay = false
				// 获取歌曲下标值 到 歌单列表页面 
				// 通过 兄弟组件方式的传值来向 player组件传递数据
				eventBus.$emit('getNextSongInfo', this.songIndex)
			},
			// 播放上一首歌曲
			playPrevSong() {
				// 播放上一首歌曲时
				this.isPlay = false
				// 获取歌曲下标值 到 歌单列表页面
				// 通过 兄弟组件方式的传值来向 player组件传递数据
				eventBus.$emit('getPrevSongInfo', this.songIndex)
			},
			// 歌曲播放结束后， 自动播放下一首
			endNextSong() {
				this.innerAudioContext.onEnded(() => {
					// 播放下一首歌曲
					eventBus.$emit('getNextSongInfo', this.songIndex)
				})
			}
		},
		watch: {
			isPlay: function() {
				if(this.isPlay) { // 歌曲播放
					console.log("开始播放歌曲")
				} else { // 歌曲暂停
					console.log("暂停播放歌曲")
				}
			},
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
		display: flex;
		justify-content: center;
		
		.audio {
			width: 90%;
			position: absolute;
			bottom: 10%;
		}
		
		
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
	}
	
}
</style>

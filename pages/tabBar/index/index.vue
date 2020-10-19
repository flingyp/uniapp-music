<template>
	<view class="content">
		
		<!-- <hx-navbar :config="config"></hx-navbar> -->
		
		<index-swiper :swiperImgs="swiperData"></index-swiper>
		
		<view class="playlist-container">
			<block v-for="(item, index) in playlistData" :key="index">
				<view @tap="jumpPlaylistDetail(item)">
					<index-playlist :playlist="item"></index-playlist>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import request from '../../../api/request.js'
	export default {
		data() {
			return {
				// 导航栏配置项
				config: {
					title: 'UniApp-Music',
					color: '#fff',
					backgroundColor: [1,['#7f8c8d','#8e44ad','#3498db','#c0392b']]
				},
				swiper_url: "/banner",
				playlist_url: "/personalized",
				// 轮播数据
				swiperData: [],
				// 歌单数据
				playlistData:[]
				
			}
		},
		onLoad() {
			this.original()
		},
		// 上拉加载
		onReachBottom() {
			uni.showToast({
				title: "加载中",
				icon: "loading",
				mask: true
			})
			// 加载更多数据
			const prevent_playlist_length = this.playlistData.length
			let prevent_playlist_data = this.playlistData
			// 要获取的新添加的数据 数量
			const add_playlist_length = 6
			// 新添加的数据
			let add_playlist_data = []
			setTimeout(() => {
				request(this.playlist_url, {limit:prevent_playlist_length+add_playlist_length}).then((res) => {
					res.data.result.splice(0, prevent_playlist_length)
					add_playlist_data = res.data.result
					this.playlistData = [...prevent_playlist_data, ...add_playlist_data]
					uni.hideToast()
				})
			},500)
			
		},
		// 下拉刷新
		onPullDownRefresh () {
			uni.showToast({
				title: "刷新中",
				icon: "loading",
				mask: true,
				success: () => {
					this.swiperData = []
					this.playlistData = []
				}
			})
			setTimeout(() => {
				this.original()
				uni.hideToast()
				uni.stopPullDownRefresh()
			}, 100)
		},
		methods: {
			// 页面初始化时， 请求的数据
			original() {
				request(this.swiper_url, {type:1}).then((res) => {
					this.swiperData = res.data.banners
				})
				request(this.playlist_url, {limit: 12}).then((res) => {
					this.playlistData = res.data.result
				})
			},
			// 跳转歌单详情页面
			jumpPlaylistDetail(item) {
				const playlist_item = item
				uni.navigateTo({
					url: "../../playlist_detail/playlist_detail?item="+ encodeURIComponent(JSON.stringify(playlist_item))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		index-swiper {
			box-sizing: border-box;
			width: 100%;
			height: 160px;
		}
		
		.playlist-container{
		  display: flex;
		  flex-wrap: wrap;
		  justify-content: space-around;
		  margin-top: 10rpx;
		  flex-direction: row;
		}
	}
</style>

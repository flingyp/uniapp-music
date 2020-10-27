<template>
	<view>
		<hx-navbar :config="config"></hx-navbar>
		<found-search @gofabu="fabu" @goSearch="searchDynamic"></found-search>
		<view class="blog-list">
			<block v-for="(item, index) in dynamicConent" :key="index">
				<blog :dynamic="item" @deleteBlog="delete_blog"></blog>
			</block>
		</view>
	</view>
</template>

<script>
	import con from '../../../api/navabar-config.js'
	export default {
		data() {
			return {
				config: con,
				// 动态内容
				dynamicConent: [],
				limit: 5,
				startPosition: 0,
				addLimit: 3
			};
		},
		onLoad(){
			this.getDynamicContent(this.limit, this.startPosition)
		},
		// 上拉加载
		onReachBottom() {
			uni.showToast({
				title: "刷新中",
				icon: "loading",
				mask: true,
			})
			this.reachBottom()
			setTimeout(() => {
				uni.hideToast()
			}, 100)
		},
		// 下拉刷新
		onPullDownRefresh() {
			uni.showToast({
				title: "刷新中",
				icon: "loading",
				mask: true,
				success: () => {
					this.dynamicConent = []
				}
			})
			setTimeout(() => {
				this.fromUpRefresh()
				uni.hideToast()
				uni.stopPullDownRefresh()
			}, 100)
		},
		methods: {
			fabu() {
				uni.navigateTo({
					url: '/pages/blogfabu/blogfabu'
				})
			},
			// 获取动态内容
			getDynamicContent(limit, startPosition, keyword="") {
				uniCloud.callFunction({
					name: 'get_dynamic_content',
					data: {
						limit,
						startPosition,
						keyword
					}
				}).then((res) => {
					if(res.success) {
						if(res.result.affectedDocs === 0) {
							uni.showToast({ 
								title: "没有更多动态了",
								icon: "none"
							})
						}
						this.dynamicConent = [...this.dynamicConent, ...res.result.data]
					}
				})
			},
			// 上拉加载事件
			reachBottom() {
				this.getDynamicContent(this.addLimit, this.dynamicConent.length+1)
			},
			// 下拉刷新
			fromUpRefresh() {
				this.dynamicConent = []
				this.getDynamicContent(this.limit, 0)
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 1000)
			},
			// 搜索相关动态
			searchDynamic(keyword) {
				this.dynamicConent = []
				this.getDynamicContent(null ,this.startPosition, keyword)
			},
			// 删除一篇动态
			delete_blog(_id) {
				// 显示模态框
				uni.showModal({
					title: "警告",
					content: "是否删除该动态",
					success: (res) => {
						if(res.confirm) { // 点击确定
							uniCloud.callFunction({
								name: 'delete_dynamic_by_id',
								data: {
									dynamic_id: _id
								}
							}).then(res => {
								if(res.result.deleted === 1) {
									uni.showToast({
										title: "成功删除该动态",
										icon: "success"
									})
									this.dynamicConent = []
									this.getDynamicContent(this.limit, this.startPosition)
								}
							})
						} 
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
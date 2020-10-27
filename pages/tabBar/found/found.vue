<template>
	<view>
		<hx-navbar :config="config"></hx-navbar>
		<found-search @gofabu="fabu" @goSearch="searchDynamic"></found-search>
		<view class="blog-list">
			<block v-for="(item, index) in dynamicConent" :key="index">
				<blog :dynamic="item"></blog>
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
			this.reachBottom()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.fromUpRefresh()
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
						console.log(res)
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
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
<template>
	<view>
		<hx-navbar :config="config"></hx-navbar>
		<found-search @gofabu="fabu"></found-search>
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
				dynamicConent: []
			};
		},
		onLoad(){
			this.getDynamicContent()
		},
		onShow() {
			this.dynamicConent = []
			this.getDynamicContent()
		},
		methods: {
			fabu() {
				uni.navigateTo({
					url: '/pages/blogfabu/blogfabu'
				})
			},
			// 获取动态内容
			getDynamicContent() {
				uniCloud.callFunction({
					name: 'get_dynamic_content'
				}).then((res) => {
					if(res.success) {
						this.dynamicConent = res.result.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>

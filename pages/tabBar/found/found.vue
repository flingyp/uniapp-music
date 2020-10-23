<template>
	<view>
		<hx-navbar :config="config"></hx-navbar>
		<found-search @gofabu="fabu"></found-search>
		<view class="blog-list">
			<blog></blog>
			<blog></blog>
			<blog></blog>
		</view>
	</view>
</template>

<script>
	import con from '../../../api/navabar-config.js'
	export default {
		data() {
			return {
				config: con
			};
		},
		methods: {
			fabu() {
				uni.navigateTo({
					url: '/pages/blogfabu/blogfabu'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>

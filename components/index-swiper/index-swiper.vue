<template>
	<view class="swiper-box">
		<swiper autoplay duration="500" circular interval="2500" indicator-dots indicator-color="#333">
			<swiper-item 
				class="swiper_item" 
				v-for="(item, index) in swiperImgs" :key="index"
			>
				<image :src="item.pic"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			swiperImgs: {
				type: Array
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.swiper-box {
	width: 100%;
	height: 160px;
	
	swiper {
		width: 100%;
		height: 100%;
		.swiper_item {
			width: 100%;
			height: 100%;
		}
	}
}
</style>

<template>
	<view class="container">
	<!-- 歌曲进行时间 -->
	<text class="time">00:00</text>
	<view class="control">
		<movable-area class="movable-area">
	      <movable-view direction="horizontal" damping="1000" class="movable-view"  />
	    </movable-area>
	    <progress stroke-width="4" backgroundColor="#969696" activeColor="#fff"></progress>
	</view>
	<!-- 歌曲总时间 -->
	<text class="time">02.53</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.container  {
	width: 100%;
	display: flex;
	align-items: center;
	
	.control {
		position: relative;
	    flex: 1;
		
		.movable-area {
			width: 100%;
			height: 34rpx;
			position: absolute;
			bottom: -14rpx;
			left: 0;
			.movable-view {
				width: 36rpx;
				height: 36rpx;
				background: #fefefe;
				border-radius: 50%;
			}
		}
	}
	
	.time {
		width: 64rpx;
		font-size: 24rpx;
		font-family: NotoSansHans-Regular;
		font-weight: 400;
		color: #FFF;
		line-height: 30rpx;
		padding: 0 20rpx;
	}
}
</style>

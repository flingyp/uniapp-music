<template>
	<view class="musiclist-box">
		<block v-for="(item, index) in musiclistData" :key="index">
		  <view class="musiclist-container" @tap="jumpPlayer(item, index)">
		    <view class="musiclist-index">{{index+1}}</view>
		    <view class="musiclist-info">
		      <view class="musiclist-name">
		        {{item.name}}
		        <text class="musiclist-alia">{{item.alia.length==0?"":item.alia[0]}}</text>
		      </view>
		      <view class="musiclist-singer">{{item.ar[0].name}} - {{item.al.name}}</view>
		    </view>
		  </view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			musiclistData: {
				type: Array
			}
		},
		data() {
			return {
			};
		},
		methods: {
			jumpPlayer(info, index) {
				this.$emit("goPlayer", info, index)
			}
		}
	}
</script>

<style lang="scss" scoped>
.musiclist-box {
	width: 100%;
	.musiclist-container {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		padding: 14rpx 20rpx;
		.musiclist-index{
			width: 80rpx;
			color: #888;
			font-size: 34rpx;
		}
		
		.musiclist-info{
			flex-grow: 1;
			.musiclist-name{
				font-size: 34rpx;
				font-weight: 500;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 18rpx;
				.musiclist-alia{
					color: #333;
					margin-left: 6rpx;
				}
			}
			
			.musiclist-singer{
				font-size: 24rpx;
				color: #888;
			}
		}
	}
}
</style>

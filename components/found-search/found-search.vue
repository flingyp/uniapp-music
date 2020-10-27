<template>
	<view class="container">
	  <view>
		  <i class="iconfont icon-fabu fabu" @tap="dumpfabu"></i>
	  </view>
	  <i class="iconfont icon-sousuo find"></i>
	  <input class="bar" placeholder="请输入关键字" placeholder-class="in-bar" @input="get_search_content"></input>
	  <button class="search" @tap="go_search">搜索</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search_content: ""
			};
		},
		methods: {
			dumpfabu() {
				this.$emit('gofabu')
			},
			get_search_content(e) {
				this.search_content = e.detail.value
			}, 
			go_search() {
				if(this.search_content === "" || this.search_content.trim() === "") {
					uni.showToast({
						title: "请输入想要搜索的内容",
						icon: "none"
					})
					return false
				} else {
					this.$emit('goSearch', this.search_content)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  align-items: center;
  margin-left: 15rpx;
  margin-top: 20rpx;
  margin-right: 15rpx;
  position: relative;
}

.bar {
  flex: 1;
  height: 68rpx;
  font-size: 28rpx;
  border-radius: 50px;
  background-color: #f5f5f5;
  padding-left: 60rpx;
  margin-right: 16rpx;
}

.search {
  min-height: 50rpx !important;
  box-sizing: border-box;
  background: #d43c33;
  color: #fff;
  font-size: 24rpx;
}

.in-bar{
  color: #999;
}

.find{
  position: absolute;
  top: 50%;
  transform: translate(70rpx, -40%);
  color: #9f9f9f;
}

.fabu {
	font-size: 36rpx;
	margin-right: 10rpx;
}
</style>

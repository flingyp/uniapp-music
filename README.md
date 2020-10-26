# UniApp音乐

之前使用过 微信小程序 配合 云开发 实现过微信的音乐小程序。

- [项目地址](https://github.com/flingyp/wechatmusic) 


这是第一次使用 uniapp 来开发音乐类的项目，So 记录一下。

- [uniapp文档](https://uniapp.dcloud.io/)


项目实现进度： 

1. 首页页面index (用于展示轮播图、 各类歌单)

2. 歌单页面playlist_detail (在index点击一个歌单会进入具体的歌曲信息)

3. 播放器页面player (从歌单页面进入后，点击一首歌曲会进入播放器页面进行歌曲的播放)  目前实现了播放器页面， 具体歌曲播放、上一首、下一首还没有实现。 添加了[自定义导航栏组件](https://ext.dcloud.net.cn/plugin?id=974)

4. 自己写的播放器出现无法实现推动条拖动功能，卡死在这了。 最后只能使用网友封装好的插件 [地址如下](https://ext.dcloud.net.cn/plugin?id=238#detail)。 
   - 测试后 在H5 可以实现暂停、播放、下一首、上一首、拖动的功能。
   - 在小程序测试会出现刚刚播放歌曲时 左右两边歌曲的时间都是 00:00的情况， 多点击几次暂停播放按钮才会正常。

5. 因为自己不知道写什么样子的注册登录页面所以了使用成品的注册登录模块。在原有的基础上修改了下样式，在注册页面添加了用户名一行[注册登录插件](https://ext.dcloud.net.cn/plugin?id=96#detail)

6. 写一个获取验证码的模拟云函数 auth-code。 确定注册流程的需求
```
1. 在输入验证码前时 保证输入用户名和手机号才可以输入验证码。

2. 点击注册判断 验证码的输入框是否和 获取到的验证码一致。
```

7. 使用 [uni-id官方插件](https://uniapp.dcloud.io/uniCloud/uni-id)来实现 注册 登录等功能 

- 初始 uni-id： [快速上手](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e5%bf%ab%e9%80%9f%e4%b8%8a%e6%89%8b)

- 使用注册、登录 api 实现用户注册功能、登录功能

8. 我的页面 退出登录清除本地用户信息及token缓存。 

9. 我的页面点击头像 设置用户头像（1. 将头像上传到云存储中 2. 通过 uni-id 的设置头像 API，将图片的地址存储在云数据库中 进行中。。。）
- 注意： 在使用 uni-id的API时是需要传入 token的， 在云函数的 event获取传入的token， token字段名自己来定义。 event里面默认有个字段 叫uniIdToken: "" 但是它始终都是为空的。 传入字段时 不要用uniIdToken字段名。
- 因为官方的示例，我在这个坑待了一个多小时。官方默认的是 event.uniIdToken

```js
const uniID = require('uni-id')
exports.main = async function(event,context) {
    const payload = await uniID.checkToken(event.uniIdToken)
    return payload
}
```

10. 简单的实现了修改用户名称的功能

11. 实现发现、发表动态静态页面

12. 实现发布动态功能到云数据库和云存储中

13. 本地token不存在、过期的逻辑处理、动态内容的渲染


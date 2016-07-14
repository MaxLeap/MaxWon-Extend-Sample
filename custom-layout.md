# MaxWon 自定义布局使用指南
## 主要内容
[Maxwon](http://www.maxwon.cn) 提供自定义布局功能,可以在 Maxwon 网站上通过**拖拽**或**代码**方式自定义布局,本文介绍了使用**代码**方式自定义布局的方法.

## 阅读者
我们假定你具有一些前端的技术基础,你至少应该了解:

* HTML 语法
* CSS 语法


## 如何自定义 
### 步骤一  制作一个 hello World 页面
登录 Maxwon 网站 => 制作应用 => 编辑布局 => 设置布局 => 选择最后的"自定义布局" => 选择"代码式"
填入"hello world"  

![hello world](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/custom_layout/hello_world.png)  

点击生成 App,下载并安装生成的 App, 打开,可以看到"hello world"  

![hello world](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/custom_layout/hello_world_in_mobile.png)

这样一个简单的 hello world 页面就生成了.

### 步骤二  链接到 MaxWon 内置模块

上一步我们生成了一个 hello world 页面,这一步我们来添加链接到 Maxwon App 的内置模块.  
为了方便大家使用, 我们保留了 html 语法, 使用一些**特定的 url 地址**来指向 **App/H5 内置模块**,如

```
<a href="https://www.maxwon.cn/product">商品</a>
```

这个 A 标签在 App/H5 中被点击时,并不会打开 ```https://www.maxwon.cn/product``` 这个页面,而是会打开 **商品** 这个模块:

![hello world](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/custom_layout/product_in_mobile.png)

类似的链接共有:

```
<a href="https://www.maxwon.cn/order">xxx</a> 跳转到 订单
<a href="https://www.maxwon.cn/shop">xxx</a> 跳转到 门店
<a href="https://www.maxwon.cn/product">xxx</a> 跳转到 商品
<a href="https://www.maxwon.cn/forum">xxx</a> 跳转到 论坛
<a href="https://www.maxwon.cn/gamble">xxx</a> 跳转到 一元夺宝
<a href="https://www.maxwon.cn/member">xxx</a> 跳转到 会员
<a href="https://www.maxwon.cn/reservation">xxx</a> 跳转到 预定
<a href="https://www.maxwon.cn/article">xxx</a> 跳转到 文章
<a href="https://www.maxwon.cn/coupon">xxx</a> 跳转到 优惠券
(其中的 xxx 为 A 标签的显示名称,可随意填写)
```

除了以上链接之外,对于其他链接,App 中会以 webview 的方式打开.如  

```
<a href="https://www.baidu.com">百度</a>
```

会通过 webview 打开百度首页.  

#### 动手尝试

我们把如下代码贴到第一步的输入框里,确认,并生成新的 App.


```
<a href="https://www.maxwon.cn/order">订单</a>
<br />
<a href="https://www.maxwon.cn/shop">门店</a>
<br />
<a href="https://www.maxwon.cn/product">商品</a>
<br />
<a href="https://www.maxwon.cn/forum">论坛</a>
<br />
<a href="https://www.maxwon.cn/gamble">一元夺宝</a>
<br />
<a href="https://www.maxwon.cn/member">会员</a>
<br />
<a href="https://www.maxwon.cn/reservation">预定</a>
<br />
<a href="https://www.maxwon.cn/article">文章</a>
<br />
<a href="https://www.maxwon.cn/coupon">优惠券</a>
<br />
<a href="https://www.baidu.com">百度</a>
```

![hello world](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/custom_layout/links.png)

下载 App 后打开,查看首页:

![hello world](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/custom_layout/links_in_mobile.png)

点击 "商品", 检查是否打开了 **商品** 模块,而不是跳转到其他网页.

![hello world](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/custom_layout/product_in_mobile.png)

点击 "百度",查看是否打开了百度首页.

![hello world](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/custom_layout/baidu_in_mobile.png)

这样,我们已经完成了导航的基础功能.

### 步骤三  添加样式,自定义图标
这一步,我们添加一些自定义的样式和图标/图片,让这个页面看起来更加好看一些.  
像上一步一样,我们把如下代码贴到第一步的输入框里,确认,并生成新的 App.  

```
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>MaxWon</title>
    <style>
        .header{
            margin-top: 50px;
            margin-bottom: 50px;
        }
        .logo {
            display: block;
            height: 55px;
            width: 175px;
            margin: 0 auto;
        }

        #module-list {
            margin-top: 5px;
            padding-bottom: 5px;
            text-align: left
        }

        #module-list li, #module-list a {
            display: inline-block
        }

        #module-list a,
        #module-list a:link,
        #module-list a:visited,
        #module-list a:active
        {
            padding: 0 10px;
            text-decoration:none;
        }

        #module-list li {
            width: 30%;
            text-align: center
        }

        #module-list div {
            width: 42px;
            height: 42px;
            border-radius: 21px;
            margin: 0 auto;
            background-image: url("data:image/png;base64,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");
            background-repeat: no-repeat; 
            background-position: center center; 
        }

        #module-list p {
            height: 18px;
            line-height: 18px;
            font-size: 14px;
            margin: 3px 0 8px
        }

        #module-list .icon-reservation {
            background-color: #ffa868
        }

        #module-list .icon-shop {
            background-color: #6f99de
        }

        #module-list .icon-member {
            background-color: #93a4b3
        }

        #module-list .icon-gamble {
            background-color: #ff6b70
        }

        #module-list .icon-forum {
            background-color: #ff6fbf
        }

        #module-list .icon-order {
            background-color: #b493db
        }

        #module-list .icon-article {
            background-color: #70d0a1
        }

        #module-list .icon-product {
            background-color: #75c5e6
        }

        #module-list .icon-coupon {
            background-color: #b1cf6a
        }

    </style>
</head>

<body>
    <div class="header" >
        <a class="logo" href="https://www.baidu.com/">
            <img src="https://m.baidu.com/static/index/plus/plus_logo.png" width="175" height="55" alt="">
        </a>
    </div>
    <ul id="module-list" class="expand">
        <li>
            <a href="https://www.maxwon.cn/order" >
                <div class="icon-order"></div>
                <p>订单</p>
            </a>
        </li>
        <li>
            <a href="https://www.maxwon.cn/shop" >
                <div class="icon-shop"></div>
                <p>门店</p>
            </a>
        </li>
        <li>
            <a href="https://www.maxwon.cn/forum" >
                <div class="icon-forum"></div>
                <p>论坛</p>
            </a>
        </li>
        <li>
            <a href="https://www.maxwon.cn/gamble" >
                <div class="icon-gamble"></div>
                <p>一元夺宝</p>
            </a>
        </li>
        <li>
            <a href="https://www.maxwon.cn/member" >
                <div class="icon-member"></div>
                <p>会员</p>
            </a>
        </li>

        <li>
            <a href="https://www.maxwon.cn/reservation" >
                <div class="icon-reservation"></div>
                <p>预定</p>
            </a>
        </li>
        <li>
            <a href="https://www.maxwon.cn/article" >
                <div class="icon-article"></div>
                <p>文章</p>
            </a>
        </li>
        <li>
            <a href="https://www.maxwon.cn/coupon" >
                <div class="icon-coupon"></div>
                <p>优惠券</p>
            </a>
        </li>
        <li>
            <a href="https://www.maxwon.cn/product" >
                <div class="icon-product"></div>
                <p>商品</p>
            </a>
        </li>
    </ul>
</body>

</html>
```

这一次,我们增加了一些自定义的样式和图片.

注意:  

1. 我们使用了2种形式的图片,logo 使用在线形式, icon 使用 base64 进行编码(Maxwon 生成的 App 会在本地缓存此页面,使用 base64编码并写在 html 中可以在用户无网络的情况下也能照常使用).  
2. 由于是一个较完整的示例,我们补全了 html,body 等标签,成为一个标准的 html 页面.

同样的,我们在 Maxwon 的管理界面中填入我们的代码,并生成新的 App.下载 App 后打开,查看效果:

![](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/custom_layout/module_list_in_mobile.png)

至此,我们已经完成了一个较为完整的自定义布局.   
当然,由于 App 采用标准的 WebView 进行渲染,你可以尽情的展开你的想象力,写出更加炫酷的页面! 

### 高级话题

编码时,你可能需要考虑以下问题:

* 是否需要适配不同尺寸的屏幕.
* 是否需要支持 Retina.
* 是否需要考虑 iOS/Android WebView 的兼容性和性能.
* 图片尽量使用 base64 编码并写在 html 中,这样打开速度快,且离线时也能用. 

不过这些问题依赖特定场景,如果你是一个经验丰富的前端工程师,相信这些都可以轻松搞定.     
但如果你想了解更多关于前端的知识,请猛戳这里: [http://html5ify.com/fks](http://html5ify.com/fks)
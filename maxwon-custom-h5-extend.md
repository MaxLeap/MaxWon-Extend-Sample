# 真旺云自定义 H5 模块示例

## 概述
本文主要讲述如何实现 MaxWon 自定义 H5 模块的相关功能.  
此 demo 实现了获取会员信息,修改会员昵称的功能, 并介绍了多平台开发的一些注意事项.  

### 主要效果

#### Native

1. 扫描 Maxwon 生成的 iOS/Android 二维码, 安装并打开应用, 并找到 h5 扩展的菜单.  
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/native/1.png" alt="menu" width="600">

2. 点击此菜单,打开扩展页面. 此处的导航由客户端提供.由于未登录,提示登录.  
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/native/0621.login.png" alt="menu" width="600">

3. 点击登录,跳转到 Maxwon 的登陆页面.  
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/native/3.png" alt="menu" width="600">

4. 登录完成后,显示用户的信息.  
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/native/0621.setting.png" alt="menu" width="600">

5. 在输入框中输入新的昵称,点击修改按钮,可以修改会员昵称,查看效果. 
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/native/0621.setting2.png" alt="menu" width="600">

6. 点击设置,跳转到 Maxwon 的用户设置页面. 在此页面点击返回也可正常返回到扩展页面.  
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/native/6.png" alt="menu" width="600">

#### Web
1. 扫描 Maxwon 生成的微官网/移动官网二维码,打开 h5 版网站, 并找到 h5 扩展的菜单.  
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/web/1.png" alt="menu" width="600">

2. 点击此菜单,打开扩展页面. 点击返回可返回上一页(此处的导航由 h5 页面自行提供). 由于未登录,提示登录.  
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/web/0621.login.png" alt="menu" width="600">

3. 点击登录,跳转到 Maxwon 的登陆页面.  
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/web/3.png" alt="menu" width="600">

4. 登录完成后,自动回到我们的扩展页面.  
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/web/0621.setting.png" alt="menu" width="600">

5. 修改用户名,查看效果.   
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/web/0621.setting2.png" alt="menu" width="600">

6. 点击设置,跳转到 Maxwon 的用户设置页面. 在此页面点击返回也可正常返回到扩展页面.  
<img src="https://publicfiles.maxleap.cn/h5_extend_demo/web/0621.setting.png" alt="menu" width="600">

## 功能实现

### 1、获取用户身份信息

通过 js 获取地址栏中的 query string 信息,拿到当前用户的身份信息及 App 信息, 访问 Maxwon API 时需要用到.  
这些信息包括: maxleap_appid, maxleap_userid, maxleap_sessiontoken(key值不区分大小写. 如果用户没有在 App 中登录, maxleap_userid, maxleap_sessiontoken为空,此时可以在 h5 中引导用户登录).  

```
// 工具函数, 获取地址栏参数
function getQueryString(name) {
    console.log("getQueryString window.location:",window.location);
    name = name.toLowerCase();
    var search = window.location.search.toLowerCase();
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i');
    var result = search.substr(1).match(reg);
    console.log("====> getQueryString name:",name, "result:",result);

    if (result != null) {
        return unescape(result[2]);
    }
    return null;
}

var appId = getQueryString("maxleap_appid");
var sessionToken = getQueryString("maxleap_sessiontoken");
var memId = getQueryString("maxleap_userid");
    
```

### 2、调用API
根据上面拿到的信息,调用真旺云开放的 API 获取会员信息,并修改页面上相应字段的值.

```
//获取会员信息并渲染页面
function getMemberInfoAndRender() {
    var url = baseUrl+"mems/" + memId;
    $.ajax({
        url, 
        success:function (res) {
            if (res) {
                nicknameTag.innerText = res.nickName;
                currentScoreTag.innerText = res.integral;
                currentBalanceTag.innerText = (res.balance / 100).toFixed(2);
            }
        }, 
        error:function (error) {
            console.log("getMemberInfoAndRender error:",error);
            alert("获取会员信息失败");
        }
    });
}
```

### 3、绑定事件

绑定"修改"按钮事件,更新会员信息:

```
//绑定修改点击事件
function bindChangeScoreEvent() {
    changeScoreTag.addEventListener("click", function (e) {
        var value = nicknameInput.value.trim();

        if (value !== '') {
            updateMemberInfo({
                nickName: value
            });
            nicknameInput.value = '';
        }
    });
}

//更新会员信息
function updateMemberInfo(info) {
    $.ajax({
        url: baseUrl+"mems/" + memId, 
        data: JSON.stringify(info),
        type:"PUT",
        success:function (res) {
            alert("修改成功");
            nicknameTag.innerText = info.nickName;
        }, 
        error:function (error) {
           alert("修改失败");
        }
    });
}
```

## 多平台开发

主要介绍在多平台下(iOS/Android/h5)下开发的一些常见区别及解决方案.

### 方案一
跨平台开发, 使用 js 封装不同平台差异.

#### 平台区分
可从 url 的 query string 中的 platform 字段获得当前的平台信息(ios/android/空).  

```
var platform = getQueryString("platform"); // 获取地址栏参数, 此函数实现见上文: 功能实现=>1、获取用户身份信息
var isNative = platform =="ios" || platform =="android";  // 是否在客户端中
```

#### 导航
导航主要包括 navbar,tabbar,drawer 等.  
native: 导航由 MaxWon 客户端提供.   
h5: 导航由 扩展页面自行提供.   
通过平台决定是否显示导航.    

```
// 设置 NavBar
function setNavBar() {
    if(isNative){
        $("#navbar").hide();   // 客户端隐藏 navbar
    }else{
        $("#navbar").show();   // h5 显示 navbar
    }
}
```  

#### 自定义链接
native: 详见[客户端自定义协议](../zdyxy/zdyxy.html);    
h5: 详见[H5 链接地址](../zdyxy/h5-url.html);  
通过 js 根据平台决定跳转到哪个地址.  

html:

```
<a id="settings" href="javascript:void(0)" onClick="settingsOnClick()">设置</a>
```
js:

```
// 点击设置, 跳转到 Settings 页面
function settingsOnClick() {
    if(isNative){
        window.location.href = "https://www.maxwon.cn/member/setting";  // 客户端自定义协议
    }else{
        window.location.href = "https://580d7be47e2c79000745a9d7.h5.maxwonapps.com/maxh5/member/settings";  //h5 url
    }
}

```

### 方案二
客户端 和 h5 独立开发, 代码不共享. 不同平台差异见方案一.    
参考 [demo](https://github.com/MaxLeap/MaxWon-Extend-Sample/blob/master/code-h5-demo/html/): `index.html` 用在 h5 中, `native.html` 没有提供导航栏,用在客户端中.    
  
## 部署

### 方式一
如果你只有 html 文件，可以将 html 文件上传到 Maxwon。
登陆 Maxwon 管理界面 -> 编辑组件 -> 自定义模块 -> 上传 html 文件。
<img src="https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-0280530b-032d-41f2-84f1-9ae4f12a65cd.png" alt="" width="800">

### 方式二
#### 1、登录 MaxLeap 配置域名
使用真旺云账号登录 [MaxLeap](https://maxleap.cn/s/web/zh_cn/login.html) 平台，进入【开发中心 -> 云容器 -> 设置】,配置云容器二级域名并保存.  

关于什么是云容器,[猛戳这里](https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-d7c8c233-fb8f-467e-9663-f90666830592.png).

<img src="https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-77865707-a754-4c62-a558-4bf603f8dda3.png" alt="配置云容器主机子域名" width="800">

这个域名地址需要记下来,后面需要填到 Maxwon 的管理页面中.   

#### 2、上传ZIP包
由于我们的 demo 比较简单,因此使用静态网站的模式.  
将我们写好的 index.html 放到一个 html 目录下,并将这个 html 目录压缩成 html.zip.  
进入[【开发中心 -> 云容器 -> 版本】](https://maxleap.cn/p/console/cloudcontainer#versionstatus),点击【上传静态网站】按钮,输入应用名称、版本,上传 html.zip,点击保存按钮.

<img src="https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-f53e51f8-851e-4aa5-b750-0790bef89367.png" alt="上传静态网站代码" width="800">

<img src="https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-3cd3676d-a116-4696-a1e0-e57bfb4ccce8.png" alt="上传静态网站代码2" width="800">

#### 3、部署应用

成功上传后,点击【操作 -> 部署】按钮,部署网站  

<img src="https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-168e6486-373e-4c9c-b3ce-281d1b4ad246.png" alt="部署云容器实例" width="800">

#### 4、查看部署状态
成功部署后,当前版本状态将变成 running,此时网站可以开始正常访问.  

<img src="https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-9ba1bb7c-5eea-49c4-8769-d4fd095d9388.png" alt="部署成功" width="800">

根据步骤一 中配置的二级域名,测试是否能正常访问刚刚部署好的网站.

<img src="https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-7f252a65-d5e0-46e4-967a-a82a3e1b02f3.png" alt="测试是否能访问" width="800">

有关云容器的详细教程,请参考MaxLeap云容器[文档](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudContainer.html#云容器-使用流程-静态网站项目).

#### 自定义模块配置
##### 1、配置自定义URL
登录 [真旺云](https://www.maxwon.cn/website/login)，添加自定义模块,并在 url 地址 一栏中填写刚才的域名 + 你的 html 文件地址.  
由于默认访问 index.html,我这里就直接填域名了.  

<img src="https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-82baa0eb-7217-4387-a945-b4edf836e657.jpeg" alt="填写自定义模块地址" width="800">

##### 2、生成应用
点击一键生成,开始构建生成应用:  

<img src="https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-adf838d3-26ab-46d5-a3ce-cbfdb36f27e3.jpeg" alt="构建应用" width="800">

##### 3、手机查看效果
在手机上安装刚刚生成的 App,找到并打开刚刚自定义的模块,就能够看到 h5 页面的效果了:

<img src="https://cscdn.maxleap.cn/2.0/download/NTdiNDE3NzMyYTYyYTYwMDA3N2M5NDVj/zcf-d0d5e32d-3646-4218-9753-6c17b340ee40.jpg" alt="手机效果" width="600">


## 样例完整 Demo
[H5 完整项目](https://github.com/MaxLeap/MaxWon-Extend-Sample/blob/master/code-h5-demo/html/)
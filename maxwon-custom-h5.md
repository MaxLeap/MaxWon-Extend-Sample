# MaxWon自定义H5模块示例

## 概述
本文主要讲述如何利用 MaxLeap 的云容器功能,实现 MaxWon 自定义H5模块的相关功能.  
此 demo 实现了获取会员信息,并修改会员昵称的功能.  

**主要效果如下所示:**

在生成的 App 中点击自定义模块,会在 App 打开一个 h5 页面, 此页面会显示出当前会员的相关信息：

![app 导航](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/entry.jpg)
	
![已登录获取信息](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/home.jpg)

在输入框中输入新的昵称,点击修改按钮,可以修改会员昵称:
	
![修改](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/change_nickname.jpg)  

修改成功:

![修改成功](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/change_nickname_success.jpg)

## h5 页面实现
### STEP 1:

通过 js 获取地址栏中的 query string 信息,拿到当前用户的身份信息及 App 信息, 访问 Maxwon API 时需要用到.  
这些信息包括: maxleap_appid,maxleap_apikey, maxleap_userid, maxleap_sessiontoken(key值不区分大小写. 如果用户没有在 App 中登录, maxleap_userid, maxleap_sessiontoken为空,此时可以在 h5 中引导用户登录).  

```
//获取地址栏信息
function getUrlQueryInfo() {
    var appId, appKey, sessionToken, memId;

    appId = getQueryString("appId");
    appKey = getQueryString("apiKey");
    sessionToken = getQueryString("sessionToken");
    memId = getQueryString("userid");

    return {
        appId: appId,
        appKey: appKey,
        sessionToken: sessionToken,
        memId: memId
    };

    //获取地址栏参数
    function getQueryString(name) {
        var prefix = 'maxleap_';
        name = prefix+name;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i');
        var result = window.location.search.substr(1).match(reg);
        if (result != null) {
            return unescape(result[2]);
        }
        return null;
    }
}
```
	
### STEP 2:
根据上面拿到的信息,调用 MaxWon API 获取会员信息,并修改页面上相应字段的值.

```
//获取会员信息并渲染页面
function getMemberInfoAndRender() {
    ajaxGet(baseUrl+"mems/" + memberId, {}, function (res) {
        if (res) {
            nicknameTag.innerText = res.nickName;
            currentScoreTag.innerText = res.integral;
            currentBalanceTag.innerText = (res.balance / 100).toFixed(2);
        }
    }, function (err) {
        alert("获取会员信息失败");
    });
}
```
	
### STEP 3:

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

    ajaxPut(baseUrl+"mems/" + memberId, info, function () {
        alert("修改成功");
        nicknameTag.innerText = info.nickName;
    }, function () {
        alert("修改失败");
    })
}
```

## 部署

### STEP 1:
注册并登录 MaxLeap 平台,创建一个应用,进入【应用设置 -> 系统设置】,配置云容器二级域名并保存.  

关于什么是云容器,[猛戳这里](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/domain_config.png). 

![配置云容器主机子域名](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container1.png)

这个域名地址需要记下来,后面需要填到 Maxwon 的管理页面中.   

### STEP 2:
由于我们的 demo 比较简单,因此使用静态网站的模式.  
将我们写好的 index.html 放到一个 html 目录下,并将这个 html 目录压缩成 html.zip.  
进入[【开发中心 -> 云容器 -> 版本】](https://maxleap.cn/p/console/cloudcontainer#versionstatus),点击【上传静态网站】按钮,输入应用名称、版本,上传 html.zip,点击保存按钮.
   
![上传静态网站代码](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container2.png)

![上传静态网站代码2](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container3.png)

### STEP 3:

成功上传后,点击【操作 -> 部署】按钮,部署网站  

![部署云容器实例](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container4.png)

### STEP 4:
成功部署后,当前版本状态将变成 running,此时网站可以开始正常访问.  

![部署成功](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container6.png)

根据 step1 中配置的二级域名,测试是否能正常访问刚刚部署好的网站.

![测试是否能访问](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/test.png)	
	
有关云容器的详细教程,请参考MaxLeap云容器[文档](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudContainer.html#云容器-使用流程-静态网站项目).

## MaxWon 自定义模块配置
### STEP 1: 
登录MaxWon,添加自定义模块,并在 url 地址 一栏中填写刚才的域名 + 你的 html 文件地址.  
由于默认访问 index.html,我这里就直接填域名了.  

![填写自定义模块地址](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/custom_url.jpeg)

### STEP 2:
点击一键生成,开始构建生成应用:  

![构建应用](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/build_app.jpeg)

### STEP 3:
在手机上安装刚刚生成的 App,找到并打开刚刚自定义的模块,就能够看到 h5 页面的效果了:

![手机效果](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/home.jpg)

## 调试
1. 你可以在自己的笔记本上或者某个自己的服务器上托管一个网站, 获得可访问的url(可以是内网或者外网url).  
2. 像之前一样,在 maxwon 的管理界面中新增扩展,填入此url.生成新的 app.
3. 现在你就可以通过此 app 来进行调试了.

## 高级
云容器不仅仅只能部署静态网站,你也可以使用 [PHP](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudContainer.html#云容器-使用流程-php-项目) 或 [Java](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudContainer.html#云容器-使用流程-java-tomcat-项目) + [自定义 Mysql 数据源](https://maxleap.cn/s/web/zh_cn/guide/usermanual/datasource.html)完成任何复杂的功能.  
如果你不想写后端代码,可以试试 [Cloud Data](https://maxleap.cn/s/web/zh_cn/guide/usermanual/clouddata.html).  
你也可以使用 [Cloud Code](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudcode.html) 生成 Api.  
当然, 如果你愿意,你可以把你的服务器部署在任何你想要的地方,不必限制在 MaxLeap. MaxWon 需要的只是一个指定的 url 即可.
# 真旺云自定义控制台模块示例

## 主要内容
本文主要讲述如何实现 [Maxwon](http://www.maxwon.cn) 自定义控制台模块的相关功能.
此 demo 实现了获取账号SessionToken的功能, 并介绍了多平台开发的一些注意事项.

## 主要效果
1. 进入自定义模块后，显示**APP**的名称 <br/>
![](https://publicfiles.maxleap.cn/console_extend_demo/6.png)

2. 修改**APP**的名称 <br/>
![](https://publicfiles.maxleap.cn/console_extend_demo/7.png)

## 开发步骤
1. 准备一个目录，**目录名称必须为html**，把所有的网站文件拷贝到目录 html 下面，主页文件名必须为 `index.html`。
2. 在你的html中，通过 js 获取地址栏中的URL参数,拿到当前用户的鉴权信息, 访问 Maxwon API 时需要用到。
    这些信息包括:maxwon_appid,maxwon_sessiontoken。
    ```javascript
    // 工具函数, 获取地址栏参数
    var parseQueryString = function (str) {
        var reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
        var result = {};
        var match;
        var key;
        var value;
        while (match = reg.exec(str)) {
            key = match[2];
            value = match[3] || "";
            result[key] = decodeURIComponent(value);
        }
        return result;
    };
    var info = parseQueryString(window.location.href);

    // 获取 maxwon_appid
    var maxwon_appid = info.maxwon_appid;

    // 获取 maxwon_appid
    var maxwon_sessiontoken = info.maxwon_sessiontoken;

    var url = baseUrl + "/apps/" + maxwon_appid

    //获取会员信息并渲染页面
    function getMemberInfoAndRender() {
        $.ajax({
            url: url,
            method: "GET",
            headers: {
                "X-ML-AppId": maxwon_appid,
                "X-ML-Session-Token": maxwon_sessiontoken,
            },
            success: function (res) {
                var appName = res.ama.appInfo.appName;
                $("#appName").val(appName);
            }
        });
    }
    getMemberInfoAndRender();

    //绑定事件
    $("#edit").click(function () {
        var newName = $("#appName").val();
        $.ajax({
            url: url,
            method: "PUT",
            data:JSON.stringify({
                "name": newName,
                "ama": { "appInfo": { "appName": newName } }
            }),
            dataType: "json",
            contentType: "application/json",
            headers: {
                "X-ML-AppId": maxwon_appid,
                "X-ML-Session-Token": maxwon_sessiontoken,
            },
            success: function (res) {
                alert("修改成功！")
            }
        });
    });
    ```
2. 用 zip 工具打包, **包名必须是 html.zip**。
    ```shell
    zip -r html.zip html
    ```
3. 准备自己的 nginx config 文件，调整相应设置。你也可以不修改提供的 nginx conf 文件，本模板是一个可以直接使用的，使用默认目录的 nginx 配置。注意如果要修改 nginx conf 文件，则模板里面系统注释部分不要更改，否则容器不能启动。
4. 登陆 [Maxwon](http://www.maxwon.cn) ，进入研发工具=>云容器=>版本=>上传=>上传静态网站，上传你的html.zip文件，之后保存 <br/>
    ![](https://publicfiles.maxleap.cn/console_extend_demo/1.png)
5. 进入研发工具=>云容器=>版本，从列表中找到刚刚上传的应用，点击对应条目最右边的部署按钮 <br/>
    ![](https://publicfiles.maxleap.cn/console_extend_demo/2.png)
6. 新增一个实例，点击确定按钮后开始部署 <br/>
    ![](https://publicfiles.maxleap.cn/console_extend_demo/3.png)
7. 新增一个实例，点击确定按钮后开始部署
8. 进入研发工具=>云容器=>设置，展开 **云容器主机子域名**，获得访问域名 <br/>
    ![](https://publicfiles.maxleap.cn/console_extend_demo/4.png)
9. 进入配置平台=>配置管理端=>配置菜单项，找到你准备要添加到的菜单，点击编辑=>创建子菜单，填入刚刚得到的访问域名（**必须是`https`协议**），点击确定后保存菜单 <br/>
    ![](https://publicfiles.maxleap.cn/console_extend_demo/5.png)
10. 现在进入到应用管理界面，即可看到已经创建好的自定义菜单 <br/>
    ![](https://publicfiles.maxleap.cn/console_extend_demo/6.png)


## 样例完整 Demo
[H5 完整项目](https://github.com/MaxLeap/MaxWon-Extend-Sample/blob/master/code-console-demo/html/)
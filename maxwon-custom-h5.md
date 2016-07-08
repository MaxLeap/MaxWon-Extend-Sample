# MaxWon自定义H5模块示例

## 概述
本文主要讲述如何利用 MaxLeap 的云容器功能，实现 MaxWon 自定义H5模块的相关功能.  
此 demo 实现了获取会员信息，并修改会员昵称的功能。  
主要效果如下所示：  

	在生成的 App 中点击自定义模块，会在 App 打开一个 h5 页面, 此页面会显示出当前会员的相关信息：
	
![已登录获取信息](http://7xs3q2.com1.z0.glb.clouddn.com/F411B6D56A3C73BAAD3B0E04C650BA53.jpg)

	点击修改按钮，可以修改会员昵称:
	
![修改]	(http://7xs3q2.com1.z0.glb.clouddn.com/F9FE14DD07026773BB0F189CA0C619FF.jpg)  

![修改成功](http://7xs3q2.com1.z0.glb.clouddn.com/92CAD1846AFAD9846758A7E18C7B6A65.jpg)

## h5 页面实现
### STEP 1:
	首先通过 js 获取地址栏中的query string信息，拿到包含 
	maxleap_appid，maxleap_apikey，maxleap_sessiontoken,maxleap_userid的信息（实际中，key值不区分大小写）

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
	根据提取信息，判断用户是否登录，如果已登录，则尝试调用 MaxWon 的 Api 获取会员信息，并渲染相关字段。

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
	绑定"修改"按钮事件,更新会员信息
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
你需要一个 MaxLeap 的账号,并且已创建好 App. 如果你还没有,[点击这里快速开始](https://maxleap.cn/s/web/zh_cn/guide/usermanual/maxLeapquickstart.html).  
登录 MaxLeap 网站,访问 [设置页面](https://maxleap.cn/p/console/settings#system),
然后配置你想要的云容器主机子域名。这个地址需要记下来,后面需要填到 Maxwon 的管理页面中. 
关于什么是云容器,[猛戳这里](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudContainer.html). 

![配置云容器主机子域名](http://7xs3q2.com1.z0.glb.clouddn.com/B74B03BF-5FA3-4EC3-A8FF-6A9DA77F93BB.png)
	
### STEP 2:
由于我们的 demo 比较简单,因此使用静态网站的模式.

访问[云容器页面](https://maxleap.cn/p/console/cloudcontainer#versionstatus/upload-cloud-container-site),并点击上传静态网站代码 
   
![上传静态网站代码](http://7xs3q2.com1.z0.glb.clouddn.com/C078DB80-CF68-4612-8133-F8536D2A9C40.png)

### STEP 3:
部署将云容器。  

![部署云容器实例](http://7xs3q2.com1.z0.glb.clouddn.com/54332046-B2EA-41DC-9652-340985AD2C18.png)
### STEP 4:
测试下是否能正常访问刚刚部署好的云服务器。  

![测试是否能访问](http://7xs3q2.com1.z0.glb.clouddn.com/lALOWDErDc0C4s0Bnw_415_738.png)	
	
有关云容器的详细教程，请参考MaxLeap云容器[文档](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudContainer.html#云容器-使用流程-静态网站项目)

## MaxWon 自定义模块配置
### STEP 1:
登录MaxWon，添加自定义模块，并填写上面部署好的刚才拿到的域名+你的 html 文件地址。由于默认访问 index.html,我这里就直接填域名了.  

![填写自定义模块地址](http://7xs3q2.com1.z0.glb.clouddn.com/97B77EFC-C381-4C9D-8D2D-11D37317F38E.png)

### STEP 2:
点击一键生成，开始构建生成应用  

![构建应用](http://7xs3q2.com1.z0.glb.clouddn.com/31D2182E-BEB9-424D-8E74-4E45A404DD48.png)


### STEP 3:
手机端测试  

![修改成功](http://7xs3q2.com1.z0.glb.clouddn.com/lALOV74r7M0HgM0EOA_1080_1920.png)

##测试完毕，一切正常
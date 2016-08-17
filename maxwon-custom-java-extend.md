# MaxWon自定义PHP模块示例

## 概述
本文主要讲述如何利用 MaxLeap 的云容器功能,实现 MaxWon 自定义PHP模块的相关功能.  
此 demo 实现了获取会员信息,并修改会员昵称的功能.  本demo基于springmvc,运行在tomcat容器中.

**主要效果如下所示:**

在生成的 App 中点击自定义模块,会在 App 打开一个 PHP 页面, 此页面会显示出当前会员的相关信息：

![app 导航](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/maxwon_java_demo.png)
	
![已登录获取信息](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/maxwon_java_demo2.png)

在输入框中输入新的昵称,点击修改按钮,可以修改会员昵称,修改成功:

![修改成功](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/maxwon_java_demo3.png)

## JAVA 页面实现
### STEP 1:

通过container控制层获取请求参数。
这些信息包括: maxleap_appid, maxleap_userid, maxleap_sessiontoken(如果用户没有在 App 中登录, maxleap_userid, maxleap_sessiontoken为空,则引导用户登录).  

```
  import org.slf4j.Logger;
  import org.slf4j.LoggerFactory;
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.ModelMap;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RequestMethod;
  
  @Controller
  public class MainController {
  
    private Logger LOGGER = LoggerFactory.getLogger(MainController.class);
  
    // 首页
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(String maxleap_appid,String maxleap_userid,String maxleap_sessiontoken,ModelMap modelMap) {
      LOGGER.info("maxleap_appid:"+maxleap_appid + " maxleap_userid:" + maxleap_userid + " maxleap_sessiontoken:"+maxleap_sessiontoken);
      if (maxleap_appid == null || maxleap_userid == null || maxleap_sessiontoken == null) {
        return "error";
      }
      modelMap.addAttribute("appId",maxleap_appid);
      modelMap.addAttribute("userId",maxleap_userid);
      modelMap.addAttribute("sessionToken",maxleap_sessiontoken);
      return "index";
    }
  
  }
```
	
### STEP 2:
登录成功后返回到index页面,JS调用 MaxWon API 获取会员信息,并在页面上显示.

```
  <%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>会员信息</title>
  
    <head>
      <link rel="stylesheet" href="css/semantic.min.css">
      <script src="js/jquery.min.js"></script>
      <script src="js/semantic.min.js"></script>
      <script src="js/common.js"></script>
      <script src="js/index.js"></script>
    </head>
  </head>
  <body>
  
  <div class="ui top attached tabular menu">
    <a class="active item">会员信息 </a>
    <input id="appId" type="hidden" name="appId" value="${appId}">
    <input id="userId" type="hidden" name="userId" value="${userId}">
    <input id="sessionToken" type="hidden" name="sessionToken" value="${sessionToken}">
  </div>
  <div class="ui bottom attached segment">
    头像:<img id="icon" src="" width="50px" height="50px"><br/>
    用户昵称:<label id="nickName"></label><br/>
    联系电话:<label id="phone"></label><br/>
    会员等级:<label id="level"></label><br/>
    当前积分:<label id="integral"></label><br/>
    余额:<label id="balance"></label><br/>
    <div class="ui action input">
      <input id="newNickName" type="text" placeholder="请输入新的用户昵称">
      <div type="submit" class="ui button nickNameSubmit">修改</div>
    </div>
  </div>
  
  </body>
  </html>
```
	
### STEP 3:

index页面初始化,ajax调用 MaxWon API 获取会员信息,并在页面上显示,绑定"修改"按钮事件,更新会员信息:

```
$(function(){
    var appId = $("#appId").val();
    var userId = $("#userId").val();
    var sessionToken = $("#sessionToken").val();

    task({
        //url : 'http://apiuat.maxapps.cn/1.0/mems/' + userId,
        url : 'http://wonapi.maxleap.cn/1.0/mems/' + userId,
        header: {
            'X-ML-AppId':appId,
            'X-ML-Session-Token':sessionToken
        },
        success:function(data){
            $('#icon').attr("src",data.icon);
            $('#nickName').html(data.nickName);
            $('#integral').html(data.integral);
            $('#phone').html(data.phone);
            $('#level').html(data.level.name);
            $('#balance').html(data.balance/100 + "元");
            console.log(data);
        }
    });

    $('.nickNameSubmit').click(function(e){
        var target = $(e.currentTarget);
        var nickName = $('#newNickName').val();
        target.addClass("loading disabled");
        task({
            //url : 'http://apiuat.maxapps.cn/1.0/mems/' + userId,
            url : 'http://wonapi.maxleap.cn/1.0/mems/' + userId,
            method: 'PUT',
            header: {
                'X-ML-AppId':appId,
                'X-ML-Session-Token':sessionToken
            },
            params: {
                nickName : nickName
            },
            success:function(){
                target.removeClass("loading disabled");
                $('#nickName').html(nickName);
                $('#newNickName').val('');
            }
        });
    });
});
```

## 部署

### STEP 1:
注册并登录 MaxLeap 平台,创建一个应用,进入【应用设置 -> 系统设置】,配置云容器二级域名并保存.  

关于什么是云容器,[猛戳这里](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/domain_config.png). 

![配置云容器主机子域名](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container1.png)

这个域名地址需要记下来,后面需要填到 Maxwon 的管理页面中.   

### STEP 2:
因为我们用的是一个Java Web项目,所以使用Java项目模式来部署云容器,将项目打包成war包,如java-extend.war

进入[【开发中心 -> 云容器 -> 版本】](https://maxleap.cn/p/console/cloudcontainer#versionstatus),点击【上传Java项目】按钮,输入应用名称、版本,上传 java-extend.war,点击保存按钮.
   
![上传Java代码](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container8.png)

![上传Java代码2](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container9.png)

### STEP 3:

成功上传后,点击【操作 -> 部署】按钮,部署网站  

![部署云容器实例](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container10.png)

### STEP 4:
成功部署后,当前版本状态将变成 running,此时网站可以开始正常访问.  

![部署成功](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container6.png)

根据 step1 中配置的二级域名,测试是否能正常访问刚刚部署好的网站.

## MaxWon 自定义模块配置
### STEP 1: 
登录MaxWon,添加自定义模块,并在 url 地址 一栏中填写刚才的域名 + 你的 html 文件地址.  
由于默认访问 index.html,我这里就直接填域名了.  

![填写自定义模块地址](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/custom_url.jpeg)

### STEP 2:
点击一键生成,开始构建生成应用:  

![构建应用](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/build_app.jpeg)

### STEP 3:
在手机上安装刚刚生成的 App,找到并打开刚刚自定义的模块,就能够看到 PHP 页面的效果了:

![手机效果](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/maxwon_java_demo2.png)

## 调试
1. 你可以在自己的笔记本上或者某个自己的服务器上托管一个网站, 获得可访问的url(可以是内网或者外网url,如 http://192.168.1.100:3000/index.php).  
2. 像之前一样,在 maxwon 的管理界面中新增扩展(或更新原来的扩展配置),填入此url.生成新的 app.
3. 现在你就可以通过此 app 来进行调试了.

## 高级
云容器不仅仅只能部署静态网站,你也可以使用 [PHP](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudContainer.html#云容器-使用流程-php-项目) 或 [Java](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudContainer.html#云容器-使用流程-java-tomcat-项目) + [自定义 Mysql 数据源](https://maxleap.cn/s/web/zh_cn/guide/usermanual/datasource.html)完成任何复杂的功能.  
如果你不想写后端代码,可以试试 [Cloud Data](https://maxleap.cn/s/web/zh_cn/guide/usermanual/clouddata.html).  
你也可以使用 [Cloud Code](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudcode.html) 生成 Api.  
当然, 如果你愿意,你可以把你的服务器部署在任何你想要的地方,不必限制在 MaxLeap. MaxWon 需要的只是一个指定的 url 即可.
# MaxWon自定义PHP模块示例

## 概述
本文主要讲述如何利用 MaxLeap 的云容器功能,实现 MaxWon 自定义PHP模块的相关功能.  
此 demo 实现了获取会员信息,并修改会员昵称的功能.  本demo基于PHP5.6但不仅限于PHP5.6

**主要效果如下所示:**

在生成的 App 中点击自定义模块,会在 App 打开一个 PHP 页面, 此页面会显示出当前会员的相关信息：

![app 导航](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/entry.jpg)
	
![已登录获取信息](https://cscdn.maxleap.cn/2.0/download/NTdhYmU1YTU0NmUwZmIwMDA3NDdhNzY5/zcf-c74408b1-7e3c-4683-b4e4-bf26a15de858.png)

在输入框中输入新的昵称,点击修改按钮,可以修改会员昵称:
	
![修改](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/change_nickname.jpg)  

修改成功:

![修改成功](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/change_nickname_success.jpg)

## PHP 页面实现
### STEP 1:

通过$_SERVER["REQUEST_URI"]获取REQUEST参数。
这些信息包括: maxleap_appid, maxleap_userid, maxleap_sessiontoken(key值不区分大小写. 如果用户没有在 App 中登录, maxleap_userid, maxleap_sessiontoken为空,此时可以在 php应用中引导用户登录).  

```
<?php
function parseUrlParam($query){
    $queryArr = explode('&', $query);
    $params = array();
    if($queryArr[0] !== ''){
        foreach( $queryArr as $param ){
            list($name, $value) = explode('=', $param);
            $params[urldecode($name)] = urldecode($value);
        }       
    }
    return $params;
}
function getUrlParam($cparam, $url = ''){
    $parse_url = $url === '' ? parse_url($_SERVER["REQUEST_URI"]) : parse_url($url);
    $query = isset($parse_url['query']) ? $parse_url['query'] : '';
    $params = parseUrlParam($query);
    return isset($params[$cparam]) ? $params[$cparam] : '';
}
$result['maxleap_appid'] = getUrlParam("maxleap_appid");
$result['maxleap_userid'] = getUrlParam("maxleap_userid");
$result['maxleap_sessiontoken'] = getUrlParam('maxleap_sessiontoken');
?>
```
	
### STEP 2:
根据上面拿到的信息,调用 MaxWon API 获取会员信息,并在页面上显示.

```
//获取会员信息并渲染页面
<?php
$ch = curl_init();
$baseurl =  isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http' ;
$baseurl = $baseurl . "://wonapi.maxleap.cn/1.0/mems/".$result['maxleap_userid'];
$header = array(
   'x-ml-appid: '.$result['maxleap_appid'] ,
   'X-ML-Session-Token: '.$result['maxleap_sessiontoken']
);
curl_setopt($ch, CURLOPT_URL, $baseurl );
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);

$output = curl_exec($ch);
curl_close($ch);
$app_reply = json_decode($output);

$nickname = isset($app_reply->nickName) ? $app_reply->nickName : "";
$integral = isset($app_reply->integral) ? $app_reply->integral : 0;
?>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-4"><h1>用户昵称<h/1></div>
		<div class="col-sm-4" id="nickname_show"><h1><?php echo $nickname; ?></h1></div>
		<div class="col-sm-4"></div>
	</div>
</div>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-4"><h1>当前积分<h1></div>
		<div class="col-sm-4"><h1><?php echo $integral; ?></h1></div>
		<div class="col-sm-4"></div>
	</div>
</div>
<form class="form-inline">
	<div class=" form-group">
		<input type="text" class="form-control input-lg" id="nickname_change" placeholder="填写要修改的昵称">
		<input type="hidden" id="memid" value="<?php echo $result['maxleap_userid'];?>">
		<input type="hidden" id="appid" value="<?php echo $result['maxleap_appid'];?>">
		<input type="hidden" id="apptoken" value="<?php echo $result['maxleap_sessiontoken'];?>">
	</div>
	<button type="button" class="btn btn-default" id="nkname_modify">modify</button>
</form>
```
	
### STEP 3:

绑定"修改"按钮事件,更新会员信息:

```
//ajax提交数据并修改页面昵称显示
<script type="text/javascript">
$(document).ready(function(){
	$('.refresh').click(function(){
    		location.reload();
	});
	$("#nkname_modify").click(function(){
		var jbody = {
			"nickName":$("#nickname_change").val()
		};
		var json_put = JSON.stringify(jbody);
		$.ajax({
			type: 'PUT',
			url: "http://wonapi.maxleap.cn/1.0/mems/1",
			data:json_put,
			headers: {
			     "x-ml-appid":$("#appid").val(),
			     "X-ML-Session-Token": $("#apptoken").val(),
			     "Content-Type": "application/json"
			},
			success: function () {
				$('#nickname_show').text($("#nickname_change").val());
	                }
		});
	});
});
</script>
```

## 部署

### STEP 1:
注册并登录 MaxLeap 平台,创建一个应用,进入【应用设置 -> 系统设置】,配置云容器二级域名并保存.  

关于什么是云容器,[猛戳这里](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/domain_config.png). 

![配置云容器主机子域名](https://static.maxleap.cn/s/web/zh_cn/images/LAS-Docs-Images/web_container1.png)

这个域名地址需要记下来,后面需要填到 Maxwon 的管理页面中.   

### STEP 2:
使用PHP模块
将我们写好的 index.php 放到一个 html 目录下,并将这个 html 目录压缩成 html.zip.  
进入[【开发中心 -> 云容器 -> 版本】](https://maxleap.cn/p/console/cloudcontainer#versionstatus),点击【上传静态网站】按钮,输入应用名称、版本,上传 html.zip,点击保存按钮.
   
![上传静态网站代码](https://cscdn.maxleap.cn/2.0/download/NTdhYmU1YTU0NmUwZmIwMDA3NDdhNzY5/zcf-e67d9b2a-7d83-4d1f-ac9d-0959dc86ff52.png)

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
在手机上安装刚刚生成的 App,找到并打开刚刚自定义的模块,就能够看到 PHP 页面的效果了:

![手机效果](https://raw.githubusercontent.com/huangciyin/notes/master/Web/maxwon/images/home.jpg)

## 调试
1. 你可以在自己的笔记本上或者某个自己的服务器上托管一个网站, 获得可访问的url(可以是内网或者外网url,如 http://192.168.1.100:3000/index.php).  
2. 像之前一样,在 maxwon 的管理界面中新增扩展(或更新原来的扩展配置),填入此url.生成新的 app.
3. 现在你就可以通过此 app 来进行调试了.

## 高级
云容器不仅仅只能部署静态网站,你也可以使用 [PHP](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudContainer.html#云容器-使用流程-php-项目) 或 [Java](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudContainer.html#云容器-使用流程-java-tomcat-项目) + [自定义 Mysql 数据源](https://maxleap.cn/s/web/zh_cn/guide/usermanual/datasource.html)完成任何复杂的功能.  
如果你不想写后端代码,可以试试 [Cloud Data](https://maxleap.cn/s/web/zh_cn/guide/usermanual/clouddata.html).  
你也可以使用 [Cloud Code](https://maxleap.cn/s/web/zh_cn/guide/usermanual/cloudcode.html) 生成 Api.  
当然, 如果你愿意,你可以把你的服务器部署在任何你想要的地方,不必限制在 MaxLeap. MaxWon 需要的只是一个指定的 url 即可.
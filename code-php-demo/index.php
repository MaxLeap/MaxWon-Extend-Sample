<html>
<title>MaxWon api Demo</title>
<head>
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<script src="http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<style type="text/css">
body {
    font-size: 300%;
}
.btn {
    font-size: 120%;
}
.input {
    hight:50px;
}
</style>
</head>
<body>
<h1>MaxWon api Demo</h1>
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

$result['maxleap_appid'] = "57a05f4aa5ff7f0001db65dd";
$result['maxleap_userid'] = "1";
$result['maxleap_sessiontoken'] = "MrUyhfkFFxa598T4vZP9mlfA9hO6bE1Utz7Wf0SRy-A";

//print_r($result);

$ch = curl_init();
$baseurl =  isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http' ;
$baseurl = $baseurl . "://wonapi.maxleap.cn/1.0/mems/".$result['maxleap_userid'];
//echo $baseurl;
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
//$nickname = $app_reply['nickName'];
//print_r($app_reply);
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
<button class="btn btn-default refresh" type="submit">Button</button>
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
</body>
</html>

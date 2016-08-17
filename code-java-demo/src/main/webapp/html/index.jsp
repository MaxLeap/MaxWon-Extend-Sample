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

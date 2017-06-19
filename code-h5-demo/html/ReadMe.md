# Demo

# 启动
方式一, 启动静态文件服务器, 浏览器打开 url.    
方式二, 直接用浏览器打开 index.html 文件.

## url query string:
hide_navbar: 隐藏导航条, 默认不隐藏.
maxleap_appid: app 的 Id
maxleap_userid: 用户 Id
maxleap_sessiontoken: 用户的鉴权令牌

## 模拟 h5, 显示导航条
```
http://127.0.0.1:8000/index.html
```
带用户信息:
```
http://127.0.0.1:8000/index.html?maxleap_appid=580d7be47e2c79000745a9d7&maxleap_userid=6&maxleap_sessiontoken=FXSt__ovRv9y2NKup2Pd8PmnidiEsEd1h48n9le-Ii0
```

## 模拟 native, 不显示导航条
```
http://127.0.0.1:8000/index.html?hide_navbar=true
```
带用户信息:
```
http://127.0.0.1:8000/index.html?hide_navbar=true&maxleap_appid=580d7be47e2c79000745a9d7&maxleap_userid=6&maxleap_sessiontoken=FXSt__ovRv9y2NKup2Pd8PmnidiEsEd1h48n9le-Ii0
```


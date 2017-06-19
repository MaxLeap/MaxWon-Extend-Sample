var platform = getQueryString("platform");
var isNative = platform =="ios" || platform =="android";  // 是否在客户端中

// 获取地址栏参数
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

// 设置 NavBar
function setNavBar() {
    var return_uri = window.location.href;
    if(isNative){
        $("#navbar").hide();   
    }else{
        $("#navbar").show(); 
    }
}

function setLoginReturnUri() {
    if(isNative){
        $("#login-pannel a").attr("href","https://www.maxwon.cn/member");
    }else{
        $("#login-pannel a").attr("href","http://h5custom.maxwon.cn/maxh5/login?return_uri="+window.location.href);    
    }
}

// 点击设置, 跳转到 Settings 页面
function settingsOnClick() {
    if(isNative){
        window.location.href = "https://www.maxwon.cn/member/setting";
    }else{
        window.location.href = "http://h5custom.maxwon.cn/maxh5/member/settings";
    }
}


function bootstrap() {
    var baseUrl = "https://wonapi.maxleap.cn/1.0/"
    var nicknameTag = document.getElementById("nickname");
    var currentScoreTag = document.getElementById("current-score");
    var currentBalanceTag = document.getElementById("current-balance");
    var changeScoreTag = document.getElementById("changeScore");
    var nicknameInput = document.getElementById("nickname-input");

    setNavBar();

    var appId = getQueryString("maxleap_appid");
    var sessionToken = getQueryString("maxleap_sessiontoken");
    var memId = getQueryString("maxleap_userid");

    if (memId && sessionToken) {
        // 已经登录
        $("#login-pannel").hide();
        $("#profile-pannel").show();
        $.ajaxSetup({
            contentType : 'application/json',
            headers:{
                "Content-Type": "application/json",
                "X-ML-AppId":appId,
                "X-ML-Session-Token":sessionToken,
            }
        });
        bindChangeScoreEvent();
        getMemberInfoAndRender();
    }else{
        // 未登录
        $("#login-pannel").show();
        $("#profile-pannel").hide();
        setLoginReturnUri(platform);
    }

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
}

$(document).ready(function(){
  bootstrap();
});
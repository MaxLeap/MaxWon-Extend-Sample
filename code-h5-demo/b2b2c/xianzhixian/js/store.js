var AppId = "58d9d4a863e54d0008b00de6";
var APIKey = "dkpoek04UV9SN1dCZXpjOFhSQVE0dw";

var myScroll;
function loaded () {
    myScroll = new IScroll('#wrapper', {
        probeType: 3,
        scrollbars: true,
        //disableMouse: true,
        //disablePointer: true,
        //mouseWheel: true,
        tap: true,
        //click: true,
        shrinkScrollbars: 'clip',
        fadeScrollbars: true
        //freeScroll: true
    });
    myScroll.on('scroll', updatePosition);
    //myScroll.on('scrollEnd', enddatePosition);
    myScroll.on('scrollStart', startPosition);
}

function startPosition(){bStartPos=true;}

function updatePosition () {
    if (this.y > 0 && (this.pointY > window.innerHeight - 1) && bStartPos) {
        bStartPos=false;
        this.scrollTo(0, 0, 300);
    }
}

$(document).ready(function () {
	loaded();
    //获取店铺
	$.ajax({
		 type: 'get',
		 url: "https://wonapi.maxleap.cn/1.0/mall?where=%7B%22enable%22%3Atrue%7D&skip=0&order=+beginTime,id",
		 dataType: "json", 
		 headers : {'X-ML-AppId':AppId,'X-ML-APIKey':APIKey},
		 success: function(data){

		 	// 根据数据拼接 html 字符串
			var strSml = "<table border='0' cellspacing='0' cellpadding='0' width='100%'><tbody>";
			$.each(data.results,function(index, item){
				var id="btnDP_"+item.objectId;
				strSml+="<tr><td><table width='100%' border='0' cellspacing='0' cellpadding='0' id='"+id+"'><tbody><tr><td width='120' height='120' rowspan='2' align='center' valign='middle'><img src='"+item.logo+"' class='imglogo'></td><td><p><span style='font-size:13px'>店铺名称</span><br><span style='font-size:18px'>"+item.name+"</span></p></td><td width='57' rowspan='2' align='left' valign='top' style='padding-top:22px'>"+(item.type==1?"<div class='inputzy'>自营</div>":"")+"</td></tr><tr><td><p style='font-size:13px; color:#999'>"+item.businessScope+"</p></td></tr></tbody></table></td></tr>";
				strSml+="<tr><td height='17' class='bj_2'></td></tr>";
			});
			// 添加到 dom
			document.getElementById("wrapper").getElementsByTagName("div")[0].innerHTML = strSml+"</tbody></table>";

			// 绑定 tap 事件, 根据自定义协议进行跳转
			data.results.map(function (item) {
                var id="btnDP_"+item.objectId;
                document.getElementById(id).tig =  "https://www.maxwon.cn/mall/"+item.objectId;
                document.getElementById(id).addEventListener('tap', function () {
                    window.location.href=this.tig;
                }, false);
			});

			myScroll.refresh();
		}
	});
});
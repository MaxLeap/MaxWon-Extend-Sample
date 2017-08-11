$(function() {

	//通过获取queryString来判断运行环境隐藏导航栏
	var runType = Utils.getQueryStringByName('platform') || null;
	if (runType) {
		$('#header').hide();
	}

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://wonapi.maxleap.cn/1.0/mall",
		"method": "GET",
		"headers": {
			"X-ML-APIKey": "eDhNSWZfaUNIV0RyYmdTcnlpY3dSdw",
			"X-ML-AppId": "56b17529169e7d000197d2d7"
		}
	}

	var tpl = document.getElementById('tpl').innerHTML; //读取模版

	//页面内容越小越好，所以这里使用了一个非常小巧的模板来渲染
	// 如何使用：http://www.layui.com/laytpl/

	$.ajax(settings).done(function(response) {

		var render = laytpl(tpl).render({
			list: response.results
		});
		document.getElementById('view-tpl').innerHTML = render;
	});


	//链接link事件
	$(document).on('click', 'a', Utils.toLink.bind(Utils));

	//你的代码？ 。。。

})
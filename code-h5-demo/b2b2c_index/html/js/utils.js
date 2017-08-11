let Utils = {
	//获取QueryString的数组

	getQueryString: function() {

		var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));

		if (result == null) {

			return "";

		}

		for (var i = 0; i < result.length; i++) {

			result[i] = result[i].substring(1);

		}

		return result;

	},

	//根据QueryString参数名称获取值

	getQueryStringByName: function(name) {

		var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));

		if (result == null || result.length < 1) {

			return "";

		}

		return result[1];

	},

	//根据QueryString参数索引获取值

	getQueryStringByIndex: function(index) {

		if (index == null) {

			return "";

		}

		var queryStringList = getQueryString();

		if (index >= queryStringList.length) {

			return "";

		}

		var result = queryStringList[index];

		var startIndex = result.indexOf("=") + 1;

		result = result.substring(startIndex);

		return result;

	},
	toLink: function function_name(e) {
		let a = e.currentTarget;
		if (!this.getQueryStringByName('platform')) {
			location.href = $(a).attr('h5-href') || '#';
			e.preventDefault();
		}
	}
}
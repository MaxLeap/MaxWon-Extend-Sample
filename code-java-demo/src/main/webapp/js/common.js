function task(options) {
    var method = options.method || 'GET';
    var params = options.params;
    var url = options.url || '';
    var dataType = options.dataType || 'json';
    var contentType = options.contentType || 'application/json';
    var timeout = options.timeout || 20000;
    var header = $.extend({}, {}, options.header);
    var data = (method.toUpperCase() == 'GET') ? params : JSON.stringify(params);
    $.ajax({
        url: url,
        type: method,
        dataType: dataType,
        contentType: contentType,
        data: data,
        timeout: timeout,
        headers: header
    }).then(function (data) {
        if (options.success) {
            options.success(data);
        }
    }, function (e) {
        console.log(e);
        if (options.error) {
            options.error(e);
        }

    });
}
$(function(){
    var appId = $("#appId").val();
    var userId = $("#userId").val();
    var sessionToken = $("#sessionToken").val();

    task({
        url : 'https://wonapi.maxleap.cn/1.0/mems/' + userId,
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

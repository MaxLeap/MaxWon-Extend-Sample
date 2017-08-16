var AppId = "58d9d4a863e54d0008b00de6";
var APIKey = "dkpoek04UV9SN1dCZXpjOFhSQVE0dw";

var winw;
var myScroll;
var position;
var pullDownFlag, pullUpFlag;
var pullDown, pullUp;
var myScrollBanner;
var pageB = 0;
var myScrollPrdQG;
var bStartPos = false;
var tts = 0;

function loaded() {
    $("#wrapper").css("background", "#6C6C6C");
    pullDown = document.getElementById('scrollerPullDown');
    pullUp = document.getElementById('scrollerPullUp');
    myScroll = new IScroll('#wrapper', {
        probeType: 3,
        scrollbars: true,
        tap: true,
        shrinkScrollbars: 'clip',
        fadeScrollbars: true
    });
    myScroll.on('scroll', updatePosition);
    myScroll.on('scrollEnd', endPosition);
    myScroll.on('scrollStart', startPosition);
    toContent()
}

function loadedBanner(i) {
    myScrollBanner = new IScroll('#wrapper_b', {
        scrollX: true,
        scrollY: false,
        momentum: false,
        tap: 'tapbanner',
        snap: true,
        snapSpeed: 400,
        keyBindings: true,
        indicators: {
            el: document.getElementById('indicator'),
            resize: false
        }
    });
    myScrollBanner.on("scrollEnd", msBEnd);
    myScrollBanner.on("beforeScrollStart", msBStart);
    var tTimeB = setTimeout(msBGo, 5000);

    function msBGo() {
        if (pageB >= (i - 1)) {
            myScrollBanner.goToPage(0, 0, 300)
        } else {
            myScrollBanner.next()
        }
    }

    function msBEnd() {
        pageB = myScrollBanner.currentPage.pageX;
        tTimeB = setTimeout(msBGo, 5000)
    }

    function msBStart() {
        clearTimeout(tTimeB)
    }
}

function loadedQG() {
    myScrollPrdQG = new IScroll('#wrapper_PrdQG', {
        eventPassthrough: true,
        tap: 'tapQG',
        scrollX: true,
        scrollY: false,
        preventDefault: false
    })
}

function loadedDP() {
    myScrollPrdQG = new IScroll('#wrapper_dp', {
        eventPassthrough: true,
        tap: 'tapDP',
        scrollX: true,
        scrollY: false,
        preventDefault: false
    })
}

function toIscrollRefresh() {
    tts++;
    myScroll.refresh();
    if (tts == 8) {
       setTimeout(toIscrollRefresh, 5000)
    }
}

document.addEventListener('touchmove', function (e) {
    e.preventDefault()
}, isPassive() ? {
    capture: false,
    passive: false
} : false);

function startPosition() {
    bStartPos = true
}

function updatePosition() {
    if ((this.y >> 0) > 80) {
        $(pullDown).fadeIn();
        pullDownFlag = 1
    }
    if ((this.y >> 0) < (this.maxScrollY - 40)) {
        pullUpFlag = 1
    }
    if (this.y < -800) {
        $("#gotop").fadeIn()
    }
    if (this.y > -800) {
        $("#gotop").hide()
    }
    if (this.y > 0 && (this.pointY > window.innerHeight - 1) && bStartPos) {
        bStartPos = false;
        this.scrollTo(0, 0, 300)
    }
}

function endPosition() {
    if (pullDownFlag == 1) {
        pullDownFlag = 0;
        $(pullDown).hide();
        toContent()
    }
    if (pullUpFlag == 1) {
        pullUpFlag = 0
    }
}

function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true
            }
        }))
    } catch (e) {
    }
    return supportsPassiveOption
}

$(document).ready(function () {
    winw = $(window).width();
    document.getElementById("header").getElementsByTagName("td")[0].innerHTML = "<a href='https://www.maxwon.cn/mall/platform/category/58'><img width=100% src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABaCAMAAABe4oJTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZTk2MjBkOC1hODhkLTFmNDItODFlYi01NWFlYThiYzMxY2UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkZFMDhCQ0IyNENBMTFFNzgyMjg4OTlDMjQyMzMzOTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkZFMDhCQ0EyNENBMTFFNzgyMjg4OTlDMjQyMzMzOTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplYTkyNGRjZS03MTRlLTNiNDItYTkyZS00YzY2ZjZjYzJiMzIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplOGQ4OTFmOS0yMGM2LTExZTctYmM4ZC1lNTQyZTY5YjAwNjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7PPNVjAAAAMFBMVEWQkJBvb29VYwATFQa0tLSzzgDU1NRBQzbv7++bswDe/wCHnAB2iADA3QDQ8AD///8g8nG9AAAAEHRSTlP///////////////////8A4CNdGQAABFdJREFUeNrsmW13mzAMhSW/CbBx//+/3ZVMCND2xG299gucnWxLujxIlq6uGL39wUU39Ibe0Bt6Q2/oDb2h/wk6/QGUPYffhlJZZse/Cw1+XZbqL28KLn+4enLRD00Sl2WJcn7TxRjXWpf91ywDoYlnMJd6zi/l5XJlGgfdmFfqe6gbl97GnItSy4GqKV9zcXbZbflhhURiTG7hHqgKLUQhBVzu/Zn/AEpat2CGVkygpu0Tj79JOqS60BjoxK4q0yODbHj8makVb302kaXBTyOgRJKrRafZk9CodbYqhVwgoSTtwierjBAHzmVtNavZQ1Tka2sN3jIac47t6myY19CGiJ6tZmZWYdI0VstjO+IvNsxrqH5tzZpBzWsRYWIuiJyet3S4/BDtRQJX5/Ico35/jXHO6JzsrWsmLV6kN1ubrp0N8xqaZPUX2VlxsK1GQ9HSIfQpGlWjnnnMlCGk9nxyz2+2OpLH3fV2aZ84ALrOpnXRAk3HA3/Uq6XDT8OglB3qJwQuVsh0Km0NTkVQpaGvS/ugE1kjmDoc4mwi6DC4rY5qb5d+ZYibGFZ//AcKxQS3vtEXl8ZCExdlCl2b+HBV/zYUmmy2XWzDFdqb3X6oneflp3mOxW2GzJXsp7FQDapemZhsQo9jTETdVrwXGtzq34t5evvW1V1ItNVQgMvl6eNaC2OhLF7CnudrxaTthJ82ZgRU62gT2aP07XdkA93BT/A4GWQ1eujCgIGi0ufgTZ6phDpCFSYZN9rMCM0umxl0GJ2q6+pNdvVRRYYAswl+GAVFCBHSUMJJC7amTDYFShsGuLE0Bqr2ICN1/jRXt4HSXHjh5lJBlTG+V/NW1ChlgVdRb4jJWppHYj1IiKMJc5k/Uq1vQafdfEWBD/Xqrs3o0kRSbLaw5BZu0+dP2vgrUN4N0lwKLK4ZbV1KhXNLt7PfseA8tsmXwv/yc/VemjjvzvYMcW8DLe+r3Eb1P41Uv8apSRI+QwuJWlIkQJ0/lH+C+Rf98cI/PVO4zJkBjSI5qjnLa5xRSNAeWatGX+CMfYyZqdSIYnvNfAmdPHBe9WD19khD+1HXNwRWnEYPjygmWM2QyoDq5ZJjqxdgm83f9wdKNmWDD215y8MWqKcZ+cBwo4EgtxOZEtrxh5FQ53wLt+rL9uU6fBSvUiWTvo5ZoCTW7LR44aZhh+x4cbS87zLQehVKyCLCXsdMGSqevcUDFxbhw47npqeImFt2kxu3QIUpQOwQj8lh0R4JRwvqbQwtkhSdhy1QViDJoNXHg+BsfkKnmmWit446R5vFE+fi5bgltca0qSbJBsOwre2xhAbPoT2rOi5tmWd73VbFUW6wlYk91tZ81mc0ZpfaAj6dFuQR6a3H51OZT88jRIeBro9J6shVUf3sLv/r4dhw2oWC21Y5zr07cddjOnrWJDk6CTPr3srbLcjgre2T7SUc35q6N5v7P4Nu6A29oTf0ht7Qn1//BBgAMKIvMA5UEpcAAAAASUVORK5CYII='></a>";
    document.getElementById("header").getElementsByTagName("td")[1].innerHTML = "<a href='https://www.maxwon.cn/mall/search'><input class='textsearch' name='textsearch' type='text' value='点击搜索'></a>";
    document.getElementById("header").getElementsByTagName("td")[2].innerHTML = "<a href='https://www.maxwon.cn/mcart'><img width=100% src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABaCAYAAABpPHJhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZTk2MjBkOC1hODhkLTFmNDItODFlYi01NWFlYThiYzMxY2UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkQ4RDY1OUIyNENDMTFFN0I4RjFBNEM2MzRFODBBQTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkQ4RDY1OUEyNENDMTFFN0I4RjFBNEM2MzRFODBBQTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplYTkyNGRjZS03MTRlLTNiNDItYTkyZS00YzY2ZjZjYzJiMzIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplOGQ4OTFmOS0yMGM2LTExZTctYmM4ZC1lNTQyZTY5YjAwNjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7G38D9AAAETklEQVR42uydV2gUQRzG52IUW4w1YkQEFSMaUHyQYMGCCkoUbKCJD6Kg8VkRxZeIYh4UAmJDwQdbVIiC7UXESMCCCho7WFAQG5YoMYmm+P29ES57s0kw7u7M8X3wMczMHTPs73bazuzFmpubFZU6SuMlIFCKQCkCpQiUIlACpQiUIlCKQCkCJVCKQCkCpQiUIlACpQiUIlCqY0p3rcJPVGWk5Y9SU1qrW28Eq+CF8Bg4E34OF+J7NwnUrR/aYgT74P6erOHwMXgEgboDcw2C/a18ZBj7UHdg5iHY08bHLrIPdUelcCdD+mv4IVwFbydQN+7O8QjyPMmN8ArpNzEQCn0XO4F2THMNaTsA8ijnoW5qrCHtIOeh7WveshAsgCfpUWPPEIr9Bu+GT/nkD/TEv+PufEGgrYOUed1WPWHvHEEVJsMC6bYhr5cn/jnq65VmOUxZlnkAF0UEUxTTUJ1QusUwp+n5WzcLqnOXQDsGcwiC063AbJL+KoSqfIJ3wRUE2vHJeh9D+mW4BL4KN3CQ7UAfirszF8EiQ1YxRpAzNVTCdGhQtNyQdhIwtxCXm0CnG9I2EZW7QHM88Ue4O18SlbtAMz3xVz6fkycce/Votzkgf1XxJyUxAv1/+umTvhpeq4JdAszUzf08Ag1eI0MsK5dAg9elkMppCrGslF1YaI9kWbBQT3O6B1RGNXwAvkWg4ei4NpUCTS5FoARKOaZU2CQ2WAX38Lsefkug4SgDPgdPDbics7Acc/jFJjdYFYUAUzQfXso+NHhlhVjWIAINXqdCagZ/wOXsQ/9dTZ4fmt/iu6zeyB7dJXCXgOpSCx9R8TOeJvX1xOsINFnv4OyEeO4TVRnzOSdyS0W0LKcP92Z7kj+wyU3WfU9cdqfPsrCeBSr51FkVgSbrvCGtFHdEhi0V1NtMiw1ZF6KuW8y2/23Bxeqn4rsUeniyruv+8k3EVRwNn1HJz2Oln81B19BIoMlQNyPYZsiq0YOUCvh9yC2ZTF3m6Dmp6YDvMsA8wTvUDFSW8q7oUawLKgPMAs5DfYSLI/PLBYYBko2S3QwrubDQNtSPKn7q66SlVZSmTY5s5KOudbZUKubCn9mhCZ6NYAM8Q0W/pVJaD1mwLwHIO7Zdq5hL/04IsAMQTISHqvhhprDgysj1C/xMRtsAWW3rNbJ1UBTT04Ou8D1cwIaEvKi7Am9dZeFDXhHwFHk8wW2AKdODGyp+cluOwT9D2jhLW4wSPS++Br9DfB2BJktesTYhIS7NazkuVpplMOXI48aEOalMtXbq1wgQaIJM7/4Z9qe1s0t+xyPyCbSl6n3S6yyrZ41Pei2BttQhQ1pl1O//Meiwij+79f4Yywi0pdar+Mue5A6Q0a3sFlhk4cKHvNBYNo/9Pbv6WJphpD/ltIVK6TuUIlCKQAmUIlCKQCkCpQiUQCkCpQiUIlCKQAmUIlCKQCkCpQiUQCmn9FuAAQD/dv4YOoEpNAAAAABJRU5ErkJggg=='></a>";
    var s_t = "<div id='scrollerPullDown' style='background-color:#52a31f; display:none'></div>";
    var s_banner = "<div id='wrapper_b'><div><table border='0' cellpadding='0' cellspacing='0' style='line-height:0'><tr></tr></table></div></div><div id='indicator'><div id='dotty'></div></div>";
    var s_class = "<table class ='responsive-table' width='100%' height='215px' cellspacing='0' cellpadding='0' align='left' style='margin: 1px 0px 1px 0px; background-color:#fff'><tbody><tr><td id='smlBtn' style='padding-top:15px; padding-bottom:0px'></td></tr></tbody></table>";
    var s_prdQG = "<table class='title1'><tr><td>限时抢购</td></tr></table><div id='wrapper_PrdQG'><div></div></div>";
    var s_banner2 = "<table width=100% border='0' cellspacing='0' cellpadding='0'><tr><td id='banner_center'></td></tr></table>";
    var s_mall = "<table class='title2' border='0' cellspacing='0' cellpadding='0'><tr><td style='padding-top:15px'>店铺推荐</td></tr></table><div id='wrapper_dp'><div></div></div>";
    var s_cms = "<table id='listCMS' width='100%' border='0' cellspacing='0' cellpadding='0'></table>";
    var s_prdTJ = "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td id='listPrdTJ' style='padding-bottom:6px'></td></tr></tbody></table>";
    var s_prdPT = "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td id='listPrdPT' style='padding-bottom:6px'></td></tr></tbody></table>";
    var s_b = "<div id='scrollerPullUp' style='background-color:#52a31f; display:none'></div>";
    document.getElementById("scroller").innerHTML = s_t + s_banner + s_class + s_prdQG + s_banner2 + s_mall + s_cms + s_prdTJ + s_prdPT + s_b;
    $("#wrapper_b").css({
        "width": winw + "px",
        "height": winw / 2 + "px"
    });
    loaded();
    $("#gotop").click(function () {
        myScroll.scrollTo(0, 0, 400)
    })
});

function toContent() {
    $.ajax({
        type: 'get',
        url: "https://wonapi.maxleap.cn/1.0/mall/banner/client?where=%7B%22status%22%3A1%2C%22type%22%3A1%7D",
        dataType: "json",
        headers: {
            'X-ML-AppId': AppId,
            'X-ML-APIKey': APIKey
        },
        success: function (data) {
            var strGD = "";
            var counter = 0;
            var arrID = new Array();
            var parsedJson = eval(data);
            $.each(parsedJson.sort(), function (index, item) {
                var id = "btnBanner" + counter;
                if (item.product) {
                    arrID.push(id + "||https://www.maxwon.cn/mall/product/" + item.product.id);
                    strGD += "<td id='" + id + "'><img width='100%' src='" + item.bannerImageUrl + "'></td>"
                }
                ;
                if (item.category) {
                    arrID.push(id + "||https://www.maxwon.cn/mall/category/" + item.category.id);
                    strGD += "<td id='" + id + "'><img width='100%' src='" + item.bannerImageUrl + "'></td>"
                }
                ;
                if (item.shop) {
                    arrID.push(id + "||https://www.maxwon.cn/mall/" + item.shop.id);
                    strGD += "<td id='" + id + "'><img width='100%' src='" + item.bannerImageUrl + "'></td>"
                }
                ;
                if (item.custom) {
                    arrID.push(id + "||" + item.custom.urlStr);
                    strGD += "<td id='" + id + "'><img width='100%' src='" + item.bannerImageUrl + "'></td>"
                }
                ;
                counter++
            });
            document.getElementById("wrapper_b").getElementsByTagName("tr")[0].innerHTML = strGD;
            for (x in arrID) {
                var spt = arrID[x].split("||");
                document.getElementById(spt[0]).tig = spt[1];
                document.getElementById(spt[0]).addEventListener('tapbanner', function () {
                    window.location.href = this.tig
                }, false)
            }
            $("#wrapper_b").children().css("width", parseInt(counter * winw) + "px");
            $("#wrapper_b").children().children("td").css("width", winw + "px");
            $("#indicator").css("width", winw + "px");
            $("#dotty").css("width", parseInt(winw / counter) + "px");
            loadedBanner(counter);
            toIscrollRefresh()
        }
    });
    var imgXgdWidth = 140;
    $.ajax({
        type: 'get',
        url: "https://wonapi.maxleap.cn/1.0/mall/quick/getQuick?where=%7B%22status%22%3A1%7D",
        dataType: "json",
        headers: {
            'X-ML-AppId': AppId,
            'X-ML-APIKey': APIKey
        },
        success: function (data) {
            var strSml = "";
            var arrID = new Array();
            var parsedJson = eval(data);
            $.each(parsedJson.sort(), function (index, item) {
                if (item.category) {
                    var id = "btnCategory_" + item.category.id;
                    arrID.push(id + "||https://www.maxwon.cn/mall/platform/category/" + item.category.id);
                    strSml += "<table class='tabImg' width='66%' cellspacing='0' cellpadding='0' align='left'><tbody><tr><td align='center' id='" + id + "'><img src='" + item.quickImageUrl + "' width='60%' alt='sample'></td></tr><tr><td class='txtLve1'>" + item.quickName + "</td></tr></tbody></table>"
                }
            });
            document.getElementById("smlBtn").innerHTML = strSml;
            for (x in arrID) {
                var spt = arrID[x].split("||");
                document.getElementById(spt[0]).tig = spt[1];
                document.getElementById(spt[0]).addEventListener('tap', function () {
                    window.location.href = this.tig
                }, false)
            }
            toIscrollRefresh()
        }
    });
    $.ajax({
        type: 'get',
        url: "https://wonapi.maxleap.cn/1.0/mallProducts/simplify/client?where=%7B%22valid%22%3Atrue%2C%22subscript%22%3A2%7D&skip=0&limit=150&order=+obviousSeq,id",
        dataType: "json",
        headers: {
            'X-ML-AppId': AppId,
            'X-ML-APIKey': APIKey
        },
        success: function (data) {
            var strSml = "<table border='0' cellspacing='0' cellpadding='0'><tbody><tr>";
            var arrID = new Array();
            var parsedJson = eval(data);
            $.each(parsedJson.results, function (index, item) {
                var priceOld = (item.originalPrice * 0.01).toFixed(2);
                var priceNow = (item.price * 0.01).toFixed(2);
                var t = Math.random();
                var tY = parseInt(t * 12);
                var tD = parseInt(t * 30);
                var tH = parseInt(t * 23);
                var tM = parseInt(t * 59);
                var b = Math.round(t);
                var s;
                if (b) {
                    s = "<td align='center' bgcolor='#eeeeee' style='font-size:10px'>开始时间<br>" + tY + "月" + tD + "日<br>" + tH + ":" + tM + ":" + "00</td>"
                } else {
                    s = "<td align='center' bgcolor='#ffc000' style='font-size:10px'>结束时间<br>" + tY + "月" + tD + "日<br>" + tH + ":" + tM + ":" + "00</td>"
                }
                var id = "btnPrdQG_" + item.id;
                arrID.push(id + "||https://www.maxwon.cn/mall/product/" + item.id);
                strSml += "<td><table width='" + imgXgdWidth + "' border='0' cellspacing='1' cellpadding='0'><tbody><tr><td height='" + imgXgdWidth + "' colspan='2'><img src='" + item.coverIcon + "' width='100%' alt='sample' id='" + id + "'></td></tr><tr><td class='txtQGPrdPrice'><strong>￥:" + priceNow + "</strong><br><del>" + (priceOld == priceNow ? "" : "￥:" + priceOld) + "</del></td>" + s + "</tr></tbody></table></td>"
            });
            document.getElementById("wrapper_PrdQG").getElementsByTagName("div")[0].innerHTML = strSml + "</tr></tbody></table>";
            for (x in arrID) {
                var spt = arrID[x].split("||");
                document.getElementById(spt[0]).tig = spt[1];
                document.getElementById(spt[0]).addEventListener('tapQG', function () {
                    window.location.href = this.tig
                }, false)
            }
            $("#wrapper_PrdQG").children().css("width", parseInt(imgXgdWidth * parsedJson.results.length) + "px");
            loadedQG();
            toIscrollRefresh();
        }
    });
    //banner
    $.ajax({
        type: 'get',
        url: "https://wonapi.maxleap.cn/1.0/mall/banner/client?where=%7B%22status%22%3A1%2C%22type%22%3A2%7D",
        dataType: "json",
        headers: {
            'X-ML-AppId': AppId,
            'X-ML-APIKey': APIKey
        },
        success: function (data) {
            var strGD = "";
            var url = "";
            console.log("banners:",data);
            // 遍历数据
            $.each(data.sort(), function (index, item) {
                strGD = "<img width='100%' src='" + item.bannerImageUrl + "'>";
                if (item.product) {
                    url = "https://www.maxwon.cn/mall/product/" + item.product.id
                }
                if (item.category) {
                    url = "https://www.maxwon.cn/mall/category/" + item.category.id
                }
                if (item.shop) {
                    url = "https://www.maxwon.cn/mall/" + item.shop.id
                }
                if (item.custom) {
                    url = item.custom.urlStr
                }
            });
            document.getElementById("banner_center").innerHTML = strGD;
            document.getElementById("banner_center").addEventListener('tap', function () {
                // 跳转到自定义协议
                window.location.href = url;
            }, false);

            toIscrollRefresh();
        }
    });
    var imgXdpWidth = 108;
    $.ajax({
        type: 'get',
        url: "https://wonapi.maxleap.cn/1.0/mall?where=%7B%22enable%22%3Atrue%7D&skip=0&order=+beginTime,id",
        dataType: "json",
        headers: {
            'X-ML-AppId': AppId,
            'X-ML-APIKey': APIKey
        },
        success: function (data) {
            var strSml = "<table border='0' cellspacing='0' cellpadding='0'><tbody><tr>";
            var arrID = new Array();
            var parsedJson = eval(data);
            $.each(parsedJson.results, function (index, item) {
                var id = "btnDP_" + item.objectId;
                arrID.push(id + "||https://www.maxwon.cn/mall/" + item.objectId);
                strSml += "<td><table width='" + imgXdpWidth + "' border='0' cellspacing='1' cellpadding='0'><tbody><tr><td height='" + imgXdpWidth + "' align='center'><img src='" + item.logo + "' width='80%' alt='sample' id='" + id + "'></td></tr><tr><td class='txtLve2'>" + item.name + "</td></tr></tbody></table></td>"
            });
            document.getElementById("wrapper_dp").getElementsByTagName("div")[0].innerHTML = strSml + "</tr></tbody></table>";
            for (x in arrID) {
                var spt = arrID[x].split("||");
                document.getElementById(spt[0]).tig = spt[1];
                document.getElementById(spt[0]).addEventListener('tapDP', function () {
                    window.location.href = this.tig
                }, false)
            }
            $("#wrapper_dp").children().css("width", parseInt(imgXdpWidth * parsedJson.results.length) + "px");
            loadedDP();
            toIscrollRefresh()
        }
    });
    $.ajax({
        type: 'get',
        url: "https://wonapi.maxleap.cn/1.0/cms?where=%7B%22valid%22%3Atrue%7D&skip=0&order=+id",
        dataType: "json",
        headers: {
            'X-ML-AppId': AppId,
            'X-ML-APIKey': APIKey
        },
        success: function (data) {
            var strSml = "<tbody>";
            var arrID = new Array();
            var parsedJson = eval(data);
            $.each(parsedJson.results, function (index, item) {
                var id = "btnWZ_" + item.objectId;
                arrID.push(id + "||https://www.maxwon.cn/article_m1/" + item.objectId);
                strSml += "<tr><td width='150' height='150' rowspan='2'><img src='" + item.img + "' width='100%' alt='sample' id='" + id + "'></td><td colspan='2' class='imgpen'>" + item.title + "</td></tr><tr style='font-size:13px; color:#999'><td height='45' style='padding-left:20px'>" + item.author + "</td><td class='imgeyes'>" + item.click_number + "</td></tr>"
            });
            document.getElementById("listCMS").innerHTML = strSml + "</tbody>";
            for (x in arrID) {
                var spt = arrID[x].split("||");
                document.getElementById(spt[0]).tig = spt[1];
                document.getElementById(spt[0]).addEventListener('tap', function () {
                    window.location.href = this.tig
                }, false)
            }
            toIscrollRefresh()
        }
    });
    $.ajax({
        type: 'get',
        url: "https://wonapi.maxleap.cn/1.0/mallProducts/client?where=%7B%22valid%22%3Atrue%2C%22subscript%22%3A3%7D&skip=0&limit=15&order=+obviousSeq,id",
        dataType: "json",
        headers: {
            'X-ML-AppId': AppId,
            'X-ML-APIKey': APIKey
        },
        success: function (data) {
            console.log("products:",data);

            // 遍历数据, 构造 html dom 字符串
            var strList = "";
            $.each(data.results, function (index, item) {
                var id = "btnPrdTJ_" + item.id;
                var priceOld = (item.originalPrice * 0.01).toFixed(2);  // 旧价格
                var priceNow = (item.price * 0.01).toFixed(2);  //当前价格
                strList += "<table width='100%' border='0' cellspacing='0' cellpadding='0' style='background-color:#f9f9f9'><tbody><tr><td class='tdBj_tj' colspan='2' align='center' bgcolor='#FFFFFF'><img src='" + item.coverIcon + "' width='52%' id='" + id + "'></td></tr><tr><td width='72%' id='prd" + item.id + "' class='txtPrdPriceNow'>￥：" + priceNow + "</td><td class='txtPrdSales'>销量：" + item.baseSaleCount + "</td></tr><tr><td class='txtPrdPriceOld'>" + (priceOld == priceNow ? "" : "￥：" + priceOld) + "</td><td align='right' style='padding-right:6px'>" + (item.mall.type == 1 ? "<div class='inputzy'>自营</div>" : "") + "</td></tr><tr><td class='txtPrdTitle1'>" + item.title + "</td><td align='right' style='padding-right:6px'><div class='inputMallname'>" + item.mall.name + "</div></td></tr></tbody></table>"
            });
            // 添加到 dom
            document.getElementById("listPrdTJ").innerHTML = strList;

            // 绑定点击事件,根据自定义协议跳转
            data.results.map(function (item) {
                var id = "btnPrdTJ_" + item.id;
                document.getElementById(id).tig = "https://www.maxwon.cn/mall/product/" + item.id;
                document.getElementById(id).addEventListener('tap', function () {
                    window.location.href = this.tig
                }, false);
            });

            toIscrollRefresh();
        }
    });
    $.ajax({
        type: 'get',
        url: "https://wonapi.maxleap.cn/1.0/mallProducts/simplify/client?where=%7B%22valid%22%3Atrue%7D&skip=0&limit=20&order=+obviousSeq,id",
        dataType: "json",
        headers: {
            'X-ML-AppId': AppId,
            'X-ML-APIKey': APIKey
        },
        success: function (data) {
            var strList = "";
            var arrID = new Array();
            var parsedJson = eval(data);
            $.each(parsedJson.results, function (index, item) {
                var id = "btnPrdPT_" + item.id;
                arrID.push(id + "||https://www.maxwon.cn/mall/product/" + item.id);
                var priceOld = (item.originalPrice * 0.01).toFixed(2);
                var priceNow = (item.price * 0.01).toFixed(2);
                strList += "<table width='100%' border='0' cellspacing='0' cellpadding='0' style='background-color:#f9f9f9'><tbody><tr><td colspan='2' align='center' bgcolor='#FFFFFF'><img src='" + item.coverIcon + "' width='52%' id='" + id + "'></td></tr><tr><td width='72%' id='prd" + item.id + "' class='txtPrdPriceNow'>￥：" + priceNow + "</td><td class='txtPrdSales'>销量：" + item.baseSaleCount + "</td></tr><tr><td class='txtPrdPriceOld'>" + (priceOld == priceNow ? "" : "￥：" + priceOld) + "</td><td></td></tr><tr><td class='txtPrdTitle1'>" + item.title + "</td><td></td></tr></tbody></table>"
            });
            document.getElementById("listPrdPT").innerHTML = strList;
            for (x in arrID) {
                var spt = arrID[x].split("||");
                document.getElementById(spt[0]).tig = spt[1];
                document.getElementById(spt[0]).addEventListener('tap', function () {
                    window.location.href = this.tig
                }, false)
            }
            toIscrollRefresh()
        }
    })
};
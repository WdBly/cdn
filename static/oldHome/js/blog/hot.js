$(document).ready(function () {
    getHotInfo()
});

function syncClick() {
    id = 32
    $.ajax({
        url:ServerIp+"/HotClick",
        type:"GET",
        async:true,
        data:{id:id},
        timeout:5000,
        dataType:'json',
        success:function (data) {
        },
        error:function () {
        }
    })
}

function getHotInfo() {
    $.ajax({
        url:ServerIp+"/GetType",
        type:"GET",
        async:true,
        data:{},
        timeout:5000,
        dataType:'json',
        success:function (data) {
            if (data['code']!=0 && data['Code'] != 0){
                alert("获取失败")
            }else {
                if (data['Data'] !== undefined) {
                    // allIdSort
                    var isAllShow = localStorage.getItem("allIdSort")
                    if (isAllShow != undefined) {
                        var sortId = JSON.parse(isAllShow)
                        for (var i=0;i<data['Data'].length;i++)
                        {
                            data['Data'][i].sort = sortId[data['Data'][i].id]
                        }
                    }
                    data['Data'] = HiddenType(data['Data'])
                    data.Data.sort((a,b)=>b.sort-a.sort)
                    setBar(data['Data'])
                } else {
                    setBar(data['data'])
                }
            }
        },
        error:function () {
        }
    })
}

function HiddenBar(object) {
    //询问框
    layer.confirm('确认隐藏该分类？点小飞机可重现', {
        btn: ['隐藏','取消'] //按钮
    }, function(){
        localStorage.setItem("hidden"+object.type,"1")
        $("a[rel='"+object.rel+"']").hide()
        location.reload();
    }, function(){

    });




}

function deleteAllHidden() {
    localStorage.clear()
    location.reload();
}

function showDeleteAllHidden() {
    layer.tips('双击热榜分类可隐藏,点击小灰机取消隐藏', '#deleteAllHidden', {
        tips: [1, '#0FA6D8'], //还可配置颜色
        time:1000
    });
}

function HiddenType(object) {
    var endData = new Array()
    for (var i in object) {
        var isHidden = localStorage.getItem("hidden"+object[i].id)
        if (isHidden == 1) {
            continue
        }
        endData.push(object[i])
        if (object[i].id == '101') {
            object[i].sort = '0'
        }
    }
    return endData
}


function setBar(object) {
    var code = '';
    var bodyCode = '';
    var isAllShow = localStorage.getItem("isAllShow")
    for (var i in object) {
        if (i > 13 && (isAllShow == "no" || isAllShow == undefined)) {
            code += '<li role="presentation"><a ondblclick="HiddenBar(this)" style="display: none" hreflang="'+object.length+'" rel="'+i+'" type="'+object[i].id+'" onclick="getOwnInfo(this)" href="#'+object[i].id+'" aria-controls="profile" role="tab" data-toggle="tab">'+object[i].title+'</a></li>';
        } else {
            $("#iconAllShow").attr("class","glyphicon glyphicon-chevron-up")
            if (i == 0) {
                code += '<li  class="active"  role="presentation"><a ondblclick="HiddenBar(this)" hreflang="'+object.length+'" rel="'+i+'" type="'+object[i].id+'" onclick="getOwnInfo(this)" href="#'+object[i].id+'" aria-controls="profile" role="tab" data-toggle="tab">'+object[i].title+'</a></li>';
            } else {
                code += '<li   role="presentation"><a ondblclick="HiddenBar(this)" hreflang="'+object.length+'" rel="'+i+'" type="'+object[i].id+'" onclick="getOwnInfo(this)" href="#'+object[i].id+'" aria-controls="profile" role="tab" data-toggle="tab">'+object[i].title+'</a></li>';
            }


        }
        if (i == 0) {
            // tab-pane active
            var infoCode = getListInfo(object[i].id)
            bodyCode += '<div role="tabpanel" class="tab-pane active" id="'+object[i].id+'"><div class="b-list"><div class="ant-list ant-list-split ant-list-bordered"><div class="ant-spin-nested-loading"><div class="ant-spin-container" id="myOnlyInfo'+object[i].id+'">'+infoCode+'</div></div></div></div></div>';
        } else {
            bodyCode += '<div role="tabpanel" class="tab-pane" id="'+object[i].id+'"><div class="b-list"><div class="ant-list ant-list-split ant-list-bordered"><div class="ant-spin-nested-loading"><div class="ant-spin-container" id="myOnlyInfo'+object[i].id+'"></div></div></div></div></div>';
        }

    }
    if (isAllShow == undefined || isAllShow == 'no') {
        code += '<li   role="presentation"><a id="allShow" target="_blank" onclick="AllShowDo()" onmouseover="AllShow()"  class="btn btn-default"  role="button">\n' +
            '    <span id="iconAllShow" class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>\n' +
            '</a></li>';
    } else if (isAllShow == 'yes') {
        code += '<li  role="presentation"><a id="allShow" target="_blank" onclick="AllShowDo()" onmouseover="AllShow()"  class="btn btn-default"  role="button">\n' +
            '    <span id="iconAllShow" class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>\n' +
            '</a></li>';
    }

    var noApplicationRecord = document.getElementById('myHotBar')
    noApplicationRecord.innerHTML = code
    var bodyHtmlCode = document.getElementById('tab-content')
    bodyHtmlCode.innerHTML = bodyCode
    var lastReadId = localStorage.getItem("lastReadId")
    if (lastReadId != null){
        $("a[rel='"+lastReadId+"']").click()
    }
    var arr=new Array(
        // "点击右下角\"新\"字按钮,体验新版UI",
               "欢迎吐槽和建议额～",
               "所有分类按照点击量排序",
               "有需要博主爬取的其他网站，告诉博主，有求必应额～",
               "双击栏目隐藏，点击右下角小灰机取消隐藏",
               "双击栏目隐藏，点击右下角小灰机取消隐藏",
               // "可以通过排序和隐藏筛选自己感兴趣的数据源",
               // "可以通过排序和隐藏筛选自己感兴趣的数据源",
               // "可以通过排序和隐藏筛选自己感兴趣的数据源",
               // "可以通过排序和隐藏筛选自己感兴趣的数据源",
               // "可以通过排序和隐藏筛选自己感兴趣的数据源",
               // "可以通过排序和隐藏筛选自己感兴趣的数据源",
               "支持拖动排序，排序完成一定记得点击右下方保存按钮，排序完成一定记得点击右下方保存按钮",
               "支持拖动排序，排序完成一定记得点击右下方保存按钮，排序完成一定记得点击右下方保存按钮",
               "支持拖动排序，排序完成一定记得点击右下方保存按钮，排序完成一定记得点击右下方保存按钮",
               "支持拖动排序，排序完成一定记得点击右下方保存按钮，排序完成一定记得点击右下方保存按钮",
               "支持拖动排序，排序完成一定记得点击右下方保存按钮，排序完成一定记得点击右下方保存按钮",
               "支持拖动排序，排序完成一定记得点击右下方保存按钮，排序完成一定记得点击右下方保存按钮",
               "支持拖动排序，排序完成一定记得点击右下方保存按钮，排序完成一定记得点击右下方保存按钮",
               "支持拖动排序，排序完成一定记得点击右下方保存按钮，排序完成一定记得点击右下方保存按钮",
               "支持拖动排序，排序完成一定记得点击右下方保存按钮，排序完成一定记得点击右下方保存按钮",
               "支持拖动排序，排序完成一定记得点击右下方保存按钮，排序完成一定记得点击右下方保存按钮",


    );
    var index = Math.floor((Math.random()*arr.length));
    layer.msg(arr[index],{time:3000});
    //layer.msg("各位观众老爷，数据异常，紧急修复中，稍候就好",{time:3000});
}

function getOwnInfo(item) {
    localStorage.setItem("lastReadId",item.rel)
    localStorage.setItem("lastPage"+item.type,"1")
    localStorage.setItem("currentRead",item.type)
    var current = Number(item.rel);
    var code = getListInfo(item.type)
    var id = "myOnlyInfo" + item.type
    var bodyHtmlCode = document.getElementById(id)
    bodyHtmlCode.innerHTML = code
    var isAllShow = localStorage.getItem("isAllShow")
    if (isAllShow == "no" || isAllShow == undefined) {
        var beShow = new Array();
        var temp = 7;
        var count = 0;
        var left = 0;
        var right = 0;
        beShow.push(current)
        while (temp > 0) {
            count++
            if (beShow.length < 14) {
                right = current+count
                left = current-count;
                if (left < 0) {
                    left = 7+current+(-left)
                }
                if (right > item.hreflang) {
                    right = current-count-7
                }
                if (beShow.length < 14) {
                    beShow.push(right)
                }
                if (beShow.length < 14) {
                    beShow.push(left)
                }
            }
            temp--
        }
        for (var v= item.hreflang;v>=0;v--) {
            if (beShow.indexOf(v) >= 0) {
                $("a[rel='"+v+"']").show()
            } else {
                $("a[rel='"+v+"']").hide()
            }
        }
    }

    var nextRel = Number(item.rel) + 1
    var prevRel = Number(item.rel) - 1
    if (prevRel <= item.hreflang) {
        $("#nav_next_id").attr({title:prevRel});
    }
    if (nextRel > 0) {
        $("#nav_prev_id").attr({title:nextRel});
    }

}

function getListInfo(id) {
    if (id == '101') {
        return `<div class="form-horizontal">
<br>
<br>
<br>
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">您的邮箱</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="vUrl" placeholder="方便我回复您反馈的进度">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">宝贵建议</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="vWord" placeholder="比如还希望博主抓取其他网站，数据更新频率，用户体验啥的，欢迎留言">
    </div>
  </div>
 
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button onclick="addVUrl()" id="vButton" class="btn btn-default">提交</button>
      <br>
      <br>
      <br>
    </div>
  </div>
  
  
</div>`;
    }
    var url = ServerIp+'/GetAllInfoGzip';
    var myCode = ''
    $.ajax({
        url:url,
        type:"GET",
        async:false,
        data:{id:id},
        timeout:5000,
        dataType:'json',
        success:function (data) {
            if (data['code']!=0 && data['Code'] != 0){
                alert("获取失败")
            }else {
                if (data['Data'] !== undefined) {
                    myCode = setEachInfo(data['Data'],id)
                } else {
                    myCode = setEachInfo(data['data'],id)
                }
                if (data['Data'].length == 0) {
                    myCode = `<header class="entry-header">
                            <h1 class="entry-title">
                                <img style="text-align: center" src="./js/blog/lazyload.gif">
                            </h1>
                            <div class="entry-meta">
                                <span >小蜘蛛在采集的路上睡着了~，发送邮件(iamthegrady@gmail.com)唤醒它</span>
                            </div>
                        </header>`
                }
            }
        },
        error:function () {
            console.log("失败");
        }
    })
    return myCode
}

function getNextPageInfo(id) {
    var page = localStorage.getItem("lastPage"+id)
    if (id == '101') {
        layer.msg("无更多数据",{time:3000});
    }
    var url = ServerIp+'/GetAllInfoGzip';
    var myCode = ''
    $.ajax({
        url:url,
        type:"GET",
        async:false,
        data:{id:id,page:page},
        timeout:5000,
        dataType:'json',
        success:function (data) {
            if (data['code']!=0 && data['Code'] != 0){
                alert("获取失败")
            }else {
                if (data['Data'] !== undefined && data['Data'] !== null) {
                    myCode = setEachInfo(data['Data'],id)
                } else {
                    layer.msg('无更多数据',{time:1000});
                }
                if (data['Data'].length == 0) {
                    myCode = `<header class="entry-header">
                            <h1 class="entry-title">
                                <img style="text-align: center" src="./js/blog/lazyload.gif">
                            </h1>
                            <div class="entry-meta">
                                <span >小蜘蛛在采集的路上睡着了~，发送邮件(iamthegrady@gmail.com)唤醒它</span>
                            </div>
                        </header>`
                }
            }
        },
        error:function () {
            console.log("失败");
        }
    })
    var newPage = parseInt(page) + 1
    localStorage.setItem("lastPage"+id,newPage)
    var bodyHtmlCode = document.getElementById("myOnlyInfo"+id)
    bodyHtmlCode.innerHTML += myCode
}

function addVUrl() {
    $("#vButton").attr("disabled", "disabled");
    var name = $("#vUrl").val()
    var email = $("#vWord").val()
    if (name.length <1 ||name.length >=1000 || email.length < 5 || email.length >=1000) {
        layer.msg('请输入正确内容', {icon:7,time:2000});
        $("#vButton").removeAttr("disabled","true");
        return
    }
    $.ajax({
        url:ServerIp+"/AddVUrl",
        type:"POST",
        async:true,
        data:{vUrl:name,vWord:email},
        timeout:5000,
        dataType:'json',
        success:function (data) {
            if (data['Code']!=0){
                alert(data["Message"]);
                $("#vButton").removeAttr("disabled","true");
            }else {
                $("#vUrl").val("")
                $("#vWord").val("")
                layer.msg('添加成功，审核后展示', {icon:6,time:2000});
                $("#vButton").removeAttr("disabled","true");
            }
        },
        error:function () {
            layer.msg('网络延迟，请重试', {icon:7,time:2000});
            $("#vButton").removeAttr("disabled","true");
        }
    })
}

function GetDay(date){
    var date = new Date(date*1000);//如果date为13位不需要乘1000
    var Y = date.getFullYear() ;
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) ;
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) ;
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) ;
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    var day = Y+"年"+M+"月"+D+"日"
    var time = h+":"+m+":"+s
    return {day,time}
}

function setEachInfo(object,id) {
    var allInfo = ''
    var count = 1
    var desc = ""
    var createTime = GetDay(object[0].CreateTime)
    for (var i in object) {
        var thisTitle = object[i].title
        var thisUrl = object[i].url;
        var thisDesc = object[i].desc;
        var thisId = ""
        if (object[i].id != undefined) {
            thisId = object[i].id;

        }
        if (object[i].Title != undefined) {
            thisTitle = object[i].Title;
        }
        if (object[i].Url != undefined) {
            thisUrl = object[i].Url;
        }
        if (object[i].Desc != undefined) {
            thisDesc = object[i].Desc;
        }
        if (object[i].title == "") {
            continue
        }
        var haveSee = localStorage.getItem(thisTitle)
        if (thisDesc != undefined) {
            desc = thisDesc;

        }

        if (haveSee != null && id != "135" && id != "136") {
            allInfo += '<div class="ant-list-item">\n' +
                '    <div class="ant-list-item-meta">\n' +
                '        <div class="ant-list-item-meta-content">\n' +
                '            <h4 class="ant-list-item-meta-title">\n' +
                '                <div><span>'+count+'.&nbsp;</span><a type="'+thisId+'" onclick="haveSee(this)" href="'+thisUrl+'" target="_blank"><span style="color: grey">'+html2Escape(thisTitle)+'</span></a>\n' +
                '                </div>\n' +
                '            </h4><div class="ant-list-item-meta-description">\n' +
                '        '+desc+'\n' +
                '      </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
        } else {

            if (object[i].title == "") {
                continue
            } else if (id == "135" || id=="136") {
                allInfo += '<div class="ant-list-item">\n' +
                    '    <div class="ant-list-item-meta">\n' +
                    '        <div class="ant-list-item-meta-content">\n' +
                    '            <h4 class="ant-list-item-meta-title">\n' +
                    '                <div><center><img src="'+thisUrl+'"></center>\n' +
                    '                </div>\n' +
                    '            </h4><div class="ant-list-item-meta-description">\n' +
                    '        <center>'+thisTitle+'</center>\n' +
                    '      </div>\n\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            } else {
                allInfo += '<div class="ant-list-item">\n' +
                    '    <div class="ant-list-item-meta">\n' +
                    '        <div class="ant-list-item-meta-content">\n' +
                    '            <h4 class="ant-list-item-meta-title">\n' +
                    '                <div><span>'+count+'.&nbsp;</span><a type="'+thisId+'" onclick="haveSee(this)" href="'+thisUrl+'" target="_blank"><span style="">'+html2Escape(thisTitle)+'</span></a>\n' +
                    '                </div>\n' +
                    '            </h4><div class="ant-list-item-meta-description">\n' +
                    '        '+desc+'\n' +
                    '      </div>\n\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            }

        }

        count += 1
    }
    timeNoticeCode = '<div class="ant-list-item">\n' +
        '    <div class="ant-list-item-meta">\n' +
        '        <div class="ant-list-item-meta-content">\n' +
        '            <h4 class="ant-list-item-meta-title">\n' +
        '                <div><span></span><a ><span style=""><center><strong>'+createTime.day+'热榜-(上次更新'+createTime.time+')</strong></center></span></a>\n' +
        '                </div>\n' +
        '            </h4>\n\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';
    return timeNoticeCode + allInfo
}

function openGirl() {
    L2Dwidget.init();
}

function noticeOpenGirl() {
    layer.tips('开启萌萌哒看板娘~', '#openGirl', {
        tips: [1, '#0FA6D8'], //还可配置颜色
        time:1000
    });
}

function feedback() {
    layer.tips('吐槽和建议，欢迎反馈~', '#feedBackMine', {
        tips: [1, '#0FA6D8'], //还可配置颜色
        time:1000
    });
}
function feedbackComment() {
    layer.tips('关于热榜', '#feedBackMine', {
        tips: [1, '#0FA6D8'], //还可配置颜色
        time:1000
    });
}

function haveSee(name) {
    localStorage.setItem(name.text,name.text)
    $(name).find("span").css("color","grey")
    id = name.type
    $.ajax({
        url:ServerIp+"/HotClick",
        type:"GET",
        async:true,
        data:{id:id},
        timeout:5000,
        dataType:'json',
        success:function (data) {
        },
        error:function () {
            console.log("失败");
        }
    })
}

function AllShow() {
    layer.tips('全部展示/循环展示', '#allShow', {
        tips: [1, '#0FA6D8'], //还可配置颜色
        time:1000
    });
}

function AllShowDo() {
    var isAllShow = localStorage.getItem("isAllShow")
    if (isAllShow == "yes") {
        // 全部展示
        localStorage.setItem("isAllShow","no")
        $("#iconAllShow").attr("class","glyphicon glyphicon-chevron-down")
        var lastReadId = localStorage.getItem("lastReadId")
        if (lastReadId != null){
            $("a[rel='"+lastReadId+"']").click()
        }

    } else {
        localStorage.setItem("isAllShow","yes")
        // glyphicon glyphicon-chevron-up
        $("#iconAllShow").attr("class","glyphicon glyphicon-chevron-up")
        for (var v= 100;v>=0;v--) {
            $("a[rel='"+v+"']").show()
        }

    }
}

function html2Escape(sHtml) {
    return sHtml;
    // return sHtml.replace(/[<>&"]/g,function(c){
    //     return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];
    // });
}

function sayAbout() {
    layer.tips('本站及 App 提供的信息资料、图片及视频等均来源于公开网络，适用避风港原则。如有涉嫌侵权图片，请邮件联系iamthegrady@gmail.com，告知图片URL或者图片所在楼层(右上角的)编号以及侵权证据。本站仅提供基于类似搜索引擎类的推荐服务，所有详细信息均跳转到原始网页地址访问，如果侵犯您的权益 ，请与我们联系,我们会尽快处理。同时请注意原网站的观点不表示我们也认同，信息内容真实性请自己辨别', '#sayAbout', {
        tips: [1, '#0FA6D8'], //还可配置颜色
        time:20000
    });
}

function saveLiSort() {
    var allId = {}
    var sort = 100000;
    $("#myHotBar li").each(function(){
        var id = $(this).children("a").attr("type")
        if (id != undefined) {
            allId[id] = sort;
            sort--;
        }
    });
    localStorage.setItem("allIdSort",JSON.stringify(allId))
    location.reload();
    layer.msg("排序保存成功",{time:3000});



}

function noticeSave() {
    layer.tips('排序后记得保存', '#noticeSave', {
        tips: [1, '#0FA6D8'], //还可配置颜色
        time:1000
    });
}

function clickNext(object) {
    var id = object.title
    $("a[rel='"+id+"']").click()
}

function clickPrev(object) {
    var id = object.title
    $("a[rel='"+id+"']").click()
}

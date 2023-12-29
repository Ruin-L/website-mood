// 动画初始化
AOS.init({
    // easing: 'ease-out-back',
    easing: 'ease',
    disable: 'mobile',
    duration: 2000
});

var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
    }
);
wow.init()

let figure = true;

// 初始化高度
function Horizontal() {
    let scrollX = document.querySelector('.scrollX')
    let Horizontal = document.querySelector('#Horizontal')

    var scrollXHeight = (scrollX.clientWidth - document.documentElement.clientWidth) + document.documentElement.clientHeight
    Horizontal.style.height = scrollXHeight + 'px'

    // 当视口发生改变
    window.addEventListener('resize', function () {
        var scrollXHeight = (scrollX.clientWidth - document.documentElement.clientWidth) + document.documentElement.clientHeight
        Horizontal.style.height = scrollXHeight + 'px'
    });

}

if ($('#Horizontal').is('*')) {
    Horizontal()
}

// 初始化滚动条
if ($('#my-scrollbar').is('*')) {
    var Scrollbar = window.Scrollbar;
    Scrollbar.initAll()
    var scrollbar = Scrollbar.get(document.querySelector('#my-scrollbar'))
    // 监听滚动条事件
    scrollbar.addListener((status) => {
        AOS.refresh();
        wow.scrollHandler()
        window.pageYOffset = scrollbar.scrollTop;
        let scroll = window.pageYOffset;
        // 水平滚动
        if ($('#Horizontal').is('*')) {
            if (scroll > 0) {
                $('.scrollX').css('transform', 'translate3d(-' + scroll + 'px, ' + scroll + 'px, 0px)')
            } else {
                $('.scrollX').css('transform', 'translate3d(0px, 0px, 0px)')
            }
        }

    });
}

if (document.querySelector('#fullPage') !== null) {
    $('#fullPage').fullpage({
        scrollingSpeed: 1100,
        easingcss3: 'cubic-bezier(0.42,0,0,0.99)',
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
        navigationPosition: 'right',
        responsiveWidth: 900,
        responsiveSlides: true,
        menu: "#menu",
        onLeave: function (section, origin, destination, direction) {
            if (screen.width > 1023) {
                setTimeout(() => {
                    $('.aos-init').removeClass('aos-animate');
                    $('.section').eq(origin.index).find('.aos-init').each(function () {
                        $(this).addClass('aos-animate');
                    })
                }, 200)
                setTimeout(() => {
                    $('.count-item').each(function (t, e) {
                        let o = $(e),
                            _from = o.data('from'),
                            _to = o.data('to');
                        new CountUp(o, _from, _to, 1, 2).start();
                    })
                }, 600)
            }
            if($('#index').length){
                if(origin.index==1){
                    $('.cursor').addClass('active')
                }else{
                    $('.cursor').removeClass('active')
                }
            }
            if($('#market').length){
                $('.leftpage .item.active').removeClass('active')
                $('.leftpage .item').eq(origin.index).addClass('active')
            }
        }
    });
}
if($('#market').length){
    $('.leftpage .item').click(function(){
        fullpage_api.moveTo($(this).index()+1)
    })
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function link_scroll() {
    var anchor = GetRequest().scrollTo;
    if(anchor !== undefined && anchor !== ''){
        var ele = document.querySelector('#'+anchor);
        if(ele!==undefined){
            var scroll = ele.offsetTop - 50;
            scrollbar.scrollTo(0, scroll, 1200);
        }
    }
}

link_scroll()

// video
$('video:not(video[muted])').trigger('pause')

function video_alert(e) {
    var alert = $('.alert_video')
    var video = $('.alert_video .joke .video video')
    var controls = $(e).find('video').attr('controls')
    var loop = $(e).find('video').attr('loop')
    $(video).attr('controls',controls)
    $(video).attr('loop',loop)
    $(alert).addClass('video_active')
    $(video).attr('src',$(e).find('video').attr('src'))
    $(video).trigger('play');
    if ($(e).is('.all')) {
        $(alert).addClass('all')
    }else {
        $(alert).removeClass('all')
    }
}

function video_close() {
    $('.alert_video').removeClass('video_active')
    $('.alert_video .joke .video video').trigger('pause');
    $('.alert_video .joke .item').removeClass('item_active')
}

$(document).on('click','.alert_video .joke .close',function () {
    video_close()
})

$(document).on('click','.alert_video .mask',function () {
    video_close()
})

var video_html = '';
video_html+= `<div class="alert_video">
    <div class="joke">
        <div class="video">
            <video src=""></video>
        </div>
        <div class="close">
            <svg t="1676432369827" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2743" width="64" height="64">
                <path d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                      p-id="2744"></path>
            </svg>
        </div>
    </div>
    <div class="mask"></div>
</div>`

if ($('*[onclick*="video_alert(this)"] video').length > 0) {
    $('body').append(video_html)
}

var prev =  $('.header .list .item.active').prev().attr('href');
 if (prev == undefined) {
        $('header .header .tab .box .prev').attr('href','javascript:;')
 }else {
        $('header .header .tab .box .prev').attr('href',prev)
 }


var next =  $('.header .list .item.active').next().attr('href');

    if (next == undefined) {
        $('header .header .tab .box .next').attr('href','javascript:;')
    }else {
        $('header .header .tab .box .next').attr('href',next)
    }









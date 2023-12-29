const countItems = document.querySelectorAll('.count-item');
function onIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const e = entry.target;
            animateCount(e);
            // observer.unobserve(e);
        }
    });
}
const observer = new IntersectionObserver(onIntersection);
countItems.forEach(item => observer.observe(item));
function animateCount(e) {
    var demo = { score: 0 },
        scoreDisplay = e,
        to = e.getAttribute('data-to'),
        speed = e.getAttribute('data-speed') * 1,
        separator = e.getAttribute('data-separator'),
        to_fixed = e.getAttribute('data-fixed');
        delay=e.getAttribute('data-delay')?e.getAttribute('data-delay'):0
    if (to !== null) {
        if (to.indexOf('.') !== -1) {
            var automatic = (to.length -1)-to.indexOf('.')
        }
    }
    if (speed === 0) {
        speed = 1;
    }
    if($(window).width()<=1024){
        delay=0
    }
    setTimeout(() => {
        TweenLite.to(demo, speed, {
            score: to,
            onUpdate: showScore
        });
    }, delay);

        function showScore() {
                if (separator !== null) {
                    scoreDisplay.innerHTML = formatNumberWithCommasAndDecimal(demo.score, to_fixed, separator);
                }else if (to_fixed !== null) {
                    scoreDisplay.innerHTML = demo.score.toFixed(automatic);
                }else {
                    scoreDisplay.innerHTML = demo.score.toFixed(0);
                }
        }
    
}
function formatNumberWithCommasAndDecimal(number, decimalPlaces,separator) {
    var formattedNumber = number.toFixed(decimalPlaces);
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return formattedNumber;
}

if($(window).width()>1024){

    $('.delay').children().each(function(index,item){
            $(item).find('.num').attr('data-delay',($(this).parent().data('interval')*index)*1000)
        $(item).css('transition-delay',($(this).parent().data('interval')*index)+'s')
    })
}

$('.more .head_click').click(function(){
    $(this).toggleClass('on')
    $('.fixed_menu').toggleClass('on')
    if($('.fixed_menu').is('.on')){
        $('.fixed_menu .item').each(function (index, item) {
            var delay = index * 100 + 100
            $(this).css('transition-delay', delay + 'ms')
        })
    }else{
        $('.fixed_menu .item').each(function (index, item) {
            $(this).css('transition-delay', 0 + 'ms')
        })
    }

})

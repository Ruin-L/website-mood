var swiper3 = new Swiper(".mySwiper3", {
  // grabCursor: true,
  effect: "creative",
  mousewheel:true,
  speed:1500,
  allowTouchMove: true,
  loop:true,
  autoplay: {
		delay: 6000,
		disableOnInteraction: false,
	  },
  creativeEffect: {
    prev: {
      // shadow: true,
      translate: ["-20%", 0, -1],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
  navigation: {
    nextEl: ".main .page .tab .next,header .header .tab .box .next",
    prevEl: ".main .page .tab .prev,header .header .tab .box .prev",
  },
  breakpoints:{
    1025:{
      allowTouchMove: false,
    }
  },
  on:{
    init(){
				$('.main .page .schedule').addClass('active')
    },
    slideChangeTransitionStart: function(){
				$('.main .page .schedule').removeClass('active')
        
		},
    slideChangeTransitionEnd: function(){
				$('.main .page .schedule').addClass('active')
    },
    slideChange: function(){
      if(this.realIndex>1){
        $('.main .down').addClass('white')
      }else{
        $('.main .down').removeClass('white')
      }
    }
  }
});

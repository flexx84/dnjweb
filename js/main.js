/* *******************************************************
 * filename : main.js
 * description : 메인에만 사용되는 JS
 * date : 2022-03-14
******************************************************** */

/* ************************
* Func : fullpage 레이아웃 사용시
* fullpage.js , detectBrowser() 필요
************************ */
if ($.exists('#fullpage')) {
	var $fullPage = $("#fullpage");
	var $fullPageSection = $fullPage.children(".section");
	$fullPage.fullpage({
		css3: true,
		fitToSection: false,
		navigation: false,
		scrollBar:false,
		scrollingSpeed:800,
		// anchors:['intro', 'project', 'business', 'news', 'recruit', 'footer'],
		navigationPosition: 'right',
		navigationTooltips: ['Content01', 'Content02', 'Content03', 'Content04'],
		responsiveWidth: tabletWidth,
		responsiveHeight : 750,
		onLeave : function(origin, destination, direction){
			setTimeout(function  () {
				$(".section").eq(destination-1).find("[data-scroll]").addClass("animated");
			},500);

			if ( destination === 2 ) {
				mainSwiper.autoplay.start()
			}
			if ( destination === 4 ) {
				$(".start-autoplay-scroll-object").slick("slickPlay");
			}
			// 사이드바 색상변경
			if ( destination > 1) {
				$("#header").addClass("minimized-header");
			}else {
				$("#header").removeClass("minimized-header");
			}
			if ( destination === 2 || destination === 4 || destination === 5) {
				$("#header").addClass("black-header");
			}else {
				$("#header").removeClass("black-header");
			}
			if ( destination > 5 )  {
				$("body:not('.fp-responsive')").find("#header").hide();	// ie responsive모드에서 상단으로 이동시 destination 오류로 추가
			}else {
				$("body:not('.fp-responsive')").find("#header").show();
			}
		}
	});
}

/* ************************
* Func : 메인 비주얼 높이 설정 및 slick 슬라이드
* slick.js , getWindowWidth(), getWindowHeight() 필요
************************ */
// 메인 비주얼 높이값 설정
if ($.exists('#mainVisual.full-height')) {
	mainVisualHeight();
	$(window).on('resize', mainVisualHeight);

	function mainVisualHeight () {
		var visual_height = getWindowHeight()	- $("#header").height();	// header가 fixed or absolute일경우 - $("#header").height() 삭제
		$("#mainVisual").height(visual_height);
	}
}

// 메인 비주얼 슬라이드
var $mainVisualItem = $(".main-visual-con");
var visualPausePlay = false;		// Pause, play 사용시 변경

$mainVisualItem.on('init', function(event, slick, currentSlide) {
	$(".main-visual-item").eq(0).addClass("active-item");
	if ($.exists('.main-visual-conuter')) {
		$(".main-visual-conuter .total-num").text(slick.slideCount);
	}
});
$mainVisualItem.on('beforeChange', function(event, slick, currentSlide, nextSlide) {	
	$(this).find(".main-visual-item").eq(nextSlide).addClass("active-item");
	$(this).find(".main-visual-item").eq(currentSlide).addClass("stop-active-item");
	if ($.exists('.main-visual-conuter')) {
		$(".main-visual-conuter .cur-num").text(nextSlide+1);
	}
});
$mainVisualItem.on('afterChange', function() {
	$(this).find(".stop-active-item").removeClass("stop-active-item active-item");
});

// 메인 비주얼 슬라이드
$mainVisualItem.slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	dots:false,
	autoplay: true,
	speed:1500,
	infinite:true,
	autoplaySpeed: 4000,
	// easing: 'easeInOutQuint',
	pauseOnHover:false,
	zIndex:1,
	prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Prev" tabindex="0" role="button"><i class="xi-angle-left-thin"></i></button>',
	nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><i class="xi-angle-right-thin"></i></button>',
	cssEase: 'cubic-bezier(0.87, 0.03, 0.41, 0.9)'
});

$mainVisualItem.find(".slick-dots").wrap("<aside class='slick-dots-wrapper'><div class='area-box'></div></aside>");

// 일시정지, 재생버튼 사용시
if ( visualPausePlay ) {
	$(".slick-dots-wrapper").children().append("<span class='slick-control-btns'><button class='slick-pause-btn' title='일시정지'><i class='xi-pause'></i></button><button class='slick-play-btn' title='재생'><i class='xi-play-circle-o'></i></button></span>");

	$(document).on("click",".slick-pause-btn",function  () {
		$mainVisualItem.slick("slickPause");
		$(this).hide();
		$(".slick-play-btn").show();
	});
	$(document).on("click",".slick-play-btn",function  () {
		$mainVisualItem.slick("slickPlay");
		$(this).hide();
		$(".slick-pause-btn").show();
	});
}


// 메인 텍스트 슬라이드
var $mainTxtItem = $(".main-visual-slogan-rolling");
$mainTxtItem.on('init', function(event, slick, currentSlide) {
	$(".main-visual-slogan-item").eq(0).addClass("active-item");
});
$mainTxtItem.on('beforeChange', function(event, slick, currentSlide, nextSlide) {	
	$(this).find(".main-visual-slogan-item").eq(nextSlide).addClass("active-item");
	$(this).find(".main-visual-slogan-item").eq(currentSlide).addClass("stop-active-item");
});
$mainTxtItem.on('afterChange', function() {
	$(this).find(".stop-active-item").removeClass("stop-active-item active-item");
});
$mainTxtItem.slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	dots:false,
	autoplay: true,
	speed:1000,
	infinite:true,
	autoplaySpeed: 3000,
	// easing: 'easeInOutQuint',
	pauseOnHover:false,
	zIndex:1,
	cssEase: 'cubic-bezier(0.87, 0.03, 0.41, 0.9)'
}); 

/* ************************
* Func : 메인 갤러리 슬라이드
* slick.js 필요
************************ */
$('.main-news-list-con > ul').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	arrows: true,
	fade: false,
	dots:false,
	autoplay: true,
	speed:800,
	infinite:false,
	autoplaySpeed: 2000,
	easing: 'easeInOutQuint',
	pauseOnHover:true,
	touchThreshold: 50,
	prevArrow: '.main-news-prev-btn',
	nextArrow: '.main-news-next-btn',
	responsive: [
				{
				  breakpoint: 1025,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 641,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				  }
				}
			  ]
});

/* ************************
* Func : 메인 Swiper 갤러리
* swiper.js 필요
************************ */
var mainSwiper = new Swiper(".main-project-rolling-wrapper", {
	slidesPerView:'auto',
	spaceBetween: 0,
	watchSlidesVisibility: true,
	freeMode: true,
	scrollbar: {
		el: ".main-news-swiper-controls .swiper-scrollbar",
		hide: false,
		draggable: true,
	},
	navigation: {
		prevEl: ".main-news-swiper-controls .arrow-prev",
		nextEl: ".main-news-swiper-controls .arrow-next",
	},
	breakpoints: {
		1025: {
			freeMode: false,
		},
	},
});

rollingBusiness();
function rollingBusiness () {
	$itemList = $(".main-business-list-con");
	$item = $itemList.find("li");
	itemLength = 5;
	startNum = 0;
	rollingSpeed = 3000;
	
	$item.eq(startNum).addClass("active");
	function visualTime(){
		if(startNum < ( itemLength - 1)){
			startNum++;
		}else{
			startNum = 0;
		}
		$item.each(function(id){
			if(id == startNum){
				$(this).addClass("active"); // li에 클래스 붙이기
			}else{
				$(this).removeClass("active");
			}
		});
		$(".business-bg-list-con li").each(function(id){
			if(id == startNum){
				$(this).addClass("active"); // li에 클래스 붙이기
			}else{
				$(this).removeClass("active");
			}
		});
	}
	// visualPlay();
	activeTimer = setInterval(visualTime,rollingSpeed);

	$itemList.find("li:not(.logo)").hover(function  () {
		startNum = $(this).index();
		$item.removeClass("active");
		$(this).addClass("active");
		clearInterval(activeTimer);
		$(".business-bg-list-con li").removeClass("active");
		$(".business-bg-list-con li").eq(startNum).addClass("active");
	},function  () {
		activeTimer = setInterval(visualTime,rollingSpeed);
	});
}
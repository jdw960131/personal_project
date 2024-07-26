$(function() {
    /* 모바일 동영상 없애기
    if (matchMedia("screen and (max-width:1280px)").matches) {
    	$('.swiper-slide.s-slide0').remove();
    }
    if (matchMedia("screen and (max-height:720px)").matches) {
    	$('.swiper-slide.s-slide0').remove();
    }
    */
    var mySwiper = new Swiper('#mainVisual .swiper-container', {
        effect: 'fade', // "slide", "fade", "cube", "coverflow" or "flip"
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        /*
		pagination: {
			el: '.swiper-pagination',
			type: 'progressbar',
		},
		scrollbar: {
		  el: '.swiper-scrollbar',
		},
		*/
        pagination: {
            el: '.swiper-pagination',
            clickable: 'true',
        },
        autoplay: {
            //delay: 5000,
            disableOnInteraction: false,
        },
        speed: 2000,
        loop: true,
        centeredSlides: false,
        simulateTouch: true,
        autoplayDisableOnInteraction: false,
        paginationClickable: true,
        on: {
			mounted: function () {
				updateAutoplay();
			},
            init: function() {
                console.log('swiper initialized');
                var currentVideo = $("[data-swiper-slide-index=" + this.realIndex + "]").find("video");
                currentVideo.trigger('play');
				$('#mainVisual').addClass('active');
            },
			resize: function () {
				updateAutoplay();
			},
        },
    });
	function updateAutoplay() {
		var slide1 = document.querySelector('.swiper-slide.s-slide-n');

		if (window.innerWidth <= 640) {
			slide1.setAttribute('data-swiper-autoplay', 5000);
			//$(".swiper-slide.s-slide-n").attr("data-swiper-autoplay", "5000")
		} else {
			//slide1.setAttribute('data-swiper-autoplay', 102000);
			slide1.setAttribute('data-swiper-autoplay', 5000);
		}

		mySwiper.autoplay.start();
	}

	$(window).on("load", function(){
		updateAutoplay()
	})

    $("#mainVisual .playstop .play").on('click', function(e) {
        e.preventDefault();
        mySwiper.autoplay.start();
        console.log('start');
    });
    $("#mainVisual .playstop .stop").on('click', function(e) {
        e.preventDefault();
        mySwiper.autoplay.stop();
        console.log('stop');
    });

    mySwiper.on('slideChange', function() {
        console.log('now index :::', mySwiper.realIndex);
        if (mySwiper.realIndex == '1') {
            $('#playButton').removeClass('on');
            $('header').addClass('slide2');
            $('header').removeClass('slide3');
			$('#mainVisual').removeClass('active');
			clearTimeout(autoSlideTimer);
        } else if (mySwiper.realIndex == '2') {
            $('header').addClass('slide3');
            $('header').removeClass('slide2');
			$('#mainVisual').removeClass('active');
			clearTimeout(autoSlideTimer);
        } else {
            $('header').removeClass('slide2');
            $('header').removeClass('slide3');
			$('#mainVisual').addClass('active');
			clearTimeout(autoSlideTimer);
        }
    });
    /* GET ALL VIDEOS */
    var sliderVideos = $(".swiper-slide video");

    mySwiper.on('slideChange', function() {
        console.log('slide changed');
        sliderVideos.each(function(index) {
            this.currentTime = 0;
        });

        var prevVideo = $("[data-swiper-slide-index=" + this.previousIndex + "]").find("video");
        var currentVideo = $("[data-swiper-slide-index=" + this.realIndex + "]").find("video");
        prevVideo.trigger('stop');
        currentVideo.trigger('play');

    });
	/*
    var video = $('#myVideo')[0];
    var playButton = $('#playButton');
    $(this).removeClass('on');

    playButton.on('click', function() {
        if (video.paused) {
            video.play();
            playButton.hide();
            $(this).removeClass('on');
        } else {
            video.pause();
            playButton.show();
            $(this).addClass('on');
        }
		if ($(this).hasClass('on')) {
			setTimeout(goToNextSlide, 1000 + Math.random() * 3000);
		}
    });

    $('#myVideo').on('click', function() {
        if (!video.paused) {
            video.pause();
            playButton.show();
            playButton.addClass('on');
        }
    });

    function goToNextSlide() {
        mySwiper.slideNext();
    }
	*/

	var video = $('#myVideo')[0];
	var playButton = $('#playButton');
	var autoSlideTimer;

	playButton.on('click', function() {
		if (video.paused) {
			video.play();
			playButton.hide();
			$(playButton).removeClass('on');
		} else {
			video.pause();
			playButton.show();
			$(playButton).addClass('on');
		}
		if ($(playButton).hasClass('on')) {
			autoSlideTimer = setInterval(function() {
				mySwiper.slideNext();
			}, 3000);
		} else {
			clearTimeout(autoSlideTimer);
		}
	});

	$('#myVideo').on('click', function(event) {
		if (!video.paused) {
			event.stopPropagation();
			video.pause();
			playButton.show();
			$(playButton).addClass('on');
			clearTimeout(autoSlideTimer);
			if ($(playButton).hasClass('on')) {
				autoSlideTimer = setInterval(function() {
					mySwiper.slideNext();
				}, 3000);
			} else {
				clearTimeout(autoSlideTimer);
			}
		}
	});

    $("#news-container").vTicker({
        speed: 500,
        pause: 3000,
        animation: 'fade',
        mousePause: false,
        showItems: 1
    });

    /* services */
    var swiper = new Swiper(".swiper-info .swiper-container", {
        //loop: true,
        spaceBetween: 0,
        slidesPerView: 7,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            0: {
                slidesPerView: "auto",
            },
            1024: {
                slidesPerView: 7,
            },
        },
    });
    var swiper2 = new Swiper(".swiper-services .swiper-container", {
        effect: 'fade', // "slide", "fade", "cube", "coverflow" or "flip"
        loop: true,
        spaceBetween: 0,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        speed: 1000,
        thumbs: {
            swiper: swiper,
        },
    });


    var swiper3 = new Swiper(".swiper-result .swiper-container", {
        effect: 'fade', // "slide", "fade", "cube", "coverflow" or "flip"
        loop: true,
        spaceBetween: 0,
        centeredSlides: false,
        simulateTouch: true,
        autoplayDisableOnInteraction: false,
        paginationClickable: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
        }
    });


    /* research 
	var windowResize = function() {
		var toggle = true;
		var interval = setInterval(durationSlider, 3000);
		$(".main4 .research_Box .listbox li").mouseenter(function() {
			$(".main4 .research_Box .listbox li").removeClass("active");
			$(this).addClass("active");
			var num = $(this).index();
			console.log(num);
			if (toggle) {
				clearInterval(interval);
				toggle = false;
			} else {
				interval = setInterval(durationSlider, 3000);
				toggle = true;
			}
		});


		var winWidth = $(window).width();
		if (winWidth > 1024) {
			function durationSlider() {
				var listItems = $('.main4 .research_Box .listbox li').length;
				var count = 0;
				setInterval(function() {
					$('.main4 .research_Box .listbox li.active').removeClass('active');
					$('.main4 .research_Box .listbox li:eq(' + count + ')').addClass('active');
					console.log(count);
					count += 1;
					if (count >= listItems) {
						count = 0;
					}
				}, 3000);
			}
			durationSlider();
		}
	}
	$(window).load(function() {
		windowResize();
	});

	$(window).resize(function() {
		windowResize();
	});

	$(window).on("orientationchange", function(event) {
		windowResize();
	});
	*/

    /* research */
    $(".main4 .research_Box .listbox li").mouseenter(function() {
        $(".main4 .research_Box .listbox li").removeClass("active");
        $(this).addClass("active");
        var num = $(this).index();
        console.log(num);
    });

    var list = $(".main4 .research_Box .listbox ul");
    var listN = $(".main4 .research_Box .listbox li").length;
    var timer;
    var speed = 3000;

    $(".main4 .research_Box .listbox li:eq(0)").addClass('active');
    $(list).addClass('ing');

    list.bind({
        mouseenter: function() {
            if ($(this).hasClass('ing')) {
                clearInterval(timer);
                timer = 0;
            }
        },

        mouseleave: function() {
            if ($(this).hasClass('ing')) {
                timer = setInterval(auto, speed);
            }
        }
    });

    function slide(idx) {
        list.find(">li.active").removeClass('active');
        list.find(">li").eq(idx).addClass('active');
    }

    function auto() {
        var Num = $(".main4 .research_Box .listbox li.active").index();
        if (Num >= listN - 1) {
            Num = 0;
        } else {
            Num++;
        }
        slide(Num);
    }

    timer = setInterval(auto, speed);

});

$(document).ready(function() {
});
$(function() {
	
	var $wrap = $('#wrap'),
		$header = $('header'),
		$navi = $('#navi'),
		$gnb = $('#gnb > ul'),
		$gnbHover = $('#navi #gnb > ul > li'),
		$gnbHover_a = $('#navi #gnb > ul > li a'),
		$gnbSub = $('#navi #gnb > ul > li > ul'),
		$bnt_all = $('.allmenu'),
		$gnb_bg = $('header .gnb_bg'),
		$btn_all = $('.btn_all'),
		$lnb_p = $('#lnb p.sub_title'),
		$lnbul = $('#lnb ul'),
		$lnbli = $('#lnb li'),
		$btn_top = $('#btn_top .top'),
		$allmenuBox = $('#allmenuBox');

	$(window).on('scroll', function() {
		bodyScroll = $(document).scrollTop();
		if (bodyScroll > 0) {
			$header.addClass('fix');
		} else {
			$header.removeClass('fix');
			$('#wrap *').removeClass('subOn');
		}
	});

	var menuCont = function() {

		/* web gnb menu */
		$('#navi #gnb > ul').each(function() {
			$(this).on('mouseleave', function() {
				$header.removeClass('on');
			});
		});
		$gnbHover.each(function() {
			if ($wrap.is('.web')) {
				$(this).on('mouseenter', function() {
					/* 24.06.11
					$(this).not('.link').children("a").on("click", function(e) {
						e.preventDefault();
					});
					*/
					$header.addClass('ov');
					$navi.addClass('over');
					$(this).addClass('on');
					$gnb_bg.addClass('on');
				});
			} else {
				$(this).off('mouseenter mouseleave');
			}
		});
		$header.on('mouseleave', function() {
			$header.removeClass('ov');
			$navi.removeClass('over');
			$(this).removeClass('on');
			$gnb_bg.removeClass('on');

		});
		$(document).on('click', function() { // 복제
			$("#allmenuBox #gnb > ul > li").each(function() {
				$(this).not('.link').children("a").off("click").on("click", function(e) {
					e.preventDefault(); //a 태그 막기	
				});
			});
		});


		/* mobile gnb menu */
		$gnbHover.each(function() {
			if ($wrap.is('.web')) {
				$(this).off('click');
			} else {
				$(this).off('click');
				$(document).on('click', function() { // 복제
					$("#allmenuBox #gnb > ul > li").each(function() {
						$(this).not('.link').children("a").off("click").on("click", function(e) {
							e.preventDefault(); //a 태그 막기	
							var depth2 = $(this).siblings('.subDepth');
							if (!depth2.is(':visible')) {
								$('#gnb > ul').find('.subDepth').stop().slideUp();
								depth2.stop().slideDown();
								$('#gnb > ul li').removeClass('hover');
								$(this).parent().addClass('hover');
							} else {
								$('#gnb > ul').find('.subDepth').stop().slideUp();
								$('#gnb > ul li').removeClass('hover');
							};
						});

					});
				});
			}
		});

	}

	var windowSize = function() {
		var winWidth = $(window).width();
		if (winWidth > 1024) {
			$wrap.addClass('web');
			$wrap.removeClass('mobile');
		} else {
			$wrap.removeClass('web');
			$wrap.addClass('mobile');
		}

		/* allmenu */
		$bnt_all.off('click');
		$bnt_all.click(function() {
			$('.menuTop').clone().appendTo('#allmenuBox .menuBox');
			$('header .snsBox').clone().appendTo('#allmenuBox .mSns');
			$('html, body').removeClass('body_hidden');
			$header.toggleClass('ov');
			if (!$(this).is('.active')) {
				$(this).addClass('active');
				$(this).parent().addClass('on');
				$allmenuBox.addClass('on');
				$gnbSub.removeClass('ov');
				$('#allmenuBox .bg').addClass('on');
				$('html, body').addClass('body_hidden');
				/*
				  $('#allmenuBox #gnb > ul > li').each(function() {
					$(this).not('.link').children("a").off("click").on("click", function(e) {
					  e.preventDefault(); //a 태그 막기
					  var depth2 = $(this).siblings('.depth2');
					  if (!depth2.is(':visible')) {
						$('#gnb > ul').find('.depth2').stop().slideUp();
						depth2.stop().slideDown();
						$('#gnb > ul li').removeClass('hover');
						$(this).parent().addClass('hover');
					  } else {
						$('#gnb > ul').find('.depth2').stop().slideUp();
						$('#gnb > ul li').removeClass('hover');
					  };
					});
				  });    
				  */
			} else {
				$('#allmenuBox .menuBox').empty();
				$('#allmenuBox .mSns').empty();
				$(this).parent().removeClass('on');
				$allmenuBox.removeClass('on');
				$bnt_all.removeClass('active');
				$navi.removeClass('over');
				$gnb_bg.removeClass('on');
				$('#allmenuBox .bg').removeClass('on');
				$gnbHover.removeClass('on');
				$('html, body').removeClass('body_hidden');
				$gnbHover.removeClass('hover');
			}

		});

		/* lnb menu 
		$("#lnb .subDepth").each(function(){
			var $depth = $(this);
			var $depth_ul =  $depth.find('ul');
			var $depth_w = $depth.width();
			var $depth_ul_w = $depth_ul.width();
			var $btnBox = $depth.find('.btnBox');
			if( $depth_w < $depth_ul_w) {
				$depth.parent().addClass('on');
				$depth.touchFlow({
					axis : "x",
					page: $(".depth2 li.on").index()
				});
				$(".btn_first").on("click", function(e) {
					$depth.data("touchFlow").posX("first");
				});
				$(".btn_last").on("click", function(e) {
					$depth.data("touchFlow").posX("last");
				});
			}else{
				$depth.parent().removeClass('on');
			}
			console.log($depth_w);
			console.log($depth_ul_w);
		});
		*/

		menuCont();
	}

	var headerRe = function() {
		if (!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {
			if ($bnt_all.is('.active')) {
				$bnt_all.click();
			}
		}
	}


	$("footer .btn_family").each(function() {
		var $list = $(this);
		var $btn_s = $list.find('> a');
		var overbox = $list.find('.sbox');
		var menuTime;
		$btn_s.mouseenter(function() {
			overbox.fadeIn(300);
			$list.addClass('on');
			clearTimeout(menuTime);
		});
		$(overbox).mouseleave(function() {
			//overbox.stop().fadeOut(100);
			clearTimeout(menuTime);
			menuTime = setTimeout(mTime, 100);
		});

		function mTime() {
			overbox.stop().fadeOut(100);
			$list.removeClass('on');
		}
	});

	$(window).load(function() {
		windowSize();
		headerRe();
		menuCont;
	});

	$(window).resize(function() {
		windowSize();
		headerRe();
		menuCont;
	});

	$(window).on("orientationchange", function(event) {
		windowSize();
		headerRe();
		menuCont;
	});
	// 탑버튼
	$btn_top.click(function() {
		$("html,body").stop().animate({
			scrollTop: 0
		});
	});

	//서브페이지
	$(".submenubox .submenu").each(function() {
		var sublist = $(this);
		var tit = $(sublist).find('.subTitle');
		$(tit).click(function() {
			//$(this).next('ul').stop().slideToggle();
			$(this).next('ul').toggleClass('on');
			$(tit).toggleClass('ov');
		});
		$(".submenubox .submenu").not().mouseleave(function() {
			//$(this).next('ul').stop().slideUp();
			$(this).next('ul').removeClass('on');
			$(tit).removeClass('ov');
		});
	});
	$(".submenubox .sub_depth2").each(function() {
		var sublist_depth2 = $(this);
		var tit2 = $(sublist_depth2).find('.subTitle_depth2');
		$(tit2).click(function() {
			//$(this).next('.subDepth').stop().slideToggle();
			$(this).next('.subDepth').toggleClass('on');
			$(tit2).toggleClass('ov');
		});
		$(".submenubox .sub_depth2").not().mouseleave(function() {
			//$(this).next('.subDepth').stop().slideUp();
			$(this).next('.subDepth').removeClass('on');
			$(tit2).removeClass('ov');
		});
	});

	for (var i = 1; i <= 10; i++) {
		$("#navi #gnb .menu" + i).clone().appendTo(".lnbM" + i);
	};
	var subTit1 = $(".submenu > ul").children("li.on").children().text();
	$(".submenu p > span").text(subTit1);
	var subTit2 = $(".sub_depth2 .subDepth > ul").children("li.on").children().text();
	$(".sub_depth2 p > span").text(subTit2);
	/*
	$("#lnb p").click(function() {
		$(this).next('div').stop().slideToggle();
		$(this).toggleClass('ov');
	})
	*/
	$(".submenubox .sub_depth").not().mouseleave(function() {
		//$(".sub_depth1 ul").stop().slideUp();
		//$("#lnb .subDepth").stop().slideUp();
		$(".sub_depth1 ul").removeClass('on');
		$("#lnb .subDepth").removeClass('on');
		$("#lnb p").removeClass('ov');
	});

	// 갯수
	//$("#lnb .menu").addClass("li" + $("#lnb .menu li").length);
	/*
	$("#lnb p").click(function() {
		$(this).next('ul').stop().slideToggle();
		$(this).toggleClass('ov');
	})
	var subTit = $("#lnb .depth2").children("li.on").children().text();
	$("#lnb p").text(subTit);
	*/


	//animation
	var $section = $('.ani'),
		bodyScroll, windowHeight;

	function sectionAni() {
		bodyScroll = $(document).scrollTop(),
			windowHeight = $(window).height() / 1.3;

		$section.each(function() {
			if (bodyScroll >= $(this).offset().top + 80 - windowHeight && bodyScroll < $(this).offset().top + $(this).height()) {
				$(this).prev().addClass('line');
				$(this).addClass('on');
				$(this).addClass('over');
				$(this).addClass('subOn');
				$(this).addClass('c_subOn');
			} else {
				$(this).removeClass('on');
			}
		});
	}
	$(function() {
		sectionAni();
	});
	$(window).on('scroll', function() {
		sectionAni();
	});

	//file upload
	var fileTarget = $(".file-hidden");
	fileTarget.on('change', function() {
		if (window.FileReader) {
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).siblings('.upload-name').val(filename);
	});


	$("header .headTop .searchTop").on({
		mouseenter: function() {
			$(this).addClass("on");
		}
	});


	$('.quickMenu .box .btn').on('click', function() {
		if ($(this).parent().is('.active')) {
			$(this).parent().removeClass('active');
			$(this).parent().parent().removeClass('on');
			$('.quickMenu').animate({
				'right': '0'
			}, 300);
		} else {
			$(this).parent().addClass('active');
			$(this).parent().parent().addClass('on');
			$('.quickMenu').animate({
				'right': '0'
			}, 300);
		}
	});

	$('.common_banner > ul').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		infinite: false,
		dots: false,
		arrows: false,
		speed: 500,
		touchMove: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		swipe: true,
		loop: true,
		pauseOnFocus: false,
		focusOnSelect: false,
		pauseOnHover: false,

		responsive: [{
				breakpoint: 640,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 6
				}
			},
		]
	});


	var didScroll;
	var lastScrollTop = 0;
	var delta = 0;
	var subVHeight = $('.subVisual').outerHeight();
	$(window).scroll(function(event) {
		didScroll = true;
	});
	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 1);

	function hasScrolled() {
		var st = $(this).scrollTop();
		if (Math.abs(lastScrollTop - st) <= delta) return;
		if (st > lastScrollTop && st > subVHeight - 28) {
			$('header').addClass('nav');
		} else {
			$('header').removeClass('nav');
		}
		lastScrollTop = didScroll;
	}

	/* service info */
	$(".service-box .expertCont .infobox > a.btn").on("click", function() {
		var info = $(this).siblings('.listbox');
		if (!info.is(':visible')) {
			info.stop().slideDown();
			$(this).parent().parent().addClass('active');
			$(this).addClass('on');
			info.addClass('over');
		} else {
			info.stop().slideUp();
			$(this).removeClass('on');
			$(this).parent().parent().removeClass('active');
			info.removeClass('over');
		};
	});


	$(".tabmenu").addClass("m" + $(".tabmenu li").length);
	$(".subTabmenuCont").addClass("m" + $(".subTabmenuCont li").length);

	/* tab */
	$(".subTabmenu li a").click(function() {
		var index = $(this).parent().index();
		$(".subTabmenu li").removeClass("on");
		$(".subTabmenu li:nth-child(" + (index + 1) + ")").addClass("on");
		$(".subtabCont .tcont").removeClass("active");
		$(".subtabCont .tcont:nth-child(" + (index + 1) + ")").addClass("active");
	});

	$(".company-value .btn_platform a, .company-value .btn_biz a").click(function() {
		$("header").css("z-index", "1");
		$("footer").css("z-index", "1");
		$(".platformCont_pop").addClass("on");
	});
	$(".platformCont_pop .bg, .platformCont_pop .btn_close").click(function() {
		$("header").css("z-index", "9999");
		$("footer").css("z-index", "999");
		$(".platformCont_pop").removeClass("on");
	});


	// img to svg
	document.querySelectorAll('img.svg').forEach(function(img) {
		var imgID = img.id;
		var imgClass = img.className;
		var imgURL = img.src;

		fetch(imgURL).then(function(response) {
			return response.text();
		}).then(function(text) {

			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(text, "text/xml");

			// Get the SVG tag, ignore the rest
			var svg = xmlDoc.getElementsByTagName('svg')[0];

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				svg.setAttribute('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				svg.setAttribute('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			svg.removeAttribute('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
				svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
			}

			// Replace image with new SVG
			img.parentNode.replaceChild(svg, img);

		});
	});
	
});


//popup
function popup(){
	var url = "/kr/sub/company/company_popup.asp";
	var name = "popup test";
	var option = "width = 595, height = 760, top = 100, left = 200, location = no"
	window.open(url, name, option);
}



/* faq */
$(function(){
	$(".faq-list .listbox .contentBox").hide();
	$(".faq-list .listbox .subjectBox").click(function(){
		$(".faq-list .listbox .contentBox").slideUp();
		if($(this).next(".contentBox").css("display") === "none") {
			$(this).next(".contentBox").slideDown();
			$(this).parent().siblings().removeClass("on");
			$(this).parent().addClass("on");
		} else {
			$(this).next(".contentBox").slideUp();
			$(this).parent().removeClass("on");
		}
	});
});



/* 첨부파일  */ 
// Change Input File Path
function setFilePath(el) {
	var $el = $(el);

	$el.next(".input_filePath").val($el.val());
}

// Add Input File
function addFileInput(el) {
	var $el = $(el);
	var $fileList = $el.closest(".input-fileList").prev(".fileList");
	var maxUploadLen = 4;
	var htmlStr;

	if ($fileList.length > 0) {
		maxUploadLen = maxUploadLen - $fileList.find("li").length;
	}

	if ($(".input-fileList li").length < maxUploadLen) {
		var $fileList = $(".input-fileList");
		var uf = $(".input-fileList li").length + 1;

		htmlStr = "<li>\r\n"
				+ "	<label class='ui-input-file w-300'>\r\n"
				+ "		<input type='file' name='sUpFile' id='sUpFile"+ uf +"' onChange=\"javascript:setFilePath(this)\" class='input_file'>\r\n"
				+ "		<input type='text' name='sUpFilePath' id='sUpFilePath"+ uf +"' class='input_filePath' readonly>\r\n"
				+ "	</label>\r\n"
				+ "	<button type='button' onClick=\"javascript:delFileInput(this);\" class='btn btn-md btn-third btn_delFile'><span class='ico-only fa fa-minus'>첨부삭제</span></button>\r\n"
				+ "</li>"

		$fileList.append(htmlStr);

	} else {
		alert("한 게시물에 최대 4개의 화일을 첨부하실수 있습니다!");
	}
}

// Add Input File
function addFileInputMaxLen(el, maxUploadLen) {
	var $el = $(el);
	var $fileList = $el.closest(".input-fileList").prev(".fileList");
//	var maxUploadLen = 4;
	var htmlStr;

	if ($fileList.length > 0) {
		maxUploadLen = maxUploadLen - $fileList.find("li").length;
	}

	if ($(".input-fileList li").length < maxUploadLen) {
		var $fileList = $(".input-fileList");
		var uf = $(".input-fileList li").length + 1;

		htmlStr = "<li>\r\n"
				+ "	<label class='ui-input-file w-300'>\r\n"
				+ "		<input type='file' name='file"+ uf +"' id='sUpFile"+ uf +"' onChange=\"javascript:setFilePath(this)\" class='input_file'>\r\n"
				+ "		<input type='text' name='sUpFilePath' id='sUpFilePath"+ uf +"' class='input_filePath' readonly>\r\n"
				+ "	</label>\r\n"
				+ "	<button type='button' onClick=\"javascript:delFileInput(this);\" class='btn btn-md btn-third btn_delFile'><span class='ico-only fa fa-minus'>첨부삭제</span></button>\r\n"
				+ "</li>"

		$fileList.append(htmlStr);

	} else {
		alert("한 게시물에 최대 " + maxUploadLen + "개의 화일을 첨부하실수 있습니다!");
	}
}


// Delete Input File
function delFileInput(el) {
	var $el = $(el);
	var $list = $el.closest(".input-fileList");

	$el.parent("li").remove();

	$list.find("li").each(function(index, element) {
		$(this).find(".input_file").attr("id","sUpFile"+(index+1));
		$(this).find(".input_filePath").attr("id","sUpFilePath"+(index+1));
	});
}


/* scroll mov
$(function(){
	var top_space = 0;
  if ($('header').length) {
    top_space = $('header').outerHeight();
  }
	$('#gnb > ul > li > div > ul > li a').click(function(event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
	      event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 500);
        return false;
      }
    }
  });
	
  var hash = window.location.hash;
  if (hash && document.getElementById(hash.slice(1))) {
    var $this = $(hash);
    $('html, body').animate({
      scrollTop: $this.offset().top - top_space
    }, 500, function () {
      window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
    });
    console.log($this.offset().top);
  }
});
 */
/* 
var didScroll;
var lastScrollTop = 0;
var delta = 200;
var navbarHeight = $('footer').outerHeight();

$(window).scroll(function(event) {
  didScroll = true;
});
setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();
  if (Math.abs(lastScrollTop - st) <= delta) return;

  if (st > lastScrollTop && st , navbarHeight) {
    $('footer').removeClass('s_off').addClass('on');
  } else {
    if (st + $(window).height() < $(document).height()) {
      $('footer').removeClass('on').addClass('s_off');
    }
  }
  lastScrollTop = st;
}
*/

$(function(){
	stickyFooter();
	$(window).scroll(stickyFooter).resize(stickyFooter);
	
	var $w = $(window),
			footerHei = $('footer').outerHeight() + 100,
			$btn_top = $('#btn_top');
	$w.on('scroll', function() {
		var sT = $w.scrollTop();
		var val = $(document).height() - $w.height() - footerHei;
		if (sT >= val) {
			$btn_top.addClass('active');
		} else {
			$btn_top.removeClass('active');
		}
	});
});

function stickyFooter(){
	document_height = $(document).height(); // 문서 전체 높이
	document_scrollTop = $(document).scrollTop(); // 문서 전체 높이 중 스크롤 위치
	window_height = $(window).height(); // 창 높이
	footer_height = $("footer").height();

	gap = document_height - footer_height - window_height; 
	bottom = document_scrollTop - gap ; 

	if(document_scrollTop > gap){
		$("footer").removeClass('s_off')
		$("footer").addClass('on')
	}else{
		$("footer").addClass('s_off')
		$("footer").removeClass('on')
	}
}

$(function(){
	$(".download-popup").hide();
	$(".board-view .file li a.btn-down").click(function(e){
		e.preventDefault();
		$(".download-popup").show();
	});
	$(".download-popup .body-box .btn-close, .download-popup .bg").click(function(e){
		$(".download-popup").hide();
	});
});



$(function(){
	var languageMap = {
		'kr': 'kr',
		'en': 'en',
	};
	$('.btn-privacy').click(function(e) {
		e.preventDefault();
		var folderPath = location.pathname.replace(/^\//, '').split('/')[0];
		console.log('Current Folder:', folderPath);
		var language = languageMap[folderPath] || 'default';
		console.log('Selected Language:', language);
		$('#privacy .privacyBody .box').hide();
		$('#privacy .privacyBody .box').load('/' + language + '/inc/inc_policy.asp').show();
		$('#privacy').addClass('on');
		//$('#privacy .privacyBody .privacy-box').overlayScrollbars({});
	});

	$('#privacy .btn_close, #privacy .bg').click(function() {
		$('#privacy').removeClass("on");
	});

	$(".inquiry-popup").hide();
	$("footer .l_info .btn-inquiry a").click(function(e){
		e.preventDefault();
		$(".inquiry-popup").show();
	});
	$(".inquiry-popup .body-box .btn-close, .inquiry-popup .bg").click(function(e){
		$(".inquiry-popup").hide();
	});
});
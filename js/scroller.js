
function scroller(config) {
	var slides, windowHeight, documentHeight, prev, next, mobile, menu, cursor, cursorStartPosition = null;
	function prevTest() {
		if (window.scrollY == 0) {
			prev.fadeOut("slow");
		} else {
			prev.fadeIn("slow"); 
		}
	}
	function nextTest() {
		if (documentHeight-windowHeight === window.scrollY) {
			next.fadeOut("slow");
		} else {
			next.fadeIn("slow"); 
		}
	}
	function getSelectedElement(){
		var scrollPos = window.scrollY;
		for (var i=0; i<slides.length; i++){
			if(scrollPos <= slides[i].windowPos + 50) return i; 
		}
		return slides.length-1;
	}
	function calculateElementPosition(el){
		var elHeight = $(el).height();
		if(elHeight >= windowHeight){
			el.windowPos = Math.floor($(el).offset().top);
			//console.log(el.windowPos);
		} else {
			el.windowPos = Math.floor($(el).offset().top - (Math.floor((windowHeight-elHeight)/2)));
			//console.log(el.windowPos)
		}
	}
	function prevSlide() {
		var selectedElement = getSelectedElement();
		if (window.scrollY > slides[selectedElement].windowPos) {
			$('html,body').animate({scrollTop: slides[selectedElement].windowPos},'slow', 'swing', function(){
				$('.top-linked').animate({top: $(slides[selectedElement]).offset().top},'slow');
			});//window.scrollTo(0, slides[selectedElement].windowPos);
		} else if(selectedElement === 0) {
			$('html,body').animate({scrollTop: 0},'slow');//window.scrollTo(0, 0);
			$('.top-linked').animate({top: 8},'slow');
		} else {
			$('html,body').animate({scrollTop: slides[selectedElement-1].windowPos},'slow', 'swing', function(){
				$('.top-linked').animate({top: $(slides[selectedElement-1]).offset().top},'slow');
			});//window.scrollTo(0, slides[selectedElement-1].windowPos);
		}
	};
	function nextSlide() {
		var selectedElement = getSelectedElement();
		if (window.scrollY < slides[selectedElement].windowPos) {
			$('html,body').animate({scrollTop: slides[selectedElement].windowPos},'slow', 'swing', function(){
				$('.top-linked').animate({top: $(slides[selectedElement]).offset().top},'slow');
			});
			$('.top-linked').animate({top: $(slides[selectedElement]).offset().top},'slow');//window.scrollTo(0, slides[selectedElement].windowPos);
		} else if (selectedElement >= slides.length-1) {
			$('html,body').animate({scrollTop: documentHeight}, 'slow', 'swing', function(){
				if(window.scrollY >= documentHeight - windowHeight){
					return;
				}
				$('.top-linked').animate({top: $(slides[selectedElement]).offset().top + $(slides[selectedElement]).height() + $('.top-linked').height()},'slow');
			});//window.scrollTo(0, documentHeight);
			
		} else {
			$('html,body').animate({scrollTop: slides[selectedElement+1].windowPos},'slow', 'swing', function(){
				$('.top-linked').animate({top: $(slides[selectedElement+1]).offset().top},'slow');
			});//window.scrollTo(0, slides[selectedElement+1].windowPos);

		}
	};
	function setMenu(n){
		if (!menu){
			return;
		}
		$(menu + " .selected").each(function(){
			$(this).removeClass("selected");
		});
		switch (n){
			case "top": {
				$(menu + " ul li:first-child").addClass("selected");
				break;
			}
			case "end": {
				$(menu + " ul li:last-child").addClass("selected");
				break;
			}
			default: {
				$(menu + " ul li:nth-child("+ (n+1) +")").addClass("selected");
			}
		}
		
	}
	function goToSlide(n){
		switch (n){
			case "top": {
				$('html,body').animate({scrollTop: 0},'slow');
				setMenu("top");
				break;
			}
			case "end": {
				$('html,body').animate({scrollTop: documentHeight},'slow');
				setMenu("end");
				break;
			}
			default: {
				$('html,body').animate({scrollTop: slides[n-1].windowPos},'slow');
				setMenu(n);
			}
		};
		
	}
	function handleMenu(slide){
		if (window.scrollY === 0) {
			setMenu("top");
			return;
		}
		if (window.scrollY === documentHeight){
			setMenu("end");
			return;
		}
		setMenu(slide);
	}
	function isMobile(){
		var a = window.navigator.userAgent;
// 		document.write(a);
		if(/(android|bb\d+|meego).+mobile|android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|iphone|ipod|ipad|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){
// 			console.log("isMobile");
			return true;
		} 
// 		console.log("!isMobile");
		return false;
	}
	function setup(){
// 		document.write(mobile);
		if (mobile&&config.prev){
			$(config.prev).hide();
		};
		if (mobile&&config.next){
			$(config.next).hide();
		};
		if (mobile&&config.menu){
			$(config.menu).hide();
		};
		if (!jQuery || !config || !config.prev || !config.next || mobile) {
			return;
		}; 
		slides = $(".slide");
		prev = $(config.prev);
		next = $(config.next);
		config.menu ? menu = config.menu : menu = false; 
		windowHeight = $(window).height();
		documentHeight = $(document).height();
		for(var i=0; i<slides.length; i++) {
			calculateElementPosition(slides[i]);
		}
		selectedElement = getSelectedElement();
		handleMenu(selectedElement);
		prevTest();
		nextTest();
	};
	mobile = isMobile();
	setup();
		if(!mobile) {
		$(window).bind("resize", function(){
			setup();
		});
		$(window).scroll(function(){
			var pos = window.scrollY;
			prevTest();
			nextTest();
			window.setTimeout(function(){
				switch(pos){
					case 0:{
						$('.top-linked').animate({top: 8},'slow');
						setMenu("top");
						break;
					}
					case window.scrollY: {
						var sel = getSelectedElement();
						if (window.scrollY === (documentHeight-windowHeight)) {
							if(window.scrollY+$(slides[sel]).height() >= documentHeight){
								$('.top-linked').animate({top: $(slides[sel]).offset().top}, 'slow');
								setMenu("end");
							}else{
								if(window.scrollY >= documentHeight - windowHeight){
									return;
								}
								$('.top-linked').animate({top: $(slides[sel]).offset().top + $(slides[sel]).height() + $('.top-linked').height()},'slow');
								setMenu("end");
							}
						} else {
							$('.top-linked').animate({top: $(slides[sel]).offset().top},'slow');
							setMenu(sel+1);
						}
						break;
					}
				}
			}, 200);
		});
		$(prev).bind("click",function(){
			prevSlide(); 
		});
		$(next).bind("click", function(){
			nextSlide();
		});
		if(menu) {
			$(menu + " ul li").each(function(){
				$(this).bind("click",function(e){
					var i = $(e.target).index();
					switch(i){
						case 0: {
							goToSlide("top");
							break;
						}
						case slides.length+1: {
							goToSlide("end");
							break;
						}
						default: {
							goToSlide(i);
						}
						
					};
				});
			});
		}
	}
	return {
		getSelectedElement: getSelectedElement,
		nextSlide: nextSlide,
		prevSlide: prevSlide
	}
};
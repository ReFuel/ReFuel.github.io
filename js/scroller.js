function scroller(config) {
	var slides, windowHeight, documentHeight, prev, next, selectedElement = null;
	if (!jQuery || !config || !config.prev || !config.next) {
		return;
	}
	slides = $(".slide");
	prev = $(config.prev);
	next = $(config.next);
	windowHeight = $(window).height();
	documentHeight = $(document).height();
	
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
			if(scrollPos <= slides[i].windowPos) return i; 
		}
		return slides.length-1;
	}
	function calculateElementPosition(el){
		var elHeight = $(el).height();
		if(elHeight >= windowHeight){
			el.windowPos = $(el).offset().top;
			console.log(el.windowPos);
		} else {
			el.windowPos = $(el).offset().top - (Math.floor((windowHeight-elHeight)/2));
			console.log(el.windowPos)
		}
	}
	function prevSlide() {
		var selectedElement = getSelectedElement();
		if (window.scrollY > slides[selectedElement].windowPos) {
			$('html,body').animate({scrollTop: slides[selectedElement].windowPos},'slow');//window.scrollTo(0, slides[selectedElement].windowPos);
		} else if(selectedElement === 0) {
			$('html,body').animate({scrollTop: 0},'slow');//window.scrollTo(0, 0);
		} else {
			$('html,body').animate({scrollTop: slides[selectedElement-1].windowPos},'slow');//window.scrollTo(0, slides[selectedElement-1].windowPos);
		}
	};
	function nextSlide() {
		var selectedElement = getSelectedElement();
		if (window.scrollY < slides[selectedElement].windowPos) {
			$('html,body').animate({scrollTop: slides[selectedElement].windowPos},'slow');//window.scrollTo(0, slides[selectedElement].windowPos);
		} else if (selectedElement >= slides.length-1) {
			$('html,body').animate({scrollTop: documentHeight},'slow');//window.scrollTo(0, documentHeight);
		} else {
			$('html,body').animate({scrollTop: slides[selectedElement+1].windowPos},'slow');//window.scrollTo(0, slides[selectedElement+1].windowPos);
		}
		
	};
	for(var i=0; i<slides.length; i++) {
		calculateElementPosition(slides[i]);
	}
	selectedElement = getSelectedElement();
	
	$(window).scroll(function(){
		prevTest();
		nextTest();
	});
	$(prev).bind("click",function(){
		prevSlide(); 
	});
	$(next).bind("click", function(){
		nextSlide();
	});
	return {
		getSelectedElement: getSelectedElement,
		nextSlide: nextSlide,
		prevSlide: prevSlide
	}
};
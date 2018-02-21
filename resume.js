// On ready, we highlight the section that the user is on
$(document).ready(function(){ $(document).scroll()})
// We do the same on resize
$(window).resize(function(){ $(document).scroll() })

// Also on document.ready, if we have Javascript enabled,
// we disable the href navigation in the navbar
// because we'll be handling that in Javascript
// and I don't want all these stupid #id URLs 
// cluttering someone's history.
$(document).ready(function(){ 
	$(".nav").each(function(){
		$(this).removeAttr("href");
	})
})

// PROJECTS: here's some code that'll close projects on esc
// and code that will lock body scrolling when a project is open
$(document).ready(function () {
    $(document).keydown(function(e){
        if(e.keyCode == 27) {
            $('.project-checkbox').each(function() {
            	$(this).prop('checked', false);
            });
        }
    });

    $('#projects').find('label').click(function() {
    	// if a modal is open and about to close (length > 1) then we enable scroll
    	if ($('#projects').find('input:checkbox:checked').length > 0) {
    		$("body").removeClass('noscroll');
    	}
    	else { 
    		$("body").addClass('noscroll');
    	}
	})
})

//Laziness
$(document).ready(function(){

	$(".yt-lazy").addClass("javascript-active");

	$(".yt-lazy").click(function() {
		var h = $(this).height();
		var w = $(this).width();

        $('<iframe/>', {
		    frameborder: '0',
		    allowfullscreen: "",
		    src: "https://www.youtube.com/embed/"+ $(this).attr("data-src") +"?rel=0&showinfo=0&autoplay=1",
		    class: "project-modal-image",
		    height: h+"",
		    width: w+""
		}).appendTo($(this).parent());
		$(this).remove();
        
    });
})

// on scroll, we update the navbar highlighting
timer = null; // we're gonna use this near the end... stay tuned...
$(document).scroll(function(){
	var currentPosition = $(window).scrollTop();
	// We'll cycle through the sections to figure out which one was
	// the last we passed (unless we're at the contact section at the bottom.)
	var last=null;

	$('.section').each(function(){
		// If we've reached the bottom of the contact div, we highlight it in the navbar
		if ($(window).height() + currentPosition >= $("#contact").offset().top + $("#contact").height()) {
			last = $('#contact');
			return false; // break
		}
		// if we've reached a section after our page top
		if (currentPosition < $(this).offset().top) {
			return false; //break
		}
		last = $(this);
	})

	if (last == null ) { 
		return; 
	} else if ( last.attr("id") === "pdf" ) {
		$(".nav").removeClass("active");
		return;
	}
	// Found it! now we unhighlight all and highlight current section
	// if we're dealing with new information
	var target = "#"+last.attr("data-target");
	if (!$(target).hasClass("active")){
	
		$(".nav").removeClass("active");
		$(target).addClass("active");

		// Finally, we try and center the newly highlighted div
		// ONCE the window has stopped scrolling
		if (timer !== null) { clearTimeout(timer) }
		timer = setTimeout(function(){
			var halfway  = $(window).width()/2; //what's the center of our window?
			var navLoc   = $(target).offset().left + $(target).width()/2;
			var offset   = navLoc - halfway; // how much do we move the navbar?
			var scrollTo = $('#navbar').scrollLeft() + offset; // current location plus offset

			$("#navbar").animate({ scrollLeft: scrollTo }, 200);
		}, 200) // we assume after 200ms that the window has stopped scrolling
	}
})

// When we click on a nav button in the nav bar
// we jump to its element
$(".nav").click(function() {
	// target element is stored in the data-target attribute of the .nav button
	var target   = '#'+$(this).attr("data-target");
	// #target.offset().top returns the vertical position
	var position = $(target).offset().top;

	// and we jump to the position, plus two to make sure we trigger the navbar animation
	$("html, body").animate({ scrollTop: position+2 }, 500);
});
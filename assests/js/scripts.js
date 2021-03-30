var Tinitell = {

	setupNavigation: function() {
		$('#menu-link').click(function(e) {
			e.preventDefault();
		
			if(!$('body').hasClass('visible-nav')) {
				$('body').addClass('visible-nav');
			}
			else {
				$('body').removeClass('visible-nav');
			}
		
		});
		
		
	},
	
	setupVideoOverlay: function() {
		$("a.play-movie").click(function(e) {
			e.preventDefault();
		
			var videoMarkup = '<div class="overlay-video"><div class="background"></div><div class="video"><div class="video-responsive"></div></div></div>';
		
			$('body').prepend(videoMarkup);
			$('.overlay-video').fadeIn("fast", function() {
				$('.video-responsive').html('<iframe src="http://www.youtube.com/embed/5g65ANaVnL4" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
			});
			// $('.overlay-video').fadeIn("fast", function() {
			// 	$('.video-responsive').html('<iframe src="https://www.youtube.com/watch?v=T36EOLyS4l0;byline=0&amp;portrait=&autoplay=1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
			// });
			
		});
	
		$(document).on( "click", ".overlay-video .background", function() {
		  $('.overlay-video').fadeOut('fast', function() { $('.overlay-video').remove(); });
		});
		
		$(document).keyup(function(e) {
		     if (e.keyCode == 27) { // escape key maps to keycode `27`
		    	  $('.overlay-video').fadeOut('fast', function() { $('.overlay-video').remove(); });
		    }
		});
		
		// Temp fix for mobile
		$('html').on('touchstart', function(e) {
		    $('.overlay-video').fadeOut('fast', function() { $('.overlay-video').remove(); });
		});
		$(".overlay-video").on('touchstart',function(e) {
		    e.stopPropagation();
		});
		
		
	},
	
	randomClass: function(test) {
		var list = $(test).toArray();
		var elemlength = list.length;
		var randomnum = Math.floor(Math.random()*elemlength);
		return list[randomnum];
	},
	
	setupSlideshow: function() {
			
		$('.product-pagination a').on('click', function(e) {
			e.preventDefault();
			var color = $(this).data('color');
			var slides = $('.product-colors li');
			var colors = $('.product-pagination a');
						
			// Pagination
			$('.product-pagination a').removeClass('active');
			$(this).addClass('active');
				
			// Slide
			slides.each(function() {	
				if($(this).data('color') == color) {
					$(this).addClass('active');
				}
				else {
					$(this).removeClass('active');
				}
			});
			
			// Background
			$('.module-slideshow').attr('class', 'module module-slideshow animate ' + color);
		});
		
		Tinitell.randomizeFirstSlide();
		
		
	},
	
	randomizeFirstSlide: function() {
		var randomColor = $(Tinitell.randomClass('.product-pagination li')).children('a');
		var randomColorSlide = randomColor.data('color');
		var slides = $('.product-colors li');
		
		// Remove active slide
		$('.module-slideshow').attr('class', 'module module-slideshow');
		$('.product-pagination a').removeClass('active');
		$('.product-colors li').removeClass('active');
		
		// Randomize pagination
		$(randomColor).addClass('active');
		
		slides.each(function() {	
			if($(this).data('color') == randomColorSlide) {
				$(this).addClass('active');
			}
			else {
				$(this).removeClass('active');
			}
		});
		
		// Active randomized slide
		$('.module-slideshow').attr('class', 'module module-slideshow ' + randomColorSlide);
		
		// Add animation
		setTimeout(function() {
		     $('.module-slideshow').addClass('animate');
		 }, 200);		
	},
	
	setupForm: function() {
		if($('form.contact').length) {
			
			var inputs = $('form .field.text');
			
			inputs.each(function() {
				var fieldName = $(this).children('label');
				var fieldInput = $(this).children('input');
								
				fieldName.hide();
				fieldInput.attr('placeholder', fieldName.text());
			});
			
			
		}
	},
	
	setupSignUp: function() {
		var closeLink = $('.signup .closeOverlay');
		
		// Animate overlay
		if(!$('.signup-overlay').hasClass('confirmation')) {
			setTimeout(function() {
			     $('.signup-overlay').fadeIn('slow');
			 //}, 200);	
			 }, 2000);
		}
		else {
			$('.signup-overlay').show();
		}
		
		// Close link
		$(closeLink).on('click', function(e) {
			e.preventDefault();
			$('.signup-overlay').hide();
		});
		
		// Background click
		$('.signup-overlay .signup-background').on('click', function(e) {
			$('.signup-overlay').hide();
		});
		
		// Validation
    $('#registration_form').submit(function(e) {
        var email = $('#register_email').val();
        email = email.replace(/^\s+|\s+$/g, "");
        if (Tinitell.validateEmail(email)) {
					console.log('true');
            return true;
        } else {
					$('#register_email').addClass('required');
					console.log('false');
            return false;
        }
    });
		
		$('#register_email').focus(function() {
			$(this).removeClass('required');
		});
		
	},
	
	scrollToDiv: function(val) {
	  $('html, body').animate({
	      scrollTop: $(val).offset().top
	  }, 500);
	},
	
	goToDiv: function(val) {
		$(window).scrollTop($(val).offset().top);
	},
	
	SVGtoPNG: function() {
		if (!Modernizr.svg) {
			$('img[src*="svg"]').attr('src', function() {
			    return $(this).attr('src').replace('.svg', '.png');
			});
		}
	},
	
	changeNavBackground: function() {
		if($(this).scrollTop() > 0) {
			$('#header').addClass('sticky');
		}
		else {
			$('#header').removeClass('sticky');
		}
	},
	
	validateEmail: function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
	},
	
	init: function() {		
		Tinitell.setupNavigation();
		Tinitell.setupVideoOverlay();
		Tinitell.setupSlideshow();
		Tinitell.SVGtoPNG();
		Tinitell.setupForm();
		Tinitell.setupSignUp();
		$('a.learn-more').click(function(e) { e.preventDefault(); Tinitell.scrollToDiv('.module-video');});
		//$('a.buy-now').click(function(e) { e.preventDefault(); Tinitell.goToDiv('.module-products');});
	}
	
};

$("body").click(function(e){
	  //you can then check what has been clicked
	var target = e.target;
	if (target.className != 'icon menu'){
		$('body').removeClass('visible-nav');
	}
});


$(document).ready(Tinitell.init);
//$(window).scroll(Tinitell.changeNavBackground);

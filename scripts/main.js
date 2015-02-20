var great = (function(){
		var responsiveStates = (function(){
		return {
			init : function(){
				ssm = ssm || {};

				ssm.addStates([
					{
						id :'xs',
						maxWidth: 479
					},
					{
						id :'sm',
						minWidth: 480,
						maxWidth: 767
					},
					{
						id :'md',
						minWidth: 768,
						maxWidth: 991
					},
					{
						id :'lg',
						minWidth: 992
					}] 
					).ready();
				},
				is: function(state){
					var states = ssm.getCurrentStates();
					for ( var prop in states ){
						if (states.hasOwnProperty(prop)){
							if (states[prop].id === state){
								return true;
							}
						}
					}
					return false;

				}
		};
	}());

	var menu = (function(){
		var timeout;

		var toggle = function(){
			if (timeout){
				timeout=false;
				$('body').toggleClass('menu-open');
				setTimeout(function(){timeout=true;},100);
			}
		};

		var dropDownTop = function(){

		};

		return {
			init: function(){
				timeout = true;
				$(document).on('click touchup', '.menu-btn, .menu-open .menu-pusher, .menu .close', toggle);
			},
			toggle: toggle
		};
	}());

	var windowHeight = (function(){
		var $widgets = $('[data-widget*="windowHeight"]');
		var resize = function($object){
			var height =$(window).height();
			var paddingHeight = parseInt($object.css('padding-top'))+parseInt($object.css('padding-bottom'));

			height = height-paddingHeight;

			if ($object.attr('data-windowHeight')==="subtractHeader"){
				height = height - $('.top-header-primary').outerHeight();
			}
			$object.height(height);

		};

		return {
			init: function(){
				$widgets.each(function(){
					$widget=$(this);
					resize($widget);
					$(window).on('resize', function(){
						resize($widget);
					});
				});
			}
		};
	}());

	var scrollToId = (function(){
		var $widgets = $('[data-widget="scrollToId"]');

		var getIdPos = function(id){
			return $(id).offset().top - $('.top-header-dropdown').outerHeight();
		};

		var scrollToPos = function(position){
			$('html,body').animate({scrollTop: position}, '500', 'swing');
		};

		return {
			init: function(){
				$('[data-widget="scrollToId"]').on('click', function(e){
					e.preventDefault();
					var link = $(this).attr('href');
					var id = getIdPos(link);
					scrollToPos(id);
				});
			}
		};
	}());

	var topHeader = (function(){
		var $logo = $('.top-header .logo');
		var $menuBtn = $('.top-header .menu-btn');
		var $header = $('.top-header');
		var $secondary;
		var $dropdown = $('<div class="top-header-dropdown js-hide" />');
		var $primary = $('<div class="top-header-dropdown-primary" />');
		var secondaryOffset = 500;

		var getSecondaryDropdownPos = function(){
			if($('.nav-page').length){
				return $('article .nav-page').position().top - $primary.outerHeight();
			}
			return 500;
		};

		var showLogo = function(callback){
			$logo.removeClass('js-hide');
			setTimeout(function(){
				if (typeof callback === 'function') {
					callback();
				}
			},300);
		};

		var hideLogo = function(callback){
			$logo.addClass('js-hide');
			setTimeout(function(){
				if (typeof callback === 'function') {
					callback();
				}
			},300);
		};

		var hideMenuBtn = function(callback){
			$menuBtn.addClass('js-hide');
			setTimeout(function(){
				if (typeof callback === 'function') {
					callback();
				}
			},300);
		};

		var showMenuBtn = function(callback){
			$menuBtn.removeClass('js-hide');
			setTimeout(function(){
				if (typeof callback === 'function') {
					callback();
				}
			},300);
		};

		var showDropdown = function(callback){
			$dropdown.removeClass('js-hide');
			
			setTimeout(function(){					
				if (typeof callback === 'function') {
					callback();
				}
			},400);
		};

		var hideDropdown = function(callback){
			$dropdown.addClass('js-hide');
			setTimeout(function(){
				$header.removeClass('top-header-dropdown');

				if (typeof callback === 'function') {
					callback();
				}
			},400);
		};

		var showDropdownSecondary = function(callback){
			if (typeof $secondary!=="undefined"){
				$secondary.removeClass('js-hide');
			}
		};

		var hideDropdownSecondary = function(callback){
			if (typeof $secondary!=="undefined"){
				$secondary.addClass('js-hide');
			}
		};

		var toggleDropdownSecondary = function(callback){
			if (typeof $secondary!=="undefined"){
				$secondary.toggleClass('js-hide');
			}
		};

		if ($('.nav-page').length){
			$secondary = $('.nav-page').clone();
			$('body').scrollspy({ target: '.nav-page', offset: 140 });

		}
		else if ($('.secondary-menu').length){
			$secondary = $('.secondary-menu').clone();
		}


		return {
			init : function() {
				$primary.append($logo.clone())
					.append($menuBtn.clone());
				$dropdown.append($primary).append($secondary);
				hideDropdownSecondary();
				$('body').prepend($dropdown);
				pageAnimation.show('.top-header-dropdown .menu-btn');

				$(window).on('scroll',function(){
					if($(this).scrollTop()>152){
						topHeader.showDropdown();
					} else {
						topHeader.hideDropdown();
					}
					if($(this).scrollTop() > getSecondaryDropdownPos()){
						topHeader.showDropdownSecondary();
					} else {
						topHeader.hideDropdownSecondary();
					}
				});
			},
			showLogo: showLogo,
			hideLogo: hideLogo,
			showMenuBtn: showMenuBtn,
			hideMenuBtn: hideMenuBtn,
			showDropdown: showDropdown,
			hideDropdown: hideDropdown,
			showDropdownSecondary: showDropdownSecondary,
			hideDropdownSecondary: hideDropdownSecondary,
			toggleDropdownSecondary: toggleDropdownSecondary
		};
	}());

	var pageAnimation = (function(){

		$('body').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(){
			$('body').scrollspy('refresh');
			scrollAnimate.animateVisible();
		});
		var animation = $('body').data('animation');

		var show = function(selector){
			$(selector).removeClass('js-hide');
		};

		var hide = function($domObject){
			$(selector).addClass('js-hide');
		};

		var toggle = function($domObject){
			$(selector).toggleClass('js-hide');
		};

		return {
			init: function(){
				switch(animation){
					case "home":
						setTimeout(function(){ show('body'); }, 500);
						setTimeout(function(){ show('.welcomeBox'); }, 1000);
						setTimeout(function(){ show('.top-header-primary'); }, 1500);
						setTimeout(function(){ show('.cookies'); }, 1500);
						setTimeout(topHeader.showMenuBtn, 1900);
						break;
					case "prelive":
						setTimeout(function(){ show('body'); }, 500);
						setTimeout(function(){ show('.top-header'); }, 1500);
						setTimeout(function(){ show('.welcomeBox'); }, 1800);				
						break;
					case "standard":
						setTimeout(function(){ show('body'); }, 500);
						setTimeout(function(){ show('.top-header-primary'); }, 1000);
						setTimeout(function(){ show('.cookies'); }, 1000);
						setTimeout(topHeader.showMenuBtn, 1500);
						break;
				}
			},
			show: show,
			hide: hide,
			toggle: toggle
		};
	}());

	var eventsCarousel = (function(){
		var $widget = $('[data-widget="eventsCarousel"]');
		var $next = $widget.find('.next');
		var $prev = $widget.find('.prev');
		var $event = $widget.find('.event');
		var $events = $widget.find('.events');
		var position = 0;

		var move = function(newPos){
			var width, margin;

			resizeObjects(function(){
				width = $event.outerWidth() + parseInt($event.css('margin-right'));
				margin = width * newPos;
				
				if (newPos <= $event.length){

					if(responsiveStates.is('xs') || responsiveStates.is('sm') || responsiveStates.is('md')){

						margin=margin-($('.container-text').width()*0.5)+($event.outerWidth()*0.5);
					}
					$events.css('margin-left', -margin);
					position = newPos;
					$events.find('.active').removeClass('active');
					$event.eq(newPos).addClass('active');
				}
				if(position<=0){
					$prev.hide();
				} else {
					$prev.show();
				}
				if(position>=($event.length - 1)){
					$next.hide();
				} else {
					$next.show();
				}

			});

		};


		var next = function(e){
			e.preventDefault();
			move(position + 1);
		};
		var prev = function(e){
			e.preventDefault();
			move(position - 1);
		};

		var resizeObjects = function(callback){
			setTimeout(function(){
				if(responsiveStates.is('xs') || responsiveStates.is('sm')){
					$event.width($('.container-text').width()*0.7);
					$events.width(9999);
				}	else if(responsiveStates.is('md')){
					$event.width($('.container-text').width()*0.8);
					$events.width(9999);
				} else {
					$event.css("width","");
					$events.css("width","");
				}
				if(typeof callback === "function"){
					callback();
				}
			},100);
				
		};

		return {
			init: function(){
				if ($widget.length){
					$next.on('click',next);
					$prev.on('click',prev);

					position = $widget.find('.active').index();
					move(position);

					$(window).on('resize',function(){
						move(position);
					});
				}
			}
		};
	}());

	carousel = (function(){
		var $widget = $('[data-widget="carousel"]');
		var $next = $widget.find('.next');
		var $prev = $widget.find('.prev');
		var $panel = $widget.find('.carousel-panel');
		var position = 0;
		var moving = false;

		var move = function(newPos, direction){
			var prevDirection, nextDirection;

			nextDirection = direction === 'prev' ? 'left' : 'right';
			prevDirection = direction === 'prev' ? 'right' : 'left';

			if(!moving){
				moving = true;

				$newPanel = $panel.eq(newPos);
				$prevPanel = $widget.find('.active'); 
				if ($newPanel == $prevPanel){
					return;
				}

				$newPanel.addClass('active '+ nextDirection);
				$prevPanel.addClass(prevDirection);
				setTimeout(function(){$newPanel.removeClass(nextDirection);},0);
				$newPanel.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(){
					$prevPanel.removeClass('active '+ prevDirection);
					moving = false;
				});
				if(!Modernizr.csstransitions){
					$prevPanel.removeClass('active '+ prevDirection);
					moving=false;
				}
				position = newPos;
			}
			
		};


		var next = function(e){
			e.preventDefault();
			var newPos = position + 1;
			if(position >= ($panel.length-1)){
				newPos = 0;
			}
			move(newPos, 'next');
		};

		var prev = function(e){
			e.preventDefault();
			var newPos = position - 1 ;
			if(position === 0){
				newPos = $panel.length - 1;
			}
			move(newPos, 'prev');
		};

		var resizeObjects = function(callback){
			setTimeout(function(){
				$panel.width($(window).width());

			},100);
				
		};

		return {
			init: function(){
				if ($widget.length){
					$next.on('click',next);
					$prev.on('click',prev);
					//move(position);

					resizeObjects();
					$(window).on('resize',function(){
						resizeObjects();
					});
				}
			},
			move: move
		};
	}());

	var isotope = (function(){
		$widget = $('[data-widget="isotope"]');
		$tiles = $widget.find('.tiles');
		return {
			init: function(){
				if($widget.length){
					$tiles.isotope();

					$(window).on('load resize',function(){
						$tiles.isotope('reLayout');
					});
					
					$widget.find('[data-filter]').on('click',function(){
						var filter = $(this).attr('data-filter');
						$tiles.isotope({filter:filter});

						$('.active[data-filter]').removeClass('active');
						$(this).addClass('active');
					});
				}
			}
		};
	}());

	var tileClick = (function(){
		$tile = $('.tile-block');
		return {
			init: function(){
				if($tile.length && Modernizr.touch){
					$tile.on('click',function(){
						$(this).toggleClass('active');
					});
				}
			}
		};
	}());

	var signupForm = (function(){
		$link = $('a.signup');
		return {
			init: function(){
				if($link.length && (responsiveStates.is('md') || responsiveStates.is('lg'))){
					$link.colorbox({
						inline:'true',
						width:'400px',
						close:'&times;',
						href:'#signupform'
					});
					$('form').on('submit',function(){
						setTimeout(function(){$.colorbox.resize();},100);
					});
				}
			}
		};
	}());

	var validate = (function(){
		$form = $('form');
		return {
			init: function(){
				if($form.length){
					$form.validate(
					{
						rules:{
							email:{
								required:true,
								email:true
							},
						},
						messages:{
							email:{
								email: $form.data('email-validate'),
								required:  $form.data('required')
							},
							name:{
								required:  $form.data('required')
							},
							message:{
								required:  $form.data('required')
							}
						}
					});
				}
			}
		};
	}());


	var languageSelect = (function(){
		return {
			init: function(){
				if($('.language-select').length){
					$('.language-select').on('click',function(){
						$(this).toggleClass('active');
					});
				}
			}
		};
	}());

	var bgShuffle = (function(){
		var $widget = $('[data-widget="bgShuffle"]');
		return {
			init: function(){
				if ($widget.length){
					setInterval(function(){
						$current=$widget.find('.shuffle-bg.active');
						$next = $current.next('.shuffle-bg');
						if(!$next.length){
							$next = $widget.find('.shuffle-bg').first();
						}
						$current.removeClass('active');
						$next.addClass('active');
					},$widget.data('transition-delay'));
				}
			}
		};
	}());

	var scrollAnimate = (function(){
		var $selector = $('.animate-slide');

		var animateVisible = function(){
			var offsetAmount;
			var windowBottom = $(window).scrollTop() + $(window).height();

			$selector.each(function(){
				offsetAmount = 100+ (30*parseInt($(this).data("slideinorder")));
				if(!$('this').hasClass('animated') && ((windowBottom-offsetAmount) > $(this).offset().top )){
					$(this).addClass('animated');
				}
			});
		};

		return {
			init: function(){
				if(!Modernizr.touch && Modernizr.cssanimations){
					$(window).scroll(animateVisible);					
				}
			}, 
			animateVisible : animateVisible
		};
	}());	

	var cookies = (function(){
		return {
			init: function(){
				var $cookiesbar = $('.cookies');
				if($cookiesbar.length){
					$cookiesbar.find('.close').on('click',function(){
						$cookiesbar.remove();
					});					
				}
			}
		};
	}());

	return{
		init : function(){
			menu.init();
			responsiveStates.init();
			topHeader.init();
			pageAnimation.init();
			windowHeight.init();
			scrollToId.init();
			isotope.init();
			eventsCarousel.init();
			carousel.init();
			tileClick.init();
			signupForm.init();
			validate.init();
			languageSelect.init();
			bgShuffle.init();
			scrollAnimate.init();
			cookies.init();
		},
		topHeader : topHeader,
		responsiveStates : responsiveStates
	};
}());

$(document).ready(great.init);
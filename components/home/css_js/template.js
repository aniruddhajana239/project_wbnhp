/* Theme Name:iDea - Clean & Powerful Bootstrap Theme
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Author e-mail:htmlcoder.me@gmail.com
 * Version: 1.6
 * Created:October 2014
 * License URI:http://support.wrapbootstrap.com/
 * File Description: Initializations of plugins
 */

(function($){
	$(document).ready(function(){

		// Enable Smooth Scroll only on Chrome and only on Win and Linux Systems
		var platform = navigator.platform.toLowerCase();
		if ((platform.indexOf('win') == 0 || platform.indexOf('linux') == 0) && !Modernizr.touch) {
			if ($.browser.webkit) {
				$.webkitSmoothScroll();
				console.log("hello webkit");
			}
		};
		//Show dropdown on hover only for desktop devices
		//-----------------------------------------------
		if ((Modernizr.mq('only all and (min-width: 768px)') && !Modernizr.touch) || $("html.ie8").length>0) {
			$('.main-navigation .navbar-nav>li.dropdown, .main-navigation li.dropdown>ul>li.dropdown').hover(
			function(){
				var $this = $(this);
				$this.addClass('open').slideDown();
				$this.find('.dropdown-toggle').addClass('disabled');
			},	function(){
				$(this).removeClass('open');
				$(this).find('.dropdown-toggle').removeClass('disabled');
			});
		};

		//Show dropdown on click only for mobile devices
		//-----------------------------------------------
		if (Modernizr.mq('only all and (max-width: 767px)') || Modernizr.touch) {
			$('.header [data-toggle=dropdown], .header-top [data-toggle=dropdown]').on('click', function(event) {
			// Avoid following the href location when clicking
			event.preventDefault();
			// Avoid having the menu to close when clicking
			event.stopPropagation();
			// close all the siblings
			$(this).parent().siblings().removeClass('open');
			// close all the submenus of siblings
			$(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
			// opening the one you clicked on
			$(this).parent().toggleClass('open');
			});
		};


		//Owl carousel
		//-----------------------------------------------
		if ($('.owl-carousel').length>0) {
			$(".owl-carousel.carousel").owlCarousel({
				items: 4,
				dots: false,
				nav: true,
				navText: false,
				autoplay: false,
				loop: true
			});
			$(".owl-carousel.carousel-autoplay").owlCarousel({
				items: 4,
				autoplay: true,
				autoplayTimeout: 5000,
				autoplaySpeed: 700,
				dots: false,
				nav: true,
				navText: false,
				loop: true
			});
			$(".owl-carousel.clients").owlCarousel({
				items: 3,
				autoplay: true,
				autoplayTimeout: 5000,
				autoplaySpeed: 700,
				dots: false,
				loop: true,
				responsive:{
					479:{
						items:3
					},
					768:{
						items:4
					},
					992:{
						items:5
					},
					1200:{
						items:5
					}
				}
			});
			$(".owl-carousel.content-slider").owlCarousel({
				items: 1,
				autoplay: true,
				autoplayTimeout: 5000,
				autoplaySpeed: 700,
				nav: false,
				navText: false,
				dots: false,
				loop: true
			});
			$(".owl-carousel.content-slider-with-controls").owlCarousel({
				items: 1,
				nav: true,
				navText: false,
				dots: true,
				autoplay: false,
				loop: true
			});
			$(".owl-carousel.content-slider-with-controls-autoplay").owlCarousel({
				items: 1,
				autoplay: true,
				autoplayTimeout: 5000,
				autoplaySpeed: 700,
				nav: true,
				navText: false,
				dots: true,
				loop: true
			});
			$(".owl-carousel.content-slider-with-controls-bottom").owlCarousel({
				items: 1,
				nav: true,
				navText: false,
				autoplay: false,
				dots: true,
				loop: true
			});
		};

		// Animations
		//-----------------------------------------------
		if (($("[data-animation-effect]").length>0) && !Modernizr.touch) {
			var delay = 0;
			$("[data-animation-effect]").each(function() {
				var item = $(this),
				animationEffect = item.attr("data-animation-effect");

				if(Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
					item.appear(function() {
						if(item.attr("data-effect-delay")) item.css("effect-delay", delay + "ms");
						setTimeout(function() {
							item.addClass('animated object-visible ' + animationEffect);

						}, item.attr("data-effect-delay"));
					}, {accX: 0, accY: -130});
				} else {
					item.addClass('object-visible');
				}
			});
		};

		// Text Rotators
		//-----------------------------------------------
		if ($(".text-rotator").length>0) {
			$(".text-rotator").each(function() {
				var tr_animationEffect = $(this).attr("data-rotator-animation-effect");
				$(this).Morphext({
					animation: ""+tr_animationEffect+"", // Overrides default "bounceIn"
					separator: ",", // Overrides default ","
					speed: 5000 // Overrides default 2000
				});
			});
		};

		// Stats Count To
		//-----------------------------------------------
		if ($(".stats [data-to]").length>0) {
			$(".stats [data-to]").each(function() {
				var stat_item = $(this),
				offset = stat_item.offset().top;
				if($(window).scrollTop() > (offset - 800) && !(stat_item.hasClass('counting'))) {
					stat_item.addClass('counting');
					stat_item.countTo();
				};
				$(window).scroll(function() {
					if($(window).scrollTop() > (offset - 800) && !(stat_item.hasClass('counting'))) {
						stat_item.addClass('counting');
						stat_item.countTo();
					}
				});
			});
		};

		// Isotope filters
		//-----------------------------------------------
		if ($('.isotope-container').length>0 || $('.masonry-grid').length>0 || $('.masonry-grid-fitrows').length>0) {
			$('.masonry-grid').isotope({
				itemSelector: '.masonry-grid-item',
				layoutMode: 'masonry'
			});
			$('.masonry-grid-fitrows').isotope({
				itemSelector: '.masonry-grid-item',
				layoutMode: 'fitRows'
			});
			$('.isotope-container').fadeIn();
			var $container = $('.isotope-container').imagesLoaded( function() {
				$container.isotope({
					itemSelector: '.isotope-item',
					layoutMode: 'masonry',
					transitionDuration: '0.6s',
					filter: "*"
				});
			});
			// filter items on button click
			$('.filters').on( 'click', 'ul.nav li a', function() {
				var filterValue = $(this).attr('data-filter');
				$(".filters").find("li.active").removeClass("active");
				$(this).parent().addClass("active");
				$container.isotope({ filter: filterValue });
				return false;
			});
		};

		//hc-tabs
		//-----------------------------------------------
		if ($('.hc-tabs').length>0) {
			$(window).on('load', function (e) {
				var currentTab = $(".hc-tabs .nav.nav-tabs li.active a").attr("href"),
				tabsImageAnimation = $(".hc-tabs-top").find("[data-tab='" + currentTab + "']").attr("data-tab-animation-effect");
				$(".hc-tabs-top").find("[data-tab='" + currentTab + "']").addClass("current-img show " + tabsImageAnimation + " animated");

				$('.hc-tabs .nav.nav-tabs li a').on('click', function(event) {
					var currentTab = $(this).attr("href"),
					tabsImageAnimation = $(".hc-tabs-top").find("[data-tab='" + currentTab + "']").attr("data-tab-animation-effect");
					$(".current-img").removeClass("current-img show " + tabsImageAnimation + " animated");
					$(".hc-tabs-top").find("[data-tab='" + currentTab + "']").addClass("current-img show " + tabsImageAnimation + " animated");
				});
			});

		}

		// Animated Progress Bars
		//-----------------------------------------------
		if ($("[data-animate-width]").length>0) {
			$("[data-animate-width]").each(function() {
				$(this).appear(function() {
					$(this).animate({
						width: $(this).attr("data-animate-width")
					}, 800 );
				}, {accX: 0, accY: -100});
			});
		};

		// Animated Progress Bars
		//-----------------------------------------------
		if ($(".knob").length>0) {
			$(".knob").knob();
		}

		// Charts
		//-----------------------------------------------
		if ($(".graph").length>0) {
			// Creates random numbers you don't need this for real graphs
			var randomScalingFactor = function(){ return Math.round(Math.random()*500)};

			if ($(".graph.line").length>0) {
				// Data for line charts
				var lineChartData = {
					labels: ["January", "February", "March", "April", "May", "June", "July"],
					datasets: [
					{
						label: "My First dataset",
						fill: false,
						lineTension: 0.1,
						backgroundColor: "rgba(75,192,192,0.4)",
						borderColor: "rgba(75,192,192,1)",
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: "rgba(75,192,192,1)",
						pointBackgroundColor: "#fff",
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: "rgba(75,192,192,1)",
						pointHoverBorderColor: "rgba(220,220,220,1)",
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: [65, 59, 80, 81, 56, 55, 40],
						spanGaps: false,
					}
					]
				};

				// Line Charts Initialization
				var ctx = document.getElementById("lines-graph").getContext("2d");
				var LineChart = new Chart(ctx, {
					type: 'line',
					data: lineChartData,
					responsive: true,
					bezierCurve : false
				});
			}
			if ($(".graph.bar").length>0) {
				// Data for bar charts
				var barChartData = {
					labels: ["January", "February", "March", "April", "May", "June", "July"],
					datasets: [
					{
						label: "My First dataset",
						backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1,
						data: [65, 59, 80, 81, 56, 55, 40],
					}
					]
				};

				// Bar Charts Initialization
				var ctx = document.getElementById("bars-graph").getContext("2d");
				var BarChart = new Chart(ctx, {
					type: 'bar',
					data: barChartData,
					responsive : true
				});
			}
			if ($(".graph.pie").length>0) {
				// Data for pie chart
				var pieData = {
					labels: [
					"Red",
					"Blue",
					"Yellow"
					],
					datasets: [
					{
						data: [300, 50, 100],
						backgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
						],
						hoverBackgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
						]
					}]
				};

				// Pie Chart Initialization
				var ctx = document.getElementById("pie-graph").getContext("2d");
				var PieChart = new Chart(ctx,{
					type: 'pie',
					data: pieData
				});
			}
			if ($(".graph.doughnut").length>0) {
				// Data for doughnut chart
				var doughnutData = {
					labels: [
					"Red",
					"Blue",
					"Yellow"
					],
					datasets: [
					{
						data: [300, 50, 100],
						backgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
						],
						hoverBackgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
						]
					}]
				};

				// Doughnut Chart Initialization
				var ctx = document.getElementById("doughnut-graph").getContext("2d");
				var DoughnutChart = new Chart(ctx, {
					type: 'doughnut',
					data: doughnutData,
					responsive : true
				});
			}
		};

		// Magnific popup
		//-----------------------------------------------
		/*if (($(".popup-img").length > 0) || ($(".popup-iframe").length > 0) || ($(".popup-img-single").length > 0)) {
			$(".popup-img").magnificPopup({
				type:"image",
				gallery: {
					enabled: true,
				}
			});
			$(".popup-img-single").magnificPopup({
				type:"image",
				gallery: {
					enabled: false,
				}
			});
			$('.popup-iframe').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				preloader: false,
				fixedContentPos: false
			});
		};*/

		// Fixed header
		//-----------------------------------------------
		var	headerTopHeight = $(".header-top").outerHeight(),
		headerHeight = $("header.header.fixed").outerHeight();
		$(window).scroll(function() {
			if (($(".header.fixed").length > 0)) {
				if(($(this).scrollTop() > headerTopHeight+headerHeight) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
					$(".header.fixed").addClass('animated object-visible fadeInDown');
					if (!($(".header.transparent").length>0)) {
						if ($(".banner:not(.header-top)").length>0) {
							$(".banner").css("marginTop", (headerHeight)+"px");
						} else if ($(".page-intro").length>0) {
							$(".page-intro").css("marginTop", (headerHeight)+"px");
						} else if ($(".page-top").length>0) {
							$(".page-top").css("marginTop", (headerHeight)+"px");
						} else {
							$("section.main-container").css("marginTop", (headerHeight)+"px");
						}
					}
				} else {
					$("body").removeClass("fixed-header-on");
					$("section.main-container").css("marginTop", (0)+"px");
					$(".banner").css("marginTop", (0)+"px");
					$(".page-intro").css("marginTop", (0)+"px");
					$(".page-top").css("marginTop", (0)+"px");
					$(".header.fixed").removeClass('animated object-visible fadeInDown');
				}
			};
		});

		// Sharrre plugin
		//-----------------------------------------------
		if ($('#share').length>0) {
			var list = ['facebook', 'twitter'];
			$('#share').sharrre({
				share: {
					facebook: true,
					twitter: true
				},
				buttons: {
					facebook: {
						popup: {
							width: 1200,
							height: 900
						}
					},
					twitter: {}
				},
				enableCounter: false,
				enableHover: false,
				template: '<ul class="social-links clearfix"><li class="facebook"><a href="#"><i class="fa fa-facebook"></i></a></li><li class="twitter"><a href="#"><i class="fa fa-twitter"></i></a></li></ul>',
				render: function (api, options) {
					for (i in list) {
						service = list[i];
						$(api.element).on('click', '.' + service, function () {
						api.openPopup(this.className);
						});
					}
				}
			});
		};

		// Contact forms validation
		//-----------------------------------------------
		if($("#contact-form").length>0) {
			$("#contact-form").validate({
				submitHandler: function(form) {
					$('.submit-button').button("loading");
					$.ajax({
						type: "POST",
						url: "php/email-sender.php",
						data: {
							"name": $("#contact-form #name").val(),
							"email": $("#contact-form #email").val(),
							"subject": $("#contact-form #subject").val(),
							"message": $("#contact-form #message").val()
						},
						dataType: "json",
						success: function (data) {
							if (data.sent == "yes") {
								$("#MessageSent").removeClass("hidden");
								$("#MessageNotSent").addClass("hidden");
								$(".submit-button").removeClass("btn-default").addClass("btn-success").prop('value', 'Message Sent');
								$("#contact-form .form-control").each(function() {
									$(this).prop('value', '').parent().removeClass("has-success").removeClass("has-error");
								});
							} else {
								$("#MessageNotSent").removeClass("hidden");
								$("#MessageSent").addClass("hidden");
							}
						}
					});
				},
				// debug: true,
				errorPlacement: function(error, element) {
					error.insertBefore( element );
				},
				onkeyup: false,
				onclick: false,
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					email: {
						required: true,
						email: true
					},
					subject: {
						required: true
					},
					message: {
						required: true,
						minlength: 10
					}
				},
				messages: {
					name: {
						required: "Please specify your name",
						minlength: "Your name must be longer than 2 characters"
					},
					email: {
						required: "We need your email address to contact you",
						email: "Please enter a valid email address e.g. name@domain.com"
					},
					subject: {
						required: "Please enter a subject"
					},
					message: {
						required: "Please enter a message",
						minlength: "Your message must be longer than 10 characters"
					}
				},
				errorElement: "span",
				highlight: function (element) {
					$(element).parent().removeClass("has-success").addClass("has-error");
					$(element).siblings("label").addClass("hide");
				},
				success: function (element) {
					$(element).parent().removeClass("has-error").addClass("has-success");
					$(element).siblings("label").removeClass("hide");
				}
			});
		};

		if($("#contact-form-with-recaptcha").length>0) {
			$("#contact-form-with-recaptcha").validate({
				submitHandler: function(form) {
					$('.submit-button').button("loading");
					$.ajax({
						type: "POST",
						url: "php/email-sender-recaptcha.php",
						data: {
							"name": $("#contact-form-with-recaptcha #name").val(),
							"email": $("#contact-form-with-recaptcha #email").val(),
							"subject": $("#contact-form-with-recaptcha #subject").val(),
							"message": $("#contact-form-with-recaptcha #message").val(),
							"g-recaptcha-response": $("#g-recaptcha-response").val()
						},
						dataType: "json",
						success: function (data) {
							if (data.sent == "yes") {
								$("#MessageSent").removeClass("hidden");
								$("#MessageNotSent").addClass("hidden");
								$(".submit-button").removeClass("btn-default").addClass("btn-success").prop('value', 'Message Sent');
								$("#contact-form-with-recaptcha .form-control").each(function() {
									$(this).prop('value', '').parent().removeClass("has-success").removeClass("has-error");
								});
							} else {
								$("#MessageNotSent").removeClass("hidden");
								$("#MessageSent").addClass("hidden");
							}
						}
					});
				},
				// debug: true,
				errorPlacement: function(error, element) {
					error.insertBefore( element );
				},
				onkeyup: false,
				onclick: false,
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					email: {
						required: true,
						email: true
					},
					subject: {
						required: true
					},
					message: {
						required: true,
						minlength: 10
					}
				},
				messages: {
					name: {
						required: "Please specify your name",
						minlength: "Your name must be longer than 2 characters"
					},
					email: {
						required: "We need your email address to contact you",
						email: "Please enter a valid email address e.g. name@domain.com"
					},
					subject: {
						required: "Please enter a subject"
					},
					message: {
						required: "Please enter a message",
						minlength: "Your message must be longer than 10 characters"
					}
				},
				errorElement: "span",
				highlight: function (element) {
					$(element).parent().removeClass("has-success").addClass("has-error");
					$(element).siblings("label").addClass("hide");
				},
				success: function (element) {
					$(element).parent().removeClass("has-error").addClass("has-success");
					$(element).siblings("label").removeClass("hide");
				}
			});
		};

		if($("#footer-form").length>0) {
			$("#footer-form").validate({
				submitHandler: function(form) {
					$('.submit-button').button("loading");
					$.ajax({
						type: "POST",
						url: "php/email-sender.php",
						data: {
							"name": $("#footer-form #name2").val(),
							"email": $("#footer-form #email2").val(),
							"subject": "Message from contact form",
							"message": $("#footer-form #message2").val()
						},
						dataType: "json",
						success: function (data) {
							if (data.sent == "yes") {
								$("#MessageSent2").removeClass("hidden");
								$("#MessageNotSent2").addClass("hidden");
								$(".submit-button").removeClass("btn-default").addClass("btn-success").prop('value', 'Message Sent');
								$("#footer-form .form-control").each(function() {
									$(this).prop('value', '').parent().removeClass("has-success").removeClass("has-error");
								});
							} else {
								$("#MessageNotSent2").removeClass("hidden");
								$("#MessageSent2").addClass("hidden");
							}
						}
					});
				},
				// debug: true,
				errorPlacement: function(error, element) {
					error.insertAfter( element );
				},
				onkeyup: false,
				onclick: false,
				rules: {
					name2: {
						required: true,
						minlength: 2
					},
					email2: {
						required: true,
						email: true
					},
					message2: {
						required: true,
						minlength: 10
					}
				},
				messages: {
					name2: {
						required: "Please specify your name",
						minlength: "Your name must be longer than 2 characters"
					},
					email2: {
						required: "We need your email address to contact you",
						email: "Please enter a valid email address e.g. name@domain.com"
					},
					message2: {
						required: "Please enter a message",
						minlength: "Your message must be longer than 10 characters"
					}
				},
				errorElement: "span",
				highlight: function (element) {
					$(element).parent().removeClass("has-success").addClass("has-error");
					$(element).siblings("label").addClass("hide");
				},
				success: function (element) {
					$(element).parent().removeClass("has-error").addClass("has-success");
					$(element).siblings("label").removeClass("hide");
				}
			});
		};

		if($("#sidebar-form").length>0) {

			$("#sidebar-form").validate({
				submitHandler: function(form) {
					$('.submit-button').button("loading");
					$.ajax({
						type: "POST",
						url: "php/email-sender.php",
						data: {
							"name": $("#sidebar-form #name3").val(),
							"email": $("#sidebar-form #email3").val(),
							"subject": "Message from FAQ page",
							"category": $("#sidebar-form #category").val(),
							"message": $("#sidebar-form #message3").val()
						},
						dataType: "json",
						success: function (data) {
							if (data.sent == "yes") {
								$("#MessageSent3").removeClass("hidden");
								$("#MessageNotSent3").addClass("hidden");
								$(".submit-button").removeClass("btn-default").addClass("btn-success").prop('value', 'Message Sent');
								$("#sidebar-form .form-control").each(function() {
									$(this).prop('value', '').parent().removeClass("has-success").removeClass("has-error");
								});
							} else {
								$("#MessageNotSent3").removeClass("hidden");
								$("#MessageSent3").addClass("hidden");
							}
						}
					});
				},
				// debug: true,
				errorPlacement: function(error, element) {
					error.insertAfter( element );
				},
				onkeyup: false,
				onclick: false,
				rules: {
					name3: {
						required: true,
						minlength: 2
					},
					email3: {
						required: true,
						email: true
					},
					message3: {
						required: true,
						minlength: 10
					}
				},
				messages: {
					name3: {
						required: "Please specify your name",
						minlength: "Your name must be longer than 2 characters"
					},
					email3: {
						required: "We need your email address to contact you",
						email: "Please enter a valid email address e.g. name@domain.com"
					},
					message3: {
						required: "Please enter a message",
						minlength: "Your message must be longer than 10 characters"
					}
				},
				errorElement: "span",
				highlight: function (element) {
					$(element).parent().removeClass("has-success").addClass("has-error");
				},
				success: function (element) {
					$(element).parent().removeClass("has-error").addClass("has-success");
				}
			});

		};

		// Affix plugin
		//-----------------------------------------------
		if ($("#affix").length>0) {
			$(window).on('load', function (e) {

				var affixBottom = $(".footer").outerHeight(true) + $(".subfooter").outerHeight(true) + $(".blogpost footer").outerHeight(true),
				affixTop = $("#affix").offset().top;

				if ($(".comments").length>0) {
					affixBottom = affixBottom + $(".comments").outerHeight(true);
				}

				if ($(".comments-form").length>0) {
					affixBottom = affixBottom + $(".comments-form").outerHeight(true);
				}

				if ($(".footer-top").length>0) {
					affixBottom = affixBottom + $(".footer-top").outerHeight(true);
				}

				if ($(".header.fixed").length>0) {
					$("#affix").affix({
				        offset: {
				          top: affixTop-150,
				          bottom: affixBottom+100
				        }
				    });
				} else {
					$("#affix").affix({
				        offset: {
				          top: affixTop-35,
				          bottom: affixBottom+100
				        }
				    });
				}

			});
		}
		if ($(".affix-menu").length>0) {
			setTimeout(function () {
				var $sideBar = $('.sidebar')

				$sideBar.affix({
					offset: {
						top: function () {
							var offsetTop      = $sideBar.offset().top
							return (this.top = offsetTop - 65)
						},
						bottom: function () {
							var affixBottom = $(".footer").outerHeight(true) + $(".subfooter").outerHeight(true)
							if ($(".footer-top").length>0) {
								affixBottom = affixBottom + $(".footer-top").outerHeight(true)
							}
							return (this.bottom = affixBottom+50)
						}
					}
				})
			}, 100)
		}

		//Smooth Scroll
		//-----------------------------------------------
		if ($(".smooth-scroll").length>0) {
			if($(".header.fixed").length>0) {
				$('.smooth-scroll a, a.smooth-scroll').click(function() {
					if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
						if (target.length) {
							$('html,body').animate({
								scrollTop: target.offset().top-65
							}, 1000);
							return false;
						}
					}
				});
			} else {
				$('.smooth-scroll a, a.smooth-scroll').click(function() {
					if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
						if (target.length) {
							$('html,body').animate({
								scrollTop: target.offset().top
							}, 1000);
							return false;
						}
					}
				});
			}
		}

		//Scroll Spy
		//-----------------------------------------------
		if($(".scrollspy").length>0) {
			$("body").addClass("scroll-spy");
			if($(".fixed.header").length>0) {
				$('body').scrollspy({
					target: '.scrollspy',
					offset: 85
				});
			} else {
				$('body').scrollspy({
					target: '.scrollspy',
					offset: 20
				});
			}
		}

		//Video Background
		//-----------------------------------------------
		if($(".video-background").length>0) {
			if (Modernizr.touch) {
				$(".video-background").vide({
					mp4: "videos/background-video.mp4",
					webm: "videos/background-video.webm",
					poster: "videos/video-fallback.jpg"
				}, {
					volume: 1,
					playbackRate: 1,
					muted: true,
					loop: true,
					autoplay: true,
					position: "50% 60%", // Similar to the CSS `background-position` property.
					posterType: "jpg", // Poster image type. "detect" â€” auto-detection; "none" â€” no poster; "jpg", "png", "gif",... - extensions.
					resizing: true
				});
			} else {
				$(".video-background").vide({
					mp4: "videos/background-video.mp4",
					webm: "videos/background-video.webm",
					poster: "videos/video-poster.jpg"
				}, {
					volume: 1,
					playbackRate: 1,
					muted: true,
					loop: true,
					autoplay: true,
					position: "50% 60%", // Similar to the CSS `background-position` property.
					posterType: "jpg", // Poster image type. "detect" â€” auto-detection; "none" â€” no poster; "jpg", "png", "gif",... - extensions.
					resizing: true
				});
			};

		};

		//Scroll totop
		//-----------------------------------------------
		$(window).scroll(function() {
			if($(this).scrollTop() != 0) {
				$(".scrollToTop").fadeIn();
			} else {
				$(".scrollToTop").fadeOut();
			}
		});

		$(".scrollToTop").click(function() {
			$("body,html").animate({scrollTop:0},800);
		});

		//Modal
		//-----------------------------------------------
		if($(".modal").length>0) {
			$(".modal").each(function() {
				$(".modal").prependTo( "body" );
			});
		}

		// Pricing tables popovers
		//-----------------------------------------------
		if ($(".pricing-tables").length>0) {
			$(".plan .pt-popover").popover({
				trigger: 'hover'
			});
		};

		// Parallax section
		//-----------------------------------------------
		if (($(".parallax").length>0)  && !Modernizr.touch ){
			$(".parallax").parallax("50%", 0.2, false);
		};

		if (($(".parallax-2").length>0)  && !Modernizr.touch ){
			$(".parallax-2").parallax("50%", 0.2, false);
		};
		if (($(".parallax-text").length>0)  && !Modernizr.touch ){
			$(window).scroll(function() {
				//Get the scoll position of the page
				scrollPos = $(this).scrollTop();

				//Scroll and fade out the banner text
				$('.parallax-text').css({
					'opacity' : 1-(scrollPos/400)
				});
			});
		};

		// Remove Button
		//-----------------------------------------------
		$(".btn-remove").click(function() {
			$(this).closest(".remove-data").remove();
		});

		// Shipping Checkbox
		//-----------------------------------------------
		if ($("#shipping-info-check").is(':checked')) {
			$("#shipping-information").hide();
		}
		$("#shipping-info-check").change(function(){
			if ($(this).is(':checked')) {
				$("#shipping-information").slideToggle();
			} else {
				$("#shipping-information").slideToggle();
			}
		});

		//This will prevent the event from bubbling up and close the dropdown when you type/click on text boxes (Header Top).
		//-----------------------------------------------
		$('.header-top .dropdown-menu input').click(function(e) {
			e.stopPropagation();
		});

		// Offcanvas side navbar
		//-----------------------------------------------

		if ($("#offcanvas").length>0) {
			$('#offcanvas').offcanvas({
				disableScrolling: false,
				toggle: false
			});
		};

		if ($("#offcanvas").length>0) {
			$('#offcanvas [data-toggle=dropdown]').on('click', function(event) {
			// Avoid following the href location when clicking
			event.preventDefault();
			// Avoid having the menu to close when clicking
			event.stopPropagation();
			// close all the siblings
			$(this).parent().siblings().removeClass('open');
			// close all the submenus of siblings
			$(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
			// opening the one you clicked on
			$(this).parent().toggleClass('open');
			});
		};

	}); // End document ready

})(this.jQuery);

if (jQuery(".btn-print").length>0) {
	function print_window() {
		var mywindow = window;
		mywindow.document.close();
		mywindow.focus();
		mywindow.print();
		mywindow.close();
	}
}
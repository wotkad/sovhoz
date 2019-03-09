// handler for add active class to menu if you enter with offset from top
(function checkNav() {
	var e = document.querySelector(".head"); //menu selector
	var f = document.querySelector(".header"); //menu selector
	var mobMenu = document.querySelector(".header__mob");
	window.onscroll = function() {
		window.pageYOffset > 0 ?
		(
			f.style.padding = "17px 0",
			e.classList.add('head-active'),
			f.classList.add('header-active'),
			TweenMax.fromTo('.header', 1, {opacity: 1, x: 0}, {opacity: 1, x: 0})
		) :
		(
			f.style.padding = "36px 0",
			e.classList.remove('head-active'),
			f.classList.remove('header-active')
		);
	}
})();

$(document).ready(function() {

	// rendering body
	(function render() {
		var render = document.querySelector('.render');
		var tl = new TimelineLite();
		tl
			.fromTo(render, 1, {opacity: 1, zIndex: 1}, {opacity: 0, zIndex: -1})
			.delay(.4)
			.call(hideRender);

		function hideRender(){
			$(render).remove();
		};
	})();

	function homeTween(){
		TweenMax.to('.header', 1, {opacity: 1, x: 0})
	}
	homeTween();

	function menuToggle() {
		let body =  document.body;
		let button = document.querySelectorAll('.callback');
		let showButton = document.querySelector('#toggle');
		let closeButton = document.querySelector('#close');
		let items = document.querySelectorAll('.header__mob-menu-item a');
		let logo = document.querySelector('.header__logo');
		function hideHemu() {
			scrollLock.toggle();
			$(showButton).removeClass('show')
			$(showButton).addClass('callback')
			TweenMax.to('.header__mob-bg', .5, {opacity: 0, zIndex: -1})
			TweenMax.to('.header__mob', .5, {opacity: 0, zIndex: -1})
			TweenMax.to('.header__mob-menu', .2, {opacity: 0, zIndex: -1, x: 0})
			TweenMax.to('.header__mob-menu-item a', .2, {opacity: 0, zIndex: -1, x: 0})
			body.classList.remove('menu-active');
		}
		for (var i = 0; i < items.length; i++) {
			items[i].onclick = function() {
				hideHemu();
			}
		}
		$(closeButton).on('click', () => {
			if ($(showButton).hasClass('show')){
				hideHemu();
			}
		})
		let tl = new TimelineLite();
		for (var i = 0; i < button.length; i++) {
			button[i].onclick = function() {
				scrollLock.toggle();
				if (this.classList.contains('show')) {
					this.classList.remove('show');
					this.classList.add('callback');
					TweenMax.to('.header__mob-bg', .5, {opacity: 0, zIndex: -1})
					TweenMax.to('.header__mob', .5, {opacity: 0, zIndex: -1})
					TweenMax.to('.header__mob-menu', .2, {opacity: 0, zIndex: -1, x: 0})
					TweenMax.to('.header__mob-menu-item a', .2, {opacity: 0, zIndex: -1, x: 0})
					body.classList.remove('menu-active');
				} else {
					this.classList.add('show');
					this.classList.remove('callback');
					TweenMax.to('.header__mob-bg', .5, {opacity: 1, zIndex: 9998})
					TweenMax.to('.header__mob', .5, {opacity: 1, zIndex: 9999})
					tl
						.to('.header__mob-menu', .2, {opacity: 1, zIndex: 1, y: 0})
						.staggerFromTo('.header__mob-menu-item a', .3, {zIndex: -1, opacity: 0, x: -20, y: 0}, {zIndex: 1, opacity: 1, x: 0, y: 0}, .1)
					body.classList.add('menu-active');
				}
			}
		}
	};
	menuToggle();

	//send mail handler
	var sendMail = function sendMail(selector) {
		return fetch('mail.php', {
			method: 'POST',
			body: new FormData(document.querySelector(selector))
		}).catch(function (error) {
			alertify.error("Ошибка. Повторите отправку позже");
		});
	};

	// form for sendmail method with yandex counter
	var sendForm = function() {
		document.querySelector(".contacts__block-form").onsubmit = function(n) { //menu selector
			n.preventDefault(), sendMail(".contacts__block-form").then(function(e) { //menu selector
				return alertify.success('Ваша заявка отправленна, Мы свяжемся с вами в ближайшее время!')/*,
				 yaCounter********.reachGoal('****', function () {})*/,
				 document.querySelector(".contacts__block-form").reset();
			})
		};
	}
	sendForm();

	//smoothscroll
	function smoothScroll() {
		new SmoothScroll('a[href*="#"]', {
			speed: 1500,
			after: function() {
				document.querySelector("body").style.overflow = "";
			}
		});
	}
	smoothScroll();


	// paralax effect for block with rellax lib
	function rellax() {
		var rellax = new Rellax('.berry1, .leaves1, .leaves2, .leaves3, .leaves4, .leave, .about-leaf, .berry3'); // selector block
	}
	rellax();

	function clickProduct() {
		let product = document.querySelectorAll('.products__block-toggle');
		for (var i = 0; i < product.length; i++) {
			product[i].onclick = function(){
				$(this).parent().toggleClass('products__container-active');
			}
		}
	}
	clickProduct();

	// mask for "tel" input
	function inputMask() {
		let input = document.querySelectorAll('input[type="tel"]')
		for (var i = 0; i < input.length; i++){
			let mask = new Inputmask("+7 (999) 999-99-99");
			mask.mask(input[i]);
		}
	}
	inputMask();

	// //close popup by "esc" button
	// function hideByClickEscButton() {
	// 	window.onkeydown = function( event ) {
	// 		if ( event.keyCode == 27 ) {
	// 			selector.classList.remove('selector'); // block selector
	// 			body.style.overflow = '';
	// 		}
	// 	};
	// }
	// hideByClickEscButton();

	// script for yandex maps
	var spinner = $('.ymap-container').children('.loader'); // block selector and loader
	var check_if_load = false;
	var myMapTemp, myPlacemarkTemp;
	function init () {
	var myMapTemp = new ymaps.Map("map-yandex", {
		center: [55.585133, 37.731703], // coordinates
		zoom: 15, // zoom
		controls: ['zoomControl', 'fullscreenControl']
	});
	var myPlacemarkTemp = new ymaps.GeoObject({
		geometry: {
			type: "Point",
			coordinates: [55.585133, 37.731703] // coordinates
		}
	});
	myMapTemp.geoObjects.add(myPlacemarkTemp);
		var layer = myMapTemp.layers.get(0).get(0);
		waitForTilesLoad(layer).then(function() {
			spinner.removeClass('is-active');
		});
	}
	function waitForTilesLoad(layer) {
		return new ymaps.vow.Promise(function (resolve, reject) {
			var tc = getTileContainer(layer), readyAll = true;
				tc.tiles.each(function (tile, number) {
			if (!tile.isReady()) {
				readyAll = false;
			}
			});
			if (readyAll) {
				resolve();
			} else {
				tc.events.once("ready", function() {
					resolve();
				});
			}
		});
	}
	function getTileContainer(layer) {
		for (var k in layer) {
			if (layer.hasOwnProperty(k)) {
			if (
				layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
				|| layer[k] instanceof ymaps.layer.tileContainer.DomContainer
			) {
				return layer[k];
			}
			}
		}
		return null;
	}
	function loadScript(url, callback){
		var script = document.createElement("script");
		if (script.readyState){
			script.onreadystatechange = function(){
			if (script.readyState == "loaded" ||
					script.readyState == "complete"){
				script.onreadystatechange = null;
				callback();
			}
			};
		} else {
			script.onload = function(){
			callback();
			};
		}
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	var ymap = function() {
		$('.ymap-container').mouseenter(function(){
			if (!check_if_load) {
				check_if_load = true;
				spinner.addClass('is-active');
				loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
				ymaps.load(init);
				});
			}
			}
		);
	}
	$(function() {
		ymap();
	});

	// //init event when it in viewport
	// function viewportInit() {
	// 	var win = $(window);
	// 	var block = $('.selector'); // selector block
	// 	win.scroll(function() {
	// 		if(win.scrollTop() + win.height() > block.offset().top) {
	// 			block.classList.toggle('selector'); // selector css active class or add some other logic here
	// 		}
	// 	});
	// }
	// viewportInit();

	// dynamic data with cache
	function dynamicData() {
		const data = {
			'milk': {
				title0: 'Собственный цех',
				title1: 'Гарантия качества',
				title2: 'Экологически чистый бренд',
				title3: 'Сделано с любовью',
				text0: 'Ферма и завод находятся в одном месте, что позволяет оптимизировть процессы и повысыть качество нашего молока',
				text1: 'Контролируем качество в собственой аккредитованной лабратории по микробиологическим анализам',
				text2: 'Мы выбрали для нашей фермы один из самых экологически чистых районов Подмосковья',
				text3: 'Мы любим свое дело и стараемся каждый день совершенствоваться, чтобы наше молоко оставалось лучшим',
				img: '/images/fact-img1.png',
				buttontext: 'Заказать наше молоко'
			},
			'cheese': {
				title0: 'Название0',
				title1: 'Название1',
				title2: 'Название3',
				title3: 'Название4',
				text0: 'Текст0',
				text1: 'Текст1',
				text2: 'Текст2',
				text3: 'Текст3',
				img: '/images/cheese.png',
				buttontext: 'Заказать наш сыр'
			},
		}
		const titles = document.querySelectorAll('.facts__block-container-content-title');
		const texts = document.querySelectorAll('.facts__block-container-content-text');
		const img = document.querySelector('.facts__block-img img');
		const button = document.querySelector('.facts__block-button');
		const milk = document.getElementById('milk');
		const cheese = document.getElementById('cheese');
		milk.onclick = function() {
			$(cheese).removeClass('facts__buttons-button-active');
			$(this).addClass('facts__buttons-button-active');
			for (var i = 0; i < texts.length; i++){
				titles[0].innerText = data.milk.title0;
				titles[1].innerText = data.milk.title1;
				titles[2].innerText = data.milk.title2;
				titles[3].innerText = data.milk.title3;
				texts[0].innerText = data.milk.text0;
				texts[1].innerText = data.milk.text1;
				texts[2].innerText = data.milk.text2;
				texts[3].innerText = data.milk.text3;
				img.src = data.milk.img;
				button.innerText = data.milk.buttontext;
			}
		}
		cheese.onclick = function() {
			$(milk).removeClass('facts__buttons-button-active');
			$(this).addClass('facts__buttons-button-active');
			for (var i = 0; i < texts.length; i++){
				titles[0].innerText = data.cheese.title0;
				titles[1].innerText = data.cheese.title1;
				titles[2].innerText = data.cheese.title2;
				titles[3].innerText = data.cheese.title3;
				texts[0].innerText = data.cheese.text0;
				texts[1].innerText = data.cheese.text1;
				texts[2].innerText = data.cheese.text2;
				texts[3].innerText = data.cheese.text3;
				img.src = data.cheese.img;
				button.innerText = data.cheese.buttontext;
			}
		}

	}
	dynamicData();

	// dynamic data with cache
	function dynamicDataAbout() {
		const data = {
			'about1': {
				number: '01',
				title: 'Доим коров на собственной ферме',
				text: 'На ферме животным созданы максимально комфортные условия - они свободно передвигаются по коровнику, в котором установлены специальные чесалки и поилки.',
				img: '/images/cow.png'
			},
			'about2': {
				number: '02',
				title: 'Название1',
				text: 'Текст1',
				img: '/images/cheese.png'
			},
			'about3': {
				number: '03',
				title: 'Название2',
				text: 'Текст2',
				img: '/images/cow.png'
			},
		}
		const bg = document.querySelector('.about');
		const number = document.querySelector('.about__container-block-number');
		const title = document.querySelector('.about__container-block-title');
		const text = document.querySelector('.about__container-block-text');
		const img = document.querySelector('.about__container-block img');
		const greenBg = document.querySelector('.about-bg-green');
		const blueBg = document.querySelector('.about-bg-blue');
		const pinkBg = document.querySelector('.about-bg-pink');
		const rotator = document.querySelector('.rotator');
		const button1 = document.getElementById('about1');
		const button2 = document.getElementById('about2');
		const button3 = document.getElementById('about3');
		button1.onclick = function() {
			greenBg.style.opacity = '1';
			pinkBg.style.opacity = '0';
			blueBg.style.opacity = '0';
			greenBg.classList.add('about-bg-green-active');
			pinkBg.classList.remove('about-bg-pink-active');
			blueBg.classList.remove('about-bg-blue-active');
			rotator.style.transform = 'rotate(36deg)';
			$(this).addClass('about__items__nav-item-active');
			$(button2).removeClass('about__items__nav-item-active');
			$(button3).removeClass('about__items__nav-item-active');
			title.innerText = data.about1.title;
			text.innerText = data.about1.text;
			img.src = data.about1.img;
			number.innerText = data.about1.number;
		}
		button2.onclick = function() {
			pinkBg.style.opacity = '1';
			greenBg.style.opacity = '0';
			blueBg.style.opacity = '0';
			greenBg.classList.remove('about-bg-green-active');
			pinkBg.classList.add('about-bg-pink-active');
			blueBg.classList.remove('about-bg-blue-active');
			rotator.style.transform = 'rotate(0deg)';
			$(this).addClass('about__items__nav-item-active');
			$(button1).removeClass('about__items__nav-item-active');
			$(button3).removeClass('about__items__nav-item-active');
			title.innerText = data.about2.title;
			text.innerText = data.about2.text;
			img.src = data.about2.img;
			number.innerText = data.about2.number;
		}
		button3.onclick = function() {
			blueBg.style.opacity = '1';
			pinkBg.style.opacity = '0';
			greenBg.style.opacity = '0';
			greenBg.classList.remove('about-bg-green-active');
			pinkBg.classList.remove('about-bg-pink-active');
			blueBg.classList.add('about-bg-blue-active');
			rotator.style.transform = 'rotate(-36deg)';
			$(this).addClass('about__items__nav-item-active');
			$(button1).removeClass('about__items__nav-item-active');
			$(button2).removeClass('about__items__nav-item-active');
			title.innerText = data.about3.title;
			text.innerText = data.about3.text;
			img.src = data.about3.img;
			number.innerText = data.about3.number;
		}
	}
	dynamicDataAbout();

	// // resize handler for some actions only on specific width
	// function resizeHandler() {
	// $('selector').click(function() { // for example this click will work only if width < 991px
	// 	if($(window).width() < 991) {

	// 		// some logic

	// 		}
	// 	});
	// }
	// resizeHandler();
	// $(window).resize(resizeHandler);

	function cart() {
		let cart = $('.cart');
		let cartBg = $('.cart-bg');
		let cartClose = $('.cart__close');
		let cartOpen = $('.header__cart');
		let next = $('.cart__ordering-form-link-item');
		cartOpen.on('click', function(){
			scrollLock.toggle();
			TweenMax.to(cartBg, .5, {opacity: '1', zIndex: 9998});
			TweenMax.to(cart, .5, {x: '0%', ease: Back.easeOut.config( 1.7)});
		})
		cartClose.on('click', function(){
			scrollLock.toggle();
			TweenMax.to(cartBg, .5, {opacity: '0', zIndex: '-1'});
			TweenMax.to(cart, .5, {x: '100%', ease: Back.easeOut.config( 1.7)});
		})
		next.on('click', function(){
			scrollLock.toggle();
			TweenMax.to(cartBg, .5, {opacity: '0', zIndex: '-1'});
			TweenMax.to(cart, .5, {x: '100%', ease: Back.easeOut.config( 1.7)});
		})
	}
	cart();

	function popup1() {
		let popup1 = $('.popup1');
		let popup1Close = $('.popup1__close');
		let popup1Bg = $('.popup1-bg');
		let link1 = $('#link1');
		link1.on('click', function() {
			popup1.toggleClass('popup1-active')
			popup1Bg.toggleClass('popup1-bg-active')
			scrollLock.toggle();
		})
		popup1Close.on('click', function() {
			popup1.removeClass('popup1-active')
			popup1Bg.removeClass('popup1-bg-active')
			scrollLock.toggle();
		})
	}
	popup1();

	function popup2() {
		let popup2 = $('.popup2');
		let popup2Close = $('.popup2__close');
		let popup2Bg = $('.popup2-bg');
		let link2 = $('#link2');
		link2.on('click', function() {
			popup2.toggleClass('popup2-active')
			popup2Bg.toggleClass('popup2-bg-active')
			scrollLock.toggle();
		})
		popup2Close.on('click', function() {
			popup2.removeClass('popup2-active')
			popup2Bg.removeClass('popup2-bg-active')
			scrollLock.toggle();
		})
	}
	popup2();

	function popup3() {
		let popup3 = $('.popup3');
		let popup3Close = $('.popup3__close');
		let popup3Bg = $('.popup3-bg');
		let link3 = $('#link3');
		link3.on('click', function() {
			popup3.toggleClass('popup3-active')
			popup3Bg.toggleClass('popup3-bg-active')
			scrollLock.toggle();
		})
		popup3Close.on('click', function() {
			popup3.removeClass('popup3-active')
			popup3Bg.removeClass('popup3-bg-active')
			scrollLock.toggle();
		})
	}
	popup3();

	function blockMoveFromMouse() {
		var $layer_2 = $('.shake'), // selector block

		$container = $('.home__block'), // container block
		container_w = $container.width(),
		container_h = $container.height();

		$(window).on('mousemove.parallax', function(event) {
		var pos_x = event.pageX,
			pos_y = event.pageY,
			left  = 0,
			top   = 0;

		left = container_w / 2 - pos_x;
		top  = container_h / 2 - pos_y;

		TweenMax.to($layer_2, 1, {
			css: {
				transform: 'translateX(' + left / 32 + 'px) translateY(' + top / 32 + 'px)'
			},
			ease:Expo.easeOut,
			overwrite: 'all'
			});
		});
	}
	blockMoveFromMouse();

})


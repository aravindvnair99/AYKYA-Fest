
$(document).ready(function(){
   
    "use strict";   
    var controller = new ScrollMagic.Controller();
    var WDwidth = $(window).width();

//------------------ SPONSOR SLIDER-------------------------------------
//--------------------------------------------------------------------------

// loadjs('assets/scripts/general/sponsorSlider.js');
    if($(window).width()< 768){
        $('.sponsor').addClass('sponsor-slider');
    }
    else {
        $('.sponsor').removeClass('sponsor-slider');
    }

    partnerSlider('.sponsor-slider');
    function partnerSlider($slide){

        $($slide).slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots:false,
            autoplay:true,
            prevArrow: null,
            nextArrow: null,
            responsive: [
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            ]
        });
    }

    var controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
        triggerElement: ".sponsor__item",
        triggerHook: 0.9, // show, when scrolled 10% into view
        duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
        offset: 0, // move trigger to center of element
        reverse:false
    })
    .on('start', function (){
        anime({
            targets: '.sponsor__item img',
            scale: {
                value: [0,1],
                easing: 'easeInSine'
            },
            easing: 'easeInSine',
            duration:500
        });
    }).addTo(controller);

//------------------END SPONSOR SLIDER-------------------------------------



//------------------ VERTICAL SLIDER-------------------------------------
//--------------------------------------------------------------------------

// loadjs('assets/scripts/general/verticalSlier.js');

    VerticalSlider('.speaker-slider');

    function VerticalSlider($contain){

        $($contain+'> .speaker-slider__item').each(function () {    
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().attr("aria-hidden", "true").appendTo($(this)).addClass('cloned-speaker');

            if (next.next().length > 0) {
                next.next().children(':first-child').clone().attr("aria-hidden", "true").appendTo($(this)).addClass('cloned-speaker');
            }
            else {
                $(this).siblings(':first').children(':first-child').clone().appendTo($(this)).addClass('cloned-speaker');
            }

        });
        $($contain).slick({
        
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 3,
            // vertical: true,
            verticalSwiping: true,
            // prevArrow: '<div class="speaker-slider__up-arrow"><i class="fa fa-angle-up"></i></div>',
            // nextArrow: '<div class="speaker-slider__down-arrow"><i class="fa fa-angle-down"></i></div>',
            dots: false,
            fade: true,
            speed: 900,
            infinite: true,
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            responsive: [
            {
                breakpoint: 992,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
        
                }
            },
            {
                breakpoint: 767,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
                }
            }
            ]
        });
        $('.speaker-slider__arrow--up').on('click', function(){
            $($contain).slick("slickPrev");
            anime({
                targets: '.slick-current .speaker-slider__item > div',
                duration: function(t,i) {
                return 600 + i*75;
                },
                translateY: [-500,0],
                opacity:1,
                easing: 'easeInSine',
                delay: anime.stagger(50) 
            });
        });
        $('.speaker-slider__arrow--down').on('click', function(){
            $($contain).slick("slickNext");
            
            anime({
                targets: '.slick-current .speaker-slider__item > div',
                duration: function(t,i) {
                return 600 + i*75;
                },
                translateY: [500,0],
                opacity:1,
                easing: 'easeInSine',
                delay: anime.stagger(50) 
            });
            
        });



    }
    new ScrollMagic.Scene({
        triggerElement: ".speaker-slider-area",
        triggerHook: 0.9, // show, when scrolled 10% into view
        duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
        offset: 50, // move trigger to center of element
        reverse:false
    })
    .on('start', function () {
        anime({
            targets: '.slick-current .speaker-slider__item > div',
            duration: function(t,i) {
            return 600 + i*75;
            },
            opacity: {
            value: [0,1],
            easing: 'linear'
            },
            translateX: [-270,0],
            translateY: [-270,0],
            scale:{
                value:[0,1],
                easing: 'cubicBezier(.51,.38,.57,1.36)'
            },
            easing: 'easeOutExpo',
            delay: anime.stagger(150) // increase delay by 100ms for each elements.
        });
        anime({
            targets: '.speaker-slider__arrow',
            duration: function(t,i) {
            return 600 + i*75;
            },
            opacity: {
                value: 1,
                easing: 'linear'
            },
            scale:{
                value:[0,1],
                easing: 'cubicBezier(.51,.38,.57,1.36)'
            },
            translateX: [-270,0],
            translateY: [-270,0],
            easing: 'easeInSine',
            delay: anime.stagger(50) 
        });
    })
    .addTo(controller);


//------------------END VERTICAL SLIDER-------------------------------------



//------------------ NAV MENU BUTTON ----------------------------------------
//--------------------------------------------------------------------------
// loadjs('assets/scripts/general/header.js');
    $('.header__menu-icon').on( 'click', function(){
        $('.menu-nav').toggleClass("menu-nav-active");
        $('.header__menu-icon').toggleClass('button-eff');
        $('.menu-nav nav').toggleClass('nav-effect');
        anime({
            targets: '.nav-effect ul li',
            easing:'cubicBezier(.21,1.03,.55,1.09)',
            translateX: [-1300,0],
            delay: anime.stagger(30) 
        });
    });
    $(".menu-nav-close").on('click',function(){
        $('.menu-nav').removeClass("menu-nav-active");
        $('.header__menu-icon').removeClass('button-eff');
        $('.menu-nav nav').removeClass('nav-effect');
    });
    $('.menu-nav ul li').on('click',function(){
        $(this).find('i').toggleClass('arrow-rotation');
        $(this).find('.sub-menu').slideToggle();

    });

    var position = $(window).scrollTop() ; 
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if(scroll > position && scroll > 310) {
            if($('body').hasClass('lightbox-enabled') || $('.menu-nav').hasClass('menu-nav-active')){
                $('header').removeClass('header-hide'); 
            }
            else {
                $('header').addClass('header-hide');
                // $('#header-trans').removeClass('header-trans-1');
            }
        } else {
            $('header').removeClass('header-hide'); 
        }

        if(scroll > position && scroll < 310) {
            if($('body').hasClass('lightbox-enabled') || $('.menu-nav').hasClass('menu-nav-active')){
                $('header').removeClass('header-hide'); 
            }
            else {
                $('header').addClass('header-hide');
                // $('#header-trans').removeClass('header-trans-1');
            }
            
        } else {
            $('header').removeClass('header-hide'); 
        }
        if( scroll > 310) {
            $('#header-trans').removeClass('header-trans-1');
            $('#header-trans2').removeClass('header-trans-1');
        }
        else {
            $('#header-trans').addClass('header-trans-1');
            $('#header-trans2').addClass('header-trans-1');
        }
        position = scroll;
    });
    if($('.menu-nav').hasClass('menu-nav-active')){
        $('header').removeClass('header-trans-1'); 
    }
//--------------------END NAV MENU BUTTON------------------------------------------------------

//------------------ EXPERIENCE EFFECT  ----------------------------------------
//--------------------------------------------------------------------------
// loadjs('assets/scripts/general/experience.js');
    if($(window).width()>991){
        MovinTeen('.movein-ex--1','30%','70%','0%','0%','.experience ');
        MovinTeen('.movein-ex--2','-50%','60%','0%','0%','.experience ');
        MovinTeen('.movein-ex--3','70%','0%','0%','0%','.experience ');
        MovinTeen('.movein-ex--4','-70%','0%','0%','0%','.experience ');

        MovinTeen('.movein-ex--5','0%','-70%','0%','0%','.experience ');
        ExTextFadeup(".experience__text");
    }
    else {
        MovinTeen('.movein-ex--1','0%','0%','0%','0%','.experience ');
        MovinTeen('.movein-ex--2','0%','0%','0%','0%','.experience ');
        MovinTeen('.movein-ex--3','0%','0%','0%','0%','.experience ');
        MovinTeen('.movein-ex--4','0%','0%','0%','0%','.experience ');

        MovinTeen('.movein-ex--5','0%','0%','0%','0%','.experience ');
        ExTextFadeup(".experience__textoff");
    }

    function MovinTeen($obj,$x0,$y0,$xd,$yd,$triggerElement){

        var tween = new TimelineMax();
        tween.fromTo($obj, 1, {x:$x0, y:$y0},     { x:$xd,  y:$yd     },  '-=0.5')

        var scene = new ScrollMagic.Scene({triggerElement: $triggerElement, duration: 800, offset: -150})
            .setTween(tween)
            .addTo(controller);

    }

    function ExTextFadeup($obj){
        var tweenUp = new TimelineMax();
        tweenUp.fromTo($obj, 2, {y:100},     {  y:0     },  '-=0.5')

        var scene = new ScrollMagic.Scene({triggerElement: $obj, duration: 800, offset: -350})
            .setTween(tweenUp)
            .addTo(controller);
    }
//------------------ END EXPERIENCE EFFECT  ----------------------------------------



//------------------ SPEAKER EFFECT  ----------------------------------------
//--------------------------------------------------------------------------
// loadjs('assets/scripts/general/speaker.js');

    anime({
        targets: '.speaker-grid-1__item',
        duration: function(t,i) {
        return 600 + i*75;
        },
        opacity: {
        value: [0,1],
        easing: 'linear'
        },
        translateX: [-270,0],
        translateY: [-270,0],
        scale:{
            value:[0,1],
            easing: 'cubicBezier(.51,.38,.57,1.36)'
        },
        easing: 'easeOutExpo',
        delay: anime.stagger(150, {start: 300}) // increase delay by 100ms for each elements.
    });
//------------------ END SPEAKER EFFECT  ----------------------------------------


//------------------ SCHEDULE TAB CONTENT ----------------------------------------
//----------------------------------------------------------------------------

    $('.schedule-tab__item').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('.schedule-tab__item').removeClass('tab-active');
        $('.schedule-table').removeClass('tab-current');

        $(this).addClass('tab-active');
        $("#"+tab_id).addClass('tab-current');
        anime({
            targets: '.tab-current > div',
            duration: function(t,i) {
                return 800 + i*200;
            },
            easing: 'easeOutExpo',
            delay: function(t,i) {
                return i * 100;
            },
            opacity: {
                value: [0,1],
                duration: function(t,i) {
                    return 250 + i*50;
                },
                easing: 'linear'
            },
            translateY: [400,0]
        });
    })

//------------------ END SCHEDULE TAB CONTENT ----------------------------------------


//=================================== SPEAKER LIST===============================
//====================================================================================
    
    function fadetoleft($ele){
        anime({
            targets: $ele,
            opacity: {
                value: [0,1],
                easing: 'linear'
            },
            translateX: [-270,0],
            easing: 'easeInSine',
        });
    }
    function fadetoright($ele){
        anime({
            targets: $ele,
            opacity: {
                value: [0,1],
                easing: 'linear'
            },
            translateX: [270,0],
            easing: 'easeInSine',
        });
    }
    new ScrollMagic.Scene({
        triggerElement: ".schedule-list",
        triggerHook: 0.9, // show, when scrolled 10% into view
        duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
        offset: 50, // move trigger to center of element
        reverse:false
    })
    .on('start', function () {
        fadetoleft('#schedulelist-reveal1');
        fadetoright('#schedulelist-reveal2');
    })
    .addTo(controller);

//------------------ END SPEAKER EFFECT  ----------------------------------------



//------------------ CURSOR EFFECT  ----------------------------------------
//--------------------------------------------------------------------------
// loadjs('assets/scripts/general/cursor.js');
    //================venue
    FlowCursor ('.venue-video__text__address','.venue-video__text__address');
    
    // contact
    FlowCursor(".moving-btn",".moving-btn");
    //creative agency
    FlowCursor(".post1",".post1");
    FlowCursor(".post2",".post2");
    FlowCursor(".testimonial__arrow--left",".testimonial__arrow--left");
    FlowCursor(".testimonial__arrow--right",".testimonial__arrow--right");
    // portfolio
    FlowCursor(".portfolio-2__view a",".portfolio-2__view a");
    //=== home
    FlowCursor ('.speaker-slider__arrow--down','.speaker-slider__arrow--down');
    FlowCursor ('.experience__text__link','.experience__text__link');
    FlowCursor ('.speaker-slider__arrow--up','.speaker-slider__arrow--up');
    FlowCursor ('.speaker-slider__arrow--down','.speaker-slider__arrow--down');
    
    function FlowCursor ($hoverArea,$link) {
    
        const link = document.querySelectorAll($hoverArea);
        const animateit = function (e) {
              const span = document.querySelector($link);
              const { offsetX: x, offsetY: y } = e,
              { offsetWidth: width, offsetHeight: height } = this,
              move = 25,
              xMove = x / width * (move * 2) - move,
              yMove = y / height * (move * 2) - move;
    
              span.style.transform = `translate(${xMove}px, ${yMove}px)`;
    
              if (e.type === 'mouseleave') span.style.transform = '';
        };
        link.forEach(b => b.addEventListener('mousemove', animateit));
        link.forEach(b => b.addEventListener('mouseleave', animateit));
    }
    
//================= Custom cusor==========================

    const cursor = document.querySelector('.cursor');
    const cursorflow = document.querySelector('.cursor-follower');
    const editCursor = e => {
          TweenMax.to( cursor, 0, {
            css: { left: e.clientX, top: e.clientY  }
        });
    };
    function CursorFollower (e) { 
      TweenMax.to( cursorflow, 1.2, {
        css: { left: e.clientX -13, top: e.clientY -13 },
        ease: Elastic.easeOut
    });
    }
    window.addEventListener('mousemove', editCursor);
    window.addEventListener('mousemove', CursorFollower);
    
//===================== CURSOR TRANSFORM ON HOVER

    CursorTrans('h6');
    CursorTrans('a');
    CursorTrans('h1');
    CursorTrans('.header__menu-icon');
    CursorTrans('.letter');
    CursorTrans('.sponsor__item img');
    CursorTrans('.schedule-tab__item ');
    CursorTrans('video');
    CursorTrans('.venue-video__text__address');
    CursorTrans('.speaker-slider__arrow');
    CursorTrans("input[type='submit']");
    CursorTrans(".video");
    CursorTrans(".portfolio-3__categoties li");
    function CursorTrans($obj) {
        $($obj).on('mouseover',function(){
            $('.cursor-follower').addClass('cursor-folow-transform');
            TweenMax.to( cursorflow, 1.5, {
                css: { scale: 1.5},
                ease: Elastic.easeOut,
           
            });
            $('.cursor').addClass('cursor-transform');
        });
        $($obj).on('mouseout',function(){
            $('.cursor-follower').removeClass('cursor-folow-transform');
            TweenMax.to( cursorflow, 0.5, {
                css: { scale:1 },
                ease: Elastic.linear
            });
            $('.cursor').removeClass('cursor-transform');
        });
    }

    CursorTurnWhite('img');
    CursorTurnWhite('.pagebanner-2');
    CursorTurnWhite('.pagebanner-1');
    CursorTurnWhite('header');
    CursorTurnWhite('footer');
    CursorTurnWhite('.menu-nav');
    CursorTurnWhite('.erropage');
    
    function CursorTurnWhite($obj) {

        $($obj).on('mouseover',function(){
            $('.cursor').addClass('cursor-white');
            $('.cursor-follower').addClass('cursor-folow-white');

        });
        $($obj).on('mouseout',function(){
            $('.cursor').removeClass('cursor-white');
            $('.cursor-follower').removeClass('cursor-folow-white');

        });
    }

//------------------ END CURSOR EFFECT  ----------------------------------------


//------------------ Footer EFFECT  ----------------------------------------
//--------------------------------------------------------------------------
// loadjs('assets/scripts/general/footer.js');


    new ScrollMagic.Scene({
        triggerElement: ".footer",
        triggerHook: 0.9, // show, when scrolled 10% into view
        duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
        offset: 0, // move trigger to center of element
        reverse:false
    })
    .on('start', function (){
        anime({
            targets: '.footer-move-up',
            easing: 'easeOutCubic',
            opacity: {
                value: [0,1],
                easing: 'easeInOutQuad'
            },
            translateY :[100,0],
            delay: anime.stagger(150)
        });
    }).addTo(controller);
//------------------ END Footer EFFECT  ----------------------------------------


//------------------ VENUE EFFECT  ----------------------------------------
//--------------------------------------------------------------------------
// loadjs('assets/scripts/general/venue.js');
    anime.timeline({loop: false})
    .add({
        targets: '.venue-fadeinup',
        opacity: {
            value: [0,1],
            easing: 'linear'
        },
        translateY: [50,0],
        easing: "easeOutCirc",
        duration: 500,
        delay: (el, i) => 200 * i
    });
//------------------ END VENUE EFFECT  ----------------------------------------

    
//------------------ SPEAKER PACKERY LAYOUT-------------------------------------
//--------------------------------------------------------------------------
            
    SpeakerPackery('.speaker-grid-1','.speaker-grid-1__item');
    function SpeakerPackery($contain,$item){
        $($contain).packery({
            itemSelector: $item,
        });

    }

//------------------ Tittle Effect  ----------------------------------------
//--------------------------------------------------------------------------

    function TittleFloating1($tittle){
        var textWrapper = document.querySelector($tittle);
        if (document.querySelector($tittle)) { 
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");   
            anime.timeline({loop: false})
            .add({
                targets: $tittle+' span',
                translateX: [40,0],
                translateZ: 0,
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: (el, i) => 500 + 30 * i
            });
        }

    }

    TitteEff2()
    function TitteEff2(){
        var textWrapper = document.querySelector('.tittle-eff2');
        if (document.querySelector('.tittle-eff2')) { 
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            anime.timeline({loop: true})
            .add({
                targets: '.tittle-eff2 .letter',
                scale:[3,1],
                opacity: [0,1],
                easing: "easeOutCirc",
                duration: 200,
                delay: (el, i) => 200 * i
            }).add({
                targets: '.tittle-eff2',
                opacity: [1],
                duration: 1500,
                easing: "easeOutExpo",
                delay: 1500
            });
        }

    }
//--------------------END Tittle Effect------------------------------------------------------

//-------------------------countdown timer--------------------------------------
//---------------------------------------------------------------------------
    count_down('#CD');
    count_down('#CD2');
    function count_down($area){
        const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    
        let countDown = new Date('Feb 9, 2020 15:03:00').getTime(),
        x = setInterval(function() {
    
        let now = new Date().getTime(),
            distance = countDown - now;
        
        var dayy = Math.floor(distance / (day));
        var hourr = Math.floor((distance % (day)) / (hour));
        var minn = Math.floor((distance % (hour)) / (minute));
        var secs = Math.floor((distance % (minute)) / second);
        function prezero(e){
            if(e < 10 && e > -1) return "0"+e;
            else return e;
        }
        if (document.querySelector('.pagebanner__count-down-area')) {
            document.querySelector($area+"__day").innerText = prezero(dayy);
            document.querySelector($area+"__hour").innerText = prezero(hourr);
            document.querySelector($area+"__min").innerText = prezero(minn);
            document.querySelector($area+"__sec").innerText = prezero(secs);
        }
        if (distance < 0) {
            clearInterval(x);
       }  
        }, second);
    }
 //---------------------------end countdown timer------------------------------------------------

    $('.pagebanner-2').slick({
        fade: true,
        speed: 500,
        autoplay:true,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:false,
        prevArrow: null,
        nextArrow: null,

    });


    // porfolio-3
    var port3_h = $('.portfilio-3__item-sizer').width();
    var port3_2h = 2*port3_h + 30;
    $('.portfilio-3__item__2h').css('height',port3_2h+'px');
    $('.portfilio-3__item__2h2w').css('height',port3_2h+'px');
    $('.portfilio-3__item__nor , .portfilio-3__item__2w').css('height',port3_h+'px');
    // video preview (creative agency)
    function PreviewVideo ($video,$btnPop) {
        var modal = $( $video ),
            btn = $($btnPop ),
            close = $($video+'__close'),
            $iframe= $($video+'__iframe'),
            href=$($iframe).attr('data-src');
        btn.on( 'click', function(){
            modal.css({"visibility": "visible"});
            $($iframe).attr('src', href );

        } );
        
        $($video+'__btn-close').on('click', function() {
            modal.css({"visibility": "hidden"});
            $($iframe).removeAttr('src');
        
        });
        close.on('click', function() {
            modal.css({"visibility": "hidden"});
            $($iframe).removeAttr('src');
        });  
    }
    PreviewVideo('.preview-video','.video');

    // testimonial 
    $('.testimonial').slick({
        speed:1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:false,
        arrow: false,
    });
    $('.testimonial__arrow--left').on('click', function(){
        $('.testimonial').slick("slickPrev");
        rollingLeft('.testimonial .slick-slide .testimonial__qoute');
    });
    $('.testimonial__arrow--right').on('click', function(){
        $('.testimonial').slick("slickNext");
        rollingRight('.testimonial .slick-slide .testimonial__qoute');
    });
    function rollingLeft($ele){
        anime({
            targets: $ele,
            rotate: {
            value:[-360,0],
            easing: 'linear'
            },
            easing: 'linear',
            duration: 1000
        });
    }
    function rollingRight($ele){
        anime({
            targets: $ele,
            rotate: {
                value:[0,-360],
                easing: 'linear'
                },
            easing: 'linear',
            duration: 1000
        });
    }


//===========================  PORTFOLIO 2 ==============================
    // porfolio-2 height    
    var port1hnor = $('.portfilio-1__item').width();
    var port1h = $('.portfilio-1__item__2w').width();
    $('.portfilio-1__item__2h').css('height',port1h+'px');
    $('.portfilio-1__item__nor , .portfilio-1__item__2w').css('height',port1hnor+'px');

    // sibling fading
    $(".portfolio-2__item").on('mouseover',function(){
        $(this).siblings().addClass('portfolio-2__img-fade');
    });
    $(".portfolio-2__item").on('mouseout',function(){
        $(".portfolio-2__item").removeClass('portfolio-2__img-fade');
    });

    // categori apperance
    $('.portfolio-2__item').on('mouseover',function(e){
        $(this).append(
            '<div class="portfolio-2__cate-follow">'+
                '<h5>'+$(this).find('h5').text()+'</h5><br/>'+
                '<p>'+$(this).find('p').text()+'</p>'
            +'</div>'
            );
        $('.cursor-follower').addClass('remove-trans');
        var port2_trans = $('.portfolio-2__cate-follow');
        $(window).on('mousemove', function(e){
            TweenMax.to( port2_trans, 0, {
                css: { left: e.clientX, top: e.clientY  }
            });
        });
    });

    $('.portfolio-2__item').on('mouseout',function(){
        $('.cursor-follower').removeClass('remove-trans');
        $(this).find('.portfolio-2__cate-follow').remove();
    });

//=========================== END PORTFOLIO 2 ==============================

});

//--------------------------- LOADING-------------------------------------------
//------------------------------------------------------------------------------
$(window).on("load", function () {
    $('.loading').fadeOut();
    setTimeout(function() {
        $('.loading').remove();
    }, 1000);

    $('.blog').isotope({
        itemSelector: '.blog__item',
        masonry: {
        columnWidth: '.blog__item',
        horizontalOrder: true,
        gutter:30
        }
        
    });
    
    //porfolio
    $('.portfilio-1').isotope({
        itemSelector: '.portfilio-1__item',
        masonry: {
            columnWidth: '.portfilio-1__item',
            gutter:30
        } 
    });
    anime({
        targets: '.portfilio-1__category__item',
        easing:'cubicBezier(.21,1.03,.55,1.09)',
        translateX: [-1300,0],
        opacity:[0,1],
        delay: anime.stagger(50) 
    });

    $('.portfolio-2').isotope({
        layoutMode: 'cellsByRow',
        itemSelector: '.portfolio-2__item',
        cellsByRow: {
            columnWidth: '.portfolio-2-sizer',
            rowHeight: '.portfolio-2-sizer'
        },
    });

    //portfolio-3
    $('.portfolio-3__grid').packery({
        itemSelector: '.portfilio-3__item',
        gutter:30
    });
    port3fadeup('.portfilio-1__item');
    port3fadeup('.portfolio-3__categoties li');
    port3fadeup('.portfilio-3__item');
    function port3fadeup($ele){
        anime({
            targets: $ele,
            easing:'cubicBezier(.88,.28,.7,1.32)',
            translateY: [1300,0],
            opacity:[0,1],
            duration:300,
            delay: anime.stagger(30) 
        });
    }


    var content=$(".portfolio-3__grid"),tabs=$(".portfolio-3__categoties li");
    tabs.each(function(){
        var filter=$(this).data('filter');
        function countCate(){
            var eleCateNum = $(filter).length;
            if(filter == '*')   eleCateNum = $('.portfolio-3__grid a').length;
            if(eleCateNum < 10 && eleCateNum > 0) return '0'+eleCateNum;
            else return eleCateNum;
            
        }
        $(this).append('<span>'+countCate()+'</span>');
    });
    tabs.on('click', function(){
        tabs.removeClass('port3-filter').filter(this).addClass('port3-filter');
        var filter=$(this).data('filter');
        content.isotope({
            filter: filter,
            layoutMode: 'packery',
            itemSelector: '.portfilio-3__item',
            packery: {
                gutter:30
            }
        });
        return false;
    });


    //vennue
    $('.venue-layout-grid').isotope({
        itemSelector: '.venue-layout-grid__item',
        masonry: {
        columnWidth: '.venue-layout-grid__item',
        horizontalOrder: true
        }
    });

    $('.speaker-grid-2').isotope({
        itemSelector: '.speaker-grid-2__item',
        masonry: {
            columnWidth: '.speaker-grid-2__item',
            horizontalOrder: true,
            percentPosition:true,
            gutter:'.speaker-gutter-sizer'

        }
    });
    new WOW().init();
});

//--------------------------- END LOADING-------------------------------------------









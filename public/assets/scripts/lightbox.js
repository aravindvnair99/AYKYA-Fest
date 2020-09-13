
$(document).ready(function(){
   
    "use strict";


    lightBoxx('.speaker-grid-1','.speaker-grid-1__item','.speaker-detail');

    lightBoxx('.speaker-grid-2','.speaker-grid-2__item','.speaker-detail');

    function lightBoxx($galery,$image,$content){
        var lightbox = {

        config : {
        gallery              : $galery,          // class of gallery
        galleryImage         : $image,            // class of image within gallery
        lightboxID           : $content,         // id of lighbox to be created
        lightboxEnabledClass : 'lightbox-enabled',  // class of body when lighbox is enabled
        buttonsExit          : true,                // include exit div?
        buttonsNavigation    : true,                // include navigation divs?
        containImgMargin     : 0                    // margin top and bottom to contain img
        },
        
        init : function(config) {
        
        // merge config defaults with init config
        $.extend(lightbox.config, config);
        
        // on click
        $(lightbox.config.gallery).find('a').on('click', function(event) {
            event.preventDefault();
            lightbox.createLightbox($(this));
            
        });
        
        },
        
        // create lightbox
        createLightbox : function($element) {
        
        // add body class
        $('body').addClass(lightbox.config.lightboxEnabledClass);
        $('.cursor').addClass('cursor-white');
        $('.cursor-follower').addClass('cursor-folow-white');

        // remove lightbox if exists
        if ($(lightbox.config.lightboxID).length) { 
            $(lightbox.config.lightboxID).remove(); 

        }
        
        // add new lightbox
        $('body').append('<div class="' + lightbox.config.lightboxID.substring(1) + '"><div class="slider"></div></div>');
        
        // add exit div if required
        if (lightbox.config.buttonsExit) {
            $(lightbox.config.lightboxID).append(
                '<div class="exit">'+
                    '<p class="explosed">BACK TO WALL</p>'+
                    '<p class="more-profile">More Profiles</p>'+
                '</div>'
            );    
        }
        
        // add navigation divs if required
        if (lightbox.config.buttonsNavigation) {
            $(lightbox.config.lightboxID).append(
                '<div class="prev">'+
                    '<div class="speaker-slide-arrow">'+
                        '<p class="link link--mallki">'+
                            'PREV<span data-letters="PREV"></span>'+
                            '<span data-letters="PREV"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
                '<div class="next">'+
                    '<div class="speaker-slide-arrow">'+
                        '<p class="link link--mallki">'+
                            'NEXT<span data-letters="NEXT"></span>'+
                            '<span data-letters="NEXT"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>');
            
        }
        
        // now populate lightbox
        lightbox.populateLightbox($element);
        
        },
        
        // populate lightbox
        populateLightbox : function($element) {
        
        var thisgalleryImage = $element.closest(lightbox.config.galleryImage);
        var thisIndex = thisgalleryImage.index();
        
        // add slides

        $(lightbox.config.gallery).children(lightbox.config.galleryImage).each(function() {
            $($content+' .slider').append(
                '<div class="lightbox-container">'+
                    '<div class="row">'+
                        '<div class="col-lg-6 col-md-6">'+
                            '<div class="speaker-detail__thumb">'+
                                '<img src="' + $(this).find('a').attr('href') + '">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-6 col-md-6">'+
                            '<div class="speaker-detail__info">'+
                                '<h4 class="info-move-in speaker__first-name">'+$(this).find('.speaker__first-name').text()+'</h4>'+
                                '<h4 class="info-move-in speaker__last-name">'+$(this).find('.speaker__last-name').text()+'</h4>'+
                                '<h5 class="info-move-in speaker__career">'+$(this).find('.speaker__career').text()+'</h5>'+
                                '<p class="info-move-in speaker__des">'+$(this).find('.speaker__des').text()+'</p>'+
                                '<a href="#" class="info-move-in speaker-media"><img src="assets/images/speakers_detail_social1.png" alt="social1"></a>'+
                                '<a href="#" class="info-move-in speaker-media"><img src="assets/images/speakers_detail_social2.png" alt="social2"></a>'+
                                '<a href="#" class="info-move-in speaker-media"><img src="assets/images/speakers_detail_social3.png" alt="social3"></a>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                +'</div>'
                
                );


        });
        
        // now initalise flickity
        lightbox.initFlickity(thisIndex);

        },
        
        // initalise flickity
        initFlickity : function(thisIndex) {
        
        $(lightbox.config.lightboxID).find('.slider').flickity({ // more options: https://flickity.metafizzy.co
            cellAlign: 'center',
            resize: true,
            wrapAround: true,
            prevNextButtons: false,
            pageDots: false,
            initialIndex: thisIndex,
        });
    //================== function active====================
        ImgFloatIn();
        ItemOut();
        lightboxIn();
        ARmovein();

        ImgFloatIn();
        SpeakerInfo();

        CursorTransLB('.speaker-detail__thumb');
        CursorTransLB('.next');
        CursorTransLB('.prev');
        CursorTransLB('.exit');
        CursorTransLB('.info-move-in');


        textExplose();

        // make sure image isn't too tall
        lightbox.containImg();
        
        // on window resize make sure image isn't too tall
        $(window).on('resize', function() {
            lightbox.containImg();
        });
        
        // buttons
        var $slider = $(lightbox.config.lightboxID).find('.slider').flickity();
        
        $(lightbox.config.lightboxID).find('.exit').on('click', function() {

            $('body').removeClass('lightbox-enabled');
   
            setTimeout(function() {
    
            $slider.flickity('destroy');
            $(lightbox.config.lightboxID).remove();
            }, 0);
            ItemIn('.speaker-grid-1__item');
            ItemIn('.speaker-grid-2__item');
        });
    //---------------------------------- Effvect function-------------------------
    //-----------------------------------------------------------------------------
        function ImgFloatIn(){
            anime({
                targets: '.is-selected .speaker-detail__thumb',
                duration: 1500,
                opacity: {
                value: [0,1],
                easing: 'linear'
                },
                translateY: [1000,0],
                translateX: [-1000,0],
                rotate:[-200,0],
                scale:{
                    value:[0,1],
                    easing: 'cubicBezier(1,.12,.89,1.25)'
                },
                easing: 'easeOutCubic',
            });
        }

        function lightboxIn(){
            anime({
                targets: '.speaker-detail',
                translateY: [-1000,0],
                easing: 'easeInOutQuart',
                deplay:800
            });
        }

        // itiem out
        function ItemOut(){
            anime({
                targets: '.speaker-grid-1__item',
                duration: 800,
                easing: 'easeOutBack',
                delay: function(t,i) {
                    return i * 50;
                },
                opacity: {
                    value: [1,0],
                    easing: 'linear'
                },
                translateY: [0,100],
                scaleY: [
                    {value: [1,0], duration: 500, easing: 'linear'}
                ],
                scaleX: [
                    {value: [1,0], duration: 500, easing: 'linear'}
                ]
            });
        }
        // itiem in
        function ItemIn($item){
            anime({
                targets: $item,
                duration: 800,
                easing: 'easeOutBack',
                delay: function(t,i) {
                    return i * 150;
                },
                opacity: {
                    value: [0,1],
                    easing: 'linear'
                },
                translateY: [400,0],
                scaleY: [
                    {value: [0.6,1], duration: 1400, easing: 'easeOutElastic'}
                ],
                scaleX: [
                    {value: [1.05,1], duration: 1400, easing: 'easeOutElastic'}
                ]
            });
        }

        function ARmovein() {
            anime({
                targets: '.speaker-detail .prev',
                duration: 1500,
                easing: 'linear',
                opacity: {
                    value: [0,1],
                    easing: 'linear'
                },
                deplay:1500

            });
            anime({
                targets: '.speaker-detail .next',
                duration: 1500,
                easing: 'linear',
                opacity: {
                    value: [0,1],
                    easing: 'linear'
                },
                deplay:0

            });
            }        

        
        function SpeakerInfo(){
            anime({
                targets: '.is-selected .speaker-detail__info .info-move-in',
                easing: 'easeInOutQuart',
                opacity: {
                    value: [0,1],
                    easing: 'easeInOutQuart'
                },
                translateY :[-500,0],
                translateX :[500,0],
                delay: anime.stagger(50)

            });
        }

        function CursorTransLB($obj) {
            $($obj).on('mouseover',function(){
                $('.cursor-follower').addClass('cursor-folow-transform');
                TweenMax.to( '.cursor-follower', 1.5, {
                    css: { scale: 1.5},
                    ease: Elastic.easeOut
                });
                $('.cursor').addClass('cursor-transform');
            });
            $($obj).on('mouseout',function(){
                $('.cursor-follower').removeClass('cursor-folow-transform');
                TweenMax.to( '.cursor-follower', 0.5, {
                    css: { scale:1 },
                    ease: Elastic.linear
                });
                $('.cursor').removeClass('cursor-transform');
            });
        }

        function textExplose(){
            
            {
                const items = Array.from(document.querySelectorAll('.speaker-detail > .exit '));

                class Item {
                    constructor(el) {
                        this.DOM = {};
                        this.DOM.el = el;
                        this.DOM.name = el.querySelector('.exit .explosed');
                        charming(this.DOM.name);
                        this.DOM.nameLetters = Array.from(this.DOM.name.querySelectorAll('span'));
                        this.initEvents();
                    }
                    initEvents() {
                        this.mouseenterFn = () => this.mouseTimeout = setTimeout(() => {
                            this.isActive = true;
                            anime.remove(this.DOM.nameLetters);
                            anime({
                                targets: this.DOM.nameLetters,
                                duration: 800,
                                easing: 'cubicBezier(0.7,0,0.3,1)',
                                scale: (t,i) => [1,anime.random(0,1) ? 0.8:1.4],
                                // translateX: (t,i) => [0,anime.random(-40,40)],
                                translateX: (t,i) => {
                                    const elBounds = this.DOM.el.getBoundingClientRect();
                                    const x1 = elBounds.left + elBounds.width/2;
                                    const y1 = elBounds.top + elBounds.height/2;
                                    
                                    const targetBounds = t.getBoundingClientRect();
                                    const x2 = targetBounds.left + targetBounds.width/2;
                                    const y2 = targetBounds.top + targetBounds.height/2;

                                    const dist = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
                                    const maxDist = Math.sqrt(Math.pow(elBounds.left-x1,2) + Math.pow(elBounds.top-y1,2));
                                    const maxTX = x2<x1?-80:80;

                                    return maxTX/maxDist*dist;
                                },
                                translateY: (t,i) => [0,anime.random(-40,40)],
                                rotateZ: (t,i) => [0,anime.random(-20,20)],
                                opacity: (t,i) => 0.3,
                            });	
                        }, 50);

                        this.mouseleaveFn = () => {
                            clearTimeout(this.mouseTimeout);
                            if( !this.isActive ) return;
                            this.isActive = false;
                            anime.remove(this.DOM.nameLetters);
                            anime({
                                targets: this.DOM.nameLetters,
                                duration: 800,
                                easing: 'cubicBezier(0.7,0,0.3,1)',
                                scale: 1,
                                translateX: 0,
                                translateY: 0,
                                rotateZ: 0,
                                opacity: 1
                            });
                        };

                        this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
                        // this.DOM.el.addEventListener('touchstart', this.mouseenterFn);
                        this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
                        // this.DOM.el.addEventListener('touchend', this.mouseleaveFn);
                    }
                };

                items.forEach(item => new Item(item));
            };
        }
    //------------------ end effcet fucntion---------------------------------
    //-----------------------------------------------------------------------------

        $(lightbox.config.lightboxID).find('.prev').on('click', function() {
            $slider.flickity('previous');

        });
        
        $(lightbox.config.lightboxID).find('.next').on('click', function() {
            $slider.flickity('next');
        
        });
        
        // keyboard
        $(document).keyup(function(event) {
            if ($('body').hasClass('lightbox-enabled')) {
            switch (event.keyCode) {
                case 27:
                $(lightbox.config.lightboxID).find('.exit').click();
                break;
                case 37:
                $(lightbox.config.lightboxID).find('.prev').click();
                break;
                case 39:
                $(lightbox.config.lightboxID).find('.next').click();
                break;
            }
            }
        });
        
        },
        
        // contain lightbox images
        containImg : function() {
            $(lightbox.config.lightboxID).find('img').css('maxHeight',   ($(document).height() - lightbox.config.containImgMargin));
        }
        
        };
        
        // initalise lightbox
        
        lightbox.init({
            containImgMargin : 100
        }); 
    }

});





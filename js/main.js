"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // inputmask

    let phone = document.querySelectorAll("input[type='tel']"),
        im = new Inputmask("+7 (999) 999-99-99");
    im.mask(phone);

    // main slider

    const mainSlider = new Swiper('.main-slider', {
        speed: 400,
        spaceBetween: 10,
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.main-slider__pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.main-slider__next',
            prevEl: '.main-slider__prev',
        },
    });

    // catalog-slider

    const catalogSlider = new Swiper('.catalog-slider', {
        speed: 400,
        spaceBetween: 10,
        slidesPerView: 1.5,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: '.catalog-slider__next',
            prevEl: '.catalog-slider__prev',
        },
        breakpoints: {
            380: {
                slidesPerView: 1.8,
                spaceBetween: 20
            },
            730: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            900: {
                slidesPerView: 2.5,
                spaceBetween: 20
            },
            1150: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1310: {
                slidesPerView: 3.4,
                spaceBetween: 20
            },
        }

    });

    // video-about__slider

    const videoSlider = new Swiper('.video-about__slider', {
        speed: 400,
        spaceBetween: 10,
        loop: true,
        pagination: {
            el: '.video-about__pagination',
            type: 'bullets',
            clickable: true,
        },

    });
    // video-about__slider

    const reviewsSlider = new Swiper('.reviews__slider', {
        speed: 400,
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1.5,
        centeredSlides: true,
        breakpoints: {
            730: {
                slidesPerView: 2.3,
                spaceBetween: 10
            },
        },
        pagination: {
            el: '.reviews__pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.reviews__next',
            prevEl: '.reviews__prev',
        },

    });

    // news-slider

    const newsSlider = new Swiper('.news-slider', {
        speed: 400,
        spaceBetween: 0,
        loop: true,
        navigation: {
            nextEl: '.news-slider__next',
            prevEl: '.news-slider__prev',
        },

    });

    // catalog-page-slider

    const catalogPageSlider = new Swiper('.catalog-page-slider', {
        speed: 400,
        spaceBetween: 0,
        loop: true,
        navigation: {
            nextEl: '.catalog-page-slider__next',
            prevEl: '.catalog-page-slider__prev',
        },

    });

    // card-thumbs

    const cardThumbsSlider = new Swiper('.card-thumbs', {
        speed: 400,
        spaceBetween: 0,
        slidesPerView: 5,

    });

    // card-slider

    const cardPageSlider = new Swiper('.card-slider', {
        speed: 400,
        spaceBetween: 0,
        navigation: {
            nextEl: '.card-slider__next',
            prevEl: '.card-slider__prev',
        },
        thumbs: {
            swiper: cardThumbsSlider
        }

    });



    //E-mail Ajax Send
    $(".form-send").submit(function () {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: th.serialize()
        }).done(function () {
            callbackModal.close();
            testdriveModal.close();
            submitModal.open();
            $('.form').css('width', '100%');
            setTimeout(function () {
                // Выполнено
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

    // tabs
    let tabBtn = document.querySelectorAll('.tab-btn'),
        tabControl = document.querySelector('.tab-control'),
        tabContent = document.querySelectorAll('.tab-content');
        
    if (tabControl != null) {

        tabs(tabBtn, tabControl, tabContent);

        function tabs(tab, info, tabContent) {
            function hideTab(a) {
                for (let i = a; i < tabContent.length; i++) {
                    tabContent[i].classList.remove('show');
                    tabContent[i].classList.add('hide');

                }
            }

            hideTab(1);

            function showTab(b) {
                if (tabContent[b].classList.contains('hide')) {
                    tabContent[b].classList.remove('hide');
                    tabContent[b].classList.add('show');
                }
            }
            tabControl.addEventListener('click', function (e) {
                let target = e.target;
                if (target && target.classList.contains('tab-btn')) {
                    for (let i = 0; i < tabBtn.length; i++) {
                        tabBtn[i].classList.remove('tab-btn--act');
                        if (target == tabBtn[i]) {
                            tabBtn[i].classList.add('tab-btn--act');
                            hideTab(0);
                            showTab(i);
                        }
                    }
                }
            });
        }

    }


    // modals
    var submitModal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Закрыть",
        cssClass: ['submit-modal'],
    });
    submitModal.setContent(document.querySelector(".modal-submited").innerHTML);


    // Загрузка видео по клику

    function findVideos() {
        let videos = document.querySelectorAll('.video');

        for (let i = 0; i < videos.length; i++) {
            setupVideo(videos[i]);
        }
    }

    function setupVideo(video) {
        let link = video.querySelector('.video__link');
        let media = video.querySelector('.video__media');
        let button = video.querySelector('.video__button');
        let id = parseMediaURL(media);

        video.addEventListener('click', () => {
            let iframe = createIframe(id);

            link.remove();
            button.remove();
            video.appendChild(iframe);
        });

        link.removeAttribute('href');
        video.classList.add('video--enabled');
    }

    function parseMediaURL(media) {
        let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
        let url = media.src;
        let match = url.match(regexp);

        return match[1];
    }

    function createIframe(id) {
        let iframe = document.createElement('iframe');

        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('src', generateURL(id));
        iframe.classList.add('video__media');

        return iframe;
    }

    function generateURL(id) {
        let query = '?rel=0&showinfo=0&autoplay=1';

        return 'https://www.youtube.com/embed/' + id + query;
    }

    findVideos();

    // sub-menu

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    const body = document.querySelector('body'),
        itemHasChildren = document.querySelectorAll('.menu-item-has-children');
    if (isMobile.any()) {
        body.classList.add('touch');
        itemHasChildren.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    } else {
        body.classList.add('mouse');
    }

    // mobile menu

    const menuBtn = document.querySelector('.menu-btn'),
        menuClose = document.querySelector('.menu-close'),
        menu = document.querySelector('.mobile-menu');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        body.classList.toggle('lock');
    });

    menuClose.addEventListener('click', () => {
        menu.classList.toggle('active');
        body.classList.remove('lock');
    });



});
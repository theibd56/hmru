import { Fancybox } from "@fancyapps/ui";
import Swiper from 'swiper/bundle';


import './sass/_style.scss';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/css/bundle';

// Подключаем Yandex Maps API
const script = document.createElement('script');
script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
script.type = "text/javascript";
document.head.appendChild(script);

// Инициализация карты после загрузки Yandex Maps API
script.onload = () => {
    ymaps.ready(init);

    function init() {
        // Создание карты
        const map = new ymaps.Map('map', {
            center: [55.759886, 37.764079], // Центр карты
            zoom: 10, // Масштаб
            controls: [] // Контроллеры
        });

        const map2 = new ymaps.Map('map2', {
            center: [55.795180, 37.986879], // Центр карты
            zoom: 10, // Масштаб
            controls: [] // Контроллеры
        });

        // Создание маркера
        const marker = new ymaps.Placemark([55.759886, 37.764079], {
            balloonContent: ''
        }, {
            iconLayout: 'default#image',
            // iconImageHref: 'https://img.icons8.com/?size=100&id=7880&format=png&color=339AF0',
            iconImageHref: '/gps.svg',
            iconImageSize: [50, 50],
            iconImageOffset: [-25, -50] // Смещение иконки для корректного отображения
        });

        const marker2 = new ymaps.Placemark([55.795180, 37.986879], {
            balloonContent: ''
        }, {
            iconLayout: 'default#image',
            // iconImageHref: 'https://img.icons8.com/?size=100&id=7880&format=png&color=339AF0',
            iconImageHref: '/gps.svg',
            iconImageSize: [50, 50],
            iconImageOffset: [-25, -50] // Смещение иконки для корректного отображения
        });

        // Добавление маркера на карту
        map.geoObjects.add(marker);
        map2.geoObjects.add(marker2);
    }
};

//fancybox (может конфликтовать)
Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

//slider
const popularSlider = new Swiper('.catalog-popular__container', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    breakpoints: {
        300: {
            slidesPerView: 2.25,
        },
        576: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        },
    },
})

const sliders = document.querySelectorAll('.contacts__located_slider .swiper'),
    prevArrow = document.querySelectorAll('.contacts__arrow_prev'),
    nextArrow = document.querySelectorAll('.contacts__arrow_next');

sliders.forEach((slider, index) => {
    const contactsSlider = new Swiper(slider, {
        slidesPerView: 5,
        spaceBetween: 20,
        loop: false,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: nextArrow[index],
            prevEl: prevArrow[index],
        },
        breakpoints: {
            300: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            425: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2.75,
            },
            768: {
                slidesPerView: 3.25,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 4,
            },
            1500: {
                slidesPerView: 5,
            },
        },
    });
})

//toggle catalog
$(function() {
    $('#show-catalog').on('click', () => {
        if (window.innerWidth > 992) {
            $('.jalousie').toggleClass('active')
        } else {
            $('.jalousie').removeClass('active')
        }
    })
})

$(document).on('click', '#show-catalog', function () {
    $(this).toggleClass('is_active')
    $('.basket').toggleClass('hide')
    $('.cross').toggleClass('hide')
    $('.burger-menu').removeClass('active');
    $('.header__burger').removeClass('is-active');
    $('.catalog-menu').toggleClass('active')

    if ($('.basket').hasClass('hide')) {
        $('body').addClass('locked')
    } else if ($('.cross').hasClass('hide')) {
        $('body').removeClass('locked')
    }
})

$('.catalog-menu__list_item:first-child').addClass('active')
$('.catalog-menu__inner_item:first-child').addClass('active')
$(document).on('click', '.catalog-menu__list_item', function () {
    if (window.innerWidth < 992) {
        $(this).toggleClass('opened')
        $(this).find('.catalog-sub-menu').slideToggle()
    } else {
        $('.catalog-menu__list_item').removeClass('active');
        $('.catalog-menu__inner_item').removeClass('active');
        $(this).addClass('active');
        $(`.catalog-menu__inner_item[data-tab="${this.dataset.tab}"]`).addClass('active');
    }
})

//burger
$(function() {
    $('#mobile-burger, .burger-menu__close').click(function (event) {
        $(this).toggleClass('is-active')
        $('.burger-menu').toggleClass('active');
        $('html').toggleClass('lock')
    });

    $('.burger-menu__menu_trigger').on('click', function() {
        $('.burger-menu__menu_trigger').parent().toggleClass('is-active')
        $('.burger-menu__menu_sub').slideToggle(100)
    })
})

//search bar
$(document).on('click', '.header__search_trigger, .main_search_block_in .close', function () {
    $('#search-popup').toggleClass('show')
    $('.header__burger ').removeClass('is-active')
    $('.burger-menu').removeClass('active')

    if ($('#search-popup').hasClass('show')) {
        $('body').addClass('lock')
    } else {
        $('body').removeClass('lock')
    }
})

//footer submenu
$(function() {
    $('.footer__catalog_trigger').on('click', function() {
      $(this).toggleClass('active')
      $('.footer__catalog_sub').slideToggle(50)
    })

    $('.footer__menu_trigger').on('click', function() {
        $(this).toggleClass('active')
        $('.footer__menu_sub').slideToggle(50)
    })
})

//main padding
$(function () {
    $('main').css('padding-top', `${$('header').height() + 30}px`)
    $(window).resize(function () {
        $('main').css('padding-top', `${$('header').height() + 30}px`)
    })
})

//catalog page
$('.filrt_form_in_head').click(function () {
    $(this).toggleClass('filrt_form_in_head_show').next().slideToggle('fast');
    $('.filrt_form_in_head').not(this).removeClass('filrt_form_in_head_show').next().slideUp('fast');
});

$('.in_links_show_in1').click(function () {
    $(this).toggleClass('in_links_show_in1_show').next().slideToggle('fast');
    $('.in_links_show_in1').not(this).removeClass('in_links_show_in1_show').next().slideUp('fast');
});

$('.mobile-catalog__item').on('click', function() {
    $('.mobile-catalog__item').removeClass('active')
    $(this).addClass('active')

    if ($(this).hasClass('mobile-catalog__grid')) {
        $('.catalog_flex_main_left').removeClass('active').addClass('hidden')
        $('.catalog_flex_main_right').removeClass('hidden').addClass('active')
    } else {
        $('.catalog_flex_main_left').removeClass('hidden').addClass('active')
        $('.catalog_flex_main_right').removeClass('active').addClass('hidden')
    }
})

//click jalousie and close catalog dropdown
$(document).on('click', function(e) {
    if(e.target.className == "jalousie active") {
        $('.jalousie').removeClass('active')
        $('.catalog-menu').removeClass('active')
        $('#show-catalog .cross').toggleClass('hide')
        $('#show-catalog .basket').toggleClass('hide')
    }
})

$('.header__nav_more').hover(function() {
    $('.header__nav_more-content').slideToggle()
})

$('.header__search').hover(function() {
    $('.main_search_block_in_result').slideToggle()
})

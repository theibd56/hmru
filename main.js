import { Fancybox } from "@fancyapps/ui";
import Swiper from 'swiper/bundle';


import './sass/_style.scss';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/css/bundle';

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

// //toggle catalog
$(function() {
    $('#show-catalog').on('click', () => {
        // $('.menu-box').toggleClass('active')
        $('.jalousie').toggleClass('active')
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

if(window.innerWidth < 992) {
    $(document).on('click', '.catalog-menu__item.has-sub-menu', function ()
    {
        // $('.catalog-menu__item.has-sub-menu').parent().removeClass('opened')
        // $('.catalog-menu__item.has-sub-menu').siblings('.catalog-sub-menu').slideUp()
        $(this).parent().toggleClass('opened')
        $('.jalousie').toggleClass('active')
        $(this).siblings('.catalog-sub-menu').slideToggle()
    })
}

if(window.innerWidth > 992) {
    $('.catalog-menu__list_item:first-child').addClass('active')
    $('.catalog-menu__inner_item:first-child').addClass('active')
    $('.catalog-menu__list_item').click(function () {
        $('.catalog-menu__list_item').removeClass('active');
        $('.catalog-menu__inner_item').removeClass('active');
        $(this).addClass('active');
        $(`.catalog-menu__inner_item[data-tab="${this.dataset.tab}"]`).addClass('active');
    });
}




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
$(document).on(
    'click',
    '.header__search_trigger, .main_search_block_in .close',
    function () {
        $('#search-popup').toggleClass('show')
        $('.header__burger ').removeClass('is-active')
        $('.burger-menu').removeClass('active')

        if ($('#search-popup').hasClass('show')) {
            $('body').addClass('lock')
        } else {
            $('body').removeClass('lock')
        }
    },
)
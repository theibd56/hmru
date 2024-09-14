import { Fancybox } from "@fancyapps/ui";

import './sass/_style.scss';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

//toggle search
$(function() {
    if (window.innerWidth < 992) {
        $('.header__search_trigger').on('click', () => {
            console.log('gay')
            $('#title-search').slideToggle(100)
        })

        $(document).mouseup(function (e) {
            if ($('#title-search').has(e.target).length === 0){
                $('#title-search').slideUp(10);
            }
        });
    }
})

//burger
$(function() {
    $('#mobile-burger, .burger-menu__close').click(function (event) {
        $(this).toggleClass('is-active')
        $('.header-burger, .burger-menu').toggleClass('active');
        $('html').toggleClass('lock')
    });
    $('.burger-menu__shadow').click(function (event) {
        $('.burger-menu').removeClass('active');
        $('html').removeClass('lock');
        $('.header-burger').removeClass('active');
    });

    $('.burger-menu__menu_trigger').on('click', function() {
        $('.burger-menu__menu_trigger').parent().toggleClass('is-active')
        $('.burger-menu__menu_sub').slideToggle(100)
    })
})
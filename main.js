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
                slidesPerView: 2.25,
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


//привязать к скрипту с добавлением класса filled на бою как на форме auth / register
//код тестовый для визуала
const inviteItems = document.querySelectorAll('.invite__form_input')
inviteItems.forEach(item => {
    const inviteInput = item.querySelector('input')
    item.addEventListener('change', function() {
        if(inviteInput.value.length > 0) {
            item.classList.add('filled')
        } else {
            item.classList.remove('filled')
        }
    })

})

//скрипт для маски телефона
if(document.querySelector('#invitePhone')) {
    document.querySelector('#invitePhone').onkeydown = function(e){
        inputphone(e,document.querySelector('#invitePhone'))
    }
    function inputphone(e, phone){
        function stop(event) {
            event.preventDefault();
        }
        let key = e.key, v = phone.value, not = key.replace(/([0-9])/, 1)

        if(not == 1 || 'Backspace' === not){
            if('Backspace' != not){
                if(v.length < 4 || v ===''){phone.value= '+7 ('}
                if(v.length === 7){phone.value= v +') '}
                if(v.length === 11){phone.value= v +'-'}
                if(v.length === 14){phone.value= v +'-'}
            }
        }
        else {
            stop(e)
        }
    }
}


//----------------- слайдер для навигационного слайдера на странице продукта -----------------//
const productSliderNavigate = new Swiper('.product-sliders__thumb', {
    centeredSlidesBounds: true,
    slidesPerView: 6,
    spaceBetween: 10,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'horizontal',
    speed: 800,
    breakpoints: {
        320: {
            slidesPerView: 3,
        },
        425: {
            slidesPerView: 4,
        },
        576: {
            slidesPerView: 5,
        },
        768: {
            slidesPerView: 6,
        },
        992: {
            slidesPerView: 7,
        },
        1250: {
            slidesPerView: 4,
        },
        1500: {
            slidesPerView: 5,
        },
        1630: {
            slidesPerView: 6,
        }
    }
});

//----------------- слайдер для главного слайдера на странице продукта -----------------//
const productSlider = new Swiper('.product-sliders__main', {
    speed: 800,
    spaceBetween: 40,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    preventInteractionOnTransition: true,
    thumbs: {
        swiper: productSliderNavigate,
    },
    navigation: {
        nextEl: '.product-sliders__next',
        prevEl: '.product-sliders__prev',
    },
});

productSlider.on('slideChangeTransitionStart', function() {
    productSliderNavigate.slideTo(productSlider.activeIndex);
});

productSliderNavigate.on('transitionStart', function(){
    productSlider.slideTo(productSliderNavigate.activeIndex);
});

//----------------- кнопка показать еще в характеристиках -----------------//
if  (document.querySelectorAll('.product-info__characteristic_wrapper')) {

    function createdMore (eachedElem, indexNum, trigger) {
        eachedElem.forEach((item, index) => {
            if(index > indexNum) {
                item.classList.toggle('hidden')
            }
        })

        trigger.innerText === 'Смотреть все характеристики' ?
            trigger.innerText = 'Скрыть' :
            trigger.innerText = 'Смотреть все характеристики';
    }

    const characteristicWrapperList = document.querySelectorAll('.product-info__characteristic')

    characteristicWrapperList.forEach((characteristicWrapper) => {
        const characteristicItem = characteristicWrapper.querySelectorAll('.product-info__characteristic_item')
        const characteristicMore = characteristicWrapper.querySelector('.product-info__characteristic_more')

        if (characteristicItem.length > 11) {
            characteristicItem.forEach((item, index) => {
                if(index > 10) {
                    item.classList.add('hidden')
                }
            })

            characteristicMore.classList.remove('hidden')
        }

        characteristicMore.addEventListener('click', () => {
            createdMore(characteristicItem, 10, characteristicMore)
            characteristicWrapper.classList.toggle('active')
        })
    })

}

//----------------- custom select -----------------//
if (document.querySelectorAll('.dropdown')) {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        const input = dropdown.querySelector('input');
        const listOfOptions = dropdown.querySelectorAll('.option');
        const body = document.body;

        if(input.value === '') {
            input.value = listOfOptions[0].textContent;
        }

        const toggleDropdown = (event) => {
            event.stopPropagation();
            dropdown.classList.toggle('opened');
        };

        const selectOption = (event) => {
            input.value = event.currentTarget.textContent;
        };

        const closeDropdownFromOutside = () => {
            if (dropdown.classList.contains('opened')) {
                dropdown.classList.remove('opened');
            }
        };

        body.addEventListener('click', closeDropdownFromOutside);

        listOfOptions.forEach((option) => {
            option.addEventListener('click', selectOption);
        });

        dropdown.addEventListener('click', toggleDropdown);
    })
}

//materials slider
const materialSlider = new Swiper('.product-materials__slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false,
    speed: 800,
    navigation: {
        nextEl: '.product-materials__next',
        prevEl: '.product-materials__prev',
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    breakpoints: {
        300: {
            slidesPerView: 1.7,
            spaceBetween: 10,
        },
        576: {
            slidesPerView: 2.5,
            spaceBetween: 15,
        },
        768: {
            spaceBetween: 30,
            slidesPerView: 2.5,
        },
        1350: {
            slidesPerView: 3,
        }
    },
})

//video slider
const videoSlider = new Swiper('.product-description__video_slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false,
    speed: 800,
    navigation: {
        nextEl: '.product-description__next',
        prevEl: '.product-description__prev',
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    breakpoints: {
        300: {
            slidesPerView: 1.2,
            spaceBetween: 10,
        },
        576: {
            slidesPerView: 2.5,
            spaceBetween: 15,
        },
        768: {
            spaceBetween: 30,
            slidesPerView: 2.5,
        },
        1350: {
            slidesPerView: 3,
        }
    },
})

document.addEventListener("DOMContentLoaded", function () {
    const textBlock = document.querySelector(".product-description__text");
    const moreButton = document.querySelector(".product-description__text_more");

    if (!textBlock || !moreButton) return;

    const maxHeight = window.innerWidth > 992 ? 242 : 360;

    // Функция для проверки высоты с учетом задержки
    const updateState = () => {
        // Задержка для стабилизации изменения размеров
        setTimeout(() => {
            const height = textBlock.offsetHeight;
            console.log("current height: " + height);

            if (height > maxHeight) {
                textBlock.classList.add("cropped");
                textBlock.classList.remove("uncropped");
                moreButton.textContent = "Показать больше";
            } else {
                textBlock.classList.add("uncropped");
                textBlock.classList.remove("cropped");
                moreButton.textContent = "Скрыть";
            }

            console.log(height > maxHeight);
        }, 50); // Задержка для стабилизации
    };

    const toggleState = () => {
        if (textBlock.classList.contains("uncropped")) {
            textBlock.classList.remove("uncropped");
            moreButton.textContent = "Показать больше";
        } else {
            textBlock.classList.add("uncropped");
            moreButton.textContent = "Скрыть";
        }
    };

    // Инициализация состояния
    updateState();

    // Добавляем слушатель на кнопку
    moreButton.addEventListener("click", toggleState);

    // Обработка события изменения размера окна
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateState();
        }, 200); // Задержка после изменения размера окна
    });
});
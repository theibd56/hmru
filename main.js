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


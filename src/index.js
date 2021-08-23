import "animate.css"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import "./css/style.scss";
import "./images/tw-icon_sprite.svg"
import "./images/vk-icon_sprite.svg"
import "./images/fb-icon_sprite.svg"
import "./images/plus_sprite.svg"
import "./images/arrow_sprite.svg"

$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
});

$('.team-carousel, .review-carousel').owlCarousel({
    items: 1,
    loop: true,

    center: true,
    margin: 300,
    nav: true,
    navText: [
        '<svg class="arrow"> <use xlink:href="#arrow_sprite"></use></svg>',
        '<svg class="arrow"> <use xlink:href="#arrow_sprite"></use></svg>']
});

    $('.faq-list__item:not(:first-child) .answer-block').slideToggle(0);
    $('.faq-list__item:first-child .circle-plus').addClass('opened')

$('.question-block__button').click(function () {
    let ansBlock = $(this).parents('.faq-list__item').children('.answer-block');
    ansBlock.slideToggle(500);
    $(this).children('.circle-plus').toggleClass('opened');
    if ($(this).hasClass('question-block__button--active')) {
        $(this).removeClass('question-block__button--active');
    } else {
        $(this).addClass('question-block__button--active')
    }
});
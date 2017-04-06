$(document).ready(function() {
    $('.nav-item').on('click', function() {
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
    });

    $('.pb-btn').on('click', function() {
        $('.pb-btn').removeClass('active');
        $(this).addClass('active');

        if($('.pb-btn-profit').hasClass('active')) {
            $('.pb-tr-expens').fadeOut();
            $('.pb-tr-profit').fadeIn();
        } else if($('.pb-btn-leave').hasClass('active')){
            $('.pb-tr-profit').fadeOut();
            $('.pb-tr-expens').fadeIn();
        } else if($('.pb-btn-all').hasClass('active')) {
            $('.pb-tr-profit').fadeIn();
            $('.pb-tr-expens').fadeIn();
        }
    });

    $('tr').mouseover(function() {
        $(this).addClass('active');
    });

    $('tr').mouseleave(function() {
        $(this).removeClass('active');
    });
});

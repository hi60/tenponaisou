'use strict';

$(function () {
    $('.c-side__list').on('click', function() {
        $(this).next().slideToggle();
        $(this).children('a').toggleClass('c-list-arrow__is-open')
    });


    var slideWidth = $('.p-recommend-cards').children('li').width();
    var slideCount = $('.p-recommend-cards').children('li').length;
    var slideAreaWidth = slideWidth * slideCount;
    var slideLocation = 0;

    $('.p-recommend-cards').css({
        'width': slideAreaWidth
    });

    function slide() {
        if(slideLocation < 0) {
            slideLocation = 0;
        } else if (slideLocation > slideCount - 4) {
            slideLocation = slideCount - 4;
        }
        $('.p-recommend-cards').animate({
            left: slideLocation * -slideWidth
        });
    }

    $('.js-slider-btn').on('click', function() {
        var dataType = $(this).data('slide');
        if (dataType === 'prev') {
            slideLocation--;
        } else {
            slideLocation++;
        }
        slide();
    });

    var imgWidth = $('.js-slide-tgt').width();
    var imgHeight = $('.js-slide-tgt').height();
    var imgCount = $('.js-slide-tgt').length;
    var imgLocation = 1;
    var windowWidth = $(window).width();

    if (windowWidth > 768) {
        var imgAreaWidth = imgWidth * imgCount;

        $('.p-construction__img-slider').css({
            'width': imgAreaWidth,
        });
        $('.p-construction__img__wrap').css({
            'width': imgWidth,
            'height': imgHeight
        });
    } else if(windowWidth <= 768) {
        var imgAreaWidth = windowWidth * imgCount;
        var expandHeight = (windowWidth / imgWidth) * imgHeight;

        $('.js-slide-tgt').css({
            'width': windowWidth
        });
        $('.p-construction__img-slider').css({
            'width': imgAreaWidth,
        });
        $('.p-construction__img__wrap').css({
            'width': windowWidth,
            'height': expandHeight
        });
    }

    function imgSlide() {
        imgLocation += 1;
        if (imgLocation > imgCount - 1) {
            imgLocation = 0;
        }

        if (windowWidth > 768) {
            $('.p-construction__img-slider').animate({
                left: imgLocation * -imgWidth
            });
        } else if (windowWidth <= 768) {
            $('.p-construction__img-slider').animate({
                left: imgLocation * -windowWidth
            });
        }
    }

    setInterval(function() {
        imgSlide();
    }, 2000);

});
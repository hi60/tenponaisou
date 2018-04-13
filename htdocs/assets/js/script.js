'use strict';

$(function () {
    $.ajax({
        type: 'get',
        url: '/render.json'
    }).done(function (data) {
        recommendRender(data);
        noticeRender(data);
        voiceRender(data);
        newDesignRender(data);
        designRankRender(data);
        whatsNewRender(data);

        var slideWidth = $('.p-recommend-cards').children('li').width();
        var slideCount = $('.p-recommend-cards').children('li').length;
        var slideAreaWidth = slideWidth * slideCount;
        var slideLocation = 0;

        clickSlider(slideWidth, slideCount, slideAreaWidth, slideLocation);
    
    }).fail(function (){
        alert('通信エラーが発生しました。\nしばらくたってから再度お試しください。');
    });

    function recommendRender(data) {
        for (var renderTgt in data.recommend) {
            $('.js-recommendRendering').append(
                '<li>' +
                    '<a href="" class="c-recommend-card">' +
                        '<img src="' + data.recommend[renderTgt].img + '" alt="">' +
                        '<p class="u-mb10 u-red-txt">' + data.recommend[renderTgt].shop + '</p>' +
                        '<p class="u-initial__txt">' + data.recommend[renderTgt].company + '</p>' +
                    '</a>' + 
                '</li>'
            )
        }
    };

    function noticeRender(data) {
        for (var renderTgt in data.notice) {
            $('.js-noticeRendering').prepend(
                '<li class="c-side__list">' +
                    '<div>' +
                        '<a href="" class="p-side__new-info">' +
                            '<img src="' + data.notice[renderTgt].img + '" alt="">' +
                            '<div class="p-side__new-info__txt">' + 
                                '<p class="u-side-date">' + data.notice[renderTgt].date + '</p>' +
                                '<p class="u-side-head">' + data.notice[renderTgt].text + '</p>' +
                            '</div>' +
                        '</a>' +
                    '</div>' +
                '</li>'
            )
        }
    };

    function voiceRender(data) {
        for (var renderTgt in data.voice) {
            $('.js-voiceRendering').prepend(
                '<li class="c-side__list">' + 
                    '<div>' +
                        '<a href="" class="p-side__new-info">' +
                            '<img src="' + data.voice[renderTgt].img + '" alt="">' +
                            '<div class="p-side__new-info__txt">' +
                                '<p class="u-side-date">' + data.voice[renderTgt].date + '</p>' +
                                '<p class="u-side-head">' + data.voice[renderTgt].text + '</p>' +
                            '</div>' +
                        '</a>' +
                    '</div>' +
                '</li>'
            )
        }
    };

    function newDesignRender(data) {
        for (var renderTgt in data.newDesign) {
            $('.js-newDesignRendering').append(
                '<li class="u-rp__mr10">' +
                    '<a href="" class="c-nd-card">' +
                        '<img src="' + data.newDesign[renderTgt].img + '" alt="">' +
                        '<div class="c-card__info">' +
                            '<h3>' + data.newDesign[renderTgt].title + '</h3>' +
                            '<div class="c-card__detail">' +
                                '<p class="c-card__detail-head">カテゴリー</p>' +
                                '<p>' + data.newDesign[renderTgt].cat + '</p>' +
                            '</div>' +
                            '<div class="c-card__detail">' +
                                '<p class="c-card__detail-head">面積</p>' +
                                '<p>' + data.newDesign[renderTgt].area + '</p>' +
                            '</div>' +
                            '<div class="c-card__detail">' +
                                '<p class="c-card__detail-head">会社名</p>' +
                                '<p>' + data.newDesign[renderTgt].company + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                '</li>'
            )
        }
    };

    function designRankRender(data) {
        for (var renderTgt in data.designRank) {
            $('.js-designRankRendering').append(
                '<li class="u-rp__mr10">' + 
                    '<a href="" class="c-dr-card">' +
                        '<img src="' + data.designRank[renderTgt].img + '" alt="">' +
                        '<div class="c-card__info">' +
                            '<h4 class="u-rank-txt0' + (Number(renderTgt) + 1) + '">' + data.designRank[renderTgt].title + '</h4>' +
                            '<div class="c-card__detail">' + 
                                '<p class="c-card__detail-head">カテゴリー</p>' +
                                '<p>' + data.designRank[renderTgt].cat + '</p>' +
                            '</div>' +
                            '<div class="c-card__detail">' +
                                '<p class="c-card__detail-head">面積</p>' +
                                '<p>' + data.designRank[renderTgt].area + '</p>' +
                            '</div>' +
                            '<div class="c-card__detail">' +
                                '<p class="c-card__detail-head">会社名</p>' +
                                '<p>' + data.designRank[renderTgt].company + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                '</li>'
            )
        }
    };

    function whatsNewRender(data) {
        for (var renderTgt in data.notice) {
            $('.p-whats__new__wrap').children('ul').append(
                '<li class="p-whats__new__item">' +
                    '<a href="">' +
                        '<p class=" u-fs13"><span class="u-mr10">' + data.notice[renderTgt].date +
                        '</span>' + data.notice[renderTgt].text + '</p>' +
                    '</a>' +
                '</li>'
            )
        }
    };

    $('.c-side__list').on('click', function() {
        $(this).next().slideToggle();
        $(this).children('a').toggleClass('c-list-arrow__is-open');
    });

    function clickSlider(slideWidth, slideCount, slideAreaWidth, slideLocation) {
        $('.p-recommend-cards').css({
            'width': slideAreaWidth
        });
        
        $('.js-slider-btn').on('click', function() {
            var dataType = $(this).data('slide');
            if (dataType === 'prev') {
                slideLocation--;
            } else {
                slideLocation++;
            }
            slide(slideWidth, slideCount, slideLocation);
        });
    }

    function slide(slideWidth, slideCount, slideLocation) {
        if(slideLocation < 0) {
            slideLocation = 0;
        } else if (slideLocation > slideCount - 4) {
            slideLocation = slideCount - 4;
        }
        $('.p-recommend-cards').animate({
            left: slideLocation * -slideWidth
        });
    };

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

    function autoSlide() {
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
        autoSlide();
    }, 2000);

        // data.whatsNew.forEach(function (text) {
        //     $('.p-whats__new__wrap').append(
        //         '<p>' + text.date + '<p>' +
        //         '<p>' + text.text + '<p>'
        //     )
        // });
});
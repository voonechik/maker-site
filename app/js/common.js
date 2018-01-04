$(document).ready(function() {

  // Remove free hosting logo

  $('[title = "Hosted on free web hosting 000webhost.com. Host your own website for FREE."]').css('display', 'none');


  // Mnu show/hide

  function mnuRight() {

    $('.top-nav__burger-btn').click(function() {

      $('.mnu').css('transform', 'translateX(0)');

    });

    $('.mnu__close').click(function() {

      $('.mnu').css('transform', 'translateX(100%)');

    });

    $('.mnu-overlay').click(function() {

      $('.mnu').css('transform', 'translateX(100%)');

    });

  };

  mnuRight();


  // Smooth scroll

  smoothScroll.init();


  // Parallax

  function myParallax () {

    $(window).scroll(function() {

      if ( window.matchMedia("(min-width: 992px)").matches ) {

        var st = $(this).scrollTop();

        $('.parallax-effect').css({

          "transform": "translate(0%, -" + st/20 + "%)"

        });

      } else {

        $('.parallax-effect').css({

          "transform": "translate(0%, 0%)"

        });

      }

    });

  };

  myParallax();

});

/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var HS = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages

        $('.button-collapse').sideNav({
            menuWidth: 220,
            edge: 'left',
            // closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
          }
        );

        $('.collapsible').collapsible();

        new WOW().init();

      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {

        var $slider_home = $('.slider-home');

        $slider_home.fadeIn(2000).slider({
          'height': '600px',
          'interval': 15000,
        });


        // .always( function( instance ) {
        //   $slider_home.removeClass('loading').addClass('loaded');
        // });

        // $('.slider-home').slider({
        //   'height': '600px',
        //   'interval': 10000,
        // });

      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    'products': {
      init: function() {
        $('.slider-products').slider({
          // 'height': '500px'
        });

        // Isotope products
        var $container = $('.isotope').imagesLoaded( function() {

          $container.fadeIn(1000).isotope({
            itemSelector: '.isotope-item',
            layoutMode: 'fitRows',
          });

          $('#category-filter').on( 'click', '.filter-button', function() {
            event.preventDefault();
            var filterValue = $(this).attr('data-filter');
            $container.isotope({ filter: filterValue });
            $('#category-filter .active').removeClass('active');
            $(this).parent().addClass('active');
          });

          $('#line-filter').on( 'click', '.filter-button', function() {
            event.preventDefault();
            var filterValue = $(this).attr('data-filter');
            $container.isotope({ filter: filterValue });
            $('#line-filter .active').removeClass('active');
            $(this).parent().addClass('active');
          });

        });

        console.log('hello products');
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    'product': {
      init: function() {

        $('.product-detail').pushpin({ top: 80, offset: 20 });

        $('.scrollspy').scrollSpy();

        $('.flexslider').flexslider({
          animation: "slide"
        });

      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    'centro_tecnico': {
      init: function() {

        // Floating-Fixed table of contents
        if ($('.page-header').length) {
          $('.toc-wrapper').pushpin({ top: $('.page-header').height() });
        }
        else {
          $('.toc-wrapper').pushpin({ top: 0 });
        }

        $('.scrollspy').scrollSpy();

      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    'contacts': {

      init: function() {



            $("input,textarea").jqBootstrapValidation({
                preventSubmit: true,
                submitError: function($form, event, errors) {
                    // additional error messages or events
                },
                submitSuccess: function($form, event) {
                    event.preventDefault(); // prevent default submit behaviour
                    // get values from FORM
                    var name = $("input#name").val();
                    var email = $("input#email").val();
                    var phone = $("input#phone").val();
                    var message = $("textarea#message").val();
                    var firstName = name; // For Success/Failure Message
                    // Check for white space in name for Success/Fail message
                    if (firstName.indexOf(' ') >= 0) {
                        firstName = name.split(' ').slice(0, -1).join(' ');
                    }
                    $.ajax({
                        url: "../../mail/contact_me.php",
                        type: "POST",
                        data: {
                            name: name,
                            phone: phone,
                            email: email,
                            message: message
                        },
                        cache: false,
                        success: function() {
                            // Success message
                            $('#success').html("<div class='alert alert-success'>");
                            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-success')
                                .append("<strong>Your message has been sent. </strong>");
                            $('#success > .alert-success')
                                .append('</div>');

                            //clear all fields
                            $('#contactForm').trigger("reset");
                        },
                        error: function() {
                            // Fail message
                            $('#success').html("<div class='alert alert-danger'>");
                            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                            $('#success > .alert-danger').append('</div>');
                            //clear all fields
                            $('#contactForm').trigger("reset");
                        },
                    });
                },
                filter: function() {
                    return $(this).is(":visible");
                },
            });

            $("a[data-toggle=\"tab\"]").click(function(e) {
                e.preventDefault();
                $(this).tab("show");
            });



        /*When clicking on Full hide fail/success boxes */
        $('#name').focus(function() {
            $('#success').html('');
        });

      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    'materiales_institucionales': {
      init: function() {

        // Floating-Fixed table of contents
        if ($('.page-header').length) {
          $('.toc-wrapper').pushpin({ top: $('.page-header').height() });
        }
        else {
          $('.toc-wrapper').pushpin({ top: 0 });
        }

        $('.scrollspy').scrollSpy();

      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    'line': {
      init: function() {

        $('.parallax').parallax();

      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = HS;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

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

        console.log('hello world');

        $('.button-collapse').sideNav({
            menuWidth: 240,
            edge: 'left',
            // closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
          }
        );

        $('.slider-home').slider({
          'height': '800px'
        });

      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        $('.parallax').parallax();
        console.log('hello home');
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
        console.log('hello products');
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    'product': {
      init: function() {
        $('.product-detail').pushpin({ top: 80, offset: 20 });
        // $('.product-nav').pushpin({ top: 80, offset: 20 });

        // var new_width = $('.lcol').width();
        // $('.product-detail').width(new_width);
        $('.scrollspy').scrollSpy();

        console.log('hello product');
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

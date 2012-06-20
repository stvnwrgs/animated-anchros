/* =============================================================
 * jQuery animated-anchor plugin v0.2
 * https://github.com/stvnwrgs/animated-anchros
 * =============================================================
 * Copyright 2012 Steven Wirges, Inc.
 *
 * Licensed under the MIT License
 *
 *
 *      // HOW TO USE
 * 
 *  Example :
 *      $('.anchor').animatedanchor(); 
 *
 * Options:
 *     
 *      Available options and their defaults:
 *
 *      offset:114,
 *      delay:1000,
 *      easing:"linear",
 * 
 *      $('.anchor').animatedanchor({option1, 'value'});
 *
 *
 * Methods:
 *     scrollTo(element)
 * ============================================================== */
 
!function ($) {

    "use strict"; // jshint ;_;

    var methods = {
        init : function (options) {
            $.fn.animatedanchor.options = $.extend({},  $.fn.animatedanchor.defaults, options);
            var hash = window.location.hash;
            alert(hash);
            if(hash) {
                methods.scrollTo($('hash'));
            }

            return this.each(function(){
                $(this).bind('click', methods.click);
           });
        },

        click : function () {         
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') 
            && location.hostname === this.hostname) {
                var options = $.fn.animatedanchor.options;
                var $target =$(this.hash)
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

                if ($target.length) {
                    var targetOffset = $target.offset().top - options.offset;

                    $('html,body').animate({scrollTop: targetOffset}, options.delay, options.easing, function () {
                        window.location.hash = "#" + $($target).attr('id');
                    } );
                    return false;
                }
            }
        },

        // redundant because of performance
        scrollTo :function (element) {
            var options = $.fn.animatedanchor.options;
            var $target = $(element);

            if ($target.length) {
                var targetOffset = $target.offset().top - options.offset;

                $('html,body').animate({scrollTop: targetOffset}, options.delay, options.easing);
                return false;
            }
        }
    };

    $.fn.animatedanchor = function ( method ) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.animated-anchor' );
        }    
    };

    $.fn.animatedanchor.defaults = {
       offset:114,
       delay:1000,
       easing:"linear",
    };

    $.fn.animatedanchor.options = {};

}(window.jQuery);

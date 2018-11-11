/*
 * Apperle | Responsive App Landing Page.
 * Author: perleTheme Template
 * Copyright: 2017;
 * This is a premium product available exclusively here : https://themeforest.net/user/perletheme
 */

(function ($) {
    "use strict";

    var $window = $(window);

    $(document).ready(function () {


        var $icon4 = $("#hamburger-menu"),
            $socialHamburger = $('#social-hamburger'),
            $buttonCollapse = $(".button-collapse"),
            header = $("#main-header"),
            height = header.outerHeight(),
            offset = height / 2,
            navColor = $("#nav-color"),
            range = 200,
            didScroll,
            lastScrollTop = 0,
            delta = 5,
            $mainNav = $("#main-nav"),
            $mainNavHeight = $mainNav.outerHeight(),
            ww = $window.width(),
            builderDesignMode = window.xMode,
            scrollTop;

        //Toggle Social Hamburger Icon on click
        $socialHamburger.on('click', function () {
            $(this).toggleClass('open')
        });

        /*----- Materialize JS Setup-----*/

        // SideNav Initialize
        $buttonCollapse.sideNav({
            draggable: true,
            closeOnClick: true,
            //Toggle the hamburger icon
            onOpen: function () {
                $icon4.addClass("open");
            },
            onClose: function () {
                $icon4.removeClass("open");
            }
        });

        // SideNav DropDown Initialize
        $(".dropdown-button").dropdown({
            belowOrigin: true,
            constrainWidth: false
        });

        // Header Slider Initialize
        $(".slider").slider();

        // Screenshots Carousel Initialize
        $(".carousel").carousel({
            dist: -70,
            fullWidth: false,
            shift: 0,
            padding: -100
        });

        //Auto Play the Carousel
        if(!builderDesignMode) {
            setInterval(function() {
                $(".carousel").carousel("next");
            }, 10000);
        }

        $("#screenshot-next").on("click", function () {
            $(".carousel").carousel("next");
        });
        $("#screenshot-prev").on("click", function () {
            $(".carousel").carousel("prev");
        });

        // FAQ Collapsible Initialize
        $(".collapsible").collapsible();



        /*----- Fade Header and NavColor on Scroll-----*/

        if ( !builderDesignMode ) {

            $window.on("scroll", function () {
                didScroll = true;
                scrollTop = $(this).scrollTop();
                if(scrollTop > 1000) {
                    navColor.css({ "opacity": 1});
                    return;
                }
                var calc = 1 - (offset - scrollTop + range) / range + 1;
                if(calc < 1) {
                    navColor.css({ "opacity": calc});
                } else {
                    navColor.css({ "opacity": 1});
                }
            });

            // Set nav bar opacity to 0 if on top of page
            if($(document).scrollTop() === 0) {
                navColor.css({ "opacity": 0});
            }

            //If in Design mode don't hide the nav bar
            setInterval(function() {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 200);
            /*----- Close SideNav when on resize width-----*/
            $window.on('resize', function(){
                if( ww != $window.width() ){
                    ww = $window.width();
                    $buttonCollapse.sideNav("hide");
                }
            });
        } else {
            //Stop Nav Dropdown from Closing
            $('.dropdown-button + .dropdown-content').on('click', function(event) {
                event.stopPropagation();
            });
            $('.side-nav a:not(.collapsible-header)').on('click', function(event) {
                event.stopPropagation();
            });
        }

        function hasScrolled() {
            if(Math.abs(lastScrollTop - scrollTop) <= delta) {
                return;
            }
            if (scrollTop > lastScrollTop && scrollTop > $mainNavHeight){
                $mainNav.removeClass("nav-down").addClass("nav-up");
            } else {
                if(scrollTop + $(window).height() < $(document).height()) {
                    $mainNav.removeClass("nav-up").addClass("nav-down");
                }
            }
            lastScrollTop = scrollTop;
        }



        /*----- Scroll It Setup-----*/

        $('a[href*="#"]')
            .not('[href="#"]')
            .not('[href="#0"]')
            .not('[href="#modal1"]')
            .click(function(event) {
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                    &&
                    location.hostname == this.hostname
                ) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000, function() {
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) {
                                return false;
                            } else {
                                $target.attr('tabindex','-1');
                                $target.focus();
                            };
                        });
                    }
                }
            });


        /*----- Owl Carousal Setup-----*/

        // Initialize Header Carousel
        $(".owl-header").owlCarousel({
            mouseDrag: !builderDesignMode,
            loop: true,
            responsiveClass: true,
            items: 1,
            nav: false,
            dots: true,
            autoplay: true,
            margin: 30,
            animateOut: "bounceOutRight",
            animateIn: "bounceInLeft"
        });

        // Features Owl Carousal initialize
        var $owlFeatures = $(".owl-features"),
            $featureLinks = $(".feature-link");

        function highLightFeature($singleFeatureLink) {
            $featureLinks.removeClass("active");
            $singleFeatureLink.addClass("active");
        }

        // Initialize Features Carousel
        $owlFeatures.owlCarousel({
            mouseDrag: !builderDesignMode,
            loop: true,
            responsiveClass: true,
            margin: 20,
            autoplay: true,
            items: 1,
            nav: false,
            dots: false,
            animateOut: "slideOutDown",
            animateIn: "fadeInUp"
        });

        //Highlight the current link when owl changes
        $owlFeatures.on("changed.owl.carousel", function(event) {
            //Fix the current link
            var current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
            var allItems = event.item.count;
            if (current > allItems || current == 0) {
                current = allItems - (current % allItems);
            }
            current--;
            var $featureLink = $(".feature-link:nth("+ current + ")");
            highLightFeature($featureLink);
        });

        //Highlight the current link when feature clicked
        $featureLinks.on("click", function () {
            var $item = $(this).data("owl-item");
            $owlFeatures.trigger("to.owl.carousel", $item);
            highLightFeature($(this));
        });

        // Testimonials Owl Carousal
        $(".owl-testimonials").owlCarousel({
            mouseDrag: !builderDesignMode,
            loop: true,
            responsiveClass: true,
            dots: true,
            items:1
        });

        // News and team Owl Carousal
        $(".owl-news, .owl-teams").owlCarousel({
            mouseDrag: !builderDesignMode,
            loop: true,
            responsiveClass: true,
            dots: true,
            margin: 20,
            nav: false,
            stagePadding: 10,
            responsive:{
                0: {
                    items:1,
                    margin: 300
                },
                500: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });


        /*----- AOS Setup-----*/

        if(!builderDesignMode) {
            AOS.init({
                disable: "mobile",
                once: true,
                duration: 600,
            });
        } else {
            AOS.init({
                disable: true
            });
        }


        /*----- Counter Up Setup fot statistics section-----*/

        $(".counter").counterUp({
            delay: 10,
            time: 1000
        });


        /*----- Color Switcher Setup-----*/

        function colorSwitcher (){

            var div = $("#colors-switcher");

            $("#fa-cog").on('click', function(e){
                e.preventDefault();
                div.toggleClass("active");
            });

            $(".colors li a").on("click", function(e){
                e.preventDefault();
                var styleSheet = "./css/color/" + $(this).data("class");
                $("#colors").attr("href", styleSheet);
                $(this).parent().parent().find("a").removeClass("active");
                $(this).addClass("active");
                $.get(styleSheet).done(function (response) {
                    $('<style />').text(response).appendTo($('head'));
                })
            });
        }

        colorSwitcher();


        /*----- Footer Style for IE or Edge -----*/

        function disableCssOnEdge(){
            var sAgent = window.navigator.userAgent;
            var Idx = sAgent.indexOf("MSIE");

            // If IE, return version number.
            if (Idx > 0
                || !!navigator.userAgent.match(/Trident\/7\./)
                || window.navigator.userAgent.indexOf("Edge") > -1) {
                $('#edxFooter').css({
                    top: 0,
                    marginBottom: 0
                });
                $('.google-map-container').css('height', '400px')
            }
        }
        disableCssOnEdge();

        /*----- Same Height Plugin Setup-----*/

        $(".same-height").matchHeight({
            property: "min-height",
            byRow: false
        });


        /**
         * Google map function for getting latitude and longitude
         */
        function getLatLngObject(str, marker, map, callback) {
            var coordinates = {};
            try {
                coordinates = JSON.parse(str);
                callback(new google.maps.LatLng(
                    coordinates.lat,
                    coordinates.lng
                ), marker, map)
            } catch (e) {
                map.geocoder.geocode({'address': str}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();

                        callback(new google.maps.LatLng(
                            parseFloat(latitude),
                            parseFloat(longitude)
                        ), marker, map)
                    }
                })
            }
        }
        var maps = $(".google-map-container");
        if (maps.length) {
            $.getScript("//maps.google.com/maps/api/js?key=AIzaSyAwH60q5rWrS8bXwpkZwZwhw9Bw0pqKTZM&sensor=false&libraries=geometry,places&v=3.7", function () {
                var head = document.getElementsByTagName('head')[0],
                    insertBefore = head.insertBefore;

                head.insertBefore = function (newElement, referenceElement) {
                    if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
                        return;
                    }
                    insertBefore.call(head, newElement, referenceElement);
                };
                var geocoder = new google.maps.Geocoder;
                for (var i = 0; i < maps.length; i++) {
                    var zoom = parseInt(maps[i].getAttribute("data-zoom"), 10) || 11;
                    var styles = maps[i].hasAttribute('data-styles') ? JSON.parse(maps[i].getAttribute("data-styles")) : [];
                    var center = maps[i].getAttribute("data-center") || "New York";

                    // Initialize map
                    var map = new google.maps.Map(maps[i].querySelectorAll(".google-map")[0], {
                        zoom: zoom,
                        styles: styles,
                        scrollwheel: false,
                        center: {lat: 0, lng: 0}
                    });
                    // Add map object to map node
                    maps[i].map = map;
                    maps[i].geocoder = geocoder;
                    maps[i].google = google;

                    // Get Center coordinates from attribute
                    getLatLngObject(center, null, maps[i], function (location, markerElement, mapElement) {
                        mapElement.map.setCenter(location);
                    })

                    // Add markers from google-map-markers array
                    var markerItems = maps[i].querySelectorAll(".google-map-markers li");

                    if (markerItems.length) {
                        var markers = [];
                        for (var j = 0; j < markerItems.length; j++) {
                            var markerElement = markerItems[j];
                            getLatLngObject(markerElement.getAttribute("data-location"), markerElement, maps[i], function (location, markerElement, mapElement) {
                                var icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
                                var activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
                                var info = markerElement.getAttribute("data-description") || "";
                                var infoWindow = new google.maps.InfoWindow({
                                    content: info
                                });
                                markerElement.infoWindow = infoWindow;
                                var markerData = {
                                    position: location,
                                    map: mapElement.map
                                }
                                if (icon) {
                                    markerData.icon = icon;
                                }
                                var marker = new google.maps.Marker(markerData);
                                markerElement.gmarker = marker;
                                markers.push({markerElement: markerElement, infoWindow: infoWindow});
                                marker.isActive = false;
                                // Handle infoWindow close click
                                google.maps.event.addListener(infoWindow, 'closeclick', (function (markerElement, mapElement) {
                                    var markerIcon = null;
                                    markerElement.gmarker.isActive = false;
                                    markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
                                    markerElement.gmarker.setIcon(markerIcon);
                                }).bind(this, markerElement, mapElement));


                                // Set marker active on Click and open infoWindow
                                google.maps.event.addListener(marker, 'click', (function (markerElement, mapElement) {
                                    if (markerElement.infoWindow.getContent().length === 0) return;
                                    var gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
                                    for (var k = 0; k < markers.length; k++) {
                                        var markerIcon;
                                        if (markers[k].markerElement === markerElement) {
                                            currentInfoWindow = markers[k].infoWindow;
                                        }
                                        gMarker = markers[k].markerElement.gmarker;
                                        if (gMarker.isActive && markers[k].markerElement !== markerElement) {
                                            gMarker.isActive = false;
                                            markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")
                                            gMarker.setIcon(markerIcon);
                                            markers[k].infoWindow.close();
                                        }
                                    }

                                    currentMarker.isActive = !currentMarker.isActive;
                                    if (currentMarker.isActive) {
                                        if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")) {
                                            currentMarker.setIcon(markerIcon);
                                        }

                                        currentInfoWindow.open(map, marker);
                                    } else {
                                        if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")) {
                                            currentMarker.setIcon(markerIcon);
                                        }
                                        currentInfoWindow.close();
                                    }
                                }).bind(this, markerElement, mapElement))
                            })
                        }
                    }
                }
            });
        }


        /**
         * Contact Form
         */

        var contactButton = $("#contact-submit");
        contactButton.on('click', function(e) {
            if(!builderDesignMode) {
                e.preventDefault();

                // Get input field values of the contact form
                var contactFormInputs = $('#contact-form :input'),
                    contactChecking   = $('#contact-check-spam').val(),
                    contactName       = $('#contact-name').val(),
                    contactEmail      = $('#contact-email').val(),
                    contactMessage    = $('#contact-message').val(),
                    contactAlertMessage = $('#contact-alert-message');

                // Disable Inputs and display a loading message
                contactAlertMessage.html('<p><i class="fa fa-spinner fa-spin"></i> Sending Message..</p>');
                contactFormInputs.prop("disabled", true);

                // Data to be sent to server
                var post_data = {
                    'form': 'contactForm',
                    'contactSpamChecking':contactChecking,
                    'contactName':contactName,
                    'contactEmail':contactEmail,
                    'contactMessage':contactMessage
                };

                // Ajax post data to server
                $.post('./index.php', post_data, function(response){


                    // Load jsn data from server and output message
                    if(response.type == 'error') {

                        contactAlertMessage.html('<p><i class="fa fa-times-circle"></i> ' + response.text + '</p>');
                        contactFormInputs.prop("disabled", false);

                    } else {

                        contactAlertMessage.html('<p><i class="fa fa-check-circle-o"></i> ' + response.text + '</p>');

                        // After, all the fields are reset and enabled
                        contactFormInputs.prop("disabled", false);
                        $('#contact-name').val('');
                        $('#contact-email').val('');
                        $('#contact-message').val('');

                    }

                }, 'json');
            } else {
                e.preventDefault();
                e.stopPropagation();
            }

        });

        /**
         * MailChimp
         */
        var mailchimp =  $('.mailchimp-mailform');
        if (mailchimp.length) {
            for (var i = 0; i < mailchimp.length; i++) {
                var $mailchimpItem = $(mailchimp[i]),
                    $email = $mailchimpItem.find('input[type="email"]');

                // Required by MailChimp
                $mailchimpItem.attr('novalidate', 'true');
                $email.attr('name', 'EMAIL');

                $mailchimpItem.on('submit', $.proxy( function ( $email, event ) {
                    event.preventDefault();

                    var $this = this;

                    var data = {},
                        url = $this.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
                        dataArray = $this.serializeArray(),
                        $output = $("#" + $this.attr("data-form-output"));

                    for (i = 0; i < dataArray.length; i++) {
                        data[dataArray[i].name] = dataArray[i].value;
                    }

                    $.ajax({
                        data: data,
                        url: url,
                        dataType: 'jsonp',
                        error: function (resp, text) {
                            $output.html('Server error: ' + text);

                            setTimeout(function () {
                                $output.removeClass("active");
                            }, 4000);
                        },
                        success: function (resp) {
                            $output.html(resp.msg).addClass('active');
                            $email[0].value = '';
                            var $label = $('[for="'+ $email.attr( 'id' ) +'"]');
                            if ( $label.length ) $label.removeClass( 'focus not-empty' );

                            setTimeout(function () {
                                $output.removeClass("active");
                            }, 6000);
                        },
                        beforeSend: function (data) {
                            var isNoviBuilder = window.xMode;

                            var isValidated = (function () {
                                var results, errors = 0;
                                var elements = $this.find('[data-constraints]');
                                var captcha = null;
                                if (elements.length) {
                                    for (var j = 0; j < elements.length; j++) {

                                        var $input = $(elements[j]);
                                        if ((results = $input.regula('validate')).length) {
                                            for (var k = 0; k < results.length; k++) {
                                                errors++;
                                                $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                                            }
                                        } else {
                                            $input.siblings(".form-validation").text("").parent().removeClass("has-error")
                                        }
                                    }

                                    if (captcha) {
                                        if (captcha.length) {
                                            return validateReCaptcha(captcha) && errors === 0
                                        }
                                    }

                                    return errors === 0;
                                }
                                return true;
                            })();

                            // Stop request if builder or inputs are invalide
                            if (isNoviBuilder || !isValidated)
                                return false;

                            $output.html('Submitting...').addClass('active');
                        }
                    });

                    return false;
                }, $mailchimpItem, $email ));
            }
        }

        /**
         * CountDown
         */
        var countDown = $('.countdown')
        if (countDown.length) {
            var i;
            for (i = 0; i < countDown.length; i++) {
                var $countDownItem = $(countDown[i]),
                    d = new Date(),
                    type = $countDownItem.attr('data-type'),
                    time = $countDownItem.attr('data-time'),
                    format = $countDownItem.attr('data-format'),
                    settings = [];

                d.setTime(Date.parse(time)).toLocaleString();
                settings[type] = d;
                settings['format'] = format;
                $countDownItem.countdown(settings);
            }
        }

        /**
         * Animated Background
         */
        /*----- Parallax Background Setup -----*/
        var scene = document.getElementById('scene');
        if(scene) {
            var parallax = new Parallax(scene, {
                pointerEvents: true
            });
        }

        /**
         *  Particles JS Config
         */
        var $particles = $('#particles-js');
        if($particles.length) {

            particlesJS("particles-js", {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 4,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "window",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": false
            });

        }

        /**
         *  Instafeed JS Config
         */
        var $instafeed = $('.instafeed')
        if ($instafeed.length > 0) {
            var i;
            for (i = 0; i < $instafeed.length; i++) {
                var instafeedItem = $($instafeed[i]);
                instafeedItem.RDInstafeed({
                    accessToken: '5526956400.ba4c844.c832b2a554764bc8a1c66c39e99687d7',
                    clientId: ' c832b2a554764bc8a1c66c39e99687d7',
                    userId: '5526956400',
                    showLog: false
                });
            }
        }


    });

})(jQuery);

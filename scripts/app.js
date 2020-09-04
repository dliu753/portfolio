// Vanilla JS to for splash screen to fade in main page contents
const splash = document.querySelector('.splash');
const initTime = 3500;
document.addEventListener('DOMContentLoaded', (e)=>{
    // Fade out splash screen
    setTimeout(()=>{
        splash.classList.add('display-none');
    }, initTime);

    // Staggered fading in of home page
    const navbar = document.querySelector('.topnav');
    const navChildren = navbar.children;
    const center = document.querySelector('.center');
    const centerChildren = center.children;
    const logoIcon = document.querySelector('.logoicon');

    setTimeout(()=>{
        for(var i = 0; i < navChildren.length+1; i++) {
            // fade in iconlogo at last iteration
            if (i == navChildren.length) {
                logoIcon.classList.add('fade-in-nav');
                logoIcon.style.animationDelay = i*0.15 + 's';
            }
            else if (navChildren[i].className === 'menu') {
                navChildren[i].style.opacity = 1;
            } else {
                navChildren[i].classList.add('fade-in-nav');
                navChildren[i].style.animationDelay = i*0.15 + 's';
                // console.log(navChildren[i]);
            }

        }
    }, initTime+1500);

    setTimeout(()=>{
        for(var i = 0; i < centerChildren.length; i++) {
            centerChildren[i].classList.add('fade-in');
            centerChildren[i].style.animationDelay = i*0.2 + 's';
            // console.log(centerChildren[i]);
        } 
    },initTime+2000);
});

// jquery stuff

// fix contact button
$('#contactbtn').css({'opacity':'1'});

// TODO: smooth menu button
// TODO: show logo with menu button

// fade in elements in view
var $fading_elements = $('.hidden');
var $window = $(window);
const fadeTime = 900;

$window.on('scroll', check_if_in_view);
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

// top nav bar buttons will scroll to page
$('#ahome').click(function(e){
    e.preventDefault();
    $('html').animate({scrollTop: $('html').offset().top}, fadeTime);
    // alert($("html").scrollTop() + " px");
});

$('#aabout').click(function(e){
    e.preventDefault();
    $('html').animate({scrollTop: $('#about').offset().top - 200}, fadeTime);
});

$('#aprojects').click(function(e){
    e.preventDefault();
    $('html').animate({scrollTop: $('#projects').offset().top - 200}, fadeTime);
});

$('#acontact').click(function(e){
    e.preventDefault();
    $('html').animate({scrollTop: $('#contact').offset().top - 200}, fadeTime);
});

$('#aicon').click(function(e){
    e.preventDefault();
    window.location.reload();
});

// responsive navbar
$('.menu').click(function(e){
    e.preventDefault();
    shrinkNav();
});

// footer icons
$('.ficon').mouseover(function(){
    $(this).animate({opacity:0.5, height: '+=10px', width: '+=10px'
        }, 200, function() {
    });
});

$('.ficon').mouseleave(function(){
    $(this).animate({opacity:1, height: '-=10px', width: '-=10px'
        }, 200, function() {
    });
});

// responsive navbar function
function shrinkNav() {
    var nav = document.querySelector('#TopNav');
    // console.log(nav.children);
    const navChildren = nav.children;

    if (nav.className === 'topnav') {
        nav.className += ' responsive';
        nav.style.opacity = 1;
        // console.log('shrinkNav: check if');
    } else {
        nav.className = 'topnav';
        // console.log('shrinkNav: check else');
    }
}

// check to see if content is in view window
function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($fading_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            $element.addClass('fade-in');
            } else {
                $element.removeClass('fade-in');
            }
    });
}

// Debugging

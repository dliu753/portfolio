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

// fade in elements in view
var $fading_elements = $('.hidden');
var $window = $(window);

$window.on('scroll', check_if_in_view);
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

// responsive navbar
var navStatus = true;
$('.menu').click(function(e){
    e.preventDefault();
    if (navStatus == true) {
        openNav();
    }
    else if (navStatus == false) {
        closeNav();
    }
    else {
        console.log("ERROR: click menu missed all conditions.")
    }
});

// top nav bar buttons will scroll to page
const scrollTime = 900;
$('#ahome').click(function(e){
    e.preventDefault();
    $('html').animate({scrollTop: $('html').offset().top}, scrollTime);
    // alert($("html").scrollTop() + " px");
    if (navStatus==false) {
        closeNav();
    }
});

$('#aabout').click(function(e){
    e.preventDefault();
    $('html').animate({scrollTop: $('#about').offset().top - 200}, scrollTime);
    if (navStatus==false) {
        closeNav();
    }
});

$('#aprojects').click(function(e){
    e.preventDefault();
    $('html').animate({scrollTop: $('#projects').offset().top - 200}, scrollTime);
    if (navStatus==false) {
        closeNav();
    }
});

$('#acontact').click(function(e){
    e.preventDefault();
    $('html').animate({scrollTop: $('#contact').offset().top - 200}, scrollTime);
    if (navStatus==false) {
        closeNav();
    }
});

$('#aicon').click(function(e){
    e.preventDefault();
    window.location.reload();
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

// Slideshow
var slideIndex = 1;
goToSlides(slideIndex);

$('.nextBtn').click(function(e) {
    e.preventDefault();
    nextSlide(1);
});

$('.prevBtn').click(function(e) {
    e.preventDefault();
    nextSlide(-1);
});

// responsive navbar function
function openNav() {
    $('.logoicon').css("display","none");
    $('.topnav').animate({
        height: "+=350px",
    }, 500);
    $('.icon').animate({
        opacity: "0",
    }, 500);
    setTimeout(function(){
        $('.icon').attr({style: "content:url(../assets/menu_close.png)"});
        $('.icon').animate({
            opacity: "1",
        }, 500);
    },500);
    shrinkNav();
    navStatus = false;
}

function closeNav() {
    $('.topnav').animate({
        height: "-=350px",
    }, 500);
    $('.icon').animate({
        opacity: "0",
    }, 500);
    setTimeout(function(){
        $('.icon').attr({style: "content:url(../assets/menu.png)"});
        $('.icon').animate({
            opacity: "1",
        }, 500);
    },500);
    setTimeout(function(){
        shrinkNav();
    },500);
    $('.logoicon').css("display","block");
    navStatus = true;
}

function shrinkNav() {
    var nav = document.querySelector('#TopNav');
    // console.log(nav.children);
    const navChildren = nav.children
    if (nav.className === 'topnav') {
        nav.className += ' responsive';
    } else {
        nav.className = 'topnav';
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

function nextSlide(n) {
    goToSlides(slideIndex += n);
}

// slideshow functions
function goToSlides(n) {
    var slidesArr = document.getElementsByClassName("slideshow");
    var dotArr = document.getElementsByClassName("dot");
    if(n > slidesArr.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slidesArr.length; }
    if(slidesArr.length != dotArr.length) {
        console.log("Slideshow lengths do not match!");
    }
    for (i=0; i<slidesArr.length; i++) {
        if(slidesArr[i].classList.contains('imageAfter')) {
            slidesArr[i].classList.replace('imageAfter', 'imageBefore');
            dotArr[i].style.backgroundColor = "white";
        }
    }
    dotArr[slideIndex-1].style.backgroundColor = "#EEA13B";
    slidesArr[slideIndex-1].className += " imageAfter";
}

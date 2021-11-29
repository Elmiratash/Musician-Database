var main = document.querySelector('.main');
var nav = document.querySelector('.nav');
var window = document.querySelector('.window');


window.onscroll = function() {

    if (window.pageYOffset > (main.offsetHeight - nav.offsetHeight)) {
        nav.classList.remove('bottom-nav');
        nav.classList.add('top-nav');
    } else {
        nav.classList.add('bottom-nav');
        nav.classList.remove('top-nav');

    }
}

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

$(document).ready(function() {
    let scrolling = false;

    $("a").on('click', function(event) {
        if (scrolling) return;
        scrolling = true;

        if (this.hash !== "") {

            event.preventDefault();


            var hash = this.hash;


            if (!$(hash).offset()) return;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 300
            }, 800, function() {
                scrolling = false;

                window.location.hash = hash - 300;
            });
        }
    });
});
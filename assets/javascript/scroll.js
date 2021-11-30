$(document).ready(function () {
            let scrolling = false;
            // Add smooth scrolling to all links
            $("a").on('click', function (event) {
                if (scrolling) return;
                scrolling = true;
                // Make sure this.hash has a value before overriding default behavior
                if (this.hash !== "") {
                    // Prevent default anchor click behavior
                    event.preventDefault();


                    // Store hash
                    var hash = this.hash;

                    // Using jQuery's animate() method to add smooth page scroll
                    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area

                    if (!$(hash).offset()) return;
                    setTimeout(() => {
                        $('html, body').animate({
                            scrollTop: $(hash).offset().top - 300
                        }, 800, function () {
                            scrolling = false;
                            // Add hash (#) to URL when done scrolling (default click behavior)
                            window.location.hash = hash - 300;
                        });
                    }, 1000);
                }
            });
        });
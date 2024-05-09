document.addEventListener("DOMContentLoaded", function() {
    var header = document.getElementById("header");

    function fadeInHeader() {
        var headerTop = header.getBoundingClientRect().top;
        var windowHeight = window.innerHeight;

        if (headerTop < windowHeight) {
            header.classList.add("fade-in");
        }
    }

    window.addEventListener("scroll", fadeInHeader);
    fadeInHeader();
});

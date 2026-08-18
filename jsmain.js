const carousels = document.querySelectorAll(
    ".finance-carousel, .infra-carousel"
);

carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll(".carousel-image");
    const dots = carousel.querySelectorAll(".carousel-dot");

    const prevButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");

    let currentSlide = 0;

    function showSlide(index) {
        images.forEach((image) => {
            image.classList.remove("active");
        });

        dots.forEach((dot) => {
            dot.classList.remove("active");
        });

        images[index].classList.add("active");

        if (dots[index]) {
            dots[index].classList.add("active");
        }

        currentSlide = index;
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            let nextSlide = currentSlide + 1;

            if (nextSlide >= images.length) {
                nextSlide = 0;
            }

            showSlide(nextSlide);
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            let previousSlide = currentSlide - 1;

            if (previousSlide < 0) {
                previousSlide = images.length - 1;
            }

            showSlide(previousSlide);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
        });
    });

    showSlide(0);
});
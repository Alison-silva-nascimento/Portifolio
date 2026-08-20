document.querySelectorAll(".carousel").forEach((carousel) => {
    const images = Array.from(carousel.querySelectorAll(".carousel-image"));
    const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
    const prevButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");

    if (images.length === 0) {
        carousel.classList.add("is-static");
        return;
    }

    let currentSlide = Math.max(0, images.findIndex((image) => image.classList.contains("active")));

    const showSlide = (index) => {
        const normalizedIndex = (index + images.length) % images.length;

        images.forEach((image, imageIndex) => {
            const isActive = imageIndex === normalizedIndex;
            image.classList.toggle("active", isActive);
            image.setAttribute("aria-hidden", String(!isActive));
        });

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === normalizedIndex;
            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });

        currentSlide = normalizedIndex;
    };

    if (images.length === 1) {
        carousel.classList.add("is-static");
    }

    nextButton?.addEventListener("click", () => showSlide(currentSlide + 1));
    prevButton?.addEventListener("click", () => showSlide(currentSlide - 1));

    dots.slice(0, images.length).forEach((dot, index) => {
        dot.addEventListener("click", () => showSlide(index));
    });

    dots.slice(images.length).forEach((dot) => {
        dot.hidden = true;
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
        if (event.key === "ArrowRight") showSlide(currentSlide + 1);
    });

    showSlide(currentSlide);
});

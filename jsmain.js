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

const heroShowcase = document.querySelector("[data-hero-showcase]");

if (heroShowcase) {
    const slides = Array.from(heroShowcase.querySelectorAll(".hero-showcase-slide"));
    const dots = Array.from(heroShowcase.querySelectorAll(".hero-showcase-dots button"));
    const previousButton = heroShowcase.querySelector(".hero-showcase-prev");
    const nextButton = heroShowcase.querySelector(".hero-showcase-next");
    const role = document.querySelector(".hero-rotating-role");
    const roles = [
        "Desenvolvedor de Software.",
        "Especialista em Automação.",
        "Analista de Sistemas e Infraestrutura."
    ];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let rotationTimer;

    const render = (index) => {
        const next = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const active = slideIndex === next;
            slide.classList.toggle("active", active);
            slide.setAttribute("aria-hidden", String(!active));
            slide.tabIndex = active ? 0 : -1;
        });

        dots.forEach((dot, dotIndex) => {
            const active = dotIndex === next;
            dot.classList.toggle("active", active);
            dot.setAttribute("aria-current", String(active));
        });

        if (role && role.textContent !== roles[next]) {
            role.classList.add("is-changing");
            window.setTimeout(() => {
                role.textContent = roles[next];
                role.classList.remove("is-changing");
            }, reduceMotion ? 0 : 180);
        }

        current = next;
    };

    const stopRotation = () => window.clearInterval(rotationTimer);
    const startRotation = () => {
        stopRotation();
        if (!reduceMotion) rotationTimer = window.setInterval(() => render(current + 1), 4200);
    };

    previousButton?.addEventListener("click", () => {
        render(current - 1);
        startRotation();
    });

    nextButton?.addEventListener("click", () => {
        render(current + 1);
        startRotation();
    });

    dots.forEach((dot, index) => dot.addEventListener("click", () => {
        render(index);
        startRotation();
    }));

    heroShowcase.addEventListener("mouseenter", stopRotation);
    heroShowcase.addEventListener("mouseleave", startRotation);
    heroShowcase.addEventListener("focusin", stopRotation);
    heroShowcase.addEventListener("focusout", startRotation);

    render(0);
    startRotation();
}

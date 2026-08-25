const carousel = document.querySelector("[data-hero-carousel]");
const role = document.querySelector("#rotating-role");

if (carousel) {
    const slides = [...carousel.querySelectorAll(".showcase-card")];
    const dots = [...carousel.querySelectorAll(".carousel-dots button")];
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let timer;

    const show = (index) => {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            const active = i === current;
            slide.classList.toggle("active", active);
            slide.setAttribute("aria-hidden", String(!active));
            slide.tabIndex = active ? 0 : -1;
        });
        dots.forEach((dot, i) => {
            const active = i === current;
            dot.classList.toggle("active", active);
            dot.setAttribute("aria-current", String(active));
        });
        if (role) role.textContent = slides[current].dataset.role;
    };

    const stop = () => clearInterval(timer);
    const start = () => {
        stop();
        if (!reduceMotion) timer = setInterval(() => show(current + 1), 4200);
    };

    carousel.querySelector(".carousel-prev")?.addEventListener("click", () => { show(current - 1); start(); });
    carousel.querySelector(".carousel-next")?.addEventListener("click", () => { show(current + 1); start(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); start(); }));
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);
    show(0);
    start();
}

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-list a")];
const revealItems = [...document.querySelectorAll(".reveal")];

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
}, { rootMargin: "-35% 0px -60%", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

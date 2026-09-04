document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
        const dropdownLink = dropdown.querySelector(":scope > a");
        if (!dropdownLink) return;

        dropdownLink.addEventListener("click", event => {
            if (window.innerWidth <= 700) {
                event.preventDefault();
                dropdown.classList.toggle("mobile-open");
            }
        });
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            if (!link.closest(".nav-dropdown") || window.innerWidth > 700) {
                navLinks.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.querySelectorAll(".nav-dropdown.mobile-open")
                .forEach(dropdown => dropdown.classList.remove("mobile-open"));
        }
    });
});

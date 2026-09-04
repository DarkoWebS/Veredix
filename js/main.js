document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".nav-dropdown");

    if (!menuToggle || !navLinks) return;

    // Otvaranje glavnog mobilnog menija
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));

        // Ako se glavni meni zatvara, zatvori i sve dropdown menije
        if (!isOpen) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove("mobile-open");
            });
        }
    });

    // Dropdown meniji
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector(":scope > a");

        if (!dropdownLink) return;

        dropdownLink.addEventListener("click", event => {
            if (window.innerWidth <= 700) {
                event.preventDefault();

                const wasOpen = dropdown.classList.contains("mobile-open");

                // Zatvori sve ostale dropdown menije
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove("mobile-open");
                    }
                });

                // Otvori/zatvori trenutno kliknuti dropdown
                dropdown.classList.toggle("mobile-open", !wasOpen);
            }
        });
    });

    // Klik na običan link zatvara mobilni meni
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            if (!link.closest(".nav-dropdown") || window.innerWidth > 700) {
                navLinks.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");

                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove("mobile-open");
                });
            }
        });
    });

    // Ako se ekran prebaci sa mobilnog na desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");

            dropdowns.forEach(dropdown => {
                dropdown.classList.remove("mobile-open");
            });
        }
    });
});

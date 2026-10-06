/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =========================
   CLOSE MOBILE MENU
========================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (!navLinks || !menuBtn) return;

        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("main section");

const navItems = document.querySelectorAll(
    ".nav-links a[href^='#']"
);


function updateActiveNavigation() {

    let current = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navItems.forEach(item => {

        item.classList.remove("active");

        if (item.getAttribute("href") === `#${current}`) {

            item.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================
   BACK TO TOP
========================= */

const topBtn = document.getElementById("topBtn");


if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });


    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =========================
   CONTACT FORM
   FORMSPREE
========================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");

const submitBtn =
    document.getElementById("submitBtn");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const action =
                contactForm.getAttribute("action");


            /* Check Formspree ID */

            if (
                !action ||
                action.includes("YOUR_FORM_ID")
            ) {

                formStatus.textContent =
                    "Please connect the contact form to Formspree first.";

                formStatus.className =
                    "form-status error";

                return;

            }


            /* Disable button while sending */

            if (submitBtn) {

                submitBtn.disabled = true;

                submitBtn.innerHTML =
                    'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

            }


            formStatus.textContent = "";

            formStatus.className =
                "form-status";


            try {

                const response =
                    await fetch(action, {

                        method: "POST",

                        body:
                            new FormData(contactForm),

                        headers: {

                            "Accept":
                                "application/json"

                        }

                    });


                /* =========================
                   SUCCESS
                ========================= */

                if (response.ok) {

                    contactForm.reset();

                    formStatus.textContent =
                        "Message sent successfully. Thank you!";

                    formStatus.className =
                        "form-status success";

                }


                /* =========================
                   ERROR FROM FORMSPREE
                ========================= */

                else {

                    let message =
                        "Something went wrong. Please try again.";


                    try {

                        const data =
                            await response.json();


                        if (
                            data.errors &&
                            data.errors.length > 0
                        ) {

                            message =
                                data.errors
                                    .map(error => error.message)
                                    .join(", ");

                        }

                    } catch (error) {

                        // Use default error message

                    }


                    formStatus.textContent =
                        message;

                    formStatus.className =
                        "form-status error";

                }

            }


            /* =========================
               CONNECTION ERROR
            ========================= */

            catch (error) {

                formStatus.textContent =
                    "Unable to send the message. Please try again.";

                formStatus.className =
                    "form-status error";

            }


            /* =========================
               ENABLE BUTTON AGAIN
            ========================= */

            finally {

                if (submitBtn) {

                    submitBtn.disabled = false;

                    submitBtn.innerHTML =
                        'Send Message <i class="fa-solid fa-paper-plane"></i>';

                }

            }

        }
    );

}

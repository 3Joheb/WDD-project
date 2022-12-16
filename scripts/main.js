//Written by Zoheb
//Mobile navbar
navSlide();
function navSlide() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".menu-area");
    const navLinks = document.querySelectorAll(".menu-area li");
    
    burger.addEventListener("click", () => {
        
        //Toggle Nav
        nav.classList.toggle("nav-active");

        //Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            };
        });
        //Animate burger
        burger.classList.toggle("tapped");
    });
};

//Darken navbar
navDarken()
function navDarken() {
    const headerHeight = document.querySelector("header").getBoundingClientRect().height;
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar.getBoundingClientRect().height;
    const darkCheck = () => {
        if (this.scrollY > headerHeight-navbarHeight) {
            navbar.style.backgroundColor = "rgba(0, 20, 45, 1)"
        } else if (this.screenY < headerHeight-navbarHeight) {
            navbar.style.backgroundColor = ""
        };
    }
    darkCheck();
    window.addEventListener("scroll", (e) => {
        darkCheck();
    });
};
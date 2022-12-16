//Written by Zoheb
//gallery code
cardSpan();
function cardSpan() {
    const cards = document.querySelectorAll(".tips .projects figure");
    const cardsOverlay = document.querySelectorAll(".tips .projects .gallery-content");
    cards.forEach((card, i) => {
        card.addEventListener("click", () => {
            const isCardActive = card.classList.contains("active");
            cards.forEach((otherCard, j) => {
                otherCard.classList.remove("active");
                otherCard.classList.remove("inactive");
                cardsOverlay[j].style.visibility = "hidden";
                cardsOverlay[j].animate({
                    scale: [1, 0.99, 1]
                }, { duration: 250, easing: "ease-out" })
                if (!isCardActive && i !== j) otherCard.classList.add("inactive");
            });
            if (!isCardActive) {
                card.classList.add("active");
                cardsOverlay[i].style.visibility = "visible";
            };
        });
    });
};
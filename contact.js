"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // CONTACT - BUSINESS CARD IMAGE VIEWER
    // ========================================

    const imageModal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalClose = document.getElementById("modalClose");
    const businessCards = document.querySelectorAll(".business-card-item");

    if (!imageModal || !modalImage || !modalClose) {
        console.error("CONTACT: 이미지 뷰어 요소를 찾을 수 없습니다.");
        return;
    }

    let lastFocusedElement = null;
    let previousOverflow = "";

    // ========================================
    // INITIAL MODAL SETTINGS
    // ========================================

    Object.assign(imageModal.style, {
        display: "none",
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.92)",
        zIndex: "99999",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        boxSizing: "border-box",
        overflow: "auto"
    });

    Object.assign(modalImage.style, {
        display: "block",
        width: "auto",
        height: "auto",
        maxWidth: "95%",
        maxHeight: "85vh",
        objectFit: "contain",
        borderRadius: "8px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)"
    });

    Object.assign(modalClose.style, {
        position: "fixed",
        top: "20px",
        right: "24px",
        zIndex: "100000",
        background: "transparent",
        border: "none",
        color: "#E6D1A3",
        fontSize: "40px",
        lineHeight: "1",
        cursor: "pointer",
        padding: "8px"
    });

    // ========================================
    // OPEN MODAL
    // ========================================

    /**
     * @param {string} imageSrc
     * @param {string} imageAlt
     */
    function openModal(imageSrc, imageAlt) {

        if (!imageSrc) {
            return;
        }

        lastFocusedElement = document.activeElement;
        previousOverflow = document.body.style.overflow;

        modalImage.src = imageSrc;
        modalImage.alt = imageAlt || "N.Jay 명함 확대 이미지";

        imageModal.classList.add("active");
        imageModal.setAttribute("aria-hidden", "false");

        imageModal.style.display = "flex";
        document.body.style.overflow = "hidden";

        modalClose.focus();
    }

    // ========================================
    // CLOSE MODAL
    // ========================================

    function closeModal() {

        if (imageModal.style.display === "none") {
            return;
        }

        imageModal.style.display = "none";
        imageModal.classList.remove("active");
        imageModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = previousOverflow;

        modalImage.removeAttribute("src");

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    // ========================================
    // BUSINESS CARD CLICK
    // ========================================

    businessCards.forEach(function (card) {

        card.addEventListener("click", function (event) {

            event.preventDefault();

            const imageSrc = card.getAttribute("data-image");
            const imageElement = card.querySelector("img");

            const imageAlt = imageElement
                ? imageElement.alt
                : "N.Jay 명함 이미지";

            if (imageSrc) {
                openModal(imageSrc, imageAlt);
            }
        });
    });

    // ========================================
    // CLOSE BUTTON
    // ========================================

    modalClose.addEventListener("click", function () {
        closeModal();
    });

    // ========================================
    // BACKGROUND CLICK
    // ========================================

    imageModal.addEventListener("click", function (event) {

        if (event.target === imageModal) {
            closeModal();
        }
    });

    // ========================================
    // ESC KEY
    // ========================================

    document.addEventListener("keydown", function (event) {

        if (imageModal.style.display !== "flex") {
            return;
        }

        if (event.key === "Escape") {
            closeModal();
        }

        if (event.key === "Tab") {
            event.preventDefault();
            modalClose.focus();
        }
    });

});

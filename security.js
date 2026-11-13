"use strict";

// ========================================
// N.Jay X AI - CONTENT PROTECTION
// Images / Videos Protection
// Document Downloads Allowed
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // SETTINGS
    // ========================================

    const protectedSelector = [
        "img",
        "video",
        "canvas",
        ".project-video",
        ".project-process",
        ".business-card-item",
        ".image-viewer",
        ".image-modal",
        ".video-player",
        ".video-modal"
    ].join(", ");

    const allowedDocuments = /\.(pdf|hwp|hwpx|doc|docx)(?:[?#]|$)/i;

    // ========================================
    // DOCUMENT CHECK
    // ========================================

    /**
     * @param {EventTarget | null} target
     * @returns {boolean}
     */
    function isDocumentLink(target) {

        if (!(target instanceof Element)) {
            return false;
        }

        const link = target.closest("a[href]");

        if (!link) {
            return false;
        }

        const href = link.getAttribute("href") || "";

        return allowedDocuments.test(href);
    }

    // ========================================
    // PREVENT IMAGE CONTEXT MENU
    // ========================================

    document.addEventListener("contextmenu", function (event) {

        if (isDocumentLink(event.target)) {
            return;
        }

        if (!(event.target instanceof Element)) {
            return;
        }

        if (event.target.closest(protectedSelector)) {
            event.preventDefault();
        }
    });

    // ========================================
    // PREVENT IMAGE DRAGGING
    // ========================================

    document.addEventListener("dragstart", function (event) {

        if (isDocumentLink(event.target)) {
            return;
        }

        if (!(event.target instanceof Element)) {
            return;
        }

        if (event.target.closest(protectedSelector)) {
            event.preventDefault();
        }
    });

    // ========================================
    // IMAGE PROTECTION
    // ========================================

    function protectImages() {

        document.querySelectorAll("img").forEach(function (image) {

            image.setAttribute("draggable", "false");

            image.style.webkitUserDrag = "none";
            image.style.webkitTouchCallout = "none";
            image.style.userSelect = "none";
        });
    }

    // ========================================
    // VIDEO PROTECTION
    // ========================================

    function protectVideos() {

        document.querySelectorAll("video").forEach(function (video) {

            video.setAttribute("controlsList", "nodownload");

            video.setAttribute("disablePictureInPicture", "");

            video.style.webkitTouchCallout = "none";
        });
    }

    // ========================================
    // YOUTUBE EMBED SETTINGS
    // ========================================

    function protectYouTubeFrames() {

        document.querySelectorAll("iframe").forEach(function (frame) {

            const source = frame.getAttribute("src") || "";

            if (!/youtube(?:-nocookie)?\.com\/embed\//i.test(source)) {
                return;
            }

            try {

                const url = new URL(source, document.baseURI);

                url.searchParams.set("modestbranding", "1");
                url.searchParams.set("rel", "0");

                const newSource = url.toString();

                if (frame.src !== newSource) {
                    frame.src = newSource;
                }

            } catch (error) {
                console.warn("YouTube iframe 설정을 확인할 수 없습니다.", error);
            }
        });
    }

    // ========================================
    // INITIALIZE PROTECTION
    // ========================================

    protectImages();
    protectVideos();
    protectYouTubeFrames();

    // ========================================
    // MONITOR DYNAMIC CONTENT
    // ========================================

    const observer = new MutationObserver(function (mutations) {

        let shouldRefresh = false;

        mutations.forEach(function (mutation) {

            if (mutation.addedNodes.length > 0) {
                shouldRefresh = true;
            }
        });

        if (shouldRefresh) {
            protectImages();
            protectVideos();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

});

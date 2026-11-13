document.addEventListener("DOMContentLoaded", function () {
    const videoModal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    const imageModal = document.getElementById("imageModal");
    const imageViewer = document.getElementById("imageViewer");
    const viewerImage = document.getElementById("viewerImage");

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function updateImageTransform() {
        if (!viewerImage) {
            return;
        }

        viewerImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    function resetImageTransform() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        isDragging = false;
        updateImageTransform();
    }
/**
 * @param {HTMLElement | null} modal
 */
function openModal(modal) {
        if (!modal) {
            return;
        }

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }
/**
 * @param {HTMLElement | null} modal
 */
function closeModal(modal) {
        if (!modal) {
            return;
        }

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        if (modal === videoModal && videoFrame) {
            videoFrame.src = "";
        }

        if (modal === imageModal) {
            resetImageTransform();
        }

                const anyModalOpen = document.querySelector(".video-modal.active, .image-modal.active");

        if (!anyModalOpen) {
            document.body.style.overflow = "";
        }
    }

    // 유튜브 영상 팝업
    document.querySelectorAll(".project-video[data-video]").forEach(function (button) {
        button.addEventListener("click", function () {
            const videoId = button.dataset.video;

            if (!videoModal || !videoFrame || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
                return;
            }

            videoFrame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
            openModal(videoModal);
        });
    });

    // 제작과정 이미지 팝업
    document.querySelectorAll(".project-process[data-image]").forEach(function (button) {
        button.addEventListener("click", function () {
            const imagePath = button.dataset.image;

            if (!imageModal || !viewerImage || !imagePath) {
                return;
            }

            resetImageTransform();
            viewerImage.src = imagePath;
            viewerImage.alt = button.getAttribute("aria-label") || "제작과정 이미지";
            openModal(imageModal);
        });
    });

    // 팝업 닫기 버튼 및 배경 클릭
    document.querySelectorAll(".video-modal, .image-modal").forEach(function (modal) {
        modal.querySelectorAll(".modal-close, .modal-overlay").forEach(function (button) {
            button.addEventListener("click", function () {
                closeModal(modal);
            });
        });
    });

    // ESC 키로 팝업 닫기
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal(videoModal);
            closeModal(imageModal);
        }
    });

    // 마우스 휠로 이미지 확대 및 축소
    if (imageViewer) {
        imageViewer.addEventListener("wheel", function (event) {
            event.preventDefault();

            const zoomAmount = event.deltaY < 0 ? 0.15 : -0.15;
            scale = Math.min(4, Math.max(1, scale + zoomAmount));

            if (scale === 1) {
                translateX = 0;
                translateY = 0;
            }

            updateImageTransform();
        }, { passive: false });
    }

    // 마우스 및 터치 드래그
    if (viewerImage) {
        viewerImage.addEventListener("pointerdown", function (event) {
            if (scale <= 1) {
                return;
            }

            isDragging = true;
            startX = event.clientX - translateX;
            startY = event.clientY - translateY;

            viewerImage.setPointerCapture(event.pointerId);
            viewerImage.style.cursor = "grabbing";
        });

        viewerImage.addEventListener("pointermove", function (event) {
            if (!isDragging) {
                return;
            }

            translateX = event.clientX - startX;
            translateY = event.clientY - startY;
            updateImageTransform();
        });

        function stopDragging() {
            isDragging = false;
            viewerImage.style.cursor = scale > 1 ? "grab" : "default";
        }

        viewerImage.addEventListener("pointerup", stopDragging);
        viewerImage.addEventListener("pointercancel", stopDragging);
        viewerImage.addEventListener("dragstart", function (event) {
            event.preventDefault();
        });
    }
});

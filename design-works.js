/* ==========================================
   N.Jay X AI - DESIGN WORKS
   IMAGE GALLERY & VIEWER
========================================== */

/* SECTION 01 : PRODUCT DETAIL PAGES */

const detailItems = [
    { title: "N.Jay 침대과학", file: "N.Jay 침대과학.png" },
    { title: "N.Jay 향수 01", file: "N.Jay 향수1.png" },
    { title: "N.Jay 향수 02", file: "N.Jay 향수2.png" },
    { title: "N.Jay 헤드폰", file: "N.Jay 헤드폰.png" },
    { title: "그랜드 체로키 L", file: "그랜드 체로키 L 프리미엄 모험 브로슈어.png" },
    { title: "꼬깔콘 01", file: "꼬깔콘 매콤달콤한맛1.png" },
    { title: "꼬깔콘 02", file: "꼬깔콘 매콤달콤한맛2.png" },
    { title: "드래곤 에너지 01", file: "드래곤 에너지1.png" },
    { title: "드래곤 에너지 02", file: "드래곤 에너지2.png" },
    { title: "스마트폰 01", file: "스마트폰1.png" },
    { title: "스마트폰 02", file: "스마트폰2.png" },
    { title: "스마트폰 03", file: "스마트폰3.png" },
    { title: "여기어때 01", file: "여기어때1.png" },
    { title: "여기어때 02", file: "여기어때2.png" },
    { title: "치킨 01", file: "치킨1.png" },
    { title: "치킨 02", file: "치킨2.png" }
];

/* SECTION 02 : PROMOTIONAL IMAGES */

const promoItems = [
    { title: "공익광고 01", file: "공익광고1.png" },
    { title: "공익광고 02", file: "공익광고2.png" },
    { title: "꼬깔콘 01", file: "꼬깔콘1.png" },
    { title: "꼬깔콘 02", file: "꼬깔콘2.png" },
    { title: "드래곤 에너지 01", file: "드래곤 에너지1.png" },
    { title: "드래곤 에너지 02", file: "드래곤 에너지2.png" },
    { title: "스마트폰 01", file: "스마트폰1.png" },
    { title: "스마트폰 02", file: "스마트폰2.png" },
    { title: "여행 앱", file: "여행할 땐 여기어때!.png" },
    { title: "자동차 01", file: "자동차1.png" },
    { title: "자동차 02", file: "자동차2.jpg" },
    { title: "자동차 03", file: "자동차3.jpg" },
    { title: "자동차 04", file: "자동차4.png" },
    { title: "치킨 01", file: "치킨1.jpg" },
    { title: "치킨 02", file: "치킨2.png" },
    { title: "침대", file: "침대1.jpg" },
    { title: "향수 01", file: "향수 광고1.png" },
    { title: "향수 02", file: "향수 광고 2.png" },
    { title: "향수 03", file: "향수 광고 3.png" },
    { title: "향수 04", file: "향수 광고 4.png" },
    { title: "헤드폰", file: "헤드폰1.png" }
];

/* SECTION 03 : AI CREATIVE DESIGN */

const creativeItems = [
    { title: "MOCKUP 01", file: "1-1.png" },
    { title: "MOCKUP 02", file: "1.png" },
    { title: "MOCKUP 03", file: "2-1.png" },
    { title: "MOCKUP 04", file: "2.png" },
    { title: "MOCKUP 05", file: "3-1.png" },
    { title: "MOCKUP 06", file: "3.png" },
    { title: "네온 로고 콜라주", file: "N.Jay X AI 네온 로고 콜라주.png" },
    { title: "붓터치 그래피티 로고", file: "N.Jay X AI 붓터치 그래피티 로고.png" },
    { title: "블루 브러시 로고", file: "N.Jay X AI 블루 브러시 로고.png" },
    { title: "네온 림라이트 테크웨어", file: "네온 림라이트 테크웨어 스트리트 룩.png" },
    { title: "네온 스트리트웨어", file: "네온 림라이트의 스트리트웨어 청년.png" },
    { title: "사이버 아이콘", file: "네온 사이버 아이콘 아틀라스.png" },
    { title: "사이버펑크 스트리트웨어", file: "네온 사이버펑크 스트리트웨어 청년.png" },
    { title: "네온 테크웨어", file: "네온 테크웨어 스트리트 포즈.png" },
    { title: "3D 아이콘 보드", file: "미래형 3D 크리에이티브 아이콘 보드.png" },
    { title: "AI 지구본", file: "미래형 크리에이티브 AI 지구본.png" },
    { title: "사이버펑크 아이콘", file: "사이버펑크 3D 아이콘 대시보드 (1).png" },
    { title: "창의적 우주의 지구 허브", file: "창의적 우주의 지구 허브.png" }
];

/* HTML ELEMENTS */

const detailGrid = document.getElementById("detailGrid");
const promoGrid = document.getElementById("promoGrid");
const creativeGrid = document.getElementById("creativeGrid");

const imageModal = document.getElementById("imageModal");
const modalViewport = document.getElementById("modalViewport");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const zoomReset = document.getElementById("zoomReset");
const zoomValue = document.getElementById("zoomValue");

/* VIEWER STATE */

let baseWidth = 0;
let baseHeight = 0;
let scale = 1;
let offsetX = 0;
let offsetY = 0;
let dragging = false;
let startX = 0;
let startY = 0;

/* ==========================================
   GALLERY GENERATOR
========================================== */

/**
 * @param {HTMLElement | null} grid
 * @param {{title: string, file: string}[]} items
 * @param {string} folder
 */
function createGallery(grid, items, folder) {
    if (!grid) {
        return;
    }

    items.forEach((item) => {
        const card = document.createElement("div");
        const imagePath = "./" + folder + "/" + encodeURIComponent(item.file);

        card.className = "detail-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", item.title + " 이미지 보기");

        card.innerHTML = `
            <div class="detail-image">
                <img src="${imagePath}" alt="${item.title}" loading="lazy">
            </div>
            <div class="detail-card-title">${item.title}</div>
        `;

        card.addEventListener("click", () => {
            openModal(imagePath, item.title);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openModal(imagePath, item.title);
            }
        });

        grid.appendChild(card);
    });
}

/* GENERATE THREE GALLERIES */

createGallery(detailGrid, detailItems, "03_Product_Detail");
createGallery(promoGrid, promoItems, "05_Images");
createGallery(creativeGrid, creativeItems, "05_Images");

/* ==========================================
   IMAGE VIEWER
========================================== */

function renderImage() {
    modalImage.style.width = baseWidth + "px";
    modalImage.style.height = baseHeight + "px";

    modalImage.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;

    zoomValue.textContent = Math.round(scale * 100) + "%";
}

function fitImage() {
    if (!modalImage.naturalWidth || !modalImage.naturalHeight) {
        return;
    }

    const viewportWidth = modalViewport.clientWidth;
    const viewportHeight = modalViewport.clientHeight;

    const fitScale = Math.min(
        viewportWidth / modalImage.naturalWidth,
        viewportHeight / modalImage.naturalHeight,
        1
    );

    baseWidth = modalImage.naturalWidth * fitScale;
    baseHeight = modalImage.naturalHeight * fitScale;

    scale = 1;
    offsetX = 0;
    offsetY = 0;

    renderImage();
}

/**
 * @param {string} src
 * @param {string} title
 */
function openModal(src, title) {
    imageModal.classList.add("active");
    imageModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    modalImage.onload = fitImage;
    modalImage.alt = title;
    modalImage.src = src;

    if (modalImage.complete && modalImage.naturalWidth) {
        fitImage();
    }
}

function closeModal() {
    imageModal.classList.remove("active");
    imageModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    dragging = false;
    modalViewport.classList.remove("dragging");
}

/**
 * @param {number} factor
 */
function changeZoom(factor) {
    scale = Math.max(0.25, Math.min(scale * factor, 8));
    renderImage();
}

/* ZOOM BUTTONS */

zoomIn.addEventListener("click", () => {
    changeZoom(1.2);
});

zoomOut.addEventListener("click", () => {
    changeZoom(1 / 1.2);
});

zoomReset.addEventListener("click", fitImage);
modalClose.addEventListener("click", closeModal);

/* CTRL + MOUSE WHEEL */

modalViewport.addEventListener("wheel", (event) => {
    if (!event.ctrlKey) {
        return;
    }

    event.preventDefault();
    changeZoom(event.deltaY < 0 ? 1.1 : 1 / 1.1);
}, { passive: false });

/* DRAG IMAGE */

modalViewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
        return;
    }

    dragging = true;
    startX = event.clientX - offsetX;
    startY = event.clientY - offsetY;

    modalViewport.classList.add("dragging");
    modalViewport.setPointerCapture(event.pointerId);
});

modalViewport.addEventListener("pointermove", (event) => {
    if (!dragging) {
        return;
    }

    offsetX = event.clientX - startX;
    offsetY = event.clientY - startY;

    renderImage();
});

function stopDragging() {
    dragging = false;
    modalViewport.classList.remove("dragging");
}

modalViewport.addEventListener("pointerup", stopDragging);
modalViewport.addEventListener("pointercancel", stopDragging);

/* CLOSE MODAL */

imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageModal.classList.contains("active")) {
        closeModal();
    }
});

/* WINDOW RESIZE */

window.addEventListener("resize", () => {
    if (imageModal.classList.contains("active")) {
        fitImage();
    }
});

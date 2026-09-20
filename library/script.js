import * as THREE from "three";
import { BOOKS } from "./data/books.js";

const SLOTS_PER_ROW = 4;
const ROWS_PER_BAY = 3;
const BOOK_W = 0.62;
const BOOK_H = 0.95;
const BOOK_D = 0.1;
const BOOK_GAP = 0.025;
const ROW_HEIGHT = BOOK_H + 0.38;
const BAY_MARGIN = 0.14;
const BAY_WIDTH = SLOTS_PER_ROW * (BOOK_W + BOOK_GAP) + BAY_MARGIN * 2;
const DIVIDER_W = 0.1;
const SHELF_DEPTH = BOOK_D + 0.55;
const PLANK_T = 0.06;
const WALL_TOP_MARGIN = 0.18;
const WALL_BOTTOM_MARGIN = 0.14;

const container = document.getElementById("scene-container");
const loader = document.getElementById("loader");
const bookCountEl = document.getElementById("book-count");
const tooltip = document.getElementById("tooltip");
const navHint = document.getElementById("nav-hint");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const detailOverlay = document.getElementById("detail-overlay");
const detailClose = document.getElementById("detail-close");
const detailCoverImg = document.getElementById("detail-cover-img");
const detailTitle = document.getElementById("detail-title");
const detailAuthor = document.getElementById("detail-author");
const detailStars = document.getElementById("detail-stars");
const detailDate = document.getElementById("detail-date");
const detailNotes = document.getElementById("detail-notes");

bookCountEl.textContent = `${BOOKS.length} book${BOOKS.length === 1 ? "" : "s"}`;

function supportsWebGL() {
    try {
        const canvas = document.createElement("canvas");
        return !!(window.WebGLRenderingContext &&
            (canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch (e) {
        return false;
    }
}

try {
    if (!supportsWebGL()) {
        throw new Error("WebGL unavailable");
    }
    initScene();
} catch (err) {
    console.warn("Falling back to list view:", err);
    renderListFallback();
}

// ---------- procedural textures ----------

function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
}

function makeWoodTexture(baseHue, w = 512, h = 512) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, `hsl(${baseHue}, 38%, 14%)`);
    grad.addColorStop(1, `hsl(${baseHue}, 32%, 9%)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 90; i++) {
        const y = Math.random() * h;
        const lightness = 8 + Math.random() * 14;
        ctx.strokeStyle = `hsla(${baseHue + (Math.random() * 10 - 5)}, 30%, ${lightness}%, ${0.25 + Math.random() * 0.3})`;
        ctx.lineWidth = 0.6 + Math.random() * 1.8;
        ctx.beginPath();
        ctx.moveTo(0, y);
        let cx = w * 0.33;
        let cy = y + (Math.random() * 30 - 15);
        let cx2 = w * 0.66;
        let cy2 = y + (Math.random() * 30 - 15);
        ctx.bezierCurveTo(cx, cy, cx2, cy2, w, y + (Math.random() * 20 - 10));
        ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
}

function wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line);
            line = word;
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);
    return lines;
}

function makeSpineCanvas(book) {
    const w = 384;
    const h = 576;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    const hash = hashString(book.title + book.author);
    const hue = hash % 360;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, `hsl(${hue}, 42%, 24%)`);
    grad.addColorStop(1, `hsl(${(hue + 30) % 360}, 46%, 12%)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(230, 185, 120, 0.55)";
    ctx.lineWidth = 3;
    ctx.strokeRect(18, 18, w - 36, h - 36);

    ctx.textAlign = "center";
    ctx.fillStyle = "#f3ece2";
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 6;

    const titleSize = book.title.length > 28 ? 30 : 36;
    ctx.font = `600 ${titleSize}px Georgia, 'Times New Roman', serif`;
    const titleLines = wrapText(ctx, book.title, w - 80).slice(0, 4);
    const titleStartY = h * 0.38 - (titleLines.length - 1) * (titleSize * 0.6);
    titleLines.forEach((line, i) => {
        ctx.fillText(line, w / 2, titleStartY + i * titleSize * 1.2);
    });

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(230, 185, 120, 0.7)";
    ctx.lineWidth = 2;
    const ruleY = titleStartY + titleLines.length * titleSize * 1.2 - titleSize * 0.4;
    ctx.beginPath();
    ctx.moveTo(w * 0.32, ruleY);
    ctx.lineTo(w * 0.68, ruleY);
    ctx.stroke();

    ctx.font = "400 22px Inter, sans-serif";
    ctx.fillStyle = "#d9cfc2";
    const authorLines = wrapText(ctx, book.author, w - 100).slice(0, 2);
    authorLines.forEach((line, i) => {
        ctx.fillText(line, w / 2, ruleY + 46 + i * 26);
    });

    return canvas;
}

// ---------- shelf packing ----------

function bookDims(hash) {
    const wScale = 0.84 + ((hash % 137) / 137) * 0.32; // ~0.84x – 1.16x, centred on 1.0
    const hScale = 0.9 + (((hash >> 5) % 113) / 113) * 0.2; // ~0.9x – 1.1x, centred on 1.0
    return { w: BOOK_W * wScale, h: BOOK_H * hScale };
}

// Books are grouped SLOTS_PER_ROW at a time (same grouping the shelf's
// bays/rows are built from), then each group's randomised widths are
// scaled to exactly fill the row — no dead gaps, still varied sizes.
function computeLayout(books) {
    const usableWidth = BAY_WIDTH - BAY_MARGIN * 2;
    const layout = [];

    for (let i = 0; i < books.length; i += SLOTS_PER_ROW) {
        const group = books.slice(i, i + SLOTS_PER_ROW).map((book) => {
            const hash = hashString(book.title + book.author);
            return { book, hash, ...bookDims(hash) };
        });

        const gapSum = BOOK_GAP * (group.length - 1);
        const rawWidthSum = group.reduce((sum, d) => sum + d.w, 0);
        const scale =
            group.length === SLOTS_PER_ROW
                ? Math.max(0.7, Math.min(1.3, (usableWidth - gapSum) / rawWidthSum))
                : 1;

        const groupIndex = i / SLOTS_PER_ROW;
        const bay = Math.floor(groupIndex / ROWS_PER_BAY);
        const row = groupIndex % ROWS_PER_BAY;

        let cursorX = 0;
        group.forEach(({ book, hash, w, h }) => {
            const sw = w * scale;
            layout.push({ book, hash, bay, row, xStart: cursorX, w: sw, h });
            cursorX += sw + BOOK_GAP;
        });
    }

    return layout;
}

// ---------- cover resolution ----------

const coverCache = new Map();

async function fetchAsBlobUrl(url) {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) return null;
    const blob = await res.blob();
    if (blob.size < 200) return null; // openlibrary's 1x1 "no cover" placeholder
    return URL.createObjectURL(blob);
}

async function resolveCoverBlobUrl(book) {
    const cacheKey = book.isbn
        ? `lib_cover:isbn:${book.isbn}`
        : `lib_cover:ta:${book.title.toLowerCase()}|${book.author.toLowerCase()}`;

    let sourceUrl = null;
    const cached = localStorage.getItem(cacheKey);
    if (cached !== null) {
        sourceUrl = cached === "null" ? null : cached;
    } else {
        try {
            if (book.isbn) {
                sourceUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`;
            } else {
                const q = `https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&limit=1&fields=cover_i`;
                const res = await fetch(q);
                const data = await res.json();
                const coverId = data?.docs?.[0]?.cover_i;
                sourceUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null;
            }
        } catch (e) {
            sourceUrl = null;
        }
        localStorage.setItem(cacheKey, sourceUrl === null ? "null" : sourceUrl);
    }

    if (!sourceUrl) return null;

    try {
        const blobUrl = await fetchAsBlobUrl(sourceUrl);
        return blobUrl;
    } catch (e) {
        return null;
    }
}

// ---------- scene ----------

function initScene() {
    const layout = computeLayout(BOOKS);
    const bayCount = Math.max(1, (layout[layout.length - 1]?.bay ?? 0) + 1);
    const wallHeight = ROWS_PER_BAY * ROW_HEIGHT + WALL_TOP_MARGIN + WALL_BOTTOM_MARGIN;
    const wallWidth = bayCount * BAY_WIDTH + (bayCount + 1) * DIVIDER_W;

    const scene = new THREE.Scene();

    const cameraFov = 42;
    const camera = new THREE.PerspectiveCamera(
        cameraFov,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );
    const vFovRad = (cameraFov * Math.PI) / 180;
    const camDistance = (wallHeight * 1.06) / (2 * Math.tan(vFovRad / 2)) + SHELF_DEPTH;
    camera.position.set(wallWidth / 2, wallHeight * 0.52, camDistance);
    scene.add(camera);

    const fillLight = new THREE.PointLight(0xfff1e0, 5, 30, 2);
    camera.add(fillLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setClearColor(0xf3e7d3, 1);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xfff3df, 0x6b4a30, 3.4));

    const sunLight = new THREE.DirectionalLight(0xfff6e6, 2.6);
    sunLight.position.set(wallWidth * 0.65, wallHeight * 1.9, camDistance * 0.55);
    const sunTarget = new THREE.Object3D();
    sunTarget.position.set(wallWidth * 0.5, wallHeight * 0.45, 0);
    scene.add(sunTarget);
    sunLight.target = sunTarget;
    scene.add(sunLight);

    // ---- materials ----
    const wallTex = makeWoodTexture(28, 1024, 1024);
    const plankTex = makeWoodTexture(24, 512, 256);
    const dividerTex = makeWoodTexture(22, 128, 512);

    const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.9 });
    const plankMat = new THREE.MeshStandardMaterial({ map: plankTex, roughness: 0.85 });
    const dividerMat = new THREE.MeshStandardMaterial({ map: dividerTex, roughness: 0.85 });
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xfff0d6 });
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xe9e0d0, roughness: 0.95 });

    const structureGroup = new THREE.Group();
    scene.add(structureGroup);

    // back wall
    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallWidth, wallHeight, 0.06),
        wallMat
    );
    backWall.position.set(wallWidth / 2, wallHeight / 2, -0.03);
    structureGroup.add(backWall);

    // vertical dividers (bayCount + 1 of them)
    for (let d = 0; d <= bayCount; d++) {
        const x = d * (BAY_WIDTH + DIVIDER_W) + DIVIDER_W / 2;
        const divider = new THREE.Mesh(
            new THREE.BoxGeometry(DIVIDER_W, wallHeight, SHELF_DEPTH),
            dividerMat
        );
        divider.position.set(x, wallHeight / 2, SHELF_DEPTH / 2);
        structureGroup.add(divider);
    }

    // horizontal planks per bay (ROWS_PER_BAY + 1 per bay)
    for (let b = 0; b < bayCount; b++) {
        const bayLeft = DIVIDER_W + b * (BAY_WIDTH + DIVIDER_W);
        for (let r = 0; r <= ROWS_PER_BAY; r++) {
            const y = wallHeight - WALL_TOP_MARGIN - r * ROW_HEIGHT;
            const plank = new THREE.Mesh(
                new THREE.BoxGeometry(BAY_WIDTH, PLANK_T, SHELF_DEPTH),
                plankMat
            );
            plank.position.set(bayLeft + BAY_WIDTH / 2, y, SHELF_DEPTH / 2);
            structureGroup.add(plank);

            const led = new THREE.Mesh(
                new THREE.BoxGeometry(BAY_WIDTH * 0.9, 0.02, 0.03),
                ledMat
            );
            led.position.set(bayLeft + BAY_WIDTH / 2, y - PLANK_T / 2 - 0.01, SHELF_DEPTH - 0.05);
            structureGroup.add(led);

            const strip = new THREE.PointLight(0xffc98a, 6, 3, 2.4);
            strip.position.set(bayLeft + BAY_WIDTH / 2, y - 0.1, SHELF_DEPTH * 0.7);
            structureGroup.add(strip);
        }
    }

    // ---- books ----
    const bookMeshes = [];
    const bookGeo = new THREE.BoxGeometry(1, 1, BOOK_D);

    layout.forEach(({ book, hash, bay, row, xStart, w, h }) => {
        const bayLeft = DIVIDER_W + bay * (BAY_WIDTH + DIVIDER_W);
        const x = bayLeft + BAY_MARGIN + xStart + w / 2;

        const rowTopY = wallHeight - WALL_TOP_MARGIN - row * ROW_HEIGHT;
        const rowFloorY = rowTopY - ROW_HEIGHT;
        const y = rowFloorY + PLANK_T / 2 + h / 2 + 0.02;

        const z = SHELF_DEPTH - BOOK_D / 2 - 0.12;

        const spineCanvas = makeSpineCanvas(book);
        const spineTex = new THREE.CanvasTexture(spineCanvas);
        spineTex.colorSpace = THREE.SRGBColorSpace;

        const coverMat = new THREE.MeshStandardMaterial({ map: spineTex, roughness: 0.7 });
        const materials = [pagesMat, pagesMat, pagesMat, pagesMat, coverMat, pagesMat];

        const mesh = new THREE.Mesh(bookGeo, materials);
        mesh.scale.set(w, h, 1);
        mesh.position.set(x, y, z);

        // the odd book leans, like it's missing its neighbour
        if (hash % 9 === 0) {
            const dir = hash % 2 === 0 ? 1 : -1;
            const tilt = dir * (0.06 + ((hash % 30) / 30) * 0.07);
            mesh.rotation.z = tilt;
            mesh.position.x += dir * h * 0.16 * Math.sin(Math.abs(tilt));
            mesh.position.y -= h * 0.02;
        }

        mesh.userData = {
            book,
            coverMat,
            spineCanvas,
            baseW: w,
            baseH: h,
            baseZ: z,
        };
        structureGroup.add(mesh);
        bookMeshes.push(mesh);

        resolveCoverBlobUrl(book).then((blobUrl) => {
            if (!blobUrl) return;
            book._coverUrl = blobUrl;
            new THREE.TextureLoader().load(blobUrl, (tex) => {
                tex.colorSpace = THREE.SRGBColorSpace;
                coverMat.map = tex;
                coverMat.needsUpdate = true;
            });
        });
    });

    // ---- camera pan controls ----
    let targetCenterX = wallWidth / 2;
    let currentCenterX = wallWidth / 2;
    let visibleWidth = 1;

    function computeVisibleWidth() {
        const vFov = (camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(vFov / 2) * camDistance;
        visibleWidth = height * camera.aspect;
    }

    function clampCenter(val) {
        const halfView = visibleWidth / 2;
        if (wallWidth <= visibleWidth) return wallWidth / 2;
        return Math.min(wallWidth - halfView, Math.max(halfView, val));
    }

    function updateArrowState() {
        const halfView = visibleWidth / 2;
        const panningNeeded = wallWidth > visibleWidth;
        const atStart = targetCenterX <= halfView + 0.01;
        const atEnd = targetCenterX >= wallWidth - halfView - 0.01;
        arrowLeft.disabled = !panningNeeded || atStart;
        arrowRight.disabled = !panningNeeded || atEnd;
        arrowLeft.hidden = !panningNeeded;
        arrowRight.hidden = !panningNeeded;
        navHint.hidden = !panningNeeded;
    }

    function panBy(delta) {
        targetCenterX = clampCenter(targetCenterX + delta);
        dismissHint();
        updateArrowState();
    }

    function dismissHint() {
        navHint.classList.add("faded");
    }

    arrowLeft.addEventListener("click", () => panBy(-BAY_WIDTH));
    arrowRight.addEventListener("click", () => panBy(BAY_WIDTH));

    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") panBy(-0.9);
        if (e.key === "ArrowRight") panBy(0.9);
        if (e.key === "Escape") closeDetail();
    });

    container.addEventListener(
        "wheel",
        (e) => {
            e.preventDefault();
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            panBy(delta * 0.01);
        },
        { passive: false }
    );

    let isPointerDown = false;
    let dragStartX = 0;
    let dragStartCenter = 0;
    let dragMoved = 0;

    container.addEventListener("pointerdown", (e) => {
        isPointerDown = true;
        dragStartX = e.clientX;
        dragStartCenter = targetCenterX;
        dragMoved = 0;
        container.classList.add("dragging");
    });

    window.addEventListener("pointermove", (e) => {
        updateHover(e);
        if (!isPointerDown) return;
        const dxPixels = dragStartX - e.clientX;
        dragMoved = Math.max(dragMoved, Math.abs(dxPixels));
        const worldDelta = (dxPixels / container.clientWidth) * visibleWidth;
        targetCenterX = clampCenter(dragStartCenter + worldDelta);
        if (dragMoved > 4) dismissHint();
        updateArrowState();
    });

    window.addEventListener("pointerup", (e) => {
        if (isPointerDown && dragMoved < 6) {
            handleClick(e);
        }
        isPointerDown = false;
        container.classList.remove("dragging");
    });

    // ---- raycasting / hover / click ----
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    let hoveredMesh = null;

    function updateHover(e) {
        const rect = container.getBoundingClientRect();
        pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNDC, camera);
        const hits = raycaster.intersectObjects(bookMeshes, false);
        const hit = hits[0]?.object || null;

        if (hit !== hoveredMesh) {
            if (hoveredMesh) hoveredMesh.userData.hoverTarget = 0;
            hoveredMesh = hit;
            if (hoveredMesh) hoveredMesh.userData.hoverTarget = 1;
        }

        if (hit) {
            tooltip.hidden = false;
            tooltip.textContent = hit.userData.book.title;
            tooltip.style.left = `${e.clientX}px`;
            tooltip.style.top = `${e.clientY}px`;
            container.style.cursor = isPointerDown ? "grabbing" : "pointer";
        } else {
            tooltip.hidden = true;
            container.style.cursor = isPointerDown ? "grabbing" : "grab";
        }
    }

    function handleClick(e) {
        const rect = container.getBoundingClientRect();
        pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNDC, camera);
        const hits = raycaster.intersectObjects(bookMeshes, false);
        if (hits[0]) openDetail(hits[0].object.userData);
    }

    function openDetail(data) {
        const { book, spineCanvas } = data;
        detailTitle.textContent = book.title;
        detailAuthor.textContent = book.author;
        const rounded = Math.round(book.rating);
        detailStars.textContent = "★".repeat(rounded) + "☆".repeat(5 - rounded) + `  ${book.rating}`;
        detailDate.textContent = book.dateRead
            ? new Date(`${book.dateRead}-01`).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
            : "";
        detailNotes.textContent = book.notes || "";
        detailCoverImg.src = book._coverUrl || spineCanvas.toDataURL();
        detailCoverImg.alt = `${book.title} cover`;
        detailOverlay.hidden = false;
    }

    function closeDetail() {
        detailOverlay.hidden = true;
    }

    detailClose.addEventListener("click", closeDetail);
    detailOverlay.addEventListener("click", (e) => {
        if (e.target === detailOverlay) closeDetail();
    });

    // ---- resize ----
    function onResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        computeVisibleWidth();
        targetCenterX = clampCenter(targetCenterX);
        updateArrowState();
    }
    window.addEventListener("resize", onResize);
    computeVisibleWidth();
    targetCenterX = clampCenter(0); // start at the first bay
    currentCenterX = targetCenterX;
    updateArrowState();

    // ---- animate ----
    function animate() {
        requestAnimationFrame(animate);

        currentCenterX += (targetCenterX - currentCenterX) * 0.09;
        camera.position.x = currentCenterX;
        camera.lookAt(currentCenterX, wallHeight * 0.5, 0);

        bookMeshes.forEach((mesh) => {
            const target = mesh.userData.hoverTarget || 0;
            mesh.userData.hoverAmt = (mesh.userData.hoverAmt || 0) + (target - (mesh.userData.hoverAmt || 0)) * 0.2;
            const amt = mesh.userData.hoverAmt;
            const s = 1 + amt * 0.06;
            mesh.scale.set(mesh.userData.baseW * s, mesh.userData.baseH * s, s);
            mesh.position.z = mesh.userData.baseZ + amt * 0.12;
        });

        renderer.render(scene, camera);
    }

    loader.classList.add("hidden");
    animate();
}

// ---------- no-webgl fallback ----------

function renderListFallback() {
    loader.classList.add("hidden");
    navHint.hidden = true;
    arrowLeft.hidden = true;
    arrowRight.hidden = true;

    const list = document.createElement("div");
    list.style.cssText =
        "max-width:40rem;margin:6rem auto 3rem;padding:0 1.5rem;display:flex;flex-direction:column;gap:1.25rem;overflow-y:auto;height:calc(100dvh - 6rem);";

    BOOKS.forEach((book) => {
        const row = document.createElement("div");
        row.style.cssText =
            "display:flex;gap:1rem;align-items:flex-start;border-bottom:1px solid var(--border);padding-bottom:1.25rem;";

        const img = document.createElement("img");
        img.style.cssText = "width:3.5rem;aspect-ratio:2/3;object-fit:cover;border-radius:0.25rem;background:var(--bg-card);";
        img.alt = `${book.title} cover`;
        if (book.isbn) {
            img.src = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`;
        }

        const info = document.createElement("div");
        const rounded = Math.round(book.rating);
        info.innerHTML = `
            <strong style="display:block;font-size:1rem;">${book.title}</strong>
            <span style="color:var(--text-muted);font-size:0.85rem;">${book.author}</span><br>
            <span style="color:var(--gold);font-size:0.85rem;">${"★".repeat(rounded)}${"☆".repeat(5 - rounded)} ${book.rating}</span>
            <p style="margin-top:0.4rem;font-size:0.85rem;color:var(--text-muted);">${book.notes || ""}</p>
        `;

        row.appendChild(img);
        row.appendChild(info);
        list.appendChild(row);
    });

    container.style.cursor = "default";
    container.appendChild(list);
}

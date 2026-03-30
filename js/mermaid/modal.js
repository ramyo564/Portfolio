import { byId } from '../utils/dom.js';
import { buildYouTubeEmbedUrl } from '../utils/youtube.js';
import { trackSelectContent } from '../analytics/tracking.js';

export function setupMermaidModal() {
    const modal = byId('mermaid-modal');
    const modalContent = byId('mermaid-modal-content');
    const modalTitle = byId('mermaid-modal-title');
    const modalDialog = modal?.querySelector('.mermaid-modal-dialog') ?? null;

    if (!modal || !modalContent || !modalTitle || !modalDialog) {
        return;
    }

    const targets = document.querySelectorAll('.graph-container, .card-visual');
    const ZOOM_STEP = 0.15;
    const ZOOM_MIN = 0.55;
    const ZOOM_MAX = 3;

    let zoom = 1;
    let activeSvg = null;
    let activeCanvas = null;
    let activeViewport = null;
    let activeDiagramId = '';
    let activeDiagramTitle = '';
    let baseSvgWidth = 0;
    let baseSvgHeight = 0;
    let isPanning = false;
    let panStartX = 0;
    let panStartY = 0;
    let panStartScrollLeft = 0;
    let panStartScrollTop = 0;

    let controls = modal.querySelector('.mermaid-modal-controls');
    if (!controls) {
        controls = document.createElement('div');
        controls.className = 'mermaid-modal-controls';
        controls.innerHTML = `
            <button class="mermaid-zoom-btn" type="button" data-mermaid-zoom="out" aria-label="Zoom out">-</button>
            <button class="mermaid-zoom-btn" type="button" data-mermaid-zoom="reset" aria-label="Reset zoom">RESET</button>
            <button class="mermaid-zoom-btn" type="button" data-mermaid-zoom="in" aria-label="Zoom in">+</button>
            <span class="mermaid-zoom-value" aria-live="polite">100%</span>
        `;
        modalDialog.appendChild(controls);
    }

    const zoomValue = controls.querySelector('.mermaid-zoom-value');

    const centerModalView = () => {
        if (!(activeViewport instanceof HTMLElement)) {
            return;
        }

        const maxLeft = activeViewport.scrollWidth - activeViewport.clientWidth;
        activeViewport.scrollLeft = maxLeft > 0 ? Math.floor(maxLeft / 2) : 0;
    };

    const scheduleCenterModalView = () => {
        window.requestAnimationFrame(() => {
            centerModalView();
            window.requestAnimationFrame(centerModalView);
        });
    };

    const endPan = () => {
        if (!isPanning) {
            return;
        }
        isPanning = false;
        if (activeViewport) {
            activeViewport.classList.remove('is-panning');
        }
    };

    const applyZoom = () => {
        if (!activeSvg || !activeCanvas || !activeViewport) {
            return;
        }

        const nextWidth = Math.max(1, Math.round(baseSvgWidth * zoom));
        const nextHeight = Math.max(1, Math.round(baseSvgHeight * zoom));
        activeCanvas.style.width = `${nextWidth}px`;
        activeCanvas.style.height = `${nextHeight}px`;
        activeSvg.style.maxWidth = 'none';
        activeSvg.style.width = '100%';
        activeSvg.style.height = '100%';
        activeSvg.setAttribute('width', String(baseSvgWidth));
        activeSvg.setAttribute('height', String(baseSvgHeight));

        if (zoom > 1.001) {
            activeViewport.classList.add('can-pan');
        } else {
            endPan();
            activeViewport.classList.remove('can-pan');
        }

        if (zoomValue) {
            zoomValue.textContent = `${Math.round(zoom * 100)}%`;
        }
    };

    const setZoom = (nextZoom) => {
        const clampedZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, nextZoom));
        if (Math.abs(clampedZoom - zoom) < 0.0001) {
            return;
        }
        zoom = clampedZoom;
        applyZoom();
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        modalContent.replaceChildren();
        endPan();
        modalContent.classList.remove('has-linked-video');
        if (activeViewport) {
            activeViewport.classList.remove('can-pan');
        }
        activeSvg = null;
        activeCanvas = null;
        activeViewport = null;
        activeDiagramId = '';
        activeDiagramTitle = '';
        baseSvgWidth = 0;
        baseSvgHeight = 0;
        zoom = 1;
        if (zoomValue) {
            zoomValue.textContent = '100%';
        }
        document.body.classList.remove('modal-open');
    };

    const setupHoverPreview = (target, videoId) => {
        if (!videoId || target.querySelector('.youtube-hover-preview')) {
            return;
        }

        target.classList.add('has-youtube-preview');

        const preview = document.createElement('div');
        preview.className = 'youtube-hover-preview';
        preview.setAttribute('aria-hidden', 'true');

        const iframe = document.createElement('iframe');
        iframe.className = 'youtube-hover-frame';
        iframe.title = 'Linked YouTube Preview';
        iframe.loading = 'lazy';
        iframe.tabIndex = -1;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.setAttribute('allowfullscreen', '');
        preview.appendChild(iframe);

        const hint = document.createElement('span');
        hint.className = 'youtube-hover-hint';
        hint.textContent = 'HOVER PREVIEW · CLICK PLAY';
        preview.appendChild(hint);

        target.appendChild(preview);

        let previewLoaded = false;
        const ensurePreviewLoaded = () => {
            if (previewLoaded) {
                return;
            }
            iframe.src = buildYouTubeEmbedUrl(videoId, {
                autoplay: true,
                mute: true,
                controls: false,
                loop: true
            });
            previewLoaded = true;
        };

        target.addEventListener('mouseenter', ensurePreviewLoaded);
        target.addEventListener('focusin', ensurePreviewLoaded);
        target.addEventListener('touchstart', ensurePreviewLoaded, { passive: true, once: true });
    };

    const openModal = (target) => {
        const sourceSvg = target.querySelector('.mermaid svg');
        if (!sourceSvg) {
            return;
        }
        const videoId = target.getAttribute('data-youtube-video-id') || '';

        const clonedSvg = sourceSvg.cloneNode(true);
        clonedSvg.style.maxWidth = 'none';
        clonedSvg.style.width = '100%';
        clonedSvg.style.height = '100%';

        const viewBox = sourceSvg.getAttribute('viewBox');
        let calculatedBaseWidth = 0;
        let calculatedBaseHeight = 0;
        if (viewBox) {
            const parts = viewBox.trim().split(/\s+/).map(Number);
            if (parts.length === 4 && parts.every(Number.isFinite)) {
                const modalBaseScale = 1.08;
                calculatedBaseWidth = Math.round(parts[2] * modalBaseScale);
                calculatedBaseHeight = Math.round(parts[3] * modalBaseScale);
            }
        }

        if (calculatedBaseWidth <= 0 || calculatedBaseHeight <= 0) {
            const rect = sourceSvg.getBoundingClientRect();
            const modalBaseScale = 1.08;
            calculatedBaseWidth = Math.max(1, Math.round(rect.width * modalBaseScale));
            calculatedBaseHeight = Math.max(1, Math.round(rect.height * modalBaseScale));
        }

        baseSvgWidth = calculatedBaseWidth;
        baseSvgHeight = calculatedBaseHeight;

        clonedSvg.setAttribute('width', String(baseSvgWidth));
        clonedSvg.setAttribute('height', String(baseSvgHeight));

        const canvas = document.createElement('div');
        canvas.className = 'mermaid-modal-canvas';
        canvas.style.width = `${baseSvgWidth}px`;
        canvas.style.height = `${baseSvgHeight}px`;
        canvas.appendChild(clonedSvg);

        const layout = document.createElement('div');
        layout.className = 'mermaid-modal-layout';

        const diagramPane = document.createElement('section');
        diagramPane.className = 'mermaid-modal-panel mermaid-modal-panel-diagram mermaid-modal-diagram-pane';
        const diagramHeader = document.createElement('div');
        diagramHeader.className = 'mermaid-modal-panel-header';
        diagramHeader.innerHTML = '<span>DIAGRAM</span><span>CTRL/CMD + WHEEL TO ZOOM</span>';

        const diagramBody = document.createElement('div');
        diagramBody.className = 'mermaid-modal-panel-body mermaid-modal-panel-body-diagram';
        const diagramViewport = document.createElement('div');
        diagramViewport.className = 'mermaid-modal-diagram-viewport';
        diagramViewport.appendChild(canvas);
        diagramBody.appendChild(diagramViewport);

        diagramPane.append(diagramHeader, diagramBody);
        layout.appendChild(diagramPane);

        if (videoId) {
            const videoPane = document.createElement('section');
            videoPane.className = 'mermaid-modal-panel mermaid-modal-panel-video mermaid-modal-video-pane';
            const videoHeader = document.createElement('div');
            videoHeader.className = 'mermaid-modal-panel-header';
            videoHeader.innerHTML = '<span>YOUTUBE</span><span>LINKED PLAYBACK</span>';

            const videoBody = document.createElement('div');
            videoBody.className = 'mermaid-modal-panel-body mermaid-modal-panel-body-video';
            const videoWrap = document.createElement('div');
            videoWrap.className = 'mermaid-modal-video-wrap';

            const videoFrame = document.createElement('iframe');
            videoFrame.className = 'mermaid-modal-video';
            videoFrame.title = 'Linked YouTube Video';
            videoFrame.loading = 'eager';
            videoFrame.referrerPolicy = 'strict-origin-when-cross-origin';
            videoFrame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            videoFrame.setAttribute('allowfullscreen', '');
            videoFrame.src = buildYouTubeEmbedUrl(videoId, {
                autoplay: true,
                mute: false,
                controls: true,
                loop: false
            });

            videoWrap.appendChild(videoFrame);
            videoBody.appendChild(videoWrap);
            videoPane.append(videoHeader, videoBody);
            layout.appendChild(videoPane);
            modalContent.classList.add('has-linked-video');
        } else {
            modalContent.classList.remove('has-linked-video');
        }

        modalContent.replaceChildren(layout);
        modalContent.scrollLeft = 0;
        modalContent.scrollTop = 0;
        activeCanvas = canvas;
        activeSvg = clonedSvg;
        activeViewport = diagramViewport;
        zoom = 1;
        applyZoom();

        const titleText =
            target.closest('.service-card')?.querySelector('.card-title')?.textContent?.trim() ||
            target.closest('.hero-panel')?.querySelector('.panel-title')?.textContent?.trim() ||
            'Mermaid Diagram';
        const diagramId = target.querySelector('.mermaid')?.getAttribute('data-mermaid-id') || 'unknown_diagram';
        activeDiagramId = diagramId;
        activeDiagramTitle = titleText;
        modalTitle.textContent = titleText;

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        scheduleCenterModalView();

        trackSelectContent({
            contentType: 'mermaid_diagram',
            itemId: diagramId,
            itemName: titleText,
            sectionName: 'mermaid_modal',
            interactionAction: 'open_modal',
            elementType: 'modal',
            elementLabel: titleText,
            modalName: 'mermaid-modal',
            modal_title: titleText,
            has_video: Boolean(videoId)
        });
    };

    controls.querySelectorAll('[data-mermaid-zoom]').forEach((button) => {
        button.addEventListener('click', (event) => {
            const control = event.currentTarget;
            if (!(control instanceof HTMLElement)) {
                return;
            }
            const action = control.getAttribute('data-mermaid-zoom');
            if (!action || !modal.classList.contains('is-open')) {
                return;
            }

            if (action === 'in') {
                setZoom(zoom + ZOOM_STEP);
                trackSelectContent({
                    contentType: 'mermaid_zoom',
                    itemId: activeDiagramId || 'unknown_diagram',
                    itemName: activeDiagramTitle || 'Mermaid Diagram',
                    sectionName: 'mermaid_modal',
                    interactionAction: 'zoom_in',
                    elementType: 'control',
                    elementLabel: 'ZOOM_IN',
                    modalName: 'mermaid-modal',
                    zoom_action: 'in',
                    value: Math.round(zoom * 100)
                });
                return;
            }
            if (action === 'out') {
                setZoom(zoom - ZOOM_STEP);
                trackSelectContent({
                    contentType: 'mermaid_zoom',
                    itemId: activeDiagramId || 'unknown_diagram',
                    itemName: activeDiagramTitle || 'Mermaid Diagram',
                    sectionName: 'mermaid_modal',
                    interactionAction: 'zoom_out',
                    elementType: 'control',
                    elementLabel: 'ZOOM_OUT',
                    modalName: 'mermaid-modal',
                    zoom_action: 'out',
                    value: Math.round(zoom * 100)
                });
                return;
            }
            zoom = 1;
            applyZoom();
            scheduleCenterModalView();

            trackSelectContent({
                contentType: 'mermaid_zoom',
                itemId: activeDiagramId || 'unknown_diagram',
                itemName: activeDiagramTitle || 'Mermaid Diagram',
                sectionName: 'mermaid_modal',
                interactionAction: 'zoom_reset',
                elementType: 'control',
                elementLabel: 'ZOOM_RESET',
                modalName: 'mermaid-modal',
                zoom_action: 'reset',
                value: 100
            });
        });
    });

    modalContent.addEventListener('wheel', (event) => {
        if (!modal.classList.contains('is-open') || !activeSvg || !activeViewport || !event.ctrlKey) {
            return;
        }
        const eventTarget = event.target;
        if (!(eventTarget instanceof Node) || !activeViewport.contains(eventTarget)) {
            return;
        }
        event.preventDefault();
        if (event.deltaY < 0) {
            setZoom(zoom + ZOOM_STEP);
            return;
        }
        setZoom(zoom - ZOOM_STEP);
    }, { passive: false });

    modalContent.addEventListener('pointerdown', (event) => {
        if (!modal.classList.contains('is-open') || !activeSvg || !activeViewport || zoom <= 1.001) {
            return;
        }
        if (event.button !== 0) {
            return;
        }
        const eventTarget = event.target;
        if (!(eventTarget instanceof Element)) {
            return;
        }
        if (!activeViewport.contains(eventTarget)) {
            return;
        }
        isPanning = true;
        panStartX = event.clientX;
        panStartY = event.clientY;
        panStartScrollLeft = activeViewport.scrollLeft;
        panStartScrollTop = activeViewport.scrollTop;
        activeViewport.classList.add('is-panning');
        event.preventDefault();
    });

    modalContent.addEventListener('pointermove', (event) => {
        if (!isPanning || !activeViewport) {
            return;
        }
        const deltaX = event.clientX - panStartX;
        const deltaY = event.clientY - panStartY;
        activeViewport.scrollLeft = panStartScrollLeft - deltaX;
        activeViewport.scrollTop = panStartScrollTop - deltaY;
        event.preventDefault();
    });

    modalContent.addEventListener('pointerup', endPan);
    modalContent.addEventListener('pointercancel', endPan);
    modalContent.addEventListener('pointerleave', (event) => {
        if (isPanning && !(event.buttons & 1)) {
            endPan();
        }
    });

    targets.forEach((target) => {
        target.classList.add('mermaid-zoom-target');
        target.setAttribute('tabindex', '0');
        target.setAttribute('role', 'button');
        const videoId = target.getAttribute('data-youtube-video-id') || '';
        if (videoId) {
            target.setAttribute('aria-label', 'Open expanded Mermaid diagram and play linked YouTube video');
            setupHoverPreview(target, videoId);
        } else {
            target.setAttribute('aria-label', 'Open expanded Mermaid diagram');
        }

        target.addEventListener('click', () => openModal(target));
        target.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(target);
            }
        });
    });

    modal.querySelectorAll('[data-mermaid-close]').forEach((closeButton) => {
        closeButton.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('is-open')) {
            return;
        }
        if (event.key === 'Escape') {
            closeModal();
            return;
        }
        if (event.key === '+' || event.key === '=') {
            event.preventDefault();
            setZoom(zoom + ZOOM_STEP);
            return;
        }
        if (event.key === '-' || event.key === '_') {
            event.preventDefault();
            setZoom(zoom - ZOOM_STEP);
            return;
        }
        if (event.key === '0') {
            event.preventDefault();
            zoom = 1;
            applyZoom();
            scheduleCenterModalView();
        }
    });
}

const analyticsSession = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
    pageType: 'portfolio_hub',
    pageStartedAt: Date.now(),
    visibleStartedAt: document.visibilityState === 'hidden' ? 0 : Date.now(),
    visibleDurationMs: 0,
    maxScrollPercent: 0,
    ended: false
};

function pushDataLayerEvent(payload) {
    if (!payload || typeof payload !== 'object') {
        return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
}

export function detectLinkType(href) {
    const target = String(href || '').trim().toLowerCase();
    if (!target) {
        return 'unknown';
    }
    if (target.startsWith('mailto:')) {
        return 'mailto';
    }
    if (target.startsWith('#')) {
        return 'anchor';
    }
    if (target.startsWith('http://') || target.startsWith('https://')) {
        return 'external';
    }
    return 'internal';
}

function inferDestinationPageType(destinationUrl) {
    const raw = String(destinationUrl || '').trim();
    if (!raw) {
        return '';
    }

    const linkType = detectLinkType(raw);
    if (linkType === 'anchor') {
        return analyticsSession.pageType;
    }
    if (linkType === 'mailto') {
        return 'contact';
    }

    let parsedUrl;
    try {
        parsedUrl = new URL(raw, window.location.href);
    } catch {
        return linkType === 'external' ? 'external' : analyticsSession.pageType;
    }

    if (parsedUrl.origin !== window.location.origin) {
        return 'external';
    }

    const normalizedPath = String(parsedUrl.pathname || '').toLowerCase();
    if (!normalizedPath || normalizedPath === '/') {
        return analyticsSession.pageType;
    }
    if (
        normalizedPath === '/portfolio/' ||
        normalizedPath === '/portfolio/index.html' ||
        normalizedPath === '/portfolio'
    ) {
        return 'portfolio_hub';
    }
    if (normalizedPath.includes('-portfolio') || normalizedPath.includes('/docs/')) {
        return 'portfolio';
    }
    return analyticsSession.pageType;
}

export function trackSelectContent({
    contentType,
    itemId,
    itemName,
    sectionName,
    interactionAction = 'click',
    elementType,
    elementLabel,
    linkUrl,
    linkType,
    modalName,
    value,
    sourceEvent = 'ui_click',
    ...extra
}) {
    const resolvedDestinationUrl = String(linkUrl || extra.destination_url || '').trim();
    const payload = {
        event: 'select_content',
        tracking_version: '2026-03-ga4-unified-v1',
        session_id: analyticsSession.id,
        page_path: window.location.pathname,
        page_title: document.title,
        page_type: analyticsSession.pageType,
        source_page_type: analyticsSession.pageType,
        content_type: contentType || 'unknown',
        item_id: itemId || 'unknown',
        section_name: sectionName || 'unknown',
        interaction_action: interactionAction,
        source_event: sourceEvent
    };

    if (itemName) {
        payload.item_name = itemName;
    }
    if (elementType) {
        payload.element_type = elementType;
    }
    if (elementLabel) {
        payload.element_label = elementLabel;
    }
    if (linkUrl) {
        payload.link_url = linkUrl;
    }
    if (linkType) {
        payload.link_type = linkType;
    }
    if (resolvedDestinationUrl) {
        payload.destination_url = resolvedDestinationUrl;
        payload.destination_page_type = inferDestinationPageType(resolvedDestinationUrl);
    }
    if (modalName) {
        payload.modal_name = modalName;
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
        payload.value = value;
    }

    Object.entries(extra).forEach(([key, valueItem]) => {
        if (valueItem !== undefined && valueItem !== null && valueItem !== '') {
            payload[key] = valueItem;
        }
    });

    pushDataLayerEvent(payload);
}

function readScrollPercent() {
    const documentElement = document.documentElement;
    const maxScrollable = Math.max(0, documentElement.scrollHeight - window.innerHeight);
    if (maxScrollable <= 0) {
        return 100;
    }
    const ratio = (window.scrollY / maxScrollable) * 100;
    return Math.max(0, Math.min(100, Math.round(ratio)));
}

function updateMaxScrollPercent() {
    analyticsSession.maxScrollPercent = Math.max(analyticsSession.maxScrollPercent, readScrollPercent());
}

function stopVisibleTimer(timestamp = Date.now()) {
    if (!analyticsSession.visibleStartedAt) {
        return;
    }
    analyticsSession.visibleDurationMs += Math.max(0, timestamp - analyticsSession.visibleStartedAt);
    analyticsSession.visibleStartedAt = 0;
}

function startVisibleTimer(timestamp = Date.now()) {
    if (document.visibilityState === 'hidden' || analyticsSession.visibleStartedAt) {
        return;
    }
    analyticsSession.visibleStartedAt = timestamp;
}

function endAnalyticsSession(reason = 'pagehide') {
    if (analyticsSession.ended) {
        return;
    }
    analyticsSession.ended = true;

    updateMaxScrollPercent();
    stopVisibleTimer();

    const totalDurationMs = Math.max(0, Date.now() - analyticsSession.pageStartedAt);
    const visibleDurationMs = Math.min(totalDurationMs, analyticsSession.visibleDurationMs);
    const hiddenDurationMs = Math.max(0, totalDurationMs - visibleDurationMs);

    trackSelectContent({
        contentType: 'page_engagement',
        itemId: 'portfolio_page',
        itemName: document.title || 'Portfolio',
        sectionName: 'lifecycle',
        interactionAction: 'end',
        elementType: 'page',
        elementLabel: 'PAGE_END',
        duration_ms: totalDurationMs,
        engagement_time_msec: visibleDurationMs,
        hidden_duration_ms: hiddenDurationMs,
        max_scroll_percent: analyticsSession.maxScrollPercent,
        end_reason: reason,
        sourceEvent: 'lifecycle',
        value: Math.round(visibleDurationMs / 1000)
    });
}

export function setupAnalyticsLifecycle() {
    updateMaxScrollPercent();

    trackSelectContent({
        contentType: 'page_engagement',
        itemId: 'portfolio_page',
        itemName: document.title || 'Portfolio',
        sectionName: 'lifecycle',
        interactionAction: 'start',
        elementType: 'page',
        elementLabel: 'PAGE_START',
        sourceEvent: 'lifecycle'
    });

    window.addEventListener('scroll', updateMaxScrollPercent, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (analyticsSession.ended) {
            return;
        }

        if (document.visibilityState === 'hidden') {
            stopVisibleTimer();
            trackSelectContent({
                contentType: 'page_visibility',
                itemId: 'portfolio_page',
                itemName: document.title || 'Portfolio',
                sectionName: 'lifecycle',
                interactionAction: 'hidden',
                elementType: 'page',
                elementLabel: 'PAGE_HIDDEN',
                sourceEvent: 'lifecycle'
            });
            return;
        }

        startVisibleTimer();
        trackSelectContent({
            contentType: 'page_visibility',
            itemId: 'portfolio_page',
            itemName: document.title || 'Portfolio',
            sectionName: 'lifecycle',
            interactionAction: 'visible',
            elementType: 'page',
            elementLabel: 'PAGE_VISIBLE',
            sourceEvent: 'lifecycle'
        });
    });

    window.addEventListener('pagehide', () => endAnalyticsSession('pagehide'));
    window.addEventListener('beforeunload', () => endAnalyticsSession('beforeunload'));
}

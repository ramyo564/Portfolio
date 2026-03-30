export function extractYouTubeVideoId(urlOrId) {
    const rawValue = String(urlOrId ?? '').trim();
    if (!rawValue) {
        return '';
    }

    const videoIdPattern = /^[a-zA-Z0-9_-]{11}$/;
    if (videoIdPattern.test(rawValue)) {
        return rawValue;
    }

    let parsedUrl;
    try {
        parsedUrl = new URL(rawValue);
    } catch {
        return '';
    }

    const host = parsedUrl.hostname.toLowerCase();
    if (host === 'youtu.be') {
        const shortId = parsedUrl.pathname.split('/').filter(Boolean)[0] ?? '';
        return videoIdPattern.test(shortId) ? shortId : '';
    }

    if (host.includes('youtube.com') || host.includes('youtube-nocookie.com')) {
        const watchId = parsedUrl.searchParams.get('v') ?? '';
        if (videoIdPattern.test(watchId)) {
            return watchId;
        }

        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
        const knownMarkers = ['embed', 'shorts', 'live', 'v'];
        const markerIndex = pathSegments.findIndex((segment) => knownMarkers.includes(segment));
        if (markerIndex >= 0) {
            const candidate = pathSegments[markerIndex + 1] ?? '';
            if (videoIdPattern.test(candidate)) {
                return candidate;
            }
        }

        const lastSegment = pathSegments[pathSegments.length - 1] ?? '';
        if (videoIdPattern.test(lastSegment)) {
            return lastSegment;
        }
    }

    return '';
}

export function resolveYouTubeVideoId(source) {
    if (!source || typeof source !== 'object') {
        return '';
    }

    const candidates = [];
    if (source.youtubeId) {
        candidates.push(source.youtubeId);
    }
    if (source.youtubeUrl) {
        candidates.push(source.youtubeUrl);
    }

    const links = Array.isArray(source.links) ? source.links : [];
    links.forEach((item) => {
        if (item?.href) {
            candidates.push(item.href);
        }
    });

    for (let index = 0; index < candidates.length; index += 1) {
        const videoId = extractYouTubeVideoId(candidates[index]);
        if (videoId) {
            return videoId;
        }
    }

    return '';
}

export function setYouTubeDataAttribute(target, source) {
    if (!(target instanceof HTMLElement)) {
        return;
    }
    const videoId = resolveYouTubeVideoId(source);
    if (videoId) {
        target.setAttribute('data-youtube-video-id', videoId);
        return;
    }
    target.removeAttribute('data-youtube-video-id');
}

export function buildYouTubeEmbedUrl(videoId, options = {}) {
    const autoplay = options.autoplay ? '1' : '0';
    const mute = options.mute ? '1' : '0';
    const controls = options.controls === false ? '0' : '1';
    const loop = options.loop ? '1' : '0';
    const playlist = loop === '1' ? `&playlist=${encodeURIComponent(videoId)}` : '';

    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=${autoplay}&mute=${mute}&controls=${controls}&rel=0&modestbranding=1&playsinline=1&loop=${loop}${playlist}`;
}

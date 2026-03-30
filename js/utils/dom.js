export function byId(id) {
    return document.getElementById(id);
}

export function normalizeHashTarget(target) {
    if (!target) {
        return '#';
    }
    return target.startsWith('#') ? target : `#${target}`;
}

export function toSafeLabel(value) {
    return String(value ?? 'unknown').replace(/[^a-zA-Z0-9_-]+/g, ' ').trim() || 'unknown';
}

export function setText(id, value) {
    const el = byId(id);
    if (el && value) {
        el.textContent = value;
    }
}

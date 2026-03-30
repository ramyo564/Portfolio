import { byId } from '../utils/dom.js';
import { trackSelectContent } from '../analytics/tracking.js';

export function setupUptime() {
    const uptimeElement = byId('uptime');
    if (!uptimeElement) {
        return;
    }

    const startTime = new Date();
    const updateUptime = () => {
        const now = new Date();
        const diff = Math.floor((now - startTime) / 1000);
        const h = Math.floor(diff / 3600).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
        const s = (diff % 60).toString().padStart(2, '0');
        uptimeElement.textContent = `${h}:${m}:${s}`;
    };

    updateUptime();
    setInterval(updateUptime, 1000);
}

export function setupMobileNav() {
    const nav = byId('header-nav');
    const toggle = document.querySelector('.nav-toggle');
    if (!nav || !toggle) {
        return;
    }

    const closeNav = () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    const openNav = () => {
        nav.classList.add('is-open');
        toggle.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        if (nav.classList.contains('is-open')) {
            closeNav();
        } else {
            openNav();
            trackSelectContent({
                contentType: 'navigation',
                itemId: 'header_nav',
                itemName: 'Header Navigation',
                sectionName: 'header',
                interactionAction: 'open_navigation',
                elementType: 'button',
                elementLabel: 'NAV_TOGGLE'
            });
        }
    });

    nav.addEventListener('click', (event) => {
        const target = event.target;
        if (
            target instanceof HTMLElement &&
            (target.classList.contains('nav-item') || target.classList.contains('nav-sub-item'))
        ) {
            closeNav();
        }
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Node)) {
            return;
        }
        if (!nav.contains(target) && !toggle.contains(target)) {
            closeNav();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNav();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeNav();
        }
    });
}

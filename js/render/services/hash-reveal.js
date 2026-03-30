import { byId } from '../../utils/dom.js';
import { trackSelectContent } from '../../analytics/tracking.js';

let caseShowcaseControllers = [];

export function resetCaseShowcaseControllers() {
    caseShowcaseControllers = [];
}

export function registerCaseShowcaseController(controller) {
    if (!controller || typeof controller.revealCase !== 'function') {
        return;
    }
    caseShowcaseControllers.push(controller);
}

function ensureCaseCardVisible(targetId) {
    const anchorId = String(targetId || '').replace(/^#/, '').trim();
    if (!anchorId || caseShowcaseControllers.length === 0) {
        return false;
    }

    let revealed = false;
    caseShowcaseControllers.forEach((controller) => {
        if (controller.revealCase(anchorId, 'anchor_navigation')) {
            revealed = true;
        }
    });
    return revealed;
}

export function revealHashTarget(hashValue, triggerSource = 'hash_navigation') {
    const targetId = String(hashValue || '').replace(/^#/, '').trim();
    if (!targetId) {
        return;
    }

    ensureCaseCardVisible(targetId);

    window.setTimeout(() => {
        const target = byId(targetId) || byId(`brief-${targetId}`);
        if (!target) {
            return;
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        target.classList.remove('is-target-highlight');
        void target.offsetWidth;
        target.classList.add('is-target-highlight');

        if (target.classList.contains('section-recruiter-card')) {
            target.classList.add('is-expanded');
        }

        const showcaseId = target.closest('.service-section')?.id || '';
        trackSelectContent({
            contentType: 'hash_target_reveal',
            itemId: targetId,
            itemName: target.querySelector('.card-title, .section-recruiter-card-title')?.textContent?.trim() || targetId,
            sectionName: 'service_section',
            interactionAction: 'reveal_target',
            elementType: 'section',
            elementLabel: 'HASH_TARGET_REVEAL',
            trigger_source: triggerSource,
            showcase_id: showcaseId
        });
    }, 100);
}

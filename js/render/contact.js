import { byId, setText } from '../utils/dom.js';
import { detectLinkType, trackSelectContent } from '../analytics/tracking.js';

export function renderContact(templateConfig) {
    const contact = templateConfig.contact ?? {};
    const section = byId('contact');
    const actions = byId('contact-actions');

    if (section && contact.sectionId) {
        section.id = contact.sectionId;
    }
    setText('contact-panel-title', contact.panelTitle);
    setText('contact-panel-uid', contact.panelUid);
    setText('contact-description', contact.description);

    if (!actions) {
        return;
    }
    actions.replaceChildren();

    const items = Array.isArray(contact.actions) ? contact.actions : [];
    items.forEach((item) => {
        const action = document.createElement('a');
        action.className = 'action-btn';
        action.href = item.href || '#';
        action.textContent = item.label || 'LINK';
        if (!String(item.href || '').startsWith('mailto:')) {
            action.target = '_blank';
            action.rel = 'noopener noreferrer';
        }

        action.addEventListener('click', () => {
            trackSelectContent({
                contentType: 'contact_action',
                itemId: item.label || 'CONTACT_LINK',
                itemName: item.label || 'Contact',
                sectionName: contact.sectionId || 'contact',
                interactionAction: 'open_link',
                elementType: 'button',
                elementLabel: item.label || 'LINK',
                linkUrl: item.href,
                linkType: detectLinkType(item.href),
                link_label: item.label || 'LINK'
            });
        });

        actions.appendChild(action);
    });
}

import { byId } from '../../utils/dom.js';
import { createGroupDivider, createServiceCard } from './card-builders.js';
import { createSectionRecruiterBrief } from './recruiter-brief.js';
import { setupCaseShowcaseControls } from './showcase-controls.js';
import {
    registerCaseShowcaseController,
    resetCaseShowcaseControllers,
    revealHashTarget
} from './hash-reveal.js';

export { revealHashTarget };

export function renderServiceSections(templateConfig) {
    const container = byId('service-sections');
    if (!container) {
        return;
    }
    container.replaceChildren();
    resetCaseShowcaseControllers();

    const sections = Array.isArray(templateConfig.serviceSections) ? templateConfig.serviceSections : [];
    sections.forEach((sectionConfig) => {
        const sectionWrapper = document.createElement('section');
        sectionWrapper.className = 'service-section';
        sectionWrapper.id = sectionConfig.id ?? '';

        const header = document.createElement('div');
        header.className = 'section-header';
        const heading = document.createElement('h2');
        heading.className = 'section-title';
        heading.textContent = sectionConfig.title ?? 'SERVICES';
        header.appendChild(heading);

        const recruiterBrief = createSectionRecruiterBrief(sectionConfig, {
            onRevealHashTarget: revealHashTarget
        });

        const groupsContainer = document.createElement('div');
        groupsContainer.className = 'service-groups';

        const renderedCards = [];

        const groups = Array.isArray(sectionConfig.groups) && sectionConfig.groups.length > 0
            ? sectionConfig.groups
            : [{ title: '', desc: '', cards: sectionConfig.cards ?? [] }];

        groups.forEach((group) => {
            const groupSection = document.createElement('div');
            groupSection.className = 'service-group';

            if (group.title || group.desc) {
                groupSection.appendChild(createGroupDivider(group, sectionConfig.theme));
            }

            const groupGrid = document.createElement('div');
            groupGrid.className = 'service-grid';

            const cards = Array.isArray(group.cards) ? group.cards : [];
            cards.forEach((card) => {
                const cardElement = createServiceCard(card, sectionConfig);
                groupGrid.appendChild(cardElement);

                const anchorId = String(card?.anchorId || cardElement.id || '').trim();
                renderedCards.push({ anchorId, element: cardElement });
            });

            groupSection.appendChild(groupGrid);
            groupsContainer.appendChild(groupSection);
        });

        const showcaseController = setupCaseShowcaseControls({
            sectionConfig,
            renderedCards,
            recruiterBrief,
            header
        });
        if (showcaseController) {
            registerCaseShowcaseController(showcaseController);
        }

        sectionWrapper.append(header);
        if (recruiterBrief) {
            sectionWrapper.appendChild(recruiterBrief);
        }
        sectionWrapper.appendChild(groupsContainer);
        container.appendChild(sectionWrapper);
    });
}

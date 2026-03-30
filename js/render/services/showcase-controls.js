export function setupCaseShowcaseControls({
    sectionConfig,
    renderedCards,
    recruiterBrief,
    header
}) {
    const featuredCount = Number.parseInt(sectionConfig.featuredCaseCount, 10) || 0;
    const featuredAnchors = Array.isArray(sectionConfig.featuredCaseAnchors)
        ? sectionConfig.featuredCaseAnchors
        : [];
    const featuredSet = new Set(featuredAnchors);
    const canCollapse = featuredCount > 0 || featuredSet.size > 0;

    if (!(canCollapse && renderedCards.length > (featuredCount || featuredSet.size))) {
        return null;
    }

    const controls = document.createElement('div');
    controls.className = 'case-showcase-controls';
    controls.style.marginTop = '1rem';
    controls.style.padding = '0.5rem';
    controls.style.border = '1px dashed var(--border-color)';
    controls.style.borderRadius = '8px';
    controls.style.display = 'flex';
    controls.style.justifyContent = 'space-between';
    controls.style.alignItems = 'center';

    const toggleButton = document.createElement('button');
    toggleButton.className = 'case-showcase-toggle';
    toggleButton.style.padding = '0.4rem 0.8rem';
    toggleButton.style.background = 'rgba(88, 166, 255, 0.1)';
    toggleButton.style.border = '1px solid var(--accent-blue)';
    toggleButton.style.color = 'var(--accent-blue)';
    toggleButton.style.borderRadius = '4px';
    toggleButton.style.cursor = 'pointer';

    let isCollapsed = true;

    const applyVisibility = () => {
        renderedCards.forEach((entry, index) => {
            const isVisible = !isCollapsed
                || (featuredSet.size > 0 ? featuredSet.has(entry.anchorId) : index < featuredCount);
            entry.element.hidden = !isVisible;
        });
        toggleButton.textContent = isCollapsed ? 'SHOW ALL CASES' : 'SHOW FEATURED ONLY';
    };

    toggleButton.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        applyVisibility();
    });

    controls.appendChild(document.createTextNode('CASE SHOWCASE CONTROLS'));
    controls.appendChild(toggleButton);

    if (recruiterBrief) {
        const briefActions = recruiterBrief.querySelector('.section-recruiter-actions');
        if (briefActions) {
            briefActions.appendChild(controls);
        }
    } else {
        header.appendChild(controls);
    }

    applyVisibility();

    return {
        sectionId: sectionConfig.id || '',
        revealCase(anchorId) {
            if (renderedCards.some((entry) => entry.anchorId === anchorId)) {
                isCollapsed = false;
                applyVisibility();
                return true;
            }
            return false;
        }
    };
}

const baseMermaidConfig = {
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'linear'
    }
};

export function initializeMermaid(mermaid, templateConfig) {
    const mermaidConfig = {
        ...baseMermaidConfig,
        ...(templateConfig.mermaid ?? {}),
        flowchart: {
            ...baseMermaidConfig.flowchart,
            ...(templateConfig.mermaid?.flowchart ?? {})
        }
    };

    mermaid.initialize(mermaidConfig);
}

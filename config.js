import { diagrams } from './diagrams.js';

export const templateConfig = {
    system: {
        documentTitle: 'Yohan | Unified Portfolio Hub',
        systemName: 'YOHAN_PORTFOLIO_HUB_V.2026'
    },

    hero: {
        sectionId: 'hub-overview',
        panelTitle: 'PORTFOLIO_HUB_OVERVIEW',
        panelUid: 'ID: HUB-01',
        diagramId: 'portfolio-hub-map',
        intro: '재현 가능한 성능 개선과 운영 자동화를 증거 기반으로 설명하는 백엔드 개발자',
        profileSummaryLines: [
            '실패한 TODO/업무 관리 패턴을 성능, 도메인 규칙, 운영 자동화 관점에서 다시 설계합니다.',
            'Spring Boot, FastAPI, RabbitMQ, Redis 기반으로 대량 읽기/쓰기 트래픽과 비동기 흐름을 튜닝했습니다.',
            '설계 -> 구현 -> 부하테스트(k6) -> 관측(Grafana/로그) -> 배포/문서화까지 단독으로 끝까지 가져갑니다.'
        ],
        statCards: [
            { label: 'AUTH GATE', value: '3 -> 1', delta: '-67%' },
            { label: 'READ p95', value: '712ms -> 141ms', delta: '-80%' },
            { label: 'READ RPS', value: '1.55k -> 3.68k', delta: '+137%' },
            { label: 'WRITE p95', value: '3.4s -> 126ms', delta: '-96%' },
            { label: 'WRITE RPS', value: '203.7 -> 915.7', delta: '+350%' }
        ],
        quickLinks: [
            { label: 'PROBLEM_SOLVING_PAGE', href: 'https://ramyo564.github.io/L_N_Project-portfolio/', variant: 'primary' }
        ],
        statNote: '최신 반영: 2026-03-02 · 기준: Life Navigation problem solving · k6/Grafana 실측 증거',
        diagramNotes: [
            '프로젝트 간 관계 지도는 버튼으로 계층화해 확인할 수 있습니다.',
            'PROBLEM_SOLVING Page에서는 Case 1~6 문제 해결 흐름과 측정 증거를 확인할 수 있습니다.'
        ],
        metrics: [
            '30초 스캔 1) Case 2: JWT Claims + AOP 권한 게이트로 대표 단일 요청 기본 권한 게이트 3 -> 1로 축소.',
            '30초 스캔 2) Case 5: 비동기 발행 분리로 http_req_failed.rate 0.93% -> 0%, p95 488ms -> 124ms.',
            '30초 스캔 3) 통합 튜닝으로 read RPS 1.55k -> 3.68k, write RPS 203.7 -> 915.7, read p95 712ms -> 141ms (2026-03-02 기준).'
        ]
    },

    navigation: [
        { label: 'OVERVIEW', target: '#hub-overview' },
        { label: 'PROJ_HUB', target: '#project-hub' },
        { label: 'TIMELINE', target: '#project-timeline' },
        { label: 'SKILL_SET', target: '#skills' },
        { label: 'CONTACT', target: '#contact' }
    ],

    topPanels: [
        {
            sectionId: 'project-timeline',
            panelTitle: 'DELIVERY_TIMELINE',
            panelUid: 'ID: HUB-02',
            diagramId: 'release-timeline-map',
            navLabel: 'TIMELINE',
            metrics: [
                '2025.09 - 현재 | Life Navigation을 문제-원인-해결-결과 구조로 고도화하고 성능/비동기 증거를 표준화',
                '2024.05 - 2024.08 | Hoops에서 실시간 매칭/알림 팀 기반 서비스 구현 및 CI/CD 자동화',
                '2023.05 - 2024.01 | Python, Django 기반 상거래 및 실시간 경매 플랫폼 개발'
            ]
        }
    ],

    skills: {
        sectionId: 'skills',
        panelTitle: 'SKILL_SET',
        panelUid: 'ID: STACK-01',
        items: [
            { title: 'BACKEND', stack: 'Java 17/21, Spring Boot 3, Python 3.11, FastAPI' },
            { title: 'ASYNC', stack: 'RabbitMQ' },
            { title: 'DATA', stack: 'PostgreSQL, MariaDB, Redis, Qdrant, ORM/JPA' },
            { title: 'FRONTEND', stack: 'React, TypeScript, RTK Query, Turborepo' },
            { title: 'DEVOPS', stack: 'Docker, Docker Compose, GitHub Actions, Nginx, Cloudflare, WireGuard' },
            { title: 'QUALITY', stack: 'k6, Prometheus, Grafana, pytest, JUnit, Test Containers' }
        ]
    },

    serviceSections: [
        {
            id: 'project-hub',
            title: 'PROJECT_HUB',
            navLabel: 'PROJECT_HUB',
            theme: 'blue',
            cardVisualHeight: '260px',
            cardClass: 'project-card',
            recruiterBrief: {
                kicker: 'RECRUITER_QUICK_BRIEF',
                title: '30초 요약으로 먼저 보는 핵심 경험',
                cases: [
                    {
                        id: 'Life Nav',
                        anchorId: 'ln-featured',
                        title: '성능 최적화 및 비동기 전환',
                        problem: '고부하 시 응답 지연 및 에러율 상승',
                        action: '인증 게이트 축소(3->1) 및 Outbox 기반 비동기 발행 분리',
                        impact: '읽기 RPS 137%↑, 쓰기 p95 96%↓, 에러율 0%'
                    },
                    {
                        id: 'Hoops',
                        anchorId: 'hoops-featured',
                        title: '운영 자동화 및 비용 절감',
                        problem: '수동 배포(15분+) 및 높은 인프라 비용',
                        action: 'CI/CD 파이프라인 구축 및 Docker 이미지 최적화',
                        impact: '배포 3분 이내 단축, 운영 비용 80% 절감'
                    }
                ]
            },
            groups: [
                {
                    title: 'SUMMARY + PROBLEM SOLVING TRACK',
                    // desc: '모든 카드를 문제 정의 -> 기간/역할 -> 결과 -> 스택 순서로 통일했습니다.',
                    cards: [
                        {
                            mermaidId: 'ln-project-architecture',
                            anchorId: 'ln-featured',
                            cardClass: 'project-featured',
                            cardVisualHeight: '280px',
                            title: '실패한 TODO/업무 습관을 분석해 다음 실행 계획으로 재구성하는 AI 서비스 (Life Navigation)',
                            // youtubeUrl: 'https://www.youtube.com/watch?v=TD6FPndjhoE',
                            subtitle: 'Life Navigation · 개인 · 2025.09 - 진행 중(최신 반영 2026-03-02) · 역할: 백엔드 중심(성능/트랜잭션/비동기) + 운영 자동화/증거 문서화',
                            // overview: '결과: 대표 단일 요청 권한 게이트 3->1, Case5 failed rate 0.93%->0%·p95 488ms->124ms, write RPS 203.7->915.7, write p95 3.4s->126ms, read RPS 1.55k->3.68k, read p95 712ms->141ms',
                            stackSummary: 'Spring Boot, PostgreSQL, Redis, RabbitMQ, Flyway, k6',
                            skills: ['Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Flyway', 'k6'],
                            highlights: [
                                '인증 경로 최적화: 대표 요청 권한 게이트 3→1, 비동기 발행 전환으로 failed rate 0%',
                                '통합 성능 최적화: 읽기 RPS 1.55k→3.68k, 쓰기 RPS 203.7→915.7 (500VU baseline)',
                                '6건의 Problem Solving(Case A,B,C 압축)과 k6/Grafana 실측 증거 → PROBLEM_SOLVING 페이지에서 확인'
                            ],
                            links: [
                                { label: 'PROBLEM_SOLVING', href: 'https://ramyo564.github.io/L_N_Project-portfolio/', variant: 'primary' }
                            ]
                        },
                        {
                            mermaidId: 'hoops-architecture',
                            anchorId: 'hoops-featured',
                            cardClass: 'project-featured',
                            cardVisualHeight: '280px',
                            title: '실시간 매칭/알림 - 농구 소셜 플랫폼 서비스 (Hoops)',
                            subtitle: '팀(BE 4 / FE 3) · 2024.04 - 2024.08 · 역할: 백엔드 설계/구현 + CI/CD 자동화',
                            // overview: '결과: 배포 15분+ 수동 -> 3분 이내 자동화, Docker 이미지 600MB -> 250MB, AWS 운영 비용 약 80% 절감',
                            stackSummary: 'Spring Boot, WebSocket, SSE, MariaDB, Redis, Docker, GitHub Actions, AWS',
                            skills: ['Spring Boot', 'WebSocket', 'SSE', 'MariaDB', 'Redis', 'Docker', 'GitHub Actions', 'AWS'],
                            highlights: [
                                '배포 시간 15분+ 수동 프로세스에서 3분 이내 자동화로 단축',
                                'Docker 이미지 600MB -> 250MB 최적화',
                                'AWS 운영 비용 약 80% 절감'
                            ],
                            links: [
                                { label: 'PROBLEM_SOLVING', href: 'https://ramyo564.github.io/Hoops-portfolio/', variant: 'primary' }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    contact: {
        sectionId: 'contact',
        panelTitle: 'CONTACT',
        panelUid: 'ID: COMMS-01',
        description: '협업 제안이나 기술 문의는 아래 링크로 연락 주세요.',
        actions: [
            { label: 'EMAIL', href: 'mailto:yohan032yohan@gmail.com' },
            { label: 'GITHUB', href: 'https://github.com/ramyo564' }
        ]
    },

    mermaid: {
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'Inter',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'linear'
        }
    },

    diagrams
};

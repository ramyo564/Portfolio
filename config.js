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
        metrics: [
            '프로젝트별 구조 페이지(Architecture)와 문제해결 페이지(Case Study)를 한 곳에서 탐색할 수 있도록 구성했습니다.',
            '각 카드에서 서비스 구성, 트러블슈팅, 코드 근거, 저장소 링크를 즉시 이동할 수 있습니다.',
            '읽기 순서는 Project Hub -> Cross Project Comparison -> Timeline을 권장합니다.'
        ]
    },

    navigation: [
        { label: 'OVERVIEW', target: '#hub-overview' },
        { label: 'PROJECT_HUB', target: '#project-hub' },
        { label: 'COMPARE', target: '#cross-project-comparison' },
        { label: 'TIMELINE', target: '#project-timeline' },
        { label: 'SKILL_SET', target: '#skills' },
        { label: 'CONTACT', target: '#contact' }
    ],

    topPanels: [
        {
            sectionId: 'cross-project-comparison',
            panelTitle: 'CROSS_PROJECT_COMPARISON',
            panelUid: 'ID: HUB-02',
            diagramId: 'comparison-axis-map',
            navLabel: 'COMPARE',
            metrics: [
                'MESSAGING / PERFORMANCE: RabbitMQ 비동기 발행, 배치 처리, p95 및 RPS 개선 사례를 통합 비교합니다.',
                'IDENTITY / AUTH: JWT Claims 경량화, 접근 게이트, 인증/인가 경로의 일관성 개선을 비교합니다.',
                'CACHE / TRANSACTION: Redis pending key, readOnly 분리, idle transaction 제거 전략을 프로젝트별로 확인합니다.',
                'DEPLOYMENT / COST: Docker 최적화, GitHub Actions, 클라우드 마이그레이션 기반 운영 효율 개선을 비교합니다.'
            ]
        },
        {
            sectionId: 'project-timeline',
            panelTitle: 'DELIVERY_TIMELINE',
            panelUid: 'ID: HUB-03',
            diagramId: 'release-timeline-map',
            navLabel: 'TIMELINE',
            metrics: [
                '2023: Upgrade_Django4로 인증/결제/운영 배포 흐름을 단독 구축했습니다.',
                '2024: Hoops와 realtime_auction에서 팀 기반 실시간 서비스 운영 경험을 확장했습니다.',
                '2025~현재: L_N_Project에서 구조 개선과 성능 튜닝을 반복해 제품 안정성을 강화하고 있습니다.'
            ]
        }
    ],

    skills: {
        sectionId: 'skills',
        panelTitle: 'SKILL_SET',
        panelUid: 'ID: STACK-01',
        items: [
            { title: 'BACKEND', stack: 'Java 17/21, Spring Boot 3, Python 3.11, Django 4, FastAPI' },
            { title: 'REALTIME & ASYNC', stack: 'WebSocket/STOMP, SSE, Django Channels, Celery, RabbitMQ' },
            { title: 'DATA', stack: 'PostgreSQL, MariaDB, Redis, SQLite, Qdrant, ORM/JPA' },
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
            groups: [
                {
                    title: 'ARCHITECTURE + PROBLEM SOLVING TRACK',
                    desc: '각 프로젝트에서 구성 설명 페이지와 케이스 페이지를 2트랙으로 분리해 연결합니다.',
                    cards: [
                        {
                            mermaidId: 'ln-project-architecture',
                            title: 'L_N_Project (Life Navigation)',
                            subtitle: '개인 프로젝트 · 2025.04 - 현재',
                            overview: '실패한 TODO 원인을 분석하고 다음 실행 계획으로 재구성하는 서비스입니다.',
                            role: 'BE/FE/DevOps 전 영역 설계, 구현, 운영 자동화',
                            skills: ['Spring Boot', 'FastAPI', 'React', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Qdrant', 'Docker'],
                            highlights: [
                                'READ p95 975ms -> 141ms (-86%), WRITE p95 1.9s -> 126ms (-93%)',
                                'READ RPS +279%, WRITE RPS +146% 개선',
                                'AWS 비용을 홈서버 전환으로 절감'
                            ],
                            links: [
                                { label: 'ARCHITECTURE', href: 'https://ramyo564.github.io/L_N_Project/', variant: 'primary' },
                                { label: 'CASE_STUDY', href: 'https://ramyo564.github.io/L_N_Project-portfolio/', variant: 'secondary' },
                                { label: 'GITHUB', href: 'https://github.com/ramyo564/L_N_Project', variant: 'ghost' }
                            ]
                        },
                        {
                            mermaidId: 'hoops-architecture',
                            title: 'Hoops',
                            subtitle: '팀 프로젝트(BE 4명 / FE 3명) · 2024.04 - 2024.08',
                            overview: '위치 기반 실시간 농구 매칭 서비스로 소셜/채팅/신고·관리 기능을 통합한 플랫폼입니다.',
                            role: '백엔드 설계 및 구현, CI/CD 자동화, 인프라 비용/배포 최적화',
                            skills: ['Spring Boot', 'WebSocket', 'SSE', 'MariaDB', 'Redis', 'Docker', 'GitHub Actions', 'AWS'],
                            highlights: [
                                '배포 시간 15분+ 수동 프로세스에서 3분 이내 자동화로 단축',
                                'Docker 이미지 600MB -> 250MB 최적화',
                                'AWS 운영 비용 약 80% 절감'
                            ],
                            links: [
                                { label: 'ARCHITECTURE', href: 'https://ramyo564.github.io/Hoops/', variant: 'primary' },
                                { label: 'CASE_STUDY', href: 'https://ramyo564.github.io/Hoops-portfolio/', variant: 'secondary' },
                                { label: 'GITHUB', href: 'https://github.com/ramyo564/Hoops', variant: 'ghost' },
                                { label: 'TEAM_REPO', href: 'https://github.com/hoops-project', variant: 'ghost' }
                            ]
                        },
                        {
                            mermaidId: 'realtime-auction-architecture',
                            title: 'realtime_auction',
                            subtitle: '팀 프로젝트(BE 4명) · 2023.09 - 2024.11',
                            overview: 'WebSocket 입찰, Celery 기반 경매 라이프사이클, 결제/채팅을 연결한 경매 플랫폼입니다.',
                            role: '결제 흐름, 검색/모델링 최적화, 상품 API 안정성 강화',
                            skills: ['Django', 'DRF', 'Channels', 'Celery', 'Redis', 'KakaoPay API', 'django-mptt', 'JWT'],
                            highlights: [
                                '입찰 동시성 제어로 최고가 업데이트 정합성 확보',
                                '결제 ready/approval 상태 연결 및 만료 정리 로직 구현',
                                '상품 검색과 카테고리 모델링 개선으로 운영성 향상'
                            ],
                            links: [
                                { label: 'ARCHITECTURE', href: 'https://ramyo564.github.io/realtime_auction/', variant: 'primary' },
                                { label: 'CASE_STUDY', href: 'https://ramyo564.github.io/realtime_auction-portfolio/', variant: 'secondary' },
                                { label: 'GITHUB', href: 'https://github.com/ramyo564/realtime_auction', variant: 'ghost' }
                            ]
                        },
                        {
                            mermaidId: 'upgrade-django-architecture',
                            title: 'Upgrade_Django4',
                            subtitle: '개인 프로젝트 · 2023.05 - 2023.06',
                            overview: 'Django 기반 쇼핑몰 프로젝트로 인증/결제/주문/배포의 전체 흐름을 구현했습니다.',
                            role: '기획부터 구현, 배포까지 단독 진행',
                            skills: ['Django 4.2', 'PostgreSQL', 'PayPal', 'KakaoPay', 'AWS EB', 'S3', 'Route53'],
                            highlights: [
                                '세션 카트 병합과 주문 완료 흐름을 단일 계약으로 정리',
                                'SQLite -> PostgreSQL 데이터 마이그레이션 수행',
                                '이메일 인증 + honeypot 기반 인증 보안 강화'
                            ],
                            links: [
                                { label: 'ARCHITECTURE', href: 'https://ramyo564.github.io/Upgrade_Django4/', variant: 'primary' },
                                { label: 'CASE_STUDY', href: 'https://ramyo564.github.io/Upgrade_Django4-portfolio/', variant: 'secondary' },
                                { label: 'GITHUB', href: 'https://github.com/ramyo564/Upgrade_Django4', variant: 'ghost' }
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

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
        statCards: [
            { label: 'AUTH QUERIES', value: '21 -> 3', delta: '-86%' },
            { label: 'WRITE p95', value: '500ms -> 50ms', delta: '-90%' },
            { label: 'WRITE RPS', value: '373 -> 916', delta: '+146%' }
        ],
        quickLinks: [
            { label: 'FEATURED_L_N', href: '#ln-featured', variant: 'primary' },
            { label: 'SYSTEM_ARCHITECTURE', href: 'https://ramyo564.github.io/L_N_Project/', variant: 'secondary' },
            { label: 'CASE_1~6_EVIDENCE', href: 'https://ramyo564.github.io/L_N_Project-portfolio/', variant: 'ghost' }
        ],
        statNote: '최신 동기화: 2026-03-02 · 기준: L_N_Project-portfolio Case 1~6 · k6/Grafana 실측 증거',
        diagramNotes: [
            '프로젝트 간 관계 지도는 버튼으로 계층화해 확인할 수 있습니다.',
            'ARCHITECTURE Page에서는 아키텍처 설명과 구성 이유를 확인할 수 있습니다.',
            'CASE_STUDY Page에서는 Case 1~6 문제 해결 흐름과 측정 증거를 확인할 수 있습니다.'
        ],
        metrics: [
            '30초 스캔 1) Case 2: JWT Claims + AOP 권한 게이트로 인증/권한 쿼리 21 -> 3으로 축소.',
            '30초 스캔 2) Case 5: 동기 메시지 발행 병목 분리로 timeout 15% -> 0%, write p95 500ms -> 50ms.',
            '30초 스캔 3) Case 6: 통합 튜닝으로 read RPS 972 -> 3,680, write RPS 373 -> 916 (2026-03-02 기준).'
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
                '2023: Upgrade_Django4로 인증/결제/운영 배포 흐름을 단독 구축했습니다.',
                '2024: Hoops와 realtime_auction에서 팀 기반 실시간 서비스 운영 경험을 확장했습니다.',
                '2025.09~2026.03: L_N_Project Case 1~6을 문제-원인-해결-결과 구조로 재정리하고 증거를 표준화했습니다.'
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
                            anchorId: 'ln-featured',
                            cardClass: 'project-featured',
                            title: 'Upgrade Todo 병목을 Case 1~6으로 분해해 증거 기반으로 해결한 서비스\n쿼리 21→3, timeout 15%→0%, write RPS +146%',
                            youtubeUrl: 'https://www.youtube.com/watch?v=TD6FPndjhoE',
                            subtitle: '개인 프로젝트 · 2025.09 - 2026.03(최신 동기화 2026-03-02) · L_N_Project',
                            overview: 'Case 1~6을 문제-원인-해결-결과 포맷으로 정리하고, k6/Grafana/로그 증거로 개선 효과를 교차 검증했습니다.',
                            role: '백엔드(성능/트랜잭션/비동기) 중심 + 증거 문서화/운영 검증',
                            skills: ['Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Flyway', 'k6'],
                            highlights: [
                                'Case 2: 인증/권한 쿼리 21->3 (JWT Claims + AOP Gate)',
                                'Case 4: Async Gap 보완으로 생성 직후 권한 오류율 5%->0%',
                                'Case 5: Async Publisher 적용으로 timeout 15%->0%, write p95 500ms->50ms',
                                'Case 6: 통합 튜닝으로 read RPS 972->3,680, write RPS 373->916'
                            ],
                            links: [
                                { label: 'ARCHITECTURE', href: 'https://ramyo564.github.io/L_N_Project/', variant: 'primary' },
                                { label: 'CASE_STUDY (1~6)', href: 'https://ramyo564.github.io/L_N_Project-portfolio/', variant: 'secondary' },
                                { label: 'CASE_6_SYNC_2026-03-02', href: 'https://ramyo564.github.io/L_N_Project-portfolio/case6/CASE-6.md', variant: 'ghost' },
                                { label: 'GITHUB', href: 'https://github.com/ramyo564/L_N_Project', variant: 'ghost' }
                            ]
                        },
                        {
                            mermaidId: 'hoops-architecture',
                            title: 'Hoops',
                            subtitle: '팀 프로젝트(BE 4명 / FE 3명) · 2024.04 - 2024.08 · Hoops',
                            overview: '실시간 매칭 흐름과 운영 자동화에 초점을 맞춰 백엔드/인프라 품질을 개선했습니다.',
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
                            subtitle: '팀 프로젝트(BE 4명) · 2023.09 - 2024.11 · realtime_auction',
                            overview: '동시성 제어와 결제 상태 정합성 중심으로 경매 도메인의 핵심 흐름을 안정화했습니다.',
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
                            subtitle: '개인 프로젝트 · 2023.05 - 2023.06 · Upgrade_Django4',
                            overview: '단독 개발로 기능 구현부터 배포/마이그레이션까지 운영 가능한 형태로 완성했습니다.',
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

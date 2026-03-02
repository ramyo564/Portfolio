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
            { label: 'READ p95', value: '141ms', delta: '-86%' },
            { label: 'WRITE p95', value: '126ms', delta: '-93%' },
            { label: 'READ RPS', value: '3,680', delta: '+279%' }
        ],
        quickLinks: [
            { label: 'FEATURED_L_N', href: '#ln-featured', variant: 'primary' },
            { label: 'SYSTEM_ARCHITECTURE', href: 'https://ramyo564.github.io/L_N_Project/', variant: 'secondary' },
            { label: 'EVIDENCE (k6/Grafana)', href: 'https://ramyo564.github.io/L_N_Project-portfolio/', variant: 'ghost' }
        ],
        statNote: '측정 조건: k6 500VU · Grafana · scenario(read/write/auth) · runs N · timeout/fail rate 추적',
        diagramNotes: [
            '프로젝트 간 관계 지도는 버튼으로 계층화해 확인할 수 있습니다.',
            'ARCHITECTURE Page에서는 아키텍처 설명과 구성 이유를 확인할 수 있습니다.',
            'CASE_STUDY Page에서는 코드를 추적해 성능 개선 증거를 확인할 수 있습니다.'
        ],
        metrics: [
            '30초 스캔 1) 문제: 운영 병목으로 읽기/쓰기 p95가 975ms/1.9s까지 상승 -> 선택: MVC + API/Worker 분리와 부하 재현 검증 -> 결과: 141ms/126ms로 개선.',
            '30초 스캔 2) 문제: 읽기 트래픽에서 DB 커넥션 점유 누적 -> 선택: Redis Cache-Aside와 Cacheable 우선 실행 -> 결과: READ RPS 972 -> 3,680(+279%).',
            '30초 스캔 3) 문제: 동기 저장 경로의 지연/정합성 리스크 -> 선택: Redis Pending + RabbitMQ + Retry/DLQ -> 결과: WRITE p95 1.9s -> 126ms(-93%)와 복구 경로 확보.'
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
                            anchorId: 'ln-featured',
                            cardClass: 'project-featured',
                            title: '실패 TODO를 AI가 자동으로 분석해 "원인+계획" 재구성하는 서비스\np95 975ms→141ms, RPS +279%',
                            youtubeUrl: 'https://www.youtube.com/watch?v=TD6FPndjhoE',
                            subtitle: '개인 프로젝트 · 2025.04 - 현재 · L_N_Project (Life Navigation)',
                            overview: 'k6 부하테스트로 병목을 재현하고 Grafana로 p95/RPS를 검증한 뒤, 설계/운영 개선안을 반복 적용했습니다.',
                            role: '백엔드(도메인/성능/비동기) 중심 + 배포/관측 자동화(DevOps)',
                            skills: ['Spring Boot', 'FastAPI', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker'],
                            highlights: [
                                '재현 검증: k6(500VU) / Grafana 지표 추적',
                                '구조 선택: API/Worker 분리 + 캐시/비동기 + Retry/DLQ',
                                '성과 결과: READ p95 975→141ms, WRITE 1.9s→126ms, timeout 15%→0%'
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

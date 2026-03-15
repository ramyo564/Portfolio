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
            { label: 'READ p95', value: '975ms -> 141ms', delta: '-86%' },
            { label: 'READ RPS', value: '972 -> 3680', delta: '+279%' },
            { label: 'WRITE p95', value: '1.9s -> 126ms', delta: '-93%' },
            { label: 'WRITE RPS', value: '373 -> 916', delta: '+146%' }
        ],
        quickLinks: [
            { label: 'FEATURED_PROJECT', href: '#ln-featured', variant: 'primary' },
            { label: 'ARCHITECTURE_PAGE', href: 'https://ramyo564.github.io/L_N_Project/', variant: 'secondary' },
            { label: 'PROBLEM_SOLVING_PAGE', href: 'https://ramyo564.github.io/L_N_Project-portfolio/', variant: 'ghost' }
        ],
        statNote: '최신 반영: 2026-03-02 · 기준: Life Navigation problem solving · k6/Grafana 실측 증거',
        diagramNotes: [
            '프로젝트 간 관계 지도는 버튼으로 계층화해 확인할 수 있습니다.',
            'ARCHITECTURE Page에서는 아키텍처 설명과 구성 이유를 확인할 수 있습니다.',
            'PROBLEM_SOLVING Page에서는 Case 1~6 문제 해결 흐름과 측정 증거를 확인할 수 있습니다.'
        ],
        metrics: [
            '30초 스캔 1) Case 2: JWT Claims + AOP 권한 게이트로 대표 단일 요청 기본 권한 게이트 3 -> 1로 축소.',
            '30초 스캔 2) Case 5: 비동기 발행 분리로 http_req_failed.rate 0.93% -> 0%, p95 488ms -> 124ms.',
            '30초 스캔 3) 통합 튜닝으로 read RPS 972 -> 3680, write RPS 373 -> 916, read p95 975ms -> 141ms (2026-03-02 기준).'
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
                '2023: Django Commerce로 인증/결제/운영 배포 흐름을 단독 구축했습니다.',
                '2024: Hoops와 Realtime Auction에서 팀 기반 실시간 서비스 운영 경험을 확장했습니다.',
                '2025.09~현재: Life Navigation을 문제-원인-해결-결과 구조로 고도화하고 증거를 표준화했습니다.'
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
                        impact: '읽기 RPS 279%↑, 쓰기 p95 93%↓, 에러율 0%'
                    },
                    {
                        id: 'Hoops',
                        anchorId: 'hoops-featured',
                        title: '운영 자동화 및 비용 절감',
                        problem: '수동 배포(15분+) 및 높은 인프라 비용',
                        action: 'CI/CD 파이프라인 구축 및 Docker 이미지 최적화',
                        impact: '배포 3분 이내 단축, 운영 비용 80% 절감'
                    },
                    {
                        id: 'Auction',
                        anchorId: 'auction-featured',
                        title: '동시성 제어 및 결제 안정화',
                        problem: '입찰 경쟁 시 최고가 정합성 이슈 및 결제 누락 위험',
                        action: 'Redis 기반 동시성 제어 및 결제 상태 전이 모델링',
                        impact: '최고가 갱신 정합성 확보 및 결제 성공률 향상'
                    },
                    {
                        id: 'Django Com',
                        anchorId: 'django-featured',
                        title: 'DB 마이그레이션 및 보안 강화',
                        problem: '개발/운영 환경 DB 격차 및 어드민 보안 취약',
                        action: 'JSON 기반 데이터 이전 전략 수립 및 허니팟/이메일 인증 도입',
                        impact: '데이터 유실 Zero 이전 및 비정상 접근 시도 원천 차단'
                    }
                ]
            },
            groups: [
                {
                    title: 'ARCHITECTURE + PROBLEM SOLVING TRACK',
                    desc: '모든 카드를 문제 정의 -> 기간/역할 -> 결과 -> 스택 순서로 통일했습니다.',
                    cards: [
                        {
                            mermaidId: 'ln-project-architecture',
                            anchorId: 'ln-featured',
                            cardClass: 'project-featured',
                            title: '실패한 TODO/업무 습관을 분석해 다음 실행 계획으로 재구성하는 AI 서비스',
                            // youtubeUrl: 'https://www.youtube.com/watch?v=TD6FPndjhoE',
                            subtitle: 'Life Navigation · 개인 · 2025.09 - 진행 중(최신 반영 2026-03-02) · 역할: 백엔드 중심(성능/트랜잭션/비동기) + 운영 자동화/증거 문서화',
                            // overview: '결과: 대표 단일 요청 권한 게이트 3->1, Case5 failed rate 0.93%->0%·p95 488ms->124ms, write RPS 373->916, write p95 1.9s->126ms, read RPS 972->3680, read p95 975ms->141ms',
                            stackSummary: 'Spring Boot, PostgreSQL, Redis, RabbitMQ, Flyway, k6',
                            skills: ['Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Flyway', 'k6'],
                            highlights: [
                                '인증 경로 최적화: 대표 요청 권한 게이트 3→1, 비동기 발행 전환으로 failed rate 0%',
                                '통합 성능 최적화: 읽기 RPS 972→3,680, 쓰기 RPS 373→916 (500VU baseline)',
                                '6건의 Problem Solving과 k6/Grafana 실측 증거 → PROBLEM_SOLVING 페이지에서 확인'
                            ],
                            links: [
                                { label: 'ARCHITECTURE', href: 'https://ramyo564.github.io/L_N_Project/', variant: 'primary' },
                                { label: 'PROBLEM_SOLVING', href: 'https://ramyo564.github.io/L_N_Project-portfolio/', variant: 'secondary' },
                                { label: 'LATEST_DEEP_DIVE', href: 'https://ramyo564.github.io/L_N_Project-portfolio/case6/CASE-6.md', variant: 'ghost' },
                                { label: 'GITHUB_REPO', href: 'https://github.com/ramyo564/L_N_Project', variant: 'ghost' }
                            ]
                        },
                        {
                            mermaidId: 'hoops-architecture',
                            anchorId: 'hoops-featured',
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
                                { label: 'ARCHITECTURE', href: 'https://ramyo564.github.io/Hoops/', variant: 'primary' },
                                { label: 'PROBLEM_SOLVING', href: 'https://ramyo564.github.io/Hoops-portfolio/', variant: 'secondary' },
                                { label: 'GITHUB', href: 'https://github.com/ramyo564/Hoops', variant: 'ghost' },
                                { label: 'TEAM_REPO', href: 'https://github.com/hoops-project', variant: 'ghost' }
                            ]
                        },
                        {
                            mermaidId: 'realtime-auction-architecture',
                            anchorId: 'auction-featured',
                            title: '동시성/결제 정합성을 강화한 - 경매 서비스 (Realtime Auction)',
                            subtitle: '팀(BE 4) · 2023.09 - 2024.11 · 역할: 결제 흐름/검색 모델링 최적화 + API 안정화',
                            // overview: '결과: 입찰 최고가 갱신 정합성 확보, 결제 ready/approval 만료 정리 흐름 구축, 검색/카테고리 운영성 개선',
                            stackSummary: 'Django, DRF, Channels, Celery, Redis, KakaoPay API, django-mptt, JWT',
                            skills: ['Django', 'DRF', 'Channels', 'Celery', 'Redis', 'KakaoPay API', 'django-mptt', 'JWT'],
                            highlights: [
                                '입찰 동시성 제어로 최고가 업데이트 정합성 확보',
                                '결제 ready/approval 상태 연결 및 만료 정리 로직 구현',
                                '상품 검색과 카테고리 모델링 개선으로 운영성 향상'
                            ],
                            links: [
                                { label: 'ARCHITECTURE', href: 'https://ramyo564.github.io/realtime_auction/', variant: 'primary' },
                                { label: 'PROBLEM_SOLVING', href: 'https://ramyo564.github.io/realtime_auction-portfolio/', variant: 'secondary' },
                                { label: 'GITHUB', href: 'https://github.com/ramyo564/realtime_auction', variant: 'ghost' }
                            ]
                        },
                        {
                            mermaidId: 'upgrade-django-architecture',
                            anchorId: 'django-featured',
                            title: '기능 구현부터 배포/마이그레이션까지 단독으로 완주한 - 쇼핑몰 서비스 (Django Commerce)',
                            subtitle: '개인 · 2023.05 - 2023.06 · 역할: 기획 -> 구현 -> 배포 단독 수행',
                            // overview: '결과: 세션 카트 병합/주문 완료 흐름 정리, SQLite -> PostgreSQL 데이터 마이그레이션, 이메일 인증 + honeypot 보안 적용',
                            stackSummary: 'Django 4.2, PostgreSQL, PayPal, KakaoPay, AWS EB, S3, Route53',
                            skills: ['Django 4.2', 'PostgreSQL', 'PayPal', 'KakaoPay', 'AWS EB', 'S3', 'Route53'],
                            highlights: [
                                '세션 카트 병합과 주문 완료 흐름을 단일 계약으로 정리',
                                'SQLite -> PostgreSQL 데이터 마이그레이션 수행',
                                '이메일 인증 + honeypot 기반 인증 보안 강화'
                            ],
                            links: [
                                { label: 'ARCHITECTURE', href: 'https://ramyo564.github.io/Upgrade_Django4/', variant: 'primary' },
                                { label: 'PROBLEM_SOLVING', href: 'https://ramyo564.github.io/Upgrade_Django4-portfolio/', variant: 'secondary' },
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

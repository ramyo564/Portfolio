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
        intro: '외부 LLM API 연동, AI 로직 격리, 대규모 트래픽 최적화를 증거 기반으로 설명하는 백엔드 개발자',
        profileSummaryLines: [
            '외부 LLM API를 연동하여 사용자의 행동 데이터를 분석하고 맞춤형 실행 계획을 생성하는 에이전트형 워크플로우를 설계합니다.',
            'AI 추론 로직(FastAPI)과 비즈니스 코어(Spring Boot)를 물리적으로 격리해 LLM 응답 지연이 코어 서비스로 전파되는 것을 차단하는 아키텍처를 설계합니다.',
            '1,000VU 이상 부하 테스트에서 가상 스레드 피닝(Pinning)과 DB 커넥션 고갈 문제를 Grafana/k6로 추적하고, 비동기 발행과 DB 경로 최적화, 커넥션/트랜잭션 튜닝으로 병목을 해소합니다.',
            'AI 도구를 활용해 개발 생산성과 문제 해결 속도를 속도를 높이는 데 익숙합니다.'
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
        statNote: '최신 반영: 2026-03-29 · 기준: Life Navigation · k6/Grafana 실측 증거',
        diagramNotes: [
            '프로젝트 간 관계 지도는 버튼으로 계층화해 확인할 수 있습니다.',
            'PROBLEM_SOLVING Page에서는 Life Navigation의 AI 추천 워크플로우, AI 로직 격리, 대규모 트래픽 병목 해소를 k6/Grafana 실측 증거와 함께 확인할 수 있습니다.'
        ],
        metrics: [
            '30초 스캔 1) Life Navigation: 외부 LLM API와 FastAPI AI 워커로 실패한 TODO를 다음 실행 계획으로 재구성.',
            '30초 스캔 2) Case 2: JWT Claims + AOP 권한 게이트로 대표 단일 요청 기본 권한 게이트 3 -> 1로 축소.',
            '30초 스캔 3) Case 5: 비동기 발행 분리로 http_req_failed.rate 0.93% -> 0%, p95 488ms -> 124ms.',
            '30초 스캔 4) 통합 튜닝으로 read RPS 1.55k -> 3.68k, write RPS 203.7 -> 915.7, read p95 712ms -> 141ms (2026-03-02 기준).'
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
                '2025.09 - 현재 | Life Navigation을 AI 추천 워크플로우와 성능/비동기 증거 구조로 고도화',
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
                        title: 'LLM API 연동 및 지능형 AI 추천 워크플로우',
                        problem: '실패한 TODO 재구성과 고부하 응답 병목이 동시에 존재',
                        action: 'FastAPI AI 워커 분리, 인증 게이트 축소(3->1), Outbox 기반 비동기 발행',
                        impact: 'AI 추천 흐름 안정화, 읽기 RPS 137%↑, 쓰기 p95 96%↓, 에러율 0%'
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
                            title: 'LLM API 연동 및 지능형 AI 추천 워크플로우로 실패한 TODO를 다음 실행 계획으로 재구성하는 서비스 (Life Navigation)',
                            // youtubeUrl: 'https://www.youtube.com/watch?v=TD6FPndjhoE',
                            subtitle: 'Life Navigation · 개인 · 2025.09 - 진행 중(최신 반영 2026-03-02) · 역할: 백엔드 중심(성능/트랜잭션/비동기) + AI 워커/운영 자동화/증거 문서화',
                            // overview: '결과: 대표 단일 요청 권한 게이트 3->1, Case5 failed rate 0.93%->0%·p95 488ms->124ms, write RPS 203.7->915.7, write p95 3.4s->126ms, read RPS 1.55k->3.68k, read p95 712ms->141ms',
                            stackSummary: 'Spring Boot, FastAPI, LLM, PostgreSQL, Redis, RabbitMQ, Flyway, k6',
                            skills: ['Spring Boot', 'FastAPI', 'LLM', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Flyway', 'k6'],
                            highlights: [
                                'AI 추천 워크플로우: 외부 LLM API와 FastAPI 기반 추천 흐름으로 실패한 TODO/업무 습관 재구성',
                                '통합 성능 최적화: 읽기 RPS 1.55k→3.68k, 쓰기 RPS 203.7→915.7 (초기 테스트 500VU)',
                                'Problem Solving 과 k6/Grafana 실측 증거 → PROBLEM_SOLVING 페이지에서 확인'
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

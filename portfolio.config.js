import { diagrams } from './diagrams.js';

/**
 * Master Portfolio Hub Configuration (DTO)
 * Awwwards-Standard Swiss Minimalist Specification
 */
export const portfolioConfig = {
    brand: 'YOHAN · BACKEND ARCHITECT',
    navLinks: [
        { label: 'Engineering Projects', href: '#cases' },
        { label: 'GitHub ↗', href: 'https://github.com/ramyo564', target: '_blank' },
        { label: 'Resume / Contact', href: 'mailto:yohan032yohan@gmail.com' }
    ],
    hero: {
        kicker: 'Master Engineering Architecture & Verification Hub',
        headline: 'MEASURABLE BACKEND ENGINEERING.<br>CONCURRENCY OPTIMIZATION.<br>DISTRIBUTED CLOUD ARCHITECTURE.',
        description: '대규모 트래픽 부하 최적화, 비동기 파이프라인 설계, 도메인 주도 헥사고날 아키텍처 및 클라우드 인프라 안정성을 기계적 실측 증거(k6, 프로파일링)와 다이어그램으로 입증하는 통합 엔지니어링 허브입니다.',
        killerMetrics: [
            { number: '0.00%', label: 'Failed Rate', desc: '1,000 VU 피크 부하 무손실 완결' },
            { number: '15x Cut', label: 'Write Latency', desc: 'RabbitMQ 비동기 쓰기 p95 126ms' },
            { number: '80% Cut', label: 'Deploy & Cloud Cost', desc: 'Docker 멀티스테이지 및 인프라 최적화' },
            { number: '100% Sync', label: 'Bid Integrity', desc: 'Django Channels 동시 입찰 정합성' }
        ]
    },
    sectionIntro: {
        tag: 'Engineering Projects',
        headline: '핵심 프로젝트 아키텍처 및 문제 해결 포트폴리오',
        hint: '다이어그램을 클릭하면 고해상도 벡터 원본으로 확대 검증할 수 있습니다.'
    },
    cases: [
        {
            number: '01',
            category: 'HIGH-CONCURRENCY & AI PIPELINE',
            period: '2025.09 – PRESENT',
            shortTitle: 'Life Navigation (대용량 트래픽 & AI)',
            highlightMetric: '0.00% Error (Write p95 126ms)',
            title: 'Life Navigation: 1,000 VU 부하 최적화 및 분산 AI 파이프라인',
            summary: 'Spring Boot 헥사고날 아키텍처 기반의 RabbitMQ 비동기 쓰기 분리, JPA 영속성 튜닝 및 FastAPI AI 세션 복구 파이프라인으로 1,000 VU 고부하 환경에서 무손실 0.00% 에러율을 달성했습니다.',
            metrics: [
                { label: 'FAILED RATE', value: '1.2% → 0.00% (72.5만 건 무손실)', highlight: true },
                { label: 'WRITE p95', value: '3.4s → 126ms (-96% 단축)' },
                { label: 'THROUGHPUT', value: 'Read 3.68k / Write 916 RPS' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: 'Life Navigation 분산 백엔드 & AI 워커 아키텍처',
                    mermaidId: 'ln-project-architecture'
                }
            ],
            detailLink: 'https://ramyo564.github.io/L_N_Project-portfolio/',
            detailLinkLabel: '실측 검증 포트폴리오 보기 ↗'
        },
        {
            number: '02',
            category: 'REALTIME & DEVOPS AUTOMATION',
            period: '2024.04 – 2024.08',
            shortTitle: 'Hoops (실시간 매칭 & CI/CD)',
            highlightMetric: '배포 80% 단축 (15m → 3m)',
            title: 'Hoops: 실시간 소셜 플랫폼 운영 효율 및 배포 파이프라인 자동화',
            summary: 'Docker Multi-stage 빌드와 GitHub Actions 기반 배포 자동화로 배포 시간을 80% 단축하고, Redis 기반 실시간 제재 및 WebSocket 라우팅 정합성을 확보했습니다.',
            metrics: [
                { label: 'DEPLOY SPEED', value: '15분+ → 3분 이내 (-80%)', highlight: true },
                { label: 'IMAGE SIZE', value: '600MB → 250MB (-58% 경량화)' },
                { label: 'INFRA COST', value: 'AWS 월 운영 비용 약 80% 절감' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: 'Hoops 실시간 매칭 및 운영 거버넌스 아키텍처',
                    mermaidId: 'hoops-architecture'
                }
            ],
            detailLink: 'https://ramyo564.github.io/Hoops-portfolio/',
            detailLinkLabel: '문제 해결 포트폴리오 보기 ↗'
        },
        {
            number: '03',
            category: 'COMMERCE & CLOUD MIGRATION',
            period: '2023.05 – 2023.06',
            shortTitle: 'Django Commerce (세션 병합 & AWS)',
            highlightMetric: '장바구니 100% 보존 & 클라우드 이전',
            title: 'Django Commerce: 세션 장바구니 병합, 결제 통합 및 AWS Beanstalk 이관',
            summary: '비회원 장바구니의 로그인 병합 로직과 이종 결제(PayPal/Kakao) 후처리를 표준화하고, SQLite에서 AWS RDS PostgreSQL로의 무중단 데이터 마이그레이션을 완결했습니다.',
            metrics: [
                { label: 'CART PRESERVATION', value: '비회원 품목 100% 병합 보존', highlight: true },
                { label: 'SECURITY', value: '/admin 허니팟 및 이메일 토큰 검증' },
                { label: 'INFRASTRUCTURE', value: 'AWS Elastic Beanstalk + RDS PostgreSQL' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: 'Django Commerce 시스템 아키텍처 및 AWS 토폴로지',
                    mermaidId: 'upgrade-django-architecture'
                }
            ],
            detailLink: 'https://ramyo564.github.io/Upgrade_Django4-portfolio/',
            detailLinkLabel: '문제 해결 포트폴리오 보기 ↗'
        },
        {
            number: '04',
            category: 'REALTIME & ASYNC PIPELINE',
            period: '2023.11 – 2024.01',
            shortTitle: 'Realtime Auction (동시 입찰 & Celery)',
            highlightMetric: '입찰 정합성 100% & 운영 95% 무인화',
            title: 'Realtime Auction: Django Channels 동시 입찰 가드 및 경매 무인 자동화',
            summary: 'Django Channels ASGI 환경의 비동기 경계 분리로 동시 입찰 최고가 왜곡을 원천 차단하고, 10초 주기의 Celery Beat 스케줄러로 낙찰/결제/채팅 생성을 완전 무인 자동화했습니다.',
            metrics: [
                { label: 'BID INTEGRITY', value: '경합 시 최고가 왜곡 0건 (100% 무결성)', highlight: true },
                { label: 'AUTOMATION', value: 'Celery Beat 10초 주기 무인 라이프사이클' },
                { label: 'PAYMENT BRIDGE', value: '사용자 키 매핑 기반 결제 유실 방지' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: '실시간 경매 시스템 아키텍처 및 메시징 흐름',
                    mermaidId: 'realtime-auction-architecture'
                }
            ],
            detailLink: 'https://ramyo564.github.io/realtime_auction-portfolio/',
            detailLinkLabel: '문제 해결 포트폴리오 보기 ↗'
        }
    ],
    diagrams
};

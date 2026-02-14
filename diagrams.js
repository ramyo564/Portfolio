export const diagrams = {
    'portfolio-hub-map': `
        graph TD
        Hub[Portfolio Hub] --> LN[L_N_Project]
        Hub --> Hoops[Hoops]
        Hub --> RA[realtime_auction]
        Hub --> UD[Upgrade_Django4]

        LN --> LNA[Architecture Page]
        LN --> LNC[Case Study Page]

        Hoops --> HA[Architecture Page]
        Hoops --> HC[Case Study Page]

        RA --> RAA[Architecture Page]
        RA --> RAC[Case Study Page]

        UD --> UDA[Architecture Page]
        UD --> UDC[Case Study Page]

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        class Hub,LN,Hoops,RA,UD b
        class LNA,HA,RAA,UDA g
        class LNC,HC,RAC,UDC o
    `,

    'comparison-axis-map': `
        graph TD
        Root[Cross Project Lens] --> M[Messaging and Performance]
        Root --> I[Identity and Access]
        Root --> C[Cache and Transaction]
        Root --> D[Deployment and Cost]

        M --> LN_M[L_N_Project]
        M --> HT_M[Hoops]
        M --> RA_M[realtime_auction]

        I --> LN_I[L_N_Project]
        I --> UD_I[Upgrade_Django4]

        C --> LN_C[L_N_Project]
        C --> RA_C[realtime_auction]
        C --> UD_C[Upgrade_Django4]

        D --> HT_D[Hoops]
        D --> UD_D[Upgrade_Django4]
        D --> LN_D[L_N_Project]

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        class Root,M,I,C,D b
        class LN_M,HT_M,RA_M,LN_I,UD_I,LN_C,RA_C,UD_C g
        class HT_D,UD_D,LN_D o
    `,

    'release-timeline-map': `
        graph LR
        T2023[2023] --> UD[Upgrade_Django4]
        UD --> T2024A[2024 H1]
        T2024A --> Hoops[Hoops]
        Hoops --> T2024B[2024 H2]
        T2024B --> RA[realtime_auction]
        RA --> T2025[2025 - NOW]
        T2025 --> LN[L_N_Project]

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        class T2023,T2024A,T2024B,T2025 b
        class UD,Hoops,RA,LN g
    `,

    'ln-project-architecture': `
        graph LR
        Client[Web Client] --> CDN[Cloudflare]
        CDN --> Nginx[Nginx]

        Nginx --> API[Spring API]
        Nginx --> AI[FastAPI AI]

        API --> PG[(PostgreSQL)]
        API --> Redis[(Redis)]
        API --> MQ((RabbitMQ))
        MQ --> Worker[Spring Worker]
        Worker --> PG

        AI --> Qdrant[(Qdrant)]
        AI --> LLM[External LLM]
        AI --> API

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        class Client,CDN,Nginx,API,AI,Worker b
        class PG,Redis,Qdrant g
        class MQ,LLM o
    `,

    'hoops-architecture': `
        graph LR
        Users[Web and Mobile User] --> API[Spring Boot API]
        API --> Security[Spring Security and JWT]

        Security --> UsersDomain[Users and Auth]
        API --> GameDomain[Game and Participants]
        API --> SocialDomain[Friends and Invite]
        API --> ChatDomain[Chat and WebSocket]
        API --> GovDomain[Report and Manager]
        API --> AlarmDomain[Notification SSE]

        UsersDomain --> Maria[(MariaDB)]
        GameDomain --> Maria
        SocialDomain --> Maria
        ChatDomain --> Maria
        GovDomain --> Maria

        UsersDomain --> Redis[(Redis)]
        AlarmDomain --> Redis
        ChatDomain --> Redis

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        class Users,API,Security,UsersDomain,GameDomain,SocialDomain,ChatDomain,GovDomain,AlarmDomain b
        class Maria,Redis g
    `,

    'realtime-auction-architecture': `
        graph LR
        Client[Web or Mobile Client] --> Daphne[Daphne ASGI]
        Daphne --> Django[Django and DRF]
        Daphne --> Channels[Django Channels]

        Django --> SQLite[(SQLite)]
        Django --> Redis[(Redis)]
        Channels --> Redis

        CeleryWorker[Celery Worker] --> Redis
        CeleryBeat[Celery Beat] --> Redis
        CeleryWorker --> Django

        Django --> KakaoPay[KakaoPay API]
        Django --> NaverSMS[Naver SMS API]
        Django --> Media[(Media Storage)]

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        class Client,Daphne,Django,Channels,CeleryWorker,CeleryBeat b
        class SQLite,Redis,Media g
        class KakaoPay,NaverSMS o
    `,

    'upgrade-django-architecture': `
        graph LR
        User[Client Browser] --> Route53[Route53]
        Route53 --> EB[AWS Elastic Beanstalk]

        EB --> Nginx[Nginx]
        Nginx --> Django[Django App]

        Django --> RDS[(RDS PostgreSQL)]
        Django --> S3[(S3 Static and Media)]
        Django --> Email[Email Provider]
        Django --> PayPal[PayPal SDK]
        Django --> Kakao[KakaoPay REST API]

        AdminAttack[Admin Attack Path] --> Honeypot[admin_honeypot]
        SecureAdmin[Secure Admin URL] --> Django

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        class User,Route53,EB,Nginx,Django,SecureAdmin b
        class RDS,S3,Email g
        class PayPal,Kakao,Honeypot,AdminAttack o
    `
};

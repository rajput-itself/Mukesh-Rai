export const projects = [
  {
    id: "enterprise-cloud-core",
    number: "01",
    title: "AAPRIN Enterprise Cloud Platform",
    tagline: "Resilient Distributed Microservices & Supply-Chain Operations",
    category: "Enterprise Cloud Architecture",
    role: "Architectural Lead & Managing Director",
    client: "AAPRIN Technologies & Enterprise Partners",
    year: "2025 – 2026",
    image: "/project-cloud.webp",
    tags: ["Distributed Systems", "Kubernetes", "Event-Driven", "Cloud Security"],
    summary: "Architected a unified multi-tenant enterprise orchestration framework capable of processing mission-critical operations with sub-100ms latency and high availability.",
    caseStudy: {
      challenge: "Legacy siloed enterprise systems suffered from fragmented operational data, cascading service failures during peak spikes, and high infrastructure overhead across regional hubs.",
      approach: "Engineered a zero-trust event-driven architecture using decoupled microservices, idempotent message streaming, and proactive telemetry for real-time observability.",
      technology: "Go, Node.js, Kubernetes, Apache Kafka, PostgreSQL cluster, Redis caching, AWS & Private Hybrid Cloud with Terraform IaC.",
      impact: "Reduced operational latency by 42%, achieved 99.99% system uptime through self-healing node policies, and consolidated cross-department data exchange into a unified, real-time control plane.",
      lesson: "Simplicity in foundational contracts beats intricate distributed state. Clear boundaries between services prevent organizational and architectural debt."
    }
  },
  {
    id: "industrial-ai-vision",
    number: "02",
    title: "Industrial Computer Vision & Neural Inspection",
    tagline: "Autonomous Optical Quality Assurance & Real-Time Edge Inference",
    category: "AI & Industrial Automation",
    role: "Executive Technology Director",
    client: "Manufacturing & Industrial Clients",
    year: "2024 – 2025",
    image: "/project-ai.webp",
    tags: ["Computer Vision", "PyTorch", "Edge AI", "Industrial IoT"],
    summary: "Designed an automated computer vision inspection framework deploying lightweight neural models directly onto edge devices on manufacturing lines.",
    caseStudy: {
      challenge: "Manual physical inspection on high-speed assembly lines resulted in inconsistent defect detection rates, operator fatigue, and delayed feedback loops.",
      approach: "Built a hardware-accelerated computer vision pipeline integrating industrial high-speed cameras with quantization-optimized convolutional and transformer architectures.",
      technology: "Python, PyTorch, TensorRT, OpenCV, Edge IPCs, MQTT telemetry, React Executive Dashboard.",
      impact: "Attained 99.4% precision in micro-defect classification at line speeds exceeding 180 units per minute, reducing scrap rates and warranty claims substantially.",
      lesson: "The hardest part of applied AI isn't training models in the lab; it is building robust optical environments, edge fallbacks, and real-time operator trust."
    }
  },
  {
    id: "enterprise-transformation-governance",
    number: "03",
    title: "Digital Business Transformation Engine",
    tagline: "Modernizing Legacy Workflows into Scalable Cloud Systems",
    category: "Digital Transformation & Strategy",
    role: "Managing Director & Solutions Lead",
    client: "MPA Solution & Enterprise Services",
    year: "2023 – 2024",
    image: "/company-hq.webp",
    tags: ["Digital Transformation", "API Gateway", "Workflow Automation", "FinOps"],
    summary: "Led the organizational and technological overhaul of manual paperwork and siloed databases into an automated end-to-end digital lifecycle.",
    caseStudy: {
      challenge: "Organizations faced high operational friction due to disconnected legacy software, repetitive manual reconciliations, and a lack of auditability.",
      approach: "Conducted deep business process reengineering, established a unified API gateway, automated approval pipelines, and implemented role-based compliance policies.",
      technology: "Microservices, GraphQL & REST APIs, Next.js, Docker, Enterprise Identity Management (SSO / OIDC), CI/CD automation.",
      impact: "Decreased turnaround times from days to minutes, achieved 100% regulatory audit compliance, and lowered software operational expenditure.",
      lesson: "True transformation is 30% technology and 70% human alignment. Systems succeed when they empower frontline operators rather than imposing cognitive overhead."
    }
  }
];

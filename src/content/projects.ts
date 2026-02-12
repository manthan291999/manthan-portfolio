export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  stack: string[];
  results: string[];
  tradeoffs: string[];
  media: { type: "image" | "video"; src: string; alt: string }[];
  nextSteps: string[];
  links: { label: string; url: string }[];
  tags: string[];
  featured: boolean;
  year: string;
}

export const projects: Project[] = [
  {
    id: "ai-document-analyzer",
    title: "AI Document Analyzer",
    tagline: "Intelligent document parsing with 97% accuracy",
    description:
      "A production-grade AI system that extracts structured data from unstructured documents using fine-tuned LLMs and custom NER pipelines.",
    problem:
      "Enterprise clients spent 40+ hours/week manually extracting data from thousands of PDFs, invoices, and contracts with inconsistent formats.",
    solution:
      "Built an end-to-end pipeline combining OCR preprocessing, fine-tuned transformer models for entity extraction, and a validation layer with human-in-the-loop feedback.",
    architecture:
      "Microservices architecture: FastAPI ingestion service → RabbitMQ queue → ML worker pods (Kubernetes) → PostgreSQL + S3 for results. Redis caching for frequent document templates.",
    stack: [
      "Python",
      "FastAPI",
      "PyTorch",
      "Hugging Face",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "AWS",
    ],
    results: [
      "97% extraction accuracy (up from 72% baseline)",
      "Reduced manual processing time by 85%",
      "Processing 10,000+ documents/day in production",
      "Saved client $200K+/year in operational costs",
    ],
    tradeoffs: [
      "Chose fine-tuned BERT over GPT-4 API for cost efficiency at scale",
      "Accepted slightly lower accuracy on rare document types to maintain speed",
    ],
    media: [],
    nextSteps: [
      "Adding support for handwritten documents",
      "Multi-language expansion (currently English + Hindi)",
    ],
    links: [
      { label: "GitHub", url: "https://github.com" },
      { label: "Live Demo", url: "https://demo.example.com" },
    ],
    tags: ["AI/ML", "NLP", "Python", "Cloud"],
    featured: true,
    year: "2025",
  },
  {
    id: "realtime-collab-platform",
    title: "Real-Time Collaboration Platform",
    tagline: "Google Docs-like editing for technical teams",
    description:
      "A real-time collaborative editor built for engineering teams with live cursors, conflict resolution, and integrated code review.",
    problem:
      "Engineering teams needed a unified platform for collaborative technical documentation that handled code blocks, diagrams, and real-time co-editing without conflicts.",
    solution:
      "Implemented CRDTs (Conflict-free Replicated Data Types) for real-time sync, WebSocket connections for live presence, and a custom rich-text editor with code highlighting.",
    architecture:
      "Next.js frontend → WebSocket gateway (Node.js) → CRDT sync engine → PostgreSQL for persistence. Redis pub/sub for multi-server sync.",
    stack: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "WebSockets",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    results: [
      "Sub-50ms sync latency across 20+ concurrent users",
      "Zero data conflicts in 6 months of production use",
      "Adopted by 3 engineering teams (50+ daily users)",
      "99.9% uptime over 6 months",
    ],
    tradeoffs: [
      "CRDT complexity vs OT simplicity — chose CRDTs for better offline support",
      "Custom editor vs Slate.js — custom for full control over collaboration features",
    ],
    media: [],
    nextSteps: [
      "Adding AI-powered writing suggestions",
      "Mobile app version",
    ],
    links: [
      { label: "GitHub", url: "https://github.com" },
    ],
    tags: ["Full-Stack", "TypeScript", "Real-Time", "Cloud"],
    featured: true,
    year: "2025",
  },
  {
    id: "ml-pipeline-orchestrator",
    title: "ML Pipeline Orchestrator",
    tagline: "End-to-end ML workflow automation",
    description:
      "A lightweight MLOps platform that automates model training, evaluation, versioning, and deployment with a clean dashboard.",
    problem:
      "Data science teams were manually managing model experiments, deployments, and rollbacks across multiple environments with no standardized workflow.",
    solution:
      "Built a pipeline orchestrator with DAG-based workflow definitions, automated hyperparameter tuning, model versioning with DVC, and one-click deployment to Kubernetes.",
    architecture:
      "React dashboard → FastAPI orchestration layer → Celery workers → MLflow tracking → DVC for data versioning → K8s for model serving.",
    stack: [
      "Python",
      "FastAPI",
      "React",
      "Celery",
      "MLflow",
      "DVC",
      "Kubernetes",
      "Terraform",
    ],
    results: [
      "Reduced model deployment time from 2 days to 15 minutes",
      "Automated rollback saved 4 incidents in first quarter",
      "Managing 20+ models across 3 environments",
      "Improved experiment tracking coverage by 100%",
    ],
    tradeoffs: [
      "Built custom vs using Kubeflow — lighter footprint for our scale",
      "Celery over Airflow for simpler deployment and lower overhead",
    ],
    media: [],
    nextSteps: [
      "A/B testing integration",
      "Cost optimization dashboard for GPU usage",
    ],
    links: [
      { label: "GitHub", url: "https://github.com" },
      { label: "Documentation", url: "https://docs.example.com" },
    ],
    tags: ["AI/ML", "MLOps", "Python", "DevOps"],
    featured: true,
    year: "2024",
  },
  {
    id: "smart-search-engine",
    title: "Semantic Search Engine",
    tagline: "Vector-powered search with sub-100ms latency",
    description:
      "A semantic search engine using embeddings and vector databases to deliver contextually relevant results across large document corpora.",
    problem:
      "Traditional keyword search returned irrelevant results for natural language queries across a 500K+ document knowledge base.",
    solution:
      "Implemented a RAG-based search pipeline with sentence transformers for embedding generation, Pinecone for vector storage, and a re-ranking layer for precision.",
    architecture:
      "Next.js search UI → API Gateway → Embedding service (sentence-transformers) → Pinecone vector DB → Re-ranker → Results with source attribution.",
    stack: [
      "Python",
      "Next.js",
      "Pinecone",
      "sentence-transformers",
      "FastAPI",
      "Redis",
    ],
    results: [
      "92% relevance score (up from 61% with keyword search)",
      "Sub-100ms P95 query latency",
      "Handling 50K+ queries/day",
    ],
    tradeoffs: [
      "Pinecone over self-hosted Milvus for managed scalability",
      "Batch embedding updates vs real-time for cost control",
    ],
    media: [],
    nextSteps: [
      "Multi-modal search (images + text)",
      "Personalized ranking based on user history",
    ],
    links: [
      { label: "GitHub", url: "https://github.com" },
    ],
    tags: ["AI/ML", "Search", "Python", "Full-Stack"],
    featured: false,
    year: "2024",
  },
  {
    id: "devops-monitoring-dashboard",
    title: "DevOps Monitoring Dashboard",
    tagline: "Real-time infrastructure observability",
    description:
      "A comprehensive monitoring dashboard aggregating metrics from multiple cloud services with intelligent alerting and incident tracking.",
    problem:
      "Operations team was juggling 5+ monitoring tools with no unified view of system health, leading to delayed incident response.",
    solution:
      "Built a unified dashboard pulling metrics from AWS CloudWatch, Prometheus, and custom app metrics with configurable alerts and on-call routing.",
    architecture:
      "React + D3.js dashboard → GraphQL API → TimescaleDB for metrics → Prometheus adapter → AlertManager integration.",
    stack: [
      "TypeScript",
      "React",
      "D3.js",
      "GraphQL",
      "TimescaleDB",
      "Prometheus",
      "Docker",
    ],
    results: [
      "Reduced mean time to detection (MTTD) by 60%",
      "Consolidated 5 tools into 1 dashboard",
      "Used by 15+ engineers daily",
    ],
    tradeoffs: [
      "Custom dashboard vs Grafana — needed deep integration with internal tools",
      "TimescaleDB over InfluxDB for SQL compatibility",
    ],
    media: [],
    nextSteps: [
      "AI-powered anomaly detection",
      "Cost optimization recommendations",
    ],
    links: [
      { label: "GitHub", url: "https://github.com" },
    ],
    tags: ["DevOps", "Full-Stack", "TypeScript", "Cloud"],
    featured: false,
    year: "2024",
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

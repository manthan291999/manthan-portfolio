export const siteConfig = {
  name: "Manthan Mittal",
  role: "AI Engineer & Software Developer",
  tagline: "I build intelligent systems that solve real-world problems — from ML pipelines to full-stack applications.",
  email: "manthanmittal93@gmail.com",
  location: "India",
  available: true,
  resumeUrl: "/Manthan_Mittal_Resume_AI_Robotics.pdf",
  social: {
    github: "https://github.com/manthanmittal",
    linkedin: "https://www.linkedin.com/in/manthanmittal",
    email: "mailto:manthanmittal93@gmail.com",
  },
  stats: [
    { label: "Projects Shipped", value: "15+" },
    { label: "Years Experience", value: "3+" },
    { label: "Technologies", value: "30+" },
    { label: "Client Satisfaction", value: "100%" },
  ],
  whatIDo: [
    {
      title: "AI / ML Engineering",
      description:
        "Design and deploy production ML systems — NLP pipelines, computer vision, RAG, and LLM-powered applications.",
      icon: "Brain",
    },
    {
      title: "Full-Stack Development",
      description:
        "Build performant web apps with React, Next.js, and robust backends using Python, Node.js, and cloud infrastructure.",
      icon: "Code",
    },
    {
      title: "MLOps & Cloud",
      description:
        "Automate model training, versioning, and deployment with Docker, Kubernetes, and CI/CD pipelines on AWS.",
      icon: "Cloud",
    },
  ],
  about: {
    intro:
      "I'm Manthan Mittal — an AI Engineer and Software Developer passionate about building systems that make a real impact.",
    paragraphs: [
      "I specialize in bridging the gap between cutting-edge AI research and production-ready software. From fine-tuning transformers for document understanding to building real-time collaboration platforms, I thrive at the intersection of intelligence and engineering.",
      "My approach is pragmatic: understand the problem deeply, choose the right tools (not the trendiest), ship fast, and iterate based on real data. I've worked across the full stack from training ML models on GPUs to deploying them on Kubernetes with proper monitoring and rollback strategies.",
      "When I'm not coding, I'm exploring new papers on arxiv, contributing to open-source projects, or writing about practical AI engineering. I believe in building software that's not just technically impressive, but genuinely useful.",
    ],
    highlights: [
      "Built AI systems processing 10,000+ documents/day",
      "Full-stack engineer with ML specialization",
      "Open source contributor & continuous learner",
      "Remote-friendly, async-first work style",
    ],
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

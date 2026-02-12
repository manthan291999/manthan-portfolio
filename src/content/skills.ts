export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: "expert" | "advanced" | "intermediate" }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI / Machine Learning",
    icon: "Brain",
    skills: [
      { name: "PyTorch", level: "expert" },
      { name: "TensorFlow", level: "advanced" },
      { name: "Hugging Face", level: "expert" },
      { name: "LangChain", level: "advanced" },
      { name: "Scikit-learn", level: "expert" },
      { name: "OpenAI API", level: "expert" },
      { name: "Computer Vision", level: "advanced" },
      { name: "NLP / NER", level: "expert" },
      { name: "MLflow", level: "advanced" },
      { name: "RAG Systems", level: "advanced" },
    ],
  },
  {
    title: "Backend Development",
    icon: "Server",
    skills: [
      { name: "Python", level: "expert" },
      { name: "FastAPI", level: "expert" },
      { name: "Node.js", level: "advanced" },
      { name: "PostgreSQL", level: "advanced" },
      { name: "Redis", level: "advanced" },
      { name: "GraphQL", level: "intermediate" },
      { name: "REST APIs", level: "expert" },
      { name: "Celery", level: "advanced" },
    ],
  },
  {
    title: "Frontend Development",
    icon: "Monitor",
    skills: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "Tailwind CSS", level: "expert" },
      { name: "Framer Motion", level: "advanced" },
      { name: "HTML / CSS", level: "expert" },
      { name: "JavaScript", level: "expert" },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: "Cloud",
    skills: [
      { name: "Docker", level: "expert" },
      { name: "Kubernetes", level: "advanced" },
      { name: "AWS", level: "advanced" },
      { name: "CI/CD", level: "advanced" },
      { name: "Terraform", level: "intermediate" },
      { name: "GitHub Actions", level: "advanced" },
      { name: "Linux", level: "advanced" },
      { name: "Nginx", level: "intermediate" },
    ],
  },
];

export const logoLoopItems: string[] = [
  "Python",
  "PyTorch",
  "React",
  "Next.js",
  "TypeScript",
  "Docker",
  "AWS",
  "PostgreSQL",
  "FastAPI",
  "Kubernetes",
  "TensorFlow",
  "Redis",
  "Node.js",
  "Git",
  "Linux",
  "Tailwind",
];

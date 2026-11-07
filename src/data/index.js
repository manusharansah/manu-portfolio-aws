export const profile = {
  name: "Manu Sharan Kumar",
  title: "Computer Engineer",
  tagline: "Backend Developer · ML Explorer · Builder for Impact",
  subtitle: "Learn · Build · Impact",
  location: "Kathmandu, Nepal 🇳🇵",
  email: "manu.080bct37@acem.edu.np",
  github: "https://github.com/manusharansah",
  linkedin: "https://linkedin.com/in/manusharansah",
  facebook: "https://facebook.com/manusharansah",
  instagram: "https://instagram.com/manusharansah",
  college: "ACEM, Tribhuvan University",
  degree: "B.E. Computer Engineering",
  bio: `I build systems that matter. Computer Engineering undergraduate at ACEM, TU — 
  ranked 1st nationwide in IOE entrance. From deploying end-to-end ML-powered APIs 
  to building blockchain-based verification systems at hackathons, my work sits at 
  the intersection of real problems and practical technology.`,
  philosophy: "Rooted in who I am. Reaching for who I could be.",
  available: true,
}

export const stats = [
  { number: "4.00", label: "GPA — Semester I" },
  { number: "#1", label: "IOE Nationwide Rank" },
  { number: "7+", label: "Projects Built" },
  { number: "2", label: "Hackathons" },
  { number: "2", label: "Books Authored" },
  { number: "30+", label: "LeetCode Solved" },
]

export const skills = [
  {
    category: "Languages",
    items: ["Python", "C", "C++", "JavaScript"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Django", "REST APIs"],
  },
  {
    category: "ML & Data",
    items: ["scikit-learn", "TensorFlow", "Pandas", "NumPy"],
  },
  {
    category: "Databases",
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Git", "GitHub", "AWS Amplify"],
  },
  {
    category: "Frontend",
    items: ["React", "Streamlit"],
  },
]

export const projects = [
  {
    id: 1,
    area: "ML & AI",
    tag: "ML + Backend",
    title: "Insurance Premium Category Predictor",
    description: "End-to-end ML-powered REST API — fully containerized and production-ready. Integrated scikit-learn classification model via REST endpoints with Swagger docs and Streamlit frontend.",
    tech: ["FastAPI", "scikit-learn", "Docker", "Streamlit", "Pydantic"],
    github: "https://github.com/manusharansah/FastAPI/tree/main/insurance_premium_prediction_project",
    featured: true,
  },
  {
    id: 2,
    area: "Blockchain",
    tag: "Blockchain · Began at KU Hackfest 2025",
    title: "VidyaChain — Certificate Verification",
    description: "Blockchain-powered certificate issuance and verification, built to fight certificate fraud in Nepal's education and employment ecosystem. Institutions sign in to issue and revoke certificates; anyone can verify one with a QR code, with documents stored on IPFS. Grew out of the Certichain prototype from KU Hackfest 2025.",
    tech: ["Blockchain", "IPFS", "QR codes", "React", "TypeScript"],
    github: null, // private repository
    demo: "https://vidyachain.vercel.app",
    featured: true,
  },
  {
    id: 3,
    area: "ML & AI",
    tag: "Voice AI · Protobytes Hackathon 2.0",
    title: "SajiloSewa — E-Governance Assistant",
    description: "Voice-powered AI assistant guiding citizens through government services in plain language. Built for accessibility targeting non-tech-savvy and rural Nepalis.",
    tech: ["Voice AI", "Python", "NLP", "FastAPI"],
    github: "https://github.com/manusharansah/protobytes-2.0-team-VoiceNepal",
    featured: true,
  },
  {
    id: 5,
    area: "ML & AI",
    tag: "GIS + LLM · Hackathon",
    title: "MargaAI Nepal — Delivery Route Advisor",
    description: "Decision support system that recommends delivery routes across Nepal's hilly, disaster-prone terrain and explains the choice in plain language. Combines Yen's K-shortest paths and a Held-Karp TSP solver with an LLM reasoning layer. Uses simulated data in this phase.",
    tech: ["FastAPI", "NetworkX", "React", "TypeScript", "Leaflet"],
    github: "https://github.com/manusharansah/Margadarshan",
    featured: true,
  },
  {
    id: 6,
    area: "ML & AI",
    tag: "Speech AI · AI Hackathon 2026",
    title: "EchoNote — Meeting Minutes",
    description: "Turns meeting audio into a transcript, structured minutes and a downloadable PDF. Whisper handles speech-to-text, a local Ollama model drafts the minutes, and the user can review and edit before export.",
    tech: ["FastAPI", "Whisper", "Ollama", "ReportLab", "React"],
    github: "https://github.com/manusharansah/EchoNote",
    featured: true,
  },
  {
    id: 7,
    area: "Full-stack",
    tag: "Full-stack · College Lab",
    title: "Examination Management System",
    description: "Digitises the exam lifecycle for a college: schedules with conflict checks, hall and invigilator allocation, admit cards, mark entry, results, grade calculation and PDF transcripts. Role-based access for admin, faculty and students.",
    tech: ["FastAPI", "SQLAlchemy", "JWT", "React", "TypeScript"],
    github: "https://github.com/manusharansah/Exam_Management_System",
    featured: true,
  },
  {
    id: 8,
    area: "Full-stack",
    tag: "Full-stack SaaS",
    title: "FocusFlow — Task & Focus Manager",
    description: "Task manager with JWT authentication, a Pomodoro-style focus timer, an analytics dashboard and a Stripe-powered subscription tier (test mode). Django REST backend with a React front end.",
    tech: ["Django REST", "React", "Stripe", "Recharts", "JWT"],
    github: "https://github.com/manusharansah/FocusFlow",
    featured: false,
  },
  {
    id: 4,
    area: "ML & AI",
    tag: "ML Pipeline",
    title: "Student Performance Prediction",
    description: "ML regression model predicting student outcomes from academic and behavioral data. Full pipeline: data cleaning → EDA → feature engineering → model evaluation.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    github: "https://github.com/bishal-777/Student-Performance-Predictor",
    featured: false,
  }
]

export const achievements = [
  {
    icon: "🏆",
    title: "IOE Entrance Exam — Rank 1 Nationwide",
    description: "Highest score among all engineering aspirants across Nepal",
    org: "Institute of Engineering, TU",
    year: "2080 B.S.",
  },
  {
    icon: "🎓",
    title: "Tribhuvan University Topper Award",
    description: "Honored for academic excellence with a perfect 4.00 GPA — awarded Rs. 25,000",
    org: "Tribhuvan University",
    year: "2080 B.S.",
  },
  {
    icon: "🌟",
    title: "PEA National Academic Excellence Award",
    description: "Recognized for outstanding academic and technical achievement — honored with Rs. 50,000",
    org: "PEA Nepal",
    year: "2080 B.S.",
  },
  // {
  //   icon: "⛓️",
  //   title: "KU Hackfest 2025 — Certichain",
  //   description: "Built blockchain-based certificate verification system",
  //   org: "Kathmandu University",
  //   year: "2025",
  // },
  // {
  //   icon: "🎙️",
  //   title: "Protobytes Hackathon 2.0 — SajiloSewa",
  //   description: "Built voice-enabled e-governance assistant for rural Nepal",
  //   org: "PACE, ACEM",
  //   year: "2024",
  // },
  // {
  //   icon: "🤖",
  //   title: "IIT Bombay Techfest — ARC Cozmoclench",
  //   description: "International robotics competition qualifier",
  //   org: "IIT Bombay",
  //   year: "2024",
  // },
  // {
  //   icon: "🔬",
  //   title: "Young Scientist Conference",
  //   description: "National level scientific conference participant",
  //   org: "Ministry of Education & NAST",
  //   year: "2024",
  // },
  {
    icon: "📘",
    title: "Published Author — Two Educational Books",
    description: "SEE Bridge Course Book & CTEVT Entrance Preparation Book for underserved communities",
    org: "Garuda Publication",
    year: "2024",
  },
]

export const timeline = [
  {
    year: "2079 B.S.",
    title: "IOE Entrance — Rank 1 Nationwide 🏆",
    description: "Topped the most competitive engineering entrance exam in Nepal among thousands of aspirants.",
  },
  {
    year: "2080 B.S.",
    title: "Started B.E. Computer Engineering @ ACEM",
    description: "Perfect 4.00 GPA in Semester I. Awarded TU Topper Award (Rs. 25,000) and PEA National Excellence Reward (Rs. 50,000).",
  },
  {
    year: "2081 B.S.",
    title: "Leadership, Authorship & International Stage",
    description: "Elected VP of MESS · Authored two educational books · Represented at IIT Bombay Techfest · Maintained 3.92 and 3.93 GPA.",
  },
  {
    year: "2082 B.S. · Now",
    title: "Building, Competing & Going Global",
    description: "KU Hackfest 2025 (Certichain) · Protobytes Hackathon (SajiloSewa) · AWS AI Practitioner · Open Source · Research publication ahead.",
  },
  {
    year: "Ahead →",
    title: "GSoC · MITACS · Research Paper · Global Career",
    description: "The next chapter is international. Building the credentials to match the ambition.",
  },
]

export const currently = [
  "AWS AI Practitioner Certification — in progress",
  "Open Source contributions",
  "Cloud Infrastructure and Cloud Computing",
]

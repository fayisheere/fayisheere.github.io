import React, { useState, useEffect } from "react";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Phone,
  Download,
  Send,
  Code,
  Database,
  BarChart3,
  Smartphone,
  Brain,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    // Debug: Check if credentials are loaded
    console.log("Supabase URL:", SUPABASE_URL);
    console.log("Has API Key:", SUPABASE_ANON_KEY ? "Yes" : "No");
    console.log("API Key length:", SUPABASE_ANON_KEY?.length);

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setFormStatus({
        type: "error",
        message: "Configuration error. Please check Supabase credentials.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          created_at: new Date().toISOString(),
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to send message");
      }

      if (response.ok || response.status === 201) {
        setFormStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus({
        type: "error",
        message: `Failed to send message: ${error.message}. Please try emailing me directly.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const skills = {
    languages: [
      { name: "Dart", level: 90 },
      { name: "Python", level: 85 },
      { name: "SQL", level: 80 },
    ],
    frameworks: [
      { name: "Flutter", level: 92 },
      { name: "Firebase", level: 88 },
      { name: "Supabase", level: 80 },
      { name: "FastAPI", level: 75 },
    ],
    stateManagement: [
      { name: "BLoC", level: 85 },
      { name: "GetX", level: 88 },
      { name: "Provider", level: 90 },
    ],
    dataAnalysis: [
      { name: "Power BI", level: 80 },
      { name: "Pandas", level: 82 },
      { name: "Excel", level: 85 },
      { name: "scikit-learn", level: 75 },
    ],
  };

  const projects = [
    {
      title: "OnBook Solutions – CRM Platform",
      role: "Full-Stack Flutter & React Developer",
      period: "June 2025 – Aug 2025",
      description:
        "Enterprise CRM with web and mobile interfaces, real-time dashboards, role-based access, and comprehensive lead management system.",
      tech: ["Flutter", "Firebase", "FastAPI", "Node.js", "AWS", "BLoC"],
      highlights: [
        "Real-time dashboards with Firebase Streams",
        "Clean Architecture for scalability",
        "Role-based access control",
        "Multi-layer structure (data, domain, presentation)",
      ],
      link: "https://onbook.web.app/",
      icon: Database,
    },
    {
      title: "Dementia Prediction System",
      role: "ML Developer & Data Analyst",
      period: "2024 - 2025",
      description:
        "Machine learning model predicting dementia risk using lifestyle, demographic, and health data with comprehensive data preprocessing and feature engineering.",
      tech: [
        "Python",
        "scikit-learn",
        "Pandas",
        "MySQL",
        "Matplotlib",
        "Seaborn",
      ],
      highlights: [
        "Multiple ML models with ROC-AUC evaluation",
        "Feature selection & importance analysis",
        "Data preprocessing pipeline",
        "Interactive visualizations",
      ],
      icon: Brain,
    },
    {
      title: "AZ Education – Institutional App",
      role: "Flutter Developer & App Manager",
      period: "2025 - Present",
      description:
        "Comprehensive institutional app organizing YouTube video classes by courses and subjects with real-time synchronization.",
      tech: ["Flutter", "Supabase", "Provider", "YouTube API"],
      highlights: [
        "Efficient content loading",
        "Real-time synchronization",
        "Scalable architecture",
        "Seamless video learning experience",
      ],
      icon: Smartphone,
    },
    {
      title: "Wheel Base – Vehicle Collection",
      role: "Flutter Developer",
      period: "2025",
      description:
        "Vehicle management app with detailed record-keeping, cross-device syncing, and secure data sharing capabilities.",
      tech: ["Flutter", "Supabase", "Provider"],
      highlights: [
        "Real-time data syncing",
        "Secure authentication",
        "Data sharing features",
        "Service tracking system",
      ],
      icon: Code,
    },
    {
      title: "Broomie – Service Booking",
      role: "Flutter Developer",
      period: "2025",
      description:
        "Cleaning services management app with booking system, recurring services, and feedback mechanisms.",
      tech: ["Flutter", "Firebase", "GetX"],
      highlights: [
        "Recurring service scheduling",
        "User feedback system",
        "Service management",
        "Optimized booking flow",
      ],
      icon: Smartphone,
    },
  ];

  const experience = [
    {
      title: "Software Developer",
      company: "Popular Auto",
      location: "Ontario, Canada (Remote)",
      period: "June 2025 – Aug 2025",
      responsibilities: [
        "Spearheaded full-stack Flutter development for enterprise CRM",
        "Built real-time backend APIs using FastAPI",
        "Implemented role-based access control and secure authentication",
        "Delivered features in Agile sprints",
        "Enhanced app stability through optimized state management",
      ],
    },
    {
      title: "Data Analyst & ML Developer",
      company: "Cybacor Technologies",
      location: "Kerala, India",
      period: "April 2024 - March 2025",
      responsibilities: [
        "Performed data preprocessing and statistical analysis",
        "Built logistic regression ML models using Python",
        "Created data visualizations with Matplotlib, Seaborn, Power BI",
        "Developed interactive ML applications with Tkinter",
        "Applied EDA on Uber datasets to extract trends",
      ],
    },
    {
      title: "Flutter Developer (Freelance)",
      company: "Multiple Clients",
      location: "Kerala, India",
      period: "April 2024 - May 2025",
      responsibilities: [
        "Built production-grade mobile apps end-to-end",
        "Integrated Firebase and Supabase backends",
        "Provided QA, debugging, and performance optimization",
        "Delivered apps for automotive, education, and service sectors",
      ],
    },
    {
      title: "Flutter Intern",
      company: "GrapesGenix PVT LTD",
      location: "Kerala, India",
      period: "Aug 2023 – Feb 2024",
      responsibilities: [
        "Developed PetCare Android app using Flutter",
        "Integrated Firebase Authentication and Cloud Firestore",
        "Implemented stateful widgets and asynchronous programming",
        "Focused on intuitive UI and smooth navigation",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Fayis.dev
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {[
                "Home",
                "About",
                "Skills",
                "Projects",
                "Experience",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-all duration-300 hover:text-cyan-400 ${
                    activeSection === item.toLowerCase()
                      ? "text-cyan-400 font-semibold"
                      : "text-slate-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-2 flex flex-col gap-4">
              {[
                "Home",
                "About",
                "Skills",
                "Projects",
                "Experience",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-left transition-all duration-300 hover:text-cyan-400 ${
                    activeSection === item.toLowerCase()
                      ? "text-cyan-400 font-semibold"
                      : "text-slate-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-4 animate-fadeIn">
            <p className="text-cyan-400 text-lg font-medium tracking-wide">
              👋 Hello, I'm
            </p>
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              Muhammad Fayis
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 font-light">
              Data Analyst <span className="text-cyan-400">×</span> Software
              Developer
            </p>
          </div>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Building high-performance mobile applications with{" "}
            <span className="text-cyan-400 font-semibold">Flutter</span> and
            deriving actionable insights from complex datasets using{" "}
            <span className="text-emerald-400 font-semibold">Python</span>,
            <span className="text-emerald-400 font-semibold"> Power BI</span>,
            and <span className="text-emerald-400 font-semibold">ML</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-slate-300">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
              <MapPin size={18} className="text-cyan-400" />
              <span>Dubai, UAE</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
              <span className="text-emerald-400">●</span>
              <span>Available Immediately</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-slate-800/50 text-slate-200 font-semibold rounded-lg hover:bg-slate-700/50 transition-all duration-300 border border-slate-700/50"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex justify-center gap-6 pt-8">
            <a
              href="https://github.com/fayisdotdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com/in/fayisdotdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:muhammadfayiskmofficial@gmail.com"
              className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            >
              <Mail size={28} />
            </a>
          </div>

          <div className="pt-12 animate-bounce">
            <ChevronDown size={32} className="mx-auto text-cyan-400/50" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-black mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                A versatile{" "}
                <span className="text-cyan-400 font-semibold">
                  Software Developer & Data Analyst
                </span>{" "}
                with
                <span className="text-emerald-400 font-semibold">
                  {" "}
                  1.5+ years
                </span>{" "}
                of experience in delivering high-performance mobile applications
                and deriving actionable insights from complex datasets.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Skilled in{" "}
                <span className="text-cyan-400">
                  Flutter, Firebase, Supabase, BLoC, GetX, Clean Architecture
                </span>
                , and{" "}
                <span className="text-emerald-400">
                  Python, SQL, Excel, Power BI, Machine Learning
                </span>
                . Experienced in building scalable apps across CRM, service
                booking, and automotive domains.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Strong ability to deliver end-to-end solutions, create
                dashboards and reports, collaborate in Agile teams, and ship
                production-ready features under tight deadlines.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Code,
                  title: "Flutter Development",
                  desc: "Cross-platform mobile apps",
                },
                {
                  icon: BarChart3,
                  title: "Data Analysis",
                  desc: "Python, Power BI, SQL",
                },
                {
                  icon: Brain,
                  title: "Machine Learning",
                  desc: "Predictive models, ML",
                },
                {
                  icon: Database,
                  title: "Backend & Cloud",
                  desc: "Firebase, Supabase, APIs",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <item.icon className="text-cyan-400 mb-3" size={32} />
                  <h3 className="font-semibold text-slate-200 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            {[
              "Analytical Thinking",
              "Problem Solving",
              "Team Collaboration",
              "Agile/Scrum",
              "Communication",
              "Adaptability",
            ].map((strength, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-full text-sm text-slate-300"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-black mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Languages */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                <Code size={28} />
                Programming Languages
              </h3>
              {skills.languages.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Frameworks */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                <Smartphone size={28} />
                Frameworks & Backend
              </h3>
              {skills.frameworks.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000"
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${idx * 0.1}s`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* State Management */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
                <Database size={28} />
                State Management
              </h3>
              {skills.stateManagement.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Data Analysis */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
                <BarChart3 size={28} />
                Data Analysis & ML
              </h3>
              {skills.dataAnalysis.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-black mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="p-8 space-y-4">
                  <div className="flex items-start justify-between">
                    <project.icon
                      className="text-cyan-400 group-hover:scale-110 transition-transform duration-300"
                      size={40}
                    />
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-cyan-400 mb-1">{project.role}</p>
                    <p className="text-xs text-slate-500">{project.period}</p>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-400"
                      >
                        <span className="text-emerald-400 mt-1">→</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-700/50 text-xs text-slate-300 rounded-full border border-slate-600/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-32 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-5xl font-black mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>

          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-cyan-400 font-semibold">{exp.company}</p>
                    <p className="text-slate-400 text-sm">{exp.location}</p>
                  </div>
                  <span className="text-emerald-400 text-sm font-medium mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 mt-6">
                  {exp.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <span className="text-cyan-400 mt-1 text-lg">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl font-black mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className="text-center text-slate-400 text-lg mb-16">
            Currently open to new opportunities and exciting projects
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <Mail className="text-cyan-400" size={24} />
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <a
                      href="mailto:muhammadfayiskmofficial@gmail.com"
                      className="text-slate-200 hover:text-cyan-400 transition-colors"
                    >
                      muhammadfayiskmofficial@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <Phone className="text-cyan-400" size={24} />
                  <div>
                    <p className="text-sm text-slate-400">UAE</p>
                    <a
                      href="tel:+971568411600"
                      className="text-slate-200 hover:text-cyan-400 transition-colors"
                    >
                      +971 56 841 1600
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <Phone className="text-emerald-400" size={24} />
                  <div>
                    <p className="text-sm text-slate-400">India</p>
                    <a
                      href="tel:+917034129778"
                      className="text-slate-200 hover:text-emerald-400 transition-colors"
                    >
                      +91 70341 29778
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="text-cyan-400" size={24} />
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="text-slate-200">Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {formStatus.message && (
                  <div
                    className={`p-4 rounded-lg ${
                      formStatus.type === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/fayisdotdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/fayisdotdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:muhammadfayiskmofficial@gmail.com"
              className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>

          <p className="text-slate-500 text-sm">
            © 2025 Muhammad Fayis K.M. Built with React & Supabase
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;

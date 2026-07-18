import React, { useState } from "react";
import SEO from "../seo/SEO";
import { ExternalLink, Sparkles, Globe, Smartphone, Compass } from "lucide-react";

const PROJECTS_DATA = [
  {
    title: "Sandeep Pandit Developer Portfolio",
    link: "https://www.portfolio.deepitlabs.in",
    category: "SaaS & Web",
    desc: "The primary professional engineering portfolio of Sandeep Pandit, showcasing interactive developer tools, career credentials, and custom codebase integrations.",
    tags: ["Vite", "React 19", "Tailwind 4", "SEO Optimized"],
    metric: "100%",
    metricTitle: "Google SEO Speed Score",
    icon: Globe,
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "group-hover:border-cyan-500/40",
    shadowColor: "group-hover:shadow-cyan-500/10",
    metricColor: "text-cyan-400"
  },
  {
    title: "Haajari App Attendance Tracker",
    link: "https://www.haajari.deepitlabs.in",
    category: "Mobile & ERP",
    desc: "Geofenced contractor operations app built to automate time tracking, site sync buffers, and payroll reporting for field projects.",
    tags: ["React Native", "Node.js", "MongoDB", "Geofencing"],
    metric: "99.7%",
    metricTitle: "Admin Uptime & Sync Rate",
    icon: Smartphone,
    gradient: "from-orange-500/20 to-amber-500/20",
    borderColor: "group-hover:border-orange-500/40",
    shadowColor: "group-hover:shadow-orange-500/10",
    metricColor: "text-orange-400"
  },
  {
    title: "All India 3D Studio",
    link: "https://www.allindia3dstudio.deepitlabs.in",
    category: "Web 3D & Design",
    desc: "An interactive, web-based 3D design portal displaying high-definition architectural mockups, virtual animations, and visual layouts.",
    tags: ["WebGL", "Three.js", "React Fiber", "Tailwind CSS"],
    metric: "60 FPS",
    metricTitle: "Smooth WebGL Rendering",
    icon: Compass,
    gradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "group-hover:border-purple-500/40",
    shadowColor: "group-hover:shadow-purple-500/10",
    metricColor: "text-purple-400"
  }
];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "SaaS & Web", "Mobile & ERP", "Web 3D & Design"];

  const filteredProjects =
    filter === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((item) => item.category === filter);

  return (
    <section className="relative bg-[#06070D] text-white py-24 px-6 md:px-12 overflow-hidden">
      <SEO
        title="Featured Software Portfolios | Deep IT Labs India"
        description="Explore live production applications, geofenced mobile apps, and WebGL 3D studios engineered by Deep IT Labs Nashik. Verify our coding quality."
        keywords="MERN Stack Development, React Development Company, Node.js Development Company, ERP Development Company, CRM Development Company, SaaS Development Company, Custom Software Development, Software Company in Nashik, Web Development Company Nashik, IT Company Nashik"
        url="https://www.deepitlabs.in/portfolio"
      />

      {/* Decorative backdrop mesh */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #8B7CFF 1px, transparent 1px), linear-gradient(to bottom, #8B7CFF 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Verifiable Client Deliveries
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
            Our Live Work & Portfolios
          </h1>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            We don't just write guidelines; we build high-speed deployment systems. Explore our live production portfolios, mobile systems, WebGL catalogs, and custom checkout shops.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-3 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer
              ${
                filter === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-500"
                  : "bg-slate-900/40 border border-slate-900 text-slate-400 hover:border-slate-800 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            const IconComponent = project.icon;
            return (
              <div
                key={idx}
                className={`group relative rounded-3xl bg-slate-900/10 border border-slate-900 p-8 flex flex-col justify-between gap-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${project.borderColor} hover:shadow-2xl ${project.shadowColor}`}
              >
                
                {/* Upper Details */}
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center border border-slate-800`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" /> {project.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </div>

                {/* Mid section: Metric highlight */}
                <div className="bg-slate-900/30 border border-slate-900/50 rounded-2xl p-4.5 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono block mb-0.5">Key Metric Outcome</span>
                    <h4 className={`text-2xl font-black ${project.metricColor}`}>{project.metric}</h4>
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold text-right max-w-[150px] leading-tight">
                    {project.metricTitle}
                  </div>
                </div>

                {/* Bottom section: Tags & CTA */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono bg-slate-950/60 text-slate-400 border border-slate-900 px-2.5 py-1.5 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:bg-indigo-600 hover:border-indigo-500 text-white text-xs font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-md shadow-black/20"
                  >
                    Launch Live Project <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
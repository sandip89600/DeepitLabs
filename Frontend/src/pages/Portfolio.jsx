import React, { useState } from "react";

const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "SaaS", "ERP/CRM", "API Integration"];

  const projects = [
    {
      title: "SaaS Analytics Dashboard",
      category: "SaaS",
      image: "https://as2.ftcdn.net/v2/jpg/03/64/25/69/1000_F_364256948_PrTDg9ViiZqcJ8nCIZNhgrnHNA1fYeVn.jpg",
      desc:
        "A real-time analytics platform built using the MERN Stack with advanced charts, authentication, and optimized database queries.",
      tags: ["React", "Node.js", "MongoDB", "Chart.js"],
      metric: "+45%",
      metricTitle: "Rendering Speed",
    },
    {
      title: "Global Supply Chain CRM",
      category: "ERP/CRM",
      image: "https://www.sistemaimpulsa.com/blog/wp-content/uploads/2024/01/Automatizar-procesos-de-venta-con-un-CRM-1536x1024.jpg",
      desc:
        "Enterprise CRM solution for logistics companies with warehouse management, order tracking and reporting.",
      tags: ["MERN", "Docker", "Cloudinary", "JWT"],
      metric: "99.9%",
      metricTitle: "System Uptime",
    },
    {
      title: "Fintech Payment Gateway",
      category: "API Integration",
      image: "https://tse3.mm.bing.net/th/id/OIP.xgBM7J05KZS8nXZxOwX9LgHaEt?rs=1&pid=ImgDetMain&o=7&rm=3",
      desc:
        "Secure payment gateway with JWT authentication, Helmet security, Rate Limiting and API monitoring.",
      tags: ["Express", "Helmet", "JWT", "Redis"],
      metric: "500K+",
      metricTitle: "Transactions",
    },
    {
      title: "EdTech Learning Platform",
      category: "SaaS",
      image: "https://tse1.mm.bing.net/th/id/OIP.Ns0hzsNAINabHxLIwUU0QgHaD4?rs=1&pid=ImgDetMain&o=7&rm=3",
      desc:
        "Modern learning platform supporting student dashboards, course management and file uploads.",
      tags: ["React", "MongoDB", "Tailwind", "AWS"],
      metric: "25K+",
      metricTitle: "Students",
    },
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((item) => item.category === filter);

  return (
    <section className="bg-slate-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-indigo-400 font-semibold">
            Portfolio
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Our Completed Projects
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto mt-5">
            We build modern software products with scalability,
            performance and beautiful user experiences.
          </p>
        </div>

        {/* Filter */}

        <div className="flex justify-center flex-wrap gap-4 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300

              ${
                filter === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-indigo-500 hover:text-white"
              }
              
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 gap-10">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group rounded-3xl overflow-hidden bg-slate-900/50 border border-slate-800 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20"
            >
              {/* Image */}

              <div className="relative overflow-hidden h-72">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <span className="absolute top-5 right-5 bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-semibold">
                  {project.category}
                </span>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center bg-black/50">
                  <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                    View Case Study →
                  </button>
                </div>
              </div>

              {/* Content */}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  {project.title}
                </h3>

                <p className="text-slate-400 leading-7 mb-7">
                  {project.desc}
                </p>

                {/* Metric */}

                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 flex justify-between items-center mb-7">
                  <div>
                    <h4 className="text-3xl font-bold text-indigo-400">
                      {project.metric}
                    </h4>

                    <p className="text-slate-400 text-sm mt-1">
                      {project.metricTitle}
                    </p>
                  </div>

                  <div className="text-4xl">🚀</div>
                </div>

                {/* Tags */}

                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 text-sm hover:bg-indigo-600 hover:text-white transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}

                <button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 py-4 rounded-xl font-semibold transition-all duration-300">
                  Explore Project →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
import React, { useState } from 'react';
import { ExternalLink, Github, Search, Filter } from 'lucide-react';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // This would be replaced with your backend data
  const projects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with admin dashboard, payment integration, and inventory management.',
      image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      category: 'Full Stack',
      githubLink: 'https://github.com/username/ecommerce',
      deployedLink: 'https://ecommerce-demo.com',
      featured: true,
      status: 'Completed',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      name: 'Task Management App',
      description: 'A collaborative project management tool with real-time updates, team collaboration features.',
      image: 'https://images.pexels.com/photos/7376/startup-photos.jpg',
      techStack: ['React', 'TypeScript', 'Socket.io', 'Express', 'MongoDB'],
      category: 'Full Stack',
      githubLink: 'https://github.com/username/taskmanager',
      deployedLink: 'https://taskmanager-demo.com',
      featured: true,
      status: 'Completed',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'Weather Dashboard',
      description: 'A responsive weather application with location-based forecasts and interactive charts.',
      image: 'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg',
      techStack: ['React', 'Chart.js', 'Weather API', 'Tailwind CSS'],
      category: 'Frontend',
      githubLink: 'https://github.com/username/weather-app',
      deployedLink: 'https://weather-dashboard-demo.com',
      featured: false,
      status: 'Completed',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      name: 'API Authentication Service',
      description: 'A robust authentication microservice with JWT tokens, role-based access control.',
      image: 'https://images.pexels.com/photos/270557/pexels-photo-270557.jpeg',
      techStack: ['Node.js', 'Express', 'JWT', 'PostgreSQL', 'Docker'],
      category: 'Backend',
      githubLink: 'https://github.com/username/auth-service',
      deployedLink: null,
      featured: false,
      status: 'Completed',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      name: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with data visualization and reporting.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      techStack: ['Next.js', 'Python', 'Django', 'Chart.js', 'PostgreSQL'],
      category: 'Full Stack',
      githubLink: 'https://github.com/username/social-dashboard',
      deployedLink: 'https://social-dashboard-demo.com',
      featured: true,
      status: 'In Progress',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      name: 'Mobile Fitness Tracker',
      description: 'React Native app for fitness tracking with workout plans and progress monitoring.',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
      techStack: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
      category: 'Mobile',
      githubLink: 'https://github.com/username/fitness-tracker',
      deployedLink: null,
      featured: false,
      status: 'Completed',
      color: 'from-teal-500 to-green-500'
    }
  ];

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
      <div className="relative">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20`}></div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            project.status === 'Completed' 
              ? 'bg-green-100 text-green-600 border border-green-200' 
              : 'bg-yellow-100 text-yellow-600 border border-yellow-200'
          }`}>
            {project.status}
          </span>
        </div>
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium border border-purple-200">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <Github size={18} />
            <span className="text-sm">Code</span>
          </a>
          {project.deployedLink && (
            <a
              href={project.deployedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              <ExternalLink size={18} />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            My Projects
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Here are some of the projects I've worked on recently
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white text-gray-800 rounded-full border border-gray-200 focus:border-purple-400 focus:outline-none transition-colors duration-200 shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">
              No projects found matching your criteria
            </p>
          </div>
        )}

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            View All Projects on GitHub
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
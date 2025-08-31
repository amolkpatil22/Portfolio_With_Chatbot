import { useState } from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = () => {
  const [showAll, setShowAll] = useState(false);

  const experiences = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      duration: 'Jan 2023 - Present',
      type: 'Full-time',
      description: 'Leading development of scalable web applications and mentoring junior developers.',
      achievements: [
        'Built and deployed 5+ production applications serving 10k+ users',
        'Reduced application load time by 40% through optimization techniques',
        'Led a team of 3 developers on a major e-commerce platform redesign',
        'Implemented CI/CD pipelines reducing deployment time by 60%'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      companyLogo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'Remote',
      duration: 'Jun 2021 - Dec 2022',
      type: 'Full-time',
      description: 'Developed MVP and core features for a fast-growing fintech startup.',
      achievements: [
        'Built the entire frontend from scratch using React and TypeScript',
        'Designed and implemented RESTful APIs handling 1M+ requests daily',
        'Integrated payment systems with Stripe and PayPal',
        'Collaborated with design team to create pixel-perfect UI components'
      ],
      technologies: ['React', 'TypeScript', 'Express.js', 'MongoDB', 'Stripe'],
      companyLogo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      company: 'Digital Agency Pro',
      position: 'Frontend Developer',
      location: 'New York, NY',
      duration: 'Aug 2020 - May 2021',
      type: 'Full-time',
      description: 'Created responsive websites and web applications for various clients.',
      achievements: [
        'Delivered 15+ client projects with 100% on-time completion rate',
        'Improved website performance scores by average of 35%',
        'Implemented responsive designs supporting all device types',
        'Collaborated with UX/UI designers on user experience improvements'
      ],
      technologies: ['HTML/CSS', 'JavaScript', 'React', 'Sass', 'WordPress'],
      companyLogo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      company: 'FreelanceWork',
      position: 'Web Developer',
      location: 'Remote',
      duration: 'Jan 2020 - Jul 2020',
      type: 'Freelance',
      description: 'Provided web development services to small businesses and startups.',
      achievements: [
        'Completed 10+ freelance projects for various industries',
        'Built custom WordPress themes and plugins',
        'Helped clients increase online presence and sales',
        'Maintained long-term relationships with repeat clients'
      ],
      technologies: ['WordPress', 'PHP', 'JavaScript', 'MySQL', 'HTML/CSS'],
      companyLogo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Work Experience
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            My professional journey and the impact I've made at various organizations
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-8 top-0 w-0.5 bg-gradient-to-b from-purple-200 via-pink-200 to-orange-200 hidden lg:block ${showAll ? 'bottom-0' : 'bottom-32'
            }`}></div>

          <div className="space-y-12">
            {(showAll ? experiences : experiences.slice(0, 3)).map((exp) => (
              <div key={exp.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg hidden lg:block"></div>

                <div className="lg:ml-16">
                  <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${exp.color} opacity-20`}></div>
                          <img
                            src={exp.companyLogo}
                            alt={`${exp.company} logo`}
                            className="relative z-10 w-full h-full rounded-2xl object-cover border-2 border-white shadow-lg"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                          <div>
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1">
                              {exp.position}
                            </h3>
                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-2">
                              <Building size={18} className="text-purple-500" />
                              {exp.company}
                            </div>
                          </div>

                          <div className="flex flex-col lg:items-end gap-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar size={16} />
                              <span className="text-sm font-medium">{exp.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin size={16} />
                              <span className="text-sm">{exp.location}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${exp.type === 'Full-time'
                              ? 'bg-green-100 text-green-600 border border-green-200'
                              : 'bg-blue-100 text-blue-600 border border-blue-200'
                              }`}>
                              {exp.type}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Key Achievements */}
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Achievements</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 text-sm leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className={`px-3 py-1 bg-gradient-to-r ${exp.color} text-white rounded-full text-xs font-medium shadow-sm`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {experiences.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {showAll ? 'Show Less' : `Show More (${experiences.length - 3} more)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
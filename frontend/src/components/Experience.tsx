import { useState } from 'react';
import { Calendar, MapPin, Building, Loader2 } from 'lucide-react';
import { useIntersectionFetch } from '../hooks/useIntersectionFetch';
import { api, Portfolio } from '../services/api';

const Experience = () => {
  const [showAll, setShowAll] = useState(false);
  const { data: apiExperiences, loading, setRef } = useIntersectionFetch<Portfolio[]>(
    () => api.getPortfolioByType('experience')
  );

  // Transform API data to match existing UI structure
  const experiences = apiExperiences?.map((exp, index) => ({
    id: index + 1,
    company: exp.metadata?.company || 'Company',
    position: exp.title,
    location: exp.metadata?.location || 'Location',
    duration: exp.metadata?.startDate && exp.metadata?.endDate
      ? `${exp.metadata.startDate} - ${exp.metadata.endDate}`
      : 'Duration',
    type: exp.metadata?.employmentType || 'Full-time',
    description: exp.content,
    achievements: exp.metadata?.keyAchievements || [],
    technologies: exp.metadata?.skills || [],
    companyLogo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    color: ['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500'][index % 3]
  })) || [];


  if (loading) {
    return (
      <section ref={setRef} id="experience" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            <span className="text-gray-600">Loading experience...</span>
          </div>
        </div>
      </section>
    );
  }

  // Show message if no experience data
  if (!loading && experiences.length === 0) {
    return (
      <section ref={setRef} id="experience" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Work Experience
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              My professional journey and the impact I've made at various organizations
            </p>
          </div>
          <div className="text-center text-gray-600">
            <Building className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">Experience information will be available soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={setRef} id="experience" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
                            {exp.achievements.map((achievement: string, achIndex: number) => (
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
                            {exp.technologies.map((tech: string, techIndex: number) => (
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
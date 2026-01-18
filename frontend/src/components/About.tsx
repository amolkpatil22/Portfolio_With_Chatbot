import { Code, Coffee, Users, Award, Loader2 } from 'lucide-react';
import { useIntersectionFetch } from '../hooks/useIntersectionFetch';
import { api, Portfolio } from '../services/api';

const About = () => {
  const { data: aboutData, loading, setRef } = useIntersectionFetch<Portfolio[]>(
    () => api.getPortfolioByType('personal')
  );
  const { data: educationData, loading: isEduationLoading, setRef: educationRef } = useIntersectionFetch<Portfolio[]>(
    () => api.getPortfolioByType('education')
  );

  const stats = [
    { icon: Code, label: 'Projects Completed', value: '10+' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
    { icon: Users, label: 'Happy Clients', value: '4+' },
    { icon: Award, label: 'Years Experience', value: '4+' },
  ];

  return (
    <section ref={setRef} id="about" className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
      <div ref={educationRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get to know more about me, my skills, and my journey as a developer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              I'm a passionate developer who loves creating amazing experiences
            </h3>

            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                <span className="text-gray-600">Loading...</span>
              </div>
            ) : aboutData && aboutData.length > 0 ? (
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {aboutData[0].content.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  No data to show, Please refresh the page
                </p>
              </div>
            )}

            <div className="pt-4" >
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Education & Certifications</h4>
              {isEduationLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                  <span className="text-gray-600">Loading education...</span>
                </div>
              ) : educationData && educationData.length > 0 ? (
                <div className="space-y-4">
                  {educationData
                    .map((edu) => (
                      <div key={edu._id} className="bg-white/50 p-4 rounded-lg border border-purple-100">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-gray-800">{edu.metadata?.degree} in {edu.metadata?.field}</h5>
                          <span className="text-sm text-purple-600 font-medium">{edu.metadata?.year}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{edu.metadata?.issuer}, {edu.metadata?.location}</p>
                        {edu.metadata?.links?.certificate && (
                          <a
                            href={edu.metadata.links.certificate as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            View Certificate →
                          </a>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  No education data available
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4">
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
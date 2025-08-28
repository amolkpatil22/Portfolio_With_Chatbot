import React from 'react';
import { Code, Coffee, Users, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Code, label: 'Projects Completed', value: '50+' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
    { icon: Users, label: 'Happy Clients', value: '25+' },
    { icon: Award, label: 'Years Experience', value: '3+' },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                With over 3 years of experience in web development, I specialize in creating 
                robust, scalable applications using modern technologies. My journey began with 
                a curiosity for how things work on the web, which evolved into a passion for 
                building digital solutions that make a difference.
              </p>
              
              <p>
                I have extensive experience in React, Node.js, Python, and various databases. 
                I'm particularly interested in full-stack development, cloud technologies, and 
                creating seamless user experiences. I believe in writing clean, maintainable 
                code and following best practices.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing 
                to open source projects, or sharing knowledge with the developer community. 
                I'm always excited to take on new challenges and collaborate on innovative projects.
              </p>
            </div>

            <div className="pt-4">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Education & Certifications</h4>
              <div className="space-y-2 text-gray-600">
                <p>• Bachelor's in Computer Science - University Name (2020)</p>
                <p>• AWS Certified Developer - Associate</p>
                <p>• Full Stack Web Development Certification</p>
              </div>
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
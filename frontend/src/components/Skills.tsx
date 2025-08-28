import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      color: 'from-pink-500 to-rose-500',
      skills: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Next.js',
        'HTML/CSS',
        'JavaScript',
      ],
    },
    {
      title: 'Backend',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        'Node.js',
        'Python',
        'Express.js',
        'Django',
        'REST APIs',
        'GraphQL',
      ],
    },
    {
      title: 'Database & Tools',
      color: 'from-green-500 to-emerald-500',
      skills: [
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Git',
        'Docker',
        'AWS',
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Skills & Technologies
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Here are some of the technologies I work with regularly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <span className="text-white font-bold text-xl">{category.title.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-4 py-2 bg-gradient-to-r ${category.color} text-white rounded-full font-medium text-sm hover:scale-105 transition-transform duration-200 shadow-md`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
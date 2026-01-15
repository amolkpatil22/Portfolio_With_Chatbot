import { Github, Linkedin, Mail, Download, ChevronDown, Loader2 } from 'lucide-react';
import { useIntersectionFetch } from '../hooks/useIntersectionFetch';
import { api, Portfolio } from '../services/api';

const Hero = () => {
  const { data: aboutData, loading, setRef } = useIntersectionFetch<Portfolio[]>(
    () => api.getPortfolioByType('personal')
  );
  
  return (
    <section ref={setRef} id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Profile Image */}
          <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-cyan-200 animate-spin-slow"></div>
            <img
              src="/assets/profilePhoto.jpg"
              alt="Profile"
              className="relative z-10 w-full h-full rounded-full object-cover border-4 border-white shadow-2xl m-1"
            />
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-white/90 text-lg md:text-xl font-medium animate-fade-in">Hello, I'm</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
                Amol Patil
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="h-8 w-48 bg-white/20 rounded animate-pulse"></div>
                  </div>
                ) : (
                  aboutData?.[0]?.metadata?.role || "Full Stack Developer"
                )}
              </p>
            </div>

            {loading ? (
              <div className="space-y-2 max-w-3xl mx-auto">
                <div className="h-6 bg-white/20 rounded animate-pulse"></div>
                <div className="h-6 bg-white/20 rounded animate-pulse w-4/5 mx-auto"></div>
              </div>
            ) : (
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                {aboutData?.[0]?.content?.split('\n\n')[0] || "I create innovative web applications with modern technologies. Passionate about clean code, user experience, and solving complex problems."}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {aboutData?.[0]?.metadata?.links?.resume ? (
                <a
                  href={aboutData[0].metadata.links.resume as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2"
                >
                  <Download size={20} />
                  Download Resume
                </a>
              ) : (
                <button className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2">
                  <Download size={20} />
                  Resume Not Available
                </button>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 pt-6">
              {aboutData?.[0]?.metadata?.links?.github && (
                <a
                  href={aboutData[0].metadata.links.github as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110 transform bg-white/10 p-3 rounded-full hover:bg-white/20"
                >
                  <Github size={28} />
                </a>
              )}
              {aboutData?.[0]?.metadata?.links?.linkedin && (
                <a
                  href={aboutData[0].metadata.links.linkedin as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110 transform bg-white/10 p-3 rounded-full hover:bg-white/20"
                >
                  <Linkedin size={28} />
                </a>
              )}
              {aboutData?.[0]?.metadata?.email && (
                <a
                  href={`mailto:${aboutData[0].metadata.email}`}
                  className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110 transform bg-white/10 p-3 rounded-full hover:bg-white/20"
                >
                  <Mail size={28} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronDown size={32} className="text-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Loader2 } from 'lucide-react';
import { useIntersectionFetch } from '../hooks/useIntersectionFetch';
import { api, Portfolio } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { data: personalData, loading, setRef } = useIntersectionFetch<Portfolio[]>(
    () => api.getPortfolioByType('personal')
  );

  const personal = personalData?.[0];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission here - integrate with your backend
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personal?.metadata?.email || 'amolkpatil22@gmail.com',
      href: `mailto:${personal?.metadata?.email || 'amolkpatil22@gmail.com'}`,
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personal?.metadata?.mobile ? `+91 ${personal.metadata.mobile}` : '+91 74101 02009',
      href: `tel:+91${personal?.metadata?.mobile || '7410102009'}`,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bangalore, India',
      href: '#',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: personal?.metadata?.links?.github || 'https://github.com/amolkpatil22',
      color: 'from-gray-700 to-gray-900'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personal?.metadata?.links?.linkedin?.startsWith('http')
        ? personal.metadata.links.linkedin
        : `https://${personal?.metadata?.links?.linkedin || 'www.linkedin.com/in/amol-patil-73b82926a'}`,
      color: 'from-blue-600 to-blue-800'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/amolkpatil22',
      color: 'from-sky-400 to-blue-500'
    }
  ];

  return (
    <section ref={setRef} id="contact" className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-600">Loading contact info...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Let's Connect
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Whether you have a project in mind, want to collaborate, or just want to say hello,
                  I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-xl transition-all duration-200 group border border-gray-100"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <info.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{info.label}</p>
                      <p className="text-gray-800 font-semibold">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110 shadow-lg`}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 text-gray-800 rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 text-gray-800 rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none transition-colors duration-200"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
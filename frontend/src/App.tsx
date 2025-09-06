import { useState } from 'react';
import ServerStartup from './components/ServerStartup';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  const [serverReady, setServerReady] = useState(false);

  const handleServerReady = () => {
    setServerReady(true);
  };

  // Show server startup screen first
  if (!serverReady) {
    return <ServerStartup onServerReady={handleServerReady} />;
  }

  // Show portfolio once server is ready
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Server, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ServerStartupProps {
  onServerReady: () => void;
}

const ServerStartup: React.FC<ServerStartupProps> = ({ onServerReady }) => {
  const [status, setStatus] = useState<'starting' | 'success' | 'error'>('starting');
  const [message, setMessage] = useState('Waking up the server...');
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    startServer();
  }, []);

  const startServer = async () => {
    try {
      setStatus('starting');
      setMessage('Starting server... Maximum wait time: 120 seconds');

      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setStatus('error');
            setMessage('Server startup timeout. Please refresh the page to try again.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Check if server is running
      const response = await fetch('https://portfolio-with-chatbot-iwd0.onrender.com', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearInterval(countdownInterval);

      if (response.ok) {
        setStatus('success');
        setMessage('Server is ready! Redirecting to portfolio...');

        // Wait 2 seconds before redirecting
        setTimeout(() => {
          onServerReady();
        }, 2000);
      } else {
        throw new Error('Server startup failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to start server. Please refresh the page to try again.');
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md mx-auto px-6 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Server Icon */}
          <div className="relative mx-auto w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-cyan-200 animate-spin-slow"></div>
            <div className="relative z-10 w-full h-full rounded-full bg-white flex items-center justify-center m-1">
              {status === 'starting' && <Server className="w-8 h-8 text-purple-600" />}
              {status === 'success' && <CheckCircle className="w-8 h-8 text-green-600" />}
              {status === 'error' && <AlertCircle className="w-8 h-8 text-red-600" />}
            </div>
          </div>

          {/* Status Message */}
          <h1 className="text-2xl font-bold text-white mb-4">
            {status === 'starting' && 'Starting Server'}
            {status === 'success' && 'Server Ready!'}
            {status === 'error' && 'Server Error'}
          </h1>

          <p className="text-white/90 mb-6 leading-relaxed">
            {message}
          </p>

          {/* Countdown Timer */}
          {status === 'starting' && (
            <div className="mb-6">
              <div className="text-4xl font-bold text-white mb-2">
                {countdown}
              </div>
              <p className="text-white/70 text-sm">seconds remaining</p>
            </div>
          )}

          {/* Loading Spinner */}
          {status === 'starting' && (
            <div className="flex items-center justify-center mb-4">
              <Loader2 className="w-6 h-6 text-white animate-spin mr-2" />
              <span className="text-white/80 text-sm">Please wait...</span>
            </div>
          )}

          {/* Success Message */}
          {status === 'success' && (
            <div className="text-green-300 text-sm">
              ✨ Redirecting in 2 seconds...
            </div>
          )}


          {/* Additional Info */}
          <div className="mt-6 text-white/60 text-xs">
            <p>Free servers need time to wake up</p>
            <p>Maximum wait time: 120 seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerStartup;
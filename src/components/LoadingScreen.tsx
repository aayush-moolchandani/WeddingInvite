import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import music for preloading
import weddingMusic from '../assets/couple/music.mp3';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Your invitation is loading, please wait...');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      // Detect mobile device for different loading strategy
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      const steps = [
        { text: 'Preparing your invitation...', progress: 25 },
        { text: 'Loading beautiful memories...', progress: 50 },
        { text: 'Setting up the celebration...', progress: 75 },
        { text: 'Almost ready...', progress: 90 },
        { text: 'Your invitation is ready!', progress: 100 }
      ];

      try {
        // Step 1: Prepare invitation
        setLoadingText(steps[0].text);
        setProgress(steps[0].progress);
        await new Promise(resolve => setTimeout(resolve, 400));

        // Step 2: Load music (with timeout for mobile)
        setLoadingText(steps[1].text);
        setProgress(steps[1].progress);
        
        const musicPromise = new Promise((resolve) => {
          const audio = new Audio();
          audio.oncanplaythrough = () => {
            console.log('🎵 Music fully loaded');
            resolve('music loaded');
          };
          audio.oncanplay = () => {
            console.log('🎵 Music can play (mobile fallback)');
            resolve('music can play');
          };
          audio.onerror = (e) => {
            console.log('🎵 Music loading error:', e);
            resolve('music failed');
          };
          audio.onloadstart = () => console.log('🎵 Music loading started');
          audio.onstalled = () => console.log('🎵 Music loading stalled');
          
          audio.preload = isMobile ? 'metadata' : 'auto';
          audio.src = weddingMusic;
          
          console.log('🎵 Starting music load, mobile:', isMobile);
        });

        // Add timeout to prevent getting stuck
        const timeoutPromise = new Promise((resolve) => {
          setTimeout(() => {
            console.log('⏰ Music loading timeout reached');
            resolve('timeout');
          }, isMobile ? 3000 : 5000);
        });

        const result = await Promise.race([musicPromise, timeoutPromise]);
        console.log('🎵 Music loading result:', result);

        // If timeout on mobile, skip to next step immediately
        if (result === 'timeout' && isMobile) {
          console.log('📱 Mobile timeout - skipping to next step');
          setLoadingText(steps[2].text);
          setProgress(steps[2].progress);
        } else {
          // Step 3: Set up celebration
          setLoadingText(steps[2].text);
          setProgress(steps[2].progress);
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        // Step 4: Almost ready
        setLoadingText(steps[3].text);
        setProgress(steps[3].progress);
        await new Promise(resolve => setTimeout(resolve, 200));

        // Step 5: Complete
        setLoadingText(steps[4].text);
        setProgress(steps[4].progress);
        await new Promise(resolve => setTimeout(resolve, 300));

        setIsComplete(true);
        
        // Wait a bit more for the complete animation
        setTimeout(() => {
          onComplete();
        }, 800);

      } catch (error) {
        console.error('Loading error:', error);
        // Even if there's an error, complete the loading
        setLoadingText('Ready!');
        setProgress(100);
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    loadAssets();
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[99999] bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto px-8">
          {/* Wedding Logo/Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-400 via-purple-500 to-rose-500 rounded-full flex items-center justify-center shadow-2xl">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                💍
              </motion.span>
            </div>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
              Your Invitation is Loading
            </h1>
            <p className="text-lg text-gray-600 font-light mb-2">
              Please wait while we prepare something special for you
            </p>
            <p className="text-sm text-gray-500 italic">
              Aayush & Tanya's Wedding Invitation
            </p>
          </motion.div>

          {/* Loading Progress */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6"
          >
            <div className="w-full bg-white/50 rounded-full h-3 mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              {loadingText}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {progress}% Complete
            </p>
          </motion.div>

          {/* Floating Hearts Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-300 text-2xl"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  opacity: 0
                }}
                animate={{
                  y: -50,
                  opacity: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut"
                }}
              >
                💕
              </motion.div>
            ))}
          </div>

          {/* Complete Animation */}
          {isComplete && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mt-6"
            >
              <div className="text-3xl mb-3">🎉</div>
              <p className="text-lg text-green-600 font-semibold mb-1">
                Welcome to our celebration!
              </p>
              <p className="text-sm text-gray-600">
                Your invitation is ready
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;

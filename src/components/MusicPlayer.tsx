import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  autoplay?: boolean;
}

const MusicPlayer = ({ autoplay = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-show the music player on first visit
    const hasVisited = localStorage.getItem('musicPlayerVisited');
    if (!hasVisited) {
      setIsVisible(true);
      localStorage.setItem('musicPlayerVisited', 'true');
    } else {
      setIsVisible(false);
    }
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    // Simulate audio playback (replace with actual audio control)
    const audioElement = document.getElementById('background-music') as HTMLAudioElement;
    if (audioElement) {
      if (!isPlaying) {
        audioElement.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioElement.pause();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const hidePlayer = () => {
    setIsVisible(false);
  };

  return (
    <>
      {/* Background Music Track - Simulation Mode */}
      {isPlaying && (
        <div className="hidden">
          {/* Due to copyright protection on JioSaavn, we're simulating the playback
              You can replace this with your own audio file or use streaming links */}
          <audio id="background-music" loop muted={isMuted}>
            {/* Place your own audio file here - Wedding music .mp3/.wav etc. */}
            <source src="/assets/wedding-music.mp3" type="audio/mpeg" />
          </audio>
        </div>
      )}

      {/* Floating Music Notes Animation */}
      {isPlaying && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: [0, 1, 0],
                y: [100, -100],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                delay: i * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute text-2xl text-purple-400"
              style={{
                left: `${10 + i * 12}%`,
                fontSize: `${16 + i * 2}px`,
              }}
            >
              {['♪', '♫', '♬', '♩', '♪', '♫', '♬', '♩'][i]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Music Player */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20"
            >
              {/* Song Info */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center mb-2">
                  <Music className="text-purple-600 mr-2" size={20} />
                  <span className="text-sm font-medium text-gray-700">Wedding Melody</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Dekha Hazaro Dafaa</h3>
                <p className="text-xs text-gray-500 mb-1">Arijit Singh • Best Of Romance</p>
                <motion.a 
                  href="https://www.jiosaavn.com/song/dekha-hazaro-dafaa/LxEqSEBgYEY"
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="text-xs text-purple-600 hover:text-purple-700 underline inline-block mb-1"
                >
                  📀 Listen on JioSaavn
                </motion.a>
                <p className="text-xs text-gray-400">💫 Perfect for wedding vibes</p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={hidePlayer}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                >
                  ✕
                </motion.button>
              </div>

              {/* Play Status Indicator */}
              <div className="text-center">
                {isPlaying ? (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xs text-green-600 font-medium"
                  >
                    🔊 Playing • Romantic Vibes
                  </motion.div>
                ) : (
                  <p className="text-xs text-gray-500 font-medium">⏸️ Paused</p>
                )}
              </div>

              {/* Spotify-esque Progress Bar (Visual Only) */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
                    style={{ width: '33%' }}
                    animate={isPlaying ? { width: ['33%', '55%', '78%', '33%'] } : {}}
                    transition={{ duration: 8, repeat: isPlaying ? Infinity : 0 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1:24</span>
                  <span>3:27</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Button to Show Player */}
      {!isVisible && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300"
        >
          <Music size={24} />
        </motion.button>
      )}
    </>
  );
};

export default MusicPlayer;

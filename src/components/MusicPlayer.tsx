import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Heart, Star, Download } from 'lucide-react';

// Import the music file
import weddingMusic from '../assets/couple/music.mp3';

// Check if we're in development mode (where video file exists)
const hasVideo = !import.meta.env.PROD;

interface MusicPlayerProps {
  autoplay?: boolean;
}

const MusicPlayer = ({}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [invitationOpened, setInvitationOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.src = weddingMusic;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.preload = 'auto';
      audioRef.current.muted = false;
      
      // Event listeners
      const handlePlay = () => {
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const openInvitation = async () => {
    console.log('Opening invitation, starting music');
    setShowEnvelope(false);
    setInvitationOpened(true);
    
    // Start music immediately on user interaction
    if (audioRef.current) {
      try {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          console.log('Music started successfully on invitation open!');
        }).catch((error) => {
          console.log('Music play failed:', error);
        });
      } catch (error) {
        console.log('Music initialization error:', error);
      }
    }
  };

  const closeInvitation = () => {
    setInvitationOpened(false);
    
    // Resume music when popup is manually closed (if not muted)
    if (audioRef.current && !isMuted && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        console.log('Music resumed after popup close');
      }).catch(() => {
        console.log('Could not resume music after popup close');
      });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If unmuting and music was playing, resume playback
      if (!newMutedState && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          console.log('Music resumed after unmute');
        }).catch(() => {
          console.log('Could not resume music on unmute');
        });
      }
      console.log(`Music ${newMutedState ? 'muted' : 'unmuted'}`);
    }
  };

  const handleVideoDownload = () => {
    if (!hasVideo) {
      alert('Digital invitation video will be available soon! Please check back later or contact the couple for details.');
      return;
    }
    // Video download logic for local development only
    alert('Video download is only available in local development environment.');
  };

  const handleVideoPlay = () => {
    console.log('Video started playing - pausing music');
    if (audioRef.current && !isMuted && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoPause = () => {
    console.log('Video paused - resuming music');
    if (audioRef.current && !isMuted) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        console.log('Music resumed after video pause');
      }).catch(() => {
        console.log('Could not resume music');
      });
    }
  };

  const handleVideoEnd = () => {
    console.log('Video ended - resuming music');
    if (audioRef.current && !isMuted) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        console.log('Music resumed after video end');
      }).catch(() => {
        console.log('Could not resume music');
      });
    }
    // Do NOT automatically close popup - let user decide when to close
  };

  return (
    <>
      {/* Mobile-First Envelope */}
      <AnimatePresence>
        {showEnvelope && !invitationOpened && (
          <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-black/40 backdrop-blur-xl">
            <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md"
              >
                {/* Minimal Sparkles */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-yellow-300 to-pink-400 rounded-full opacity-50"
                    style={{
                      left: `${40 + i * 20}%`,
                      top: `${30 + i * 20}%`,
                    }}
                  />
                ))}

                {/* Main Envelope - Responsive */}
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    y: -4,
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openInvitation}
                  className="relative cursor-pointer bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-700 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
                  style={{ 
                    aspectRatio: '4/3',
                    width: '100%'
                  }}
                >
                  {/* Decorative Pattern */}
                  <div className="absolute inset-2 border border-white/50 rounded-xl sm:rounded-2xl"></div>
                  
                  {/* Envelope Flap */}
                  <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-indigo-800 to-indigo-900 rounded-t-2xl sm:rounded-t-3xl"
                       style={{ height: '25%' }}>
                    {/* Golden Seal */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg flex items-center justify-center border border-yellow-300">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="text-sm sm:text-base"
                      >
                        💍
                      </motion.div>
                    </div>
                  </div>

                  {/* Content Area - Clean Layout */}
                  <div className="absolute bottom-4 inset-x-4 text-center text-white" style={{ height: `calc(75% - 32px)` }}>
                    <div className="flex flex-col justify-center items-center h-full space-y-3 px-4">
                      {/* Couple Names */}
                      <div className="text-base sm:text-xl font-bold text-yellow-200 leading-tight">
                        Aayush & Tanya
                      </div>
                      
                      {/* Simple Heart */}
                      <div className="text-xl sm:text-2xl">
                        💖
                      </div>
                      
                      {/* Main Text */}
                      <div className="text-xs sm:text-sm font-medium text-pink-200">
                        Getting Married!
                      </div>
                      
                      {/* Call to Action */}
                      <div className="bg-white/50 rounded-lg px-4 py-2 mt-2">
                        <div className="font-semibold text-xs sm:text-sm text-purple-800">Tap to celebrate!</div>
                      </div>
                    </div>
                  </div>

                  {/* Simple Floating Hearts - Reduced */}
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={`heart-${i}`}
                      className="absolute text-pink-300 text-lg pointer-events-none opacity-60"
                      style={{
                        left: `${30 + i * 40}%`,
                        top: `${15 + i * 15}%`,
                      }}
                    >
                      💕
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Invitation Modal - Mobile First */}
      <AnimatePresence>
        {invitationOpened && (
          <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-black/60 via-purple-900/40 to-black/60 backdrop-blur-xl">
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md sm:max-w-2xl bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl relative border-4 border-white/60 overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'linear-gradient(135deg, #fef9e7 0%, #fed7aa 15%, #fecaca 35%, #fed7d7 55%, #e9d5ff 75%, #ddd6fe 100%)',
                  border: '4px solid rgba(255, 255, 255, 0.8)'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={closeInvitation}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-red-500 text-xl sm:text-2xl w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/70 flex items-center justify-center hover:bg-white/90 transition-colors z-10"
                >
                  ×
                </button>

                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="text-3xl sm:text-5xl mb-3 sm:mb-4">💍</div>
                  <div className="text-xl sm:text-3xl font-bold text-purple-800 mb-2">
                    We're Getting Married! 🎉
                  </div>
                </div>

                {/* Couple Names */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                    Aayush & Tanya
                  </div>
                  <div className="text-base sm:text-lg text-gray-700 mb-2 sm:mb-3">
                    along with our amazing families
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 italic bg-white/50 rounded-xl px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-sm">
                    would love for you to join us as we officially become one big happy family!
                  </div>
                </div>

                {/* Wedding Events */}
                <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 shadow-lg">
                  <h3 className="font-bold text-lg sm:text-xl text-purple-800 mb-4 sm:mb-5 text-center flex items-center justify-center">
                    <Star className="mr-2 text-yellow-500" />
                    Our Wedding Celebrations
                    <Star className="ml-2 text-yellow-500" />
                  </h3>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg sm:rounded-xl border border-yellow-200">
                      <span className="flex items-center">
                        🌸 <span className="ml-2 sm:ml-3 font-semibold">Haldi & Janeu</span>
                      </span>
                      <span className="font-bold text-yellow-700 bg-white/70 px-2 py-1 sm:px-3 rounded-lg text-xs sm:text-sm">Nov 7th, 11-12 PM</span>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg sm:rounded-xl border border-pink-200">
                      <span className="flex items-center">
                        💍 <span className="ml-2 sm:ml-3 font-semibold">Engagement Ceremony</span>
                      </span>
                      <span className="font-bold text-pink-700 bg-white/70 px-2 py-1 sm:px-3 rounded-lg text-xs sm:text-sm">Nov 7th, 8 PM</span>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg sm:rounded-xl border border-purple-200">
                      <span className="flex items-center">
                        🙏 <span className="ml-2 sm:ml-3 font-semibold">Blessing Ceremony</span>
                      </span>
                      <span className="font-bold text-purple-700 bg-white/70 px-2 py-1 sm:px-3 rounded-lg text-xs sm:text-sm">Nov 8th, 11 AM</span>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg sm:rounded-xl border border-red-200">
                      <span className="flex items-center">
                        💒 <span className="ml-2 sm:ml-3 font-semibold">Wedding Ceremony</span>
                      </span>
                      <span className="font-bold text-red-700 bg-white/70 px-2 py-1 sm:px-3 rounded-lg text-xs sm:text-sm">Nov 8th, 8 PM</span>
                    </div>
                  </div>
                </div>

                {/* Venue */}
                <div className="text-center mb-6">
                  <div className="text-sm sm:text-base text-gray-700 font-semibold bg-white/70 rounded-lg px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-sm">
                    🏰 The Grandeur by Lavanya & The Grand Dreams Mayapuri
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">📍 Delhi, India</div>
                </div>

                {/* Video */}
                <div className="mb-6">
                  {hasVideo ? (
                    <video
                      className="w-full rounded-xl sm:rounded-2xl shadow-lg"
                      controls
                      preload="metadata"
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                      onEnded={handleVideoEnd}
                    >
                      <source src="/assets/couple/Aayush Digital Invitation Card 01.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="w-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-8 text-center shadow-lg border-2 border-dashed border-purple-300">
                      <div className="text-4xl mb-4">🎥</div>
                      <h3 className="text-xl font-bold text-purple-800 mb-2">Digital Invitation Video</h3>
                      <p className="text-gray-700 mb-4">Coming Soon!</p>
                      <p className="text-sm text-gray-600">
                        Our beautiful digital invitation video will be available shortly.<br/>
                        In the meantime, enjoy exploring our wedding details below!
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Main Action Button */}
                  <button
                    onClick={() => {
                      closeInvitation();
                      setTimeout(() => {
                        const eventsSection = document.querySelector('#schedule');
                        if (eventsSection) {
                          eventsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 500);
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <Star className="mr-2" />
                    View Our Wedding Events
                    <Star className="ml-2" />
                  </button>
                  
                  {/* Secondary Buttons */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={() => {
                        closeInvitation();
                        setTimeout(() => {
                          const gallerySection = document.querySelector('#gallery');
                          if (gallerySection) {
                            gallerySection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 500);
                      }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-sm sm:text-base"
                    >
                      <Heart className="mr-2" />
                      View Photos
                    </button>

                    <button
                      onClick={handleVideoDownload}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-sm sm:text-base"
                    >
                      <Download className="mr-2" />
                      Save Invite
                    </button>
                  </div>
                </div>

                {/* Decorative Hearts */}
                <div className="absolute top-3 left-3 text-pink-400 text-lg">💖</div>
                <div className="absolute top-3 right-12 text-purple-400 text-lg">💜</div>
                <div className="absolute bottom-3 left-3 text-red-400 text-lg">❤️</div>
                <div className="absolute bottom-3 right-3 text-pink-400 text-lg">💕</div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Music Control */}
      {isPlaying && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9998]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
              isMuted ? 'bg-red-500 text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
            } backdrop-blur-sm text-sm sm:text-base`}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span className="font-medium hidden sm:inline">
              {isMuted ? 'Music Off' : 'Music On'}
            </span>
          </motion.button>
        </div>
      )}

      {/* Floating Music Notes */}
      {isPlaying && !isMuted && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl sm:text-2xl text-purple-400"
              animate={{
                opacity: [0, 0.8, 0],
                y: [50, -50],
                scale: [0.5, 1, 0.5],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                delay: i * 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + i * 20}%`,
                top: `${20 + (i % 2) * 30}%`,
              }}
            >
              {['🎵', '🎶', '♪', '♫'][i]}
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
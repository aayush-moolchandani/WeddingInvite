import { motion, AnimatePresence } from 'framer-motion';

interface AnimationProps {
  eventType: 'pre-wedding' | 'haldi' | 'sagai' | 'shaadi' | 'janayu' | 'pooja';
  isVisible: boolean;
}

const EventAnimations = ({ eventType, isVisible }: AnimationProps) => {
  // Flower Shower for Pre-wedding
  const FlowerShower = () => (
    <AnimatePresence>
      {isVisible && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`flower-${i}`}
              initial={{ opacity: 0, y: -100, rotate: -180 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [window.innerHeight + 100, -100],
                rotate: [-180, 0],
                x: Math.sin(i * 0.5) * 100
              }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute pointer-events-none z-50"
            style={{
              left: `${5 + (i * 5)}%`,
              fontSize: `${25 + (i % 3) * 8}px`,
              filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.8))',
              textShadow: '0 0 20px rgba(251, 191, 36, 1)'
            }}
            >
              🌸
            </motion.div>
          ))}
          
          {/* Pre-wedding Party Poppers */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0.8],
                y: [-50, -200],
                x: [0, Math.cos(i * 0.8) * 150],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute pointer-events-none z-50"
              style={{
                left: `${20 + (i * 8)}%`,
                top: '50%',
                fontSize: '28px',
                filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))',
                textShadow: '0 0 25px rgba(239, 68, 68, 1)'
              }}
            >
              🎉
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );

  // Yellow Heart Shower for Haldi
  const renderHaldiHeartShower = () => (
    <AnimatePresence>
      {isVisible && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`haldi-heart-${i}`}
              initial={{ opacity: 0, y: -100 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [window.innerHeight + 100, -100],
                scale: [0.5, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 4,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 2.5
              }}
              className="absolute pointer-events-none z-50"
              style={{
                left: `${10 + (i * 6)}%`,
                fontSize: `${20 + (i % 4) * 5}px`,
                filter: 'hue-rotate(45deg) saturate(2) brightness(1.5) drop-shadow(0 0 15px rgba(255, 215, 0, 0.8))',
                color: '#FFD700',
                textShadow: '0 0 20px rgba(255, 215, 0, 1)'
              }}
            >
              💛
            </motion.div>
          ))}
          
          {/* Yellow powder particles */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`yellow-powder-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [window.innerHeight / 2, window.innerHeight / 2 - 200 + Math.sin(i * 0.5) * 100],
                x: [window.innerWidth / 2, window.innerWidth / 2 + Math.cos(i * 0.8) * 200]
              }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute pointer-events-none z-50 w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${30 + (i % 10) * 7}%`,
                top: '40%'
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );

  // Flowing Yellow Color for Sagai
  const renderSagaiYellowFlow = () => (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Flowing golden streams */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`golden-stream-${i}`}
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: ['0%', '100%', '0%'],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute pointer-events-none z-50 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + (i % 2) * 40}%`
              }}
            />
          ))}
          
          {/* Golden sparkles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`golden-sparkle-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1.5
              }}
              className="absolute pointer-events-none z-50"
              style={{
                left: `${15 + (i * 7)}%`,
                top: `${20 + (i % 6) * 12}%`,
                fontSize: '22px',
                filter: 'hue-rotate(60deg) saturate(2) brightness(1.8) drop-shadow(0 0 15px rgba(251, 191, 36, 0.8))',
                textShadow: '0 0 20px rgba(251, 191, 36, 1)'
              }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );

  // Dancing animation for Shaadi
  const renderShaadiDancing = () => (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Dancing stick figures */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`dance-${i}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute pointer-events-none z-50 text-2xl"
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${60 + Math.sin(i * 0.8) * 20}%`
              }}
            >
              💃
            </motion.div>
          ))}
          
          {/* Musical notes */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`note-${i}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [50, -50, 50],
                x: [0, Math.sin(i * 0.6) * 30]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 0.8
              }}
              className="absolute pointer-events-none z-50 text-lg text-pink-400"
              style={{
                left: `${20 + (i * 8)}%`,
                top: '40%'
              }}
            >
              🎵
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );

  // Fireworks for Janehu
  const renderJanehuFireworks = () => (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Firework bursts */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`firework-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
                rotate: [0, 180]
              }}
              transition={{
                duration: 2,
                delay: i * 0.8,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute pointer-events-none z-50"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                fontSize: `${30 + i * 5}px`,
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))'
              }}
            >
              🎆
            </motion.div>
          ))}
          
          {/* Sparkling trails */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`sparkle-trail-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -100, -200],
                x: [0, Math.cos(i * 0.3) * 50]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute pointer-events-none z-50 w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${30 + (i % 10) * 5}%`,
                top: '60%'
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );

  // Traditional Pooja animation
  const renderPoojaAnimation = () => (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Floating lamps (diyas) */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`diya-${i}`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [100, 50, -50, -100],
                rotate: [0, 5, -5, 0],
                scale: [0.5, 1, 1, 0.5]
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute pointer-events-none z-50 text-xl"
              style={{
                left: `${15 + (i * 10)}%`,
                filter: 'drop-shadow(0 0 8px rgba(255, 165, 0, 0.7))'
              }}
            >
              🪔
            </motion.div>
          ))}
          
          {/* Incense smoke trails */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`smoke-${i}`}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scaleY: [0, 1, 1, 0],
                skew: [0, 20, -20, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.7,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute pointer-events-none z-50 w-px h-20 bg-gradient-to-t from-orange-200 to-transparent"
              style={{
                left: `${25 + i * 15}%`,
                top: '60%'
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );

  const renderAnimation = () => {
    switch (eventType) {
      case 'haldi':
        return renderHaldiHeartShower();
      case 'sagai':
        return renderSagaiYellowFlow();
      case 'shaadi':
        return renderShaadiDancing();
      case 'janayu':
        return renderJanehuFireworks();
      case 'pooja':
        return renderPoojaAnimation();
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {renderAnimation()}
    </div>
  );
};

export default EventAnimations;

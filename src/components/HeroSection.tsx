import { motion } from 'framer-motion';
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import TALogo from '../assets/TAlogo.jpeg';

const HeroSection = React.memo(() => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pb-16 lg:pb-24">
      {/* Dreamy Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 via-rose-50 to-pink-50">
        {/* Luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/40 via-transparent to-rose-300/35"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-300/35 via-transparent to-orange-300/40"></div>
        <div className="hearts-bg absolute inset-0 opacity-60"></div>
        
        {/* Dreamy color-changing backdrop */}
        <motion.div 
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.35) 0%, transparent 60%)',
              'radial-gradient(circle at 80% 80%, rgba(251, 146, 143, 0.32) 0%, transparent 60%)',
              'radial-gradient(circle at 40% 60%, rgba(252, 165, 165, 0.38) 0%, transparent 60%)',
              'radial-gradient(circle at 60% 40%, rgba(254, 215, 170, 0.40) 0%, transparent 60%)',
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset- 0"
        />
        
        {/* Optimized floating sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-yellow-500 opacity-100 text-4xl font-bold"
            animate={{
              y: [-60, 60, -60],
              x: [-40, 40, -40],
              rotate: [0, 360],
              scale: [0.5, 3, 0.5],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + (i % 5) * 20}%`,
              top: `${15 + (i % 3) * 30}%`,
            }}
          >
            <motion.span
              animate={{ 
                filter: [
                  'drop-shadow(0 0 15px rgba(251, 191, 36, 1))',
                  'drop-shadow(0 0 30px rgba(245, 158, 11, 1))',
                  'drop-shadow(0 0 45px rgba(217, 119, 6, 1))'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.div>
        ))}
        {/* Optimized Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500 opacity-100 text-3xl font-bold"
            animate={{
              y: [-80, 80, -80],
              x: [-50, 50, -50],
              rotate: [0, 180, 360],
              scale: [0.8, 2.5, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            style={{
              left: `${5 + (i % 6) * 16}%`,
              top: `${10 + (i % 4) * 22}%`,
            }}
          >
            <motion.div
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(239, 68, 68, 1))',
                  'drop-shadow(0 0 35px rgba(220, 38, 38, 1))',
                  'drop-shadow(0 0 50px rgba(185, 28, 28, 1))'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Heart size={20 + i * 2} className="animate-pulse" />
            </motion.div>
          </motion.div>
        ))}
        
        {/* Optimized Golden Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
              filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-4 pt-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="text-8xl md:text-[12rem] font-thin text-white mb-8 tracking-tighter relative"
          >
            <motion.span
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
                backgroundSize: ['200%', '300%', '200%'],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(45deg, #92400e, #d97706, #f59e0b, #fbbf24, #f59e0b, #d97706, #92400e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '300%',
                filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))',
              }}
            >
              Wedding
            </motion.span>
            
            {/* Animated glow effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
               className="absolute inset-0 blur-2xl bg-gradient-to-r from-amber-500/40 to-rose-500/40 -z-10"
            />
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center mb-6"
          >
            <Heart className="text-pink-500 mx-4" size={32} />
            <Sparkles className="text-yellow-500" size={24} />
          </motion.div>

          {/* Prayer Invocation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="text-lg md:text-xl text-amber-600 font-semibold mb-3 tracking-wide">
              🌸 OM ganesha namah🌸
            </div>
            <div className="max-w-3xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
              "Salutations to Lord Ganesha, the one with the curved trunk<br/>
              May he remove all obstacles and bless all our endeavors<br/>
              Grant us success in every undertaking, always."
            </div>
          </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-4xl md:text-6xl font-medium mb-4"
                  >
                    <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                      November 7 & 8, 2025
                    </span>
                  </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-xl md:text-2xl text-gray-700 mt-6 font-light tracking-wide"
          >
            We cordially request your esteemed presence
          </motion.p>
        </motion.div>

        {/* Invitation Card Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-lg mx-auto"
        >
                <div className="sexy-card rounded-3xl p-10 dream-glow luxurious-gradient">
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="text-center"
            >
                    {/* Wedding TA Logo */}
                    <motion.div
                      className="w-36 h-36 mx-auto mb-6 bg-gradient-to-br from-amber-200 via-orange-200 to-rose-200 rounded-full flex items-center justify-center relative overflow-hidden shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      animate={{ rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 10, repeat: Infinity }}
                    >
                      {/* Logo Image */}
                      <img 
                        src={TALogo}
                        alt="Aayush & Tanya Wedding Logo"
                        className="w-24 h-24 object-contain rounded-full"
                      />
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                    </motion.div>
                    
                    {/* Hashtag */}
                    <div className="text-xs text-amber-700 font-medium mt-2 px-4 py-1 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full inline-block border border-amber-200">
                      #aayushKitanipartner
                    </div>
              
              <motion.h3 
                className="text-3xl font-medium text-gray-800 mb-3 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="relative">
                  <span className="text-gradient bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">LOVE</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 right-0 text-xs">💖
                  </motion.span>
                </span>
              </motion.h3>
              
              <div className="text-lg text-gray-700 mb-2">
                <span className="font-semibold text-rose-600">Aayush</span>
                <span className="mx-3 text-gray-400">&</span>
                <span className="font-semibold text-purple-600">Tanya</span>
              </div>
              
              <p className="text-gray-600 text-sm italic">Together with their families</p>
              <p className="text-gray-500 text-xs mt-1">cordially invite you to celebrate their union</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
});

export default HeroSection;


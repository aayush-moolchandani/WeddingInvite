import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Calendar, Camera, Sparkles } from 'lucide-react';

interface NavigationProps {
  showOnlyMarriage?: boolean;
}

const Navigation = ({ showOnlyMarriage = false }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'schedule', 'gallery', 'photo-editor'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar when mouse is in top 100px of the page
      if (e.clientY <= 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home />, href: '#home' },
    { id: 'schedule', label: 'Schedule', icon: <Calendar />, href: '#schedule' },
    { id: 'gallery', label: 'Gallery', icon: <Camera />, href: '#gallery' },
    { id: 'photo-editor', label: 'Photo Editor', icon: <Sparkles />, href: '#photo-editor' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation - Hover Activated */}
      <AnimatePresence>
        {showNavbar && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 hidden lg:block bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
          >
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center justify-between py-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-gradient cursor-pointer"
            >
              Wedding Invite
            </motion.div>

            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl shadow-sm' 
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-4 py-2 rounded-xl'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-xl border-b border-gray-200/50"
      >
        <div className="flex items-center justify-between p-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-gradient"
          >
            Wedding Invite
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-full glass-effect"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="p-8 pt-20">
              <div className="space-y-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    onClick={() => scrollToSection(item.href)}
                    className="w-full flex items-center space-x-4 p-4 rounded-2xl glass-effect hover:bg-emerald-50 transition-all duration-300"
                  >
                    <div className="text-emerald-600">{item.icon}</div>
                    <span className="text-lg font-medium text-gray-800">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;

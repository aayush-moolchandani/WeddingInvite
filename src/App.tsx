import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import WeddingSchedule from './components/WeddingSchedule';
import PhotoGallery from './components/PhotoGallery';
import PhotoEditor from './components/PhotoEditor';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Wedding Schedule */}
      <section id="schedule">
        <WeddingSchedule />
      </section>

      {/* Photo Gallery */}
      <section id="gallery">
        <PhotoGallery />
      </section>

      {/* Photo Editor */}
      <section id="photo-editor">
        <PhotoEditor />
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4 bg-gradient-to-t from-gray-50 to-white text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center relative overflow-hidden"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl drop-shadow-lg"
            >
              💕
            </motion.span>
            {/* Inner glow */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
          </motion.div>
          
          <h3 className="text-3xl font-light text-gray-800 mb-4">
            Thank You For Being Part of Our Special Day
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Your love, support, and presence make our wedding celebration even more magical. 
            We can't wait to create beautiful memories together on November 7th & 8th, 2025!
          </p>
          
          {/* Family Information */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h4 className="text-xl font-medium text-gray-800 mb-6">With Best Compliments From:</h4>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 text-gray-600">
              <div>
                <h5 className="font-medium text-gray-700">📞 R.S.V.P.</h5>
                <p className="text-sm">Mr. Ramesh Moolchandani</p>
                <p className="text-sm font-mono">8383812671</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700">👨‍👩‍👧‍👦 Moolchandani Family & Guwalani Family</h5>
                <p className="text-sm">Mr. Ramesh Moolchandani & Mrs. Sakshi Moolchandani</p>
                <p className="text-sm">Mr. Rajeev Chadha & Mrs. Jyoti Chadha</p>
                <p className="text-xs text-gray-500">(Parents of Aayush & Tanya)</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-gray-500">
            <p>November 7 & 8, 2025</p>
            <span>•</span>
            <p>With Love, Aayush & Tanya</p>
            <span>•</span>
            <p className="text-orange-600 font-medium">#aayushgothistanipartner</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Camera, Heart, Download, Share2, X, ZoomIn, Trash2 } from 'lucide-react';

// Couple photos paths (using import.meta.url for Vite compatibility)
const engagementPhoto = new URL('../assets/couple/376FF52B-0169-4D92-9D9D-701B5AC3E7F8.JPG', import.meta.url).href;
const romanticPhoto2 = new URL('../assets/couple/img23.JPG', import.meta.url).href;
const romanticPhoto1 = new URL('../assets/couple/IMG_2564.JPG', import.meta.url).href;
const coupleMoment1 = new URL('../assets/couple/IMG_2579.JPG', import.meta.url).href;
const coupleMoment2 = new URL('../assets/couple/IMG_2581.JPG', import.meta.url).href;
const sweetMemory = new URL('../assets/couple/IMG_2582.JPG', import.meta.url).href;

interface Photo {
  id: string;
  src: string;
  alt: string;
  date: string;
  event: string;
}

const PhotoGallery = React.memo(() => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([]);

  // Function to load uploaded photos
  const loadUploadedPhotos = () => {
    const saved = localStorage.getItem('weddingUploadedPhotos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Limit display to 10 most recent photos for performance
        setUploadedPhotos(parsed.slice(-10));
      } catch (error) {
        console.error('Error loading saved photos:', error);
      }
    }
  };

  // Load uploaded photos from localStorage on component mount and when new photos are uploaded
  React.useEffect(() => {
    loadUploadedPhotos();
    
    // Listen for new photo uploads
    const handlePhotoUpload = () => {
      loadUploadedPhotos();
    };
    
    window.addEventListener('photoUploaded', handlePhotoUpload);
    
    return () => window.removeEventListener('photoUploaded', handlePhotoUpload);
  }, []);

  // Clean up storage function
  const clearOldPhotos = () => {
    try {
      localStorage.removeItem('weddingUploadedPhotos');
      setUploadedPhotos([]);
      alert('🧹 All uploaded photos cleared successfully!');
    } catch (error) {
      console.error('Cleanup error:', error);
      alert('❌ Cleanup failed. Please try again.');
    }
  };



  // Aayush & Tanya's couple photos
  const samplePhotos: Photo[] = [
    {
      id: '1',
      src: engagementPhoto,
      alt: 'Aayush & Tanya Beautiful Moment',
      date: '2024-10-15',
      event: 'Engagement Session'
    },
    {
      id: '2',
      src: romanticPhoto1,
      alt: 'Aayush & Tanya Romantic Shot',
      date: '2024-10-20',
      event: 'Pre-wedding Photoshoot'
    },
    {
      id: '3',
      src: romanticPhoto2,
      alt: 'Aayush & Tanya Together',
      date: '2024-11-01',
      event: 'Special Moment'
    },
    {
      id: '4',
      src: coupleMoment1,
      alt: 'Aayush & Tanya Loving Look',
      date: '2024-10-25',
      event: 'Wedding Preparation'
    },
    {
      id: '5',
      src: coupleMoment2,
      alt: 'Aayush & Tanya Sweet Smile',
      date: '2024-10-30',
      event: 'Love Story'
    },
    {
      id: '6',
      src: sweetMemory,
      alt: 'Aayush & Tanya Together Forever',
      date: '2024-11-05',
      event: 'Memories'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const openFullscreen = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeFullscreen = () => {
    setSelectedPhoto(null);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Camera size={32} className="text-purple-500 mr-4" />
            <h2 className="text-5xl md:text-6xl font-light text-gray-800">
              Our Memories
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Every moment captured, every memory treasured. Take a look at our journey together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {samplePhotos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group cursor-pointer"
              onClick={() => openFullscreen(photo)}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 glass-effect">
                <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <h3 className="text-lg font-medium mb-1">{photo.event}</h3>
                        <p className="text-sm opacity-90">{new Date(photo.date).toLocaleDateString()}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
                      >
                        <ZoomIn size={20} />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
                    >
                      <Heart size={16} className="text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            ))}
            
            {/* User Uploaded Photos */}
            {uploadedPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group cursor-pointer"
                onClick={() => openFullscreen(photo)}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 glass-effect border-2 border-gradient-to-r from-amber-200 to-rose-200">
                  <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                  </div>
                  
                  {/* Uploaded Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        {photo.event}
                      </h3>
                      <p className="text-sm text-gray-200">{new Date(photo.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {/* Upload Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    📸 Uploaded
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>


        {/* Storage Management */}
        {uploadedPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="text-sm text-gray-500 mb-4">
              📸 {uploadedPhotos.length} uploaded photos stored locally
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearOldPhotos}
              className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              <Trash2 size={16} className="mr-2" />
              Clear Old Photos
            </motion.button>
          </motion.div>
        )}

        {/* Upload New Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Scroll to photo editor section
              const photoEditorSection = document.getElementById('photo-editor');
              if (photoEditorSection) {
                photoEditorSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="glass-effect rounded-3xl p-12 text-center group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Camera size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-medium text-gray-800 mb-2">💕 Share Your Wedding Memories 💕</h3>
            <p className="text-gray-600 mb-4">Take photos with us and add to our beautiful gallery</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Scroll to photo editor section
                const photoEditorSection = document.getElementById('photo-editor');
                if (photoEditorSection) {
                  photoEditorSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add Your Photo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Fullscreen Photo Modal */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 rounded-full backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-xl font-medium">{selectedPhoto.event}</h3>
                  <p className="opacity-90">{new Date(selectedPhoto.date).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Heart size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Share2 size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Download size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
});

export default PhotoGallery;

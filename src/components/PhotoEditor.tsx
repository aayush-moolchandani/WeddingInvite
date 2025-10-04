import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Camera, Upload, Download, Palette, X, Sparkles, Heart } from 'lucide-react';

interface Filter {
  name: string;
  value: string;
  preview: string;
}

const PhotoEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const eventOptions = [
    'Janehu',
    'Haldi',
    'Sagai', 
    'Saat Shagun',
    'Shaadi',
    'Pre-wedding',
    'Post-wedding',
    'Other Wedding Memory'
  ];

  const filters: Filter[] = [
    { name: 'None', value: 'none', preview: 'brightness(1) contrast(1) saturate(1)' },
    { name: 'Vintage', value: 'vintage', preview: 'brightness(0.9) contrast(1.2) saturate(0.8) sepia(0.3)' },
    { name: 'B&W', value: 'bw', preview: 'grayscale(1) contrast(1.1)' },
    { name: 'Warm', value: 'warm', preview: 'brightness(1.1) contrast(1.1) saturate(1.3) sepia(0.2)' },
    { name: 'Cool', value: 'cool', preview: 'brightness(1) contrast(1.1) saturate(1.2) hue-rotate(10deg)' },
    { name: 'Vibrant', value: 'vibrant', preview: 'brightness(1.1) contrast(1.2) saturate(1.5)' },
  ];

  const openCamera = async () => {
    setIsOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
      }
      
      // Stop camera
      const stream = video.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsOpen(false);
    }
  };

  const uploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyFilter = (filterValue: string) => {
    setSelectedFilter(filterValue);
  };

  const downloadPhoto = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `wedding-memory-${Date.now()}.jpg`;
      link.href = capturedImage;
      link.click();
    }
  };

  const handleSaveToGallery = () => {
    if (!capturedImage || !selectedEvent) return;
    
    try {
      // Get current uploaded photos
      const saved = localStorage.getItem('weddingUploadedPhotos');
      const currentPhotos = saved ? JSON.parse(saved) : [];
      
      // Limit to 15 photos to prevent localStorage overflow
      const MAX_PHOTOS = 15;
      const photosToKeep = currentPhotos.slice(-Math.max(0, MAX_PHOTOS - 1)); // Keep only recent photos
      
      // Create new photo object
      const newPhoto = {
        id: `uploaded-${Date.now()}`,
        src: capturedImage,
        alt: `${selectedEvent} Uploaded Photo`,
        date: new Date().toISOString().split('T')[0],
        event: selectedEvent
      };
      
      // Add new photo and keep only recent ones
      const updatedPhotos = [...photosToKeep, newPhoto];
      localStorage.setItem('weddingUploadedPhotos', JSON.stringify(updatedPhotos));
      
      // Show success message
      alert(`Photo saved to ${ selectedEvent} gallery! Refresh to see your photo.`);
      
      // Reset
      setCapturedImage(null);
      setShowSaveOptions(false);
      setSelectedEvent('');
      
    } catch (error) {
      console.error('Storage error:', error);
      alert('Storage full! Please clear some photos or try again later.');
    }
  };

  const resetEditor = () => {
    setCapturedImage(null);
    setSelectedFilter('none');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-16">
      {/* Editor Trigger Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-8">
          <Sparkles className="text-emerald-500 mr-4" size={32} />
          <h2 className="text-5xl md:text-6xl font-light text-gray-800">
            Photo Editor
          </h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 font-light mb-12">
          Take a photo with us or upload yours to create special memories
        </p>

        {!capturedImage ? (
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCamera}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-3xl font-medium shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-3"
            >
              <Camera size={24} />
              <span>Take Photo</span>
            </motion.button>

            <span className="text-gray-400 font-medium">or</span>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={openFileDialog}
              className="group bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-3xl font-medium shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-3"
            >
              <Upload size={24} />
              <span>Upload Photo</span>
            </motion.button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
              className="hidden"
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Photo Editor Interface */}
            <div className="glass-effect rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Photo Preview */}
                <div className="flex-1">
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                      <img
                        src={capturedImage}
                        alt="Captured photo"
                        className="w-full h-full object-cover"
                        style={{ filter: filters.find(f => f.value === selectedFilter)?.preview }}
                      />
                    </div>
                    
                    {/* Decorative overlay */}
                    <div className="absolute inset-0 border-2 border-white rounded-2xl opacity-80"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white rounded-full opacity-60"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-white rounded-full opacity-40"></div>
                  </div>
                </div>

                {/* Editor Controls */}
                <div className="lg:w-80 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <Palette className="mr-2" size={20} />
                      Filters
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {filters.map((filter) => (
                        <motion.button
                          key={filter.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => applyFilter(filter.value)}
                          className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            selectedFilter === filter.value
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {filter.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={downloadPhoto}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
                    >
                      <Download size={20} />
                      <span>Download Photo</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowSaveOptions(true)}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Heart size={20} />
                      <span>Save to Gallery</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetEditor}
                      className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-gray-300 transition-all duration-300"
                    >
                      <X size={20} />
                      <span>Start Over</span>
                    </motion.button>
                  </div>

                  {/* Tips */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                      <Sparkles className="mr-2" size={16} />
                      Pro Tips
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Try different filters to enhance your photo</li>
                      <li>• Upload multiple photos to compare styles</li>
                      <li>• Share your creation on social media</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Camera Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-light text-gray-800 mb-2">Take a Photo</h3>
              <p className="text-gray-600">Position yourself in frame and click capture</p>
            </div>

            <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-6">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={capturePhoto}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-medium flex items-center space-x-2"
              >
                <Camera size={20} />
                <span>Capture</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-2xl font-medium"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Save to Gallery Modal */}
          {showSaveOptions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setShowSaveOptions(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  💕 Save Memory to Gallery 💕
                </h3>
                
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                💡 <strong>Storage Limit:</strong> Maximum 15 photos stored. Old photos are automatically removed.
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Which wedding event is this photo from?
                </label>
                    <select
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Select an event...</option>
                      {eventOptions.map((event) => (
                        <option key={event} value={event}>{event}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSaveOptions(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveToGallery}
                      disabled={!selectedEvent}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-medium disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      💖 Save Memory
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
  );
};

export default PhotoEditor;

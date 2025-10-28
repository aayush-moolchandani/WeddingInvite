import { motion } from 'framer-motion';
import { Flower2, Bell, Users, Clock, MapPin, Calendar } from 'lucide-react';
import React, { useState } from 'react';
import EventAnimations from './EventAnimations';

// Import venue images
import grandDreamsImage from '../assets/grandDreams.webp';
import greenLoungeImage from '../assets/greenLounge.webp';
import lavanyaImage from '../assets/lavanya.webp';
import saltStaysImage from '../assets/saltStays.webp';

interface EventData {
  id: string;
  title: string;
  time: string;
  description: string;
  venue: string;
  venueImage: string;
  venueAddress: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  date: string;
}

interface WeddingScheduleProps {
  showOnlyMarriage?: boolean;
}

const WeddingSchedule = React.memo(({ showOnlyMarriage = false }: WeddingScheduleProps) => {
  const [activeEventAnimation, setActiveEventAnimation] = useState<string | null>(null);

  const events: EventData[] = [
    {
      id: 'janehu',
      title: 'Janeu Ceremony',
      time: '11 AM',
      date: 'Nov 7',
      description: 'A sacred Hindu ritual where the groom receives the sacred thread, marking his readiness for marriage. This traditional ceremony symbolizes spiritual awakening and preparation for a blessed marital union.',
      venue: 'The Green Lounge Wazirpur',
      venueAddress: 'The Green Lounge, Wazirpur, Delhi, India',
      venueImage: greenLoungeImage,
      icon: <Flower2 />,
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    },
    {
      id: 'haldi',
      title: 'Haldi Ceremony',
      time: '12 PM',
      date: 'Nov 7',
      description: 'A vibrant pre-wedding ceremony where turmeric paste and sacred threads are applied to the bride and groom. This auspicious ritual purifies, strengthens their bond, and brings good luck for their married life ahead.',
      venue: 'The Green Lounge Wazirpur',
      venueAddress: 'The Green Lounge, Wazirpur, Delhi, India',
      venueImage: greenLoungeImage,
      icon: <Flower2 />,
      color: 'text-amber-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50',
    },
    {
      id: 'engagement',
      title: 'Engagement Ceremony',
      time: '8 PM',
      date: 'Nov 7',
      description: 'An intimate ceremony where families exchange rings and formalize the commitment between the couple. This joyous celebration marks the official beginning of their journey towards matrimonial union.',
      venue: 'The Grandeur by Lavanya',
      venueAddress: 'The Grandeur by Lavanya, banquet hall, Delhi, India',
      venueImage: lavanyaImage,
      icon: <Bell />,
      color: 'text-rose-600',
      bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
    },
    {
      id: 'saat-shagun',
      title: 'Sehrabandi',
      time: '6:30 PM',
      date: 'Nov 8',
      description: 'A traditional ceremony where the groom receives the sacred turban (sehra) and sword, symbolizing his readiness to protect and honor his bride. This auspicious ritual marks the beginning of the final journey to marriage.',
      venue: 'Salt Stayz',
      venueAddress: 'Salt Stayz Hotel, Delhi, India',
      venueImage: saltStaysImage,
      icon: <Users />,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    },
    {
      id: 'shaadi',
      title: 'Wedding Ceremony',
      time: '8 PM',
      date: 'Nov 8',
      description: 'The grand finale where Aayush and Tanya officially become husband and wife in the presence of family and friends. This beautiful ceremony sanctifies their eternal bond with sacred vows, fire rituals, and seven sacred steps.',
      venue: 'The Grand Dreams Mayapuri',
      venueAddress: 'The Grand Dreams Mayapuri, Mayapuri Industrial Area, Delhi',
      venueImage: grandDreamsImage,
      icon: <Flower2 />,
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-rose-50',
    },
  ];

  // Filter events based on showOnlyMarriage
  const filteredEvents = showOnlyMarriage 
    ? events.filter(event => event.id === 'shaadi')
    : events;

  // Group events by date
  const nov7Events = filteredEvents.filter(event => event.date === 'Nov 7');
  const nov8Events = filteredEvents.filter(event => event.date === 'Nov 8');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-light text-gray-800 mb-4">
            Wedding Schedule
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-light">
            Join us for our special celebration on November 8th, 2025
          </p>
        </motion.div>

        {/* November 7 */}
        {nov7Events.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative mb-12">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2, stiffness: 100 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl border border-emerald-200 shadow-lg backdrop-blur-sm"
              >
                <Calendar className="text-3xl text-emerald-600 mr-4" />
                <h3 className="text-3xl font-semibold text-gray-800 tracking-tight">November 7, 2025</h3>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`grid grid-cols-1 ${nov7Events.length === 1 ? 'lg:grid-cols-1' : nov7Events.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-10 relative`}
          >
            {/* Background Animation Layer */}
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 60%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0 pointer-events-none"
            />
            {nov7Events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover="hover"
                className="relative"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className={`${event.bgColor} rounded-3xl p-8 h-full glass-effect shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${activeEventAnimation === (event.id === 'janehu' ? 'janayu' : event.id === 'saat-shagun' ? 'pooja' : event.id) ? 'ring-2 ring-white/50 transform scale-105' : ''}`}
                  onMouseEnter={() => {
                    if (event.id === 'janehu') setActiveEventAnimation('janayu');
                    else if (event.id === 'haldi') setActiveEventAnimation('haldi');
                    else if (event.id === 'engagement') setActiveEventAnimation('sagai');
                    else if (event.id === 'saat-shagun') setActiveEventAnimation('pooja');
                    else if (event.id === 'shaadi') setActiveEventAnimation('shaadi');
                  }}
                  onMouseLeave={() => setActiveEventAnimation(null)}
                >
                  {/* Event-specific animations */}
                  {(event.id === 'janehu' && activeEventAnimation === 'janayu') && (
                    <EventAnimations eventType="janayu" isVisible={true} />
                  )}
                  {(event.id === 'haldi' && activeEventAnimation === 'haldi') && (
                    <EventAnimations eventType="haldi" isVisible={true} />
                  )}
                  {(event.id === 'engagement' && activeEventAnimation === 'sagai') && (
                    <EventAnimations eventType="sagai" isVisible={true} />
                  )}
                  {(event.id === 'saat-shagun' && activeEventAnimation === 'pooja') && (
                    <EventAnimations eventType="pooja" isVisible={true} />
                  )}
                  {(event.id === 'shaadi' && activeEventAnimation === 'shaadi') && (
                    <EventAnimations eventType="shaadi" isVisible={true} />
                  )}
                  
                  <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className={`${event.color} mb-4 inline-block`}
                  >
                    {event.icon}
                  </motion.div>
                  
                  <h4 className="text-2xl font-medium text-gray-800 mb-2">
                    {event.title}
                  </h4>
                  
                  <div className="flex items-center mb-3">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    <span className={`${event.color} font-medium`}>{event.time}</span>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-gray-700 leading-relaxed text-sm font-medium">
                      {event.description}
                    </p>
                  </div>

                  {/* Venue Image */}
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-4">
                    <img
                      src={event.venueImage}
                      alt={event.venue}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Simple Venue Information */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className={`${event.color}`} />
                      <span className="text-sm font-semibold text-gray-800">{event.venue}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{event.venueAddress}</p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white rounded-full opacity-20"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border border-white rounded-full opacity-30"></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        )}

        {/* November 8 Events */}
        {nov8Events.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-12">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2, stiffness: 100 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 rounded-2xl border border-rose-200 shadow-lg backdrop-blur-sm"
              >
                <Calendar className="text-3xl text-rose-600 mr-4" />
                <h3 className="text-3xl font-semibold text-gray-800 tracking-tight">November 8, 2025</h3>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`grid grid-cols-1 ${nov8Events.length === 1 ? 'lg:grid-cols-1' : nov8Events.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-8`}
          >
            {nov8Events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover="hover"
                className="relative"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className={`${event.bgColor} rounded-3xl p-8 h-full glass-effect shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${activeEventAnimation === (event.id === 'janehu' ? 'janayu' : event.id === 'saat-shagun' ? 'pooja' : event.id) ? 'ring-2 ring-white/50 transform scale-105' : ''}`}
                  onMouseEnter={() => {
                    if (event.id === 'janehu') setActiveEventAnimation('janayu');
                    else if (event.id === 'haldi') setActiveEventAnimation('haldi');
                    else if (event.id === 'engagement') setActiveEventAnimation('sagai');
                    else if (event.id === 'saat-shagun') setActiveEventAnimation('pooja');
                    else if (event.id === 'shaadi') setActiveEventAnimation('shaadi');
                  }}
                  onMouseLeave={() => setActiveEventAnimation(null)}
                >
                  {/* Event-specific animations */}
                  {(event.id === 'janehu' && activeEventAnimation === 'janayu') && (
                    <EventAnimations eventType="janayu" isVisible={true} />
                  )}
                  {(event.id === 'haldi' && activeEventAnimation === 'haldi') && (
                    <EventAnimations eventType="haldi" isVisible={true} />
                  )}
                  {(event.id === 'engagement' && activeEventAnimation === 'sagai') && (
                    <EventAnimations eventType="sagai" isVisible={true} />
                  )}
                  {(event.id === 'saat-shagun' && activeEventAnimation === 'pooja') && (
                    <EventAnimations eventType="pooja" isVisible={true} />
                  )}
                  {(event.id === 'shaadi' && activeEventAnimation === 'shaadi') && (
                    <EventAnimations eventType="shaadi" isVisible={true} />
                  )}
                  
                  <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className={`${event.color} mb-4 inline-block`}
                  >
                    {event.icon}
                  </motion.div>
                  
                  <h4 className="text-2xl font-medium text-gray-800 mb-2">
                    {event.title}
                  </h4>
                  
                  <div className="flex items-center mb-3">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    <span className={`${event.color} font-medium`}>{event.time}</span>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-gray-700 leading-relaxed text-sm font-medium">
                      {event.description}
                    </p>
                  </div>

                  {/* Venue Image */}
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-4">
                    <img
                      src={event.venueImage}
                      alt={event.venue}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Simple Venue Information */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className={`${event.color}`} />
                      <span className="text-sm font-semibold text-gray-800">{event.venue}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{event.venueAddress}</p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white rounded-full opacity-20"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border border-white rounded-full opacity-30"></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        )}
      </div>
    </section>
  );
});

export default WeddingSchedule;

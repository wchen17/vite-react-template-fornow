import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Plane, Globe, Shield, Star, ChevronDown, Menu, X, Search, Zap, Award, Play, Pause, Wind, Sparkles, Users, CheckCircle } from 'lucide-react';

export default function LuxuryHelicopterMarketplace() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gravityMode, setGravityMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItems, setSavedItems] = useState<number[]>([]);
  const [selectedHelicopter, setSelectedHelicopter] = useState<any>(null);
  const [videoPlaying, setVideoPlaying] = useState<number | null>(null);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSpotlight, setShowSpotlight] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXSpring = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  const floatingIcons = [
    { id: 1, Icon: Plane, x: 100, y: 100, delay: 0 },
    { id: 2, Icon: Globe, x: 300, y: 200, delay: 0.5 },
    { id: 3, Icon: Shield, x: 500, y: 150, delay: 1 },
    { id: 4, Icon: Star, x: 700, y: 250, delay: 1.5 },
    { id: 5, Icon: Award, x: 900, y: 100, delay: 2 },
    { id: 6, Icon: Wind, x: 200, y: 300, delay: 2.5 },
    { id: 7, Icon: Sparkles, x: 800, y: 350, delay: 3 },
  ];

  const brands = [
    { name: 'Airbus', count: 24, logo: '🚁', color: 'from-blue-500 to-blue-700' },
    { name: 'Bell', count: 18, logo: '🔔', color: 'from-red-500 to-red-700' },
    { name: 'Sikorsky', count: 31, logo: '✈️', color: 'from-green-500 to-green-700' },
    { name: 'Leonardo', count: 15, logo: '🎨', color: 'from-purple-500 to-purple-700' },
    { name: 'Robinson', count: 12, logo: '🏁', color: 'from-orange-500 to-orange-700' },
  ];

  const helicopters = [
    {
      id: 1,
      brand: 'Airbus',
      model: 'H175 VIP',
      year: 2023,
      hours: 150,
      seats: 16,
      range: '1,135 km',
      cruiseSpeed: '285 km/h',
      location: 'Monaco',
      broker: 'Elite Aviation Partners',
      images: 12,
      hasVideo: true,
      features: ['VIP Interior', 'Satellite Communication', 'Entertainment System', 'Full Galley', 'Bedroom Suite', 'Conference Room'],
      description: 'Exceptional VIP configured H175 with bespoke interior by Hermès. Features include hand-stitched leather seating, carbon fiber accents, and state-of-the-art avionics.',
      spotlight: true,
      views: 2847,
      inquiries: 34,
      availability: 'Immediate',
      certification: ['EASA', 'FAA'],
    },
    {
      id: 2,
      brand: 'Bell',
      model: '525 Relentless',
      year: 2024,
      hours: 0,
      seats: 20,
      range: '926 km',
      cruiseSpeed: '296 km/h',
      location: 'New York',
      broker: 'Manhattan Helicopter Group',
      images: 18,
      hasVideo: true,
      features: ['Fly-by-wire Controls', 'Garmin G5000H', 'Executive Configuration', 'Noise Reduction', 'Custom Paint', 'Wine Cellar'],
      description: 'Brand new Bell 525 with cutting-edge fly-by-wire technology. First in class safety features with luxurious executive interior.',
      spotlight: false,
      views: 1923,
      inquiries: 28,
      availability: '30 days',
      certification: ['FAA', 'Transport Canada'],
    },
    {
      id: 3,
      brand: 'Sikorsky',
      model: 'S-92A Executive',
      year: 2022,
      hours: 320,
      seats: 19,
      range: '1,000 km',
      cruiseSpeed: '280 km/h',
      location: 'London',
      broker: 'Royal Aviation Services',
      images: 15,
      hasVideo: false,
      features: ['Presidential Interior', 'Conference Capability', 'Sleeping Quarters', 'Advanced Avionics', 'Bulletproof Glass', 'Medical Equipment'],
      description: 'Ultra-luxury S-92A previously owned by Fortune 500 CEO. Impeccable maintenance history with recent interior refresh.',
      spotlight: true,
      views: 3156,
      inquiries: 41,
      availability: 'Negotiable',
      certification: ['EASA', 'FAA', 'CAAC'],
    },
    {
      id: 4,
      brand: 'Leonardo',
      model: 'AW139',
      year: 2023,
      hours: 89,
      seats: 15,
      range: '1,250 km',
      cruiseSpeed: '306 km/h',
      location: 'Dubai',
      broker: 'Gulf Aviation Brokers',
      images: 20,
      hasVideo: true,
      features: ['Royal Interior', 'Gold Plating', 'Swarovski Crystals', 'Massage Seats', 'Holographic Display', 'AI Assistant'],
      description: 'One-of-a-kind AW139 with royal specifications. Features gold-plated fixtures and Swarovski crystal embellishments throughout.',
      spotlight: true,
      views: 4892,
      inquiries: 67,
      availability: 'By Appointment',
      certification: ['GCAA', 'EASA'],
    },
  ];

  const journalArticles = [
    {
      id: 1,
      title: 'The Future of Urban Air Mobility',
      category: 'Innovation',
      readTime: '5 min',
      image: '🚁',
      author: 'Dr. Sarah Chen',
      date: 'Nov 15, 2024',
      trending: true,
    },
    {
      id: 2,
      title: 'Inside the World\'s Most Luxurious Helicopters',
      category: 'Lifestyle',
      readTime: '8 min',
      image: '✨',
      author: 'James Wellington',
      date: 'Nov 12, 2024',
      trending: true,
    },
    {
      id: 3,
      title: 'Helicopter Investment Guide 2024',
      category: 'Finance',
      readTime: '12 min',
      image: '📈',
      author: 'Michael Ross',
      date: 'Nov 10, 2024',
      trending: false,
    },
    {
      id: 4,
      title: 'Electric VTOL: The Next Chapter',
      category: 'Technology',
      readTime: '6 min',
      image: '⚡',
      author: 'Lisa Park',
      date: 'Nov 8, 2024',
      trending: true,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sheikh Abdullah Al-Rashid',
      role: 'Private Collector',
      text: 'Helixury provided exceptional service in acquiring my fleet. Their discretion and expertise are unmatched.',
      rating: 5,
      verified: true,
      helicoptersPurchased: 3,
    },
    {
      id: 2,
      name: 'Victoria Rothschild',
      role: 'CEO, Rothschild Industries',
      text: 'The attention to detail and personalized service exceeded all expectations. Truly a white-glove experience.',
      rating: 5,
      verified: true,
      helicoptersPurchased: 2,
    },
    {
      id: 3,
      name: 'Dimitri Volkov',
      role: 'Tech Entrepreneur',
      text: 'From initial inquiry to delivery, the process was seamless. The team\'s knowledge is extraordinary.',
      rating: 5,
      verified: true,
      helicoptersPurchased: 1,
    },
  ];

  const handleGravityToggle = () => {
    setGravityMode(!gravityMode);
  };

  const handleSaveItem = (id: number) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const GravityWrapper = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const y = useMotionValue(0);
    const physics = useSpring(y, { stiffness: 300, damping: 20 });

    useEffect(() => {
      if (gravityMode) {
        const timeout = setTimeout(() => {
          y.set(Math.random() * 300 + 100);
        }, delay * 100);
        return () => clearTimeout(timeout);
      } else {
        y.set(0);
      }
    }, [gravityMode, delay, y]);

    return (
      <motion.div
        style={{ y: physics }}
        animate={
          gravityMode
            ? {
                rotate: [0, 5, -5, 0],
                scale: [1, 0.98, 1.02, 1],
              }
            : {}
        }
        transition={{ duration: 2, repeat: gravityMode ? Infinity : 0 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: cursorVariant === 'hover' ? 2 : 1,
            backgroundColor: cursorVariant === 'hover' ? '#fff' : '#000',
          }}
          className="w-8 h-8 rounded-full"
        />
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-[60]"
        style={{ width: progressBar }}
      />

      {/* Floating Icons Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon) => (
          <motion.div
            key={icon.id}
            className="absolute text-slate-200"
            initial={{ x: icon.x, y: icon.y }}
            animate={{
              x: [icon.x, icon.x + 100, icon.x - 50, icon.x],
              y: [icon.y, icon.y - 80, icon.y + 60, icon.y],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + icon.delay * 2,
              delay: icon.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <icon.Icon size={40} />
          </motion.div>
        ))}
      </div>

      {/* Spotlight Effect */}
      {showSpotlight && (
        <motion.div
          className="fixed pointer-events-none z-50"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 100px, rgba(0,0,0,0.4) 300px)`,
            width: '100vw',
            height: '100vh',
          }}
        />
      )}

      {/* Navigation */}
      <motion.nav className="fixed top-0 w-full z-50 bg-white backdrop-blur-md" style={{ opacity: navOpacity }}>
        <div className="border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <GravityWrapper>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-4"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="text-slate-900"
                  >
                    <Plane size={32} />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-light tracking-wider">HELIXURY</h1>
                    <p className="text-xs text-slate-500 tracking-widest">GLOBAL HELICOPTER MARKETPLACE</p>
                  </div>
                </motion.div>
              </GravityWrapper>

              <div className="hidden lg:flex items-center space-x-8">
                <GravityWrapper delay={1}>
                  <button className="text-sm tracking-wide hover:text-slate-600 transition-colors">BUY</button>
                </GravityWrapper>
                <GravityWrapper delay={2}>
                  <button className="text-sm tracking-wide hover:text-slate-600 transition-colors">SELL WITH US</button>
                </GravityWrapper>
                <GravityWrapper delay={3}>
                  <button className="text-sm tracking-wide hover:text-slate-600 transition-colors">THE JOURNAL</button>
                </GravityWrapper>
                <GravityWrapper delay={4}>
                  <button className="text-sm tracking-wide hover:text-slate-600 transition-colors">SERVICES</button>
                </GravityWrapper>
                <GravityWrapper delay={5}>
                  <motion.button
                    onClick={handleGravityToggle}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-full transition-colors ${gravityMode ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}
                    aria-label="Toggle Gravity Mode"
                  >
                    <Zap size={20} />
                  </motion.button>
                </GravityWrapper>
                <GravityWrapper delay={6}>
                  <button className="bg-slate-900 text-white px-6 py-2 text-sm tracking-wide">CONTACT</button>
                </GravityWrapper>
              </div>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden" aria-label="Toggle Menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 bg-white z-40 border-t border-slate-200 shadow-lg lg:hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {['BUY', 'SELL WITH US', 'THE JOURNAL', 'SERVICES', 'CONTACT'].map((item) => (
                <button
                  key={item}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 rounded-lg"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 pt-32">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GravityWrapper>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-light tracking-tight mb-6"
            >
              DISCOVER EXCEPTIONAL
              <span className="block text-slate-500">HELICOPTERS</span>
            </motion.h1>
          </GravityWrapper>
          <GravityWrapper delay={1}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto font-light"
            >
              The world's premier marketplace for luxury helicopters. Curated listings from trusted brokers worldwide.
            </motion.p>
          </GravityWrapper>

          {/* Search Bar */}
          <GravityWrapper delay={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-none shadow-lg p-2 flex items-center">
                <Search className="text-slate-400 ml-4" size={24} />
                <input
                  type="text"
                  placeholder="Search by brand, model, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-4 text-lg focus:outline-none"
                  aria-label="Search helicopters"
                />
                <button className="bg-slate-900 text-white px-8 py-4 text-sm tracking-wide" aria-label="Search">
                  SEARCH
                </button>
              </div>
            </motion.div>
          </GravityWrapper>

          {/* Brand Filters */}
          <GravityWrapper delay={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-wrap justify-center gap-4"
            >
              {brands.map((brand, index) => (
                <motion.button
                  key={brand.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBrand(brand.name)}
                  className={`px-6 py-3 border ${
                    selectedBrand === brand.name
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 hover:border-slate-500'
                  } transition-colors`}
                  aria-pressed={selectedBrand === brand.name}
                >
                  <span className="mr-2" role="img" aria-label={`${brand.name} logo`}>{brand.logo}</span>
                  {brand.name} ({brand.count})
                </motion.button>
              ))}
            </motion.div>
          </GravityWrapper>
        </motion.div>

        <GravityWrapper delay={4}>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={32} className="text-slate-400" />
          </motion.div>
        </GravityWrapper>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'LUXURY HELICOPTERS' },
              { value: '45', label: 'COUNTRIES' },
              { value: '200+', label: 'VERIFIED BROKERS' },
              { value: '$2.5B', label: 'TOTAL VALUE' },
            ].map((stat, index) => (
              <GravityWrapper key={index} delay={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold mb-2 tracking-wide">{stat.value}</div>
                  <div className="text-slate-400 tracking-widest text-sm">{stat.label}</div>
                </motion.div>
              </GravityWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Helicopter Listings Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light tracking-wide">Featured Helicopters</h2>
            <p className="text-slate-600 max-w-3xl mx-auto mt-4">
              Exclusive listings with price on request to maintain privacy and exclusivity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {helicopters
              .filter((h) => !selectedBrand || h.brand === selectedBrand)
              .filter((h) =>
                searchQuery
                  ? h.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    h.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    h.location.toLowerCase().includes(searchQuery.toLowerCase())
                  : true
              )
              .map((heli) => (
                <GravityWrapper key={heli.id} delay={heli.id}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="border border-slate-200 rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => setSelectedHelicopter(heli)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if(e.key === 'Enter') setSelectedHelicopter(heli); }}
                    aria-label={`View details for ${heli.brand} ${heli.model}`}
                  >
                    <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200">
                      {heli.hasVideo && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setVideoPlaying(heli.id === videoPlaying ? null : heli.id);
                          }}
                          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition"
                          aria-label={videoPlaying === heli.id ? 'Pause Video' : 'Play Video'}
                        >
                          {videoPlaying === heli.id ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                      )}
                      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 rounded-md px-3 py-1 text-sm font-semibold">
                        {heli.images} Images
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">
                        {heli.brand} {heli.model}
                      </h3>
                      <p className="text-slate-600 mb-2">Year: {heli.year} | Hours: {heli.hours}</p>
                      <p className="text-slate-600 mb-2">Seats: {heli.seats} | Range: {heli.range}</p>
                      <p className="text-slate-600 mb-2">Cruise Speed: {heli.cruiseSpeed}</p>
                      <p className="text-slate-600 mb-2">Location: {heli.location}</p>
                      <p className="text-slate-600 mb-2">Broker: {heli.broker}</p>
                      <p className="text-slate-700 font-semibold mt-4">Price: <em>On Request</em></p>
                    </div>
                  </motion.div>
                </GravityWrapper>
              ))}
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light tracking-wide">The Journal</h2>
            <p className="text-slate-600 max-w-3xl mx-auto mt-4">
              Lifestyle and industry insights blending commerce with aspirational storytelling.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {journalArticles.map((article) => (
              <GravityWrapper key={article.id} delay={article.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="border border-slate-200 rounded-2xl p-6 cursor-pointer shadow-sm bg-white"
                  role="article"
                  tabIndex={0}
                  aria-label={`Read article: ${article.title}`}
                >
                  <div className="text-4xl mb-4" aria-hidden="true">{article.image}</div>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-slate-600 text-sm mb-1">Category: {article.category}</p>
                  <p className="text-slate-400 text-xs">Read Time: {article.readTime}</p>
                  <p className="text-slate-400 text-xs">By {article.author} on {article.date}</p>
                  {article.trending && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                      Trending
                    </span>
                  )}
                </motion.div>
              </GravityWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light tracking-wide">What Our Clients Say</h2>
            <p className="text-slate-600 max-w-3xl mx-auto mt-4">
              Trusted by the world’s most discerning helicopter owners.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {testimonials.map((testimonial) => (
              <GravityWrapper key={testimonial.id} delay={testimonial.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="border border-slate-200 rounded-2xl p-6 cursor-pointer shadow-sm bg-slate-50"
                  role="region"
                  aria-label={`Testimonial from ${testimonial.name}`}
                >
                  <div className="flex items-center mb-4">
                    <Users className="text-blue-600 mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                      <p className="text-slate-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 italic mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-slate-300" />
                    ))}
                  </div>
                  {testimonial.verified && (
                    <div className="mt-2 flex items-center text-green-600">
                      <CheckCircle className="mr-1" /> Verified Buyer
                    </div>
                  )}
                  <div className="mt-2 text-sm text-slate-500">
                    Helicopters Purchased: {testimonial.helicoptersPurchased}
                  </div>
                </motion.div>
              </GravityWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Sell With Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GravityWrapper>
            <motion.h2 className="text-4xl font-light tracking-wide mb-6">Sell With Us</motion.h2>
            <motion.p className="text-slate-600 max-w-3xl mx-auto mb-8">
              Join our exclusive network of brokers and private sellers to list your luxury helicopters.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-900 text-white px-8 py-4 rounded-full text-lg tracking-wide"
            >
              Become a Broker
            </motion.button>
          </GravityWrapper>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <GravityWrapper>
            <motion.h2 className="text-4xl font-light tracking-wide mb-6 text-center">Contact Us</motion.h2>
            <motion.p className="text-slate-600 max-w-3xl mx-auto mb-12 text-center">
              Interested in a helicopter? Reach out to our sales team for personalized assistance.
            </motion.p>
          </GravityWrapper>

          <form className="space-y-6 max-w-xl mx-auto" aria-label="Contact form">
            <GravityWrapper delay={1}>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm placeholder-slate-400 focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
                required
              />
            </GravityWrapper>

            <GravityWrapper delay={2}>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm placeholder-slate-400 focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
                required
              />
            </GravityWrapper>

            <GravityWrapper delay={3}>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Your inquiry"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm placeholder-slate-400 focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
                required
              />
            </GravityWrapper>

            <GravityWrapper delay={4}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-900 text-white px-6 py-3 rounded-full w-full text-lg tracking-wide"
              >
                Send Inquiry
              </motion.button>
            </GravityWrapper>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} Helixury. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

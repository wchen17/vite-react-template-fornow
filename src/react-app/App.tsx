
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Plane, Globe, Shield, Star, ChevronDown, Menu, X, Search, Users, CheckCircle, MapPin, Clock, Gauge, ArrowRight, Heart, XIcon, Maximize, Phone, Briefcase, Calendar, DollarSign, Play } from 'lucide-react';

// --- Constants & Data ---

// Define a sophisticated color palette
const GOLD_ACCENT = 'text-amber-600';
const CHARCOAL = 'text-gray-900';
const BG_CHARCOAL = 'bg-gray-900';
const BG_OFFWHITE = 'bg-gray-50';

const brands = [
    { name: 'Airbus', count: 24, logo: 'A', color: 'blue-600' },
    { name: 'Bell', count: 18, logo: 'B', color: 'red-600' },
    { name: 'Sikorsky', count: 31, logo: 'S', color: 'gray-600' },
    { name: 'Leonardo', count: 15, logo: 'L', color: 'purple-600' },
    { name: 'Robinson', count: 12, logo: 'R', color: 'orange-600' },
];

const helicoptersData = [
    {
      id: 1,
      brand: 'Airbus',
      model: 'H175 VIP "Elegance"',
      year: 2023,
      hours: 150,
      seats: 8,
      range: '1,135 km',
      cruiseSpeed: '285 km/h',
      location: 'Monaco, MC',
      broker: 'Elite Aviation Partners',
      images: 12,
      hasVideo: true,
      features: ['VIP Interior by Hermès', 'Satellite Communication', 'Bespoke Entertainment System', 'Full Galley', 'Private Bedroom Suite', 'Soundproof Cabin'],
      description: 'Exceptional VIP configured H175 with bespoke interior by Hermès. Features include hand-stitched leather seating, carbon fiber accents, and state-of-the-art avionics. Maintained to the highest standards.',
      spotlight: true,
      price: 18500000,
      certification: ['EASA', 'FAA'],
    },
    {
      id: 2,
      brand: 'Bell',
      model: '525 Relentless Executive',
      year: 2024,
      hours: 0,
      seats: 12,
      range: '926 km',
      cruiseSpeed: '296 km/h',
      location: 'New York, USA',
      broker: 'Manhattan Helicopter Group',
      images: 18,
      hasVideo: true,
      features: ['Fly-by-wire Controls', 'Garmin G5000H Avionics', 'Executive Configuration', 'Active Noise Reduction', 'Custom Paint Scheme', 'Integrated Refreshment Center'],
      description: 'Brand new Bell 525 with cutting-edge fly-by-wire technology. First in class safety features combined with a luxurious executive interior designed for corporate transport.',
      spotlight: false,
      price: 'POA', // Price on Application
      certification: ['FAA', 'Transport Canada'],
    },
    {
        id: 3,
        brand: 'Sikorsky',
        model: 'S-92A VVIP Configuration',
        year: 2022,
        hours: 320,
        seats: 10,
        range: '1,000 km',
        cruiseSpeed: '280 km/h',
        location: 'London, UK',
        broker: 'Royal Aviation Services',
        images: 15,
        hasVideo: false,
        features: ['Presidential Interior', 'Secure Conference Capability', 'Private Stateroom', 'Advanced Avionics Suite', 'Enhanced Soundproofing', 'Auxiliary Fuel Tanks'],
        description: 'Ultra-luxury S-92A previously operated for a Head of State. Impeccable maintenance history with recent interior refresh and avionics upgrade.',
        spotlight: true,
        price: 27000000,
        certification: ['EASA', 'FAA', 'CAAC'],
      },
      {
        id: 4,
        brand: 'Leonardo',
        model: 'AW139 Pininfarina Edition',
        year: 2023,
        hours: 89,
        seats: 9,
        range: '1,250 km',
        cruiseSpeed: '306 km/h',
        location: 'Dubai, UAE',
        broker: 'Gulf Aviation Brokers',
        images: 20,
        hasVideo: true,
        features: ['Pininfarina Designed Interior', 'Vibration Reduction System', 'In-flight Connectivity', 'Customizable Mood Lighting', 'Electrochromic Windows', 'Honeywell Primus Epic Avionics'],
        description: 'A stunning example of Italian design and engineering. The AW139 Pininfarina Edition offers unparalleled speed, range, and comfort in its class. Low hours and immediate availability.',
        spotlight: true,
        price: 14500000,
        certification: ['GCAA', 'EASA'],
      },
];

const journalArticles = [
    { id: 1, title: 'The Rise of Sustainable Aviation Fuel in Rotorcraft', category: 'Sustainability', readTime: '5 min', author: 'Dr. Evelyn Reed' },
    { id: 2, title: 'Inside the Hermès H175: A Design Masterpiece', category: 'Luxury Design', readTime: '8 min', author: 'James Wellington' },
    { id: 3, title: 'Navigating Cross-Border Helicopter Acquisitions', category: 'Finance & Legal', readTime: '12 min', author: 'Michael Ross LLP' },
];

const testimonials = [
    { id: 1, name: 'A. Al-Rashid', role: 'Private Collector, UAE', text: 'Aether provided exceptional discretion and expertise in acquiring my fleet. Their market intelligence is unmatched.', rating: 5 },
    { id: 2, name: 'V. Rothschild', role: 'CEO, Global Investments', text: 'The white-glove service exceeded all expectations. From valuation to delivery, the process was flawless.', rating: 5 },
    { id: 3, name: 'E. Musk', role: 'Tech Visionary', text: 'Efficient, precise, and forward-thinking. Aether understands the future of vertical lift.', rating: 5 },
];

type Helicopter = typeof helicoptersData[0];

// --- Utility Components ---

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-16"
    >
        <h2 className={`text-sm font-semibold uppercase tracking-widest ${GOLD_ACCENT} mb-4`}>{subtitle}</h2>
        <h3 className={`text-4xl md:text-5xl font-serif ${CHARCOAL}`}>{title}</h3>
        <div className={`h-0.5 w-16 bg-amber-600 mx-auto mt-6`}></div>
    </motion.div>
);

const Button = ({ children, primary = false, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) => (
    <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`px-8 py-3 transition-all duration-300 font-medium text-sm tracking-wider uppercase ${
            primary
                ? `${BG_CHARCOAL} text-white hover:bg-gray-800 border border-gray-900`
                : `border border-gray-300 ${CHARCOAL} hover:border-gray-900 hover:bg-gray-900 hover:text-white`
        } ${className}`}
        {...props}
    >
        {children}
    </motion.button>
);

// --- Helicopter Detail Modal (New Feature for Advanced Marketplace) ---

const HelicopterDetailModal = ({ helicopter, onClose }: { helicopter: Helicopter, onClose: () => void }) => {
    useEffect(() => {
        // Prevent background scrolling when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const formatPrice = (price: number | string) => {
        if (typeof price === 'string') return price;
        return `$${price.toLocaleString()}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                    <XIcon className="w-6 h-6 text-gray-800" />
                </button>

                <div className="grid md:grid-cols-2">
                    {/* Image Placeholder */}
                    <div className="bg-gray-100 aspect-video md:aspect-square relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                            <Plane className="w-32 h-32 text-gray-500 transform rotate-45" />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
                        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 text-sm font-medium shadow-md">
                            {helicopter.images} Images
                        </div>
                        {helicopter.hasVideo && (
                             <button className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition" aria-label="Play Video">
                                <Play className="w-5 h-5 text-gray-800" />
                            </button>
                        )}
                    </div>

                    {/* Details */}
                    <div className="p-8 md:p-12">
                        <div className="mb-8">
                            <p className={`text-sm uppercase tracking-widest ${GOLD_ACCENT} mb-2`}>{helicopter.brand}</p>
                            <h1 className="text-4xl font-serif text-gray-900 mb-4">{helicopter.model}</h1>
                            <p className="text-gray-600 text-lg">{helicopter.description}</p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-serif text-gray-900 mb-4">Specifications</h2>
                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                                <div className="flex items-center"><Calendar className="w-5 h-5 mr-3 text-amber-600" /> Year: {helicopter.year}</div>
                                <div className="flex items-center"><Clock className="w-5 h-5 mr-3 text-amber-600" /> Hours: {helicopter.hours}</div>
                                <div className="flex items-center"><Users className="w-5 h-5 mr-3 text-amber-600" /> Seats: {helicopter.seats}</div>
                                <div className="flex items-center"><Gauge className="w-5 h-5 mr-3 text-amber-600" /> Speed: {helicopter.cruiseSpeed}</div>
                                <div className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-amber-600" /> Location: {helicopter.location}</div>
                                <div className="flex items-center"><Globe className="w-5 h-5 mr-3 text-amber-600" /> Range: {helicopter.range}</div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-serif text-gray-900 mb-4">Key Features</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                {helicopter.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-8">
                            <div className="flex justify-between items-center mb-6">
                                <div className='flex items-center'>
                                    <DollarSign className='w-6 h-6 text-amber-600 mr-2'/>
                                    <span className="text-3xl font-bold text-gray-900">{formatPrice(helicopter.price)}</span>
                                </div>
                                <div className='text-right'>
                                    <p className="text-sm text-gray-500">Broker: {helicopter.broker}</p>
                                    <p className="text-sm text-gray-500">Certifications: {helicopter.certification.join(', ')}</p>
                                </div>
                            </div>
                            <Button primary className="w-full flex items-center justify-center">
                                <Phone className="w-5 h-5 mr-3" /> Inquire Now
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- Helicopter Card (Refined Design) ---

const HelicopterCard = ({ heli, onSelect, onSave, isSaved }: { heli: Helicopter, onSelect: () => void, onSave: () => void, isSaved: boolean }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const formatPrice = (price: number | string) => {
        if (typeof price === 'string') return price;
        return `$${price.toLocaleString()}`;
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="group bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
        >
            <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={onSelect}>
                {/* Placeholder Image */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                     <Plane className="w-20 h-20 text-gray-400 transform rotate-45 group-hover:scale-110 transition duration-500" />
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
                
                {/* Save Button (Favorite) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSave();
                    }}
                    className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 shadow-md ${
                        isSaved ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                    aria-label={isSaved ? "Unsave helicopter" : "Save helicopter"}
                >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>

                {heli.spotlight && (
                    <div className={`absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider`}>
                        Featured
                    </div>
                )}
            </div>

            <div className="p-6">
                <p className={`text-xs uppercase tracking-widest ${GOLD_ACCENT} mb-2`}>{heli.brand}</p>
                <h3 className="text-2xl font-serif text-gray-900 mb-4 cursor-pointer hover:text-amber-600 transition duration-300" onClick={onSelect}>
                    {heli.model}
                </h3>
                
                {/* Key Specs Icons */}
                <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" /> {heli.year}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" /> {heli.hours} hrs
                    </div>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" /> {heli.seats} seats
                    </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <p className="text-xl font-bold text-gray-900">{formatPrice(heli.price)}</p>
                    <button 
                        onClick={onSelect}
                        className={`text-sm font-medium ${GOLD_ACCENT} flex items-center hover:text-amber-700 transition duration-300`}
                    >
                        View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// --- Main Component ---

export default function LuxuryHelicopterMarketplace() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItems, setSavedItems] = useState<number[]>([]);
  const [selectedHelicopter, setSelectedHelicopter] = useState<Helicopter | null>(null);

  const { scrollY } = useScroll();
  
  // Navigation styling transforms for sticky header effect
  const navBackground = useTransform(scrollY, [0, 100], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)']);
  const navShadow = useTransform(scrollY, [0, 100], ['0px 0px 0px rgba(0,0,0,0)', '0px 4px 20px rgba(0,0,0,0.05)']);
  const navBorder = useTransform(scrollY, [0, 100], ['1px solid rgba(0,0,0,0.05)', '1px solid rgba(229, 231, 235, 1)']);

  const handleSaveItem = useCallback((id: number) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  const filteredHelicopters = helicoptersData
    .filter((h) => !selectedBrand || h.brand === selectedBrand)
    .filter((h) =>
      searchQuery
        ? h.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.location.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <div className={`min-h-screen ${BG_OFFWHITE} ${CHARCOAL} font-sans`}>      
      {/* Navigation (Refined Corporate Style) */}
      <motion.nav 
        className="fixed top-0 w-full z-50 backdrop-blur-sm transition-colors duration-300"
        style={{ 
            backgroundColor: navBackground,
            boxShadow: navShadow,
            borderBottom: navBorder,
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              {/* Logo refinement: Using a sophisticated brand name */}
              <Plane className={`w-8 h-8 ${GOLD_ACCENT} transform rotate-45`} />
              <h1 className="text-2xl font-serif tracking-wider">AETHER</h1>
              <span className='text-xs text-gray-500 ml-1'>/ AVIATION</span>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-10">
              {['Buy', 'Sell', 'Charter', 'Journal', 'About'].map((item) => (
                <a key={item} href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                  {item}
                </a>
              ))}
              <Button primary>
                Concierge <Phone className="w-4 h-4 ml-2 inline" />
              </Button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-gray-900" aria-label="Toggle Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
            className="fixed top-20 left-0 right-0 bg-white z-40 shadow-lg lg:hidden"
          >
            <div className="p-6 space-y-4">
                {['Buy', 'Sell', 'Charter', 'Journal', 'About', 'Concierge'].map((item) => (
                    <a key={item} href="#" className='block py-2 text-lg font-serif text-gray-800' onClick={() => setIsMenuOpen(false)}>{item}</a>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section (Impactful and Clean) */}
      <section className="relative pt-32 pb-40 flex items-center justify-center overflow-hidden bg-white">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-gray-100 opacity-30"></div>
        
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-serif mb-6 text-gray-900"
          >
            Elevate Your Perspective.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-light"
          >
            The definitive global marketplace for acquiring and selling exceptional luxury helicopters.
          </motion.p>

          {/* Search Bar Refinement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto shadow-xl"
          >
            <div className="bg-white flex items-center overflow-hidden border border-gray-200">
              <Search className="text-gray-400 ml-6" size={24} />
              <input
                type="text"
                placeholder="Search brand, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-5 text-lg focus:outline-none"
                aria-label="Search helicopters"
              />
              <Button primary className="rounded-none h-full py-5" onClick={() => { /* Trigger search logic */ }}>
                Explore
              </Button>
            </div>
          </motion.div>

          {/* Brand Filters Refinement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-6"
          >
            <button
                onClick={() => setSelectedBrand(null)}
                className={`px-6 py-3 text-sm transition-colors duration-300 ${
                    selectedBrand === null
                        ? `${BG_CHARCOAL} text-white`
                        : 'text-gray-600 hover:text-gray-900 border border-transparent hover:border-gray-300'
                }`}
            >
                All Manufacturers
            </button>
            {brands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => setSelectedBrand(brand.name)}
                className={`px-6 py-3 text-sm transition-colors duration-300 ${
                  selectedBrand === brand.name
                    ? `${BG_CHARCOAL} text-white`
                    : 'text-gray-600 hover:text-gray-900 border border-transparent hover:border-gray-300'
                }`}
                aria-pressed={selectedBrand === brand.name}
              >
                {brand.name}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={28} className="text-gray-400" />
        </motion.div>
      </section>

      {/* Stats Section (Refined Dark Mode) */}
      <section className={`${BG_CHARCOAL} py-20 text-white`}>...</section>

      {/* Helicopter Listings Section */}
      <section className="py-24 bg-white">...</section>

      {/* Services Section (New addition for advanced marketplace) */}
      <section className={`py-24 ${BG_OFFWHITE}`}>...</section>

      {/* Journal Section (Editorial Style) */}
      <section className="py-24 bg-white">...</section>

      {/* Testimonials Section (Refined Dark Mode) */}
      <section className={`py-24 ${BG_CHARCOAL} text-white`}>...</section>

      {/* Call to Action / Contact Section */}
      <section className="py-24 bg-white">...</section>

      {/* Footer (Comprehensive) */}
      <footer className={`${BG_CHARCOAL} text-gray-400 py-12`}>...</footer>

      {/* Detail Modal Portal */}
      <AnimatePresence>
        {selectedHelicopter && (
            <HelicopterDetailModal 
                helicopter={selectedHelicopter} 
                onClose={() => setSelectedHelicopter(null)} 
            />
        )}
      </AnimatePresence>
    </div>
  );
}

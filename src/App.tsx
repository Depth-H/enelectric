import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronRight, 
  Settings, Save, Plus, Trash2, LogIn, ExternalLink,
  Zap, Shield, Lightbulb, Award, History, Eye
} from 'lucide-react';
import { SiteData, PortfolioItem, ServiceItem } from './types';

// --- Components ---

const Navbar = ({ siteInfo }: { siteInfo: SiteData['siteInfo'] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '홈', path: '/' },
    { name: '회사소개', path: '/about' },
    { name: '서비스', path: '/services' },
    { name: '포트폴리오', path: '/portfolio' },
    { name: '문의하기', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-ivory/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative w-12 h-12 bg-ivory/5 rounded-xl flex items-center justify-center overflow-hidden border border-ivory/10 group-hover:border-ivory/30 transition-all duration-500">
              <img 
                src={siteInfo.logo} 
                alt="Logo" 
                className="w-full h-full object-contain relative z-10 p-1" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }} 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ivory text-black font-black text-sm tracking-tighter">
                EN
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-ivory font-bold text-2xl tracking-tighter uppercase group-hover:text-white transition-colors">{siteInfo.name}</span>
              <span className="text-ivory/60 text-[10px] tracking-[0.2em] -mt-1 uppercase">EN ELECTRIC CO.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-widest transition-colors hover:text-ivory ${
                  location.pathname === link.path ? 'text-ivory' : 'text-ivory/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin" className="text-ivory/40 hover:text-ivory transition-colors">
              <Settings size={18} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/admin" className="text-ivory/40">
              <Settings size={18} />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-ivory">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-ivory/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-ivory/60 hover:text-ivory hover:bg-ivory/5 rounded-lg transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ data }: { data: SiteData }) => {
  return (
    <footer className="bg-black border-t border-ivory/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-ivory/10 rounded flex items-center justify-center overflow-hidden border border-ivory/20">
                <img src={data.siteInfo.logo} alt="Logo" className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                <Zap size={14} className="text-ivory absolute" />
              </div>
              <h3 className="text-ivory font-bold text-xl uppercase tracking-tighter">{data.siteInfo.name}</h3>
            </div>
            <p className="text-ivory/60 text-sm leading-relaxed mb-6">
              {data.siteInfo.description}
            </p>
            <div className="flex space-x-4">
              {/* Social links placeholder */}
              <div className="w-8 h-8 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/40 hover:border-ivory hover:text-ivory transition-all cursor-pointer">
                <span className="text-[10px] font-bold">K</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/40 hover:border-ivory hover:text-ivory transition-all cursor-pointer">
                <span className="text-[10px] font-bold">I</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-ivory font-semibold text-sm uppercase tracking-widest mb-8">Contact</h4>
            <ul className="space-y-4 text-sm text-ivory/60">
              <li className="flex items-center space-x-3">
                <Phone size={14} className="text-ivory/40" />
                <span>{data.siteInfo.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={14} className="text-ivory/40" />
                <span>{data.siteInfo.contact.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={14} className="text-ivory/40 mt-1 shrink-0" />
                <span>{data.siteInfo.contact.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-ivory font-semibold text-sm uppercase tracking-widest mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-ivory/60">
              <li><Link to="/about" className="hover:text-ivory transition-colors">회사소개</Link></li>
              <li><Link to="/services" className="hover:text-ivory transition-colors">서비스</Link></li>
              <li><Link to="/portfolio" className="hover:text-ivory transition-colors">포트폴리오</Link></li>
              <li><Link to="/contact" className="hover:text-ivory transition-colors">문의하기</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-ivory/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-ivory/30 uppercase tracking-[0.2em]">
          <p>© 2024 EN ELECTRIC CO. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const Home = ({ data }: { data: SiteData }) => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-ivory/60 text-xs sm:text-sm uppercase tracking-[0.4em] mb-6 block font-medium"
          >
            {data.siteInfo.tagline}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl text-ivory font-bold mb-8 tracking-tighter leading-[0.9]"
          >
            PREMIUM <br /> ELECTRICAL <br /> SOLUTIONS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-ivory/60 text-sm sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {data.siteInfo.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link 
              to="/portfolio" 
              className="px-10 py-4 bg-ivory text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all w-full sm:w-auto"
            >
              포트폴리오 보기
            </Link>
            <Link 
              to="/contact" 
              className="px-10 py-4 border border-ivory/30 text-ivory text-xs font-bold uppercase tracking-widest hover:bg-ivory/10 transition-all w-full sm:w-auto"
            >
              문의하기
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-[1px] h-12 bg-ivory/30" />
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <span className="text-ivory/40 text-[10px] uppercase tracking-[0.3em] mb-4 block">Our Services</span>
            <h2 className="text-3xl sm:text-5xl text-ivory font-bold tracking-tighter">호텔 및 모텔 환경에 최적화된 <br /> 전문 전기 솔루션</h2>
          </div>
          <Link to="/services" className="text-ivory/60 hover:text-ivory text-xs uppercase tracking-widest flex items-center mt-6 md:mt-0">
            전체 서비스 보기 <ChevronRight size={14} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-10 border border-ivory/10 bg-ivory/[0.02] group hover:border-ivory/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full border border-ivory/20 flex items-center justify-center mb-8 group-hover:bg-ivory group-hover:text-black transition-all">
                {idx === 0 ? <Lightbulb size={20} /> : idx === 1 ? <Zap size={20} /> : <Shield size={20} />}
              </div>
              <h3 className="text-ivory font-bold text-xl mb-4">{service.title}</h3>
              <p className="text-ivory/50 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-32 bg-ivory/[0.02] border-y border-ivory/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-ivory/40 text-[10px] uppercase tracking-[0.3em] mb-4 block">Featured Projects</span>
            <h2 className="text-3xl sm:text-5xl text-ivory font-bold tracking-tighter">주요 시공 실적</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.portfolio.slice(0, 3).map((item) => (
              <Link to="/portfolio" key={item.id} className="group overflow-hidden relative aspect-[4/5]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-ivory/60 text-[10px] uppercase tracking-widest mb-2 block">{item.category}</span>
                  <h3 className="text-ivory font-bold text-xl mb-4 group-hover:translate-x-2 transition-transform">{item.title}</h3>
                  <div className="h-[1px] w-0 bg-ivory group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const About = ({ data }: { data: SiteData }) => {
  return (
    <div className="bg-black pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-ivory/40 text-[10px] uppercase tracking-[0.3em] mb-4 block">About Us</span>
            <h1 className="text-4xl sm:text-6xl text-ivory font-bold tracking-tighter mb-8 leading-[1.1]">
              공간의 가치를 <br /> 빛으로 완성하는 <br /> 기술의 정점
            </h1>
            <p className="text-ivory/60 text-lg leading-relaxed mb-8">
              주식회사 이엔전력은 수년간 호텔 및 모텔 전문 전기공사 분야에서 독보적인 기술력과 노하우를 쌓아왔습니다. 
              단순한 시공을 넘어, 공간의 분위기와 안전, 그리고 운영 효율성까지 고려한 토탈 전기 솔루션을 제공합니다.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-ivory font-bold text-3xl mb-2">15+</h4>
                <p className="text-ivory/40 text-xs uppercase tracking-widest">Years Experience</p>
              </div>
              <div>
                <h4 className="text-ivory font-bold text-3xl mb-2">500+</h4>
                <p className="text-ivory/40 text-xs uppercase tracking-widest">Projects Completed</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square"
          >
            <img 
              src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1000" 
              alt="Engineering" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-ivory/10 -z-10" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-10 border border-ivory/5 bg-ivory/[0.01]">
            <History className="text-ivory mb-6" size={32} />
            <h3 className="text-ivory font-bold text-xl mb-4">연혁</h3>
            <p className="text-ivory/50 text-sm leading-relaxed">{data.siteInfo.aboutUs.history}</p>
          </div>
          <div className="p-10 border border-ivory/5 bg-ivory/[0.01]">
            <Eye className="text-ivory mb-6" size={32} />
            <h3 className="text-ivory font-bold text-xl mb-4">비전</h3>
            <p className="text-ivory/50 text-sm leading-relaxed">{data.siteInfo.aboutUs.vision}</p>
          </div>
          <div className="p-10 border border-ivory/5 bg-ivory/[0.01]">
            <Award className="text-ivory mb-6" size={32} />
            <h3 className="text-ivory font-bold text-xl mb-4">인증</h3>
            <p className="text-ivory/50 text-sm leading-relaxed">{data.siteInfo.aboutUs.certifications}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = ({ data }: { data: SiteData }) => {
  return (
    <div className="bg-black pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="text-ivory/40 text-[10px] uppercase tracking-[0.3em] mb-4 block">Our Expertise</span>
          <h1 className="text-4xl sm:text-6xl text-ivory font-bold tracking-tighter">전문 서비스 영역</h1>
        </div>

        <div className="space-y-32">
          {data.services.map((service, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row items-center gap-20 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <span className="text-ivory font-mono text-5xl opacity-10 mb-6 block">0{idx + 1}</span>
                <h2 className="text-3xl sm:text-4xl text-ivory font-bold mb-8 tracking-tight">{service.title}</h2>
                <p className="text-ivory/60 text-lg leading-relaxed mb-10">
                  {service.description} 이엔전력만의 특화된 기술력으로 최상의 결과물을 보장합니다. 
                  고객사의 요구사항을 면밀히 분석하여 가장 효율적이고 안전한 시스템을 제안해 드립니다.
                </p>
                <ul className="space-y-4">
                  {['정밀 설계 및 컨설팅', '최첨단 장비 시공', '철저한 사후 관리', '에너지 효율 최적화'].map((item, i) => (
                    <li key={i} className="flex items-center text-ivory/40 text-sm">
                      <ChevronRight size={14} className="mr-2 text-ivory/20" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full aspect-video bg-ivory/5 border border-ivory/10 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${idx === 0 ? '1565814636199-ae8133055c1c' : idx === 1 ? '1558444458-5cd058430e62' : '1504328345606-18bbc8c9d7d1'}?auto=format&fit=crop&q=80&w=1000`}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio = ({ data }: { data: SiteData }) => {
  const [filter, setFilter] = useState('전체');
  const categories = ['전체', ...new Set(data.portfolio.map(item => item.category))];

  const filteredItems = filter === '전체' 
    ? data.portfolio 
    : data.portfolio.filter(item => item.category === filter);

  return (
    <div className="bg-black pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-ivory/40 text-[10px] uppercase tracking-[0.3em] mb-4 block">Portfolio</span>
          <h1 className="text-4xl sm:text-6xl text-ivory font-bold tracking-tighter mb-12">시공 실적</h1>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2 text-[10px] uppercase tracking-widest border transition-all ${
                  filter === cat ? 'bg-ivory text-black border-ivory' : 'text-ivory/40 border-ivory/20 hover:border-ivory/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border border-ivory flex items-center justify-center text-ivory">
                      <Plus size={20} />
                    </div>
                  </div>
                </div>
                <span className="text-ivory/40 text-[10px] uppercase tracking-widest mb-2 block">{item.category}</span>
                <h3 className="text-ivory font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-ivory/50 text-sm line-clamp-2">{item.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Contact = ({ data }: { data: SiteData }) => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-ivory/40 text-[10px] uppercase tracking-[0.3em] mb-4 block">Contact Us</span>
            <h1 className="text-4xl sm:text-6xl text-ivory font-bold tracking-tighter mb-12">프로젝트 문의</h1>
            
            <div className="space-y-12 mb-16">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full border border-ivory/10 flex items-center justify-center text-ivory shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-ivory font-semibold text-sm uppercase tracking-widest mb-2">Phone</h4>
                  <p className="text-ivory/60 text-lg">{data.siteInfo.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full border border-ivory/10 flex items-center justify-center text-ivory shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-ivory font-semibold text-sm uppercase tracking-widest mb-2">Email</h4>
                  <p className="text-ivory/60 text-lg">{data.siteInfo.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full border border-ivory/10 flex items-center justify-center text-ivory shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-ivory font-semibold text-sm uppercase tracking-widest mb-2">Address</h4>
                  <p className="text-ivory/60 text-lg">{data.siteInfo.contact.address}</p>
                </div>
              </div>
            </div>

            <div className="aspect-video w-full bg-ivory/5 border border-ivory/10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              {/* Google Maps Placeholder */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.111843186259!2d127.0357!3d37.5012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3ff12345678%3A0x1234567890abcdef!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCD some address!5e0!3m2!1sko!2skr!4v1234567890" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="bg-ivory/[0.02] border border-ivory/10 p-10 sm:p-16">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-ivory/10 flex items-center justify-center text-ivory mx-auto mb-8">
                  <ChevronRight size={40} className="rotate-90" />
                </div>
                <h3 className="text-2xl text-ivory font-bold mb-4">문의가 성공적으로 접수되었습니다.</h3>
                <p className="text-ivory/60 mb-10">담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-ivory text-xs font-bold uppercase tracking-widest border-b border-ivory pb-2"
                >
                  새 문의 작성하기
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">Name</label>
                  <input 
                    required
                    type="text" 
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-transparent border-b border-ivory/20 py-4 text-ivory focus:border-ivory outline-none transition-colors"
                    placeholder="성함 또는 업체명을 입력해주세요"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">Email</label>
                  <input 
                    required
                    type="email" 
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-transparent border-b border-ivory/20 py-4 text-ivory focus:border-ivory outline-none transition-colors"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">Phone</label>
                  <input 
                    required
                    type="tel" 
                    value={formState.phone}
                    onChange={e => setFormState({...formState, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-ivory/20 py-4 text-ivory focus:border-ivory outline-none transition-colors"
                    placeholder="010-0000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    className="w-full bg-transparent border-b border-ivory/20 py-4 text-ivory focus:border-ivory outline-none transition-colors resize-none"
                    placeholder="문의 내용을 상세히 적어주세요"
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full py-6 bg-ivory text-black text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50"
                >
                  {isSubmitting ? '전송 중...' : '문의 보내기'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = ({ data, onUpdate }: { data: SiteData, onUpdate: (newData: SiteData) => void }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [localData, setLocalData] = useState<SiteData>(data);
  const [activeTab, setActiveTab] = useState<'info' | 'portfolio' | 'services'>('info');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple demo password
      setIsLoggedIn(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localData)
      });
      if (res.ok) {
        onUpdate(localData);
        alert('저장되었습니다.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-ivory/[0.02] border border-ivory/10 p-10"
        >
          <div className="text-center mb-10">
            <Settings className="text-ivory mx-auto mb-4" size={40} />
            <h1 className="text-2xl text-ivory font-bold tracking-tight">관리자 로그인</h1>
            <p className="text-ivory/40 text-xs mt-2 uppercase tracking-widest">Admin Dashboard Access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호 (admin123)"
              className="w-full bg-black border border-ivory/20 p-4 text-ivory focus:border-ivory outline-none transition-all"
            />
            <button type="submit" className="w-full py-4 bg-ivory text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center justify-center">
              <LogIn size={16} className="mr-2" /> 접속하기
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl text-ivory font-bold tracking-tighter">관리자 대시보드</h1>
            <p className="text-ivory/40 text-xs uppercase tracking-widest mt-2">Content Management System</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleSave}
              className="px-8 py-3 bg-ivory text-black text-xs font-bold uppercase tracking-widest flex items-center hover:bg-white transition-all"
            >
              <Save size={16} className="mr-2" /> 변경사항 저장
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="px-8 py-3 border border-ivory/20 text-ivory/60 text-xs font-bold uppercase tracking-widest hover:bg-ivory/5 transition-all"
            >
              로그아웃
            </button>
          </div>
        </div>

        <div className="flex space-x-8 border-b border-ivory/10 mb-12 overflow-x-auto">
          {[
            { id: 'info', name: '기본 정보', icon: <History size={14} /> },
            { id: 'services', name: '서비스 관리', icon: <Zap size={14} /> },
            { id: 'portfolio', name: '포트폴리오', icon: <Eye size={14} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs font-bold uppercase tracking-widest flex items-center transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'text-ivory border-b-2 border-ivory' : 'text-ivory/40 hover:text-ivory/60'
              }`}
            >
              <span className="mr-2">{tab.icon}</span> {tab.name}
            </button>
          ))}
        </div>

        <div className="bg-ivory/[0.02] border border-ivory/10 p-8 sm:p-12">
          {activeTab === 'info' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">사이트 명</label>
                  <input 
                    type="text" 
                    value={localData.siteInfo.name}
                    onChange={e => setLocalData({...localData, siteInfo: {...localData.siteInfo, name: e.target.value}})}
                    className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">태그라인</label>
                  <input 
                    type="text" 
                    value={localData.siteInfo.tagline}
                    onChange={e => setLocalData({...localData, siteInfo: {...localData.siteInfo, tagline: e.target.value}})}
                    className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-ivory/40 text-[10px] uppercase tracking-widest">로고 설정</label>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1 w-full space-y-4">
                    <input 
                      type="text" 
                      value={localData.siteInfo.logo}
                      onChange={e => setLocalData({...localData, siteInfo: {...localData.siteInfo, logo: e.target.value}})}
                      className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none"
                      placeholder="/logo.png 또는 이미지 URL"
                    />
                    <div className="bg-ivory/5 border border-ivory/10 p-4 rounded text-[10px] text-ivory/40 leading-relaxed">
                      <p className="mb-1">• <strong className="text-ivory/60">직접 업로드:</strong> 파일을 <code className="text-ivory/60">public</code> 폴더에 넣고 <code className="text-ivory/60">/logo.png</code> 입력</p>
                      <p>• <strong className="text-ivory/60">외부 링크:</strong> 이미지 호스팅 사이트에 올린 후 <code className="text-ivory/60">https://...</code> 전체 주소 입력</p>
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-black border border-ivory/10 flex items-center justify-center overflow-hidden shrink-0 group relative">
                    {localData.siteInfo.logo ? (
                      <img 
                        src={localData.siteInfo.logo} 
                        alt="Preview" 
                        className="w-full h-full object-contain p-2" 
                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/100?text=Error')} 
                      />
                    ) : (
                      <Zap size={24} className="text-ivory/20" />
                    )}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] text-ivory uppercase tracking-tighter">Preview</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-ivory/40 text-[10px] uppercase tracking-widest">회사 설명 (메인)</label>
                <textarea 
                  rows={2}
                  value={localData.siteInfo.description}
                  onChange={e => setLocalData({...localData, siteInfo: {...localData.siteInfo, description: e.target.value}})}
                  className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-4">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">회사소개 - 연혁</label>
                  <textarea 
                    rows={4}
                    value={localData.siteInfo.aboutUs.history}
                    onChange={e => setLocalData({...localData, siteInfo: {...localData.siteInfo, aboutUs: {...localData.siteInfo.aboutUs, history: e.target.value}}})}
                    className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none resize-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">회사소개 - 비전</label>
                  <textarea 
                    rows={4}
                    value={localData.siteInfo.aboutUs.vision}
                    onChange={e => setLocalData({...localData, siteInfo: {...localData.siteInfo, aboutUs: {...localData.siteInfo.aboutUs, vision: e.target.value}}})}
                    className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none resize-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">회사소개 - 인증</label>
                  <textarea 
                    rows={4}
                    value={localData.siteInfo.aboutUs.certifications}
                    onChange={e => setLocalData({...localData, siteInfo: {...localData.siteInfo, aboutUs: {...localData.siteInfo.aboutUs, certifications: e.target.value}}})}
                    className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none resize-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">전화번호</label>
                  <input 
                    type="text" 
                    value={localData.siteInfo.contact.phone}
                    onChange={e => setLocalData({...localData, siteInfo: {...localData.siteInfo, contact: {...localData.siteInfo.contact, phone: e.target.value}}})}
                    className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-ivory/40 text-[10px] uppercase tracking-widest">이메일</label>
                  <input 
                    type="text" 
                    value={localData.siteInfo.contact.email}
                    onChange={e => setLocalData({...localData, siteInfo: {...localData.siteInfo, contact: {...localData.siteInfo.contact, email: e.target.value}}})}
                    className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-ivory/40 text-[10px] uppercase tracking-widest">주소</label>
                <input 
                  type="text" 
                  value={localData.siteInfo.contact.address}
                  onChange={e => setLocalData({...localData, siteInfo: {...localData.siteInfo, contact: {...localData.siteInfo.contact, address: e.target.value}}})}
                  className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-12">
              {localData.services.map((service, idx) => (
                <div key={idx} className="p-8 border border-ivory/10 bg-black relative group">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-4">
                      <label className="text-ivory/40 text-[10px] uppercase tracking-widest">서비스 명</label>
                      <input 
                        type="text" 
                        value={service.title}
                        onChange={e => {
                          const newServices = [...localData.services];
                          newServices[idx].title = e.target.value;
                          setLocalData({...localData, services: newServices});
                        }}
                        className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-ivory/40 text-[10px] uppercase tracking-widest">설명</label>
                      <textarea 
                        rows={3}
                        value={service.description}
                        onChange={e => {
                          const newServices = [...localData.services];
                          newServices[idx].description = e.target.value;
                          setLocalData({...localData, services: newServices});
                        }}
                        className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-12">
              <button 
                onClick={() => {
                  const newItem: PortfolioItem = {
                    id: Date.now().toString(),
                    title: '새 프로젝트',
                    category: '호텔',
                    description: '설명을 입력하세요',
                    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
                    date: new Date().toISOString().split('T')[0]
                  };
                  setLocalData({...localData, portfolio: [newItem, ...localData.portfolio]});
                }}
                className="w-full py-4 border-2 border-dashed border-ivory/20 text-ivory/40 hover:text-ivory hover:border-ivory/40 transition-all flex items-center justify-center text-xs font-bold uppercase tracking-widest"
              >
                <Plus size={16} className="mr-2" /> 새 포트폴리오 추가
              </button>

              <div className="grid grid-cols-1 gap-12">
                {localData.portfolio.map((item, idx) => (
                  <div key={item.id} className="p-8 border border-ivory/10 bg-black relative group">
                    <button 
                      onClick={() => {
                        const newPortfolio = localData.portfolio.filter((_, i) => i !== idx);
                        setLocalData({...localData, portfolio: newPortfolio});
                      }}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-red-900 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-1 space-y-4">
                        <label className="text-ivory/40 text-[10px] uppercase tracking-widest">이미지 URL</label>
                        <input 
                          type="text" 
                          value={item.image}
                          onChange={e => {
                            const newPortfolio = [...localData.portfolio];
                            newPortfolio[idx].image = e.target.value;
                            setLocalData({...localData, portfolio: newPortfolio});
                          }}
                          className="w-full bg-black border border-ivory/10 p-4 text-ivory text-xs focus:border-ivory outline-none"
                        />
                        <div className="aspect-video w-full overflow-hidden border border-ivory/10">
                          <img src={item.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                      <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-ivory/40 text-[10px] uppercase tracking-widest">제목</label>
                            <input 
                              type="text" 
                              value={item.title}
                              onChange={e => {
                                const newPortfolio = [...localData.portfolio];
                                newPortfolio[idx].title = e.target.value;
                                setLocalData({...localData, portfolio: newPortfolio});
                              }}
                              className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-ivory/40 text-[10px] uppercase tracking-widest">카테고리</label>
                            <select 
                              value={item.category}
                              onChange={e => {
                                const newPortfolio = [...localData.portfolio];
                                newPortfolio[idx].category = e.target.value;
                                setLocalData({...localData, portfolio: newPortfolio});
                              }}
                              className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none"
                            >
                              <option value="호텔">호텔</option>
                              <option value="모텔">모텔</option>
                              <option value="상업시설">상업시설</option>
                              <option value="기타">기타</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-ivory/40 text-[10px] uppercase tracking-widest">설명</label>
                          <textarea 
                            rows={3}
                            value={item.description}
                            onChange={e => {
                              const newPortfolio = [...localData.portfolio];
                              newPortfolio[idx].description = e.target.value;
                              setLocalData({...localData, portfolio: newPortfolio});
                            }}
                            className="w-full bg-black border border-ivory/10 p-4 text-ivory focus:border-ivory outline-none resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/content');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg = errorData.message || errorData.error || res.statusText || 'Unknown error';
        throw new Error(`HTTP ${res.status}: ${msg}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      console.error('Failed to fetch content:', err);
      setError(err.message || '데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-2 border-ivory/20 border-t-ivory rounded-full mx-auto mb-6"
          />
          <span className="text-ivory/40 text-[10px] uppercase tracking-[0.4em]">Loading Experience</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-red-900/20 border border-red-900/40 rounded-full flex items-center justify-center mx-auto mb-8">
            <X size={32} className="text-red-500" />
          </div>
          <h2 className="text-ivory font-bold text-xl mb-4 tracking-tight">문제가 발생했습니다</h2>
          <p className="text-ivory/40 text-sm mb-10 leading-relaxed">{error || '데이터를 불러올 수 없습니다.'}</p>
          <button 
            onClick={fetchData}
            className="w-full py-4 bg-ivory text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
          >
            다시 시도하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-ivory font-sans selection:bg-ivory selection:text-black">
        <Navbar siteInfo={data.siteInfo} />
        
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home data={data} />} />
              <Route path="/about" element={<About data={data} />} />
              <Route path="/services" element={<Services data={data} />} />
              <Route path="/portfolio" element={<Portfolio data={data} />} />
              <Route path="/contact" element={<Contact data={data} />} />
              <Route path="/admin" element={<Admin data={data} onUpdate={setData} />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer data={data} />

        {/* Floating Action Button for Mobile Contact */}
        <div className="fixed bottom-6 right-6 z-40 md:hidden">
          <a 
            href={`tel:${data.siteInfo.contact.phone}`}
            className="w-14 h-14 bg-ivory text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Phone size={24} />
          </a>
        </div>
      </div>
    </Router>
  );
}

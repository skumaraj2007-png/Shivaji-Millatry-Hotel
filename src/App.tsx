/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Flame, 
  Award, 
  History, 
  Ticket, 
  ShoppingBag, 
  Quote, 
  Info, 
  MapPin, 
  Phone, 
  ArrowUpRight, 
  ChevronDown, 
  Menu, 
  X,
  Clock4,
  Car,
  Users,
  CalendarX,
  Drumstick,
  Sparkles
} from 'lucide-react';
import AIChat from './components/AIChat';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'The Legacy', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Experience', href: '#gallery' },
    { name: 'Tips', href: '#essentials' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-panel py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <Flame className="text-red-500 group-hover:scale-110 transition-transform duration-500" size={26} />
          <span className="text-xl md:text-2xl font-heritage font-extrabold tracking-widest text-white group-hover:text-red-400 transition-colors uppercase">
            Shivaji <span className="text-red-500">Military</span> Hotel
          </span>
        </a>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-stone-300 uppercase tracking-widest">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="hover:text-white transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#location" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-red-700 text-white px-7 py-3 rounded-full hover:bg-red-600 transition-all shadow-lg hover:shadow-red-500/30 border border-red-500">
            Visit Today
          </a>
        </div>

        <button 
          className="md:hidden text-white p-2 hover:text-red-500 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-stone-950 border-t border-white/5"
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-stone-300 text-lg font-bold uppercase tracking-widest hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#location" 
            className="w-full text-center bg-red-700 text-white px-7 py-4 rounded-full text-sm font-bold uppercase tracking-widest"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Visit Today
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 min-h-[100vh] flex items-center bg-stone-950 overflow-hidden">
      <div className="absolute inset-0 z-0 img-container hero-bg-slideshow">
        <img src="https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?q=80&w=2000&auto=format&fit=crop" alt="Cooking" referrerPolicy="no-referrer" onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop')} />
        <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop" alt="Spices" referrerPolicy="no-referrer" onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop')} />
        <img src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2000&auto=format&fit=crop" alt="Biryani" referrerPolicy="no-referrer" onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2000&auto=format&fit=crop')} />
        <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop" alt="Ambiance" referrerPolicy="no-referrer" onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop')} />
      </div>
      
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-stone-950 via-stone-950/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20 grid md:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-9 text-white"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800/80 backdrop-blur-md border border-stone-600 rounded-full text-stone-200 text-xs font-bold mb-8 tracking-widest uppercase shadow-xl">
            <Award className="text-orange-500" size={16} />
            <span>Bengaluru's Culinary Heritage Since 1924</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heritage font-extrabold mb-6 leading-[0.95] tracking-tighter text-white">
            LEGENDARY. <br /> RUSTIC. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">AUTHENTIC.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-300 max-w-xl mb-12 leading-relaxed font-light border-l-[3px] border-red-600 pl-6">
            Experience the 100-year legacy of Karnataka style non-vegetarian cuisine. Famous for our Seeraga Samba rice Mutton Donne Biryani, fiery chops, and hearty Paya soup.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#menu" className="w-full sm:w-auto px-8 py-4 bg-red-700 text-white text-sm font-bold rounded-full hover:bg-red-600 transition-all shadow-xl shadow-red-900/40 uppercase tracking-widest flex items-center justify-center gap-2 border border-red-500">
              Explore Menu
            </a>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white text-sm font-bold rounded-full hover:bg-white hover:text-stone-900 transition-all shadow-xl uppercase tracking-widest flex items-center justify-center gap-2 group">
              <Sparkles className="text-orange-400 group-hover:text-red-600 transition-colors" size={18} /> Ask The Guide
            </button>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 opacity-50 z-20 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-white relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-50 -z-10 rounded-bl-[100px]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-red-600 font-bold tracking-widest uppercase text-xs mb-3 block">Est. 1924</span>
            <h2 className="text-5xl md:text-6xl font-heritage text-stone-900 mb-8 leading-tight font-extrabold">
              A 100-Year Old <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-500 italic">Meat Lover's Mecca.</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              Shivaji Military Hotel is an emotion for true Bangaloreans. Originally feeding hardworking patrons with hearty, high-protein meals, it remains a bustling, no-frills destination where the focus is entirely on the uncompromising quality and rustic spices of Karnataka-style cooking.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-stone-200 pt-8">
              {[
                { icon: History, label: 'Family Owned' },
                { icon: Ticket, label: 'Token System' },
                { icon: Flame, label: 'Firewood Cooked' },
                { icon: ShoppingBag, label: 'Quick Takeaway' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-red-700 shadow-md border border-stone-100">
                    <item.icon size={20} />
                  </div>
                  <span className="text-stone-800 font-bold text-sm tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-full h-full border-[3px] border-red-800/20 rounded-2xl" />
            <div className="img-container rounded-2xl shadow-2xl relative z-10 overflow-hidden bg-stone-900">
              <img 
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop" 
                alt="Ambience" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop';
                }}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-[1.5s] grayscale-[10%] contrast-125"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-stone-900 p-6 rounded-xl shadow-2xl z-20 max-w-xs border border-stone-800 hidden md:block">
              <Quote className="text-red-500 mb-2 opacity-70" size={24} />
              <p className="font-heritage text-lg italic text-white leading-snug">"Don't expect fine dining. Expect the absolute best Biryani of your life."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const menuItems = [
    { 
      title: 'Mutton Donne Biryani', 
      price: '₹185', 
      desc: 'Tender mutton pieces cooked with Seeraga Samba rice, rich spices, and served hot in traditional leaf donnes.',
      tag: 'The Legend',
      img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1500&auto=format&fit=crop',
      span: 'md:col-span-2 md:row-span-2'
    },
    { 
      title: 'Leg Soup (Paya)', 
      price: '₹140', 
      tag: 'Breakfast Special',
      img: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-1'
    },
    { 
      title: 'Mutton Liver Fry', 
      price: '₹130', 
      tag: 'Rich & Peppery',
      img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-1'
    },
    { 
      title: 'Chicken Biryani', 
      price: '₹160', 
      tag: 'Classic Choice',
      img: 'https://images.unsplash.com/photo-1562565652-a8e87d312948?q=80&w=800&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-1'
    },
    { 
      title: 'Mutton Chops & Dry', 
      price: '₹160', 
      desc: 'Tender cuts of meat slow-cooked in a fiery dark masala.',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-2'
    },
    { 
      title: 'Kheema Fry', 
      price: '₹160', 
      desc: 'Minced meat cooked with authentic spices.',
      img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1500&auto=format&fit=crop',
      span: 'md:col-span-2 md:row-span-1'
    },
    { 
      title: 'Dosa (2 pcs)', 
      price: '₹40', 
      tag: 'Best with Chops',
      img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-1'
    },
    { 
      title: 'Natty Chicken Biryani', 
      price: '₹185', 
      tag: 'Thursday Special',
      desc: 'Authentic country chicken biryani, available exclusively on Thursdays.',
      img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-1'
    }
  ];

  return (
    <section id="menu" className="py-32 px-6 bg-[#0a0a0a] text-stone-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-stone-800 pb-10">
          <div>
            <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4 block flex items-center gap-2">
              <span className="w-8 h-[2px] bg-orange-500 inline-block rounded-full" />The Menu
            </span>
            <h2 className="text-5xl md:text-7xl font-heritage text-white font-extrabold tracking-tight">Our Signatures</h2>
          </div>
          <p className="text-stone-400 max-w-md text-sm md:text-base font-light leading-relaxed">
            Prepared with short-grain Seeraga Samba rice and secret homemade spice blends passed down for generations. Strictly Non-Vegetarian.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
          {menuItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${item.span} group relative rounded-2xl overflow-hidden img-container shadow-2xl border border-stone-800 transition-all duration-500 hover:shadow-red-900/20 hover:border-red-900/30`}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                <div className="flex justify-between items-end w-full">
                  <div className="pr-4">
                    {item.tag && (
                      <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest inline-block rounded-sm mb-4 shadow-lg">
                        {item.tag}
                      </div>
                    )}
                    <h3 className={`${item.span.includes('row-span-2') ? 'text-3xl md:text-4xl' : 'text-xl'} font-heritage font-bold mb-3 text-white`}>
                      {item.title}
                    </h3>
                    {item.desc && <p className="text-stone-300 text-sm line-clamp-2 max-w-sm font-light">{item.desc}</p>}
                  </div>
                  <div className={`${item.span.includes('row-span-2') ? 'text-2xl md:text-3xl' : 'text-lg'} font-bold text-orange-400 shrink-0 mb-1 drop-shadow-md`}>
                    {item.price}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-wrap gap-4 justify-center md:justify-start text-xs font-bold uppercase tracking-widest text-stone-500">
          <span className="px-5 py-2.5 bg-stone-900 border border-stone-800 rounded-full text-stone-400 cursor-default shadow-md">
            <Info className="inline mr-2 text-orange-500" size={14} />Note: Prices are approximate & subject to minor changes.
          </span>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop', title: 'The Daily Rush', sub: 'Always Packed' },
    { src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop', title: 'Secret Masalas', sub: 'Hand-ground' },
    { src: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?q=80&w=1000&auto=format&fit=crop', title: 'Authentic Serving', sub: 'Leaf Donnes' },
    { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop', title: 'Fresh Ingredients', sub: 'Every Single Day' }
  ];

  return (
    <section id="gallery" className="py-32 bg-stone-50 overflow-hidden">
      <div className="mb-16 text-center px-6 max-w-2xl mx-auto">
        <span className="text-red-600 font-bold tracking-widest uppercase text-xs mb-3 block">Gallery</span>
        <h2 className="text-4xl md:text-5xl font-heritage font-extrabold text-stone-900">The Authentic Feel</h2>
        <p className="mt-4 text-stone-500 text-sm">A glimpse into the daily hustle, the rich spices, and the legendary cooking methods of Shivaji Military Hotel.</p>
      </div>
      
      <div className="flex overflow-x-auto no-scrollbar gap-6 px-6 md:px-12 pb-10">
        {images.map((img, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="min-w-[300px] md:min-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden relative group img-container shadow-xl"
          >
            <img 
              src={img.src} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              alt={img.title} 
              loading="lazy" 
              referrerPolicy="no-referrer" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-6 left-6 text-white font-heritage opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <span className="block font-bold text-2xl mb-1">{img.title}</span>
              <span className="text-xs text-stone-300 uppercase tracking-widest font-sans">{img.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Essentials = () => {
  const tips = [
    { icon: Clock4, title: 'Arrive Early', desc: 'We open at 8:30 AM. To avoid the massive lunch rush and ensure the mutton biryani isn\'t sold out, aim to arrive before 12:00 PM.' },
    { icon: Car, title: 'Parking is Tight', desc: 'Street parking in Jayanagar 8th block can be extremely difficult. We highly recommend using public transport or a two-wheeler.' },
    { icon: Users, title: 'The Vibe', desc: 'We are a traditional Military Hotel. Expect a rustic, fast-paced, and no-frills environment. You may have to share tables or wait in a token queue.' },
    { icon: CalendarX, title: 'Open Daily', desc: 'We are now open all 7 days of the week, from 8:30 AM to 3:30 PM. Join us any day for your biryani fix!' }
  ];

  return (
    <section id="essentials" className="py-24 px-6 bg-white border-t border-stone-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-red-600 font-bold tracking-widest uppercase text-xs mb-2 block">Guidelines</span>
          <h2 className="text-4xl md:text-5xl font-heritage font-extrabold text-stone-900 mb-4">Before You Visit</h2>
          <p className="text-stone-500 font-medium">Tips to make your Shivaji Military Hotel experience smooth.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {tips.map((tip, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-stone-50 p-8 rounded-3xl border border-stone-200 flex gap-6 items-start shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-white text-red-600 p-4 rounded-2xl shrink-0 shadow-sm border border-stone-100">
                <tip.icon size={28} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-xl mb-2 font-heritage">{tip.title}</h4>
                <p className="text-sm text-stone-600 leading-relaxed font-medium">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 bg-red-50/80 border border-red-200 rounded-2xl p-6 flex items-center justify-center gap-4 text-red-800 text-sm font-bold shadow-sm">
          <Drumstick size={24} />
          <span>Strictly Non-Vegetarian Speciality. We focus entirely on high-quality meat dishes.</span>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="location" className="bg-[#0a0a0a] text-stone-300 pt-24 pb-10 px-6 border-t-[4px] border-red-700">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 mb-20 border-b border-stone-800/50 pb-16">
        <div>
          <h3 className="text-white font-heritage font-bold text-3xl mb-8">Visit Us</h3>
          <address className="not-italic space-y-6 text-stone-400 font-light">
            <p className="flex items-start gap-4">
              <MapPin className="mt-1 shrink-0 text-red-500" size={20} />
              <span className="leading-relaxed">No. 718, 1st C Main, 45th Cross,<br />8th Block, Jayanagar,<br />Bengaluru, Karnataka 560070</span>
            </p>
            <p className="text-sm text-orange-400 font-medium pl-9">Landmark: Near Banashankari Bus Stop</p>
          </address>
          <div className="mt-10">
            <a href="https://maps.google.com/?q=Shivaji+Military+Hotel+Jayanagar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white bg-red-700 px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-900/50 border border-red-500">
              Get Directions <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-heritage font-bold text-3xl mb-8">Contact</h3>
          <div className="space-y-6 text-lg font-light">
            <p className="flex items-center gap-4 border-b border-stone-800/50 pb-4">
              <Phone className="text-stone-500" size={20} />
              <a href="tel:+919845149217" className="hover:text-white transition-colors tracking-wide">+91 98451 49217</a>
            </p>
            <p className="flex items-center gap-4 border-b border-stone-800/50 pb-4">
              <Phone className="text-stone-500" size={20} />
              <a href="tel:+918553184946" className="hover:text-white transition-colors tracking-wide">+91 85531 84946</a>
            </p>
            <p className="flex items-center gap-4 text-sm text-stone-500 mt-4">
              <Info size={16} />
              <span>Also available on Swiggy & Zomato</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-white font-heritage font-bold text-3xl mb-8">Operating Hours</h3>
          <div className="bg-stone-900/50 p-8 rounded-2xl border border-stone-800 shadow-xl backdrop-blur-sm">
            <div className="flex justify-between items-center mb-5 border-b border-stone-800 pb-5">
              <span className="font-bold text-white text-lg">Mon - Sun</span>
              <span className="text-orange-400 tracking-wide font-bold">8:30 AM – 3:30 PM</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-stone-200 text-lg">Open Daily</span>
              <span className="bg-green-900/30 border border-green-800 text-green-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">Available</span>
            </div>
            <p className="text-xs text-stone-500 mb-6 font-light">*Closing time depends on stock. Arrive early!</p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1.5 bg-black/50 border border-stone-700 text-stone-300 text-[10px] uppercase tracking-widest rounded font-bold">Breakfast</span>
              <span className="px-3 py-1.5 bg-black/50 border border-stone-700 text-stone-300 text-[10px] uppercase tracking-widest rounded font-bold">Lunch</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-stone-500 font-bold uppercase tracking-widest">
        <p>© 2024 Shivaji Military Hotel. A Bangalore Legacy.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Food Lovers TV</a>
          <a href="#" className="hover:text-white transition-colors">Zomato</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="selection:bg-red-900 selection:text-white overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <MenuSection />
      <Gallery />
      <Essentials />
      <Footer />
      <AIChat />
    </div>
  );
}

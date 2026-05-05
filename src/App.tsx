import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Instagram, 
  Linkedin, 
  Phone,
  ArrowRight,
  ChevronDown,
  X,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { translations, Language } from './constants';
import { cn } from './lib/utils';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
  }, [lang]);

  const handleWhatsApp = (planName?: string) => {
    const text = planName 
      ? `Hello, I'm interested in the ${planName} plan.`
      : "Hello, I'd like to discuss an AI system integration.";
    window.open(`https://wa.me/905546700650?text=${encodeURIComponent(text)}`, '_blank');
  };

  const SocialCard = ({ icon: Icon, name, href, colorClass, hoverBg, brandColor }: { icon: any, name: string, href: string, colorClass?: string, hoverBg: string, brandColor: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group flex flex-col items-center"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute -top-12 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white z-50 pointer-events-none whitespace-nowrap"
            >
              {name}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ 
            scale: 1.15, 
            rotate: [0, -5, 5, 0],
            boxShadow: `0 0 40px ${brandColor}`
          }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500",
            "bg-white/[0.03] border border-white/5 backdrop-blur-sm",
            "hover:border-white/30",
            hoverBg
          )}
        >
          <Icon className={cn("w-7 h-7 transition-all duration-500", colorClass)} />
        </motion.a>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white/90 selection:bg-primary/30 antialiased font-sans overflow-x-hidden" dir={t.dir}>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Cpu className="text-black w-4 h-4" />
          </div>
          <span className="text-sm font-black uppercase tracking-tighter">AuraFlow</span>
        </div>
        
        <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10 pointer-events-auto backdrop-blur-md">
          {(['en', 'ar', 'tr'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all",
                lang === l ? "bg-primary text-black" : "text-white/40 hover:text-white"
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-square md:aspect-[21/9] rounded-[2rem] lg:rounded-[3rem] overflow-hidden mb-12 border border-white/5 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600" 
              alt="Cyber Business"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
              {t.hero.headline}
            </h1>
            <p className="text-lg text-white/40 font-medium max-w-xl mx-auto leading-relaxed mb-10">
              {t.hero.description}
            </p>
            <a 
              href="#services"
              className="inline-flex items-center gap-3 bg-primary text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.hero.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/10" />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 bg-neutral-900 shadow-2xl">
                <img 
                  src="https://github.com/omarforjob10-web/auraflow-systemss/blob/main/my-photo.png.jpeg?raw=true" 
                  alt={t.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 bg-black"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "my-photo.png.jpeg";
                  }}
                />
              </div>
            </div>
            
            <div className="text-left">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-4">{t.about.title}</h2>
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">{t.name}</h3>
              <p className="text-lg text-white/40 leading-relaxed font-medium mb-8">
                 {t.about.description}
              </p>
              <div className="flex gap-4">
                 <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] font-black uppercase tracking-widest">{t.role}</div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{t.services.title}</h2>
            <p className="text-white/30 font-bold uppercase tracking-widest text-[10px]">{t.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.services.plans.map((plan, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:border-primary/30 transition-all flex flex-col items-center text-center">
                <h3 className="text-lg font-black uppercase mb-2">{plan.name}</h3>
                <div className="text-3xl font-black text-white mb-6">{plan.price}</div>
                <p className="text-sm text-white/40 font-medium mb-8 flex-grow">
                  {plan.description}
                </p>
                <button 
                  onClick={() => handleWhatsApp(plan.name)}
                  className={cn(
                    "w-full py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all",
                    i === 1 ? "bg-primary text-black" : "bg-white/5 text-white hover:bg-primary hover:text-black"
                  )}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">{t.contact.title}</h2>
            <p className="text-white/20 font-bold uppercase tracking-[0.4em] text-[10px]">Digital Footprint</p>
          </div>
            
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-4">
            <SocialCard 
              icon={Instagram} 
              name="Instagram" 
              href="https://instagram.com/omeralhamd" 
              brandColor="rgba(220,39,67,0.4)"
              colorClass="text-white/40 group-hover:text-white" 
              hoverBg="hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]"
            />
            <SocialCard 
              icon={Linkedin} 
              name="LinkedIn" 
              href="https://linkedin.com/in/omar-alhamad-2aa47638b" 
              brandColor="rgba(10,102,194,0.4)"
              colorClass="text-white/40 group-hover:text-white" 
              hoverBg="hover:bg-[#0A66C2]"
            />
            <SocialCard 
              icon={MessageCircle} 
              name="WhatsApp" 
              href={`https://wa.me/905546700650`} 
              brandColor="rgba(37,211,102,0.4)"
              colorClass="text-white/40 group-hover:text-white" 
              hoverBg="hover:bg-[#25D366]"
            />
            <SocialCard 
              icon={X} 
              name="X (Twitter)" 
              href="https://twitter.com" 
              brandColor="rgba(255,255,255,0.2)"
              colorClass="text-white/40 group-hover:text-black" 
              hoverBg="hover:bg-white"
            />
          </div>

          <div className="mt-20 text-center">
             <motion.a 
                href={`tel:${t.contact.phone}`}
                className="inline-flex items-center gap-3 text-white/30 hover:text-primary transition-all font-black uppercase text-[10px] tracking-[0.5em]"
                whileHover={{ x: 5 }}
             >
                <Phone className="w-3 h-3" />
                {t.contact.phone}
             </motion.a>
          </div>
        </section>

        <footer className="py-12 text-center">
          <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">
            © 2026 AuraFlow Systems • Omar Alhamad
          </p>
        </footer>
      </main>
    </div>
  );
}

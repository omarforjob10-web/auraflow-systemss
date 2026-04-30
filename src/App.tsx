import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Instagram, 
  Linkedin, 
  Phone,
  ArrowRight,
  ChevronDown
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
                  src="/regenerated_image_1777583248058.png" 
                  alt={t.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 bg-black"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";
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
        <section id="contact" className="py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{t.contact.title}</h2>
          </div>
            
          <div className="flex flex-col items-center gap-10">
            <button 
              onClick={() => handleWhatsApp()}
              className="flex items-center gap-4 group bg-white/5 px-8 py-6 rounded-[2rem] border border-white/10 hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 bg-primary text-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-0.5">{t.contact.whatsapp}</p>
                <p className="text-lg font-bold">{t.contact.phone}</p>
              </div>
            </button>

            <div className="flex justify-center gap-4">
              <a href="https://instagram.com/omeralhamd" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/30 hover:text-primary hover:bg-white/10 transition-all border border-white/5">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/omar-alhamad-2aa47638b" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/30 hover:text-primary hover:bg-white/10 transition-all border border-white/5">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
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

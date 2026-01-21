
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  MessageSquare, 
  Calendar, 
  Bot, 
  Zap, 
  Users, 
  Database, 
  BarChart3, 
  ChevronRight, 
  CheckCircle2, 
  ArrowUpRight, 
  Globe, 
  Menu, 
  X,
  Smartphone,
  Check,
  Send,
  Clock,
  ShieldCheck,
  LayoutGrid,
  Mail,
  RefreshCw,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

// --- Translations ---
const translations = {
  ar: {
    dir: 'rtl',
    nav: ['ماذا نقدم', 'احجز مكالمة'],
    heroTitle: 'حوّل عملك إلى نظام ذكي يعمل بدلاً عنك',
    heroSub: 'نصمم حلول أتمتة وذكاء اصطناعي تساعدك على تنظيم عملك، توفير الوقت، وتحويل الفوضى إلى نظام قابل للنمو.',
    primaryCTA: 'احجز مكالمة مجانية (15 دقيقة)',
    secondaryCTA: 'محادثة عاجلة على واتساب',
    servicesTitle: 'ماذا نقدم',
    services: [
      { title: 'أتمتة الردود والرسائل', desc: 'استجابة فورية لعملائك على مدار الساعة.' },
      { title: 'تنظيم الحجوزات والمواعيد', desc: 'نظام آلي يضمن عدم تضارب المواعيد.' },
      { title: 'إدارة العملاء المحتملين (Leads)', desc: 'تتبع كل فرصة بيع من البداية للنهاية.' },
      { title: 'ربط الأدوات الرقمية', desc: 'دمج واتساب، إيميل، وجوجل في نظام واحد.' },
      { title: 'تقارير ذكية لمتابعة الأداء', desc: 'بيانات واضحة لاتخاذ قرارات أفضل.' },
      { title: 'حلول مخصصة حسب طبيعة عملك', desc: 'نظام مصمم خصيصاً لخدمة أهدافك.' }
    ],
    problemsTitle: 'المشاكل التي نحلها',
    problems: [
      'لا يوجد لديك عملاء ثابتين',
      'تضيع وقتك في أعمال متكررة',
      'لا تعرف أين يذهب العملاء المحتملون',
      'صعوبة المتابعة والتنظيم',
      'تريد زيادة الدخل لكن بدون ضغط إضافي',
      'العمل يعتمد عليك بشكل كامل'
    ],
    calendlyTitle: 'استشارة استكشافية مجانية (15 دقيقة)',
    calendlySub: 'هذه مكالمة قصيرة لفهم طبيعة عملك والتحديات الحالية، وتحديد ما إذا كانت الأتمتة مناسبة لك، بدون أي التزام.',
    footer: '© ٢٠٢٤ AuraFlow Systems. وكالة أتمتة ذكاء اصطناعي.'
  },
  en: {
    dir: 'ltr',
    nav: ['Services', 'Book Now'],
    heroTitle: 'Turn your business into a smart system that works for you',
    heroSub: 'We design AI automation solutions that help you organize your work, save time, and transform chaos into a scalable system.',
    primaryCTA: 'Book a Free Call (15 min)',
    secondaryCTA: 'Urgent WhatsApp Chat',
    servicesTitle: 'What We Provide',
    services: [
      { title: 'Message & Reply Automation', desc: 'Instant response to your customers 24/7.' },
      { title: 'Booking Management', desc: 'Automated system to prevent scheduling conflicts.' },
      { title: 'Lead Management', desc: 'Track every sales opportunity from start to finish.' },
      { title: 'Tool Integration', desc: 'Integrate WhatsApp, Email, and Google into one system.' },
      { title: 'Smart Performance Reports', desc: 'Clear data for better decision making.' },
      { title: 'Custom Solutions', desc: 'A system designed specifically for your goals.' }
    ],
    problemsTitle: 'Problems We Solve',
    problems: [
      'Lack of consistent clients',
      'Wasted time on repetitive tasks',
      'Unknown lead drop-off points',
      'Difficulty in follow-up and organization',
      'Wanting more income without extra pressure',
      'Business relies entirely on you'
    ],
    calendlyTitle: 'Free Discovery Call (15 min)',
    calendlySub: 'This is a short call to understand your business and challenges, determining if automation fits your needs. No obligation.',
    footer: '© 2024 AuraFlow Systems. AI Automation Agency.'
  },
  tr: {
    dir: 'ltr',
    nav: ['Hizmetler', 'Randevu Al'],
    heroTitle: 'İşletmenizi sizin yerinize çalışan akıllı bir sisteme dönüştürün',
    heroSub: 'İşinizi organize etmenize, zaman kazanmanıza ve karmaşayı ölçeklenebilir bir sisteme dönüştürmenize yardımcı olan AI otomasyon çözümleri tasارلىyoruz.',
    primaryCTA: 'Ücretsiz Randevu Al (15 dk)',
    secondaryCTA: 'Acil WhatsApp Hattı',
    servicesTitle: 'Neler Sunuyoruz',
    services: [
      { title: 'Mesaj ve Yanıt Otomasyonu', desc: 'Müşterilerinize 7/24 anında yanıt verin.' },
      { title: 'Randevu Yönetimi', desc: 'Çakışmaları önleyen otomatik sistem.' },
      { title: 'Potansiyel Müşteri Yönetimi', desc: 'Satış fırsatlarını baştan sona takip edin.' },
      { title: 'Araç Entegrasyonu', desc: 'WhatsApp, E-posta ve Google\'ı tek bir sistemده birleştirin.' },
      { title: 'Akıllı Performans Raporları', desc: 'Daha iyi kararlar için net veriler.' },
      { title: 'Özel Çözümler', desc: 'Hedeflerinize özel tasarlanmış sistemler.' }
    ],
    problemsTitle: 'Çözdüğümüz Sorunلار',
    problems: [
      'Düzenli müşteri eksikliği',
      'Tekrارlayan görevlerde zaman kaybı',
      'Potansiyel müşterilerin nerede kaybolduğunu bilmemek',
      'Takip ve organizasyon zorluğu',
      'Ek baskı olmadan geliri artırma isteği',
      'İşin tamamen size bağlı olması'
    ],
    calendlyTitle: 'Ücretsiz Keşif Görüşmesi (15 dk)',
    calendlySub: 'İşinizi ve zorlukلارınızı anlamak için kısa bir görüşme. Otomasyonun size uygun olup olmadığını belirleriz. Taahhüt yok.',
    footer: '© 2024 AuraFlow Systems. AI Otomasyon Ajansı.'
  }
};

type LangCode = 'ar' | 'en' | 'tr';

/**
 * Recreated Icon from user's image
 */
const AuraFlowIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="auraGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
        <stop offset="50%" stopColor="#0891b2" /> {/* Teal */}
        <stop offset="100%" stopColor="#8b5cf6" /> {/* Purple */}
      </linearGradient>
    </defs>
    
    {/* Top circle and stem */}
    <circle cx="50" cy="15" r="7" fill="url(#auraGradient)" />
    <path d="M50 22V35" stroke="url(#auraGradient)" strokeWidth="4" strokeLinecap="round" />
    
    {/* Body Workflow Shape */}
    <path 
      d="M38 35H62C67 35 70 38 70 43V52C70 57 67 60 62 60H52L50 67L48 60H38C33 60 30 57 30 52V43C30 38 33 35 38 35Z" 
      stroke="url(#auraGradient)" 
      strokeWidth="4" 
      strokeLinejoin="round" 
    />
    
    {/* Side Nodes */}
    <circle cx="28" cy="47" r="4.5" fill="white" stroke="url(#auraGradient)" strokeWidth="3" />
    <circle cx="72" cy="47" r="4.5" fill="white" stroke="url(#auraGradient)" strokeWidth="3" />
    
    {/* Infinity Symbol at bottom */}
    <path 
      d="M38 85C38 85 30 85 30 77.5C30 70 50 85 50 77.5C50 70 70 85 70 77.5C70 70 62 70 62 70" 
      stroke="#8b5cf6" 
      strokeWidth="5" 
      strokeLinecap="round"
      opacity="0.9"
    />
    <path 
      d="M38 85C38 92.5 45 92.5 50 85C55 77.5 62 77.5 62 70" 
      stroke="#8b5cf6" 
      strokeWidth="5" 
      strokeLinecap="round"
    />
  </svg>
);

const AuraFlowLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 px-2 py-1 group ${className}`}>
    <div className="relative h-10 sm:h-12 w-10 sm:w-12 flex-shrink-0 flex items-center justify-center transition-all duration-300">
      <AuraFlowIcon className="relative h-full w-full drop-shadow-md group-hover:scale-105 transition-transform" />
    </div>
    <div className="flex flex-col justify-center border-l border-white/10 pl-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
      <span className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
        Auraflow
      </span>
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-black text-slate-500 leading-none mt-1">
        SYSTEMS
      </span>
    </div>
  </div>
);

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const LanguageSwitcher = ({ current, set }: { current: LangCode, set: (l: LangCode) => void }) => (
  <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
    {(['ar', 'en', 'tr'] as LangCode[]).map((l) => (
      <button
        key={l}
        onClick={() => set(l)}
        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${current === l ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
      >
        {l}
      </button>
    ))}
  </div>
);

const App = () => {
  const [lang, setLang] = useState<LangCode>('ar');
  const [scrolled, setScrolled] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(localStorage.getItem('aura_hero_image'));
  const [isGenerating, setIsGenerating] = useState(false);
  const t = translations[lang];
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Auto generate image if missing
    if (!heroImage) {
      generateHeroImage();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang]);

  const generateHeroImage = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "A premium, futuristic AI neural brain core, glowing with cyan and purple energy, connected by light-trails to floating glass UI panels like CRM and Analytics. Dark navy background, SaaS aesthetic, high resolution, professional technology agency style. No faces, no robots, just intelligent network energy.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          setHeroImage(imageUrl);
          localStorage.setItem('aura_hero_image', imageUrl);
          break;
        }
      }
    } catch (error) {
      console.error("Failed to generate hero image:", error);
      // Fallback
      setHeroImage("https://images.unsplash.com/photo-1675557009875-436f2976375d?auto=format&fit=crop&q=80&w=1200");
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToCalendly = () => {
    calendlyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navIds = ['services', 'booking'];

  return (
    <div className="bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans min-h-screen">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 py-2 shadow-2xl' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <AuraFlowLogo />
          
          <div className="hidden lg:flex items-center gap-8">
            {t.nav.map((item, i) => (
              <a 
                key={i} 
                href={`#${navIds[i]}`} 
                className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors"
                onClick={(e) => {
                  if (navIds[i] === 'booking') {
                    e.preventDefault();
                    scrollToCalendly();
                  }
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToCalendly}
              className="hidden sm:block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black rounded-full transition-all shadow-lg"
            >
              {lang === 'ar' ? 'احجز مكالمة' : 'Book Call'}
            </button>
            <LanguageSwitcher current={lang} set={setLang} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="hero" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[150px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Image Container on LEFT */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className={`relative ${t.dir === 'rtl' ? 'order-2 lg:order-1' : 'order-1'}`}
          >
            <div className="relative rounded-[40px] overflow-hidden border border-white/20 shadow-3xl group bg-slate-900/50 min-h-[400px] flex items-center justify-center">
              {heroImage ? (
                <img 
                  src={heroImage} 
                  alt="AI Neural Brain" 
                  className={`rounded-[30px] w-full aspect-square object-cover transition-opacity duration-1000 ${isGenerating ? 'opacity-30' : 'opacity-100'}`}
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-slate-600">
                  <RefreshCw className="w-12 h-12 animate-spin" />
                  <span className="text-xs font-bold uppercase tracking-widest">Generating AI Core...</span>
                </div>
              )}

              {/* Regenerate Action */}
              <button 
                onClick={generateHeroImage}
                disabled={isGenerating}
                className="absolute bottom-4 right-4 p-3 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl text-indigo-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <RefreshCw size={20} />}
              </button>

              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-8 left-8 p-3 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-20 hidden md:block"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-cyan-400" />
                  <div className="h-2 w-16 bg-white/20 rounded-full" />
                </div>
              </motion.div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
            </div>

            {/* AI Status Badge */}
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 p-4 bg-slate-900/90 border border-indigo-500/30 rounded-2xl shadow-2xl z-30"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                <div className="text-[11px] font-black text-white uppercase tracking-tighter">AI AGENT ACTIVE</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content on RIGHT */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`${t.dir === 'rtl' ? 'order-1 lg:order-2' : 'order-2'}`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-bold tracking-widest uppercase mb-6">
              <Bot size={14} className="animate-bounce" />
              AI Automation Agency
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToCalendly}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all flex items-center gap-3 active:scale-95"
              >
                <Calendar size={20} />
                {t.primaryCTA}
              </button>
              <button 
                onClick={() => window.open('https://wa.me/905546700650', '_blank')}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all flex items-center gap-3"
              >
                <MessageSquare size={20} className="text-[#25D366]" />
                {t.secondaryCTA}
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{t.servicesTitle}</h2>
            <div className="h-1.5 w-24 bg-indigo-600 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.map((service, idx) => (
              <GlassCard key={idx}>
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center mb-6 text-indigo-400 border border-indigo-600/20">
                  {idx === 0 && <MessageSquare size={24} />}
                  {idx === 1 && <Calendar size={24} />}
                  {idx === 2 && <Users size={24} />}
                  {idx === 3 && <Zap size={24} />}
                  {idx === 4 && <BarChart3 size={24} />}
                  {idx === 5 && <LayoutGrid size={24} />}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-24 bg-slate-900/40">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-white text-center mb-16">{t.problemsTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.problems.map((problem, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <X size={16} />
                </div>
                <span className="text-slate-300 font-medium">{problem}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section ref={calendlyRef} id="booking" className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">{t.calendlyTitle}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10">{t.calendlySub}</p>
            <button 
              onClick={() => window.open('https://wa.me/905546700650', '_blank')}
              className="px-8 py-4 bg-[#25D366] text-white font-black rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-green-500/10"
            >
              <MessageSquare fill="white" size={20} /> {lang === 'ar' ? 'تحدث معنا على واتساب' : 'Chat on WhatsApp'}
            </button>
          </div>
          <GlassCard className="max-w-5xl mx-auto h-[700px] p-0 overflow-hidden shadow-indigo-500/10 border-indigo-500/20">
            <iframe 
              src="https://calendly.com/omarforjob10/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1" 
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="Calendly Booking"
              className="bg-white"
            ></iframe>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-950 border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <AuraFlowLogo className="justify-center mb-10" />
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm text-slate-500 font-medium">{t.footer}</p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.open('https://wa.me/905546700650', '_blank')}
                className="p-4 bg-[#25D366] rounded-full text-white hover:scale-110 transition-all shadow-lg"
              >
                <MessageSquare fill="white" size={24} />
              </button>
              <a href="mailto:auraflow-systems@auraflow-systems.online" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white transition-all">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] p-4 bg-slate-950/90 backdrop-blur-xl border-t border-white/10 flex gap-3">
        <button 
           onClick={() => window.open('https://wa.me/905546700650', '_blank')}
           className="flex-1 py-4 bg-[#25D366] text-white font-black rounded-2xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-green-500/10"
        >
          <MessageSquare size={20} fill="white" /> WhatsApp
        </button>
        <button 
           onClick={scrollToCalendly}
           className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-500/10"
        >
          <Calendar size={20} /> {lang === 'ar' ? 'احجز مكالمة' : 'Book Call'}
        </button>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}


import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  MessageSquare, 
  Database, 
  BarChart3, 
  CheckCircle2, 
  Zap, 
  Mail, 
  RefreshCw, 
  ShieldCheck, 
  LayoutGrid,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

// --- Translations ---
const translations = {
  ar: {
    dir: 'rtl',
    nav: ['الأدوات المجانية', 'احصل على الحل'],
    heroTitle: 'بوابتك لأتمتة الأعمال الذكية مجاناً',
    heroSub: 'نحن لا نقدم وعوداً تسويقية. نحن نبني مستقبل الأتمتة. احصل على أدوات تقنية متقدمة لتنظيم عملك وتوفير وقتك عبر حلولنا البرمجية المتكاملة.',
    primaryCTA: 'ابدأ الحل المجاني',
    secondaryCTA: 'محادثة تقنية عاجلة',
    servicesTitle: 'ماذا نوفر لك',
    services: [
      { title: 'أتمتة ذكية للمراسلات', desc: 'أنظمة رد فورية متطورة تعمل على مدار الساعة لخدمة عملائك.' },
      { title: 'البنية التحتية الرقمية', desc: 'تنظيم شامل لبياناتك ومواعيدك في واجهة تقنية موحدة.' },
      { title: 'تحليل البيانات المتقدم', desc: 'تقارير دقيقة تعتمد على الأرقام لتوجيه نمو أعمالك بذكاء.' }
    ],
    formTitle: 'انضم إلى منصة الأتمتة المستقبلية',
    formLabelName: 'الاسم الكامل',
    formLabelEmail: 'البريد الإلكتروني',
    formLabelSource: 'كيف وجدت أدواتنا؟',
    formSubmit: 'تفعيل الحل المجاني',
    formSuccess: 'شكراً لثقتك! ستصلك أدواتنا المجانية عبر بريدك الإلكتروني قريباً.',
    formSpam: 'No spam. Just a useful free solution.',
    footer: '© 2024 Auraflow Systems. منصة أتمتة الأعمال الذكية.'
  },
  en: {
    dir: 'ltr',
    nav: ['Free Tools', 'Get Solution'],
    heroTitle: 'Your Gateway to Professional AI Automation',
    heroSub: 'Skip the marketing hype. We are building the foundation of automated business growth. Access high-end technical tools designed to save time and scale efficiently.',
    primaryCTA: 'Get Free Solution',
    secondaryCTA: 'Urgent Tech Chat',
    servicesTitle: 'Our Solutions',
    services: [
      { title: 'Smart Messaging', desc: 'High-performance instant response systems working 24/7.' },
      { title: 'Digital Infrastructure', desc: 'Comprehensive organization of leads and tasks in one interface.' },
      { title: 'Data Intelligence', desc: 'Technical reports showing exactly where your systems thrive.' }
    ],
    formTitle: 'Join the Future Automation Platform',
    formLabelName: 'Full Name',
    formLabelEmail: 'Email Address',
    formLabelSource: 'Where did you find us?',
    formSubmit: 'Activate Free Solution',
    formSuccess: 'Thank you! You will receive your automated solution via email shortly.',
    formSpam: 'No spam. Just a useful free solution.',
    footer: '© 2024 Auraflow Systems. Smart Business Automation Platform.'
  },
  tr: {
    dir: 'ltr',
    nav: ['Ücretsiz Araçlar', 'Çözümü Al'],
    heroTitle: 'Profesyonel Yapay Zeka Otomasyonu Kapınız',
    heroSub: 'Pazarlama vaatlerini bir kenara bırakın. Otomatik iş büyümesinin temelini atıyoruz. Zaman kazanmak için tasarlanmış üst düzey teknik araçlara erişin.',
    primaryCTA: 'Ücretsiz Çözümü Al',
    secondaryCTA: 'Acil Teknik Görüşme',
    servicesTitle: 'Çözümlerimiz',
    services: [
      { title: 'Akıllı Mesajlaşma', desc: '7/24 çalışan yüksek performanslı anında yanıt sistemleri.' },
      { title: 'Dijital Altyapı', desc: 'Potansiyel müşterilerin ve görevlerin tek bir arayüzde kapsamlı organizasyonu.' },
      { title: 'Veri Zekası', desc: 'Sistemlerinizin tam olarak nerede geliştiğini gösteren teknik raporlar.' }
    ],
    formTitle: 'Geleceğin Otomasyon Platformuna Katılın',
    formLabelName: 'Tam İsim',
    formLabelEmail: 'E-posta Adresi',
    formLabelSource: 'Bizi nereden buldunuz?',
    formSubmit: 'Ücretsiz Çözümü Etkinleştir',
    formSuccess: 'Teşekkürler! Otomatik çözümünüz yakında e-posta yoluyla size ulaşacaktır.',
    formSpam: 'No spam. Just a useful free solution.',
    footer: '© 2024 Auraflow Systems. Akıllı İş Otomasyon Platformu.'
  }
};

const WEBHOOK_URL = 'https://WEBHOOK_URL_HERE';

type LangCode = 'ar' | 'en' | 'tr';

const AuraFlowIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="auraGradientRed" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="50%" stopColor="#991b1b" />
        <stop offset="100%" stopColor="#450a0a" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="15" r="7" fill="url(#auraGradientRed)" />
    <path d="M50 22 V35" stroke="url(#auraGradientRed)" strokeWidth="4" strokeLinecap="round" />
    <path 
      d="M38 35 H62 C67 35 70 38 70 43 V52 C70 57 67 60 62 60 H52 L50 67 L48 60 H38 C33 60 30 57 30 52 V43 C30 38 33 35 38 35 Z" 
      stroke="url(#auraGradientRed)" 
      strokeWidth="4" 
      strokeLinejoin="round" 
    />
    <circle cx="28" cy="47" r="4.5" fill="black" stroke="url(#auraGradientRed)" strokeWidth="3" />
    <circle cx="72" cy="47" r="4.5" fill="black" stroke="url(#auraGradientRed)" strokeWidth="3" />
    <path 
      d="M38 85 C38 85 30 85 30 77.5 C30 70 50 85 50 77.5 C50 70 70 85 70 77.5 C70 70 62 70 62 70" 
      stroke="#ef4444" 
      strokeWidth="5" 
      strokeLinecap="round"
      opacity="0.9"
    />
    <path 
      d="M38 85 C38 92.5 45 92.5 50 85 C55 77.5 62 77.5 62 70" 
      stroke="#ef4444" 
      strokeWidth="5" 
      strokeLinecap="round"
    />
  </svg>
);

const AuraFlowLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 px-2 py-1 group ${className}`}>
    <div className="relative h-10 sm:h-12 w-10 sm:w-12 flex-shrink-0 flex items-center justify-center transition-all duration-300">
      <AuraFlowIcon className="relative h-full w-full drop-shadow-[0_0_15px_rgba(239,68,68,0.4)] group-hover:scale-105 transition-transform" />
    </div>
    <div className="flex flex-col justify-center border-l border-white/5 pl-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
      <span className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
        Auraflow
      </span>
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-black text-red-600/80 leading-none mt-1">
        SYSTEMS
      </span>
    </div>
  </div>
);

const LeadForm = ({ lang, t }: { lang: LangCode, t: any }) => {
  const [formData, setFormData] = useState({ name: '', email: '', source: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        source: formData.source
      };
      
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-12 bg-zinc-900 border border-red-500/20 rounded-[32px] backdrop-blur-xl">
        <CheckCircle2 size={64} className="text-red-500 mx-auto mb-6" />
        <h3 className="text-2xl font-black text-white mb-2">{t.formSuccess}</h3>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] rounded-full" />
      <h3 className="text-2xl md:text-3xl font-black text-white mb-8 text-center">{t.formTitle}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{t.formLabelName}</label>
          <input 
            required
            type="text"
            autoComplete="off"
            autoCapitalize="words"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-red-500/50 transition-all"
            placeholder="your name"
          />
        </div>
        
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{t.formLabelEmail}</label>
          <input 
            required
            type="email"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            spellCheck="false"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-red-500/50 transition-all"
            placeholder="example@gmail.com"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{t.formLabelSource}</label>
          <div className="relative">
            <select 
              required
              value={formData.source}
              onChange={e => setFormData({ ...formData, source: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500/50 appearance-none transition-all cursor-pointer"
            >
              <option value="" disabled className="bg-slate-900">Select an option</option>
              <option value="Instagram" className="bg-slate-900">Instagram</option>
              <option value="YouTube" className="bg-slate-900">YouTube</option>
              <option value="WhatsApp" className="bg-slate-900">WhatsApp</option>
              <option value="Other" className="bg-slate-900">Other</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
               <Zap size={14} />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 text-center">
          <button 
            disabled={status === 'submitting'}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-600/20 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
          >
            {status === 'submitting' ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} className="group-hover:animate-pulse" />}
            {t.formSubmit}
          </button>
          
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">
            No spam. Just a useful free solution.
          </p>
        </div>
      </form>
    </div>
  );
};

const LanguageSwitcher = ({ current, set }: { current: LangCode, set: (l: LangCode) => void }) => {
  return (
    <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
      {(['ar', 'en', 'tr'] as LangCode[]).map((l) => (
        <button
          key={l}
          onClick={() => set(l)}
          className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
            current === l 
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
              : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState<LangCode>('ar');
  const [scrolled, setScrolled] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(localStorage.getItem('aura_hero_image_red_v3'));
  const [isGenerating, setIsGenerating] = useState(false);
  const t = translations[lang];
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    if (!heroImage) generateHeroImage();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang]);

  const generateHeroImage = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "A premium, futuristic AI neural brain core in DEEP RED and DARK BLACK aesthetic. Glowing red energy trails, connected to floating minimal glass UI panels. High contrast, technical, SaaS aesthetic, clean minimal style. Dark environment with dramatic red lighting.";
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          setHeroImage(imageUrl);
          localStorage.setItem('aura_hero_image_red_v3', imageUrl);
          break;
        }
      }
    } catch (error) {
      setHeroImage("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200");
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-black text-slate-200 selection:bg-red-500/30 font-sans min-h-screen">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-2 shadow-2xl' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <AuraFlowLogo />
          <div className="hidden lg:flex items-center gap-10">
            {t.nav.map((item, i) => (
              <a key={i} href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-red-500 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={scrollToForm} className="hidden sm:block px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-red-600/20">
              {t.primaryCTA}
            </button>
            <LanguageSwitcher current={lang} set={setLang} />
          </div>
        </div>
      </nav>

      <header className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/5 blur-[150px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className={t.dir === 'rtl' ? 'order-2 lg:order-1' : 'order-1'}>
            <div className="relative rounded-[48px] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(239,68,68,0.15)] group bg-zinc-950 min-h-[400px] flex items-center justify-center">
              {heroImage ? (
                <img src={heroImage} alt="AI Core" className={`w-full aspect-square object-cover transition-all duration-1000 group-hover:scale-105 ${isGenerating ? 'opacity-30' : 'opacity-100'}`} />
              ) : (
                <RefreshCw className="animate-spin text-red-500" />
              )}
              <div className="absolute top-8 left-8 p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl hidden md:block">
                <div className="flex items-center gap-2"><BarChart3 size={14} className="text-red-500" /><div className="h-1 w-12 bg-white/10 rounded-full" /></div>
              </div>
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/80 backdrop-blur-md border border-red-500/20 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500 animate-pulse">Platform Ready</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className={t.dir === 'rtl' ? 'order-1 lg:order-2' : 'order-2'}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/5 border border-red-500/10 text-red-500 text-[10px] font-black tracking-widest uppercase mb-8">
              <ShieldCheck size={14} /> Professional Infrastructure
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
              {t.heroTitle.split(' ').map((word, i) => {
                const isSpecial = word.includes('أتمتة') || word.toLowerCase().includes('automation');
                return <span key={i} className={isSpecial ? 'text-red-600' : ''}>{word}{' '}</span>;
              })}
            </h1>
            <p className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed font-medium">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-5">
              <button onClick={scrollToForm} className="px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-2xl shadow-red-600/20 transition-all flex items-center gap-3 active:scale-95">
                {t.primaryCTA} <ArrowRight size={20} />
              </button>
              <button onClick={() => window.open('https://wa.me/905546700650', '_blank')} className="px-10 py-5 bg-white/[0.03] border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all">
                {t.secondaryCTA}
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <section className="py-32 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {t.services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.02] border border-white/5 p-10 rounded-[32px] hover:border-red-500/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-600/10 flex items-center justify-center mb-8 text-red-500 group-hover:scale-110 transition-transform">
                  {idx === 0 && <MessageSquare size={28} />}
                  {idx === 1 && <Database size={28} />}
                  {idx === 2 && <Zap size={28} />}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={formRef} className="py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/[0.02] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <LeadForm lang={lang} t={t} />
        </div>
      </section>

      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col items-center gap-12">
          <AuraFlowLogo />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">{t.footer}</p>
          <div className="flex gap-6">
            <button onClick={() => window.open('https://wa.me/905546700650', '_blank')} className="w-12 h-12 flex items-center justify-center bg-white/[0.03] rounded-full hover:bg-white/10 transition-all border border-white/10">
              <MessageSquare size={20} className="text-red-500" />
            </button>
            <a href="mailto:auraflow-systems@auraflow-systems.online" className="w-12 h-12 flex items-center justify-center bg-white/[0.03] rounded-full hover:bg-white/10 transition-all border border-white/10">
              <Mail size={20} className="text-red-500" />
            </a>
          </div>
        </div>
      </footer>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] p-4 bg-black/90 backdrop-blur-xl border-t border-white/10 flex gap-3">
        <button onClick={() => window.open('https://wa.me/905546700650', '_blank')} className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl text-sm">WhatsApp</button>
        <button onClick={scrollToForm} className="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl text-sm">{t.primaryCTA}</button>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

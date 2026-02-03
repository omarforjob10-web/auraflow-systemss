
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  CheckCircle2, 
  Zap, 
  RefreshCw, 
  AlertCircle,
  X,
  ShieldCheck,
  ArrowRight,
  Globe,
  Settings,
  Cpu,
  BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Configuration ---
const WEBHOOK_URL = 'https://diverse-kennedy-match-limited.trycloudflare.com/webhook-test/login';

// Colors based on the screenshot
const BRAND_RED = '#e11d48'; // Vibrant red from screenshot
const BURGUNDY = '#800020';

// --- Components ---

const LogoMark = () => (
  <div className="flex items-center gap-4">
    <div className="relative">
      <div className="w-10 h-10 bg-[#e11d48]/10 rounded-lg flex items-center justify-center border border-[#e11d48]/20">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#e11d48]">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-black text-white leading-none tracking-tight">Auraflow</span>
      <span className="text-[10px] font-black text-[#e11d48] uppercase tracking-[0.3em] mt-1">Systems</span>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children?: React.ReactNode }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0f0f0f] rounded-2xl shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#e11d48]" />
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all z-10"
            >
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const RegistrationForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: formData.name, email: formData.email };
    setStatus('loading');

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      setStatus('success');
      setTimeout(() => {
        onSuccess();
        setStatus('idle');
        setFormData({ name: '', email: '' });
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="p-10">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Get Free Solution</h3>
        <p className="text-white/40 text-sm">Join the professional infrastructure network.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-1">Full Name</label>
          <input 
            required
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#e11d48] transition-all text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-1">Email Address</label>
          <input 
            required
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#e11d48] transition-all text-sm"
          />
        </div>

        <button 
          disabled={status === 'loading' || status === 'success'}
          className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg ${
            status === 'success' ? 'bg-emerald-600 text-white' : 
            status === 'error' ? 'bg-rose-600 text-white' :
            'bg-[#e11d48] hover:bg-[#be123c] text-white shadow-[#e11d48]/20'
          } disabled:opacity-50 mt-4`}
        >
          {status === 'loading' ? <RefreshCw className="animate-spin" size={18} /> : null}
          {status === 'success' ? 'Solution Activated' : status === 'error' ? 'Error' : 'Get Solution Now'}
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#e11d48]/30 relative overflow-x-hidden">
      
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] mix-blend-overlay" 
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} 
      />

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 py-8">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <LogoMark />
          
          <div className="hidden lg:flex items-center gap-12">
            {['FREE TOOLS', 'GET SOLUTION'].map((item) => (
              <a key={item} href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-[#e11d48] hover:bg-[#be123c] text-white text-[11px] font-black uppercase tracking-[0.1em] rounded-full transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] active:scale-95"
            >
              Get Free Solution
            </button>

            {/* Language Switcher */}
            <div className="flex bg-white/5 border border-white/10 rounded-full p-1 h-10 items-center">
              {['AR', 'EN', 'TR'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 h-full rounded-full text-[10px] font-black transition-all ${lang === l ? 'bg-[#e11d48] text-white' : 'text-white/40 hover:text-white'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-10 pt-56 pb-32 relative z-10 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 w-full items-center">
          
          {/* Left: Circuit Image & Stats UI */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" 
                alt="Circuitry" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              
              {/* Floating UI Element from screenshot */}
              <div className="absolute top-10 left-10 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#e11d48]/20 flex items-center justify-center text-[#e11d48]">
                  <BarChart2 size={16} />
                </div>
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-[#e11d48]" />
                </div>
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#e11d48]/10 blur-[100px] rounded-full -z-10" />
          </motion.div>

          {/* Right: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#e11d48]/30 bg-[#e11d48]/5 text-[#e11d48] text-[10px] font-black uppercase tracking-[0.2em] mb-12">
              <ShieldCheck size={14} /> Professional Infrastructure
            </div>
            
            <h1 className="text-7xl md:text-[110px] font-black text-white leading-[0.85] tracking-tighter mb-10">
              Your <br />
              Gateway to <br />
              Professional <br />
              AI <br />
              <span className="text-[#e11d48]">Automation</span>
            </h1>

            <p className="text-white/40 text-lg max-w-md font-medium leading-relaxed mb-12">
              Building technical frameworks for the world's most sophisticated AI operations. 
              Seamless, efficient, and professional-grade.
            </p>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-4 text-white text-xl font-black uppercase tracking-widest hover:text-[#e11d48] transition-colors"
            >
              Start Your Journey <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </main>

      {/* Floating Elements */}
      <div className="fixed bottom-10 right-10 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] vertical-text">
        © 2024 AURFLOW SYSTEMS
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>

      {/* Registration Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RegistrationForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>

    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

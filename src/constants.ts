export type Language = 'en' | 'ar' | 'tr';

export const translations = {
  en: {
    dir: 'ltr',
    agencyName: 'AuraFlow Systems',
    name: 'Omar Alhamad',
    role: 'AI Systems Architect',
    hero: {
      headline: 'Stop Trading Time for Tasks – Scale Your Growth with AI',
      description: 'We build intelligent systems that work 24/7 so you don\'t have to. Engaged every lead, automate every booking, and cut operational costs with custom AI solutions.',
      cta: 'Start Free Trial',
    },
    about: {
      title: 'Your Partner in Growth',
      description: 'As a Mechatronics Engineer and AI Architect, I don\'t just build bots—I build revenue engines. I specialize in turning complex workflows into seamless, profit-driven automation systems.',
    },
    services: {
      title: 'Irresistible Offer – Try Before You Pay',
      subtitle: 'Limited Time: 35% OFF All Plans',
      exchangeRate: 45,
      contract: {
        title: 'Built on Trust: Formal Service Agreement',
        points: [
          'Crystal-clear formal contract before we start',
          'Iron-clad protection for your business rights',
          'Defined milestones and guaranteed delivery terms'
        ]
      },
      payment: {
        title: 'Simple & Secure Payment',
        points: [
          'Direct Bank Transfer (IBAN) for maximum security',
          'Pay only after project agreement is signed',
          'Full payment schedule provided upfront'
        ]
      },
      offer: {
        title: 'Risk-Free Trial Experience',
        discount: '35% OFF',
        features: [
          'Full 1–3 days free trial period',
          'Live interactive chatbot demo',
          'Lightning-fast setup within 24 hours',
          'Zero commitment – see value first',
          'Exclusive to serious business owners',
          'Limited spots available for quality control'
        ],
        cta: 'Start Free Trial'
      },
      plans: [
        {
          name: 'Starter Plan',
          priceUSD: 75,
          originalPrice: '$115',
          description: 'Never miss a customer again. Perfect for businesses starting their AI journey.',
          features: [
            '24/7 Website & WhatsApp Bot',
            'Smart FAQ automation',
            'Delivery in just 5–7 days'
          ],
          cta: 'Get Started Today',
        },
        {
          name: 'Growth Plan',
          priceUSD: 125,
          originalPrice: '$195',
          isPopular: true,
          description: 'The ultimate sales tool. Automatically books meetings and captures every lead.',
          features: [
            'Full Booking System Integration',
            'Lead Capture & Validation',
            'Instant Multi-Channel Alerts',
            'Delivery within 10 days'
          ],
          cta: 'Scale My Business',
        },
        {
          name: 'Pro Plan',
          priceUSD: 199,
          originalPrice: '$305',
          description: 'Enterprise-level power. A complete digital ecosystem to dominate your market.',
          features: [
            'Advanced CRM Connectivity',
            'Custom Tracking Dashboard',
            'Deep Workflow Automation',
            'Priority 24/7 Support'
          ],
          cta: 'Unlock Professional Power',
        },
        {
          name: 'Custom Plan',
          priceUSD: 0,
          isCustom: true,
          description: 'The sky is the limit. Bespoke AI engineered for your unique business logic.',
          features: [
            '1-on-1 Strategy Consultation',
            'Bespoke AI Logic & Workflows',
            'High-Level Systems Integration',
            'Scalable Infrastructure'
          ],
          cta: 'Claim Your Consultation',
        },
      ],
    },
    contact: {
      title: 'Get In Touch',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      phone: '+90 554 670 06 50',
    },
  },
  ar: {
    dir: 'rtl',
    agencyName: 'AuraFlow Systems',
    name: 'عمر الحمد',
    role: 'مهندس أنظمة الذكاء الاصطناعي',
    hero: {
      headline: 'توقف عن إضاعة وقتك – ضاعف نمو أعمالك بالذكاء الاصطناعي',
      description: 'نحن نبني أنظمة ذكية تعمل على مدار الساعة حتى لا تضطر أنت للعمل. حول كل عميل محتمل إلى مبيعات، وأتمت الحجوزات، ووفر التكاليف التشغيلية بحلول مبتكرة.',
      cta: 'ابدأ التجربة المجانية',
    },
    about: {
      title: 'شريكك في النجاح والنمو',
      description: 'كمهندس ميكاترونيكس وخبير في هندسة الذكاء الاصطناعي، لا أقوم ببقاء روبوتات فحسب، بل أبني محركات نمو لعملك. متخصص في تحويل العمليات المعقدة إلى أنظمة أتمتة سلسة ومربحة.',
    },
    services: {
      title: 'عرض لا يقاوم - جرب قبل الدفع',
      subtitle: 'لفترة محدودة: خصم 35% على جميع الخطط',
      exchangeRate: 45,
      contract: {
        title: 'ثقة متبادلة: عقد خدمة رسمي',
        points: [
          'عقد رسمي واضح تماماً قبل البدء',
          'حماية كاملة لحقوق عملك التجارية',
          'مراحل عمل محددة وشروط تسليم مضمونة'
        ]
      },
      payment: {
        title: 'دفع بسيط وآمن',
        points: [
          'تحويل بنكي مباشر (IBAN) لأقصى درجات الأمان',
          'الدفع فقط بعد توقيع اتفاقية المشروع',
          'جدول دفع كامل مقدم بوضوح'
        ]
      },
      offer: {
        title: 'تجربة مجانية بدون مخاطر',
        discount: 'خصم 35%',
        features: [
          'تجربة مجانية كاملة لمدة 1-3 أيام',
          'عرض تجريبي تفاعلي مباشر',
          'إعداد سريع جداً خلال 24 ساعة',
          'بدون التزام – شاهد القيمة أولاً',
          'حصري لأصحاب الأعمال الجادين',
          'مقاعد محدودة لضمان الجودة'
        ],
        cta: 'ابدأ التجربة المجانية'
      },
      plans: [
        {
          name: 'خطة البداية',
          priceUSD: 75,
          originalPrice: '$115',
          description: 'لا تفقد أي عميل مجدداً. مثالية للشركات التي تبدأ رحلتها مع الذكاء الاصطناعي.',
          features: [
            'روبوت للموقع وواتساب 24/7',
            'أتمتة ذكية للأسئلة الشائعة',
            'التسليم خلال 5-7 أيام فقط'
          ],
          cta: 'ابدأ اليوم',
        },
        {
          name: 'خطة النمو',
          priceUSD: 125,
          originalPrice: '$195',
          isPopular: true,
          description: 'أداة المبيعات المثالية. تقوم بحجز الاجتماعات وجلب العملاء تلقائياً.',
          features: [
            'تكامل كامل لنظام الحجز',
            'جمع وتصنيف العملاء المحتملين',
            'تنبيهات فورية على جميع القنوات',
            'التسليم خلال 10 أيام'
          ],
          cta: 'ضاعف نمو عملي',
        },
        {
          name: 'الخطة الاحترافية',
          priceUSD: 199,
          originalPrice: '$305',
          description: 'قوة المؤسسات الكبرى. نظام رقمي متكامل للسيطرة على سوقك.',
          features: [
            'ربط متقدم مع أنظمة CRM',
            'لوحة تحكم مخصصة للتتبع',
            'أتمتة عميقة لسير العمل',
            'دعم فني متميز 24/7'
          ],
          cta: 'احصل على القوة الاحترافية',
        },
        {
          name: 'خطة مخصصة',
          priceUSD: 0,
          isCustom: true,
          description: 'لا حدود للطموح. ذكاء اصطناعي مصمم خصيصاً لمنطق عملك الفريد.',
          features: [
            'استشارة استراتيجية 1-على-1',
            'منطق وأتمتة مخصصة بالكامل',
            'تكامل عميق مع الأنظمة القائمة',
            'بنية تحتية قابلة للتوسع'
          ],
          cta: 'احجز استشارتك الآن',
        },
      ],
    },
    contact: {
      title: 'تواصل معي',
      whatsapp: 'واتساب',
      instagram: 'انستقرام',
      linkedin: 'لينكد إن',
      phone: '+90 554 670 06 50',
    },
  },
  tr: {
    dir: 'ltr',
    agencyName: 'AuraFlow Systems',
    name: 'Omar Alhamad',
    role: 'AI Sistem Mimarı',
    hero: {
      headline: 'Zamanınızı Görevlere Değil, Büyümeye Ayırın',
      description: 'Siz uyurken bile çalışan 7/24 akıllı sistemler kuruyoruz. Her potansiyel müşteriyi yakalayın, randevuları otomatize edin ve işletme maliyetlerinizi düşürün.',
      cta: 'Ücretsiz Denemeyi Başlat',
    },
    about: {
      title: 'Büyüme Yolculuğunda Ortağınız',
      description: 'Mekatronik Mühendisi ve AI Mimarı olarak sadece bot yapmıyorum, işletmeniz için birer büyüme motoru inşa ediyorum. Karmaşık iş süreçlerini kâr odaklı otomasyonlara dönüştürüyorum.',
    },
    services: {
      title: 'Vazgeçilmez Teklif – Ödemeden Önce Deneyin',
      subtitle: 'Sınırlı Süre: Tüm Planlarda %35 İNDİRİM',
      exchangeRate: 45,
      contract: {
        title: 'Güvene Dayalı: Resmi Hizmet Sözleşmesi',
        points: [
          'Başlamadan önce her şeyin net olduğu resmi sözleşme',
          'İşletmenizin haklarını koruyan tam güvence',
          'Belirlenmiş teslimat süreleri ve iş kapsamı'
        ]
      },
      payment: {
        title: 'Kolay ve Güvenli Ödeme',
        points: [
          'En yüksek güvenlik için Doğrudan Banka Havalesi (IBAN)',
          'Sadece proje sözleşmesi imzalandıktan sonra ödeme',
          'Tüm ödeme planı en baştan şeffafça paylaşılır'
        ]
      },
      offer: {
        title: 'Risksiz Deneme Deneyimi',
        discount: '%35 İNDİRİM',
        features: [
          '1-3 gün tam ücretsiz deneme süresi',
          'Canlı interaktif sohbet robotu demosu',
          '24 saat içinde ışık hızında kurulum',
          'Taahhüt yok – önce değeri görün',
          'Ciddi işletme sahiplerine özel fırsat',
          'Kalite kontrolü için sınırlı kontenjan'
        ],
        cta: 'Ücretsiz Denemeyi Başlat'
      },
      plans: [
        {
          name: 'Başlangıç Paketi',
          priceUSD: 75,
          originalPrice: '$115',
          description: 'Bir daha asla müşteri kaçırmayın. AI yolculuğuna başlayan işletmeler için mükemmel adım.',
          features: [
            '24/7 Web Sitesi ve WhatsApp Botu',
            'Akıllı SSS otomasyonu',
            'Sadece 5-7 günde teslimat'
          ],
          cta: 'Bugün Başlayın',
        },
        {
          name: 'Gelişim Paketi',
          priceUSD: 125,
          originalPrice: '$195',
          isPopular: true,
          description: 'Nihai satış aracı. Randevuları otomatik alır ve her müşteriyi yakalar.',
          features: [
            'Tam Randevu Sistemi Entegrasyonu',
            'Potansiyel Müşteri Yakalama & Doğrulama',
            'Anlık Çok Kanallı Bildirimler',
            '10 günde hızlı teslimat'
          ],
          cta: 'İşimi Ölçeklendir',
        },
        {
          name: 'Pro Paketi',
          priceUSD: 199,
          originalPrice: '$305',
          description: 'Kurumsal düzeyde güç. Pazarda liderlik için tam dijital ekosistem.',
          features: [
            'Gelişmiş CRM Bağlantısı',
            'Özel Takip Paneli (Dashboard)',
            'Derin İş Akışı Otomasyonu',
            'Öncelikli 24/7 Destek'
          ],
          cta: 'Profesyonel Güce Geçin',
        },
        {
          name: 'Özel Paket',
          priceUSD: 0,
          isCustom: true,
          description: 'Sınır gökyüzü. İşletmenizin benzersiz mantığına göre üretilmiş AI.',
          features: [
            '1-on-1 Strateji Danışmanlığı',
            'Özel AI Mantığı ve İş Akışları',
            'Üst Seviye Sistem Entegrasyonu',
            'Ölçeklenebilir Altyapı'
          ],
          cta: 'Danışmanlık Randevusu Al',
        },
      ],
    },
    contact: {
      title: 'İletişim',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      phone: '+90 554 670 06 50',
    },
  },
};


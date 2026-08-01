import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Zap, ShieldCheck, Smartphone, Sparkles, Key, LayoutTemplate, 
  Map as MapIcon, CheckCircle2, FileSearch, ArrowRight,
  Lock, Shield, ChevronRight, ChevronDown, Check
} from 'lucide-react';
import { Route, Switch, Router as WouterRouter } from 'wouter';

/* ================= BACKGROUND EFFECTS ================= */
const StarField = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Space Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-background to-background" />
      
      {/* Nebulas */}
      <div className="nebula-bg bg-primary/20 w-[600px] h-[600px] top-[-10%] left-[-10%] opacity-30" />
      <div className="nebula-bg bg-secondary/20 w-[800px] h-[800px] bottom-[-20%] right-[-10%] opacity-20" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
      <div className="nebula-bg bg-accent/20 w-[500px] h-[500px] top-[40%] left-[60%] opacity-20" style={{ animationDuration: '25s' }} />

      {/* Stars - static base layer */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')] mix-blend-screen opacity-20" />
      
      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50],
            x: [0, Math.random() * 50 - 25],
            opacity: [null, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

/* ================= 3D TILT CARD ================= */
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for rotation
  const rotateX = useState(0)[0]; // We'll manage this manually with state for simplicity and performance
  const rotateY = useState(0)[0];
  
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    // Rotate max 15 degrees
    setRotation({
      x: -yPct * 25,
      y: xPct * 25
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative perspective-1000 preserve-3d ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none" style={{ opacity: isHovered ? 1 : 0, transform: 'translateZ(-1px)' }} />
      {children}
    </motion.div>
  );
};

const CTA_URL = "https://www.youtube.com/";

/* ================= STICKY CTA ================= */
const StickyCTA = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsVisible(latest > 400);
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-50"
        >
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden rounded-full p-[1px] block">
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-[spin_3s_linear_infinite]" />
            <div className="px-4 py-2 md:px-6 md:py-2.5 bg-background rounded-full group-hover:bg-background/80 transition-colors flex items-center gap-2 relative z-10 glass-panel">
              <span className="text-xs md:text-sm font-display font-bold text-primary text-glow">Check Eligibility</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ================= HERO SECTION ================= */
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden z-10">
      <motion.div style={{ y, opacity }} className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <span className="glass-card px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-2 text-white/80 border-white/10 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Modern
          </span>
          <span className="glass-card px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-2 text-white/80 border-white/10 uppercase">
            <Lock className="w-3.5 h-3.5 text-secondary" />
            Secure
          </span>
          <span className="glass-card px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-2 text-white/80 border-white/10 uppercase">
            <Smartphone className="w-3.5 h-3.5 text-accent" />
            Mobile Optimized
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-tight tracking-tight relative"
        >
          <span className="block text-white">Unlock Your Next</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-200 to-primary pb-2 text-glow">
            Reward Opportunity
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light"
        >
          Experience a premium digital journey. Fast, secure, and designed for you. Discover what's waiting behind the portal.
        </motion.p>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="relative group w-full sm:w-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
            <div className="relative px-8 py-4 bg-background rounded-full font-display font-bold text-lg text-white flex items-center justify-center gap-3 border border-white/10 group-hover:bg-background/50 transition-all">
              <span className="text-primary text-glow">Check Eligibility</span>
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span>256-bit Encrypted Process</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Foreground Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 md:left-20 w-32 h-32 rounded-full border border-white/5 bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-3xl hidden lg:block"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-40 right-10 md:right-32 w-24 h-24 rounded-full border border-primary/20 bg-gradient-to-bl from-primary/10 to-transparent backdrop-blur-3xl hidden lg:block"
      />
    </section>
  );
};

/* ================= FEATURES SECTION ================= */
const features = [
  { icon: Zap, title: "Fast Performance", desc: "Lightning quick load times ensure you never miss a beat.", color: "text-amber-400" },
  { icon: ShieldCheck, title: "Secure Browsing", desc: "Bank-level encryption protects your journey from start to finish.", color: "text-green-400" },
  { icon: Smartphone, title: "Responsive Design", desc: "A flawless experience whether you're on desktop, tablet, or mobile.", color: "text-blue-400" },
  { icon: LayoutTemplate, title: "Modern Interface", desc: "Clean, intuitive, and designed with premium aesthetics in mind.", color: "text-purple-400" },
  { icon: Key, title: "Simple Process", desc: "No complex forms or confusing steps. Just straightforward progression.", color: "text-pink-400" },
  { icon: MapIcon, title: "Easy Access", desc: "Available 24/7 with a seamless entry point anytime you need.", color: "text-teal-400" }
];

const FeaturesSection = () => {
  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Excellence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Every aspect of this portal is optimized to deliver a seamless, secure, and visually stunning experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
            >
              <TiltCard className="h-full">
                <div className="glass-card p-8 rounded-2xl h-full flex flex-col items-start gap-4 hover:box-glow transition-shadow duration-300 preserve-3d">
                  <div className={`p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 ${feat.color} translate-z-20`}>
                    <feat.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white translate-z-10">{feat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed translate-z-10">
                    {feat.desc}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= HOW IT WORKS ================= */
const steps = [
  { icon: MapIcon, title: "Begin Your Experience", desc: "Start by entering the secure portal environment." },
  { icon: FileSearch, title: "Check Eligibility", desc: "Provide basic information to verify your status." },
  { icon: CheckCircle2, title: "Review the Information", desc: "Carefully read all details and requirements." },
  { icon: ArrowRight, title: "Continue", desc: "Proceed to your designated destination." }
];

const HowItWorksSection = () => {
  return (
    <section className="py-32 relative z-10 bg-black/20 backdrop-blur-lg border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">The <span className="text-primary text-glow">Journey</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Four simple steps separate you from completion. Follow the path.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-transparent md:-translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`relative flex items-center md:justify-between flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Desktop Spacer */}
                <div className="hidden md:block md:w-5/12" />
                
                {/* Node */}
                <div className="absolute left-0 md:left-1/2 w-20 h-20 rounded-full glass-card border border-primary/30 flex items-center justify-center md:-translate-x-1/2 z-10 box-glow bg-background">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                {/* Content */}
                <div className="w-full md:w-5/12 pl-28 md:pl-0">
                  <TiltCard>
                    <div className="glass-card p-6 md:p-8 rounded-2xl preserve-3d text-left">
                      <div className="text-accent font-display text-sm font-bold mb-2 translate-z-10 tracking-widest uppercase">Step {idx + 1}</div>
                      <h3 className="text-2xl font-bold mb-3 translate-z-20 text-white">{step.title}</h3>
                      <p className="text-muted-foreground translate-z-10">{step.desc}</p>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================= BENEFITS TICKER ================= */
const BenefitsTicker = () => {
  const words = ["Smooth Navigation", "•", "Clean UX", "•", "Mobile Friendly", "•", "Fast Access", "•", "Secure Connection", "•", "Simple Layout", "•", "Clear Information", "•", "Easy Progress", "•"];
  
  return (
    <div className="py-12 border-y border-white/5 bg-primary/5 overflow-hidden flex whitespace-nowrap relative z-10">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 items-center"
      >
        {[...words, ...words].map((word, i) => (
          <span 
            key={i} 
            className={`font-display text-xl md:text-3xl font-black uppercase tracking-wider ${word === '•' ? 'text-accent' : 'text-white/20'}`}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ================= FAQ SECTION ================= */
const faqs = [
  { q: "Is my connection secure?", a: "Yes, we utilize industry-standard 256-bit encryption to ensure your browsing session and any data interaction remains entirely secure and private." },
  { q: "Do I need to download anything?", a: "No downloads are required. The entire experience happens within your modern web browser, optimized for both desktop and mobile platforms." },
  { q: "How long does the process take?", a: "The entire flow is designed to be completed in under two minutes, assuming all information is reviewed carefully." },
  { q: "What happens after I continue?", a: "You will be directed to our promotional partner's designated destination, where they will manage the final stages of your opportunity." }
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Common <span className="text-secondary text-glow">Inquiries</span></h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${openIdx === idx ? 'border-secondary/50 box-glow-blue' : 'border-white/5'}`}
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-display font-semibold text-lg pr-8">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIdx === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`w-6 h-6 ${openIdx === idx ? 'text-secondary' : 'text-muted-foreground'}`} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground">
                      <div className="h-px w-full bg-white/10 mb-4" />
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= TRUST & TIPS ================= */
const TrustSection = () => {
  return (
    <section className="py-24 relative z-10 border-y border-white/5 bg-gradient-to-b from-background to-black/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <Shield className="w-12 h-12 text-primary mb-6 relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Trust & Transparency</h3>
            <p className="text-muted-foreground mb-6 relative z-10">
              We believe in complete transparency. To ensure the best experience, we strongly encourage all users to read instructions carefully, understand all requirements, and review terms before proceeding.
            </p>
            <ul className="space-y-3 relative z-10">
              {['Read Carefully', 'Provide Accurate Info', 'Review Privacy Policy', 'Complete Every Step'].map((tip, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Check className="w-3 h-3" />
                  </div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden border-destructive/20 flex flex-col justify-center">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-destructive/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-bold uppercase tracking-wider mb-6 w-max border border-destructive/20 relative z-10">
              Important Notice
            </div>
            <p className="text-xl leading-relaxed text-white relative z-10 font-light italic">
              "This page introduces a promotional opportunity only. Reward availability and eligibility are determined solely by the promotional partner."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ================= FINAL CTA ================= */
const FinalCTASection = () => {
  const ctaButtons = [
    { label: "Check Eligibility", icon: ChevronRight, primary: true },
    { label: "Continue Securely", icon: Lock, primary: false },
    { label: "See If You Qualify", icon: ShieldCheck, primary: false },
    { label: "Explore Offer", icon: Sparkles, primary: false },
    { label: "Get Started", icon: ArrowRight, primary: false },
    { label: "View Promotion", icon: Key, primary: false },
  ];

  return (
    <section id="eligibility" className="py-24 md:py-40 relative z-10 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            Ready to Continue?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 md:mb-12 font-light px-2">
            You've reviewed the details. The next step is yours to take. Enter the secure portal and discover your opportunity.
          </p>

          <div className="flex flex-col gap-4 max-w-md mx-auto">
            {/* Primary CTA */}
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
              <div className="relative px-8 py-5 bg-background rounded-xl font-display font-bold text-xl text-white flex items-center justify-center gap-3 border border-white/10 group-hover:bg-background/80 transition-all">
                <span className="text-primary text-glow">Check Eligibility</span>
                <ChevronRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            
            {/* Secondary row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Continue Securely", icon: Lock },
                { label: "See If You Qualify", icon: ShieldCheck },
                { label: "Explore Offer", icon: Sparkles },
                { label: "Get Started", icon: ArrowRight },
              ].map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href={CTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 glass-card hover:bg-white/10 rounded-xl font-semibold transition-all flex justify-center items-center gap-2 text-sm border border-white/10 hover:border-primary/30 hover:text-primary group"
                >
                  <Icon className="w-4 h-4 text-secondary group-hover:text-primary transition-colors shrink-0" />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            {/* Tertiary buttons */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "View Promotion", icon: Key },
                { label: "Learn More", icon: ChevronRight },
              ].map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href={CTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 glass-card hover:bg-white/5 rounded-xl font-medium transition-all flex justify-center items-center gap-2 text-xs text-muted-foreground border border-white/5 hover:border-white/20 hover:text-white group"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-6 opacity-60">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <ShieldCheck className="w-4 h-4" /> Secure Portal
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden md:block" />
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <Lock className="w-4 h-4" /> 256-bit Encrypted
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden md:block" />
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <Zap className="w-4 h-4" /> 2-Min Process
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ================= FOOTER ================= */
const Footer = () => {
  const footerLinks = {
    "Quick Links": [
      { label: "Check Eligibility", href: CTA_URL },
      { label: "How It Works", href: CTA_URL },
      { label: "View Promotion", href: CTA_URL },
      { label: "See If You Qualify", href: CTA_URL },
    ],
    "Legal": [
      { label: "Terms of Service", href: CTA_URL },
      { label: "Privacy Policy", href: CTA_URL },
      { label: "Cookie Policy", href: CTA_URL },
      { label: "Disclaimer", href: CTA_URL },
    ],
    "Support": [
      { label: "Contact Us", href: CTA_URL },
      { label: "FAQ", href: CTA_URL },
      { label: "Eligibility Guide", href: CTA_URL },
      { label: "Help Center", href: CTA_URL },
    ],
  };

  const socialLinks = [
    {
      label: "YouTube",
      href: CTA_URL,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: CTA_URL,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      href: CTA_URL,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: CTA_URL,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative z-10 bg-black/60 backdrop-blur-xl border-t border-white/10">
      {/* Top CTA Bar */}
      <div className="border-b border-white/10 py-8 md:py-10">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg md:text-xl font-display font-bold text-white mb-1">
              Still haven't checked your eligibility?
            </p>
            <p className="text-sm text-muted-foreground">Join thousands of participants exploring their opportunity.</p>
          </div>
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group shrink-0 w-full md:w-auto"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-60 group-hover:opacity-90 transition duration-300" />
            <div className="relative px-8 py-3.5 bg-background rounded-full font-display font-bold text-primary flex items-center justify-center gap-2 border border-white/10 group-hover:bg-background/80 transition-all text-sm">
              Check Eligibility Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">RewardPortal</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              A premium promotional discovery portal. Fast, secure, and built to guide eligible participants to their next opportunity.
            </p>
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, text: "Secure" },
                { icon: Zap, text: "Fast" },
                { icon: Smartphone, text: "Mobile" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-white/10 text-xs text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-display font-bold text-white/80 uppercase tracking-widest mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Row */}
        <div className="mt-10 md:mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Follow us:</p>
            <div className="flex gap-2">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass-card border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs text-white/40">
            <span>© {new Date().getFullYear()} RewardPortal</span>
            <span className="hidden md:inline">·</span>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Terms</a>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Privacy</a>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 p-4 md:p-6 rounded-2xl glass-card border border-white/5">
          <p className="text-[11px] md:text-xs text-muted-foreground/70 leading-relaxed text-center">
            <strong className="text-white/40">Disclaimer:</strong> This website is an independent informational pre-landing page and is not affiliated with, endorsed by, or sponsored by Amazon.com, Inc. or any of its affiliates unless expressly stated by the promotional partner. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. Participation is subject to eligibility requirements, verification procedures, availability, and the official Terms and Conditions presented on the promotional page. Reward availability is determined solely by the promotional partner. Void where prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
};

/* ================= MAIN APP ================= */
function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary font-sans relative">
      <StarField />
      <StickyCTA />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BenefitsTicker />
        <TrustSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Switch>
        <Route path="/" component={LandingPage} />
        {/* We just serve the landing page on all routes for this single-page promo */}
        <Route component={LandingPage} />
      </Switch>
    </WouterRouter>
  );
}

export default App;

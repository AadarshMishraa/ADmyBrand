import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { ArrowRight, Play, Star, Users, TrendingUp, Shield, X, BarChart2, Sparkles, Zap } from 'lucide-react';

// Throttle utility for performance
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Enhanced Button Component using design system
const Button = ({ variant = 'primary', size = 'lg', className, children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5",
    ghost: "bg-surface/50 backdrop-blur-xl border border-border hover:bg-surface/80 text-foreground hover:border-primary/30",
  };
  
  const sizeClasses = { 
    lg: "h-12 px-8 text-base",
    xl: "h-14 px-10 text-lg"
  };
  
  const appliedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
  return <button className={appliedClasses} {...props}>{children}</button>;
};

// Animated Counter with enhanced styling
const AnimatedCounter = ({ value, isInt = true, suffix = '' }) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
      const roundedValue = isInt ? Math.round(latest) : latest.toFixed(1);
      return `${roundedValue}${suffix}`;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          const animation = animate(count, value, { duration: 2.5, ease: "circOut" });
          setHasAnimated(true);
          return () => animation.stop();
        }
      }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [count, value, hasAnimated, isInt]);

  return <motion.span ref={ref} className="font-display">{rounded}</motion.span>;
};

// Enhanced Magnetic Button with better styling
const MagneticButton = ({ children, ...props }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.15);
        y.set(middleY * 0.15);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className="relative"
        >
            <motion.div
                style={{ x, y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
                <Button {...props}>{children}</Button>
            </motion.div>
        </motion.div>
    );
};

// Enhanced Dynamic Background with better gradients
const DynamicAnimatedBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface" />
            
            {/* Animated Orbs */}
            <motion.div 
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
                animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
        </div>
    );
};

// Enhanced Hero Graphic with better glassmorphism
const HeroGraphic = () => {
    const constraintsRef = useRef(null);
    return (
        <motion.div ref={constraintsRef} className="relative w-full h-full flex items-center justify-center">
            {/* Main Dashboard */}
            <motion.div 
                className="relative w-[520px] h-[380px] bg-surface/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <motion.img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                    alt="Modern dashboard interface"
                    className="w-full h-full object-cover opacity-90"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
            </motion.div>

            {/* Floating Analytics Card */}
            <motion.div 
                drag 
                dragConstraints={constraintsRef} 
                className="absolute -bottom-8 -left-12 w-72 h-44 bg-surface/80 backdrop-blur-2xl rounded-2xl shadow-xl border border-border/50 p-6 cursor-grab active:cursor-grabbing"
                initial={{ opacity: 0, x: -50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileDrag={{ scale: 1.05 }}
            >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <BarChart2 className="w-4 h-4 text-primary" />
                    <span>Revenue Analytics</span>
                </div>
                <div className="space-y-2">
                    <div className="text-2xl font-bold text-foreground">$847K</div>
                    <div className="text-sm text-green-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +23.4% from last month
                    </div>
                </div>
                <div className="mt-4 h-16 flex items-end gap-1">
                    {[40, 65, 30, 80, 55, 90, 70].map((height, i) => (
                        <motion.div 
                            key={i}
                            className="flex-1 bg-primary/20 rounded-sm"
                            style={{ height: `${height}%` }}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Floating AI Insight Card */}
            <motion.div 
                drag 
                dragConstraints={constraintsRef} 
                className="absolute -top-6 -right-8 w-64 bg-surface/80 backdrop-blur-2xl rounded-2xl shadow-xl border border-border/50 p-5 cursor-grab active:cursor-grabbing"
                initial={{ opacity: 0, x: 50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileDrag={{ scale: 1.05 }}
            >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>AI Insight</span>
                </div>
                <p className="text-foreground font-semibold leading-relaxed">
                    Optimal time to launch campaign: 
                    <span className="text-primary"> Tuesday 2PM</span>
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                    Predicted +18% engagement
                </div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [-10, -30, -10],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </motion.div>
    );
};

// Enhanced Video Modal
const VideoModal = ({ videoId, onClose, layoutId }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-background/80 backdrop-blur-xl flex items-center justify-center z-50 p-4" 
    onClick={onClose}
  >
    <motion.div 
      layoutId={layoutId} 
      className="relative w-full max-w-5xl aspect-video bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden" 
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={onClose} 
        className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 z-10 hover:scale-110 transition-transform shadow-lg" 
        aria-label="Close video"
      >
        <X className="h-5 w-5" />
      </button>
      <iframe 
        className="w-full h-full" 
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      />
    </motion.div>
  </motion.div>
);

// Enhanced AI Badge
const AiBadge = () => (
    <motion.div 
        className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-surface/60 backdrop-blur-xl border border-primary/20 mb-8 shadow-lg group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
    >
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
            <Sparkles className="w-5 h-5 text-primary" />
        </motion.div>
        <span className="text-sm font-semibold text-foreground relative overflow-hidden">
            New: AI-Powered Analytics
            <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" 
            />
        </span>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
    </motion.div>
);

// Main Hero Component
const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const headline = "Transform Your Business with Smart SaaS".split(" ");
  
  const containerVariants = { 
    hidden: { opacity: 0 }, 
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    } 
  };
  
  const wordVariants = { 
    hidden: { y: 30, opacity: 0, rotateX: -20 }, 
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    } 
  };
  
  const stats = [
    { icon: Users, value: 50, label: 'Active Users', suffix: 'K+', tooltip: 'Growing community of innovators' },
    { icon: TrendingUp, value: 300, label: 'Growth', suffix: '%', tooltip: 'Year-over-year expansion' },
    { icon: Shield, value: 99.9, label: 'Uptime', suffix: '%', tooltip: 'Enterprise-grade reliability' },
    { icon: Star, value: 4.9, label: 'Rating', suffix: '/5', tooltip: 'Customer satisfaction score' }
  ];

  const partnerLogos = [
    { name: 'Quantum Inc', path: 'https://placehold.co/140x45/6366f1/ffffff?text=Quantum&font=montserrat' },
    { name: 'Stellar Corp', path: 'https://placehold.co/140x45/8b5cf6/ffffff?text=Stellar&font=montserrat' },
    { name: 'Apex Solutions', path: 'https://placehold.co/140x45/06b6d4/ffffff?text=Apex&font=montserrat' },
    { name: 'Nexus Dynamics', path: 'https://placehold.co/140x45/10b981/ffffff?text=Nexus&font=montserrat' },
  ];
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100, mass: 0.3 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleParallaxMouseMove = throttle((e) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
  }, 16);
  
  const contentX = useTransform(springX, (v) => v / 40);
  const contentY = useTransform(springY, (v) => v / 40);
  const graphicX = useTransform(springX, (v) => -v / 25);
  const graphicY = useTransform(springY, (v) => -v / 25);

  const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good morning.";
      if (hour < 18) return "Good afternoon.";
      return "Good evening.";
  };

  return (
    <>
      <section 
        id="home" 
        onMouseMove={handleParallaxMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden py-20 lg:py-32"
      >
        <DynamicAnimatedBackground />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Content Section */}
            <motion.div 
              style={{ x: contentX, y: contentY }} 
              className="lg:col-span-2 text-center lg:text-left"
            >
              <AiBadge />
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-muted-foreground mb-6 font-medium"
              >
                {getGreeting()}
              </motion.p>
              
              <motion.h1 
                variants={containerVariants} 
                initial="hidden" 
                animate="visible" 
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.9] mb-8 tracking-tight" 
                style={{ perspective: 1000 }}
              >
                {headline.map((word, i) => (
                  <motion.span 
                    key={i} 
                    variants={wordVariants} 
                    className="inline-block mr-4"
                  >
                    {word === "Smart" || word === "SaaS" ? 
                      <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                        {word}
                      </span> : word
                    }
                  </motion.span>
                ))}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Revolutionize your workflow with our cutting-edge platform. 
                Automate processes, gain insights, and scale effortlessly with AI-powered tools.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16"
              >
                <MagneticButton size="xl" variant="primary">
                  Start Free Trial 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                
                <motion.div layoutId="video-modal-button">
                    <MagneticButton size="xl" variant="ghost" onClick={() => setShowVideo(true)}>
                        <Play className="mr-2 h-5 w-5" /> 
                        Watch Demo
                    </MagneticButton>
                </motion.div>
              </motion.div>
              
              {/* Stats Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label} 
                    className="text-center lg:text-left group relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <stat.icon className="h-6 w-6 text-primary mr-3 group-hover:scale-110 transition-transform" />
                      <p className="text-3xl font-display font-bold text-foreground">
                        <AnimatedCounter 
                          value={stat.value} 
                          isInt={Number.isInteger(stat.value)} 
                          suffix={stat.suffix} 
                        />
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    
                    {/* Tooltip */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-max bg-surface backdrop-blur-xl text-foreground text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-border shadow-lg z-10">
                      {stat.tooltip}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-surface border-l border-t border-border rotate-45" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Graphic Section */}
            <motion.div 
              style={{ x: graphicX, y: graphicY }} 
              className="lg:col-span-3 relative h-[600px] hidden lg:block"
            >
                <HeroGraphic />
            </motion.div>
          </div>
          
          {/* Partners Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-32 text-center"
          >
            <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wider uppercase">
              Trusted by innovative teams worldwide
            </p>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              {partnerLogos.map((logo, i) => (
                <motion.img 
                  key={logo.name} 
                  src={logo.path} 
                  alt={logo.name} 
                  className="h-8 opacity-60 hover:opacity-100 transition-all duration-300 filter hover:filter-none" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 0.6, y: 0 }} 
                  transition={{ delay: 1.8 + i * 0.15, duration: 0.6 }} 
                  whileHover={{ scale: 1.1, opacity: 1 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <AnimatePresence>
        {showVideo && (
          <VideoModal 
            videoId="dQw4w9WgXcQ" 
            onClose={() => setShowVideo(false)} 
            layoutId="video-modal-button" 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
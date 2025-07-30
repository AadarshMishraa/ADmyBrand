import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Sparkles, 
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Premium Shine Button Component ---
const ShineButton = ({ variant = 'default' as const, size = 'lg' as const, className = '', children, ...props }) => {
    return (
        <Button 
            variant={variant} 
            size={size} 
            className={`relative overflow-hidden group ${className}`} 
            {...props}
        >
            {children}
            <span className="absolute inset-0 block h-full w-full -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
        </Button>
    );
};

// --- Premium Feature Card Component ---
const PremiumFeatureCard = ({ feature }: { feature: any }) => {
    const cardContentVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
    };

    const contentItemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="feature-card-premium group relative h-full"
        >
            <motion.div 
                variants={cardContentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col h-full"
            >
                <motion.div 
                    variants={contentItemVariants} 
                    className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-glass border-premium mb-8 transition-all duration-300 group-hover:shadow-glow"
                    style={{ backgroundColor: `${feature.color}15` }}
                >
                    <feature.icon className="h-7 w-7" style={{ color: feature.color }} />
                </motion.div>
                
                <motion.h3 variants={contentItemVariants} className="text-xl font-semibold mb-3 text-primary">
                    {feature.title}
                </motion.h3>
                
                <motion.p variants={contentItemVariants} className="text-muted-foreground font-light mb-6 flex-grow leading-relaxed">
                    {feature.description}
                </motion.p>
                
                <motion.ul variants={contentItemVariants} className="space-y-3 mb-8">
                    {feature.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.5 + idx * 0.1 }}
                            >
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                            </motion.div>
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                        </li>
                    ))}
                </motion.ul>
                
                <motion.div variants={contentItemVariants} className="mt-auto">
                    <a href="#" className="flex items-center text-sm font-semibold text-primary group/link w-fit hover:text-primary/80 transition-colors">
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </a>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

// --- Animated Background Blobs Component ---
const AnimatedBlobs = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
            animate={{
                x: ['-20%', '10%', '-20%'],
                y: ['-15%', '5%', '-15%'],
                rotate: [0, 15, 0],
            }}
            transition={{
                duration: 40,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
            }}
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
            style={{ 
                background: 'linear-gradient(135deg, hsl(var(--blue-500) / 0.08), hsl(var(--sage-500) / 0.06))'
            }}
        />
        <motion.div
            animate={{
                x: ['80%', '110%', '80%'],
                y: ['60%', '90%', '60%'],
                rotate: [0, -20, 0],
            }}
            transition={{
                duration: 50,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: 5
            }}
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
            style={{ 
                background: 'linear-gradient(135deg, hsl(var(--amber-500) / 0.06), hsl(var(--blue-500) / 0.04))'
            }}
        />
        <motion.div
            animate={{
                x: ['40%', '60%', '40%'],
                y: ['30%', '70%', '30%'],
                rotate: [0, 10, 0],
            }}
            transition={{
                duration: 35,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: 10
            }}
            className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ 
                background: 'linear-gradient(135deg, hsl(var(--sage-500) / 0.05), hsl(var(--blue-300) / 0.03))'
            }}
        />
    </div>
);

// --- Interactive CTA Component ---
const InteractiveCTA = () => {
    const ctaRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        if (!ctaRef.current) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    
    return (
        <motion.div
            ref={ctaRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-24"
        >
            <div className="glass-card group p-12 relative">
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, hsl(var(--blue-500) / 0.1), transparent 80%)`
                        ),
                    }}
                />
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border-accent mb-6"
                    >
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Get Started Today</span>
                    </motion.div>
                    
                    <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold mb-4 text-primary"
                    >
                        Ready to Transform Your Business?
                    </motion.h3>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted-foreground mb-8 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Join thousands of businesses already using our platform to streamline their operations and accelerate growth with cutting-edge technology.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <ShineButton size="lg" className="btn-premium">
                            <Zap className="mr-2 h-4 w-4" />
                            Start Free Trial
                        </ShineButton>
                        <Button size="lg" variant="outline" className="btn-ghost-premium">
                            <Users className="mr-2 h-4 w-4" />
                            Schedule Demo
                        </Button>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 text-xs text-muted-foreground"
                    >
                        No credit card required • 14-day free trial • Cancel anytime
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Floating Elements Component ---
const FloatingElements = () => (
    <>
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full floating-element"
                style={{
                    background: `hsl(214 84% ${56 + i * 5}% / 0.4)`,
                    left: `${10 + i * 15}%`,
                    top: `${20 + i * 10}%`,
                }}
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                }}
            />
        ))}
    </>
);

const Features = () => {
  const features = [
    { 
      icon: Zap, 
      title: 'Lightning Fast Performance', 
      description: 'Experience blazing-fast performance with our optimized infrastructure and intelligent caching systems.', 
      benefits: ['99.9% uptime guaranteed', 'Sub-second response times', 'Global CDN network'], 
      color: '#f59e0b' 
    },
    { 
      icon: Shield, 
      title: 'Enterprise Security', 
      description: 'Bank-grade security with end-to-end encryption, compliance standards, and advanced threat protection.', 
      benefits: ['SOC 2 Type II certified', 'GDPR compliant', '256-bit encryption'], 
      color: '#22c55e' 
    },
    { 
      icon: BarChart3, 
      title: 'Advanced Analytics', 
      description: 'Get deep insights with AI-powered analytics, customizable dashboards, and real-time reporting.', 
      benefits: ['Real-time reporting', 'Predictive analytics', 'Custom KPI tracking'], 
      color: '#3b82f6' 
    },
    { 
      icon: Users, 
      title: 'Team Collaboration', 
      description: 'Seamlessly collaborate with your team using our intuitive workspace tools and communication features.', 
      benefits: ['Real-time collaboration', 'Role-based permissions', 'Activity tracking'], 
      color: '#8b5cf6' 
    },
    { 
      icon: Sparkles, 
      title: 'AI-Powered Automation', 
      description: 'Automate repetitive tasks and workflows with our intelligent AI assistant and machine learning capabilities.', 
      benefits: ['Smart workflow automation', 'Natural language processing', 'Learning algorithms'], 
      color: '#ec4899' 
    },
    { 
      icon: Globe, 
      title: 'Global Scale & Reach', 
      description: 'Scale globally with multi-region deployment, international compliance, and localization support.', 
      benefits: ['Multi-region hosting', 'International standards', 'Localization support'], 
      color: '#06b6d4' 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };
  
  const headerText = "Everything You Need to Succeed".split(" ");
  const headerContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };
  const headerWordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="features" className="relative py-24 sm:py-32 zone-grey overflow-hidden">
      <AnimatedBlobs />
      <FloatingElements />
      
      <div className="container-premium relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border-accent mb-6 shadow-premium-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Core Features</span>
            </div>
          </motion.div>
          
          <motion.h2 
            variants={headerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            {headerText.map((word, index) => (
                <motion.span 
                  key={index} 
                  variants={headerWordVariants} 
                  className={`inline-block mr-3 ${
                    word === 'Everything' || word === 'Succeed' 
                      ? 'text-gradient-blue' 
                      : 'text-primary'
                  }`}
                >
                    {word}
                </motion.span>
            ))}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants} 
            className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed"
          >
            Powerful features designed to streamline your workflow, boost productivity, and help your business scale to new heights with cutting-edge technology.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
        >
          {features.map((feature, index) => {
            const colSpans = [
                'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2',
                'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-6'
            ];
            return (
                <motion.div 
                  key={feature.title} 
                  variants={itemVariants} 
                  className={colSpans[index]}
                >
                    <PremiumFeatureCard feature={feature} />
                </motion.div>
            );
          })}
        </motion.div>

        <InteractiveCTA />
      </div>
    </section>
  );
};

export default Features;
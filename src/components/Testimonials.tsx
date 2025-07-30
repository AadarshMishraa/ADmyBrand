import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight, Play, X } from 'lucide-react';

// --- FONT NOTE ---
// @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');

// --- Mock UI Components ---
const Button = ({ variant = 'primary', size = 'lg', className, children, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = { primary: "btn btn-primary", ghost: "btn btn-ghost" };
    const sizeClasses = { lg: "h-12 px-8 text-base", icon: "h-10 w-10" };
    const appliedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
    return <button className={appliedClasses} {...props}>{children}</button>;
};

// --- Helper & Sub-Components ---

const AnimatedCounter = ({ value }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        // Check if the original value has a decimal to format correctly
        const hasDecimal = String(value).includes('.');
        return hasDecimal ? latest.toFixed(1) : Math.round(latest);
    });
    const ref = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    const animation = animate(count, parseFloat(value), {
                        duration: 1.5,
                        ease: "circOut",
                    });
                    setHasAnimated(true);
                    // Return cleanup function to stop animation on unmount
                    return () => {
                        animation.stop();
                    };
                }
            },
            {
                threshold: 0.5, // Trigger when 50% of the element is visible
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [value, count, hasAnimated]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

const VideoModal = ({ videoId, onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50" onClick={onClose}>
    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="relative w-full max-w-4xl aspect-video bg-surface rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-2 z-10" aria-label="Close video"><X className="h-5 w-5" /></button>
      <iframe className="w-full h-full rounded-lg" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </motion.div>
  </motion.div>
);

// --- Main Testimonials Component ---
const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showVideo, setShowVideo] = useState(false);

  const testimonials = [
    { name: 'Sarah Johnson', title: 'CEO, TechFlow Inc.', company: 'TechFlow', image: 'https://images.unsplash.com/photo-1494790108755-2616b612c2cd?w=150&h=150&fit=crop&crop=face', content: 'SaaSify transformed our entire workflow. The AI-powered automation saved us 40+ hours per week, and the analytics insights helped us increase revenue by 150%.', rating: 5, metrics: { metric: 'Revenue Growth', value: '150%' }, videoId: 'dQw4w9WgXcQ', tags: ['Enterprise', 'Growth'] },
    { name: 'Michael Chen', title: 'CTO, DataVision', company: 'DataVision', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', content: 'The security features are outstanding. Enterprise-grade encryption and compliance certifications gave us confidence to migrate our entire infrastructure.', rating: 5, metrics: { metric: 'Security Score', value: '99.9%' }, tags: ['Security', 'Tech'] },
    { name: 'Emily Rodriguez', title: 'VP Operations, GrowthLab', company: 'GrowthLab', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', content: 'Implementation was seamless, and the support team is incredible. We saw immediate improvements in team collaboration and project delivery times.', rating: 5, metrics: { metric: 'Efficiency Gain', value: '65%' }, tags: ['Startup', 'Collaboration'] },
  ];

  const wallOfLove = [
      { name: 'David Kim', handle: '@davidkim', content: 'As a startup, we needed a solution that could scale. SaaSify has been perfect for our growth journey.' },
      { name: 'Jessica Lee', handle: '@jesslee', content: 'The user interface is so intuitive. My team was up and running in less than a day!'},
      { name: 'Tom West', handle: '@tomwest', content: 'Mind-blowing analytics. We\'re making smarter decisions than ever before.'},
      { name: 'InnovateCorp', handle: '@innovate', content: 'A game-changer for our remote teams. Collaboration has never been easier.'}
  ];

  const carouselVariants = {
    enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0, scale: 0.8 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, scale: 0.8 }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };
  
  const currentTestimonial = testimonials[currentSlide];

  return (
    <>
      <section id="testimonials" className="py-24 sm:py-32 bg-background dark:bg-gradient-hero overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border-subtle mb-6 shadow-sm">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Wall of Love</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary font-sora tracking-tight">Trusted by Industry Leaders</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto font-light">See how companies like yours are transforming their operations and achieving unprecedented growth.</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Asymmetrical Layout: Main Testimonial Carousel */}
            <div className="lg:col-span-3">
                <motion.div 
                    className="relative h-[450px] bg-surface/50 dark:bg-surface/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-border-subtle p-8 md:p-12 flex flex-col"
                    onHoverStart={() => { /* Pause autoplay */ }}
                    onHoverEnd={() => { /* Resume autoplay */ }}
                >
                    <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/10" />
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentSlide}
                            custom={direction}
                            variants={carouselVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                            className="flex-grow flex flex-col"
                        >
                            <blockquote className="text-xl md:text-2xl font-light text-text-primary mb-8 leading-relaxed flex-grow">
                                "{currentTestimonial.content}"
                            </blockquote>
                            <div className="flex items-center gap-2">
                                {currentTestimonial.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-primary/10 text-primary font-medium px-2 py-1 rounded">{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
                {/* Interactive Navigation Thumbnails */}
                <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center gap-3">
                        {testimonials.map((t, index) => (
                            <button key={t.name} onClick={() => setCurrentSlide(index)} className="relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                <img src={t.image} alt={t.name} loading="lazy" className={`w-12 h-12 rounded-full object-cover transition-all duration-300 ${currentSlide === index ? 'scale-110 border-2 border-primary' : 'opacity-50 hover:opacity-100'}`} />
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => paginate(-1)} aria-label="Previous testimonial"><ArrowLeft className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => paginate(1)} aria-label="Next testimonial"><ArrowRight className="h-5 w-5" /></Button>
                    </div>
                </div>
            </div>

            {/* Asymmetrical Layout: Results Panel */}
            <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 flex flex-col items-center text-center"
            >
                <div className="relative">
                    <img src={currentTestimonial.image} alt={currentTestimonial.name} loading="lazy" className="w-32 h-32 rounded-full object-cover shadow-lg mb-4" />
                    {currentTestimonial.videoId && (
                        <button onClick={() => setShowVideo(true)} className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity" aria-label="Play video testimonial">
                            <Play className="h-12 w-12 text-white" />
                        </button>
                    )}
                </div>
                <h3 className="text-2xl font-bold text-text-primary font-sora">{currentTestimonial.name}</h3>
                <p className="text-text-secondary">{currentTestimonial.title}</p>
                <div className="flex items-center gap-1 my-4">
                    {[...Array(5)].map((_, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
                            <Star className="h-5 w-5 text-amber-400 fill-current" />
                        </motion.div>
                    ))}
                </div>
                <div className="bg-surface rounded-xl border border-border-subtle p-6 w-full mt-6">
                    <p className="text-sm text-text-muted mb-2">{currentTestimonial.metrics.metric}</p>
                    <p className="text-6xl font-bold text-primary tracking-tighter">
                        <AnimatedCounter value={currentTestimonial.metrics.value.replace('%', '')} />
                        {currentTestimonial.metrics.value.includes('%') && '%'}
                    </p>
                </div>
                <a href="#" className="text-sm text-primary font-semibold mt-6 inline-flex items-center group">
                    Read full case study <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
            </motion.div>
          </div>
          
          {/* Wall of Love */}
          <div className="mt-24">
              <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                  {wallOfLove.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: i * 0.1 }} className="break-inside-avoid bg-surface p-6 rounded-lg border border-border-subtle">
                          <p className="text-text-secondary font-light">"{item.content}"</p>
                          <p className="text-sm font-semibold text-text-primary mt-4">{item.name}</p>
                          <p className="text-xs text-text-muted">{item.handle}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {showVideo && <VideoModal videoId={currentTestimonial.videoId} onClose={() => setShowVideo(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Testimonials;

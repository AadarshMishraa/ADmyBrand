import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown, Search, Sun, Moon } from 'lucide-react';

// --- FONT & THEME NOTE ---
// @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
// This component assumes the Aether theme's CSS variables and button classes are available.

// --- Mock UI Components ---
const Button = ({ variant = 'primary', size = 'sm', className, children, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = { primary: "btn btn-primary", ghost: "btn btn-ghost" };
    const sizeClasses = { sm: "h-9 px-4", icon: "h-9 w-9" };
    const appliedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
    return <button className={appliedClasses} {...props}>{children}</button>;
};

// --- Helper & Sub-Components ---

// NEW: Theme Toggle Component
const ModeToggle = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
            setTheme(savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' ? (
                    <motion.div
                        key="sun"
                        initial={{ y: -20, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 20, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun className="h-5 w-5" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ y: -20, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 20, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon className="h-5 w-5" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Button>
    );
};


// 5. Improved Logo Design
const Logo = ({ isScrolled }) => (
    <a href="#home" className="flex items-center space-x-2 cursor-pointer">
        <motion.div 
            className="bg-gradient-azure dark:bg-gradient-amber rounded-lg flex items-center justify-center"
            animate={{ width: isScrolled ? 32 : 36, height: isScrolled ? 32 : 36 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {/* Stylized SVG Logo */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" fillOpacity="0.8"/>
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6"/>
            </svg>
        </motion.div>
        <span className="text-xl font-bold text-foreground font-sora">SaaSify</span>
    </a>
);

// 15. Animated Mobile Menu Icon
const AnimatedMenuIcon = ({ isOpen, ...props }) => (
    <motion.button {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d="M3 12H21"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                animate={{ y: isOpen ? -4 : 0, rotate: isOpen ? 45 : 0, transformOrigin: 'center' }}
            />
            <motion.path
                d="M3 6H21"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                animate={{ opacity: isOpen ? 0 : 1 }}
            />
            <motion.path
                d="M3 18H21"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                animate={{ y: isOpen ? -12 : 0, rotate: isOpen ? -45 : 0, transformOrigin: 'center' }}
            />
        </svg>
    </motion.button>
);

// 1. Mega Menu for Desktop
const DesktopNavigation = ({ navigation, activeSection, scrollToSection }) => (
    <nav className="hidden md:flex items-center space-x-2">
        {navigation.map((item) => (
            <div key={item.name} className="group relative">
                <button
                    onClick={() => scrollToSection(item.href)}
                    className="px-4 py-2 text-sm font-medium transition-colors relative rounded-md text-text-muted hover:text-text-primary"
                >
                    {item.name}
                    {activeSection === item.href.replace('#', '') && (
                        <motion.div
                            layoutId="activeSection"
                            className="absolute inset-0 bg-surface-accent rounded-md z-[-1]"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                    )}
                </button>
            </div>
        ))}
    </nav>
);

// 7. Staggered Mobile Menu Animation
const MobileMenu = ({ navigation, scrollToSection, isOpen }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border-subtle"
            >
                <motion.div 
                    variants={{
                        visible: { transition: { staggerChildren: 0.05 } },
                        hidden: {}
                    }}
                    initial="hidden"
                    animate="visible"
                    className="container mx-auto px-4 py-4"
                >
                    <div className="flex flex-col space-y-2">
                        {navigation.map((item) => (
                            <motion.button
                                key={item.name}
                                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                onClick={() => scrollToSection(item.href)}
                                className="text-left text-lg py-2 text-text-secondary hover:text-text-primary transition-colors"
                            >
                                {item.name}
                            </motion.button>
                        ))}
                        <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                            <ModeToggle />
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost">Sign In</Button>
                                <Button variant="primary">Get Started</Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// --- Main Header Component ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // 17. Hide on Scroll Down, Show on Scroll Up
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
      const previous = scrollY.getPrevious();
      if (latest > previous && latest > 150) {
          setHidden(true);
      } else {
          setHidden(false);
      }
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 16. Throttle Scroll Listener
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
        }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'features', 'pricing', 'testimonials', 'faq', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300
        ${scrolled ? 'shadow-subtle' : ''}`
      }
    >
      <div className={`transition-colors duration-300 ${scrolled ? 'bg-background/80 dark:bg-background/70 backdrop-blur-lg border-b border-border-subtle' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex items-center justify-between"
            animate={{ height: scrolled ? 64 : 80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <Logo isScrolled={scrolled} />
            <DesktopNavigation navigation={navigation} activeSection={activeSection} scrollToSection={scrollToSection} />
            
            <div className="hidden md:flex items-center space-x-2">
              <ModeToggle />
              <Button variant="ghost">Sign In</Button>
              <Button variant="primary">Get Started</Button>
            </div>

            <div className="md:hidden">
                <AnimatedMenuIcon isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-foreground" aria-expanded={isMenuOpen} aria-controls="mobile-menu" />
            </div>
          </motion.div>
        </div>
      </div>

      <div id="mobile-menu">
        <MobileMenu navigation={navigation} scrollToSection={scrollToSection} isOpen={isMenuOpen} />
      </div>
    </motion.header>
  );
};

export default Header;

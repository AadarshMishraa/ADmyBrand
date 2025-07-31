import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, circOut, Variants } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, HelpCircle, Copy, ArrowRight } from 'lucide-react';

// ---- Type Definitions ----
interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

// --- Mock UI Components (for standalone functionality) ---
const Input = ({ className, ...props }) => (
  <input 
    className={`peer h-12 w-full rounded-md bg-surface px-4 text-text-primary placeholder-transparent shadow-sm transition-colors duration-200 border border-border-default focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50 focus:shadow-inset-border ${className}`}
    {...props} 
  />
);

const Textarea = ({ className, ...props }) => (
  <textarea 
    className={`peer w-full rounded-md bg-surface px-4 py-3 text-text-primary placeholder-transparent shadow-sm transition-colors duration-200 border border-border-default focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50 focus:shadow-inset-border ${className}`}
    {...props} 
  />
);

const Button = ({ variant = 'primary', size = 'md', className, children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = {
    primary: "btn btn-primary dark:shadow-glow-amber",
    secondary: "btn btn-secondary",
    ghost: "btn btn-ghost",
  };
  const sizeClasses = {
    lg: "h-12 px-8 text-base",
    md: "h-10 px-4 py-2",
    sm: "h-9 px-3",
  };
  const appliedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
  return <button className={appliedClasses} {...props}>{children}</button>;
};

// --- Floating Label Input Component ---
const FloatingLabelInput = ({ id, label, error, ...props }) => (
  <div className="relative">
    <Input id={id} placeholder={label} {...props} className={error ? 'border-destructive' : ''} />
    <label
      htmlFor={id}
      className={`absolute left-4 top-3 text-text-muted transition-all duration-200 ease-in-out 
                 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary
                 peer-[.has-value]:-top-2.5 peer-[.has-value]:text-xs`}
    >
      {label}
    </label>
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);

const FloatingLabelTextarea = ({ id, label, error, ...props }) => (
  <div className="relative">
    <Textarea id={id} placeholder={label} {...props} className={error ? 'border-destructive' : ''} />
    <label
      htmlFor={id}
      className={`absolute left-4 top-3 text-text-muted transition-all duration-200 ease-in-out 
                 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary
                 peer-[.has-value]:-top-2.5 peer-[.has-value]:text-xs`}
    >
      {label}
    </label>
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);


// --- Main Contact Component ---
const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', company: '', message: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState('');

  const successMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isSubmitted && successMessageRef.current) {
      successMessageRef.current.focus();
    }
  }, [isSubmitted]);

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.message) errors.message = "Message is required.";
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (value) {
      e.target.classList.add('has-value');
    } else {
      e.target.classList.remove('has-value');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
      document.querySelectorAll('.has-value').forEach(el => el.classList.remove('has-value'));
    }, 4000);
  };

  const handleCopy = (text, title) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(title);
    setTimeout(() => setCopiedItem(''), 2000);
  };
  
  const contactInfo = [
    { icon: Mail, title: 'Email', details: 'hello@aether.com', description: 'General inquiries' },
    { icon: Phone, title: 'Phone', details: '+1 (555) 123-4567', description: 'Mon-Fri, 8am-5pm' },
    { icon: MapPin, title: 'Office', details: '123 Creative St, Tech City', description: 'Come say hello' }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: circOut } }
  };

  return (
    <section id="contact" className="min-h-screen w-full py-16 sm:py-24 bg-background dark:bg-gradient-hero flex items-center justify-center">
      <div className="container mx-auto px-4">
        {/* --- Main Grid Layout --- */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          
          {/* --- Left Column: Information & Secondary CTAs --- */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: circOut }}
            className="flex flex-col justify-center space-y-12"
          >
            {/* Page Header */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border-subtle mb-6 shadow-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Contact Us</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tight leading-tight">
                Let's Start a Conversation.
              </h1>
              <p className="mt-6 text-xl text-text-secondary max-w-xl">
                Ready to transform your business? Get in touch with our team to learn how Aether can help you achieve your goals.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <a href={info.title === 'Email' ? `mailto:${info.details}` : `tel:${info.details}`} key={info.title} className="group">
                  <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border-default transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-inset-border relative">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-text-primary">{info.title}</h4>
                      <p className="text-text-secondary font-medium">{info.details}</p>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); handleCopy(info.details, info.title); }} aria-label={`Copy ${info.title} to clipboard`} className="absolute top-1/2 -translate-y-1/2 right-4 p-1.5 rounded-full bg-surface/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface">
                      {copiedItem === info.title ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-text-muted" />}
                    </button>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Newsletter Section */}
            <div>
                <h4 className="text-xl font-bold text-text-primary mb-2">Stay Ahead of the Curve</h4>
                <p className="text-text-secondary mb-4">Get the latest product updates and industry insights.</p>
                <form className="flex gap-4">
                    <Input type="email" placeholder="Enter your email" className="flex-1 !h-12" />
                    <Button type="submit" size="lg" className="!px-6">
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                </form>
            </div>

          </motion.div>

          {/* --- Right Column: Contact Form --- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: circOut, delay: 0.2 }}
          >
            <div className="bg-surface dark:bg-gradient-surface rounded-2xl p-8 sm:p-12 border border-border-default shadow-2xl h-full">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    ref={successMessageRef}
                    tabIndex={-1}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center text-center h-full"
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                    <h3 className="text-3xl font-bold text-text-primary mb-2">Message Sent!</h3>
                    <p className="text-text-secondary max-w-xs">Thank you for reaching out. We'll review your message and get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="relative h-full">
                    {/* Loading Overlay */}
                    <AnimatePresence>
                      {isSubmitting && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-surface/80 dark:bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl"
                        >
                          <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <h3 className="text-3xl font-bold text-text-primary mb-8">Send us a message</h3>
                    <motion.form
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants}>
                          <FloatingLabelInput id="name" name="name" type="text" label={<>Name <span className="text-primary">*</span></>} value={formData.name} onChange={handleInputChange} error={formErrors.name} />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <FloatingLabelInput id="email" name="email" type="email" label={<>Email <span className="text-primary">*</span></>} value={formData.email} onChange={handleInputChange} error={formErrors.email} />
                        </motion.div>
                      </div>
                      <motion.div variants={itemVariants}>
                        <FloatingLabelInput id="company" name="company" type="text" label="Company" value={formData.company} onChange={handleInputChange} error={formErrors.company} />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <FloatingLabelTextarea id="message" name="message" label={<>Message <span className="text-primary">*</span></>} value={formData.message} onChange={handleInputChange} rows={6} error={formErrors.message} />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </Button>
                      </motion.div>
                    </motion.form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

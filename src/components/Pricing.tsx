import { useState, useRef } from 'react';
import { circOut, easeOut } from 'framer-motion';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, Sparkles, Crown, Building, ArrowRight, Calculator, XCircle, Plus, Minus } from 'lucide-react';

// --- FONT NOTE ---
// For the "Enhanced Typography", please add the following font import to your main CSS file or HTML head:
// @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
// And configure TailwindCSS to use "Sora" as a font family.

// --- Mock UI Components ---
const Button = ({ variant = 'primary', size = 'lg', className = '', children, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = { primary: "btn btn-primary", ghost: "btn btn-ghost" };
    const sizeClasses = { lg: "h-12 px-8 text-base" };
    const appliedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
    return <button className={appliedClasses} {...props}>{children}</button>;
};

// --- Helper & Sub-Components ---

// 7. Interactive Billing Toggle
const BillingToggle = ({ isAnnual, setIsAnnual }) => (
    <div className="flex items-center justify-center gap-4">
        <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-text-primary' : 'text-text-muted'}`}>
            Monthly
        </span>
        <motion.button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isAnnual ? 'bg-primary' : 'bg-surface-accent'}`}
            aria-label={isAnnual ? "Switch to monthly billing" : "Switch to annual billing"}
            aria-checked={isAnnual}
            role="switch"
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
            />
        </motion.button>
        <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-text-primary' : 'text-text-muted'}`}>
            Annual
        </span>
        <AnimatePresence>
        {isAnnual && (
            <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-500/10 text-green-500 text-xs font-bold px-3 py-1 rounded-full"
            >
                Save 20%
            </motion.span>
        )}
        </AnimatePresence>
    </div>
);

// 8. 3D Tilt Card with Staggered Animations
const PricingCard = ({ plan, isAnnual, onROIClick }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    const cardContentVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } }
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
            className="relative h-full"
        >
            <motion.div 
                layout // 1. Dynamic Card Elevation
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1]}}
                className={`relative h-full rounded-2xl bg-surface/70 dark:bg-surface/80 backdrop-blur-lg border p-8 flex flex-col transition-all duration-300
                ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/10 lg:scale-105' : 'border-border-subtle'}`}
            >
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-azure dark:bg-gradient-amber text-white dark:text-amber-950 text-xs font-bold px-4 py-2 rounded-full shadow-lg">Most Popular</div>}
                
                <motion.div variants={cardContentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="flex flex-col h-full">
                    <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-lg border ${plan.popular ? 'bg-primary/10 border-primary/20' : 'bg-surface-accent border-border-default'}`}>
                            <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-primary' : 'text-text-secondary'}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary font-sora">{plan.name}</h3>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-text-secondary mb-6 min-h-[40px] font-light">{plan.description}</motion.p>

                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="flex items-baseline gap-2">
                            <AnimatePresence mode="wait">
                                <motion.span key={isAnnual ? 'annual' : 'monthly'} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="text-5xl font-bold text-text-primary tracking-tighter">
                                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                                </motion.span>
                            </AnimatePresence>
                            <span className="text-text-muted">/ user / month</span>
                        </div>
                        {isAnnual && <p className="text-sm text-text-muted h-5">Billed as ${plan.annualPrice * 12} per year</p>}
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-8">
                        <Button variant={plan.popular ? 'primary' : 'ghost'} className="w-full group/btn">
                            {plan.name === 'Enterprise' ? 'Contact Sales' : `Choose ${plan.name}`}
                            <motion.span whileHover={{ x: 2, rotate: -5 }} transition={{ type: 'spring', stiffness: 400 }} className="inline-block ml-2"><ArrowRight className="h-4 w-4" /></motion.span>
                        </Button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-4 flex-grow">
                        <ul className="space-y-3">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-text-secondary">{feature}</span>
                                </li>
                            ))}
                            {plan.limitations.map((limitation, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <XCircle className="h-5 w-5 text-text-muted/70 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-text-muted/70">{limitation}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

// 20. Simplified FAQ Section
const FAQAccordion = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(0);
    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-surface rounded-lg border border-border-subtle overflow-hidden">
                    <motion.button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full p-6 text-left flex justify-between items-center"
                        aria-expanded={openIndex === index}
                        aria-controls={`faq-answer-${index}`}
                    >
                        <span className="font-semibold text-text-primary">{faq.question}</span>
                        <motion.div animate={{ rotate: openIndex === index ? 45 : 0 }}>
                            <Plus className="h-5 w-5 text-text-secondary" />
                        </motion.div>
                    </motion.button>
                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                id={`faq-answer-${index}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <p className="px-6 pb-6 text-text-secondary font-light">{faq.answer}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

// --- Main Pricing Component ---
const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    { name: 'Starter', icon: Sparkles, description: 'For individuals and small teams getting started.', monthlyPrice: 29, annualPrice: 24, popular: false, features: ['Up to 5 team members', '10GB storage', 'Basic analytics', 'Email support'], limitations: ['Limited integrations', 'Basic customization'] },
    { name: 'Professional', icon: Crown, description: 'For growing businesses that need advanced features.', monthlyPrice: 79, annualPrice: 64, popular: true, features: ['Up to 25 team members', '100GB storage', 'Advanced analytics', 'Priority support', 'API access', 'Custom workflows'], limitations: [] },
    { name: 'Enterprise', icon: Building, description: 'For large organizations with custom requirements.', monthlyPrice: 0, annualPrice: 0, popular: false, features: ['Unlimited team members', 'Unlimited storage', 'Dedicated support', 'Advanced security & SLA', 'Custom integrations'], limitations: [] }
  ];

  const faqs = [
      { question: "How does the free trial work?", answer: "Start with our 14-day free trial - no credit card required. Access all premium features and see how our platform transforms your workflow." },
      { question: "Can I upgrade or downgrade my plan anytime?", answer: "Absolutely! You can change your plan at any time. Upgrades take effect immediately, while downgrades apply at your next billing cycle." },
      { question: "What kind of support do you offer?", answer: "We provide 24/7 email support for all plans, live chat for Pro and Enterprise, and dedicated account managers for Enterprise customers." }
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: circOut } } };

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-background dark:bg-gradient-hero">
      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border-subtle mb-6 shadow-sm">
              <Crown className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Pricing</span>
            </div>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6 text-text-primary tracking-tight font-sora">
            Choose the Perfect Plan
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-3xl mx-auto mb-12 font-light">
            Start free and scale as you grow. No hidden fees, no surprises.
          </motion.p>

          <motion.div variants={itemVariants}>
            <BillingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
            {plans.slice(0, 2).map((plan) => (
                <motion.div key={plan.name} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <PricingCard plan={plan} isAnnual={isAnnual} onROIClick={() => { /* Open ROI Modal */ }} />
                </motion.div>
            ))}
        </div>
        
        <div className="max-w-6xl mx-auto mt-8">
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="relative h-full">
                    <div className="relative h-full rounded-2xl bg-surface/70 dark:bg-surface/80 backdrop-blur-lg border border-border-subtle p-8 flex flex-col md:flex-row md:items-center gap-8">
                        <div className="flex-shrink-0 flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-surface-accent border-border-default border">
                                <Building className="h-6 w-6 text-text-secondary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-text-primary font-sora">Enterprise</h3>
                                <p className="text-text-secondary font-light">Custom solutions for your organization.</p>
                            </div>
                        </div>
                        <div className="border-t md:border-l md:border-t-0 border-border-subtle flex-grow md:pl-8 md:ml-8">
                             <ul className="space-y-2 text-sm text-text-secondary mt-4 md:mt-0 columns-2">
                                {plans[2].features.slice(0, 4).map(f => <li key={f} className="flex items-start gap-2"><Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />{f}</li>)}
                                <li>...and much more</li>
                            </ul>
                        </div>
                        <div className="flex-shrink-0 mt-4 md:mt-0">
                             <Button variant="primary" className="">Contact Sales</Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-24 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 font-sora">Common Questions</h3>
            <FAQAccordion faqs={faqs} />
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

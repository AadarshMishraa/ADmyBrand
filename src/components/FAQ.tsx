import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, Phone, ArrowRight, Sparkles as AiIcon, Send, Loader2 } from 'lucide-react';

// --- FONT NOTE ---
// @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');

// --- Mock UI Components ---
const Button = ({ variant = 'primary', size = 'lg', className, children, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = { primary: "btn btn-primary", ghost: "btn btn-ghost" };
    const sizeClasses = { lg: "h-12 px-8 text-base" };
    const appliedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
    return <button className={appliedClasses} {...props}>{children}</button>;
};

// --- Helper & Sub-Components ---

// Morphing Plus/Minus Icon
const MorphingIcon = ({ open }) => (
    <motion.svg
        key="icon"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 text-primary"
    >
        <motion.path
            d="M10 1V19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={false}
            animate={{ rotate: open ? 90 : 0, scaleY: open ? 0 : 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        <path d="M1 10H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
);

// Individual FAQ Item with Layout Animation
const FaqItem = ({ faq, index, isOpen, onToggle }) => (
    <motion.div
        layout
        initial={{ borderRadius: 12 }}
        className="bg-surface/50 dark:bg-surface/80 backdrop-blur-lg border border-border-subtle overflow-hidden"
    >
        <motion.button
            layout
            onClick={() => onToggle(index)}
            className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
            aria-expanded={isOpen}
            aria-controls={`faq-answer-${index}`}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        layoutId={`active-indicator-${index}`}
                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>
            <span className="font-semibold text-text-primary pr-4">{faq.question}</span>
            <MorphingIcon open={isOpen} />
        </motion.button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="px-6 pb-6 text-text-secondary leading-relaxed font-light">
                        <p>{faq.answer}</p>
                        <div className="mt-4 text-xs flex items-center gap-4 text-text-muted">
                            <span>Was this helpful?</span>
                            <button className="hover:text-primary">Yes</button>
                            <button className="hover:text-primary">No</button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

// --- Main FAQ Component ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('General');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const faqsData = {
    'General': [
      { id: 'free-trial', question: "How does the free trial work?", answer: "Start with our 14-day free trial - no credit card required. Access all premium features and see how SaaSify transforms your workflow. Cancel anytime during the trial period." },
      { id: 'change-plan', question: "Can I upgrade or downgrade my plan anytime?", answer: "Absolutely! You can change your plan at any time. Upgrades take effect immediately, while downgrades apply at your next billing cycle. We'll prorate any differences." },
    ],
    'Billing': [
      { id: 'billing-teams', question: "How does billing work for teams?", answer: "Team billing is simple - pay per active user each month. Add or remove team members anytime, and we'll adjust your next bill accordingly." },
      { id: 'refund-policy', question: "Can I get a refund if I'm not satisfied?", answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not completely satisfied, contact us for a full refund." },
    ],
    'Security': [
      { id: 'data-security', question: "Is my data secure and backed up?", answer: "Yes, we use enterprise-grade security with 256-bit encryption, SOC 2 compliance, and automated daily backups. Your data is stored in secure, geo-redundant data centers." },
      { id: 'integrations', question: "Do you offer integrations with other tools?", answer: "We integrate with 50+ popular tools including Slack, Google Workspace, Microsoft 365, Salesforce, and more. Our API also allows custom integrations." },
    ]
  };
  
  const categories = Object.keys(faqsData);

  const filteredFaqs = faqsData[activeCategory].filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      for (const category in faqsData) {
        const foundIndex = faqsData[category].findIndex(faq => faq.id === hash);
        if (foundIndex !== -1) {
          setActiveCategory(category);
          setOpenIndex(foundIndex);
          break;
        }
      }
    }
  }, [faqsData]);

  const toggleFaq = (index) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);
    if (newIndex !== null) {
        window.history.replaceState(null, null, `#${filteredFaqs[newIndex].id}`);
    }
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsLoading(true);
    setAiAnswer('');

    const context = Object.values(faqsData).flat().map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n');
    const prompt = `Based on the following FAQ context, answer the user's question about the SaaS product. Keep the answer helpful and concise.\n\nContext:\n${context}\n\nUser Question: ${aiQuestion}\n\nAnswer:`;

    try {
        const chatHistory: { role: string; parts: { text: string }[] }[] = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            setAiAnswer(text);
        } else {
            setAiAnswer("Sorry, I couldn't find an answer to that. Please try rephrasing your question.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        setAiAnswer("Sorry, something went wrong while trying to get an answer. Please try again later.");
    } finally {
        setIsLoading(false);
    }
  };
  
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "circOut" } } };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-background dark:bg-gradient-hero">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border-subtle mb-6 shadow-sm">
            <span className="text-sm font-semibold text-primary">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary font-sora tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-light">
            Everything you need to know. If you can't find your answer, we're here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-2 p-1 bg-surface-accent rounded-lg">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeCategory === category ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'}`}
                        >
                            {activeCategory === category && (
                                <motion.div layoutId="active-category-indicator" className="absolute inset-0 bg-surface rounded-md shadow-sm" />
                            )}
                            <span className="relative z-10">{category}</span>
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 pl-9 pr-3 py-2 bg-surface border border-border-subtle rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </div>
            </div>
            
            <motion.div layout className="space-y-4">
                <AnimatePresence>
                    {filteredFaqs.map((faq, index) => (
                        <FaqItem key={faq.id} faq={faq} index={index} isOpen={openIndex === index} onToggle={toggleFaq} />
                    ))}
                </AnimatePresence>
            </motion.div>
          </div>

          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-surface rounded-2xl border border-border-subtle p-8 space-y-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 font-sora">✨ Ask AI Assistant</h3>
                    <form onSubmit={handleAiSubmit} className="space-y-4">
                        <textarea
                            value={aiQuestion}
                            onChange={(e) => setAiQuestion(e.target.value)}
                            placeholder="Ask anything about our product..."
                            className="w-full h-24 p-2 bg-surface-accent border border-border-subtle rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                            disabled={isLoading}
                        />
                        <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                            {isLoading ? 'Thinking...' : 'Get Answer'}
                        </Button>
                    </form>
                    <AnimatePresence>
                        {aiAnswer && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 bg-surface-accent rounded-lg border border-border-subtle"
                            >
                                <p className="text-sm text-text-secondary font-light">{aiAnswer}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="border-t border-border-subtle pt-8">
                    <h3 className="text-xl font-bold mb-4 font-sora">Still have questions?</h3>
                    <p className="text-text-secondary mb-6 font-light">
                        Our friendly support team is here to help.
                    </p>
                    <div className="space-y-4">
                        <Button variant="ghost" className="w-full">
                            <MessageSquare className="mr-2 h-4 w-4" /> Chat with an Expert
                        </Button>
                        <Button variant="ghost" className="w-full">
                            <Phone className="mr-2 h-4 w-4" /> Schedule a Call
                        </Button>
                    </div>
                </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

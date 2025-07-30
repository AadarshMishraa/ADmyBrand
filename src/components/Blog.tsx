import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User, Star } from 'lucide-react';

// MOCK: In a real app, this would come from your UI library (e.g., shadcn/ui)
// We are creating a simple placeholder here to make the component runnable.
const Button = ({ variant, size, className, children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    primary: "btn btn-primary",
    outline: "btn btn-ghost", // Using our theme's ghost button for outline
  };

  const sizeClasses = {
    lg: "h-11 px-8",
    md: "h-10 px-4 py-2",
  };

  const appliedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className || ''}`;

  return (
    <button className={appliedClasses} {...props}>
      {children}
    </button>
  );
};


const BlogPage = () => {
  // --- Data for Blog Posts and Resources ---
  const blogPosts = [
    {
      id: 1,
      title: "10 SaaS Metrics Every Founder Should Track in 2024",
      excerpt: "Discover the essential metrics that will help you make data-driven decisions and accelerate your SaaS growth.",
      author: "Sarah Chen",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&auto=format",
      featured: true
    },
    {
      id: 2,
      title: "The Complete Guide to SaaS Customer Onboarding",
      excerpt: "Learn how to create an onboarding experience that delights users and reduces churn from day one.",
      author: "Marcus Rodriguez",
      date: "Dec 12, 2024",
      readTime: "12 min read",
      category: "Product",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop&auto=format"
    },
    {
      id: 3,
      title: "AI-Powered Analytics: The Future of Business Intelligence",
      excerpt: "Explore how artificial intelligence is revolutionizing data analysis and decision-making in modern businesses.",
      author: "Dr. Emily Watson",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "AI & Tech",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&auto=format"
    }
  ];

  const resources = [
    { title: "SaaS Startup Toolkit", description: "Complete guide with templates, checklists, and frameworks.", type: "Free Download", icon: "📋" },
    { title: "ROI Calculator", description: "Calculate your potential ROI with our automation features.", type: "Interactive Tool", icon: "🧮" },
    { title: "Webinar Series", description: "Weekly webinars covering SaaS best practices and trends.", type: "Live Sessions", icon: "📺" },
    { title: "API Documentation", description: "Comprehensive developer resources and integration guides.", type: "Documentation", icon: "🔧" }
  ];

  // --- Animation Variants ---
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    // Improvement 1: Applied "Aether" theme gradients for the background
    <section id="blog" className="py-24 sm:py-32 bg-background dark:bg-gradient-hero">
      <div className="container mx-auto px-4">
        
        {/* --- Page Header --- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border-subtle mb-6 shadow-sm">
            <span className="text-sm font-semibold text-primary">Insights & Resources</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-text-primary tracking-tight">
            From Our Knowledge Hub
          </h2>
          
          {/* Improvement 3: Refined title with theme-specific gradient text */}
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Stay ahead with the latest SaaS trends, best practices, and actionable insights from our team of industry experts.
          </p>
        </motion.div>

        {/* --- Blog Posts Section --- */}
        <div className="mb-20">
          <motion.h3 
            variants={itemVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-text-primary"
          >
            Latest Articles
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.a
                href="#"
                key={post.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`group cursor-pointer block ${post.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {/* Improvement 2 & 4: Glow effect on featured post and enhanced card interactivity */}
                <article className={`bg-surface rounded-2xl overflow-hidden border border-border-default transition-all duration-300 shadow-lg hover:shadow-xl hover:border-primary/30 group-hover:shadow-inset-border relative ${post.featured ? 'dark:shadow-glow-amber' : ''}`}>
                  
                  {/* Improvement 7: Dedicated "Featured" badge */}
                  {post.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-amber text-amber-950 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3"/>
                      Featured
                    </div>
                  )}

                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Improvement 10: Subtle vignette on card images */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                      {/* Improvement 6: Styled category tag with accent colors */}
                      <span className="px-3 py-1 bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent rounded-md font-medium text-xs">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" /> {post.date}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    
                    {/* Improvement 5: Improved readability with text-secondary */}
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-text-muted" />
                        <span className="text-sm text-text-muted font-medium">{post.author}</span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </article>
              </motion.a>
            ))}
          </div>
          
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            {/* Improvement 8: Upgraded "View All" button to primary */}
            <Button variant="primary" size="lg" className="group">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* --- Resources Section --- */}
        <div>
          <motion.h3 
            variants={itemVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-text-primary"
          >
            Free Resources & Tools
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.a
                href="#"
                key={resource.title}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group cursor-pointer block h-full"
              >
                <div className="bg-surface rounded-xl p-6 border border-border-default hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col group-hover:shadow-inset-border">
                  {/* Improvement 9: Animated resource icons */}
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {resource.icon}
                  </motion.div>
                  
                  <div className="text-xs text-primary font-bold uppercase tracking-wider mb-2">
                    {resource.type}
                  </div>
                  
                  <h4 className="text-lg font-bold mb-3 text-text-primary group-hover:text-primary transition-colors">
                    {resource.title}
                  </h4>
                  
                  <p className="text-sm text-text-secondary mb-4 flex-grow">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center text-primary text-sm font-semibold mt-auto">
                    Access Now
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUp,
  Shield,
  Award,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Integrations', href: '#' },
        { name: 'API Documentation', href: '#' },
        { name: 'Changelog', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Press Kit', href: '#' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Community', href: '#' },
        { name: 'Tutorials', href: '#' },
        { name: 'Webinars', href: '#' },
        { name: 'Case Studies', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'GDPR', href: '#' },
        { name: 'Security', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  const certifications = [
    { icon: Shield, text: 'SOC 2 Certified' },
    { icon: Award, text: 'ISO 27001' },
    { icon: Globe, text: 'GDPR Compliant' }
  ];

  return (
    <footer className="bg-card border-t border-border relative">
      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>

      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-foreground">SaaSify</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Transforming businesses with intelligent automation and powerful analytics.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-card rounded-xl p-8 border border-border mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay in the loop</h3>
              <p className="text-muted-foreground">
                Get notified about product updates and new features.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-0 md:min-w-80">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-gradient-primary hover:opacity-90 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-border">
          {/* Copyright */}
          <div className="text-muted-foreground">
            © 2024 SaaSify. All rights reserved.
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap items-center gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <cert.icon className="h-4 w-4" />
                <span>{cert.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
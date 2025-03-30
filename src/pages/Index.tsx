
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import UnitConverter from '@/components/UnitConverter';
import { Linkedin, Twitter, Github, FileText, ExternalLink } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    return () => {
      document.body.style.opacity = '';
      document.body.style.transition = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background cyberpunk-grid">
      <div className="container mx-auto px-4">
        <header className="pt-16 pb-8 text-center relative">
          <div className="absolute top-6 left-0 right-0 flex justify-center z-10">
            <a 
              href="https://peerlist.io/saniyanande/project/css-unit-converter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform group relative"
            >
              <div className="absolute inset-0 bg-genz-gradient blur-lg opacity-40 rounded-xl group-hover:opacity-60 transition-opacity"></div>
              <img 
                src="/lovable-uploads/f8a22d95-bc84-419e-a8da-18f8062e2bf9.png" 
                alt="Live on Peerlist Launchpad" 
                className="h-16 relative"
              />
            </a>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-4 pt-20"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary text-foreground text-xs font-medium mb-3 border border-[#8c52ff33]">
              <span className="text-[#8c52ff] mr-2">✦</span>
              Dynamic Visualization
              <span className="text-[#ef33ff] ml-2">✦</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 neon-text">
              CSS Unit Converter
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Convert between CSS units with interactive visualizations. See exactly how units relate to each other and learn when to use each one.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-1"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8c52ff] to-transparent opacity-70"></div>
          </motion.div>
        </header>
        
        <main>
          <UnitConverter />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 mb-8 text-center"
          >
            <p className="text-muted-foreground text-sm">
              ✨ Made with precision and creativity ✨
            </p>
          </motion.div>
        </main>
        
        <footer className="py-12 text-center">
          <motion.div 
            className="flex justify-center space-x-6 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <a 
              href="https://linkedin.com/in/saniyanande" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#8c52ff] transition-colors duration-200 flex items-center gap-1 text-sm"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://twitter.com/saniyanande" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#ef33ff] transition-colors duration-200 flex items-center gap-1 text-sm"
            >
              <Twitter size={18} />
              <span>Twitter</span>
            </a>
            <a 
              href="https://github.com/saniyanande" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors duration-200 flex items-center gap-1 text-sm"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://medium.com/@saniyanande" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#8c52ff] transition-colors duration-200 flex items-center gap-1 text-sm"
            >
              <FileText size={18} />
              <span>Medium</span>
            </a>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-4 text-xs text-muted-foreground/70"
          >
            © {new Date().getFullYear()} Saniya Nande. All rights reserved.
          </motion.p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

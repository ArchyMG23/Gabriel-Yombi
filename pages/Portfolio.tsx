
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Project, ProjectCategory, Language } from '../types';
import { CATEGORIES, TRANSLATIONS } from '../constants';
import { Film, Image as ImageIcon, X, ArrowRight, Zap, Info, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioProps {
  lang: Language;
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ lang, projects }) => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(ProjectCategory.ALL);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const t = TRANSLATIONS[lang];

  // Gérer le filtre passé depuis l'accueil
  useEffect(() => {
    if (location.state && (location.state as any).filter) {
      setActiveCategory((location.state as any).filter);
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === ProjectCategory.ALL || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      p.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (cat: ProjectCategory) => {
    const categories = t.portfolio.categories;
    switch (cat) {
      case ProjectCategory.ALL: return categories.all;
      case ProjectCategory.GALLERY: return categories.gallery;
      case ProjectCategory.LOGOTYPE: return categories.logotype;
      case ProjectCategory.BRANDING: return categories.branding;
      case ProjectCategory.SOCIAL: return categories.social;
      case ProjectCategory.PACKAGING: return categories.packaging;
      case ProjectCategory.UIUX: return categories.uiux;
      default: return cat;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="mb-20 text-center reveal">
        <span className="text-panda-gold font-display text-sm tracking-widest uppercase mb-4 block">{t.portfolio.title}</span>
        <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-12 uppercase text-panda-black dark:text-panda-white">PORTFOLIO</h1>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative group px-4">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-panda-black/50 dark:text-panda-white/30 group-focus-within:text-panda-gold transition-colors" size={20} />
          <input 
            type="text"
            placeholder={t.portfolio.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-panda-gold transition-all text-panda-black dark:text-panda-white placeholder:text-panda-black/40 dark:placeholder:text-panda-white/20"
          />
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto pb-8 no-scrollbar md:justify-center gap-4 border-b border-panda-black/10 dark:border-panda-white/10 px-4 -mx-6 md:mx-0">
          <div className="flex flex-nowrap gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as ProjectCategory)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-[10px] font-black transition-all uppercase tracking-widest border ${
                  activeCategory === cat 
                  ? 'bg-panda-gold border-panda-gold text-panda-black shadow-lg shadow-panda-gold/20' 
                  : 'border-panda-black/10 dark:border-panda-white/10 hover:border-panda-gold text-panda-black/60 dark:text-panda-white/60'
                }`}
              >
                {getCategoryLabel(cat as ProjectCategory)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              key={project.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 overflow-hidden rounded-[2.5rem] transition-all hover:border-panda-gold/50 cursor-pointer"
            >
              <div className="aspect-square overflow-hidden relative">
                {project.mediaType === 'video' ? (
                  <video 
                    src={project.image} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title[lang]} 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute top-6 left-6 p-2 bg-panda-black/50 backdrop-blur-md rounded-lg border border-panda-white/10 text-panda-gold">
                  {project.mediaType === 'video' ? <Film size={16} /> : <ImageIcon size={16} />}
                </div>
                <div className="absolute inset-0 bg-panda-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-panda-gold text-panda-black p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-500">
                      <Info size={24} />
                   </div>
                </div>
              </div>
              <div className="p-10">
                <span className="text-panda-gold text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">{getCategoryLabel(project.category)}</span>
                <h3 className="text-3xl font-display mb-4 group-hover:text-panda-gold transition-colors tracking-tight text-panda-black dark:text-panda-white">{project.title[lang]}</h3>
                <p className="text-panda-black/70 dark:text-panda-white/50 text-sm leading-relaxed mb-8 font-light line-clamp-3">{project.description[lang]}</p>
                <button className="text-[10px] uppercase font-black tracking-widest border-b-2 border-panda-gold/30 pb-1 hover:border-panda-gold transition-all text-panda-black dark:text-panda-white group-hover:text-panda-gold flex items-center space-x-2">
                  <span>{t.portfolio.exploreCaseStudy}</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-40 opacity-30 italic font-light tracking-widest text-panda-black dark:text-panda-white">
          {t.portfolio.noResults}
        </div>
      )}

      {/* PROJECT DETAIL MODAL (Case Study) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-panda-black/95 backdrop-blur-2xl" onClick={() => setSelectedProject(null)} />
          
          <div className="relative w-full max-w-6xl bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row max-h-[90vh] shadow-2xl">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-8 right-8 z-10 p-4 bg-panda-black/10 dark:bg-panda-white/10 text-panda-black dark:text-white rounded-full hover:bg-panda-gold hover:text-panda-black transition-all"
            >
              <X size={24} />
            </button>

            {/* Left: Media */}
            <div className="w-full lg:w-1/2 bg-panda-black/5 dark:bg-panda-black/50 border-r border-panda-black/5 dark:border-panda-white/5 relative">
              {selectedProject.mediaType === 'video' ? (
                <video 
                  src={selectedProject.image} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title[lang]} 
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-8 left-8">
                 <div className="bg-panda-gold text-panda-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                    {getCategoryLabel(selectedProject.category)}
                 </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-1/2 p-12 md:p-20 overflow-y-auto custom-scrollbar">
              <span className="text-panda-gold font-display text-xs tracking-[0.5em] uppercase mb-6 block">{t.portfolio.caseStudyTitle}</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-10 uppercase tracking-tighter leading-none text-panda-black dark:text-panda-white">{selectedProject.title[lang]}</h2>
              
              <div className="space-y-12">
                <div>
                  <h4 className="text-panda-black/60 dark:text-panda-white/40 text-[10px] uppercase font-black tracking-widest mb-4 flex items-center space-x-2">
                    <Zap size={14} className="text-panda-gold" />
                    <span>{t.portfolio.description}</span>
                  </h4>
                  <p className="text-xl text-panda-black/80 dark:text-panda-white/80 font-light leading-relaxed">
                    {selectedProject.description[lang]}
                  </p>
                </div>

                <div className="p-10 rounded-[2rem] marble-texture border border-panda-black/5 dark:border-panda-white/5 shadow-inner bg-panda-black/5 dark:bg-panda-white/5">
                  <h4 className="text-panda-black/60 dark:text-panda-white/40 text-[10px] uppercase font-black tracking-widest mb-6">{t.portfolio.process}</h4>
                  <div className="text-panda-black dark:text-panda-white text-lg leading-relaxed space-y-4 whitespace-pre-line font-medium">
                    {selectedProject.caseStudy[lang]}
                  </div>
                </div>

                <div className="pt-10 border-t border-panda-black/10 dark:border-panda-white/10">
                  <Link 
                    to="/contact"
                    onClick={() => setSelectedProject(null)}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-12 h-12 bg-panda-gold text-panda-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight size={20} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-panda-black dark:text-panda-white group-hover:text-panda-gold transition-colors">{t.portfolio.startSimilar}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

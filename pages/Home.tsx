import { ArrowRight, Box, Palette, Layout, Megaphone, Quote, BookOpen, User, Mail, Sparkles, Zap, Film } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Language, Project, BlogPost, ProjectCategory } from '../types';
import { TRANSLATIONS } from '../constants';

interface HomeProps {
  lang: Language;
  projects: Project[];
  posts: BlogPost[];
}

const Home: React.FC<HomeProps> = ({ lang, projects, posts }) => {
  const t = TRANSLATIONS[lang];
  const navigate = useNavigate();

  const recentProjects = [...projects].reverse().slice(0, 3);
  const recentPosts = [...posts].reverse().slice(0, 2);

  const services = [
    { icon: <Palette size={32} />, title: "Logotype", category: ProjectCategory.LOGOTYPE },
    { icon: <Sparkles size={32} />, title: "Branding", category: ProjectCategory.BRANDING },
    { icon: <Layout size={32} />, title: "UI/UX", category: ProjectCategory.UIUX },
    { icon: <Box size={32} />, title: "Packaging", category: ProjectCategory.PACKAGING }
  ];

  const handleCategoryClick = (category: ProjectCategory) => {
    navigate('/portfolio', { state: { filter: category } });
  };

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
    <div className="space-y-40 pb-32 text-panda-black dark:text-panda-white">
      {/* Hero Section - The Grand Entrance */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-panda-green/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-panda-gold/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-panda-green/10 blur-[120px] rounded-full animate-float" />
        
        <div className="animate-slide-up">
          <span className="text-panda-gold font-display text-sm tracking-[0.5em] uppercase mb-8 block">{t.hero.title}</span>
          <h1 className="font-display text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-none">
            PANDA<span className="text-panda-gold">_</span>GRAPHIC
          </h1>
          <p className="text-xl md:text-3xl font-light text-panda-black/70 dark:text-panda-white/70 max-w-3xl mx-auto mb-16 tracking-wide leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link 
              to="/portfolio" 
              className="group relative inline-flex items-center px-12 py-6 bg-panda-gold text-panda-black font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-panda-gold/10"
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <ArrowRight className="ml-4 relative z-10 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/contact" 
              className="group inline-flex items-center px-12 py-6 border border-panda-black/20 dark:border-panda-white/20 hover:border-panda-gold text-panda-black dark:text-panda-white font-bold uppercase tracking-[0.3em] transition-all hover:text-panda-gold"
            >
              {t.hero.consultation}
            </Link>
          </div>
        </div>
      </section>

      {/* About Recap - The Soul of the Designer */}
      <section className="reveal max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-panda-gold/30 rounded-[3rem] group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700" />
            <div className="aspect-square rounded-[3rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 border-2 border-panda-black/10 dark:border-panda-white/10 group-hover:border-panda-gold shadow-2xl">
              <img src="https://picsum.photos/seed/victor_arch/800/800" alt="Victor" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-panda-gold font-display text-xs tracking-[0.6em] uppercase block">{t.home.creativeSpirit}</span>
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter">Victor Gabriel <span className="text-panda-gold">Archange</span></h2>
            <p className="text-panda-black/60 dark:text-panda-white/60 text-xl leading-relaxed italic border-l-4 border-panda-gold pl-8">
              {t.home.aboutQuote}
            </p>
            <p className="text-panda-black/70 dark:text-panda-white/70 text-lg font-light leading-relaxed">
              {t.home.aboutBio}
            </p>
            <Link to="/about" className="inline-flex items-center space-x-4 text-panda-gold hover:text-panda-black dark:hover:text-white transition-all group">
              <span className="font-bold uppercase tracking-widest text-sm border-b border-panda-gold/30 pb-1 group-hover:border-panda-black dark:group-hover:border-white">{t.home.discoverPath}</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Recap - The Expertise Grid */}
      <section className="max-w-7xl mx-auto px-6 reveal">
        <div className="text-center mb-24">
          <span className="text-panda-gold font-display text-xs tracking-[0.6em] uppercase mb-6 block">{t.home.expertiseTitle}</span>
          <h2 className="text-5xl md:text-8xl font-display mb-10 leading-[1.1] tracking-tighter uppercase">{t.home.expertiseSubtitle.split(' ')[0]} <span className="text-panda-green">{t.home.expertiseSubtitle.split(' ')[1]}</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item, i) => (
            <button 
              key={i} 
              onClick={() => handleCategoryClick(item.category)}
              className="bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 p-12 rounded-[2.5rem] hover:border-panda-gold transition-all group hover:-translate-y-3 duration-500 flex flex-col items-center text-center w-full"
            >
              <div className="mb-8 text-panda-gold group-hover:scale-125 transition-all duration-500">
                {item.icon}
              </div>
              <h4 className="font-display text-base uppercase tracking-widest text-panda-black/80 dark:text-panda-white/80 group-hover:text-panda-gold transition-colors">
                {getCategoryLabel(item.category)}
              </h4>
              <div className="mt-6 w-8 h-[1px] bg-panda-black/10 dark:bg-panda-white/10 group-hover:w-16 group-hover:bg-panda-gold transition-all" />
            </button>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <Link to="/services" className="px-12 py-5 border border-panda-black/10 dark:border-panda-white/10 rounded-full hover:border-panda-gold transition-all uppercase tracking-widest text-xs font-bold text-panda-black/70 dark:text-panda-white/50 hover:text-panda-gold">
            {t.home.viewServices}
          </Link>
        </div>
      </section>

      {/* Portfolio Recap - The Visual Feast */}
      <section className="max-w-7xl mx-auto px-6 reveal">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Zap size={16} className="text-panda-gold animate-pulse" />
              <span className="text-panda-gold font-display text-xs tracking-[0.5em] uppercase block">{t.home.portfolioSubtitle}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-none">{t.home.portfolioTitle.split(' ')[0]} <span className="text-panda-gold">{t.home.portfolioTitle.split(' ')[1]}</span></h2>
          </div>
          <Link to="/portfolio" className="group text-panda-black/60 dark:text-panda-white/40 hover:text-panda-gold transition-colors underline underline-offset-8 uppercase tracking-[0.3em] text-[10px] font-bold flex items-center space-x-3">
            <span>{t.home.exploreGallery}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recentProjects.map((project, i) => (
            <Link 
              key={project.id} 
              to="/portfolio"
              className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 transition-all duration-700 hover:border-panda-gold/50 block"
            >
              {project.mediaType === 'video' ? (
                <video src={project.image} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              ) : (
                <img src={project.image} alt={project.title[lang]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-panda-black via-panda-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 w-full text-panda-white">
                <span className="text-panda-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">{getCategoryLabel(project.category)}</span>
                <h3 className="text-3xl font-display mb-3 tracking-tight group-hover:text-panda-gold transition-colors">{project.title[lang]}</h3>
                <p className="text-panda-white/50 text-sm font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-700">{project.description[lang]}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog Recap - The Creative Intel */}
      <section className="max-w-7xl mx-auto px-6 reveal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 flex flex-col justify-center">
            <span className="text-panda-gold font-display text-xs tracking-[0.5em] uppercase mb-6 block">{t.home.blogSubtitle}</span>
            <h2 className="text-5xl font-display uppercase tracking-tighter mb-8 leading-tight">{t.home.blogTitle.split(' ')[0]} <span className="text-panda-green">{t.home.blogTitle.split(' ')[1]}</span></h2>
            <p className="text-panda-black/60 dark:text-panda-white/60 text-lg font-light leading-relaxed mb-10">
              {t.home.blogDesc}
            </p>
            <Link to="/blog" className="flex items-center space-x-4 text-panda-gold hover:text-panda-black dark:hover:text-white transition-all group">
              <span className="font-bold uppercase tracking-widest text-sm border-b border-panda-gold/30 pb-1 group-hover:border-panda-black dark:group-hover:border-white">{t.home.readArticles}</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            {recentPosts.map((post) => (
              <Link key={post.id} to="/blog" className="group block bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-[2rem] p-8 hover:border-panda-gold transition-all">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                  {post.mediaType === 'video' ? (
                    <video 
                      src={post.image} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img src={post.image} alt={post.title[lang]} className="w-full h-full object-cover" />
                  )}
                </div>
                <span className="text-[10px] font-bold text-panda-gold uppercase tracking-widest mb-4 block">{post.date}</span>
                <h3 className="text-xl font-display group-hover:text-panda-gold transition-colors mb-4 uppercase tracking-tight">{post.title[lang]}</h3>
                <p className="text-panda-black/60 dark:text-panda-white/40 text-sm line-clamp-2 font-light leading-relaxed">{post.content[lang]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final Contact CTA - The Closing Deal */}
      <section className="px-6 pb-20">
        <div 
          className="reveal marble-texture max-w-7xl mx-auto py-32 px-12 md:px-24 rounded-[4rem] text-center flex flex-col items-center group cursor-pointer border border-panda-black/10 relative overflow-hidden shadow-2xl" 
          onClick={() => navigate('/contact')}
        >
          <div className="absolute inset-0 bg-white/40 group-hover:bg-panda-gold/10 transition-colors duration-1000" />
          <div className="relative z-10">
            <Mail className="text-panda-green mb-6 md:mb-10 animate-float mx-auto" size={48} />
            <h2 className="text-4xl md:text-8xl font-display font-bold mb-6 md:mb-10 uppercase tracking-tighter text-panda-black leading-none">{t.home.ctaTitle.split(' ')[0]} <span className="text-panda-gold">{t.home.ctaTitle.split(' ')[1]}</span></h2>
            <p className="text-lg md:text-2xl text-panda-black/80 max-w-2xl mx-auto mb-10 md:mb-16 font-semibold px-4">
              {t.home.ctaDesc}
            </p>
            <div className="inline-flex items-center px-10 md:px-16 py-4 md:py-6 bg-panda-black text-white font-bold uppercase tracking-[0.3em] rounded-xl group-hover:bg-panda-gold group-hover:text-panda-black transition-all shadow-xl text-xs md:text-base">
              {t.home.ctaButton} <ArrowRight className="ml-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
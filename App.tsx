
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Globe, Instagram, Linkedin, Facebook, Calendar, 
  Settings, Plus, Trash2, Send, CheckCircle, ChevronRight,
  Palette, Box, Layout, MousePointer2, Megaphone, Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Project, BlogPost, Appointment, ProjectCategory, AppSettings } from './types';
import { TRANSLATIONS, INITIAL_PROJECTS, INITIAL_POSTS, CATEGORIES } from './constants';
import { Sun, Moon } from 'lucide-react';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

const NavLinks: React.FC<{ lang: Language; t: any; setIsMenuOpen: (o: boolean) => void }> = ({ lang, t, setIsMenuOpen }) => {
  const location = useLocation();
  
  return (
    <>
      {Object.entries(t.nav).map(([key, label]) => {
        const path = key === 'home' ? '/' : `/${key}`;
        const isActive = location.pathname === path;
        
        return (
          <Link 
            key={key} 
            to={path}
            className={`relative text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 py-2 ${
              isActive ? 'text-panda-gold' : 'text-panda-black/40 dark:text-panda-white/40 hover:text-panda-black dark:hover:text-panda-white'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span>{label as string}</span>
            {isActive && (
              <>
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-panda-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-panda-gold/5 blur-md rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              </>
            )}
          </Link>
        );
      })}
    </>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    socialLinks: {
      facebook: 'https://facebook.com/panda_graphic',
      instagram: 'https://instagram.com/panda_graphic',
      whatsapp: '654491319'
    }
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = TRANSLATIONS[lang];

  const addProject = (p: Project) => setProjects([...projects, p]);
  const deleteProject = (id: string) => setProjects(projects.filter(p => p.id !== id));
  
  const addPost = (p: BlogPost) => setPosts([...posts, p]);
  const deletePost = (id: string) => setPosts(posts.filter(p => p.id !== id));
  const updatePost = (updatedPost: BlogPost) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const addAppointment = async (a: Appointment) => {
    setAppointments([...appointments, a]);
    
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(a),
      });

      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }

      const result = await response.json();
      console.log('Notification status:', result.message);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const updateAppointment = (updated: Appointment) => {
    setAppointments(appointments.map(a => a.id === updated.id ? updated : a));
    // Logic for email notification on update
    console.log(`Update notification sent to ${updated.email}`);
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const updateSettings = (newSettings: AppSettings) => setSettings(newSettings);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const toggleLang = () => {
    setLang(prev => prev === 'fr' ? 'en' : prev === 'en' ? 'de' : 'fr');
  };

  return (
    <Router>
      <div className={`min-h-screen font-sans transition-colors duration-500 selection:bg-panda-gold selection:text-panda-black ${
        theme === 'dark' ? 'bg-panda-black text-panda-white' : 'bg-white text-panda-black'
      }`}>
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 w-full z-50 transition-all duration-700 ${
            scrolled 
              ? 'py-4 bg-white/60 dark:bg-panda-black/60 backdrop-blur-2xl border-b border-panda-black/5 dark:border-panda-white/5 shadow-2xl' 
              : 'py-8 bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-panda-gold rounded-full flex items-center justify-center text-panda-black font-black text-xl group-hover:rotate-[360deg] transition-transform duration-1000">P</div>
              <span className="font-display text-xl font-bold tracking-tighter text-panda-black dark:text-panda-white group-hover:text-panda-gold transition-colors">PANDA<span className="text-panda-gold">_</span>GRAPHIC</span>
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              <NavLinks lang={lang} t={t} setIsMenuOpen={setIsMenuOpen} />
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={toggleTheme}
                  className="p-2 bg-panda-black/5 dark:bg-panda-white/5 rounded-full border border-panda-black/10 dark:border-panda-white/10 hover:border-panda-gold transition-all text-panda-black dark:text-panda-white"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                <button 
                  onClick={toggleLang} 
                  className="flex items-center space-x-2 text-[10px] font-black bg-panda-black/5 dark:bg-panda-white/5 px-4 py-2 rounded-full border border-panda-black/10 dark:border-panda-white/10 hover:border-panda-gold hover:bg-panda-gold/10 transition-all uppercase tracking-widest text-panda-black dark:text-panda-white"
                >
                  <Globe size={12} className="text-panda-gold" />
                  <span>{lang.toUpperCase()}</span>
                </button>
              </div>
            </div>

            <button 
              className={`md:hidden p-3 rounded-full transition-all text-panda-black dark:text-panda-white ${scrolled ? 'bg-panda-black/5 dark:bg-panda-white/5' : 'bg-transparent'}`} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 bg-panda-black/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 md:hidden"
            >
              <div className="absolute top-20 right-6">
                <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-panda-white/5 rounded-full text-panda-gold">
                  <X size={32} />
                </button>
              </div>
              {Object.entries(t.nav).map(([key, label], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link 
                    to={key === 'home' ? '/' : `/${key}`}
                    className="text-4xl font-display uppercase hover:text-panda-gold transition-colors tracking-tighter"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label as string}
                  </Link>
                </motion.div>
              ))}
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => { toggleLang(); setIsMenuOpen(false); }} 
                className="text-xl flex items-center space-x-3 bg-panda-white/5 px-8 py-4 rounded-full border border-panda-white/10"
              >
                <Globe /> <span>{lang.toUpperCase()}</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home lang={lang} projects={projects} posts={posts} />} />
            <Route path="/portfolio" element={<Portfolio lang={lang} projects={projects} />} />
            <Route path="/services" element={<Services lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
            <Route path="/blog" element={<Blog lang={lang} posts={posts} onUpdatePost={updatePost} isAdmin={isAdmin} />} />
            <Route path="/contact" element={<Contact lang={lang} onAddAppointment={addAppointment} appointments={appointments} settings={settings} />} />
            <Route path="/admin" element={
              <Admin 
                lang={lang} 
                projects={projects} 
                onAddProject={addProject} 
                onDeleteProject={deleteProject}
                posts={posts}
                onAddPost={addPost}
                onDeletePost={deletePost}
                appointments={appointments}
                onUpdateAppointment={updateAppointment}
                onDeleteAppointment={deleteAppointment}
                settings={settings}
                onUpdateSettings={updateSettings}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-panda-black/5 dark:bg-panda-black/40 backdrop-blur-sm border-t border-panda-black/10 dark:border-panda-white/10 py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-display text-xl mb-4 text-panda-gold">PANDA_GRAPHIC</h3>
              <p className="text-panda-black/60 dark:text-panda-white/60 max-w-xs">{t.about.bio}</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-panda-gold uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="grid grid-cols-2 gap-2 text-sm text-panda-black/70 dark:text-panda-white/70">
                {Object.entries(t.nav).map(([key, label]) => (
                  <li key={key}><Link to={key === 'home' ? '/' : `/${key}`} className="hover:text-panda-gold text-panda-black/70 dark:text-panda-white/70">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-panda-gold uppercase tracking-widest text-sm">Connect</h4>
              <div className="flex space-x-4">
                <a 
                  href={settings.socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-panda-black/5 dark:bg-panda-white/5 rounded-full hover:bg-panda-gold hover:text-panda-black transition-all text-panda-black dark:text-panda-white"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href={settings.socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-panda-black/5 dark:bg-panda-white/5 rounded-full hover:bg-panda-gold hover:text-panda-black transition-all text-panda-black dark:text-panda-white"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href={`https://wa.me/${settings.socialLinks.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-panda-black/5 dark:bg-panda-white/5 rounded-full hover:bg-panda-gold hover:text-panda-black transition-all text-panda-black dark:text-panda-white"
                >
                  <Send size={20} />
                </a>
              </div>
              <div className="pt-6 border-t border-panda-black/5 dark:border-panda-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <Link to="/admin" className="text-[10px] text-panda-black/30 dark:text-panda-white/30 uppercase tracking-widest hover:text-panda-gold transition-colors">
                  © 2024 Victor Gabriel Archange Yombi Mangamba
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;

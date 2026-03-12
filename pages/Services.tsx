
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, Box, Layout, Megaphone, 
  Image as ImageIcon, CheckCircle2, ArrowUpRight, 
  PenTool, Sparkles, Zap, MessageSquare, ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
}

const Services: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const navigate = useNavigate();
  const [floatingText, setFloatingText] = useState<FloatingText | null>(null);

  const serviceList = [
    {
      id: 'Logotype',
      title: 'Logotype & Monogramme',
      icon: <PenTool className="text-panda-gold" size={40} />,
      description: 'Conception de logos emblématiques, vectorisés et intemporels.',
      hoverNote: 'Le logo est le point d’ancrage de votre réputation. Nous visons la mémorisation instantanée.',
      clickMantra: 'Graver votre légende...',
      items: ['Design sur-sur-mesure', 'Recherche typographique', 'Variantes Noir/Blanc'],
      delay: '100ms'
    },
    {
      id: 'Branding',
      title: 'Brand Identity',
      icon: <Palette className="text-panda-gold" size={40} />,
      description: 'Création d\'univers visuels cohérents et marbrés.',
      hoverNote: 'Une identité forte réduit vos coûts d’acquisition. On ne vend pas un produit, mais un statut.',
      clickMantra: 'Bâtir votre empire...',
      items: ['Charte Graphique', 'Storytelling visuel', 'Moodboards'],
      delay: '200ms'
    },
    {
      id: 'Social',
      title: 'Social Media Management',
      icon: <Megaphone className="text-panda-gold" size={40} />,
      description: 'Direction artistique pour vos réseaux sociaux.',
      hoverNote: 'L’algorithme aime la qualité. Votre feed doit être une galerie d’art interactive.',
      clickMantra: 'Illuminer vos réseaux...',
      items: ['Templates personnalisés', 'Contenus Reels/Stories', 'Stratégie'],
      delay: '300ms'
    },
    {
      id: 'Packaging',
      title: 'Packaging Design',
      icon: <Box className="text-panda-gold" size={40} />,
      description: 'L\'art du déballage de luxe.',
      hoverNote: 'Le packaging est le premier contact physique. Il doit promettre une expérience hors du commun.',
      clickMantra: 'Sublimer l’écrin...',
      items: ['Conception 3D', 'Finitions Or/Argent', 'Eco-luxe'],
      delay: '400ms'
    },
    {
      id: 'UIUX',
      title: 'UI/UX Web Design',
      icon: <Layout className="text-panda-gold" size={40} />,
      description: 'Expériences digitales intuitives et esthétiques.',
      hoverNote: 'Le design Web est une conversation. Nous la rendons fluide, élégante et persuasive.',
      clickMantra: 'Digitaliser l’élégance...',
      items: ['Prototypes Figma', 'Mobile-First', 'Interfaces interactives'],
      delay: '500ms'
    },
    {
      id: 'Creative',
      title: 'Galerie Créative',
      icon: <ImageIcon className="text-panda-gold" size={40} />,
      description: 'Projets artistiques et expérimentations visuelles.',
      hoverNote: 'Pour sortir des sentiers battus. L’audace créative est le meilleur levier de différenciation.',
      clickMantra: 'Libérer l’art...',
      items: ['Illustrations Premium', 'Retouche d\'art', 'Collages'],
      delay: '600ms'
    }
  ];

  const handleServiceClick = (e: React.MouseEvent, serviceId: string, mantra: string) => {
    // Effet visuel immédiat
    setFloatingText({
      id: Date.now(),
      text: mantra,
      x: e.clientX,
      y: e.clientY
    });

    // Navigation différée pour apprécier l'animation
    setTimeout(() => {
      navigate('/contact', { state: { selectedService: serviceId } });
    }, 850);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 antialiased relative">
      {/* Animation de texte flottant */}
      {floatingText && (
        <div 
          className="fixed pointer-events-none z-[999] font-display font-bold text-panda-gold uppercase tracking-[0.3em] text-xl md:text-2xl animate-in fade-out slide-out-to-top-40 duration-1000 fill-mode-forwards"
          style={{ left: floatingText.x - 100, top: floatingText.y - 50 }}
        >
          <div className="flex flex-col items-center">
            <Sparkles className="mb-2 animate-pulse" size={32} />
            <span className="drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">{floatingText.text}</span>
          </div>
        </div>
      )}

      <header className="mb-24 reveal text-center md:text-left">
        <div className="inline-block bg-panda-gold/10 border border-panda-gold/20 text-panda-gold px-6 py-2 rounded-full mb-6 text-xs font-bold uppercase tracking-[0.4em]">
          Catalogue d'Expertise
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 uppercase leading-none text-panda-black dark:text-panda-white">
          Mes <span className="text-panda-gold">Services</span>
        </h1>
        <p className="text-2xl text-panda-black/80 dark:text-panda-white/80 max-w-3xl font-light leading-relaxed">
          Propulsez votre marque avec Victor Gabriel Archange. Un design audacieux, des détails dorés et une vision sans compromis.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
        {serviceList.map((service, i) => (
          <div 
            key={i} 
            onClick={(e) => handleServiceClick(e, service.id, service.clickMantra)}
            className="reveal p-10 bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-[2.5rem] group hover:bg-panda-black/10 dark:hover:bg-panda-white/10 hover:border-panda-gold transition-all duration-700 relative overflow-hidden h-full flex flex-col cursor-pointer"
            style={{ transitionDelay: service.delay }}
          >
            {/* Texture de marbre subtile en arrière-plan */}
            <div className="absolute inset-0 marble-texture opacity-0 group-hover:opacity-5 transition-opacity duration-1000 pointer-events-none" />
            
            {/* Overlay description au survol */}
            <div className="absolute inset-0 bg-panda-black/90 p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex flex-col justify-center items-center text-center transform translate-y-full group-hover:translate-y-0 backdrop-blur-sm">
              <Sparkles className="text-panda-gold mb-6" size={32} />
              <h4 className="text-panda-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4">Note d'Expertise</h4>
              <p className="text-panda-white text-sm font-light leading-relaxed max-w-[200px]">
                "{service.hoverNote}"
              </p>
              <div className="mt-8 flex items-center space-x-2 text-panda-gold text-[10px] font-black uppercase tracking-widest animate-pulse">
                <span>Cliquer pour réserver</span>
                <ArrowRight size={12} />
              </div>
            </div>

            <div className="mb-8 transform group-hover:scale-110 transition-all duration-500">
              <div className="w-16 h-16 bg-panda-gold/10 flex items-center justify-center rounded-2xl border border-panda-gold/20">
                {service.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-display mb-4 uppercase tracking-tight group-hover:text-panda-gold transition-colors flex items-center justify-between text-panda-black dark:text-panda-white">
              <span>{service.title}</span>
              <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
            </h3>

            <p className="text-panda-black/70 dark:text-panda-white/70 mb-8 font-light text-sm leading-relaxed">
              {service.description}
            </p>
            
            <ul className="space-y-3 mt-auto relative z-10">
              {serviceList[i].items.map((item, j) => (
                <li key={j} className="flex items-center space-x-3 text-xs text-panda-black/80 dark:text-panda-white/80">
                  <CheckCircle2 size={14} className="text-panda-green opacity-70" />
                  <span className="tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section className="reveal relative group px-4">
        <div 
          onClick={() => navigate('/contact')}
          className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden cursor-pointer border border-panda-black/10 dark:border-panda-white/10 shadow-2xl transition-all duration-500 bg-white dark:bg-panda-black group-hover:border-panda-gold/50"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-panda-gold/10 blur-[80px] rounded-full group-hover:translate-x-10 transition-transform duration-1000" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-panda-green/10 blur-[80px] rounded-full group-hover:-translate-x-10 transition-transform duration-1000" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center space-x-3 bg-panda-gold/10 px-8 py-3 rounded-full mb-10 border border-panda-gold/20">
              <Zap size={16} className="text-panda-gold animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-panda-gold">Collaboration d'Exception</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 uppercase tracking-tighter text-panda-black dark:text-panda-white leading-none">
              Prêt à <span className="text-panda-gold">distinguer</span> <br/>votre marque ?
            </h2>
            
            <p className="text-xl md:text-2xl text-panda-black/70 dark:text-panda-white/70 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
              Ne vous contentez pas d'un simple design. Créons ensemble une <span className="text-panda-black dark:text-panda-white font-bold underline decoration-panda-gold decoration-[4px] underline-offset-[8px]">identité iconique</span> qui impose votre vision.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <button 
                className="group/btn relative px-16 py-6 bg-panda-gold text-panda-black font-black uppercase tracking-[0.3em] rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-panda-gold/20"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center text-sm">
                  Lancer mon projet <ArrowRight className="ml-4 group-hover/btn:translate-x-2 transition-transform" size={20} />
                </span>
              </button>
              
              <button className="flex items-center space-x-4 text-panda-black/60 dark:text-panda-white/60 hover:text-panda-gold transition-colors font-black uppercase tracking-[0.2em] text-[11px] group/link border-b-2 border-panda-black/5 dark:border-white/5 pb-2 hover:border-panda-gold">
                <MessageSquare size={18} className="group-hover/link:rotate-12 transition-transform" />
                <span>Poser une question</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:block absolute top-20 right-20 text-panda-black/5 dark:text-panda-white/5 animate-float">
            <Sparkles size={100} />
          </div>
          <div className="hidden lg:block absolute bottom-20 left-20 text-panda-black/5 dark:text-panda-white/5 animate-float-delayed">
            <Palette size={100} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

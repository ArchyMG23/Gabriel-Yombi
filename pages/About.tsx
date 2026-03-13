
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Quote, Award, Globe, Heart, Sparkles, Zap, Target } from 'lucide-react';

const About: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Intro Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
        <div className="relative animate-slide-up">
          <div className="absolute -inset-4 border-2 border-panda-gold translate-x-8 translate-y-8 -z-10 animate-float rounded-3xl" />
          <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl border border-panda-white/10">
            <img 
              src="https://picsum.photos/seed/victor/800/1000" 
              alt="Victor Gabriel Archange" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panda-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <span className="bg-panda-gold text-panda-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">{t.about.founder}</span>
            </div>
          </div>
        </div>
        <div className="animate-slide-up animate-delay-200">
          <span className="text-panda-gold font-display text-xs tracking-[0.6em] uppercase mb-8 block">{t.about.creator}</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-12 uppercase leading-none text-panda-black dark:text-panda-white">
            {t.about.title.split(' ').slice(0, -1).join(' ')} <br/> <span className="text-panda-gold">{t.about.title.split(' ').slice(-1)}</span>
          </h1>
          <div className="space-y-8 text-xl text-panda-black/70 dark:text-panda-white/70 leading-relaxed font-light">
            <p className="first-letter:text-5xl first-letter:text-panda-gold first-letter:font-display first-letter:mr-3 first-letter:float-left">
              {t.about.bio}
            </p>
            <p>
              {t.about.pseudonym}
            </p>
            <div className="pt-10 border-t border-panda-black/10 dark:border-panda-white/10 flex flex-col items-start relative overflow-hidden p-8 rounded-3xl bg-panda-black/5 dark:bg-panda-white/5">
              <Quote className="text-panda-gold/40 mb-6" size={50} />
              <p className="italic text-panda-black dark:text-panda-white font-medium text-2xl leading-relaxed relative z-10">
                {t.about.quote}
              </p>
              <div className="absolute top-0 right-0 w-32 h-32 marble-texture opacity-10 rounded-bl-full pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Values / Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40 reveal">
        {[
          { icon: <Sparkles size={40} />, title: t.about.pillars.excellence.title, desc: t.about.pillars.excellence.desc },
          { icon: <Zap size={40} />, title: t.about.pillars.impact.title, desc: t.about.pillars.impact.desc },
          { icon: <Target size={40} />, title: t.about.pillars.strategy.title, desc: t.about.pillars.strategy.desc }
        ].map((item, i) => (
          <div key={i} className="p-12 border border-panda-black/10 dark:border-panda-white/10 rounded-[2.5rem] bg-panda-black/5 dark:bg-panda-white/5 hover-gold-glow group transition-all duration-500">
            <div className="text-panda-gold mb-8 group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
            <h3 className="text-2xl font-display mb-4 uppercase tracking-tight text-panda-black dark:text-panda-white">{item.title}</h3>
            <p className="text-panda-black/70 dark:text-panda-white/50 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats Section with Marble Accents */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-panda-black/10 dark:border-panda-white/10 pt-20 reveal">
        {[
          { label: t.about.stats.projects, value: '150+' },
          { label: t.about.stats.countries, value: '12' },
          { label: t.about.stats.years, value: '8' },
          { label: t.about.stats.smiles, value: '100%' }
        ].map((stat, i) => (
          <div key={i} className="text-center group relative p-8">
            <div className="absolute inset-0 marble-texture opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-3xl -z-10" />
            <span className="text-5xl font-display font-bold text-panda-gold block mb-4 transform group-hover:scale-110 transition-transform duration-500">{stat.value}</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-panda-black/60 dark:text-panda-white/40 font-bold">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

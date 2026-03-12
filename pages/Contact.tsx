
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Send, MapPin, Phone, Facebook, CheckCircle, Check, 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  Sparkles
} from 'lucide-react';
import { Language, Appointment, AppSettings } from '../types';
import { TRANSLATIONS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactProps {
  lang: Language;
  onAddAppointment: (a: Appointment) => void;
  appointments: Appointment[];
  settings: AppSettings;
}

const AVAILABLE_SERVICES = [
  { id: 'Logotype', label: 'Logotype' },
  { id: 'Branding', label: 'Brand Identity' },
  { id: 'Social', label: 'Social Media' },
  { id: 'Packaging', label: 'Packaging' },
  { id: 'UIUX', label: 'Web Design' },
  { id: 'Creative', label: 'Galerie Créative' }
];

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
];

const Contact: React.FC<ContactProps> = ({ lang, onAddAppointment, appointments, settings }) => {
  const t = TRANSLATIONS[lang];
  const location = useLocation();
  
  // Form State
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    date: '', 
    time: '',
    description: '',
    services: [] as string[] 
  });
  const [submitted, setSubmitted] = useState(false);
  const [newsEmail, setNewsEmail] = useState('');

  // Calendar State
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Initialisation à partir de la page Services
  useEffect(() => {
    if (location.state && (location.state as any).selectedService) {
      const serviceId = (location.state as any).selectedService;
      setFormData(prev => ({
        ...prev,
        services: [serviceId]
      }));
    }
  }, [location.state]);

  const toggleService = (serviceId: string) => {
    setFormData(prev => {
      const isSelected = prev.services.includes(serviceId);
      if (isSelected) {
        return { ...prev, services: prev.services.filter(id => id !== serviceId) };
      } else {
        return { ...prev, services: [...prev.services, serviceId] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      alert(t.booking.alertService);
      return;
    }
    if (!formData.date || !formData.time) {
      alert(t.booking.alertDateTime);
      return;
    }
    onAddAppointment({
      id: Math.random().toString(36).substring(7),
      ...formData,
      status: 'pending'
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', date: '', time: '', description: '', services: [] });
  };

  // Calendar Logic
  const daysInMonth = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Adjust firstDay (0 is Sunday, let's make 0 Monday for common Euro display or keep 0 as Sunday)
    // Here we use 0-6 where 0 is Sunday
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysCount; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, [viewDate]);

  const monthName = viewDate.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' });

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + offset);
    setViewDate(newDate);
  };

  const selectDate = (date: Date) => {
    if (date < today) return;
    // Fix: Use local date string to avoid timezone shift
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    setFormData(prev => ({ ...prev, date: dateString, time: '' })); // Reset time when date changes
  };

  const isDateBusy = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    // A date is busy if all time slots are taken
    const busySlots = appointments.filter(a => a.date === dateString && a.status !== 'cancelled');
    return busySlots.length >= TIME_SLOTS.length;
  };

  const getBusySlotsForDate = (dateString: string) => {
    return appointments
      .filter(a => a.date === dateString && a.status !== 'cancelled')
      .map(a => a.time);
  };

  const handleSubscribe = async () => {
    if (!newsEmail) return;
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsEmail }),
      });
      if (response.ok) {
        alert(t.booking.thanksSubscribe);
        setNewsEmail('');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Info & Context */}
        <div className="lg:col-span-5 space-y-12">
          <header className="reveal">
            <div className="inline-block bg-panda-gold/10 border border-panda-gold/20 text-panda-gold px-4 py-1 rounded-full mb-6 text-[10px] font-black uppercase tracking-widest">
              {t.booking.headerTag}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none text-panda-black dark:text-panda-white">
              {t.booking.headerTitle.split(' ').slice(0, -1).join(' ')} <span className="text-panda-gold">{t.booking.headerTitle.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-lg md:text-xl text-panda-black/70 dark:text-panda-white/60 font-light leading-relaxed">
              {t.booking.headerDesc}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 reveal">
            <div className="p-8 bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-3xl group hover:border-panda-gold transition-all">
              <MapPin className="text-panda-gold mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xs font-black uppercase tracking-widest text-panda-black/60 dark:text-panda-white/40 mb-2">{t.booking.studio}</h4>
              <p className="text-sm font-medium text-panda-black dark:text-panda-white">Paris / Remote</p>
            </div>
            <div className="p-8 bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-3xl group hover:border-panda-gold transition-all">
              <Phone className="text-panda-gold mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xs font-black uppercase tracking-widest text-panda-black/60 dark:text-panda-white/40 mb-2">{t.booking.whatsapp}</h4>
              <p className="text-sm font-medium text-panda-black dark:text-panda-white">{settings.socialLinks.whatsapp}</p>
            </div>
          </div>

          <div className="reveal p-10 bg-panda-green/5 border border-panda-green/20 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-panda-green/20"><Sparkles size={40} /></div>
            <h3 className="font-display text-xl mb-6 uppercase tracking-tight text-panda-green">{t.newsletter.title}</h3>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder={t.newsletter.placeholder} 
                className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-6 py-4 rounded-xl focus:border-panda-gold outline-none text-sm text-panda-black dark:text-panda-white"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
              />
              <button 
                onClick={handleSubscribe}
                className="w-full bg-panda-gold text-panda-black py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-panda-gold/90 transition-all shadow-xl shadow-panda-gold/5"
              >
                {t.newsletter.submit}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 bg-white dark:bg-panda-white/5 p-8 md:p-12 rounded-[3rem] border border-panda-black/10 dark:border-panda-white/10 relative shadow-2xl reveal">
          <div className="absolute inset-0 marble-texture opacity-5 pointer-events-none rounded-[3rem]" />
          
          {submitted ? (
            <div className="h-[600px] flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-panda-green/20 rounded-full flex items-center justify-center text-panda-green mb-8 border border-panda-green/30">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-4xl font-display font-bold mb-4 uppercase tracking-tighter text-panda-black dark:text-panda-white">{t.booking.successTitle}</h3>
              <p className="text-panda-black/60 dark:text-panda-white/60 text-lg max-w-sm mx-auto font-light leading-relaxed">
                {t.booking.successDesc}
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-12 text-panda-gold font-black uppercase tracking-widest text-[10px] hover:underline"
              >
                {t.booking.anotherRequest}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
              {/* identity Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-panda-black/60 dark:text-panda-white/40 ml-2">{t.booking.identity}</label>
                  <input 
                    required
                    placeholder={t.booking.placeholderName}
                    className="w-full bg-panda-black/5 dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 px-6 py-5 rounded-2xl focus:border-panda-gold outline-none transition-all placeholder:text-panda-black/40 dark:placeholder:text-white/10 text-panda-black dark:text-panda-white"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-panda-black/60 dark:text-panda-white/40 ml-2">{t.booking.businessEmail}</label>
                  <input 
                    type="email" 
                    required
                    placeholder={t.booking.placeholderEmail}
                    className="w-full bg-panda-black/5 dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 px-6 py-5 rounded-2xl focus:border-panda-gold outline-none transition-all placeholder:text-panda-black/40 dark:placeholder:text-white/10 text-panda-black dark:text-panda-white"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-panda-black/60 dark:text-panda-white/40 ml-2">{t.booking.needDesc}</label>
                <textarea 
                  required
                  placeholder={t.booking.placeholderDesc}
                  className="w-full bg-panda-black/5 dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 px-6 py-5 rounded-2xl focus:border-panda-gold outline-none transition-all placeholder:text-panda-black/40 dark:placeholder:text-white/10 h-32 text-panda-black dark:text-panda-white"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Service Selection Chips */}
              <div className="space-y-6">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-panda-black/60 dark:text-panda-white/40 ml-2">{t.booking.requiredServices}</label>
                <div className="flex flex-wrap gap-3">
                  {AVAILABLE_SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={`flex items-center space-x-3 px-6 py-4 rounded-2xl border transition-all text-[11px] font-black uppercase tracking-widest group ${
                        formData.services.includes(s.id)
                        ? 'bg-panda-gold border-panda-gold text-panda-black shadow-xl shadow-panda-gold/20'
                        : 'bg-panda-black/5 dark:bg-panda-black/40 border-panda-black/10 dark:border-panda-white/10 text-panda-black/60 dark:text-panda-white/40 hover:border-panda-gold/50'
                      }`}
                    >
                      <span>{s.label}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        formData.services.includes(s.id) ? 'bg-panda-black text-panda-gold' : 'bg-panda-black/10 dark:bg-panda-white/10 group-hover:bg-panda-gold/20'
                      }`}>
                        {formData.services.includes(s.id) ? <Check size={12} strokeWidth={4} /> : <div className="w-1 h-1 rounded-full bg-current" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Calendar UI */}
              <div className="space-y-6">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-panda-black/60 dark:text-panda-white/40 ml-2 flex items-center space-x-2">
                  <CalendarIcon size={14} />
                  <span>{t.booking.chooseDate}</span>
                </label>
                
                <div className="bg-panda-black/5 dark:bg-panda-black/40 border border-panda-black/10 dark:border-panda-white/10 rounded-3xl p-4 md:p-8">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <button type="button" onClick={() => changeMonth(-1)} className="p-2 hover:bg-panda-black/5 dark:hover:bg-panda-white/5 rounded-full transition-colors text-panda-black dark:text-panda-white">
                      <ChevronLeft size={18} />
                    </button>
                    <h4 className="font-display text-sm md:text-lg uppercase tracking-widest text-panda-gold">{monthName}</h4>
                    <button type="button" onClick={() => changeMonth(1)} className="p-2 hover:bg-panda-black/5 dark:hover:bg-panda-white/5 rounded-full transition-colors text-panda-black dark:text-panda-white">
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-4">
                    {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
                      <span key={`${d}-${i}`} className="text-[8px] md:text-[9px] font-black text-panda-black/40 dark:text-panda-white/20">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 md:gap-2">
                    {daysInMonth.map((date, i) => {
                      if (!date) return <div key={i} className="aspect-square" />;
                      
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const day = String(date.getDate()).padStart(2, '0');
                      const dateString = `${year}-${month}-${day}`;
                      
                      const isSelected = formData.date === dateString;
                      const isPast = date < today;
                      const isToday = date.getTime() === today.getTime();
                      const isBusy = isDateBusy(date);

                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={isPast || isBusy}
                          onClick={() => selectDate(date)}
                          className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-bold transition-all relative overflow-hidden ${
                            isSelected 
                              ? 'bg-panda-gold text-panda-black scale-105 shadow-lg shadow-panda-gold/30' 
                              : isPast || isBusy
                                ? 'opacity-10 cursor-not-allowed' 
                                : 'bg-panda-black/5 dark:bg-panda-white/5 hover:bg-panda-black/10 dark:hover:bg-panda-white/10 text-panda-black/70 dark:text-panda-white/70'
                          }`}
                        >
                          {date.getDate()}
                          {isToday && !isSelected && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-panda-gold" />}
                          {isBusy && <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-red-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {formData.date && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="bg-panda-gold/10 border border-panda-gold/30 p-4 rounded-xl flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-panda-gold">{t.booking.selectedDate}</span>
                      <span className="text-sm font-bold text-panda-black dark:text-panda-white">{new Date(formData.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { dateStyle: 'full' })}</span>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-panda-black/60 dark:text-panda-white/40 ml-2">{t.booking.chooseTime}</label>
                      <div className="grid grid-cols-4 gap-3">
                        {TIME_SLOTS.map(slot => {
                          const isBusy = getBusySlotsForDate(formData.date).includes(slot);
                          const isSelected = formData.time === slot;

                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isBusy}
                              onClick={() => setFormData({ ...formData, time: slot })}
                              className={`py-3 rounded-xl text-[10px] font-black transition-all border ${
                                isSelected
                                  ? 'bg-panda-gold border-panda-gold text-panda-black'
                                  : isBusy
                                    ? 'opacity-20 cursor-not-allowed border-panda-black/10 dark:border-panda-white/10'
                                    : 'bg-panda-black/5 dark:bg-panda-black/40 border-panda-black/10 dark:border-panda-white/10 text-panda-black/60 dark:text-panda-white/60 hover:border-panda-gold'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-panda-gold text-panda-black font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-panda-gold/90 transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-2xl shadow-panda-gold/20 flex items-center justify-center space-x-4 group"
              >
                <span>{t.booking.finalize}</span>
                <Send size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;

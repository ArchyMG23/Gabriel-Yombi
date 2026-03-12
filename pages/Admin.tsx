
import React, { useState, useRef } from 'react';
// Add missing icons Heart and MessageCircle to the imports
import { 
  Plus, Trash2, Calendar, Layout, BookOpen, 
  Sparkles, Loader2, Mail, Lock, Unlock, 
  ArrowRight, Upload, ImageIcon, Film, X, FileText, CheckCircle, Clock, User,
  Heart, MessageCircle, Settings
} from 'lucide-react';
import { Project, BlogPost, Appointment, ProjectCategory, Language, AppSettings } from '../types';
import { CATEGORIES } from '../constants';

interface AdminProps {
  lang: Language;
  projects: Project[];
  posts: BlogPost[];
  appointments: Appointment[];
  onAddProject: (p: Project) => void;
  onDeleteProject: (id: string) => void;
  onAddPost: (p: BlogPost) => void;
  onDeletePost: (id: string) => void;
  onUpdateAppointment: (a: Appointment) => void;
  onDeleteAppointment: (id: string) => void;
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const ADMIN_CODE = "PANDA2025";

const Admin: React.FC<AdminProps> = ({ 
  lang, projects, posts, appointments, 
  onAddProject, onDeleteProject, onAddPost, onDeletePost,
  onUpdateAppointment, onDeleteAppointment,
  settings, onUpdateSettings,
  isAdmin, setIsAdmin
}) => {
  const [tab, setTab] = useState<'projects' | 'blog' | 'appointments' | 'settings'>('projects');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Settings form states
  const [fbLink, setFbLink] = useState(settings.socialLinks.facebook);
  const [igLink, setIgLink] = useState(settings.socialLinks.instagram);
  const [waNumber, setWaNumber] = useState(settings.socialLinks.whatsapp);

  // Appointment edit states
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editStatus, setEditStatus] = useState<'pending' | 'confirmed' | 'cancelled'>('pending');
  
  // Project form states
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectCaseStudy, setNewProjectCaseStudy] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState<ProjectCategory>(ProjectCategory.GALLERY);
  const [previewMedia, setPreviewMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Blog form states
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogMedia, setBlogMedia] = useState<string | null>(null);
  const [blogMediaType, setBlogMediaType] = useState<'image' | 'video'>('image');
  const blogFileInputRef = useRef<HTMLInputElement>(null);

  // Auth state
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      setIsAdmin(true);
      setError(false);
    } else {
      setError(true);
      setCode('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'project' | 'blog') => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'project') {
          setMediaType(isVideo ? 'video' : 'image');
          setPreviewMedia(reader.result as string);
        } else {
          setBlogMediaType(isVideo ? 'video' : 'image');
          setBlogMedia(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetProjectForm = () => {
    setNewProjectTitle('');
    setNewProjectDesc('');
    setNewProjectCaseStudy('');
    setPreviewMedia(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetBlogForm = () => {
    setBlogTitle('');
    setBlogContent('');
    setBlogMedia(null);
    if (blogFileInputRef.current) blogFileInputRef.current.value = '';
  };

  const handleAddProject = async () => {
    if (!newProjectTitle || !previewMedia) return;
    setIsGenerating(true);
    try {
      // No more translation API, use the same text for all languages for now
      const project: Project = {
        id: Math.random().toString(36).substring(7),
        title: { fr: newProjectTitle, en: newProjectTitle, de: newProjectTitle },
        category: newProjectCategory,
        image: previewMedia,
        mediaType: mediaType,
        description: { fr: newProjectDesc, en: newProjectDesc, de: newProjectDesc },
        caseStudy: { fr: newProjectCaseStudy, en: newProjectCaseStudy, de: newProjectCaseStudy }
      };

      onAddProject(project);
      resetProjectForm();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddBlogPost = async () => {
    if (!blogTitle || !blogMedia) return;
    setIsGenerating(true);
    try {
      const post: BlogPost = {
        id: Math.random().toString(36).substring(7),
        title: { fr: blogTitle, en: blogTitle, de: blogTitle },
        content: { fr: blogContent, en: blogContent, de: blogContent },
        image: blogMedia,
        mediaType: blogMediaType,
        date: new Date().toLocaleDateString('fr-FR'),
        likes: 0,
        comments: []
      };

      onAddPost(post);
      resetBlogForm();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveSettings = () => {
    onUpdateSettings({
      socialLinks: {
        facebook: fbLink,
        instagram: igLink,
        whatsapp: waNumber
      }
    });
    alert('Paramètres enregistrés !');
  };

  const handleEditAppointment = (app: Appointment) => {
    setEditingAppointment(app);
    setEditDate(app.date);
    setEditTime(app.time || '');
    setEditStatus(app.status);
  };

  const handleSaveAppointment = () => {
    if (!editingAppointment) return;
    const updated = {
      ...editingAppointment,
      date: editDate,
      time: editTime,
      status: editStatus
    };
    onUpdateAppointment(updated);
    setEditingAppointment(null);
    alert('Rendez-vous mis à jour ! Le client a été notifié (simulation).');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 p-12 rounded-[2.5rem] text-center backdrop-blur-xl shadow-2xl">
          <div className="w-20 h-20 bg-panda-gold/10 text-panda-gold rounded-full flex items-center justify-center mx-auto mb-8 border border-panda-gold/20">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2 uppercase tracking-tighter text-panda-black dark:text-panda-white">Accès Réservé</h1>
          <p className="text-panda-black/40 dark:text-panda-white/40 text-sm mb-10 font-light">Espace administrateur Panda_Graphic</p>
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="password"
              placeholder="••••••••"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              className={`w-full bg-panda-black/5 dark:bg-panda-black border px-6 py-4 rounded-xl outline-none text-center text-2xl tracking-[0.5em] transition-all text-panda-black dark:text-panda-white ${
                error ? 'border-red-500 animate-shake' : 'border-panda-black/10 dark:border-panda-white/10 focus:border-panda-gold'
              }`}
            />
            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">Code incorrect</p>}
            <button className="w-full py-5 bg-panda-gold text-panda-black font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-panda-gold/90 transition-all flex items-center justify-center space-x-3">
              <span>DÉBLOQUER</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in duration-700 relative z-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div className="flex items-center space-x-6">
          <div className="p-4 bg-panda-green/20 text-panda-green rounded-2xl border border-panda-green/30">
            <Unlock size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold uppercase tracking-tighter text-panda-black dark:text-panda-white">Dashboard <span className="text-panda-gold">Victor</span></h1>
            <p className="text-panda-black/40 dark:text-panda-white/40 font-light">Gestion du portfolio et du blog</p>
          </div>
        </div>
        <div className="flex bg-panda-black/5 dark:bg-panda-white/5 p-1 rounded-2xl border border-panda-black/10 dark:border-panda-white/10 overflow-x-auto no-scrollbar">
          {[
            { id: 'projects', icon: <Layout size={18} />, label: 'Portfolio' },
            { id: 'blog', icon: <BookOpen size={18} />, label: 'Blog' },
            { id: 'appointments', icon: <Calendar size={18} />, label: 'Rendez-vous' },
            { id: 'settings', icon: <Settings size={18} />, label: 'Settings' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all uppercase tracking-[0.2em] text-[10px] font-black whitespace-nowrap ${
                tab === t.id ? 'bg-panda-gold text-panda-black shadow-lg shadow-panda-gold/20' : 'hover:bg-panda-black/5 dark:hover:bg-panda-white/5 text-panda-black/40 dark:text-panda-white/40 hover:text-panda-black dark:hover:text-panda-white'
              }`}
            >
              {t.icon} <span>{t.label}</span>
            </button>
          ))}
        </div>
      </header>

      {tab === 'projects' && (
        <div className="space-y-12">
          <div className="bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 p-10 rounded-[2.5rem]">
            <h3 className="text-2xl font-display font-bold mb-8 flex items-center space-x-3 uppercase tracking-tighter text-panda-black dark:text-panda-white">
              <Plus size={24} className="text-panda-gold" /> 
              <span>Ajouter une réalisation</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <input 
                  placeholder="Titre du Projet" 
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold text-panda-black dark:text-panda-white" 
                />
                <select 
                  value={newProjectCategory}
                  onChange={(e) => setNewProjectCategory(e.target.value as ProjectCategory)}
                  className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold text-panda-black dark:text-panda-white"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <textarea 
                  placeholder="Description Courte" 
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold h-24 text-panda-black dark:text-panda-white" 
                />
                <textarea 
                  placeholder="Étude de Cas / Processus" 
                  value={newProjectCaseStudy}
                  onChange={(e) => setNewProjectCaseStudy(e.target.value)}
                  className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold h-40 text-panda-black dark:text-panda-white" 
                />
                <button 
                  onClick={handleAddProject}
                  disabled={!newProjectTitle || !previewMedia || isGenerating}
                  className="w-full py-5 bg-panda-gold text-panda-black font-black uppercase tracking-widest rounded-2xl disabled:opacity-30 flex items-center justify-center space-x-3"
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={20} /> : 'PUBLIER LA RÉALISATION'}
                </button>
              </div>
              <div className="flex flex-col">
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" onChange={(e) => handleFileChange(e, 'project')} />
                <div onClick={() => fileInputRef.current?.click()} className="flex-1 border-2 border-dashed border-panda-white/10 rounded-[2.5rem] flex items-center justify-center bg-panda-black/30 overflow-hidden relative cursor-pointer hover:border-panda-gold/50 transition-all group">
                   {previewMedia ? (
                     <div className="w-full h-full relative">
                        {mediaType === 'image' ? <img src={previewMedia} className="w-full h-full object-cover" /> : <video src={previewMedia} className="w-full h-full object-cover" />}
                        <div className="absolute inset-0 bg-panda-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                           <Upload className="text-panda-gold" size={48} />
                        </div>
                     </div>
                   ) : (
                     <div className="text-center opacity-30 uppercase font-black tracking-widest text-[10px] space-y-4">
                        <ImageIcon size={48} className="mx-auto mb-4" />
                        <div>Cliquer pour charger un média</div>
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {projects.map(p => (
               <div key={p.id} className="p-6 bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-3xl flex flex-col group relative overflow-hidden">
                 <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-panda-black">
                    {p.mediaType === 'image' ? <img src={p.image} className="w-full h-full object-cover" /> : <video src={p.image} className="w-full h-full object-cover" />}
                 </div>
                 <h4 className="font-bold text-lg mb-1 text-panda-black dark:text-panda-white">{p.title[lang]}</h4>
                 <span className="text-xs text-panda-gold uppercase tracking-widest font-black">{p.category}</span>
                 <button onClick={() => onDeleteProject(p.id)} className="absolute top-8 right-8 p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-xl"><Trash2 size={18} /></button>
               </div>
             ))}
          </div>
        </div>
      )}

      {tab === 'blog' && (
        <div className="space-y-12">
          <div className="bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 p-10 rounded-[2.5rem]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
               <h3 className="text-2xl font-display font-bold flex items-center space-x-3 uppercase tracking-tighter text-panda-black dark:text-panda-white">
                 <BookOpen size={24} className="text-panda-gold" /> 
                 <span>Nouvel Article</span>
               </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="space-y-6">
                 <input 
                    placeholder="Titre de l'article" 
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold text-panda-black dark:text-panda-white" 
                 />
                 <textarea 
                    placeholder="Contenu de l'article" 
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold h-64 text-panda-black dark:text-panda-white" 
                 />
                 <button 
                    onClick={handleAddBlogPost}
                    disabled={!blogTitle || !blogMedia || isGenerating}
                    className="w-full py-5 bg-panda-gold text-panda-black font-black uppercase tracking-widest rounded-2xl disabled:opacity-30 flex items-center justify-center space-x-3"
                 >
                   {isGenerating ? <Loader2 className="animate-spin" size={20} /> : 'PUBLIER L\'ARTICLE'}
                 </button>
               </div>
               <div className="flex flex-col">
                 <input type="file" ref={blogFileInputRef} className="hidden" accept="image/*,video/*" onChange={(e) => handleFileChange(e, 'blog')} />
                 <div onClick={() => blogFileInputRef.current?.click()} className="flex-1 border-2 border-dashed border-panda-black/10 dark:border-panda-white/10 rounded-[2.5rem] flex items-center justify-center bg-panda-black/30 overflow-hidden relative cursor-pointer hover:border-panda-gold/50 transition-all group">
                   {blogMedia ? (
                     <div className="w-full h-full relative">
                        {blogMediaType === 'image' ? <img src={blogMedia} className="w-full h-full object-cover" /> : <video src={blogMedia} className="w-full h-full object-cover" />}
                        <div className="absolute inset-0 bg-panda-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                           <Upload className="text-panda-gold" size={48} />
                        </div>
                     </div>
                   ) : (
                     <div className="text-center opacity-30 uppercase font-black tracking-widest text-[10px] space-y-4">
                        <ImageIcon size={48} className="mx-auto mb-4" />
                        <div>Média de couverture</div>
                     </div>
                   )}
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-4">
             {posts.map(p => (
               <div key={p.id} className="flex items-center justify-between p-6 bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-3xl hover:border-panda-gold/30 transition-all group overflow-hidden">
                 <div className="flex items-center space-x-6">
                   <div className="w-20 h-20 rounded-xl overflow-hidden bg-panda-black border border-white/5">
                      {p.mediaType === 'image' ? <img src={p.image} className="w-full h-full object-cover" /> : <video src={p.image} className="w-full h-full object-cover" />}
                   </div>
                   <div>
                      <h4 className="font-bold text-lg text-panda-black dark:text-panda-white">{p.title[lang]}</h4>
                      <div className="flex items-center space-x-4 text-[10px] uppercase font-black tracking-widest text-panda-black/30 dark:text-panda-white/30">
                        <span className="flex items-center space-x-1"><Calendar size={10} /> <span>{p.date}</span></span>
                        <span className="flex items-center space-x-1"><Heart size={10} className="fill-panda-gold" /> <span>{p.likes} Likes</span></span>
                        <span className="flex items-center space-x-1"><MessageCircle size={10} /> <span>{p.comments.length} Commentaires</span></span>
                      </div>
                   </div>
                 </div>
                 <button onClick={() => onDeletePost(p.id)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg"><Trash2 size={20} /></button>
               </div>
             ))}
          </div>
        </div>
      )}

      {tab === 'appointments' && (
        <div className="space-y-6">
          {appointments.length === 0 ? (
            <div className="text-center py-40 bg-panda-black/5 dark:bg-panda-white/5 border border-dashed border-panda-black/10 dark:border-panda-white/10 rounded-[3rem]">
               <Calendar size={60} className="mx-auto mb-6 text-panda-black/10 dark:text-panda-white/10" />
               <p className="text-panda-black/40 dark:text-panda-white/40 uppercase tracking-widest font-black text-xs">Aucun rendez-vous planifié pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
               {appointments.map(app => (
                 <div key={app.id} className="p-8 bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-panda-black/10 dark:hover:bg-panda-white/10 transition-all group">
                    <div className="flex items-center space-x-6">
                       <div className="w-16 h-16 bg-panda-gold/10 rounded-2xl flex items-center justify-center text-panda-gold border border-panda-gold/20 group-hover:scale-110 transition-transform">
                          <User size={24} />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold mb-1 text-panda-black dark:text-panda-white">{app.name}</h4>
                          <div className="flex flex-wrap gap-4 text-[10px] uppercase font-black tracking-widest">
                             <span className="flex items-center space-x-2 text-panda-black/60 dark:text-panda-white/60"><Mail size={12} /> <span>{app.email}</span></span>
                             <div className="flex items-center space-x-2 text-panda-gold bg-panda-gold/10 px-3 py-1 rounded-lg">
                               <Sparkles size={12} /> 
                               <span>{app.services && Array.isArray(app.services) ? app.services.join(', ') : 'Aucun service'}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                       <div className="text-right">
                          <div className="flex items-center space-x-2 text-panda-black/80 dark:text-panda-white/80 font-bold mb-1">
                             <Calendar size={14} className="text-panda-gold" />
                             <span>{new Date(app.date).toLocaleDateString()}</span>
                          </div>
                          <div className={`text-[9px] uppercase font-black tracking-widest flex items-center justify-end space-x-2 ${app.status === 'confirmed' ? 'text-panda-green' : 'text-amber-500'}`}>
                             {app.status === 'confirmed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                             <span>{app.status === 'confirmed' ? 'Confirmé' : 'En attente'}</span>
                          </div>
                       </div>
                       <button className="p-4 bg-panda-black/5 dark:bg-panda-white/5 rounded-2xl hover:bg-panda-gold hover:text-panda-black transition-all text-panda-black dark:text-panda-white">
                          <FileText size={20} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;

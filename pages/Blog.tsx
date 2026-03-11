
import React, { useState, useEffect } from 'react';
import { BlogPost, Language, BlogComment } from '../types';
import { 
  Calendar, User, ArrowRight, Heart, MessageCircle, 
  Share2, X, Send, Film, Image as ImageIcon, Sparkles, Check
} from 'lucide-react';

interface BlogProps {
  lang: Language;
  posts: BlogPost[];
  onUpdatePost: (post: BlogPost) => void;
  isAdmin: boolean;
}

const Blog: React.FC<BlogProps> = ({ lang, posts, onUpdatePost, isAdmin }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  useEffect(() => {
    const savedLikes = localStorage.getItem('panda_likes');
    if (savedLikes) setLikedPosts(JSON.parse(savedLikes));
  }, []);

  const handleLike = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Si déjà liké et pas admin, on ne fait rien
    const alreadyLiked = likedPosts.includes(post.id);
    if (alreadyLiked && !isAdmin) return;

    // Mise à jour de l'article (incrémenter les likes)
    const updatedPost = { ...post, likes: post.likes + 1 };
    onUpdatePost(updatedPost);
    if (selectedPost?.id === post.id) setSelectedPost(updatedPost);

    // Enregistrer le like localement si ce n'est pas l'admin
    if (!isAdmin) {
      const newLikedPosts = [...likedPosts, post.id];
      setLikedPosts(newLikedPosts);
      localStorage.setItem('panda_likes', JSON.stringify(newLikedPosts));
    }
  };

  const handleShare = async (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Génération d'une URL propre incluant le hash pour le routage React
    const shareUrl = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
    
    const shareData = {
      title: post.title[lang],
      text: `Découvrez cet article sur Panda_Graphic : ${post.title[lang]}`,
      url: shareUrl,
    };

    try {
      // Tentative de partage via l'API Web Share (mobile)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        throw new Error('Web Share API non supportée ou non autorisée');
      }
    } catch (err) {
      // Fallback : Copie dans le presse-papier
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus(post.id);
        // On réinitialise l'état après 3 secondes
        setTimeout(() => setShareStatus(null), 3000);
      } catch (clipErr) {
        console.error('Impossible de copier le lien :', clipErr);
        alert('Lien : ' + shareUrl); // Dernier recours
      }
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentName || !commentText) return;

    const newComment: BlogComment = {
      id: Math.random().toString(36).substring(7),
      author: commentName,
      text: commentText,
      date: new Date().toLocaleDateString()
    };

    const updatedPost = {
      ...selectedPost,
      comments: [newComment, ...selectedPost.comments]
    };

    onUpdatePost(updatedPost);
    setSelectedPost(updatedPost);
    setCommentName('');
    setCommentText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <header className="mb-24 reveal text-center">
        <div className="inline-flex items-center space-x-3 mb-6 bg-panda-white/5 px-6 py-2 rounded-full border border-white/10">
          <Sparkles size={16} className="text-panda-gold animate-pulse" />
          <span className="text-panda-gold font-display text-xs tracking-[0.5em] uppercase block">Pensées & Insights</span>
        </div>
        <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 uppercase leading-none">
          L'ATELIER <span className="text-panda-gold">BLOG</span>
        </h1>
        <p className="text-xl md:text-2xl text-panda-white/60 max-w-3xl mx-auto font-light leading-relaxed">
          Décryptage des tendances, coulisses de création et réflexions sur le design de prestige par Victor Gabriel Archange.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-40 border border-dashed border-panda-white/10 rounded-[3rem] bg-panda-white/5">
          <p className="text-panda-white/40 italic uppercase tracking-widest text-xs font-bold">De nouveaux articles arrivent bientôt...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {posts.map((post) => (
            <article 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className="reveal group cursor-pointer relative"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-10 bg-panda-white/5 border border-panda-white/10 relative shadow-2xl transition-all duration-700 group-hover:border-panda-gold/50">
                {post.mediaType === 'video' ? (
                  <video 
                    src={post.image} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                ) : (
                  <img 
                    src={post.image} 
                    alt={post.title[lang]} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                )}
                <div className="absolute top-6 right-6 p-3 bg-panda-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-panda-gold">
                  {post.mediaType === 'video' ? <Film size={18} /> : <ImageIcon size={18} />}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-6 text-[10px] uppercase font-black tracking-widest text-panda-gold">
                  <span className="flex items-center space-x-2 bg-panda-gold/10 px-3 py-1 rounded-lg">
                    <Calendar size={12}/> <span>{post.date}</span>
                  </span>
                  <span className="flex items-center space-x-2 text-panda-white/40">
                    <User size={12}/> <span>Victor</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={(e) => handleLike(post, e)}
                    disabled={likedPosts.includes(post.id) && !isAdmin}
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      likedPosts.includes(post.id) && !isAdmin
                        ? "text-panda-gold cursor-default" 
                        : "text-panda-white/40 hover:text-red-500"
                    }`}
                  >
                    {likedPosts.includes(post.id) && !isAdmin ? (
                       <div className="flex items-center space-x-2 bg-panda-gold/20 px-3 py-1 rounded-full border border-panda-gold/30">
                         <Check size={14} className="text-panda-gold" />
                         <span className="text-xs font-black">{post.likes}</span>
                       </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Heart size={16} className={post.likes > 0 ? "fill-red-500 text-red-500" : ""} />
                        <span className="text-xs font-bold">{post.likes}</span>
                      </div>
                    )}
                  </button>
                  <button 
                    onClick={(e) => handleShare(post, e)}
                    className={`p-2 transition-all duration-300 flex items-center space-x-2 rounded-lg ${
                      shareStatus === post.id ? "text-panda-green bg-panda-green/10 px-3" : "text-panda-white/40 hover:text-panda-gold"
                    }`}
                  >
                    {shareStatus === post.id ? (
                      <>
                        <Check size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Lien copié</span>
                      </>
                    ) : (
                      <Share2 size={16} />
                    )}
                  </button>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-display mb-6 group-hover:text-panda-gold transition-colors leading-tight uppercase tracking-tighter">
                {post.title[lang]}
              </h2>
              <p className="text-panda-white/50 line-clamp-2 mb-8 leading-relaxed font-light text-lg">
                {post.content[lang]}
              </p>
              
              <div className="flex items-center space-x-3 text-panda-gold font-black uppercase tracking-widest text-[10px] group-hover:translate-x-3 transition-transform duration-500">
                <span>Découvrir l'article</span>
                <ArrowRight size={14} />
              </div>
            </article>
          ))}
        </div>
      )}

      {/* DETAILED BLOG MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-panda-black/98 backdrop-blur-3xl" onClick={() => setSelectedPost(null)} />
          
          <div className="relative w-full max-w-5xl bg-panda-black border border-panda-white/10 rounded-[3rem] overflow-hidden flex flex-col max-h-[92vh] shadow-2xl">
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-8 right-8 z-20 p-4 bg-panda-white/10 text-white rounded-full hover:bg-panda-gold hover:text-panda-black transition-all"
            >
              <X size={24} />
            </button>

            <div className="overflow-y-auto custom-scrollbar">
              <div className="w-full aspect-video bg-panda-black/50 relative">
                {selectedPost.mediaType === 'video' ? (
                  <video src={selectedPost.image} autoPlay loop muted playsInline className="w-full h-full object-cover" controls />
                ) : (
                  <img src={selectedPost.image} alt={selectedPost.title[lang]} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-panda-black via-transparent to-transparent" />
              </div>

              <div className="px-8 md:px-20 py-16">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-[0.4em] text-panda-gold">
                      <span>{selectedPost.date}</span>
                      <span className="w-2 h-2 bg-panda-white/10 rounded-full" />
                      <span className="text-panda-white/30">Par Victor Gabriel Archange</span>
                   </div>
                   <div className="flex items-center space-x-6">
                      <button 
                        onClick={(e) => handleLike(selectedPost, e)}
                        disabled={likedPosts.includes(selectedPost.id) && !isAdmin}
                        className={`flex items-center space-x-3 transition-all duration-300 ${
                          likedPosts.includes(selectedPost.id) && !isAdmin
                            ? "text-panda-gold" 
                            : "text-panda-white group"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          likedPosts.includes(selectedPost.id) && !isAdmin
                            ? "bg-panda-gold text-panda-black"
                            : "bg-panda-white/5 group-hover:bg-red-500/10 group-hover:text-red-500"
                        }`}>
                          {likedPosts.includes(selectedPost.id) && !isAdmin ? (
                            <Check size={20} className="fill-none text-panda-black" strokeWidth={3} />
                          ) : (
                            <Heart size={20} className={selectedPost.likes > 0 ? "fill-red-500 text-red-500" : ""} />
                          )}
                        </div>
                        <span className="font-bold">{selectedPost.likes} <span className="text-[10px] text-panda-white/40 uppercase">Likes</span></span>
                      </button>
                      <button 
                        onClick={(e) => handleShare(selectedPost, e)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          shareStatus === selectedPost.id ? "bg-panda-green text-white" : "bg-panda-white/5 hover:bg-panda-gold hover:text-panda-black"
                        }`}
                      >
                        {shareStatus === selectedPost.id ? <Check size={20} /> : <Share2 size={20} />}
                      </button>
                   </div>
                </div>

                <h2 className="text-4xl md:text-7xl font-display font-bold mb-12 uppercase tracking-tighter leading-none border-b border-panda-white/10 pb-12">
                  {selectedPost.title[lang]}
                </h2>

                <div className="prose prose-invert max-w-none mb-24">
                  <p className="text-2xl text-panda-white/70 leading-relaxed font-light whitespace-pre-line first-letter:text-7xl first-letter:font-display first-letter:text-panda-gold first-letter:mr-4 first-letter:float-left">
                    {selectedPost.content[lang]}
                  </p>
                </div>

                <div className="pt-20 border-t border-panda-white/10">
                   <div className="flex items-center space-x-4 mb-12">
                      <MessageCircle size={24} className="text-panda-gold" />
                      <h3 className="text-2xl font-display uppercase tracking-tighter">Commentaires <span className="text-panda-white/20 text-lg">({selectedPost.comments.length})</span></h3>
                   </div>

                   <form onSubmit={handleAddComment} className="bg-panda-white/5 border border-panda-white/10 p-10 rounded-[2.5rem] mb-16">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                           <label className="text-[10px] uppercase font-black tracking-widest text-panda-gold block ml-2">Votre Nom</label>
                           <input 
                              placeholder="Archange Yombi"
                              value={commentName}
                              onChange={(e) => setCommentName(e.target.value)}
                              className="w-full bg-panda-black/50 border border-panda-white/10 px-6 py-4 rounded-2xl outline-none focus:border-panda-gold transition-all"
                              required
                           />
                        </div>
                      </div>
                      <div className="space-y-2 mb-8">
                         <label className="text-[10px] uppercase font-black tracking-widest text-panda-gold block ml-2">Votre Réaction</label>
                         <textarea 
                            placeholder="Partagez vos impressions..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full bg-panda-black/50 border border-panda-white/10 px-6 py-4 rounded-2xl outline-none focus:border-panda-gold transition-all h-32"
                            required
                         />
                      </div>
                      <button className="px-12 py-4 bg-panda-gold text-panda-black font-bold uppercase tracking-widest text-xs rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-3 shadow-xl shadow-panda-gold/10">
                         <span>Envoyer mon avis</span>
                         <Send size={16} />
                      </button>
                   </form>

                   <div className="space-y-8">
                      {selectedPost.comments.length === 0 ? (
                        <p className="text-panda-white/20 italic text-center py-10 uppercase tracking-widest text-[10px]">Soyez le premier à réagir...</p>
                      ) : (
                        selectedPost.comments.map((comment) => (
                          <div key={comment.id} className="p-8 bg-panda-white/5 border border-panda-white/5 rounded-3xl flex items-start space-x-6">
                            <div className="w-12 h-12 rounded-full bg-panda-gold/20 flex items-center justify-center text-panda-gold font-bold shrink-0">
                               {comment.author.charAt(0)}
                            </div>
                            <div>
                               <div className="flex items-center space-x-4 mb-2">
                                  <h4 className="font-bold text-panda-white">{comment.author}</h4>
                                  <span className="text-[10px] text-panda-white/20 uppercase tracking-widest">{comment.date}</span>
                               </div>
                               <p className="text-panda-white/60 leading-relaxed">{comment.text}</p>
                            </div>
                          </div>
                        ))
                      )}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;

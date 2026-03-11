
import { ProjectCategory, Project, BlogPost } from './types';

export const TRANSLATIONS = {
  fr: {
    nav: { home: 'Accueil', portfolio: 'Portfolio', services: 'Services', about: 'À Propos', blog: 'Blog', contact: 'Contact' },
    hero: { title: 'Panda_Graphic', subtitle: 'L\'excellence visuelle par Victor Gabriel Archange', cta: 'Voir mes travaux' },
    services: { title: 'Mes Expertises', subtitle: 'Des solutions créatives pour votre marque' },
    about: { title: 'Victor Gabriel Archange', bio: 'Designer graphique passionné, je transforme vos idées en identités visuelles audacieuses. Avec une approche mêlant minimalisme et élégance "Bambout-Or", j\'accompagne les marques dans leur ascension.' },
    booking: { title: 'Prendre RDV', name: 'Nom', email: 'Email', date: 'Date souhaitée', service: 'Service', submit: 'Réserver' },
    newsletter: { title: 'Newsletter', placeholder: 'Votre email', submit: 'S\'abonner' },
  },
  en: {
    nav: { home: 'Home', portfolio: 'Portfolio', services: 'Services', about: 'About', blog: 'Blog', contact: 'Contact' },
    hero: { title: 'Panda_Graphic', subtitle: 'Visual Excellence by Victor Gabriel Archange', cta: 'Explore Work' },
    services: { title: 'My Expertise', subtitle: 'Creative solutions for your brand' },
    about: { title: 'Victor Gabriel Archange', bio: 'Passionate graphic designer, I transform your ideas into bold visual identities. Using a blend of minimalism and "Bamboo-Gold" elegance, I help brands rise.' },
    booking: { title: 'Book an Appointment', name: 'Name', email: 'Email', date: 'Desired Date', service: 'Service', submit: 'Book Now' },
    newsletter: { title: 'Newsletter', placeholder: 'Your email', submit: 'Subscribe' },
  },
  de: {
    nav: { home: 'Startseite', portfolio: 'Portfolio', services: 'Dienstleistungen', about: 'Über mich', blog: 'Blog', contact: 'Kontakt' },
    hero: { title: 'Panda_Graphic', subtitle: 'Visuelle Exzellenz von Victor Gabriel Archange', cta: 'Arbeit ansehen' },
    services: { title: 'Meine Expertise', subtitle: 'Kreative Lösungen für Ihre Marke' },
    about: { title: 'Victor Gabriel Archange', bio: 'Leidenschaftlicher Grafikdesigner, ich verwandle Ihre Ideen in mutige visuelle Identitäten. Mit einer Mischung aus Minimalismus und "Bambus-Gold" Eleganz begleite ich Marken auf ihrem Aufstieg.' },
    booking: { title: 'Termin vereinbaren', name: 'Name', email: 'Email', date: 'Datum', service: 'Dienstleistung', submit: 'Buchen' },
    newsletter: { title: 'Newsletter', placeholder: 'Ihre E-Mail', submit: 'Abonnieren' },
  }
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: { fr: 'Identity Zen', en: 'Zen Identity', de: 'Zen Identität' },
    category: ProjectCategory.BRANDING,
    image: 'https://picsum.photos/seed/design1/800/600',
    mediaType: 'image',
    description: { fr: 'Une identité épurée pour spa de luxe.', en: 'Minimalist identity for luxury spa.', de: 'Minimalistische Identität für Luxus-Spa.' },
    caseStudy: { fr: 'Analyse du besoin : Le client souhaitait une image apaisante. Solution : Utilisation de tons pastels et de lignes fluides.', en: 'Need analysis: The client wanted a soothing image. Solution: Use of pastel tones and fluid lines.', de: 'Bedarfsanalyse: Der Kunde wünschte sich ein beruhigendes Image. Lösung: Verwendung von Pastelltönen und flüssigen Linien.' }
  },
  {
    id: '2',
    title: { fr: 'Vibe Social', en: 'Social Vibe', de: 'Social Vibe' },
    category: ProjectCategory.SOCIAL,
    image: 'https://picsum.photos/seed/design2/800/600',
    mediaType: 'image',
    description: { fr: 'Gestion de campagne Instagram.', en: 'Instagram campaign management.', de: 'Instagram-Kampagnenmanagement.' },
    caseStudy: { fr: 'Objectif : Augmenter l\'engagement de 20%. Résultat : +45% d\'interaction grâce à une grille visuelle harmonieuse.', en: 'Objective: Increase engagement by 20%. Result: +45% interaction thanks to a harmonious visual grid.', de: 'Ziel: Engagement um 20% steigern. Ergebnis: +45% Interaktion dank eines harmonischen visuellen Rasters.' }
  },
  {
    id: '3',
    title: { fr: 'Organic Pack', en: 'Organic Pack', de: 'Bio-Packung' },
    category: ProjectCategory.PACKAGING,
    image: 'https://picsum.photos/seed/design3/800/600',
    mediaType: 'image',
    description: { fr: 'Packaging eco-friendly.', en: 'Eco-friendly packaging.', de: 'Umweltfreundliche Verpackung.' },
    caseStudy: { fr: 'Conception d\'un emballage biodégradable sans compromis sur l\'élégance.', en: 'Design of biodegradable packaging without compromising elegance.', de: 'Design einer biologisch abbaubaren Verpackung ohne Kompromisse bei der Eleganz.' }
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-video-1',
    title: { 
      fr: 'Motion Design : Donner vie à l\'identité', 
      en: 'Motion Design: Bringing Identity to Life', 
      de: 'Motion Design: Identität zum Leben erwecken' 
    },
    content: { 
      fr: 'Le mouvement est le nouveau langage du luxe. Dans un monde saturé d\'images statiques, la vidéo permet de capturer l\'attention et de transmettre une émotion immédiate.\n\nPourquoi intégrer de la vidéo dans votre stratégie ?\n1. Une mémorisation accrue.\n2. Une démonstration de modernité.\n3. Un engagement multiplié par 3 sur les réseaux.\n\nChez Panda_Graphic, nous concevons des transitions fluides qui respectent l\'ADN de votre marque tout en lui apportant une dynamique nouvelle.', 
      en: 'Movement is the new language of luxury. In a world saturated with static images, video captures attention and conveys immediate emotion.\n\nWhy integrate video into your strategy?\n1. Increased memorization.\n2. A demonstration of modernity.\n3. Engagement multiplied by 3 on social networks.', 
      de: 'Bewegung ist die neue Sprache des Luxus. In einer Welt, die von statischen Bildern gesättigt ist, fängt Video Aufmerksamkeit ein und vermittelt sofortige Emotionen.' 
    },
    date: '20/05/2024',
    image: 'https://www.w3schools.com/html/mov_bbb.mp4',
    mediaType: 'video',
    likes: 124,
    comments: [
      { id: 'c1', author: 'Léa M.', text: 'Magnifique approche du mouvement !', date: '21/05/2024' }
    ]
  }
];

export const CATEGORIES = Object.values(ProjectCategory);

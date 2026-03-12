
import { ProjectCategory, Project, BlogPost } from './types';

export const TRANSLATIONS = {
  fr: {
    common: {
      lightMode: 'Mode Clair',
      darkMode: 'Mode Sombre',
      quickLinks: 'Liens Rapides',
      connect: 'Connecter',
      copyright: '© 2026 Victor Gabriel Archange Yombi Mangamba'
    },
    nav: { home: 'Accueil', portfolio: 'Portfolio', services: 'Services', about: 'À Propos', blog: 'Blog', contact: 'Contact' },
    hero: { 
      title: 'Panda_Graphic', 
      subtitle: 'L\'excellence visuelle par Victor Gabriel Archange', 
      cta: 'Voir mes travaux',
      consultation: 'Réserver une consultation'
    },
    home: {
      creativeSpirit: 'L\'Esprit Créatif',
      aboutQuote: '"Le design n\'est pas ce que je fais, c\'est ce que je suis. Chaque projet est une extension de ma vision pour un monde plus élégant."',
      aboutBio: 'Designer graphique basé à Paris, j\'accompagne les marques visionnaires dans la création d\'identités mémorables.',
      discoverPath: 'Découvrir mon parcours',
      expertiseTitle: 'Nos Domaines d\'Action',
      expertiseSubtitle: 'Expertise Premium',
      viewServices: 'Voir le détail des services',
      portfolioTitle: 'Sélection Exclusive',
      portfolioSubtitle: 'Dernières Signatures',
      exploreGallery: 'Explorer la galerie complète',
      blogTitle: 'Pensées & Lab',
      blogSubtitle: 'L\'Atelier Blog',
      blogDesc: 'Inspiration, études de cas et coulisses de nos plus grandes collaborations créatives.',
      readArticles: 'Lire tous les articles',
      ctaTitle: 'Sublimons votre Projet',
      ctaDesc: 'Propulsez votre marque dans une nouvelle dimension visuelle avec Victor Gabriel Archange.',
      ctaButton: 'Démarrer le voyage'
    },
    portfolio: {
      title: 'Galerie de Réalisations',
      searchPlaceholder: 'Rechercher un projet...',
      exploreCaseStudy: 'Explorer l\'étude de cas',
      noResults: 'L\'atelier prépare de nouveaux chefs-d\'œuvre pour cette catégorie.',
      caseStudyTitle: 'Étude de Cas',
      description: 'Description',
      process: 'Processus Créatif',
      startSimilar: 'Démarrer un projet similaire',
      categories: {
        all: 'Tous',
        gallery: 'Galerie',
        logotype: 'Logotype',
        branding: 'Brand Identity',
        social: 'Social Media',
        packaging: 'Packaging',
        uiux: 'UI/UX Design'
      }
    },
    services: {
      title: 'Mes Expertises',
      subtitle: 'Des solutions créatives pour votre marque',
      headerTag: 'Catalogue d\'Expertise',
      headerDesc: 'Propulsez votre marque avec Victor Gabriel Archange. Un design audacieux, des détails dorés et une vision sans compromis.',
      expertiseNote: 'Note d\'Expertise',
      clickToBook: 'Cliquer pour réserver',
      collaborationTag: 'Collaboration d\'Exception',
      ctaTitle: 'Prêt à distinguer votre marque ?',
      ctaDesc: 'Ne vous contentez pas d\'un simple design. Créons ensemble une identité iconique qui impose votre vision.',
      ctaButton: 'Lancer mon projet',
      askQuestion: 'Poser une question',
      list: {
        logotype: {
          title: 'Logotype & Monogramme',
          desc: 'Conception de logos emblématiques, vectorisés et intemporels.',
          note: 'Le logo est le point d’ancrage de votre réputation. Nous visons la mémorisation instantanée.',
          mantra: 'Graver votre légende...',
          items: ['Design sur-sur-mesure', 'Recherche typographique', 'Variantes Noir/Blanc']
        },
        branding: {
          title: 'Brand Identity',
          desc: 'Création d\'univers visuels cohérents et marbrés.',
          note: 'Une identité forte réduit vos coûts d’acquisition. On ne vend pas un produit, mais un statut.',
          mantra: 'Bâtir votre empire...',
          items: ['Charte Graphique', 'Storytelling visuel', 'Moodboards']
        },
        social: {
          title: 'Social Media Management',
          desc: 'Direction artistique pour vos réseaux sociaux.',
          note: 'L’algorithme aime la qualité. Votre feed doit être une galerie d’art interactive.',
          mantra: 'Illuminer vos réseaux...',
          items: ['Templates personnalisés', 'Contenus Reels/Stories', 'Stratégie']
        },
        packaging: {
          title: 'Packaging Design',
          desc: 'L\'art du déballage de luxe.',
          note: 'Le packaging est le premier contact physique. Il doit promettre une expérience hors du commun.',
          mantra: 'Sublimer l’écrin...',
          items: ['Conception 3D', 'Finitions Or/Argent', 'Eco-luxe']
        },
        uiux: {
          title: 'UI/UX Web Design',
          desc: 'Expériences digitales intuitives et esthétiques.',
          note: 'Le design Web est une conversation. Nous la rendons fluide, élégante et persuasive.',
          mantra: 'Digitaliser l’élégance...',
          items: ['Prototypes Figma', 'Mobile-First', 'Interfaces interactives']
        },
        creative: {
          title: 'Galerie Créative',
          desc: 'Projets artistiques et expérimentations visuelles.',
          note: 'Pour sortir des sentiers battus. L’audace créative est le meilleur levier de différenciation.',
          mantra: 'Libérer l’art...',
          items: ['Illustrations Premium', 'Retouche d\'art', 'Collages']
        }
      }
    },
    about: {
      title: 'Victor Gabriel Archange',
      bio: 'Designer graphique passionné, je transforme vos idées en identités visuelles audacieuses. Avec une approche mêlant minimalisme et élégance "Bambout-Or", j\'accompagne les marques dans leur ascension.',
      founder: 'Fondateur',
      creator: 'Le Créateur',
      pseudonym: 'Sous le pseudonyme de Panda_Graphic, j\'œuvre à la création d\'écosystèmes visuels qui transcendent les simples tendances. Mon approche combine la rigueur analytique et l\'instinct créatif pur.',
      quote: '"Chaque design est une promesse tenue entre une marque et son audience. Je suis celui qui rend cette promesse inoubliable."',
      pillars: {
        excellence: { title: 'Excellence', desc: 'La quête constante de la perfection dans chaque courbe et chaque nuance.' },
        impact: { title: 'Impact', desc: 'Créer un choc visuel immédiat qui ancre votre marque dans l\'esprit collectif.' },
        strategy: { title: 'Stratégie', desc: 'Le design n\'est rien sans un but précis. Chaque pixel sert un objectif business.' }
      },
      stats: {
        projects: 'Projets Signés',
        countries: 'Pays d\'intervention',
        years: 'Années d\'Art',
        smiles: 'Sourires Clients'
      }
    },
    blog: {
      headerTag: 'Pensées & Insights',
      headerTitle: 'L\'ATELIER BLOG',
      headerDesc: 'Décryptage des tendances, coulisses de création et réflexions sur le design de prestige par Victor Gabriel Archange.',
      noPosts: 'De nouveaux articles arrivent bientôt...',
      linkCopied: 'Lien copié',
      discoverPost: 'Découvrir l\'article',
      by: 'Par Victor Gabriel Archange',
      likes: 'Likes',
      comments: 'Commentaires',
      yourName: 'Votre Nom',
      yourReaction: 'Votre Réaction',
      submitComment: 'Envoyer mon avis',
      firstComment: 'Soyez le premier à réagir...',
      placeholderName: 'Archange Yombi',
      placeholderText: 'Partagez vos impressions...'
    },
    booking: {
      title: 'Prendre RDV',
      name: 'Nom',
      email: 'Email',
      date: 'Date souhaitée',
      service: 'Service',
      submit: 'Réserver',
      headerTag: 'Contact & Booking',
      headerTitle: 'Entrons en Scène',
      headerDesc: 'Victor Gabriel Archange traite chaque demande avec la même exigence de prestige. Réservez votre créneau pour une consultation stratégique.',
      studio: 'Studio',
      whatsapp: 'WhatsApp',
      successTitle: 'C\'est Partit !',
      successDesc: 'Votre demande est bien arrivée dans l\'atelier de Victor. Nous reviendrons vers vous sous 24h.',
      anotherRequest: 'Envoyer une autre demande',
      identity: 'Identité',
      placeholderName: 'Votre nom complet',
      businessEmail: 'Email Business',
      placeholderEmail: 'nom@entreprise.com',
      needDesc: 'Description de votre besoin',
      placeholderDesc: 'Expliquez-nous brièvement votre projet...',
      requiredServices: 'Services requis',
      chooseDate: 'Choisir une date de rendez-vous',
      selectedDate: 'Date sélectionnée :',
      chooseTime: 'Choisir un créneau horaire',
      finalize: 'Finaliser la réservation',
      alertService: 'Veuillez sélectionner au moins un service.',
      alertDateTime: 'Veuillez choisir une date et une heure dans le calendrier.',
      thanksSubscribe: 'Merci pour votre inscription !'
    },
    newsletter: { title: 'Newsletter', placeholder: 'Votre email', submit: 'S\'abonner' },
    footer: {
      quickLinks: 'Liens Rapides',
      connect: 'Connecter'
    }
  },
  en: {
    common: {
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      quickLinks: 'Quick Links',
      connect: 'Connect',
      copyright: '© 2026 Victor Gabriel Archange Yombi Mangamba'
    },
    nav: { home: 'Home', portfolio: 'Portfolio', services: 'Services', about: 'About', blog: 'Blog', contact: 'Contact' },
    hero: { 
      title: 'Panda_Graphic', 
      subtitle: 'Visual Excellence by Victor Gabriel Archange', 
      cta: 'Explore Work',
      consultation: 'Book a consultation'
    },
    home: {
      creativeSpirit: 'Creative Spirit',
      aboutQuote: '"Design is not what I do, it is who I am. Each project is an extension of my vision for a more elegant world."',
      aboutBio: 'Graphic designer based in Paris, I accompany visionary brands in creating memorable identities.',
      discoverPath: 'Discover my journey',
      expertiseTitle: 'Our Areas of Action',
      expertiseSubtitle: 'Premium Expertise',
      viewServices: 'View service details',
      portfolioTitle: 'Exclusive Selection',
      portfolioSubtitle: 'Latest Signatures',
      exploreGallery: 'Explore full gallery',
      blogTitle: 'Thoughts & Lab',
      blogSubtitle: 'The Blog Workshop',
      blogDesc: 'Inspiration, case studies and behind the scenes of our greatest creative collaborations.',
      readArticles: 'Read all articles',
      ctaTitle: 'Let\'s Sublimate your Project',
      ctaDesc: 'Propel your brand into a new visual dimension with Victor Gabriel Archange.',
      ctaButton: 'Start the journey'
    },
    portfolio: {
      title: 'Gallery of Achievements',
      searchPlaceholder: 'Search for a project...',
      exploreCaseStudy: 'Explore case study',
      noResults: 'The workshop is preparing new masterpieces for this category.',
      caseStudyTitle: 'Case Study',
      description: 'Description',
      process: 'Creative Process',
      startSimilar: 'Start a similar project',
      categories: {
        all: 'All',
        gallery: 'Gallery',
        logotype: 'Logotype',
        branding: 'Brand Identity',
        social: 'Social Media',
        packaging: 'Packaging',
        uiux: 'UI/UX Design'
      }
    },
    services: {
      title: 'My Expertise',
      subtitle: 'Creative solutions for your brand',
      headerTag: 'Expertise Catalog',
      headerDesc: 'Propel your brand with Victor Gabriel Archange. Bold design, golden details and uncompromising vision.',
      expertiseNote: 'Expertise Note',
      clickToBook: 'Click to book',
      collaborationTag: 'Exceptional Collaboration',
      ctaTitle: 'Ready to distinguish your brand?',
      ctaDesc: 'Don\'t settle for simple design. Let\'s create an iconic identity together that imposes your vision.',
      ctaButton: 'Launch my project',
      askQuestion: 'Ask a question',
      list: {
        logotype: {
          title: 'Logotype & Monogram',
          desc: 'Design of iconic, vectorized and timeless logos.',
          note: 'The logo is the anchor of your reputation. We aim for instant memorization.',
          mantra: 'Engrave your legend...',
          items: ['Custom design', 'Typographic research', 'Black/White variants']
        },
        branding: {
          title: 'Brand Identity',
          desc: 'Creation of coherent and marbled visual universes.',
          note: 'A strong identity reduces your acquisition costs. We don\'t sell a product, but a status.',
          mantra: 'Build your empire...',
          items: ['Graphic Charter', 'Visual storytelling', 'Moodboards']
        },
        social: {
          title: 'Social Media Management',
          desc: 'Artistic direction for your social networks.',
          note: 'The algorithm loves quality. Your feed must be an interactive art gallery.',
          mantra: 'Illuminate your networks...',
          items: ['Custom templates', 'Reels/Stories content', 'Strategy']
        },
        packaging: {
          title: 'Packaging Design',
          desc: 'The art of luxury unboxing.',
          note: 'Packaging is the first physical contact. It must promise an extraordinary experience.',
          mantra: 'Sublimate the case...',
          items: ['3D design', 'Gold/Silver finishes', 'Eco-luxury']
        },
        uiux: {
          title: 'UI/UX Web Design',
          desc: 'Intuitive and aesthetic digital experiences.',
          note: 'Web design is a conversation. We make it fluid, elegant and persuasive.',
          mantra: 'Digitalize elegance...',
          items: ['Figma prototypes', 'Mobile-First', 'Interactive interfaces']
        },
        creative: {
          title: 'Creative Gallery',
          desc: 'Artistic projects and visual experiments.',
          note: 'To get off the beaten track. Creative boldness is the best lever for differentiation.',
          mantra: 'Release the art...',
          items: ['Premium illustrations', 'Art retouching', 'Collages']
        }
      }
    },
    about: {
      title: 'Victor Gabriel Archange',
      bio: 'Passionate graphic designer, I transform your ideas into bold visual identities. Using a blend of minimalism and "Bamboo-Gold" elegance, I help brands rise.',
      founder: 'Founder',
      creator: 'The Creator',
      pseudonym: 'Under the pseudonym Panda_Graphic, I work on creating visual ecosystems that transcend simple trends. My approach combines analytical rigor and pure creative instinct.',
      quote: '"Each design is a promise kept between a brand and its audience. I am the one who makes that promise unforgettable."',
      pillars: {
        excellence: { title: 'Excellence', desc: 'The constant quest for perfection in every curve and every nuance.' },
        impact: { title: 'Impact', desc: 'Create an immediate visual shock that anchors your brand in the collective mind.' },
        strategy: { title: 'Strategy', desc: 'Design is nothing without a specific purpose. Every pixel serves a business goal.' }
      },
      stats: {
        projects: 'Signed Projects',
        countries: 'Countries of intervention',
        years: 'Years of Art',
        smiles: 'Client Smiles'
      }
    },
    blog: {
      headerTag: 'Thoughts & Insights',
      headerTitle: 'THE BLOG WORKSHOP',
      headerDesc: 'Deciphering trends, behind the scenes of creation and reflections on prestige design by Victor Gabriel Archange.',
      noPosts: 'New articles coming soon...',
      linkCopied: 'Link copied',
      discoverPost: 'Discover the article',
      by: 'By Victor Gabriel Archange',
      likes: 'Likes',
      comments: 'Comments',
      yourName: 'Your Name',
      yourReaction: 'Your Reaction',
      submitComment: 'Send my opinion',
      firstComment: 'Be the first to react...',
      placeholderName: 'Archange Yombi',
      placeholderText: 'Share your impressions...'
    },
    booking: {
      title: 'Book an Appointment',
      name: 'Name',
      email: 'Email',
      date: 'Desired Date',
      service: 'Service',
      submit: 'Book Now',
      headerTag: 'Contact & Booking',
      headerTitle: 'Let\'s Enter the Stage',
      headerDesc: 'Victor Gabriel Archange treats every request with the same requirement of prestige. Book your slot for a strategic consultation.',
      studio: 'Studio',
      whatsapp: 'WhatsApp',
      successTitle: 'Let\'s Go!',
      successDesc: 'Your request has arrived in Victor\'s workshop. We will get back to you within 24 hours.',
      anotherRequest: 'Send another request',
      identity: 'Identity',
      placeholderName: 'Your full name',
      businessEmail: 'Business Email',
      placeholderEmail: 'name@company.com',
      needDesc: 'Description of your need',
      placeholderDesc: 'Briefly explain your project...',
      requiredServices: 'Required services',
      chooseDate: 'Choose an appointment date',
      selectedDate: 'Selected date:',
      chooseTime: 'Choose a time slot',
      finalize: 'Finalize booking',
      alertService: 'Please select at least one service.',
      alertDateTime: 'Please choose a date and time in the calendar.',
      thanksSubscribe: 'Thank you for subscribing!'
    },
    newsletter: { title: 'Newsletter', placeholder: 'Your email', submit: 'Subscribe' },
    footer: {
      quickLinks: 'Quick Links',
      connect: 'Connect'
    }
  },
  de: {
    common: {
      lightMode: 'Hellmodus',
      darkMode: 'Dunkelmodus',
      quickLinks: 'Schnelllinks',
      connect: 'Verbinden',
      copyright: '© 2026 Victor Gabriel Archange Yombi Mangamba'
    },
    nav: { home: 'Startseite', portfolio: 'Portfolio', services: 'Dienstleistungen', about: 'Über mich', blog: 'Blog', contact: 'Kontakt' },
    hero: { 
      title: 'Panda_Graphic', 
      subtitle: 'Visuelle Exzellenz von Victor Gabriel Archange', 
      cta: 'Arbeit ansehen',
      consultation: 'Beratung buchen'
    },
    home: {
      creativeSpirit: 'Kreativer Geist',
      aboutQuote: '"Design ist nicht das, was ich tue, es ist das, was ich bin. Jedes Projekt ist eine Erweiterung meiner Vision für eine elegantere Welt."',
      aboutBio: 'Grafikdesigner mit Sitz in Paris, ich begleite visionäre Marken bei der Schaffung unvergesslicher Identitäten.',
      discoverPath: 'Entdecken Sie meine Reise',
      expertiseTitle: 'Unsere Handlungsfelder',
      expertiseSubtitle: 'Premium-Expertise',
      viewServices: 'Service-Details anzeigen',
      portfolioTitle: 'Exklusive Auswahl',
      portfolioSubtitle: 'Neueste Signaturen',
      exploreGallery: 'Vollständige Galerie erkunden',
      blogTitle: 'Gedanken & Labor',
      blogSubtitle: 'Die Blog-Werkstatt',
      blogDesc: 'Inspiration, Fallstudien und Hintergründe unserer größten kreativen Kooperationen.',
      readArticles: 'Alle Artikel lesen',
      ctaTitle: 'Lassen Sie uns Ihr Projekt sublimieren',
      ctaDesc: 'Katapultieren Sie Ihre Marke mit Victor Gabriel Archange in eine neue visuelle Dimension.',
      ctaButton: 'Die Reise beginnen'
    },
    portfolio: {
      title: 'Galerie der Errungenschaften',
      searchPlaceholder: 'Nach einem Projekt suchen...',
      exploreCaseStudy: 'Fallstudie erkunden',
      noResults: 'Die Werkstatt bereitet neue Meisterwerke für diese Kategorie vor.',
      caseStudyTitle: 'Fallstudie',
      description: 'Beschreibung',
      process: 'Kreativer Prozess',
      startSimilar: 'Ein ähnliches Projekt starten',
      categories: {
        all: 'Alle',
        gallery: 'Galerie',
        logotype: 'Logotyp',
        branding: 'Markenidentität',
        social: 'Social Media',
        packaging: 'Verpackung',
        uiux: 'UI/UX Design'
      }
    },
    services: {
      title: 'Meine Expertise',
      subtitle: 'Kreative Lösungen für Ihre Marke',
      headerTag: 'Expertise-Katalog',
      headerDesc: 'Katapultieren Sie Ihre Marke mit Victor Gabriel Archange. Mutiges Design, goldene Details und kompromisslose Vision.',
      expertiseNote: 'Expertise-Hinweis',
      clickToBook: 'Klicken zum Buchen',
      collaborationTag: 'Außergewöhnliche Zusammenarbeit',
      ctaTitle: 'Bereit, Ihre Marke abzuheben?',
      ctaDesc: 'Geben Sie sich nicht mit einfachem Design zufrieden. Lassen Sie uns gemeinsam eine ikonische Identität schaffen, die Ihre Vision durchsetzt.',
      ctaButton: 'Mein Projekt starten',
      askQuestion: 'Eine Frage stellen',
      list: {
        logotype: {
          title: 'Logotyp & Monogramm',
          desc: 'Design von ikonischen, vektorisierten und zeitlosen Logos.',
          note: 'Das Logo ist der Anker Ihres Rufs. Wir streben eine sofortige Einprägsamkeit an.',
          mantra: 'Gravieren Sie Ihre Legende...',
          items: ['Maßgeschneidertes Design', 'Typografische Forschung', 'Schwarz/Weiß-Varianten']
        },
        branding: {
          title: 'Brand Identity',
          desc: 'Schaffung kohärenter und marmorierter visueller Universen.',
          note: 'Eine starke Identität senkt Ihre Akquisekosten. Wir verkaufen kein Produkt, sondern einen Status.',
          mantra: 'Bauen Sie Ihr Imperium auf...',
          items: ['Grafik-Charta', 'Visuelles Storytelling', 'Moodboards']
        },
        social: {
          title: 'Social Media Management',
          desc: 'Künstlerische Leitung für Ihre sozialen Netzwerke.',
          note: 'Der Algorithmus liebt Qualität. Ihr Feed muss eine interaktive Kunstgalerie sein.',
          mantra: 'Beleuchten Sie Ihre Netzwerke...',
          items: ['Benutzerdefinierte Vorlagen', 'Reels/Stories-Inhalte', 'Strategie']
        },
        packaging: {
          title: 'Packaging Design',
          desc: 'Die Kunst des Luxus-Unboxings.',
          note: 'Die Verpackung ist der erste physische Kontakt. Sie muss ein außergewöhnliches Erlebnis versprechen.',
          mantra: 'Sublimieren Sie das Etui...',
          items: ['3D-Design', 'Gold/Silber-Finishes', 'Öko-Luxus']
        },
        uiux: {
          title: 'UI/UX Web Design',
          desc: 'Intuitive und ästhetische digitale Erlebnisse.',
          note: 'Webdesign ist ein Gespräch. Wir machen es flüssig, elegant und überzeugend.',
          mantra: 'Digitalisieren Sie Eleganz...',
          items: ['Figma-Prototypen', 'Mobile-First', 'Interaktive Schnittstellen']
        },
        creative: {
          title: 'Kreative Galerie',
          desc: 'Künstlerische Projekte und visuelle Experimente.',
          note: 'Um ausgetretene Pfade zu verlassen. Kreative Kühnheit ist der beste Hebel zur Differenzierung.',
          mantra: 'Befreien Sie die Kunst...',
          items: ['Premium-Illustrationen', 'Kunst-Retusche', 'Collagen']
        }
      }
    },
    about: {
      title: 'Victor Gabriel Archange',
      bio: 'Leidenschaftlicher Grafikdesigner, ich verwandle Ihre Ideen in mutige visuelle Identitäten. Mit einer Mischung aus Minimalismus und "Bambus-Gold" Eleganz begleite ich Marken auf ihrem Aufstieg.',
      founder: 'Gründer',
      creator: 'Der Schöpfer',
      pseudonym: 'Unter dem Pseudonym Panda_Graphic arbeite ich an der Schaffung visueller Ökosysteme, die über einfache Trends hinausgehen. Mein Ansatz kombiniert analytische Strenge und reinen kreativen Instinkt.',
      quote: '"Jedes Design ist ein Versprechen, das zwischen einer Marke und ihrem Publikum gehalten wird. Ich bin derjenige, der dieses Versprechen unvergesslich macht."',
      pillars: {
        excellence: { title: 'Exzellenz', desc: 'Das ständige Streben nach Perfektion in jeder Kurve und jeder Nuance.' },
        impact: { title: 'Impact', desc: 'Erzeugen Sie einen sofortigen visuellen Schock, der Ihre Marke im kollektiven Gedächtnis verankert.' },
        strategy: { title: 'Strategie', desc: 'Design ist nichts ohne einen bestimmten Zweck. Jeder Pixel dient einem Geschäftsziel.' }
      },
      stats: {
        projects: 'Signierte Projekte',
        countries: 'Länder der Intervention',
        years: 'Jahre der Kunst',
        smiles: 'Kundenzufriedenheit'
      }
    },
    blog: {
      headerTag: 'Gedanken & Insights',
      headerTitle: 'DIE BLOG-WERKSTATT',
      headerDesc: 'Trends entschlüsseln, Hintergründe der Kreation und Überlegungen zum Prestige-Design von Victor Gabriel Archange.',
      noPosts: 'Neue Artikel kommen bald...',
      linkCopied: 'Link kopiert',
      discoverPost: 'Artikel entdecken',
      by: 'Von Victor Gabriel Archange',
      likes: 'Likes',
      comments: 'Kommentare',
      yourName: 'Ihr Name',
      yourReaction: 'Ihre Reaktion',
      submitComment: 'Meine Meinung senden',
      firstComment: 'Seien Sie der Erste, der reagiert...',
      placeholderName: 'Archange Yombi',
      placeholderText: 'Teilen Sie Ihre Eindrücke...'
    },
    booking: {
      title: 'Termin vereinbaren',
      name: 'Name',
      email: 'Email',
      date: 'Datum',
      service: 'Dienstleistung',
      submit: 'Buchen',
      headerTag: 'Kontakt & Buchung',
      headerTitle: 'Betreten wir die Bühne',
      headerDesc: 'Victor Gabriel Archange behandelt jede Anfrage mit dem gleichen Anspruch an Prestige. Buchen Sie Ihren Termin für eine strategische Beratung.',
      studio: 'Studio',
      whatsapp: 'WhatsApp',
      successTitle: 'Los geht\'s!',
      successDesc: 'Ihre Anfrage ist in Victors Werkstatt angekommen. Wir werden uns innerhalb de 24 Stunden bei Ihnen melden.',
      anotherRequest: 'Weitere Anfrage senden',
      identity: 'Identität',
      placeholderName: 'Ihr vollständiger Name',
      businessEmail: 'Business-E-Mail',
      placeholderEmail: 'name@unternehmen.com',
      needDesc: 'Beschreibung Ihres Bedarfs',
      placeholderDesc: 'Erklären Sie uns kurz Ihr Projekt...',
      requiredServices: 'Erforderliche Dienstleistungen',
      chooseDate: 'Wählen Sie ein Termindatum',
      selectedDate: 'Ausgewähltes Datum:',
      chooseTime: 'Wählen Sie ein Zeitfenster',
      finalize: 'Buchung abschließen',
      alertService: 'Bitte wählen Sie mindestens einen Dienst aus.',
      alertDateTime: 'Bitte wählen Sie ein Datum und eine Uhrzeit im Kalender aus.',
      thanksSubscribe: 'Vielen Dank für Ihr Abonnement!'
    },
    newsletter: { title: 'Newsletter', placeholder: 'Ihre E-Mail', submit: 'Abonnieren' },
    footer: {
      quickLinks: 'Schnelllinks',
      connect: 'Verbinden'
    }
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

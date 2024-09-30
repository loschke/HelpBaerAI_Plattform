interface Operation {
  name: string;
  description: string;
  sampleTextFile: string; // Add this line
}

interface AIAssistant {
  title: string;
  description: string;
  image: string;
  alt: string;
  task: string;
  buttonText?: string;
  buttonLink?: string;
  operations?: Operation[];
}

const aiAssistants: AIAssistant[] = [
  {
    title: 'Storybert',
    description: 'Durchleuchtet und optimiert Ihre Website von A bis Z.',
    image: '/images/storybert.png',
    alt: 'Storybert',
    task: 'Website-Optimierung',
    buttonText: 'Mit Storybert optimieren',
    buttonLink: 'storybert'
  },
  {
    title: 'SEO-Assistent',
    description: 'Untersucht und bewertet Ihre Texte für maximale Wirkung.',
    image: '/images/webbert.png',
    alt: 'Webbert',
    task: 'SEO-Analyse',
    buttonText: 'SEO verbessern',
    buttonLink: '/seo-assistent',
    operations: [
      {
        name: 'Kürzen',
        description: 'Reduziert den Text auf die wesentlichen Informationen, ohne den Kerninhalt zu verlieren.',
        sampleTextFile: '/sample-texts/seo-assistant-shorten.txt'
      },
      {
        name: 'Erweitern',
        description: 'Fügt zusätzliche relevante Informationen hinzu, um den Text ausführlicher und detaillierter zu gestalten.',
        sampleTextFile: '/sample-texts/seo-assistant-expand.txt'
      },
      {
        name: 'Zusammenfassen',
        description: 'Erstellt eine prägnante Zusammenfassung der Hauptpunkte des Textes. Diese Funktion hilft Ihnen, schnell die Kernaussagen längerer Texte zu erfassen oder übersichtliche Inhaltsangaben zu erstellen.',
        sampleTextFile: '/sample-texts/seo-assistant-summarize.txt'
      },
      {   
        name: 'Optimieren',
        description: 'Verbessert die Lesbarkeit und Struktur des Textes für eine bessere Benutzererfahrung. Diese Funktion kann die Satzstruktur verbessern, Wortwiederholungen reduzieren und den Lesefluss optimieren.',
        sampleTextFile: '/sample-texts/seo-assistant-optimize.txt'
      },
      {
        name: 'Analysieren',
        description: 'Führt eine detaillierte Analyse des Textes durch, um Verbesserungspotenziale aufzuzeigen. Dies kann Aspekte wie Lesbarkeit, SEO-Optimierung, Zielgruppenrelevanz und inhaltliche Kohärenz umfassen.',
        sampleTextFile: '/sample-texts/seo-assistant-analyze.txt'
      }
    ]
  },
  {
    title: 'Bild-Erstellungs-Assistent',
    description: 'Verwandelt Ihre Ideen in coole visuelle Inhalte.',
    image: '/images/projektbert.png',
    alt: 'Projektbert',
    task: 'Bildgenerierung',
    buttonText: 'Bilder erstellen',
    buttonLink: '/bild-erstellung',
    operations: []
  },
  {
    title: 'Bild-Analyse-Assistent',
    description: 'Entschlüsselt die Botschaften und Potenziale Ihrer Bilder.',
    image: '/images/Pixelbert.png',
    alt: 'Pixelbert',
    task: 'Bildanalyse',
    buttonText: 'Bilder analysieren',
    buttonLink: '/bild-analyse',
    operations: []
  },
  {
    title: 'Storyteller-Assistent',
    description: 'Formt Ihre Unternehmensbotschaft in fesselnde Geschichten.',
    image: '/images/kritzelbert2.png',
    alt: 'Kritzelbert',
    task: 'Content-Erstellung',
    buttonText: 'Story entwickeln',
    buttonLink: '/storyteller',
    operations: []
  },
  {
    title: 'Kreativbert',
    description: 'Spezialisiert auf Fragen zu Ihrem Unternehmen.',
    image: '/images/buntbert.png',
    alt: 'Kreativbert',
    task: 'Kreative Lösungen',
    buttonText: 'Ideen generieren',
    buttonLink: '/kreativbert',
    operations: []
  },
  {
    title: 'queonext Agents',
    description: 'Spezialisiert auf Fragen zu Ihrem Unternehmen.',
    image: '/images/storybert.png',
    alt: 'queonext Corporate Assistant',
    task: 'Unternehmensberatung',
    buttonText: 'Unternehmen beraten',
    buttonLink: '/queonext-agents',
    operations: []
  }
];

export default aiAssistants;

interface AIAssistant {
  title: string;
  description: string;
  image: string;
  alt: string;
  task: string;
  buttonText?: string;
  buttonLink?: string;
}

const aiAssistants: AIAssistant[] = [
  {
    title: 'Storybert',
    description: 'Durchleuchtet und optimiert Ihre Website von A bis Z.',
    image: '/images/storybert.png',
    alt: 'Storybert',
    task: 'Website-Optimierung',
    buttonText: 'Mit Storybert optimieren',
    buttonLink: '/storybert'
  },
  {
    title: 'SEO-Assistent',
    description: 'Untersucht und bewertet Ihre Texte für maximale Wirkung.',
    image: '/images/webbert.png',
    alt: 'Webbert',
    task: 'SEO-Analyse',
    buttonText: 'SEO verbessern',
    buttonLink: '/seo-assistent'
  },
  {
    title: 'Bild-Erstellungs-Assistent',
    description: 'Verwandelt Ihre Ideen in coole visuelle Inhalte.',
    image: '/images/projektbert.png',
    alt: 'Projektbert',
    task: 'Bildgenerierung',
    buttonText: 'Bilder erstellen',
    buttonLink: '/bild-erstellung'
  },
  {
    title: 'Bild-Analyse-Assistent',
    description: 'Entschlüsselt die Botschaften und Potenziale Ihrer Bilder.',
    image: '/images/Pixelbert.png',
    alt: 'Pixelbert',
    task: 'Bildanalyse',
    buttonText: 'Bilder analysieren',
    buttonLink: '/bild-analyse'
  },
  {
    title: 'Storyteller-Assistent',
    description: 'Formt Ihre Unternehmensbotschaft in fesselnde Geschichten.',
    image: '/images/kritzelbert2.png',
    alt: 'Kritzelbert',
    task: 'Content-Erstellung',
    buttonText: 'Story entwickeln',
    buttonLink: '/storyteller'
  },
  {
    title: 'Kreativbert',
    description: 'Spezialisiert auf Fragen zu Ihrem Unternehmen.',
    image: '/images/buntbert.png',
    alt: 'Kreativbert',
    task: 'Kreative Lösungen',
    buttonText: 'Ideen generieren',
    buttonLink: '/kreativbert'
  },
  {
    title: 'queonext Agents',
    description: 'Spezialisiert auf Fragen zu Ihrem Unternehmen.',
    image: '/images/storybert.png',
    alt: 'queonext Corporate Assistant',
    task: 'Unternehmensberatung',
    buttonText: 'Unternehmen beraten',
    buttonLink: '/queonext-agents'
  }
];

export default aiAssistants;

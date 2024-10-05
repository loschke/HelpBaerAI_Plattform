import { PROMPT_KEYS } from './prompt-keys';

interface Operation {
  id: string;
  name: string;
  description: string;
  sampleTextFile: string;
  promptKey: string;
  languageModel: string;
  makeBranch: string;
  creditCost: number;
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
    title: 'Schlaubärt',
    description: 'Schlaubert untersucht und optimiert deine Texte mit KI-Technologie. Er analysiert Stil, Intention und Argumentation für maximale Wirkung und liefert wertvolle Verbesserungsvorschläge.',
    image: '/images/schlaubert.png',
    alt: 'Schlaubärt - Analyse & Bewertung',
    task: 'Analyse & Bewertung',
    buttonText: 'Analysen starten',
    buttonLink: '/analysis-evaluation',
    "operations": [
      {
        "id": "tone-of-voice",
        "name": "Schreibstil",
        "description": "Überprüft den Tonfall des Textes und gibt Empfehlungen für eine ansprechende und einprägsame Sprache. Diese Analyse identifiziert den vorherrschenden Schreibstil (z.B. formell, informell, humorvoll, ernst) und bewertet, ob dieser zum Zielpublikum und Zweck des Textes passt. Sie gibt konkrete Vorschläge zur Verbesserung des Tonfalls, um die Wirkung des Textes zu optimieren.",
        "sampleTextFile": "/sample-texts/schlaubert-tone-of-voice.txt",
        "promptKey": PROMPT_KEYS.TONE_OF_VOICE,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 10
      },
      {
        "id": "intention",
        "name": "Intention",
        "description": "Überprüft den Zweck des Textes und gibt Empfehlungen für eine klare und prägnante Botschaft. Diese Analyse identifiziert das Hauptziel des Textes (z.B. informieren, überzeugen, unterhalten) und bewertet, wie effektiv dieses Ziel erreicht wird. Sie bietet Vorschläge zur Verbesserung der Klarheit und Wirksamkeit der Kernbotschaft, um sicherzustellen, dass die Intention des Autors beim Leser ankommt.",
        "sampleTextFile": "/sample-texts/schlaubert-intention.txt",
        "promptKey": PROMPT_KEYS.INTENTION,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 10
      },
      {
        "id": "bias",
        "name": "Bias",
        "description": "Überprüft den Text auf unbewusste Voreingenommenheit oder Vorurteile und gibt Empfehlungen für eine ausgewogene und faire Darstellung. Diese Analyse identifiziert mögliche Formen von Bias, wie z.B. geschlechtsspezifische, kulturelle oder sozioökonomische Vorurteile. Sie bietet Vorschläge zur Neutralisierung von Bias und zur Förderung einer inklusiven Sprache, die alle Leser respektvoll anspricht.",
        "sampleTextFile": "/sample-texts/schlaubert-bias.txt",
        "promptKey": PROMPT_KEYS.BIAS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 10
      },
      {
        "id": "ethics",
        "name": "Ethik",
        "description": "Überprüft den Text auf ethische Implikationen und gibt Empfehlungen für eine moralisch vertretbare und verantwortungsvolle Kommunikation. Diese Analyse untersucht den Inhalt auf potenzielle ethische Probleme wie Falschdarstellungen, Manipulation oder die Verletzung von Persönlichkeitsrechten. Sie bietet Vorschläge zur Verbesserung der ethischen Integrität des Textes und zur Förderung einer vertrauenswürdigen Kommunikation.",
        "sampleTextFile": "/sample-texts/schlaubert-ethics.txt",
        "promptKey": PROMPT_KEYS.ETHICS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 10
      },
      {
        "id": "sentiment",
        "name": "Stimmung",
        "description": "Analysiert den Text und gibt die Stimmung des Textes wieder. Diese Analyse identifiziert die vorherrschende emotionale Tönung des Textes (z.B. positiv, negativ, neutral) und bewertet deren Konsistenz und Angemessenheit im Kontext. Sie bietet Einblicke in die emotionale Wirkung auf den Leser und gibt Empfehlungen zur Optimierung der Stimmung, um die gewünschte Reaktion beim Zielpublikum zu erzielen.",
        "sampleTextFile": "/sample-texts/schlaubert-sentiment.txt",
        "promptKey": PROMPT_KEYS.SENTIMENT,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 10
      },
      {
        "id": "argumentation",
        "name": "Argumentation",
        "description": "Analysiert den Text und gibt die Argumentation des Textes wieder. Diese Analyse untersucht die logische Struktur und Überzeugungskraft der präsentierten Argumente. Sie identifiziert Prämissen, Schlussfolgerungen und potenzielle logische Fehlschlüsse. Die Analyse bietet Vorschläge zur Verbesserung der Argumentation, um eine kohärente und überzeugende Darstellung zu gewährleisten.",
        "sampleTextFile": "/sample-texts/schlaubert-argumentation.txt",
        "promptKey": PROMPT_KEYS.ARGUMENTATION,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 10
      },
      {
        "id": "emotion",
        "name": "Emotion",
        "description": "Analysiert den Text und gibt die Emotion des Textes wieder. Diese Analyse identifiziert und kategorisiert die im Text ausgedrückten oder evozierten Emotionen (z.B. Freude, Trauer, Ärger, Überraschung). Sie bewertet die Intensität und Angemessenheit der emotionalen Aspekte im Kontext des Textziels und der Zielgruppe. Die Analyse bietet Einblicke in die emotionale Wirkung auf den Leser und gibt Empfehlungen zur effektiven Nutzung emotionaler Elemente in der Kommunikation.",
        "sampleTextFile": "/sample-texts/schlaubert-emotion.txt",
        "promptKey": PROMPT_KEYS.EMOTION,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 10
      }
    ]
  },
  {
    title: 'Storybert',
    description: 'Durchleuchtet und optimiert Ihre Website von A bis Z.',
    image: '/images/storybert.png',
    alt: 'Storybert',
    task: 'Website-Optimierung',
    buttonText: 'Mit Storybert optimieren',
    buttonLink: 'storybert',
    operations: []
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

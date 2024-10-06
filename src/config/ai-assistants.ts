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
  estimatedTotalTime: string;
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
        "creditCost": 6,
        "estimatedTotalTime": "ca. 25-35 sek (Text) | ca. 30-45 sek (URL)"
      },
      {
        "id": "intention",
        "name": "Intention",
        "description": "Überprüft den Zweck des Textes und gibt Empfehlungen für eine klare und prägnante Botschaft. Diese Analyse identifiziert das Hauptziel des Textes (z.B. informieren, überzeugen, unterhalten) und bewertet, wie effektiv dieses Ziel erreicht wird. Sie bietet Vorschläge zur Verbesserung der Klarheit und Wirksamkeit der Kernbotschaft, um sicherzustellen, dass die Intention des Autors beim Leser ankommt.",
        "sampleTextFile": "/sample-texts/schlaubert-intention.txt",
        "promptKey": PROMPT_KEYS.INTENTION,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 6,
        "estimatedTotalTime": "ca. 25-35 sek (Text) | ca. 30-45 sek (URL)"
      },
      {
        "id": "bias",
        "name": "Bias",
        "description": "Überprüft den Text auf unbewusste Voreingenommenheit oder Vorurteile und gibt Empfehlungen für eine ausgewogene und faire Darstellung. Diese Analyse identifiziert mögliche Formen von Bias, wie z.B. geschlechtsspezifische, kulturelle oder sozioökonomische Vorurteile. Sie bietet Vorschläge zur Neutralisierung von Bias und zur Förderung einer inklusiven Sprache, die alle Leser respektvoll anspricht.",
        "sampleTextFile": "/sample-texts/schlaubert-bias.txt",
        "promptKey": PROMPT_KEYS.BIAS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 6,
        "estimatedTotalTime": "ca. 25-35 sek (Text) | ca. 30-45 sek (URL)"
      },
      {
        "id": "ethics",
        "name": "Ethik",
        "description": "Überprüft den Text auf ethische Implikationen und gibt Empfehlungen für eine moralisch vertretbare und verantwortungsvolle Kommunikation. Diese Analyse untersucht den Inhalt auf potenzielle ethische Probleme wie Falschdarstellungen, Manipulation oder die Verletzung von Persönlichkeitsrechten. Sie bietet Vorschläge zur Verbesserung der ethischen Integrität des Textes und zur Förderung einer vertrauenswürdigen Kommunikation.",
        "sampleTextFile": "/sample-texts/schlaubert-ethics.txt",
        "promptKey": PROMPT_KEYS.ETHICS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 6,
        "estimatedTotalTime": "ca. 25-35 sek (Text) | ca. 30-45 sek (URL)"
      },
      {
        "id": "sentiment",
        "name": "Stimmung",
        "description": "Analysiert den Text und gibt die Stimmung des Textes wieder. Diese Analyse identifiziert die vorherrschende emotionale Tönung des Textes (z.B. positiv, negativ, neutral) und bewertet deren Konsistenz und Angemessenheit im Kontext. Sie bietet Einblicke in die emotionale Wirkung auf den Leser und gibt Empfehlungen zur Optimierung der Stimmung, um die gewünschte Reaktion beim Zielpublikum zu erzielen.",
        "sampleTextFile": "/sample-texts/schlaubert-sentiment.txt",
        "promptKey": PROMPT_KEYS.SENTIMENT,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 6,
        "estimatedTotalTime": "ca. 25-35 sek (Text) | ca. 30-45 sek (URL)"
      },
      {
        "id": "argumentation",
        "name": "Argumentation",
        "description": "Analysiert den Text und gibt die Argumentation des Textes wieder. Diese Analyse untersucht die logische Struktur und Überzeugungskraft der präsentierten Argumente. Sie identifiziert Prämissen, Schlussfolgerungen und potenzielle logische Fehlschlüsse. Die Analyse bietet Vorschläge zur Verbesserung der Argumentation, um eine kohärente und überzeugende Darstellung zu gewährleisten.",
        "sampleTextFile": "/sample-texts/schlaubert-argumentation.txt",
        "promptKey": PROMPT_KEYS.ARGUMENTATION,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 6,
        "estimatedTotalTime": "ca. 25-35 sek (Text) | ca. 30-45 sek (URL)"
      },
      {
        "id": "emotion",
        "name": "Emotion",
        "description": "Analysiert den Text und gibt die Emotion des Textes wieder. Diese Analyse identifiziert und kategorisiert die im Text ausgedrückten oder evozierten Emotionen (z.B. Freude, Trauer, Ärger, Überraschung). Sie bewertet die Intensität und Angemessenheit der emotionalen Aspekte im Kontext des Textziels und der Zielgruppe. Die Analyse bietet Einblicke in die emotionale Wirkung auf den Leser und gibt Empfehlungen zur effektiven Nutzung emotionaler Elemente in der Kommunikation.",
        "sampleTextFile": "/sample-texts/schlaubert-emotion.txt",
        "promptKey": PROMPT_KEYS.EMOTION,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 6,
        "estimatedTotalTime": "ca. 25-35 sek (Text) | ca. 30-45 sek (URL)"
      }
    ]
  },
  {
    title: "Textbert",
    description: "Textbert ist Ihr KI-Assistent für Content- und Textbearbeitung. Er optimiert Ihre Texte durch verschiedene Operationen wie Kürzen, Erweitern, Umwandeln und Analysieren, um Ihre Botschaft klar und effektiv zu vermitteln.",
    image: "/images/textbert.png",
    alt: "Textbert - Content- und Textbearbeitung",
    task: "Textverarbeitung",
    buttonText: "Textbearbeitung starten",
    buttonLink: "/text-optimization",
    operations: [
      {
        "id": "shorten-text",
        "name": "Text kürzen",
        "description": "Reduziert die Länge des Textes unter Beibehaltung der wichtigsten Informationen und Kernaussagen.",
        "sampleTextFile": "/sample-texts/textbert-shorten-text.txt",
        "promptKey": PROMPT_KEYS.SHORTEN_TEXT,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "expand-text",
        "name": "Text erweitern",
        "description": "Ergänzt den bestehenden Text mit zusätzlichen Details, Beispielen oder Erklärungen, um ihn umfassender zu gestalten.",
        "sampleTextFile": "/sample-texts/textbert-expand-text.txt",
        "promptKey": PROMPT_KEYS.EXPAND_TEXT,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "text-to-list",
        "name": "Text zu Liste",
        "description": "Wandelt einen Fließtext in eine strukturierte Liste um, um die Inhalte übersichtlicher zu präsentieren.",
        "sampleTextFile": "/sample-texts/textbert-text-to-list.txt",
        "promptKey": PROMPT_KEYS.TEXT_TO_LIST,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 15-25 sek"
      },
      {
        "id": "list-to-text",
        "name": "Liste zu Text",
        "description": "Konvertiert eine Liste in einen zusammenhängenden Fließtext für eine narrative Darstellung der Inhalte.",
        "sampleTextFile": "/sample-texts/textbert-list-to-text.txt",
        "promptKey": PROMPT_KEYS.LIST_TO_TEXT,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 15-25 sek"
      },
      {
        "id": "summarize-text",
        "name": "Text zusammenfassen",
        "description": "Erstellt eine prägnante Zusammenfassung des Textes, die die Hauptpunkte und wichtigsten Informationen hervorhebt.",
        "sampleTextFile": "/sample-texts/textbert-summarize-text.txt",
        "promptKey": PROMPT_KEYS.SUMMARIZE_TEXT,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "extract-key-insights",
        "name": "Key Insights",
        "description": "Identifiziert und extrahiert die wichtigsten Erkenntnisse und Schlüsselinformationen aus dem gegebenen Text.",
        "sampleTextFile": "/sample-texts/textbert-extract-key-insights.txt",
        "promptKey": PROMPT_KEYS.EXTRACT_KEY_INSIGHTS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "explain-text",
        "name": "Text erklären",
        "description": "Bietet eine detaillierte Erklärung des Textes, einschließlich Kontext, Bedeutung und möglicher Interpretationen.",
        "sampleTextFile": "/sample-texts/textbert-explain-text.txt",
        "promptKey": PROMPT_KEYS.EXPLAIN_TEXT,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 30-40 sek"
      }
    ]
  }
];

export default aiAssistants;

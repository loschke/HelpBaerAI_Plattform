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
  inputType: 'both' | 'text' | 'url';
}

const aiAssistants: AIAssistant[] = [
  {
    title: 'Schlaubärt',
    description: 'Im hektischen Businessalltag fehlt oft die Zeit für ausführliche Analysen. Hier springt KI ein. Sie liest Texte – egal ob E-Mails, Präsentationen oder Berichte – und gibt schnell Feedback. Ist der Ton richtig getroffen? Kommt die Botschaft klar rüber? Überzeugt die Argumentation?',
    image: '/images/schlaubert.png',
    alt: 'Schlaubärt - Analyse & Bewertung',
    task: 'Analyse & Bewertung',
    buttonText: 'Analysen starten',
    buttonLink: '/analysis-evaluation',
    inputType: 'both',
    "operations": [
      {
        "id": "tone-of-voice",
        "name": "Schreibstil analysieren",
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
        "name": "Intention analysieren",
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
        "name": "Bias analysieren",
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
        "name": "Ethik analysieren",
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
        "name": "Stimmung analysieren",
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
        "name": "Argumentation analysieren",
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
        "name": "Emotion analysieren",
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
    title: "Textbärt",
    description: "Effiziente Textbearbeitung ist entscheidend für erfolgreiche Kommunikation. KI-Tools optimieren Texte blitzschnell: Berichte kürzen, Notizen erweitern oder Fließtext in Listen umwandeln – die richtige Technologie macht's möglich.",
    image: "/images/textbert.png",
    alt: "Textbärt - Content- und Textbearbeitung",
    task: "Textverarbeitung",
    buttonText: "Textbearbeitung starten",
    buttonLink: "/text-optimization",
    inputType: 'text',
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
        "id": "simple-language",
        "name": "Einfachere Sprache",
        "description": "Vereinfacht die Sprache Ihrer Texte, um sie zugänglicher und verständlicher zu machen. Diese Funktion analysiert Ihren Schreibstil und schlägt Alternativen für komplexe Wörter oder Satzstrukturen vor. Sie hilft dabei, Ihre Botschaft klarer und direkter zu vermitteln, ohne deren Essenz zu verlieren. Das Ergebnis ist ein Text, der von einem breiteren Publikum leichter verstanden und aufgenommen werden kann, was besonders nützlich für die Kommunikation komplexer Ideen oder für die Ansprache verschiedener Zielgruppen ist.",
        "sampleTextFile": "/sample-texts/textbert-simple-language.txt",
        "promptKey": PROMPT_KEYS.SIMPLE_LANGUAGE,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 15-25 sek"
      },
      {
        "id": "complex-language",
        "name": "Komplexere Sprache",
        "description": "Verfeinert und bereichert die Sprache Ihrer Texte für ein anspruchsvolleres Publikum. Diese Funktion analysiert Ihren Inhalt und schlägt präzisere, nuanciertere oder fachspezifischere Formulierungen vor. Sie hilft dabei, Ihre Botschaft mit größerer Tiefe und Detailliertheit zu vermitteln, was besonders für akademische, technische oder spezialisierte Zielgruppen wertvoll ist. Das Ergebnis ist ein Text, der Ihre Expertise unterstreicht und Ihrem Publikum ein höheres Maß an Informationen und Einsichten bietet.",
        "sampleTextFile": "/sample-texts/textbert-complex-language.txt",
        "promptKey": PROMPT_KEYS.COMPLEX_LANGUAGE,
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
      }
    ]
  },
  {
    title: "Kreativbärt",
    description: "KI hilft bei kreativen Blockaden, indem sie schnell frische Ideen generiert. Sie entwickelt Personas, schlägt Kampagnenwinkel vor und liefert Headlines. Auch für Feedback zu Konzepten und Themensuche ist KI nützlich, um Kreativität gezielt einzusetzen.",
    image: "/images/buntbert.png",
    alt: "Kreativbärt - Konzepte & Ideen",
    task: "Konzepte & Ideen",
    buttonText: "Ideen brainstormen",
    buttonLink: "/concept-generation",
    inputType: 'text',
    operations: [
      {
        "id": "find-persona",
        "name": "Personas finden",
        "description": "Entwickelt detaillierte Personas für Ihre Zielgruppe. Diese Analyse erstellt fiktive, aber realistische Charakterprofile, die typische Vertreter Ihres Zielpublikums repräsentieren. Sie berücksichtigt demografische Daten, Verhaltensweisen, Bedürfnisse und Präferenzen, um ein ganzheitliches Bild zu schaffen. Die generierten Personas helfen Ihnen, Ihre Marketingstrategien gezielter auszurichten und Produkte oder Dienstleistungen besser auf die Bedürfnisse Ihrer Kunden abzustimmen.",
        "sampleTextFile": "/sample-texts/kreativbert-find-persona.txt",
        "promptKey": PROMPT_KEYS.FIND_PERSONA,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "campaign-angles",
        "name": "Kampagnenwinkel finden",
        "description": "Identifiziert innovative und effektive Kampagnenwinkel für Ihre Zielgruppe. Diese Analyse untersucht Markttrends, Zielgruppeninteressen und Ihre Markenwerte, um einzigartige Perspektiven für Ihre Marketingkampagnen zu entwickeln. Sie liefert kreative Ansätze, die Ihre Botschaft auf überzeugende und originelle Weise vermitteln. Die vorgeschlagenen Kampagnenwinkel helfen Ihnen, sich von der Konkurrenz abzuheben und eine stärkere Verbindung zu Ihrem Publikum aufzubauen.",
        "sampleTextFile": "/sample-texts/kreativbert-campaign-angles.txt",
        "promptKey": PROMPT_KEYS.CAMPAIGN_ANGLES,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "headline-ideas",
        "name": "Headline-Ideen",
        "description": "Generiert packende und zielgruppengerechte Headline-Ideen. Diese Analyse berücksichtigt Ihre Markenbotschaft, das Zielpublikum und aktuelle Trends, um eine Vielzahl von Überschriften zu kreieren. Sie liefert Vorschläge, die aufmerksamkeitsstark, relevant und emotional ansprechend sind. Die generierten Headlines sind darauf ausgelegt, das Interesse Ihrer Zielgruppe zu wecken und sie zum Weiterlesen oder zur gewünschten Aktion zu motivieren.",
        "sampleTextFile": "/sample-texts/kreativbert-headline-ideas.txt",
        "promptKey": PROMPT_KEYS.HEADLINE_IDEAS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 15-25 sek"
      },
      {
        "id": "idea-feedback",
        "name": "Ideenbewertung",
        "description": "Bietet eine umfassende Bewertung und konstruktives Feedback zu Ihren kreativen Ideen. Diese Analyse untersucht Ihre Konzepte auf Originalität, Relevanz für die Zielgruppe und Übereinstimmung mit Ihren Markenzielen. Sie identifiziert Stärken und Schwächen, schlägt Verbesserungen vor und gibt Einschätzungen zur potenziellen Wirksamkeit. Das Feedback hilft Ihnen, Ihre Ideen zu verfeinern und ihre Erfolgschancen zu maximieren.",
        "sampleTextFile": "/sample-texts/kreativbert-idea-feedback.txt",
        "promptKey": PROMPT_KEYS.IDEA_FEEDBACK,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "image-ideas",
        "name": "Bildideen finden",
        "description": "Generiert kreative und relevante Bildideen, die Ihre Geschichten visuell unterstützen. Diese Funktion analysiert den Kontext Ihrer Story und die Präferenzen Ihrer Zielgruppe, um passende visuelle Konzepte vorzuschlagen. Sie liefert detaillierte Beschreibungen potenzieller Bilder, die die Emotionen und Kernbotschaften Ihrer Geschichte verstärken können. Diese Vorschläge helfen Ihnen, Ihre Narrative mit fesselnden visuellen Elementen zu ergänzen, was das Engagement und die Merkfähigkeit bei Ihrem Publikum erhöht.",
        "sampleTextFile": "/sample-texts/kreativbert-image-ideas.txt",
        "promptKey": PROMPT_KEYS.IMAGE_IDEAS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "find-topics",
        "name": "Themen finden",
        "description": "Entdeckt relevante und aktuelle Themen für Ihre Zielgruppe. Diese Analyse untersucht Branchentrends, soziale Medien und Verbraucherinteressen, um Themen zu identifizieren, die Ihr Publikum fesseln. Sie liefert eine vielfältige Palette an Ideen für Content-Marketing, Social-Media-Beiträge oder Kampagnen. Die vorgeschlagenen Themen helfen Ihnen, engagierende Inhalte zu erstellen, die Ihre Zielgruppe ansprechen und Ihre Marke als relevante Stimme in Ihrer Branche positionieren.",
        "sampleTextFile": "/sample-texts/kreativbert-find-topics.txt",
        "promptKey": PROMPT_KEYS.FIND_TOPICS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 30-40 sek"
      },
      {
        "id": "analogie-generator",
        "name": "Analogie Generator", 
        "description": "Entwickelt kreative und treffende Metaphern sowie Analogien, um Produkte oder Dienstleistungen auf bildhafte Weise zu veranschaulichen. Diese Funktion analysiert die Kernaspekte des Angebots und generiert einprägsame sprachliche Bilder, die die Vorteile und Eigenschaften auf innovative Weise kommunizieren. Die erzeugten Metaphern und Analogien helfen, komplexe Konzepte greifbar zu machen und dem Zielpublikum einen neuen, fesselnden Blickwinkel auf das Produkt oder die Dienstleistung zu ermöglichen.",
        "sampleTextFile": "/sample-texts/kreativbert-analogie-generator.txt",
        "promptKey": PROMPT_KEYS.ANALOGIE_GENERATOR,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 30-40 sek"
      },
      {
        "id": "cliffhanger",
        "name": "Cliffhanger",
        "description": "Generiert fesselnde Cliffhanger-Ideen basierend auf dem aktuellen Stand einer Geschichte. Diese Funktion analysiert die vorhandenen Handlungsstränge, Charakterentwicklungen und Spannungsbögen, um überraschende und emotional aufgeladene Wendungen zu kreieren. Die erzeugten Cliffhanger zielen darauf ab, das Publikum in Atem zu halten, Spekulationen anzuregen und ein starkes Verlangen nach der Fortsetzung der Geschichte zu wecken. Die Vorschläge können dramatische Enthüllungen, unerwartete Gefahren, moralische Dilemmas oder schockierende Ereignisse beinhalten, die perfekt auf den bisherigen Verlauf der Geschichte abgestimmt sind.",
        "sampleTextFile": "/sample-texts/kreativbert-cliffhanger.txt",
        "promptKey": PROMPT_KEYS.CLIFFHANGER,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "controversial-ideas",
        "name": "Kontroverse Ideen", 
        "description": "Generiert provokante oder kontroverse Konzeptideen basierend auf einer Produktbeschreibung oder einem Kampagnenziel. Diese Funktion zielt darauf ab, Aufmerksamkeit zu erregen und Diskussionen anzuregen, indem sie unkonventionelle und möglicherweise polarisierende Ansätze vorschlägt. Die erzeugten Ideen sind darauf ausgelegt, die Grenzen des Konventionellen zu überschreiten und eine starke Reaktion beim Zielpublikum hervorzurufen, wobei ethische Grenzen und die Markenidentität berücksichtigt werden.",
        "sampleTextFile": "/sample-texts/kreativbert-controversial-ideas.txt",
        "promptKey": PROMPT_KEYS.CONTROVERSIAL_IDEAS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 30-40 sek"
      },
      {
        "id": "crossover-concepts",
        "name": "Crossover Konzept", 
        "description": "Entwickelt kreative Marketingkonzepte durch Kombination zweier scheinbar unverbundener Themen oder Produkte. Diese Funktion analysiert die einzigartigen Eigenschaften beider Elemente und generiert innovative Ideen, wie sie synergetisch in einer Marketingkampagne vereint werden können. Die erzeugten Crossover-Konzepte zielen darauf ab, Aufmerksamkeit zu erregen, neue Zielgruppen anzusprechen und frische Perspektiven auf bekannte Produkte oder Themen zu eröffnen.",
        "sampleTextFile": "/sample-texts/kreativbert-crossover-concepts.txt",
        "promptKey": PROMPT_KEYS.CROSSOVER_CONCEPTS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 30-40 sek"
      }
    ]
  },
  {
    title: "Storybärt",
    description: "Fesselnde Geschichten treffen den Nerv deiner Zielgruppe und bleiben im Gedächtnis. Mit KI-Unterstützung verbesserst du dein Storytelling und erreichst dein Publikum genau dort, wo es emotional berührt wird.",
    image: "/images/datenbert.png",
    alt: "Storybärt - Storytelling",
    task: "Zielgruppen & Personalisierung",
    buttonText: "Storytelling starten",
    buttonLink: "/storytelling",
    inputType: 'text',
    operations: [
      {
        "id": "better-Storytelling",
        "name": "Storytelling verbessern",
        "description": "Analysiert und optimiert Ihre Storytelling-Techniken für maximale Wirkung. Diese Funktion untersucht die Struktur, den Spannungsbogen und die Charakterentwicklung Ihrer Geschichten. Sie bietet konkrete Vorschläge zur Verbesserung des Narrativs, zur Steigerung der Leserengagement und zur effektiveren Vermittlung Ihrer Kernbotschaft. Die Analyse hilft Ihnen, Ihre Geschichten so zu gestalten, dass sie Ihr Publikum fesseln und nachhaltig in Erinnerung bleiben.",
        "sampleTextFile": "/sample-texts/storybert-better-storytelling.txt",
        "promptKey": PROMPT_KEYS.BETTER_STORYTELLING,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "more-emotions",
        "name": "Mehr Emotionen",
        "description": "Reichert Ihre Geschichten mit tieferen emotionalen Elementen an. Diese Funktion identifiziert Möglichkeiten, um mehr Gefühl und Empathie in Ihre Narrative einzubringen. Sie schlägt spezifische Techniken vor, wie Beschreibungen, Dialoge oder Situationen, die bestimmte Emotionen beim Leser hervorrufen können. Ziel ist es, eine stärkere emotionale Verbindung zwischen Ihrer Geschichte und dem Publikum herzustellen, was zu einer höheren Merkfähigkeit und einem stärkeren Engagement führt.",
        "sampleTextFile": "/sample-texts/storybert-more-emotions.txt",
        "promptKey": PROMPT_KEYS.MORE_EMOTIONS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "find-painpoints",
        "name": "Painpoints finden",
        "description": "Identifiziert und analysiert die Schmerzpunkte Ihrer Zielgruppe. Diese Funktion untersucht Markttrends, Kundenrückmeldungen und Branchendaten, um die wichtigsten Herausforderungen und Bedürfnisse Ihres Publikums zu ermitteln. Sie liefert detaillierte Einblicke in die Probleme, die Ihre Zielgruppe am meisten beschäftigen, und zeigt auf, wie Ihre Produkte oder Dienstleistungen diese ansprechen können. Diese Erkenntnisse helfen Ihnen, Ihre Marketingbotschaften gezielter auszurichten und Lösungen zu entwickeln, die direkt auf die Bedürfnisse Ihrer Kunden eingehen.",
        "sampleTextFile": "/sample-texts/storybert-find-painpoints.txt",
        "promptKey": PROMPT_KEYS.FIND_PAINPOINTS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "find-intentions",
        "name": "Intentionen finden",
        "description": "Analysiert und identifiziert die Absichten und Motivationen Ihrer Zielgruppe. Diese Untersuchung nutzt Daten und Trends, um die Bedürfnisse, Wünsche und Ziele Ihres Publikums zu verstehen. Sie liefert Einblicke in die Beweggründe hinter Kaufentscheidungen und Verhaltensweisen. Das Verständnis dieser Intentionen ermöglicht es Ihnen, Ihre Marketingstrategien und Produktangebote gezielter auf die wahren Bedürfnisse Ihrer Kunden auszurichten.",
        "sampleTextFile": "/sample-texts/storybert-find-intentions.txt",
        "promptKey": PROMPT_KEYS.FIND_INTENTIONS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "cultural-adaptation",
        "name": "Kulturelle Anpassung",
        "description": "Entwickelt maßgeschneiderte Anpassungsvorschläge, um eine gegebene Geschichte für eine spezifische Kultur oder Region relevanter und ansprechender zu gestalten. Diese Funktion analysiert sowohl die Kernelemente der ursprünglichen Geschichte als auch die kulturellen Besonderheiten, Werte und Präferenzen der Zielkultur. Sie generiert dann kreative Ideen, wie die Geschichte modifiziert werden kann, um kulturelle Resonanz zu erzeugen, ohne dabei ihre wesentliche Botschaft oder ihren Unterhaltungswert zu verlieren. Die Vorschläge können Änderungen in der Handlung, den Charakteren, dem Setting, den Dialogen oder den thematischen Elementen umfassen.",
        "sampleTextFile": "/sample-texts/storybert-cultural-adaptation.txt",
        "promptKey": PROMPT_KEYS.CULTURAL_ADAPTATION,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "explain-text",
        "name": "Text erklären",
        "description": "Bietet eine detaillierte Erklärung des Textes, einschließlich Kontext, Bedeutung und möglicher Interpretationen.",
        "sampleTextFile": "/sample-texts/storybert-explain-text.txt",
        "promptKey": PROMPT_KEYS.EXPLAIN_TEXT,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 30-40 sek"
      },
      {
        "id": "archetype-storytelling",
        "name": "Zielgruppen Storytelling (Archetypen)",
        "description": "Transformiert einen gegebenen Text oder Input in drei verschiedene Schreibstile, die auf den Marketing-Archetypen 'Der Weise', 'Der Schöpfer' und 'Der Held' basieren. Diese Funktion analysiert den Eingabetext und generiert drei Varianten, die jeweils die charakteristischen Merkmale, Tonalitäten und Perspektiven der genannten Archetypen widerspiegeln. Der Weise-Stil betont Wissen, Einsicht und Weisheit; der Schöpfer-Stil fokussiert auf Innovation, Kreativität und Selbstausdruck; der Held-Stil hebt Mut, Überwindung von Herausforderungen und inspirierendes Handeln hervor. Diese Umwandlung ermöglicht es, denselben Inhalt auf verschiedene Zielgruppen zuzuschneiden und unterschiedliche emotionale Resonanzen zu erzeugen.",
        "sampleTextFile": "/sample-texts/storybert-archetype-storytelling.txt",
        "promptKey": PROMPT_KEYS.ARCHETYPE_STORYTELLING,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 30-40 sek"
      },
      {
        "id": "text-humanizer",
        "name": "KI Text Humanizer",
        "description": "Schreibt in einem persönlichen Stil und ersetzt bestimmte Wörter oder Phrasen im Text, um ki-generierte Texte natürlicher wirken zu lassen.",
        "sampleTextFile": "/sample-texts/storybert-text-humanizer.txt",
        "promptKey": PROMPT_KEYS.TEXT_HUMANIZER,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 30-40 sek"
      }
    ]
  },
  {
    title: "Webbärt",
    description: "Websites sind wie Schaufenster – sie müssen auffallen und überzeugen. Umfassende Analysetools decken Verbesserungspotenziale auf und liefern konkrete Vorschläge: von SEO-Strategien über Content-Optimierung bis zu Social-Media-Ideen.",
    image: "/images/webbert.png",
    alt: "Webbärt - SEO- und Website Analysen",
    task: "SEO & Website Analysen",
    buttonText: "Website analysieren",
    buttonLink: "/website-analysis",
    inputType: "url",
    operations: [
      {
        "id": "seo-meta-generator",
        "name": "SEO-Meta-Generator",
        "description": "Erstellt optimierte Meta-Tags für Ihre Webseite, um die Sichtbarkeit in Suchmaschinen zu verbessern. Diese Funktion analysiert den Inhalt Ihrer Seite und generiert relevante, keyword-reiche Meta-Titel und Meta-Beschreibungen. Sie berücksichtigt dabei Best Practices für SEO, wie optimale Länge und Keywordplatzierung, um die Chancen auf ein höheres Ranking in den Suchergebnissen zu maximieren.",
        "sampleTextFile": "/sample-texts/webbert-seo-meta-generator.txt",
        "promptKey": PROMPT_KEYS.SEO_META_GENERATOR,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "seo-faq-generator",
        "name": "SEO-FAQ Generator",
        "description": "Generiert einen SEO-freundlichen FAQ-Abschnitt für Ihre Website. Diese Funktion analysiert Ihre Inhalte und identifiziert häufig gestellte Fragen zu Ihrem Thema oder Produkt. Sie erstellt dann prägnante, informative Antworten, die sowohl für Besucher nützlich sind als auch für Suchmaschinen optimiert sind. Dies kann dazu beitragen, Ihre Seite in den Featured Snippets von Suchmaschinen zu platzieren und die organische Sichtbarkeit zu erhöhen.",
        "sampleTextFile": "/sample-texts/webbert-seo-faq-generator.txt",
        "promptKey": PROMPT_KEYS.SEO_FAQ_GENERATOR,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "seo-keyword-recommendations",
        "name": "SEO-Keyword-Analyse",
        "description": "Führt eine umfassende Keyword-Analyse für Ihre Website durch. Diese Funktion untersucht Ihre Inhalte, Branchentrends und Suchvolumina, um relevante Keywords zu identifizieren. Sie liefert Empfehlungen für Haupt- und Long-Tail-Keywords, die das Potenzial haben, Ihre Suchmaschinenrankings zu verbessern. Die Analyse hilft Ihnen, Ihre Content-Strategie zu optimieren und Lücken in Ihrer Keyword-Abdeckung zu schließen.",
        "sampleTextFile": "/sample-texts/webbert-seo-keyword-recommendations.txt",
        "promptKey": PROMPT_KEYS.SEO_KEYWORD_RECOMMENDATIONS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "linkedin-teaser",
        "name": "LinkedIn Teaser",
        "description": "Erstellt einen fesselnden LinkedIn-Teaser für Ihre Website. Diese Funktion analysiert Ihre Webinhalte und generiert einen kurzen, ansprechenden Text, der die Kernbotschaft Ihrer Seite effektiv für die LinkedIn-Plattform aufbereitet. Der Teaser wird so gestaltet, dass er die Aufmerksamkeit Ihrer Zielgruppe weckt, Neugier erzeugt und zum Klicken und Weiterlesen animiert. Dies hilft Ihnen, Ihre Website-Inhalte effektiv auf LinkedIn zu promoten und mehr qualifizierten Traffic zu generieren.",
        "sampleTextFile": "/sample-texts/webbert-linkedin-teaser.txt",
        "promptKey": PROMPT_KEYS.LINKEDIN_TEASER,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "linkedin-post-ideas",
        "name": "LinkedIn Post-Ideen",
        "description": "Generiert kreative und relevante Post-Ideen für Ihre LinkedIn-Seite. Diese Funktion analysiert Ihre Website-Inhalte, Branchentrends und LinkedIn-Best-Practices, um eine Vielzahl von Postvorschlägen zu erstellen. Sie liefert Ideen für verschiedene Postformate wie Textbeiträge, Infografiken oder Umfragen, die auf Ihre Zielgruppe zugeschnitten sind. Diese Vorschläge helfen Ihnen, Ihre LinkedIn-Präsenz zu stärken, das Engagement zu erhöhen und Ihre Expertise zu präsentieren.",
        "sampleTextFile": "/sample-texts/webbert-linkedin-post-ideas.txt",
        "promptKey": PROMPT_KEYS.LINKEDIN_POST_IDEAS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "similar-websites",
        "name": "Ähnliche Websites",
        "description": "Identifiziert Websites, die Ihrer Zielgruppe gefallen könnten. Diese Funktion analysiert Ihre Website-Inhalte, Themen und Zielgruppe, um ähnliche Seiten im Web zu finden. Sie liefert eine Liste von Websites mit verwandten Themen, ähnlicher Ausrichtung oder ergänzenden Inhalten. Diese Informationen können für Wettbewerbsanalysen, Kooperationsmöglichkeiten oder zur Inspiration für Ihre eigene Content-Strategie genutzt werden.",
        "sampleTextFile": "/sample-texts/webbert-similar-websites.txt",
        "promptKey": PROMPT_KEYS.SIMILAR_WEBSITES,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "website-summary",
        "name": "Website Summary",
        "description": "Erstellt eine prägnante Zusammenfassung Ihrer Website. Diese Funktion analysiert den gesamten Inhalt Ihrer Seite und destilliert die wichtigsten Informationen in eine klare, leicht verständliche Übersicht. Die Zusammenfassung hebt Ihre Hauptbotschaften, Produkte oder Dienstleistungen sowie Ihre einzigartigen Verkaufsargumente hervor. Dies ist besonders nützlich für schnelle Überblicke, Präsentationen oder als Basis für Marketing-Materialien.",
        "sampleTextFile": "/sample-texts/webbert-website-summary.txt",
        "promptKey": PROMPT_KEYS.WEBSITE_SUMMARY,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "website-key-insights",
        "name": "Key Insights",
        "description": "Identifiziert und extrahiert die wichtigsten Erkenntnisse und Schlüsselinformationen aus Ihrer Website. Diese Funktion analysiert Ihre Inhalte tiefgehend, um zentrale Themen, Wertversprechen und einzigartige Aspekte herauszuarbeiten. Sie liefert eine Liste von Key Insights, die Ihre Kernkompetenzen, Marktpositionierung und wichtigsten Botschaften zusammenfassen. Diese Erkenntnisse können für strategische Entscheidungen, Content-Planungen oder zur Verfeinerung Ihrer Markenkommunikation genutzt werden.",
        "sampleTextFile": "/sample-texts/webbert-website-key-insights.txt",
        "promptKey": PROMPT_KEYS.WEBSITE_KEY_INSIGHTS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "content-check",
        "name": "Content Check",
        "description": "Führt eine umfassende Überprüfung der Inhalte Ihrer Website durch. Diese Funktion analysiert Texte auf Rechtschreibung, Grammatik, Konsistenz und Lesbarkeit. Sie identifiziert potenzielle Probleme wie veraltete Informationen, gebrochene Links oder inkonsistente Formatierungen. Darüber hinaus bewertet sie die Qualität und Relevanz der Inhalte für Ihre Zielgruppe und gibt Vorschläge zur Verbesserung. Der Content Check hilft Ihnen, die Professionalität und Effektivität Ihrer Website-Inhalte zu steigern.",
        "sampleTextFile": "/sample-texts/webbert-content-check.txt",
        "promptKey": PROMPT_KEYS.CONTENT_CHECK,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 15-25 sek"
      }
    ]
  },
  {
    title: "Datenbärt",
    description: "Daten sind wie ein Geheimspiel – sie müssen aufgedeckt werden und verraten Ihnen, was wirklich zählt. Mit KI-Unterstützung analysieren wir Ihre Daten und liefern klare Erkenntnisse, die Ihnen helfen, Ihre Entscheidungen zu verbessern und Ihre Zukunft zu planen.",
    image: "/images/projektbert.png",
    alt: "Datenbärt - Datenanalyse & Datenverarbeitung",
    task: "Datenanalyse & Datenverarbeitung",
    buttonText: "Daten analysieren",
    buttonLink: "/data-analysis",
    inputType: "text",
    operations: [
      {
        "id": "generate-sample-data",
        "name": "Daten generieren",
        "description": "Generiert eine Vielzahl von Daten, die Ihre Datenanalyse unterstützen. ",
        "sampleTextFile": "/sample-texts/datenbert-generate-sample-data.txt",
        "promptKey": PROMPT_KEYS.GENERATE_SAMPLE_DATA,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "extract-entities",
        "name": "Entitäten extrahieren",
        "description": "Extrahiert relevante Entitäten aus Ihren Daten. Diese Funktion analysiert Ihre Daten und extrahiert wichtige Entitäten wie Personen, Orte, Organisationen oder Daten. ",
        "sampleTextFile": "/sample-texts/datenbert-extract-entities.txt",
        "promptKey": PROMPT_KEYS.EXTRACT_ENTITIES,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "transform-data",
        "name": "Daten transformieren",
        "description": "Transformiert Ihre Daten in eine für Sie benötigte Form. Diese Funktion analysiert Ihre Daten und transformiert sie in eine für Sie benötigte Form. ",
        "sampleTextFile": "/sample-texts/datenbert-transform-data.txt",
        "promptKey": PROMPT_KEYS.TRANSFORM_DATA,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "create-db-schema",
        "name": "Datenbank-Schema erstellen",
        "description": "Erstellt ein Datenbank-Schema für Ihre Daten. Diese Funktion analysiert Ihre Daten und erstellt ein Datenbank-Schema für Sie. ",
        "sampleTextFile": "/sample-texts/datenbert-create-db-schema.txt",
        "promptKey": PROMPT_KEYS.CREATE_DB_SCHEMA,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "standardize-data",
        "name": "Daten standardisieren",
        "description": "Datenstandardisierung: Transformiere Daten in ein einheitliches Format, z. B. durch Normalisierung oder Skalierung.",
        "sampleTextFile": "/sample-texts/datenbert-standardize-data.txt",
        "promptKey": PROMPT_KEYS.STANDARDIZE_DATA,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "find-missing-data",
        "name": "Daten fehlen",
        "description": "Identifiziert fehlende Daten in Ihren Datenquellen und liefert Vorschläge zur Datenerfassung oder -aufbereitung.",
        "sampleTextFile": "/sample-texts/datenbert-find-missing-data.txt",
        "promptKey": PROMPT_KEYS.FIND_MISSING_DATA,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "find-anomalies",
        "name": "Datenanomalien finden",
        "description": "Anomalieerkennung: Finde ungewöhnliche Datenpunkte oder Ausreißer in einem Datensatz, z. B. betrügerische Transaktionen.",
        "sampleTextFile": "/sample-texts/datenbert-find-anomalies.txt",
        "promptKey": PROMPT_KEYS.FIND_ANOMALIES,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 20-30 sek"
      },
      {
        "id": "find-trends",
        "name": "Trends finden",
        "description": "Trendanalyse: Identifiziere Trends und Muster in Zeitreihendaten, z. B. Verkaufszahlen oder Website-Traffic.",
        "sampleTextFile": "/sample-texts/datenbert-find-trends.txt",
        "promptKey": PROMPT_KEYS.FIND_TRENDS,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 25-35 sek"
      },
      {
        "id": "clean-data",
        "name": "Daten reinigen",
        "description": "Datenbereinigung: Entferne Duplikate, korrigiere Fehler und fülle fehlende Werte.",
        "sampleTextFile": "/sample-texts/datenbert-clean-data.txt",
        "promptKey": PROMPT_KEYS.CLEAN_DATA,
        "languageModel": "anthropic/claude-3.5-sonnet",
        "makeBranch": "mainOps",
        "creditCost": 3,
        "estimatedTotalTime": "ca. 15-25 sek"
      }
    ]
  }
];

export default aiAssistants;
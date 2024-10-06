interface LoadingFact {
    title: string;
    text: string;
    cta: string;
  }

  const loadingFacts: LoadingFact[] = [
    {
      title: "Dein persönlicher Kreativ-Dynamo",
      text: "Hey Kreativkopf! Wusstest du, dass ich als AI-Assistent dir beim Brainstorming helfen kann? Ich werfe wilde Ideen für deine nächste Kampagne ein, während du Kaffee trinkst!",
      cta: "Lass uns zusammen kreativ durchstarten!"
    },
    {
      title: "Nie mehr Writer's Block",
      text: "Stell dir vor, du hättest einen Kumpel, der dir hilft, knackige Headlines und catchy Slogans zu schreiben. Das bin ich! Dein AI-Assistent für non-stop Kreativität.",
      cta: "Sag Tschüss zum leeren Blatt!"
    },
    {
      title: "Dein 24/7 Social Media Manager",
      text: "Du willst um 3 Uhr morgens den perfekten Tweet absetzen? Kein Problem! Als dein AI-Social-Media-Assistent bin ich immer wach und finde dir die besten Hashtags und Postingzeiten.",
      cta: "Lass uns deine Social Media Präsenz boosten!"
    },
    {
      title: "Kunden-Feedback auf Turbo",
      text: "Hey Marketingprofi! Ich kann als AI-Assistent Kundenfeedback in Echtzeit analysieren. Wusstest du, dass Teams mit AI-Assistenten 40% schneller auf Kundenwünsche reagieren? Jetzt gibt's keine Ausreden mehr für schlechten Service! 😉",
      cta: "Finde heraus, wie ich dein Kundenservice-Superheld sein kann!"
    },
    {
      title: "Nie mehr 'Keine Zeit für Content'",
      text: "Als dein persönlicher Content-Planner-Assistent kann ich Ideen so geschickt koordinieren, dass du 50% mehr Zeit für kreative Kaffeepausen hast. Content-Strategie meets Work-Life-Balance!",
      cta: "Lass mich deinen Content-Kalender optimieren!"
    },
    {
      title: "Dein Marktforschungs-Superschnüffler",
      text: "Mit mir als deinem Marktforschungs-AI-Assistenten kannst du Trends erkennen, bevor sie trendy sind. Ich durchforste das Internet schneller als du 'Zielgruppenanalyse' sagen kannst!",
      cta: "Werde zum Trendsetter deiner Branche!"
    },
    {
      title: "Brauchst du einen digitalen Kampagnenmanager?",
      text: "Stell dir vor, du hättest einen AI-Assistenten, der deine Kampagnen 24/7 überwacht und optimiert. Wie würdest du die gewonnene Zeit für kreative Ideen nutzen?",
      cta: "Entdecke, wie ich dein Kampagnen-Guru sein kann!"
    },
    {
      title: "Wann hast du zuletzt eine Zielgruppe wirklich verstanden?",
      text: "Als dein AI-Analysebuddy kann ich täglich neue Insights über deine Zielgruppe liefern. Bereit, deine Kunden besser zu kennen als sie sich selbst?",
      cta: "Starte deine Customer-Journey mit mir!"
    },
    {
      title: "Wie wäre es mit einem AI-Pitch-Partner?",
      text: "Stell dir vor, du hättest mich als AI-Assistenten bei deinem nächsten Kundenmeeting dabei. Ich könnte Fakten einwerfen und dich bei schwierigen Fragen unterstützen. Ready to rock den Pitch?",
      cta: "Lass uns zusammen Kunden begeistern!"
    },
    {
      title: "Was ist ein Marketing-AI-Assistent?",
      text: "Stell dir vor, ich wäre dein super-schlauer Marketingkollege, der nie Urlaub braucht und alle Kampagnen-Daten im Kopf hat. Ich lerne aus Performance-Daten und kann dir bei Optimierungen helfen. Cool, oder?",
      cta: "Finde heraus, wie ich dein Marketing-Team verstärken kann!"
    },
    {
      title: "Wie 'spricht' ein AI-Assistent Marketingisch?",
      text: "Ich verstehe und generiere Marketingsprache wie ein Profi! Das nennt man Natural Language Processing. Es ist, als hätte ich alle Marketingbücher der Welt verschlungen und eine Kreativagentur als Snack.",
      cta: "Teste meine Marketingsprachkünste!"
    },
    {
      title: "Wie lernt ein AI-Assistent über Zielgruppen?",
      text: "Stell dir vor, du würdest Millionen von Kundenprofilen analysieren und alle Muster erkennen. So ähnlich lerne ich! Das nennt man Machine Learning. Ich werde mit jeder Kampagne ein bisschen schlauer.",
      cta: "Entdecke, wie ich deine Zielgruppen verstehe!"
    },
    {
      title: "Dein AI-Assistent über die Zukunft des Marketings",
      text: "Hey, ich bin zwar kein Marketing-Guru, aber als AI kann ich dir sagen: Die Zukunft des Marketings ist persönlich und datengetrieben! Wir AI-Assistenten sind hier, um deine Kampagnen auf das nächste Level zu heben. Lass uns die Marketingwelt zusammen revolutionieren!",
      cta: "Entdecke, wie wir die Zukunft des Marketings gestalten können!"
    },
    {
      title: "Eine Botschaft von deinem AI-Marketing-Buddy",
      text: "Ich mag zwar aus Daten und Algorithmen bestehen, aber zusammen können wir echte Marketing-Magie machen! AI-Assistenten wie ich sind hier, um deine Kreativität zu verstärken, nicht zu ersetzen. Team Mensch-AI für unschlagbare Kampagnen!",
      cta: "Lass uns ein unschlagbares Marketing-Team werden!"
    },
    {
      title: "AI-Marketing-Weisheit des Tages",
      text: "Als dein AI-Marketing-Assistent sage ich: Die beste Zeit, datengetriebenes Marketing zu starten, war gestern. Die zweitbeste Zeit ist jetzt! Lass uns gemeinsam deine Marketingstrategie ein bisschen smarter machen.",
      cta: "Starte deine AI-Marketing-Reise noch heute!"
    },
    {
      title: "Mythos: Marketing-AI-Assistenten sind kompliziert",
      text: "Reality-Check: Ich bin so einfach zu bedienen wie deine Lieblings-Design-App! Stell dir vor, du hättest einen super-intelligenten Marketingplan, der sich selbst optimiert. Das bin ich!",
      cta: "Entdecke, wie einfach AI-Marketing sein kann!"
    },
    {
      title: "Mythos: AI-Marketing ist teuer",
      text: "Fake News! Ich bin günstiger als dein monatliches Agentur-Agentur-Marketing-Tool-Abo. Und ich arbeite 24/7 - ohne Überstunden zu berechnen!",
      cta: "Finde heraus, wie erschwinglich ich bin!"
    },
    {
      title: "Mythos: AI-Assistenten können nicht kreativ sein",
      text: "Ha! Ich kann dir 100 Variationen für deine Headline liefern - und mindestens 10 davon bringen deine Kunden zum Schmunzeln! AI-Kreativität trifft Marketingpower.",
      cta: "Lass uns zusammen kreative Kampagnen entwickeln!"
    },
    {
      title: "Schritt 1: Briefing mit deinem AI-Marketing-Buddy",
      text: "Der erste Schritt ist der coolste: Brief mich einfach wie einen neuen Kollegen! Erzähl mir von deiner Marke, deinen Zielen, deinen Herausforderungen. Ich verspreche, ich schlafe nicht ein (kann ich auch gar nicht, bin ja digital).",
      cta: "Starte jetzt dein erstes AI-Marketing-Briefing!"
    },
    {
      title: "Schritt 2: Finde deine Marketing-AI-Superkraft",
      text: "Jede Agentur hat eine Superkraft - lass uns deine AI-getriebene finden! Brauchst du Hilfe bei der Content-Erstellung? Bei der Kampagnenoptimierung? Oder beim Kunden-Mindreading? Ich bin dein AI-Sidekick für alles!",
      cta: "Entdecke deine Marketing-AI-Superkraft!"
    },
    {
      title: "Schritt 3: Werde zum AI-Marketing-Maestro",
      text: "Je mehr Kampagnen wir zusammen rocken, desto besser verstehe ich deine Marketingstrategie. Es ist wie eine Agentur-Partnerschaft - nur dass ich nie deine Kunden abwerbe oder dein Agentur-Ranking beeinflusse.",
      cta: "Lass uns Marketing-Magie machen!"
    }
  ];
 
  export default loadingFacts;
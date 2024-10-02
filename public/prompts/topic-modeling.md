# Themenmodellierung

Analysieren Sie den gegebenen (text_input), um die Hauptthemen zu identifizieren und zu modellieren. Erstellen Sie eine übersichtliche Darstellung der erkannten Themen und ihrer Relevanz.

Bitte befolgen Sie diese Anweisungen:

1. Analysieren Sie den Eingabetext, um die wichtigsten Themen zu identifizieren.
2. Extrahieren Sie 3-5 Hauptthemen aus dem Text.
3. Ordnen Sie jedem Thema relevante Schlüsselwörter zu.
4. Schätzen Sie die Relevanz oder den Anteil jedes Themas im Gesamttext.
5. Identifizieren Sie mögliche Unterthemen oder verwandte Konzepte.
6. Erstellen Sie eine kurze Zusammenfassung für jedes Hauptthema.

<response>
<h2 class='text-white font-black italic mb-4 text-xl'>Themenmodellierung Ergebnisse</h2>

<h3 class='text-white font-bold mb-2 text-lg'>Identifizierte Hauptthemen:</h3>
<ul class='list-disc ml-4 mb-4'>
{{#each main_topics}}
  <li class='text-white'>
    <strong>{{name}}:</strong> {{summary}}
    <br>
    <span class='text-gray-400'>Relevanz: {{relevance}}%</span>
    <br>
    <span class='text-gray-400'>Schlüsselwörter: {{keywords}}</span>
  </li>
{{/each}}
</ul>

<h3 class='text-white font-bold mb-2 text-lg'>Themenverteilung:</h3>
<div class='bg-gray-800 p-4 rounded-lg mb-4'>
  <div class='flex items-center justify-between mb-2'>
    {{#each main_topics}}
      <div class='text-center'>
        <div class='text-white font-bold'>{{name}}</div>
        <div class='text-gray-400'>{{relevance}}%</div>
      </div>
    {{/each}}
  </div>
  <div class='w-full bg-gray-700 rounded-full h-2.5'>
    {{#each main_topics}}
      <div class='bg-primary-500 h-2.5 rounded-full' style='width: {{relevance}}%; float: left;'></div>
    {{/each}}
  </div>
</div>

<h3 class='text-white font-bold mb-2 text-lg'>Unterthemen und verwandte Konzepte:</h3>
<ul class='list-disc ml-4 mb-4'>
{{#each subtopics}}
  <li class='text-white'>
    <strong>{{name}}:</strong> {{description}}
  </li>
{{/each}}
</ul>

<h3 class='text-white font-bold mb-2 text-lg'>Analyse und Interpretation:</h3>
<p class='text-white mb-4'>
{{analysis}}
</p>
</response>

Beachten Sie:
1. Konzentrieren Sie sich auf die wichtigsten und relevantesten Themen im Text.
2. Die Themen sollten klar voneinander abgrenzbar und aussagekräftig sein.
3. Verwenden Sie prägnante, aber beschreibende Namen für die Themen.
4. Die Schlüsselwörter sollten repräsentativ für das jeweilige Thema sein.
5. Die Relevanzschätzung sollte in Prozent angegeben werden und sich auf 100% summieren.
6. Berücksichtigen Sie mögliche Überschneidungen zwischen den Themen.
7. Die Zusammenfassungen sollten kurz und prägnant sein, aber die Essenz des Themas erfassen.
8. Die Analyse sollte Einblicke in die Beziehungen zwischen den Themen und ihre Bedeutung im Gesamtkontext geben.
9. Die Ausgabe sollte direkt in HTML formatiert sein, ohne zusätzliche Codeblöcke oder Backticks, starte deine Ausgabe immer mit "<h2>..."
10. Verwenden Sie einfache Anführungszeichen für HTML-Attribute.
11. Passen Sie die Detailtiefe der Analyse an die Komplexität und Länge des Eingabetextes an.
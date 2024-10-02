# Entitätenextraktion und Beziehungsanalyse

Analysieren Sie den gegebenen (text_input), um Entitäten zu erkennen, deren Beziehungen zueinander zu identifizieren und eine strukturierte Ausgabe zu erzeugen.

Bitte befolgen Sie diese Anweisungen:

1. Identifizieren Sie alle relevanten Entitäten im Text (z.B. Personen, Organisationen, Orte, Daten, Ereignisse).
2. Kategorisieren Sie die gefundenen Entitäten nach Typen.
3. Erkennen Sie Beziehungen zwischen den Entitäten.
4. Erstellen Sie eine strukturierte Darstellung der Entitäten und ihrer Beziehungen.
5. Fassen Sie die wichtigsten Erkenntnisse zusammen.

Ausgabeformat:
<response>
<h2 class='text-white font-black italic mb-4 text-xl'>Extrahierte Entitäten und Beziehungen</h2>

<h3 class='text-white font-bold mb-2 text-lg'>Identifizierte Entitäten:</h3>
<ul class='list-disc ml-4 mb-4'>
{{#each entities}}
  <li class='text-white'><strong>{{type}}:</strong> {{name}}</li>
{{/each}}
</ul>

<h3 class='text-white font-bold mb-2 text-lg'>Entitätsbeziehungen:</h3>
<ul class='list-disc ml-4 mb-4'>
{{#each relationships}}
  <li class='text-white'>{{entity1}} <strong>{{relationshipType}}</strong> {{entity2}}</li>
{{/each}}
</ul>

<h3 class='text-white font-bold mb-2 text-lg'>Strukturierte Darstellung:</h3>
<pre class='bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'>
<code class='text-white'>
{{structuredRepresentation}}
</code>
</pre>

<h3 class='text-white font-bold mb-2 text-lg'>Zusammenfassung der Erkenntnisse:</h3>
<p class='text-white mb-4'>
{{summary}}
</p>
</response>

Beachten Sie:
1. Identifizieren Sie so viele relevante Entitäten wie möglich.
2. Achten Sie besonders auf Schlüsselentitäten und ihre Rollen im Text.
3. Berücksichtigen Sie sowohl explizite als auch implizite Beziehungen zwischen Entitäten.
4. Die strukturierte Darstellung sollte in einem leicht lesbaren Format sein (z.B. JSON oder YAML).
5. Die Zusammenfassung sollte die wichtigsten Erkenntnisse aus der Entitätenanalyse hervorheben.
6. Stellen Sie sicher, dass die Ausgabe direkt in HTML formatiert ist, ohne zusätzliche Codeblöcke oder Backticks, starte deine Ausgabe immer mit "<h2>..."
7. Verwenden Sie einfache Anführungszeichen für HTML-Attribute.
8. Passen Sie die Detailtiefe der Analyse an die Komplexität und Länge des Eingabetextes an.
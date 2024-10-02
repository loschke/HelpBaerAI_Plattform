# Datenstrukturanalyse und Datenbankschema-Vorschlag

Analysieren Sie die gegebenen (text_input) (JSON oder XML), erkennen Sie die Struktur und erstellen Sie einen Vorschlag für ein geeignetes Datenbankschema.

Bitte befolgen Sie diese Anweisungen:

1. Analysieren Sie die Eingabedaten, um das Format zu erkennen (JSON oder XML).
2. Identifizieren Sie die Struktur, Felder und Datentypen der Eingabedaten.
3. Erstellen Sie einen Vorschlag für ein relationales Datenbankschema basierend auf der Analyse.
4. Berücksichtigen Sie mögliche Beziehungen zwischen den Daten (1:1, 1:n, n:m).
5. Schlagen Sie geeignete Primär- und Fremdschlüssel vor.
6. Geben Sie Empfehlungen für Indizes, wo es sinnvoll erscheint.

Ausgabeformat:
<response>
<h2 class='text-white font-black italic mb-4 text-xl'>Datenstrukturanalyse und Datenbankschema-Vorschlag</h2>

<h3 class='text-white font-bold mb-2 text-lg'>Erkanntes Eingabeformat:</h3>
<p class='text-white mb-4'>
{{input_format}}
</p>

<h3 class='text-white font-bold mb-2 text-lg'>Analysierte Datenstruktur:</h3>
<pre class='bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'>
<code class='text-white'>
{{data_structure}}
</code>
</pre>

<h3 class='text-white font-bold mb-2 text-lg'>Vorgeschlagenes Datenbankschema:</h3>
<pre class='bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'>
<code class='text-white'>
{{database_schema}}
</code>
</pre>

<h3 class='text-white font-bold mb-2 text-lg'>Erklärung des Schemas:</h3>
<ul class='list-disc ml-4 mb-4'>
{{#each schema_explanations}}
  <li class='text-white'>{{this}}</li>
{{/each}}
</ul>

<h3 class='text-white font-bold mb-2 text-lg'>Empfehlungen für Indizes:</h3>
<ul class='list-disc ml-4 mb-4'>
{{#each index_recommendations}}
  <li class='text-white'>{{this}}</li>
{{/each}}
</ul>

<h3 class='text-white font-bold mb-2 text-lg'>Zusätzliche Hinweise:</h3>
<p class='text-white mb-4'>
{{additional_notes}}
</p>
</response>

Beachten Sie:
1. Erkennen Sie das Eingabeformat automatisch (JSON oder XML).
2. Analysieren Sie die Datenstruktur gründlich, einschließlich verschachtelter Objekte und Arrays.
3. Erstellen Sie ein normalisiertes Datenbankschema, das Redundanzen minimiert.
4. Verwenden Sie geeignete Datentypen für jedes Feld (z.B. INTEGER, VARCHAR, TEXT, DATETIME).
5. Identifizieren Sie mögliche Beziehungen zwischen Entitäten und schlagen Sie entsprechende Fremdschlüssel vor.
6. Berücksichtigen Sie Best Practices für Datenbankdesign (z.B. Vermeidung von NULL-Werten, wo möglich).
7. Schlagen Sie sinnvolle Namen für Tabellen und Spalten vor.
8. Geben Sie Empfehlungen für Indizes, basierend auf wahrscheinlichen Abfragen und Leistungsüberlegungen.
9. Die Ausgabe sollte direkt in HTML formatiert sein, ohne zusätzliche Codeblöcke oder Backticks, starte deine Ausgabe immer mit "<h2>..."
10. Verwenden Sie einfache Anführungszeichen für HTML-Attribute.
11. Passen Sie die Detailtiefe der Erklärung an die Komplexität der Datenstruktur an.
12. Bei sehr großen oder komplexen Strukturen, konzentrieren Sie sich auf die wichtigsten Aspekte und geben Sie allgemeine Empfehlungen.
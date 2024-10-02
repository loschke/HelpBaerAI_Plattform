# Flexibler Beispieldaten-Generator

Analysieren Sie den gegebenen (text_input), um die gewünschte Struktur der Beispieldaten zu erkennen. Generieren Sie basierend auf dieser Analyse einen Datensatz von (Anzahl) Beispielen im gewünschten Format (JSON, XML oder CSV mit Semikolon als Trennzeichen).

Bitte befolgen Sie diese Anweisungen:

1. Analysieren Sie den Eingabetext, um die gewünschte Datenstruktur zu identifizieren.
2. Bestimmen Sie das gewünschte Ausgabeformat (JSON, XML oder CSV) basierend auf Schlüsselwörtern im Eingabetext.
3. Erstellen Sie ein Schema basierend auf der erkannten Struktur.
4. Generieren Sie die Anzahl an Beispieldatensätzen, die dem erkannten Schema entsprechen und vom Nutzer vorgegeben werden kann.
5. Stellen Sie sicher, dass die generierten Daten realistisch und konsistent sind.
6. Fügen Sie Variationen in die Daten ein, um eine natürliche Vielfalt zu simulieren.
7. Formatieren Sie die Daten entsprechend dem gewünschten Ausgabeformat.

<response>
<h2 class='text-white font-black italic mb-4 text-xl'>Generierte Beispieldaten</h2>

<h3 class='text-white font-bold mb-2 text-lg'>Erkannte Datenstruktur:</h3>
<p class='text-white mb-4'>
[Beschreibung der erkannten Datenstruktur]
</p>

<h3 class='text-white font-bold mb-2 text-lg'>Gewähltes Ausgabeformat:</h3>
<p class='text-white mb-4'>
[JSON, XML oder CSV]
</p>

<h3 class='text-white font-bold mb-2 text-lg'>Schema:</h3>
<pre class='bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'>
<code class='text-white'>
[Schema hier einfügen (JSON-Schema für JSON, XSD für XML, oder Spaltenbeschreibung für CSV)]
</code>
</pre>

<h3 class='text-white font-bold mb-2 text-lg'>Generierte Beispieldaten:</h3>
<pre class='bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'>
<code class='text-white'>
[Generierte Daten hier einfügen (JSON, XML oder CSV)]
</code>
</pre>

<h3 class='text-white font-bold mb-2 text-lg'>Erläuterung:</h3>
<p class='text-white mb-4'>
[Kurze Erklärung der generierten Daten und eventueller Annahmen oder Besonderheiten]
</p>
</response>

Beachten Sie:
1. Erkennen Sie das gewünschte Ausgabeformat anhand von Schlüsselwörtern im Eingabetext (z.B. "JSON", "XML", "CSV").
2. Bei CSV-Ausgabe verwenden Sie Semikolon (;) als Trennzeichen und fügen Sie eine Kopfzeile hinzu.
3. Die generierten Daten sollten realistisch und konsistent sein.
4. Verwenden Sie passende Datentypen für die verschiedenen Felder (z.B. Strings, Zahlen, Booleans, Arrays).
5. Berücksichtigen Sie mögliche Beziehungen zwischen den Datenfeldern.
6. Fügen Sie, wo angemessen, Variationen in die Daten ein, um Vielfalt zu simulieren.
7. Stellen Sie sicher, dass die generierten Daten valide und gut formatiert sind.
8. Die Ausgabe sollte direkt in HTML formatiert sein, ohne zusätzliche Codeblöcke oder Backticks, starte deine Ausgabe immer mit "<h2>..."
9. Verwenden Sie einfache Anführungszeichen für HTML-Attribute.
10. Passen Sie die Detailtiefe der Erklärung an die Komplexität der generierten Daten an.
11. Bei komplexen Strukturen zeigen Sie nur einen repräsentativen Ausschnitt der generierten Daten.
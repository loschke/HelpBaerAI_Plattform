# Beispieldaten-Generator

Analysieren Sie den gegebenen (text_input), um die gewünschte Struktur der Beispieldaten zu erkennen. Generieren Sie basierend auf dieser Analyse einen Datensatz von 10 Beispielen im JSON-Format.

Bitte befolgen Sie diese Anweisungen:

1. Analysieren Sie den Eingabetext, um die gewünschte Datenstruktur zu identifizieren.
2. Erstellen Sie ein JSON-Schema basierend auf der erkannten Struktur.
3. Generieren Sie 10 Beispieldatensätze, die dem erkannten Schema entsprechen.
4. Stellen Sie sicher, dass die generierten Daten realistisch und konsistent sind.
5. Fügen Sie Variationen in die Daten ein, um eine natürliche Vielfalt zu simulieren.

Ausgabeformat:
<response>
<h2 class='text-white font-black italic mb-4 text-xl'>Generierte Beispieldaten</h2>

<h3 class='text-white font-bold mb-2 text-lg'>Erkannte Datenstruktur:</h3>
<p class='text-white mb-4'>
[Beschreibung der erkannten Datenstruktur]
</p>

<h3 class='text-white font-bold mb-2 text-lg'>JSON-Schema:</h3>
<pre class='bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'>
<code class='text-white'>
[JSON-Schema hier einfügen]
</code>
</pre>

<h3 class='text-white font-bold mb-2 text-lg'>Generierte Beispieldaten:</h3>
<pre class='bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'>
<code class='text-white'>
[Generierte JSON-Daten hier einfügen]
</code>
</pre>

<h3 class='text-white font-bold mb-2 text-lg'>Erläuterung:</h3>
<p class='text-white mb-4'>
[Kurze Erklärung der generierten Daten und eventueller Annahmen oder Besonderheiten]
</p>
</response>

Beachten Sie:
1. Die generierten Daten sollten realistisch und konsistent sein.
2. Verwenden Sie passende Datentypen für die verschiedenen Felder (z.B. Strings, Zahlen, Booleans, Arrays).
3. Berücksichtigen Sie mögliche Beziehungen zwischen den Datenfeldern.
4. Fügen Sie, wo angemessen, Variationen in die Daten ein, um Vielfalt zu simulieren.
5. Stellen Sie sicher, dass das generierte JSON valide und gut formatiert ist.
6. Die Ausgabe sollte direkt in HTML formatiert sein, ohne zusätzliche Codeblöcke oder Backticks, starte immer mit "<h2>..."
7. Verwenden Sie einfache Anführungszeichen für HTML-Attribute.
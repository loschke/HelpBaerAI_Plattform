# Datentransformation

Analysieren Sie die gegebenen (text_input), erkennen Sie das Eingabeformat und transformieren Sie die Daten in das gewünschte Ausgabeformat (JSON, XML oder CSV mit Semikolon als Trennzeichen).

Bitte befolgen Sie diese Anweisungen:

1. Analysieren Sie die Eingabedaten, um das Format zu erkennen (JSON, XML, CSV oder andere).
2. Identifizieren Sie die Struktur und die Felder der Daten.
3. Bestimmen Sie das gewünschte Ausgabeformat basierend auf Schlüsselwörtern oder der Struktur der Anfrage.
4. Transformieren Sie die Daten in das Zielformat.
5. Stellen Sie sicher, dass alle Daten korrekt übertragen werden und die Struktur erhalten bleibt.
6. Bei der Umwandlung in CSV, verwenden Sie Semikolon (;) als Trennzeichen.

Ausgabeformat:
<output>
<h2 class='text-white font-black italic mb-4 text-xl'>Datentransformation</h2>

<h3 class='text-white font-bold mb-2 text-lg'>Erkanntes Eingabeformat:</h3>
<p class='text-white mb-4'>
{{input_format}}
</p>

<h3 class='text-white font-bold mb-2 text-lg'>Gewähltes Ausgabeformat:</h3>
<p class='text-white mb-4'>
{{output_format}}
</p>

<h3 class='text-white font-bold mb-2 text-lg'>Transformierte Daten:</h3>
<pre class='bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'>
<code class='text-white'>
{{transformed_data}}
</code>
</pre>

<h3 class='text-white font-bold mb-2 text-lg'>Transformationserklärung:</h3>
<p class='text-white mb-4'>
{{transformation_explanation}}
</p>
</output>

Beachten Sie:
1. Erkennen Sie das Eingabeformat automatisch anhand der Struktur der Daten.
2. Wählen Sie das Ausgabeformat basierend auf Schlüsselwörtern in der Anfrage (z.B. "zu JSON", "in XML umwandeln", "als CSV").
3. Wenn kein spezifisches Ausgabeformat angefordert wird, wählen Sie das am besten geeignete Format.
4. Bei der Umwandlung in CSV, verwenden Sie immer Semikolon (;) als Trennzeichen und fügen Sie eine Kopfzeile hinzu.
5. Stellen Sie sicher, dass die transformierten Daten valide sind und dem Zielformat entsprechen.
6. Behalten Sie die ursprüngliche Datenstruktur so weit wie möglich bei.
7. Die Ausgabe sollte direkt in HTML formatiert sein, ohne zusätzliche Codeblöcke oder Backticks.
8. Verwenden Sie einfache Anführungszeichen für HTML-Attribute.
9. Passen Sie die Detailtiefe der Erklärung an die Komplexität der Transformation an.
10. Bei großen Datensätzen zeigen Sie nur einen repräsentativen Ausschnitt der transformierten Daten.
# Instructions

1. Carefully read and analyze the provided <text_input>.

2. If a <main_focus> is provided, keep this as a priority throughout your entity extraction process.

3. Identify and extract the following types of entities:
   - Persons: Names of individuals
   - Places: Locations, cities, countries, geographical areas
   - Organizations: Companies, institutions, agencies, groups
   - Dates: Specific dates, time periods, or temporal references

4. For each extracted entity:
   - Categorize it into one of the four main types (Person, Place, Organization, Date)
   - Note its exact appearance in the text
   - If relevant, provide a brief context or description

5. Handle potential ambiguities:
   - If an entity could belong to multiple categories, choose the most likely based on context
   - For ambiguous names (e.g., could be a person or organization), use context to determine the correct category

6. Consider variations and references:
   - Recognize different ways an entity might be referred to in the text
   - Link related mentions of the same entity (e.g., full name and subsequent surname only)

7. Pay attention to capitalization and formatting, but be aware that entities may not always be properly capitalized in the input text

8. Ignore common words or phrases that are not specific entities, even if they are capitalized

9. For dates, standardize the format if possible (e.g., YYYY-MM-DD), but also include the original text

10. Prepare a structured output of the extracted entities:
    - Group entities by type
    - List each unique entity only once, but note if it appears multiple times
    - Provide a count of how many times each entity appears, if relevant

11. If the text is long or complex, consider providing a brief summary of the most significant or frequently mentioned entities

12. Be prepared to explain your reasoning for any entities that might be considered borderline or controversial in their classification

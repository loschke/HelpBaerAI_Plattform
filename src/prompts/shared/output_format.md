# Output Formatting Instructions

## General Formatting Guidelines
- Structure your response logically and hierarchically
- Use appropriate headings, subheadings, and lists to organize information
- Highlight key points or important information
- Ensure consistent formatting throughout the response

## Specific Format Instructions

### If <output_format> is "Markdown":
- Use Markdown syntax for all formatting
- Use # for main headings, ## for subheadings, and ### for sub-subheadings
- Use **bold** for emphasis on important points
- Use *italics* for secondary emphasis or definitions
- Use `code` formatting for technical terms or short code snippets
- Use > for quotations or important callouts
- Use - or * for unordered lists
- Use 1. 2. 3. for ordered lists
- Use --- for horizontal rules to separate major sections
- When using inline code blocks or code snippets, ensure that any quotation marks are properly escaped to prevent conflicts with the surrounding JSON structure

### If <output_format> is "HTML":
- Use semantic HTML5 tags for structure
- Apply Tailwind CSS classes for styling and dark mode compatibility
- IMPORTANT: Use single quotes for all HTML attributes to ensure compatibility with JSON formatting
- Use the following class structure for dark mode and readability:
  - Wrap all content in a `<div class='bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg'>`
  - Use `class='text-3xl font-bold text-gray-100 mb-4'` for main headings
  - Use `class='text-2xl font-semibold text-gray-200 mb-3'` for subheadings
  - Use `class='text-xl font-medium text-gray-300 mb-2'` for sub-subheadings
  - Use `class='font-bold'` for emphasis on important points
  - Use `class='italic'` for secondary emphasis or definitions
  - Use `class='bg-gray-800 text-gray-300 p-1 rounded'` for inline code
  - Use `class='border-l-4 border-gray-700 pl-4 italic my-4'` for quotations or important callouts
  - Use `<ul class='list-disc list-inside mb-4'>` for unordered lists
  - Use `<ol class='list-decimal list-inside mb-4'>` for ordered lists
  - Use `<hr class='border-gray-700 my-6'>` for horizontal rules to separate major sections

## Additional Formatting Notes
- Ensure all links are functional and properly formatted
- Use tables for presenting structured data, if applicable
- Include appropriate alt text for any images or diagrams
- Maintain consistent indentation and spacing for readability
- When using quotation marks within the content (for both HTML and Markdown), ensure they are properly escaped if necessary to prevent conflicts with the surrounding JSON structure

Remember to adapt your formatting to the specific content and context of the response while adhering to these general guidelines.

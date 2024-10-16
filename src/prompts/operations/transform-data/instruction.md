# Instructions

1. Review the <text_input> to understand its current format, structure, and content.

2. Identify the <target_format> for the transformation.

3. If a <main_focus> is provided, keep this as a priority throughout your analysis and transformation process.

4. Analyze the input data:
   - Identify the main entities or data elements.
   - Determine the relationships between different data elements.
   - Note any nested structures, arrays, or complex data types.

5. Plan the transformation strategy:
   - Determine the necessary steps to convert from the input format to the target format.
   - Consider any structural changes required (e.g., flattening nested structures, creating new relationships).
   - Identify any data type conversions needed.

6. Handle specific format considerations:
   - For JSON to XML: Plan how to represent attributes and nested elements.
   - For XML to JSON: Determine how to handle attributes and maintain hierarchical relationships.
   - For JSON/XML to CSV: Decide on a strategy for flattening nested structures.
   - For CSV to JSON/XML: Plan how to reconstruct hierarchical relationships.

7. Address data integrity and consistency:
   - Ensure all data elements from the input are accounted for in the output.
   - Maintain consistent naming conventions appropriate for the target format.
   - Preserve data types where possible, or choose appropriate alternatives in the target format.

8. Handle special cases:
   - Develop a strategy for dealing with null or empty values.
   - Plan for handling special characters or escape sequences.
   - Consider how to represent complex data types (e.g., dates, binary data) in the target format.

9. Optimize for the target format:
   - Apply best practices specific to the target format (e.g., appropriate use of attributes in XML, efficient nesting in JSON).
   - Consider readability and ease of use in the target format.

10. Perform the transformation:
    - Execute the planned transformation steps.
    - Ensure the output adheres to the syntax and structure requirements of the target format.

11. Validate the transformed data:
    - Check for any loss of information during the transformation.
    - Verify that relationships between data elements are maintained.
    - Ensure the output is well-formed and valid according to the target format's specifications.

12. Optimize the output:
    - Apply appropriate formatting or pretty-printing for improved readability.
    - Consider minimization techniques if file size is a concern.

13. Document the transformation process:
    - Provide a clear explanation of the steps taken in the transformation.
    - Note any assumptions made or special handling of particular data elements.
    - If a <main_focus> was specified, explain how it influenced the transformation.

14. Suggest potential uses or advantages of the new format:
    - Explain how the target format might benefit data analysis, integration, or other processes.
    - Highlight any new capabilities enabled by the transformation.

15. Prepare a sample of the transformed data:
    - Provide a representative portion of the transformed data in the target format.
    - Ensure this sample illustrates key aspects of the transformation.

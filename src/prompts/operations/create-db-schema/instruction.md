# Instructions

1. Review the <text_input> to understand the structure, content, and context of the data. Identify whether it's in JSON, XML, or CSV format.

2. If a <main_focus> is provided, keep this as a priority throughout your analysis and schema design.

3. Conduct an initial data analysis:
   - Identify the main entities or object types in the data.
   - Determine the attributes associated with each entity.
   - Analyze the relationships between different entities.
   - Assess the cardinality of these relationships (one-to-one, one-to-many, many-to-many).

4. For each identified entity:
   - Propose a table name using clear and consistent naming conventions.
   - List all attributes (columns) for the table.
   - Suggest appropriate data types for each attribute.
   - Identify potential primary keys.
   - Note any candidate keys or unique constraints.

5. Establish relationships between tables:
   - Identify foreign key relationships.
   - Determine if junction tables are needed for many-to-many relationships.
   - Consider the use of surrogate keys where appropriate.

6. Apply normalization techniques:
   - Aim for at least 3rd Normal Form (3NF) unless there are compelling reasons not to.
   - Explain any denormalization decisions, if applicable.

7. Consider performance and scalability:
   - Suggest appropriate indexes based on likely query patterns.
   - Consider partitioning strategies for large tables, if relevant.
   - Propose any materialized views or summary tables that might be beneficial.

8. Address data integrity:
   - Suggest appropriate constraints (e.g., NOT NULL, CHECK constraints).
   - Consider the use of triggers for complex integrity rules, if necessary.

9. Handle specific data types or structures:
   - Propose solutions for storing arrays or nested structures (common in JSON data).
   - Suggest approaches for handling large text fields or binary data.
   - Consider time-series data requirements, if applicable.

10. Optimize for the specific data format:
    - For JSON: Consider JSON-specific storage options if the database supports them.
    - For XML: Propose strategies for handling hierarchical data structures.
    - For CSV: Suggest any necessary data transformations for optimal storage.

11. Document your schema design:
    - Provide a clear, formatted representation of each table structure.
    - Include data types, constraints, and relationships.
    - Use standard SQL DDL statements or a widely recognized schema representation format.

12. Explain your design decisions:
    - Justify key choices in your schema design.
    - Discuss any trade-offs you considered.
    - If a <main_focus> was specified, explain how it influenced your design.

13. Suggest a data migration strategy:
    - Outline steps to populate the proposed schema from the original data format.
    - Mention any data cleansing or transformation steps that might be necessary.

14. Consider future scalability:
    - Discuss how the schema might evolve to accommodate future data growth or new requirements.
    - Suggest a versioning strategy for schema changes.

15. Prepare your schema design for presentation:
    - Create a clear and visually appealing representation of the schema (e.g., an ER diagram).
    - Ensure your documentation is comprehensive yet easy to understand for stakeholders with varying levels of technical expertise.

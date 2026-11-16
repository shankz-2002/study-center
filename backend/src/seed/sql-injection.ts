
import { QuestionType } from "../types/question.js";

export const sqlInjectionData = {
  fieldName: "Cybersecurity",
  fieldDescription:
    "Learn cybersecurity concepts, tools, vulnerabilities, and practical security testing.",
  categoryName: "Web Security",
  categoryDescription:
    "Learn common web application vulnerabilities, security testing, and prevention techniques.",
  topicName: "SQL Injection (SQLi)",
  topicDescription:
    "Understand SQL injection vulnerabilities, learn how to identify them safely, and implement effective prevention techniques.",

  levels: [
    // ==========================================
    // LEVEL 1: SQL INJECTION FUNDAMENTALS
    // ==========================================
    {
      levelName: "SQL Injection Fundamentals",
      description:
        "Understand SQL injection, how database queries work, common injection points, and the different types of SQL injection.",
      order: 1,

      learning: [
        {
          title: "What is SQL Injection?",
          order: 1,
          content: `
# What is SQL Injection?

SQL Injection (SQLi) is a web application vulnerability that occurs when an application includes untrusted user input directly in an SQL query without properly separating data from SQL instructions.

An attacker may manipulate the query's structure and cause the database to execute unintended operations.

## How does it happen?

Consider an application that authenticates users using this query:

\`\`\`sql
SELECT * FROM users
WHERE username = 'INPUT'
AND password = 'INPUT';
\`\`\`

If the application constructs this query through unsafe string concatenation, user input may change the meaning of the SQL statement.

## Why is it dangerous?

Depending on database permissions and application design, SQL injection may allow an attacker to:

- Bypass authentication.
- Read sensitive database records.
- Modify or delete data.
- Access information belonging to other users.
- In some configurations, interact with the underlying database server.

## Important concept

SQL injection is not caused simply because an application uses SQL.

It happens when untrusted input is treated as part of SQL syntax instead of being handled as data.

## Prevention overview

The primary defense is parameterized queries (prepared statements). Input validation and least-privilege database permissions provide additional protection.
          `,
        },
        {
          title: "How SQL Queries Work",
          order: 2,
          content: `
# How SQL Queries Work

SQL stands for Structured Query Language. It is used to communicate with relational databases.

Applications commonly use SQL to create, retrieve, update, and delete records.

## Common SQL operations

### SELECT

Retrieves records.

\`\`\`sql
SELECT * FROM users;
\`\`\`

### INSERT

Adds new records.

\`\`\`sql
INSERT INTO users (username, email)
VALUES ('alex', 'alex@example.com');
\`\`\`

### UPDATE

Modifies existing records.

\`\`\`sql
UPDATE users
SET email = 'new@example.com'
WHERE id = 1;
\`\`\`

### DELETE

Removes records.

\`\`\`sql
DELETE FROM users WHERE id = 1;
\`\`\`

## How an application interacts with a database

A typical process:

1. A user submits information through a form or API.
2. The backend receives the information.
3. The backend constructs a database query.
4. The database executes the query.
5. The application processes and returns the result.

## Where SQL injection occurs

The vulnerability may appear when the backend combines user-controlled values with SQL syntax using unsafe string concatenation.

For example:

\`\`\`ts
const query =
  "SELECT * FROM users WHERE email = '" + email + "'";
\`\`\`

This approach is unsafe because the input is inserted directly into the SQL statement.

The safer approach is to use parameters.
          `,
        },
        {
          title: "Where SQL Injection Occurs",
          order: 3,
          content: `
# Where SQL Injection Occurs

SQL injection can occur anywhere user-controlled input reaches an SQL query unsafely.

## Common injection points

### 1. Login forms

Username, email, and password fields may be used in authentication queries.

### 2. Search functionality

Search terms may be included in database queries.

### 3. URL parameters

Example:

\`\`\`
https://example.com/products?id=10
\`\`\`

The id parameter may be used in a database query.

### 4. HTTP request bodies

Applications may use JSON or form data to retrieve records.

### 5. HTTP headers

Some applications store or query values derived from headers such as User-Agent or Referer.

### 6. Cookies

Cookie values may be used to identify records or retrieve user preferences.

## How to identify possible injection points

During authorized testing:

1. Map the application's functionality.
2. Identify user-controlled inputs.
3. Observe how the application responds to normal values.
4. Test harmless variations in a controlled environment.
5. Compare responses and investigate unexpected behavior.

## Important

Not every input connected to a database is vulnerable.

The vulnerability depends on how the application constructs and executes its SQL queries.
          `,
        },
        {
          title: "Types of SQL Injection",
          order: 4,
          content: `
# Types of SQL Injection

SQL injection vulnerabilities can be classified according to how the attacker observes the database's behavior.

## 1. In-band SQL Injection

The attacker uses the same communication channel to send SQL input and receive results.

Common forms include:

- Error-based SQL injection.
- UNION-based SQL injection.

### Error-based SQL injection

The application exposes database errors that reveal information about the query or database structure.

### UNION-based SQL injection

An attacker attempts to combine results from another query with the original query using the SQL UNION operator.

## 2. Blind SQL Injection

The application does not directly display database results, but its behavior can still reveal whether a condition is true or false.

Common forms:

- Boolean-based blind SQL injection.
- Time-based blind SQL injection.

### Boolean-based

Different responses may occur depending on whether a database condition evaluates to true or false.

### Time-based

A deliberately delayed database operation may cause a measurable response-time difference.

## 3. Out-of-band SQL Injection

The attacker attempts to make the database communicate through a separate channel.

This depends on database features, network access, and configuration.

## Summary

| Type | Observation |
|---|---|
| Error-based | Database errors |
| UNION-based | Combined query results |
| Boolean-based | Different application responses |
| Time-based | Response delays |
| Out-of-band | Separate communication channel |

Understanding these types helps security testers recognize different SQL injection behaviors.
          `,
        },
      ],

      questions: [
        {
          question: "What is SQL Injection?",
          questionType: QuestionType.MCQ,
          options: [
            "A database backup technique",
            "A vulnerability caused by unsafe handling of SQL input",
            "A method of encrypting database records",
            "A network scanning technique",
          ],
          correctAnswer:
            "A vulnerability caused by unsafe handling of SQL input",
          explanation:
            "SQL injection occurs when untrusted input is interpreted as part of an SQL statement.",
          order: 1,
        },
        {
          question: "Which SQL statement retrieves records?",
          questionType: QuestionType.MCQ,
          options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
          correctAnswer: "SELECT",
          explanation: "SELECT retrieves data from database tables.",
          order: 2,
        },
        {
          question: "Which of the following can be an SQL injection point?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "URL parameters",
            "Login forms",
            "Cookies",
            "HTTP request bodies",
          ],
          correctAnswer: [
            "URL parameters",
            "Login forms",
            "Cookies",
            "HTTP request bodies",
          ],
          explanation:
            "Any user-controlled value that reaches an unsafe SQL query can become an injection point.",
          order: 3,
        },
        {
          question: "What is the primary cause of SQL injection?",
          questionType: QuestionType.MCQ,
          options: [
            "Using a relational database",
            "Unsafe construction of SQL queries",
            "Using HTTPS",
            "Using a frontend framework",
          ],
          correctAnswer: "Unsafe construction of SQL queries",
          explanation:
            "The issue occurs when input is mixed with SQL syntax without proper parameterization.",
          order: 4,
        },
        {
          question: "Which SQL statement modifies existing records?",
          questionType: QuestionType.MCQ,
          options: ["SELECT", "INSERT", "UPDATE", "CREATE"],
          correctAnswer: "UPDATE",
          explanation: "UPDATE changes existing database records.",
          order: 5,
        },
        {
          question: "What is error-based SQL injection?",
          questionType: QuestionType.MCQ,
          options: [
            "Using errors to reveal database information",
            "Deleting database tables",
            "Encrypting SQL statements",
            "Blocking database connections",
          ],
          correctAnswer: "Using errors to reveal database information",
          explanation:
            "Error-based SQL injection relies on informative database errors.",
          order: 6,
        },
        {
          question: "Which type of SQL injection relies on true or false application responses?",
          questionType: QuestionType.MCQ,
          options: [
            "UNION-based",
            "Boolean-based blind",
            "Out-of-band",
            "Error-based",
          ],
          correctAnswer: "Boolean-based blind",
          explanation:
            "Boolean-based blind SQL injection observes differences in application behavior.",
          order: 7,
        },
        {
          question: "What does UNION do in SQL?",
          questionType: QuestionType.MCQ,
          options: [
            "Deletes two tables",
            "Combines the results of compatible SELECT queries",
            "Encrypts query results",
            "Creates database users",
          ],
          correctAnswer:
            "Combines the results of compatible SELECT queries",
          explanation:
            "UNION combines result sets from compatible SELECT statements.",
          order: 8,
        },
        {
          question: "Does using HTTPS prevent SQL injection?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "HTTPS protects data in transit but does not prevent unsafe SQL query construction.",
          order: 9,
        },
        {
          question: "Which defense is most important against SQL injection?",
          questionType: QuestionType.MCQ,
          options: [
            "Hiding the database name",
            "Parameterized queries",
            "Using longer passwords",
            "Disabling browser cookies",
          ],
          correctAnswer: "Parameterized queries",
          explanation:
            "Parameterized queries keep SQL instructions separate from user-provided data.",
          order: 10,
        },
      ],
    },

    // ==========================================
    // LEVEL 2: SQL INJECTION DISCOVERY AND TESTING
    // ==========================================
    {
      levelName: "SQL Injection Discovery and Testing",
      description:
        "Learn how to identify potential SQL injection vulnerabilities, understand different testing techniques, and interpret application behavior.",
      order: 2,

      learning: [
        {
          title: "Understanding SQL Injection Testing",
          order: 1,
          content: `
# Understanding SQL Injection Testing

SQL injection testing is the process of identifying whether user-controlled input can influence the structure or behavior of a database query.

Testing must only be performed on systems where you have explicit permission.

## Testing methodology

### Step 1: Map the application

Identify:

- Forms.
- Search features.
- URL parameters.
- API endpoints.
- Cookies.
- Authentication functionality.

### Step 2: Establish a baseline

Send normal requests and observe:

- HTTP status codes.
- Response content.
- Response size.
- Application behavior.
- Response time.

### Step 3: Identify suspicious inputs

Determine which parameters may interact with database queries.

### Step 4: Perform controlled testing

In a local lab, use harmless test variations and observe whether responses change unexpectedly.

### Step 5: Compare results

A single unusual response does not prove SQL injection.

Repeat tests and eliminate other possible explanations.

## Burp Suite

Burp Suite can help intercept and modify HTTP requests.

Useful tools include:

- Proxy: Intercept application traffic.
- Repeater: Manually modify and resend requests.
- Intruder: Automate controlled input variations in authorized testing.
- Logger: Review request and response history.

## Key principle

Always compare a test response with a known baseline.
          `,
        },
        {
          title: "Error-Based and UNION-Based SQL Injection",
          order: 2,
          content: `
# Error-Based and UNION-Based SQL Injection

These techniques are examples of in-band SQL injection.

## Error-based SQL injection

Some applications expose database error messages.

For example, an application might return an error indicating:

- Incorrect SQL syntax.
- Invalid data types.
- Missing database objects.
- Database-specific exceptions.

Such errors may reveal implementation details.

### What to observe

- Does a particular input trigger a database error?
- Does the response contain database-specific information?
- Does the error appear consistently?
- Does normal input work correctly?

Do not assume every HTTP 500 error is SQL injection.

## UNION-based SQL injection

SQL UNION combines the results of compatible SELECT queries.

For a UNION operation to work:

1. Both queries must return the same number of columns.
2. Corresponding columns must have compatible data types.
3. The application must expose the resulting data.

Example of a normal SQL UNION operation:

\`\`\`sql
SELECT name FROM employees
UNION
SELECT name FROM customers;
\`\`\`

This is a normal SQL operation. Its use alone is not a vulnerability.

## Why this matters

If an application builds SQL queries unsafely, an attacker may attempt to alter the query and retrieve information beyond the intended result.

## Testing safely

Use an intentionally vulnerable training application such as OWASP Juice Shop or WebGoat. Avoid accessing or extracting real user data.
          `,
        },
        {
          title: "Blind SQL Injection",
          order: 3,
          content: `
# Blind SQL Injection

Blind SQL injection occurs when an application is vulnerable to SQL injection but does not directly display database query results.

A tester instead observes indirect differences in application behavior.

## 1. Boolean-based blind SQL injection

The application may behave differently depending on whether a database condition is true or false.

For example, two requests that differ only in a harmless test condition may produce different responses.

Possible observations:

- Different response messages.
- Different response lengths.
- Different page content.
- Different application behavior.

## 2. Time-based blind SQL injection

Sometimes the application does not return visibly different content.

A database operation may introduce a delay when a condition is satisfied.

A tester can compare response times under controlled conditions.

## Important limitations

Response timing can be affected by:

- Network latency.
- Server load.
- Database performance.
- Caching.
- Rate limiting.

A single delayed response is not sufficient evidence.

## Testing approach

1. Establish normal response behavior.
2. Send controlled test requests.
3. Compare multiple responses.
4. Repeat timing tests.
5. Investigate whether the behavior is consistent.

## Key difference

Boolean-based testing observes response differences, while time-based testing observes timing differences.
          `,
        },
        {
          title: "SQL Injection in APIs and Practical Labs",
          order: 4,
          content: `
# SQL Injection in APIs and Practical Labs

Modern applications frequently expose database-backed functionality through REST APIs.

An API may accept input through:

- URL query parameters.
- Path parameters.
- JSON request bodies.
- Form-encoded data.
- HTTP headers.

## Example API request

\`\`\`http
GET /api/products?id=15 HTTP/1.1
Host: example.test
Accept: application/json
\`\`\`

The backend might use the id parameter to retrieve a database record.

If the backend builds its SQL query unsafely, the parameter may become an injection point.

## Testing JSON APIs

Example:

\`\`\`json
{
  "search": "laptop",
  "category": "electronics"
}
\`\`\`

Check how the application handles unusual but safe input in a controlled environment.

## Useful practice environments

### OWASP Juice Shop

An intentionally vulnerable application designed for web security training.

### PortSwigger Web Security Academy

Provides interactive SQL injection labs covering:

- SQL injection in WHERE clauses.
- Authentication bypass.
- UNION attacks.
- Blind SQL injection.
- Time delays.

### OWASP WebGoat

A deliberately insecure application for learning common security vulnerabilities.

## Practical workflow

1. Map the API endpoints.
2. Identify database-backed parameters.
3. Capture requests using Burp Suite.
4. Establish normal responses.
5. Test controlled variations in a lab.
6. Document reproducible evidence.
7. Verify the vulnerability without accessing unauthorized information.
          `,
        },
      ],

      questions: [
        {
          question: "What should you establish before performing SQL injection tests?",
          questionType: QuestionType.MCQ,
          options: [
            "A baseline response",
            "A database backup from the target",
            "An administrator account",
            "A production database password",
          ],
          correctAnswer: "A baseline response",
          explanation:
            "A baseline helps you compare normal behavior with test responses.",
          order: 1,
        },
        {
          question: "Which Burp Suite tool is commonly used to manually modify and resend requests?",
          questionType: QuestionType.MCQ,
          options: ["Proxy", "Repeater", "Decoder", "Comparer"],
          correctAnswer: "Repeater",
          explanation:
            "Repeater lets testers modify requests and inspect their responses.",
          order: 2,
        },
        {
          question: "What does error-based SQL injection rely on?",
          questionType: QuestionType.MCQ,
          options: [
            "Database error messages",
            "DNS records",
            "Browser cookies",
            "Password hashing",
          ],
          correctAnswer: "Database error messages",
          explanation:
            "Error-based SQL injection uses database errors that expose information.",
          order: 3,
        },
        {
          question: "What is required for compatible SELECT statements using UNION?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "The same number of columns",
            "Compatible corresponding data types",
            "The same table name",
            "The same database username",
          ],
          correctAnswer: [
            "The same number of columns",
            "Compatible corresponding data types",
          ],
          explanation:
            "UNION requires compatible result sets with matching column counts and compatible types.",
          order: 4,
        },
        {
          question: "What is blind SQL injection?",
          questionType: QuestionType.MCQ,
          options: [
            "SQL injection with no database",
            "SQL injection where results are inferred indirectly",
            "SQL injection performed without a browser",
            "SQL injection that always produces an error",
          ],
          correctAnswer:
            "SQL injection where results are inferred indirectly",
          explanation:
            "Blind SQL injection relies on indirect indicators such as response differences or delays.",
          order: 5,
        },
        {
          question: "Which technique observes differences in application responses?",
          questionType: QuestionType.MCQ,
          options: [
            "Boolean-based blind SQL injection",
            "Password spraying",
            "DNS enumeration",
            "Session fixation",
          ],
          correctAnswer: "Boolean-based blind SQL injection",
          explanation:
            "Boolean-based blind SQL injection uses differences in behavior to infer conditions.",
          order: 6,
        },
        {
          question: "What does time-based blind SQL injection observe?",
          questionType: QuestionType.MCQ,
          options: [
            "Database table names",
            "Response delays",
            "Cookie values",
            "HTTP header names",
          ],
          correctAnswer: "Response delays",
          explanation:
            "Time-based blind SQL injection uses measurable delays as an indirect signal.",
          order: 7,
        },
        {
          question: "Which of the following can carry user-controlled input to an API?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Query parameters",
            "JSON request bodies",
            "Path parameters",
            "Cookies",
          ],
          correctAnswer: [
            "Query parameters",
            "JSON request bodies",
            "Path parameters",
            "Cookies",
          ],
          explanation:
            "All these request components can contain values used by backend database queries.",
          order: 8,
        },
        {
          question: "Does one HTTP 500 response prove SQL injection?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "Many application errors can cause HTTP 500 responses. Further investigation is necessary.",
          order: 9,
        },
        {
          question: "Which environment is suitable for practicing SQL injection?",
          questionType: QuestionType.MCQ,
          options: [
            "A random public website",
            "An authorized PortSwigger lab",
            "A company's production database without permission",
            "A third-party payment system",
          ],
          correctAnswer: "An authorized PortSwigger lab",
          explanation:
            "Intentionally vulnerable labs provide a controlled and authorized testing environment.",
          order: 10,
        },
      ],
    },

    // ==========================================
    // LEVEL 3: ADVANCED SQL INJECTION AND MITIGATION
    // ==========================================
    {
      levelName: "Advanced SQL Injection and Mitigation",
      description:
        "Understand advanced SQL injection scenarios, database security, secure coding practices, and effective vulnerability remediation.",
      order: 3,

      learning: [
        {
          title: "Second-Order SQL Injection",
          order: 1,
          content: `
# Second-Order SQL Injection

Second-order SQL injection occurs when malicious input is initially stored safely but is later used unsafely in another SQL query.

Unlike traditional SQL injection, the vulnerability may not appear at the point where the input is originally submitted.

## How it works

1. A user submits data to an application.
2. The application stores that data in the database.
3. Another feature retrieves the stored value.
4. The retrieved value is inserted into a new SQL query unsafely.
5. The database interprets part of the stored value as SQL syntax.

## Example scenario

Imagine a profile application that stores a user's display name.

The profile update feature uses parameterized queries, but a separate reporting feature later concatenates the stored display name into an SQL statement.

The reporting feature may introduce a second-order injection vulnerability.

## Why is it difficult to detect?

The original input may appear harmless during submission.

The vulnerability only becomes visible when another application feature uses that stored value in an unsafe query.

## Prevention

- Use parameterized queries everywhere.
- Treat stored data as untrusted.
- Review all database access paths.
- Test workflows that reuse previously stored input.
- Avoid dynamic SQL string construction.
          `,
        },
        {
          title: "SQL Injection in Different Database Systems",
          order: 2,
          content: `
# SQL Injection Across Database Systems

Different relational database systems implement SQL with variations in syntax, functions, and features.

Common database systems include:

- PostgreSQL.
- MySQL.
- Microsoft SQL Server.
- Oracle Database.
- SQLite.

## Why database differences matter

SQL injection behavior may depend on:

- SQL syntax.
- Supported functions.
- Error handling.
- Data types.
- Permissions.
- Database configuration.

## PostgreSQL

PostgreSQL supports features such as:

- Strong data types.
- Schemas.
- Roles and privileges.
- Parameterized statements.

## MySQL

MySQL is widely used in web applications and supports prepared statements.

## Microsoft SQL Server

SQL Server provides database roles, stored procedures, and parameterized query capabilities.

## SQLite

SQLite is commonly embedded in applications and local tools.

## Security testing consideration

A technique that works against one database may not work against another.

Identify the database only through authorized, non-destructive evidence.

## Important

Do not expose detailed database errors to application users. Log diagnostic information securely on the server.
          `,
        },
        {
          title: "Preventing SQL Injection",
          order: 3,
          content: `
# Preventing SQL Injection

The most effective defense against SQL injection is to separate SQL instructions from user-provided data.

## 1. Parameterized queries

Unsafe example:

\`\`\`ts
const query =
  "SELECT * FROM users WHERE email = '" + email + "'";
\`\`\`

Safer example using PostgreSQL parameters:

\`\`\`ts
const result = await dataSource.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);
\`\`\`

The database treats the supplied value as data rather than SQL syntax.

## 2. Prepared statements

Prepared statements allow a query structure to be defined separately from the values supplied to it.

They are supported by many database drivers and libraries.

## 3. Safe ORM usage

ORMs such as TypeORM can reduce the need for manually constructed SQL.

Example:

\`\`\`ts
const user = await userRepository.findOne({
  where: { email: email }
});
\`\`\`

However, ORMs do not automatically eliminate every SQL injection risk.

Unsafe raw SQL and dynamically constructed query fragments can still be vulnerable.

## 4. Input validation

Validate input according to its expected format.

For example, an ID should be validated as an appropriate numeric or UUID value.

Input validation is useful, but it is not a replacement for parameterized queries.

## 5. Least privilege

The application's database account should have only the permissions it needs.

A read-only feature should not use a database account with unnecessary write or administrative privileges.

## 6. Safe error handling

Avoid returning raw SQL errors, database credentials, stack traces, or internal query details to users.
          `,
        },
        {
          title: "Reporting and Remediating SQL Injection",
          order: 4,
          content: `
# Reporting and Remediating SQL Injection

Finding a potential SQL injection vulnerability is only part of the security assessment.

A useful report must explain the issue clearly and provide reproducible evidence.

## What should a report contain?

### 1. Title

Example:

"SQL Injection in Product Search Parameter"

### 2. Affected endpoint

Include the affected URL, HTTP method, and parameter.

### 3. Vulnerability description

Explain how untrusted input influences SQL query construction.

### 4. Reproduction steps

Provide clear, minimal steps using an authorized test account and non-destructive test cases.

### 5. Evidence

Include relevant request and response excerpts.

Do not include unrelated private information or extract real user records.

### 6. Impact

Explain the potential consequences based on the database permissions and accessible functionality.

### 7. Remediation

Recommend parameterized queries, safe ORM operations, least privilege, and appropriate error handling.

## Remediation workflow

1. Identify the unsafe query.
2. Replace string concatenation with parameterized queries.
3. Review other queries using the same input.
4. Add regression tests.
5. Verify the fix in a test environment.
6. Review database permissions.

## Regression testing

A secure implementation should ensure that unusual input is treated as data and cannot change the intended SQL statement structure.

## Final principle

A strong security report demonstrates the vulnerability, explains realistic impact, and provides a clear remediation path.
          `,
        },
      ],

      questions: [
        {
          question: "What is second-order SQL injection?",
          questionType: QuestionType.MCQ,
          options: [
            "SQL injection involving two databases",
            "Stored input that becomes dangerous when later used in an unsafe query",
            "SQL injection requiring two attackers",
            "An SQL backup operation",
          ],
          correctAnswer:
            "Stored input that becomes dangerous when later used in an unsafe query",
          explanation:
            "Second-order SQL injection occurs when previously stored input is later used unsafely in another SQL query.",
          order: 1,
        },
        {
          question: "Which is the primary defense against SQL injection?",
          questionType: QuestionType.MCQ,
          options: [
            "Input length restrictions alone",
            "Parameterized queries",
            "Changing database table names",
            "Hiding the website URL",
          ],
          correctAnswer: "Parameterized queries",
          explanation:
            "Parameterized queries separate SQL instructions from user-supplied values.",
          order: 2,
        },
        {
          question: "Does using an ORM guarantee that SQL injection is impossible?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "Unsafe raw queries and dynamically constructed SQL can still introduce vulnerabilities when using an ORM.",
          order: 3,
        },
        {
          question: "Which of the following is an example of a parameterized PostgreSQL query?",
          questionType: QuestionType.MCQ,
          options: [
            "SELECT * FROM users WHERE email = $1",
            "SELECT * FROM users WHERE email = ' + email",
            "SELECT * FROM users WHERE email = email",
            "SELECT * FROM users WHERE email = CONCAT(email)",
          ],
          correctAnswer: "SELECT * FROM users WHERE email = $1",
          explanation:
            "PostgreSQL uses positional parameters such as $1 for parameterized queries.",
          order: 4,
        },
        {
          question: "Why should database accounts follow the principle of least privilege?",
          questionType: QuestionType.MCQ,
          options: [
            "To increase database storage",
            "To limit the impact of a compromise",
            "To disable SQL queries",
            "To make all users administrators",
          ],
          correctAnswer: "To limit the impact of a compromise",
          explanation:
            "Restricting database permissions reduces the potential damage if an application is compromised.",
          order: 5,
        },
        {
          question: "Which of the following are useful SQL injection defenses?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Parameterized queries",
            "Least-privilege database accounts",
            "Safe error handling",
            "Input validation",
          ],
          correctAnswer: [
            "Parameterized queries",
            "Least-privilege database accounts",
            "Safe error handling",
            "Input validation",
          ],
          explanation:
            "These controls work together, with parameterized queries being the primary defense.",
          order: 6,
        },
        {
          question: "Why should applications avoid exposing raw database errors?",
          questionType: QuestionType.MCQ,
          options: [
            "They can reveal internal implementation details",
            "They improve authentication",
            "They prevent all SQL queries",
            "They encrypt database records",
          ],
          correctAnswer:
            "They can reveal internal implementation details",
          explanation:
            "Raw errors can expose database information, query details, and internal application structure.",
          order: 7,
        },
        {
          question: "Which database systems may require different SQL injection testing considerations?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "PostgreSQL",
            "MySQL",
            "Microsoft SQL Server",
            "Oracle Database",
          ],
          correctAnswer: [
            "PostgreSQL",
            "MySQL",
            "Microsoft SQL Server",
            "Oracle Database",
          ],
          explanation:
            "Different database systems have different SQL syntax, functions, and behaviors.",
          order: 8,
        },
        {
          question: "What should a good SQL injection vulnerability report include?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Affected endpoint",
            "Reproduction steps",
            "Evidence",
            "Remediation recommendations",
          ],
          correctAnswer: [
            "Affected endpoint",
            "Reproduction steps",
            "Evidence",
            "Remediation recommendations",
          ],
          explanation:
            "A useful report includes the affected component, reproducible evidence, impact, and remediation.",
          order: 9,
        },
        {
          question: "Should stored user input always be treated as trusted?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "Stored values can still be attacker-controlled and must be handled safely whenever they are used.",
          order: 10,
        },
      ],
    },
  ],
};

import { QuestionType } from "../types/question.js";


export const xssData = {
  fieldName: "Cybersecurity",
  fieldDescription:
    "Learn cybersecurity concepts, identify vulnerabilities, understand security risks, and develop practical defensive skills.",

  categoryName: "Web Security",
  categoryDescription:
    "Understand web application vulnerabilities, security testing techniques, and secure development practices.",

  topicName: "Cross-Site Scripting (XSS)",
  topicDescription:
    "Learn how Cross-Site Scripting vulnerabilities occur, how to identify them safely, and how to prevent them.",

  levels: [
    {
      levelName: "XSS Fundamentals",
      description:
        "Understand the fundamentals of XSS, its different types, security impact, and basic prevention techniques.",
      order: 1,

      learning: [
        {
          title: "Introduction to Cross-Site Scripting",
          order: 1,
          content: `
# Introduction to Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) is a web application security vulnerability that allows an attacker to inject untrusted content into a webpage in a way that causes the browser to execute attacker-controlled JavaScript.

Web applications frequently accept input from users through forms, search boxes, comments, profile fields, and URL parameters.

When an application handles this input incorrectly and places it into a webpage without appropriate protection, malicious content may become executable.

## How XSS happens

Consider a website with a comment section.

1. A user submits a comment.
2. The application stores the comment.
3. Another user opens the page.
4. The application displays the comment without safely handling its content.
5. The browser interprets the injected content as executable code.

The fundamental problem is that the application treats untrusted data as trusted webpage content.

## Potential impact

XSS can lead to:

- Unauthorized actions performed in a victim's browser.
- Exposure of sensitive information accessible to page scripts.
- Manipulation of webpage content.
- Phishing and social engineering.
- Abuse of authenticated user sessions.

The actual impact depends on the application, browser protections, available privileges, and security controls.

## Important distinction

XSS is a client-side code injection vulnerability. It is different from SQL injection, which involves manipulating database queries.
          `
        },
        {
          title: "Types of XSS",
          order: 2,
          content: `
# Types of Cross-Site Scripting

XSS is commonly classified into three major types.

## 1. Reflected XSS

Reflected XSS occurs when untrusted input is included in an immediate server response without proper output encoding.

For example, a search page might display the search term supplied through a URL parameter.

If the application inserts that value into HTML unsafely, specially crafted input may execute in the browser.

The malicious input is generally delivered through a request, such as a link.

## 2. Stored XSS

Stored XSS occurs when malicious content is saved by an application and later displayed to users.

Common locations include:

- Comment sections.
- User profiles.
- Product reviews.
- Discussion forums.
- Support tickets.

Stored XSS can affect multiple users because the malicious content remains in the application.

## 3. DOM-based XSS

DOM-based XSS occurs when client-side JavaScript processes untrusted data and uses it in an unsafe DOM operation.

For example, using innerHTML to display untrusted input can cause the browser to interpret that input as HTML.

This vulnerability may occur entirely in client-side code without the server directly reflecting the malicious input.

## Comparing the types

| Type | Where the issue occurs |
|---|---|
| Reflected | Server response |
| Stored | Persisted application content |
| DOM-based | Client-side JavaScript and DOM |

Understanding where untrusted input is processed helps security testers identify the correct protection.
          `
        },
        {
          title: "XSS Attack Surface and Entry Points",
          order: 3,
          content: `
# Identifying XSS Entry Points

An entry point is a location where untrusted data enters an application.

Common entry points include:

- Search fields.
- Contact forms.
- Comment boxes.
- Profile names and biographies.
- URL query parameters.
- HTTP request headers.
- Uploaded filenames.
- Data retrieved from APIs.

## Sources and sinks

In client-side security testing, two important concepts are sources and sinks.

### Sources

Sources are locations from which JavaScript can obtain data.

Examples include:

- location.search
- location.hash
- document.referrer
- User-controlled form values

### Sinks

Sinks are operations that can interpret data as HTML or executable code.

Examples include:

- innerHTML
- outerHTML
- insertAdjacentHTML
- document.write
- Certain unsafe script-related operations

Not every use of these APIs automatically creates a vulnerability. The risk depends on whether untrusted data reaches them without appropriate protection.

## Security testing approach

When assessing an application:

1. Identify input fields and URL parameters.
2. Observe where submitted values appear.
3. Determine whether the value is stored or reflected.
4. Inspect the context in which it is displayed.
5. Test only within authorized environments.

Use harmless test strings in controlled environments before attempting more complex security validation.
          `
        },
        {
          title: "Impact and Basic Prevention",
          order: 4,
          content: `
# Impact and Prevention of XSS

XSS occurs when untrusted data is interpreted as executable webpage content.

The most effective defense is to ensure that data remains data rather than becoming executable markup or code.

## 1. Context-aware output encoding

Encode untrusted values according to the context where they are inserted.

HTML text, HTML attributes, JavaScript strings, CSS, and URLs require different handling.

A single encoding method is not appropriate for every context.

## 2. Safe DOM APIs

When displaying plain text in JavaScript, prefer:

\`\`\`javascript
element.textContent = userInput;
\`\`\`

Avoid using innerHTML with untrusted input.

## 3. HTML sanitization

If an application genuinely needs to accept user-provided HTML, use a well-maintained HTML sanitization library with a restrictive allowlist.

## 4. Content Security Policy

Content Security Policy (CSP) is a browser security mechanism that restricts which scripts and other resources a page can load or execute.

A well-designed CSP can reduce the impact of some XSS vulnerabilities.

It should be treated as an additional layer of protection, not a replacement for secure output handling.

## 5. Secure development practices

- Avoid unsafe DOM operations.
- Use framework-provided escaping mechanisms.
- Validate input according to business requirements.
- Sanitize HTML when HTML input is required.
- Review third-party libraries.
- Test application output in different contexts.

The goal is to prevent untrusted input from being interpreted as executable content.
          `
        }
      ],

      questions: [
        {
          question: "What does XSS stand for?",
          questionType: QuestionType.MCQ,
          options: [
            "Cross-Site Scripting",
            "Cross Server Security",
            "External Script System",
            "Cross Source Scanning"
          ],
          correctAnswer: "Cross-Site Scripting",
          explanation: "XSS stands for Cross-Site Scripting, a vulnerability involving the execution of untrusted scripts in a user's browser.",
          order: 1
        },
        {
          question: "Which part of an application commonly executes JavaScript?",
          questionType: QuestionType.MCQ,
          options: [
            "Database server",
            "User's browser",
            "DNS server",
            "File system"
          ],
          correctAnswer: "User's browser",
          explanation: "XSS involves script execution in the browser that renders the vulnerable webpage.",
          order: 2
        },
        {
          question: "Which XSS type involves malicious content being saved by an application?",
          questionType: QuestionType.MCQ,
          options: [
            "Reflected XSS",
            "Stored XSS",
            "DOM-based XSS",
            "SQL Injection"
          ],
          correctAnswer: "Stored XSS",
          explanation: "Stored XSS occurs when malicious content is persisted and later served to users.",
          order: 3
        },
        {
          question: "Which XSS type is primarily associated with unsafe client-side JavaScript DOM operations?",
          questionType: QuestionType.MCQ,
          options: [
            "Stored XSS",
            "Reflected XSS",
            "DOM-based XSS",
            "Blind SQL Injection"
          ],
          correctAnswer: "DOM-based XSS",
          explanation: "DOM-based XSS occurs when client-side code processes untrusted input in an unsafe way.",
          order: 4
        },
        {
          question: "Which of the following can be potential XSS entry points?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Search fields",
            "Comment forms",
            "URL parameters",
            "User profile fields"
          ],
          correctAnswer: [
            "Search fields",
            "Comment forms",
            "URL parameters",
            "User profile fields"
          ],
          explanation: "All these locations can accept untrusted input that may later be displayed unsafely.",
          order: 5
        },
        {
          question: "Which JavaScript property is generally safer for displaying plain user-provided text?",
          questionType: QuestionType.MCQ,
          options: [
            "innerHTML",
            "textContent",
            "outerHTML",
            "document.write"
          ],
          correctAnswer: "textContent",
          explanation: "textContent treats the supplied value as text rather than parsing it as HTML.",
          order: 6
        },
        {
          question: "Can stored XSS potentially affect multiple users?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Stored malicious content can execute whenever affected users load the vulnerable page.",
          order: 7
        },
        {
          question: "Which security mechanism provides an additional layer of defense against some XSS attacks?",
          questionType: QuestionType.MCQ,
          options: [
            "Content Security Policy",
            "FTP",
            "DNS caching",
            "Database indexing"
          ],
          correctAnswer: "Content Security Policy",
          explanation: "CSP restricts permitted resource loading and script execution, helping reduce XSS impact.",
          order: 8
        },
        {
          question: "Which of the following are important XSS prevention practices?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Context-aware output encoding",
            "Safe DOM APIs",
            "HTML sanitization when accepting HTML",
            "Displaying all input using innerHTML"
          ],
          correctAnswer: [
            "Context-aware output encoding",
            "Safe DOM APIs",
            "HTML sanitization when accepting HTML"
          ],
          explanation: "These techniques help prevent untrusted data from being interpreted as executable content.",
          order: 9
        },
        {
          question: "XSS and SQL injection are the same type of vulnerability.",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "XSS targets browser-side execution, whereas SQL injection targets database query processing.",
          order: 10
        }
      ]
    },

    {
      levelName: "XSS Discovery and Testing",
      description:
        "Learn how to identify injection points, understand browser contexts, and test for XSS safely.",
      order: 2,

      learning: [
        {
          title: "Understanding Sources and Sinks",
          order: 1,
          content: `
# Understanding Sources and Sinks

Sources and sinks are fundamental concepts in identifying DOM-based XSS.

## Sources

A source is an input location from which client-side JavaScript obtains data.

Examples:

- location.search
- location.hash
- document.referrer
- Input form values
- Data received from external APIs

## Sinks

A sink is an operation that uses data in a potentially dangerous context.

Examples include:

- innerHTML
- outerHTML
- insertAdjacentHTML
- document.write

## Data flow

A vulnerability may exist when untrusted data flows from a source to a dangerous sink without appropriate validation or sanitization.

For example:

\`\`\`javascript
const input = location.hash.slice(1);
document.getElementById("output").innerHTML = input;
\`\`\`

The code reads user-controlled data from the URL fragment and inserts it as HTML.

A safer approach for plain text is:

\`\`\`javascript
const input = location.hash.slice(1);
document.getElementById("output").textContent = input;
\`\`\`

## Important point

The presence of a source or sink does not automatically prove a vulnerability. You must understand the complete data flow and the protections applied.
          `
        },
        {
          title: "Understanding HTML and JavaScript Contexts",
          order: 2,
          content: `
# Understanding Injection Contexts

The browser interprets content differently depending on where it appears in a document.

Security testers must identify the context in which untrusted data is inserted.

## Common contexts

### HTML text context

Data is inserted between HTML tags.

Example:

\`\`\`html
<p>USER_INPUT</p>
\`\`\`

### HTML attribute context

Data is inserted into an HTML attribute.

Example:

\`\`\`html
<input value="USER_INPUT">
\`\`\`

### JavaScript context

Data is inserted inside JavaScript code.

Example:

\`\`\`html
<script>
const name = "USER_INPUT";
</script>
\`\`\`

### URL context

Data is inserted into a URL or URL-related attribute.

Different contexts require different protections.

## Why context matters

Encoding suitable for HTML text is not necessarily sufficient for a JavaScript string or URL.

Developers should use context-aware output encoding and avoid dynamically constructing executable code from untrusted input.

When testing, inspect the rendered DOM and response source to understand how the application handles input.
          `
        },
        {
          title: "Identifying and Testing Injection Points",
          order: 3,
          content: `
# Finding Potential XSS Vulnerabilities

A structured testing process helps identify potentially vulnerable input locations.

## Step 1: Map the application

Identify pages, forms, search functions, profile fields, and URL parameters.

## Step 2: Submit harmless markers

Use a unique text marker such as:

\`\`\`text
XSS_TEST_12345
\`\`\`

Observe whether it appears in the response or rendered webpage.

## Step 3: Inspect the context

Determine whether the marker appears in:

- HTML text.
- HTML attributes.
- JavaScript strings.
- URL values.
- DOM elements created by client-side code.

## Step 4: Review data flow

For client-side functionality, trace whether input from sources reaches unsafe sinks.

## Step 5: Validate safely

Use a controlled testing environment and harmless proof-of-concept input. Avoid affecting other users or accessing their information.

## Step 6: Document findings

Record the affected page, input location, request, response, browser behavior, impact, and recommended fix.

Always obtain authorization before testing real applications.
          `
        },
        {
          title: "Reflected, Stored and DOM-based Testing",
          order: 4,
          content: `
# Testing Different XSS Types

Different XSS types require different testing approaches.

## Reflected XSS testing

Identify parameters that are reflected in server responses.

Submit a harmless unique marker and inspect where it appears.

Check whether the server applies suitable output encoding.

## Stored XSS testing

In an authorized test environment, submit a harmless marker through content that is stored.

Revisit the page and check whether the content is displayed safely.

Also inspect other views that display the same stored data.

## DOM-based XSS testing

Inspect JavaScript code for sources and sinks.

Use browser developer tools to observe how URL fragments, query parameters, or other inputs are processed.

Trace the data to its final DOM operation.

## Reporting

A useful report should include:

- Vulnerable endpoint.
- Affected parameter or field.
- XSS classification.
- Relevant request and response.
- Safe reproduction steps.
- Security impact.
- Recommended remediation.

Do not assume a vulnerability based only on unusual output. Confirm the actual browser behavior.
          `
        }
      ],

      questions: [
        {
          question: "What is a source in DOM-based XSS analysis?",
          questionType: QuestionType.MCQ,
          options: [
            "A location from which untrusted data is obtained",
            "A database backup",
            "A firewall rule",
            "A server log"
          ],
          correctAnswer: "A location from which untrusted data is obtained",
          explanation: "Sources provide data that may eventually reach an unsafe operation.",
          order: 1
        },
        {
          question: "Which of the following is a commonly discussed JavaScript source?",
          questionType: QuestionType.MCQ,
          options: [
            "location.hash",
            "document.cookieStore",
            "database.index",
            "server.port"
          ],
          correctAnswer: "location.hash",
          explanation: "location.hash contains the URL fragment and can be controlled through navigation.",
          order: 2
        },
        {
          question: "Which of the following can act as an unsafe HTML sink?",
          questionType: QuestionType.MCQ,
          options: [
            "textContent",
            "innerHTML",
            "console.log",
            "JSON.stringify"
          ],
          correctAnswer: "innerHTML",
          explanation: "innerHTML parses assigned content as HTML and can be dangerous with untrusted input.",
          order: 3
        },
        {
          question: "Does the presence of innerHTML automatically prove an XSS vulnerability?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "You must determine whether untrusted input reaches the sink and whether appropriate protections exist.",
          order: 4
        },
        {
          question: "Which contexts should be considered during XSS testing?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "HTML text",
            "HTML attributes",
            "JavaScript strings",
            "URL contexts"
          ],
          correctAnswer: [
            "HTML text",
            "HTML attributes",
            "JavaScript strings",
            "URL contexts"
          ],
          explanation: "Each context has different parsing rules and encoding requirements.",
          order: 5
        },
        {
          question: "What is a useful first step when investigating a potentially reflected input?",
          questionType: QuestionType.MCQ,
          options: [
            "Delete the database",
            "Submit a unique harmless marker",
            "Disable the firewall",
            "Modify another user's account"
          ],
          correctAnswer: "Submit a unique harmless marker",
          explanation: "A unique marker helps determine whether and where input is reflected.",
          order: 6
        },
        {
          question: "Which browser tool is useful for inspecting rendered DOM elements?",
          questionType: QuestionType.MCQ,
          options: [
            "Developer Tools",
            "Task Scheduler",
            "Disk Management",
            "File Explorer"
          ],
          correctAnswer: "Developer Tools",
          explanation: "Browser developer tools allow inspection of DOM elements and client-side execution.",
          order: 7
        },
        {
          question: "Which details are useful in an XSS vulnerability report?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Affected endpoint",
            "Reproduction steps",
            "Security impact",
            "Recommended remediation"
          ],
          correctAnswer: [
            "Affected endpoint",
            "Reproduction steps",
            "Security impact",
            "Recommended remediation"
          ],
          explanation: "A complete report should provide enough information to reproduce, understand, and fix the issue.",
          order: 8
        },
        {
          question: "Reflected XSS generally involves untrusted input being included in an immediate response.",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Reflected XSS commonly occurs when request data is returned in a response without appropriate protection.",
          order: 9
        },
        {
          question: "What must be obtained before testing a real application for XSS?",
          questionType: QuestionType.MCQ,
          options: [
            "Authorization",
            "A new email account",
            "Database administrator access",
            "A public IP address"
          ],
          correctAnswer: "Authorization",
          explanation: "Security testing must be conducted within an explicitly authorized scope.",
          order: 10
        }
      ]
    },

    {
      levelName: "Advanced XSS and Mitigation",
      description:
        "Study complex DOM interactions, browser security controls, secure coding, and advanced XSS prevention.",
      order: 3,

      learning: [
        {
          title: "Advanced DOM Manipulation Risks",
          order: 1,
          content: `
# Advanced DOM Manipulation Risks

Modern web applications frequently build webpages dynamically using JavaScript.

This creates additional security considerations because data may travel through several client-side functions before reaching the DOM.

## Dangerous DOM operations

Examples of operations that require careful handling include:

- innerHTML
- outerHTML
- insertAdjacentHTML
- document.write
- Dynamic script construction
- Unsafe URL assignments

## Framework considerations

Frameworks such as React generally escape text inserted through normal rendering.

For example:

\`\`\`tsx
function Comment({ message }: { message: string }) {
  return <p>{message}</p>;
}
\`\`\`

The framework treats the message as text.

However, bypass mechanisms such as React's dangerouslySetInnerHTML require additional care and proper sanitization.

Other frameworks have their own escaping and trust mechanisms.

## Trusted Types

Trusted Types is a browser security mechanism that can help reduce DOM-based XSS by requiring certain sensitive DOM operations to receive trusted values.

It works particularly well as part of a broader secure development strategy.

## Key lesson

Using a modern framework does not automatically make every application secure. Developers must understand where escaping protections are bypassed.
          `
        },
        {
          title: "Content Security Policy and Browser Defenses",
          order: 2,
          content: `
# Content Security Policy (CSP)

Content Security Policy is a browser-enforced security mechanism that allows websites to control which resources can be loaded and executed.

It can reduce the impact of certain injection vulnerabilities.

## Important CSP directives

### default-src

Provides a fallback policy for resource types without a more specific directive.

### script-src

Controls permitted JavaScript sources and script execution.

### object-src

Controls permitted plugin-related object resources.

### base-uri

Restricts which URLs may be used in the document base element.

## Nonces and hashes

A nonce is a unique value generated for a page response and associated with permitted inline scripts.

A hash can authorize specific inline script content.

These mechanisms are preferable to broadly allowing arbitrary inline scripts.

## Example policy

\`\`\`http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-randomValue'; object-src 'none'; base-uri 'self'
\`\`\`

This is an illustrative policy. Real deployments should generate unpredictable nonces per response and test the policy against application requirements.

## Limitations

CSP is defense in depth.

It does not replace output encoding, safe DOM manipulation, or proper HTML sanitization.
          `
        },
        {
          title: "Secure Coding and XSS Remediation",
          order: 3,
          content: `
# Secure Coding Practices for XSS Prevention

Developers should design applications so untrusted content cannot become executable code.

## Output encoding

Encode data according to its destination context.

Do not reuse HTML encoding as a universal solution for JavaScript, CSS, or URL contexts.

## Safe rendering

Prefer APIs that treat user input as text.

For example:

\`\`\`javascript
output.textContent = userInput;
\`\`\`

Avoid passing untrusted content directly into HTML parsing APIs.

## Sanitization

If rich HTML is a business requirement, use a reputable sanitizer with a carefully defined allowlist.

Keep sanitization libraries updated.

## Secure framework usage

Use standard framework rendering mechanisms and avoid unnecessary escape hatches.

Review code that uses:

- dangerouslySetInnerHTML
- Direct DOM manipulation
- Dynamic script generation
- Unsafe URL handling

## Defense in depth

Combine secure rendering with:

- Appropriate CSP.
- Secure dependency management.
- Code reviews.
- Automated security testing.
- Security headers.
- Regular vulnerability assessments.

The primary objective is to prevent untrusted input from reaching executable contexts unsafely.
          `
        },
        {
          title: "Advanced Assessment and Reporting",
          order: 4,
          content: `
# Advanced XSS Assessment

Advanced XSS assessment requires understanding the application's complete input and output flow.

## 1. Map application data flows

Identify user-controlled sources and the operations that consume their values.

Consider both server-rendered pages and client-side JavaScript.

## 2. Identify security boundaries

Examine:

- Authentication requirements.
- User roles.
- Content visibility.
- Stored data shared between users.
- Third-party integrations.
- Framework escaping behavior.

## 3. Review protection mechanisms

Evaluate output encoding, HTML sanitization, CSP, and any Trusted Types implementation.

Check whether protections are applied consistently.

## 4. Assess impact

Determine what an attacker could realistically achieve in the context of the affected application.

Consider the victim's privileges, accessible data, and browser security controls.

## 5. Prepare a professional report

A good vulnerability report includes:

1. Clear title.
2. Vulnerability classification.
3. Affected endpoint and parameter.
4. Authorized reproduction steps.
5. Evidence of the issue.
6. Security impact.
7. Remediation guidance.

Avoid overstating impact. Explain the demonstrated behavior and distinguish it from hypothetical consequences.

## Final takeaway

Effective XSS assessment combines secure coding knowledge, browser behavior, application architecture, and responsible testing.
          `
        }
      ],

      questions: [
        {
          question: "What is the main purpose of Trusted Types?",
          questionType: QuestionType.MCQ,
          options: [
            "To reduce unsafe data reaching sensitive DOM operations",
            "To encrypt database backups",
            "To replace HTTPS",
            "To manage user passwords"
          ],
          correctAnswer: "To reduce unsafe data reaching sensitive DOM operations",
          explanation: "Trusted Types helps protect sensitive DOM injection sinks by requiring trusted values.",
          order: 1
        },
        {
          question: "Which React feature requires special security care when rendering raw HTML?",
          questionType: QuestionType.MCQ,
          options: [
            "useState",
            "dangerouslySetInnerHTML",
            "useEffect",
            "Fragment"
          ],
          correctAnswer: "dangerouslySetInnerHTML",
          explanation: "dangerouslySetInnerHTML bypasses React's normal text escaping behavior.",
          order: 2
        },
        {
          question: "Which CSP directive controls permitted JavaScript sources?",
          questionType: QuestionType.MCQ,
          options: [
            "default-src",
            "script-src",
            "img-src",
            "font-src"
          ],
          correctAnswer: "script-src",
          explanation: "script-src defines permitted sources and policies for JavaScript execution.",
          order: 3
        },
        {
          question: "What is a CSP nonce?",
          questionType: QuestionType.MCQ,
          options: [
            "A unique value used to authorize specific scripts",
            "A database encryption key",
            "A browser cookie",
            "A DNS record"
          ],
          correctAnswer: "A unique value used to authorize specific scripts",
          explanation: "A nonce allows specifically marked scripts when the matching nonce is included in the CSP policy.",
          order: 4
        },
        {
          question: "Which CSP directives can be useful in reducing XSS-related risks?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "script-src",
            "object-src",
            "base-uri",
            "default-src"
          ],
          correctAnswer: [
            "script-src",
            "object-src",
            "base-uri",
            "default-src"
          ],
          explanation: "These directives help control script execution, plugin objects, base URLs, and default resource policies.",
          order: 5
        },
        {
          question: "Does CSP completely replace output encoding?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "CSP is an additional security layer. Context-aware output encoding remains essential.",
          order: 6
        },
        {
          question: "What should developers use when rich user-generated HTML is required?",
          questionType: QuestionType.MCQ,
          options: [
            "A reputable HTML sanitizer",
            "Direct innerHTML assignment",
            "No validation",
            "Base64 encoding alone"
          ],
          correctAnswer: "A reputable HTML sanitizer",
          explanation: "A sanitizer can remove or neutralize unsafe HTML according to a defined allowlist.",
          order: 7
        },
        {
          question: "Which practices contribute to advanced XSS prevention?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Safe DOM APIs",
            "Context-aware output encoding",
            "Security code reviews",
            "Using untrusted data directly in script execution"
          ],
          correctAnswer: [
            "Safe DOM APIs",
            "Context-aware output encoding",
            "Security code reviews"
          ],
          explanation: "These practices reduce unsafe data handling and help detect vulnerabilities during development.",
          order: 8
        },
        {
          question: "A modern JavaScript framework guarantees that every possible DOM operation is XSS-safe.",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Framework protections can be bypassed or avoided through unsafe APIs and direct DOM manipulation.",
          order: 9
        },
        {
          question: "What should a professional XSS report contain?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Affected endpoint",
            "Reproduction steps",
            "Demonstrated impact",
            "Recommended remediation"
          ],
          correctAnswer: [
            "Affected endpoint",
            "Reproduction steps",
            "Demonstrated impact",
            "Recommended remediation"
          ],
          explanation: "These details help developers reproduce, assess, and remediate the vulnerability.",
          order: 10
        }
      ]
    }
  ]
};

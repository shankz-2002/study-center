
import { QuestionType } from "../types/question.js";

export const csrfData = {
  fieldName: "Cybersecurity",
  fieldDescription:
    "Learn cybersecurity concepts, vulnerabilities, tools, and practical security testing.",
  categoryName: "Web Security",
  categoryDescription:
    "Learn common web application vulnerabilities, security testing, and prevention techniques.",
  topicName: "Cross-Site Request Forgery (CSRF)",
  topicDescription:
    "Understand CSRF attacks, how browsers handle authentication credentials, how to test for CSRF, and how to implement effective defenses.",

  levels: [
    // ==========================================
    // LEVEL 1: CSRF FUNDAMENTALS
    // ==========================================
    {
      levelName: "CSRF Fundamentals",
      description:
        "Understand CSRF, browser authentication behavior, attack requirements, and common CSRF scenarios.",
      order: 1,

      learning: [
        {
          title: "What is Cross-Site Request Forgery?",
          order: 1,
          content: `
# What is Cross-Site Request Forgery (CSRF)?

Cross-Site Request Forgery (CSRF) is a web security vulnerability that tricks an authenticated user's browser into sending an unwanted request to an application.

The request is sent using the user's existing authentication credentials, such as session cookies.

The application may process the request because it cannot distinguish the forged request from an intentional request made by the user.

## Simple example

Imagine a user is logged into a banking application.

The application allows users to change their registered email address.

An attacker creates a malicious webpage that causes the victim's browser to submit a request to the banking application.

If the browser automatically includes the victim's authentication cookie and the application lacks CSRF protection, the email address might be changed without the user's intention.

## What can CSRF cause?

Depending on the application's functionality, CSRF may allow unwanted actions such as:

- Changing account settings.
- Updating an email address.
- Changing a password when additional protections are absent.
- Adding an address.
- Making unauthorized purchases.
- Performing administrative actions.

## Important distinction

CSRF does not generally require stealing the victim's session cookie.

Instead, it abuses the browser's automatic handling of authentication credentials.

## Main defense

Use anti-CSRF tokens and appropriate cookie settings. Also validate request origin where appropriate.
          `,
        },
        {
          title: "How Browsers Handle Authentication Cookies",
          order: 2,
          content: `
# How Browsers Handle Authentication Cookies

Understanding cookies is essential for understanding CSRF.

A cookie is a small piece of data stored by a browser and associated with a website.

Applications commonly use session cookies to maintain authenticated sessions.

## Authentication flow

1. A user logs into an application.
2. The server validates the credentials.
3. The server creates an authenticated session.
4. The server sends a session cookie.
5. The browser stores the cookie.
6. On eligible subsequent requests, the browser automatically sends the cookie.

## Why this creates a CSRF risk

Suppose a user is authenticated on:

\`\`\`
https://bank.example
\`\`\`

The user visits another website controlled by an attacker.

That website may attempt to cause the browser to send a request to the banking application.

If the browser includes the authentication cookie and the application does not verify the request's legitimacy, an unwanted action may occur.

## Important cookie attributes

### Secure

The cookie is sent only over secure HTTPS connections.

### HttpOnly

Prevents JavaScript from reading the cookie through browser APIs.

### SameSite

Controls when cookies are included in cross-site requests.

Common values:

- Strict: Restricts cookies in cross-site contexts.
- Lax: Allows cookies in certain cross-site navigation situations.
- None: Allows cross-site cookie use, generally requiring Secure.

## Important

HttpOnly helps protect cookies against JavaScript access, but it does not independently prevent CSRF.

SameSite provides useful protection, but should not be treated as the only defense in every application.
          `,
        },
        {
          title: "How a CSRF Attack Works",
          order: 3,
          content: `
# How a CSRF Attack Works

A CSRF attack relies on the relationship between a user's authenticated browser and a vulnerable application.

## Attack scenario

Assume:

- A victim is logged into an application.
- The application uses cookies for authentication.
- A sensitive action accepts a request without verifying its origin or CSRF token.
- The victim visits an attacker-controlled website.

## Attack sequence

1. The victim logs into the target application.
2. The browser stores the session cookie.
3. The victim visits a malicious webpage.
4. The webpage causes a request to the target application.
5. The browser may automatically include the session cookie.
6. The vulnerable application accepts the request.
7. An unintended action is performed.

## What does the attacker need?

The attacker generally needs:

- A victim with an authenticated session.
- A vulnerable state-changing endpoint.
- A way to make the victim's browser send the request.
- Missing or ineffective CSRF protections.

## Why is this possible?

Browsers automatically attach eligible cookies to requests.

The server must therefore verify that sensitive requests are legitimate.

## Important

CSRF generally causes the victim's browser to perform an action. It does not automatically allow the attacker to read the application's protected response because browser same-origin restrictions still apply.
          `,
        },
        {
          title: "CSRF Requirements and Common Targets",
          order: 4,
          content: `
# CSRF Requirements and Common Targets

Not every endpoint is vulnerable to CSRF.

Understanding the requirements helps security testers identify realistic attack scenarios.

## Common requirements

### 1. Authenticated victim

The victim must generally have an active authenticated session.

### 2. Automatically attached credentials

The browser must send authentication credentials with the forged request.

### 3. State-changing operation

The endpoint should perform an action that changes server-side state.

### 4. Missing or ineffective protection

The application must lack an effective mechanism to verify the request.

## Common targets

- Profile update endpoints.
- Email change endpoints.
- Account setting endpoints.
- Shopping cart operations.
- Administrative actions.
- Address management.

## What is usually not a CSRF vulnerability?

A normal GET request that only retrieves information should not modify server-side state.

Applications should avoid using GET requests for sensitive state-changing operations.

## CSRF versus XSS

| CSRF | XSS |
|---|---|
| Abuses authenticated browser requests | Executes attacker-controlled script |
| Usually relies on browser credentials | Runs script in the target origin |
| Can occur without reading responses | Can access page data subject to browser controls |
| Uses request-forgery techniques | Uses script injection techniques |

## Key concept

CSRF abuses the trust an application places in requests from an authenticated browser.
          `,
        },
      ],

      questions: [
        {
          question: "What is CSRF?",
          questionType: QuestionType.MCQ,
          options: [
            "A vulnerability that tricks an authenticated browser into sending unwanted requests",
            "A technique for stealing database passwords",
            "A method of encrypting cookies",
            "A type of network scanning",
          ],
          correctAnswer:
            "A vulnerability that tricks an authenticated browser into sending unwanted requests",
          explanation:
            "CSRF abuses an authenticated user's browser to perform actions the user did not intend.",
          order: 1,
        },
        {
          question: "What does a CSRF attack commonly rely on?",
          questionType: QuestionType.MCQ,
          options: [
            "Automatic inclusion of authentication credentials",
            "Weak database indexes",
            "DNS cache poisoning",
            "Password hashing",
          ],
          correctAnswer:
            "Automatic inclusion of authentication credentials",
          explanation:
            "Browsers may automatically attach eligible authentication cookies to requests.",
          order: 2,
        },
        {
          question: "Does CSRF generally require stealing the victim's session cookie?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "CSRF abuses the browser's existing authenticated session and does not generally require stealing the cookie.",
          order: 3,
        },
        {
          question: "Which cookie attribute prevents JavaScript from reading a cookie?",
          questionType: QuestionType.MCQ,
          options: ["Secure", "HttpOnly", "SameSite", "Domain"],
          correctAnswer: "HttpOnly",
          explanation:
            "HttpOnly prevents access to the cookie through JavaScript document.cookie.",
          order: 4,
        },
        {
          question: "Which cookie attribute controls cross-site cookie behavior?",
          questionType: QuestionType.MCQ,
          options: ["Path", "HttpOnly", "SameSite", "Expires"],
          correctAnswer: "SameSite",
          explanation:
            "SameSite controls whether cookies are sent in cross-site contexts.",
          order: 5,
        },
        {
          question: "Which is a common CSRF target?",
          questionType: QuestionType.MCQ,
          options: [
            "Changing account email",
            "Reading a public image",
            "Loading a static stylesheet",
            "Downloading a public logo",
          ],
          correctAnswer: "Changing account email",
          explanation:
            "Changing account information is a state-changing operation that may be targeted by CSRF.",
          order: 6,
        },
        {
          question: "Does HttpOnly alone prevent CSRF?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "HttpOnly prevents JavaScript from reading cookies but does not prevent the browser from sending them.",
          order: 7,
        },
        {
          question: "Which HTTP method should generally not be used for state-changing operations?",
          questionType: QuestionType.MCQ,
          options: ["GET", "POST", "PUT", "PATCH"],
          correctAnswer: "GET",
          explanation:
            "GET should be safe and should not perform state-changing operations.",
          order: 8,
        },
        {
          question: "What does the Secure cookie attribute do?",
          questionType: QuestionType.MCQ,
          options: [
            "Prevents all CSRF attacks",
            "Restricts cookie transmission to secure connections",
            "Prevents JavaScript execution",
            "Encrypts database queries",
          ],
          correctAnswer:
            "Restricts cookie transmission to secure connections",
          explanation:
            "Secure ensures that the cookie is transmitted only over secure connections such as HTTPS.",
          order: 9,
        },
        {
          question: "Can CSRF occur without XSS?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "CSRF and XSS are different vulnerabilities. CSRF can exist even when an application has no XSS vulnerability.",
          order: 10,
        },
      ],
    },

    // ==========================================
    // LEVEL 2: CSRF DISCOVERY AND TESTING
    // ==========================================
    {
      levelName: "CSRF Discovery and Testing",
      description:
        "Learn how to identify CSRF vulnerabilities, inspect requests, understand token validation, and test CSRF protections.",
      order: 2,

      learning: [
        {
          title: "Identifying Potential CSRF Vulnerabilities",
          order: 1,
          content: `
# Identifying Potential CSRF Vulnerabilities

CSRF testing begins by identifying sensitive actions and understanding how the application authenticates requests.

## Step 1: Identify state-changing functionality

Look for features such as:

- Updating profile details.
- Changing account settings.
- Adding or removing addresses.
- Updating email addresses.
- Changing passwords.
- Performing administrative actions.

## Step 2: Capture requests

Use Burp Suite Proxy to capture requests generated by these features.

Observe:

- HTTP method.
- URL and parameters.
- Request body.
- Cookies.
- CSRF-related headers.
- Origin and Referer headers.

## Step 3: Understand authentication

Determine whether the application relies on:

- Session cookies.
- Bearer tokens.
- Custom authentication headers.
- Other credentials.

Cookie-based authentication is particularly relevant to traditional CSRF.

## Step 4: Inspect protections

Look for:

- CSRF tokens.
- SameSite cookie attributes.
- Origin validation.
- Referer validation.
- Custom request headers.

## Step 5: Test safely

In an authorized lab, determine whether a state-changing request can be performed without the expected protection.

## Important

A missing token alone does not prove a vulnerability. Other effective protections may exist.
          `,
        },
        {
          title: "Understanding CSRF Tokens",
          order: 2,
          content: `
# Understanding CSRF Tokens

A CSRF token is a value used to verify that a state-changing request was generated through an expected application flow.

The server generates or validates the token and expects it to be included in protected requests.

## How CSRF tokens work

1. The user visits the application.
2. The server provides a CSRF token.
3. The application includes the token in a form or request.
4. The user submits the form.
5. The server validates the token.
6. The request is accepted only if the validation succeeds.

## Example form

\`\`\`html
<form method="POST" action="/account/email">
  <input
    type="hidden"
    name="csrfToken"
    value="example-token"
  />

  <input
    type="email"
    name="email"
  />

  <button type="submit">
    Update email
  </button>
</form>
\`\`\`

This is an illustrative example. The server must independently validate the token.

## Characteristics of effective tokens

A good CSRF token should:

- Be unpredictable.
- Be associated with the user's session or request context.
- Be validated server-side.
- Be required for protected operations.
- Be protected against reuse where the design requires it.

## Common implementation mistakes

- Not validating the token.
- Accepting missing tokens.
- Using predictable tokens.
- Accepting tokens belonging to other sessions.
- Applying token checks to only some sensitive endpoints.

## Important

A hidden input field alone does not provide protection. Server-side validation is essential.
          `,
        },
        {
          title: "Testing CSRF Protections with Burp Suite",
          order: 3,
          content: `
# Testing CSRF Protections with Burp Suite

Burp Suite helps testers inspect and modify HTTP requests.

## 1. Capture the request

Perform a legitimate state-changing action in an authorized test application.

For example, update a profile field.

Capture the request using Burp Proxy.

## 2. Send it to Repeater

Right-click the captured request and choose Send to Repeater.

This allows you to inspect and manually modify the request.

## 3. Inspect the request

Look for:

- CSRF token parameters.
- CSRF-related headers.
- Session cookies.
- Origin header.
- Referer header.

## 4. Examine server behavior

In a controlled lab, compare the application's response when:

- A valid token is supplied.
- The token is missing.
- The token is modified.
- A token from a different session is used.

## 5. Understand the result

A secure application should reject requests that fail its required CSRF validation.

However, do not conclude that the application is vulnerable just because a particular token is absent. Cookie policy and other protections may be relevant.

## Burp Suite features

- Proxy: Capture browser requests.
- Repeater: Modify and resend requests.
- Comparer: Compare responses.
- Logger: Review HTTP traffic.

## Safety

Perform these tests only against applications you own or are authorized to assess. Use test accounts and non-destructive actions.
          `,
        },
        {
          title: "Origin, Referer and SameSite Validation",
          order: 4,
          content: `
# Origin, Referer and SameSite Validation

Applications can use browser request metadata and cookie restrictions as additional CSRF defenses.

## Origin header

The Origin header identifies the origin that initiated a request in relevant browser contexts.

Example:

\`\`\`http
Origin: https://app.example
\`\`\`

A server can compare this value against its expected trusted origin.

## Referer header

The Referer header may identify the page from which a request originated.

Example:

\`\`\`http
Referer: https://app.example/profile
\`\`\`

Applications can use Referer validation as an additional defense.

However, privacy settings and browser behavior can affect whether this header is present.

## SameSite cookies

SameSite controls when cookies are included in cross-site requests.

### Strict

Provides strong restrictions on sending cookies in cross-site contexts.

### Lax

Allows cookies in certain cross-site top-level navigation scenarios, but restricts many cross-site subrequests.

### None

Allows cross-site cookie use, generally requiring the Secure attribute.

## Limitations

No single header or cookie attribute should be treated as a universal solution.

An application's security depends on its complete request-handling design.

## Testing considerations

Check:

- Whether Origin is validated correctly.
- Whether missing Origin values are handled safely.
- Whether Referer validation is consistent.
- Whether cookies use appropriate SameSite settings.
- Whether sensitive endpoints enforce CSRF protections.
          `,
        },
      ],

      questions: [
        {
          question: "What should you identify first when testing for CSRF?",
          questionType: QuestionType.MCQ,
          options: [
            "State-changing functionality",
            "Image dimensions",
            "Website color scheme",
            "Public DNS records",
          ],
          correctAnswer: "State-changing functionality",
          explanation:
            "CSRF testing focuses on actions that modify server-side state.",
          order: 1,
        },
        {
          question: "What is the purpose of a CSRF token?",
          questionType: QuestionType.MCQ,
          options: [
            "To verify the legitimacy of protected requests",
            "To encrypt all database records",
            "To replace user passwords",
            "To increase website performance",
          ],
          correctAnswer:
            "To verify the legitimacy of protected requests",
          explanation:
            "A server validates the token to determine whether a protected request is legitimate.",
          order: 2,
        },
        {
          question: "Where must a CSRF token be validated?",
          questionType: QuestionType.MCQ,
          options: [
            "Only in frontend JavaScript",
            "On the server",
            "Only in browser storage",
            "In the CSS file",
          ],
          correctAnswer: "On the server",
          explanation:
            "Client-side checks can be bypassed. The server must enforce token validation.",
          order: 3,
        },
        {
          question: "Which Burp Suite tool is useful for manually modifying requests?",
          questionType: QuestionType.MCQ,
          options: ["Repeater", "Decoder", "Dashboard", "Sequencer"],
          correctAnswer: "Repeater",
          explanation:
            "Repeater allows manual modification and resending of HTTP requests.",
          order: 4,
        },
        {
          question: "What should a secure application do when a required CSRF token is invalid?",
          questionType: QuestionType.MCQ,
          options: [
            "Accept the request",
            "Reject the request",
            "Ignore the token",
            "Create a new administrator",
          ],
          correctAnswer: "Reject the request",
          explanation:
            "Invalid or missing required CSRF tokens should cause the protected request to be rejected.",
          order: 5,
        },
        {
          question: "Which HTTP header identifies the origin of a request?",
          questionType: QuestionType.MCQ,
          options: ["Origin", "Content-Length", "Accept-Encoding", "Host"],
          correctAnswer: "Origin",
          explanation:
            "The Origin header identifies the origin that initiated a request in relevant contexts.",
          order: 6,
        },
        {
          question: "Which cookie setting restricts cross-site cookie transmission?",
          questionType: QuestionType.MCQ,
          options: ["SameSite", "Expires", "Path", "Comment"],
          correctAnswer: "SameSite",
          explanation:
            "SameSite controls cookie behavior in cross-site contexts.",
          order: 7,
        },
        {
          question: "Does a missing CSRF token always prove an application is vulnerable?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "Other protections, such as SameSite cookies or origin validation, may provide additional protection.",
          order: 8,
        },
        {
          question: "Which of the following can be useful during CSRF testing?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Inspecting session cookies",
            "Checking CSRF token validation",
            "Inspecting Origin headers",
            "Comparing normal and modified requests",
          ],
          correctAnswer: [
            "Inspecting session cookies",
            "Checking CSRF token validation",
            "Inspecting Origin headers",
            "Comparing normal and modified requests",
          ],
          explanation:
            "These activities help understand how an application protects state-changing requests.",
          order: 9,
        },
        {
          question: "Should CSRF testing be performed against systems without permission?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "Security testing must be performed only on systems where you have authorization.",
          order: 10,
        },
      ],
    },

    // ==========================================
    // LEVEL 3: ADVANCED CSRF AND MITIGATION
    // ==========================================
    {
      levelName: "Advanced CSRF and Mitigation",
      description:
        "Explore advanced CSRF scenarios, defense-in-depth strategies, framework protections, and secure implementation practices.",
      order: 3,

      learning: [
        {
          title: "Advanced CSRF Scenarios",
          order: 1,
          content: `
# Advanced CSRF Scenarios

CSRF vulnerabilities can become more complicated when applications use multiple authentication mechanisms, browser features, or request formats.

## 1. Login CSRF

Login CSRF occurs when an attacker causes a victim to log into an application using an account controlled by the attacker.

The victim may then unknowingly perform actions while using the attacker's account.

This can create privacy and account-confusion risks.

## 2. JSON-based requests

Some applications accept JSON request bodies.

Custom request headers and content-type restrictions can make certain cross-site requests harder to generate from a standard HTML form.

However, JSON endpoints still need appropriate authentication and request protections.

## 3. Multi-step operations

Some sensitive actions require multiple steps.

For example:

1. Start a password change.
2. Confirm the new password.
3. Complete the operation.

Every relevant state-changing step should enforce appropriate security controls.

## 4. Weak token validation

A token mechanism may exist but still be ineffective if:

- The token is not checked.
- Tokens are predictable.
- Tokens are not associated with the correct user.
- Missing tokens are accepted.

## 5. Defense in depth

Combine:

- CSRF tokens.
- SameSite cookies.
- Origin validation.
- Secure authentication design.
- Appropriate HTTP methods.

## Important

Advanced testing should examine the entire application workflow rather than focusing on one isolated request.
          `,
        },
        {
          title: "CSRF Protection in Modern Frameworks",
          order: 2,
          content: `
# CSRF Protection in Modern Frameworks

Modern backend frameworks often provide built-in CSRF protection mechanisms or middleware.

However, developers must configure and use them correctly.

## Express.js

Express itself does not automatically provide complete CSRF protection for every application.

Developers should use an appropriate maintained CSRF protection approach, configure session and cookie security, and validate sensitive requests.

## TypeORM

TypeORM is an ORM used to interact with databases.

It does not automatically protect an application against CSRF.

CSRF protection belongs in the application's HTTP request and authentication layer.

## React

React is a frontend library.

React does not automatically provide server-side CSRF protection.

The backend must validate requests.

## Token-based authentication

Some applications use bearer tokens in the Authorization header instead of cookies.

A token that is not automatically attached by the browser is generally less exposed to traditional CSRF.

However, storing authentication tokens in cookies can reintroduce CSRF considerations.

## Important distinction

Using React, Express, or TypeORM does not automatically make an application CSRF-safe.

The complete authentication and request-validation design matters.
          `,
        },
        {
          title: "Implementing CSRF Protection",
          order: 3,
          content: `
# Implementing CSRF Protection

Effective CSRF protection should be applied consistently to sensitive state-changing operations.

## 1. Use CSRF tokens

Generate unpredictable tokens and validate them on the server.

## 2. Configure SameSite cookies

Example cookie configuration:

\`\`\`ts
res.cookie("session", sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
});
\`\`\`

The appropriate SameSite value depends on application requirements.

## 3. Validate Origin

For sensitive requests, verify that the Origin header matches the expected trusted origin.

Handle missing or invalid Origin values according to a secure application policy.

## 4. Avoid state-changing GET requests

Use appropriate HTTP methods for operations that modify data.

## 5. Use reauthentication for critical actions

For sensitive operations such as changing account credentials, require additional confirmation or reauthentication where appropriate.

## 6. Secure session management

- Use HTTPS.
- Set HttpOnly and Secure cookie attributes.
- Rotate session identifiers after authentication.
- Expire sessions appropriately.
- Protect logout and account-management operations.

## Defense in depth

No single control should be considered sufficient for every application.

Use multiple protections based on the authentication architecture and risk.
          `,
        },
        {
          title: "CSRF Reporting and Remediation",
          order: 4,
          content: `
# CSRF Reporting and Remediation

A security report should demonstrate that an attacker can cause an authenticated user to perform an unintended state-changing action.

## 1. Report title

Example:

"Missing CSRF Protection on Account Email Update"

## 2. Affected endpoint

Document:

- URL.
- HTTP method.
- Affected parameters.
- Authentication requirements.

## 3. Vulnerability description

Explain how an unwanted request can be generated and why the application accepts it.

## 4. Reproduction steps

Include:

1. Log in using an authorized test account.
2. Capture the relevant state-changing request.
3. Identify the missing or ineffective protection.
4. Demonstrate the issue in a controlled test environment.
5. Verify the result using a harmless test action.

## 5. Impact

Explain what an attacker could cause a victim to do.

Do not exaggerate the impact. Base it on the actual permissions and behavior of the endpoint.

## 6. Remediation

Recommend:

- Server-side CSRF token validation.
- SameSite cookie configuration.
- Origin validation.
- Appropriate HTTP methods.
- Additional confirmation for critical operations.

## 7. Verify the fix

After remediation:

- Test requests with missing tokens.
- Test invalid tokens.
- Test tokens from another session.
- Verify legitimate requests still work.
- Check all related state-changing endpoints.

## Final principle

A complete security assessment includes discovery, evidence, impact analysis, remediation, and retesting.
          `,
        },
      ],

      questions: [
        {
          question: "What is Login CSRF?",
          questionType: QuestionType.MCQ,
          options: [
            "Forcing a victim to log into an attacker-controlled account",
            "Stealing a database backup",
            "Changing a browser's DNS settings",
            "Encrypting an authentication cookie",
          ],
          correctAnswer:
            "Forcing a victim to log into an attacker-controlled account",
          explanation:
            "Login CSRF causes a victim to authenticate into an account controlled by the attacker.",
          order: 1,
        },
        {
          question: "Does TypeORM automatically prevent CSRF?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "TypeORM handles database operations. CSRF protection must be implemented in the application's HTTP and authentication layers.",
          order: 2,
        },
        {
          question: "Does React alone provide server-side CSRF protection?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "React is a frontend library. The backend must validate protected requests.",
          order: 3,
        },
        {
          question: "Which controls can be combined for defense in depth?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "CSRF tokens",
            "SameSite cookies",
            "Origin validation",
            "Secure session management",
          ],
          correctAnswer: [
            "CSRF tokens",
            "SameSite cookies",
            "Origin validation",
            "Secure session management",
          ],
          explanation:
            "Combining multiple controls provides stronger protection against CSRF.",
          order: 4,
        },
        {
          question: "What should be used for critical account changes?",
          questionType: QuestionType.MCQ,
          options: [
            "No authentication",
            "Additional confirmation or reauthentication where appropriate",
            "Only a public URL",
            "A GET request without validation",
          ],
          correctAnswer:
            "Additional confirmation or reauthentication where appropriate",
          explanation:
            "Sensitive operations benefit from additional verification to reduce the impact of unauthorized actions.",
          order: 5,
        },
        {
          question: "Which cookie attributes are commonly useful for secure session cookies?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: ["HttpOnly", "Secure", "SameSite", "Public"],
          correctAnswer: ["HttpOnly", "Secure", "SameSite"],
          explanation:
            "HttpOnly, Secure, and SameSite provide important protections for session cookies.",
          order: 6,
        },
        {
          question: "Does using a bearer token in an Authorization header generally reduce traditional CSRF exposure?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "Browsers do not normally attach manually managed Authorization headers automatically to cross-site requests. Other security risks still need consideration.",
          order: 7,
        },
        {
          question: "What should happen after CSRF protection is implemented?",
          questionType: QuestionType.MCQ,
          options: [
            "No further testing is required",
            "Retest missing, invalid, and cross-session tokens",
            "Disable all authentication",
            "Remove all cookies",
          ],
          correctAnswer:
            "Retest missing, invalid, and cross-session tokens",
          explanation:
            "Retesting verifies that the protection works and legitimate application functionality remains available.",
          order: 8,
        },
        {
          question: "Should every state-changing endpoint be reviewed for CSRF protection?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "CSRF protection should be applied consistently to all relevant state-changing operations.",
          order: 9,
        },
        {
          question: "What is the most important part of a useful CSRF report?",
          questionType: QuestionType.MCQ,
          options: [
            "A clear, reproducible demonstration and realistic impact",
            "A large number of screenshots",
            "The attacker's personal information",
            "Unrelated server logs",
          ],
          correctAnswer:
            "A clear, reproducible demonstration and realistic impact",
          explanation:
            "A useful report demonstrates the vulnerability, explains its actual impact, and provides remediation guidance.",
          order: 10,
        },
      ],
    },
  ],
};

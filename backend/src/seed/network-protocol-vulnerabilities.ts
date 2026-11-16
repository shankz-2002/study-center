
import { QuestionType } from "../types/question.js";

export const networkProtocolVulnerabilitiesData = {
  fieldName: "Cybersecurity",
  fieldDescription:
    "Learn cybersecurity concepts, vulnerabilities, tools, and practical security testing.",
  categoryName: "Network Security",
  categoryDescription:
    "Learn networking, scanning, protocol vulnerabilities, network attacks, and defensive security.",
  topicName: "Network Protocol Vulnerabilities",
  topicDescription:
    "Understand common weaknesses in network protocols, attack techniques, their security impact, and defensive measures.",

  levels: [
    {
      levelName: "Network Protocol Security Fundamentals",
      description:
        "Understand protocol security, insecure communication, encryption, authentication, and common network weaknesses.",
      order: 1,
      learning: [
        {
          title: "Introduction to Network Protocol Vulnerabilities",
          order: 1,
          content: `
# Introduction to Network Protocol Vulnerabilities

Network protocols define how devices communicate and exchange information.

Examples include:
- HTTP
- DNS
- TCP
- UDP
- ARP
- FTP
- SMTP
- SSH

A protocol vulnerability occurs when a protocol's design, implementation, or configuration creates a security weakness.

## Common causes

- Lack of encryption.
- Weak authentication.
- Missing integrity protection.
- Insecure default configurations.
- Poor input validation.
- Trust in unauthenticated network messages.

## Examples

### 1. Unencrypted communication

Traditional FTP can transmit credentials and data without encryption.

### 2. ARP spoofing

An attacker on a local network may send forged ARP messages to associate an IP address with an incorrect MAC address.

### 3. DNS spoofing

An attacker may manipulate DNS responses to direct users toward an unintended destination.

### 4. Protocol downgrade

An attacker may attempt to force communication to use a weaker protocol or cryptographic configuration.

## Why protocol security matters

Weak network protocols can expose credentials, enable traffic interception, disrupt communication, or help attackers gain access to systems.

Security professionals should understand how protocols work and how to configure them securely.
          `,
        },
        {
          title: "Encryption and Secure Communication",
          order: 2,
          content: `
# Encryption and Secure Communication

Encryption protects information by transforming readable data into ciphertext using cryptographic algorithms and keys.

It is an important component of secure network communication.

## Why encryption is needed

Without appropriate protection, network traffic may expose:

- Usernames.
- Passwords.
- Session information.
- Personal information.
- Confidential business data.

## HTTP versus HTTPS

### HTTP

HTTP transfers application data without providing transport encryption by itself.

### HTTPS

HTTPS uses HTTP over TLS to protect communication.

TLS provides:

- Confidentiality.
- Integrity protection.
- Server authentication through certificates.

## What is TLS?

Transport Layer Security is a cryptographic protocol used to protect communication between applications.

A TLS handshake commonly involves:

1. Negotiating protocol and cryptographic parameters.
2. Authenticating the server using its certificate.
3. Establishing shared session keys.
4. Protecting application data.

## Symmetric encryption

The same secret key is used to encrypt and decrypt data.

Example: AES.

## Asymmetric cryptography

Uses a public and private key pair.

Examples include RSA and elliptic-curve cryptography.

## Important distinction

Encryption alone does not guarantee that a system is secure.

Applications must also implement proper authentication, certificate validation, authorization, and secure key management.
          `,
        },
        {
          title: "Authentication and Integrity in Network Protocols",
          order: 3,
          content: `
# Authentication and Integrity in Network Protocols

Secure communication needs more than confidentiality.

It should also establish who is communicating and protect data from unauthorized modification.

## Authentication

Authentication verifies the identity of a user, device, or service.

Examples include:
- Password authentication.
- Public-key authentication.
- Certificate-based authentication.
- Multi-factor authentication.

## Integrity

Integrity helps detect unauthorized modification of data.

Cryptographic hashes and message authentication codes are common mechanisms.

## Hash functions

A cryptographic hash function produces a fixed-length output from input data.

Example:

\`\`\`bash
sha256sum file.txt
\`\`\`

SHA-256 is a cryptographic hash function.

However, a plain hash does not authenticate the sender because anyone can calculate it.

## Message Authentication Code

A MAC uses a secret key to authenticate data and verify integrity.

HMAC is a widely used construction.

## Digital signatures

Digital signatures use asymmetric cryptography to provide authenticity and integrity verification.

## Common weaknesses

- Weak passwords.
- Missing certificate validation.
- Reused credentials.
- Poor key management.
- Insecure authentication protocols.
- Missing integrity checks.

## Security practices

- Use strong authentication.
- Validate certificates.
- Use secure cryptographic algorithms.
- Protect private keys.
- Avoid transmitting credentials over unencrypted channels.
          `,
        },
        {
          title: "Legacy and Insecure Network Protocols",
          order: 4,
          content: `
# Legacy and Insecure Network Protocols

Some older network protocols were designed when security was not a major design priority.

Using them without additional protection can expose sensitive information.

## 1. Telnet

Telnet provides remote terminal access.

Traditional Telnet communication does not encrypt traffic.

An observer with access to the traffic may capture credentials and commands.

Secure alternative: SSH.

## 2. FTP

Traditional FTP transfers data and authentication information without encryption.

Secure alternatives include:
- SFTP.
- FTPS.

Note that SFTP is a file-transfer protocol over SSH, while FTPS uses FTP with TLS.

## 3. HTTP

HTTP does not provide encryption by itself.

Secure alternative: HTTPS.

## 4. SNMPv1 and SNMPv2c

These versions commonly use community strings that are transmitted without cryptographic protection.

Secure alternative: SNMPv3 with appropriate authentication and privacy configuration.

## 5. POP3 and IMAP without TLS

Email protocols without TLS may expose authentication and message data.

Use secure configurations such as IMAPS or POP3S, or appropriate STARTTLS configurations.

## Defensive recommendations

- Replace insecure protocols where possible.
- Disable unnecessary legacy services.
- Use encrypted alternatives.
- Restrict access through firewalls.
- Monitor network traffic.
- Review device configurations regularly.
          `,
        },
      ],
      questions: [
        {
          question: "What can cause a network protocol vulnerability?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Lack of encryption",
            "Weak authentication",
            "Insecure default configuration",
            "Missing integrity protection",
          ],
          correctAnswer: [
            "Lack of encryption",
            "Weak authentication",
            "Insecure default configuration",
            "Missing integrity protection",
          ],
          explanation:
            "All these weaknesses can expose network communication to attacks.",
          order: 1,
        },
        {
          question: "Which protocol is commonly used to secure HTTP communication?",
          questionType: QuestionType.MCQ,
          options: ["FTP", "TLS", "ARP", "Telnet"],
          correctAnswer: "TLS",
          explanation:
            "HTTPS uses TLS to protect HTTP communication.",
          order: 2,
        },
        {
          question: "What is the primary purpose of encryption?",
          questionType: QuestionType.MCQ,
          options: [
            "Protect data confidentiality",
            "Assign IP addresses",
            "Discover open ports",
            "Route network packets",
          ],
          correctAnswer: "Protect data confidentiality",
          explanation:
            "Encryption helps prevent unauthorized parties from reading protected information.",
          order: 3,
        },
        {
          question: "Which protocol is a secure alternative to Telnet?",
          questionType: QuestionType.MCQ,
          options: ["FTP", "SSH", "HTTP", "ARP"],
          correctAnswer: "SSH",
          explanation:
            "SSH provides encrypted remote access, unlike traditional Telnet.",
          order: 4,
        },
        {
          question: "Which protocol provides encrypted file transfer over SSH?",
          questionType: QuestionType.MCQ,
          options: ["SFTP", "TFTP", "HTTP", "SMTP"],
          correctAnswer: "SFTP",
          explanation:
            "SFTP is a file-transfer protocol that operates over SSH.",
          order: 5,
        },
        {
          question: "Which TLS security properties help protect network communication?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Confidentiality",
            "Integrity",
            "Server authentication",
            "Automatic vulnerability removal",
          ],
          correctAnswer: [
            "Confidentiality",
            "Integrity",
            "Server authentication",
          ],
          explanation:
            "TLS provides confidentiality and integrity and can authenticate servers through certificates.",
          order: 6,
        },
        {
          question: "What does a cryptographic hash function produce?",
          questionType: QuestionType.MCQ,
          options: [
            "A fixed-length digest",
            "A network route",
            "An IP address",
            "A TCP connection",
          ],
          correctAnswer: "A fixed-length digest",
          explanation:
            "A cryptographic hash function produces a fixed-length digest from input data.",
          order: 7,
        },
        {
          question: "Does a plain SHA-256 hash by itself authenticate the sender?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "Anyone can calculate a plain hash. Authentication requires an additional mechanism such as HMAC or a digital signature.",
          order: 8,
        },
        {
          question: "Which SNMP version supports authentication and privacy mechanisms?",
          questionType: QuestionType.MCQ,
          options: ["SNMPv1", "SNMPv2c", "SNMPv3", "SNMPv0"],
          correctAnswer: "SNMPv3",
          explanation:
            "SNMPv3 supports security features including authentication and privacy when configured appropriately.",
          order: 9,
        },
        {
          question: "What is a major security weakness of traditional Telnet?",
          questionType: QuestionType.MCQ,
          options: [
            "It does not encrypt communication",
            "It cannot use IP addresses",
            "It only works over UDP",
            "It automatically blocks connections",
          ],
          correctAnswer: "It does not encrypt communication",
          explanation:
            "Traditional Telnet transmits data without encryption, exposing credentials and commands.",
          order: 10,
        },
      ],
    },

    {
      levelName: "Common Network Protocol Attacks",
      description:
        "Understand ARP spoofing, DNS attacks, TCP-related attacks, replay attacks, and network traffic manipulation.",
      order: 2,
      learning: [
        {
          title: "ARP Spoofing and ARP Poisoning",
          order: 1,
          content: `
# ARP Spoofing and ARP Poisoning

ARP is used in IPv4 local networks to discover the MAC address associated with a local IP address.

ARP does not provide strong authentication for its messages.

This creates an opportunity for ARP spoofing.

## What is ARP spoofing?

ARP spoofing occurs when an attacker sends forged ARP messages to associate an IP address with an incorrect MAC address.

## Example

Imagine a local network containing:

- Gateway: 192.168.1.1
- Victim: 192.168.1.10
- Attacker: 192.168.1.20

An attacker may attempt to convince the victim that the attacker's MAC address belongs to the gateway.

The attacker may also attempt to manipulate the gateway's ARP information.

## Potential impact

- Traffic interception.
- Man-in-the-middle attacks.
- Session exposure when other protections are absent.
- Network disruption.

## Detection indicators

- Unexpected changes in IP-to-MAC mappings.
- Duplicate IP address warnings.
- Unusual ARP activity.
- Network monitoring alerts.

## Defensive measures

- Dynamic ARP Inspection.
- DHCP snooping where appropriate.
- Static ARP entries for selected critical systems.
- Network segmentation.
- Monitoring ARP behavior.

## Important

ARP spoofing is generally a local network attack. HTTPS and other properly implemented encryption mechanisms can still protect application content even when traffic is intercepted.
          `,
        },
        {
          title: "DNS Spoofing and DNS Cache Poisoning",
          order: 2,
          content: `
# DNS Spoofing and DNS Cache Poisoning

DNS translates domain names into network information, including IP addresses.

If DNS responses are manipulated, users may be directed to unintended destinations.

## DNS spoofing

DNS spoofing involves providing false DNS information to influence name resolution.

For example, a user attempting to visit a legitimate website may receive an attacker-controlled IP address.

## DNS cache poisoning

DNS cache poisoning occurs when false DNS information is inserted into a DNS resolver's cache.

Other users relying on that resolver may receive incorrect responses.

## Potential impact

- Redirecting users to malicious websites.
- Phishing.
- Credential theft.
- Service disruption.
- Traffic interception.

## DNS security mechanisms

### DNSSEC

DNS Security Extensions provide cryptographic authentication of DNS data through digital signatures.

DNSSEC helps validate that DNS data originates from the appropriate authoritative source and has not been modified.

It does not encrypt DNS queries.

### Encrypted DNS transport

DNS over HTTPS (DoH) and DNS over TLS (DoT) protect DNS communication between a client and its resolver.

These mechanisms address transport privacy but do not replace DNSSEC.

## Defensive measures

- Use trusted DNS resolvers.
- Enable DNSSEC validation where appropriate.
- Secure DNS server configurations.
- Monitor unexpected DNS changes.
- Protect registrar and DNS administration accounts.
          `,
        },
        {
          title: "TCP Attacks and Connection Abuse",
          order: 3,
          content: `
# TCP Attacks and Connection Abuse

TCP is widely used for reliable communication.

Some attacks exploit weaknesses in connection handling or consume resources.

## 1. SYN flood

A SYN flood sends a large number of TCP SYN requests to consume connection-handling resources.

A server may allocate resources while waiting for connections to complete.

## 2. TCP session hijacking

Session hijacking involves taking over or interfering with an existing communication session.

Depending on the application, an attacker may attempt to exploit weak session management or predictability.

## 3. TCP reset injection

An attacker may attempt to inject forged TCP reset packets to disrupt an existing connection.

## 4. Port scanning

Port scanning is not inherently malicious. However, unauthorized scanning can be used during reconnaissance to identify exposed services.

## Defensive measures

- SYN cookies.
- Connection rate limiting.
- Stateful firewall rules.
- Network monitoring.
- Secure application session management.
- Encryption and authentication.
- Appropriate operating system updates.

## Important

Application-layer protections are still necessary. Network-level defenses cannot compensate for weak session management or insecure application authentication.
          `,
        },
        {
          title: "Replay Attacks and Man-in-the-Middle Concepts",
          order: 4,
          content: `
# Replay Attacks and Man-in-the-Middle Concepts

Two important categories of network attacks are replay attacks and man-in-the-middle attacks.

## Replay attack

A replay attack occurs when an attacker captures a valid communication message and retransmits it later.

The attacker attempts to make the receiving system accept the old message again.

### Example

Suppose an application accepts a sensitive request without checking whether it has already been processed.

An attacker who captures the request may attempt to submit it again.

## Replay attack prevention

Common protections include:

- Nonces.
- Timestamps.
- Sequence numbers.
- Short-lived tokens.
- One-time transaction identifiers.
- Server-side replay detection.

## Man-in-the-middle attack

A man-in-the-middle (MITM) attack occurs when an attacker positions themselves between communicating parties and attempts to intercept or manipulate communication.

## Potential impact

- Information disclosure.
- Credential theft.
- Message modification.
- Session manipulation.
- Communication disruption.

## Common conditions

- Untrusted networks.
- Weak certificate validation.
- Insecure wireless configurations.
- Lack of encryption.
- ARP or DNS manipulation.

## Defensive measures

- Use HTTPS with proper certificate validation.
- Use secure Wi-Fi configurations.
- Avoid insecure protocols.
- Validate identities.
- Use strong cryptographic protocols.
- Keep devices updated.

## Important

Using encryption without validating the server's identity may still leave users vulnerable to certain interception attacks.
          `,
        },
      ],
      questions: [
        {
          question: "What does ARP spoofing attempt to manipulate?",
          questionType: QuestionType.MCQ,
          options: [
            "IP-to-MAC address mappings",
            "DNS domain ownership",
            "TCP port ranges",
            "TLS certificates",
          ],
          correctAnswer: "IP-to-MAC address mappings",
          explanation:
            "ARP spoofing sends forged ARP information to associate IP addresses with incorrect MAC addresses.",
          order: 1,
        },
        {
          question: "Which attack attempts to insert false DNS information into a resolver cache?",
          questionType: QuestionType.MCQ,
          options: [
            "SYN flood",
            "DNS cache poisoning",
            "ARP discovery",
            "Port scanning",
          ],
          correctAnswer: "DNS cache poisoning",
          explanation:
            "DNS cache poisoning manipulates cached DNS information to influence future name resolution.",
          order: 2,
        },
        {
          question: "What is the purpose of DNSSEC?",
          questionType: QuestionType.MCQ,
          options: [
            "Authenticate DNS data using cryptographic signatures",
            "Encrypt all DNS queries",
            "Replace IP addresses",
            "Prevent all phishing attacks",
          ],
          correctAnswer:
            "Authenticate DNS data using cryptographic signatures",
          explanation:
            "DNSSEC provides authentication and integrity validation for DNS data, but does not encrypt queries.",
          order: 3,
        },
        {
          question: "What is a SYN flood?",
          questionType: QuestionType.MCQ,
          options: [
            "An attack that attempts to exhaust connection-handling resources using TCP SYN requests",
            "A DNS record modification",
            "A method for encrypting traffic",
            "A technique for assigning IP addresses",
          ],
          correctAnswer:
            "An attack that attempts to exhaust connection-handling resources using TCP SYN requests",
          explanation:
            "SYN floods exploit TCP connection handling to consume server resources.",
          order: 4,
        },
        {
          question: "Which technique can help defend against SYN floods?",
          questionType: QuestionType.MCQ,
          options: [
            "SYN cookies",
            "Plain FTP",
            "Disabling TLS",
            "ARP broadcasting",
          ],
          correctAnswer: "SYN cookies",
          explanation:
            "SYN cookies help reduce resource consumption during certain TCP SYN flood conditions.",
          order: 5,
        },
        {
          question: "What is a replay attack?",
          questionType: QuestionType.MCQ,
          options: [
            "Capturing and retransmitting a previously valid message",
            "Scanning every TCP port",
            "Changing a MAC address permanently",
            "Encrypting a DNS response",
          ],
          correctAnswer:
            "Capturing and retransmitting a previously valid message",
          explanation:
            "Replay attacks reuse previously captured valid messages to attempt unauthorized actions.",
          order: 6,
        },
        {
          question: "Which mechanisms can help prevent replay attacks?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Nonces",
            "Timestamps",
            "Sequence numbers",
            "One-time transaction identifiers",
          ],
          correctAnswer: [
            "Nonces",
            "Timestamps",
            "Sequence numbers",
            "One-time transaction identifiers",
          ],
          explanation:
            "These mechanisms help systems distinguish fresh messages from previously used messages.",
          order: 7,
        },
        {
          question: "What is a man-in-the-middle attack?",
          questionType: QuestionType.MCQ,
          options: [
            "An attacker intercepts or manipulates communication between parties",
            "A server automatically updates its software",
            "A client requests a DNS record",
            "A firewall blocks all traffic",
          ],
          correctAnswer:
            "An attacker intercepts or manipulates communication between parties",
          explanation:
            "MITM attacks involve an attacker positioning themselves in a communication path.",
          order: 8,
        },
        {
          question: "Do DoH and DoT encrypt DNS communication between a client and its resolver?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "DNS over HTTPS and DNS over TLS protect DNS transport between the client and resolver.",
          order: 9,
        },
        {
          question: "Does HTTPS with proper certificate validation help protect against MITM attacks?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "HTTPS with correct certificate validation provides authenticated, encrypted communication and helps prevent interception.",
          order: 10,
        },
      ],
    },

    {
      levelName: "Protocol Security Testing and Mitigation",
      description:
        "Learn how to assess network protocol security, identify insecure configurations, validate findings, and recommend mitigations.",
      order: 3,
      learning: [
        {
          title: "Identifying Insecure Network Services",
          order: 1,
          content: `
# Identifying Insecure Network Services

Security assessments often begin by identifying exposed network services and reviewing their configurations.

## Step 1: Discover exposed services

Use an authorized Nmap scan:

\`\`\`bash
nmap -sV 192.168.1.10
\`\`\`

## Step 2: Identify potentially insecure protocols

Look for services such as:
- Telnet.
- Traditional FTP.
- Unencrypted HTTP.
- Insecure SNMP configurations.
- Legacy email services without transport protection.

## Step 3: Review configuration

Check:
- Whether encryption is enabled.
- Whether authentication is required.
- Whether anonymous access is permitted.
- Whether access is restricted.
- Whether software is supported and updated.

## Step 4: Validate the finding

Confirm that the service is actually exposed and that the configuration creates a security risk.

## Step 5: Document evidence

Record service details, configuration observations, and relevant evidence.

## Important

Do not assume that a service is vulnerable only because it uses a familiar port number. Validate the actual service and configuration.
          `,
        },
        {
          title: "Testing DNS and TLS Security",
          order: 2,
          content: `
# Testing DNS and TLS Security

DNS and TLS are essential parts of modern network communication.

Misconfigurations can weaken confidentiality, authentication, and integrity.

## DNS testing

Review DNS records using:

\`\`\`bash
dig example.com
\`\`\`

Inspect common record types:

\`\`\`bash
dig example.com A
dig example.com MX
dig example.com NS
\`\`\`

Review:
- Unexpected records.
- Incorrect DNS configurations.
- Unnecessary information disclosure.
- DNSSEC validation status where relevant.

## TLS testing

Use OpenSSL to inspect a TLS server connection:

\`\`\`bash
openssl s_client -connect example.com:443 -servername example.com
\`\`\`

This can display certificate and handshake information.

## Review certificate details

Check:
- Certificate validity dates.
- Subject and Subject Alternative Names.
- Issuer.
- Certificate chain.
- Hostname matching.

## Common TLS configuration weaknesses

- Expired certificates.
- Weak or obsolete protocol versions.
- Weak cipher configurations.
- Missing certificate validation in clients.
- Incorrect certificate chain configuration.

## Important

A successful TLS connection does not automatically prove that every aspect of the configuration is secure. Further validation may be necessary.
          `,
        },
        {
          title: "Network Monitoring and Detection",
          order: 3,
          content: `
# Network Monitoring and Detection

Network monitoring helps identify suspicious activity, misconfigurations, and potential attacks.

## What should be monitored?

- Unexpected connections.
- Unusual DNS requests.
- Repeated failed connection attempts.
- Unexpected ARP changes.
- Unusual traffic volume.
- Access to restricted services.

## Useful tools

### Wireshark

Used to capture and inspect network packets.

### tcpdump

A command-line packet capture tool.

Example:

\`\`\`bash
sudo tcpdump -i eth0
\`\`\`

### Zeek

A network security monitoring framework that generates structured logs about network activity.

### Suricata

A network threat detection engine that supports intrusion detection and prevention capabilities.

## Monitoring strategies

- Establish normal network traffic baselines.
- Alert on unusual patterns.
- Centralize logs.
- Review security alerts.
- Investigate suspicious activity.
- Maintain appropriate retention policies.

## Security relevance

Monitoring can help detect attacks that are not immediately visible through basic port scanning.
          `,
        },
        {
          title: "Remediation and Responsible Reporting",
          order: 4,
          content: `
# Remediation and Responsible Reporting

Identifying a protocol weakness is only one part of security testing.

A complete assessment should explain the risk and provide practical remediation guidance.

## Common remediation techniques

| Weakness | Recommended action |
|---|---|
| Telnet enabled | Replace with SSH |
| Traditional FTP | Use SFTP or FTPS |
| HTTP for sensitive data | Use HTTPS |
| Insecure SNMP | Configure SNMPv3 |
| Weak TLS configuration | Use supported TLS versions and strong cipher suites |
| Exposed database port | Restrict access using firewall rules |
| ARP spoofing risk | Use appropriate Layer 2 protections |
| DNS manipulation risk | Implement DNSSEC validation where appropriate |

## Risk assessment

Consider:
- Exposure.
- Attack complexity.
- Required privileges.
- Potential confidentiality impact.
- Potential integrity impact.
- Potential availability impact.

## Writing a useful report

A report should include:

1. Vulnerability title.
2. Affected system.
3. Description.
4. Evidence.
5. Security impact.
6. Severity and justification.
7. Recommended remediation.

## Example

Title: Insecure Remote Administration Protocol Enabled

Observation: A system exposes Telnet for remote administration.

Impact: Credentials and session data may be exposed to network observers.

Recommendation: Disable Telnet and migrate remote administration to SSH with strong authentication.

## Responsible disclosure

Test only within authorized scope. Avoid accessing private data or disrupting systems, and report findings through the approved channel.
          `,
        },
      ],
      questions: [
        {
          question: "Which command can identify service versions on an authorized target?",
          questionType: QuestionType.MCQ,
          options: [
            "nmap -sV 192.168.1.10",
            "git status",
            "mkdir test",
            "ipconfig /delete",
          ],
          correctAnswer: "nmap -sV 192.168.1.10",
          explanation:
            "Nmap's -sV option attempts service and version detection.",
          order: 1,
        },
        {
          question: "Which command can inspect a TLS connection?",
          questionType: QuestionType.MCQ,
          options: [
            "openssl s_client -connect example.com:443 -servername example.com",
            "mkdir example.com",
            "git clone example.com",
            "ping --encrypt example.com",
          ],
          correctAnswer:
            "openssl s_client -connect example.com:443 -servername example.com",
          explanation:
            "OpenSSL s_client can establish and display information about a TLS connection.",
          order: 2,
        },
        {
          question: "Which information should be checked when reviewing a TLS certificate?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Validity dates",
            "Hostname matching",
            "Certificate chain",
            "Issuer",
          ],
          correctAnswer: [
            "Validity dates",
            "Hostname matching",
            "Certificate chain",
            "Issuer",
          ],
          explanation:
            "These certificate properties help determine whether a certificate is valid and appropriately issued.",
          order: 3,
        },
        {
          question: "Which tool is commonly used for command-line packet capture?",
          questionType: QuestionType.MCQ,
          options: ["tcpdump", "Photoshop", "npm", "Postman"],
          correctAnswer: "tcpdump",
          explanation:
            "tcpdump is a command-line tool for capturing and analyzing network traffic.",
          order: 4,
        },
        {
          question: "Which tool is a network security monitoring framework?",
          questionType: QuestionType.MCQ,
          options: ["Zeek", "Excel", "GitHub", "Figma"],
          correctAnswer: "Zeek",
          explanation:
            "Zeek analyzes network traffic and generates structured security-relevant logs.",
          order: 5,
        },
        {
          question: "Which protocol is a suitable replacement for traditional Telnet?",
          questionType: QuestionType.MCQ,
          options: ["SSH", "HTTP", "ARP", "TFTP"],
          correctAnswer: "SSH",
          explanation:
            "SSH provides encrypted remote administration and is the preferred alternative to Telnet.",
          order: 6,
        },
        {
          question: "What should be considered when assessing vulnerability risk?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Exposure",
            "Attack complexity",
            "Potential impact",
            "Required privileges",
          ],
          correctAnswer: [
            "Exposure",
            "Attack complexity",
            "Potential impact",
            "Required privileges",
          ],
          explanation:
            "These factors help determine the likelihood and impact of a vulnerability.",
          order: 7,
        },
        {
          question: "Does network monitoring help identify suspicious traffic patterns?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "Network monitoring helps identify unusual connections, traffic patterns, and potential attacks.",
          order: 8,
        },
        {
          question: "What should be done before testing a third-party network?",
          questionType: QuestionType.MCQ,
          options: [
            "Obtain explicit authorization and confirm scope",
            "Scan every public IP address",
            "Disable the target firewall",
            "Attempt unrestricted access",
          ],
          correctAnswer:
            "Obtain explicit authorization and confirm scope",
          explanation:
            "Third-party testing requires permission and clearly defined scope.",
          order: 9,
        },
        {
          question: "Should a security report include remediation recommendations?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "A useful security report explains how the identified weakness can be addressed.",
          order: 10,
        },
      ],
    },
  ],
};

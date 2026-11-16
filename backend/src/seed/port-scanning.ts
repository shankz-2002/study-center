
import { QuestionType } from "../types/question.js";

export const portScanningData = {
  fieldName: "Cybersecurity",
  fieldDescription:
    "Learn cybersecurity concepts, vulnerabilities, tools, and practical security testing.",
  categoryName: "Network Security",
  categoryDescription:
    "Learn networking, scanning, enumeration, network attacks, and defensive security.",
  topicName: "Port Scanning and Enumeration",
  topicDescription:
    "Learn how to discover network hosts, identify open ports, detect running services, and enumerate network information using authorized security testing techniques.",

  levels: [
    {
      levelName: "Port Scanning Fundamentals",
      description:
        "Understand ports, scanning concepts, host discovery, and the basics of network reconnaissance.",
      order: 1,
      learning: [
        {
          title: "Introduction to Port Scanning",
          order: 1,
          content: `
# Introduction to Port Scanning

Port scanning is a technique used to identify accessible network ports on a target system.

A port represents a communication endpoint associated with a network service.

For example:
- Port 22 is commonly used by SSH.
- Port 80 is commonly used by HTTP.
- Port 443 is commonly used by HTTPS.
- Port 3306 is commonly used by MySQL.

## Why is port scanning useful?

Security professionals use port scanning to:

- Discover exposed services.
- Identify unnecessary open ports.
- Understand network attack surfaces.
- Verify firewall configurations.
- Prepare for vulnerability assessments.

## What is an open port?

A port is considered open when a service is listening and accepting connections or responding in a way that indicates the port is accessible.

## Port states

Common scanning results include:

- Open: A service is listening.
- Closed: The host is reachable, but no service is listening.
- Filtered: A firewall or network control prevents the scanner from determining the state.
- Unfiltered: The port is accessible, but its open or closed state is not determined by that scan method.

## Important

An open port does not automatically mean a vulnerability exists. The service, version, configuration, and exposure must be assessed.

Only scan systems you own or have explicit permission to test.
          `,
        },
        {
          title: "Types of Ports and Services",
          order: 2,
          content: `
# Types of Ports and Services

TCP and UDP use port numbers to identify application communication endpoints.

Port numbers range from 0 to 65535.

## Port number ranges

| Range | Classification |
|---|---|
| 0–1023 | Well-known ports |
| 1024–49151 | Registered ports |
| 49152–65535 | Dynamic/private ports |

## Common services

| Port | Service | Protocol |
|---|---|---|
| 21 | FTP | TCP |
| 22 | SSH | TCP |
| 23 | Telnet | TCP |
| 25 | SMTP | TCP |
| 53 | DNS | TCP/UDP |
| 80 | HTTP | TCP |
| 110 | POP3 | TCP |
| 139 | NetBIOS | TCP |
| 443 | HTTPS | TCP |
| 445 | SMB | TCP |
| 3306 | MySQL | TCP |
| 3389 | RDP | TCP |
| 5432 | PostgreSQL | TCP |

## Why do services matter?

An exposed service can increase a system's attack surface.

For example:

- An outdated web server may contain known vulnerabilities.
- An exposed database may have weak authentication.
- An unnecessary remote administration service may increase risk.

## Service identification

A port number alone does not prove which service is running.

Services can be configured to use non-standard ports. Security testers should verify service identity rather than relying only on common port assignments.
          `,
        },
        {
          title: "Host Discovery and Network Reconnaissance",
          order: 3,
          content: `
# Host Discovery and Network Reconnaissance

Before scanning individual ports, a tester may need to identify which hosts are reachable within an authorized network.

This process is called host discovery.

## What is a host?

A host is a device connected to a network.

Examples include:
- Servers.
- Workstations.
- Routers.
- Printers.
- Network appliances.

## Host discovery methods

### 1. ICMP discovery

ICMP echo requests are commonly associated with ping.

A response may indicate that a host is reachable.

However, some systems block ICMP traffic, so no response does not necessarily mean the host is offline.

### 2. ARP discovery

On a local IPv4 network, ARP requests can help identify active devices.

### 3. TCP-based discovery

A scanner may send TCP probes to selected ports and examine responses.

### 4. UDP-based discovery

UDP probes may be used to identify reachable services or hosts, although responses can be limited.

## Network reconnaissance

Reconnaissance involves gathering information about a target environment.

It may include:
- Identifying IP ranges.
- Discovering active hosts.
- Identifying network devices.
- Understanding exposed services.
- Mapping network architecture.

## Security relevance

Host discovery helps administrators maintain asset inventories and helps authorized testers understand which systems are exposed.

Always respect the agreed testing scope.
          `,
        },
        {
          title: "Introduction to Nmap",
          order: 4,
          content: `
# Introduction to Nmap

Nmap (Network Mapper) is a widely used tool for network discovery and security auditing.

It can identify hosts, scan ports, detect services, and gather additional network information.

## Checking installation

Run:

\`\`\`bash
nmap --version
\`\`\`

## Scanning a single authorized host

\`\`\`bash
nmap 192.168.1.10
\`\`\`

This performs a default scan against the target.

## Scanning multiple hosts

\`\`\`bash
nmap 192.168.1.10 192.168.1.20
\`\`\`

## Scanning a network range

\`\`\`bash
nmap 192.168.1.0/24
\`\`\`

Use this only on a network you own or are authorized to assess.

## Scanning selected ports

\`\`\`bash
nmap -p 22,80,443 192.168.1.10
\`\`\`

## Scanning all TCP ports

\`\`\`bash
nmap -p- 192.168.1.10
\`\`\`

## Saving scan results

\`\`\`bash
nmap -oN scan-results.txt 192.168.1.10
\`\`\`

## Understanding the output

Nmap commonly displays:
- Port number.
- Protocol.
- Port state.
- Service name.

## Important

Scanning can generate network traffic and may trigger security monitoring systems. Use appropriate authorization and testing limits.
          `,
        },
      ],
      questions: [
        {
          question: "What is the primary purpose of port scanning?",
          questionType: QuestionType.MCQ,
          options: [
            "To identify accessible ports and services",
            "To recover deleted files",
            "To encrypt network traffic",
            "To create user accounts",
          ],
          correctAnswer: "To identify accessible ports and services",
          explanation:
            "Port scanning helps identify accessible network ports and potentially exposed services.",
          order: 1,
        },
        {
          question: "What does an open port generally indicate?",
          questionType: QuestionType.MCQ,
          options: [
            "A service is listening",
            "The computer is powered off",
            "The port is always vulnerable",
            "The firewall is disabled",
          ],
          correctAnswer: "A service is listening",
          explanation:
            "An open port generally indicates that a service is accepting or responding to connections.",
          order: 2,
        },
        {
          question: "Which port is commonly associated with SSH?",
          questionType: QuestionType.MCQ,
          options: ["21", "22", "80", "443"],
          correctAnswer: "22",
          explanation: "SSH commonly uses TCP port 22.",
          order: 3,
        },
        {
          question: "Which tool is widely used for network port scanning?",
          questionType: QuestionType.MCQ,
          options: ["Nmap", "Git", "Postman", "Figma"],
          correctAnswer: "Nmap",
          explanation:
            "Nmap is a network discovery and security auditing tool.",
          order: 4,
        },
        {
          question: "Which Nmap option selects specific ports?",
          questionType: QuestionType.MCQ,
          options: ["-sV", "-p", "-O", "-oN"],
          correctAnswer: "-p",
          explanation:
            "The -p option specifies which ports Nmap should scan.",
          order: 5,
        },
        {
          question: "What does a filtered port state generally mean?",
          questionType: QuestionType.MCQ,
          options: [
            "The port is definitely open",
            "The port is definitely closed",
            "A network control prevents determining its state",
            "The service is outdated",
          ],
          correctAnswer:
            "A network control prevents determining its state",
          explanation:
            "Filtering may prevent the scanner from determining whether a port is open or closed.",
          order: 6,
        },
        {
          question: "Which port range contains well-known ports?",
          questionType: QuestionType.MCQ,
          options: [
            "0–1023",
            "1024–49151",
            "49152–65535",
            "10000–20000",
          ],
          correctAnswer: "0–1023",
          explanation:
            "Ports 0 through 1023 are classified as well-known ports.",
          order: 7,
        },
        {
          question: "Which methods can be used for host discovery?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "ICMP probes",
            "ARP discovery",
            "TCP probes",
            "UDP probes",
          ],
          correctAnswer: [
            "ICMP probes",
            "ARP discovery",
            "TCP probes",
            "UDP probes",
          ],
          explanation:
            "All these methods can help discover hosts, depending on the network and scan conditions.",
          order: 8,
        },
        {
          question: "Which command checks the installed Nmap version?",
          questionType: QuestionType.MCQ,
          options: [
            "nmap --version",
            "nmap --delete",
            "nmap --install",
            "nmap --remove",
          ],
          correctAnswer: "nmap --version",
          explanation:
            "The --version option displays the installed Nmap version.",
          order: 9,
        },
        {
          question: "Does an open port automatically indicate a security vulnerability?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "An open port is an exposed service endpoint. Its security depends on the service and its configuration.",
          order: 10,
        },
      ],
    },

    {
      levelName: "Nmap Scanning and Service Detection",
      description:
        "Learn TCP scanning techniques, UDP scanning, service detection, operating system detection, and scan output interpretation.",
      order: 2,
      learning: [
        {
          title: "TCP Connect and SYN Scanning",
          order: 1,
          content: `
# TCP Connect and SYN Scanning

Nmap supports different techniques for scanning TCP ports.

Two important methods are TCP Connect scanning and SYN scanning.

## TCP Connect Scan

A TCP Connect scan attempts to complete the TCP three-way handshake.

Command:

\`\`\`bash
nmap -sT 192.168.1.10
\`\`\`

The operating system's normal connection mechanism is used.

## SYN Scan

A SYN scan sends a TCP SYN packet and analyzes the response without completing the full connection handshake in the usual way.

Command:

\`\`\`bash
sudo nmap -sS 192.168.1.10
\`\`\`

This is commonly called a half-open scan.

## Typical responses

- SYN-ACK: Usually indicates an open TCP port.
- RST: Usually indicates a closed TCP port.
- No response or certain ICMP errors: May indicate filtering.

## Comparison

| TCP Connect | SYN Scan |
|---|---|
| Completes TCP handshake | Does not normally complete handshake |
| Uses normal connect system call | Uses raw packet handling |
| Often works without raw-packet privileges | Usually requires elevated privileges |

## Important

Neither technique is guaranteed to be invisible. Network monitoring systems may detect both.
          `,
        },
        {
          title: "UDP Scanning",
          order: 2,
          content: `
# UDP Scanning

UDP is a connectionless transport protocol.

Unlike TCP, UDP does not establish a connection using a three-way handshake.

## Why scan UDP ports?

UDP services may expose important functionality.

Examples include:
- DNS.
- DHCP.
- SNMP.
- NTP.

## Nmap UDP scan

\`\`\`bash
sudo nmap -sU 192.168.1.10
\`\`\`

## UDP scan results

Common states include:

- Open: A UDP application responded.
- Closed: An ICMP port-unreachable response was received.
- Open|Filtered: The scanner cannot determine whether the port is open or filtered.
- Filtered: Network filtering prevents a reliable conclusion.

## Why UDP scans can be slow

Many UDP services do not respond to unexpected probes.

Scanners may need to wait for timeouts or retry probes.

## TCP versus UDP scanning

TCP scanning often provides clearer responses because TCP has defined connection behavior.

UDP scanning may require additional investigation to confirm service availability.

## Security relevance

UDP scanning helps identify services that might otherwise be overlooked during an assessment.
          `,
        },
        {
          title: "Service and Version Detection",
          order: 3,
          content: `
# Service and Version Detection

Finding an open port is only the beginning of an assessment.

Security testers also need to identify which service is running and, where possible, determine its version.

## Nmap service detection

Use:

\`\`\`bash
nmap -sV 192.168.1.10
\`\`\`

The -sV option enables service and version detection.

## Why identify versions?

Software versions help administrators and security testers:

- Identify outdated services.
- Check vendor security advisories.
- Review known vulnerabilities.
- Prioritize patching.
- Verify service configurations.

## Example

A scan may report:

\`\`\`
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH
80/tcp open  http    Apache httpd
\`\`\`

This is illustrative output. Actual results depend on the target.

## Important limitations

Service detection is not always exact.

A service may:
- Hide its version.
- Use a non-standard port.
- Return misleading banners.
- Run behind a proxy.
- Be modified by the system administrator.

## Banner information

Some services reveal information through their response banners.

However, banners can be customized or misleading.

Always validate findings before reporting a vulnerability.
          `,
        },
        {
          title: "Operating System Detection and Scan Output",
          order: 4,
          content: `
# Operating System Detection

Nmap can attempt to identify a target operating system by analyzing network responses.

Command:

\`\`\`bash
sudo nmap -O 192.168.1.10
\`\`\`

## How does OS detection work?

Nmap examines characteristics of network responses and compares them with known operating-system fingerprints.

These characteristics may include:
- TCP response behavior.
- IP packet characteristics.
- Network stack behavior.

## Detection limitations

OS detection may be inaccurate when:

- The target is behind a firewall.
- The target uses packet filtering.
- The system has an unusual network configuration.
- There are insufficient responses.

## Useful scan options

Detect services:

\`\`\`bash
nmap -sV 192.168.1.10
\`\`\`

Attempt OS detection:

\`\`\`bash
sudo nmap -O 192.168.1.10
\`\`\`

Run common default scripts and version detection:

\`\`\`bash
nmap -sC -sV 192.168.1.10
\`\`\`

Save output in normal format:

\`\`\`bash
nmap -oN results.txt 192.168.1.10
\`\`\`

## Interpreting results

A scan result is evidence, not absolute proof.

Confirm important findings using additional authorized checks and reliable vendor documentation.
          `,
        },
      ],
      questions: [
        {
          question: "Which Nmap option performs a TCP Connect scan?",
          questionType: QuestionType.MCQ,
          options: ["-sS", "-sT", "-sU", "-sV"],
          correctAnswer: "-sT",
          explanation:
            "The -sT option performs a TCP Connect scan.",
          order: 1,
        },
        {
          question: "What is another name for a SYN scan?",
          questionType: QuestionType.MCQ,
          options: [
            "Full connection scan",
            "Half-open scan",
            "DNS scan",
            "UDP handshake scan",
          ],
          correctAnswer: "Half-open scan",
          explanation:
            "A SYN scan does not normally complete the TCP three-way handshake.",
          order: 2,
        },
        {
          question: "Which Nmap option performs a UDP scan?",
          questionType: QuestionType.MCQ,
          options: ["-sT", "-sS", "-sU", "-sV"],
          correctAnswer: "-sU",
          explanation: "The -sU option enables UDP scanning.",
          order: 3,
        },
        {
          question: "Which Nmap option enables service and version detection?",
          questionType: QuestionType.MCQ,
          options: ["-O", "-sV", "-p-", "-sT"],
          correctAnswer: "-sV",
          explanation:
            "The -sV option attempts to identify services and their versions.",
          order: 4,
        },
        {
          question: "What does a SYN-ACK response usually indicate during a TCP scan?",
          questionType: QuestionType.MCQ,
          options: [
            "The port is open",
            "The port is always filtered",
            "The host is offline",
            "The port is closed",
          ],
          correctAnswer: "The port is open",
          explanation:
            "A SYN-ACK response usually indicates that a TCP service is listening.",
          order: 5,
        },
        {
          question: "Why can UDP scanning take longer than TCP scanning?",
          questionType: QuestionType.MCQ,
          options: [
            "UDP packets are encrypted",
            "Many UDP services do not respond to probes",
            "UDP has no port numbers",
            "UDP requires a TCP handshake",
          ],
          correctAnswer:
            "Many UDP services do not respond to probes",
          explanation:
            "Lack of responses can cause scanners to wait for timeouts and retry probes.",
          order: 6,
        },
        {
          question: "Which Nmap option attempts operating system detection?",
          questionType: QuestionType.MCQ,
          options: ["-O", "-sU", "-p", "-oN"],
          correctAnswer: "-O",
          explanation:
            "The -O option enables operating system detection.",
          order: 7,
        },
        {
          question: "Which Nmap command enables default scripts and version detection?",
          questionType: QuestionType.MCQ,
          options: [
            "nmap -sC -sV 192.168.1.10",
            "nmap -p- 192.168.1.10",
            "nmap -sU 192.168.1.10",
            "nmap --version 192.168.1.10",
          ],
          correctAnswer: "nmap -sC -sV 192.168.1.10",
          explanation:
            "-sC runs the default script set and -sV enables service version detection.",
          order: 8,
        },
        {
          question: "Why should service version findings be validated?",
          questionType: QuestionType.MCQ,
          options: [
            "Banners and detection results may be inaccurate",
            "All services use the same version",
            "Nmap never identifies services",
            "Port numbers always change",
          ],
          correctAnswer: "Banners and detection results may be inaccurate",
          explanation:
            "Services can hide or customize banners, so scan results should be verified.",
          order: 9,
        },
        {
          question: "Does a UDP service always respond to an unexpected probe?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "UDP applications may ignore unexpected probes, making service identification more difficult.",
          order: 10,
        },
      ],
    },

    {
      levelName: "Enumeration and Security Assessment",
      description:
        "Learn service enumeration, DNS and SMB information gathering, scan validation, risk analysis, and responsible reporting.",
      order: 3,
      learning: [
        {
          title: "What is Network Enumeration?",
          order: 1,
          content: `
# What is Network Enumeration?

Enumeration is the process of gathering detailed information about discovered network hosts and services.

Port scanning identifies accessible ports, while enumeration attempts to learn more about the services behind them.

## Information collected

Depending on the service and authorization, enumeration may identify:

- Service names and versions.
- Hostnames.
- DNS records.
- Network shares.
- Available protocols.
- Authentication mechanisms.
- Service configurations.

## Scanning versus enumeration

| Port Scanning | Enumeration |
|---|---|
| Identifies port states | Collects service-specific information |
| Finds exposed endpoints | Investigates available services |
| Provides an initial overview | Provides more detailed context |

## Examples

### SSH enumeration

Identify the SSH service and its exposed version information.

### DNS enumeration

Review DNS records and understand domain configuration.

### SMB enumeration

Review available SMB information and authorized share access.

## Why enumeration matters

Enumeration helps determine whether exposed services are necessary, correctly configured, and adequately protected.

Only collect information within the approved assessment scope.
          `,
        },
        {
          title: "DNS and SMB Enumeration",
          order: 2,
          content: `
# DNS and SMB Enumeration

DNS and SMB are important services that may reveal useful information about network infrastructure.

## DNS enumeration

DNS enumeration involves reviewing DNS records and configuration.

Common DNS record types include:

| Record | Purpose |
|---|---|
| A | Maps a hostname to an IPv4 address |
| AAAA | Maps a hostname to an IPv6 address |
| MX | Identifies mail servers |
| NS | Identifies authoritative name servers |
| TXT | Stores text information |
| CNAME | Defines an alias |

A basic DNS lookup can be performed using:

\`\`\`bash
nslookup example.com
\`\`\`

Another useful command is:

\`\`\`bash
dig example.com
\`\`\`

These commands help inspect DNS responses.

## SMB enumeration

SMB is commonly used for file and printer sharing.

It commonly uses TCP port 445.

Authorized enumeration may identify:
- Available shares.
- Server information.
- Authentication requirements.
- Access permissions.

## Security risks

Poorly configured DNS may expose unnecessary infrastructure information.

Poorly configured SMB may expose sensitive files or allow unauthorized access.

## Defensive measures

- Restrict access to internal DNS information.
- Secure SMB shares.
- Disable unnecessary SMB services.
- Require appropriate authentication.
- Monitor access to sensitive shares.
          `,
        },
        {
          title: "Network Scanning Workflow",
          order: 3,
          content: `
# Network Scanning Workflow

A structured workflow helps security professionals conduct repeatable network assessments.

## Step 1: Confirm authorization

Identify:
- Approved IP addresses.
- Allowed scan techniques.
- Testing schedule.
- Rate limits.
- Excluded systems.

## Step 2: Identify active hosts

Use suitable discovery methods to identify reachable devices.

## Step 3: Scan relevant ports

Scan the approved targets for TCP and UDP services.

Example:

\`\`\`bash
nmap -sT -p 22,80,443 192.168.1.10
\`\`\`

## Step 4: Identify services

Use service detection:

\`\`\`bash
nmap -sV 192.168.1.10
\`\`\`

## Step 5: Enumerate services

Investigate relevant services using approved techniques.

Examples:
- DNS record inspection.
- SMB share review.
- SSH configuration review.
- Web server identification.

## Step 6: Validate findings

Confirm that results are accurate and determine whether the exposure creates a security risk.

## Step 7: Document results

Record:
- Target asset.
- Open ports.
- Identified services.
- Evidence.
- Security impact.
- Recommended remediation.

## Step 8: Report responsibly

Share findings with the system owner through the agreed reporting channel.

## Important

A scan result is not automatically a vulnerability. Risk assessment requires context, validation, and evidence.
          `,
        },
        {
          title: "Defensive Measures and Reporting",
          order: 4,
          content: `
# Defensive Measures and Reporting

Port scanning helps defenders understand which services are exposed.

The next step is reducing unnecessary exposure.

## 1. Close unnecessary ports

Disable services that are not required.

## 2. Restrict access

Use firewall rules to limit access to sensitive services.

For example, database services should generally be accessible only from approved application servers or administrative networks.

## 3. Update services

Apply security patches and remove unsupported software.

## 4. Secure authentication

Use strong authentication and disable insecure access methods.

## 5. Monitor network activity

Use logs and monitoring tools to identify unusual connection attempts and unexpected services.

## 6. Segment networks

Separate public-facing systems from internal databases and administrative networks.

## Reporting a finding

A useful report should include:

- Title.
- Affected host.
- Port and protocol.
- Identified service.
- Evidence.
- Risk and impact.
- Recommended remediation.

## Example finding

Title: Unnecessary Database Service Exposure

Affected service: PostgreSQL on TCP port 5432.

Observation: The database service is accessible from a network segment where access is not required.

Impact: Unnecessary exposure increases the attack surface and may allow unauthorized connection attempts.

Recommendation: Restrict database access through firewall rules and allow connections only from approved systems.

## Responsible testing

Do not attempt unauthorized access, disrupt services, or access data outside the agreed scope.
          `,
        },
      ],
      questions: [
        {
          question: "What is the main purpose of network enumeration?",
          questionType: QuestionType.MCQ,
          options: [
            "To gather detailed information about discovered hosts and services",
            "To replace network routing",
            "To encrypt all network traffic",
            "To delete open ports",
          ],
          correctAnswer:
            "To gather detailed information about discovered hosts and services",
          explanation:
            "Enumeration collects more detailed information about services identified during discovery and scanning.",
          order: 1,
        },
        {
          question: "Which DNS record maps a hostname to an IPv4 address?",
          questionType: QuestionType.MCQ,
          options: ["AAAA", "MX", "A", "TXT"],
          correctAnswer: "A",
          explanation:
            "An A record maps a hostname to an IPv4 address.",
          order: 2,
        },
        {
          question: "Which DNS record identifies mail servers?",
          questionType: QuestionType.MCQ,
          options: ["NS", "MX", "CNAME", "AAAA"],
          correctAnswer: "MX",
          explanation:
            "MX records identify mail servers responsible for receiving email for a domain.",
          order: 3,
        },
        {
          question: "Which port is commonly used by SMB?",
          questionType: QuestionType.MCQ,
          options: ["22", "53", "445", "3306"],
          correctAnswer: "445",
          explanation:
            "SMB commonly uses TCP port 445.",
          order: 4,
        },
        {
          question: "Which command can be used to inspect DNS information?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: ["nslookup", "dig", "git", "mkdir"],
          correctAnswer: ["nslookup", "dig"],
          explanation:
            "Both nslookup and dig are commonly used for DNS queries.",
          order: 5,
        },
        {
          question: "Which activity should happen before an authorized network scan?",
          questionType: QuestionType.MCQ,
          options: [
            "Confirm scope and authorization",
            "Disable all firewalls",
            "Access confidential files",
            "Change the target's configuration",
          ],
          correctAnswer: "Confirm scope and authorization",
          explanation:
            "Testing must begin with clear authorization, scope, and agreed testing conditions.",
          order: 6,
        },
        {
          question: "What should be included in a network assessment report?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Affected host",
            "Open ports and services",
            "Evidence",
            "Recommended remediation",
          ],
          correctAnswer: [
            "Affected host",
            "Open ports and services",
            "Evidence",
            "Recommended remediation",
          ],
          explanation:
            "These details help system owners understand and remediate the identified exposure.",
          order: 7,
        },
        {
          question: "What is a good way to reduce unnecessary service exposure?",
          questionType: QuestionType.MCQ,
          options: [
            "Disable unnecessary services and restrict access",
            "Open every port",
            "Remove all authentication",
            "Ignore service updates",
          ],
          correctAnswer:
            "Disable unnecessary services and restrict access",
          explanation:
            "Reducing exposed services and enforcing access controls decreases the attack surface.",
          order: 8,
        },
        {
          question: "Does identifying an outdated service version alone always prove exploitability?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "Version information is an indicator for further investigation, but configuration and actual vulnerability conditions must be validated.",
          order: 9,
        },
        {
          question: "What is the primary goal of network segmentation?",
          questionType: QuestionType.MCQ,
          options: [
            "Separate systems and control communication between them",
            "Make every service publicly accessible",
            "Remove all IP addresses",
            "Replace DNS",
          ],
          correctAnswer:
            "Separate systems and control communication between them",
          explanation:
            "Segmentation limits unnecessary communication and helps contain security incidents.",
          order: 10,
        },
      ],
    },
  ],
};

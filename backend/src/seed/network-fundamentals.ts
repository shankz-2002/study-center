
import { QuestionType } from "../types/question.js";

export const networkFundamentalsData = {
  fieldName: "Cybersecurity",
  fieldDescription:
    "Learn cybersecurity concepts, vulnerabilities, tools, and practical security testing.",
  categoryName: "Network Security",
  categoryDescription:
    "Learn computer networking, network protocols, scanning, enumeration, network attacks, and defensive security.",
  topicName: "Network Fundamentals",
  topicDescription:
    "Understand computer networking, network architecture, IP addressing, protocols, ports, and the fundamentals required for network security testing.",

  levels: [
    // ==========================================
    // LEVEL 1: NETWORKING FUNDAMENTALS
    // ==========================================
    {
      levelName: "Networking Fundamentals",
      description:
        "Understand computer networks, network types, network devices, the OSI model, and TCP/IP architecture.",
      order: 1,

      learning: [
        {
          title: "Introduction to Computer Networks",
          order: 1,
          content: `
# Introduction to Computer Networks

A computer network is a group of interconnected devices that communicate and share information with each other.

These devices may include:

- Computers and laptops.
- Smartphones.
- Servers.
- Routers.
- Switches.
- Printers.
- Internet of Things (IoT) devices.

## Why do we use networks?

Networks allow devices to:

- Share files and resources.
- Communicate with other devices.
- Access websites and online services.
- Share internet connections.
- Access centralized applications and databases.

## Types of networks

### 1. LAN (Local Area Network)

A LAN connects devices within a limited geographical area, such as a home, office, or school.

Example: Computers connected to the same office network.

### 2. WAN (Wide Area Network)

A WAN connects networks across large geographical distances.

The internet is the most widely known example of a global network of interconnected networks.

### 3. MAN (Metropolitan Area Network)

A MAN connects networks across a city or metropolitan region.

### 4. WLAN (Wireless Local Area Network)

A WLAN is a local network that uses wireless communication, commonly Wi-Fi.

## Network topologies

Topology describes how devices are arranged and connected.

Common examples:

- Star topology: Devices connect through a central switch or hub.
- Bus topology: Devices share a common communication medium.
- Ring topology: Devices connect in a circular arrangement.
- Mesh topology: Devices have multiple interconnections.

## Why networking matters in cybersecurity

Understanding networks helps security professionals:

- Identify exposed services.
- Understand communication paths.
- Investigate suspicious traffic.
- Identify misconfigured devices.
- Assess network access controls.
          `,
        },
        {
          title: "Network Devices and Their Functions",
          order: 2,
          content: `
# Network Devices and Their Functions

Different devices perform different roles in a computer network.

Understanding these devices is important when analyzing network architecture and security.

## 1. Router

A router connects different networks and forwards packets between them.

For example, a home router connects a local network to the internet.

Routers commonly use IP addresses to determine where packets should go.

## 2. Switch

A switch connects devices within a local area network.

It typically forwards Ethernet frames using MAC addresses.

A managed switch may also support VLANs, port security, and monitoring features.

## 3. Hub

A hub connects multiple devices but broadcasts incoming data to all connected ports.

Unlike a switch, it does not intelligently forward frames based on destination MAC addresses.

Hubs are mostly obsolete in modern networks.

## 4. Firewall

A firewall monitors and controls network traffic according to security rules.

It can allow or block traffic based on:

- Source IP address.
- Destination IP address.
- Port number.
- Protocol.
- Connection state.
- Application information, depending on firewall type.

## 5. Modem

A modem provides communication between a local network and an internet service provider's access network.

## 6. Access Point

A wireless access point allows Wi-Fi devices to connect to a wired network.

## 7. Server

A server provides services or resources to other devices.

Examples include:

- Web servers.
- DNS servers.
- Mail servers.
- Database servers.
- File servers.

## Security considerations

Poorly configured network devices can expose services, allow unauthorized access, or create opportunities for attackers.

Security professionals should understand device roles, firmware updates, access controls, and network segmentation.
          `,
        },
        {
          title: "OSI Model",
          order: 3,
          content: `
# OSI Model

The Open Systems Interconnection (OSI) model is a conceptual framework that describes network communication using seven layers.

Each layer has specific responsibilities.

## The seven OSI layers

| Layer | Name | Main Function |
|---|---|---|
| 7 | Application | Network services for applications |
| 6 | Presentation | Data formatting and encryption representation |
| 5 | Session | Session management |
| 4 | Transport | End-to-end transport |
| 3 | Network | Logical addressing and routing |
| 2 | Data Link | Frames and MAC addressing |
| 1 | Physical | Transmission of raw bits |

## Layer 1: Physical

Handles physical transmission through cables, radio signals, and other media.

Examples:

- Ethernet cables.
- Fiber optics.
- Radio signals.

## Layer 2: Data Link

Handles communication between devices on the same local network.

Important concepts:

- MAC addresses.
- Ethernet frames.
- Switching.

## Layer 3: Network

Handles logical addressing and routing.

Important concepts:

- IPv4.
- IPv6.
- IP packets.
- Routers.

## Layer 4: Transport

Provides communication between applications on different devices.

Important protocols:

- TCP.
- UDP.

## Layer 5: Session

Describes how communication sessions are established, maintained, and terminated.

## Layer 6: Presentation

Describes data representation, formatting, and transformations such as encryption and compression.

## Layer 7: Application

Provides network-related functionality used by applications.

Examples include HTTP, DNS, and SMTP.

## Why is the OSI model important?

It helps security professionals understand where different network problems and attacks occur.

For example:

- MAC spoofing relates to Layer 2.
- IP spoofing relates to Layer 3.
- Port-based filtering relates to Layer 4.
- HTTP attacks operate at the application layer.
          `,
        },
        {
          title: "TCP/IP Model and Network Communication",
          order: 4,
          content: `
# TCP/IP Model

The TCP/IP model describes the architecture used for communication across modern IP networks.

It is commonly represented using four layers.

## The four TCP/IP layers

| TCP/IP Layer | Example Protocols |
|---|---|
| Application | HTTP, HTTPS, DNS, SMTP |
| Transport | TCP, UDP |
| Internet | IPv4, IPv6, ICMP |
| Network Access | Ethernet, Wi-Fi |

## 1. Application Layer

Provides communication protocols used by applications.

Examples:

- HTTP and HTTPS for web communication.
- DNS for name resolution.
- SMTP for sending email.
- SSH for secure remote access.

## 2. Transport Layer

Provides communication between applications.

TCP offers reliable, connection-oriented communication.

UDP offers connectionless communication without TCP's delivery guarantees.

## 3. Internet Layer

Handles logical addressing and routing between networks.

IP is the main protocol at this layer.

## 4. Network Access Layer

Handles communication over the local network technology.

Examples include Ethernet and Wi-Fi.

## How data travels

When you access a website:

1. Your browser prepares an HTTP request.
2. Transport protocols handle application communication.
3. IP provides source and destination addressing.
4. Network technologies transmit the data.
5. The receiving device processes the request.

## Encapsulation

As data moves down the networking layers, each layer adds information needed for communication.

This process is called encapsulation.

At the receiving device, the corresponding information is processed as data moves up the layers.

## Why this matters in security

Understanding the TCP/IP model helps with:

- Packet analysis.
- Network troubleshooting.
- Firewall configuration.
- Identifying suspicious traffic.
- Understanding how attacks interact with network protocols.
          `,
        },
      ],

      questions: [
        {
          question: "What is a computer network?",
          questionType: QuestionType.MCQ,
          options: [
            "A group of interconnected devices that communicate",
            "A programming language",
            "A database management system",
            "A computer operating system",
          ],
          correctAnswer:
            "A group of interconnected devices that communicate",
          explanation:
            "A computer network allows connected devices to communicate and share resources.",
          order: 1,
        },
        {
          question: "Which network type typically covers a home or office?",
          questionType: QuestionType.MCQ,
          options: ["WAN", "LAN", "MAN", "GAN"],
          correctAnswer: "LAN",
          explanation:
            "A Local Area Network connects devices within a limited geographical area.",
          order: 2,
        },
        {
          question: "What is the primary purpose of a router?",
          questionType: QuestionType.MCQ,
          options: [
            "To connect different networks and forward packets",
            "To store website files",
            "To assign MAC addresses",
            "To encrypt every file on a computer",
          ],
          correctAnswer:
            "To connect different networks and forward packets",
          explanation:
            "Routers forward packets between networks using logical addressing and routing information.",
          order: 3,
        },
        {
          question: "Which device commonly forwards Ethernet frames using MAC addresses?",
          questionType: QuestionType.MCQ,
          options: ["Router", "Switch", "Modem", "Firewall"],
          correctAnswer: "Switch",
          explanation:
            "A network switch commonly uses MAC address information to forward Ethernet frames.",
          order: 4,
        },
        {
          question: "How many layers are in the OSI model?",
          questionType: QuestionType.MCQ,
          options: ["4", "5", "6", "7"],
          correctAnswer: "7",
          explanation:
            "The OSI model contains seven layers, from Physical to Application.",
          order: 5,
        },
        {
          question: "Which OSI layer is responsible for logical addressing and routing?",
          questionType: QuestionType.MCQ,
          options: [
            "Physical",
            "Data Link",
            "Network",
            "Application",
          ],
          correctAnswer: "Network",
          explanation:
            "The OSI Network layer handles logical addressing and routing between networks.",
          order: 6,
        },
        {
          question: "Which protocols operate at the Transport layer of the TCP/IP model?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: ["TCP", "UDP", "HTTP", "DNS"],
          correctAnswer: ["TCP", "UDP"],
          explanation:
            "TCP and UDP are transport protocols. HTTP and DNS are application-layer protocols.",
          order: 7,
        },
        {
          question: "What is encapsulation?",
          questionType: QuestionType.MCQ,
          options: [
            "Adding protocol information as data moves through network layers",
            "Deleting all network headers",
            "Encrypting every network packet",
            "Assigning a public IP address",
          ],
          correctAnswer:
            "Adding protocol information as data moves through network layers",
          explanation:
            "Encapsulation adds the required headers and sometimes trailers as data moves through network layers.",
          order: 8,
        },
        {
          question: "Which device controls network traffic according to security rules?",
          questionType: QuestionType.MCQ,
          options: ["Hub", "Firewall", "Printer", "Repeater"],
          correctAnswer: "Firewall",
          explanation:
            "Firewalls enforce rules that allow or block network traffic.",
          order: 9,
        },
        {
          question: "Is the internet an example of a global network of interconnected networks?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "The internet connects many independent networks across the world.",
          order: 10,
        },
      ],
    },

    // ==========================================
    // LEVEL 2: IP ADDRESSING AND PROTOCOLS
    // ==========================================
    {
      levelName: "IP Addressing and Network Protocols",
      description:
        "Learn IPv4, IPv6, subnetting concepts, MAC addresses, TCP, UDP, DNS, DHCP, and common network ports.",
      order: 2,

      learning: [
        {
          title: "IPv4, IPv6 and MAC Addresses",
          order: 1,
          content: `
# IP Addresses and MAC Addresses

Devices need addressing information to communicate across networks.

Two important addressing concepts are IP addresses and MAC addresses.

## What is an IP address?

An Internet Protocol address is a logical address assigned to a network interface.

It helps identify a device's network location and supports packet delivery.

## IPv4

IPv4 uses 32-bit addresses.

Example:

\`\`\`
192.168.1.10
\`\`\`

IPv4 addresses are commonly written as four decimal numbers separated by periods.

Each number ranges from 0 to 255.

## IPv6

IPv6 uses 128-bit addresses.

Example:

\`\`\`
2001:db8::1
\`\`\`

IPv6 was introduced to provide a much larger address space and other improvements.

## Public and private IP addresses

### Public IP

A public IP address is globally routable on the internet.

### Private IP

Private addresses are used within internal networks.

Common IPv4 private ranges:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16

Private addresses are not directly routed across the public internet.

## What is a MAC address?

A MAC address identifies a network interface at the data-link layer.

Example:

\`\`\`
00:1A:2B:3C:4D:5E
\`\`\`

## IP versus MAC

| IP Address | MAC Address |
|---|---|
| Logical addressing | Link-layer addressing |
| Used for routing | Used for local network delivery |
| IPv4 or IPv6 | Commonly 48-bit Ethernet address |

## Security relevance

IP addresses help identify network communication endpoints, while MAC addresses are useful when examining local network traffic.
          `,
        },
        {
          title: "Subnetting and CIDR",
          order: 2,
          content: `
# Subnetting and CIDR

Subnetting divides an IP network into smaller logical networks.

It helps organizations manage address allocation, reduce unnecessary broadcast traffic, and separate network segments.

## What is a subnet mask?

A subnet mask identifies which bits of an IPv4 address represent the network portion and which represent the host portion.

Example:

\`\`\`
IP Address: 192.168.1.10
Subnet Mask: 255.255.255.0
\`\`\`

This corresponds to a /24 network.

## What is CIDR?

CIDR stands for Classless Inter-Domain Routing.

It represents network prefixes using slash notation.

Example:

\`\`\`
192.168.1.0/24
\`\`\`

The /24 means that the first 24 bits represent the network prefix.

## Common prefixes

| CIDR | Subnet Mask |
|---|---|
| /8 | 255.0.0.0 |
| /16 | 255.255.0.0 |
| /24 | 255.255.255.0 |
| /25 | 255.255.255.128 |
| /26 | 255.255.255.192 |
| /30 | 255.255.255.252 |

## Example

A network using:

\`\`\`
192.168.1.0/24
\`\`\`

has 256 total IPv4 addresses.

In a traditional subnet, two addresses are reserved for the network and broadcast addresses, leaving 254 usable host addresses.

## Why subnetting matters in security

Network segmentation can:

- Separate sensitive systems.
- Limit unnecessary communication.
- Restrict access between departments.
- Reduce the impact of compromised devices.
- Improve firewall rule organization.

## Important

A subnet is a logical network boundary, not automatically a security boundary. Appropriate routing and access-control rules are still necessary.
          `,
        },
        {
          title: "TCP and UDP Protocols",
          order: 3,
          content: `
# TCP and UDP

TCP and UDP are two important transport-layer protocols.

They provide different approaches to delivering application data.

## TCP (Transmission Control Protocol)

TCP is connection-oriented and provides reliable, ordered byte-stream delivery.

Its important features include:

- Connection establishment.
- Acknowledgments.
- Retransmission.
- Sequencing.
- Flow control.
- Congestion control.

### TCP three-way handshake

TCP commonly establishes a connection using three steps:

1. SYN: The client requests a connection.
2. SYN-ACK: The server acknowledges and responds.
3. ACK: The client acknowledges the response.

After the handshake, data communication can begin.

## UDP (User Datagram Protocol)

UDP is connectionless and does not provide TCP's built-in reliability and ordering guarantees.

It has a smaller header and lower protocol overhead.

Applications can implement their own reliability mechanisms if required.

## TCP versus UDP

| TCP | UDP |
|---|---|
| Connection-oriented | Connectionless |
| Reliable delivery mechanisms | No built-in delivery guarantee |
| Ordered byte stream | Individual datagrams |
| More protocol overhead | Less protocol overhead |
| Commonly used by HTTPS | Commonly used by DNS queries |

## Examples

TCP commonly supports:

- HTTPS.
- SSH.
- SMTP.
- FTP.

UDP commonly supports:

- DNS queries.
- DHCP.
- Real-time media applications.
- Certain streaming and gaming traffic.

## Security relevance

Security testers often examine TCP and UDP services during network discovery and port scanning.

An open TCP port and an open UDP port may behave differently during scanning.
          `,
        },
        {
          title: "Common Network Protocols and Ports",
          order: 4,
          content: `
# Common Network Protocols and Ports

A port identifies a communication endpoint associated with an application or service.

Transport protocols such as TCP and UDP use port numbers.

Port numbers range from 0 to 65535.

## Common ports

| Port | Protocol / Service | Common Transport |
|---|---|---|
| 20/21 | FTP | TCP |
| 22 | SSH | TCP |
| 23 | Telnet | TCP |
| 25 | SMTP | TCP |
| 53 | DNS | UDP/TCP |
| 67/68 | DHCP | UDP |
| 80 | HTTP | TCP |
| 110 | POP3 | TCP |
| 123 | NTP | UDP |
| 143 | IMAP | TCP |
| 161/162 | SNMP | UDP |
| 443 | HTTPS | TCP |
| 445 | SMB | TCP |
| 3306 | MySQL | TCP |
| 3389 | RDP | TCP |
| 5432 | PostgreSQL | TCP |
| 6379 | Redis | TCP |

These are commonly assigned ports. Services can be configured to use different ports.

## Important protocols

### HTTP

Used for communication between web clients and servers.

### HTTPS

HTTP protected using TLS.

### DNS

Translates domain names into IP addresses and provides other DNS information.

### SSH

Provides secure remote login and command execution.

### FTP

Transfers files between systems. Traditional FTP does not encrypt credentials or data by default.

### SMTP

Used to send email.

### SMB

Provides file and printer sharing in many network environments.

### RDP

Provides remote desktop access.

## Why ports matter in cybersecurity

An exposed service may increase the attack surface.

Security professionals should:

- Identify listening services.
- Determine whether they are necessary.
- Check service versions.
- Review authentication settings.
- Restrict access to sensitive services.
- Keep software updated.

## Important

An open port does not automatically indicate a vulnerability. The service and its configuration must be assessed.
          `,
        },
      ],

      questions: [
        {
          question: "How many bits does an IPv4 address contain?",
          questionType: QuestionType.MCQ,
          options: ["16", "32", "64", "128"],
          correctAnswer: "32",
          explanation: "IPv4 uses 32-bit addresses.",
          order: 1,
        },
        {
          question: "How many bits does an IPv6 address contain?",
          questionType: QuestionType.MCQ,
          options: ["32", "48", "64", "128"],
          correctAnswer: "128",
          explanation: "IPv6 uses 128-bit addresses.",
          order: 2,
        },
        {
          question: "Which of these is a private IPv4 address range?",
          questionType: QuestionType.MCQ,
          options: [
            "8.8.8.0/24",
            "10.0.0.0/8",
            "1.1.1.0/24",
            "172.0.0.0/8",
          ],
          correctAnswer: "10.0.0.0/8",
          explanation:
            "10.0.0.0/8 is one of the three IPv4 private address ranges.",
          order: 3,
        },
        {
          question: "What does the /24 in 192.168.1.0/24 represent?",
          questionType: QuestionType.MCQ,
          options: [
            "24 host devices",
            "24 network prefix bits",
            "24 available ports",
            "24 subnet masks",
          ],
          correctAnswer: "24 network prefix bits",
          explanation:
            "CIDR /24 means that 24 bits represent the network prefix.",
          order: 4,
        },
        {
          question: "Which protocol provides reliable, ordered byte-stream delivery?",
          questionType: QuestionType.MCQ,
          options: ["UDP", "TCP", "ICMP", "ARP"],
          correctAnswer: "TCP",
          explanation:
            "TCP provides reliable and ordered delivery through acknowledgments, sequencing, and retransmission.",
          order: 5,
        },
        {
          question: "What is the correct order of the TCP three-way handshake?",
          questionType: QuestionType.MCQ,
          options: [
            "ACK, SYN, FIN",
            "SYN, SYN-ACK, ACK",
            "FIN, ACK, SYN",
            "SYN-ACK, FIN, ACK",
          ],
          correctAnswer: "SYN, SYN-ACK, ACK",
          explanation:
            "TCP connection establishment commonly follows SYN, SYN-ACK, and ACK.",
          order: 6,
        },
        {
          question: "Which port is commonly used by HTTPS?",
          questionType: QuestionType.MCQ,
          options: ["21", "22", "80", "443"],
          correctAnswer: "443",
          explanation:
            "TCP port 443 is the standard port commonly used for HTTPS.",
          order: 7,
        },
        {
          question: "Which services commonly use TCP?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: ["SSH", "HTTPS", "SMTP", "FTP"],
          correctAnswer: ["SSH", "HTTPS", "SMTP", "FTP"],
          explanation:
            "These services commonly use TCP for their standard communication.",
          order: 8,
        },
        {
          question: "Which protocol translates domain names into IP addresses?",
          questionType: QuestionType.MCQ,
          options: ["DHCP", "DNS", "SSH", "FTP"],
          correctAnswer: "DNS",
          explanation:
            "DNS resolves domain names to IP addresses and provides other naming information.",
          order: 9,
        },
        {
          question: "Does an open port automatically mean that a system is vulnerable?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "An open port indicates a reachable service. Vulnerability depends on the service, version, configuration, and security controls.",
          order: 10,
        },
      ],
    },

    // ==========================================
    // LEVEL 3: NETWORK ANALYSIS AND SECURITY
    // ==========================================
    {
      levelName: "Network Analysis and Security",
      description:
        "Understand network traffic analysis, packet capture, ARP, DNS resolution, network segmentation, and fundamental defensive practices.",
      order: 3,

      learning: [
        {
          title: "How Network Communication Works",
          order: 1,
          content: `
# How Network Communication Works

When two devices communicate over a network, several protocols work together to deliver data.

Understanding this process is important for troubleshooting and security analysis.

## Example: Accessing a website

Suppose you enter:

\`\`\`
https://example.com
\`\`\`

The following processes commonly occur.

### Step 1: DNS resolution

The browser needs the IP address associated with the domain.

It uses DNS to resolve the hostname.

### Step 2: Network routing

The device determines how to reach the destination.

If the destination is outside the local network, traffic is typically forwarded to the default gateway.

### Step 3: Connection establishment

For traditional HTTPS over TCP, the client establishes a TCP connection.

### Step 4: TLS handshake

The client and server establish cryptographic parameters and authenticate the server using its certificate.

### Step 5: HTTP communication

The browser sends an HTTP request through the protected TLS connection.

### Step 6: Server response

The web server processes the request and sends a response.

## Important components

- DNS: Name resolution.
- IP: Logical addressing and routing.
- TCP: Reliable transport.
- TLS: Communication security.
- HTTP: Application-level web communication.

## Note

Modern protocols may use different transport arrangements. For example, HTTP/3 uses QUIC over UDP rather than traditional TCP.

## Security relevance

Understanding the communication sequence helps identify where problems occur, such as DNS manipulation, insecure transport, routing issues, and exposed services.
          `,
        },
        {
          title: "Packet Capture and Network Traffic Analysis",
          order: 2,
          content: `
# Packet Capture and Network Traffic Analysis

Network traffic analysis involves examining packets and communication patterns to understand what devices are doing on a network.

## What is a packet?

A packet is a formatted unit of data transmitted across a network.

It contains information such as:

- Source address.
- Destination address.
- Protocol information.
- Payload data.

## What is packet capture?

Packet capture records network traffic for analysis.

A common tool is Wireshark.

## Wireshark

Wireshark is a network protocol analyzer that allows users to inspect captured network traffic.

It can help identify:

- Communication between devices.
- DNS queries and responses.
- TCP handshakes.
- HTTP requests.
- Unusual network activity.
- Retransmissions and connection failures.

## Useful Wireshark filters

Display DNS traffic:

\`\`\`
dns
\`\`\`

Display TCP traffic:

\`\`\`
tcp
\`\`\`

Display traffic involving a specific IP:

\`\`\`
ip.addr == 192.168.1.10
\`\`\`

Display HTTP traffic:

\`\`\`
http
\`\`\`

Display traffic involving port 443:

\`\`\`
tcp.port == 443
\`\`\`

These are display filters, not capture filters.

## Important distinction

Packet capture and display filtering are different:

- Capture filters determine what traffic is recorded.
- Display filters determine what recorded traffic is shown.

## Security applications

Packet analysis helps security teams:

- Investigate suspicious connections.
- Detect unusual traffic patterns.
- Troubleshoot network problems.
- Identify unexpected protocols.
- Examine potential data leakage.

## Privacy consideration

Encrypted traffic generally protects application content, although some metadata may remain visible. Never capture other people's traffic without appropriate authorization.
          `,
        },
        {
          title: "ARP, DNS and DHCP",
          order: 3,
          content: `
# ARP, DNS and DHCP

ARP, DNS, and DHCP perform different but important functions in IP networking.

## 1. ARP (Address Resolution Protocol)

ARP is used in IPv4 local networks to discover the MAC address associated with a known local IPv4 address.

Example:

A computer wants to communicate with:

\`\`\`
192.168.1.20
\`\`\`

It may use ARP to discover the corresponding MAC address.

The device sends an ARP request on the local network, and the device with the matching address can respond.

### ARP security risk

ARP does not provide strong authentication.

An attacker on a local network may attempt ARP spoofing or poisoning to associate an IP address with an incorrect MAC address.

This can support traffic interception or disruption.

## 2. DNS (Domain Name System)

DNS translates domain names into IP addresses.

Example:

\`\`\`
example.com -> IP address
\`\`\`

DNS commonly uses UDP port 53, although TCP port 53 is also used in several situations.

### DNS security risks

- DNS spoofing.
- DNS cache poisoning.
- DNS tunneling.
- Misconfigured DNS records.

## 3. DHCP (Dynamic Host Configuration Protocol)

DHCP automatically provides network configuration to devices.

It can assign:

- IP addresses.
- Subnet masks.
- Default gateways.
- DNS server addresses.

### DHCP process: DORA

The common DHCP IPv4 allocation sequence is:

1. Discover: Client searches for DHCP servers.
2. Offer: Server offers an IP configuration.
3. Request: Client requests the offered configuration.
4. Acknowledge: Server confirms the assignment.

## Security considerations

- Protect DHCP infrastructure.
- Monitor unexpected DNS changes.
- Use secure DNS configurations.
- Consider DHCP snooping on managed switches.
- Monitor suspicious ARP behavior.
          `,
        },
        {
          title: "Network Segmentation and Defensive Security",
          order: 4,
          content: `
# Network Segmentation and Defensive Security

Network segmentation divides a network into smaller logical or physical sections.

It helps organizations control communication between systems and limit the impact of security incidents.

## Why is segmentation important?

Imagine an organization with:

- Employee computers.
- Public-facing web servers.
- Database servers.
- Administrative systems.
- Guest Wi-Fi devices.

Placing every device on one unrestricted network increases the potential impact of a compromise.

Segmentation helps separate these systems.

## VLANs

A Virtual Local Area Network (VLAN) logically separates devices into different Layer 2 broadcast domains.

Example:

- VLAN 10: Employees.
- VLAN 20: Servers.
- VLAN 30: Guest devices.

Communication between VLANs generally requires routing and can be controlled through access policies.

## Firewalls and access control

Firewalls can restrict communication between network segments.

Examples:

- Allow application servers to reach specific database ports.
- Restrict guest devices from accessing internal systems.
- Allow administrators to access management interfaces only from approved networks.

## IDS and IPS

### IDS (Intrusion Detection System)

Monitors network or system activity and identifies suspicious behavior.

It commonly generates alerts.

### IPS (Intrusion Prevention System)

Can detect and actively block suspicious traffic.

## Additional defensive practices

- Disable unnecessary services.
- Update network device firmware.
- Use strong administrative credentials.
- Enable logging and monitoring.
- Restrict management interfaces.
- Use secure protocols.
- Review firewall rules regularly.

## Defense in depth

Network security should use multiple layers of protection rather than depending on a single firewall or device.
          `,
        },
      ],

      questions: [
        {
          question: "Which protocol resolves domain names during normal website access?",
          questionType: QuestionType.MCQ,
          options: ["ARP", "DNS", "DHCP", "FTP"],
          correctAnswer: "DNS",
          explanation:
            "DNS resolves domain names into IP addresses and other DNS information.",
          order: 1,
        },
        {
          question: "Which tool is commonly used for packet capture and network protocol analysis?",
          questionType: QuestionType.MCQ,
          options: ["Wireshark", "Notepad", "Git", "Postman"],
          correctAnswer: "Wireshark",
          explanation:
            "Wireshark captures and analyzes network packets and protocols.",
          order: 2,
        },
        {
          question: "What does ARP resolve in an IPv4 local network?",
          questionType: QuestionType.MCQ,
          options: [
            "Domain name to public IP",
            "IPv4 address to MAC address",
            "MAC address to password",
            "Port number to service name",
          ],
          correctAnswer: "IPv4 address to MAC address",
          explanation:
            "ARP discovers the MAC address associated with a local IPv4 address.",
          order: 3,
        },
        {
          question: "What does DHCP provide to network clients?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "IP address",
            "Subnet mask",
            "Default gateway",
            "DNS server information",
          ],
          correctAnswer: [
            "IP address",
            "Subnet mask",
            "Default gateway",
            "DNS server information",
          ],
          explanation:
            "DHCP can automatically provide these network configuration settings.",
          order: 4,
        },
        {
          question: "What is the correct DHCP DORA sequence?",
          questionType: QuestionType.MCQ,
          options: [
            "Discover, Offer, Request, Acknowledge",
            "Request, Discover, Acknowledge, Offer",
            "Offer, Request, Discover, Acknowledge",
            "Discover, Request, Offer, Acknowledge",
          ],
          correctAnswer: "Discover, Offer, Request, Acknowledge",
          explanation:
            "DORA represents Discover, Offer, Request, and Acknowledge.",
          order: 5,
        },
        {
          question: "What is ARP spoofing?",
          questionType: QuestionType.MCQ,
          options: [
            "Sending forged ARP information to associate an IP with an incorrect MAC address",
            "Encrypting DNS traffic",
            "Changing a website's HTML",
            "Creating a new VLAN",
          ],
          correctAnswer:
            "Sending forged ARP information to associate an IP with an incorrect MAC address",
          explanation:
            "ARP spoofing manipulates local address-resolution information and may enable interception or disruption.",
          order: 6,
        },
        {
          question: "What does a VLAN help accomplish?",
          questionType: QuestionType.MCQ,
          options: [
            "Logical separation of Layer 2 network segments",
            "Encrypting all internet traffic",
            "Replacing IP addresses",
            "Disabling all network protocols",
          ],
          correctAnswer:
            "Logical separation of Layer 2 network segments",
          explanation:
            "VLANs create separate logical broadcast domains within a switched network.",
          order: 7,
        },
        {
          question: "What is the difference between IDS and IPS?",
          questionType: QuestionType.MCQ,
          options: [
            "IDS detects and alerts; IPS can actively block traffic",
            "IDS encrypts data; IPS assigns IP addresses",
            "Both are DNS protocols",
            "There is no difference",
          ],
          correctAnswer:
            "IDS detects and alerts; IPS can actively block traffic",
          explanation:
            "An IDS commonly monitors and alerts, while an IPS can take preventive action.",
          order: 8,
        },
        {
          question: "Which Wireshark display filter shows DNS traffic?",
          questionType: QuestionType.MCQ,
          options: ["http", "tcp", "dns", "arp.src"],
          correctAnswer: "dns",
          explanation:
            "The Wireshark display filter dns shows packets identified as DNS traffic.",
          order: 9,
        },
        {
          question: "Does network segmentation help limit the impact of a compromised device?",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "Segmentation and appropriate access controls can restrict lateral communication and reduce the impact of compromise.",
          order: 10,
        },
      ],
    },
  ],
};

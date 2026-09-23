---
titel: "Business VPN: When You Need One and When You Don't"
seoTitel: "Business VPN: When It's Necessary and What the Alternatives Are"
beschreibung: "You need a VPN when employees have to access servers, network drives or devices on the company network from outside. If you work exclusively with cloud services, you usually don't need one."
teaser: "What a VPN does, where its limits are and which alternatives exist for secure access on the go."
standfirst: "Many people see a VPN as the standard answer to every remote-work question. In reality, it solves one very specific problem, and if you don't have that problem, it tends to create new ones."
kategorie: "Remote Work"
lesezeit: 6
datum: 2026-09-08
icon: "<rect x=\"9\" y=\"10.5\" width=\"6\" height=\"5\" rx=\"1.3\" stroke=\"#4FB8A6\" stroke-width=\"1.5\"></rect> <path d=\"M10.3 10.5V8.8a1.7 1.7 0 0 1 3.4 0v1.7\" stroke=\"#4FB8A6\" stroke-width=\"1.5\"></path> <path d=\"M2.5 13h4M17.5 13h4\" stroke=\"#F0F4F3\" stroke-width=\"1.4\" stroke-linecap=\"round\"></path> <circle cx=\"2.5\" cy=\"13\" r=\"1.2\" fill=\"#F0F4F3\"></circle> <circle cx=\"21.5\" cy=\"13\" r=\"1.2\" fill=\"#F0F4F3\"></circle>"
featured: false
reihenfolge: 7
leistungen: ["fernzugriff-vpn"]
faq:
  - frage: "Does my business need a VPN?"
    antwort: "You need a VPN when employees have to access servers, network drives or other resources on the company network from outside. If you work exclusively with cloud services such as Microsoft 365, you usually don't need one."
  - frage: "Does a VPN make remote work secure?"
    antwort: "Only partly. A VPN encrypts the connection, but it doesn't make an infected or poorly maintained device secure. It even connects that device directly to the company network. That's why managed devices with encryption, current updates and endpoint protection are a prerequisite."
  - frage: "What's the difference between a VPN and zero trust?"
    antwort: "A classic VPN grants access to the entire network. Zero trust network access grants access only to individual applications and checks the user, the device and the device's condition every time. That shrinks the attack surface considerably."
  - frage: "Are a username and password enough for VPN access?"
    antwort: "No. Multi-factor authentication should always be enabled for VPN access. A VPN that opens with just a username and password is useless once credentials are stolen."
cta:
  titel: "Set up secure remote access"
  text: "We check whether a VPN is the right approach for your business or whether an application-based solution fits better, and then set it up."
  link: "Get free advice"
---
<p>You need a VPN when employees have to access resources from outside that live on the company network: a server, network drives, an inventory system with a local database, machine controls or network printers. The VPN creates an encrypted tunnel for this, through which the remote device works as if it were sitting in the office.</p>

<p>If your business works exclusively with cloud services (Microsoft 365, web-based business applications, cloud storage), you usually don't need a VPN. These services are already reachable over encrypted connections and secure access through sign-in and multi-factor authentication.</p>

## What a VPN does
<p>Three things, clearly separated:</p>

<ul>
<li><strong>It encrypts the connection</strong> between the device and the company network, so data can't be intercepted in transit.</li>
<li><strong>It gives access to internal resources</strong> that are deliberately not reachable from the internet.</li>
<li><strong>It gives the remote device a company IP address,</strong> which matters for some business applications that restrict access by IP.</li>
</ul>

## What a VPN explicitly does not do
<p>This is where most misunderstandings arise:</p>

<p><strong>A VPN doesn't clean up an infected device.</strong> Quite the opposite: it connects a possibly compromised laptop directly to the company network. Without endpoint protection and device management, the VPN becomes an open invitation.</p>

<p><strong>A VPN doesn't replace access rights.</strong> Once you're in the tunnel, you're on the network. Whether you're allowed into the HR folders is decided by permissions, not by the VPN.</p>

<p><strong>A VPN doesn't protect cloud services.</strong> Microsoft 365 doesn't become more secure because access runs through a tunnel. There, multi-factor authentication and conditional access provide the protection.</p>

<div class="keypoint">
<p><strong>The most important rule:</strong> a VPN is only as secure as the device at the other end. A personal laptop with no encryption, outdated updates and software of unknown origin doesn't belong in a tunnel to the company network.</p>
</div>

## The three common variants
<div class="tabelle-scroll" tabindex="0" role="region" aria-label="Table"><table>
<tr><th scope="col">Variant</th><th scope="col">What for</th><th scope="col">Note</th></tr>
<tr><td>Client-to-site</td><td>Individual employees on the road or working from home</td><td>The standard case; software on every device</td></tr>
<tr><td>Site-to-site</td><td>A permanent connection between two locations</td><td>Runs on the routers, not on the devices</td></tr>
<tr><td>Zero trust / ZTNA</td><td>Access to individual applications instead of the whole network</td><td>The more modern approach, see below</td></tr>
</table></div>

## The alternative: access to applications instead of the network
<p>The conceptual weakness of a classic VPN: once someone is in, they're on the entire network. A hijacked account or an infected device then has the same freedom of movement as a computer in the office.</p>

<p>Newer approaches, often called zero trust network access, turn this around: instead of opening up the network, they grant access to individual applications. Every access is checked: who is connecting, from which device, and what state that device is in. An unmanaged personal device then simply doesn't get into the accounting system, even if the username and password are correct.</p>

<p>For businesses with only a few internal applications, this is often the better solution: a smaller attack surface, and usually more convenient for users because nobody has to start a tunnel manually.</p>

## If you set up a VPN: what matters
<ol>
<li><strong>Multi-factor authentication</strong> for VPN access. A VPN that opens with a username and password alone is an open gate with a curtain in front of it.</li>
<li><strong>Only allow managed devices.</strong> Company devices with encryption, an up-to-date operating system and endpoint protection; no personal computers.</li>
<li><strong>Decide on split tunneling deliberately.</strong> Should all internet traffic run through the company, or only access to internal resources? The first gives you more control, but costs bandwidth and speed.</li>
<li><strong>Clean up access regularly.</strong> Former employees and old test accounts should be deactivated immediately. In practice, this is the most common gap.</li>
<li><strong>Turn on logging.</strong> Who was connected, and when? In an emergency, that's the crucial question.</li>
</ol>

## Four questions to help you decide
<p>Answer these four questions and the answer usually becomes obvious:</p>

<ol>
<li>Are there applications or data that live only on a server in your office?</li>
<li>Do employees need to access them from outside?</li>
<li>Are the devices used for access company devices under your management?</li>
<li>Do you have more than a handful of internal applications?</li>
</ol>

<p>Yes to the first two questions: you need secure remote access. A no to question three should be fixed first: device management before remote access. A no to question four suggests looking at application-based access instead of a classic VPN.</p>

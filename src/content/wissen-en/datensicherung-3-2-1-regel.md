---
titel: "The 3-2-1 Rule: How to Back Up Business Data Properly"
seoTitel: "The 3-2-1 Backup Rule: Building a Reliable Backup Strategy"
beschreibung: "The 3-2-1 rule calls for three copies of your data on two different types of media, with one copy stored off-site. Why an external hard drive isn't enough and how often you should test restores."
teaser: "Why an external hard drive isn't enough, what the 3-2-1 rule means and how often you should test your restores."
standfirst: "Almost every business backs up its data somehow. The real question isn't whether you back up, but whether you can actually get your data back when it counts."
kategorie: "Data Backup"
lesezeit: 7
datum: 2026-09-08
icon: "<path d=\"M6 19a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.9-1A4.5 4.5 0 0 1 18 19H6Z\" stroke=\"#F0F4F3\" stroke-width=\"1.4\"></path> <path d=\"M12 13.5v3.5M10.4 15.2L12 13.5l1.6 1.7\" stroke=\"#4FB8A6\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>"
featured: false
reihenfolge: 3
leistungen: ["datensicherung","server-betreuung"]
faq:
  - frage: "What is the 3-2-1 backup rule?"
    antwort: "The 3-2-1 rule calls for three copies of your data, stored on two different types of media, with one copy kept at a different physical location. It's the established minimum standard for business backups."
  - frage: "Is an external hard drive enough as a backup?"
    antwort: "No. An external drive that's permanently connected to the server gets encrypted along with everything else in a ransomware attack, and it doesn't protect against fire or theft either. You also need an off-site copy, ideally stored so it can't be altered."
  - frage: "How often should you test a backup?"
    antwort: "We recommend a sample restore once a quarter and a full, timed test once a year. Document the results, since the GDPR requires the effectiveness of your measures to be checked regularly."
  - frage: "Does Microsoft 365 back up my data automatically?"
    antwort: "Not in the sense of a real backup. Microsoft keeps the platform available but doesn't provide long-term recovery of deleted content. Exchange, SharePoint and OneDrive need a backup of their own."
  - frage: "What does 3-2-1-1-0 mean?"
    antwort: "An extension of the 3-2-1 rule. The extra one stands for an immutable copy that even administrators can't delete. The zero stands for zero errors when restoring, proven by regular tests."
cta:
  titel: "Have your backups checked"
  text: "We review your current backup strategy, test a restore and show you where the gaps are."
  link: "Get free advice"
---
<p>The 3-2-1 rule is the established minimum standard for backups: <strong>three</strong> copies of your data, stored on <strong>two</strong> different types of media, with <strong>one</strong> copy at a different physical location. Follow this rule and you'll survive the three most common data-loss scenarios: hardware failure, accidental deletion and encryption by malware.</p>

<p>The rule is old, yet it's still broken all the time, usually in the same place: the off-site copy.</p>

## What the three numbers mean
<h3>Three copies</h3>

<p>That means the original data plus two backups. Not two backups of the same state that run to the same disk morning and evening, but two independent copies. The reason is simple probability: a storage device failing is normal. Two failing at the same time is rare.</p>

<h3>Two different types of media</h3>

<p>For example, one backup on a NAS in the office and one in the cloud. Or a hard drive and a tape drive. The point is that different technologies fail for different reasons. Two identical hard drives from the same batch have an unpleasant habit of giving up at roughly the same time.</p>

<h3>One copy off-site</h3>

<p>This is where it falls apart in practice. A backup in the same server room as the original doesn't protect against fire, water damage or burglary, and it doesn't protect against ransomware either if the backup device is permanently connected.</p>

<div class="keypoint">
<p><strong>The most common mistake in small businesses:</strong> an external hard drive that's permanently plugged into the server. If ransomware encrypts the server, it encrypts the drive too. In a ransomware attack, a permanently connected backup is no backup at all.</p>
</div>

## Why the rule gained a zero
<p>In recent years, an extended version has become established: <strong>3-2-1-1-0</strong>. The extra one stands for a copy that's immutable, meaning it can't be overwritten or deleted afterwards, not even by someone with administrator rights. The technical terms are immutable backup or air gap.</p>

<p>The reason is uncomfortably concrete: modern ransomware deliberately hunts for backups and deletes them before it encrypts the actual data. If you want to lock the attacker out, you need a copy that technically can't be deleted.</p>

<p>The zero stands for <strong>zero errors when restoring</strong>, verified through regular testing. And that's where most backup strategies fall apart in practice.</p>

## The test almost nobody runs
<p>A backup that has never been restored is an assumption. Typical problems that only surface during a test:</p>

<ul>
<li>The backup job has been failing for months, and the alerts go to an email address nobody reads.</li>
<li>Only the file shares are backed up, not the database of the inventory system, which lives somewhere else.</li>
<li>The backup is complete, but restoring it would take four days. For the business, that's a total outage.</li>
<li>The only person who knows the recovery password left the company a year ago.</li>
</ul>

<p>A sensible routine: once a quarter, a real restore, at least as a sample. Once a year, a full test with the time measured. Document both in writing; if something goes wrong, that record is worth its weight in gold with insurers and regulators.</p>

## Two figures you should define
<div class="tabelle-scroll" tabindex="0" role="region" aria-label="Table"><table>
<tr><th scope="col">Figure</th><th scope="col">What it means</th><th scope="col">Example</th></tr>
<tr><td>RPO (recovery point objective)</td><td>How much data loss can you tolerate at most?</td><td>4 hours = a backup at least every 4 hours</td></tr>
<tr><td>RTO (recovery time objective)</td><td>How long may a restore take?</td><td>8 hours = business must be running again the same day</td></tr>
</table></div>

<p>These two numbers determine almost everything else: how often you back up, what technology you need and what it all costs. They should come from management, not from IT, because it's a business decision, not a technical one.</p>

## What works in practice
<p>A proven setup for a small or mid-sized business:</p>

<ol>
<li><strong>Original data</strong> on the server or in Microsoft 365.</li>
<li><strong>Local backup</strong> to a NAS in the office, several times a day. Quick to restore after accidental deletion, which is by far the most common case.</li>
<li><strong>Cloud backup</strong> to a German data center, daily, with immutability for a defined period. Covers fire, theft and ransomware.</li>
</ol>

<p>Important for Microsoft 365 users: Microsoft doesn't back up your data the way many people assume. The company keeps the platform available; it doesn't restore a mailbox that was deleted eight months ago. A separate backup of Exchange, SharePoint and OneDrive isn't a luxury, it's part of the job.</p>

## What the law requires
<p>Article 32 of the GDPR explicitly requires the ability "to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident". It also calls for a process for regularly testing the effectiveness of your measures, which is exactly what restore tests are.</p>

<p>For businesses covered by NIS2, backup management is also one of the ten mandatory measures. And the German commercial retention periods of six and ten years apply to digital records just as they do to paper.</p>

## Five questions to see where you stand
<ol>
<li>Do you know, without checking, whether last night's backup ran?</li>
<li>Is there an off-site copy that isn't permanently connected to the network?</li>
<li>When was a restore last tested, and by whom?</li>
<li>Are Microsoft 365 and your business applications included in the backup?</li>
<li>Does more than one person know how a restore works?</li>
</ol>

<p>Five yeses: you're in good shape. Two or more noes: there's work to do, and it should happen before something goes wrong, not after.</p>

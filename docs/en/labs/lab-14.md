# Lab 14 - Observing and diagnosing two network exchanges

[Return to Session 14](../sessions/session-14.md)

## Purpose of the lab

You will observe or interpret workstation network configuration, distinguish DNS resolution from the service connection, and apply layered troubleshooting.

Stable transcripts on this page support the entire required pathway. Live commands are optional when network, account, or local policy prevents a test.

## Objectives

By the end of the Lab, you should be able to:

- record interface state and useful IPv4 parameters;
- decide whether a destination is local or remote using a supplied prefix;
- distinguish DNS exchange from service connection;
- interpret `ping`, `Resolve-DnsName`, and `tracert` cautiously;
- diagnose simple cases without changing configuration;
- compare transport and link requirements;
- extend Atlas with network requirements.

!!! info "Workload signposting"
    These are **indicative learning-effort estimates**, not guaranteed deadlines. The instructor may adjust order, scope, stopping point, or replace a live test with a transcript.

    - **Priority pathway — approximately 80–100 minutes:** prepare the record, interpret interface and IP configuration, decide local or remote, distinguish the exchanges, and analyse controlled tests.
    - **Required consolidation — approximately 40–60 minutes:** diagnose cases, compare requirements, evaluate a source, and extend the specification.
    - **Optional extension — approximately 15–25 minutes:** repeat observations with approved commands on the real workstation.

!!! warning "Activity boundaries"
    Do not scan, change addresses, disable interfaces, modify firewalls, or test unapproved targets. Required commands are read-only. Cancel any elevation prompt.

!!! warning "Progress is not your permanent record"
    Checkboxes are stored only in this browser. Preserve commands, output, tables, interpretations, and open questions in a document you control.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-14-en-v2" data-gate-template="{done} of {total} commitments acknowledged" data-progress-template="{done} of {total} tasks completed" data-reset-confirm="Clear this Lab's progress in this browser?">
<section class="lab-gate" aria-labelledby="lab-14-gate-title">
<h2 id="lab-14-gate-title">Working agreement</h2>
<p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Open the Lab</button><span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Commands and transcripts are for observation and diagnosis; do not attempt to bypass CEGEP network restrictions.</p></div>

<noscript><div class="lab-no-js-note"><strong>No-JavaScript mode</strong><p>All instructions and transcripts remain visible. Saved progress, unlocking, and reset are unavailable; track tasks in your permanent record.</p></div></noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 of 11 tasks completed</p><button class="lab-button secondary" type="button" data-lab-reset>Reset</button><progress data-lab-progress value="0" max="11">0 of 11</progress></div>

## Priority pathway

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare the permanent record</h2>
<p>Create headings: <strong>context</strong>, <strong>interface</strong>, <strong>IP configuration</strong>, <strong>local or remote</strong>, <strong>DNS</strong>, <strong>service connection</strong>, <strong>tests</strong>, <strong>diagnosis</strong>, <strong>source</strong>, and <strong>synthesis</strong>.</p>
<p>In work shared beyond the classroom, partially redact MAC addresses, public IP addresses, hostnames, and internal domains unless directed otherwise.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Prepare the record and apply the privacy rule.</strong><small>Retain enough information to make reasoning traceable.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Interpret interface and link</h2>

```text
Name      InterfaceDescription        Status  LinkSpeed
Ethernet  Intel(R) Ethernet Adapter    Up      1 Gbps
Wi-Fi     Wireless Adapter             Down    0 bps
vEthernet Virtual Ethernet Adapter     Up      10 Gbps
```

Identify the active physical interface, the value that is link speed rather than application throughput, why `vEthernet` is not automatically the physical path, and what remains unconfirmed.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interpret interface state.</strong><small>Distinguish physical, virtual, and missing evidence.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Interpret IP configuration</h2>

```text
InterfaceAlias : Ethernet
IPv4Address    : 192.168.10.25
PrefixLength   : 24
DefaultGateway : 192.168.10.1
DNSServer      : 192.168.10.53
DHCPEnabled    : True
MacAddress     : 00-11-22-33-44-55
```

Record the six values and explain each role. Name two conclusions this output still cannot support.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interpret IP configuration.</strong><small>A plausible field does not prove the service responds.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Decide local or remote</h2>

The workstation uses `192.168.10.25/24`.

| Destination | Local or remote? | Justification |
|---|---|---|
| `192.168.10.1` | | |
| `192.168.10.80` | | |
| `192.168.11.5` | | |
| `203.0.113.20` | | |
| `192.168.10.25` | | |

??? success "Check"
    `192.168.10.1`, `192.168.10.80`, and the workstation are local. `192.168.11.5` and `203.0.113.20` are remote.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Classify all five destinations.</strong><small>Use address and prefix together.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Draw both exchanges</h2>

```text
A. name resolution
application → resolver → DNS server → returned record

B. service connection
application → returned address → interface → gateway/route → service
```

Label each element observed, supplied, inferred, or unverified.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Draw both exchanges.</strong><small>Do not place DNS as a mandatory hop to the final service.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Interpret three controlled tests</h2>

```text
Test 1 — gateway
Reply from 192.168.10.1: bytes=32 time<1ms TTL=64

Test 2 — DNS
Name service.test  Type A  TTL 300  IPAddress 203.0.113.20

Test 3 — route
1 192.168.10.1
2 * * *
3 198.51.100.8
4 203.0.113.20
```

For each, state what it supports, what it does not confirm, and a possible next test.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interpret all three tests.</strong><small>An asterisk or failed ICMP does not automatically establish complete failure.</small></span></label></div>
</section>

## Required consolidation

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Diagnose cases</h2>

```text
A: Ethernet Down; no IPv4 address.
B: Ethernet Up; 169.254.34.8/16; no gateway.
C: Ethernet Up; 192.168.10.25/24; gateway present; DNS timeout; controlled IP test succeeds.
D: DNS returns 203.0.113.20; route reaches destination; TCP connection to requested port is refused.
```

For each, identify the first unconfirmed responsibility and most precise next test.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Diagnose all four cases.</strong><small>Keep conclusions proportional to supplied evidence.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Compare transport and link requirements</h2>

- **Application 1:** a report must arrive complete and ordered; moderate extra delay is acceptable.
- **Application 2:** interactive live audio may prefer a small isolated loss to long retransmission delay.

Explain relevant TCP or UDP properties without using only “TCP is reliable” or “UDP is fast.”

Then choose a link for a fixed live-streaming workstation and for a laptop used in several rooms. Consider mobility, stability, installation, security, interference, and diagnosis.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Compare transport and link requirements.</strong><small>Connect every property to the application or context.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Evaluate a technical source</h2>

Evaluate an official source on DHCP, DNS, TCP, UDP, Ethernet, or Wi-Fi in no more than two sentences per part: source and publisher, appropriateness, specification, verification, and type of statement.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete the five-part source evaluation.</strong><small>The source must support the exact claim.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Update Atlas and lifecycle reflection</h2>

Add relevant requirement, technical criteria, compatibility, provisional recommendation, and open question. Include interface, wired or wireless link, appropriate throughput, drivers, security, logical ports, and support.

Write one sentence each on longevity, stability, efficiency, and maintainability.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete Atlas and lifecycle work.</strong><small>Name evidence still required.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Write the integrated diagnosis</h2>

Choose one case and write 140–200 words containing symptom, confirmed responsibilities, first uncertain responsibility, evidence, next test, and provisional conclusion.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Write the integrated diagnosis.</strong><small>Do not convert a plausible hypothesis into certainty.</small></span></label></div>
</section>

</div></div>

<div data-lab-supplement="c12-lab-14-en-v2" hidden>
## Optional extension — observe the real workstation

Use only instructor-approved values and targets.

```powershell
Get-NetAdapter
Get-NetIPConfiguration

$Gateway = '192.168.10.1'    # replace only with an approved value
$Name = 'service.test'       # replace only with an approved name
$Destination = '203.0.113.20' # replace only with an approved target

ping $Gateway
Resolve-DnsName $Name
tracert $Destination
```

Compare live output with transcripts. This activity is optional and does not affect required progress.
</div>

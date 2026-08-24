# Lab 12 - Identifying, verifying, and troubleshooting a peripheral chain

[Return to Session 12](../sessions/session-12.md)

## Purpose of the Lab

You will recognize connectors from images, distinguish shape from capability, observe devices on a Windows workstation, analyze USB and display chains, interpret an Ethernet connection, diagnose driver and audio cases, and recommend an accessibility peripheral for a defined need.

The Lab must be possible on a managed workstation **without administrator privileges**. Do not install, remove, enable, disable, or update drivers. Do not modify interrupt resources, the Registry, firmware, or network configuration. All commands are read-only.

When physical hardware is unavailable, supplied images and specifications are the observation source. Do not connect unknown peripherals, disconnect essential workstation cables, or handle internal connectors while powered.

The products, capabilities, and errors in the teaching scenarios are fictional or simplified. They are not a list of current products.

## Objectives

By the end of the Lab, you should be able to:

- recognize major USB, display, audio, network, storage, and PS/2 forms;
- distinguish connector, protocol, rate, power, and optional function;
- interpret USB 5, 10, 20, 40, and 80 Gbit/s and `Gen 1x1`, `Gen 2x1`, and `Gen 2x2`;
- determine a USB-chain limit from host, cable, dock, and device;
- explain why an adapter may be directional or active;
- collect Plug-and-Play and driver information as a standard user;
- interpret Ethernet link speed without confusing it with an IP address;
- troubleshoot a peripheral one layer at a time;
- explain why apparent interrupt sharing does not prove conflict;
- turn an accessibility need into connection, software, positioning, support, and maintenance criteria;
- evaluate an official source with a verifiable trace;
- extend the Atlas specification with I/O and peripheral requirements.

!!! info "Workload signposting"
    These ranges are **indicative learning-effort estimates**, not guaranteed completion times. The instructor may adjust order, scope, stopping point, or timing.

    - **Priority pathway — approximately 90 to 120 minutes:** prepare the record, recognize connectors, analyze USB chains, and observe devices and drivers.
    - **Consolidation — approximately 55 to 80 minutes:** interpret network evidence, diagnose scenarios, analyze interrupts, evaluate accessibility, verify a source, and extend Atlas.
    - **Optional extension — approximately 15 to 25 minutes:** solve additional chains after required work. It does not count toward required progress.

!!! tip "Usual in-class stopping point"
    Unless the instructor states otherwise, complete the **priority pathway** during the scheduled Lab period. Begin consolidation with the remaining time; the instructor will identify which consolidation tasks must be submitted or continued after class.

!!! warning "Progress is not your permanent record"
    Checkboxes are stored only in this browser. Preserve observations, commands, useful output, calculations, tables, direct links, assumptions, and decisions in a document you control.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-12-en-v1" data-gate-template="{done} of {total} commitments acknowledged" data-progress-template="{done} of {total} tasks complete" data-reset-confirm="Clear this Lab's progress in this browser?">
<section class="lab-gate" aria-labelledby="lab-12-gate-title">
<h2 id="lab-12-gate-title">Working agreement</h2>
<p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Open the Lab</button><span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Troubleshoot without disconnecting lab-owned equipment or installing drivers; isolate one variable at a time and respect the accessibility needs of the person concerned.</p></div>

<noscript><div class="lab-no-js-note"><strong>No-JavaScript mode</strong><p>All instructions, images, tables, commands, and collapsible answers remain available. Saved progress and reset are unavailable; track required work in the permanent record.</p></div></noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 of 13 tasks complete</p><button class="lab-button secondary" type="button" data-lab-reset>Reset</button><progress data-lab-progress value="0" max="13">0 of 13</progress></div>

## Priority pathway

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare the permanent record</h2>
<p>Create these headings: <strong>context</strong>, <strong>connector recognition</strong>, <strong>USB chains</strong>, <strong>observed devices</strong>, <strong>drivers</strong>, <strong>network</strong>, <strong>diagnoses</strong>, <strong>interrupts</strong>, <strong>accessibility</strong>, <strong>source evaluation</strong>, <strong>Atlas specification and lifecycle</strong>, and <strong>synthesis</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Prepare the record.</strong><small>Write “Lab 12,” the date, workstation or scenario, and the twelve headings.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Recognize connectors</h2>
<p>Use the reference images in <a href="../sessions/session-12.md">Session 12</a>. For each item, write the form name, one common function, one property the form does not prove, and one useful precaution or check.</p>

| Item | Name | Common function | Shape does not prove… | Check or precaution |
|---|---|---|---|---|
| USB Type-A | | | | |
| USB Type-B | | | | |
| USB Micro-B 3.x | | | | |
| USB Type-C | | | | |
| HDMI | | | | |
| DisplayPort | | | | |
| DVI | | | | |
| VGA/DE-15 | | | | |
| 3.5 mm TRS | | | | |
| 3.5 mm TRRS | | | | |
| 8P8C commonly called RJ-45 | | | | |
| SATA data | | | | |
| SATA power | | | | |
| M.2 M-key or B+M-key | | | | |
| PS/2 | | | | |

<p>Add two sentences: why USB-C is a form rather than a rate, and why an 8P8C plug does not prove Ethernet speed.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete connector recognition.</strong><small>Preserve all fifteen rows and both explanations.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Interpret USB rates</h2>

| Description | Nominal raw rate |
|---|---:|
| USB 2.0 High-Speed | |
| USB 3.2 Gen 1x1 | |
| USB 3.2 Gen 2x1 | |
| USB 3.2 Gen 2x2 | |
| USB4 40Gbps | |
| USB4 Version 2.0 at its common maximum | |

<p>Explain the `Gen 2x2` calculation and answer:</p>

1. Why is “USB 3.2” without a rate ambiguous?
2. Why does 20 Gbit/s raw not mean a sustained 2.5 GB/s file copy?
3. Which connector is required for USB 3.2 Gen 2x2?

??? success "Check"
    - USB 2.0 High-Speed: **480 Mbit/s**.
    - USB 3.2 Gen 1x1: **5 Gbit/s**.
    - USB 3.2 Gen 2x1: **10 Gbit/s**.
    - USB 3.2 Gen 2x2: **20 Gbit/s**, or `10 Gbit/s × 2 lanes`.
    - USB4 40Gbps: **40 Gbit/s**.
    - USB4 Version 2.0: up to **80 Gbit/s** in a compatible chain.
    - Gen 2x2 requires **USB Type-C**.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interpret all six labels.</strong><small>Preserve rates, calculation, answers, and interpretation limits.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Analyze USB chains</h2>
<p>For each scenario, determine the common maximum rate before overhead, deliverable power when determinable, working or failing function, bottleneck or missing evidence, and next one-variable test.</p>

### Chain A — external SSD

```text
computer: USB-C, USB 20Gbps, PD 100 W, DisplayPort Alt Mode
cable: USB 10Gbps, 60 W
dock: USB 10Gbps, 85 W to laptop
SSD: USB 20Gbps, bus powered
```

### Chain B — display and power

```text
computer: USB-C, USB 10Gbps, no DisplayPort Alt Mode stated
cable: USB 40Gbps, 240 W, video capable
display: USB-C with DisplayPort Alt Mode and 90 W power
```

### Chain C — charging cable

```text
computer: USB-C with DisplayPort Alt Mode
cable: USB-C to USB-C, 100 W, USB 2.0 only
adapter: passive USB-C to DisplayPort
display: DisplayPort 1440p at 144 Hz
```

### Chain D — shared dock

```text
computer: USB4 40Gbps
cable: USB4 40Gbps, 240 W
dock: 40 Gbit/s upstream shared among two displays, SSD, Ethernet, USB
devices: two 4K displays, USB 20Gbps SSD, 2.5GbE
```

<p>For D, identify required evidence about display modes, compression, controllers, and simultaneous limits rather than inventing an exact result.</p>

??? success "Check points"
    - **A:** data is limited to 10 Gbit/s by cable and dock; the dock states at most 85 W to the laptop.
    - **B:** cable and display cannot create DisplayPort Alt Mode in the computer port; video is not confirmed.
    - **C:** the USB-2-only cable lacks the high-speed lanes required for video.
    - **D:** upstream capacity is shared; exact modes and internal allocation must be verified.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Analyze all four chains.</strong><small>Preserve each limit, function, missing proof, and next check.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observe Plug-and-Play devices</h2>

```powershell
Get-PnpDevice -PresentOnly |
  Sort-Object Class, FriendlyName |
  Select-Object Class, FriendlyName, Status, InstanceId
```

<p>If unavailable or denied, preserve the error and use:</p>

```powershell
Get-CimInstance Win32_PnPEntity |
  Sort-Object PNPClass, Name |
  Select-Object Name, PNPClass, Status, DeviceID
```

<p>Filter the list when useful, for example with `Where-Object Class -eq 'Net'` or `Where-Object FriendlyName -like '*USB*'`.</p>

<p>Choose three different classes, such as display, audio, input/USB, network, or storage. Record class, friendly name, state, beginning of the instance identifier, what the fields prove, and one characteristic they do not prove.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve three instances.</strong><small>Include commands, results, and one limit per device.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observe drivers without changing them</h2>

```powershell
Get-CimInstance Win32_PnPSignedDriver |
  Where-Object DeviceName |
  Sort-Object DeviceClass, DeviceName |
  Select-Object DeviceName, DeviceClass, DriverProviderName,
                DriverVersion, DriverDate, IsSigned, InfName
```

<p>Choose one observed device. Record provider, version, date, signature state, INF file when shown, the official source you would consult before updating, and why a newer date alone does not justify an update.</p>

<p>Do not select update, rollback, disable, or uninstall.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Produce one driver record.</strong><small>Include all six fields, intended official source, and the date limitation.</small></span></label></div>
</section>

## Consolidation

<section class="lab-stage" data-lab-stage>
<h2>Interpret an Ethernet connection</h2>

```powershell
Get-NetAdapter |
  Select-Object Name, InterfaceDescription, Status, LinkSpeed, MacAddress
```

<p>If unavailable, preserve the error and use the read-only Windows network status page.</p>

<p>Record name, description, state, reported link speed, MAC address, observed or assumed connection type, and evidence still needed to know cable category.</p>

<p>Answer:</p>

1. Why does `LinkSpeed = 1 Gbps` not prove 1 Gbit/s useful file-copy throughput?
2. Why does an IP address not determine physical link speed?
3. What maximum common rate should a 2.5GbE port negotiate with a 1GbE switch?
4. What could explain negotiation at 100 Mbit/s?

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interpret the network link.</strong><small>Preserve the observation, four answers, and at least three causes of a reduced link.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Diagnose peripheral cases</h2>

```text
exact symptom
→ physical layer
→ power
→ capability or protocol
→ system detection
→ driver
→ application
→ next test
→ provisional recommendation
```

1. **Black display:** computer has HDMI only; an adapter labelled “DisplayPort to HDMI” is used from computer HDMI to display DisplayPort.
2. **TRRS headset:** plugged into the green output of a desktop with separate green and pink jacks; sound works, microphone does not appear.
3. **PS/2 keyboard:** a recent USB keyboard uses a small passive adapter to PS/2 and is not detected at boot.
4. **Slow external SSD:** USB 20Gbps SSD connected to Type-A through a USB 5Gbps cable.
5. **Warning icon:** Device Manager reports an error code for a powered USB camera that no application can use. Give two read-only checks before any driver action.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Diagnose all five cases.</strong><small>Change one variable at a time and separate fact from hypothesis.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Interpret interrupts without concluding too quickly</h2>

| Device | Reported mode | Vector or resource | State |
|---|---|---:|---|
| NVMe controller | MSI-X | 32–39 | working |
| Network adapter | MSI-X | 40–47 | working |
| USB controller | MSI | 24 | working |
| Legacy audio controller | line IRQ | 16 | working |
| Other PCI controller | line IRQ | 16 | working |

<p>Answer:</p>

1. Why can several vectors help a high-rate device?
2. Why do two devices shown on IRQ 16 not prove conflict?
3. What additional evidence would support an interrupt-problem hypothesis?
4. Why must these resources not be changed manually in this Lab?

<p>Write one fact, one cautious inference, and one missing piece of evidence.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interpret the record.</strong><small>Preserve the four answers and three statement categories.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Evaluate an accessibility peripheral</h2>
<p>Choose one scenario. Do not choose a specific product yet.</p>

- **A — limited fine movement:** prolonged writing and navigation; small precise mouse movements cause fatigue; larger arm movement and clear physical feedback are preferred.
- **B — single-switch access:** one reliable switch action; Windows navigation, application launching, and text selection through scanning.
- **C — braille reading:** screen reader plus refreshable braille reading and input on a managed Windows workstation.
- **D — eye control:** gaze navigation and selection in variable lighting, with camera privacy concerns.

<p>Produce:</p>

1. barrier and task;
2. two possible solution categories;
3. connection and power requirements;
4. Windows, driver, or software requirements;
5. mounting, calibration, or positioning requirements;
6. one privacy or reliability risk;
7. fallback if the device fails;
8. one question for the person;
9. one trial or validation method.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Build the accessibility evaluation.</strong><small>Preserve all nine elements and the provisional limit.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Evaluate a technical source</h2>
<p>Choose an official source about USB rate or cable marking, USB PD, display-port capability, a peripheral driver/support page, Ethernet cabling or speed, or accessibility-device compatibility. Use at most two sentences per part.</p>

1. **Source and publisher** — exact title, organization or manufacturer, direct link.
2. **Appropriateness** — why it supports the exact property.
3. **Specification** — exact value or condition in context.
4. **Verification** — second source, observation, calculation, or theory.
5. **Type of statement** — fact, inference, recommendation, or why none is justified.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve the five-part evaluation.</strong><small>Include direct links and exact specification context.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Update the Atlas specification and lifecycle</h2>
<p>Add:</p>

- required rear ports;
- required front-panel connectors;
- minimum USB rate for external storage;
- display capability required by the monitor;
- microphone and headset connection;
- minimum Ethernet rate;
- possible dock or hub needs;
- known accessibility requirements;
- drivers, systems, and documentation to maintain;
- one open question about a cable, port, or peripheral.

<p>Add one sentence for each criterion: <strong>longevity</strong>, <strong>stability</strong>, <strong>efficiency</strong>, and <strong>maintainability</strong>.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Extend the specification.</strong><small>Preserve all ten elements, four lifecycle sentences, and remaining evidence.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Produce the integrated synthesis</h2>
<p>Write `180–250 words` answering:</p>

> How can you prove that a peripheral fits the Atlas project without confusing connector shape with chain capability?

<p>Include a USB example; a display, audio, or network example; Plug-and-Play and driver roles; interrupts; one accessibility requirement; and a fact, inference, provisional recommendation, and open question.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Write the synthesis.</strong><small>Connect connector, protocol, capability, software, and human need.</small></span></label></div>
</section>

## Final check

Confirm that the record contains the fifteen connector rows, six USB rates, four USB chains, three Plug-and-Play instances, one driver record, Ethernet observation or scenario, five diagnoses, interrupt analysis, accessibility evaluation, source evaluation, Atlas lifecycle update, and integrated synthesis.

</div>
</div>

## Optional extension

### Chain E — video adapter

```text
source: DisplayPort with compatible dual-mode output
adapter: passive DisplayPort to HDMI
display: HDMI 1080p at 60 Hz
```

Explain why this may work and why the reverse direction is not proved.

### Chain F — shared power

```text
charger: 140 W
dock: retains 20 W and supplies at most 100 W to laptop
cable: 60 W
laptop: requests up to 100 W
```

The cable limits the chain to **60 W**.

### Chain G — reduced Ethernet link

```text
adapter: 2.5GbE
switch: 2.5GbE
cable: unknown category, only four conductors active
negotiated link: 100 Mbit/s
```

Explain why the 8P8C shape was insufficient and what known-good substitution would test the hypothesis.

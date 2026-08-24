# Lab 13 - Comparing an integrated solution and a modular platform

[Return to Session 13](../sessions/session-13.md)

## Purpose of the lab

You will compare three fictional platforms using one shared evidence package. You will distinguish observation, documentation, calculation, and inference.

The required pathway can be completed entirely from the tables and diagrams on this page. Physical Raspberry Pi or prepared Velxio observation may enrich the work, but it does not replace the shared evidence.

## Objectives

By the end of the Lab, you should be able to:

- distinguish SoC, system-on-module, single-board computer, microcontroller, and modular PC;
- locate integrated, soldered, socketed, and external functions;
- compare form factor, complete cost, power, ports, compatibility, repair, and upgrading;
- calculate a simplified teaching cost with explicit assumptions;
- analyse failure and future-requirement consequences;
- make a provisional evidence-based recommendation;
- extend the Atlas specification and lifecycle reflection.

!!! info "Workload signposting"
    The ranges below are **indicative learning-effort estimates**, not guaranteed deadlines. The instructor may adjust order, scope, stopping point, or timing according to equipment, classroom discussion, and support needs.

    - **Priority pathway — approximately 85–105 minutes of indicative effort:** prepare the record, classify platforms, interpret architectures, preserve an observation, and compare three solutions.
    - **Required consolidation — approximately 45–65 minutes of indicative effort:** calculate cost, analyse replacement cycle, recommend, evaluate a source, and extend the specification.
    - **Optional extension — approximately 20–30 minutes of indicative effort:** observe physical Raspberry Pi hardware or a prepared Velxio project and compare the observation with the shared package.

!!! tip "Usual in-class stopping point"
    Unless redirected, complete the **priority pathway** during the Lab period. The instructor will identify which consolidation work must be submitted or continued later.

!!! warning "Progress is not your permanent record"
    Checkboxes are stored only in this browser. Preserve observations, sources, calculations, assumptions, and decisions in a document you control.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-13-en-v2" data-gate-template="{done} of {total} commitments acknowledged" data-progress-template="{done} of {total} tasks completed" data-reset-confirm="Clear this Lab's progress in this browser?">
<section class="lab-gate" aria-labelledby="lab-13-gate-title">
<h2 id="lab-13-gate-title">Working agreement</h2>
<p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Open the Lab</button><span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Compare platforms from the supplied evidence; do not present simulated data as specifications of real products.</p></div>

<noscript>
<div class="lab-no-js-note">
<strong>No-JavaScript mode</strong>
<p>All instructions and tables remain visible. Saved progress, unlocking, and reset are unavailable; track tasks in your permanent record.</p>
</div>
</noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 of 11 tasks completed</p><button class="lab-button secondary" type="button" data-lab-reset>Reset</button><progress data-lab-progress value="0" max="11">0 of 11</progress></div>

## Priority pathway

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare the permanent record</h2>
<p>Create these headings: <strong>context</strong>, <strong>classification</strong>, <strong>architectures</strong>, <strong>observation</strong>, <strong>comparison</strong>, <strong>cost</strong>, <strong>replacement cycle</strong>, <strong>source</strong>, <strong>specification</strong>, and <strong>synthesis</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Prepare the permanent record.</strong><small>Record date, workstation or scenario, and observation route.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Classify system forms</h2>

Match each description with the most precise category.

| Description | Category | Decisive evidence |
|---|---|---|
| A. One chip combines processor, graphics, and input-output controllers. | | |
| B. A small module carries an SoC, memory, and supporting parts for a carrier board. | | |
| C. One board offers processing, memory, ports, and bootable storage. | | |
| D. One chip controls sensors and contains memory and interfaces. | | |
| E. A tower accepts DIMMs, a PCIe graphics card, and several storage devices. | | |

Choices: **SoC**, **system-on-module**, **single-board computer**, **microcontroller**, **modular PC**.

??? success "Check"
    A: SoC. B: system-on-module. C: single-board computer. D: microcontroller. E: modular PC.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Classify all five descriptions.</strong><small>Preserve the evidence supporting each label.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Interpret two architectures</h2>

### Architecture M — modular platform

```text
socketed CPU ─┬─ memory modules
              ├─ PCIe graphics card
              ├─ replaceable M.2 SSD
              ├─ motherboard-integrated network controller
              └─ ports and expansion cards
```

### Architecture I — integrated platform

```text
SoC: CPU + graphics + controllers
  ├─ soldered memory
  ├─ soldered storage
  ├─ integrated networking
  └─ fixed external ports
```

| Function | Architecture M | Architecture I | Possible consequence |
|---|---|---|---|
| Processor | | | |
| RAM | | | |
| Graphics | | | |
| Storage | | | |
| Networking | | | |
| Expansion | | | |

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interpret both architectures.</strong><small>Distinguish integrated, soldered, socketed, and external.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Preserve an observation and its limits</h2>

Use **route C**, which is always available, or a route assigned by the instructor.

- **A — optional physical hardware:** inspect a Raspberry Pi or similar platform.
- **B — optional prepared Velxio project:** run the supplied project and observe one input-output event.
- **C — required shared package:** use Platforms P, A, and R below.

| Observed or documented fact | Careful inference | Evidence still required |
|---|---|---|
| | | |

For A or B, add a route-specific limitation. Simulation does not prove real heat, power, sustained performance, durability, or repairability.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve one observation and its limit.</strong><small>Different routes cannot support exactly the same conclusions.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Compare three platforms</h2>

The following data are **fictional and stable**. They exercise the method and do not describe current products.

| Characteristic | Platform P — modular PC | Platform A — APU mini PC | Platform R — SBC |
|---|---|---|---|
| Processing and graphics | socketed CPU + PCIe GPU | soldered APU | soldered SoC |
| Memory | 16 GiB, 2 DIMMs, 64 GiB max. | 16 GiB soldered | 8 GiB soldered |
| Storage | replaceable M.2 SSD + 2 SATA | replaceable M.2 SSD | microSD + USB |
| Networking | 2.5 Gbit/s Ethernet + Wi-Fi | 1 Gbit/s Ethernet + Wi-Fi | 1 Gbit/s Ethernet + Wi-Fi |
| Ports | 8 USB, 3 display outputs | 5 USB, 2 display outputs | 4 USB, 2 micro-HDMI |
| Cooling | active, replaceable | compact active cooling | heat sink required for supplied workload |
| Supported system | Windows or Linux depending on drivers | Windows or Linux depending on drivers | supplied Arm Linux distribution |
| Documented repair | major parts separate | on-site SSD only | complete board replacement |
| Approximate volume | 32 L | 1.2 L | 0.1 L without case |
| Supplied average power | 180 W | 45 W | 12 W |

For each platform, record two requirement-linked benefits, two constraints, and one missing proof.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Compare all three platforms.</strong><small>A higher number is not automatically preferable.</small></span></label></div>
</section>

## Required consolidation

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Calculate a simplified teaching cost</h2>

Use a **four-year** period, `5,000 h` of use, and a teaching rate of `$0.10/kWh`.

```text
energy cost
= power in kW × 5,000 h × $0.10/kWh

simplified teaching cost
= purchase + accessories + energy + planned replacement
```

| Item | P — modular PC | A — APU mini PC | R — SBC |
|---|---:|---:|---:|
| Purchase | $1,250 | $720 | $140 |
| Required accessories | $0 | $80 | $160 |
| Average power | 180 W | 45 W | 12 W |
| Planned replacement | SSD: $110 | device: $720 | board + storage: $190 |

Name two excluded factors.

??? success "Energy-cost check"
    P: `$90`. A: `$22.50`. R: `$6`.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Calculate and verify all costs.</strong><small>Preserve units, assumptions, and excluded factors.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Analyse replacement cycle</h2>

| Scenario | Platform P | Platform A | Platform R |
|---|---|---|---|
| Memory becomes insufficient | | | |
| Primary storage fails | | | |
| New high graphics requirement | | | |
| Operating-system support ends | | | |

For each cell, state **component replaceable**, **device or board replacement**, or **missing evidence**.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Analyse all four scenarios.</strong><small>Do not invent an undocumented repair path.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Recommend for one client</h2>

Choose one client and write a detailed 120–180-word recommendation:

- digital signage in three shops;
- compact office and media workstation;
- low-power sensor system.

Include the decisive requirement, selected platform, two pieces of evidence, one accepted trade-off, and one fact that could change the decision. Add one short sentence for each other client.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Write one detailed recommendation and two brief decisions.</strong><small>Connect choices to requirements, not brand preference.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Evaluate a technical source</h2>

Use an official page about Raspberry Pi, an AMD APU, Apple Silicon, or another integrated platform. Respond in **no more than two sentences per part**:

1. **Source and publisher**;
2. **Appropriateness**;
3. **Specification**;
4. **Verification**;
5. **Type of statement**.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete the five-part source evaluation.</strong><small>A promotional page alone cannot support every conclusion.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Update the specification and lifecycle reflection</h2>

Add to Atlas: relevant requirement, technical criteria, compatibility, provisional recommendation, and open question. Explain whether a highly integrated platform can satisfy gaming and live-streaming requirements without assuming small size is decisive.

Write one sentence each on longevity, stability, efficiency, and maintainability.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete the specification and lifecycle reflection.</strong><small>Name required evidence when a conclusion remains open.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Write the synthesis</h2>

Write 150–220 words answering:

> Under what conditions is an integrated solution preferable to a modular platform?

Explicitly distinguish one fact, inference, recommendation, and open question.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Write the integrated synthesis.</strong><small>Support it with at least two pieces of evidence.</small></span></label></div>
</section>

</div>
</div>

<div data-lab-supplement="c12-lab-13-en-v2" hidden>
## Optional extension — physical hardware or Velxio

After required work, inspect physical Raspberry Pi hardware or a prepared Velxio project. Compare one observation with the shared package.

State what the route directly observes, what it only represents or simulates, and four real-hardware characteristics that remain unverified.

This activity is optional and does not affect required progress.
</div>

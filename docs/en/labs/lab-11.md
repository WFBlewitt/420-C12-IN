# Lab 11 - Observing and evaluating a graphics and audio chain

[Return to Session 11](../sessions/session-11.md)

## Purpose of the Lab

You will observe how a managed Windows workstation reports its graphics, display, and audio components. You will then perform image and density calculations, compare fictional GPU and display options, diagnose codec situations, and add accessibility requirements to a provisional recommendation for the Atlas project.

The Lab must be possible on a workstation **without administrator privileges**. Do not install codecs or drivers, disable devices, change firmware settings, or record another person’s voice. When information is inaccessible or incomplete, preserve the error or empty field and identify the missing evidence.

The products and values in the teaching tables are fictional and fixed for this activity. They are not current products or prices.

## Objectives

By the end of the Lab, you should be able to:

- collect graphics, display, and audio information with standard-user tools;
- distinguish observation, inference, and an unverified characteristic;
- calculate simplified raw-image size, pixel throughput, and pixels per inch;
- connect gaming, CAD, and creation needs to relevant GPU criteria;
- compare displays without confusing pixel dimensions, density, refresh, colour, and HDR;
- distinguish container, codec, and decoding method in a diagnosis;
- evaluate an audio chain through capture, processing, output, and latency;
- turn accessibility barriers into verifiable technical requirements;
- evaluate an official source and preserve direct evidence;
- extend the Atlas specification with a provisional media recommendation and lifecycle reflection.

!!! info "Workload signposting"
    These ranges are **indicative learning-effort estimates**, not guaranteed completion times. The instructor may adjust order, scope, stopping point, or timing.

    - **Priority pathway — approximately 90 to 120 minutes:** prepare the record, observe the workstation chain, construct an evidence trace, and complete the calculations.
    - **Consolidation — approximately 50 to 75 minutes:** compare teaching options, diagnose media cases, check accessibility, evaluate a source, and extend Atlas.
    - **Optional extension — approximately 15 to 25 minutes:** complete extra calculations and scenarios after required work. It does not count toward required progress.

!!! tip "Usual in-class stopping point"
    Unless the instructor states otherwise, complete the **priority pathway** during the scheduled Lab period. Begin consolidation with the remaining time; the instructor will identify which consolidation tasks must be submitted or continued after class.

!!! warning "Progress is not your permanent record"
    Checkboxes are stored only in this browser. Preserve commands, useful output, calculations, tables, direct links, assumptions, and decisions in a document you control.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-11-en-v1" data-gate-template="{done} of {total} commitments acknowledged" data-progress-template="{done} of {total} tasks complete" data-reset-confirm="Clear this Lab's progress in this browser?">
<section class="lab-gate" aria-labelledby="lab-11-gate-title">
<h2 id="lab-11-gate-title">Working agreement</h2>
<p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Open the Lab</button><span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Do not install codecs or drivers, disable devices, or record another person's voice; preserve empty fields and contradictions as useful evidence.</p></div>

<noscript><div class="lab-no-js-note"><strong>No-JavaScript mode</strong><p>All instructions, commands, tables, calculations, and collapsible answers remain available. Saved progress and reset are unavailable; track required work in your permanent record.</p></div></noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 of 12 tasks complete</p><button class="lab-button secondary" type="button" data-lab-reset>Reset</button><progress data-lab-progress value="0" max="12">0 of 12</progress></div>

## Priority pathway

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare the permanent record</h2>
<p>Create these headings: <strong>context</strong>, <strong>observed GPU and display</strong>, <strong>observed audio</strong>, <strong>chain trace</strong>, <strong>calculations</strong>, <strong>GPU comparison</strong>, <strong>display comparison</strong>, <strong>audio and codecs</strong>, <strong>accessibility</strong>, <strong>source evaluation</strong>, <strong>Atlas specification and lifecycle</strong>, and <strong>synthesis</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Prepare the record.</strong><small>Write “Lab 11,” the date, workstation or scenario, and the twelve headings.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observe the GPU and display</h2>
<p>Open PowerShell normally without requesting elevation. Cancel any elevation prompt.</p>

```powershell
Get-CimInstance Win32_VideoController |
  Select-Object Name, AdapterCompatibility, VideoProcessor, DriverVersion,
                CurrentHorizontalResolution, CurrentVerticalResolution,
                CurrentBitsPerPixel, CurrentRefreshRate
```

<p>When available without elevation, also inspect <strong>Settings → System → Display → Advanced display</strong> and <strong>Task Manager → Performance → GPU</strong>.</p>

<p>Preserve:</p>

1. the reported name of each video controller;
2. driver version;
3. current pixel dimensions and refresh rate;
4. any separate indication of dedicated and shared GPU memory;
5. empty fields, zero values, or contradictions among tools.

!!! warning "A reported value is not always a physical specification"
    WMI fields may be absent, truncated, or generic. Do not treat `AdapterRAM`, shared-memory values, or a product name as certain physical VRAM without a suitable second source for the exact model.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve the graphics record.</strong><small>Include the command, inspected views, useful values, and at least one interpretation limit.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observe audio devices</h2>

```powershell
Get-CimInstance Win32_SoundDevice |
  Select-Object Name, Manufacturer, Status, PNPDeviceID
```

<p>Inspect <strong>Settings → System → Sound</strong> without changing defaults. Record reported outputs, inputs, and currently selected devices. Do not record audio.</p>

<p>Answer:</p>

1. Which audio devices or controllers are reported?
2. Which output is active when the interface identifies one?
3. Does the reported name prove whether the final signal is analogue, USB, HDMI, or DisplayPort?
4. What additional evidence would confirm the path to the speakers or headset actually in use?

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve the audio record.</strong><small>Distinguish reported device, selected output, inference, and needed verification.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Trace one media chain on the workstation</h2>
<p>Choose a permitted action that requires no installation, such as playing an authorized local video, displaying a Web animation, or playing a system sound.</p>

```text
content or scene
→ application
→ system service and driver
→ GPU, media engine, or audio processing
→ memory or buffer
→ logical output
→ display, speakers, or headset
```

<p>Label every stage <strong>observed</strong>, <strong>inferred</strong>, or <strong>to verify</strong>. Do not invent the codec, hardware engine, or cable when the system does not report it.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Build a verifiable trace.</strong><small>Include at least three observed facts, two cautious inferences, and one open question.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Calculate image size, pixel throughput, and density</h2>
<p>Show formula, units, and rounding. Use `1 MiB = 1,048,576 bytes`.</p>

### Simplified raw-image size

1. `1,920 × 1,080` at `24 bits/pixel`.
2. `2,560 × 1,440` at `30 bits/pixel`.
3. `3,840 × 2,160` at `32 bits/pixel`.

### Pixel throughput

4. `2,560 × 1,440 at 144 Hz`.
5. `3,840 × 2,160 at 60 Hz`.
6. Explain why the greater value proves neither actual memory bandwidth nor game performance.

### Pixel density

```text
pixel diagonal = √(width² + height²)
PPI = pixel diagonal ÷ diagonal in inches
```

7. 24-inch `1,920 × 1,080` display.
8. 27-inch `2,560 × 1,440` display.
9. 32-inch `3,840 × 2,160` display.
10. Give one reason greater density may require interface scaling.

??? success "Check answers"
    1. `6,220,800 bytes ≈ 5.93 MiB`.
    2. `13,824,000 bytes ≈ 13.18 MiB`.
    3. `33,177,600 bytes ≈ 31.64 MiB`.
    4. `530,841,600 pixels/s`.
    5. `497,664,000 pixels/s`.
    7. approximately `91.79 PPI`.
    8. approximately `108.79 PPI`.
    9. approximately `137.68 PPI`.

    These results describe simplified images or presentation rates. They omit textures, additional buffers, compression, rendering operations, and display-link limits.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve all ten responses.</strong><small>Each calculation must include formula, units, rounded result, and an interpretation limit.</small></span></label></div>
</section>

## Consolidation

<section class="lab-stage" data-lab-stage>
<h2>Compare GPU solutions for the workload</h2>
<p>The following Atlas solutions are fictional. A missing characteristic remains unknown.</p>

| Solution | Type and memory | Advertised board power | Media functions | Professional validation | Physical constraints |
|---|---|---:|---|---|---|
| Atlas I8 | integrated GPU; shared system memory | included in processor envelope | H.264, HEVC, AV1 decode; H.264 encode | no published certification | no expansion card |
| Atlas G12 | dedicated; 12 GB GDDR6 | 230 W | H.264, HEVC, AV1 encode/decode | no published PlanCAD certification | 300 mm; 2.5 slots; auxiliary power |
| Atlas P16 | dedicated; 16 GB GDDR6; advertised ECC | 140 W | H.264, HEVC, AV1 encode/decode | certified for stated PlanCAD 2026 version | 270 mm; 2 slots; auxiliary power |

<p>Write a provisional recommendation for:</p>

- **A — quiet office and media:** two QHD displays, low noise and power, video playback and comfortable scaling, no demanding 3D games.
- **B — gaming and live streaming:** `2,560 × 1,440`, high frame rate, simultaneous capture and encoding, substantial but limited budget.
- **C — professional CAD:** PlanCAD 2026, complex models, stability, vendor support, and version traceability.

<p>For each, identify the decisive need, cite two table characteristics, state one compromise, and identify missing evidence.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Produce three provisional recommendations.</strong><small>Each must contain a need, two pieces of evidence, a compromise, and an open question.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Compare displays for the use and person</h2>

| Display | Dimensions and refresh | Panel and light | Colour and HDR | Ergonomics and functions |
|---|---|---|---|---|
| Atlas Motion 27 | 2,560 × 1,440; 180 Hz | IPS; advertised 350 cd/m²; matte | advertised 99% sRGB; no HDR certification stated | height and tilt; advertised variable refresh |
| Atlas Precision 27 | 3,840 × 2,160; 60 Hz | IPS; advertised 600 cd/m² peak; local backlight control | advertised 99% Adobe RGB and 95% DCI-P3; VESA DisplayHDR 600 | height, tilt, pivot; advertised hardware calibration |
| Atlas Access 27 | 2,560 × 1,440; 75 Hz | IPS; advertised 320 cd/m²; matte | advertised 100% sRGB; no HDR | height, tilt, pivot; advertised flicker reduction; identifiable physical controls |

<p>Select the most defensible display for:</p>

1. high-refresh gaming and ordinary Web colour;
2. Adobe RGB image creation with regular colour control;
3. prolonged office work requiring enlarged interface, adjustable position, tactile controls, and no HDR need.

<p>For each choice, distinguish a requirement from a preference, cite two facts, name an on-site setting or test, and identify one marketing claim that is insufficient by itself.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Compare the three displays.</strong><small>Preserve one choice per need, evidence, a test, and a limitation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Diagnose audio, containers, and codecs</h2>

| Element | Advertised support |
|---|---|
| Containers | MP4 and WebM; MKV undocumented |
| Software decoding | H.264, AAC, Opus, FLAC |
| Hardware decoding | H.264, HEVC Main/Main10, AV1 Main within documented GPU limits |
| Captions | WebVTT in the application; other formats to verify |
| Audio output | stereo PCM; multichannel depending on device and driver |

<p>For each case, identify the first plausible barrier, what can be stated, and the missing evidence.</p>

| Case | File or need | Observation |
|---|---|---|
| A | MP4, H.264 1080p, AAC stereo | image and sound work; GPU use is low but non-zero |
| B | MKV, AV1 4K, Opus | application refuses to open the file |
| C | MP4, HEVC Main10 4K, AAC | file opens but stutters on a workstation whose exact GPU is unidentified |
| D | stereo FLAC 48 kHz/24-bit | audio works, but an essential alert exists only in the left channel |

<p>Also recommend a voice-capture path for: an online conversation in a shared room; live streaming with an existing XLR microphone; and silent media playback with no microphone requirement. Choose among integrated combination-jack audio, a USB headset with close microphone, or a USB audio interface with XLR input and headphone output.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Analyze the four cases and three audio contexts.</strong><small>Distinguish container, codec, hardware, application, channel, and missing evidence.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Turn accessibility barriers into requirements</h2>
<p>A fictional media player has these characteristics:</p>

- “live” status is shown only by a red dot;
- controls use 10 px text that cannot be enlarged;
- video starts automatically with rapid animation;
- no captions are supplied for speech or important sounds;
- an essential alert exists only in the left channel;
- some buttons work only with a pointer;
- the display is fixed too low for the person in the scenario.

<p>For each barrier, identify the affected function, write an observable requirement, propose a verification method, and classify it as <strong>visual</strong>, <strong>auditory</strong>, <strong>interaction</strong>, or <strong>physical installation</strong>.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Write seven verifiable requirements.</strong><small>Connect each requirement to one barrier and one verification method.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Evaluate a technical source</h2>
<p>Verify one claim about CAD GPU certification, display colour or HDR certification, GPU encode/decode capability, or an accessibility requirement involving captions, colour, or resizing. Use an official manufacturer, software publisher, standards body, or W3C source. Limit each response to two sentences.</p>

1. **Source and publisher** — exact document, organization, and direct link.
2. **Appropriateness** — why it can support this claim.
3. **Specification** — exact value or statement with context, version, or condition.
4. **Verification** — second source, observation, calculation, or taught theory.
5. **Type of statement** — fact, inference, and practical recommendation, or why no recommendation is justified.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve the five-part evaluation.</strong><small>Include direct links, evidence context, and fact–inference–recommendation distinction.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Extend the Atlas specification</h2>
<p>Add a <strong>media chain</strong> section containing:</p>

| Trace | Preserve |
|---|---|
| Relevant need | pixel dimensions, frame rate, streaming quality, audio capture, work duration, accessibility |
| Technical criteria | GPU, VRAM, encoder, display, colour, audio, codec, latency, ergonomics |
| Compatibility | case, PSU, driver, application, codec, display, audio device, and Session 12 connections |
| Provisional recommendation | defensible choice from current evidence |
| Open question | evidence that could change the recommendation |

<p>Add exactly one sentence for each lifecycle criterion: <strong>longevity</strong>, <strong>stability</strong>, <strong>efficiency</strong>, and <strong>maintainability</strong>. Name missing evidence rather than inventing a conclusion.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Update Atlas and lifecycle.</strong><small>Preserve the need, criteria, compatibility, recommendation, open question, and four lifecycle sentences.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Produce the integrated synthesis</h2>
<p>Write a `250–350 word` recommendation for Atlas gaming and streaming, the PlanCAD workstation, or the office/media workstation with the accessibility needs from this Lab.</p>

<p>Your synthesis must:</p>

1. define content and target quality;
2. trace the relevant graphics and audio path;
3. choose one teaching GPU and display;
4. address the required codec or audio capture;
5. include at least two accessibility requirements;
6. cite two traceable pieces of evidence and one calculation;
7. distinguish fact, inference, provisional recommendation, and open question;
8. explain one lifecycle compromise.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Submit a traceable synthesis.</strong><small>Check all eight elements and preserve the final version.</small></span></label></div>
</section>

## Optional extension

### Compare frame times

Calculate time per frame at `60`, `120`, `144`, and `180 frames/s`.

??? success "Check"
    - `60`: approximately `16.67 ms`;
    - `120`: approximately `8.33 ms`;
    - `144`: approximately `6.94 ms`;
    - `180`: approximately `5.56 ms`.

### Examine a colour chain

Choose a freely licensed photo or video. List the elements that must be verified to preserve colour from file to display: colour space, depth, codec, application, operating system, GPU output, display, picture mode, and calibration. Do not change system colour profiles.

</div>
</div>

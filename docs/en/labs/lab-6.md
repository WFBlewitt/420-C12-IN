# Lab 6 - Observing, Calculating, and Evaluating RAM

[Return to Session 6](../sessions/session-6.md)

## Purpose of the lab

This lab asks you to observe what Windows can report about workstation memory, then interpret RAM characteristics through calculations and compatibility scenarios.

You will use read-only PowerShell commands, as in Lab 1. Results from your workstation may be incomplete: **“not reported” is a valid observation**. The automatically marked activities then use common data so that everyone can perform the same analysis.

The final fifteen minutes are reserved for interviewing a classmate. This interview will produce the client requirements used in the assessed task **“spec a PC for a classmate.”**

## Objectives

By the end of the lab, you should be able to:

- query Windows about installed memory without administrator privileges;
- distinguish capacity, rated transfer rate, configured transfer rate, bandwidth, and latency, then perform one bandwidth calculation and one simple CAS-latency comparison;
- check memory compatibility with a processor and motherboard;
- distinguish ECC, UDIMM, RDIMM, DIMM, SO-DIMM, CAMM2, and LPCAMM2;
- determine the documentation and evidence needed to evaluate a RAM solution, then add a justified direction to the evolving specification;
- gather and confirm client requirements before proposing components;
- retain a verifiable record of commands, calculations, sources to consult, and decisions;
- briefly evaluate a technical source about a real memory module.

!!! warning "Progress is not your lab record"
    Checkboxes and answers are stored only in this browser. Keep your commands, output, calculations, and interview notes in a document you control.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-6-en-v7"
  data-gate-template="{done} of {total} commitments acknowledged"
  data-progress-template="{done} of {total} tasks complete"
  data-reset-confirm="Clear this lab’s progress in this browser?"
>
  <section class="lab-gate" aria-labelledby="lab-6-gate-title">
    <h2 id="lab-6-gate-title">Working agreement</h2>
    <p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p>
    <div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div>
    <div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Open the lab</button><span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span></div>
  </section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Do not open the workstation or change memory profiles, firmware, or performance settings; preserve an absent or inaccessible value as such.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>No-JavaScript mode</strong><p>Check every commitment to reveal the lab. The instructions and fields remain usable, but automatic checking, saved progress, and interactive hints are unavailable. A finite manual practice set replaces the generator.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 of 13 tasks complete</p>
<button class="lab-button secondary" type="button" data-lab-reset>Reset</button>
<progress data-lab-progress value="0" max="13">0 of 13</progress>
</div>

<details class="lab-guide">
<summary>Guide: read a PowerShell command from left to right</summary>
<div class="lab-guide-body">
  <ol>
    <li><code>Get-CimInstance Win32_PhysicalMemory</code> asks Windows for objects describing physical memory devices.</li>
    <li>The <code>|</code> symbol passes those objects to the next command.</li>
    <li><code>Select-Object</code> retains only the requested properties.</li>
    <li>An empty property does not prove that the component is absent; it means only that this source did not report it.</li>
  </ol>
</div>
</details>

<div class="lab-command-note"><strong>These commands are read-only.</strong><p>Open PowerShell or Windows Terminal normally. Cancel any elevation request. Read each command before running it and preserve any useful error message.</p></div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare your notes</h2>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Create your lab record.</strong><small>Write “Lab 6,” the date, and the headings “observation,” “rates,” “latency,” “compatibility,” “formats and sources,” “specification,” and “client interview.”</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Query the workstation memory</h2>
<details class="lab-guide"><summary>Guide: open PowerShell</summary><div class="lab-guide-body"><ol><li>Press the Windows key and search for <strong>PowerShell</strong> or <strong>Terminal</strong>.</li><li>Open it normally, never with “Run as administrator.”</li><li>In Terminal, check that the active tab uses PowerShell.</li><li>Copy only the command, not the prompt that often begins with <code>PS</code>.</li></ol></div></details>

```powershell
Get-CimInstance Win32_ComputerSystem |
  Select-Object TotalPhysicalMemory
```

```powershell
Get-CimInstance Win32_PhysicalMemory |
  Select-Object Manufacturer, PartNumber, Capacity,
                Speed, ConfiguredClockSpeed,
                FormFactor, DeviceLocator
```

<p>Then open <strong>Task Manager → Performance → Memory</strong>.</p>

<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Keep the raw results.</strong><small>Copy or transcribe both command outputs. Do not remove blank fields.</small></span></label>
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Compare three sources.</strong><small>Compare PowerShell, Task Manager, and the About page. Record one shared value, one unit or rounding difference, and one unreported property.</small></span></label>
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Describe only what the data supports.</strong><small>State total capacity, number of reported memory objects, named locations, and available rates. Do not infer channel count from module count alone.</small></span></label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Interpret a common report</h2>

```text
TotalPhysicalMemory : 34359738368

Manufacturer         : Micron
PartNumber           : MTC8C1084S1SC48BA1
Capacity             : 17179869184
Speed                : 5600
ConfiguredClockSpeed : 5200
FormFactor           : 12
DeviceLocator        : DIMM_A1

Manufacturer         : Micron
PartNumber           : MTC8C1084S1SC48BA1
Capacity             : 17179869184
Speed                : 5600
ConfiguredClockSpeed : 5200
FormFactor           : 12
DeviceLocator        : DIMM_B1
```

!!! info "Interpreting codes and labels"
    The `FormFactor` property uses a numeric code that must be interpreted using documentation. In this report, `12` represents a SO-DIMM module. `DIMM_A1` or `DIMM_B1` is a firmware-reported slot label; by itself, it does not determine the physical form factor.

<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check data-auto-task disabled><span><strong>Turn raw data into useful characteristics.</strong><small>Use the reported values without assuming the rated profile is active.</small></span></label>
  <div class="base-exercise" data-base-exercise data-correct-message="The common report is correctly interpreted." data-incomplete-message="Complete every field." data-retry-message="A capacity, rate, or conclusion needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Total capacity in GiB</span><input data-answer="32|32GIB"></label>
      <label class="base-answer-field"><span>Capacity of one module in GiB</span><input data-answer="16|16GIB"></label>
      <label class="base-answer-field"><span>Reported memory objects</span><input data-answer="2"></label>
      <label class="base-answer-field"><span>Rated transfer rate</span><input data-answer="5600|5600MT/S|DDR5-5600"></label>
      <label class="base-answer-field"><span>Configured transfer rate</span><input data-answer="5200|5200MT/S|DDR5-5200"></label>
      <label class="base-answer-field"><span>Is the 5600 profile necessarily active?</span><select data-answer="NO"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
      <label class="base-answer-field"><span>Can this report alone prove dual-channel mode?</span><select data-answer="NO"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check report</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Clock, transfer rate, and bandwidth</h2>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check data-auto-task disabled><span><strong>Calculate from the configured rate.</strong><small>For DDR, use two transfers per cycle. For a 64-bit channel, use 8 bytes per transfer.</small></span></label>
  <div class="base-exercise" data-base-exercise data-correct-message="The clock and theoretical bandwidth values are correct." data-incomplete-message="Complete every field." data-retry-message="Review the divide-by-two step, byte width, or channel count.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Approximate clock of DDR5-5200</span><input data-answer="2600|2600MHZ|2.6GHZ"></label>
      <label class="base-answer-field"><span>Bandwidth of one 64-bit channel</span><input data-answer="41600|41600MB/S|41.6GB/S"></label>
      <label class="base-answer-field"><span>Bandwidth of two independent channels</span><input data-answer="83200|83200MB/S|83.2GB/S"></label>
      <label class="base-answer-field"><span>Are these theoretical maxima?</span><select data-answer="YES"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check calculations</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Compare latency</h2>

```text
CAS latency in ns ≈ CL × 2,000 ÷ DDR rate in MT/s
```

<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check data-auto-task disabled><span><strong>Compare two profiles without looking only at CL.</strong><small>Round to one decimal place.</small></span></label>
  <div class="base-exercise" data-base-exercise data-correct-message="Both latency values and the conclusion are correct." data-incomplete-message="Complete every field." data-retry-message="Recalculate real cycle duration before comparing.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>DDR5-5200 CL40</span><input data-answer="15.4|15.38"></label>
      <label class="base-answer-field"><span>DDR5-6000 CL36</span><input data-answer="12|12.0"></label>
      <label class="base-answer-field"><span>Lower approximate CAS latency</span><select data-answer="DDR5-6000 CL36"><option value="">Choose</option><option>DDR5-5200 CL40</option><option>DDR5-6000 CL36</option></select></label>
      <label class="base-answer-field"><span>Does lower CAS latency guarantee every application is faster?</span><select data-answer="NO"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check comparison</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Check compatibility</h2>

| Element | Requirement or limit |
|---|---|
| Processor | DDR5, two channels, up to DDR5-5600 depending on population |
| Motherboard | Four DDR5 UDIMM slots; maximum 128 GiB |
| ECC | Not supported |
| Registered memory | RDIMM not supported |
| Recommended population for two modules | A2 and B2 |

<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check data-auto-task disabled><span><strong>Evaluate each proposal.</strong><small>A higher rated speed may need a profile or run slower; an incompatible generation or module type cannot be fixed by a setting.</small></span></label>
  <div class="base-exercise" data-base-exercise data-correct-message="The compatibility decisions are correct." data-incomplete-message="Choose a decision for every proposal." data-retry-message="Review generation, module type, capacity, or population.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>2 × 16 GiB DDR5-5600 UDIMM, A2/B2</span><select data-answer="COMPATIBLE"><option value="">Choose</option><option>Compatible</option><option>Incompatible</option></select></label>
      <label class="base-answer-field"><span>2 × 32 GiB DDR4-3200 UDIMM</span><select data-answer="INCOMPATIBLE"><option value="">Choose</option><option>Compatible</option><option>Incompatible</option></select></label>
      <label class="base-answer-field"><span>4 × 32 GiB DDR5 ECC RDIMM</span><select data-answer="INCOMPATIBLE"><option value="">Choose</option><option>Compatible</option><option>Incompatible</option></select></label>
      <label class="base-answer-field"><span>2 × 64 GiB DDR5 UDIMM, total 128 GiB</span><select data-answer="CHECK"><option value="">Choose</option><option value="COMPATIBLE">Compatible</option><option value="INCOMPATIBLE">Incompatible</option><option value="CHECK">Check documentation</option></select></label>
      <label class="base-answer-field"><span>2 × 16 GiB DDR5-6000 UDIMM</span><select data-answer="CHECK"><option value="">Choose</option><option value="COMPATIBLE">Compatible</option><option value="INCOMPATIBLE">Incompatible</option><option value="CHECK">Check documentation</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check decisions</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Recognize formats and roles</h2>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check data-auto-task disabled><span><strong>Match each description to the most precise term.</strong><small>This is not yet a recommendation for a particular client.</small></span></label>
  <div class="base-exercise" data-base-exercise data-correct-message="The formats and roles are correctly distinguished." data-incomplete-message="Choose an answer for every description." data-retry-message="At least one format or role needs another look.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Desktop edge-connector module</span><select data-answer="DIMM"><option value="">Choose</option><option>DIMM</option><option>SO-DIMM</option><option>RDIMM</option><option>CAMM2</option><option>LPCAMM2</option></select></label>
      <label class="base-answer-field"><span>Traditional compact laptop module</span><select data-answer="SO-DIMM"><option value="">Choose</option><option>DIMM</option><option>SO-DIMM</option><option>RDIMM</option><option>CAMM2</option><option>LPCAMM2</option></select></label>
      <label class="base-answer-field"><span>Registered module for some server platforms</span><select data-answer="RDIMM"><option value="">Choose</option><option>DIMM</option><option>SO-DIMM</option><option>RDIMM</option><option>CAMM2</option><option>LPCAMM2</option></select></label>
      <label class="base-answer-field"><span>Flat compression-attached module</span><select data-answer="CAMM2"><option value="">Choose</option><option>DIMM</option><option>SO-DIMM</option><option>RDIMM</option><option>CAMM2</option><option>LPCAMM2</option></select></label>
      <label class="base-answer-field"><span>CAMM2 variant using replaceable LPDDR memory</span><select data-answer="LPCAMM2"><option value="">Choose</option><option>DIMM</option><option>SO-DIMM</option><option>RDIMM</option><option>CAMM2</option><option>LPCAMM2</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check formats</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>


<section class="lab-stage" data-lab-stage>
<h2>Prepare the RAM research</h2>
<p>The gaming and live-streaming PC must remain a problem to analyze, not an invitation to select the memory with the largest number. Determine what evidence would support a responsible evaluation before recommending a configuration.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Build the research plan.</strong><small>In your notes, create a checklist covering: processor and motherboard support; capacity; DDR generation and module type; transfer rate and latency; slot population; supported profiles; physical constraints; future growth; cost and warranty. For each category, name the type of technical documentation to consult. Finish with one question that must be answered before recommending a memory configuration.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthesis: extend the specification - RAM</h2>
<p>Return to the “processor” entry from Lab 5 and the plan prepared in “Prepare the RAM research.” Now add RAM to the gaming and live-streaming PC specification. Your recommendation must address known needs without inventing the resolution, frame rate, streaming workload, or budget that still require confirmation.</p>

| Relevant requirement | Technical criteria | Compatibility to verify | Provisional recommendation and open question |
|---|---|---|---|
| Connect memory to gaming, simultaneous streaming, background applications, or expected growth. | Address capacity, DDR generation, transfer rate, latency, module count, and expansion. | Connect memory to the processor's controller, motherboard, available slots, and module form factor. | State what can already be specified, what remains provisional, and which evidence is needed next. |

<h3>Life-cycle reflection — one sentence maximum per criterion</h3>

| Longevity | Stability | Efficiency | Maintainability |
|---|---|---|---|
| Should capacity, generation, and expansion options remain adequate for the expected period? | Do the configuration, population, profiles, and platform support favour predictable operation? | Do useful capacity and transfer rate justify the configuration's power, heat, and cost? | Can the modules be diagnosed, replaced, and expanded without unreasonable dependency or difficulty? |

<p>Answer in one sentence per criterion in your lab record. When an answer cannot yet be defended, identify the evidence that would be needed.</p>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Add the “RAM” entry to the specification.</strong><small>Retain the four common traces and add the longevity, stability, efficiency, and maintainability reflection. Also check whether the processor direction imposes a generation, transfer rate, or module type, and clearly identify any assumption that still depends on the client's answers.</small></span>
  </label>
</div>
</section>

<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Evaluate a technical source: a real memory module</h2>
<p><strong>Required topic:</strong> find a manufacturer specification for a real DDR memory module that could be considered for the gaming and live-streaming PC.</p>
<p>Answer the following five prompts in your lab record. <strong>Each response must be no more than two sentences.</strong></p>
<ol>
  <li><strong>Source and publisher:</strong> give the exact part number, manufacturer publishing the specification, and direct link.</li>
  <li><strong>Appropriateness:</strong> explain why this specification is suitable for establishing the module's characteristics.</li>
  <li><strong>Specification:</strong> extract its capacity, DDR generation, rated transfer rate, and module type or form factor.</li>
  <li><strong>Verification:</strong> compare at least one characteristic with a second source, processor or motherboard documentation, or theory from the session.</li>
  <li><strong>Type of statement:</strong> write and clearly label one fact, one compatibility inference, and one provisional recommendation for the PC.</li>
</ol>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Retain all five responses in your lab record.</strong><small>The checkbox confirms that every response follows the two-sentence limit and that the links allow the sources to be found again.</small></span></label>
</div>
</section>

<section class="lab-stage client-interview-stage" data-lab-stage>
<h2>Assessment preparation: client interview — 15 minutes</h2>

<div class="admonition warning">
  <p class="admonition-title">Begin only when the instructor tells you</p>
  <p>The final fifteen minutes are reserved for this interview. It provides the real needs used in your assessed recommendation.</p>
</div>

<h3>Form groups</h3>

<ul>
  <li>Work in <strong>pairs</strong>.</li>
  <li>If the class has an odd number, form one <strong>group of three</strong>.</li>
  <li>In a pair: A interviews B, then B interviews A.</li>
  <li>In a trio: A interviews B, B interviews C, then C interviews A.</li>
  <li>Each person will later produce a recommendation for the person they interviewed.</li>
</ul>

<h3>Time allocation</h3>

<table>
  <thead>
    <tr><th>Stage</th><th>Pairs</th><th>Trio</th></tr>
  </thead>
  <tbody>
    <tr><td>Form group and record names</td><td>2 min</td><td>2 min</td></tr>
    <tr><td>Interviews</td><td>4 min each</td><td>about 2 min 30 each</td></tr>
    <tr><td>Restate and confirm needs</td><td>3 min</td><td>3 min</td></tr>
    <tr><td>Save notes</td><td>2 min</td><td>2 min</td></tr>
  </tbody>
</table>

<h3>Required questions</h3>

<ol>
  <li>What must the new computer do?</li>
  <li>Which software, games, development tools, or services will be used?</li>
  <li>Which task will be most demanding?</li>
  <li>Will several demanding applications run at once?</li>
  <li>Does the work involve large files, virtual machines, video, 3D, datasets, or local AI tools?</li>
  <li>Must the computer be portable, or can it remain on a desk?</li>
  <li>Are noise, heat, power use, size, or appearance important?</li>
  <li>Which displays, peripherals, and connectors must be supported?</li>
  <li>Which existing hardware or licence can be reused?</li>
  <li>What are the top three priorities among performance, portability, quiet operation, upgradeability, reliability, appearance, energy efficiency, and useful life?</li>
  <li>If the <strong>$2,000 budget</strong> cannot achieve everything, what may be compromised and what must be retained?</li>
  <li>Does the budget include tax, display, and peripherals, or only the computer?</li>
</ol>

<h3>Turn a vague response into a useful requirement</h3>

<table>
  <thead>
    <tr><th>Vague response</th><th>Follow-up</th></tr>
  </thead>
  <tbody>
    <tr><td>“I want it to be fast.”</td><td>Which task currently feels slow?</td></tr>
    <tr><td>“I need lots of RAM.”</td><td>Which software or data volume makes you expect that?</td></tr>
    <tr><td>“I want to play games.”</td><td>Which games, resolution, and frame-rate expectations?</td></tr>
    <tr><td>“I program.”</td><td>Which tools, containers, or virtual machines?</td></tr>
    <tr><td>“I want it to last.”</td><td>Do you mean reliability, upgradeability, or adequate performance for several years?</td></tr>
  </tbody>
</table>

<div class="admonition info">
  <p class="admonition-title">During the interview</p>
  <p>Do not yet recommend a processor, memory kit, or graphics card. Your task is to gather and confirm requirements, not defend an improvised configuration.</p>
</div>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Confirm the client record.</strong><small>I interviewed my assigned client, restated their needs, obtained confirmation, and saved my notes for the assessed task.</small></span></label></div>
</section>

<section class="lab-stage lab-optional">
<h2>Self-study: advanced memory architecture and tuning</h2>
<p>The following activities are optional, automatically marked where a check is available, and excluded from the main lab progress. They are not required before beginning the client interview.</p>
</section>

<section class="lab-stage lab-optional">
<h3>Detailed DRAM addressing</h3>
<div class="lab-tasks">
  <p><strong>Reconstruct the conceptual organization.</strong> Exact mapping varies by platform; use the order studied in the session.</p>
  <div class="base-exercise" data-base-exercise data-correct-message="The conceptual DRAM organization is correctly reconstructed." data-incomplete-message="Choose an answer for every level." data-retry-message="At least one level is misplaced.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>After the memory controller</span><select data-answer="CHANNEL"><option value="">Choose</option><option>Channel</option><option>Rank</option><option>Bank</option><option>Row</option><option>Column</option></select></label>
      <label class="base-answer-field"><span>Group of chips responding together</span><select data-answer="RANK"><option value="">Choose</option><option>Channel</option><option>Rank</option><option>Bank</option><option>Row</option><option>Column</option></select></label>
      <label class="base-answer-field"><span>Internal subdivision able to keep a row active</span><select data-answer="BANK"><option value="">Choose</option><option>Channel</option><option>Rank</option><option>Bank</option><option>Row</option><option>Column</option></select></label>
      <label class="base-answer-field"><span>Large portion opened before fine selection</span><select data-answer="ROW"><option value="">Choose</option><option>Channel</option><option>Rank</option><option>Bank</option><option>Row</option><option>Column</option></select></label>
      <label class="base-answer-field"><span>Final selection within the open row</span><select data-answer="COLUMN"><option value="">Choose</option><option>Channel</option><option>Rank</option><option>Bank</option><option>Row</option><option>Column</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check organization</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>


<section class="lab-stage lab-optional">
<h3>Optimize a simplified CPU/RAM profile</h3>

<p>This activity uses a teaching model. It does not replace platform documentation or real stability testing.</p>

<div class="lab-admin-note">
  <strong>Decision order</strong>
  <p>First eliminate profiles that exceed a limit. Among valid profiles, apply the scenario priorities in the stated order. Do not add GHz, GB/s, and nanoseconds into an artificial score.</p>
</div>

<h4>Platform and workload</h4>

<table>
  <thead><tr><th>Parameter</th><th>Rule</th></tr></thead>
  <tbody>
    <tr><td>Base clock</td><td>100 MHz</td></tr>
    <tr><td>Maximum CPU multiplier</td><td>52</td></tr>
    <tr><td>Maximum CPU frequency</td><td>5,200 MHz</td></tr>
    <tr><td>Controller-to-memory ratio</td><td>1:1 through DDR5-6000; above that, 1:2</td></tr>
    <tr><td>Maximum DRAM voltage</td><td>1.35 V</td></tr>
    <tr><td>Channels</td><td>Two 64-bit channels</td></tr>
  </tbody>
</table>

<p>The workload is sensitive to CPU frequency and latency. After rejecting invalid profiles, apply these priorities:</p>

<ol>
  <li>highest CPU frequency;</li>
  <li>prefer 1:1 over 1:2;</li>
  <li>lowest approximate CAS latency;</li>
  <li>bandwidth as a tie-breaker.</li>
</ol>

<table>
  <thead><tr><th>Profile</th><th>Multiplier</th><th>Memory</th><th>CL</th><th>Ratio</th><th>Voltage</th></tr></thead>
  <tbody>
    <tr><td>A</td><td>50</td><td>DDR5-5600</td><td>36</td><td>1:1</td><td>1.25 V</td></tr>
    <tr><td>B</td><td>52</td><td>DDR5-6000</td><td>36</td><td>1:1</td><td>1.35 V</td></tr>
    <tr><td>C</td><td>53</td><td>DDR5-6000</td><td>30</td><td>1:1</td><td>1.35 V</td></tr>
    <tr><td>D</td><td>52</td><td>DDR5-6400</td><td>32</td><td>1:2</td><td>1.40 V</td></tr>
  </tbody>
</table>

<div class="lab-tasks">
  <p><strong>Calculate, eliminate, and choose.</strong> Show calculations in your notes before checking the answers.</p>

  <div class="base-exercise" data-base-exercise
       data-correct-message="The calculations, exclusions, and final choice are correct."
       data-incomplete-message="Complete every field."
       data-retry-message="Review the limits before comparing valid profiles.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Profile B CPU frequency</span><input data-answer="5200|5200MHZ|5.2GHZ"></label>
      <label class="base-answer-field"><span>Profile B memory clock</span><input data-answer="3000|3000MHZ|3GHZ"></label>
      <label class="base-answer-field"><span>Profile B controller clock</span><input data-answer="3000|3000MHZ|3GHZ"></label>
      <label class="base-answer-field"><span>Profile B CAS latency</span><input data-answer="12|12NS|12.0"></label>
      <label class="base-answer-field"><span>Profile B theoretical bandwidth</span><input data-answer="96000|96000MB/S|96GB/S"></label>
      <label class="base-answer-field"><span>Profile rejected for excessive multiplier</span><select data-answer="C"><option value="">Choose</option><option>A</option><option>B</option><option>C</option><option>D</option></select></label>
      <label class="base-answer-field"><span>Profile rejected for excessive voltage</span><select data-answer="D"><option value="">Choose</option><option>A</option><option>B</option><option>C</option><option>D</option></select></label>
      <label class="base-answer-field"><span>Best valid profile for this scenario</span><select data-answer="B"><option value="">Choose</option><option>A</option><option>B</option><option>C</option><option>D</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check optimization</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>


<section class="lab-stage lab-optional">
<h3>RAM practice generator</h3>
<p>Generate transfer-rate, bandwidth, or latency problems. The generator checks numerical work without changing main progress.</p>
<div class="practice-generator ram-practice" data-ram-practice data-lang="en">
  <div class="practice-controls">
    <label class="base-answer-field"><span>Problem type</span><select data-ram-mode><option value="mixed">Mixed</option><option value="clock">Clock and rate</option><option value="bandwidth">Bandwidth</option><option value="latency">CAS latency</option><option value="overclock">CPU and memory ratio</option></select></label>
    <button class="lab-button" type="button" data-ram-new>New problem</button>
  </div>
  <div class="practice-question" data-ram-question aria-live="polite"></div>
  <div class="base-answer-grid" data-ram-fields></div>
  <div class="practice-actions"><button class="lab-button" type="button" data-ram-check>Check</button><button class="lab-button secondary" type="button" data-ram-hint>Hint</button></div>
  <p class="base-feedback" data-ram-feedback aria-live="polite"></p>
  <p class="practice-stats" data-ram-stats>Problems solved: 0</p>
</div>
<noscript>
  <div class="lab-no-js-practice">
    <h3>Replacement manual practice</h3>
    <p>Retain the formulas, units, and rounding steps in your lab record.</p>
    <ol>
      <li>Calculate the approximate memory clock of DDR5-5600.</li>
      <li>Calculate the theoretical bandwidth of DDR5-5200 for one 64-bit channel, then for two independent channels.</li>
      <li>Calculate the approximate CAS latency of DDR5-6000 CL36.</li>
      <li>With a 100 MHz base clock, a multiplier of 52, DDR5-6000, and a 1:2 controller ratio, calculate the CPU, memory, and controller clocks.</li>
    </ol>
    <details><summary>Check the results after completing the work</summary><ol><li><code>2,800 MHz</code></li><li><code>41,600 MB/s</code>, then <code>83,200 MB/s</code></li><li><code>12.0 ns</code></li><li>CPU: <code>5,200 MHz</code>; memory: <code>3,000 MHz</code>; controller: <code>1,500 MHz</code></li></ol></details>
  </div>
</noscript>
</section>


</div>
</div>

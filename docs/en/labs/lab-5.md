# Lab 5 - Observing the Processor and Analyzing ALU Arithmetic

[Return to Session 5](../sessions/session-5.md)

## Purpose of the lab

This lab connects two levels of analysis:

- observe the characteristics of the processor installed in your workstation;
- follow precisely what happens to bits when an ALU performs fixed-width addition.

You will distinguish the roles of the control unit, registers, ALU, and cache; collect information about a real processor; then calculate carries, retained results, unsigned wraparound, and signed overflow.

Most structured fields are automatically marked. The final generator produces different problems and requires the work for each bit column, not only the final answer.

## Objectives

By the end of the lab, you should be able to:

- match the processor’s main internal elements to their roles;
- collect processor characteristics using PowerShell and Task Manager, then distinguish physical processor, core, hardware thread, and logical processor;
- perform fixed-width binary addition while showing carries and separate the full sum from the retained result;
- determine carry out, unsigned wraparound, and signed overflow;
- interpret one pattern as both signed and unsigned;
- explain why GHz, cores, or cache alone are insufficient to compare processors;
- add a justified processor direction to the evolving specification;
- briefly evaluate a technical source about a real processor.

!!! warning "Progress is not your lab record"
    Answers and progress are stored only in this browser. Keep the commands used, observed characteristics, complete additions, and explanations in your own notes.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-5-en-v6"
  data-gate-template="{done} of {total} commitments acknowledged"
  data-progress-template="{done} of {total} tasks complete"
  data-reset-confirm="Clear this lab’s progress in this browser?"
>
  <section class="lab-gate" aria-labelledby="lab-5-agreement-title">
    <h2 id="lab-5-agreement-title">Working agreement</h2>
    <p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p>
    <div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div>
    <div class="lab-actions">
      <button class="lab-button" type="button" data-lab-unlock disabled>Open the lab</button>
      <span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span>
    </div>
  </section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Use read-only tools and commands without administrator privileges; check fixed width before interpreting carry, overflow, or a signed result.</p></div>

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
<summary>Guide: analyze fixed-width addition</summary>
<div class="lab-guide-body">
  <ol>
    <li>State the operation width.</li>
    <li>Align the operands and work from right to left.</li>
    <li>For each column, record carry in, sum bit, and carry out.</li>
    <li>Write the full sum, then separate retained bits from carry out.</li>
    <li>Then interpret the same bits as unsigned and signed values.</li>
    <li>Evaluate unsigned wraparound and signed overflow separately.</li>
  </ol>
</div>
</details>

<div class="lab-admin-note">
<strong>Recommended route</strong>
<p>The sections from “Prepare your notes” through “Evaluate a technical source: a real processor,” along with the synthesis, are required. “Extend the specification: processor” continues the work begun in Session 1, and the following section practises source evaluation. The ALU challenge generator provides unlimited practice and does not change main progress.</p>
</div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare your notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Create your lab record.</strong><small>Write “Lab 5,” the date, and the headings “CPU observation,” “instruction path,” “additions,” “indicators,” “comparison,” and “specification.”</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Internal processor roles</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Match each action to its principal role.</strong><small>Choose the component that directly performs the action in our simplified model.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="The internal roles are correctly distinguished."
       data-incomplete-message="Choose an answer for each action."
       data-retry-message="At least one role needs another look.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Decode the instruction and coordinate transfers</span><select data-answer="CONTROL UNIT"><option value="">Choose</option><option>Control unit</option><option>Register</option><option>ALU</option><option>Cache</option></select></label>
      <label class="base-answer-field"><span>Temporarily retain an operand</span><select data-answer="REGISTRE"><option value="">Choose</option><option>Control unit</option><option>Register</option><option>ALU</option><option>Cache</option></select></label>
      <label class="base-answer-field"><span>Produce the sum of two operands</span><select data-answer="ALU"><option value="">Choose</option><option>Control unit</option><option>Register</option><option>ALU</option><option>Cache</option></select></label>
      <label class="base-answer-field"><span>Keep a copy of data likely to be reused</span><select data-answer="CACHE"><option value="">Choose</option><option>Control unit</option><option>Register</option><option>ALU</option><option>Cache</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check roles</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Follow an instruction</h2>
<p>Use the conceptual instruction <code>ADD R1, R2, R3</code>, which places <code>R1 + R2</code> in <code>R3</code>.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Reconstruct the data path.</strong><small>Distinguish source registers, operands, operation, and destination.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="The simplified instruction path is correct."
       data-incomplete-message="Complete all fields."
       data-retry-message="A source, operation, or destination needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>First source register</span><input data-answer="R1"></label>
      <label class="base-answer-field"><span>Second source register</span><input data-answer="R2"></label>
      <label class="base-answer-field"><span>Unit performing the operation</span><input data-answer="ALU|ALU"></label>
      <label class="base-answer-field"><span>Destination register</span><input data-answer="R3"></label>
      <label class="base-answer-field"><span>Requested operation</span><select data-answer="ADDITION"><option value="">Choose</option><option>Addition</option><option>Memory read</option><option>Shift</option><option>Disk write</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check path</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observe the workstation processor</h2>
<p>Open PowerShell and run:</p>
<pre><code>Get-CimInstance Win32_Processor |
Select-Object Name, Manufacturer, NumberOfCores,
          NumberOfLogicalProcessors, MaxClockSpeed,
          L2CacheSize, L3CacheSize</code></pre>
<p>Then open <strong>Task Manager → Performance → CPU</strong>.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Keep your observations.</strong><small>Record model, manufacturer, core count, logical processor count, reported maximum speed, and available cache sizes. Report a missing value rather than inventing it.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Interpret the observed terms.</strong><small>Exact values vary by workstation; the general relationships remain checkable.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="The relationships among processor, cores, and logical processors are correct."
       data-incomplete-message="Choose an answer for each statement."
       data-retry-message="At least one relationship needs another look.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>One physical package can contain several cores.</span><select data-answer="TRUE"><option value="">Choose</option><option>True</option><option>False</option></select></label>
      <label class="base-answer-field"><span>The logical processor count is always equal to the core count.</span><select data-answer="FALSE"><option value="">Choose</option><option>True</option><option>False</option></select></label>
      <label class="base-answer-field"><span>Two hardware threads on one core guarantee twice the performance.</span><select data-answer="FALSE"><option value="">Choose</option><option>True</option><option>False</option></select></label>
      <label class="base-answer-field"><span>Cache brings data and instructions closer to the core.</span><select data-answer="TRUE"><option value="">Choose</option><option>True</option><option>False</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check relationships</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Build the carries</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Add <code>1011 + 0110</code> using four bits.</strong><small>Enter carry in, sum bit, and carry out for each column, working right to left.</small></span>
  </label>
  <div class="alu-column-exercise" data-alu-fixed
       data-a="1011" data-b="0110"
       data-correct-message="Every column and the final result are correct."
       data-retry-message="Some columns need another look. Restart from the rightmost column."
       data-incomplete-message="Complete every carry and bit before checking.">
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Retained result and unsigned wraparound</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Analyze <code>11111010 + 00001010</code> using eight bits.</strong><small>Separate the full sum from the result that fits in the destination.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="The sum, carry, and wraparound are correctly analyzed."
       data-incomplete-message="Complete all fields."
       data-retry-message="The full sum, retained result, or unsigned interpretation needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Full binary sum</span><input data-answer="100000100"></label>
      <label class="base-answer-field"><span>8-bit retained result</span><input maxlength="8" data-answer="00000100"></label>
      <label class="base-answer-field"><span>Carry finale</span><select data-answer="1"><option value="">Choose</option><option>0</option><option>1</option></select></label>
      <label class="base-answer-field"><span>Retained unsigned result</span><input inputmode="numeric" data-answer="4"></label>
      <label class="base-answer-field"><span>Unsigned wraparound?</span><select data-answer="YES"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check wraparound</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Recognize signed overflow</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Analyze signs before and after addition.</strong><small>Do not infer overflow from carry out.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="Both signed overflows are correctly recognized."
       data-incomplete-message="Complete all fields."
       data-retry-message="A signed interpretation or overflow decision needs another look.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span><code>01111111 + 00000001</code>: retained result</span><input data-answer="10000000"></label>
      <label class="base-answer-field"><span>Same result interpreted as signed</span><input inputmode="numeric" data-answer="-128"></label>
      <label class="base-answer-field"><span>Final carry out?</span><select data-answer="NO"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
      <label class="base-answer-field"><span>Signed overflow?</span><select data-answer="YES"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
      <label class="base-answer-field"><span><code>10000000 + 11111111</code>: retained result</span><input data-answer="01111111"></label>
      <label class="base-answer-field"><span>Same result interpreted as signed</span><input inputmode="numeric" data-answer="127"></label>
      <label class="base-answer-field"><span>Final carry out?</span><select data-answer="YES"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
      <label class="base-answer-field"><span>Signed overflow?</span><select data-answer="YES"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check overflow</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Distinguish carry and overflow</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Classify four eight-bit additions.</strong><small>Each row may produce neither condition, one condition, or both.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="The four additions are correctly classified."
       data-incomplete-message="Choose both indicators for each addition."
       data-retry-message="At least one carry/overflow combination needs another look.">
    <div class="alu-classification-grid">
      <div class="alu-classification-row"><code>11111111 + 00000001</code><label>Carry<select data-answer="YES"><option value="">—</option><option>Yes</option><option>No</option></select></label><label>Overflow<select data-answer="NO"><option value="">—</option><option>Yes</option><option>No</option></select></label></div>
      <div class="alu-classification-row"><code>01111111 + 00000001</code><label>Carry<select data-answer="NO"><option value="">—</option><option>Yes</option><option>No</option></select></label><label>Overflow<select data-answer="YES"><option value="">—</option><option>Yes</option><option>No</option></select></label></div>
      <div class="alu-classification-row"><code>10000000 + 11111111</code><label>Carry<select data-answer="YES"><option value="">—</option><option>Yes</option><option>No</option></select></label><label>Overflow<select data-answer="YES"><option value="">—</option><option>Yes</option><option>No</option></select></label></div>
      <div class="alu-classification-row"><code>11111110 + 00000001</code><label>Carry<select data-answer="NO"><option value="">—</option><option>Yes</option><option>No</option></select></label><label>Overflow<select data-answer="NO"><option value="">—</option><option>Yes</option><option>No</option></select></label></div>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check classification</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Read processor characteristics</h2>
<p>Two fictional processors are used so that a real price or product model does not quickly become outdated.</p>
<table>
  <thead><tr><th>Characteristic</th><th>Processor A</th><th>Processor B</th></tr></thead>
  <tbody>
    <tr><td>Cores / threads</td><td>6 / 12</td><td>12 / 16</td></tr>
    <tr><td>Maximum frequency</td><td>4,9 GHz</td><td>4,5 GHz</td></tr>
    <tr><td>Cache L3</td><td>18 Mo</td><td>30 Mo</td></tr>
    <tr><td>Stated power</td><td>65 W</td><td>125 W</td></tr>
    <tr><td>Integrated graphics</td><td>Yes</td><td>No</td></tr>
    <tr><td>Fictional price</td><td>260 $</td><td>430 $</td></tr>
  </tbody>
</table>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Select the relevant information for each need.</strong><small>The goal is not to identify one universal winner.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="The choices match the stated constraints."
       data-incomplete-message="Choose an answer for each situation."
       data-retry-message="Reread the needs and constraints of each situation.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Office PC without a separate graphics card, limited budget</span><select data-answer="A"><option value="">Choose</option><option value="A">Processor A</option><option value="B">Processor B</option></select></label>
      <label class="base-answer-field"><span>Highly parallel rendering, graphics card already planned, suitable cooling</span><select data-answer="B"><option value="">Choose</option><option value="A">Processor A</option><option value="B">Processor B</option></select></label>
      <label class="base-answer-field"><span>Is maximum frequency alone sufficient to conclude?</span><select data-answer="NO"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
      <label class="base-answer-field"><span>Must motherboard compatibility be checked?</span><select data-answer="YES"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check analysis</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Extend the specification: processor</h2>
<p>Return to the gaming and live-streaming PC scenario introduced in Session 1. The current information is not sufficient to select a precise model. Your task is to define a verifiable processor direction and show its dependencies.</p>

| Relevant requirement | Technical criteria | Compatibility to verify | Provisional recommendation and open question |
|---|---|---|---|
| Connect the processor to one PC use or constraint. | Name the characteristics that materially affect that use. | State at least two dependencies involving the platform or other components. | Give a direction without inventing missing information, then finish with a question to resolve. |

<h3>Life-cycle reflection — one sentence maximum per criterion</h3>

| Longevity | Stability | Efficiency | Maintainability |
|---|---|---|---|
| Should the processor and its platform remain adequate and supported for the expected period? | Which compatibility, cooling, or support factors affect predictable operation? | Does the intended performance justify the power, heat, cooling, and cost? | Can the processor and platform be reasonably diagnosed, cooled, replaced, or upgraded? |

<p>Answer in one sentence per criterion in your lab record. When an answer cannot yet be defended, identify the evidence that would be needed.</p>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Add the “processor” entry to the specification.</strong><small>Consider workload parallelism, cores and threads, instruction-set and software support, the memory platform, expansion lanes, power, cooling, and future growth. Add the longevity, stability, efficiency, and maintainability reflection; distinguish justified criteria from those that still require verification.</small></span>
  </label>
</div>
</section>

<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Evaluate a technical source: a real processor</h2>
<p><strong>Required topic:</strong> find the official specification for a real processor that could be considered for the evolving gaming and live-streaming PC.</p>
<p>Answer the following five prompts in your lab record. <strong>Each response must be no more than two sentences.</strong></p>
<ol>
  <li><strong>Source and publisher:</strong> give the exact model, manufacturer publishing the specification, and direct link.</li>
  <li><strong>Appropriateness:</strong> explain why this specification is suitable for establishing that processor's characteristics.</li>
  <li><strong>Specification:</strong> extract one relevant characteristic, such as cores and threads, cache, stated power, or a platform capability.</li>
  <li><strong>Verification:</strong> compare it with a second source, a workstation observation, or theory from the session.</li>
  <li><strong>Type of statement:</strong> write and clearly label one fact, one inference about use, and one provisional recommendation.</li>
</ol>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Retain all five responses in your lab record.</strong><small>The checkbox confirms that every response follows the two-sentence limit and that the links allow the sources to be found again.</small></span></label>
</div>
</section>

<section class="lab-stage">
<h2>ALU challenge generator</h2>
<p>The generator provides 4-bit or 8-bit additions. For each column, enter carry in, sum bit, and carry out. Then provide the full sum, retained result, signed and unsigned interpretations, and indicators.</p>
<p>Incorrect fields are marked without revealing the solution. This practice does not alter main-task progress.</p>

<div class="practice-generator alu-practice" data-alu-practice data-lang="en">
  <div class="practice-controls">
    <label class="base-answer-field">
      <span>Width</span>
      <select data-alu-width>
        <option value="4">4 bits</option>
        <option value="8" selected>8 bits</option>
      </select>
    </label>
    <label class="base-answer-field">
      <span>Difficulty</span>
      <select data-alu-level>
        <option value="guided">Guided</option>
        <option value="mixed" selected>Mixed</option>
        <option value="edge">Boundary values</option>
      </select>
    </label>
    <button class="lab-button" type="button" data-alu-new>New problem</button>
  </div>

  <div class="practice-question" data-alu-question aria-live="polite"></div>
  <div data-alu-work></div>
  <div class="practice-actions">
    <button class="lab-button" type="button" data-alu-check>Check work</button>
    <button class="lab-button secondary" type="button" data-alu-hint>Show hint</button>
  </div>
  <p class="base-feedback" data-alu-feedback aria-live="polite"></p>
  <p class="practice-stats" data-alu-stats>Problems solved: 0</p>
</div>
<noscript>
  <div class="lab-no-js-practice">
    <h3>Replacement manual practice</h3>
    <p>For each addition, show every column's carries, the full sum, the retained result, and both indicators.</p>
    <ol>
      <li><code>1011 + 0110</code> using four bits.</li>
      <li><code>01111101 + 00000110</code> using eight bits.</li>
      <li><code>11110000 + 00110000</code> using eight bits.</li>
    </ol>
    <details><summary>Check the results after completing the work</summary><ol><li>Full sum <code>10001</code>; result <code>0001</code>; carry out yes; signed overflow no.</li><li>Full sum <code>10000011</code>; result <code>10000011</code>; carry out no; signed overflow yes.</li><li>Full sum <code>100100000</code>; result <code>00100000</code>; carry out yes; signed overflow no.</li></ol></details>
  </div>
</noscript>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthesis</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Write a four-to-six-sentence synthesis.</strong><small>Explain the path of an addition through the processor, then distinguish retained result, carry out, unsigned wraparound, and signed overflow.</small></span>
  </label>
</div>
</section>
</div>
</div>

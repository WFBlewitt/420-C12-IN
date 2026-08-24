# Lab 4 - Locating and Moving Data

[Return to Session 4](../sessions/session-4.md)

## Purpose of the lab

This lab applies microcomputer architecture to a small number of focused situations. You will distinguish the physical layers of a component, match several components to their roles, interpret an addressable-memory table, and follow a read from RAM to a register.

The page provides the practical pathway for this topic. The instructor may set the stopping point according to the published indicative-effort bands and the time needed for the separate Teams Quiz.

## Objectives

By the end of the lab, you should be able to:

- distinguish PCB, package, die, and connector;
- match CPU, GPU, MCU, SoC, and SoM to their general roles;
- follow consecutive hexadecimal addresses;
- reconstruct values from a memory table;
- match commands, addresses, and values to the appropriate buses;
- explain a simplified memory-read operation;
- briefly evaluate a technical source about an architectural bus or link.

!!! warning "Progress is not your lab record"
    Answers are checked and progress is stored locally in this browser. Nevertheless, retain the memory table, calculations, and reconstruction steps in your own notes.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-4-en-v3"
  data-gate-template="{done} of {total} commitments acknowledged"
  data-progress-template="{done} of {total} tasks complete"
  data-reset-confirm="Clear this lab's progress in this browser?"
>
  <section class="lab-gate" aria-labelledby="lab-4-agreement-title">
    <h2 id="lab-4-agreement-title">Working agreement</h2>
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
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Keep an address separate from its contents and check width, type, and endianness before reconstructing a value.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>No-JavaScript mode</strong><p>Check every commitment to reveal the lab. The instructions and fields remain usable, but automatic checking, saved progress, and interactive hints are unavailable.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 of 7 tasks complete</p>
<button class="lab-button secondary" type="button" data-lab-reset>Reset</button>
<progress data-lab-progress value="0" max="7">0 of 7</progress>
</div>

<details class="lab-guide">
<summary>Guide: reading a memory table</summary>
<div class="lab-guide-body">
  <ol>
    <li>Locate the starting address.</li>
    <li>Convert the width into a number of bytes.</li>
    <li>Read exactly that number of consecutive locations.</li>
    <li>Apply endianness to that value only.</li>
    <li>Finally, apply the requested type.</li>
  </ol>
</div>
</details>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare your notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Create your lab record.</strong><small>Write “Lab 4,” the date, and the headings “physical layers,” “components,” “memory,” and “buses.”</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Physical layers</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Match each description to the correct layer.</strong><small>Think of the path from the complete board to the silicon.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="All four physical layers are correctly distinguished." data-incomplete-message="Choose an answer for every description." data-retry-message="At least one physical layer needs another look.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Rigid support carrying traces and components</span><select data-answer="PCB"><option value="">Choose</option><option>PCB</option><option>Package</option><option>Die</option><option>Connector</option></select></label>
      <label class="base-answer-field"><span>Piece of silicon carrying the transistors</span><select data-answer="DIE"><option value="">Choose</option><option>PCB</option><option>Package</option><option>Die</option><option>Connector</option></select></label>
      <label class="base-answer-field"><span>Structure protecting the die and providing contacts</span><select data-answer="PACKAGE"><option value="">Choose</option><option>PCB</option><option>Package</option><option>Die</option><option>Connector</option></select></label>
      <label class="base-answer-field"><span>Board element receiving a removable part</span><select data-answer="CONNECTOR"><option value="">Choose</option><option>PCB</option><option>Package</option><option>Die</option><option>Connector</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the layers</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Component roles</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Match each role to the most precise term.</strong><small>A real product may combine roles; use the session's definitions.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="All five roles are correctly matched." data-incomplete-message="Choose a term for every role." data-retry-message="At least one component role needs another look.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>General instructions and system coordination</span><select data-answer="CPU"><option value="">Choose</option><option>CPU</option><option>GPU</option><option>MCU</option><option>SoC</option><option>SoM</option></select></label>
      <label class="base-answer-field"><span>Many similar operations performed in parallel</span><select data-answer="GPU"><option value="">Choose</option><option>CPU</option><option>GPU</option><option>MCU</option><option>SoC</option><option>SoM</option></select></label>
      <label class="base-answer-field"><span>Embedded control with integrated memory and peripherals</span><select data-answer="MCU"><option value="">Choose</option><option>CPU</option><option>GPU</option><option>MCU</option><option>SoC</option><option>SoM</option></select></label>
      <label class="base-answer-field"><span>Several major functions combined in one circuit</span><select data-answer="SOC"><option value="">Choose</option><option>CPU</option><option>GPU</option><option>MCU</option><option>SoC</option><option>SoM</option></select></label>
      <label class="base-answer-field"><span>Small PCB carrying an SoC and supporting components</span><select data-answer="SOM"><option value="">Choose</option><option>CPU</option><option>GPU</option><option>MCU</option><option>SoC</option><option>SoM</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the roles</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Memory table</h2>
<p>Every location contains one byte. Addresses and contents are hexadecimal.</p>

<table>
  <thead><tr><th>Address</th><th>Contents</th><th>Address</th><th>Contents</th></tr></thead>
  <tbody>
    <tr><td><code>0200</code></td><td><code>41</code></td><td><code>0208</code></td><td><code>50</code></td></tr>
    <tr><td><code>0201</code></td><td><code>42</code></td><td><code>0209</code></td><td><code>40</code></td></tr>
    <tr><td><code>0202</code></td><td><code>2A</code></td><td><code>020A</code></td><td><code>43</code></td></tr>
    <tr><td><code>0203</code></td><td><code>01</code></td><td><code>020B</code></td><td><code>50</code></td></tr>
    <tr><td><code>0204</code></td><td><code>D6</code></td><td><code>020C</code></td><td><code>55</code></td></tr>
    <tr><td><code>0205</code></td><td><code>FF</code></td><td><code>020D</code></td><td><code>00</code></td></tr>
    <tr><td><code>0206</code></td><td><code>00</code></td><td><code>020E</code></td><td><code>7F</code></td></tr>
    <tr><td><code>0207</code></td><td><code>00</code></td><td><code>020F</code></td><td><code>80</code></td></tr>
  </tbody>
</table>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Navigate the addresses.</strong><small>Always keep an address separate from its contents.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The addresses and contents are correctly located." data-incomplete-message="Complete all four fields." data-retry-message="An address, sequence, or content entry needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Contents at address <code>0204</code></span><input data-answer="D6|0XD6"></label>
      <label class="base-answer-field"><span>Address preceding <code>020A</code></span><input data-answer="0209|0X0209"></label>
      <label class="base-answer-field"><span>Addresses occupied by 32 bits beginning at <code>0206</code></span><input data-answer="0206,0207,0208,0209|0206;0207;0208;0209" placeholder="separated by commas"></label>
      <label class="base-answer-field"><span>First address after that value</span><input data-answer="020A|0X020A"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the addresses</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Interpret the requested values.</strong><small>Use only the locations belonging to each value.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The stored values are correctly reconstructed." data-incomplete-message="Complete all six fields." data-retry-message="A reconstruction or interpretation needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Little-endian 16-bit unsigned integer at <code>0202</code>, in hex</span><input data-answer="012A|0X012A|12A|0X12A"></label>
      <label class="base-answer-field"><span>Same integer in base 10</span><input inputmode="numeric" data-answer="298"></label>
      <label class="base-answer-field"><span>8-bit signed integer at <code>0204</code></span><input inputmode="numeric" data-answer="-42"></label>
      <label class="base-answer-field"><span>Three ASCII characters beginning at <code>020A</code></span><input data-answer="CPU"></label>
      <label class="base-answer-field"><span>Little-endian 32-bit real at <code>0206</code>, as logical hex</span><input data-answer="40500000|0X40500000"></label>
      <label class="base-answer-field"><span>Same real in base 10</span><input data-answer="3.25"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the values</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthesis: follow a read</h2>
<p>The processor executes the simplified instruction <code>LOAD [0202], R1</code>. Use the preceding table.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Match each piece of information to its role.</strong><small>The read copies one byte from RAM to the register.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The memory read is correctly traced." data-incomplete-message="Complete all five fields." data-retry-message="A command, address, value, or destination needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Operation carried by the control bus</span><select data-answer="READ"><option value="">Choose</option><option>Read</option><option>Write</option></select></label>
      <label class="base-answer-field"><span>Value carried by the address bus</span><input data-answer="0202|0X0202"></label>
      <label class="base-answer-field"><span>Value returned on the data bus</span><input data-answer="2A|0X2A"></label>
      <label class="base-answer-field"><span>Destination inside the processor</span><input data-answer="R1"></label>
      <label class="base-answer-field"><span>Component responding to the request</span><select data-answer="RAM|MEMORY"><option value="">Choose</option><option>RAM</option><option>GPU</option><option>SSD</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the transfer</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Evaluate a technical source: an architectural bus or link</h2>
<p><strong>Required topic:</strong> find an official manual, processor specification, or block diagram that documents a bus or link between the processor and memory, graphics, or another component.</p>
<p>Answer the following five prompts in your lab record. <strong>Each response must be no more than two sentences.</strong></p>
<ol>
  <li><strong>Source and publisher:</strong> give the title, manufacturer or publishing organization, and direct link.</li>
  <li><strong>Appropriateness:</strong> explain why this source is suitable for describing that platform or interface.</li>
  <li><strong>Specification:</strong> extract one precise characteristic of the link, such as its name, version, width, lane count, or transfer rate.</li>
  <li><strong>Verification:</strong> compare it with a second source or the role of buses taught in the session.</li>
  <li><strong>Type of statement:</strong> write and clearly label one fact, one inference, and one recommendation concerning this link.</li>
</ol>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Retain all five responses in your lab record.</strong><small>The checkbox confirms that every response follows the two-sentence limit and that the links allow the sources to be found again.</small></span></label>
</div>
</section>

<section class="lab-stage lab-optional">
<h2>Optional practice: after the lab</h2>
<p>Retain your table and work for revision. The Intel processor-milestone research task will be presented separately when its activity specification is published.</p>
</section>
</div>
</div>

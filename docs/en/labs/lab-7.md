# Lab 7 - Observing and Evaluating Boot and Firmware

[Return to Session 7](../sessions/session-7.md)

## Purpose of the lab

This lab asks you to observe, without changing the workstation, the information Windows reports about its manufacturer, model, firmware, boot mode, and Secure Boot. You will then combine those observations with technical documentation to reconstruct a boot sequence, analyze the Orion workstation case, and decide whether a firmware change or update is justified.

The lab treats firmware as a component to **evaluate**, not as a menu to explore at random. Missing information, an unfamiliar option, or a newer version does not automatically establish a problem or justify a recommendation.

## Objectives

By the end of the lab, you should be able to:

- record the manufacturer, model, firmware version, and firmware date of a Windows workstation using read-only tools;
- distinguish an observation reported by Windows from a conclusion that still requires manufacturer documentation;
- reconstruct the main responsibilities of firmware, the boot manager, the operating-system loader, the kernel, and drivers;
- interpret common firmware settings without changing them;
- analyze a boot problem by distinguishing symptom, hypothesis, evidence, and safe action;
- determine whether a firmware update is appropriate from a specific need, release notes, and a recovery method;
- evaluate an official technical source for a real model;
- add firmware, boot-security, and recovery requirements to the evolving specification;
- preserve a permanent record that distinguishes facts, inferences, a provisional recommendation, and open questions.

!!! warning "The progress tracker is not your lab record"
    Checkboxes and answers are stored only in this browser. Preserve commands, output, links, analyses, and recommendations in a document that you control.

!!! warning "Do not change the firmware"
    Do not enter the institutional workstation's setup interface, change the boot order, disable Secure Boot, change the storage-controller mode, enable a memory profile, clear settings, remove the battery, use a reset jumper, or apply an update.

    Every command in this lab is read-only and must be run in a normal PowerShell window without administrator privileges.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-7-en-v2"
  data-gate-template="{done} of {total} commitments acknowledged"
  data-progress-template="{done} of {total} tasks completed"
  data-reset-confirm="Clear this lab's progress from this browser?"
>
  <section class="lab-gate" aria-labelledby="lab-7-gate-title">
    <h2 id="lab-7-gate-title">Working agreement</h2>
    <p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p>

    <div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div>

    <div class="lab-admin-note">
      <strong>Why acknowledge these rules?</strong>
      <p>Administrators often grant access only after conditions of use have been presented and acknowledged. A checked box does not prove that somebody read the text; administrators must therefore make important rules short, specific, and difficult to misunderstand.</p>
    </div>

    <div class="lab-actions">
      <button class="lab-button" type="button" data-lab-unlock disabled>Enter the lab</button>
      <span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span>
    </div>
  </section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Firmware observation is read-only: do not change settings or initiate a BIOS/UEFI update during this lab.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>No-JavaScript mode</strong><p>Check every commitment to reveal the lab. The instructions, commands, tables, and manual activities remain usable, but automatic checking, saved progress, and interactive hints are unavailable. Collapsible answers allow you to check the activities after completing them.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 of 12 tasks completed</p>
<button class="lab-button secondary" type="button" data-lab-reset>Reset</button>
<progress data-lab-progress value="0" max="12">0 of 12</progress>
</div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare your notes</h2>
<p>Create the following headings in your permanent record:</p>
<ul>
  <li><strong>workstation context;</strong></li>
  <li><strong>Windows observations;</strong></li>
  <li><strong>boot sequence;</strong></li>
  <li><strong>settings and consequences;</strong></li>
  <li><strong>Orion case;</strong></li>
  <li><strong>technical source;</strong></li>
  <li><strong>evolving specification;</strong></li>
  <li><strong>synthesis.</strong></li>
</ul>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Prepare the permanent record.</strong><small>Record “Lab 7,” the date, the workstation or scenario studied, and all eight required headings.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observe the workstation without changing its boot process</h2>

<div class="lab-command-note">
  <strong>Read-only commands</strong>
  <p>Open PowerShell or Windows Terminal normally. Cancel any elevation request. Preserve useful output and error messages.</p>
</div>

<p>First record the manufacturer and model:</p>

```powershell
Get-CimInstance Win32_ComputerSystem |
  Select-Object Manufacturer, Model
```

<p>Then record the firmware information reported by Windows:</p>

```powershell
Get-CimInstance Win32_BIOS |
  Select-Object Manufacturer, SMBIOSBIOSVersion, ReleaseDate
```

<p>Finally, open <strong>System Information</strong>:</p>

1. press the Windows key;
2. search for <strong>System Information</strong> or run <code>msinfo32</code>;
3. locate <strong>BIOS Mode</strong> and <strong>Secure Boot State</strong>;
4. do not change a setting or restart the workstation.

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Preserve the raw results.</strong><small>Record the manufacturer, model, reported firmware provider, SMBIOS/BIOS version, reported date, BIOS mode, and Secure Boot state. Use “not reported” when information is missing.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Separate observation from conclusion.</strong><small>Write two directly observed facts, one cautious inference, and two questions that still require manufacturer documentation.</small></span>
  </label>
</div>

!!! example "Example of the distinction"
    **Observation:** System Information displays “BIOS Mode: UEFI.”

    **Reasonable inference:** the system booted through a UEFI path.

    **Unsupported conclusion:** the firmware is current and all its settings are correct.
</section>

<section class="lab-stage" data-lab-stage>
<h2>Reconstruct the boot chain</h2>

<p>Place the responsibilities in the conceptual order studied. Exact names and internal ordering vary by platform; this activity concerns the general transfer of control.</p>

<div class="base-exercise" data-base-exercise
     data-correct-message="The chain of responsibilities has been reconstructed correctly."
     data-incomplete-message="Choose an answer for every stage."
     data-retry-message="At least one responsibility occurs at the wrong stage.">
  <div class="base-answer-grid compact">
    <label class="base-answer-field"><span>1. Executes the first persistent instructions</span><select data-answer="FIRMWARE"><option value="">Choose</option><option>Firmware</option><option>Boot manager</option><option>Operating-system loader</option><option>Kernel</option><option>Operating-system drivers</option></select></label>
    <label class="base-answer-field"><span>2. Selects a boot option</span><select data-answer="BOOT MANAGER"><option value="">Choose</option><option>Firmware</option><option>Boot manager</option><option>Operating-system loader</option><option>Kernel</option><option>Operating-system drivers</option></select></label>
    <label class="base-answer-field"><span>3. Places the kernel and initial data in memory</span><select data-answer="OPERATING-SYSTEM LOADER|OPERATING SYSTEM LOADER"><option value="">Choose</option><option>Firmware</option><option>Boot manager</option><option>Operating-system loader</option><option>Kernel</option><option>Operating-system drivers</option></select></label>
    <label class="base-answer-field"><span>4. Takes control of the main system resources</span><select data-answer="KERNEL"><option value="">Choose</option><option>Firmware</option><option>Boot manager</option><option>Operating-system loader</option><option>Kernel</option><option>Operating-system drivers</option></select></label>
    <label class="base-answer-field"><span>5. Provide complete support for devices</span><select data-answer="OPERATING-SYSTEM DRIVERS|OPERATING SYSTEM DRIVERS"><option value="">Choose</option><option>Firmware</option><option>Boot manager</option><option>Operating-system loader</option><option>Kernel</option><option>Operating-system drivers</option></select></label>
  </div>
  <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the chain</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
</div>

<details>
  <summary>Manual check without JavaScript</summary>
  <ol><li>Firmware</li><li>Boot manager</li><li>Operating-system loader</li><li>Kernel</li><li>Operating-system drivers</li></ol>
</details>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Preserve the reconstructed chain.</strong><small>Copy the complete order into your permanent record and identify it as a conceptual model whose details vary by platform.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Explain one transfer of control.</strong><small>Choose two consecutive stages and explain in two or three sentences what the first must prepare before handing control to the second.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Interpret settings without changing them</h2>

<p>For each scenario, identify the setting involved, one possible consequence, and the evidence required before any change.</p>

<table>
  <thead><tr><th>Scenario</th><th>Likely setting</th><th>Risk of an improvised change</th></tr></thead>
  <tbody>
    <tr><td>A virtual machine cannot enable certain hardware functions.</td><td>Hardware virtualization</td><td>Changing a setting without checking the processor, hypervisor, and workstation policy does not establish the cause.</td></tr>
    <tr><td>A signed diagnostic USB drive does not appear as the first boot option.</td><td>Boot order or one-time boot menu</td><td>Changing the permanent order may accidentally boot another device. This scenario concerns boot order, not a signature refusal by Secure Boot.</td></tr>
    <tr><td>Windows no longer starts after the storage mode was changed.</td><td>Storage-controller mode</td><td>The installed system may not have the expected driver or configuration.</td></tr>
    <tr><td>Memory advertised at a higher transfer rate operates at its reference setting.</td><td>Memory profile or JEDEC settings</td><td>A profile may exceed officially supported settings or become unstable.</td></tr>
    <tr><td>An unsigned boot device is refused.</td><td>Secure Boot and trust policy</td><td>Disabling verification removes a protection without establishing why the device was refused.</td></tr>
  </tbody>
</table>

<div class="base-exercise" data-base-exercise
     data-correct-message="The first checks follow a cautious method."
     data-incomplete-message="Choose a first check for every scenario."
     data-retry-message="Review what can be observed before firmware is changed.">
  <div class="base-answer-grid compact">
    <label class="base-answer-field"><span>Virtualization unavailable</span><select data-answer="CHECK THE PROCESSOR AND HYPERVISOR"><option value="">Choose</option><option>Check the processor and hypervisor</option><option>Enable every advanced option</option><option>Update the BIOS immediately</option></select></label>
    <label class="base-answer-field"><span>Windows fails after a storage-setting change</span><select data-answer="RESTORE THE DOCUMENTED SETTING"><option value="">Choose</option><option>Reinstall Windows immediately</option><option>Restore the documented setting</option><option>Disable Secure Boot</option></select></label>
    <label class="base-answer-field"><span>USB device refused by Secure Boot</span><select data-answer="CHECK THE SIGNATURE AND SOURCE"><option value="">Choose</option><option>Disable Secure Boot</option><option>Check the signature and source</option><option>Clear the trust keys</option></select></label>
  </div>
  <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the first actions</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
</div>

<details>
  <summary>Manual check without JavaScript</summary>
  <ol><li>Check the processor and hypervisor.</li><li>Restore the documented setting.</li><li>Check the device's signature and source.</li></ol>
</details>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Analyze two settings.</strong><small>For two table scenarios, preserve the need, setting involved, risk, required evidence, and a reversible action or reason to make no change.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Diagnose the Orion workstation</h2>

<p>Use only the following information:</p>

<ul>
  <li>a new DDR5 kit has been installed;</li>
  <li>during the first startup, the DRAM light remains on for about 90 seconds;</li>
  <li>the workstation then boots normally;</li>
  <li>later startups are quick;</li>
  <li>the manufacturer offers newer firmware with the single note “improved memory compatibility”;</li>
  <li>a diagnostic USB drive is refused while Secure Boot is active.</li>
</ul>

<div class="lab-admin-note">
  <strong>Do not confuse a hypothesis with evidence.</strong>
  <p>Initial memory training is a plausible explanation for the delay, but the model's manual must confirm the diagnostic-light behaviour and expected duration. The refused USB drive concerns a separate trust policy; it does not establish a RAM fault.</p>
</div>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Build a diagnostic record.</strong><small>Record the observations, two distinct hypotheses, the evidence required for each, and the lowest-risk action that would allow the investigation to progress.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Decide whether the update is justified.</strong><small>Write a provisional recommendation of four to six sentences. Address the precise need, weak release notes, exact model, recovery method, and conditions that could change your decision.</small></span>
  </label>
</div>

!!! question "Control question"
    If the workstation operates normally after its first startup, is the presence of a newer version enough to recommend an update?

??? success "Expected answer"
    No. Establish a relevant benefit for this model and problem, verify detailed release notes and prerequisites, and then evaluate risk and recovery. A newer version is an observation, not a recommendation.
</section>

<section class="lab-stage" data-lab-stage>
<h2>Evaluate an official technical source</h2>

<p>Find the official support page for the observed manufacturer and model. Then locate a firmware release page, manual, or recovery procedure. Do not download or run an update program.</p>

!!! note "When the institutional model is not publicly documented"
    Use a model supplied by the instructor or a personal computer that you can identify precisely. State clearly that the source concerns that replacement model, not the institutional workstation.

<p>Complete the following five parts, using no more than two sentences for each response:</p>

<ol>
  <li><strong>Source and publisher:</strong> exact title, manufacturer or organization, applicable model, and direct link.</li>
  <li><strong>Appropriateness:</strong> why can this source support the claim being checked?</li>
  <li><strong>Specification:</strong> extract one version, date, corrected problem, prerequisite, or recovery method with its context.</li>
  <li><strong>Verification:</strong> compare the information with Windows, a second official page, the manual, or another observation.</li>
  <li><strong>Type of statement:</strong> distinguish a fact, an inference, and a provisional recommendation; explain why no recommendation is justified when evidence is insufficient.</li>
</ol>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Preserve the source evaluation.</strong><small>All five parts are complete, links are direct, and claims remain limited to the model and version actually documented.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Trace the recovery path.</strong><small>Record the documented recovery method, required files or media, power prerequisites, and any limit the source does not allow you to confirm.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Extend the evolving specification</h2>

<p>Add a <strong>Firmware and boot</strong> section to the gaming and live-streaming PC specification begun in Lab 5.</p>

<table>
  <thead><tr><th>Trace to preserve</th><th>Guiding question</th></tr></thead>
  <tbody>
    <tr><td>Relevant requirement</td><td>Which client need makes firmware, Secure Boot, or recovery important?</td></tr>
    <tr><td>Technical criteria</td><td>Which characteristics allow processor support, memory support, updates, and secure boot to be evaluated?</td></tr>
    <tr><td>Compatibility</td><td>Which minimum versions, dependencies, keys, boot modes, or manufacturer procedures constrain the choice?</td></tr>
    <tr><td>Provisional recommendation and open question</td><td>What can be defended now, and which evidence could change the recommendation?</td></tr>
  </tbody>
</table>

<p>Then add one sentence for each lifecycle criterion:</p>

<ul>
  <li><strong>Longevity:</strong> does the manufacturer still publish updates and support the planned components?</li>
  <li><strong>Stability:</strong> which evidence supports predictable boot and operation?</li>
  <li><strong>Efficiency:</strong> does an update or setting provide a useful benefit that justifies time, risk, and resources?</li>
  <li><strong>Maintainability:</strong> can the version be identified, defaults restored, and a documented recovery method used?</li>
</ul>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Add the section to the specification.</strong><small>Preserve all four decision traces and four lifecycle sentences. Do not invent a conclusion when evidence is missing; name the evidence required.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthesis</h2>

<p>Write a 150- to 250-word synthesis answering the following question:</p>

> How can the boot process and firmware of a workstation be evaluated without confusing an observation, a hypothesis, and a reason to modify the platform?

<p>Your synthesis must:</p>

<ul>
  <li>place at least four responsibilities in the boot chain;</li>
  <li>cite two real observations from the workstation or replacement scenario;</li>
  <li>explain why Secure Boot and a firmware update are separate decisions;</li>
  <li>state a provisional recommendation with an open question;</li>
  <li>name a verification or recovery method that is still missing.</li>
</ul>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Complete the synthesis.</strong><small>The synthesis connects observations, sources, risks, and the recommendation; it is not limited to defining BIOS or UEFI.</small></span>
  </label>
</div>
</section>

</div>
</div>

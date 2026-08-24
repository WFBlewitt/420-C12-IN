# Lab 1 - Exploring the Workstation

[Return to Session 1](../sessions/session-1.md)

## Purpose of the lab

This lab guides you through a first methodical examination of the workstation used in class. You will inspect what is visible, gather information through Windows tools, and then use PowerShell to request some of the same information directly from the system.

The work is individual. You may discuss a problem with another person, but you must make your own observations, run your own commands, and write your own notes.

## Objectives

By the end of the lab, you should be able to:

- distinguish the workstation from its visible peripherals;
- collect information without moving or disconnecting equipment;
- use several graphical Windows tools to describe the workstation;
- open PowerShell without administrator privileges and execute read-only commands;
- compare information obtained through observation, a graphical interface, and a command line;
- connect your observations to the working definition of a computer established in Session 1;
- organize a permanent record that retains evidence, method, and uncertainty;
- briefly evaluate a technical source about the observed workstation.

!!! warning "The checklist is not your lab record"
    The page remembers checked boxes locally in this browser, but it does not preserve your answers as a reliable working document. Record every requested observation in a notebook or in a digital document that you control and can find after the session.

## Permanent lab-record template

Reuse this structure in later labs. Adapt it to the task: a simple observation may not require every heading, but your record should make the evidence retrievable, the method understandable, and the distinction between established and uncertain information clear.

Permanent records are not routinely submitted or individually marked unless an activity explicitly states otherwise. They nevertheless remain your reference for projects, assessments, revision, and troubleshooting.

```text
Lab, task, and date:
Starting question or information:
Raw evidence: observations, commands, output, or measurements
Sources: title, publisher, and direct link when required
Method: steps, commands, conversions, calculations, or criteria
Result: required value, unit, width, type, or context
Verification: second method, second source, tool, or taught theory
Interpretation: what the result establishes
Uncertainty: missing information, assumption, or remaining question
Fact:
Inference:
Recommendation:
Brief conclusion:
```

??? example "Completed example — fictional data"
    **Lab, task, and date:** Lab 1, verify memory capacity, September 10.

    **Starting question:** What memory capacity does Windows report?

    **Raw evidence:** Task Manager displays `16.0 GB`. PowerShell returns `17179869184` bytes.

    **Sources:** No external source is required for this observation; both pieces of evidence come from the fictional workstation.

    **Method:** `17179869184 ÷ 2^30 = 16`.

    **Result:** Both tools report a capacity corresponding to `16 GiB`, despite different unit notation in the interface.

    **Verification:** The result calculated from PowerShell agrees with the rounded Task Manager value.

    **Interpretation:** The data establish reported total capacity, but not the memory's DDR generation or transfer rate.

    **Uncertainty:** Module type and part number are not reported in these two results.

    **Fact:** PowerShell returns `17179869184` bytes. **Inference:** Task Manager's `16.0 GB` display likely represents the same capacity calculated in binary units. **Recommendation:** inspect module properties before evaluating an upgrade.

    **Conclusion:** Two methods agree on capacity, but more information is needed to verify compatibility.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-1-en-v4"
  data-gate-template="{done} of {total} commitments acknowledged"
  data-progress-template="{done} of {total} tasks complete"
  data-reset-confirm="Clear this checklist's progress in this browser?"
>
  <section class="lab-gate" aria-labelledby="lab-gate-title">
    <h2 id="lab-gate-title">Working agreement</h2>
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
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Do not open the case, move or disconnect equipment, request elevated privileges, or guess at inaccessible evidence; record an item as inaccessible when it cannot be observed safely.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>No-JavaScript mode</strong><p>Check every commitment to reveal the lab. The instructions and fields remain usable, but automatic checking, saved progress, and interactive hints are unavailable.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 of 22 tasks complete</p>
<button class="lab-button secondary" type="button" data-lab-reset>Reset</button>
<progress data-lab-progress value="0" max="22">0 of 22</progress>
</div>

<details class="lab-guide">
<summary>Guide: Using Windows for the First Time</summary>
<div class="lab-guide-body">
  <ol>
    <li>The bar along the bottom of the screen is the <strong>taskbar</strong>. It contains open applications and shortcuts.</li>
    <li>The button bearing the Windows logo opens the <strong>Start menu</strong>. The key with the same logo on the keyboard performs the same action.</li>
    <li>After opening the Start menu, simply begin typing an application's name to search for it.</li>
    <li>Open a result with a left click. Use the <strong>X</strong> button in the upper corner of a window to close it when you are finished.</li>
    <li>If the screen you see does not match the instructions, do not choose an option at random: stop and ask for help.</li>
  </ol>
</div>
</details>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare Your Notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Create your personal lab record.</strong><small>In a notebook or digital document, reuse the permanent lab-record template, write “Lab 1,” the date, and a title that identifies the workstation you are examining.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observe the Visible Setup</h2>
<p>Remain at your normal working position and do not attempt to reach a concealed or protected area.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Inventory the visible objects.</strong><small>In your notes, separate the workstation, display, keyboard, mouse, and any other peripherals or devices you can observe.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Follow only visible cables.</strong><small>For each observable cable, record the device to which it is connected and, if visible, its destination. Do not try to name a connector you do not yet recognize.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Record accessible identification information.</strong><small>Note any manufacturer, model, or inventory label that can be read without moving equipment. Write “inaccessible” when information cannot be viewed safely.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Apply the definition of a computer.</strong><small>Choose the main workstation and record one example each of an input, stored information or state, followed instruction, and produced result.</small></span>
  </label>
</div>
</section>

<details class="lab-guide">
<summary>Guide: Finding the Tools Used in This Lab</summary>
<div class="lab-guide-body">
  <ol>
    <li><strong>About:</strong> press the Windows key, search for “About your PC,” and open the matching result. You may instead open Settings, choose System, and then choose About.</li>
    <li><strong>System Information:</strong> press the Windows key, search for “System Information,” and open the application with that name.</li>
    <li><strong>Task Manager:</strong> press <kbd>Ctrl</kbd>, <kbd>Shift</kbd>, and <kbd>Esc</kbd> together. If a simplified view appears, choose “More details.” Then open Performance; in Windows 11, this section may be represented by a graph icon.</li>
    <li>Never use an option labelled “Run as administrator” in this lab.</li>
  </ol>
</div>
</details>

<section class="lab-stage" data-lab-stage>
<h2>Query Windows Through Graphical Tools</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Open the About page.</strong><small>Open Windows Settings, then System and About. Do not select an option that requests administrator privileges.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Record device specifications.</strong><small>In your notes, record the device name, processor, installed RAM, and system type.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Record Windows specifications.</strong><small>Record the operating-system edition, version, and build displayed on the same page.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Open System Information.</strong><small>Search for “System Information” from the Start menu. Record the system manufacturer and model, then compare them with visible labels.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Inspect Task Manager.</strong><small>Open the Performance tab and record one useful fact you had not already collected. Do not stop a process or change a setting.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Use PowerShell for the First Time</h2>
<details class="lab-guide">
  <summary>Guide: Entering Your First PowerShell Command</summary>
  <div class="lab-guide-body">
    <ol>
      <li>Press the Windows key and search for “PowerShell.” Open PowerShell or Windows Terminal normally, never as an administrator.</li>
      <li>In Windows Terminal, verify that the open tab says PowerShell. The prompt normally contains the letters <code>PS</code> and ends with the character <code>&gt;</code>.</li>
      <li>Click after the prompt and type only the command shown on the page. Do not type the prompt itself, such as <code>PS C:\Users\Name&gt;</code>.</li>
      <li>Press <kbd>Enter</kbd> to run the command. Wait for the prompt to return before entering another command.</li>
      <li>The character <code>|</code> is called a <strong>vertical bar</strong> or <strong>pipe</strong>. It is neither an uppercase <code>I</code> nor a lowercase <code>l</code>. Its location varies with the keyboard layout; use the Windows On-Screen Keyboard or ask for help if you cannot find it.</li>
      <li>A red error message does not mean that the workstation is damaged. First compare the spelling, spaces, and punctuation with the displayed command. If the cause remains unclear, keep the message visible and ask for help.</li>
    </ol>
  </div>
</details>
<details class="lab-guide">
  <summary>Guide: reading a PowerShell command from left to right</summary>
  <div class="lab-guide-body">
    <p>PowerShell passes <strong>objects</strong>: structured results with properties such as <code>Name</code>, <code>Model</code>, or <code>Version</code>.</p>
    <ol>
      <li><code>Get-CimInstance Win32_ComputerSystem</code> first asks the system to produce an object describing the computer.</li>
      <li>The <code>|</code> symbol passes that object to the command on its right. Here, it can be read as “then pass the result to.”</li>
      <li><code>Select-Object Manufacturer, Model</code> retains only the two requested properties for display.</li>
    </ol>
    <p>Read the line like a sentence: “get the computer description, then pass the result to a command that selects the manufacturer and model.”</p>
  </div>
</details>
<div class="lab-command-note">
  <strong>These commands are read-only.</strong>
  <p>Open PowerShell or Windows Terminal normally. If Windows requests an administrator password or displays an elevation prompt, cancel and ask for help. The text to the left of the cursor is the prompt; it indicates that PowerShell is waiting for a command.</p>
  <p>The commands in this lab must be typed. Copying is disabled so that you pay attention to the words, spaces, vertical bars, and punctuation that form an instruction.</p>
</div>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Open a standard PowerShell session.</strong><small>In your notes, briefly describe what you see in the prompt before entering a command.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Request the date and time.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="Type this command">Get-Date</code><small>Run the command, then explain in your own words what it requested and what PowerShell returned.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Request the workstation name.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="Type this command">$env:COMPUTERNAME</code><small>Compare the result with the device name found in Windows Settings.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Explore the object returned by Get-CimInstance.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="Type this command">Get-CimInstance Win32_ComputerSystem</code><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="Type this command">Get-CimInstance Win32_ComputerSystem | Select-Object *</code><small>First run the command without <code>Select-Object</code>, then run the version containing the asterisk. The first uses PowerShell's default display; the second reveals every accessible property on the object. You do not need to copy them all. Record only three properties you did not previously know about.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Select only the useful properties.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="Type this command">Get-CimInstance Win32_ComputerSystem | Select-Object Manufacturer, Model</code><small>Compare this much more focused result with the two previous outputs. In your notes, explain the role of <code>Select-Object</code> in your own words, then compare the two values with System Information.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Request the processor name.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="Type this command">Get-CimInstance Win32_Processor | Select-Object Name</code><small>Compare the result with the About page.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Request operating-system information.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="Type this command">Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, OSArchitecture</code><small>Compare the three values with the information collected from Windows.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Compare the methods.</strong><small>In your notes, give two examples of information that matched between a graphical interface and PowerShell. Also identify any difference or value you do not yet understand.</small></span>
  </label>
</div>
</section>

<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Evaluate a technical source: the observed workstation</h2>
<p><strong>Required topic:</strong> find a manufacturer page or official support page about the workstation model or one component you identified during this lab.</p>
<p>Answer the following five prompts in your lab record. <strong>Each response must be no more than two sentences.</strong></p>
<ol>
  <li><strong>Source and publisher:</strong> give the title, publishing organization, and direct link.</li>
  <li><strong>Appropriateness:</strong> explain why this source is suitable for checking that model or component.</li>
  <li><strong>Specification:</strong> extract one precise technical characteristic, including its value, unit, and context.</li>
  <li><strong>Verification:</strong> compare it with a second source or an observation obtained through Windows during the lab.</li>
  <li><strong>Type of statement:</strong> write and clearly label one fact, one inference, and one recommendation based on your research.</li>
</ol>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Retain all five responses in your lab record.</strong><small>The checkbox confirms that every response follows the two-sentence limit and that the links allow the sources to be found again.</small></span></label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthesis</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Compare the graphical interface and command line.</strong><small>In your notes, give one advantage of each method for collecting information about a workstation.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Revise your workstation description.</strong><small>Explain in a few sentences how the observed workstation fits our working definition of a computer and why the display, keyboard, or mouse are instead described as peripherals.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Form one remaining question.</strong><small>Record one fact you would like to verify, one difference you cannot yet explain, or one question raised by your examination of the workstation.</small></span>
  </label>
</div>
</section>

<section class="lab-stage lab-optional">
<h2>Optional practice: stretch goals</h2>
<p>If every core task is complete, attempt the following challenges in any order.</p>
<ul>
  <li>Compare one workstation characteristic with the same characteristic on another student's workstation. Do not copy their results; record what is the same, what differs, and one possible reason for that difference.</li>
  <li>Run the following command. Without changing anything, inspect the displayed names and numbers, then write what you think it is showing. We will return to processes later in the course.<code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="Type this command">Get-Process | Select-Object -First 10</code></li>
  <li><strong>Resolution challenge:</strong> begin with the following command and make the final output return <strong>only</strong> the current horizontal and vertical resolutions of the video controller or controllers exposed by Windows.<code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="Type this command">Get-CimInstance Win32_VideoController</code>Use what you have just learned about <code>Select-Object</code>. Depending on the hardware, driver, or session type, Windows may return several rows or leave some values blank; record that result instead of inventing a value.</li>
</ul>
</section>
</div>
</div>

<div class="lab-copyable-library" data-lab-supplement="c12-lab-1-en" hidden markdown="1">

??? info "Copyable commands"
    Typing the commands is part of this lab because it helps you notice their spelling, spaces, punctuation, and structure. Use the copyable versions below if typing presents an accessibility barrier or if the instructor asks you to do so.

    Even when copying a command, read it before pressing Enter and identify the command name, queried class, and requested properties.

    ~~~powershell
    Get-Date
    ~~~

    ~~~powershell
    $env:COMPUTERNAME
    ~~~

    ~~~powershell
    Get-CimInstance Win32_ComputerSystem
    ~~~

    ~~~powershell
    Get-CimInstance Win32_ComputerSystem | Select-Object *
    ~~~

    ~~~powershell
    Get-CimInstance Win32_ComputerSystem | Select-Object Manufacturer, Model
    ~~~

    ~~~powershell
    Get-CimInstance Win32_Processor | Select-Object Name
    ~~~

    ~~~powershell
    Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, OSArchitecture
    ~~~

    ~~~powershell
    Get-Process | Select-Object -First 10
    ~~~

    ~~~powershell
    Get-CimInstance Win32_VideoController
    ~~~

    The completed solution to the resolution challenge is deliberately not provided here.
</div>

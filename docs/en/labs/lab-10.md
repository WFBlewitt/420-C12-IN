# Lab 10 - Observing resources and manipulating a file system

[Return to Session 10](../sessions/session-10.md)

## Purpose of the Lab

You will observe how Windows presents processes, memory, the operating system, and devices on a managed workstation. You will then use Command Prompt inside a temporary folder, reconstruct simplified allocation chains, and prepare a formative comparison of operating-system families.

The Lab requires no administrator privileges. Do not install software, modify drivers, stop services, change security settings, or delete files outside the work folder created for this activity.

## Objectives

By the end of the Lab, you should be able to:

- collect observations about the operating system, processes, and memory with tools available to a standard account;
- distinguish program, process, and service from observable evidence;
- interpret a measurement without confusing a snapshot with a trend;
- use absolute and relative paths in a controlled directory tree;
- create, copy, move, rename, and delete files in a temporary folder;
- reconstruct a cluster chain from a simplified allocation table;
- distinguish fact, inference, provisional recommendation, and missing evidence;
- compare operating-system families using official sources;
- extend the Atlas specification with software, support, and device requirements.

!!! info "Workload signposting"
    The ranges below are **indicative learning-effort estimates**, not guaranteed completion times. The instructor may adjust order, scope, stopping point, or timing according to preparation, troubleshooting, and support needs.

    - **Priority pathway — approximately 85 to 115 minutes of indicative effort:** prepare the record, observe the system, analyze processes, and manipulate the temporary directory tree.
    - **Consolidation — approximately 45 to 70 minutes of indicative effort:** reconstruct allocation chains, compare systems, evaluate a source, and complete the Atlas specification.
    - **Optional extension — approximately 15 to 25 minutes of indicative effort:** solve additional path and allocation scenarios. This work does not count toward required progress.

!!! tip "Usual in-class stopping point"
    Unless the instructor states otherwise, complete the **priority pathway** during the scheduled Lab period. Begin consolidation with the remaining time; the instructor will identify which consolidation tasks must be submitted or continued after class.

!!! warning "Progress is not your permanent record"
    Checkboxes are stored only in this browser. Preserve commands, useful output, calculations, sources, and decisions in a document that you control.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-10-en-v1" data-gate-template="{done} of {total} commitments acknowledged" data-progress-template="{done} of {total} tasks complete" data-reset-confirm="Clear this Lab's progress in this browser?">
<section class="lab-gate" aria-labelledby="lab-10-gate-title">
<h2 id="lab-10-gate-title">Working agreement</h2>
<p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Open the Lab</button><span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Work only in the lab's designated file location and with standard privileges; do not modify system files or global configuration.</p></div>

<noscript>
<div class="lab-no-js-note">
<strong>No-JavaScript mode</strong>
<p>All instructions, commands, tables, and manual activities remain available. Saved progress will not be available. Track tasks in your permanent record and use the collapsible answers to check exercises.</p>
</div>
</noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 of 12 tasks complete</p><button class="lab-button secondary" type="button" data-lab-reset>Reset</button><progress data-lab-progress value="0" max="12">0 of 12</progress></div>

## Priority pathway

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare the permanent record</h2>
<p>Create these headings: <strong>context</strong>, <strong>observed system</strong>, <strong>processes and memory</strong>, <strong>directory tree and commands</strong>, <strong>file allocation</strong>, <strong>system comparison</strong>, <strong>source evaluation</strong>, <strong>Atlas specification</strong>, <strong>lifecycle</strong>, and <strong>synthesis</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Prepare the record.</strong><small>Write “Lab 10,” the date, the workstation used, and the ten headings.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observe the operating system</h2>
<p>Open PowerShell normally without requesting administrator privileges. Cancel any elevation prompt.</p>

```powershell
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsBuildNumber, OsArchitecture, CsSystemType
```

```powershell
Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, BuildNumber, OSArchitecture, LastBootUpTime, FreePhysicalMemory, TotalVisibleMemorySize
```

<p>Record what the tools report. If the two commands use different labels, preserve the difference instead of silently selecting one value.</p>

<p>Answer:</p>

1. Which product, version, architecture, and build number are reported?
2. Which command provides the last boot time?
3. What evidence is still needed to know the exact end-of-support date for this installation?

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve the system record.</strong><small>Include commands, useful values, and at least one interpretation limit.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observe processes and memory</h2>
<p>Run:</p>

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name, Id, CPU, WorkingSet64, Threads
```

```powershell
Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 10 Name, Id, WorkingSet64, CPU
```

<p>Choose one process that appears in at least one list. Wait approximately 20 seconds, then repeat the commands.</p>

<p>In your record:</p>

- give the process name and identifier;
- convert `WorkingSet64` to MiB;
- compare the two snapshots;
- write one <strong>fact</strong>, one <strong>careful inference</strong>, and one item of <strong>additional evidence</strong> needed before concluding that the process has a problem.

!!! info "Interpreting the CPU column"
    In `Get-Process`, `CPU` generally reports cumulative processor time used by the process, not an instantaneous percentage. Use Task Manager if the instructor asks for a real-time percentage.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Compare two snapshots.</strong><small>Preserve the MiB conversion, differences, and an evidence-limited conclusion.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Distinguish program, process, and service</h2>
<p>Choose an application already open on the workstation, such as the browser or text editor.</p>

1. Locate its process or processes in Task Manager or with `Get-Process`.
2. Record the executable path only if the interface exposes it without elevation.
3. Open the services view without stopping or changing anything.
4. Identify one Windows service and record its display name and state.

<p>Explain in three sentences:</p>

- where the program is stored;
- what constitutes the observed process;
- why a service is not merely “another file.”

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Distinguish the three concepts.</strong><small>Support each sentence with an observation and report any inaccessible field.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Create a controlled workspace</h2>
<p>Open Command Prompt normally. Run the following commands one line at a time.</p>

```bat
cd /d %USERPROFILE%
mkdir C12-Lab10
cd C12-Lab10
mkdir notes exercises archives
cd notes
(echo Operating system)>session10.txt
(echo Official source to verify)>sources.txt
cd ..
copy notes\session10.txt exercises\copy.txt
```

<p>Verify the tree:</p>

```bat
cd

tree /f
```

<p>Draw the resulting tree in your record and write the absolute path to `copy.txt`.</p>

!!! warning "Lab-only folder"
    All creation, movement, renaming, and deletion commands in this activity must remain inside `%USERPROFILE%\C12-Lab10`. Before deleting, run `cd` and `dir` to confirm the location.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Create and verify the workspace.</strong><small>Preserve the tree and the absolute path to `copy.txt`.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Use relative and absolute paths</h2>
<p>Move to the `exercises` directory:</p>

```bat
cd /d %USERPROFILE%\C12-Lab10\exercises
```

<p>Without changing directories before every command:</p>

1. display `copy.txt`;
2. display `session10.txt` using a relative path;
3. copy `sources.txt` to `archives` using a relative path;
4. rename `copy.txt` to `allocation.txt`;
5. move `allocation.txt` to `archives`;
6. display the complete tree from the Lab root.

<p>Possible commands: `type`, `copy`, `ren`, `move`, `cd`, `tree`.</p>

<p>Before continuing, your tree should contain:</p>

```text
C12-Lab10
├── archives
│   ├── allocation.txt
│   └── sources.txt
├── exercises
└── notes
    ├── session10.txt
    └── sources.txt
```

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Perform the six actions.</strong><small>Preserve the exact commands and final tree.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Clean only the workspace</h2>
<p>First verify the location and contents:</p>

```bat
cd /d %USERPROFILE%\C12-Lab10
cd
dir
```

<p>Delete only the archived copy of `sources.txt`, then the empty `exercises` directory:</p>

```bat
del archives\sources.txt
rmdir exercises
```

<p>Preserve the remaining tree. Do not delete `C12-Lab10` until the instructor confirms that the permanent record contains the required evidence.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Perform the limited cleanup.</strong><small>Preserve path verification, both commands, and the remaining tree.</small></span></label></div>
</section>

## Consolidation

<section class="lab-stage" data-lab-stage>
<h2>Reconstruct allocation chains</h2>
<p>The following table is a teaching simulation. `END` terminates a file, `FREE` identifies an available unit, and `RESERVED` identifies a unit that cannot be allocated.</p>

| Cluster | Value | Cluster | Value |
|---:|---:|---:|---:|
| 2 | 8 | 8 | 11 |
| 3 | FREE | 9 | 4 |
| 4 | END | 10 | FREE |
| 5 | 12 | 11 | END |
| 6 | RESERVED | 12 | 9 |
| 7 | END | 13 | 7 |

<p>Directory entries report:</p>

| File | First cluster | Logical size |
|---|---:|---:|
| `report.txt` | 2 | 9 KiB |
| `audio.bin` | 5 | 15 KiB |
| `icon.dat` | 13 | 6 KiB |

<p>Cluster size is **4 KiB**.</p>

1. Reconstruct each file chain.
2. Calculate the number of clusters and allocated space.
3. Calculate unused space in each file’s final cluster.
4. Identify which files are fragmented in this model.
5. Explain why fragmentation does not prove corruption.

??? success "Check answers"
    - `report.txt`: `2 → 8 → 11 → END`; 3 clusters; 12 KiB allocated; 3 KiB unused; fragmented.
    - `audio.bin`: `5 → 12 → 9 → 4 → END`; 4 clusters; 16 KiB allocated; 1 KiB unused in the final cluster; fragmented.
    - `icon.dat`: `13 → 7 → END`; 2 clusters; 8 KiB allocated; 2 KiB unused in the final cluster; fragmented in this representation because 13 and 7 are not contiguous.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Analyze the three files.</strong><small>Preserve chains, calculations, fragmentation, and explanation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Compare operating-system families</h2>
<p>This activity prepares the formative discussion completed on personal time. It is not the discussion itself.</p>

<p>Choose <strong>one</strong> scenario:</p>

- a creation and office workstation for a small organization;
- a Web-development workstation used by a mixed team;
- an internal server providing a site, database, and backups;
- a fleet of tablets used for accessible learning activities.

<p>Compare three relevant options among Windows, macOS, a Linux distribution, Windows Server, Android, iOS, or iPadOS. Not every option suits every scenario.</p>

<table>
<thead><tr><th>Criterion</th><th>Option A</th><th>Option B</th><th>Option C</th></tr></thead>
<tbody>
<tr><td>Required applications or services</td><td></td><td></td><td></td></tr>
<tr><td>Hardware and peripheral compatibility</td><td></td><td></td><td></td></tr>
<tr><td>Support cycle and updates</td><td></td><td></td><td></td></tr>
<tr><td>Administration and skills</td><td></td><td></td><td></td></tr>
<tr><td>Security, privacy, and accessibility</td><td></td><td></td><td></td></tr>
<tr><td>Total cost and constraints</td><td></td><td></td><td></td></tr>
<tr><td>Evidence still missing</td><td></td><td></td><td></td></tr>
</tbody>
</table>

<p>Use at least one official source per option. Write a provisional recommendation of four to six sentences that also names one condition that could change it.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Produce the formative comparison.</strong><small>Preserve the scenario, matrix, official links, and provisional recommendation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Evaluate a technical source</h2>
<p>Choose one official page used in your comparison. Answer in no more than two sentences per part.</p>

1. **Source and publisher:** exact title, organization, and direct link.
2. **Appropriateness:** why can this page support the selected criterion?
3. **Specification:** extract one exact, contextualized value, requirement, or statement.
4. **Verification:** compare with a second source, workstation observation, or taught concept.
5. **Type of statement:** write a fact, inference, and recommendation, or explain why no recommendation is justified.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Evaluate the source.</strong><small>Preserve all five parts and both links when verification uses a second page.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Update the Atlas specification</h2>
<p>The Atlas PC targets 1440p gaming and live streaming. Add an <strong>Operating system and support</strong> section containing:</p>

- relevant requirement;
- applications and devices that constrain the choice;
- edition, architecture, or family to verify;
- security and update requirements;
- support period or method for verifying it;
- compatibility with previously selected drivers and hardware;
- provisional recommendation;
- open question that could change the recommendation.

<p>Add one sentence per criterion:</p>

- **Longevity:** will the system remain supported for the expected use period?
- **Stability:** which updates, drivers, or dependencies could threaten predictable operation?
- **Efficiency:** are resource and administration costs justified by the workload?
- **Maintainability:** can the system be diagnosed, updated, and reinstalled without unreasonable difficulty?

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Extend the specification.</strong><small>Preserve requirements, provisional recommendation, open question, and four lifecycle sentences.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Write the synthesis</h2>
<p>Write 180 to 250 words answering:</p>

> How does the operating system connect a process to memory, a file, and a device, and why does that relationship influence system choice?

<p>Your synthesis must include:</p>

- a process;
- a memory allocation;
- a path or allocation chain;
- a driver;
- one operating-system comparison criterion;
- one limit or missing item of evidence.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete the integrated synthesis.</strong><small>Verify that every concept belongs to the same explanatory path.</small></span></label></div>
</section>

## Optional extension

### Path scenarios

From `%USERPROFILE%\C12-Lab10\archives`, write without running:

1. the relative path to `notes\session10.txt`;
2. the absolute path to `archives\allocation.txt`;
3. a command that displays the tree from the Lab root;
4. a command that returns directly to the user profile.

??? success "Possible check"
    1. `..\notes\session10.txt`
    2. `%USERPROFILE%\C12-Lab10\archives\allocation.txt`
    3. `tree %USERPROFILE%\C12-Lab10 /f`
    4. `cd /d %USERPROFILE%`

### Inconsistent chain

A directory entry begins at cluster `20`, and the table reports `20 → 24`, `24 → 20`. Explain why the traversal cannot reach `END` and what category of problem this loop might represent in a simplified model.

</div>
</div>
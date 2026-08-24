# Lab 15 - Completing and verifying a PowerShell system report

[Return to Session 15](../sessions/session-15.md)

## Purpose of the lab

You will complete a guided script that turns observation commands into a structured report. You will then verify CSV and JSON versions rather than assuming that an error-free export is correct.

The required activities are designed for **Windows PowerShell 5.1 in a non-elevated session** on the Windows Server 2022 workstations. You may have an account that can elevate, but elevation is not required for this Lab. Replacement objects keep the activity usable when commands or modules are unavailable.

## Objectives

By the end of the Lab, you should be able to:

- inspect object type and properties;
- explain a filtering, sorting, and selection pipeline;
- preserve results in variables;
- distinguish a normal PowerShell session from an elevated session and explain why this Lab does not require elevation;
- complete a report object from a model;
- describe an unreported value correctly;
- export CSV and JSON;
- re-import files and compare structure;
- create, inspect, run, edit, and rerun a `.ps1` file;
- verify that an observation script can be rerun predictably;
- distinguish script observations from claims requiring technical sources.

!!! info "Workload signposting"
    These are **indicative learning-effort estimates**, not guaranteed deadlines. The instructor may adjust order, scope, stopping point, or fallback according to workstation configuration.

    - **Priority pathway — approximately 85–105 minutes:** prepare workspace, record environment, inspect an object, explain the pipeline, collect or replace source objects, and complete the report.
    - **Required consolidation — approximately 40–60 minutes:** export, re-import, create and verify the `.ps1` file, rerun it, evaluate a source, and write the synthesis.
    - **Optional extension — approximately 15–25 minutes:** run the same script in PowerShell 7 and compare results.

!!! warning "No bypassing"
    Start this Lab in a **non-elevated** PowerShell session. If `.ps1` execution is blocked, preserve the message. Do not change execution policy, install modules, or launch an elevated session merely to bypass the block. Use elevation only if the instructor explicitly asks for it in a separate activity. Otherwise, run the interactive blocks in order or use an instructor-provided signed script.

!!! warning "Progress is not your permanent record"
    Checkboxes are stored only in this browser. Preserve commands, output, errors, files, verification, and reasoning in a document you control.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-15-en-v3" data-gate-template="{done} of {total} commitments acknowledged" data-progress-template="{done} of {total} tasks completed" data-reset-confirm="Clear this Lab's progress in this browser?">
<section class="lab-gate" aria-labelledby="lab-15-gate-title">
<h2 id="lab-15-gate-title">Working agreement</h2>
<p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Open the Lab</button><span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>The script must collect and export information without changing workstation configuration. Complete the required pathway in a non-elevated session; inspect objects before formatting or exporting them.</p></div>

<noscript><div class="lab-no-js-note"><strong>No-JavaScript mode</strong><p>All instructions and code remain visible. Saved progress, unlocking, and reset are unavailable; track tasks in your permanent record.</p></div></noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 of 11 tasks completed</p><button class="lab-button secondary" type="button" data-lab-reset>Reset</button><progress data-lab-progress value="0" max="11">0 of 11</progress></div>

## Priority pathway

<section class="lab-stage" data-lab-stage markdown="1">
<h2 tabindex="-1">Prepare the record and workspace</h2>

Create headings: **environment**, **object**, **pipeline**, **source data**, **report**, **CSV**, **JSON**, **script**, **source**, and **synthesis**.

```powershell
$LabFolder = Join-Path $HOME 'C12-Lab15'
New-Item -ItemType Directory -Path $LabFolder -Force
Set-Location $LabFolder
```

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Prepare workspace and permanent record.</strong><small>Work only inside your user space.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Record environment without changing it</h2>

Start in a normal PowerShell window: do not choose **Run as administrator** for the required pathway.

```powershell
$PSVersionTable
Get-ExecutionPolicy -List
```

Record the version, edition, and displayed policies. Also note in your permanent record that the required pathway is being completed without elevation and explain in one sentence why available administrator access does not make elevation necessary.

Do not try to change a policy merely to remove an unexpected result.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Record the PowerShell environment.</strong><small>A difference between workstations may be a valid observation; additional privilege is not a better observation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Inspect an object without invoking methods</h2>

```powershell
Get-Process | Get-Member
```

Record full type, three properties, and one method name. **Do not invoke the method.** Explain why the default table is not the complete object.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Inspect the process object.</strong><small>Recognize a method without invoking it.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Build and explain a pipeline</h2>

Predict each line before running stages separately and together.

```powershell
Get-Process |
    Where-Object WorkingSet64 -gt 100MB |
    Sort-Object WorkingSet64 -Descending |
    Select-Object -First 10 Name, Id, WorkingSet64
```

Identify tested property, sorting stage, limiting stage, and `WorkingSet64` unit.

Compare:

```powershell
Get-Process | Select-Object -First 5 Name, Id
Get-Process | Select-Object -First 5 Name, Id | Format-Table
```

Explain why `Format-Table` remains at the end of a display pipeline.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Build and explain the pipeline.</strong><small>Preserve an explanation, not only a screenshot.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Collect source objects or use replacements</h2>

```powershell
$Computer = Get-CimInstance Win32_ComputerSystem
$System = Get-CimInstance Win32_OperatingSystem
$Processor = Get-CimInstance Win32_Processor | Select-Object -First 1
```

```powershell
$AdapterName = 'Not reported'
if (Get-Command Get-NetAdapter -ErrorAction SilentlyContinue) {
    $Adapter = Get-NetAdapter -Physical | Where-Object Status -eq 'Up' | Select-Object -First 1
    if ($null -ne $Adapter) { $AdapterName = $Adapter.Name }
}

$DiskName = 'Not reported'
if (Get-Command Get-PhysicalDisk -ErrorAction SilentlyContinue) {
    $Disk = Get-PhysicalDisk | Select-Object -First 1
    if ($null -ne $Disk) { $DiskName = $Disk.FriendlyName }
}
```

If one of the first three CIM commands fails, preserve the error and use:

```powershell
$Computer = [pscustomobject]@{
    Manufacturer = 'Teaching manufacturer'
    Model = ''
    TotalPhysicalMemory = 16GB
}
$System = [pscustomobject]@{
    Caption = 'Teaching Windows'
    Version = '10.0'
}
$Processor = [pscustomobject]@{
    Name = 'Teaching processor'
}
```

Preserve the real error before using replacement data. **Do not use elevation as the first response to a failed command**: the error message is part of the evidence to interpret.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Collect or replace source objects.</strong><small>Replacement data keep the activity working; they do not describe the real workstation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Verify properties and handle an unreported value</h2>

```powershell
$Computer | Get-Member
$System | Get-Member
$Processor | Get-Member
```

```powershell
if ([string]::IsNullOrWhiteSpace($Computer.Model)) {
    $Model = 'Not reported'
}
else {
    $Model = $Computer.Model
}
```

Explain why “Not reported” is not the same as “Absent.”

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Verify properties and handle the value.</strong><small>Do not invent a property name or conclusion.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Complete the report object</h2>

Replace the three `COMPLETE_ME` markers.

```powershell
$Report = [pscustomobject]@{
    ComputerName = $env:COMPUTERNAME
    Manufacturer = $Computer.Manufacturer
    Model = $Model
    OperatingSystem = COMPLETE_ME
    Version = $System.Version
    Processor = COMPLETE_ME
    MemoryGiB = [math]::Round(COMPLETE_ME / 1GB, 1)
    ActiveAdapter = $AdapterName
    PrimaryDisk = $DiskName
}

$Report
```

??? success "Check"
    `$System.Caption`, `$Processor.Name`, and `$Computer.TotalPhysicalMemory`.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete and display the report object.</strong><small>Verify names, values, and units before export.</small></span></label></div>
</section>

## Required consolidation

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Export and re-import CSV</h2>

```powershell
$CsvPath = Join-Path $LabFolder 'system-report.csv'
$Report | Export-Csv -Path $CsvPath -NoTypeInformation -Encoding UTF8
$CsvAgain = Import-Csv $CsvPath
$CsvAgain
$CsvAgain | Get-Member
```

Check property names, values, accented characters, and `MemoryGiB` type before and after import.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Export and verify CSV.</strong><small>No error does not prove that data retained their type.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Export and re-import JSON</h2>

```powershell
$JsonPath = Join-Path $LabFolder 'system-report.json'
$Report | ConvertTo-Json | Set-Content -Path $JsonPath -Encoding UTF8
$JsonAgain = Get-Content -Raw $JsonPath | ConvertFrom-Json
$JsonAgain
$JsonAgain | Get-Member
```

Compare properties and `MemoryGiB` type with the original object and imported CSV.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Export and verify JSON.</strong><small>Re-import structure; do not merely confirm that the file contains text.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Create, run, and rerun the script</h2>

You have already tested the blocks interactively. Now turn the procedure into an actual script file.

### 1. Create the file

Using the text editor available on the workstation, create `system-report.ps1` in `$LabFolder`. Place the tested blocks in this order:

1. purpose comment;
2. workspace preparation;
3. source collection;
4. fallback values;
5. model handling;
6. report object;
7. exports;
8. verification imports.

Add at least three comments that explain the intent of a step.

### 2. Verify the file before running it

Save it as text with the `.ps1` extension, then confirm its name and contents:

```powershell
Get-Item .\system-report.ps1 |
    Select-Object Name, Extension, Length

Get-Content .\system-report.ps1
```

If the file is actually named `system-report.ps1.txt`, correct the name in the editor or File Explorer before continuing.

### 3. Run the script explicitly

While in `$LabFolder`, try:

```powershell
.\system-report.ps1
```

The `.` followed by `\` refers here to a file in the current directory.

- If execution succeeds, preserve the output.
- If execution is blocked, preserve the **exact message**, do not change policy, and do not elevate PowerShell to bypass the block. Run the same interactive blocks in order or use the instructor-provided signed script.

### 4. Edit and verify again

Reopen the file and make **one harmless change**, such as improving the purpose comment. Save it, then use `Get-Content` to confirm that your edit is present.

If `.ps1` execution is permitted, run the file again. Otherwise, replay the corresponding interactive blocks a second time.

### 5. Check repeatability

After the first and second runs, inspect the produced files:

```powershell
Get-ChildItem .\system-report.csv, .\system-report.json |
    Select-Object Name, Length, LastWriteTime
```

Answer in your permanent record:

1. did the second run create additional filenames or refresh the same outputs?
2. what observations show that the procedure can be rerun predictably in this scenario?
3. why would this property matter even more for a script that **changes** accounts, services, or configuration?

!!! note "Repeatable does not mean risk-free"
    This script is mainly an observation and export script. A future administration script must also account for what happens when it runs more than once. In some administration contexts, **idempotence** describes a design where repeating an operation converges on the same intended state rather than accumulating unwanted changes.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Create, inspect, run, and rerun the script.</strong><small>Preserve the file, verification results, and exact message if execution is blocked.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Evaluate a source and write the synthesis</h2>

Evaluate official documentation for one used cmdlet in no more than two sentences per part:

1. **Source and publisher**;
2. **Appropriateness**;
3. **Specification**;
4. **Verification**;
5. **Type of statement**;
6. **Verb and effect**: identify the PowerShell verb in the cmdlet (`Get`, `Set`, `New`, etc.), state whether it suggests observation or modification, then confirm the actual effect from documentation rather than from the name alone.

Then write 150–220 words explaining:

- what automation made more consistent;
- what the second run taught you about script repeatability;
- which values remain unverified;
- which error or limitation was useful;
- why the script does not replace manufacturer sources;
- why elevation was unnecessary for the required pathway;
- one cautious improvement for a future version.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Evaluate the source and write the synthesis.</strong><small>Distinguish observation, automation, authorization, verification, and recommendation.</small></span></label></div>
</section>

</div></div>

<div data-lab-supplement="c12-lab-15-en-v3" hidden>
## Optional extension — PowerShell 7 at home

When `pwsh.exe` is available:

1. compare `$PSVersionTable` in `powershell.exe` and `pwsh.exe`;
2. run the same script without PowerShell 7-only syntax;
3. compare modules, properties, imported types, and encoding;
4. record one difference without claiming one version is universally better.

This activity is optional and does not affect required progress.
</div>
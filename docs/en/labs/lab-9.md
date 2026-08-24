# Lab 9 - Evaluate a storage system and build a data-protection strategy

[Return to Session 9](../sessions/session-9.md)

## Purpose of the lab

You will inspect storage on a Windows workstation, reconstruct the path from physical devices to visible volumes, calculate capacity and transfer time, analyze RAID configurations, and extend the Atlas evolving specification with a storage and recovery strategy.

The Lab requires no partition changes, no formatting, and no administrator privileges. All commands are read-only.

## Objectives

By the end of the Lab, you should be able to:

- collect and interpret storage information with PowerShell;
- distinguish device, disk, partition, volume, and file system;
- calculate visible capacity, transfer time, and RAID capacity;
- compare HDD, SATA SSD, and NVMe SSD options for a workload;
- diagnose a degraded RAID set and explain rebuild risk;
- distinguish RAID, backup, synchronization, versioning, and snapshots;
- evaluate a technical source with a traceable record;
- formulate a provisional storage and recovery recommendation for a client need.

!!! info "Planning guide"
    The times below are **indicative learning-effort estimates**, not guaranteed completion times. The time required varies with preparation, available equipment, troubleshooting, classroom discussion, and support needs. The instructor may adjust the order, scope, stopping point, or timing of the activities.

    - **Priority pathway — approximately 90-120 minutes of indicative effort:** prepare the record, inspect devices, reconstruct logical organization, complete the calculations, and compare technologies.
    - **Consolidation — approximately 45-70 minutes of indicative effort:** analyze RAID, distinguish protection mechanisms, evaluate a source, and complete the Atlas evolving specification.
    - **Optional extension — approximately 15-25 minutes of indicative effort:** explore additional RAID scenarios after the required work. This section does not count toward required progress.

!!! tip "Usual in-class stopping point"
    Unless the instructor states otherwise, complete the **priority pathway** during the scheduled Lab period. Begin consolidation with the remaining time; the instructor will identify which consolidation tasks must be submitted or continued after class.

!!! warning "Progress is not your permanent record"
    Checkboxes are retained only in this browser. Keep commands, results, calculations, sources, and decisions in a document you control.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-9-en-v2" data-gate-template="{done} of {total} commitments acknowledged" data-progress-template="{done} of {total} tasks complete" data-reset-confirm="Clear this Lab's progress in this browser?">
<section class="lab-gate" aria-labelledby="lab-9-gate-title">
<h2 id="lab-9-gate-title">Working agreement</h2>
<p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Open the Lab</button><span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Do not modify workstation volumes, partitions, or data. The workstation may contain boot, recovery, or another operating system's partitions: do not mount, initialize, format, change the state of, or relabel them. RAID and protection scenarios are analysis exercises, not instructions to reconfigure the lab computer.</p></div>
<noscript><div class="lab-no-js-note"><strong>Without JavaScript</strong><p>Instructions, tables, and manual calculations remain available. Saved progress and the interactive RAID planner will not be available; use the manual replacement provided.</p></div></noscript>
<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 of 9 tasks complete</p><button class="lab-button secondary" type="button" data-lab-reset>Reset</button><progress data-lab-progress value="0" max="9">0 of 9</progress></div>

## Priority pathway

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare the permanent record</h2>
<p>Create these headings: <strong>context</strong>, <strong>physical inventory</strong>, <strong>logical organization</strong>, <strong>calculations</strong>, <strong>comparison</strong>, <strong>RAID and protection</strong>, <strong>source evaluation</strong>, <strong>Atlas evolving specification</strong>, and <strong>lifecycle</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Prepare the permanent record.</strong><small>Record “Lab 9,” the date, workstation or scenario, and the nine headings.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observe physical devices</h2>
<p>Open PowerShell normally without requesting administrator privileges. If Windows requests elevation, cancel it. Type the read-only commands and preserve useful output.</p>

```powershell
Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, Size, HealthStatus, OperationalStatus
```

```powershell
Get-Disk | Select-Object Number, FriendlyName, BusType, PartitionStyle, Size, IsBoot, IsSystem, OperationalStatus
```

<p>Record what the tool reports for each device. An empty or generic field does not prove that a characteristic is absent.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve the physical inventory.</strong><small>Include name, reported medium, bus type, capacity, status, and uncertain fields.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Reconstruct the logical organization</h2>
<p>Run the read-only commands:</p>

```powershell
Get-Partition | Select-Object DiskNumber, PartitionNumber, DriveLetter, Type, Size
```

```powershell
Get-Volume | Select-Object DriveLetter, FileSystemLabel, FileSystem, DriveType, HealthStatus, Size, SizeRemaining
```

<p>Choose one visible volume and build a trace:</p>

```text
device or disk → partition table → partition → volume → file system → mount point
```

<p>When the available fields do not prove a link, write “to verify” and name the missing evidence.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Build a logical trace.</strong><small>Include available identifiers, sizes, partition style, file system, and drive letter.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Calculate capacity and transfer time</h2>
<p>Show the formula, units, and rounding.</p>

1. An SSD is advertised as **2 TB**. Convert it to **TiB**.
2. A volume contains **1.35 TB** of data. Estimate the minimum time to copy it at **185 MB/s**.
3. A folder contains **620 GiB**. Estimate the minimum time to copy it at **1.4 GiB/s**.

<p>After each calculation, name one reason why real transfer time or visible capacity may differ.</p>

??? success "Check answers"
    1. `2,000,000,000,000 ÷ 1,099,511,627,776 ≈ 1.82 TiB`.
    2. `1,350,000 MB ÷ 185 MB/s ≈ 7,297 s`, or about **2 h 1 min 37 s**.
    3. `620 GiB ÷ 1.4 GiB/s ≈ 443 s`, or about **7 min 23 s**.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve the three calculations.</strong><small>Each answer must include method, units, rounded result, and a limit of the estimate.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Compare technologies by workload</h2>
<p>The data and prices are fixed instructional values.</p>

| Option | Capacity | Advertised sequential throughput | Random-performance indication | Endurance or use | Cost |
|---|---:|---:|---|---|---:|
| Atlas N4 M.2 NVMe SSD | 2 TB | 7,000/6,000 MB/s read/write | very low latency; 850,000 read IOPS | 1,200 TBW | $170 |
| Atlas S4 2.5-inch SATA SSD | 4 TB | 560/520 MB/s | low latency; 95,000 read IOPS | 2,400 TBW | $360 |
| Atlas H8 3.5-inch HDD | 8 TB | 240 MB/s maximum sustained | mechanical access; 7,200 rpm | desktop/light NAS | $220 |
| Atlas E8 external USB HDD | 8 TB | 200 MB/s maximum sustained | mechanical access | disconnectable local backup | $200 |

<p>Choose one primary option for each need:</p>

- operating system, active games, and current video project;
- four terabytes of rarely modified recordings;
- a local copy disconnected between backups;
- frequent transfer between two computers that do not both have a free M.2 slot.

<p>For **one** need, add an alternative. Justify each decision with at least two criteria.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Compare the four options.</strong><small>Preserve four primary choices and one explained alternative.</small></span></label></div>
</section>

## Consolidation

<section class="lab-stage" data-lab-stage>
<h2>Analyze RAID capacity, failure, and rebuilding</h2>
<p>For each scenario, calculate raw capacity, theoretical usable capacity, tolerance, and status after the incident.</p>

| Scenario | Configuration | Incident |
|---|---|---|
| A | 4 × 6 TB drives in RAID 0 | one drive fails |
| B | 5 × 8 TB drives in RAID 5 | one drive fails; replacement begins |
| C | 6 × 4 TB drives in RAID 10 | two drives fail; mirror pairs are unspecified |

<p>Give a conditional answer for Scenario C. For Scenario B, add the rebuild risk, evidence to monitor, and why a current backup remains necessary.</p>

<div data-raid-planner data-lang="en">
<div class="base-answer-grid">
<label class="base-answer-field"><span>RAID level</span><select data-raid-level><option value="0">RAID 0</option><option value="1">RAID 1</option><option value="5">RAID 5</option><option value="6">RAID 6</option><option value="10">RAID 10</option></select></label>
<label class="base-answer-field"><span>Drive count</span><input data-raid-count type="number" min="2" max="24" step="1" value="4"></label>
<label class="base-answer-field"><span>Capacity per drive (TB)</span><input data-raid-size type="number" min="0.1" max="100" step="0.1" value="4"></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-raid-calculate>Calculate</button></div>
<div class="lab-admin-note" data-raid-output aria-live="polite"><strong>Planner result</strong><p>Select values, then calculate.</p></div>
</div>

<div class="lab-no-js-practice">
<h3>Manual replacement</h3>
<table><thead><tr><th>Level</th><th>Usable capacity</th></tr></thead><tbody>
<tr><td>RAID 0</td><td><code>n × D</code></td></tr>
<tr><td>RAID 1</td><td><code>D</code></td></tr>
<tr><td>RAID 5</td><td><code>(n - 1) × D</code></td></tr>
<tr><td>RAID 6</td><td><code>(n - 2) × D</code></td></tr>
<tr><td>RAID 10</td><td><code>(n ÷ 2) × D</code></td></tr>
</tbody></table>
<details><summary>Scenario checks</summary>
<p><strong>A:</strong> 24 TB raw and usable; no tolerance; the failure compromises the set.</p>
<p><strong>B:</strong> 40 TB raw, 32 TB usable; one failure tolerated; degraded during rebuilding.</p>
<p><strong>C:</strong> 24 TB raw, 12 TB usable; two failures are tolerated when they affect different pairs, but not when both members of one pair fail.</p>
</details>
</div>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Analyze the three RAID scenarios.</strong><small>Preserve calculations, conditions, degraded state, risk, and operational evidence.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Distinguish protection mechanisms</h2>
<p>For each scenario, identify the primary mechanism, the incident it addresses, and one limit.</p>

| Scenario | Classification to produce |
|---|---|
| Two folders automatically show the same state; a deletion is reproduced. | |
| A service can recover daily document versions for 30 days. | |
| Every Friday, an external drive receives a copy and is then disconnected. | |
| A NAS creates a return point before a major update. | |
| Two internal drives permanently contain the same blocks. | |
| An encrypted off-site copy is restored in a test each term. | |

<p>Conclude by explaining why no single mechanism handles every incident.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Classify the six scenarios.</strong><small>Use backup, synchronization, versioning, snapshot, or RAID and name one limit.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Evaluate a technical source</h2>
<p>Choose an official HDD or SSD specification relevant to one Atlas need. Use no more than two sentences per part.</p>

1. **Source and publisher:** exact title, organization or manufacturer, direct link.
2. **Appropriateness:** why the source can support the comparison.
3. **Specification:** one exact value with context and unit.
4. **Verification:** compare with a second source, observation, calculation, or taught theory.
5. **Type of statement:** one fact, one inference, and a provisional recommendation, or explain why no recommendation is justified.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Preserve the five-part evaluation.</strong><small>The decisive specification must be checked with independent evidence.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Extend the Atlas evolving specification and synthesize</h2>
<p>The client already owns a 2 TB NVMe SSD. Planned use:</p>

- operating system, software, and active games: 1.2 TB;
- active video projects: 350 GB;
- recordings: 450 GB now, then 150 GB per month;
- important documents and photos: 250 GB;
- recording retention: 24 months;
- acceptable loss for important documents: at most one day;
- deleted-file recovery: up to 30 days;
- initial budget: CAD 500 before tax, excluding the existing SSD.

| Instructional item | Possible role | Cost |
|---|---|---:|
| Atlas H8 internal 8 TB HDD | recordings and local archive | $220 |
| Atlas E8 external 8 TB HDD | disconnectable local backup | $200 |
| Atlas S4 4 TB SATA SSD | fast active space | $360 |
| Off-site/versioned service | 2 TB; 30-day versions | $12/month |

<p>Calculate recording capacity after 24 months. Propose a strategy that respects the initial budget, or explain the necessary compromise or recurring cost.</p>

<p>Add these entries to the <strong>evolving specification</strong>:</p>

1. **Relevant requirement:** data, growth, acceptable loss, and recovery delay.
2. **Technical criteria:** capacity, workload, cost, retention, independence, and restoration.
3. **Compatibility:** ports, bays, interface, power, network, and operating system to verify.
4. **Provisional recommendation and open question:** what can be defended now and which evidence could change the decision.

<p>Then integrate a **120- to 180-word** synthesis connecting workload, capacity, technology, RAID, and recovery. Finish with one sentence for each lifecycle criterion: <strong>longevity</strong>, <strong>stability</strong>, <strong>efficiency</strong>, and <strong>maintainability</strong>. When evidence is missing, name it.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete the evolving specification and synthesis.</strong><small>Include growth calculation, copy diagram, budget, four traces, four lifecycle sentences, and at least one open question.</small></span></label></div>
</section>

</div>
</div>

<section class="lab-stage lab-optional">
<h2>Optional extension</h2>
<p>After the required work, use the planner to compare two additional RAID configurations. For each, record usable capacity, tolerance, remaining risk, and why an independent backup is still required.</p>
</section>

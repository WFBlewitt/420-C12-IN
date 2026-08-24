# Lab 8 - Designing a Compatible PC Platform Under a Budget Constraint

[Return to Session 8](../sessions/session-8.md)

## Purpose of the lab

You have a teaching budget of **CAD 2,000 before tax** to complete a platform based on a realistic fictional motherboard. You must select a processor, memory, graphics card, primary storage, case, cooler, power supply, and Wi-Fi solution.

The Atlas B860M Creator motherboard is a fixed component whose cost is handled separately. The CAD 2,000 budget covers only the eight components to be selected.

Several configurations can be valid. Your goal is not merely to produce a machine that boots, but to recommend the **best defensible configuration for the client**, considering compatibility, budget, component balance, and upgrade potential.

!!! info "Teaching products and prices"
    All **MeilleurAchat** products, models, prices, and ratings are fictional and fixed for this activity. They are not current retail products or prices.

## Objectives

By the end of the lab, you should be able to:

- extract relevant constraints from a motherboard specification;
- consult a secondary technical catalogue and extract the required evidence;
- eliminate incompatible components using socket, form factor, interface, dimensions, and power requirements;
- build several valid configurations within a fixed budget;
- distinguish product quality from suitability for a particular brief;
- evaluate an official source while distinguishing fact, inference, and recommendation;
- update the evolving specification while considering lifecycle criteria;
- justify a recommendation according to client needs;
- preserve a permanent record of decisions, evidence, and trade-offs.

!!! warning "The progress tracker is not your lab record"
    Interactive choices are stored only in this browser. Preserve your final build, calculations, catalogue pages, and justification in a document you control.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-8-en-v4" data-gate-template="{done} of {total} commitments acknowledged" data-progress-template="{done} of {total} tasks completed" data-reset-confirm="Clear this lab's progress from this browser?">
<section class="lab-gate" aria-labelledby="lab-8-gate-title"><h2 id="lab-8-gate-title">Working agreement</h2><p>Read each commitment. The lab will become available after all three commitments have been acknowledged.</p><div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Assigned use</strong><small>I will use the workstation, network, and course tools only for the assigned learning activities.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Permanent record</strong><small>I will preserve my work, sources, commands, calculations, and reasoning in the permanent record.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Reported uncertainty</strong><small>I will report uncertainty, unexpected results, errors, or safety concerns instead of concealing them.</small></span></label>
</div><div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Enter the lab</button><span data-lab-gate-status aria-live="polite">0 of 3 commitments acknowledged</span></div></section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Use only the supplied teaching data for selection and budgeting; distinguish a confirmed incompatibility from a check that is still required.</p></div>

<noscript>
<div class="lab-no-js-note">
<strong>No-JavaScript mode</strong>
<p>Download the MeilleurAchat catalogue and use the motherboard specification, client brief, and manual worksheet below. The automated report, calculated score, and fifty-computer calculations will not be available, so you must preserve your calculations and apply the decision rules manually.</p>
<h3>Manual verification worksheet</h3>
<table>
<thead><tr><th>Category</th><th>Selected product</th><th>Price</th><th>Catalogue page</th><th>Verification</th><th>Result</th></tr></thead>
<tbody>
<tr><td>Processor</td><td></td><td></td><td></td><td>Socket and firmware condition</td><td></td></tr>
<tr><td>Memory</td><td></td><td></td><td></td><td>DDR5 UDIMM, capacity, and modules</td><td></td></tr>
<tr><td>Graphics card</td><td></td><td></td><td></td><td>Length, thickness, and power connector</td><td></td></tr>
<tr><td>Storage</td><td></td><td></td><td></td><td>NVMe, capacity, and M.2 form</td><td></td></tr>
<tr><td>Case</td><td></td><td></td><td></td><td>microATX support and physical clearances</td><td></td></tr>
<tr><td>Cooling</td><td></td><td></td><td></td><td>LGA1851, dimensions, and capacity</td><td></td></tr>
<tr><td>Power supply</td><td></td><td></td><td></td><td>Wattage, form factor, and connectors</td><td></td></tr>
<tr><td>Wi-Fi</td><td></td><td></td><td></td><td>Wi-Fi hardware actually supplied</td><td></td></tr>
</tbody>
</table>
<p><strong>Total for the eight components:</strong> $______</p>
<p><strong>Budget remaining:</strong> $2,000 - $______ = $______</p>
<h3>Manual decision</h3>
<ul>
<li><strong>Corrections required:</strong> at least one confirmed conflict, one unmet mandatory requirement, or a total above CAD 2,000.</li>
<li><strong>Approvable with reservations:</strong> no confirmed conflict, but required evidence remains missing, especially the installed firmware version.</li>
<li><strong>Approvable:</strong> all mandatory requirements and compatibility evidence are confirmed, and the budget is respected.</li>
</ul>
<p>In your permanent record, state the selected status, the evidence supporting it, and every correction or verification still required. The source-evaluation task in Section 8 still requires an official page or manual from a real manufacturer.</p>
</div>
</noscript>

<div class="lab-content" data-lab-content hidden><div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 of 12 tasks completed</p><button class="lab-button secondary" type="button" data-lab-reset>Reset</button><progress data-lab-progress value="0" max="12">0 of 12</progress></div>

<section class="lab-stage" data-lab-stage><h2 tabindex="-1">Prepare the permanent record</h2><p>Create headings for <strong>client needs</strong>, <strong>motherboard constraints</strong>, <strong>catalogue evidence</strong>, <strong>rejected components</strong>, <strong>final build</strong>, <strong>budget</strong>, <strong>source evaluation</strong>, <strong>evolving specification and lifecycle</strong>, <strong>integrated synthesis</strong>, and <strong>final check</strong>.</p><div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Prepare the record.</strong><small>Record “Lab 8,” the date, and all ten headings.</small></span></label></div></section>

<section class="lab-stage" data-lab-stage><h2>Read the client brief</h2><p>The client wants a 1440p gaming and live-streaming PC and already owns a monitor, keyboard, mouse, and Windows licence.</p><ul><li>maximum budget: <strong>CAD 2,000 before tax</strong>;</li><li>at least <strong>32 GB RAM</strong>;</li><li>at least <strong>2 TB NVMe storage</strong>;</li><li><strong>Wi-Fi</strong> required;</li><li>priority: gaming performance, stability, and realistic upgrades;</li><li>appearance is not important.</li></ul><div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Convert the brief into criteria.</strong><small>Record four mandatory requirements and two criteria for comparing valid builds.</small></span></label></div></section>

<section class="lab-stage" data-lab-stage><h2>Read the motherboard specification</h2><h3>Atlas B860M Creator</h3><table><thead><tr><th>Item</th><th>Specification</th></tr></thead><tbody><tr><td>Form factor</td><td>microATX, 244 x 244 mm</td></tr><tr><td>Socket / chipset</td><td>Intel LGA1851 / B860</td></tr><tr><td>Processors</td><td>Desktop Intel Core Ultra LGA1851; Core Ultra 7 265K supported from firmware 1205</td></tr><tr><td>Installed firmware version</td><td>Unknown — must be verified before purchase approval</td></tr><tr><td>Memory</td><td>4 DDR5 UDIMM slots, dual channel, 192 GB maximum; two modules in A2 and B2</td></tr><tr><td>PCIe</td><td>1 x PCIe 5.0 x16; 1 x PCIe 4.0 x4 physical x16; 1 x PCIe 4.0 x1</td></tr><tr><td>M.2</td><td>M.2_1: 2280 PCIe 5.0 x4; M.2_2: 2242/2260/2280 PCIe 4.0 x4</td></tr><tr><td>SATA</td><td>4 SATA ports; M.2_2 disables none</td></tr><tr><td>Networking</td><td>2.5 Gbit/s Ethernet; no integrated Wi-Fi</td></tr><tr><td>Power</td><td>24-pin ATX + 8-pin CPU EPS</td></tr><tr><td>Internal headers</td><td>10 Gbit/s front USB-C; 3 chassis-fan headers</td></tr></tbody></table><div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Extract the constraints.</strong><small>Record socket, memory type and form, possible case formats, accepted M.2 lengths, and lack of Wi-Fi.</small></span></label><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Identify conditional checks.</strong><small>State which CPU requires minimum firmware and what evidence is required before purchase.</small></span></label></div></section>

<section class="lab-stage" data-lab-stage markdown="1"><h2>Consult the MeilleurAchat catalogue</h2>
<p><a class="md-button md-button--primary" href="../../../assets/catalogues/meilleurachat-hardware-catalogue.pdf" download>Download the MeilleurAchat catalogue (PDF)</a></p>

!!! info "Two documents, two roles"
    The Atlas B860M Creator specification above defines the platform. The MeilleurAchat catalogue describes general inventory for many platforms, so it deliberately includes products that do not fit this motherboard.

<p>Before building, identify at least one incompatible option in each of these categories: CPU, memory, storage, case, and cooling. For each rejection, record the catalogue page and the property that conflicts with the motherboard specification or client brief.</p><div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Justify five rejections using two documents.</strong><small>Each justification must cite one Atlas specification and one MeilleurAchat catalogue value.</small></span></label></div></section>

<section class="lab-stage" data-lab-stage markdown="1"><h2>Build and submit a configuration</h2>
!!! info "Use only the supplied data"
    No prior knowledge of graphics-card, SSD, or cooler performance is required. Use the motherboard specification, client brief, and MeilleurAchat catalogue.

<p>Select one item in every category. The running total and remaining budget remain visible, but the system reveals <strong>no errors, reservations, or scores</strong> before the complete build is submitted.</p>

<p>On submission, MeilleurAchat produces a report for a simulated order of <strong>50 computers</strong>. An incompatibility reports the value of affected hardware. A disproportionate expense instead reports the potentially avoidable premium over an adequate option.</p>

<div data-pc-build data-lang="en" data-budget="2000"><div class="base-answer-grid">
<label class="base-answer-field"><span>Processor</span><select data-build-select="cpu"><option value="">Choose</option><option value="ultra5">Core Ultra 5 225 - $359</option><option value="ultra7">Core Ultra 7 265K - $529</option><option value="i7">Core i7-14700K - $399</option><option value="ryzen7">Ryzen 7 9700X - $429</option></select></label>
<label class="base-answer-field"><span>Memory</span><select data-build-select="ram"><option value="">Choose</option><option value="ddr5_32">32 GB DDR5-6000 (2 x 16) - $139</option><option value="ddr5_64">64 GB DDR5-6000 (2 x 32) - $239</option><option value="single32">32 GB DDR5-6000 (1 x 32) - $129</option><option value="ddr4">32 GB DDR4-3600 - $99</option><option value="sodimm">32 GB DDR5-5600 SO-DIMM - $119</option></select></label>
<label class="base-answer-field"><span>Graphics card</span><select data-build-select="gpu"><option value="">Choose</option><option value="rtx5060">RTX 5060 8 GB - $499</option><option value="rtx5070">RTX 5070 12 GB - $749</option><option value="rx9070">RX 9070 16 GB - $799</option><option value="rx7600">RX 7600 8 GB - $379</option></select></label>
<label class="base-answer-field"><span>Primary storage</span><select data-build-select="storage"><option value="">Choose</option><option value="nvme2">2 TB PCIe 4.0 NVMe SSD - $159</option><option value="nvme1">1 TB PCIe 4.0 NVMe SSD - $89</option><option value="gen5_2">2 TB PCIe 5.0 NVMe SSD - $269</option><option value="sata2">2 TB SATA SSD - $139</option><option value="m2230">1 TB M.2 2230 NVMe SSD - $129</option></select></label>
<label class="base-answer-field"><span>Case</span><select data-build-select="case"><option value="">Choose</option><option value="matx">Northstar M300 - $109</option><option value="compact">Metro M280 - $89</option><option value="itx">Pocket S1 - $149</option><option value="atx">Atlas A500 - $129</option></select></label>
<label class="base-answer-field"><span>Cooling</span><select data-build-select="cooler"><option value="">Choose</option><option value="tower">Boreal Tower 158 - $59</option><option value="low">Boreal Low 67 - $49</option><option value="aio">Boreal 240 mm liquid - $139</option><option value="am5">Summit Tower - $54</option></select></label>
<label class="base-answer-field"><span>Power supply</span><select data-build-select="psu"><option value="">Choose</option><option value="p550">550 W Bronze - $79</option><option value="p650">650 W Gold - $109</option><option value="p750">750 W Gold - $129</option><option value="p1000">1000 W Gold - $199</option><option value="sfx750">750 W Gold SFX - $189</option></select></label>
<label class="base-answer-field"><span>Wi-Fi</span><select data-build-select="wifi"><option value="">Choose</option><option value="included">Integrated Wi-Fi 6E - $0</option><option value="pcie">PCIe x1 Wi-Fi 6E card - $49</option><option value="usb">USB Wi-Fi 5 adapter - $29</option><option value="none">No Wi-Fi hardware - $0</option></select></label>
</div><div class="lab-admin-note"><strong>Total: <span data-build-total>$0</span></strong><p>Budget remaining: <span data-build-remaining>$2,000</span></p><p data-build-score></p><div data-build-feedback aria-live="polite"><p>The report will be produced only after the complete configuration is submitted.</p></div></div><div class="lab-actions"><button class="lab-button" type="button" data-build-check>Submit configuration for approval</button></div></div>

<h3>Published index calculation</h3>
<p>Every product has a LaboPerformance score out of 10, comparable only with other products in the same category. The eight scores produce a maximum of 80 points. The only possible suitability adjustments are published here:</p>
<ul><li><strong>-1 point</strong>: 2 TB PCIe 5.0 SSD when its premium adds little value to the brief;</li><li><strong>-1 point</strong>: 1000 W PSU when its capacity substantially exceeds the configuration's requirements.</li></ul>
<p>The single-module memory product already has a lower product rating in the catalogue because of its reduced initial bandwidth; no additional secret penalty is applied.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check data-build-auto-task disabled><span><strong>Produce an approvable build.</strong><small>Every category must be filled, all requirements met, and the budget respected.</small></span></label></div></section>

<section class="lab-stage" data-lab-stage><h2>Find a better build</h2><p>Create at least one second approvable build. Compare product ratings, memory, storage, power supply, Wi-Fi, remaining budget, report reservations, and future upgrades.</p><div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Compare two builds.</strong><small>Preserve their parts, totals, and reports, then explain at least two trade-offs.</small></span></label></div></section>

<section class="lab-stage" data-lab-stage><h2>Diagnose a weak build</h2><p>A colleague proposes: Core Ultra 5, 64 GB DDR5, RTX 5060, 2 TB PCIe 5.0 SSD, ATX case, 240 mm liquid cooler, 1000 W PSU, and PCIe Wi-Fi.</p><div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Improve the budget allocation.</strong><small>Identify at least three oversized or low-priority expenses, calculate their effect across 50 computers, and propose a stronger gaming build under CAD 2,000.</small></span></label></div></section>

<section class="lab-stage" data-lab-stage><h2>Evaluate a real technical source</h2><p>Choose an official processor-support list or manual page published by the manufacturer of a real motherboard. Prefer a document that states a compatibility condition, such as a minimum BIOS or firmware version. This source proves nothing about the fictional Atlas board; it is used to analyse how a manufacturer documents a support condition.</p><p>Answer the following five parts, using no more than two sentences for each:</p><ol><li><strong>Source and publisher:</strong> give the exact document title, manufacturer, and direct link.</li><li><strong>Appropriateness:</strong> explain why this source can support the selected check.</li><li><strong>Specification:</strong> extract one exact technical value or statement with its context.</li><li><strong>Verification:</strong> compare it with a second official source, an observation, a calculation, or taught theory.</li><li><strong>Type of statement:</strong> state a fact, an inference, and a practical recommendation, or explain why no recommendation is justified.</li></ol><div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete the five-part source evaluation.</strong><small>Preserve the direct link and clearly separate what the document states, what you infer, and what you recommend.</small></span></label></div></section>

<section class="lab-stage" data-lab-stage><h2>Update the evolving specification</h2><p>Add a <strong>Motherboard and build logic</strong> section to the evolving specification begun in Lab 5. Record the fixed motherboard, the eight selected components, the total, essential compatibility evidence, any open condition, and one realistic future upgrade.</p><p>Then add one sentence for each lifecycle criterion:</p><ul><li><strong>Longevity:</strong> what upgrade path remains realistic, and what support uncertainty must remain visible?</li><li><strong>Stability:</strong> what evidence supports predictable boot and operation?</li><li><strong>Efficiency:</strong> are budget allocation, power, and cooling proportionate to the brief?</li><li><strong>Maintainability:</strong> can versions be identified, standard parts replaced, and an update or recovery method documented?</li></ul><div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Update the evolving specification.</strong><small>Preserve the build, evidence, open questions, upgrade, and all four lifecycle sentences.</small></span></label></div></section>

<section class="lab-stage" data-lab-stage><h2>Integrated synthesis and final recommendation</h2><p>Write a 180-250 word synthesis for the client and add it to the updated evolving specification. It must connect needs, constraints, evidence, trade-offs, and the decision rather than present an isolated final answer.</p><p>Include:</p><ul><li>the final list and total;</li><li>the compatibility-evidence chain linking the Atlas specification and catalogue;</li><li>two trade-offs and one realistic future upgrade;</li><li>one open verification and the evidence needed to close it;</li><li>one methodological lesson from evaluating the real source, without using it as evidence about the Atlas board;</li><li>at least two precise catalogue references.</li></ul><div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete the integrated synthesis.</strong><small>Explain why the build meets the brief, what remains to be verified, and how the evidence supports the recommendation.</small></span></label></div></section>

<section class="lab-stage" data-lab-stage><h2>Final check</h2><ul class="lab-completion-list"><li>budget respected;</li><li>LGA1851 socket;</li><li>DDR5 UDIMM;</li><li>at least 2 TB M.2 2280 NVMe storage;</li><li>case supports microATX and component dimensions;</li><li>sufficient LGA1851 cooling;</li><li>adequate PSU wattage, form factor, and GPU connector;</li><li>Wi-Fi actually provided;</li><li>catalogue evidence preserved;</li><li>real source evaluated in five parts;</li><li>evolving specification and lifecycle updated;</li><li>client-focused synthesis with visible uncertainty.</li></ul><div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complete the final check.</strong><small>Correct any contradiction among your table, MeilleurAchat report, total, evidence, evolving specification, and synthesis.</small></span></label></div></section>
</div></div>

# Lab 2 - Representing a Value in Bases 2, 10, and 16

[Return to Session 2](../sessions/session-2.md)

## Purpose of the lab

This lab provides practice converting among bases 2, 10, and 16. You will begin by recognizing symbols and positions, then complete conversions and verify that one value is preserved across three representations.

The work is individual. You may compare a method with another person, but you must perform your own calculations and keep your own work.

## Objectives

By the end of the lab, you should be able to:

- recognize a valid numeral in a stated base;
- expand a numeral using powers of its base;
- convert a binary or hexadecimal integer to base 10;
- convert a decimal integer to base 2 by decomposing it into powers of two;
- convert directly between bases 2 and 16 using groups of four bits;
- preserve positional zeros correctly and respect a required width;
- check a conversion with a second method and explain an error;
- briefly evaluate a technical source that uses hexadecimal notation.

!!! warning "The checklist is not your lab record"
    Checked boxes are stored only in this browser. Record every table, calculation, grouping, answer, and explanation in a notebook or in a digital document that you control.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-2-en-v4"
  data-gate-template="{done} of {total} commitments acknowledged"
  data-progress-template="{done} of {total} tasks complete"
  data-reset-confirm="Clear this checklist's progress in this browser?"
>
  <section class="lab-gate" aria-labelledby="lab-2-gate-title">
    <h2 id="lab-2-gate-title">Working agreement</h2>
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
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Complete the requested conversions yourself before using automatic checking; preserve width, positional zeros, method, and units in your notes.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>No-JavaScript mode</strong><p>Check every commitment to reveal the lab. The instructions and fields remain usable, but automatic checking, saved progress, and interactive hints are unavailable. A finite manual practice set replaces the generator.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 of 22 tasks complete</p>
<button class="lab-button secondary" type="button" data-lab-reset>Reset</button>
<progress data-lab-progress value="0" max="22">0 of 22</progress>
</div>

<details class="lab-guide">
<summary>Guide: presenting a checkable conversion</summary>
<div class="lab-guide-body">
  <ol>
    <li>Write the starting value and its base.</li>
    <li>Name the selected method: positional expansion, powers of two, or grouping by four.</li>
    <li>Show the intermediate steps in order.</li>
    <li>Write the answer and its base.</li>
    <li>Check that the value, scale, and number of positions are plausible.</li>
  </ol>
</div>
</details>

<div class="lab-admin-note">
<strong>Essential route and consolidation</strong>
<p>During the scheduled lab, follow the route from “Prepare your notes” through “Connect three representations,” then complete “Synthesis.” “Diagnose errors” is consolidation: complete it after the essential route or continue it after class. The progress display preserves both levels of work.</p>
</div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare your notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Create your personal lab record.</strong><small>Write “Lab 2,” the date, and three columns titled “base 2,” “base 10,” and “base 16.” You will use these columns to compare representations.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Recognize numerals</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Classify the valid numerals.</strong><small>For each of the following forms, state whether it is valid in the given base and justify every “invalid” answer: <code>101011</code><sub>2</sub>, <code>2101</code><sub>2</sub>, <code>708</code><sub>10</sub>, <code>12A</code><sub>10</sub>, <code>7E0</code><sub>16</sub>, and <code>FACE</code><sub>16</sub>.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="All classifications are correct." data-incomplete-message="Choose an answer in every field." data-retry-message="Some classifications need another look.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span><code>101011</code><sub>2</sub></span><select data-answer="VALID"><option value="">Choose</option><option>Valid</option><option>Invalid</option></select></label>
      <label class="base-answer-field"><span><code>2101</code><sub>2</sub></span><select data-answer="INVALID"><option value="">Choose</option><option>Valid</option><option>Invalid</option></select></label>
      <label class="base-answer-field"><span><code>708</code><sub>10</sub></span><select data-answer="VALID"><option value="">Choose</option><option>Valid</option><option>Invalid</option></select></label>
      <label class="base-answer-field"><span><code>12A</code><sub>10</sub></span><select data-answer="INVALID"><option value="">Choose</option><option>Valid</option><option>Invalid</option></select></label>
      <label class="base-answer-field"><span><code>7E0</code><sub>16</sub></span><select data-answer="VALID"><option value="">Choose</option><option>Valid</option><option>Invalid</option></select></label>
      <label class="base-answer-field"><span><code>FACE</code><sub>16</sub></span><select data-answer="VALID"><option value="">Choose</option><option>Valid</option><option>Invalid</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check classifications</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
    <small class="base-auto-note">This task is checked automatically when every field is correct.</small>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Repair two invalid numerals.</strong><small>Choose two invalid cases from the previous task. Change one symbol in each to produce a valid numeral in the same base. You do not need to preserve the original value because it was not defined in that base.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Use positional values</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Build a table of eight binary positions.</strong><small>From left to right, write the powers of 2 from exponent 7 through exponent 0, followed by their decimal values. Check that the final column is worth 1.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Convert <code>110101</code><sub>2</sub> to base 10.</strong><small>Align the bits with the correct powers, write every multiplication, then add the contributions. Do not keep only the positions containing 1 in your first line.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The binary expansion and total are correct." data-incomplete-message="Complete every position, contribution, and the total." data-retry-message="Some positions or contributions need another look.">
    <p>Complete every column before requesting feedback.</p>
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Value below bit 1</span><input inputmode="numeric" data-answer="32"></label>
      <label class="base-answer-field"><span>Value below bit 1</span><input inputmode="numeric" data-answer="16"></label>
      <label class="base-answer-field"><span>Value below bit 0</span><input inputmode="numeric" data-answer="8"></label>
      <label class="base-answer-field"><span>Value below bit 1</span><input inputmode="numeric" data-answer="4"></label>
      <label class="base-answer-field"><span>Value below bit 0</span><input inputmode="numeric" data-answer="2"></label>
      <label class="base-answer-field"><span>Value below bit 1</span><input inputmode="numeric" data-answer="1"></label>
    </div>
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Contribution 1</span><input inputmode="numeric" data-answer="32"></label>
      <label class="base-answer-field"><span>Contribution 2</span><input inputmode="numeric" data-answer="16"></label>
      <label class="base-answer-field"><span>Contribution 3</span><input inputmode="numeric" data-answer="0"></label>
      <label class="base-answer-field"><span>Contribution 4</span><input inputmode="numeric" data-answer="4"></label>
      <label class="base-answer-field"><span>Contribution 5</span><input inputmode="numeric" data-answer="0"></label>
      <label class="base-answer-field"><span>Contribution 6</span><input inputmode="numeric" data-answer="1"></label>
      <label class="base-answer-field"><span>Base-10 total</span><input inputmode="numeric" data-answer="53"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the expansion</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Convert <code>4C7</code><sub>16</sub> to base 10.</strong><small>First write the decimal value of each hexadecimal digit, then use the powers of 16 associated with the three positions.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The hexadecimal expansion and total are correct." data-incomplete-message="Complete every value, contribution, and the total." data-retry-message="Some digits, positions, or products need another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Decimal values of <code>4, C, 7</code></span><input data-answer="4,12,7|4;12;7" placeholder="e.g. 1, 2, 3"></label>
      <label class="base-answer-field"><span>Positional values</span><input data-answer="256,16,1|256;16;1" placeholder="left to right"></label>
      <label class="base-answer-field"><span>Contributions</span><input data-answer="1024,192,7|1024;192;7" placeholder="left to right"></label>
      <label class="base-answer-field"><span>Base-10 total</span><input inputmode="numeric" data-answer="1223"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the expansion</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Check the scales.</strong><small>For each previous answer, give a reasonable lower and upper bound based on the leftmost position. Explain why your result lies between them.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Move directly between binary and hexadecimal</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Reconstruct the table for one group of four bits.</strong><small>Without copying it directly, write the configurations from <code>0000</code> through <code>1111</code> and associate them with the hexadecimal digits <code>0</code> through <code>F</code>. Then compare your table with Session 2.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The four-bit table is complete." data-incomplete-message="Complete all sixteen correspondences." data-retry-message="At least one correspondence needs another look.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span><code>0000</code></span><input inputmode="text" maxlength="1" data-answer="0" aria-label="Hexadecimal for 0000"></label>
      <label class="base-answer-field"><span><code>0001</code></span><input inputmode="text" maxlength="1" data-answer="1" aria-label="Hexadecimal for 0001"></label>
      <label class="base-answer-field"><span><code>0010</code></span><input inputmode="text" maxlength="1" data-answer="2" aria-label="Hexadecimal for 0010"></label>
      <label class="base-answer-field"><span><code>0011</code></span><input inputmode="text" maxlength="1" data-answer="3" aria-label="Hexadecimal for 0011"></label>
      <label class="base-answer-field"><span><code>0100</code></span><input inputmode="text" maxlength="1" data-answer="4" aria-label="Hexadecimal for 0100"></label>
      <label class="base-answer-field"><span><code>0101</code></span><input inputmode="text" maxlength="1" data-answer="5" aria-label="Hexadecimal for 0101"></label>
      <label class="base-answer-field"><span><code>0110</code></span><input inputmode="text" maxlength="1" data-answer="6" aria-label="Hexadecimal for 0110"></label>
      <label class="base-answer-field"><span><code>0111</code></span><input inputmode="text" maxlength="1" data-answer="7" aria-label="Hexadecimal for 0111"></label>
      <label class="base-answer-field"><span><code>1000</code></span><input inputmode="text" maxlength="1" data-answer="8" aria-label="Hexadecimal for 1000"></label>
      <label class="base-answer-field"><span><code>1001</code></span><input inputmode="text" maxlength="1" data-answer="9" aria-label="Hexadecimal for 1001"></label>
      <label class="base-answer-field"><span><code>1010</code></span><input inputmode="text" maxlength="1" data-answer="A" aria-label="Hexadecimal for 1010"></label>
      <label class="base-answer-field"><span><code>1011</code></span><input inputmode="text" maxlength="1" data-answer="B" aria-label="Hexadecimal for 1011"></label>
      <label class="base-answer-field"><span><code>1100</code></span><input inputmode="text" maxlength="1" data-answer="C" aria-label="Hexadecimal for 1100"></label>
      <label class="base-answer-field"><span><code>1101</code></span><input inputmode="text" maxlength="1" data-answer="D" aria-label="Hexadecimal for 1101"></label>
      <label class="base-answer-field"><span><code>1110</code></span><input inputmode="text" maxlength="1" data-answer="E" aria-label="Hexadecimal for 1110"></label>
      <label class="base-answer-field"><span><code>1111</code></span><input inputmode="text" maxlength="1" data-answer="F" aria-label="Hexadecimal for 1111"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the table</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
    <small class="base-auto-note">This task is checked automatically when all sixteen correspondences are correct.</small>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Convert <code>101111000101</code><sub>2</sub> to base 16.</strong><small>Separate the bits into groups of four beginning on the right, show the groups, and replace each one with a hexadecimal digit.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The groups and hexadecimal representation are correct." data-incomplete-message="Complete the groups, digits, and final answer." data-retry-message="At least one group or digit needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Binary groups</span><input data-answer="1011,1100,0101|1011;1100;0101" placeholder="left to right"></label>
      <label class="base-answer-field"><span>Hexadecimal digits</span><input data-answer="B,C,5|B;C;5" placeholder="left to right"></label>
      <label class="base-answer-field"><span>Final answer</span><input data-answer="BC5|0XBC5"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the groups</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Convert <code>A05</code><sub>16</sub> to base 2.</strong><small>Replace each digit with exactly four bits. Preserve the group that corresponds to the zero in the middle.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="All three groups and the binary representation are correct." data-incomplete-message="Complete the groups and final answer." data-retry-message="At least one binary group needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Group for <code>A</code></span><input inputmode="numeric" maxlength="4" data-answer="1010"></label>
      <label class="base-answer-field"><span>Group for <code>0</code></span><input inputmode="numeric" maxlength="4" data-answer="0000"></label>
      <label class="base-answer-field"><span>Group for <code>5</code></span><input inputmode="numeric" maxlength="4" data-answer="0101"></label>
      <label class="base-answer-field"><span>Final answer</span><input inputmode="numeric" data-answer="101000000101|1010,0000,0101"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the groups</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Explain the role of zeros.</strong><small>In your own words, explain why zeros may be added at the far left of an integer but a <code>0000</code> group between two other groups cannot be removed.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Build a binary representation</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Represent <code>45</code><sub>10</sub> in binary.</strong><small>Use the powers-of-two method. Show every power examined and every remainder, then write both the minimum representation and the eight-bit representation.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The decomposition of 45 and its representations are correct." data-incomplete-message="Complete the powers, remainders, and representations." data-retry-message="The decomposition or one representation needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Selected powers</span><input data-answer="32,8,4,1|32;8;4;1" placeholder="largest to smallest"></label>
      <label class="base-answer-field"><span>Remainders after subtraction</span><input data-answer="13,5,1,0|13;5;1;0" placeholder="in order"></label>
      <label class="base-answer-field"><span>Minimum binary</span><input inputmode="numeric" data-answer="101101"></label>
      <label class="base-answer-field"><span>Eight-bit binary</span><input inputmode="numeric" maxlength="8" data-answer="00101101"></label>
      <label class="base-answer-field"><span>Hexadecimal</span><input data-answer="2D|0X2D"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the construction</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Represent <code>157</code><sub>10</sub> in eight bits.</strong><small>Begin by predicting the leftmost bit. Then perform the subtractions and preserve a zero for every skipped power.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The decomposition of 157 and its representations are correct." data-incomplete-message="Complete the powers, remainders, and representations." data-retry-message="The decomposition or one representation needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Selected powers</span><input data-answer="128,16,8,4,1|128;16;8;4;1" placeholder="largest to smallest"></label>
      <label class="base-answer-field"><span>Remainders after subtraction</span><input data-answer="29,13,5,1,0|29;13;5;1;0" placeholder="in order"></label>
      <label class="base-answer-field"><span>Eight-bit binary</span><input inputmode="numeric" maxlength="8" data-answer="10011101"></label>
      <label class="base-answer-field"><span>Hexadecimal</span><input data-answer="9D|0X9D"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the construction</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Produce and check the hexadecimal forms.</strong><small>Group both binary answers into groups of four. Then check the resulting hexadecimal values using an expansion in powers of 16.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Connect three representations</h2>
<p>The three tasks in this section concern a new value, <code>0xB6</code>. Keep all steps side by side in your notes without copying the integrated check from Session 2.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Produce the eight-bit binary representation.</strong><small>Treat the digits <code>B</code> and <code>6</code> separately, then join their two four-bit groups.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="All three representations of 0xB6 agree." data-incomplete-message="Complete both groups, the representation, and both totals." data-retry-message="At least one step in the cross-check needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Group for <code>B</code></span><input inputmode="numeric" maxlength="4" data-answer="1011"></label>
      <label class="base-answer-field"><span>Group for <code>6</code></span><input inputmode="numeric" maxlength="4" data-answer="0110"></label>
      <label class="base-answer-field"><span>Eight-bit representation</span><input inputmode="numeric" maxlength="8" data-answer="10110110"></label>
      <label class="base-answer-field"><span>Total from powers of 2</span><input inputmode="numeric" data-answer="182"></label>
      <label class="base-answer-field"><span>Total from powers of 16</span><input inputmode="numeric" data-answer="182"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check all three forms</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
    <small class="base-auto-note">The following two calculation tasks document the two methods separately in your notes.</small>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Calculate the decimal value from binary.</strong><small>Expand all eight positions using powers of two and add the contributions.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Check directly from hexadecimal.</strong><small>Expand <code>B6</code><sub>16</sub> using powers of sixteen, then explain why equal results from both paths form a useful check.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Diagnose errors</h2>
<p><strong>Consolidation.</strong> These problems ask you to identify and explain an error rather than only perform a conversion.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Correct grouping that began on the wrong side.</strong><small>Someone wrote <code>1011 0100</code><sub>2</sub> while converting <code>101101</code><sub>2</sub>. Identify where the zeros were added, explain the error, then regroup correctly beginning on the right.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Correct a missing position.</strong><small>Someone claims that <code>A05</code><sub>16</sub> and <code>A5</code><sub>16</sub> have the same value because zero contributes nothing. Expand both numerals using powers of 16 and explain what the zero preserves.</small></span>
  </label>
</div>
</section>

<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Evaluate a technical source: hexadecimal notation</h2>
<p><strong>Required topic:</strong> find official technical documentation that uses a hexadecimal value to represent an identifier, address, mask, colour, or machine value.</p>
<p>Answer the following five prompts in your lab record. <strong>Each response must be no more than two sentences.</strong></p>
<ol>
  <li><strong>Source and publisher:</strong> give the title, publishing organization, and direct link.</li>
  <li><strong>Appropriateness:</strong> explain why this documentation is suitable for establishing the meaning of the selected value.</li>
  <li><strong>Specification:</strong> extract the exact hexadecimal value, its width or context, and what it represents.</li>
  <li><strong>Verification:</strong> confirm it with a second source or by converting it to binary or decimal using the session method.</li>
  <li><strong>Type of statement:</strong> write and clearly label one fact and one inference, followed either by a practical recommendation about using this notation or by an explanation of why the evidence does not justify a recommendation.</li>
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
    <span><strong>Create your method reference.</strong><small>For each of the six conversion directions among bases 2, 10, and 16, write the name of the main method and one specific error to check.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Review your learning.</strong><small>Name the conversion that still requires the most attention and describe one check you will use next time. Then compare selected results with the calculator in Programmer mode without erasing your work.</small></span>
  </label>
</div>
</section>

<section class="lab-stage">
<h2>Unlimited Practice Generator</h2>
<p>Generate as many problems as needed. Every problem requires work suited to the conversion direction; the generator checks the fields without displaying the solution. A new question does not change core-task progress.</p>

<div class="practice-generator" data-practice-generator data-lang="en">
  <div class="practice-controls">
    <label class="base-answer-field">
      <span>Conversion type</span>
      <select data-practice-mode>
        <option value="mixed">Mix all six directions</option>
        <option value="b2d">Base 2 to base 10</option>
        <option value="h2d">Base 16 to base 10</option>
        <option value="d2b">Base 10 to base 2</option>
        <option value="b2h">Base 2 to base 16</option>
        <option value="h2b">Base 16 to base 2</option>
        <option value="d2h">Base 10 to base 16</option>
      </select>
    </label>
    <label class="base-answer-field">
      <span>Value range</span>
      <select data-practice-difficulty>
        <option value="small">Small: 1 to 63</option>
        <option value="medium" selected>Medium: 1 to 255</option>
        <option value="large">Large: 1 to 4,095</option>
      </select>
    </label>
    <button class="lab-button secondary" type="button" data-new-practice>New question</button>
  </div>

  <p class="practice-question" data-practice-question aria-live="polite"></p>
  <div class="base-answer-grid" data-practice-fields></div>
  <div class="base-exercise-actions">
    <button class="lab-button" type="button" data-check-practice>Check work</button>
    <p class="base-feedback" data-practice-feedback aria-live="polite"></p>
  </div>
  <p class="practice-stats" data-practice-stats>Problems solved: 0</p>
</div>
<noscript>
  <div class="lab-no-js-practice">
    <h3>Replacement manual practice</h3>
    <p>Show your method and the base of every answer in your lab record.</p>
    <ol>
      <li>Convert <code>10110110</code><sub>2</sub> to base 10.</li>
      <li>Convert <code>3A7</code><sub>16</sub> to base 10.</li>
      <li>Convert <code>173</code><sub>10</sub> to base 2.</li>
      <li>Convert <code>110101101011</code><sub>2</sub> to base 16.</li>
      <li>Convert <code>202</code><sub>10</sub> to base 16 using binary as an intermediate step.</li>
    </ol>
    <details><summary>Check the results after completing the work</summary><ol><li><code>182</code><sub>10</sub></li><li><code>935</code><sub>10</sub></li><li><code>10101101</code><sub>2</sub></li><li><code>D6B</code><sub>16</sub></li><li><code>11001010</code><sub>2</sub>, giving <code>CA</code><sub>16</sub></li></ol></details>
  </div>
</noscript>
</section>

<section class="lab-stage lab-optional">
<h2>Optional practice: stretch goals</h2>
<p>After completing every core task, choose one or more challenges.</p>
<ul>
  <li>Convert <code>C0FFEE</code><sub>16</sub> to binary without passing through base 10. First predict how many bits the answer will contain.</li>
  <li>Find the smallest bit width needed to represent <code>1000</code><sub>10</sub>, then give its binary and hexadecimal representations.</li>
  <li>Invent a conversion containing exactly one positional or grouping error. Exchange only the work with another person and ask them to diagnose the error.</li>
  <li>Explain why one hexadecimal digit represents four bits while a symbol in base 32 could represent five bits.</li>
</ul>
</section>
</div>
</div>

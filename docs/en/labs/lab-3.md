# Lab 3 - Interpreting Internal Representations

[Return to Session 3](../sessions/session-3.md)

## Purpose of the lab

This lab first applies in class the conventions that give meaning to bits: units, fixed width, signed and unsigned integers, text, and endianness. Binary fractions and IEEE 754 single precision then form required self-study that may be assessed on the examination.

The work is individual. Structured fields check mechanical steps without displaying the solution. Explanations, comparisons, and justifications must be retained in your personal lab record.

## Objectives

By the end of the lab and required self-study, you should be able to:

- convert binary and decimal units correctly;
- check whether a value fits a stated width and type, then encode and decode signed and unsigned integers;
- interpret simple ASCII and UTF-8 bytes;
- reconstruct a value in big-endian or little-endian order;
- integrate width, type, two's complement, and byte order in one interpretation;
- construct and decode normalized finite IEEE 754 single-precision values after self-study;
- explain why the same bits can produce several interpretations;
- briefly evaluate a technical source about UTF-8 encoding.

!!! warning "Progress is not your lab record"
    Answers and progress are stored only in this browser. Record calculations, tables, discarded bits, rounding rules, and explanations in a notebook or digital document that you control.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-3-en-v4"
  data-gate-template="{done} of {total} commitments acknowledged"
  data-progress-template="{done} of {total} tasks complete"
  data-self-study-template="{done} of {total} self-study tasks complete"
  data-reset-confirm="Clear this lab's progress in this browser?"
>
  <section class="lab-gate" aria-labelledby="lab-3-agreement-title">
    <h2 id="lab-3-agreement-title">Working agreement</h2>
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
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Lab-specific constraints</p><p>Check width, type, encoding, and endianness before interpreting a byte sequence; do not turn an assumption into a fact.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>No-JavaScript mode</strong><p>Check every commitment to reveal the lab. The instructions and fields remain usable, but automatic checking, saved progress, and interactive hints are unavailable. A finite manual practice set replaces the generator.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 of 11 tasks complete</p>
<button class="lab-button secondary" type="button" data-lab-reset>Reset</button>
<progress data-lab-progress value="0" max="11">0 of 11</progress>
</div>

<details class="lab-guide">
<summary>Guide: presenting an internal representation</summary>
<div class="lab-guide-body">
  <ol>
    <li>Identify the starting value or bytes.</li>
    <li>State the applicable width, type, encoding, and endianness.</li>
    <li>Show the conversions, complements, fields, or groupings in order.</li>
    <li>Write the final representation with its base and width.</li>
    <li>Check the range, number of bits, and plausibility of the result.</li>
  </ol>
</div>
</details>

<div class="lab-admin-note">
<strong>In-class pathway and required self-study</strong>
<p>The in-class pathway runs from “Prepare your notes” through “Evaluate a technical source: UTF-8 encoding.” Main progress excludes IEEE 754 self-study. That self-study has its own indicator and must be completed before the exam-review session.</p>
</div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Prepare your notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Create your lab record.</strong><small>Write “Lab 3,” the date, and the headings “units,” “integers,” “text,” “endianness,” and “synthesis.” Then add a separate “IEEE 754 self-study” heading.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Units and width</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Convert the units without mixing conventions.</strong><small>Show the multiplier used for each conversion.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="All four unit conversions are correct." data-incomplete-message="Complete all four fields." data-retry-message="At least one conversion or convention needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>32 bits in bytes</span><input inputmode="numeric" data-answer="4"></label>
      <label class="base-answer-field"><span>2 KiB in bytes</span><input inputmode="numeric" data-answer="2048|2,048"></label>
      <label class="base-answer-field"><span>3 kB in bytes</span><input inputmode="numeric" data-answer="3000|3,000"></label>
      <label class="base-answer-field"><span>1 MiB in bytes</span><input inputmode="numeric" data-answer="1048576|1,048,576"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the units</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Determine the ranges and check whether the values fit.</strong><small>Use the fixed-width formulas before answering.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The ranges and all four decisions are correct." data-incomplete-message="Complete every field." data-retry-message="A limit or range decision needs another look.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Maximum unsigned, 8 bits</span><input inputmode="numeric" data-answer="255"></label>
      <label class="base-answer-field"><span>Minimum signed, 8 bits</span><input inputmode="numeric" data-answer="-128"></label>
      <label class="base-answer-field"><span>Maximum signed, 8 bits</span><input inputmode="numeric" data-answer="127"></label>
      <label class="base-answer-field"><span>Does 200 fit unsigned 8-bit?</span><select data-answer="YES"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
      <label class="base-answer-field"><span>Does 200 fit signed 8-bit?</span><select data-answer="NO"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
      <label class="base-answer-field"><span>Does -100 fit signed 8-bit?</span><select data-answer="YES"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
      <label class="base-answer-field"><span>Does -100 fit unsigned 8-bit?</span><select data-answer="NO"><option value="">Choose</option><option>Yes</option><option>No</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the ranges</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Signed and unsigned integers</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Interpret the same byte in two ways.</strong><small>Use the new pattern <code>11001010</code> and preserve both expansions in your notes.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Both interpretations of the byte are correct." data-incomplete-message="Complete all three fields." data-retry-message="The hexadecimal form or one interpretation needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Hexadecimal</span><input data-answer="CA|0XCA"></label>
      <label class="base-answer-field"><span>Unsigned value</span><input inputmode="numeric" data-answer="202"></label>
      <label class="base-answer-field"><span>Signed value</span><input inputmode="numeric" data-answer="-54"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the interpretations</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Encode <code>-46</code> as an eight-bit signed integer.</strong><small>Show the absolute value, inversion, and addition of 1.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The two's complement of -46 is correct." data-incomplete-message="Complete every step." data-retry-message="One two's-complement step needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>46 using 8 bits</span><input inputmode="numeric" maxlength="8" data-answer="00101110"></label>
      <label class="base-answer-field"><span>Inverted bits</span><input inputmode="numeric" maxlength="8" data-answer="11010001"></label>
      <label class="base-answer-field"><span>After adding 1</span><input inputmode="numeric" maxlength="8" data-answer="11010010"></label>
      <label class="base-answer-field"><span>Hexadecimal answer</span><input data-answer="D2|0XD2"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the encoding</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Decode <code>10110100</code> as an eight-bit signed integer.</strong><small>Use the invert-and-add-one method and state the final sign.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The signed decoding is correct." data-incomplete-message="Complete every step." data-retry-message="One decoding step needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Recognized sign</span><select data-answer="NEGATIVE"><option value="">Choose</option><option>Positive</option><option>Negative</option></select></label>
      <label class="base-answer-field"><span>Inverted bits</span><input inputmode="numeric" maxlength="8" data-answer="01001011"></label>
      <label class="base-answer-field"><span>After adding 1</span><input inputmode="numeric" maxlength="8" data-answer="01001100"></label>
      <label class="base-answer-field"><span>Decimal magnitude</span><input inputmode="numeric" data-answer="76"></label>
      <label class="base-answer-field"><span>Signed value</span><input inputmode="numeric" data-answer="-76"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the decoding</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Text and bytes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Distinguish characters, code points, and UTF-8 bytes.</strong><small>Use a Unicode or UTF-8 table only after predicting the familiar ASCII results.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The characters and bytes are correctly identified." data-incomplete-message="Complete every text field." data-retry-message="A code or byte sequence needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Code point for <code>A</code></span><input data-answer="U+0041|0041"></label>
      <label class="base-answer-field"><span>UTF-8 byte for <code>A</code></span><input data-answer="41|0X41"></label>
      <label class="base-answer-field"><span>Byte for LF line feed</span><input data-answer="0A|0X0A"></label>
      <label class="base-answer-field"><span>Code point for <code>é</code></span><input data-answer="U+00E9|00E9"></label>
      <label class="base-answer-field"><span>UTF-8 bytes for <code>é</code></span><input data-answer="C3,A9|C3A9|C3;A9" placeholder="two bytes"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the text</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Endianness</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Place the bytes in the correct order.</strong><small>Always work with groups of two hexadecimal digits.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The byte orders and reconstructed value are correct." data-incomplete-message="Complete every endianness field." data-retry-message="A byte order or value needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span><code>0x89ABCDEF</code> in big-endian order</span><input data-answer="89,AB,CD,EF|89;AB;CD;EF|89ABCDEF"></label>
      <label class="base-answer-field"><span><code>0x89ABCDEF</code> in little-endian order</span><input data-answer="EF,CD,AB,89|EF;CD;AB;89|EFCDAB89"></label>
      <label class="base-answer-field"><span>Bytes <code>2A 01</code>, little-endian: hex value</span><input data-answer="012A|0X012A|12A|0X12A"></label>
      <label class="base-answer-field"><span>Same value in base 10</span><input inputmode="numeric" data-answer="298"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the byte order</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>


<section class="lab-stage lab-consolidation" data-lab-stage>
<h2>In-class synthesis</h2>
<p>Two consecutive bytes appear in memory in this order: <code>FE FF</code>. They contain a signed 16-bit little-endian integer.</p>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check data-auto-task disabled><span><strong>Reconstruct and interpret the value.</strong><small>Restore logical order, then distinguish signed and unsigned interpretations.</small></span></label>
  <div class="base-exercise" data-base-exercise data-correct-message="The 16-bit value is correctly reconstructed and interpreted." data-incomplete-message="Complete every field." data-retry-message="Review byte order, width, or two's complement.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Bytes in logical order</span><input data-answer="FF,FE|FF;FE|FFFE"></label>
      <label class="base-answer-field"><span>16-bit hexadecimal</span><input data-answer="FFFE|0XFFFE"></label>
      <label class="base-answer-field"><span>Unsigned value</span><input inputmode="numeric" data-answer="65534"></label>
      <label class="base-answer-field"><span>Signed value</span><input inputmode="numeric" data-answer="-2"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check synthesis</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Explain the method.</strong><small>In your notes, explain why width, signed type, and endianness are all required to obtain <code>-2</code>.</small></span></label>
</div>
</section>


<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Evaluate a technical source: UTF-8 encoding</h2>
<p><strong>Required topic:</strong> find an authoritative technical source that gives the Unicode code point and UTF-8 encoding of the <code>€</code> character.</p>
<p>Answer the following five prompts in your lab record. <strong>Each response must be no more than two sentences.</strong></p>
<ol>
  <li><strong>Source and publisher:</strong> give the title, publishing organization, and direct link.</li>
  <li><strong>Appropriateness:</strong> explain why this source is suitable for checking Unicode or UTF-8.</li>
  <li><strong>Specification:</strong> extract the code point and exact UTF-8 byte sequence in hexadecimal.</li>
  <li><strong>Verification:</strong> confirm the sequence using a second source or the UTF-8 structure studied in the session.</li>
  <li><strong>Type of statement:</strong> write and clearly label one fact and one inference, followed either by a practical recommendation concerning the encoding of this character or by an explanation of why the evidence does not justify a recommendation.</li>
</ol>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Retain all five responses in your lab record.</strong><small>The checkbox confirms that every response follows the two-sentence limit and that the links allow the sources to be found again.</small></span></label>
</div>
</section>

<section class="lab-stage required-self-study">
<h2>Required self-study: IEEE 754 single precision</h2>
<div class="admonition danger"><p class="admonition-title">IMPORTANT — exam preparation</p><p>IEEE 754 may be assessed on the final examination. Complete the six tasks below before the exam-review session. Required scope is limited to normalized finite single-precision values.</p></div>
<div class="lab-progress self-study-progress">
  <p data-self-study-progress-text aria-live="polite">0 of 6 self-study tasks complete</p>
  <progress data-self-study-progress value="0" max="6">0 of 6</progress>
</div>
</section>

<section class="lab-stage required-self-study" data-self-study-stage>
<h3>Binary fractions</h3>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check data-auto-task disabled>
    <span><strong>Connect fractional positions to decimal values.</strong><small>Show the negative powers of two used.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Both fractional conversions are correct." data-incomplete-message="Complete all three fields." data-retry-message="A contribution or conversion needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Contributions in <code>11.011</code></span><input data-answer="2;1;0.25;0.125" placeholder="separated by semicolons"></label>
      <label class="base-answer-field"><span><code>11.011</code> in base 10</span><input data-answer="3.375"></label>
      <label class="base-answer-field"><span><code>0.375</code> in binary</span><input data-answer="0.011|.011"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the fractions</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage required-self-study" data-self-study-stage>
<h3>Construct an IEEE 754 single-precision value</h3>
<p>Construct the representation of <code>-10.5</code>. Every field must be completed before checking.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check data-auto-task disabled>
    <span><strong>Encode every step through hexadecimal.</strong><small>Keep a separate line for the sign, normalization, exponent, and fraction.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The complete IEEE 754 representation is correct." data-incomplete-message="Complete every IEEE 754 field." data-retry-message="One or more IEEE 754 fields need another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Sign bit</span><input inputmode="numeric" maxlength="1" data-answer="1"></label>
      <label class="base-answer-field"><span>Integer part in binary</span><input inputmode="numeric" data-answer="1010"></label>
      <label class="base-answer-field"><span>Fractional part</span><input data-answer="0.1|.1"></label>
      <label class="base-answer-field"><span>Combined binary value</span><input data-answer="1010.1"></label>
      <label class="base-answer-field"><span>Normalized form</span><input data-answer="1.0101X2^3|1.0101*2^3" placeholder="1.F x 2^e"></label>
      <label class="base-answer-field"><span>Actual exponent</span><input inputmode="numeric" data-answer="3"></label>
      <label class="base-answer-field"><span>Biased exponent in base 10</span><input inputmode="numeric" data-answer="130"></label>
      <label class="base-answer-field"><span>Eight exponent bits</span><input inputmode="numeric" maxlength="8" data-answer="10000010"></label>
      <label class="base-answer-field"><span>23 fraction bits</span><input inputmode="numeric" maxlength="23" data-answer="01010000000000000000000"></label>
      <label class="base-answer-field"><span>32-bit assembly</span><input inputmode="numeric" maxlength="32" data-answer="11000001001010000000000000000000"></label>
      <label class="base-answer-field"><span>Hexadecimal answer</span><input data-answer="C1280000|0XC1280000"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the 32 bits</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage required-self-study" data-self-study-stage>
<h3>Decode an IEEE 754 single-precision value</h3>
<p>Decode <code>0x40D00000</code> without using a converter before checking.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check data-auto-task disabled>
    <span><strong>Separate the fields and reconstruct the decimal value.</strong><small>Restore the implicit 1 before applying the exponent.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The complete IEEE 754 decoding is correct." data-incomplete-message="Complete every decoding field." data-retry-message="One or more decoding fields need another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>32 bits</span><input inputmode="numeric" maxlength="32" data-answer="01000000110100000000000000000000"></label>
      <label class="base-answer-field"><span>Sign bit</span><input inputmode="numeric" maxlength="1" data-answer="0"></label>
      <label class="base-answer-field"><span>Exponent bits</span><input inputmode="numeric" maxlength="8" data-answer="10000001"></label>
      <label class="base-answer-field"><span>Stored exponent</span><input inputmode="numeric" data-answer="129"></label>
      <label class="base-answer-field"><span>Actual exponent</span><input inputmode="numeric" data-answer="2"></label>
      <label class="base-answer-field"><span>Fraction bits</span><input inputmode="numeric" maxlength="23" data-answer="10100000000000000000000"></label>
      <label class="base-answer-field"><span>Significand</span><input data-answer="1.101"></label>
      <label class="base-answer-field"><span>After applying 2^2</span><input data-answer="110.1"></label>
      <label class="base-answer-field"><span>Decimal value</span><input data-answer="6.5"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the decoding</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check>
    <span><strong>Explain the approximation.</strong><small>In your notes, explain why a repeating binary fraction must be rounded in a 23-bit field and why the reconstructed value can differ slightly from the decimal input.</small></span>
  </label>
</div>
</section>

<section class="lab-stage required-self-study" data-self-study-stage>
<h3>IEEE 754 and endianness: integrated check</h3>
<p><strong>Consolidation.</strong> This new value combines endianness and IEEE 754 without repeating a solved session example.</p>
<p>Four consecutive bytes are presented in this order: <code>00 00 50 C0</code>. They contain a little-endian 32-bit IEEE 754 value.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check data-auto-task disabled>
    <span><strong>Reconstruct and then interpret the value.</strong><small>Reorder the bytes before separating the IEEE 754 fields.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="The multi-byte value is correctly reconstructed and interpreted." data-incomplete-message="Complete all four steps." data-retry-message="The reordering or decoding needs another look.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Bytes in logical order</span><input data-answer="C0,50,00,00|C0;50;00;00|C0500000"></label>
      <label class="base-answer-field"><span>32-bit hexadecimal</span><input data-answer="C0500000|0XC0500000"></label>
      <label class="base-answer-field"><span>32-bit binary</span><input inputmode="numeric" maxlength="32" data-answer="11000000010100000000000000000000"></label>
      <label class="base-answer-field"><span>Decimal value</span><input data-answer="-3.25"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Check the interpretation</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check>
    <span><strong>Conclude your lab record.</strong><small>Explain why the four bytes are insufficient to determine their meaning without knowing the type and endianness. Then name the check you find most useful for preventing an error.</small></span>
  </label>
</div>
</section>

<section class="lab-stage required-self-study">
<h3>IEEE 754 Practice Generator</h3>
<p>Generate as many problems as needed. Every question requires the steps appropriate to its representation; the generator marks fields that need another look without displaying the solution. This practice does not change core-task progress.</p>

<div class="practice-generator" data-internal-practice data-lang="en">
  <div class="practice-controls">
    <label class="base-answer-field">
      <span>Conversion type</span>
      <select data-ir-mode>
        <option value="mixed">Mix all categories</option>
        <option value="unsigned">Decode an unsigned integer</option>
        <option value="signed-decode">Decode a signed integer</option>
        <option value="signed-encode">Encode a signed integer</option>
        <option value="fraction">Binary fraction to base 10</option>
        <option value="ieee-encode">Construct an IEEE 754 value</option>
        <option value="ieee-decode">Decode an IEEE 754 value</option>
        <option value="ascii">ASCII and UTF-8-compatible text</option>
        <option value="endian">Endianness</option>
      </select>
    </label>
    <label class="base-answer-field">
      <span>Level</span>
      <select data-ir-level>
        <option value="core" selected>Core</option>
        <option value="extended">Extended</option>
      </select>
    </label>
    <button class="lab-button secondary" type="button" data-ir-new>New question</button>
  </div>

  <p class="practice-question" data-ir-question aria-live="polite"></p>
  <div class="base-answer-grid" data-ir-fields></div>
  <div class="base-exercise-actions">
    <button class="lab-button" type="button" data-ir-check>Check work</button>
    <p class="base-feedback" data-ir-feedback aria-live="polite"></p>
  </div>
  <p class="practice-stats" data-ir-stats>Problems solved: 0</p>
</div>
<noscript>
  <div class="lab-no-js-practice">
    <h3>Replacement manual practice</h3>
    <p>State the applicable width, type, encoding, or byte order, then show every step.</p>
    <ol>
      <li>Interpret <code>11010110</code> as an eight-bit unsigned integer.</li>
      <li>Interpret the same bits as a signed two's-complement integer.</li>
      <li>Encode <code>-37</code> as an eight-bit signed integer.</li>
      <li>Convert <code>101.011</code><sub>2</sub> to base 10.</li>
      <li>Construct the IEEE 754 single-precision representation of <code>10.5</code>.</li>
      <li>Decode the ASCII/UTF-8 byte <code>0x47</code>.</li>
      <li>The bytes <code>78 56 34 12</code> contain a 32-bit little-endian unsigned integer. Reconstruct its logical hexadecimal value.</li>
    </ol>
    <details><summary>Check the results after completing the work</summary><ol><li><code>214</code></li><li><code>-42</code></li><li><code>11011011</code></li><li><code>5.375</code></li><li><code>0 10000010 01010000000000000000000</code>, or <code>0x41280000</code></li><li><code>G</code></li><li><code>0x12345678</code></li></ol></details>
  </div>
</noscript>
</section>

<section class="lab-stage required-self-study lab-optional">
<h3>Stretch Goals</h3>
<ul>
  <li>Construct the IEEE 754 single-precision representation of `6.5`, then verify it with a tool after completing all eight steps.</li>
  <li>Decode a second IEEE 754 value supplied by the instructor and compare two methods of calculating the significand.</li>
  <li>Determine the number of UTF-8 bytes required for the word `Café`, then explain why it differs from the number of characters.</li>
  <li>Invent a 32-bit value whose little-endian order looks very different from its big-endian order, then exchange it with another person.</li>
</ul>
</section>
</div>
</div>

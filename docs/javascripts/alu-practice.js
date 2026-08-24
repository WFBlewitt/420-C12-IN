(() => {
  const normalize = value => String(value ?? '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(',', '.');

  function randomInt(min, max) {
    const range = max - min + 1;
    if (globalThis.crypto?.getRandomValues) {
      const data = new Uint32Array(1);
      globalThis.crypto.getRandomValues(data);
      return min + (data[0] % range);
    }
    return min + Math.floor(Math.random() * range);
  }

  const bits = (value, width) => (value >>> 0).toString(2).padStart(width, '0').slice(-width);

  function signedValue(unsigned, width) {
    const signMask = 2 ** (width - 1);
    return unsigned >= signMask ? unsigned - (2 ** width) : unsigned;
  }

  function analyse(a, b, width) {
    const modulus = 2 ** width;
    const full = a + b;
    const retained = full % modulus;
    const carry = full >= modulus ? 1 : 0;
    const signedA = signedValue(a, width);
    const signedB = signedValue(b, width);
    const signedResult = signedValue(retained, width);
    const overflow =
      (signedA >= 0 && signedB >= 0 && signedResult < 0) ||
      (signedA < 0 && signedB < 0 && signedResult >= 0);
    const columns = [];
    let carryIn = 0;
    for (let index = 0; index < width; index += 1) {
      const bitA = (a >> index) & 1;
      const bitB = (b >> index) & 1;
      const total = bitA + bitB + carryIn;
      const sum = total & 1;
      const carryOut = total >= 2 ? 1 : 0;
      columns.push({ index, bitA, bitB, carryIn, sum, carryOut });
      carryIn = carryOut;
    }
    return {
      a, b, width, full, retained, carry, overflow, signedA, signedB, signedResult,
      unsignedWrap: carry === 1,
      fullBits: full.toString(2).padStart(width, '0'),
      retainedBits: bits(retained, width),
      columns
    };
  }

  function makeInput(answer, label, maxLength = 1) {
    const input = document.createElement('input');
    input.inputMode = 'numeric';
    input.maxLength = maxLength;
    input.dataset.answer = String(answer);
    input.setAttribute('aria-label', label);
    input.autocomplete = 'off';
    input.addEventListener('input', () => {
      input.classList.remove('is-correct', 'is-incorrect');
      input.removeAttribute('aria-invalid');
    });
    return input;
  }

  function accepted(field) {
    return (field.dataset.answer || '').split('|').map(normalize).filter(Boolean);
  }

  function markField(field) {
    const value = normalize(field.value);
    const correct = value !== '' && accepted(field).includes(value);
    field.classList.toggle('is-correct', correct);
    field.classList.toggle('is-incorrect', value !== '' && !correct);
    if (value !== '' && !correct) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    return { complete: value !== '', correct };
  }

  function renderColumns(root, analysis, lang) {
    root.replaceChildren();
    const table = document.createElement('table');
    table.className = 'alu-bit-table';
    const labels = lang === 'en'
      ? { pos: 'Bit position', a: 'A', b: 'B', ci: 'Carry in', s: 'Sum bit', co: 'Carry out' }
      : { pos: 'Position', a: 'A', b: 'B', ci: 'Retenue entrante', s: 'Bit de somme', co: 'Retenue sortante' };

    const head = document.createElement('thead');
    const hr = document.createElement('tr');
    [labels.pos, ...analysis.columns.map(c => String(c.index))].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      hr.appendChild(th);
    });
    head.appendChild(hr);
    table.appendChild(head);

    const body = document.createElement('tbody');
    function row(label, values, editable, key) {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = label;
      tr.appendChild(th);
      values.forEach((value, i) => {
        const td = document.createElement('td');
        if (editable) td.appendChild(makeInput(value, `${label}, ${labels.pos} ${i}`));
        else td.textContent = value;
        tr.appendChild(td);
      });
      body.appendChild(tr);
    }
    row(labels.a, analysis.columns.map(c => c.bitA), false);
    row(labels.b, analysis.columns.map(c => c.bitB), false);
    row(labels.ci, analysis.columns.map(c => c.carryIn), true);
    row(labels.s, analysis.columns.map(c => c.sum), true);
    row(labels.co, analysis.columns.map(c => c.carryOut), true);
    table.appendChild(body);
    root.appendChild(table);
  }

  function addSummaryFields(root, analysis, lang) {
    const copy = lang === 'en'
      ? {
          full: 'Full binary sum',
          retained: 'Retained result',
          carry: 'Final carry out',
          unsigned: 'Retained unsigned value',
          signed: 'Retained signed value',
          wrap: 'Unsigned wraparound?',
          overflow: 'Signed overflow?',
          yes: 'Yes', no: 'No'
        }
      : {
          full: 'Somme binaire complète',
          retained: 'Résultat conservé',
          carry: 'Retenue finale',
          unsigned: 'Valeur non signée conservée',
          signed: 'Valeur signée conservée',
          wrap: 'Bouclage non signé?',
          overflow: 'Débordement signé?',
          yes: 'Oui', no: 'Non'
        };

    const grid = document.createElement('div');
    grid.className = 'base-answer-grid alu-summary-grid';

    function inputField(label, answer, length = 0) {
      const wrapper = document.createElement('label');
      wrapper.className = 'base-answer-field';
      const span = document.createElement('span');
      span.textContent = label;
      const input = makeInput(answer, label, length || 32);
      wrapper.append(span, input);
      grid.appendChild(wrapper);
    }

    function selectField(label, answer) {
      const wrapper = document.createElement('label');
      wrapper.className = 'base-answer-field';
      const span = document.createElement('span');
      span.textContent = label;
      const select = document.createElement('select');
      select.dataset.answer = answer ? normalize(copy.yes) : normalize(copy.no);
      const blank = document.createElement('option');
      blank.value = '';
      blank.textContent = '—';
      const yes = document.createElement('option');
      yes.textContent = copy.yes;
      const no = document.createElement('option');
      no.textContent = copy.no;
      select.append(blank, yes, no);
      select.addEventListener('change', () => {
        select.classList.remove('is-correct', 'is-incorrect');
        select.removeAttribute('aria-invalid');
      });
      wrapper.append(span, select);
      grid.appendChild(wrapper);
    }

    inputField(copy.full, analysis.fullBits, analysis.width + 1);
    inputField(copy.retained, analysis.retainedBits, analysis.width);
    inputField(copy.carry, analysis.carry, 1);
    inputField(copy.unsigned, analysis.retained);
    inputField(copy.signed, analysis.signedResult);
    selectField(copy.wrap, analysis.unsignedWrap);
    selectField(copy.overflow, analysis.overflow);
    root.appendChild(grid);
  }

  function buildWork(root, analysis, lang) {
    root.replaceChildren();
    const columns = document.createElement('div');
    columns.className = 'alu-columns';
    renderColumns(columns, analysis, lang);
    root.appendChild(columns);
    addSummaryFields(root, analysis, lang);
  }

  function checkWork(root) {
    const fields = [...root.querySelectorAll('input[data-answer], select[data-answer]')];
    const states = fields.map(markField);
    return {
      complete: states.every(s => s.complete),
      correct: states.every(s => s.correct)
    };
  }

  function initFixed(root) {
    if (root.dataset.aluReady === 'true') return;
    root.dataset.aluReady = 'true';
    const lang = document.documentElement.lang?.startsWith('en') ? 'en' : 'fr';
    const aBits = root.dataset.a;
    const bBits = root.dataset.b;
    const analysis = analyse(parseInt(aBits, 2), parseInt(bBits, 2), aBits.length);
    buildWork(root, analysis, lang);

    const actions = document.createElement('div');
    actions.className = 'base-exercise-actions';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lab-button';
    button.textContent = lang === 'en' ? 'Check columns' : 'Vérifier les colonnes';
    const feedback = document.createElement('p');
    feedback.className = 'base-feedback';
    feedback.setAttribute('aria-live', 'polite');
    actions.append(button, feedback);
    root.appendChild(actions);

    button.addEventListener('click', () => {
      const result = checkWork(root);
      const autoTask = root.previousElementSibling?.querySelector?.('[data-auto-task]') ||
        root.closest('.lab-tasks')?.querySelector('[data-auto-task]');
      if (!result.complete) {
        feedback.textContent = root.dataset.incompleteMessage || '';
        return;
      }
      if (result.correct) {
        feedback.textContent = root.dataset.correctMessage || '';
        if (autoTask) {
          autoTask.checked = true;
          autoTask.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } else {
        feedback.textContent = root.dataset.retryMessage || '';
      }
    });
  }

  function chooseProblem(width, level) {
    const max = (2 ** width) - 1;
    if (level === 'edge') {
      const pairs = width === 4
        ? [[15,1],[7,1],[8,15],[14,1],[7,7],[8,8]]
        : [[255,1],[127,1],[128,255],[254,1],[127,127],[128,128],[250,10]];
      return pairs[randomInt(0, pairs.length - 1)];
    }
    if (level === 'guided') {
      let a, b;
      do {
        a = randomInt(0, max);
        b = randomInt(0, max);
      } while ((a + b) >= (2 ** width) || a === 0 || b === 0);
      return [a, b];
    }
    return [randomInt(0, max), randomInt(0, max)];
  }

  function initGenerator(root) {
    if (root.dataset.aluReady === 'true') return;
    root.dataset.aluReady = 'true';

    const lang = root.dataset.lang === 'en' ? 'en' : 'fr';
    const copy = lang === 'en'
      ? {
          prompt: (a,b,w) => `Add ${bits(a,w)} and ${bits(b,w)} using ${w} bits.`,
          correct: 'Every stage is correct. Generate another problem when ready.',
          incomplete: 'Complete every column and summary field before checking.',
          retry: 'Some stages need another look. Incorrect fields are marked.',
          hint: 'Work from bit 0 toward the most significant bit. Carry out from one column becomes carry in for the next. Decide signed overflow from operand and result signs, not from carry alone.',
          solved: n => `Problems solved: ${n}`
        }
      : {
          prompt: (a,b,w) => `Additionnez ${bits(a,w)} et ${bits(b,w)} sur ${w} bits.`,
          correct: 'Toutes les étapes sont correctes. Générez un autre problème lorsque vous êtes prêt.',
          incomplete: 'Remplissez chaque colonne et chaque champ de synthèse avant de vérifier.',
          retry: 'Certaines étapes sont à revoir. Les champs incorrects sont signalés.',
          hint: 'Travaillez de la position 0 vers le bit le plus significatif. La retenue sortante d’une colonne devient la retenue entrante de la suivante. Déterminez le débordement signé à partir des signes, pas de la retenue seule.',
          solved: n => `Problèmes réussis : ${n}`
        };

    const widthSelect = root.querySelector('[data-alu-width]');
    const levelSelect = root.querySelector('[data-alu-level]');
    const question = root.querySelector('[data-alu-question]');
    const work = root.querySelector('[data-alu-work]');
    const feedback = root.querySelector('[data-alu-feedback]');
    const stats = root.querySelector('[data-alu-stats]');
    let solved = 0;
    let solvedCurrent = false;

    function generate() {
      const width = Number(widthSelect.value);
      const [a,b] = chooseProblem(width, levelSelect.value);
      const analysis = analyse(a,b,width);
      question.textContent = copy.prompt(a,b,width);
      buildWork(work, analysis, lang);
      feedback.textContent = '';
      solvedCurrent = false;
    }

    root.querySelector('[data-alu-new]').addEventListener('click', generate);
    root.querySelector('[data-alu-check]').addEventListener('click', () => {
      const result = checkWork(work);
      if (!result.complete) feedback.textContent = copy.incomplete;
      else if (!result.correct) feedback.textContent = copy.retry;
      else {
        feedback.textContent = copy.correct;
        if (!solvedCurrent) {
          solved += 1;
          solvedCurrent = true;
          stats.textContent = copy.solved(solved);
        }
      }
    });
    root.querySelector('[data-alu-hint]').addEventListener('click', () => {
      feedback.textContent = copy.hint;
    });
    widthSelect.addEventListener('change', generate);
    levelSelect.addEventListener('change', generate);
    generate();
  }

  function initialize(scope = document) {
    scope.querySelectorAll('[data-alu-fixed]').forEach(initFixed);
    scope.querySelectorAll('[data-alu-practice]').forEach(initGenerator);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initialize());
  } else {
    initialize();
  }

  if (globalThis.document$?.subscribe) {
    globalThis.document$.subscribe(() => initialize());
  }
})();

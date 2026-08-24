(() => {
  const storagePrefix = 'c12-base-lab:';

  function normalize(value) {
    return value
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/[×*]/g, 'X');
  }

  function acceptedAnswers(field) {
    return (field.dataset.answer || '')
      .split('|')
      .map(normalize)
      .filter(Boolean);
  }

  function fieldIsCorrect(field) {
    const value = normalize(field.value);
    return value !== '' && acceptedAnswers(field).includes(value);
  }

  function storageKey(exercise, index) {
    const lab = exercise.closest('[data-lab-checklist]');
    return `${storagePrefix}${lab?.dataset.labId || 'unknown'}:${index}`;
  }

  function readState(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || {};
    } catch {
      return {};
    }
  }

  function writeState(key, fields, complete) {
    try {
      localStorage.setItem(key, JSON.stringify({
        values: fields.map(field => field.value),
        complete
      }));
    } catch {
      // The exercise remains usable without browser storage.
    }
  }

  function setTaskComplete(exercise, complete) {
    const task = exercise.previousElementSibling?.querySelector('[data-lab-task-check]');
    if (!task || task.checked === complete) return;
    task.checked = complete;
    task.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function initializeExercise(exercise, index) {
    if (exercise.dataset.answerReady === 'true') return;
    exercise.dataset.answerReady = 'true';

    const fields = [...exercise.querySelectorAll('[data-answer]')];
    const button = exercise.querySelector('[data-check-answers]');
    const feedback = exercise.querySelector('[data-answer-feedback]');
    const key = storageKey(exercise, index);
    const state = readState(key);

    fields.forEach((field, fieldIndex) => {
      if (state.values?.[fieldIndex] !== undefined) {
        field.value = state.values[fieldIndex];
      }
      field.addEventListener('input', () => {
        field.classList.remove('is-correct', 'is-incorrect');
        field.removeAttribute('aria-invalid');
        exercise.classList.remove('is-complete');
        feedback.textContent = '';
        setTaskComplete(exercise, false);
        writeState(key, fields, false);
      });
    });

    function check({ quiet = false } = {}) {
      let complete = true;
      let hasBlank = false;

      fields.forEach(field => {
        const blank = normalize(field.value) === '';
        const correct = fieldIsCorrect(field);
        hasBlank ||= blank;
        complete &&= correct;

        if (!quiet) {
          field.classList.toggle('is-correct', correct);
          field.classList.toggle('is-incorrect', !correct);
          field.setAttribute('aria-invalid', String(!correct));
        }
      });

      exercise.classList.toggle('is-complete', complete);
      setTaskComplete(exercise, complete);
      writeState(key, fields, complete);

      if (!quiet) {
        feedback.textContent = complete
          ? exercise.dataset.correctMessage
          : hasBlank
            ? exercise.dataset.incompleteMessage
            : exercise.dataset.retryMessage;
        if (!complete) exercise.querySelector('.is-incorrect')?.focus();
      }
      return complete;
    }

    button?.addEventListener('click', () => check());
    if (state.complete) check({ quiet: true });
  }

  function initializeAll() {
    document.querySelectorAll('[data-base-no-gate]').forEach(root => {
      const content = root.querySelector('[data-lab-content]');
      const unlock = root.querySelector('[data-lab-unlock]');
      if (content) content.hidden = false;
      if (unlock) unlock.hidden = true;
      root.querySelector('[data-lab-reset]')?.addEventListener('click', () => {
        setTimeout(() => { if (content) content.hidden = false; }, 0);
      });
    });
    document.querySelectorAll('[data-base-exercise]').forEach(initializeExercise);
    document.querySelectorAll('[data-practice-generator]').forEach(initializeGenerator);
  }

  function randomInt(min, max) {
    const range = max - min + 1;
    if (globalThis.crypto?.getRandomValues) {
      const values = new Uint32Array(1);
      globalThis.crypto.getRandomValues(values);
      return min + (values[0] % range);
    }
    return min + Math.floor(Math.random() * range);
  }

  function binaryGroups(binary) {
    const padded = binary.padStart(Math.ceil(binary.length / 4) * 4, '0');
    return padded.match(/.{4}/g) || ['0000'];
  }

  function selectedPowers(value) {
    const powers = [];
    for (let power = 2 ** Math.floor(Math.log2(value)); power >= 1; power /= 2) {
      if ((value & power) !== 0) powers.push(power);
    }
    return powers;
  }

  function hexadecimalContributions(hexadecimal) {
    return [...hexadecimal].map((digit, index) => {
      const position = hexadecimal.length - index - 1;
      return parseInt(digit, 16) * (16 ** position);
    });
  }

  function initializeGenerator(generator) {
    if (generator.dataset.practiceReady === 'true') return;
    generator.dataset.practiceReady = 'true';

    const lang = generator.dataset.lang === 'en' ? 'en' : 'fr';
    const copy = {
      fr: {
        prompts: {
          b2d: value => `Convertissez ${value} (base 2) vers la base 10.`,
          h2d: value => `Convertissez ${value} (base 16) vers la base 10.`,
          d2b: value => `Convertissez ${value} (base 10) vers la base 2.`,
          b2h: value => `Convertissez ${value} (base 2) vers la base 16.`,
          h2b: value => `Convertissez ${value} (base 16) vers la base 2.`,
          d2h: value => `Convertissez ${value} (base 10) vers la base 16 en passant par le binaire.`
        },
        selected: 'Puissances de 2 sélectionnées',
        contributions: 'Contributions positionnelles',
        groups: 'Groupes de quatre bits',
        binary: 'Représentation binaire',
        decimal: 'Valeur en base 10',
        hexadecimal: 'Représentation hexadécimale',
        incomplete: 'Remplissez tous les champs avant de vérifier.',
        retry: 'Certaines étapes sont à revoir. Les champs concernés sont indiqués.',
        correct: 'Démarche correcte. Vous pouvez générer une nouvelle question.',
        solved: count => `Problèmes réussis : ${count}`,
        hint: value => `Indice de méthode : ${value}`,
        hints: {
          b2d: 'Alignez les bits avec les puissances de 2 et additionnez les poids des positions qui contiennent 1.',
          h2d: 'Convertissez chaque chiffre hexadécimal en valeur décimale, puis multipliez-le par sa puissance de 16.',
          d2b: 'Partez de la plus grande puissance de 2 qui entre dans la valeur et conservez chaque position, y compris les zéros.',
          b2h: 'Regroupez les bits par quatre à partir de la droite et complétez seulement à gauche.',
          h2b: 'Remplacez chaque chiffre hexadécimal par exactement quatre bits, même lorsqu’un groupe commence par zéro.',
          d2h: 'Construisez d’abord le binaire, complétez à gauche, puis regroupez par quatre.'
        }
      },
      en: {
        prompts: {
          b2d: value => `Convert ${value} (base 2) to base 10.`,
          h2d: value => `Convert ${value} (base 16) to base 10.`,
          d2b: value => `Convert ${value} (base 10) to base 2.`,
          b2h: value => `Convert ${value} (base 2) to base 16.`,
          h2b: value => `Convert ${value} (base 16) to base 2.`,
          d2h: value => `Convert ${value} (base 10) to base 16 by passing through binary.`
        },
        selected: 'Selected powers of 2',
        contributions: 'Positional contributions',
        groups: 'Groups of four bits',
        binary: 'Binary representation',
        decimal: 'Base-10 value',
        hexadecimal: 'Hexadecimal representation',
        incomplete: 'Complete every field before checking.',
        retry: 'Some steps need another look. The relevant fields are marked.',
        correct: 'Your work is correct. You can generate a new question.',
        solved: count => `Problems solved: ${count}`,
        hint: value => `Method cue: ${value}`,
        hints: {
          b2d: 'Align the bits with powers of 2 and add the weights of the positions containing 1.',
          h2d: 'Convert each hexadecimal digit to its decimal value, then multiply it by its power of 16.',
          d2b: 'Begin with the largest power of 2 that fits and preserve every position, including zeros.',
          b2h: 'Group bits in fours from the right and add padding only on the left.',
          h2b: 'Replace each hexadecimal digit with exactly four bits, even when a group begins with zero.',
          d2h: 'Build the binary representation first, pad on the left, then group in fours.'
        }
      }
    }[lang];

    const modes = ['b2d', 'h2d', 'd2b', 'b2h', 'h2b', 'd2h'];
    const modeSelect = generator.querySelector('[data-practice-mode]');
    const difficultySelect = generator.querySelector('[data-practice-difficulty]');
    const prompt = generator.querySelector('[data-practice-question]');
    const fieldsRoot = generator.querySelector('[data-practice-fields]');
    const feedback = generator.querySelector('[data-practice-feedback]');
    const stats = generator.querySelector('[data-practice-stats]');
    const checkButton = generator.querySelector('[data-check-practice]');
    const newButton = generator.querySelector('[data-new-practice]');
    let solved = 0;
    let solvedCurrent = false;
    let attempts = 0;
    let currentMode = 'b2d';

    function makeField(label, answer, placeholder = '') {
      const wrapper = document.createElement('label');
      wrapper.className = 'base-answer-field';
      const caption = document.createElement('span');
      caption.textContent = label;
      const input = document.createElement('input');
      input.dataset.answer = answer;
      input.placeholder = placeholder;
      input.autocomplete = 'off';
      input.addEventListener('input', () => {
        input.classList.remove('is-correct', 'is-incorrect');
        input.removeAttribute('aria-invalid');
        feedback.textContent = '';
      });
      wrapper.append(caption, input);
      return wrapper;
    }

    function buildQuestion() {
      const maximum = { small: 63, medium: 255, large: 4095 }[difficultySelect.value] || 255;
      const value = randomInt(1, maximum);
      const binary = value.toString(2);
      const hexadecimal = value.toString(16).toUpperCase();
      const groups = binaryGroups(binary);
      const requestedMode = modeSelect.value;
      const mode = requestedMode === 'mixed'
        ? modes[randomInt(0, modes.length - 1)]
        : requestedMode;
      currentMode = mode;
      attempts = 0;
      const source = mode.startsWith('b') ? binary : mode.startsWith('h') ? hexadecimal : String(value);
      const fields = [];

      if (mode === 'b2d') {
        fields.push([copy.selected, selectedPowers(value).join(',')]);
        fields.push([copy.decimal, String(value)]);
      } else if (mode === 'h2d') {
        fields.push([copy.contributions, hexadecimalContributions(hexadecimal).join(',')]);
        fields.push([copy.decimal, String(value)]);
      } else if (mode === 'd2b') {
        fields.push([copy.selected, selectedPowers(value).join(',')]);
        fields.push([copy.binary, binary]);
      } else if (mode === 'b2h') {
        fields.push([copy.groups, groups.join(',')]);
        fields.push([copy.hexadecimal, `${hexadecimal}|0X${hexadecimal}`]);
      } else if (mode === 'h2b') {
        const exactGroups = [...hexadecimal].map(digit => parseInt(digit, 16).toString(2).padStart(4, '0'));
        fields.push([copy.groups, exactGroups.join(',')]);
        fields.push([copy.binary, exactGroups.join('')]);
      } else {
        fields.push([copy.selected, selectedPowers(value).join(',')]);
        fields.push([copy.binary, binary]);
        fields.push([copy.groups, groups.join(',')]);
        fields.push([copy.hexadecimal, `${hexadecimal}|0X${hexadecimal}`]);
      }

      prompt.textContent = copy.prompts[mode](source);
      fieldsRoot.replaceChildren(...fields.map(([label, answer]) => makeField(label, answer)));
      feedback.textContent = '';
      generator.classList.remove('is-complete');
      solvedCurrent = false;
      stats.textContent = copy.solved(solved);
      fieldsRoot.querySelector('input')?.focus();
    }

    function checkQuestion() {
      const fields = [...fieldsRoot.querySelectorAll('[data-answer]')];
      let complete = true;
      let hasBlank = false;
      fields.forEach(field => {
        const blank = normalize(field.value) === '';
        const correct = fieldIsCorrect(field);
        hasBlank ||= blank;
        complete &&= correct;
        field.classList.toggle('is-correct', correct);
        field.classList.toggle('is-incorrect', !correct);
        field.setAttribute('aria-invalid', String(!correct));
      });
      generator.classList.toggle('is-complete', complete);
      if (!complete && !hasBlank) attempts += 1;
      feedback.textContent = complete
        ? copy.correct
        : hasBlank
          ? copy.incomplete
          : attempts >= 2
            ? `${copy.retry} ${copy.hint(copy.hints[currentMode])}`
            : copy.retry;
      if (complete && !solvedCurrent) {
        solved += 1;
        solvedCurrent = true;
        stats.textContent = copy.solved(solved);
      }
      if (!complete) fieldsRoot.querySelector('.is-incorrect')?.focus();
    }

    newButton?.addEventListener('click', buildQuestion);
    checkButton?.addEventListener('click', checkQuestion);
    modeSelect?.addEventListener('change', buildQuestion);
    difficultySelect?.addEventListener('change', buildQuestion);
    buildQuestion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll, { once: true });
  } else {
    initializeAll();
  }
})();

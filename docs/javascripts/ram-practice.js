(() => {
  const normalize = value => String(value ?? '').trim().toUpperCase().replace(/\s+/g, '').replace(',', '.');

  function randomInt(min, max) {
    const span = max - min + 1;
    if (globalThis.crypto?.getRandomValues) {
      const values = new Uint32Array(1);
      globalThis.crypto.getRandomValues(values);
      return min + (values[0] % span);
    }
    return min + Math.floor(Math.random() * span);
  }

  function makeField(label, answers) {
    const wrapper = document.createElement('label');
    wrapper.className = 'base-answer-field';
    const span = document.createElement('span');
    span.textContent = label;
    const input = document.createElement('input');
    input.dataset.answer = answers;
    input.autocomplete = 'off';
    input.addEventListener('input', () => {
      input.classList.remove('is-correct', 'is-incorrect');
      input.removeAttribute('aria-invalid');
    });
    wrapper.append(span, input);
    return wrapper;
  }

  function mark(field) {
    const accepted = (field.dataset.answer || '').split('|').map(normalize);
    const value = normalize(field.value);
    const correct = value !== '' && accepted.includes(value);
    field.classList.toggle('is-correct', correct);
    field.classList.toggle('is-incorrect', value !== '' && !correct);
    if (value !== '' && !correct) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    return { complete: value !== '', correct };
  }

  function init(root) {
    if (root.dataset.ramReady === 'true') return;
    root.dataset.ramReady = 'true';

    const lang = root.dataset.lang === 'en' ? 'en' : 'fr';
    const copy = lang === 'en' ? {
      clockPrompt: rate => `DDR${rate >= 4800 ? '5' : '4'}-${rate}: calculate the approximate memory clock.`,
      clockLabel: 'Memory clock (MHz)',
      bandwidthPrompt: (rate, channels) => `Calculate theoretical bandwidth for DDR-${rate} with ${channels} independent 64-bit channel${channels > 1 ? 's' : ''}.`,
      bandwidthLabel: 'Theoretical bandwidth (MB/s)',
      latencyPrompt: (rate, cl) => `Calculate approximate CAS latency for DDR-${rate} CL${cl}. Round to one decimal place.`,
      latencyLabel: 'CAS latency (ns)',
      correct: 'Correct. Generate another problem when ready.',
      retry: 'Review the marked field and calculation.',
      incomplete: 'Enter an answer before checking.',
      clockHint: 'DDR transfers twice per clock cycle: divide MT/s by 2.',
      bandwidthHint: 'Multiply MT/s by 8 bytes per 64-bit channel, then by channel count.',
      latencyHint: 'Use CL × 2,000 ÷ MT/s.',
      overclockPrompt: (multiplier, rate, ratio) => `Base clock is 100 MHz. Multiplier is ${multiplier}. Memory is DDR-${rate} using a ${ratio} controller ratio. Calculate all three clocks.`,
      cpuLabel: 'CPU frequency (MHz)',
      controllerLabel: 'Controller clock (MHz)',
      overclockHint: 'CPU = 100 × multiplier. Memory clock = MT/s ÷ 2. At 1:2, controller clock is half the memory clock.',
      solved: n => `Problems solved: ${n}`
    } : {
      clockPrompt: rate => `DDR${rate >= 4800 ? '5' : '4'}-${rate} : calculez l'horloge mémoire approximative.`,
      clockLabel: 'Horloge mémoire (MHz)',
      bandwidthPrompt: (rate, channels) => `Calculez la bande passante théorique de DDR-${rate} avec ${channels} canal${channels > 1 ? 'aux' : ''} indépendant${channels > 1 ? 's' : ''} de 64 bits.`,
      bandwidthLabel: 'Bande passante théorique (MB/s)',
      latencyPrompt: (rate, cl) => `Calculez la latence CAS approximative de DDR-${rate} CL${cl}. Arrondissez au dixième.`,
      latencyLabel: 'Latence CAS (ns)',
      correct: 'Réponse correcte. Générez un autre problème lorsque vous êtes prêt.',
      retry: 'Revoyez le champ signalé et votre calcul.',
      incomplete: 'Entrez une réponse avant de vérifier.',
      clockHint: 'DDR effectue deux transferts par cycle : divisez les MT/s par 2.',
      bandwidthHint: 'Multipliez les MT/s par 8 octets par canal de 64 bits, puis par le nombre de canaux.',
      latencyHint: 'Utilisez CL × 2 000 ÷ MT/s.',
      overclockPrompt: (multiplier, rate, ratio) => `L'horloge de base est 100 MHz. Le multiplicateur est ${multiplier}. La mémoire est DDR-${rate} avec un ratio contrôleur ${ratio}. Calculez les trois horloges.`,
      cpuLabel: 'Fréquence CPU (MHz)',
      controllerLabel: 'Horloge contrôleur (MHz)',
      overclockHint: "CPU = 100 × multiplicateur. Horloge mémoire = MT/s ÷ 2. En 1:2, le contrôleur utilise la moitié de l'horloge mémoire.",
      solved: n => `Problèmes réussis : ${n}`
    };

    const modes = ['clock', 'bandwidth', 'latency', 'overclock'];
    const rates = [3200, 3600, 4800, 5200, 5600, 6000, 6400];
    const cls = [28, 30, 32, 36, 38, 40, 42, 46];
    const mode = root.querySelector('[data-ram-mode]');
    const question = root.querySelector('[data-ram-question]');
    const fields = root.querySelector('[data-ram-fields]');
    const feedback = root.querySelector('[data-ram-feedback]');
    const stats = root.querySelector('[data-ram-stats]');
    let hint = '';
    let solved = 0;
    let solvedCurrent = false;

    function generate() {
      const selected = mode.value === 'mixed' ? modes[randomInt(0, modes.length - 1)] : mode.value;
      const rate = rates[randomInt(0, rates.length - 1)];
      fields.replaceChildren();
      feedback.textContent = '';
      solvedCurrent = false;

      if (selected === 'clock') {
        const answer = rate / 2;
        question.textContent = copy.clockPrompt(rate);
        fields.appendChild(makeField(copy.clockLabel, `${answer}|${answer}MHZ`));
        hint = copy.clockHint;
      } else if (selected === 'bandwidth') {
        const channels = randomInt(1, 2);
        const answer = rate * 8 * channels;
        question.textContent = copy.bandwidthPrompt(rate, channels);
        fields.appendChild(makeField(copy.bandwidthLabel, `${answer}|${answer}MB/S`));
        hint = copy.bandwidthHint;
      } else if (selected === 'latency') {
        const cl = cls[randomInt(0, cls.length - 1)];
        const answer = Math.round((cl * 2000 / rate) * 10) / 10;
        question.textContent = copy.latencyPrompt(rate, cl);
        fields.appendChild(makeField(copy.latencyLabel, `${answer}|${answer.toFixed(1)}`));
        hint = copy.latencyHint;
      } else {
        const multiplier = randomInt(45, 55);
        const ratio = randomInt(0, 1) === 0 ? '1:1' : '1:2';
        const cpu = multiplier * 100;
        const memoryClock = rate / 2;
        const controllerClock = ratio === '1:1' ? memoryClock : memoryClock / 2;
        question.textContent = copy.overclockPrompt(multiplier, rate, ratio);
        fields.appendChild(makeField(copy.cpuLabel, `${cpu}|${cpu}MHZ`));
        fields.appendChild(makeField(copy.clockLabel, `${memoryClock}|${memoryClock}MHZ`));
        fields.appendChild(makeField(copy.controllerLabel, `${controllerClock}|${controllerClock}MHZ`));
        hint = copy.overclockHint;
      }
    }

    root.querySelector('[data-ram-new]').addEventListener('click', generate);
    root.querySelector('[data-ram-check]').addEventListener('click', () => {
      const answerFields = [...fields.querySelectorAll('[data-answer]')];
      const states = answerFields.map(mark);
      if (states.some(state => !state.complete)) feedback.textContent = copy.incomplete;
      else if (states.some(state => !state.correct)) feedback.textContent = copy.retry;
      else {
        feedback.textContent = copy.correct;
        if (!solvedCurrent) {
          solvedCurrent = true;
          solved += 1;
          stats.textContent = copy.solved(solved);
        }
      }
    });
    root.querySelector('[data-ram-hint]').addEventListener('click', () => {
      feedback.textContent = hint;
    });
    mode.addEventListener('change', generate);
    generate();
  }

  function initialize(scope = document) {
    scope.querySelectorAll('[data-ram-practice]').forEach(init);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initialize());
  else initialize();

  if (globalThis.document$?.subscribe) globalThis.document$.subscribe(() => initialize());
})();

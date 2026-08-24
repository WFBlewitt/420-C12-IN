(() => {
  document.documentElement.classList.add('js-enabled');

  const storagePrefix = 'c12-lab-checklist:';

  function readState(key) {
    try {
      return JSON.parse(localStorage.getItem(storagePrefix + key)) || {};
    } catch {
      return {};
    }
  }

  function writeState(key, state) {
    try {
      localStorage.setItem(storagePrefix + key, JSON.stringify(state));
    } catch {
      // The checklist remains usable when browser storage is unavailable.
    }
  }

  function initialize(root) {
    if (root.dataset.labReady === 'true') return;
    root.dataset.labReady = 'true';

    const key = root.dataset.labId;
    const state = readState(key);
    const gateChecks = [...root.querySelectorAll('[data-lab-gate-check]')];
    const coreTaskChecks = [...root.querySelectorAll('[data-lab-task-check]:not([data-self-study-task-check])')];
    const selfStudyChecks = [...root.querySelectorAll('[data-self-study-task-check]')];
    const progressChecks = coreTaskChecks;
    const unlockButton = root.querySelector('[data-lab-unlock]');
    const content = root.querySelector('[data-lab-content]');
    const supplement = document.querySelector(`[data-lab-supplement="${key}"]`);
    const progress = root.querySelector('[data-lab-progress]');
    const progressText = root.querySelector('[data-lab-progress-text]');
    const selfStudyProgress = root.querySelector('[data-self-study-progress]');
    const selfStudyProgressText = root.querySelector('[data-self-study-progress-text]');
    const resetButton = root.querySelector('[data-lab-reset]');
    const gateStatus = root.querySelector('[data-lab-gate-status]');
    const typeOnlyCommands = [...root.querySelectorAll('[data-lab-type-only]')];

    typeOnlyCommands.forEach(command => {
      command.title = command.dataset.typeLabel;
      ['copy', 'cut', 'dragstart'].forEach(eventName => {
        command.addEventListener(eventName, event => event.preventDefault());
      });
    });

    gateChecks.forEach((check, index) => {
      check.checked = Boolean(state.gate?.[index]);
    });

    coreTaskChecks.forEach((check, index) => {
      check.checked = Boolean(state.tasks?.[index]);
    });

    selfStudyChecks.forEach((check, index) => {
      check.checked = Boolean(state.selfStudy?.[index]);
    });

    function save() {
      writeState(key, {
        gate: gateChecks.map(check => check.checked),
        tasks: coreTaskChecks.map(check => check.checked),
        selfStudy: selfStudyChecks.map(check => check.checked),
        unlocked: content.hidden === false
      });
    }

    function updateGate() {
      const completed = gateChecks.filter(check => check.checked).length;
      const ready = completed === gateChecks.length;
      unlockButton.disabled = !ready;
      gateStatus.textContent = root.dataset.gateTemplate
        .replace('{done}', completed)
        .replace('{total}', gateChecks.length);
      save();
    }

    function updateProgress() {
      const completed = progressChecks.filter(check => check.checked).length;
      const total = progressChecks.length;
      progress.max = total;
      progress.value = completed;
      progressText.textContent = root.dataset.progressTemplate
        .replace('{done}', completed)
        .replace('{total}', total);

      root.querySelectorAll('[data-lab-stage]').forEach(stage => {
        const checks = [...stage.querySelectorAll('[data-lab-task-check]')];
        stage.classList.toggle('is-complete', checks.length > 0 && checks.every(check => check.checked));
      });
      save();
    }

    function updateSelfStudyProgress() {
      if (!selfStudyProgress || !selfStudyProgressText) return;
      const completed = selfStudyChecks.filter(check => check.checked).length;
      const total = selfStudyChecks.length;
      selfStudyProgress.max = total;
      selfStudyProgress.value = completed;
      selfStudyProgressText.textContent = root.dataset.selfStudyTemplate
        .replace('{done}', completed)
        .replace('{total}', total);

      root.querySelectorAll('[data-self-study-stage]').forEach(stage => {
        const checks = [...stage.querySelectorAll('[data-self-study-task-check]')];
        stage.classList.toggle('is-complete', checks.length > 0 && checks.every(check => check.checked));
      });
      save();
    }

    gateChecks.forEach(check => check.addEventListener('change', updateGate));
    coreTaskChecks.forEach(check => check.addEventListener('change', updateProgress));
    selfStudyChecks.forEach(check => check.addEventListener('change', updateSelfStudyProgress));

    unlockButton.addEventListener('click', () => {
      if (gateChecks.some(check => !check.checked)) return;
      content.hidden = false;
      if (supplement) supplement.hidden = false;
      save();
      content.querySelector('h2')?.focus({ preventScroll: true });
      content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    resetButton.addEventListener('click', () => {
      if (!window.confirm(root.dataset.resetConfirm)) return;
      gateChecks.forEach(check => { check.checked = false; });
      coreTaskChecks.forEach(check => { check.checked = false; });
      selfStudyChecks.forEach(check => { check.checked = false; });
      content.hidden = true;
      if (supplement) supplement.hidden = true;
      try {
        localStorage.removeItem(storagePrefix + key);
      } catch {
        // Nothing else is required when storage is unavailable.
      }
      updateGate();
      updateProgress();
      updateSelfStudyProgress();
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (state.unlocked && gateChecks.every(check => check.checked)) {
      content.hidden = false;
      if (supplement) supplement.hidden = false;
    }

    updateGate();
    updateProgress();
    updateSelfStudyProgress();
  }

  function initializeAll() {
    document.querySelectorAll('[data-lab-checklist]').forEach(initialize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll, { once: true });
  } else {
    initializeAll();
  }
})();

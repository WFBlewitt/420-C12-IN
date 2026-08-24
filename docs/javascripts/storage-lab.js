(() => {
  const messages = {
    fr: {
      invalidNumber: 'Entrez un nombre de disques entier et une capacité positive.',
      invalid: {
        0: 'RAID 0 exige au moins 2 disques.',
        1: 'RAID 1 exige au moins 2 disques.',
        5: 'RAID 5 exige au moins 3 disques.',
        6: 'RAID 6 exige au moins 4 disques.',
        10: 'RAID 10 exige au moins 4 disques et un nombre pair.'
      },
      title: 'Résultat du planificateur',
      raw: 'Capacité brute',
      usable: 'Capacité utile théorique',
      minimum: 'Configuration minimale',
      tolerance: 'Tolérance aux pannes',
      warning: 'Limite',
      drives: 'disques',
      levels: {
        0: { tolerance: 'Aucune. La panne d’un seul membre compromet l’ensemble.', warning: 'Aucune copie ni parité; RAID 0 ne fournit pas de redondance.' },
        1: { tolerance: 'Jusqu’à {count} panne(s) dans un miroir à {drives} membres, tant qu’une copie complète demeure.', warning: 'Une suppression ou une corruption logique est reproduite sur les miroirs.' },
        5: { tolerance: 'Une panne de disque.', warning: 'Après une panne, l’ensemble est dégradé jusqu’à la fin de la reconstruction.' },
        6: { tolerance: 'Deux pannes de disque.', warning: 'La double parité réduit la capacité utile et ne remplace pas une sauvegarde.' },
        10: { tolerance: 'Au moins une panne; jusqu’à une panne par paire miroir si les pannes touchent des paires différentes.', warning: 'La perte des deux membres d’une même paire compromet l’ensemble.' }
      }
    },
    en: {
      invalidNumber: 'Enter an integer drive count and a positive capacity.',
      invalid: {
        0: 'RAID 0 requires at least 2 drives.',
        1: 'RAID 1 requires at least 2 drives.',
        5: 'RAID 5 requires at least 3 drives.',
        6: 'RAID 6 requires at least 4 drives.',
        10: 'RAID 10 requires at least 4 drives and an even count.'
      },
      title: 'Planner result',
      raw: 'Raw capacity',
      usable: 'Theoretical usable capacity',
      minimum: 'Minimum configuration',
      tolerance: 'Fault tolerance',
      warning: 'Limit',
      drives: 'drives',
      levels: {
        0: { tolerance: 'None. Failure of one member compromises the set.', warning: 'There is no copy or parity; RAID 0 does not provide redundancy.' },
        1: { tolerance: 'Up to {count} failure(s) in a {drives}-member mirror, provided one complete copy remains.', warning: 'A deletion or logical corruption is reproduced on the mirrors.' },
        5: { tolerance: 'One drive failure.', warning: 'After a failure, the set is degraded until rebuilding is complete.' },
        6: { tolerance: 'Two drive failures.', warning: 'Dual parity reduces usable capacity and does not replace backup.' },
        10: { tolerance: 'At least one failure; up to one failure per mirror pair when failures affect different pairs.', warning: 'Loss of both members of one pair compromises the set.' }
      }
    }
  };

  function formatCapacity(value, lang) {
    const locale = lang === 'fr' ? 'fr-CA' : 'en-CA';
    const unit = lang === 'fr' ? 'To' : 'TB';
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value)} ${unit}`;
  }

  function minimumFor(level) {
    return level === '5' ? 3 : level === '6' || level === '10' ? 4 : 2;
  }

  function usableFor(level, count, size) {
    if (level === '0') return count * size;
    if (level === '1') return size;
    if (level === '5') return (count - 1) * size;
    if (level === '6') return (count - 2) * size;
    return (count / 2) * size;
  }

  function setOutput(output, title, paragraphs) {
    output.replaceChildren();
    const heading = document.createElement('strong');
    heading.textContent = title;
    output.appendChild(heading);
    paragraphs.forEach(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      output.appendChild(paragraph);
    });
  }

  function initialize(root) {
    if (root.dataset.raidReady === 'true') return;
    root.dataset.raidReady = 'true';

    const lang = root.dataset.lang === 'fr' ? 'fr' : 'en';
    const text = messages[lang];
    const levelInput = root.querySelector('[data-raid-level]');
    const countInput = root.querySelector('[data-raid-count]');
    const sizeInput = root.querySelector('[data-raid-size]');
    const button = root.querySelector('[data-raid-calculate]');
    const output = root.querySelector('[data-raid-output]');

    function calculate() {
      const level = levelInput.value;
      const count = Number(countInput.value);
      const size = Number(sizeInput.value);

      if (!Number.isInteger(count) || count < 1 || !Number.isFinite(size) || size <= 0) {
        setOutput(output, text.title, [text.invalidNumber]);
        return;
      }

      const minimum = minimumFor(level);
      if (count < minimum || (level === '10' && count % 2 !== 0)) {
        setOutput(output, text.title, [text.invalid[level]]);
        return;
      }

      const raw = count * size;
      const usable = usableFor(level, count, size);
      const levelText = text.levels[level];
      const tolerance = levelText.tolerance
        .replace('{count}', String(Math.max(0, count - 1)))
        .replace('{drives}', String(count));

      setOutput(output, text.title, [
        `${text.raw}: ${formatCapacity(raw, lang)}.`,
        `${text.usable}: ${formatCapacity(usable, lang)}.`,
        `${text.minimum}: ${minimum} ${text.drives}.`,
        `${text.tolerance}: ${tolerance}`,
        `${text.warning}: ${levelText.warning}`
      ]);
    }

    button?.addEventListener('click', calculate);
    [levelInput, countInput, sizeInput].forEach(input => input?.addEventListener('change', calculate));
    calculate();
  }

  function initializeAll() {
    document.querySelectorAll('[data-raid-planner]').forEach(initialize);
  }

  document.addEventListener('DOMContentLoaded', initializeAll);
  document.addEventListener('DOMContentSwitch', initializeAll);
  initializeAll();
})();

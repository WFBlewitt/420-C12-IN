(() => {
  function normalize(value) {
    return String(value)
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/[×*]/g, 'X');
  }

  function answers(field) {
    return (field.dataset.answer || '').split('|').map(normalize).filter(Boolean);
  }

  function isCorrect(field) {
    const value = normalize(field.value);
    return value !== '' && answers(field).includes(value);
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

  function pick(items) {
    return items[randomInt(0, items.length - 1)];
  }

  function bits(value, width) {
    return value.toString(2).padStart(width, '0');
  }

  function hex(value, digits) {
    return value.toString(16).toUpperCase().padStart(digits, '0');
  }

  function byteGroups(hexadecimal) {
    return hexadecimal.match(/.{2}/g) || [];
  }

  function decimalAnswers(value, lang) {
    const plain = String(value);
    return lang === 'fr' && plain.includes('.')
      ? `${plain}|${plain.replace('.', ',')}`
      : plain;
  }

  function floatFields(value) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, value, false);
    const unsigned = view.getUint32(0, false);
    const allBits = unsigned.toString(2).padStart(32, '0');
    const hexadecimal = unsigned.toString(16).toUpperCase().padStart(8, '0');
    const sign = allBits[0];
    const exponentBits = allBits.slice(1, 9);
    const fractionBits = allBits.slice(9);
    const storedExponent = parseInt(exponentBits, 2);
    const actualExponent = storedExponent - 127;
    const trimmed = fractionBits.replace(/0+$/, '') || '0';
    return {
      allBits,
      hexadecimal,
      sign,
      exponentBits,
      fractionBits,
      storedExponent,
      actualExponent,
      significand: `1.${trimmed}`,
      normalized: `1.${trimmed}X2^${actualExponent}`
    };
  }

  function exactBinary(value) {
    const absolute = Math.abs(value);
    const integer = Math.floor(absolute);
    let fraction = absolute - integer;
    let fractionBits = '';
    for (let index = 0; index < 12 && fraction !== 0; index += 1) {
      fraction *= 2;
      const bit = Math.floor(fraction);
      fractionBits += bit;
      fraction -= bit;
    }
    return fractionBits ? `${integer.toString(2)}.${fractionBits}` : integer.toString(2);
  }

  function initializeGenerator(root) {
    if (root.dataset.internalPracticeReady === 'true') return;
    root.dataset.internalPracticeReady = 'true';

    const lang = root.dataset.lang === 'en' ? 'en' : 'fr';
    const copy = {
      fr: {
        sign: 'Signe', positive: 'positif', negative: 'négatif',
        decimal: 'Valeur décimale', hexadecimal: 'Hexadécimal', binary: 'Binaire', binaryMagnitude: 'Grandeur en binaire',
        inverted: 'Bits inversés', plusOne: 'Après ajout de 1', magnitude: 'Grandeur',
        absoluteBits: 'Valeur absolue à la largeur demandée', finalBits: 'Représentation finale',
        fractionWeights: 'Poids fractionnaires sélectionnés',
        normalized: 'Forme normalisée', actualExponent: 'Exposant réel',
        biasedExponent: 'Exposant décalé', exponentBits: 'Bits d’exposant',
        fractionBits: '23 bits de fraction', assembled: 'Assemblage sur 32 bits',
        significand: 'Significande avec le 1 implicite',
        bigEndian: 'Octets gros-boutistes', littleEndian: 'Octets petit-boutistes',
        logicalHex: 'Valeur hexadécimale logique', character: 'Caractère', codePoint: 'Point de code',
        incomplete: 'Remplissez tous les champs avant de vérifier.',
        retry: 'Certaines étapes sont à revoir. Les champs concernés sont indiqués.',
        correct: 'Démarche correcte. Générez une nouvelle question lorsque vous êtes prêt.',
        solved: count => `Problèmes réussis : ${count}`,
        hint: value => `Indice de méthode : ${value}`,
        hints: {
          unsigned: 'Attribuez à chaque bit son poids, puis additionnez seulement les positions qui contiennent 1.',
          'signed-decode': 'Commencez par le bit de gauche. Pour une valeur négative, inversez toute la largeur, ajoutez 1, puis appliquez le signe.',
          'signed-encode': 'Écrivez d’abord la grandeur positive à la largeur demandée; pour une valeur négative, inversez tous les bits et ajoutez 1.',
          fraction: 'À droite du point, les poids sont successivement 1/2, 1/4, 1/8 et ainsi de suite.',
          'ieee-encode': 'Séparez le signe, normalisez sous la forme 1.F × 2^e, puis stockez e + 127.',
          'ieee-decode': 'Séparez 1, 8 et 23 bits; calculez E - 127 et replacez le 1 implicite avant de déplacer le point.',
          ascii: 'Distinguez le caractère, son point de code et les octets qui l’encodent.',
          endian: 'Séparez d’abord l’hexadécimal en octets de deux chiffres; le petit-boutisme inverse les octets, pas les bits.'
        },
        prompts: {
          unsignedDecode: (b, w) => `Interprétez ${b} comme entier non signé de ${w} bits.`,
          signedDecode: (b, w) => `Interprétez ${b} comme entier signé de ${w} bits.`,
          signedEncode: (v, w) => `Représentez ${v} comme entier signé de ${w} bits.`,
          fraction: b => `Convertissez ${b} (base 2) vers la base 10.`,
          ieeeEncode: v => `Construisez l’IEEE 754 simple précision de ${String(v).replace('.', ',')}.`,
          ieeeDecode: h => `Décodez le réel IEEE 754 0x${h}.`,
          asciiEncode: c => `Encodez le caractère « ${c} » en ASCII/UTF-8.`,
          asciiDecode: h => `Décodez l’octet ASCII/UTF-8 0x${h}.`,
          endianLogical: (h, w) => `Placez la valeur 0x${h} (${w} bits) dans les deux ordres d’octets.`,
          endianStored: (b, w) => `Les octets ${b} contiennent un entier non signé de ${w} bits en petit-boutiste. Reconstruisez-le.`
        }
      },
      en: {
        sign: 'Sign', positive: 'positive', negative: 'negative',
        decimal: 'Decimal value', hexadecimal: 'Hexadecimal', binary: 'Binary', binaryMagnitude: 'Binary magnitude',
        inverted: 'Inverted bits', plusOne: 'After adding 1', magnitude: 'Magnitude',
        absoluteBits: 'Absolute value at the required width', finalBits: 'Final representation',
        fractionWeights: 'Selected fractional weights',
        normalized: 'Normalized form', actualExponent: 'Actual exponent',
        biasedExponent: 'Biased exponent', exponentBits: 'Exponent bits',
        fractionBits: '23 fraction bits', assembled: '32-bit assembly',
        significand: 'Significand with the implicit 1',
        bigEndian: 'Big-endian bytes', littleEndian: 'Little-endian bytes',
        logicalHex: 'Logical hexadecimal value', character: 'Character', codePoint: 'Code point',
        incomplete: 'Complete every field before checking.',
        retry: 'Some steps need another look. The relevant fields are marked.',
        correct: 'Your work is correct. Generate a new question when you are ready.',
        solved: count => `Problems solved: ${count}`,
        hint: value => `Method cue: ${value}`,
        hints: {
          unsigned: 'Assign each bit its positional weight, then add only the positions containing 1.',
          'signed-decode': 'Begin with the leftmost bit. For a negative value, invert the entire width, add 1, and then apply the sign.',
          'signed-encode': 'Write the positive magnitude at the required width; for a negative value, invert every bit and add 1.',
          fraction: 'To the right of the point, the weights are 1/2, 1/4, 1/8, and so on.',
          'ieee-encode': 'Separate the sign, normalize as 1.F × 2^e, then store e + 127.',
          'ieee-decode': 'Separate 1, 8, and 23 bits; calculate E - 127 and restore the implicit 1 before moving the point.',
          ascii: 'Distinguish the character, its code point, and the bytes that encode it.',
          endian: 'First split hexadecimal into two-digit bytes; little-endian reverses bytes, not bits.'
        },
        prompts: {
          unsignedDecode: (b, w) => `Interpret ${b} as a ${w}-bit unsigned integer.`,
          signedDecode: (b, w) => `Interpret ${b} as a ${w}-bit signed integer.`,
          signedEncode: (v, w) => `Represent ${v} as a ${w}-bit signed integer.`,
          fraction: b => `Convert ${b} (base 2) to base 10.`,
          ieeeEncode: v => `Construct the IEEE 754 single-precision form of ${v}.`,
          ieeeDecode: h => `Decode the IEEE 754 value 0x${h}.`,
          asciiEncode: c => `Encode the character “${c}” in ASCII/UTF-8.`,
          asciiDecode: h => `Decode the ASCII/UTF-8 byte 0x${h}.`,
          endianLogical: (h, w) => `Place the ${w}-bit value 0x${h} in both byte orders.`,
          endianStored: (b, w) => `The bytes ${b} contain a ${w}-bit little-endian unsigned integer. Reconstruct it.`
        }
      }
    }[lang];

    const modes = ['unsigned', 'signed-decode', 'signed-encode', 'fraction', 'ieee-encode', 'ieee-decode', 'ascii', 'endian'];
    const modeSelect = root.querySelector('[data-ir-mode]');
    const levelSelect = root.querySelector('[data-ir-level]');
    const prompt = root.querySelector('[data-ir-question]');
    const fieldsRoot = root.querySelector('[data-ir-fields]');
    const feedback = root.querySelector('[data-ir-feedback]');
    const stats = root.querySelector('[data-ir-stats]');
    let solved = 0;
    let solvedCurrent = false;
    let attempts = 0;
    let currentMode = 'unsigned';

    function makeField(label, accepted, placeholder = '') {
      const wrapper = document.createElement('label');
      wrapper.className = 'base-answer-field';
      const caption = document.createElement('span');
      caption.textContent = label;
      const input = document.createElement('input');
      input.dataset.answer = accepted;
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

    function integerWidth(level) {
      return level === 'extended' && randomInt(0, 1) ? 16 : 8;
    }

    function buildUnsigned(level) {
      const width = integerWidth(level);
      const value = randomInt(0, (2 ** width) - 1);
      const binary = bits(value, width);
      prompt.textContent = copy.prompts.unsignedDecode(binary, width);
      return [
        [copy.hexadecimal, `${hex(value, width / 4)}|0X${hex(value, width / 4)}`],
        [copy.decimal, String(value)]
      ];
    }

    function buildSignedDecode(level) {
      const width = integerWidth(level);
      const minimum = -(2 ** (width - 1));
      const maximum = (2 ** (width - 1)) - 1;
      const value = randomInt(0, 1) ? randomInt(minimum, -1) : randomInt(0, maximum);
      const encoded = value < 0 ? (2 ** width) + value : value;
      const binary = bits(encoded, width);
      prompt.textContent = copy.prompts.signedDecode(binary, width);
      const fields = [[copy.sign, value < 0 ? `${copy.negative}|NEGATIVE|NÉGATIF|NEGATIF` : `${copy.positive}|POSITIVE|POSITIF`]];
      if (value < 0) {
        const inverted = bits(((2 ** width) - 1) ^ encoded, width);
        const magnitude = Math.abs(value);
        fields.push([copy.inverted, inverted]);
        fields.push([copy.plusOne, bits(magnitude, width)]);
        fields.push([copy.magnitude, String(magnitude)]);
      }
      fields.push([copy.decimal, String(value)]);
      return fields;
    }

    function buildSignedEncode(level) {
      const width = integerWidth(level);
      const minimum = -(2 ** (width - 1));
      const maximum = (2 ** (width - 1)) - 1;
      let value = randomInt(minimum, maximum);
      if (value === 0) value = 1;
      const encoded = value < 0 ? (2 ** width) + value : value;
      const finalBits = bits(encoded, width);
      prompt.textContent = copy.prompts.signedEncode(value, width);
      const fields = [];
      if (value < 0) {
        const absolute = bits(Math.abs(value), width);
        const inverted = bits(((2 ** width) - 1) ^ Math.abs(value), width);
        fields.push([copy.absoluteBits, absolute]);
        fields.push([copy.inverted, inverted]);
        fields.push([copy.plusOne, finalBits]);
      }
      fields.push([copy.finalBits, finalBits]);
      fields.push([copy.hexadecimal, `${hex(encoded, width / 4)}|0X${hex(encoded, width / 4)}`]);
      return fields;
    }

    function buildFraction(level) {
      const places = level === 'extended' ? 8 : 4;
      const integer = randomInt(0, level === 'extended' ? 31 : 7);
      const numerator = randomInt(1, (2 ** places) - 1);
      const fractionalBits = bits(numerator, places);
      const binary = `${integer.toString(2)}.${fractionalBits}`;
      const weights = [...fractionalBits]
        .map((bit, index) => bit === '1' ? `1/${2 ** (index + 1)}` : null)
        .filter(Boolean)
        .join(',');
      const value = integer + numerator / (2 ** places);
      prompt.textContent = copy.prompts.fraction(binary);
      return [
        [copy.fractionWeights, weights],
        [copy.decimal, decimalAnswers(value, lang)]
      ];
    }

    function exactFloatValue(level) {
      const denominator = level === 'extended' ? 8 : 4;
      const maximumInteger = level === 'extended' ? 127 : 31;
      const magnitude = randomInt(1, maximumInteger * denominator) / denominator;
      return randomInt(0, 1) ? magnitude : -magnitude;
    }

    function buildIeeeEncode(level) {
      const value = exactFloatValue(level);
      const details = floatFields(value);
      const binary = exactBinary(value);
      prompt.textContent = copy.prompts.ieeeEncode(value);
      return [
        [copy.sign, details.sign],
        [copy.binaryMagnitude, `${binary}|${binary}.0`],
        [copy.normalized, details.normalized],
        [copy.actualExponent, String(details.actualExponent)],
        [copy.biasedExponent, String(details.storedExponent)],
        [copy.exponentBits, details.exponentBits],
        [copy.fractionBits, details.fractionBits],
        [copy.assembled, details.allBits],
        [copy.hexadecimal, `${details.hexadecimal}|0X${details.hexadecimal}`]
      ];
    }

    function buildIeeeDecode(level) {
      const value = exactFloatValue(level);
      const details = floatFields(value);
      prompt.textContent = copy.prompts.ieeeDecode(details.hexadecimal);
      return [
        [copy.assembled, details.allBits],
        [copy.sign, details.sign],
        [copy.exponentBits, details.exponentBits],
        [copy.actualExponent, String(details.actualExponent)],
        [copy.significand, details.significand],
        [copy.decimal, decimalAnswers(value, lang)]
      ];
    }

    function buildAscii() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@#$%&';
      const character = characters[randomInt(0, characters.length - 1)];
      const value = character.codePointAt(0);
      const hexadecimal = hex(value, 2);
      if (randomInt(0, 1)) {
        prompt.textContent = copy.prompts.asciiEncode(character);
        return [
          [copy.codePoint, `U+${hex(value, 4)}|${hex(value, 4)}`],
          [copy.decimal, String(value)],
          [copy.hexadecimal, `${hexadecimal}|0X${hexadecimal}`],
          [copy.binary, bits(value, 8)]
        ];
      }
      prompt.textContent = copy.prompts.asciiDecode(hexadecimal);
      return [
        [copy.character, character],
        [copy.codePoint, `U+${hex(value, 4)}|${hex(value, 4)}`],
        [copy.decimal, String(value)],
        [copy.binary, bits(value, 8)]
      ];
    }

    function buildEndian(level) {
      const width = level === 'extended' && randomInt(0, 1) ? 32 : 16;
      const digits = width / 4;
      const minimum = 16 ** (digits - 1);
      const maximum = Math.min((2 ** width) - 1, 0xFFFFFFFF);
      const value = randomInt(minimum, maximum);
      const hexadecimal = hex(value, digits);
      const big = byteGroups(hexadecimal);
      const little = [...big].reverse();
      if (randomInt(0, 1)) {
        prompt.textContent = copy.prompts.endianLogical(hexadecimal, width);
        return [
          [copy.bigEndian, `${big.join(',')}|${big.join(';')}|${big.join('')}`],
          [copy.littleEndian, `${little.join(',')}|${little.join(';')}|${little.join('')}`]
        ];
      }
      prompt.textContent = copy.prompts.endianStored(little.join(' '), width);
      return [
        [copy.bigEndian, `${big.join(',')}|${big.join(';')}|${big.join('')}`],
        [copy.logicalHex, `${hexadecimal}|0X${hexadecimal}`],
        [copy.decimal, String(value)]
      ];
    }

    function buildQuestion() {
      const level = levelSelect.value === 'extended' ? 'extended' : 'core';
      const selected = modeSelect.value;
      const mode = selected === 'mixed' ? pick(modes) : selected;
      currentMode = mode;
      attempts = 0;
      let fields;
      if (mode === 'unsigned') fields = buildUnsigned(level);
      else if (mode === 'signed-decode') fields = buildSignedDecode(level);
      else if (mode === 'signed-encode') fields = buildSignedEncode(level);
      else if (mode === 'fraction') fields = buildFraction(level);
      else if (mode === 'ieee-encode') fields = buildIeeeEncode(level);
      else if (mode === 'ieee-decode') fields = buildIeeeDecode(level);
      else if (mode === 'ascii') fields = buildAscii();
      else fields = buildEndian(level);

      fieldsRoot.replaceChildren(...fields.map(([label, accepted]) => makeField(label, accepted)));
      feedback.textContent = '';
      root.classList.remove('is-complete');
      solvedCurrent = false;
      stats.textContent = copy.solved(solved);
      fieldsRoot.querySelector('input')?.focus();
    }

    function checkQuestion() {
      const fields = [...fieldsRoot.querySelectorAll('[data-answer]')];
      let complete = true;
      let blank = false;
      fields.forEach(field => {
        const empty = normalize(field.value) === '';
        const correct = isCorrect(field);
        blank ||= empty;
        complete &&= correct;
        field.classList.toggle('is-correct', correct);
        field.classList.toggle('is-incorrect', !correct);
        field.setAttribute('aria-invalid', String(!correct));
      });
      root.classList.toggle('is-complete', complete);
      if (!complete && !blank) attempts += 1;
      feedback.textContent = complete
        ? copy.correct
        : blank
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

    root.querySelector('[data-ir-new]')?.addEventListener('click', buildQuestion);
    root.querySelector('[data-ir-check]')?.addEventListener('click', checkQuestion);
    modeSelect?.addEventListener('change', buildQuestion);
    levelSelect?.addEventListener('change', buildQuestion);
    buildQuestion();
  }

  function initializeAll() {
    document.querySelectorAll('[data-internal-practice]').forEach(initializeGenerator);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll, { once: true });
  } else {
    initializeAll();
  }
})();

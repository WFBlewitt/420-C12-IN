(() => {
  const DATA_ROOT = new URL('../assets/data/meilleurachat/', document.currentScript.src);
  let dataPromise;

  async function loadData() {
    if (!dataPromise) {
      dataPromise = (async () => {
        const meta = await fetch(new URL('catalogue.json', DATA_ROOT)).then(r => {
          if (!r.ok) throw new Error(`Catalogue metadata: ${r.status}`);
          return r.json();
        });
        const entries = await Promise.all(meta.category_order.map(async key => {
          const value = await fetch(new URL(`categories/${key}.json`, DATA_ROOT)).then(r => {
            if (!r.ok) throw new Error(`Catalogue category ${key}: ${r.status}`);
            return r.json();
          });
          return [key, value];
        }));
        return { ...meta, categories: Object.fromEntries(entries) };
      })();
    }
    return dataPromise;
  }

  function makeNode(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  async function init(root) {
    if (root.dataset.pcBuildReady) return;
    root.dataset.pcBuildReady = 'true';
    const fr = (root.dataset.lang || 'en') === 'fr';
    const budget = Number(root.dataset.budget || 2000);
    const money = new Intl.NumberFormat(fr ? 'fr-CA' : 'en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
    const selects = [...root.querySelectorAll('[data-build-select]')];
    const totalNode = root.querySelector('[data-build-total]');
    const remainingNode = root.querySelector('[data-build-remaining]');
    const feedbackNode = root.querySelector('[data-build-feedback]');
    const scoreNode = root.querySelector('[data-build-score]');
    const submitButton = root.querySelector('[data-build-check]');
    const autoTask = root.closest('[data-lab-checklist]')?.querySelector('[data-build-auto-task]');
    let submitted = false;
    let data;

    try {
      data = await loadData();
    } catch (error) {
      feedbackNode.replaceChildren(makeNode('p', 'pc-build-error', fr ? 'Le catalogue technique n’a pas pu être chargé.' : 'The technical catalogue could not be loaded.'));
      submitButton.disabled = true;
      console.error(error);
      return;
    }

    const fleetSize = data.fleet_size || 50;
    const catalog = Object.fromEntries(Object.entries(data.categories).map(([key, category]) => [key, category.products]));
    const label = item => item[fr ? 'label_fr' : 'label_en'];
    const required = ['cpu', 'ram', 'gpu', 'storage', 'case', 'cooler', 'psu', 'wifi'];

    function selected() {
      const build = {};
      selects.forEach(select => {
        if (select.value) build[select.dataset.buildSelect] = catalog[select.dataset.buildSelect][select.value];
      });
      return build;
    }

    function selectedKeys() {
      return Object.fromEntries(selects.filter(select => select.value).map(select => [select.dataset.buildSelect, select.value]));
    }

    const totalFor = build => Object.values(build).reduce((sum, item) => sum + item.price, 0);

    function setAutoTask(value) {
      if (!autoTask) return;
      autoTask.checked = value;
      autoTask.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function updateArithmetic() {
      const total = totalFor(selected());
      totalNode.textContent = money.format(total);
      remainingNode.textContent = money.format(budget - total);
      if (submitted) {
        feedbackNode.replaceChildren(makeNode('p', '', fr ? 'La configuration a été modifiée. Soumettez-la de nouveau pour recevoir un rapport à jour.' : 'The configuration has changed. Submit it again to receive an updated report.'));
        scoreNode.textContent = '';
        submitted = false;
        setAutoTask(false);
      }
    }

    function addIssue(list, title, detail, item) {
      list.push({ title, detail, item, exposure: item.price * fleetSize });
    }

    function addSection(report, title, items, kind) {
      if (!items.length) return;
      const section = makeNode('section', `pc-build-report-section pc-build-${kind}`);
      section.appendChild(makeNode('h4', '', title));
      const list = document.createElement('ul');
      items.forEach(item => {
        const li = document.createElement('li');
        if (typeof item === 'string') {
          li.textContent = item;
        } else {
          li.append(makeNode('strong', '', `${item.title}: `), document.createTextNode(item.detail));
          if (item.exposure !== undefined) {
            li.appendChild(makeNode('small', '', fr ? ` Valeur touchée pour ${fleetSize} postes : ${money.format(item.exposure)}.` : ` Affected value for ${fleetSize} computers: ${money.format(item.exposure)}.`));
          }
        }
        list.appendChild(li);
      });
      section.appendChild(list);
      report.appendChild(section);
    }

    function scoreTable(build, adjustmentRows, finalScore) {
      const wrapper = makeNode('section', 'pc-build-report-section pc-build-score-breakdown');
      wrapper.appendChild(makeNode('h4', '', fr ? 'Indice publié' : 'Published index'));
      const table = document.createElement('table');
      const head = document.createElement('thead');
      head.innerHTML = `<tr><th>${fr ? 'Catégorie' : 'Category'}</th><th>${fr ? 'Produit' : 'Product'}</th><th>${fr ? 'Note' : 'Rating'}</th></tr>`;
      table.appendChild(head);
      const body = document.createElement('tbody');
      required.forEach(key => {
        const row = document.createElement('tr');
        [data.categories[key][fr ? 'fr' : 'en'], label(build[key]), `${build[key].score.toFixed(1)}/10`].forEach(text => row.appendChild(makeNode('td', '', text)));
        body.appendChild(row);
      });
      adjustmentRows.forEach(adjustment => {
        const row = document.createElement('tr');
        row.append(makeNode('td', '', fr ? 'Ajustement publié' : 'Published adjustment'), makeNode('td', '', adjustment.reason), makeNode('td', '', adjustment.value.toFixed(1)));
        body.appendChild(row);
      });
      const totalRow = document.createElement('tr');
      totalRow.append(makeNode('td', '', fr ? 'Total' : 'Total'), makeNode('td', '', fr ? 'Maximum : 80' : 'Maximum: 80'), makeNode('td', '', `${finalScore.toFixed(1)}/80`));
      body.appendChild(totalRow);
      table.appendChild(body);
      wrapper.appendChild(table);
      return wrapper;
    }

    function evaluate() {
      const build = selected();
      const keys = selectedKeys();
      const missing = required.filter(key => !build[key]);
      if (missing.length) {
        feedbackNode.replaceChildren(makeNode('p', 'pc-build-warning', fr ? 'Choisissez un produit dans chaque catégorie avant de libérer le bon de commande.' : 'Choose one product in every category before releasing the purchase order.'));
        scoreNode.textContent = '';
        setAutoTask(false);
        return;
      }

      submitted = true;
      const errors = [], warnings = [], strengths = [], suitability = [], adjustments = [];
      const total = totalFor(build);

      if (build.cpu.socket !== 'LGA1851') addIssue(errors, fr ? 'Socket du processeur' : 'Processor socket', fr ? `${label(build.cpu)} utilise ${build.cpu.socket}; la carte mère exige LGA1851.` : `${label(build.cpu)} uses ${build.cpu.socket}; the motherboard requires LGA1851.`, build.cpu);
      else strengths.push(fr ? 'Le processeur utilise le socket LGA1851.' : 'The processor uses the LGA1851 socket.');
      if (build.ram.type !== 'DDR5' || build.ram.form !== 'UDIMM') addIssue(errors, fr ? 'Type de mémoire' : 'Memory type', fr ? `${label(build.ram)} est ${build.ram.type} ${build.ram.form}; la carte mère exige DDR5 UDIMM.` : `${label(build.ram)} is ${build.ram.type} ${build.ram.form}; the motherboard requires DDR5 UDIMM.`, build.ram);
      else strengths.push(fr ? 'La mémoire correspond au type DDR5 UDIMM.' : 'The memory matches DDR5 UDIMM.');
      if (build.ram.capacity < 32) addIssue(errors, fr ? 'Capacité mémoire' : 'Memory capacity', fr ? `${label(build.ram)} fournit ${build.ram.capacity} Go; le mandat exige au moins 32 Go.` : `${label(build.ram)} provides ${build.ram.capacity} GB; the brief requires at least 32 GB.`, build.ram);
      if (build.ram.modules === 1) warnings.push(fr ? 'La mémoire utilise un seul module : la capacité est suffisante, mais la bande passante initiale est réduite sur cette plateforme double canal.' : 'The memory uses one module: capacity is sufficient, but initial bandwidth is reduced on this dual-channel platform.');
      if (build.storage.capacity < 2 || build.storage.interface !== 'NVMe' || build.storage.length !== 2280) addIssue(errors, fr ? 'Stockage principal' : 'Primary storage', fr ? `${label(build.storage)} fournit ${build.storage.capacity} To, interface ${build.storage.interface}, format ${build.storage.length || '2,5 po'}; le mandat exige au moins 2 To NVMe M.2 2280.` : `${label(build.storage)} provides ${build.storage.capacity} TB, ${build.storage.interface}, form ${build.storage.length || '2.5-inch'}; the brief requires at least 2 TB NVMe M.2 2280.`, build.storage);
      else strengths.push(fr ? 'Le stockage respecte la capacité, l’interface et le format exigés.' : 'Storage meets the required capacity, interface, and form factor.');
      if (!build.case.boards.includes('microATX')) addIssue(errors, fr ? 'Format du boîtier' : 'Case form factor', fr ? `${label(build.case)} accepte ${build.case.boards.join(', ')}; la carte mère est microATX.` : `${label(build.case)} supports ${build.case.boards.join(', ')}; the motherboard is microATX.`, build.case);
      else strengths.push(fr ? 'Le boîtier accepte une carte mère microATX.' : 'The case supports a microATX motherboard.');
      if (build.gpu.length > build.case.gpu) addIssue(errors, fr ? 'Longueur de la carte graphique' : 'Graphics-card length', fr ? `${label(build.gpu)} mesure ${build.gpu.length} mm; ${label(build.case)} accepte au maximum ${build.case.gpu} mm.` : `${label(build.gpu)} is ${build.gpu.length} mm long; ${label(build.case)} allows at most ${build.case.gpu} mm.`, build.gpu);
      if (build.cooler.height > build.case.cooler) addIssue(errors, fr ? 'Hauteur du refroidisseur' : 'Cooler height', fr ? `${label(build.cooler)} mesure ${build.cooler.height} mm; ${label(build.case)} accepte au maximum ${build.case.cooler} mm.` : `${label(build.cooler)} is ${build.cooler.height} mm high; ${label(build.case)} allows at most ${build.case.cooler} mm.`, build.cooler);
      if (build.cooler.socket !== 'LGA1851') addIssue(errors, fr ? 'Fixation du refroidisseur' : 'Cooler mounting', fr ? `${label(build.cooler)} fournit une fixation ${build.cooler.socket}; le processeur et la carte mère utilisent LGA1851.` : `${label(build.cooler)} provides ${build.cooler.socket} mounting; the CPU and motherboard use LGA1851.`, build.cooler);
      if (build.cpu.tdp > build.cooler.capacity) addIssue(errors, fr ? 'Capacité thermique' : 'Thermal capacity', fr ? `${label(build.cpu)} indique ${build.cpu.tdp} W; ${label(build.cooler)} annonce ${build.cooler.capacity} W.` : `${label(build.cpu)} is rated at ${build.cpu.tdp} W; ${label(build.cooler)} is rated for ${build.cooler.capacity} W.`, build.cooler);
      if (!build.case.psu.includes(build.psu.form)) addIssue(errors, fr ? 'Format du bloc d’alimentation' : 'PSU form factor', fr ? `${label(build.psu)} est au format ${build.psu.form}; ${label(build.case)} accepte ${build.case.psu.join(', ')}.` : `${label(build.psu)} uses ${build.psu.form}; ${label(build.case)} supports ${build.case.psu.join(', ')}.`, build.psu);
      if (build.psu.watts < build.gpu.watts) addIssue(errors, fr ? 'Puissance du bloc' : 'PSU wattage', fr ? `${label(build.gpu)} recommande ${build.gpu.watts} W; ${label(build.psu)} fournit ${build.psu.watts} W.` : `${label(build.gpu)} recommends ${build.gpu.watts} W; ${label(build.psu)} provides ${build.psu.watts} W.`, build.psu);
      if (!build.psu.connectors.includes(build.gpu.connector_code)) addIssue(errors, fr ? 'Connecteur GPU' : 'GPU power connector', fr ? `${label(build.gpu)} exige ${build.gpu.connector}; ${label(build.psu)} ne fournit pas ce connecteur.` : `${label(build.gpu)} requires ${build.gpu.connector}; ${label(build.psu)} does not provide it.`, build.psu);
      if (build.wifi.type === 'none') addIssue(errors, fr ? 'Wi-Fi obligatoire' : 'Required Wi-Fi', fr ? 'Aucun matériel Wi-Fi n’est fourni, mais le mandat exige une connexion sans fil.' : 'No Wi-Fi hardware is supplied, but the brief requires wireless networking.', build.wifi);
      else if (build.wifi.type === 'included') addIssue(errors, fr ? 'Wi-Fi intégré inexistant' : 'Unavailable integrated Wi-Fi', fr ? 'Le produit suppose un contrôleur intégré, mais la fiche Atlas B860M indique qu’aucun Wi-Fi n’est intégré.' : 'The product assumes an integrated controller, but the Atlas B860M specification states that no Wi-Fi is integrated.', build.wifi);
      else strengths.push(fr ? 'Une solution Wi-Fi réelle est incluse.' : 'A real Wi-Fi solution is included.');
      if (keys.cpu === 'ultra7') warnings.push(fr ? 'Le Core Ultra 7 265K exige le micrologiciel 1205 ou plus récent. La version installée est inconnue; confirmez la version actuelle ou un plan de mise à jour avant l’approbation de l’achat.' : 'The Core Ultra 7 265K requires firmware 1205 or newer. The installed version is unknown; confirm the current version or an update plan before purchase approval.');
      if (total > budget) errors.push({ title: fr ? 'Budget dépassé' : 'Budget exceeded', detail: fr ? `Le total est ${money.format(total)}, soit ${money.format(total - budget)} au-dessus du budget par poste et ${money.format((total - budget) * fleetSize)} pour ${fleetSize} postes.` : `The total is ${money.format(total)}, which is ${money.format(total - budget)} over budget per computer and ${money.format((total - budget) * fleetSize)} across ${fleetSize} computers.` });

      let finalScore = required.reduce((sum, key) => sum + build[key].score, 0);
      if (keys.storage === 'gen5_2') {
        const premium = (build.storage.price - catalog.storage.nvme2.price) * fleetSize;
        adjustments.push({ value: data.suitability_rules.gen5_storage.adjustment, reason: fr ? 'SSD PCIe 5.0 : pertinence pour le mandat' : 'PCIe 5.0 SSD: suitability for brief' });
        finalScore += data.suitability_rules.gen5_storage.adjustment;
        suitability.push(fr ? `${data.suitability_rules.gen5_storage.fr} Prime évitable possible : ${money.format(premium)} pour ${fleetSize} postes.` : `${data.suitability_rules.gen5_storage.en} Potentially avoidable premium: ${money.format(premium)} across ${fleetSize} computers.`);
      }
      if (keys.psu === 'p1000' && build.gpu.watts <= 750) {
        const altKey = build.gpu.watts <= 550 ? 'p550' : build.gpu.watts <= 650 ? 'p650' : 'p750';
        const alt = catalog.psu[altKey];
        const premium = (build.psu.price - alt.price) * fleetSize;
        adjustments.push({ value: data.suitability_rules.oversized_psu.adjustment, reason: fr ? 'Bloc de 1 000 W : capacité disproportionnée' : '1000 W PSU: disproportionate capacity' });
        finalScore += data.suitability_rules.oversized_psu.adjustment;
        suitability.push(fr ? `${data.suitability_rules.oversized_psu.fr} Prime évitable possible : ${money.format(premium)} pour ${fleetSize} postes.` : `${data.suitability_rules.oversized_psu.en} Potentially avoidable premium: ${money.format(premium)} across ${fleetSize} computers.`);
      }

      const decision = errors.length ? (fr ? 'Commande retenue - corrections obligatoires' : 'Order held - corrections required') : warnings.length || suitability.length ? (fr ? 'Approuvable avec réserves' : 'Approvable with reservations') : (fr ? 'Configuration approuvable' : 'Approvable configuration');
      scoreNode.textContent = `${decision} - ${finalScore.toFixed(1)}/80`;
      const report = makeNode('div', 'pc-build-report');
      report.appendChild(makeNode('h3', '', fr ? 'Rapport d’approbation MeilleurAchat' : 'MeilleurAchat approval report'));
      report.appendChild(makeNode('p', '', fr ? `Décision : ${decision}. Total par poste : ${money.format(total)}. Commande simulée : ${money.format(total * fleetSize)}.` : `Decision: ${decision}. Total per computer: ${money.format(total)}. Simulated order: ${money.format(total * fleetSize)}.`));
      addSection(report, fr ? 'Incompatibilités bloquantes' : 'Blocking incompatibilities', errors, 'error');
      addSection(report, fr ? 'Vérifications et réserves' : 'Checks and reservations', warnings, 'warning');
      addSection(report, fr ? 'Pertinence et allocation du budget' : 'Suitability and budget allocation', suitability, 'warning');
      addSection(report, fr ? 'Forces de la proposition' : 'Strengths of the proposal', strengths, 'success');
      report.appendChild(scoreTable(build, adjustments, finalScore));
      feedbackNode.replaceChildren(report);
      setAutoTask(errors.length === 0);
    }

    selects.forEach(select => select.addEventListener('change', updateArithmetic));
    submitButton?.addEventListener('click', evaluate);
    updateArithmetic();
  }

  function boot() { document.querySelectorAll('[data-pc-build]').forEach(root => init(root)); }
  document.addEventListener('DOMContentLoaded', boot);
  document.addEventListener('DOMContentSwitch', boot);
  boot();
})();

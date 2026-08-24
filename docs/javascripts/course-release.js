(() => {
  'use strict';

  const TIME_ZONE = 'America/Toronto';
  const RELEASE_DATES = Object.freeze({
    1: '2026-08-24',
    2: '2026-08-25',
    3: '2026-08-26',
    4: '2026-08-27',
    5: '2026-08-31',
    6: '2026-09-01',
    7: '2026-09-02',
    8: '2026-09-03',
    9: '2026-09-08',
    10: '2026-09-09',
    11: '2026-09-10',
    12: '2026-09-14',
    13: '2026-09-15',
    14: '2026-09-16',
    15: '2026-09-17'
  });

  const PAGE_PATTERNS = [
    { language: 'fr', kind: 'session', pattern: /\/fr\/seances\/seance-(\d+)(?:\/(?:index\.html)?)?$/ },
    { language: 'fr', kind: 'lab', pattern: /\/fr\/laboratoires\/laboratoire-(\d+)(?:\/(?:index\.html)?)?$/ },
    { language: 'en', kind: 'session', pattern: /\/en\/sessions\/session-(\d+)(?:\/(?:index\.html)?)?$/ },
    { language: 'en', kind: 'lab', pattern: /\/en\/labs\/lab-(\d+)(?:\/(?:index\.html)?)?$/ }
  ];

  function montrealDate() {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());

    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return `${values.year}-${values.month}-${values.day}`;
  }

  function pageInfoFromPath(pathname) {
    for (const entry of PAGE_PATTERNS) {
      const match = pathname.match(entry.pattern);
      if (!match) continue;

      const number = Number(match[1]);
      if (!RELEASE_DATES[number]) return null;

      return {
        language: entry.language,
        kind: entry.kind,
        number,
        releaseDate: RELEASE_DATES[number]
      };
    }
    return null;
  }

  function pageInfoFromHref(href) {
    if (!href) return null;
    try {
      return pageInfoFromPath(new URL(href, document.baseURI).pathname);
    } catch {
      return null;
    }
  }

  function isReleased(info, today = montrealDate()) {
    return !info || today >= info.releaseDate;
  }

  function hideFutureLink(anchor, today) {
    const info = pageInfoFromHref(anchor.getAttribute('href'));
    if (!info || isReleased(info, today)) return;

    const container = anchor.closest('.md-nav__item, .md-search-result__item, tr, .md-footer__link, li');
    const target = container || anchor;
    target.hidden = true;
    target.dataset.c12ReleaseHidden = 'true';
  }

  function applyVisibility(root = document) {
    const today = montrealDate();
    const anchors = root.matches?.('a[href]') ? [root] : root.querySelectorAll?.('a[href]') || [];
    anchors.forEach(anchor => hideFutureLink(anchor, today));
  }

  function formatReleaseDate(date, language) {
    const locale = language === 'fr' ? 'fr-CA' : 'en-CA';
    const safeMidday = new Date(`${date}T12:00:00Z`);
    return new Intl.DateTimeFormat(locale, {
      timeZone: TIME_ZONE,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(safeMidday);
  }

  function blockFuturePage() {
    const info = pageInfoFromPath(window.location.pathname);
    if (!info || isReleased(info)) return false;

    const article = document.querySelector('.md-content__inner');
    if (!article) return false;

    const isFrench = info.language === 'fr';
    const noun = isFrench
      ? (info.kind === 'lab' ? 'laboratoire' : 'séance')
      : (info.kind === 'lab' ? 'lab' : 'session');
    const heading = isFrench
      ? `Ce ${noun} n’est pas encore disponible`
      : `This ${noun} is not available yet`;
    const release = formatReleaseDate(info.releaseDate, info.language);
    const message = isFrench
      ? `Le ${noun} ${info.number} sera disponible le ${release}. Les contenus déjà étudiés restent accessibles.`
      : `${noun.charAt(0).toUpperCase() + noun.slice(1)} ${info.number} will be available on ${release}. Material already studied remains available.`;

    article.replaceChildren();

    const title = document.createElement('h1');
    title.textContent = heading;

    const notice = document.createElement('div');
    notice.className = 'admonition info';

    const noticeTitle = document.createElement('p');
    noticeTitle.className = 'admonition-title';
    noticeTitle.textContent = isFrench ? 'Publication progressive' : 'Progressive release';

    const text = document.createElement('p');
    text.textContent = message;

    notice.append(noticeTitle, text);
    article.append(title, notice);

    document.querySelectorAll('.md-sidebar--secondary').forEach(sidebar => {
      sidebar.hidden = true;
    });

    return true;
  }

  function observeDynamicContent() {
    if (!document.body || typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) applyVisibility(node);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  blockFuturePage();
  applyVisibility();
  observeDynamicContent();
})();

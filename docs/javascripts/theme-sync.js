(() => {
  const selector = 'iframe[src*="assets/demos/"]';

  function currentScheme() {
    return document.body?.getAttribute('data-md-color-scheme') === 'slate' ? 'dark' : 'light';
  }

  function sendTheme(frame) {
    frame.contentWindow?.postMessage(
      { source: 'c12-course-site', type: 'theme', scheme: currentScheme() },
      '*'
    );
  }

  function synchronizeFrames() {
    document.querySelectorAll(selector).forEach(frame => {
      if (!frame.dataset.themeSyncReady) {
        frame.dataset.themeSyncReady = 'true';
        frame.addEventListener('load', () => sendTheme(frame));
      }
      sendTheme(frame);
    });
  }

  function startThemeSync() {
    synchronizeFrames();

    if (document.body) {
      new MutationObserver(synchronizeFrames).observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
      });
    }

    new MutationObserver(synchronizeFrames).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startThemeSync, { once: true });
  } else {
    startThemeSync();
  }
})();

# 420-C12-IN Course Site Framework

This is a bilingual MKDocs framework for `420-C12-IN - Outils et materiels informatiques`.

The site is designed for GitHub Pages:

- French is the default student-facing language, and the site root redirects to the French welcome page.
- English content is available through the English navigation tab.
- Published French and English pages should contain corresponding course content.
- Session pages, lab sheets, reference pages, project pages, and exam review pages have corresponding French and English locations.
- Interactive demos can be added under `docs/assets/demos/`.

## Local setup

```bash
python -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
mkdocs serve
```

Then open the local URL printed by MkDocs.

## Build for GitHub Pages

The included GitHub Actions workflow builds the site automatically when changes are pushed to `main` or `master`.

In the GitHub repository settings, set Pages to deploy from **GitHub Actions**.

## Bilingual authoring convention

Use either language for early drafting when helpful, then synchronize the corresponding page before considering the content complete:

1. Draft or revise the English page under `docs/en/...` or the French page under `docs/fr/...`.
2. Translate or adapt the matching page in the other language.
3. Use `sessions` for the English session directory and `seances` for the French session directory.
4. Keep headings and section order similar unless one language needs a clearer formulation.
5. Treat French pages as the canonical student-facing version while maintaining equivalent English content.

For example:

- English page: `docs/en/sessions/session-1.md`
- French page: `docs/fr/seances/seance-1.md`

## Interactive activity rule

Interactive tools should support reasoning without replacing lab work.

Every interactive activity should require at least one of:

- a prediction before reveal,
- visible working-out,
- a written explanation,
- comparison between the student's answer and the tool output.

Avoid tools that simply produce final answers for skills students are expected to demonstrate manually.

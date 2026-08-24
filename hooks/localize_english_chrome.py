"""Localize MkDocs Material chrome on English pages in the bilingual build.

The site is built once with French as the default Material language so the
French tab remains the canonical default. English content lives under `en/`.
This hook changes only theme-generated interface strings and the document
language metadata for those English pages; course content and navigation
labels are left untouched.
"""

from __future__ import annotations

import re


_REPLACEMENTS = {
    "Aller au contenu": "Skip to content",
    "Rechercher": "Search",
    "Initialisation de la recherche": "Initializing search",
    "Table des matières": "Table of contents",
    "Retour en haut de la page": "Back to top",
    "Activer le mode sombre": "Switch to dark mode",
    "Activer le mode clair": "Switch to light mode",
    "Copier dans le presse-papiers": "Copy to clipboard",
    "Copié dans le presse-papiers": "Copied to clipboard",
    "Précédent": "Previous",
    "Suivant": "Next",
}


def on_post_page(output: str, *, page, config) -> str:
    """Return English-localized theme chrome for pages below ``en/``."""
    if not page.file.src_uri.startswith("en/"):
        return output

    output = re.sub(r'<html\s+lang="fr"', '<html lang="en"', output, count=1)
    output = re.sub(r"<html\s+lang='fr'", "<html lang='en'", output, count=1)

    for french, english in _REPLACEMENTS.items():
        output = output.replace(french, english)

    return output

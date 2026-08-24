"""Render one canonical bilingual conduct gate across every C12 laboratory.

The three commitments remain authored in each Lab so the non-JavaScript path
and source validation remain explicit. This hook centralizes the repeated
presentation text around them: heading, instructions, progress wording, and
initial status. It prevents small wording/count drift without changing any
lab-specific constraints or tasks.
"""

from __future__ import annotations

import re
from pathlib import PurePosixPath


_COPY = {
    "en": {
        "template": "{done} of {total} commitments acknowledged",
        "heading": "Working agreement",
        "instruction": "Read each commitment. The lab will become available after all three commitments have been acknowledged.",
        "status": "0 of 3 commitments acknowledged",
    },
    "fr": {
        "template": "{done} sur {total} engagements reconnus",
        "heading": "Entente de travail",
        "instruction": "Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.",
        "status": "0 sur 3 engagements reconnus",
    },
}


def _language(src_uri: str) -> str | None:
    path = PurePosixPath(src_uri)
    if len(path.parts) >= 3 and path.parts[-3:-1] == ("en", "labs") and re.fullmatch(r"lab-\d+\.md", path.name):
        return "en"
    if len(path.parts) >= 3 and path.parts[-3:-1] == ("fr", "laboratoires") and re.fullmatch(r"laboratoire-\d+\.md", path.name):
        return "fr"
    return None


def _normalize_gate(section: str, copy: dict[str, str]) -> str:
    section = re.sub(
        r"(<h2\b[^>]*>).*?(</h2>)",
        lambda match: f"{match.group(1)}{copy['heading']}{match.group(2)}",
        section,
        count=1,
        flags=re.DOTALL,
    )
    section = re.sub(
        r"(</h2>\s*<p>).*?(</p>)",
        lambda match: f"{match.group(1)}{copy['instruction']}{match.group(2)}",
        section,
        count=1,
        flags=re.DOTALL,
    )
    section = re.sub(
        r"(<span\b[^>]*data-lab-gate-status[^>]*>).*?(</span>)",
        lambda match: f"{match.group(1)}{copy['status']}{match.group(2)}",
        section,
        count=1,
        flags=re.DOTALL,
    )
    return section


def on_page_markdown(markdown: str, page, config, files) -> str:
    language = _language(page.file.src_uri)
    if language is None:
        return markdown

    copy = _COPY[language]
    markdown = re.sub(
        r'data-gate-template="[^"]*"',
        f'data-gate-template="{copy["template"]}"',
        markdown,
        count=1,
    )

    gate = re.search(r'<section class="lab-gate".*?</section>', markdown, flags=re.DOTALL)
    if not gate:
        return markdown

    normalized = _normalize_gate(gate.group(0), copy)
    return markdown[: gate.start()] + normalized + markdown[gate.end() :]

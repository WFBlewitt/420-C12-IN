"""Render mixed Markdown/HTML laboratory content safely.

The labs use raw HTML for interactive controls and Markdown for selected prose,
tables, lists, admonitions, and optional supplements. Python-Markdown's
``md_in_html`` extension requires every block-level ancestor of Markdown
content to opt in.

Labs 1-7 still contain some legacy indentation inside the interactive checklist.
For those labs only, normalize HTML-tag lines inside that checklist before
Markdown parsing. Optional supplements are separate sibling containers outside
the checklist, so they are handled independently by opting only those containers
into block-level Markdown parsing.
"""

from __future__ import annotations

import re
from pathlib import PurePosixPath


_LAB_PATHS = (
    re.compile(r"^en/labs/lab-(\d+)\.md$"),
    re.compile(r"^fr/laboratoires/laboratoire-(\d+)\.md$"),
)

_HTML_TAG_LINE = re.compile(r"(?m)^[ \t]+(?=</?[A-Za-z][^\n>]*(?:>|$))")


def _lab_number(src_uri: str) -> int | None:
    path = PurePosixPath(src_uri).as_posix()
    for pattern in _LAB_PATHS:
        match = pattern.fullmatch(path)
        if match:
            return int(match.group(1))
    return None


def _set_block_markdown_attribute(match: re.Match[str]) -> str:
    tag = match.group(0)
    if re.search(r"\smarkdown(?:\s*=|\s|>)", tag):
        return re.sub(
            r'\smarkdown(?:\s*=\s*"[^"]*")?',
            ' markdown="block"',
            tag,
            count=1,
        )
    return tag[:-1] + ' markdown="block">'


def _normalize_legacy_html_indentation(markdown: str) -> str:
    start = markdown.find("<div", markdown.find("data-lab-checklist") - 200)
    if start < 0:
        return markdown

    # Only remove indentation before lines that actually begin with an HTML tag;
    # prose/Markdown indentation is intentionally preserved.
    prefix = markdown[:start]
    checklist = markdown[start:]
    checklist = _HTML_TAG_LINE.sub("", checklist)
    return prefix + checklist


def on_page_markdown(markdown: str, page, config, files) -> str:
    lab_number = _lab_number(page.file.src_uri)
    if lab_number is None:
        return markdown

    if lab_number <= 7:
        markdown = _normalize_legacy_html_indentation(markdown)

    # Interactive lab containers. These rules are unchanged from the working
    # Labs 1-15 rendering fix.
    markdown = re.sub(
        r'<div\b(?=[^>]*\bclass="[^"]*\b(?:lab-checklist|lab-content)\b[^"]*")[^>]*>',
        _set_block_markdown_attribute,
        markdown,
    )
    markdown = re.sub(
        r'<section\b(?=[^>]*\bclass="[^"]*\blab-stage\b[^"]*")[^>]*>',
        _set_block_markdown_attribute,
        markdown,
    )

    # Optional extensions live in a sibling container outside the interactive
    # checklist. Opting in only this container renders headings, inline code,
    # lists, and other Markdown without changing checklist/HTML parsing.
    markdown = re.sub(
        r'<div\b(?=[^>]*\bdata-lab-supplement(?:\s*=|\s|>))[^>]*>',
        _set_block_markdown_attribute,
        markdown,
    )
    return markdown

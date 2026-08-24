"""Clarify the IEEE 754 scope boundary in the bilingual Session 3 pages.

The main pathway teaches recognition and guided interpretation through one compact
normalized example. Full manual construction, decoding, approximation, and
rounding remain in required self-study after the Lab link.
"""

from __future__ import annotations

from typing import Any


FR_PATH = "fr/seances/seance-3.md"
EN_PATH = "en/sessions/session-3.md"


def _replace_once(markdown: str, old: str, new: str, path: str) -> str:
    count = markdown.count(old)
    if count != 1:
        raise ValueError(f"Expected one Session 3 anchor in {path}, found {count}: {old[:80]!r}")
    return markdown.replace(old, new, 1)


def _apply_french(markdown: str, path: str) -> str:
    markdown = _replace_once(
        markdown,
        "- expliquer les rôles du signe, de l'exposant et de la fraction dans IEEE 754 simple précision;",
        "- expliquer les rôles du signe, de l'exposant et de la fraction dans IEEE 754 simple précision, puis interpréter un exemple normalisé fourni;",
        path,
    )
    markdown = _replace_once(
        markdown,
        "    **À maîtriser aujourd'hui :** unités, largeur fixe, plages, entiers non signés, complément à deux, organisation générale d'IEEE 754, texte, Unicode, UTF-8, boutisme et choix d'une interprétation.\n\n    **En autoformation obligatoire après le lien du laboratoire :** fractions binaires, construction, approximation, arrondi et décodage IEEE 754 simple précision.",
        "    **À maîtriser aujourd'hui :** unités, largeur fixe, plages, entiers non signés, complément à deux, organisation générale d'IEEE 754, lecture guidée d'un exemple normalisé, texte, Unicode, UTF-8, boutisme et choix d'une interprétation.\n\n    **En autoformation obligatoire après le lien du laboratoire :** positions fractionnaires binaires et procédures complètes de construction, de décodage, d'approximation et d'arrondi IEEE 754 simple précision.",
        path,
    )
    anchor = "Le `1` placé avant la fraction est implicite : il n'est pas conservé dans les 23 bits du champ fraction.\n\n"
    example = """Le `1` placé avant la fraction est implicite : il n'est pas conservé dans les 23 bits du champ fraction.

### Exemple guidé : lire une valeur normalisée fournie

Considérons les champs déjà séparés suivants :

`0 10000001 01100000000000000000000`

| Champ | Lecture |
|---|---|
| Signe | `0` : la valeur est positive |
| Exposant stocké | `10000001`<sub>`2`</sub> = `129` |
| Exposant réel | `129 - 127 = 2` |
| Significande | replacer le `1` implicite donne `1.011`<sub>`2`</sub> |

La valeur est donc :

`(+1) × 1.011`<sub>`2`</sub>` × 2`<sup>`2`</sup> = `101.1`<sub>`2`</sub> = `5.5`<sub>`10`</sub>

Cet exemple montre comment les trois champs contribuent à l'interprétation. Il ne constitue pas encore une procédure complète pour construire ou décoder n'importe quelle valeur; cette démarche, y compris les fractions qui exigent une approximation et un arrondi, reste dans l'autoformation obligatoire.

"""
    markdown = _replace_once(markdown, anchor, example, path)
    markdown = _replace_once(
        markdown,
        "- Les fractions binaires utilisent des puissances négatives de deux.\n- IEEE 754 simple précision utilise 1 bit de signe, 8 bits d'exposant décalé et 23 bits de fraction.\n- Certaines fractions décimales doivent être approximées en binaire.",
        "- Dans un exemple IEEE 754 normalisé fourni, l'exposant déplace le séparateur binaire et le `1` implicite complète la significande.\n- IEEE 754 simple précision utilise 1 bit de signe, 8 bits d'exposant décalé et 23 bits de fraction.\n- Une largeur finie peut imposer une approximation; le calcul détaillé et l'arrondi font partie de l'autoformation obligatoire.",
        path,
    )
    return markdown


def _apply_english(markdown: str, path: str) -> str:
    markdown = _replace_once(
        markdown,
        "- explain the roles of the sign, exponent, and fraction in IEEE 754 single precision;",
        "- explain the roles of the sign, exponent, and fraction in IEEE 754 single precision, then interpret a provided normalized example;",
        path,
    )
    markdown = _replace_once(
        markdown,
        "    **Master today:** units, fixed width, ranges, unsigned integers, two's complement, the general organization of IEEE 754, text, Unicode, UTF-8, endianness, and selecting an interpretation.\n\n    **Required self-study after the lab link:** binary fractions, IEEE 754 single-precision construction, approximation, rounding, and decoding.",
        "    **Master today:** units, fixed width, ranges, unsigned integers, two's complement, the general organization of IEEE 754, guided reading of one normalized example, text, Unicode, UTF-8, endianness, and selecting an interpretation.\n\n    **Required self-study after the lab link:** binary fractional positions and the complete IEEE 754 single-precision procedures for construction, decoding, approximation, and rounding.",
        path,
    )
    anchor = "The `1` before the fraction is implicit: it is not stored in the 23-bit fraction field.\n\n"
    example = """The `1` before the fraction is implicit: it is not stored in the 23-bit fraction field.

### Guided example: reading a provided normalized value

Consider these already separated fields:

`0 10000001 01100000000000000000000`

| Field | Interpretation |
|---|---|
| Sign | `0`: the value is positive |
| Stored exponent | `10000001`<sub>`2`</sub> = `129` |
| Actual exponent | `129 - 127 = 2` |
| Significand | restoring the implicit `1` gives `1.011`<sub>`2`</sub> |

The value is therefore:

`(+1) × 1.011`<sub>`2`</sub>` × 2`<sup>`2`</sup> = `101.1`<sub>`2`</sub> = `5.5`<sub>`10`</sub>

This example shows how the three fields contribute to interpretation. It is not yet a complete procedure for constructing or decoding any value; that process, including fractions requiring approximation and rounding, remains in the required self-study.

"""
    markdown = _replace_once(markdown, anchor, example, path)
    markdown = _replace_once(
        markdown,
        "- Binary fractions use negative powers of two.\n- IEEE 754 single precision uses 1 sign bit, 8 biased-exponent bits, and 23 fraction bits.\n- Some decimal fractions must be approximated in binary.",
        "- In a provided normalized IEEE 754 example, the exponent moves the binary point and the implicit `1` completes the significand.\n- IEEE 754 single precision uses 1 sign bit, 8 biased-exponent bits, and 23 fraction bits.\n- A finite width may require approximation; detailed calculation and rounding belong to the required self-study.",
        path,
    )
    return markdown


def on_page_markdown(markdown: str, page: Any, config: Any, files: Any) -> str:
    path = page.file.src_uri
    if path == FR_PATH:
        return _apply_french(markdown, path)
    if path == EN_PATH:
        return _apply_english(markdown, path)
    return markdown

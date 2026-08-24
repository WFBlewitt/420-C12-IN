"""Integrate processor socket recognition into bilingual Session/Lab 5 pages."""

from __future__ import annotations

from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.files import File
from mkdocs.structure.pages import Page


TARGETS = {
    "fr/seances/seance-5.md": "fr-session",
    "en/sessions/session-5.md": "en-session",
    "fr/laboratoires/laboratoire-5.md": "fr-lab",
    "en/labs/lab-5.md": "en-lab",
}


def _replace_once(markdown: str, old: str, new: str, label: str) -> str:
    count = markdown.count(old)
    if count != 1:
        raise RuntimeError(f"Session 5 socket hook expected one {label} anchor, found {count}.")
    return markdown.replace(old, new, 1)


def _fr_session(markdown: str) -> str:
    markdown = _replace_once(
        markdown,
        "    3. **Le résultat tient-il?** Comment distinguer une retenue, un bouclage et un débordement signé?",
        "    3. **Le résultat tient-il?** Comment distinguer une retenue, un bouclage et un débordement signé?\n    4. **Le processeur peut-il être installé?** Comment le boîtier et le socket relient-ils le processeur à la carte mère, et pourquoi le même fabricant ne suffit-il pas à établir la compatibilité?",
        "French guiding-question",
    )
    markdown = _replace_once(
        markdown,
        "    **À reconnaître aujourd'hui :** cœur, fil d'exécution matériel, fréquence, fréquence de base et d'accélération, pipeline, cache L1/L2/L3, jeu d'instructions, processeur logique, cœur de performance et cœur d'efficacité.",
        "    **À reconnaître aujourd'hui :** boîtier du processeur, socket, dispositions LGA et PGA, familles LGA1700, LGA1851, AM4 et AM5, cœur, fil d'exécution matériel, fréquence, fréquence de base et d'accélération, pipeline, cache L1/L2/L3, jeu d'instructions, processeur logique, cœur de performance et cœur d'efficacité. Une correspondance de socket est nécessaire, mais elle ne prouve pas à elle seule la prise en charge complète par une carte mère.",
        "French scope",
    )
    return markdown


def _en_session(markdown: str) -> str:
    markdown = _replace_once(
        markdown,
        "By the end of this session, you should be able to:\n\n- distinguish the roles of the control unit, registers, ALU, and cache, then follow the simplified path of operands and a result;",
        "By the end of this session, you should be able to:\n\n- distinguish the processor package, motherboard socket, and LGA and PGA contact arrangements;\n- recognize the Intel LGA1700 and LGA1851 and AMD AM4 and AM5 socket families without confusing manufacturer with complete compatibility;\n- distinguish the roles of the control unit, registers, ALU, and cache, then follow the simplified path of operands and a result;",
        "English objectives",
    )
    markdown = _replace_once(
        markdown,
        "    3. **Does the result fit?** How do we distinguish carry, wraparound, and signed overflow?",
        "    3. **Does the result fit?** How do we distinguish carry, wraparound, and signed overflow?\n    4. **Can the processor be installed?** How do the package and socket connect the processor to the motherboard, and why is a shared manufacturer insufficient to establish compatibility?",
        "English guiding-question",
    )
    markdown = _replace_once(
        markdown,
        "    **Recognize today:** core, hardware thread, frequency, base and boost frequency, pipeline, L1/L2/L3 cache, instruction set, logical processor, performance core, and efficiency core.",
        "    **Recognize today:** processor package, socket, LGA and PGA arrangements, LGA1700, LGA1851, AM4, and AM5 families, core, hardware thread, frequency, base and boost frequency, pipeline, L1/L2/L3 cache, instruction set, logical processor, performance core, and efficiency core. A socket match is necessary, but it does not by itself prove complete motherboard support.",
        "English scope",
    )
    return markdown


def _fr_lab(markdown: str) -> str:
    markdown = _replace_once(markdown, 'data-lab-id="c12-lab-5-fr-v6"', 'data-lab-id="c12-lab-5-fr-v7"', "French lab id")
    markdown = markdown.replace("0 sur 13 tâches terminées", "0 sur 14 tâches terminées")
    markdown = markdown.replace('max="13">0 sur 13', 'max="14">0 sur 14')
    markdown = _replace_once(
        markdown,
        "- relever des caractéristiques d'un processeur avec PowerShell et le Gestionnaire des tâches, puis distinguer processeur physique, cœur, fil matériel et processeur logique;",
        "- relever des caractéristiques d'un processeur avec PowerShell et le Gestionnaire des tâches, puis distinguer processeur physique, cœur, fil matériel et processeur logique;\n- vérifier le socket ou boîtier du modèle observé dans une fiche officielle et expliquer la limite de cette preuve de compatibilité;",
        "French lab objective",
    )
    markdown = _replace_once(
        markdown,
        "« observation du CPU », « trajet de l'instruction », « additions », « indicateurs », « comparaison » et « cahier des charges ».",
        "« observation du CPU », « socket et source officielle », « trajet de l'instruction », « additions », « indicateurs », « comparaison » et « cahier des charges ».",
        "French record heading",
    )
    anchor = """</section>\n\n<section class=\"lab-stage\" data-lab-stage>\n<h2>Construire les retenues</h2>"""
    addition = """</section>\n\n<section class=\"lab-stage\" data-lab-stage>\n<h2>Vérifier le socket dans une source officielle</h2>\n<p>À partir du modèle exact relevé sur le poste, trouvez la page officielle du processeur publiée par Intel ou AMD. Repérez le socket ou le boîtier indiqué par le fabricant.</p>\n<div class=\"lab-tasks\">\n<label class=\"lab-task\">\n<input type=\"checkbox\" data-lab-task-check>\n<span><strong>Conservez la preuve du socket.</strong><small>Notez le modèle rapporté par le poste, le socket ou boîtier exact indiqué par le fabricant et le lien direct. Formulez ensuite l'inférence limitée suivante : une correspondance de socket est nécessaire, mais elle ne prouve pas à elle seule la compatibilité complète avec une carte mère.</small></span>\n</label>\n</div>\n</section>\n\n<section class=\"lab-stage\" data-lab-stage>\n<h2>Construire les retenues</h2>"""
    markdown = _replace_once(markdown, anchor, addition, "French lab insertion")
    return markdown


def _en_lab(markdown: str) -> str:
    markdown = _replace_once(markdown, 'data-lab-id="c12-lab-5-en-v6"', 'data-lab-id="c12-lab-5-en-v7"', "English lab id")
    markdown = markdown.replace("0 of 13 tasks complete", "0 of 14 tasks complete")
    markdown = markdown.replace('max="13">0 of 13', 'max="14">0 of 14')
    markdown = _replace_once(
        markdown,
        "- collect processor characteristics using PowerShell and Task Manager, then distinguish physical processor, core, hardware thread, and logical processor;",
        "- collect processor characteristics using PowerShell and Task Manager, then distinguish physical processor, core, hardware thread, and logical processor;\n- verify the observed model's socket or package in an official specification and explain the limit of that compatibility evidence;",
        "English lab objective",
    )
    markdown = _replace_once(
        markdown,
        'the headings “CPU observation,” “instruction path,” “additions,” “indicators,” “comparison,” and “specification.”',
        'the headings “CPU observation,” “socket and official source,” “instruction path,” “additions,” “indicators,” “comparison,” and “specification.”',
        "English record heading",
    )
    anchor = """</section>\n\n<section class=\"lab-stage\" data-lab-stage>\n<h2>Build the carries</h2>"""
    addition = """</section>\n\n<section class=\"lab-stage\" data-lab-stage>\n<h2>Verify the socket in an official source</h2>\n<p>Using the exact model reported by the workstation, find the processor's official Intel or AMD product page. Locate the socket or package stated by the manufacturer.</p>\n<div class=\"lab-tasks\">\n<label class=\"lab-task\">\n<input type=\"checkbox\" data-lab-task-check>\n<span><strong>Retain the socket evidence.</strong><small>Record the model reported by the workstation, the exact socket or package stated by the manufacturer, and the direct link. Then state the limited inference: a socket match is necessary, but it does not by itself prove complete compatibility with a motherboard.</small></span>\n</label>\n</div>\n</section>\n\n<section class=\"lab-stage\" data-lab-stage>\n<h2>Build the carries</h2>"""
    markdown = _replace_once(markdown, anchor, addition, "English lab insertion")
    return markdown


TRANSFORMS = {
    "fr-session": _fr_session,
    "en-session": _en_session,
    "fr-lab": _fr_lab,
    "en-lab": _en_lab,
}


def on_page_markdown(markdown: str, *, page: Page, config: MkDocsConfig, files: list[File]) -> str:
    del config, files
    kind = TARGETS.get(page.file.src_uri)
    if not kind:
        return markdown
    return TRANSFORMS[kind](markdown)

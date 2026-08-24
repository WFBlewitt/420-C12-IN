"""Add bilingual workload signposting to Labs 1-8 at build time.

The wording intentionally presents effort estimates rather than guaranteed
completion times. It also keeps optional enrichment outside the required
progress pathway.
"""

from __future__ import annotations

import re
from pathlib import PurePosixPath


EFFORT = {
    1: ((90, 120), (30, 45), (15, 30)),
    2: ((80, 110), (25, 40), (15, 25)),
    3: ((90, 120), (30, 45), (15, 30)),
    4: ((75, 100), (20, 35), (15, 25)),
    5: ((90, 120), (30, 45), (15, 30)),
    6: ((100, 135), (30, 50), (15, 30)),
    7: ((90, 120), (30, 45), (15, 30)),
    8: ((110, 150), (45, 70), (20, 35)),
}


def _lab_number(src_uri: str) -> tuple[int, str] | None:
    path = PurePosixPath(src_uri)
    match = re.fullmatch(r"laboratoire-(\d+)\.md", path.name)
    if match and path.parts[-3:-1] == ("fr", "laboratoires"):
        number = int(match.group(1))
        return (number, "fr") if number in EFFORT else None

    match = re.fullmatch(r"lab-(\d+)\.md", path.name)
    if match and path.parts[-3:-1] == ("en", "labs"):
        number = int(match.group(1))
        return (number, "en") if number in EFFORT else None

    return None


def _callout(number: int, language: str) -> str:
    priority, consolidation, extension = EFFORT[number]

    if language == "fr":
        return f'''!!! info "Repères de planification"
    Les durées ci-dessous sont des **estimations d'effort pédagogique**, et non des délais garantis. Le temps requis varie selon la préparation, le matériel disponible, le dépannage, les échanges en classe et les besoins d'accompagnement. L'enseignant peut ajuster l'ordre, l'étendue, le point d'arrêt ou le moment de réalisation des activités.

    - **Parcours prioritaire — environ {priority[0]} à {priority[1]} minutes d'effort indicatif :** commencez par les tâches exigées, dans l'ordre présenté. L'enseignant peut établir le point d'arrêt de la séance.
    - **Consolidation — environ {consolidation[0]} à {consolidation[1]} minutes d'effort indicatif :** terminez les tâches exigées restantes, notamment la vérification, la synthèse ou la mise à jour du compte rendu, pendant la séance ou après celle-ci selon les consignes données.
    - **Prolongement facultatif — environ {extension[0]} à {extension[1]} minutes d'effort indicatif :** réalisez seulement les activités explicitement marquées comme facultatives. Elles ne comptent pas dans la progression exigée.
'''

    return f'''!!! info "Planning guide"
    The times below are **indicative learning-effort estimates**, not guaranteed completion times. The time required varies with preparation, available equipment, troubleshooting, classroom discussion, and support needs. The instructor may adjust the order, scope, stopping point, or timing of the activities.

    - **Priority pathway — approximately {priority[0]}-{priority[1]} minutes of indicative effort:** begin the required tasks in the order presented. The instructor may establish the stopping point for the class period.
    - **Consolidation — approximately {consolidation[0]}-{consolidation[1]} minutes of indicative effort:** complete the remaining required work, including verification, synthesis, or permanent-record updates, during or after class according to the instructions given.
    - **Optional extension — approximately {extension[0]}-{extension[1]} minutes of indicative effort:** complete only activities explicitly labelled optional. They do not count toward required progress.
'''


def on_page_markdown(markdown, page, config, files):
    identified = _lab_number(page.file.src_uri)
    if not identified or "Repères de planification" in markdown or "Planning guide" in markdown:
        return markdown

    number, language = identified
    block = _callout(number, language)

    # Place the guide after the objectives and before the first warning when
    # possible. Fall back to the checklist gate for pages with another layout.
    marker = "\n!!! warning"
    position = markdown.find(marker)
    if position < 0:
        marker = "\n<div"
        position = markdown.find(marker)
    if position < 0:
        return markdown + "\n\n" + block

    return markdown[:position] + "\n\n" + block + markdown[position:]

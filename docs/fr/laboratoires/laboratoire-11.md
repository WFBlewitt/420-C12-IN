# Laboratoire 11 - Observer et évaluer une chaîne graphique et audio

[Retour à la Séance 11](../seances/seance-11.md)

## But du laboratoire

Vous allez observer comment un poste Windows présente ses composants graphiques, son écran et ses périphériques audio. Vous effectuerez ensuite des calculs d’image et de densité, comparerez des solutions GPU et écran, diagnostiquerez des situations de codecs et intégrerez des exigences d’accessibilité à une recommandation pour le projet Atlas.

Le laboratoire doit être réalisable sur un poste géré **sans privilèges d’administration**. N’installez aucun codec ni pilote, ne désactivez aucun périphérique, ne modifiez aucun réglage du micrologiciel et n’enregistrez pas la voix d’une autre personne. Lorsqu’une information du poste est inaccessible ou incomplète, conservez l’erreur ou le champ vide et nommez la preuve manquante.

Les produits et valeurs des tableaux pédagogiques sont fictifs et figés pour l’activité. Ils servent à exercer une méthode d’évaluation; ils ne représentent pas des produits ou des prix actuels.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- recueillir des informations graphiques, d’affichage et audio avec des outils accessibles à un compte standard;
- distinguer une observation, une inférence et une caractéristique encore non vérifiée;
- calculer la taille simplifiée d’une image brute, un débit de pixels et une densité en pixels par pouce;
- relier un besoin de jeu, de CAO ou de création média à des critères GPU pertinents;
- comparer des écrans sans confondre dimensions en pixels, densité, fréquence, couleur et HDR;
- distinguer conteneur, codec et méthode de décodage dans un diagnostic;
- évaluer une chaîne audio selon la capture, le traitement, la sortie et la latence;
- transformer des obstacles d’accessibilité en exigences techniques vérifiables;
- évaluer une source officielle et conserver une trace directe des preuves;
- prolonger le cahier des charges Atlas avec une recommandation média provisoire et une réflexion sur le cycle de vie.

!!! info "Repères de planification"
    Les plages ci-dessous sont des **estimations d’effort pédagogique**, et non des délais garantis. L’effort requis varie selon les informations exposées par le poste, les outils disponibles, le dépannage, les échanges en classe et les besoins d’accompagnement. L’enseignant peut ajuster l’ordre, l’étendue, le point d’arrêt ou le moment de réalisation.

    - **Parcours prioritaire — environ 90 à 120 minutes d’effort indicatif :** préparer le compte rendu, observer la chaîne du poste, construire une trace de preuves et effectuer les calculs.
    - **Consolidation — environ 50 à 75 minutes d’effort indicatif :** comparer les solutions pédagogiques, diagnostiquer les cas média, vérifier l’accessibilité, évaluer une source et compléter le cahier des charges Atlas.
    - **Prolongement facultatif — environ 15 à 25 minutes d’effort indicatif :** résoudre des calculs et scénarios supplémentaires après le travail exigé. Cette partie ne compte pas dans la progression.

!!! tip "Point d’arrêt habituel en classe"
    Sauf indication contraire de l’enseignant, terminez le **parcours prioritaire** pendant la période de laboratoire. Commencez ensuite la consolidation avec le temps restant; l’enseignant précisera quelles tâches de consolidation doivent être remises ou poursuivies après la classe.

!!! warning "La progression n’est pas votre compte rendu"
    Les cases sont conservées seulement dans ce navigateur. Conservez vos commandes, sorties utiles, calculs, tableaux, liens directs, hypothèses et décisions dans un document que vous contrôlez.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-11-fr-v1" data-gate-template="{done} sur {total} engagements reconnus" data-progress-template="{done} sur {total} tâches terminées" data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?">
<section class="lab-gate" aria-labelledby="lab-11-gate-title">
<h2 id="lab-11-gate-title">Entente de travail</h2>
<p>Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Utilisation assignée</strong><small>J'utiliserai le poste de travail, le réseau et les outils du cours uniquement pour les activités d'apprentissage assignées.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Compte rendu permanent</strong><small>Je conserverai mon travail, mes sources, mes commandes, mes calculs et mon raisonnement dans mon compte rendu permanent.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Incertitude signalée</strong><small>Je signalerai les incertitudes, résultats inattendus, erreurs ou préoccupations de sécurité au lieu de les dissimuler.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Accéder au laboratoire</button><span data-lab-gate-status aria-live="polite">0 sur 3 engagements reconnus</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>N'installez ni codec ni pilote, ne désactivez aucun périphérique et n'enregistrez pas la voix d'une autre personne; conservez les champs vides et les contradictions comme preuves utiles.</p></div>

<noscript>
<div class="lab-no-js-note">
<strong>Mode sans JavaScript</strong>
<p>Toutes les consignes, commandes, tables, calculs et réponses repliables restent disponibles. La progression enregistrée et le bouton de réinitialisation ne seront pas disponibles; suivez les tâches exigées dans votre compte rendu permanent.</p>
</div>
</noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 sur 12 tâches terminées</p><button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button><progress data-lab-progress value="0" max="12">0 sur 12</progress></div>

## Parcours prioritaire

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer le compte rendu</h2>
<p>Créez les rubriques : <strong>contexte</strong>, <strong>GPU et écran observés</strong>, <strong>audio observé</strong>, <strong>trace de la chaîne</strong>, <strong>calculs</strong>, <strong>comparaison GPU</strong>, <strong>comparaison d’écrans</strong>, <strong>audio et codecs</strong>, <strong>accessibilité</strong>, <strong>évaluation de source</strong>, <strong>cahier des charges Atlas et cycle de vie</strong> et <strong>synthèse</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Préparez le compte rendu.</strong><small>Inscrivez « Laboratoire 11 », la date, le poste ou scénario et les douze rubriques.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observer le GPU et l’affichage</h2>
<p>Ouvrez PowerShell normalement, sans demander de privilèges d’administration. Annulez toute demande d’élévation.</p>

```powershell
Get-CimInstance Win32_VideoController |
  Select-Object Name, AdapterCompatibility, VideoProcessor, DriverVersion,
                CurrentHorizontalResolution, CurrentVerticalResolution,
                CurrentBitsPerPixel, CurrentRefreshRate
```

<p>Consultez ensuite, lorsqu’elles sont accessibles sans élévation :</p>

- <strong>Paramètres → Système → Affichage → Affichage avancé</strong>;
- <strong>Gestionnaire des tâches → Performances → Processeur graphique</strong>.

<p>Conservez :</p>

1. le nom rapporté de chaque contrôleur vidéo;
2. la version du pilote;
3. les dimensions en pixels et la fréquence actuellement rapportées;
4. toute indication distincte de mémoire GPU dédiée et partagée;
5. tout champ vide, valeur `0` ou contradiction entre les outils.

!!! warning "Une valeur exposée n’est pas toujours une spécification physique"
    Certains champs WMI peuvent être absents, tronqués ou génériques. Ne présentez pas `AdapterRAM`, une valeur de mémoire partagée ou un nom de produit comme une mesure certaine de VRAM physique sans une deuxième source adaptée au modèle exact.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez le relevé graphique.</strong><small>Incluez la commande, les vues consultées, les valeurs utiles et au moins une limite d’interprétation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observer les périphériques audio</h2>
<p>Exécutez cette commande en lecture seule :</p>

```powershell
Get-CimInstance Win32_SoundDevice |
  Select-Object Name, Manufacturer, Status, PNPDeviceID
```

<p>Consultez ensuite <strong>Paramètres → Système → Son</strong> sans changer les périphériques par défaut. Notez les sorties, les entrées et les périphériques sélectionnés par le système. N’enregistrez aucun contenu audio.</p>

<p>Répondez :</p>

1. Quels périphériques ou contrôleurs audio sont rapportés?
2. Lequel est présenté comme sortie active, lorsque l’interface l’indique?
3. Le nom rapporté prouve-t-il que le signal final est analogique, USB, HDMI ou DisplayPort?
4. Quelle preuve supplémentaire confirmerait le chemin vers les haut-parleurs ou le casque réellement utilisé?

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez le relevé audio.</strong><small>Distinguez périphérique rapporté, sortie sélectionnée, inférence et vérification encore nécessaire.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Tracer une chaîne média du poste</h2>
<p>Choisissez une action qui ne demande aucune installation, par exemple lire une vidéo autorisée déjà disponible, afficher une animation Web ou reproduire un son système sans modification.</p>

<p>Construisez une trace sous cette forme :</p>

```text
contenu ou scène
→ application
→ service du système et pilote
→ GPU, moteur média ou traitement audio
→ mémoire ou tampon
→ sortie logique
→ écran, haut-parleurs ou casque
```

<p>Pour chaque étape, inscrivez une étiquette :</p>

- <strong>observé</strong> : un outil ou une interface l’affiche directement;
- <strong>inféré</strong> : la conclusion est plausible, mais indirecte;
- <strong>à vérifier</strong> : la preuve n’est pas disponible.

<p>N’inventez pas le codec, le moteur matériel ou le câble utilisé lorsque l’interface ne le rapporte pas.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Construisez une trace vérifiable.</strong><small>Incluez au moins trois faits observés, deux inférences prudentes et une question ouverte.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Calculer la taille d’image, le débit de pixels et la densité</h2>
<p>Montrez la formule, les unités et l’arrondissement. Utilisez `1 Mio = 1 048 576 octets`.</p>

### Taille simplifiée d’une image brute

1. Calculez la taille d’une image `1 920 × 1 080` à `24 bits/pixel`.
2. Calculez la taille d’une image `2 560 × 1 440` à `30 bits/pixel`.
3. Calculez la taille d’une image `3 840 × 2 160` à `32 bits/pixel`.

### Débit de pixels

4. Calculez le nombre théorique de pixels présentés par seconde pour `2 560 × 1 440 à 144 Hz`.
5. Calculez la même valeur pour `3 840 × 2 160 à 60 Hz`.
6. Expliquez pourquoi la valeur la plus élevée ne prouve ni le débit mémoire réel ni la performance d’un jeu.

### Densité de pixels

Utilisez :

```text
diagonale en pixels = √(largeur² + hauteur²)
PPI = diagonale en pixels ÷ diagonale en pouces
```

7. Calculez la densité d’un écran de `24 pouces` à `1 920 × 1 080`.
8. Calculez la densité d’un écran de `27 pouces` à `2 560 × 1 440`.
9. Calculez la densité d’un écran de `32 pouces` à `3 840 × 2 160`.
10. Nommez une raison pour laquelle une densité plus élevée peut exiger une mise à l’échelle de l’interface.

??? success "Réponses de vérification"
    1. `1 920 × 1 080 × 24 ÷ 8 = 6 220 800 octets ≈ 5,93 Mio`.
    2. `2 560 × 1 440 × 30 ÷ 8 = 13 824 000 octets ≈ 13,18 Mio`.
    3. `3 840 × 2 160 × 32 ÷ 8 = 33 177 600 octets ≈ 31,64 Mio`.
    4. `2 560 × 1 440 × 144 = 530 841 600 pixels/s`.
    5. `3 840 × 2 160 × 60 = 497 664 000 pixels/s`.
    7. environ `91,79 PPI`.
    8. environ `108,79 PPI`.
    9. environ `137,68 PPI`.

    Ces résultats décrivent des images ou débits de présentation simplifiés. Ils n’incluent pas les textures, les tampons supplémentaires, la compression, les opérations de rendu ni les limites de la liaison d’affichage.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez les dix réponses.</strong><small>Chaque calcul doit inclure formule, unités, résultat arrondi et limite d’interprétation.</small></span></label></div>
</section>

## Consolidation

<section class="lab-stage" data-lab-stage>
<h2>Comparer des solutions GPU selon le travail</h2>
<p>Les trois solutions Atlas suivantes sont fictives. Une caractéristique absente du tableau demeure inconnue.</p>

| Solution | Type et mémoire | Puissance électrique annoncée de la carte | Fonctions média annoncées | Validation professionnelle | Contraintes physiques |
|---|---|---:|---|---|---|
| Atlas I8 | GPU intégré; mémoire système partagée | comprise dans l’enveloppe du processeur | décodage H.264, HEVC et AV1; encodage H.264 | aucune certification publiée | aucune carte d’extension |
| Atlas G12 | GPU dédié; 12 Go GDDR6 | 230 W | décodage et encodage H.264, HEVC et AV1 | aucune certification PlanCAD publiée | 300 mm; 2,5 emplacements; alimentation auxiliaire |
| Atlas P16 | GPU dédié; 16 Go GDDR6; fonction ECC annoncée | 140 W | décodage et encodage H.264, HEVC et AV1 | certifié pour la version PlanCAD 2026 indiquée | 270 mm; 2 emplacements; alimentation auxiliaire |

<p>Formulez une recommandation provisoire pour chaque mandat :</p>

- **Mandat A — poste silencieux de bureautique et de lecture média :** deux écrans QHD, faible bruit, consommation limitée, lecture vidéo et mise à l’échelle confortable; aucun jeu 3D exigeant.
- **Mandat B — jeu et diffusion en continu :** jeu à `2 560 × 1 440`, fréquence d’images élevée, capture et encodage simultanés et budget important mais limité.
- **Mandat C — CAO professionnelle :** PlanCAD 2026, modèles complexes, stabilité prioritaire, soutien du fournisseur et traçabilité des versions exigés.

<p>Pour chaque mandat :</p>

1. nommez le besoin décisif;
2. citez deux caractéristiques pertinentes du tableau;
3. identifiez un compromis;
4. nommez une preuve manquante avant l’achat.

!!! warning "Ne comparez pas des nombres de cœurs entre familles"
    Le tableau ne contient aucun résultat d’une charge réelle. Une recommandation finale demanderait des essais comparables dans l’application, les réglages et les dimensions en pixels concernés.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Produisez trois recommandations provisoires.</strong><small>Chaque recommandation doit contenir un besoin, deux preuves, un compromis et une question ouverte.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Comparer des écrans selon l’usage et la personne</h2>
<p>Les caractéristiques sont pédagogiques et figées.</p>

| Écran | Dimensions et fréquence | Dalle et lumière | Couleur et HDR | Ergonomie et fonctions |
|---|---|---|---|---|
| Atlas Motion 27 | 2 560 × 1 440; 180 Hz | IPS; 350 cd/m² annoncés; fini mat | 99 % sRGB annoncé; aucune certification HDR indiquée | hauteur et inclinaison; rafraîchissement variable annoncé |
| Atlas Precision 27 | 3 840 × 2 160; 60 Hz | IPS; 600 cd/m² de pointe annoncés; contrôle local du rétroéclairage | 99 % Adobe RGB et 95 % DCI-P3 annoncés; VESA DisplayHDR 600 | hauteur, inclinaison et pivot; calibration matérielle annoncée |
| Atlas Access 27 | 2 560 × 1 440; 75 Hz | IPS; 320 cd/m² annoncés; fini mat | 100 % sRGB annoncé; aucun HDR | hauteur, inclinaison et pivot; mode de réduction du scintillement annoncé; commandes physiques identifiables |

<p>Choisissez l’écran le plus défendable pour chaque besoin :</p>

1. jeu à fréquence élevée, couleur Web ordinaire et mouvement rapide;
2. création d’images dans un flux Adobe RGB avec contrôle régulier de la couleur;
3. travail de bureau prolongé pour une personne demandant une interface agrandie, une position réglable, des commandes tactiles identifiables et aucun besoin HDR.

<p>Pour chaque choix :</p>

- distinguez une exigence obligatoire d’une préférence;
- citez deux preuves du tableau;
- nommez un réglage ou un essai sur place;
- nommez une caractéristique promotionnelle insuffisante à elle seule.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Comparez les trois écrans.</strong><small>Conservez un choix par besoin, ses preuves, un essai et une limite.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Diagnostiquer l’audio, les conteneurs et les codecs</h2>
<p>Une application de lecture du poste Atlas publie ces capacités :</p>

| Élément | Prise en charge annoncée |
|---|---|
| Conteneurs | MP4 et WebM; MKV non documenté |
| Décodage logiciel | H.264, AAC, Opus et FLAC |
| Décodage matériel | H.264, HEVC Main/Main10 et AV1 Main jusqu’aux limites documentées du GPU |
| Sous-titres | WebVTT dans l’application; autres formats à vérifier |
| Sortie audio | PCM stéréo; sortie multicanal selon le périphérique et le pilote |

<p>Analysez les cas suivants. Pour chacun, indiquez le premier obstacle plausible, ce qui peut être affirmé et la preuve manquante.</p>

| Cas | Fichier ou besoin | Observation |
|---|---|---|
| A | MP4, vidéo H.264 1080p, audio AAC stéréo | image et son fonctionnent; l’utilisation GPU est faible mais non nulle |
| B | MKV, vidéo AV1 4K, audio Opus | l’application refuse d’ouvrir le fichier |
| C | MP4, vidéo HEVC Main10 4K, audio AAC | le fichier s’ouvre, mais la lecture saccade sur un poste dont le GPU exact n’a pas été identifié |
| D | FLAC stéréo 48 kHz/24 bits | l’audio fonctionne, mais une alerte importante existe seulement dans le canal gauche de l’enregistrement |

<p>Ajoutez ensuite une recommandation de capture vocale pour chaque contexte :</p>

- conversation en ligne dans une pièce partagée;
- diffusion en continu avec un microphone XLR déjà possédé;
- lecture média silencieuse sans besoin de microphone.

<p>Vous pouvez choisir parmi l’audio intégré avec prise combinée, un casque USB avec microphone rapproché ou une interface audio USB avec entrée XLR et sortie casque. Justifiez le chemin complet plutôt que le prix seul.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Analysez les quatre cas et les trois contextes audio.</strong><small>Distinguez conteneur, codec, matériel, application, canal et preuve manquante.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Transformer les obstacles d’accessibilité en exigences</h2>
<p>Un lecteur média fictif possède les caractéristiques suivantes :</p>

- l’état « en direct » est indiqué uniquement par un point rouge;
- les commandes utilisent du texte de 10 px qui ne peut pas être agrandi;
- la vidéo démarre automatiquement avec une animation rapide;
- aucune légende n’est fournie pour la parole et les sons importants;
- le volume est réglable, mais une alerte essentielle existe seulement dans le canal gauche;
- certains boutons peuvent être utilisés seulement avec un pointeur;
- l’écran est fixé sur un support trop bas pour la personne décrite dans le mandat.

<p>Pour chaque obstacle :</p>

1. nommez la fonction ou l’information touchée;
2. rédigez une exigence observable et vérifiable;
3. proposez une méthode de vérification;
4. évitez de diagnostiquer la personne ou de supposer qu’une solution convient à tout le monde.

<p>Classez ensuite vos exigences comme <strong>visuelles</strong>, <strong>auditives</strong>, <strong>d’interaction</strong> ou <strong>d’installation physique</strong>.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Rédigez sept exigences vérifiables.</strong><small>Reliez chaque exigence à un obstacle et à une méthode de vérification.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Évaluer une source technique</h2>
<p>Choisissez une affirmation à vérifier :</p>

- certification d’un GPU pour une application de CAO;
- caractéristiques de couleur ou certification HDR d’un écran;
- capacité d’encodage ou de décodage matériel d’un GPU;
- exigence d’accessibilité concernant les légendes, la couleur ou le redimensionnement.

<p>Utilisez une source officielle du fabricant, de l’éditeur de l’application, d’un organisme de normalisation ou du W3C. Limitez chaque réponse à deux phrases.</p>

1. **Source et éditeur** — document exact, organisme et lien direct.
2. **Pertinence** — raison pour laquelle cette source peut appuyer cette affirmation précise.
3. **Spécification** — valeur ou énoncé exact avec son contexte, sa version ou sa condition.
4. **Vérification** — deuxième source, observation, calcul ou notion du cours.
5. **Nature des énoncés** — un fait, une inférence et une recommandation pratique, ou une explication indiquant qu’aucune recommandation n’est justifiée.

!!! info "Une page commerciale n’est pas automatiquement inutile"
    Une fiche officielle peut fournir une preuve primaire. Elle ne prouve pas à elle seule la performance réelle, l’accessibilité pour une personne particulière ni la compatibilité de la chaîne complète.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez l’évaluation en cinq parties.</strong><small>Incluez les liens directs, le contexte de la preuve et la distinction fait–inférence–recommandation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Prolonger le cahier des charges Atlas</h2>
<p>Ajoutez une section <strong>chaîne média</strong> au cahier des charges du PC de jeu et de diffusion en continu.</p>

| Trace | Élément à conserver |
|---|---|
| Besoin pertinent | dimensions en pixels, fréquence d’images, qualité de diffusion, capture audio, durée de travail et exigences d’accessibilité |
| Critères techniques | GPU, VRAM, moteur d’encodage, écran, couleur, audio, codec, latence et ergonomie |
| Compatibilité | boîtier, bloc d’alimentation, pilote, application, codec, écran, périphérique audio et connexions à vérifier à la Séance 12 |
| Recommandation provisoire | choix défendable à partir des preuves actuelles |
| Question ouverte | preuve qui pourrait modifier la recommandation |

<p>Ajoutez ensuite exactement une phrase pour chaque critère :</p>

- **Longévité :** le soutien des pilotes, codecs, applications et normes d’affichage restera-t-il adéquat pendant la durée prévue?
- **Stabilité :** quelles certifications, versions, preuves d’essai ou méthodes de récupération appuient un fonctionnement prévisible?
- **Efficacité :** le gain utile justifie-t-il l’énergie, la chaleur, le bruit, le coût et les ressources?
- **Maintenabilité :** le GPU, l’écran, le périphérique audio et leurs pilotes peuvent-ils être diagnostiqués, remplacés ou mis à jour sans difficulté déraisonnable?

<p>Lorsque la preuve manque, nommez-la au lieu d’inventer une conclusion.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Mettez à jour Atlas et le cycle de vie.</strong><small>Conservez besoin, critères, compatibilité, recommandation, question ouverte et quatre phrases de cycle de vie.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Produire la synthèse intégrée</h2>
<p>Rédigez une recommandation de `250 à 350 mots` pour l’une de ces situations :</p>

- le mandat Atlas de jeu et diffusion en continu;
- le poste PlanCAD;
- le poste de bureautique et média avec les exigences d’accessibilité décrites dans le laboratoire.

<p>Votre synthèse doit :</p>

1. définir le contenu et la qualité visée;
2. tracer le chemin graphique et audio pertinent;
3. choisir un GPU et un écran parmi les options pédagogiques;
4. traiter le codec ou la capture audio exigée;
5. inclure au moins deux exigences d’accessibilité;
6. citer deux preuves traçables et un calcul;
7. distinguer fait, inférence, recommandation provisoire et question ouverte;
8. expliquer un compromis de cycle de vie.

<p>Terminez par un contrôle : aucune caractéristique absente du tableau ne doit être présentée comme confirmée.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Remettez une synthèse traçable.</strong><small>Vérifiez les huit éléments et conservez la version finale dans le compte rendu permanent.</small></span></label></div>
</section>

## Prolongement facultatif

### Comparer les temps par image

Calculez le temps disponible par image à `60`, `120`, `144` et `180 images/s`. Expliquez pourquoi une moyenne élevée peut cacher des images produites de façon irrégulière.

??? success "Vérification"
    - `60 images/s` : environ `16,67 ms` par image;
    - `120 images/s` : environ `8,33 ms`;
    - `144 images/s` : environ `6,94 ms`;
    - `180 images/s` : environ `5,56 ms`.

### Examiner une chaîne de couleur

Choisissez une photo ou une vidéo sous licence libre. Dressez la liste des éléments à vérifier pour préserver la couleur du fichier jusqu’à l’écran : espace de couleur, profondeur, codec, application, système, sortie GPU, écran, mode d’image et calibration. Ne modifiez pas les profils de couleur du système.

</div>
</div>

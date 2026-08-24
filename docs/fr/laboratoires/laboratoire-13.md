# Laboratoire 13 - Comparer une solution intégrée et une plateforme modulaire

[Retour à la Séance 13](../seances/seance-13.md)

## But du laboratoire

Vous allez comparer trois plateformes fictives à partir d'un dossier de preuves commun. Vous distinguerez ce qui est observé, ce qui est documenté, ce qui est calculé et ce qui demeure une inférence.

Le parcours exigé peut être réalisé entièrement avec les tableaux et diagrammes de cette page. Une observation d'un Raspberry Pi physique ou d'un projet Velxio préparé peut enrichir la démarche, mais elle ne remplace pas les preuves communes.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- distinguer SoC, système sur module, ordinateur monocarte, microcontrôleur et PC modulaire;
- repérer les fonctions intégrées, soudées, enfichables et externes;
- comparer format, coût complet, consommation, ports, compatibilité, réparation et mise à niveau;
- calculer un coût pédagogique simplifié avec des hypothèses explicites;
- analyser les conséquences d'une panne ou d'un besoin futur;
- formuler une recommandation provisoire fondée sur des preuves;
- prolonger le cahier des charges Atlas et sa réflexion sur le cycle de vie.

!!! info "Repères de planification"
    Les plages ci-dessous sont des **estimations d'effort pédagogique**, et non des délais garantis. L'enseignant peut ajuster l'ordre, l'étendue, le point d'arrêt ou le moment de réalisation selon le matériel disponible, les échanges en classe et les besoins d'accompagnement.

    - **Parcours prioritaire — environ 85 à 105 minutes d'effort indicatif :** préparer le compte rendu, classifier les plateformes, interpréter les architectures, conserver une observation et comparer les trois solutions.
    - **Consolidation exigée — environ 45 à 65 minutes d'effort indicatif :** calculer le coût, analyser le cycle de remplacement, recommander une solution, évaluer une source et compléter le cahier des charges.
    - **Prolongement facultatif — environ 20 à 30 minutes d'effort indicatif :** observer un Raspberry Pi physique ou un projet Velxio préparé et comparer cette observation au dossier commun.

!!! tip "Point d'arrêt habituel en classe"
    Sauf indication contraire, terminez le **parcours prioritaire** pendant la période de laboratoire. L'enseignant précisera quelles tâches de consolidation doivent être remises ou poursuivies après la classe.

!!! warning "La progression n'est pas votre compte rendu"
    Les cases sont conservées seulement dans ce navigateur. Conservez vos observations, sources, calculs, hypothèses et décisions dans un document que vous contrôlez.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-13-fr-v2" data-gate-template="{done} sur {total} engagements reconnus" data-progress-template="{done} sur {total} tâches terminées" data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?">
<section class="lab-gate" aria-labelledby="lab-13-gate-title">
<h2 id="lab-13-gate-title">Entente de travail</h2>
<p>Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Utilisation assignée</strong><small>J'utiliserai le poste de travail, le réseau et les outils du cours uniquement pour les activités d'apprentissage assignées.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Compte rendu permanent</strong><small>Je conserverai mon travail, mes sources, mes commandes, mes calculs et mon raisonnement dans mon compte rendu permanent.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Incertitude signalée</strong><small>Je signalerai les incertitudes, résultats inattendus, erreurs ou préoccupations de sécurité au lieu de les dissimuler.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Accéder au laboratoire</button><span data-lab-gate-status aria-live="polite">0 sur 3 engagements reconnus</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Comparez les plateformes à partir des preuves fournies; ne présentez pas les données simulées comme des spécifications de produits réels.</p></div>

<noscript>
<div class="lab-no-js-note">
<strong>Mode sans JavaScript</strong>
<p>Toutes les consignes et tous les tableaux restent visibles. La progression enregistrée, le déverrouillage et la réinitialisation ne seront pas disponibles; suivez les tâches dans votre compte rendu permanent.</p>
</div>
</noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 sur 11 tâches terminées</p><button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button><progress data-lab-progress value="0" max="11">0 sur 11</progress></div>

## Parcours prioritaire

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer le compte rendu</h2>
<p>Créez les rubriques : <strong>contexte</strong>, <strong>classification</strong>, <strong>architectures</strong>, <strong>observation</strong>, <strong>comparaison</strong>, <strong>coût</strong>, <strong>cycle de remplacement</strong>, <strong>source</strong>, <strong>cahier des charges</strong> et <strong>synthèse</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Préparez le compte rendu.</strong><small>Inscrivez la date, le poste ou scénario et la modalité d'observation utilisée.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Classifier les formes de système</h2>

Associez chaque description à la catégorie la plus précise.

| Description | Catégorie | Preuve décisive |
|---|---|---|
| A. Une puce réunit processeur, circuit graphique et contrôleurs d'entrées-sorties. | | |
| B. Un petit module porte un SoC, de la mémoire et des composants de soutien; il se branche sur une carte porteuse. | | |
| C. Une carte offre processeur, mémoire, ports et stockage amorçable. | | |
| D. Une puce commande des capteurs et contient mémoire et interfaces intégrées. | | |
| E. Une tour accepte des modules DIMM, une carte graphique PCIe et plusieurs unités de stockage. | | |

Choix : **SoC**, **système sur module**, **ordinateur monocarte**, **microcontrôleur**, **PC modulaire**.

??? success "Vérification"
    A : SoC. B : système sur module. C : ordinateur monocarte. D : microcontrôleur. E : PC modulaire.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Classifiez les cinq descriptions.</strong><small>Conservez la preuve qui justifie chaque étiquette.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Interpréter deux architectures</h2>

### Architecture M — plateforme modulaire

```text
CPU enfichable ─┬─ modules de mémoire vive
                ├─ carte graphique PCIe
                ├─ SSD M.2 remplaçable
                ├─ contrôleur réseau intégré à la carte mère
                └─ ports et cartes d'extension
```

### Architecture I — plateforme intégrée

```text
SoC : CPU + circuit graphique + contrôleurs
  ├─ mémoire soudée
  ├─ stockage soudé
  ├─ réseau intégré
  └─ ports externes fixes
```

Complétez :

| Fonction | Architecture M | Architecture I | Conséquence possible |
|---|---|---|---|
| Processeur | | | |
| Mémoire vive | | | |
| Circuit graphique | | | |
| Stockage | | | |
| Réseau | | | |
| Extension | | | |

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interprétez les deux architectures.</strong><small>Distinguez intégré, soudé, enfichable et externe.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Conserver une observation et ses limites</h2>

Utilisez la **modalité C**, toujours disponible, ou une modalité indiquée par l'enseignant.

- **A — matériel physique facultatif :** observez un Raspberry Pi ou une plateforme semblable.
- **B — projet Velxio préparé facultatif :** exécutez le projet fourni et observez une entrée-sortie.
- **C — dossier commun exigé :** utilisez les caractéristiques des plateformes P, A et R ci-dessous.

Conservez au moins une ligne :

| Fait observé ou documenté | Inférence prudente | Preuve encore nécessaire |
|---|---|---|
| | | |

Pour les modalités A ou B, ajoutez une limite propre à la méthode. Une simulation ne prouve pas la chaleur, la consommation, la performance soutenue, la durabilité ou la réparabilité du matériel réel.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez une observation et sa limite.</strong><small>Une même conclusion ne peut pas être soutenue par toutes les modalités.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Comparer les trois plateformes</h2>

Les données ci-dessous sont **fictives et stables**. Elles servent à exercer la méthode; elles ne représentent pas des produits actuels.

| Caractéristique | Plateforme P — PC modulaire | Plateforme A — mini-PC APU | Plateforme R — ordinateur monocarte |
|---|---|---|---|
| Processeur et graphique | CPU enfichable + GPU PCIe | APU soudée | SoC soudé |
| Mémoire | 16 Gio, 2 DIMM, 64 Gio max. | 16 Gio soudés | 8 Gio soudés |
| Stockage | SSD M.2 remplaçable + 2 SATA | SSD M.2 remplaçable | carte microSD + USB |
| Réseau | Ethernet 2,5 Gbit/s + Wi-Fi | Ethernet 1 Gbit/s + Wi-Fi | Ethernet 1 Gbit/s + Wi-Fi |
| Ports | 8 USB, 3 sorties vidéo | 5 USB, 2 sorties vidéo | 4 USB, 2 micro-HDMI |
| Refroidissement | actif, remplaçable | actif compact | dissipateur requis pour la charge fournie |
| Système pris en charge | Windows ou Linux selon pilotes | Windows ou Linux selon pilotes | distribution Linux Arm fournie |
| Réparation documentée | pièces principales séparées | SSD seulement sur place | carte complète remplacée |
| Volume approximatif | 32 L | 1,2 L | 0,1 L sans boîtier |
| Puissance moyenne fournie | 180 W | 45 W | 12 W |

Pour chaque plateforme, relevez :

1. deux avantages liés à un besoin précis;
2. deux contraintes;
3. une preuve qui manque avant une recommandation réelle.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Comparez les trois plateformes.</strong><small>Un nombre plus élevé n'est pas automatiquement préférable.</small></span></label></div>
</section>

## Consolidation exigée

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Calculer un coût pédagogique simplifié</h2>

Utilisez une période de **quatre ans**, `5 000 h` d'utilisation et un tarif pédagogique de `0,10 $/kWh`.

```text
coût énergétique
= puissance en kW × 5 000 h × 0,10 $/kWh

coût pédagogique simplifié
= achat + accessoires + énergie + remplacement prévu
```

| Élément | P — PC modulaire | A — mini-PC APU | R — ordinateur monocarte |
|---|---:|---:|---:|
| Achat | 1 250 $ | 720 $ | 140 $ |
| Accessoires obligatoires | 0 $ | 80 $ | 160 $ |
| Puissance moyenne | 180 W | 45 W | 12 W |
| Remplacement prévu | SSD : 110 $ | appareil : 720 $ | carte + stockage : 190 $ |

Calculez le coût de chaque plateforme. Nommez deux facteurs exclus, par exemple le temps de soutien, la valeur de revente ou la probabilité réelle de panne.

??? success "Vérification des coûts énergétiques"
    - P : `0,180 kW × 5 000 h × 0,10 $ = 90 $`.
    - A : `0,045 kW × 5 000 h × 0,10 $ = 22,50 $`.
    - R : `0,012 kW × 5 000 h × 0,10 $ = 6 $`.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Calculez et vérifiez les coûts.</strong><small>Conservez les unités, les hypothèses et les facteurs exclus.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Analyser le cycle de remplacement</h2>

Complétez les scénarios :

| Scénario | Plateforme P | Plateforme A | Plateforme R |
|---|---|---|---|
| Mémoire devenue insuffisante | | | |
| Stockage principal défaillant | | | |
| Nouveau besoin graphique important | | | |
| Fin du soutien du système d'exploitation | | | |

Pour chaque cellule, indiquez : **composant remplaçable**, **appareil ou carte à remplacer**, ou **preuve manquante**.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Analysez les quatre scénarios.</strong><small>N'inventez pas une option de réparation non documentée.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Recommander pour un client</h2>

Choisissez **un** client et rédigez une recommandation détaillée de 120 à 180 mots.

- affichage numérique dans trois commerces;
- poste compact de bureautique et de média;
- système de capteurs avec faible consommation.

Votre recommandation doit contenir :

1. le besoin décisif;
2. la plateforme retenue;
3. deux preuves du dossier;
4. un compromis accepté;
5. une preuve qui pourrait modifier la décision.

Ajoutez ensuite une phrase rapide pour chacun des deux autres clients.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Rédigez une recommandation détaillée et deux décisions brèves.</strong><small>Reliez chaque choix au besoin, pas à une préférence de marque.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Évaluer une source technique</h2>

Choisissez une page officielle concernant un Raspberry Pi, une APU d'AMD, Apple Silicon ou une autre plateforme intégrée. Répondez en **au plus deux phrases par partie** :

1. **Source et éditeur** — document, organisation et lien direct;
2. **Pertinence** — pourquoi cette source convient à l'énoncé vérifié;
3. **Spécification** — valeur ou énoncé exact avec son contexte;
4. **Vérification** — seconde source, observation, calcul ou théorie du cours;
5. **Nature des énoncés** — fait, inférence et recommandation justifiée, ou explication qu'aucune recommandation n'est encore justifiée.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Évaluez une source en cinq parties.</strong><small>Une page promotionnelle ne suffit pas à soutenir toutes les conclusions.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Mettre à jour le cahier des charges et le cycle de vie</h2>

Ajoutez au cahier des charges Atlas :

- **besoin pertinent**;
- **critères techniques**;
- **compatibilité**;
- **recommandation provisoire et question ouverte**.

Expliquez si une plateforme fortement intégrée peut répondre au besoin de jeu et de diffusion en continu sans présumer que la petite taille est prioritaire.

Ajoutez une phrase par critère :

- **longévité**;
- **stabilité**;
- **efficacité**;
- **maintenabilité**.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complétez le cahier des charges et le cycle de vie.</strong><small>Nommez la preuve nécessaire lorsqu'une conclusion demeure ouverte.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Rédiger la synthèse</h2>

Rédigez 150 à 220 mots pour répondre :

> Dans quelles conditions une solution intégrée est-elle préférable à une plateforme modulaire?

Distinguez clairement :

- un fait;
- une inférence;
- une recommandation;
- une question encore ouverte.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Rédigez la synthèse intégrée.</strong><small>Appuyez-la par au moins deux preuves du dossier ou de la source évaluée.</small></span></label></div>
</section>

</div>
</div>

<div data-lab-supplement="c12-lab-13-fr-v2" hidden>
## Prolongement facultatif — matériel physique ou Velxio

Après le travail exigé, observez un Raspberry Pi physique ou un projet Velxio préparé. Comparez une seule observation au dossier commun.

Répondez :

1. qu'est-ce que cette modalité permet d'observer directement?
2. qu'est-ce qu'elle représente ou simule seulement?
3. quelles quatre caractéristiques du matériel réel demeurent non vérifiées?

Cette activité est facultative et ne modifie pas la progression exigée.
</div>

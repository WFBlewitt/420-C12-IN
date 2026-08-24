# Laboratoire 10 - Observer les ressources et manipuler un système de fichiers

[Retour à la Séance 10](../seances/seance-10.md)

## But du laboratoire

Vous allez observer comment Windows présente les processus, la mémoire, le système d’exploitation et les périphériques sur un poste géré. Vous utiliserez ensuite l’Invite de commandes dans un dossier temporaire, reconstruirez des chaînes d’allocation simplifiées et préparerez une comparaison formative de familles de systèmes d’exploitation.

Le laboratoire ne demande aucun privilège d’administration. Vous ne devez installer aucun logiciel, modifier aucun pilote, arrêter aucun service, changer aucun paramètre de sécurité ni supprimer de fichier à l’extérieur du dossier de travail créé pour cette activité.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- recueillir des observations sur le système d’exploitation, les processus et la mémoire avec des outils accessibles à un compte standard;
- distinguer programme, processus et service à partir de preuves observables;
- interpréter une mesure sans confondre instantané et tendance;
- utiliser des chemins absolus et relatifs dans une arborescence contrôlée;
- créer, copier, déplacer, renommer et supprimer des fichiers dans un dossier temporaire;
- reconstruire une chaîne de clusters à partir d’une table d’allocation simplifiée;
- distinguer fait, inférence, recommandation provisoire et preuve manquante;
- comparer des familles de systèmes d’exploitation à partir de sources officielles;
- prolonger le cahier des charges Atlas avec des exigences logicielles, de soutien et de périphériques.

!!! info "Repères de planification"
    Les durées ci-dessous sont des **estimations d’effort pédagogique**, et non des délais garantis. L’enseignant peut ajuster l’ordre, l’étendue, le point d’arrêt ou le moment de réalisation selon la préparation, le dépannage et les besoins d’accompagnement.

    - **Parcours prioritaire — environ 85 à 115 minutes d’effort indicatif :** préparer le compte rendu, observer le système, analyser des processus et manipuler l’arborescence temporaire.
    - **Consolidation — environ 45 à 70 minutes d’effort indicatif :** reconstruire les chaînes d’allocation, comparer les systèmes, évaluer une source et compléter le cahier des charges Atlas.
    - **Prolongement facultatif — environ 15 à 25 minutes d’effort indicatif :** résoudre des scénarios supplémentaires de chemins et d’allocation. Cette partie ne compte pas dans la progression exigée.

!!! tip "Point d’arrêt habituel en classe"
    Sauf indication contraire de l’enseignant, terminez le **parcours prioritaire** pendant la période de laboratoire. Commencez ensuite la consolidation avec le temps restant; l’enseignant précisera quelles tâches de consolidation doivent être remises ou poursuivies après la classe.

!!! warning "La progression n’est pas votre compte rendu"
    Les cases sont conservées seulement dans ce navigateur. Conservez vos commandes, sorties utiles, calculs, sources et décisions dans un document que vous contrôlez.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-10-fr-v1" data-gate-template="{done} sur {total} engagements reconnus" data-progress-template="{done} sur {total} tâches terminées" data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?">
<section class="lab-gate" aria-labelledby="lab-10-gate-title">
<h2 id="lab-10-gate-title">Entente de travail</h2>
<p>Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Utilisation assignée</strong><small>J'utiliserai le poste de travail, le réseau et les outils du cours uniquement pour les activités d'apprentissage assignées.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Compte rendu permanent</strong><small>Je conserverai mon travail, mes sources, mes commandes, mes calculs et mon raisonnement dans mon compte rendu permanent.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Incertitude signalée</strong><small>Je signalerai les incertitudes, résultats inattendus, erreurs ou préoccupations de sécurité au lieu de les dissimuler.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Accéder au laboratoire</button><span data-lab-gate-status aria-live="polite">0 sur 3 engagements reconnus</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Travaillez seulement dans l'emplacement de fichiers prévu par le laboratoire et avec des privilèges normaux; ne modifiez pas de fichiers système ni de configuration globale.</p></div>

<noscript>
<div class="lab-no-js-note">
<strong>Mode sans JavaScript</strong>
<p>Toutes les consignes, commandes, tables et activités manuelles restent disponibles. La progression enregistrée ne sera pas disponible. Cochez les tâches dans votre compte rendu et utilisez les réponses repliables pour vérifier les exercices.</p>
</div>
</noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 sur 12 tâches terminées</p><button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button><progress data-lab-progress value="0" max="12">0 sur 12</progress></div>

## Parcours prioritaire

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer le compte rendu</h2>
<p>Créez les rubriques : <strong>contexte</strong>, <strong>système observé</strong>, <strong>processus et mémoire</strong>, <strong>arborescence et commandes</strong>, <strong>allocation de fichiers</strong>, <strong>comparaison de systèmes</strong>, <strong>évaluation de source</strong>, <strong>cahier des charges Atlas</strong>, <strong>cycle de vie</strong> et <strong>synthèse</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Préparez le compte rendu.</strong><small>Inscrivez « Laboratoire 10 », la date, le poste utilisé et les dix rubriques.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observer le système d’exploitation</h2>
<p>Ouvrez PowerShell normalement, sans demander de privilèges d’administration. Si Windows demande une élévation, annulez-la.</p>

```powershell
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsBuildNumber, OsArchitecture, CsSystemType
```

```powershell
Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, BuildNumber, OSArchitecture, LastBootUpTime, FreePhysicalMemory, TotalVisibleMemorySize
```

<p>Conservez ce que les outils rapportent. Si les deux commandes emploient des libellés différents, notez cette différence au lieu de choisir silencieusement une valeur.</p>

<p>Répondez :</p>

1. Quel produit, quelle version, quelle architecture et quel numéro de build sont rapportés?
2. Quelle commande fournit une heure de dernier démarrage?
3. Quelle preuve manque pour connaître avec certitude la date de fin de soutien de cette installation?

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez le relevé du système.</strong><small>Incluez les commandes, les valeurs utiles et au moins une limite d’interprétation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observer les processus et la mémoire</h2>
<p>Exécutez :</p>

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name, Id, CPU, WorkingSet64, Threads
```

```powershell
Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 10 Name, Id, WorkingSet64, CPU
```

<p>Choisissez un processus apparaissant dans au moins une liste. Attendez environ 20 secondes, puis répétez les commandes.</p>

<p>Dans votre compte rendu :</p>

- indiquez le nom et l’identifiant du processus;
- convertissez `WorkingSet64` en Mio;
- comparez les deux instantanés;
- formulez un <strong>fait</strong>, une <strong>inférence prudente</strong> et une <strong>preuve supplémentaire</strong> nécessaire avant de conclure que le processus pose un problème.

!!! info "Interpréter la colonne CPU"
    Dans `Get-Process`, la valeur `CPU` correspond généralement au temps processeur cumulé utilisé par le processus, et non à un pourcentage instantané. Utilisez le Gestionnaire des tâches si l’enseignant vous demande d’observer un pourcentage en temps réel.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Comparez deux instantanés.</strong><small>Conservez la conversion en Mio, les différences et une conclusion limitée par les preuves.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Distinguer programme, processus et service</h2>
<p>Choisissez une application déjà ouverte sur le poste, par exemple le navigateur ou l’éditeur de texte.</p>

1. Repérez son ou ses processus dans le Gestionnaire des tâches ou avec `Get-Process`.
2. Notez le chemin du fichier exécutable seulement si l’interface le rend accessible sans élévation.
3. Ouvrez l’onglet ou la vue des services sans arrêter ni modifier quoi que ce soit.
4. Identifiez un service Windows et notez son nom affiché et son état.

<p>Expliquez ensuite en trois phrases :</p>

- où se trouve le programme;
- ce qui constitue le processus observé;
- pourquoi un service n’est pas simplement « un autre fichier ».</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Distinguez les trois concepts.</strong><small>Appuyez chaque phrase sur une observation et signalez tout champ non accessible.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Créer un espace de travail contrôlé</h2>
<p>Ouvrez l’Invite de commandes normalement. Exécutez les commandes suivantes une ligne à la fois.</p>

```bat
cd /d %USERPROFILE%
mkdir C12-Lab10
cd C12-Lab10
mkdir notes exercices archives
cd notes
(echo Systeme d'exploitation)>seance10.txt
(echo Source officielle a verifier)>sources.txt
cd ..
copy notes\seance10.txt exercices\copie.txt
```

<p>Vérifiez l’arborescence :</p>

```bat
cd

tree /f
```

<p>Dans votre compte rendu, dessinez l’arborescence obtenue et écrivez le chemin absolu de `copie.txt`.</p>

!!! warning "Dossier réservé au laboratoire"
    Toutes les commandes de création, déplacement, renommage et suppression de cette activité doivent rester dans `%USERPROFILE%\C12-Lab10`. Avant une suppression, exécutez `cd` et `dir` pour confirmer l’emplacement.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Créez et vérifiez l’espace de travail.</strong><small>Conservez l’arborescence et le chemin absolu de `copie.txt`.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Utiliser des chemins relatifs et absolus</h2>
<p>Placez-vous dans le dossier `exercices` :</p>

```bat
cd /d %USERPROFILE%\C12-Lab10\exercices
```

<p>Sans changer de dossier avant chaque commande :</p>

1. affichez le contenu de `copie.txt`;
2. affichez `seance10.txt` avec un chemin relatif;
3. copiez `sources.txt` vers `archives` avec un chemin relatif;
4. renommez `copie.txt` en `allocation.txt`;
5. déplacez `allocation.txt` vers `archives`;
6. affichez l’arborescence complète depuis le dossier racine du laboratoire.

<p>Commandes possibles : `type`, `copy`, `ren`, `move`, `cd`, `tree`.</p>

<p>Avant de poursuivre, votre arborescence devrait contenir :</p>

```text
C12-Lab10
├── archives
│   ├── allocation.txt
│   └── sources.txt
├── exercices
└── notes
    ├── seance10.txt
    └── sources.txt
```

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Effectuez les six actions.</strong><small>Conservez les commandes exactes et l’arborescence finale.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Nettoyer seulement l’espace de travail</h2>
<p>Vérifiez d’abord l’emplacement et le contenu :</p>

```bat
cd /d %USERPROFILE%\C12-Lab10
cd
dir
```

<p>Supprimez seulement la copie archivée de `sources.txt`, puis le dossier `exercices` vide :</p>

```bat
del archives\sources.txt
rmdir exercices
```

<p>Conservez l’arborescence restante. Ne supprimez pas le dossier `C12-Lab10` avant que l’enseignant confirme que le compte rendu contient toutes les preuves nécessaires.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Effectuez le nettoyage limité.</strong><small>Conservez la vérification du chemin, les deux commandes et l’arborescence restante.</small></span></label></div>
</section>

## Consolidation

<section class="lab-stage" data-lab-stage>
<h2>Reconstruire des chaînes d’allocation</h2>
<p>La table suivante est une simulation pédagogique. `FIN` termine un fichier, `LIBRE` indique une unité disponible et `RÉSERVÉ` indique une unité non attribuable.</p>

| Cluster | Valeur | Cluster | Valeur |
|---:|---:|---:|---:|
| 2 | 8 | 8 | 11 |
| 3 | LIBRE | 9 | 4 |
| 4 | FIN | 10 | LIBRE |
| 5 | 12 | 11 | FIN |
| 6 | RÉSERVÉ | 12 | 9 |
| 7 | FIN | 13 | 7 |

<p>Les entrées de dossier indiquent :</p>

| Fichier | Premier cluster | Taille logique |
|---|---:|---:|
| `rapport.txt` | 2 | 9 Kio |
| `audio.bin` | 5 | 15 Kio |
| `icone.dat` | 13 | 6 Kio |

<p>La taille d’un cluster est de **4 Kio**.</p>

1. Reconstituez la chaîne de chaque fichier.
2. Calculez le nombre de clusters et l’espace alloué.
3. Calculez l’espace inutilisé dans le dernier cluster de chaque fichier.
4. Indiquez quels fichiers sont fragmentés dans ce modèle.
5. Expliquez pourquoi la fragmentation ne prouve pas une corruption.

??? success "Réponses de vérification"
    - `rapport.txt` : `2 → 8 → 11 → FIN`; 3 clusters; 12 Kio alloués; 3 Kio inutilisés; fragmenté.
    - `audio.bin` : `5 → 12 → 9 → 4 → FIN`; 4 clusters; 16 Kio alloués; 1 Kio inutilisé dans le dernier cluster; fragmenté.
    - `icone.dat` : `13 → 7 → FIN`; 2 clusters; 8 Kio alloués; 2 Kio inutilisés dans le dernier cluster; fragmenté dans cette représentation parce que 13 et 7 ne sont pas contigus.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Analysez les trois fichiers.</strong><small>Conservez chaînes, calculs, fragmentation et explication.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Comparer des familles de systèmes d’exploitation</h2>
<p>Cette activité prépare la discussion formative à réaliser sur votre temps personnel. Elle ne constitue pas la discussion elle-même.</p>

<p>Choisissez <strong>un</strong> scénario :</p>

- poste de création et de bureautique pour une petite organisation;
- poste de développement Web utilisé par une équipe mixte;
- serveur interne fournissant un site, une base de données et des sauvegardes;
- parc de tablettes utilisé pour des activités pédagogiques accessibles.

<p>Comparez trois options pertinentes parmi Windows, macOS, une distribution Linux, Windows Server, Android, iOS ou iPadOS. Toutes les options ne conviennent pas à tous les scénarios.</p>

<table>
<thead><tr><th>Critère</th><th>Option A</th><th>Option B</th><th>Option C</th></tr></thead>
<tbody>
<tr><td>Applications ou services requis</td><td></td><td></td><td></td></tr>
<tr><td>Compatibilité matérielle et périphériques</td><td></td><td></td><td></td></tr>
<tr><td>Cycle de soutien et mises à jour</td><td></td><td></td><td></td></tr>
<tr><td>Administration et compétences</td><td></td><td></td><td></td></tr>
<tr><td>Sécurité, vie privée et accessibilité</td><td></td><td></td><td></td></tr>
<tr><td>Coût total et contraintes</td><td></td><td></td><td></td></tr>
<tr><td>Preuve encore manquante</td><td></td><td></td><td></td></tr>
</tbody>
</table>

<p>Utilisez au moins une source officielle par option. Formulez une recommandation provisoire de quatre à six phrases qui nomme aussi une condition pouvant la modifier.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Produisez la comparaison formative.</strong><small>Conservez le scénario, la matrice, les liens officiels et la recommandation provisoire.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Évaluer une source technique</h2>
<p>Choisissez une page officielle utilisée dans votre comparaison. Répondez en au plus deux phrases par partie.</p>

1. **Source et éditeur :** titre exact, organisation et lien direct.
2. **Pertinence :** pourquoi cette page peut-elle soutenir le critère choisi?
3. **Spécification :** relevez une valeur, une exigence ou une déclaration exacte avec son contexte.
4. **Vérification :** comparez avec une seconde source, une observation du poste ou une notion de la séance.
5. **Nature des énoncés :** écrivez un fait, une inférence et une recommandation, ou expliquez pourquoi aucune recommandation n’est justifiée.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Évaluez la source.</strong><small>Conservez les cinq parties et les deux liens lorsque la vérification utilise une seconde page.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Mettre à jour le cahier des charges Atlas</h2>
<p>Le PC Atlas vise le jeu en 1440p et la diffusion en continu. Ajoutez une section <strong>Système d’exploitation et soutien</strong> contenant :</p>

- besoin pertinent;
- applications et périphériques qui contraignent le choix;
- édition, architecture ou famille à vérifier;
- exigences de sécurité et de mise à jour;
- période de soutien ou méthode pour la vérifier;
- compatibilité avec les pilotes et le matériel déjà retenu;
- recommandation provisoire;
- question ouverte pouvant modifier cette recommandation.

<p>Ajoutez ensuite une phrase par critère :</p>

- **Longévité :** le système restera-t-il soutenu pendant la période d’usage prévue?
- **Stabilité :** quelles mises à jour, quels pilotes ou quelles dépendances pourraient menacer un fonctionnement prévisible?
- **Efficacité :** les ressources et le coût d’administration sont-ils justifiés par la charge?
- **Maintenabilité :** le système peut-il être diagnostiqué, mis à jour et réinstallé sans difficulté déraisonnable?

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Prolongez le cahier des charges.</strong><small>Conservez les exigences, la recommandation provisoire, la question ouverte et les quatre phrases de cycle de vie.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Rédiger la synthèse</h2>
<p>Rédigez entre 180 et 250 mots répondant à la question :</p>

> Comment le système d’exploitation relie-t-il un processus à la mémoire, à un fichier et à un périphérique, et pourquoi cette relation influence-t-elle le choix d’un système?

<p>Votre synthèse doit inclure :</p>

- un processus;
- une allocation de mémoire;
- un chemin ou une chaîne d’allocation;
- un pilote;
- un critère de comparaison entre systèmes;
- une limite ou une preuve encore manquante.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Terminez la synthèse intégrée.</strong><small>Vérifiez que chaque concept est relié au même chemin explicatif.</small></span></label></div>
</section>

## Prolongement facultatif

### Scénarios de chemins

Depuis `%USERPROFILE%\C12-Lab10\archives`, écrivez sans les exécuter :

1. le chemin relatif vers `notes\seance10.txt`;
2. le chemin absolu vers `archives\allocation.txt`;
3. une commande qui affiche l’arborescence depuis la racine du laboratoire;
4. une commande qui revient directement au profil de l’utilisateur.

??? success "Vérification possible"
    1. `..\notes\seance10.txt`
    2. `%USERPROFILE%\C12-Lab10\archives\allocation.txt`
    3. `tree %USERPROFILE%\C12-Lab10 /f`
    4. `cd /d %USERPROFILE%`

### Chaîne incohérente

Une entrée de dossier commence au cluster `20`, et la table indique `20 → 24`, `24 → 20`. Expliquez pourquoi le parcours ne peut pas atteindre `FIN` et quelle catégorie de problème cette boucle pourrait représenter dans un modèle simplifié.

</div>
</div>
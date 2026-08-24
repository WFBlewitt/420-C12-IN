# Laboratoire 12 - Identifier, vérifier et diagnostiquer une chaîne de périphériques

[Retour à la Séance 12](../seances/seance-12.md)

## But du laboratoire

Vous allez reconnaître des connecteurs à partir d’images, distinguer leur forme de leurs capacités, observer les périphériques d’un poste Windows, analyser des chaînes USB et d’affichage, interpréter une connexion Ethernet, diagnostiquer des cas de pilotes et d’audio et recommander un périphérique d’accessibilité selon un besoin précis.

Le laboratoire doit être réalisable sur un poste géré **sans privilèges d’administration**. Vous ne devez installer, désinstaller, activer, désactiver ni mettre à jour aucun pilote. Vous ne devez modifier aucune ressource d’interruption, aucun paramètre du Registre, aucun micrologiciel ni aucune configuration réseau. Toutes les commandes sont en lecture seule.

Lorsque du matériel physique n’est pas disponible, les images et fiches fournies constituent la source d’observation. Ne branchez aucun périphérique inconnu, ne débranchez aucun câble essentiel au poste et ne manipulez jamais un connecteur interne sous tension.

Les produits, capacités et erreurs des scénarios pédagogiques sont fictifs ou simplifiés. Ils servent à exercer une méthode de diagnostic et ne représentent pas une liste de produits actuels.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- reconnaître les principales formes USB, d’affichage, d’audio, de réseau, de stockage et PS/2;
- distinguer connecteur, protocole, débit, puissance et fonction facultative;
- interpréter les notations USB 5, 10, 20, 40 et 80 Gbit/s ainsi que `Gen 1x1`, `Gen 2x1` et `Gen 2x2`;
- déterminer la limite d’une chaîne USB à partir de l’hôte, du câble, de la station et du périphérique;
- expliquer pourquoi un adaptateur peut être unidirectionnel ou actif;
- recueillir des informations Plug-and-Play et de pilote avec un compte standard;
- interpréter une vitesse de lien Ethernet sans la confondre avec une adresse IP;
- diagnostiquer un périphérique en isolant une couche à la fois;
- expliquer pourquoi le partage apparent d’une interruption ne prouve pas un conflit;
- transformer un besoin d’accessibilité en critères de connexion, de logiciel, de positionnement, de soutien et de maintenance;
- évaluer une source officielle avec une trace vérifiable;
- prolonger le cahier des charges Atlas avec des exigences d’entrée-sortie et de périphériques.

!!! info "Repères de planification"
    Les plages ci-dessous sont des **estimations d’effort pédagogique**, et non des délais garantis. Le temps requis varie selon le matériel disponible, les informations exposées par le poste, le dépannage, les échanges en classe et les besoins d’accompagnement. L’enseignant peut ajuster l’ordre, l’étendue, le point d’arrêt ou le moment de réalisation.

    - **Parcours prioritaire — environ 90 à 120 minutes d’effort indicatif :** préparer le compte rendu, reconnaître les connecteurs, analyser les chaînes USB et observer les périphériques et pilotes.
    - **Consolidation — environ 55 à 80 minutes d’effort indicatif :** interpréter le réseau, diagnostiquer les scénarios, analyser les interruptions, évaluer l’accessibilité, vérifier une source et compléter le cahier des charges Atlas.
    - **Prolongement facultatif — environ 15 à 25 minutes d’effort indicatif :** résoudre des chaînes supplémentaires après le travail exigé. Cette partie ne compte pas dans la progression.

!!! tip "Point d’arrêt habituel en classe"
    Sauf indication contraire de l’enseignant, terminez le **parcours prioritaire** pendant la période de laboratoire. Commencez ensuite la consolidation avec le temps restant; l’enseignant précisera quelles tâches de consolidation doivent être remises ou poursuivies après la classe.

!!! warning "La progression n’est pas votre compte rendu"
    Les cases sont conservées seulement dans ce navigateur. Conservez vos observations, commandes, sorties utiles, calculs, tableaux, liens directs, hypothèses et décisions dans un document que vous contrôlez.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-12-fr-v1" data-gate-template="{done} sur {total} engagements reconnus" data-progress-template="{done} sur {total} tâches terminées" data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?">
<section class="lab-gate" aria-labelledby="lab-12-gate-title">
<h2 id="lab-12-gate-title">Entente de travail</h2>
<p>Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Utilisation assignée</strong><small>J'utiliserai le poste de travail, le réseau et les outils du cours uniquement pour les activités d'apprentissage assignées.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Compte rendu permanent</strong><small>Je conserverai mon travail, mes sources, mes commandes, mes calculs et mon raisonnement dans mon compte rendu permanent.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Incertitude signalée</strong><small>Je signalerai les incertitudes, résultats inattendus, erreurs ou préoccupations de sécurité au lieu de les dissimuler.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Accéder au laboratoire</button><span data-lab-gate-status aria-live="polite">0 sur 3 engagements reconnus</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Diagnostiquez sans débrancher du matériel appartenant au laboratoire ni installer de pilote; isolez une variable à la fois et respectez les besoins d'accessibilité de la personne concernée.</p></div>

<noscript>
<div class="lab-no-js-note">
<strong>Mode sans JavaScript</strong>
<p>Toutes les consignes, images, tables, commandes et réponses repliables restent disponibles. La progression enregistrée et le bouton de réinitialisation ne seront pas disponibles; suivez les tâches exigées dans votre compte rendu permanent.</p>
</div>
</noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 sur 13 tâches terminées</p><button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button><progress data-lab-progress value="0" max="13">0 sur 13</progress></div>

## Parcours prioritaire

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer le compte rendu</h2>
<p>Créez les rubriques : <strong>contexte</strong>, <strong>reconnaissance des connecteurs</strong>, <strong>chaînes USB</strong>, <strong>périphériques observés</strong>, <strong>pilotes</strong>, <strong>réseau</strong>, <strong>diagnostics</strong>, <strong>interruptions</strong>, <strong>accessibilité</strong>, <strong>évaluation de source</strong>, <strong>cahier des charges Atlas et cycle de vie</strong> et <strong>synthèse</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Préparez le compte rendu.</strong><small>Inscrivez « Laboratoire 12 », la date, le poste ou scénario et les douze rubriques.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Reconnaître les connecteurs</h2>

<p>Examinez les images de référence de la <a href="../seances/seance-12.md">Séance 12</a>. Pour chaque élément ci-dessous, inscrivez :</p>

1. le nom de la forme;
2. une fonction fréquente;
3. une propriété que la forme ne prouve pas;
4. une précaution ou vérification utile.

| Élément à reconnaître | Nom | Fonction fréquente | La forme ne prouve pas… | Vérification ou précaution |
|---|---|---|---|---|
| USB Type-A | | | | |
| USB Type-B | | | | |
| USB Micro-B 3.x | | | | |
| USB Type-C | | | | |
| HDMI | | | | |
| DisplayPort | | | | |
| DVI | | | | |
| VGA/DE-15 | | | | |
| TRS 3,5 mm | | | | |
| TRRS 3,5 mm | | | | |
| 8P8C dit RJ-45 | | | | |
| SATA données | | | | |
| SATA alimentation | | | | |
| M.2 clé M ou B+M | | | | |
| PS/2 | | | | |

<p>Ajoutez ensuite deux phrases :</p>

- une expliquant pourquoi USB-C est une forme et non un débit;
- une expliquant pourquoi une fiche 8P8C ne prouve pas une vitesse Ethernet.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complétez la reconnaissance.</strong><small>Conservez les quinze lignes et les deux explications.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Interpréter les débits USB</h2>
<p>Complétez les équivalences suivantes :</p>

| Description | Débit brut nominal |
|---|---:|
| USB 2.0 High-Speed | |
| USB 3.2 Gen 1x1 | |
| USB 3.2 Gen 2x1 | |
| USB 3.2 Gen 2x2 | |
| USB4 40Gbps | |
| USB4 Version 2.0 à capacité maximale courante | |

<p>Expliquez ensuite le calcul de `Gen 2x2` et répondez :</p>

1. pourquoi une fiche « USB 3.2 » sans débit précis demeure-t-elle ambiguë?
2. pourquoi 20 Gbit/s bruts ne signifient-ils pas une copie à 2,5 Go/s soutenue?
3. quel connecteur est requis par USB 3.2 Gen 2x2?

??? success "Vérification"
    - USB 2.0 High-Speed : **480 Mbit/s**.
    - USB 3.2 Gen 1x1 : **5 Gbit/s**.
    - USB 3.2 Gen 2x1 : **10 Gbit/s**.
    - USB 3.2 Gen 2x2 : **20 Gbit/s**, soit `10 Gbit/s × 2 voies`.
    - USB4 40Gbps : **40 Gbit/s**.
    - USB4 Version 2.0 : jusqu’à **80 Gbit/s** dans une chaîne compatible.
    - USB 3.2 Gen 2x2 exige **USB Type-C**.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interprétez les six indications.</strong><small>Conservez les débits, le calcul, les réponses et les limites d’interprétation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Analyser des chaînes USB</h2>
<p>Pour chaque scénario, déterminez :</p>

- le débit maximal commun avant les pertes;
- la puissance maximale livrable lorsqu’elle peut être déterminée;
- la fonction qui fonctionne ou échoue;
- le goulot d’étranglement ou la preuve manquante;
- la prochaine vérification qui change une seule variable.

### Chaîne A — SSD externe

```text
ordinateur : USB-C, USB 20Gbps, PD 100 W, DisplayPort Alt Mode
câble : USB 10Gbps, 60 W
station : USB 10Gbps, 85 W vers le portable
SSD : USB 20Gbps, alimentation par le bus
```

### Chaîne B — écran et alimentation

```text
ordinateur : USB-C, USB 10Gbps, aucun DisplayPort Alt Mode indiqué
câble : USB 40Gbps, 240 W, vidéo compatible
écran : USB-C avec DisplayPort Alt Mode et alimentation 90 W
```

### Chaîne C — câble de charge

```text
ordinateur : USB-C avec DisplayPort Alt Mode
câble : USB-C vers USB-C, 100 W, USB 2.0 seulement
adaptateur : USB-C vers DisplayPort passif
écran : DisplayPort 1 440p à 144 Hz
```

### Chaîne D — station partagée

```text
ordinateur : USB4 40Gbps
câble : USB4 40Gbps, 240 W
station : lien amont 40 Gbit/s partagé entre deux écrans, SSD, Ethernet et USB
périphériques : deux écrans 4K, SSD 20Gbps, Ethernet 2,5GbE
```

<p>Pour la chaîne D, ne calculez pas un résultat précis : nommez les preuves nécessaires sur la station, les modes d’écran, la compression et le partage interne.</p>

??? success "Points de vérification"
    - **A :** la capacité de données est limitée à 10 Gbit/s par le câble et la station; la station annonce au plus 85 W vers le portable.
    - **B :** le câble et l’écran ne peuvent pas créer DisplayPort Alt Mode dans le port de l’ordinateur; la vidéo n’est pas confirmée.
    - **C :** le câble USB 2.0 ne transporte pas les voies rapides nécessaires au mode vidéo; la puissance seule ne suffit pas.
    - **D :** le lien amont est partagé; il faut vérifier les modes, la bande passante réservée, la compression, les contrôleurs et les limites simultanées.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Analysez les quatre chaînes.</strong><small>Conservez chaque limite, fonction, preuve manquante et prochaine vérification.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observer les périphériques Plug-and-Play</h2>
<p>Ouvrez PowerShell normalement, sans demander d’élévation. Exécutez :</p>

```powershell
Get-PnpDevice -PresentOnly |
  Sort-Object Class, FriendlyName |
  Select-Object Class, FriendlyName, Status, InstanceId
```

<p>Si `Get-PnpDevice` n’est pas disponible ou refuse l’accès, conservez l’erreur puis utilisez :</p>

```powershell
Get-CimInstance Win32_PnPEntity |
  Sort-Object PNPClass, Name |
  Select-Object Name, PNPClass, Status, DeviceID
```

<p>Filtrez ensuite la liste au besoin, par exemple avec `Where-Object Class -eq 'Net'` ou `Where-Object FriendlyName -like '*USB*'`.</p>

<p>Choisissez trois périphériques de classes différentes, par exemple :</p>

- écran ou carte graphique;
- audio;
- clavier, souris ou appareil USB;
- réseau;
- stockage.

<p>Pour chacun, notez :</p>

- classe;
- nom convivial;
- état;
- début de l’identifiant d’instance ou de périphérique;
- ce que ces champs prouvent;
- une caractéristique qu’ils ne prouvent pas.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez trois instances.</strong><small>Incluez les commandes, les résultats et une limite pour chaque périphérique.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observer les pilotes sans les modifier</h2>
<p>Utilisez le Gestionnaire de périphériques en lecture seule ou la commande suivante :</p>

```powershell
Get-CimInstance Win32_PnPSignedDriver |
  Where-Object DeviceName |
  Sort-Object DeviceClass, DeviceName |
  Select-Object DeviceName, DeviceClass, DriverProviderName,
                DriverVersion, DriverDate, IsSigned, InfName
```

<p>Choisissez un périphérique parmi ceux observés. Conservez :</p>

- fournisseur du pilote;
- version;
- date;
- état de signature;
- fichier INF, s’il est indiqué;
- source officielle que vous consulteriez avant une mise à jour;
- raison pour laquelle une date plus récente ne suffit pas à recommander une mise à jour.

<p>Ne cliquez sur aucun bouton de mise à jour, de restauration, de désactivation ou de désinstallation.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Produisez la fiche d’un pilote.</strong><small>Incluez les six champs, la source prévue et une limite de la date.</small></span></label></div>
</section>

## Consolidation

<section class="lab-stage" data-lab-stage>
<h2>Interpréter une connexion Ethernet</h2>
<p>Exécutez :</p>

```powershell
Get-NetAdapter |
  Select-Object Name, InterfaceDescription, Status, LinkSpeed, MacAddress
```

<p>Si cette commande n’est pas disponible, conservez l’erreur et utilisez la page d’état réseau de Windows en lecture seule.</p>

<p>Pour un adaptateur actif ou pour le scénario fourni par l’enseignant, notez :</p>

- nom et description;
- état;
- vitesse de lien rapportée;
- adresse MAC rapportée;
- type de connexion observé ou supposé;
- preuve encore nécessaire pour connaître la catégorie du câble.

<p>Répondez ensuite :</p>

1. pourquoi `LinkSpeed = 1 Gbps` ne prouve-t-il pas un débit utile de 1 Gbit/s pour une copie?
2. pourquoi une adresse IP ne détermine-t-elle pas la vitesse physique du lien?
3. un port 2,5GbE relié à un commutateur 1GbE devrait négocier à quelle capacité maximale commune?
4. quelles causes pourraient expliquer une négociation à 100 Mbit/s?

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interprétez le lien réseau.</strong><small>Conservez l’observation, les quatre réponses et au moins trois causes possibles d’un lien réduit.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Diagnostiquer des cas de périphériques</h2>
<p>Pour chaque cas, produisez une trace selon ce modèle :</p>

```text
symptôme exact
→ couche physique
→ puissance
→ capacité ou protocole
→ détection du système
→ pilote
→ application
→ test suivant
→ recommandation provisoire
```

### Cas 1 — écran noir avec adaptateur

Un ordinateur possède seulement une sortie HDMI. Un adaptateur étiqueté « DisplayPort vers HDMI » a été branché dans le sens HDMI de l’ordinateur vers DisplayPort de l’écran. L’écran reste noir.

### Cas 2 — casque TRRS

Un casque TRRS avec microphone est branché directement dans la prise verte d’un poste de bureau qui possède des prises verte et rose séparées. Le son fonctionne, mais le microphone n’apparaît pas.

### Cas 3 — clavier PS/2 avec adaptateur passif

Un clavier USB récent est relié au port PS/2 par un petit adaptateur passif. Il n’est pas détecté au démarrage.

### Cas 4 — SSD externe lent

Un SSD USB 20Gbps est relié à un port Type-A par un câble USB 5Gbps. Le débit observé est nettement inférieur au débit annoncé du SSD.

### Cas 5 — périphérique marqué d’un avertissement

Le Gestionnaire de périphériques affiche un avertissement et un code d’erreur pour une caméra USB. La caméra reçoit de l’énergie, mais aucune application ne peut l’utiliser.

<p>Pour le cas 5, proposez deux vérifications en lecture seule avant toute action de pilote.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Diagnostiquez les cinq cas.</strong><small>Ne changez qu’une variable à la fois et distinguez le fait de l’hypothèse.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Interpréter les interruptions sans conclure trop vite</h2>
<p>La table suivante représente un relevé pédagogique simplifié :</p>

| Périphérique | Mode rapporté | Vecteur ou ressource | État |
|---|---|---:|---|
| Contrôleur NVMe | MSI-X | 32 à 39 | fonctionne |
| Carte réseau | MSI-X | 40 à 47 | fonctionne |
| Contrôleur USB | MSI | 24 | fonctionne |
| Contrôleur audio hérité | IRQ ligne | 16 | fonctionne |
| Autre contrôleur PCI | IRQ ligne | 16 | fonctionne |

<p>Répondez :</p>

1. pourquoi plusieurs vecteurs peuvent-ils être utiles à un périphérique rapide?
2. pourquoi deux périphériques affichés sur l’IRQ 16 ne prouvent-ils pas un conflit?
3. quelles preuves supplémentaires appuieraient l’hypothèse d’un problème d’interruption?
4. pourquoi ne faut-il pas modifier manuellement ces ressources dans ce laboratoire?

<p>Formulez un fait, une inférence prudente et une preuve manquante.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interprétez le relevé.</strong><small>Conservez les quatre réponses et les trois catégories d’énoncés.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Évaluer un périphérique d’accessibilité</h2>
<p>Choisissez un des scénarios suivants. Ne choisissez pas encore un produit précis.</p>

### Scénario A — entrée avec faible amplitude de mouvement

Une personne doit rédiger et naviguer pendant plusieurs heures. Les petits déplacements précis de la souris causent rapidement de la fatigue. Elle peut utiliser un mouvement plus large du bras et préfère une rétroaction physique claire.

### Scénario B — interaction à un seul contacteur

Une personne peut activer de façon fiable un seul contacteur. Elle doit naviguer dans Windows, ouvrir des applications et sélectionner du texte à l’aide d’un système de balayage.

### Scénario C — lecture braille

Une personne utilise un lecteur d’écran et veut lire et saisir du texte avec une ligne braille actualisable sur un poste Windows géré.

### Scénario D — commande oculaire

Une personne souhaite utiliser le regard pour naviguer et sélectionner des éléments. Le poste est placé dans un local où la lumière varie et où une caméra pose des questions de confidentialité.

<p>Produisez :</p>

1. l’obstacle et la tâche;
2. deux catégories de solutions possibles;
3. les exigences de connexion et d’alimentation;
4. les exigences de Windows, du pilote ou du logiciel;
5. les exigences de montage, de calibration ou de positionnement;
6. un risque de vie privée ou de fiabilité;
7. une solution de rechange en cas de panne;
8. une question à poser à la personne avant de recommander;
9. une méthode d’essai ou de validation.

<p>La conclusion doit rester provisoire tant qu’un essai avec la personne n’a pas eu lieu.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Construisez l’évaluation d’accessibilité.</strong><small>Conservez les neuf éléments et la limite de la recommandation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Évaluer une source technique</h2>
<p>Choisissez une source officielle portant sur l’un des sujets suivants :</p>

- débit, logo ou câble USB;
- puissance USB PD;
- capacité d’un port d’affichage;
- pilote ou page de soutien d’un périphérique;
- vitesse ou câblage Ethernet;
- périphérique d’accessibilité et compatibilité Windows.

<p>Répondez en au plus deux phrases par partie.</p>

1. **Source et éditeur** — titre exact, organisme ou fabricant et lien direct.
2. **Pertinence** — pourquoi cette source peut-elle soutenir la propriété vérifiée?
3. **Spécification** — recopiez une valeur ou une condition exacte avec son contexte.
4. **Vérification** — comparez-la à une seconde source, une observation, un calcul ou la théorie.
5. **Nature des énoncés** — distinguez un fait, une inférence et une recommandation, ou expliquez pourquoi aucune recommandation n’est justifiée.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez l’évaluation en cinq parties.</strong><small>Incluez les liens directs et le contexte exact de la spécification.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Mettre à jour le cahier des charges Atlas et le cycle de vie</h2>
<p>Ajoutez au cahier des charges du PC de jeu et de diffusion en continu :</p>

- ports arrière nécessaires;
- connecteurs de façade nécessaires;
- débit USB minimal pour le stockage externe;
- capacité vidéo exigée par le moniteur;
- connexion du microphone et du casque;
- vitesse Ethernet minimale;
- besoins éventuels de station d’accueil ou de concentrateur;
- exigences d’accessibilité connues;
- pilotes, systèmes et documentation à maintenir;
- une question ouverte sur un câble, un port ou un périphérique.

<p>Ajoutez ensuite une phrase par critère :</p>

- **longévité** — les ports, câbles, pilotes et périphériques resteront-ils soutenus pendant la période prévue?
- **stabilité** — quelles preuves appuient une communication prévisible?
- **efficacité** — la station, les adaptateurs et la puissance ajoutée sont-ils justifiés?
- **maintenabilité** — les câbles, pilotes et périphériques peuvent-ils être identifiés, remplacés et diagnostiqués raisonnablement?

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Prolongez la spécification.</strong><small>Conservez les dix éléments, les quatre phrases et la preuve encore nécessaire.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Produire la synthèse intégrée</h2>
<p>Rédigez une synthèse de 180 à 250 mots répondant à cette question :</p>

> Comment prouver qu’un périphérique convient au projet Atlas sans confondre la forme du connecteur avec la capacité de la chaîne?

<p>Votre réponse doit intégrer :</p>

- un exemple USB;
- un exemple d’affichage, d’audio ou de réseau;
- le rôle de Plug-and-Play et du pilote;
- la place des interruptions;
- une exigence d’accessibilité;
- un fait, une inférence, une recommandation provisoire et une question ouverte.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Rédigez la synthèse.</strong><small>Reliez le connecteur, le protocole, la capacité, le logiciel et le besoin humain.</small></span></label></div>
</section>

## Contrôle final

Avant de terminer, vérifiez que votre compte rendu contient :

- les quinze connecteurs reconnus;
- les six débits USB et la notation `Gen x`;
- les quatre chaînes USB;
- trois instances Plug-and-Play;
- une fiche de pilote;
- l’observation ou le scénario Ethernet;
- cinq diagnostics;
- l’analyse des interruptions;
- l’évaluation d’accessibilité;
- l’évaluation de source;
- le cahier des charges et le cycle de vie;
- la synthèse intégrée.

</div>
</div>

## Prolongement facultatif

### Chaîne E — adaptateur vidéo

```text
source : DisplayPort avec mode double compatible
adaptateur : DisplayPort vers HDMI passif
écran : HDMI 1080p à 60 Hz
```

Expliquez pourquoi cette chaîne peut fonctionner et pourquoi l’inverse HDMI vers DisplayPort n’est pas prouvé.

### Chaîne F — alimentation partagée

```text
chargeur : 140 W
station : réserve 20 W et fournit au plus 100 W au portable
câble : 60 W
portable : demande jusqu’à 100 W
```

Calculez la limite de puissance de la chaîne et nommez le composant à remplacer en premier.

### Chaîne G — lien Ethernet réduit

```text
carte : 2,5GbE
commutateur : 2,5GbE
câble : catégorie inconnue, quatre conducteurs actifs seulement
lien négocié : 100 Mbit/s
```

Expliquez pourquoi la forme 8P8C n’a pas suffi et quelle inspection ou substitution confirmerait l’hypothèse.

??? success "Vérification du prolongement"
    - **E :** une sortie DisplayPort compatible peut fournir un signal utilisable par un adaptateur passif vers HDMI; la direction inverse exige généralement une conversion active.
    - **F :** le câble limite la puissance à **60 W**, même si le chargeur et la station offrent davantage.
    - **G :** Gigabit et 2,5GbE exigent les paires nécessaires; quatre conducteurs seulement peuvent limiter le lien à 100 Mbit/s. Un câble connu et certifié constitue un test utile.

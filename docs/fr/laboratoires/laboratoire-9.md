# Laboratoire 9 - Évaluer un système de stockage et construire une stratégie de protection

[Retour à la Séance 9](../seances/seance-9.md)

## But du laboratoire

Vous allez observer le stockage d'un poste Windows, reconstruire le chemin entre les appareils physiques et les volumes visibles, effectuer des calculs de capacité et de transfert, analyser des configurations RAID et prolonger le cahier des charges Atlas avec une stratégie de stockage et de récupération.

Le laboratoire ne demande aucune modification du partitionnement, aucun formatage et aucun privilège d'administration. Toutes les commandes sont en lecture seule.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- recueillir et interpréter des informations de stockage avec PowerShell;
- distinguer appareil, disque, partition, volume et système de fichiers;
- calculer une capacité visible, un temps de transfert et une capacité RAID;
- comparer HDD, SSD SATA et SSD NVMe selon une charge de travail;
- diagnostiquer un ensemble RAID dégradé et expliquer le risque de reconstruction;
- distinguer RAID, sauvegarde, synchronisation, versionnement et instantané;
- évaluer une source technique avec une trace vérifiable;
- formuler une recommandation provisoire de stockage et de récupération pour un besoin client.

!!! info "Repères de planification"
    Les durées ci-dessous sont des **estimations d'effort pédagogique**, et non des délais garantis. Le temps requis varie selon la préparation, le matériel disponible, le dépannage, les échanges en classe et les besoins d'accompagnement. L'enseignant peut ajuster l'ordre, l'étendue, le point d'arrêt ou le moment de réalisation des activités.

    - **Parcours prioritaire — environ 90 à 120 minutes d'effort indicatif :** préparez le compte rendu, observez les appareils, reconstruisez l'organisation logique, effectuez les calculs et comparez les technologies.
    - **Consolidation — environ 45 à 70 minutes d'effort indicatif :** analysez les RAID, distinguez les mécanismes de protection, évaluez une source et complétez le cahier des charges Atlas.
    - **Prolongement facultatif — environ 15 à 25 minutes d'effort indicatif :** explorez des scénarios RAID supplémentaires après le travail exigé. Cette partie ne compte pas dans la progression.

!!! tip "Point d’arrêt habituel en classe"
    Sauf indication contraire de l’enseignant, terminez le **parcours prioritaire** pendant la période de laboratoire. Commencez ensuite la consolidation avec le temps restant; l’enseignant précisera quelles tâches de consolidation doivent être remises ou poursuivies après la classe.

!!! warning "La progression n'est pas votre compte rendu"
    Les cases sont conservées seulement dans ce navigateur. Conservez vos commandes, résultats, calculs, sources et décisions dans un document que vous contrôlez.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-9-fr-v2" data-gate-template="{done} sur {total} engagements reconnus" data-progress-template="{done} sur {total} tâches terminées" data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?">
<section class="lab-gate" aria-labelledby="lab-9-gate-title">
<h2 id="lab-9-gate-title">Entente de travail</h2>
<p>Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Utilisation assignée</strong><small>J'utiliserai le poste de travail, le réseau et les outils du cours uniquement pour les activités d'apprentissage assignées.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Compte rendu permanent</strong><small>Je conserverai mon travail, mes sources, mes commandes, mes calculs et mon raisonnement dans mon compte rendu permanent.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Incertitude signalée</strong><small>Je signalerai les incertitudes, résultats inattendus, erreurs ou préoccupations de sécurité au lieu de les dissimuler.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Accéder au laboratoire</button><span data-lab-gate-status aria-live="polite">0 sur 3 engagements reconnus</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Ne modifiez pas les volumes, partitions ou données du poste. Le poste peut contenir des partitions de démarrage, de récupération ou d'un autre système d'exploitation : ne les montez pas, ne les initialisez pas, ne les formatez pas, ne changez pas leur état et ne modifiez pas leur étiquette. Les scénarios RAID et de protection sont des exercices d'analyse, non des consignes de reconfiguration du laboratoire.</p></div>
<noscript><div class="lab-no-js-note"><strong>Mode sans JavaScript</strong><p>Les consignes, tableaux et calculs manuels restent disponibles. La progression enregistrée et le planificateur RAID interactif ne seront pas disponibles; utilisez le remplacement manuel fourni.</p></div></noscript>
<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 sur 9 tâches terminées</p><button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button><progress data-lab-progress value="0" max="9">0 sur 9</progress></div>

## Parcours prioritaire

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer le compte rendu</h2>
<p>Créez les rubriques suivantes : <strong>contexte</strong>, <strong>relevé physique</strong>, <strong>organisation logique</strong>, <strong>calculs</strong>, <strong>comparaison</strong>, <strong>RAID et protection</strong>, <strong>évaluation de source</strong>, <strong>cahier des charges Atlas</strong> et <strong>cycle de vie</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Préparez le compte rendu.</strong><small>Inscrivez « Laboratoire 9 », la date, le poste ou scénario et les neuf rubriques.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observer les appareils physiques</h2>
<p>Ouvrez PowerShell normalement, sans demander de privilèges d'administration. Si Windows demande une élévation, annulez-la. Tapez les commandes en lecture seule et conservez la sortie utile.</p>

```powershell
Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, Size, HealthStatus, OperationalStatus
```

```powershell
Get-Disk | Select-Object Number, FriendlyName, BusType, PartitionStyle, Size, IsBoot, IsSystem, OperationalStatus
```

<p>Pour chaque appareil, notez ce que l'outil rapporte. Un champ vide ou une valeur générique ne prouve pas que la caractéristique est absente.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez le relevé physique.</strong><small>Incluez nom, support signalé, bus, capacité, état et champs incertains.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Reconstruire l'organisation logique</h2>
<p>Exécutez les commandes en lecture seule :</p>

```powershell
Get-Partition | Select-Object DiskNumber, PartitionNumber, DriveLetter, Type, Size
```

```powershell
Get-Volume | Select-Object DriveLetter, FileSystemLabel, FileSystem, DriveType, HealthStatus, Size, SizeRemaining
```

<p>Choisissez un volume visible et construisez une trace :</p>

```text
appareil ou disque → table de partitions → partition → volume → système de fichiers → point de montage
```

<p>Lorsqu'un lien ne peut pas être prouvé avec les champs disponibles, écrivez « à vérifier » et nommez la preuve qui manque.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Construisez une trace logique.</strong><small>Incluez les identifiants, tailles, style de partition, système de fichiers et lettre de lecteur disponibles.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Calculer capacité et temps de transfert</h2>
<p>Montrez la formule, les unités et l'arrondissement.</p>

1. Un SSD est annoncé à **2 To**. Convertissez cette capacité en **Tio**.
2. Un volume contient **1,35 To** de données. Estimez le temps minimal pour les copier à **185 Mo/s**.
3. Un dossier contient **620 Gio**. Estimez le temps minimal pour le copier à **1,4 Gio/s**.

<p>Après chaque calcul, nommez une raison pour laquelle le temps réel ou la capacité visible peut différer.</p>

??? success "Réponses de vérification"
    1. `2 000 000 000 000 ÷ 1 099 511 627 776 ≈ 1,82 Tio`.
    2. `1 350 000 Mo ÷ 185 Mo/s ≈ 7 297 s`, soit environ **2 h 1 min 37 s**.
    3. `620 Gio ÷ 1,4 Gio/s ≈ 443 s`, soit environ **7 min 23 s**.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez les trois calculs.</strong><small>Chaque réponse doit inclure démarche, unités, résultat arrondi et limite de l'estimation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Comparer les technologies selon la charge de travail</h2>
<p>Les données et prix sont pédagogiques et figés.</p>

| Option | Capacité | Débit séquentiel annoncé | Indication aléatoire | Endurance ou usage | Coût |
|---|---:|---:|---|---|---:|
| SSD NVMe M.2 Atlas N4 | 2 To | 7 000/6 000 Mo/s lecture/écriture | très faible latence; 850 000 IOPS lecture | 1 200 TBW | 170 $ |
| SSD SATA 2,5 po Atlas S4 | 4 To | 560/520 Mo/s | faible latence; 95 000 IOPS lecture | 2 400 TBW | 360 $ |
| HDD 3,5 po Atlas H8 | 8 To | 240 Mo/s soutenu maximal | accès mécanique; 7 200 tr/min | bureau/NAS léger | 220 $ |
| HDD externe USB Atlas E8 | 8 To | 200 Mo/s soutenu maximal | accès mécanique | sauvegarde locale débranchable | 200 $ |

<p>Choisissez une option principale pour chacun des besoins suivants :</p>

- système, jeux actifs et projet vidéo en cours;
- quatre téraoctets d'enregistrements rarement modifiés;
- copie locale débranchée entre les sauvegardes;
- transfert fréquent entre deux postes qui ne possèdent pas tous les deux un emplacement M.2 libre.

<p>Pour **un** de ces besoins, ajoutez une solution de remplacement. Justifiez chaque décision avec au moins deux critères.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Comparez les quatre options.</strong><small>Conservez quatre choix principaux et une solution de remplacement expliquée.</small></span></label></div>
</section>

## Consolidation

<section class="lab-stage" data-lab-stage>
<h2>Analyser capacité RAID, panne et reconstruction</h2>
<p>Pour chaque scénario, calculez capacité brute, capacité utile théorique, tolérance et état après l'incident.</p>

| Scénario | Configuration | Incident |
|---|---|---|
| A | 4 disques de 6 To en RAID 0 | un disque tombe en panne |
| B | 5 disques de 8 To en RAID 5 | un disque tombe en panne; le remplacement commence |
| C | 6 disques de 4 To en RAID 10 | deux disques tombent en panne; les paires ne sont pas précisées |

<p>Dans le scénario C, donnez une réponse conditionnelle. Pour le scénario B, ajoutez : risque pendant la reconstruction, preuve à surveiller et raison pour laquelle une sauvegarde récente reste nécessaire.</p>

<div data-raid-planner data-lang="fr">
<div class="base-answer-grid">
<label class="base-answer-field"><span>Niveau RAID</span><select data-raid-level><option value="0">RAID 0</option><option value="1">RAID 1</option><option value="5">RAID 5</option><option value="6">RAID 6</option><option value="10">RAID 10</option></select></label>
<label class="base-answer-field"><span>Nombre de disques</span><input data-raid-count type="number" min="2" max="24" step="1" value="4"></label>
<label class="base-answer-field"><span>Capacité par disque (To)</span><input data-raid-size type="number" min="0.1" max="100" step="0.1" value="4"></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-raid-calculate>Calculer</button></div>
<div class="lab-admin-note" data-raid-output aria-live="polite"><strong>Résultat du planificateur</strong><p>Sélectionnez les valeurs, puis calculez.</p></div>
</div>

<div class="lab-no-js-practice">
<h3>Remplacement manuel</h3>
<table><thead><tr><th>Niveau</th><th>Capacité utile</th></tr></thead><tbody>
<tr><td>RAID 0</td><td><code>n × D</code></td></tr>
<tr><td>RAID 1</td><td><code>D</code></td></tr>
<tr><td>RAID 5</td><td><code>(n - 1) × D</code></td></tr>
<tr><td>RAID 6</td><td><code>(n - 2) × D</code></td></tr>
<tr><td>RAID 10</td><td><code>(n ÷ 2) × D</code></td></tr>
</tbody></table>
<details><summary>Vérification des scénarios</summary>
<p><strong>A :</strong> 24 To bruts et utiles; aucune tolérance; la panne compromet l'ensemble.</p>
<p><strong>B :</strong> 40 To bruts, 32 To utiles; une panne tolérée; ensemble dégradé pendant la reconstruction.</p>
<p><strong>C :</strong> 24 To bruts, 12 To utiles; deux pannes sont tolérées si elles touchent des paires différentes, mais pas si elles touchent les deux membres de la même paire.</p>
</details>
</div>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Analysez les trois scénarios RAID.</strong><small>Conservez calculs, conditions, état dégradé, risque et preuve opérationnelle.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Distinguer les mécanismes de protection</h2>
<p>Pour chaque scénario, identifiez le mécanisme principal, l'incident traité et une limite.</p>

| Scénario | Classification à produire |
|---|---|
| Deux dossiers montrent automatiquement le même état; une suppression est reproduite. | |
| Un service permet de récupérer les versions quotidiennes pendant 30 jours. | |
| Chaque vendredi, un disque externe reçoit une copie puis est débranché. | |
| Un NAS crée un point de retour avant une mise à jour. | |
| Deux disques internes contiennent en permanence les mêmes blocs. | |
| Une copie chiffrée hors site est restaurée lors d'un test chaque session. | |

<p>Terminez par une explication de la raison pour laquelle aucun mécanisme unique ne traite tous les incidents.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Classez les six scénarios.</strong><small>Utilisez sauvegarde, synchronisation, versionnement, instantané ou RAID et nommez une limite.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Évaluer une source technique</h2>
<p>Choisissez une fiche officielle de HDD ou de SSD pertinente pour un besoin du projet Atlas. Répondez en au plus deux phrases par partie.</p>

1. **Source et éditeur** : titre exact, organisation ou fabricant, lien direct.
2. **Pertinence** : pourquoi cette source peut appuyer la comparaison.
3. **Spécification** : une valeur exacte avec son contexte et son unité.
4. **Vérification** : comparaison avec une deuxième source, une observation, un calcul ou la théorie.
5. **Nature des énoncés** : un fait, une inférence et une recommandation provisoire, ou la raison pour laquelle aucune recommandation n'est justifiée.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez l'évaluation en cinq parties.</strong><small>La spécification décisive doit être vérifiée par une preuve indépendante.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Prolonger le cahier des charges Atlas et synthétiser</h2>
<p>Le client possède déjà un SSD NVMe de 2 To. Son utilisation prévue :</p>

- système, logiciels et jeux actifs : 1,2 To;
- projets vidéo actifs : 350 Go;
- enregistrements : 450 Go maintenant, puis 150 Go par mois;
- documents et photos importants : 250 Go;
- conservation des enregistrements : 24 mois;
- perte acceptable des documents : au plus une journée;
- récupération d'un fichier supprimé : jusqu'à 30 jours;
- budget initial : 500 $ avant taxes, sans compter le SSD existant.

| Élément pédagogique | Rôle possible | Coût |
|---|---|---:|
| HDD interne Atlas H8, 8 To | enregistrements et archive locale | 220 $ |
| HDD externe Atlas E8, 8 To | sauvegarde locale déconnectable | 200 $ |
| SSD SATA Atlas S4, 4 To | espace actif rapide | 360 $ |
| Service hors site/versionné | 2 To; versions 30 jours | 12 $/mois |

<p>Calculez la capacité des enregistrements après 24 mois. Proposez une stratégie qui respecte le budget initial ou expliquez le compromis ou coût récurrent nécessaire.</p>

<p>Ajoutez au <strong>cahier des charges évolutif</strong> :</p>

1. **Besoin pertinent** : données, croissance, perte acceptable et délai de récupération.
2. **Critères techniques** : capacité, charge, coût, rétention, indépendance et restauration.
3. **Compatibilité** : ports, baies, interface, alimentation, réseau et système d'exploitation à vérifier.
4. **Recommandation provisoire et question ouverte** : ce qui peut être défendu maintenant et la preuve qui pourrait modifier la décision.

<p>Intégrez ensuite une synthèse de **120 à 180 mots** reliant charge de travail, capacité, technologie, RAID et récupération. Terminez par une phrase pour chacun des critères de cycle de vie : <strong>longévité</strong>, <strong>stabilité</strong>, <strong>efficacité</strong> et <strong>maintenabilité</strong>. Lorsque la preuve manque, nommez-la.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Finalisez le cahier des charges et la synthèse.</strong><small>Incluez calcul de croissance, schéma des copies, budget, quatre traces, quatre phrases de cycle de vie et au moins une question ouverte.</small></span></label></div>
</section>

</div>
</div>

<section class="lab-stage lab-optional">
<h2>Prolongement facultatif</h2>
<p>Après le travail exigé, utilisez le planificateur pour comparer deux configurations RAID supplémentaires. Pour chacune, notez capacité utile, tolérance, risque restant et raison pour laquelle une sauvegarde indépendante demeure nécessaire.</p>
</section>

# Laboratoire 15 - Compléter et vérifier un rapport système PowerShell

[Retour à la Séance 15](../seances/seance-15.md)

## But du laboratoire

Vous allez compléter un script guidé qui transforme plusieurs commandes d'observation en un rapport structuré. Vous vérifierez ensuite les versions CSV et JSON au lieu de supposer qu'une exportation sans erreur est correcte.

Les activités exigées sont conçues pour **Windows PowerShell 5.1 dans une session non élevée** sur les postes Windows Server 2022. Vous pouvez disposer d'un compte autorisé à s'élever, mais l'élévation n'est pas nécessaire pour ce laboratoire. Des objets de remplacement sont fournis afin que le travail reste réalisable lorsque certaines commandes ou certains modules sont absents.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- examiner le type et les propriétés d'un objet;
- expliquer un pipeline avec filtre, tri et sélection;
- conserver des résultats dans des variables;
- distinguer une session PowerShell normale d'une session élevée et expliquer pourquoi ce laboratoire n'exige pas l'élévation;
- compléter un objet de rapport à partir d'un modèle;
- décrire correctement une valeur non rapportée;
- exporter en CSV et JSON;
- réimporter les fichiers et comparer leur structure;
- créer, inspecter, exécuter, modifier et réexécuter un fichier `.ps1`;
- vérifier qu'un script d'observation peut être réexécuté de façon prévisible;
- distinguer ce que le script observe de ce qui exige encore une source technique.

!!! info "Repères de planification"
    Les plages ci-dessous sont des **estimations d'effort pédagogique**, et non des délais garantis. L'enseignant peut ajuster l'ordre, l'étendue, le point d'arrêt ou la solution de rechange selon la configuration du poste.

    - **Parcours prioritaire — environ 85 à 105 minutes d'effort indicatif :** préparer l'espace, relever l'environnement, examiner un objet, expliquer le pipeline, recueillir ou remplacer les objets sources et compléter le rapport.
    - **Consolidation exigée — environ 40 à 60 minutes d'effort indicatif :** exporter, réimporter, créer et vérifier le fichier `.ps1`, le réexécuter, évaluer une source et rédiger la synthèse.
    - **Prolongement facultatif — environ 15 à 25 minutes d'effort indicatif :** exécuter le même script dans PowerShell 7 et comparer les résultats.

!!! warning "Aucun contournement"
    Commencez ce laboratoire dans une session PowerShell **non élevée**. Si un fichier `.ps1` est bloqué, conservez le message. Ne modifiez pas la politique d'exécution, n'installez aucun module et ne lancez pas une session élevée simplement pour contourner le blocage. N'utilisez l'élévation que si l'enseignant vous la demande explicitement pour une activité distincte. Sinon, utilisez les blocs interactifs dans l'ordre ou le script signé fourni par l'enseignant.

!!! warning "La progression n'est pas votre compte rendu"
    Les cases sont conservées seulement dans ce navigateur. Conservez les commandes, sorties, erreurs, fichiers, vérifications et raisonnements dans un document que vous contrôlez.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-15-fr-v3" data-gate-template="{done} sur {total} engagements reconnus" data-progress-template="{done} sur {total} tâches terminées" data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?">
<section class="lab-gate" aria-labelledby="lab-15-gate-title">
<h2 id="lab-15-gate-title">Entente de travail</h2>
<p>Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Utilisation assignée</strong><small>J'utiliserai le poste de travail, le réseau et les outils du cours uniquement pour les activités d'apprentissage assignées.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Compte rendu permanent</strong><small>Je conserverai mon travail, mes sources, mes commandes, mes calculs et mon raisonnement dans mon compte rendu permanent.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Incertitude signalée</strong><small>Je signalerai les incertitudes, résultats inattendus, erreurs ou préoccupations de sécurité au lieu de les dissimuler.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Accéder au laboratoire</button><span data-lab-gate-status aria-live="polite">0 sur 3 engagements reconnus</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Le script doit recueillir et exporter des informations sans modifier la configuration du poste. Effectuez le parcours exigé dans une session non élevée; vérifiez les objets avant de les formater ou de les exporter.</p></div>

<noscript>
<div class="lab-no-js-note">
<strong>Mode sans JavaScript</strong>
<p>Toutes les consignes et tous les blocs de code restent visibles. La progression enregistrée, le déverrouillage et la réinitialisation ne seront pas disponibles; suivez les tâches dans votre compte rendu permanent.</p>
</div>
</noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 sur 11 tâches terminées</p><button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button><progress data-lab-progress value="0" max="11">0 sur 11</progress></div>

## Parcours prioritaire

<section class="lab-stage" data-lab-stage markdown="1">
<h2 tabindex="-1">Préparer le compte rendu et le dossier</h2>

Créez les rubriques : **environnement**, **objet**, **pipeline**, **données sources**, **rapport**, **CSV**, **JSON**, **script**, **source** et **synthèse**.

```powershell
$DossierLab = Join-Path $HOME 'C12-Lab15'
New-Item -ItemType Directory -Path $DossierLab -Force
Set-Location $DossierLab
```

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Préparez le dossier et le compte rendu.</strong><small>Travaillez seulement dans votre espace utilisateur.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Relever l'environnement sans le modifier</h2>

Commencez dans une fenêtre PowerShell normale : ne choisissez pas **Exécuter en tant qu'administrateur** pour le parcours exigé.

```powershell
$PSVersionTable
Get-ExecutionPolicy -List
```

Conservez la version, l'édition et les politiques affichées. Notez également dans votre compte rendu que le parcours exigé est effectué sans élévation et expliquez en une phrase pourquoi l'accès administrateur disponible sur le poste ne rend pas cette élévation nécessaire.

N'essayez pas de changer une politique pour faire disparaître un résultat inattendu.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Relevez l'environnement PowerShell.</strong><small>Une différence entre deux postes peut être une observation valide; davantage de privilèges ne constitue pas une meilleure observation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Examiner un objet sans appeler ses méthodes</h2>

```powershell
Get-Process | Get-Member
```

Relevez :

- le type complet;
- trois propriétés;
- le nom d'une méthode.

**N'exécutez pas la méthode.** Expliquez pourquoi la table affichée par défaut ne représente pas toutes les propriétés de l'objet.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Examinez l'objet processus.</strong><small>Reconnaissez une méthode sans l'appeler.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Construire et expliquer un pipeline</h2>

Prédisez le rôle de chaque ligne, puis exécutez les étapes séparément et ensemble.

```powershell
Get-Process |
    Where-Object WorkingSet64 -gt 100MB |
    Sort-Object WorkingSet64 -Descending |
    Select-Object -First 10 Name, Id, WorkingSet64
```

Répondez :

1. quelle propriété est testée?
2. quelle étape change l'ordre?
3. quelle étape limite le nombre et les propriétés?
4. quelle unité contient `WorkingSet64`?

Comparez ensuite :

```powershell
Get-Process | Select-Object -First 5 Name, Id
Get-Process | Select-Object -First 5 Name, Id | Format-Table
```

Expliquez pourquoi `Format-Table` doit rester à la fin d'une chaîne destinée à l'affichage.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Construisez et expliquez le pipeline.</strong><small>Conservez une explication, pas seulement une capture d'écran.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Recueillir les objets sources ou utiliser les remplacements</h2>

Exécutez :

```powershell
$Ordinateur = Get-CimInstance Win32_ComputerSystem
$Systeme = Get-CimInstance Win32_OperatingSystem
$Processeur = Get-CimInstance Win32_Processor | Select-Object -First 1
```

Pour le réseau et le disque, utilisez le bloc complet :

```powershell
$NomAdaptateur = 'Non rapporté'
if (Get-Command Get-NetAdapter -ErrorAction SilentlyContinue) {
    $Adaptateur = Get-NetAdapter -Physical |
        Where-Object Status -eq 'Up' |
        Select-Object -First 1
    if ($null -ne $Adaptateur) {
        $NomAdaptateur = $Adaptateur.Name
    }
}

$NomDisque = 'Non rapporté'
if (Get-Command Get-PhysicalDisk -ErrorAction SilentlyContinue) {
    $Disque = Get-PhysicalDisk | Select-Object -First 1
    if ($null -ne $Disque) {
        $NomDisque = $Disque.FriendlyName
    }
}
```

Si une des trois commandes CIM du premier bloc échoue, utilisez ces objets de remplacement :

```powershell
$Ordinateur = [pscustomobject]@{
    Manufacturer = 'Fabricant pédagogique'
    Model = ''
    TotalPhysicalMemory = 16GB
}
$Systeme = [pscustomobject]@{
    Caption = 'Windows pédagogique'
    Version = '10.0'
}
$Processeur = [pscustomobject]@{
    Name = 'Processeur pédagogique'
}
```

Conservez toute erreur réelle avant d'utiliser le remplacement. **N'utilisez pas l'élévation comme première réponse à une commande qui échoue** : le message d'erreur fait partie des preuves à interpréter.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Recueillez ou remplacez les objets sources.</strong><small>Le remplacement maintient l'activité; il ne décrit pas le poste réel.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Vérifier les propriétés et traiter une valeur non rapportée</h2>

```powershell
$Ordinateur | Get-Member
$Systeme | Get-Member
$Processeur | Get-Member
```

Utilisez ensuite le modèle :

```powershell
if ([string]::IsNullOrWhiteSpace($Ordinateur.Model)) {
    $Modele = 'Non rapporté'
}
else {
    $Modele = $Ordinateur.Model
}
```

Expliquez pourquoi `Non rapporté` n'est pas synonyme de `Absent`.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Vérifiez les propriétés et traitez la valeur.</strong><small>N'inventez pas un nom de propriété ou une conclusion.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Compléter l'objet de rapport</h2>

Copiez le modèle et remplacez les trois marqueurs `A_COMPLETER`.

```powershell
$Rapport = [pscustomobject]@{
    NomPoste = $env:COMPUTERNAME
    Fabricant = $Ordinateur.Manufacturer
    Modele = $Modele
    Systeme = A_COMPLETER
    Version = $Systeme.Version
    Processeur = A_COMPLETER
    MemoireGiB = [math]::Round(A_COMPLETER / 1GB, 1)
    AdaptateurActif = $NomAdaptateur
    DisquePrincipal = $NomDisque
}

$Rapport
```

Les trois expressions attendues existent dans les objets déjà vérifiés.

??? success "Vérification des trois expressions"
    - `$Systeme.Caption`
    - `$Processeur.Name`
    - `$Ordinateur.TotalPhysicalMemory`

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complétez et affichez l'objet de rapport.</strong><small>Vérifiez les noms, valeurs et unités avant l'exportation.</small></span></label></div>
</section>

## Consolidation exigée

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Exporter et réimporter le CSV</h2>

```powershell
$CheminCsv = Join-Path $DossierLab 'rapport-systeme.csv'
$Rapport | Export-Csv -Path $CheminCsv -NoTypeInformation -Encoding UTF8

$CsvRelu = Import-Csv $CheminCsv
$CsvRelu
$CsvRelu | Get-Member
```

Vérifiez :

- les noms de propriétés;
- les valeurs;
- les caractères accentués;
- le type de `MemoireGiB` avant et après `Import-Csv`.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Exportez et vérifiez le CSV.</strong><small>Une commande sans erreur ne prouve pas que les données ont conservé leur type.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Exporter et réimporter le JSON</h2>

```powershell
$CheminJson = Join-Path $DossierLab 'rapport-systeme.json'
$Rapport | ConvertTo-Json | Set-Content -Path $CheminJson -Encoding UTF8

$JsonRelu = Get-Content -Raw $CheminJson | ConvertFrom-Json
$JsonRelu
$JsonRelu | Get-Member
```

Comparez les propriétés et le type de `MemoireGiB` avec l'objet original et le CSV réimporté.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Exportez et vérifiez le JSON.</strong><small>Réimportez la structure; ne vérifiez pas seulement que le fichier contient du texte.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Créer, exécuter et réexécuter le script</h2>

Vous avez déjà testé les blocs de façon interactive. Transformez maintenant cette procédure en un véritable fichier de script.

### 1. Créer le fichier

Dans l'éditeur texte disponible sur le poste, créez `rapport-systeme.ps1` dans `$DossierLab`. Placez les blocs testés dans cet ordre :

1. commentaire de but;
2. préparation du dossier;
3. collecte des objets;
4. valeurs de rechange;
5. traitement du modèle;
6. objet de rapport;
7. exports;
8. réimportations de vérification.

Ajoutez au moins trois commentaires qui expliquent l'intention d'une étape.

### 2. Vérifier le fichier avant de l'exécuter

Enregistrez-le comme texte avec l'extension `.ps1`, puis vérifiez son nom et son contenu :

```powershell
Get-Item .\rapport-systeme.ps1 |
    Select-Object Name, Extension, Length

Get-Content .\rapport-systeme.ps1
```

Si le fichier s'appelle en réalité `rapport-systeme.ps1.txt`, corrigez le nom dans l'éditeur ou l'Explorateur avant de continuer.

### 3. Exécuter explicitement le script

Dans `$DossierLab`, essayez :

```powershell
.\rapport-systeme.ps1
```

Le préfixe `.` suivi de `\` indique ici un fichier situé dans le dossier courant.

- Si l'exécution réussit, conservez la sortie.
- Si elle est bloquée, conservez **le message exact**, ne changez aucune politique et n'élevez pas PowerShell pour contourner le blocage. Utilisez ensuite les blocs interactifs dans le même ordre ou le script signé fourni par l'enseignant.

### 4. Modifier puis vérifier de nouveau

Rouvrez le fichier et effectuez **une modification inoffensive**, par exemple améliorer un commentaire de but. Enregistrez, puis utilisez `Get-Content` pour confirmer que votre modification est bien dans le fichier.

Si l'exécution `.ps1` est autorisée, exécutez le fichier une nouvelle fois. Sinon, rejouez une deuxième fois les blocs interactifs correspondants.

### 5. Vérifier la réexécution

Après la première puis la deuxième exécution, observez les fichiers produits :

```powershell
Get-ChildItem .\rapport-systeme.csv, .\rapport-systeme.json |
    Select-Object Name, Length, LastWriteTime
```

Répondez dans votre compte rendu :

1. la deuxième exécution a-t-elle créé des noms de fichiers supplémentaires ou actualisé les mêmes sorties?
2. quelles observations montrent que la procédure peut être réexécutée de façon prévisible dans ce scénario?
3. pourquoi cette propriété serait-elle encore plus importante pour un script qui **modifie** des comptes, des services ou une configuration?

!!! note "Répétable ne signifie pas sans risque"
    Ce script est principalement un script d'observation et d'exportation. Un futur script d'administration doit aussi tenir compte de ce qui se passe lorsqu'il est exécuté plusieurs fois. Le terme **idempotence** désigne, dans certains contextes d'administration, une conception où répéter une opération converge vers le même état voulu plutôt que d'accumuler des changements indésirables.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Créez, inspectez, exécutez et réexécutez le script.</strong><small>Conservez le fichier, le résultat des vérifications et le message exact si l'exécution est bloquée.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Évaluer une source et rédiger la synthèse</h2>

Évaluez la documentation officielle d'une applet de commande utilisée. Répondez en au plus deux phrases par partie :

1. **Source et éditeur**;
2. **Pertinence**;
3. **Spécification**;
4. **Vérification**;
5. **Nature des énoncés**;
6. **Verbe et effet** : identifiez le verbe PowerShell de l'applet (`Get`, `Set`, `New`, etc.), indiquez s'il suggère une observation ou une modification, puis confirmez l'effet réel avec la documentation plutôt qu'avec le nom seul.

Rédigez ensuite 150 à 220 mots expliquant :

- ce que l'automatisation rend plus cohérent;
- ce que la deuxième exécution vous apprend sur la répétabilité du script;
- quelles valeurs restent non vérifiées;
- quelle erreur ou limite a été utile;
- pourquoi le script ne remplace pas les sources du fabricant;
- pourquoi l'élévation n'était pas nécessaire pour le parcours exigé;
- une amélioration prudente pour une prochaine version.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Évaluez la source et rédigez la synthèse.</strong><small>Distinguez observation, automatisation, autorisation, vérification et recommandation.</small></span></label></div>
</section>

</div>
</div>

<div data-lab-supplement="c12-lab-15-fr-v3" hidden>
## Prolongement facultatif — PowerShell 7 à la maison

Lorsque `pwsh.exe` est disponible :

1. comparez `$PSVersionTable` dans `powershell.exe` et `pwsh.exe`;
2. exécutez le même script sans ajouter de syntaxe PowerShell 7;
3. comparez les modules, propriétés, types réimportés et encodages;
4. notez une différence sans conclure qu'une version est universellement meilleure.

Cette activité est facultative et ne modifie pas la progression exigée.
</div>
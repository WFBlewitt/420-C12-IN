# Laboratoire 1 - Découvrir le poste de travail

[Retour à la Séance 1](../seances/seance-1.md)

## But du laboratoire

Ce laboratoire vous guide dans une première observation méthodique du poste de travail utilisé en classe. Vous examinerez ce qui est visible, recueillerez des informations à l'aide des outils de Windows, puis utiliserez PowerShell pour demander certaines des mêmes informations directement au système.

Le travail est individuel. Vous pouvez discuter d'un problème avec une autre personne, mais vous devez effectuer vos propres observations, exécuter vos propres commandes et rédiger vos propres notes.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- distinguer le poste informatique de ses périphériques visibles;
- relever des informations sans déplacer ou débrancher le matériel;
- utiliser plusieurs outils graphiques de Windows pour décrire le poste;
- ouvrir PowerShell sans privilèges d'administrateur et exécuter des commandes en lecture seule;
- comparer des informations obtenues par observation, par interface graphique et par ligne de commande;
- relier vos observations à la définition de travail d'un ordinateur établie pendant la Séance 1;
- organiser un compte rendu permanent qui conserve les preuves, la démarche et les incertitudes;
- évaluer brièvement une source technique portant sur le poste observé.

!!! warning "La liste de vérification n'est pas votre compte rendu"
    La page mémorise localement les cases cochées sur ce navigateur, mais elle ne conserve pas vos réponses comme un document de travail fiable. Inscrivez chaque observation demandée dans un cahier ou dans un document numérique que vous contrôlez et que vous pourrez retrouver après la séance.

## Modèle de compte rendu permanent

Réutilisez cette structure dans les laboratoires suivants. Adaptez-la à la tâche : une observation simple n'exige pas nécessairement toutes les rubriques, mais votre compte rendu doit permettre de retrouver les preuves, de comprendre votre démarche et de distinguer ce qui est établi de ce qui reste incertain.

Les comptes rendus permanents ne sont pas remis ni corrigés individuellement de façon systématique, sauf lorsqu'une activité indique explicitement le contraire. Ils demeurent néanmoins votre référence pour les projets, les évaluations, la révision et le dépannage.

```text
Laboratoire, tâche et date :
Question ou information de départ :
Preuves brutes : observations, commandes, sorties ou mesures
Sources : titre, éditeur et lien direct, lorsque nécessaire
Démarche : étapes, commandes, conversions, calculs ou critères
Résultat : valeur, unité, largeur, type ou contexte nécessaire
Vérification : deuxième méthode, deuxième source, outil ou théorie
Interprétation : ce que le résultat permet d'établir
Incertitudes : information absente, hypothèse ou question restante
Fait :
Inférence :
Recommandation :
Conclusion brève :
```

??? example "Exemple rempli — données fictives"
    **Laboratoire, tâche et date :** Laboratoire 1, vérifier la capacité mémoire, 10 septembre.

    **Question de départ :** Quelle capacité de mémoire Windows rapporte-t-il?

    **Preuves brutes :** Le Gestionnaire des tâches affiche `16,0 Go`. PowerShell retourne `17179869184` octets.

    **Sources :** Aucune source externe n'est nécessaire pour cette observation; les deux preuves proviennent du poste fictif.

    **Démarche :** `17179869184 ÷ 2^30 = 16`.

    **Résultat :** Les deux outils rapportent une capacité correspondant à `16 Gio`, malgré une notation d'unité différente dans l'interface.

    **Vérification :** Le résultat calculé à partir de PowerShell concorde avec la valeur arrondie du Gestionnaire des tâches.

    **Interprétation :** Les données établissent la capacité totale rapportée, mais pas la génération DDR ni le débit de la mémoire.

    **Incertitude :** Le type de module et son numéro de pièce ne sont pas rapportés dans ces deux résultats.

    **Fait :** PowerShell retourne `17179869184` octets. **Inférence :** l'affichage `16,0 Go` du Gestionnaire des tâches représente vraisemblablement la même capacité calculée en unités binaires. **Recommandation :** consulter les propriétés des modules avant d'évaluer une mise à niveau.

    **Conclusion :** Deux méthodes concordent sur la capacité, mais des renseignements supplémentaires sont nécessaires pour vérifier la compatibilité.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-1-fr-v4"
  data-gate-template="{done} sur {total} engagements reconnus"
  data-progress-template="{done} sur {total} tâches terminées"
  data-reset-confirm="Effacer la progression de cette liste de vérification sur ce navigateur?"
>
  <section class="lab-gate" aria-labelledby="lab-gate-title">
    <h2 id="lab-gate-title">Entente de travail</h2>
    <p>Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.</p>

    <div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Utilisation assignée</strong><small>J'utiliserai le poste de travail, le réseau et les outils du cours uniquement pour les activités d'apprentissage assignées.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Compte rendu permanent</strong><small>Je conserverai mon travail, mes sources, mes commandes, mes calculs et mon raisonnement dans mon compte rendu permanent.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Incertitude signalée</strong><small>Je signalerai les incertitudes, résultats inattendus, erreurs ou préoccupations de sécurité au lieu de les dissimuler.</small></span></label>
</div>

    <div class="lab-admin-note">
      <strong>Pourquoi faut-il reconnaître ces règles?</strong>
      <p>Les administrateurs accordent souvent un accès seulement après que les conditions d'utilisation ont été présentées et reconnues. Une case cochée ne prouve pas qu'une personne a lu le texte; elle oblige donc les administrateurs à rendre les règles importantes courtes, précises et difficiles à mal comprendre.</p>
    </div>

    <div class="lab-actions">
      <button class="lab-button" type="button" data-lab-unlock disabled>Accéder au laboratoire</button>
      <span data-lab-gate-status aria-live="polite">0 sur 3 engagements reconnus</span>
    </div>
  </section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>N'ouvrez pas le boîtier, ne déplacez ni ne débranchez le matériel, utilisez seulement des privilèges normaux et notez « inaccessible » lorsqu'une observation ne peut pas être faite en sécurité.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>Mode sans JavaScript</strong><p>Cochez chaque engagement pour révéler le laboratoire. Les consignes et les champs restent utilisables, mais la correction automatique, la progression enregistrée et les indices interactifs ne sont pas disponibles.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 sur 22 tâches terminées</p>
<button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button>
<progress data-lab-progress value="0" max="22">0 sur 22</progress>
</div>

<details class="lab-guide">
<summary>Guide : première utilisation de Windows</summary>
<div class="lab-guide-body">
  <ol>
    <li>La barre située au bas de l'écran s'appelle la <strong>barre des tâches</strong>. Elle contient les applications ouvertes et des raccourcis.</li>
    <li>Le bouton portant le logo Windows ouvre le <strong>menu Démarrer</strong>. La touche portant le même logo sur le clavier accomplit la même action.</li>
    <li>Après avoir ouvert le menu Démarrer, commencez simplement à taper le nom d'une application pour la rechercher.</li>
    <li>Ouvrez un résultat avec un clic gauche. Utilisez le bouton <strong>X</strong> dans le coin supérieur de la fenêtre pour la fermer lorsque vous avez terminé.</li>
    <li>Si l'écran présenté ne correspond pas aux instructions, ne choisissez pas une option au hasard : arrêtez-vous et demandez de l'aide.</li>
  </ol>
</div>
</details>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer vos notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Créez votre compte rendu personnel.</strong><small>Dans un cahier ou un document numérique, reprenez le modèle de compte rendu permanent, inscrivez « Laboratoire 1 », la date et un titre permettant d'identifier le poste que vous examinez.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observer l'installation visible</h2>
<p>Restez à votre place de travail et n'essayez pas d'accéder à une zone masquée ou protégée.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Dressez l'inventaire des objets visibles.</strong><small>Dans vos notes, séparez le poste informatique, l'écran, le clavier, la souris et les autres périphériques ou appareils que vous pouvez observer.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Suivez seulement les câbles visibles.</strong><small>Pour chaque câble observable, notez l'appareil auquel il est relié et, si elle est visible, sa destination. N'essayez pas de nommer un connecteur que vous ne reconnaissez pas encore.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Relevez les informations d'identification accessibles.</strong><small>Notez toute marque, tout modèle ou toute étiquette d'inventaire lisible sans déplacer l'équipement. Inscrivez « inaccessible » lorsque l'information ne peut pas être vue en toute sécurité.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Appliquez la définition d'un ordinateur.</strong><small>Choisissez le poste principal et notez un exemple d'entrée, d'information ou d'état conservé, d'instruction suivie et de résultat produit.</small></span>
  </label>
</div>
</section>

<details class="lab-guide">
<summary>Guide : trouver les outils utilisés dans ce laboratoire</summary>
<div class="lab-guide-body">
  <ol>
    <li><strong>À propos :</strong> appuyez sur la touche Windows, recherchez « À propos de votre PC », puis ouvrez le résultat correspondant. Vous pouvez aussi ouvrir Paramètres, choisir Système, puis À propos.</li>
    <li><strong>Informations système :</strong> appuyez sur la touche Windows, recherchez « Informations système », puis ouvrez l'application qui porte ce nom.</li>
    <li><strong>Gestionnaire des tâches :</strong> appuyez simultanément sur <kbd>Ctrl</kbd>, <kbd>Maj</kbd> et <kbd>Échap</kbd>. Si une vue simplifiée apparaît, choisissez « Plus de détails ». Ouvrez ensuite Performance; sous Windows 11, cette section peut être représentée par une icône de graphique.</li>
    <li>N'utilisez jamais une option intitulée « Exécuter en tant qu'administrateur » pour ce laboratoire.</li>
  </ol>
</div>
</details>

<section class="lab-stage" data-lab-stage>
<h2>Interroger Windows avec des outils graphiques</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Ouvrez la page À propos.</strong><small>Ouvrez Paramètres Windows, puis Système et À propos. N'utilisez pas une option qui demande des privilèges d'administrateur.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Relevez les caractéristiques de l'appareil.</strong><small>Dans vos notes, inscrivez le nom de l'appareil, le processeur, la mémoire vive installée et le type du système.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Relevez les caractéristiques de Windows.</strong><small>Notez l'édition, la version et la compilation du système d'exploitation affichées sur la même page.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Ouvrez Informations système.</strong><small>Recherchez « Informations système » dans le menu Démarrer. Notez le fabricant et le modèle du système, puis comparez-les aux étiquettes visibles.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Consultez le Gestionnaire des tâches.</strong><small>Ouvrez l'onglet Performance et notez une information utile que vous n'aviez pas encore recueillie. N'arrêtez aucun processus et ne modifiez aucun réglage.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Première utilisation de PowerShell</h2>
<details class="lab-guide">
  <summary>Guide : saisir votre première commande PowerShell</summary>
  <div class="lab-guide-body">
    <ol>
      <li>Appuyez sur la touche Windows et recherchez « PowerShell ». Ouvrez PowerShell ou Windows Terminal normalement, jamais en tant qu'administrateur.</li>
      <li>Dans Windows Terminal, vérifiez que l'onglet ouvert indique PowerShell. L'invite contient généralement les lettres <code>PS</code> et se termine par le caractère <code>&gt;</code>.</li>
      <li>Cliquez après l'invite et tapez seulement la commande montrée sur la page. Ne recopiez pas la partie de l'invite, par exemple <code>PS C:\Users\Nom&gt;</code>.</li>
      <li>Appuyez sur <kbd>Entrée</kbd> pour exécuter la commande. Attendez le retour de l'invite avant de saisir la suivante.</li>
      <li>Le caractère <code>|</code> s'appelle une <strong>barre verticale</strong> ou un <strong>pipe</strong>. Ce n'est ni la lettre majuscule <code>I</code> ni la lettre minuscule <code>l</code>. Son emplacement varie selon la disposition du clavier; utilisez le clavier visuel de Windows ou demandez de l'aide si vous ne le trouvez pas.</li>
      <li>Un message d'erreur rouge ne signifie pas que le poste est endommagé. Comparez d'abord l'orthographe, les espaces et la ponctuation avec la commande affichée. Si la cause reste inconnue, conservez le message et demandez de l'aide.</li>
    </ol>
  </div>
</details>
<details class="lab-guide">
  <summary>Guide : lire une commande PowerShell de gauche à droite</summary>
  <div class="lab-guide-body">
    <p>PowerShell transmet des <strong>objets</strong>, c'est-à-dire des résultats structurés qui possèdent des propriétés comme <code>Name</code>, <code>Model</code> ou <code>Version</code>.</p>
    <ol>
      <li><code>Get-CimInstance Win32_ComputerSystem</code> demande d'abord au système de produire un objet décrivant l'ordinateur.</li>
      <li>Le symbole <code>|</code> transmet cet objet à la commande située à sa droite. Il se lit ici comme « puis passer le résultat à ».</li>
      <li><code>Select-Object Manufacturer, Model</code> conserve seulement les deux propriétés demandées pour l'affichage.</li>
    </ol>
    <p>Lisez donc la ligne comme une phrase : « obtenir la description de l'ordinateur, puis transmettre le résultat à une commande qui sélectionne le fabricant et le modèle ».</p>
  </div>
</details>
<div class="lab-command-note">
  <strong>Ces commandes sont en lecture seule.</strong>
  <p>Ouvrez PowerShell ou Windows Terminal normalement. Si Windows demande un mot de passe d'administrateur ou affiche une demande d'élévation, annulez et demandez de l'aide. La partie située à gauche du curseur est l'invite; elle indique que PowerShell attend une commande.</p>
  <p>Les commandes de ce laboratoire doivent être saisies au clavier. Leur copie est désactivée afin que vous prêtiez attention aux mots, aux espaces, aux barres verticales et à la ponctuation qui composent une instruction.</p>
</div>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Ouvrez une session PowerShell normale.</strong><small>Dans vos notes, décrivez brièvement ce que vous voyez dans l'invite avant d'entrer une commande.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Demandez la date et l'heure.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="À saisir manuellement">Get-Date</code><small>Exécutez la commande, puis notez avec vos propres mots ce que la commande a demandé et ce que PowerShell a retourné.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Demandez le nom du poste.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="À saisir manuellement">$env:COMPUTERNAME</code><small>Comparez le résultat avec le nom de l'appareil trouvé dans Paramètres Windows.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Explorez l'objet retourné par Get-CimInstance.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="À saisir manuellement">Get-CimInstance Win32_ComputerSystem</code><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="À saisir manuellement">Get-CimInstance Win32_ComputerSystem | Select-Object *</code><small>Exécutez d'abord la commande sans <code>Select-Object</code>, puis la version avec l'astérisque. La première utilise l'affichage par défaut de PowerShell; la seconde révèle toutes les propriétés accessibles de l'objet. Vous n'avez pas à les recopier. Notez seulement trois propriétés que vous ne connaissiez pas.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Sélectionnez seulement les propriétés utiles.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="À saisir manuellement">Get-CimInstance Win32_ComputerSystem | Select-Object Manufacturer, Model</code><small>Comparez ce résultat beaucoup plus ciblé aux deux sorties précédentes. Dans vos notes, expliquez avec vos propres mots le rôle de <code>Select-Object</code>, puis comparez les deux valeurs à Informations système.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Demandez le nom du processeur.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="À saisir manuellement">Get-CimInstance Win32_Processor | Select-Object Name</code><small>Comparez le résultat avec celui de la page À propos.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Demandez les informations du système d'exploitation.</strong><code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="À saisir manuellement">Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, OSArchitecture</code><small>Comparez les trois valeurs avec les informations recueillies dans Windows.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Comparez les méthodes.</strong><small>Dans vos notes, donnez deux exemples d'informations identiques obtenues par interface graphique et par PowerShell. Signalez également toute différence ou valeur que vous ne comprenez pas encore.</small></span>
  </label>
</div>
</section>

<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Évaluer une source technique : le poste observé</h2>
<p><strong>Sujet imposé :</strong> trouvez une page du fabricant ou une page de soutien officielle portant sur le modèle du poste ou sur un composant que vous avez identifié pendant ce laboratoire.</p>
<p>Dans votre compte rendu, répondez aux cinq consignes suivantes. <strong>Chaque réponse doit compter au plus deux phrases.</strong></p>
<ol>
  <li><strong>Source et éditeur :</strong> donnez le titre, l'organisation qui publie la page et le lien direct.</li>
  <li><strong>Pertinence :</strong> expliquez pourquoi cette source convient pour vérifier ce modèle ou ce composant.</li>
  <li><strong>Spécification :</strong> relevez une caractéristique technique précise, avec sa valeur, son unité et son contexte.</li>
  <li><strong>Vérification :</strong> comparez-la à une deuxième source ou à une observation obtenue avec Windows pendant le laboratoire.</li>
  <li><strong>Nature des énoncés :</strong> formulez et étiquetez clairement un fait, une inférence et une recommandation à partir de votre recherche.</li>
</ol>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez les cinq réponses dans votre compte rendu.</strong><small>La case confirme que chaque réponse respecte la limite de deux phrases et que les liens permettent de retrouver les sources.</small></span></label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthèse</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Comparez l'interface graphique et la ligne de commande.</strong><small>Dans vos notes, donnez un avantage de chaque méthode pour recueillir des informations sur un poste.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Révisez votre description du poste.</strong><small>Expliquez en quelques phrases comment le poste observé correspond à notre définition de travail d'un ordinateur et pourquoi l'écran, le clavier ou la souris sont plutôt décrits comme des périphériques.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Formulez une question restante.</strong><small>Notez une information que vous aimeriez pouvoir vérifier, une différence que vous ne savez pas encore expliquer ou une question soulevée par l'observation du poste.</small></span>
  </label>
</div>
</section>

<section class="lab-stage lab-optional">
<h2>Pratique facultative : défis supplémentaires</h2>
<p>Si toutes les tâches principales sont terminées, essayez les défis suivants dans l'ordre de votre choix.</p>
<ul>
  <li>Comparez une caractéristique de votre poste avec celle du poste d'une autre personne. Ne recopiez pas ses résultats : notez plutôt ce qui est identique, ce qui diffère et une raison possible pour cette différence.</li>
  <li>Exécutez la commande suivante. Sans modifier quoi que ce soit, observez les noms et les nombres affichés, puis écrivez ce que vous pensez qu'elle montre. Nous reviendrons sur les processus plus tard dans le cours.<code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="À saisir manuellement">Get-Process | Select-Object -First 10</code></li>
  <li><strong>Défi de résolution :</strong> partez de la commande suivante et faites en sorte que la sortie finale retourne <strong>uniquement</strong> les résolutions horizontale et verticale actuelles du ou des contrôleurs vidéo exposés par Windows.<code class="lab-command lab-command-type-only" data-lab-type-only data-type-label="À saisir manuellement">Get-CimInstance Win32_VideoController</code>Utilisez ce que vous venez d'apprendre sur <code>Select-Object</code>. Selon le matériel, le pilote ou le type de session, Windows peut retourner plusieurs lignes ou laisser certaines valeurs vides; notez ce résultat plutôt que de l'inventer.</li>
</ul>
</section>
</div>
</div>

<div class="lab-copyable-library" data-lab-supplement="c12-lab-1-fr" hidden markdown="1">

??? info "Commandes copiables"
    Saisir les commandes fait partie de ce laboratoire : cela aide à remarquer leur orthographe, leurs espaces, leur ponctuation et leur structure. Utilisez les versions copiables ci-dessous si la saisie constitue un obstacle d'accessibilité ou si l'enseignant vous demande de le faire.

    Même lorsque vous copiez une commande, lisez-la avant d'appuyer sur Entrée et repérez le nom de la commande, la classe interrogée et les propriétés demandées.

    ~~~powershell
    Get-Date
    ~~~

    ~~~powershell
    $env:COMPUTERNAME
    ~~~

    ~~~powershell
    Get-CimInstance Win32_ComputerSystem
    ~~~

    ~~~powershell
    Get-CimInstance Win32_ComputerSystem | Select-Object *
    ~~~

    ~~~powershell
    Get-CimInstance Win32_ComputerSystem | Select-Object Manufacturer, Model
    ~~~

    ~~~powershell
    Get-CimInstance Win32_Processor | Select-Object Name
    ~~~

    ~~~powershell
    Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, OSArchitecture
    ~~~

    ~~~powershell
    Get-Process | Select-Object -First 10
    ~~~

    ~~~powershell
    Get-CimInstance Win32_VideoController
    ~~~

    La solution complète du défi de résolution n'est volontairement pas fournie ici.
</div>

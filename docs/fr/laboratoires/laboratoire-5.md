# Laboratoire 5 - Observer le processeur et analyser l'arithmétique de l'UAL

[Retour à la Séance 5](../seances/seance-5.md)

## But du laboratoire

Ce laboratoire relie deux niveaux d'analyse :

- observer les caractéristiques du processeur installé dans votre poste;
- suivre précisément ce qui arrive aux bits lorsqu'une UAL effectue une addition à largeur fixe.

Vous distinguerez les rôles de l'unité de contrôle, des registres, de l'UAL et de la cache; vous relèverez des informations sur un processeur réel; puis vous calculerez des retenues, des résultats conservés, des bouclages non signés et des débordements signés.

La majorité des champs structurés sont autocorrigés. Le générateur final produit des problèmes différents et demande les étapes de chaque colonne, pas seulement la réponse finale.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- associer les principaux éléments internes du processeur à leur rôle;
- relever des caractéristiques d'un processeur avec PowerShell et le Gestionnaire des tâches, puis distinguer processeur physique, cœur, fil matériel et processeur logique;
- effectuer une addition binaire à largeur fixe en montrant les retenues et séparer la somme complète du résultat conservé;
- déterminer la retenue finale, le bouclage non signé et le débordement signé;
- interpréter une même configuration comme valeur signée et non signée;
- expliquer pourquoi les GHz, les cœurs ou la cache ne suffisent pas seuls à comparer deux processeurs;
- ajouter une orientation de processeur justifiée au cahier des charges évolutif;
- évaluer brièvement une source technique sur un processeur réel.

!!! warning "La progression n'est pas votre compte rendu"
    Les réponses et la progression sont conservées seulement dans ce navigateur. Conservez dans vos propres notes les commandes utilisées, les caractéristiques observées, les additions complètes et vos explications.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-5-fr-v6"
  data-gate-template="{done} sur {total} engagements reconnus"
  data-progress-template="{done} sur {total} tâches terminées"
  data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?"
>
  <section class="lab-gate" aria-labelledby="lab-5-agreement-title">
    <h2 id="lab-5-agreement-title">Entente de travail</h2>
    <p>Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.</p>
    <div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Utilisation assignée</strong><small>J'utiliserai le poste de travail, le réseau et les outils du cours uniquement pour les activités d'apprentissage assignées.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Compte rendu permanent</strong><small>Je conserverai mon travail, mes sources, mes commandes, mes calculs et mon raisonnement dans mon compte rendu permanent.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Incertitude signalée</strong><small>Je signalerai les incertitudes, résultats inattendus, erreurs ou préoccupations de sécurité au lieu de les dissimuler.</small></span></label>
</div>
    <div class="lab-actions">
      <button class="lab-button" type="button" data-lab-unlock disabled>Accéder au laboratoire</button>
      <span data-lab-gate-status aria-live="polite">0 sur 3 engagements reconnus</span>
    </div>
  </section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Utilisez seulement des outils et commandes en lecture seule sans privilèges d'administrateur; vérifiez la largeur fixe avant d'interpréter retenue, débordement ou résultat signé.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>Mode sans JavaScript</strong><p>Cochez chaque engagement pour révéler le laboratoire. Les consignes et les champs restent utilisables, mais la correction automatique, la progression enregistrée et les indices interactifs ne sont pas disponibles. Une série de pratique manuelle remplace le générateur.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 sur 13 tâches terminées</p>
<button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button>
<progress data-lab-progress value="0" max="13">0 sur 13</progress>
</div>

<details class="lab-guide">
<summary>Guide : analyser une addition à largeur fixe</summary>
<div class="lab-guide-body">
  <ol>
    <li>Indiquez la largeur de l'opération.</li>
    <li>Alignez les deux opérandes et travaillez de droite à gauche.</li>
    <li>Pour chaque colonne, notez la retenue entrante, le bit de somme et la retenue sortante.</li>
    <li>Écrivez la somme complète, puis séparez les bits conservés de la retenue finale.</li>
    <li>Interprétez ensuite les mêmes bits comme valeurs non signées et signées.</li>
    <li>Évaluez séparément le bouclage non signé et le débordement signé.</li>
  </ol>
</div>
</details>

<div class="lab-admin-note">
<strong>Parcours recommandé</strong>
<p>Les sections allant de « Préparer vos notes » à « Évaluer une source technique : un processeur réel », ainsi que la synthèse, sont requises. La section « Étendre le cahier des charges : processeur » prolonge le travail commencé à la Séance 1, et la section suivante exerce l'évaluation d'une source. Le générateur de défis UAL permet une pratique illimitée et ne modifie pas la progression principale.</p>
</div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer vos notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Créez votre compte rendu.</strong><small>Inscrivez « Laboratoire 5 », la date et les rubriques « observation du CPU », « trajet de l'instruction », « additions », « indicateurs », « comparaison » et « cahier des charges ».</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Les rôles internes du processeur</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Associez chaque action au rôle principal.</strong><small>Choisissez le composant qui réalise directement l'action dans notre modèle simplifié.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="Les rôles internes sont correctement distingués."
       data-incomplete-message="Choisissez une réponse pour chaque action."
       data-retry-message="Au moins un rôle est à revoir.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Décoder l'instruction et coordonner les transferts</span><select data-answer="UNITÉ DE CONTRÔLE|UNITE DE CONTROLE"><option value="">Choisir</option><option>Unité de contrôle</option><option>Registre</option><option>UAL</option><option>Cache</option></select></label>
      <label class="base-answer-field"><span>Conserver temporairement un opérande</span><select data-answer="REGISTRE"><option value="">Choisir</option><option>Unité de contrôle</option><option>Registre</option><option>UAL</option><option>Cache</option></select></label>
      <label class="base-answer-field"><span>Produire la somme de deux opérandes</span><select data-answer="UAL"><option value="">Choisir</option><option>Unité de contrôle</option><option>Registre</option><option>UAL</option><option>Cache</option></select></label>
      <label class="base-answer-field"><span>Garder une copie d'une donnée probablement réutilisée</span><select data-answer="CACHE"><option value="">Choisir</option><option>Unité de contrôle</option><option>Registre</option><option>UAL</option><option>Cache</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les rôles</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Suivre une instruction</h2>
<p>Utilisez l'instruction conceptuelle <code>ADD R1, R2, R3</code>, qui place <code>R1 + R2</code> dans <code>R3</code>.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Reconstituez le trajet des données.</strong><small>Distinguez registres sources, opérandes, opération et destination.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="Le trajet simplifié de l'instruction est correct."
       data-incomplete-message="Remplissez tous les champs."
       data-retry-message="Une source, une opération ou une destination est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Premier registre source</span><input data-answer="R1"></label>
      <label class="base-answer-field"><span>Deuxième registre source</span><input data-answer="R2"></label>
      <label class="base-answer-field"><span>Unité qui effectue l'opération</span><input data-answer="UAL|ALU"></label>
      <label class="base-answer-field"><span>Registre destination</span><input data-answer="R3"></label>
      <label class="base-answer-field"><span>Opération demandée</span><select data-answer="ADDITION"><option value="">Choisir</option><option>Addition</option><option>Lecture mémoire</option><option>Décalage</option><option>Écriture disque</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier le trajet</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observer le processeur du poste</h2>
<p>Ouvrez PowerShell et exécutez :</p>
<pre><code>Get-CimInstance Win32_Processor |
Select-Object Name, Manufacturer, NumberOfCores,
          NumberOfLogicalProcessors, MaxClockSpeed,
          L2CacheSize, L3CacheSize</code></pre>
<p>Ouvrez ensuite le <strong>Gestionnaire des tâches → Performance → Processeur</strong>.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Conservez votre relevé.</strong><small>Notez le modèle, le fabricant, le nombre de cœurs, le nombre de processeurs logiques, la vitesse maximale rapportée et les tailles de cache disponibles. Signalez toute valeur absente plutôt que de l'inventer.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Interprétez les termes observés.</strong><small>Les valeurs exactes varient selon le poste; les relations générales restent vérifiables.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="Les relations entre processeur, cœurs et processeurs logiques sont correctes."
       data-incomplete-message="Choisissez une réponse pour chaque affirmation."
       data-retry-message="Au moins une relation est à revoir.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Un boîtier physique peut contenir plusieurs cœurs.</span><select data-answer="VRAI"><option value="">Choisir</option><option>Vrai</option><option>Faux</option></select></label>
      <label class="base-answer-field"><span>Le nombre de processeurs logiques est toujours égal au nombre de cœurs.</span><select data-answer="FAUX"><option value="">Choisir</option><option>Vrai</option><option>Faux</option></select></label>
      <label class="base-answer-field"><span>Deux fils matériels sur un cœur garantissent deux fois la performance.</span><select data-answer="FAUX"><option value="">Choisir</option><option>Vrai</option><option>Faux</option></select></label>
      <label class="base-answer-field"><span>La cache rapproche des données et instructions du cœur.</span><select data-answer="VRAI"><option value="">Choisir</option><option>Vrai</option><option>Faux</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les relations</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Construire les retenues</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Additionnez <code>1011 + 0110</code> sur quatre bits.</strong><small>Entrez la retenue entrante, le bit de somme et la retenue sortante pour chaque colonne, de droite à gauche.</small></span>
  </label>
  <div class="alu-column-exercise" data-alu-fixed
       data-a="1011" data-b="0110"
       data-correct-message="Chaque colonne et le résultat final sont corrects."
       data-retry-message="Certaines colonnes sont à revoir. Reprenez l'addition de droite à gauche."
       data-incomplete-message="Remplissez chaque retenue et chaque bit avant de vérifier.">
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Résultat conservé et bouclage non signé</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Analysez <code>11111010 + 00001010</code> sur huit bits.</strong><small>Séparez la somme complète du résultat qui tient dans la destination.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="La somme, la retenue et le bouclage sont correctement analysés."
       data-incomplete-message="Remplissez tous les champs."
       data-retry-message="La somme complète, le résultat conservé ou l'interprétation non signée est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Somme complète en binaire</span><input data-answer="100000100"></label>
      <label class="base-answer-field"><span>Résultat conservé sur 8 bits</span><input maxlength="8" data-answer="00000100"></label>
      <label class="base-answer-field"><span>Retenue finale</span><select data-answer="1"><option value="">Choisir</option><option>0</option><option>1</option></select></label>
      <label class="base-answer-field"><span>Résultat non signé conservé</span><input inputmode="numeric" data-answer="4"></label>
      <label class="base-answer-field"><span>Bouclage non signé?</span><select data-answer="OUI"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier le bouclage</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Reconnaître le débordement signé</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Analysez les signes avant et après l'addition.</strong><small>Ne déduisez pas le débordement à partir de la retenue finale.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="Les deux débordements signés sont correctement reconnus."
       data-incomplete-message="Remplissez tous les champs."
       data-retry-message="Une interprétation signée ou une décision de débordement est à revoir.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span><code>01111111 + 00000001</code> : résultat conservé</span><input data-answer="10000000"></label>
      <label class="base-answer-field"><span>Même résultat comme signé</span><input inputmode="numeric" data-answer="-128"></label>
      <label class="base-answer-field"><span>Retenue finale?</span><select data-answer="NON"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
      <label class="base-answer-field"><span>Débordement signé?</span><select data-answer="OUI"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
      <label class="base-answer-field"><span><code>10000000 + 11111111</code> : résultat conservé</span><input data-answer="01111111"></label>
      <label class="base-answer-field"><span>Même résultat comme signé</span><input inputmode="numeric" data-answer="127"></label>
      <label class="base-answer-field"><span>Retenue finale?</span><select data-answer="OUI"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
      <label class="base-answer-field"><span>Débordement signé?</span><select data-answer="OUI"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les débordements</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Distinguer retenue et débordement</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Classez quatre additions sur huit bits.</strong><small>Chaque ligne peut ne produire aucune condition, en produire une seule ou produire les deux.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="Les quatre additions sont correctement classées."
       data-incomplete-message="Choisissez les deux indicateurs pour chaque addition."
       data-retry-message="Au moins une combinaison retenue/débordement est à revoir.">
    <div class="alu-classification-grid">
      <div class="alu-classification-row"><code>11111111 + 00000001</code><label>Retenue<select data-answer="OUI"><option value="">—</option><option>Oui</option><option>Non</option></select></label><label>Débordement<select data-answer="NON"><option value="">—</option><option>Oui</option><option>Non</option></select></label></div>
      <div class="alu-classification-row"><code>01111111 + 00000001</code><label>Retenue<select data-answer="NON"><option value="">—</option><option>Oui</option><option>Non</option></select></label><label>Débordement<select data-answer="OUI"><option value="">—</option><option>Oui</option><option>Non</option></select></label></div>
      <div class="alu-classification-row"><code>10000000 + 11111111</code><label>Retenue<select data-answer="OUI"><option value="">—</option><option>Oui</option><option>Non</option></select></label><label>Débordement<select data-answer="OUI"><option value="">—</option><option>Oui</option><option>Non</option></select></label></div>
      <div class="alu-classification-row"><code>11111110 + 00000001</code><label>Retenue<select data-answer="NON"><option value="">—</option><option>Oui</option><option>Non</option></select></label><label>Débordement<select data-answer="NON"><option value="">—</option><option>Oui</option><option>Non</option></select></label></div>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier la classification</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Lire des caractéristiques de processeur</h2>
<p>Deux processeurs fictifs sont proposés pour éviter qu'un prix ou un modèle réel devienne rapidement périmé.</p>
<table>
  <thead><tr><th>Caractéristique</th><th>Processeur A</th><th>Processeur B</th></tr></thead>
  <tbody>
    <tr><td>Cœurs / fils</td><td>6 / 12</td><td>12 / 16</td></tr>
    <tr><td>Fréquence maximale</td><td>4,9 GHz</td><td>4,5 GHz</td></tr>
    <tr><td>Cache L3</td><td>18 Mo</td><td>30 Mo</td></tr>
    <tr><td>Puissance indiquée</td><td>65 W</td><td>125 W</td></tr>
    <tr><td>Graphique intégré</td><td>Oui</td><td>Non</td></tr>
    <tr><td>Prix fictif</td><td>260 $</td><td>430 $</td></tr>
  </tbody>
</table>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Choisissez l'information pertinente pour chaque besoin.</strong><small>Il ne s'agit pas d'identifier un gagnant universel.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise
       data-correct-message="Les choix correspondent aux contraintes indiquées."
       data-incomplete-message="Choisissez une réponse pour chaque situation."
       data-retry-message="Relisez les besoins et les contraintes de chaque situation.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>PC bureautique sans carte graphique distincte, budget limité</span><select data-answer="A"><option value="">Choisir</option><option value="A">Processeur A</option><option value="B">Processeur B</option></select></label>
      <label class="base-answer-field"><span>Rendu fortement parallèle, carte graphique déjà prévue, refroidissement adapté</span><select data-answer="B"><option value="">Choisir</option><option value="A">Processeur A</option><option value="B">Processeur B</option></select></label>
      <label class="base-answer-field"><span>La fréquence maximale suffit-elle seule pour conclure?</span><select data-answer="NON"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
      <label class="base-answer-field"><span>Faut-il vérifier la compatibilité de la carte mère?</span><select data-answer="OUI"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier l'analyse</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Étendre le cahier des charges : processeur</h2>
<p>Reprenez le scénario du PC de jeu et de diffusion en continu présenté à la Séance 1. Les informations actuelles ne permettent pas encore de choisir un modèle précis. Votre travail consiste à définir une orientation de processeur vérifiable et à montrer ses dépendances.</p>

| Besoin pertinent | Critères techniques | Compatibilité à vérifier | Recommandation provisoire et question ouverte |
|---|---|---|---|
| Reliez le processeur à un usage ou à une contrainte du PC. | Nommez les caractéristiques qui influencent réellement cet usage. | Indiquez au moins deux dépendances avec la plateforme ou d'autres composants. | Formulez une orientation sans inventer les renseignements manquants, puis terminez par une question à résoudre. |

<h3>Réflexion sur le cycle de vie — une phrase maximum par critère</h3>

| Longévité | Stabilité | Efficacité | Maintenabilité |
|---|---|---|---|
| Le processeur et sa plateforme devraient-ils rester adéquats et soutenus pendant la durée prévue? | Quels facteurs de compatibilité, de refroidissement ou de soutien influencent un fonctionnement prévisible? | Le rendement visé justifie-t-il la consommation, la chaleur, le refroidissement et le coût? | Le processeur et sa plateforme peuvent-ils être diagnostiqués, refroidis, remplacés ou mis à niveau raisonnablement? |

<p>Dans votre compte rendu, répondez en une phrase par critère. Lorsqu'une réponse n'est pas encore défendable, indiquez la preuve qu'il faudrait obtenir.</p>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Ajoutez l'entrée « processeur » au cahier des charges.</strong><small>Considérez notamment le parallélisme de la charge, les cœurs et fils, le jeu d'instructions et le soutien logiciel, la plateforme mémoire, les voies d'extension, la puissance, le refroidissement et l'évolution. Ajoutez la réflexion sur la longévité, la stabilité, l'efficacité et la maintenabilité; distinguez les critères justifiés de ceux qui demeurent à vérifier.</small></span>
  </label>
</div>
</section>

<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Évaluer une source technique : un processeur réel</h2>
<p><strong>Sujet imposé :</strong> trouvez la fiche officielle d'un processeur réel qui pourrait être étudié pour le PC de jeu et de diffusion en continu du cahier des charges.</p>
<p>Dans votre compte rendu, répondez aux cinq consignes suivantes. <strong>Chaque réponse doit compter au plus deux phrases.</strong></p>
<ol>
  <li><strong>Source et éditeur :</strong> donnez le modèle exact, le fabricant qui publie la fiche et le lien direct.</li>
  <li><strong>Pertinence :</strong> expliquez pourquoi cette fiche convient pour établir les caractéristiques de ce processeur.</li>
  <li><strong>Spécification :</strong> relevez une caractéristique pertinente, par exemple les cœurs et fils, la cache, la puissance indiquée ou une capacité de la plateforme.</li>
  <li><strong>Vérification :</strong> comparez-la à une deuxième source, à une observation du poste ou à la théorie de la séance.</li>
  <li><strong>Nature des énoncés :</strong> formulez et étiquetez clairement un fait, une inférence sur l'usage et une recommandation provisoire.</li>
</ol>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez les cinq réponses dans votre compte rendu.</strong><small>La case confirme que chaque réponse respecte la limite de deux phrases et que les liens permettent de retrouver les sources.</small></span></label>
</div>
</section>

<section class="lab-stage">
<h2>Générateur de défis UAL</h2>
<p>Le générateur propose des additions de 4 ou 8 bits. Pour chaque colonne, entrez la retenue entrante, le bit de somme et la retenue sortante. Vous devrez ensuite fournir la somme complète, le résultat conservé, les interprétations signée et non signée, puis les indicateurs.</p>
<p>Les champs incorrects sont signalés sans afficher la solution. Cette pratique ne modifie pas la progression des tâches principales.</p>

<div class="practice-generator alu-practice" data-alu-practice data-lang="fr">
  <div class="practice-controls">
    <label class="base-answer-field">
      <span>Largeur</span>
      <select data-alu-width>
        <option value="4">4 bits</option>
        <option value="8" selected>8 bits</option>
      </select>
    </label>
    <label class="base-answer-field">
      <span>Difficulté</span>
      <select data-alu-level>
        <option value="guided">Guidée</option>
        <option value="mixed" selected>Mélangée</option>
        <option value="edge">Valeurs limites</option>
      </select>
    </label>
    <button class="lab-button" type="button" data-alu-new>Nouveau problème</button>
  </div>

  <div class="practice-question" data-alu-question aria-live="polite"></div>
  <div data-alu-work></div>
  <div class="practice-actions">
    <button class="lab-button" type="button" data-alu-check>Vérifier la démarche</button>
    <button class="lab-button secondary" type="button" data-alu-hint>Afficher un indice</button>
  </div>
  <p class="base-feedback" data-alu-feedback aria-live="polite"></p>
  <p class="practice-stats" data-alu-stats>Problèmes réussis : 0</p>
</div>
<noscript>
  <div class="lab-no-js-practice">
    <h3>Pratique manuelle de remplacement</h3>
    <p>Pour chaque addition, montrez les retenues de chaque colonne, la somme complète, le résultat conservé et les deux indicateurs.</p>
    <ol>
      <li><code>1011 + 0110</code> sur quatre bits.</li>
      <li><code>01111101 + 00000110</code> sur huit bits.</li>
      <li><code>11110000 + 00110000</code> sur huit bits.</li>
    </ol>
    <details><summary>Vérifier les résultats après avoir terminé</summary><ol><li>Somme complète <code>10001</code>; résultat <code>0001</code>; retenue finale oui; débordement signé non.</li><li>Somme complète <code>10000011</code>; résultat <code>10000011</code>; retenue finale non; débordement signé oui.</li><li>Somme complète <code>100100000</code>; résultat <code>00100000</code>; retenue finale oui; débordement signé non.</li></ol></details>
  </div>
</noscript>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthèse</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Rédigez une synthèse de quatre à six phrases.</strong><small>Expliquez le trajet d'une addition dans le processeur, puis distinguez résultat conservé, retenue finale, bouclage non signé et débordement signé.</small></span>
  </label>
</div>
</section>
</div>
</div>

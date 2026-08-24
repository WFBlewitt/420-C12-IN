# Laboratoire 6 - Observer, calculer et évaluer la mémoire vive

[Retour à la Séance 6](../seances/seance-6.md)

## But du laboratoire

Ce laboratoire vous demande d'observer ce que Windows peut révéler sur la mémoire du poste, puis d'interpréter des caractéristiques de RAM à l'aide de calculs et de scénarios de compatibilité.

Vous utiliserez PowerShell en lecture seule, comme dans le Laboratoire 1. Les résultats obtenus sur votre poste peuvent être incomplets : **« non rapporté » est une observation valide**. Les activités autocorrigées utilisent ensuite des données communes afin que tout le groupe puisse effectuer les mêmes analyses.

Les quinze dernières minutes sont réservées à une entrevue avec une ou un camarade. Cette entrevue produira les exigences client qui serviront à la tâche évaluée **« configurer un PC pour une ou un camarade »**.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- interroger Windows sur la mémoire installée sans privilèges d'administrateur;
- distinguer capacité, débit annoncé, débit configuré, bande passante et latence, puis effectuer un calcul de bande passante et une comparaison simple de latence CAS;
- vérifier la compatibilité d'une mémoire avec un processeur et une carte mère;
- distinguer ECC, UDIMM, RDIMM, DIMM, SO-DIMM, CAMM2 et LPCAMM2;
- déterminer les documents et les preuves nécessaires pour évaluer une solution de mémoire vive, puis ajouter une orientation justifiée au cahier des charges évolutif;
- recueillir et confirmer les besoins d'un client avant de proposer des composants;
- conserver un relevé vérifiable de vos commandes, calculs, sources à consulter et décisions;
- évaluer brièvement une source technique sur un module de mémoire réel.

!!! warning "La progression n'est pas votre compte rendu"
    Les cases et réponses sont conservées seulement dans ce navigateur. Conservez vos commandes, sorties, calculs et notes d'entrevue dans un document que vous contrôlez.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-6-fr-v7"
  data-gate-template="{done} sur {total} engagements reconnus"
  data-progress-template="{done} sur {total} tâches terminées"
  data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?"
>
  <section class="lab-gate" aria-labelledby="lab-6-gate-title">
    <h2 id="lab-6-gate-title">Entente de travail</h2>
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
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>N'ouvrez pas le poste et ne modifiez ni profil mémoire, ni micrologiciel, ni réglage de performance; une valeur absente ou inaccessible doit être conservée comme telle.</p></div>

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
<summary>Guide : lire une commande PowerShell de gauche à droite</summary>
<div class="lab-guide-body">
  <ol>
    <li><code>Get-CimInstance Win32_PhysicalMemory</code> demande à Windows les objets qui décrivent les dispositifs de mémoire physique.</li>
    <li>Le symbole <code>|</code> transmet ces objets à la commande suivante.</li>
    <li><code>Select-Object</code> conserve seulement les propriétés demandées.</li>
    <li>Une propriété vide ne prouve pas que le composant n'existe pas; elle signifie seulement que cette source ne l'a pas rapportée.</li>
  </ol>
</div>
</details>

<div class="lab-command-note">
<strong>Ces commandes sont en lecture seule.</strong>
<p>Ouvrez PowerShell ou Windows Terminal normalement. Si une demande d'élévation apparaît, annulez-la. Lisez la commande avant de l'exécuter et conservez tout message d'erreur utile.</p>
</div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer vos notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Créez votre compte rendu.</strong><small>Inscrivez « Laboratoire 6 », la date et les rubriques « observation », « débits », « latence », « compatibilité », « formats et sources », « cahier des charges » et « entrevue client ».</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Interroger la mémoire du poste</h2>

<details class="lab-guide">
  <summary>Guide : ouvrir PowerShell</summary>
  <div class="lab-guide-body">
    <ol>
      <li>Appuyez sur la touche Windows et recherchez <strong>PowerShell</strong> ou <strong>Terminal</strong>.</li>
      <li>Ouvrez l'application normalement, jamais avec « Exécuter en tant qu'administrateur ».</li>
      <li>Dans Terminal, vérifiez que l'onglet actif utilise PowerShell.</li>
      <li>Recopiez seulement la commande, pas l'invite qui commence souvent par <code>PS</code>.</li>
    </ol>
  </div>
</details>

<p>Exécutez d'abord :</p>

```powershell
Get-CimInstance Win32_ComputerSystem |
  Select-Object TotalPhysicalMemory
```

<p>Puis :</p>

```powershell
Get-CimInstance Win32_PhysicalMemory |
  Select-Object Manufacturer, PartNumber, Capacity,
                Speed, ConfiguredClockSpeed,
                FormFactor, DeviceLocator
```

<p>Ouvrez ensuite <strong>Gestionnaire des tâches → Performance → Mémoire</strong>.</p>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Conservez les résultats bruts.</strong><small>Copiez ou retranscrivez la sortie des deux commandes. N'effacez pas les champs vides.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Comparez trois sources.</strong><small>Comparez PowerShell, le Gestionnaire des tâches et la page « À propos ». Notez une valeur commune, une différence d'unité ou d'arrondi, et une propriété non rapportée.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Décrivez seulement ce que les données soutiennent.</strong><small>Indiquez la capacité totale, le nombre d'objets mémoire rapportés, les emplacements nommés et les débits disponibles. N'inférez pas le nombre de canaux à partir du seul nombre de modules.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Interpréter un relevé commun</h2>

<p>Le relevé suivant représente un poste fictif :</p>

```text
TotalPhysicalMemory : 34359738368

Manufacturer         : Micron
PartNumber           : MTC8C1084S1SC48BA1
Capacity             : 17179869184
Speed                : 5600
ConfiguredClockSpeed : 5200
FormFactor           : 12
DeviceLocator        : DIMM_A1

Manufacturer         : Micron
PartNumber           : MTC8C1084S1SC48BA1
Capacity             : 17179869184
Speed                : 5600
ConfiguredClockSpeed : 5200
FormFactor           : 12
DeviceLocator        : DIMM_B1
```

!!! info "Interpréter les codes et les étiquettes"
    La propriété `FormFactor` utilise un code numérique qui doit être interprété à l'aide de la documentation. Dans ce relevé, `12` correspond à un module SO-DIMM. Le nom `DIMM_A1` ou `DIMM_B1` est une étiquette d'emplacement rapportée par le micrologiciel; il ne détermine pas à lui seul le facteur de forme physique.

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Transformez les données brutes en caractéristiques utiles.</strong><small>Utilisez les valeurs rapportées sans supposer que le profil annoncé est actif.</small></span>
  </label>

  <div class="base-exercise" data-base-exercise
       data-correct-message="Le relevé commun est correctement interprété."
       data-incomplete-message="Remplissez tous les champs."
       data-retry-message="Une capacité, un débit ou une conclusion est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Capacité totale en GiB</span><input inputmode="numeric" data-answer="32|32GIB"></label>
      <label class="base-answer-field"><span>Capacité d'un module en GiB</span><input inputmode="numeric" data-answer="16|16GIB"></label>
      <label class="base-answer-field"><span>Nombre d'objets mémoire rapportés</span><input inputmode="numeric" data-answer="2"></label>
      <label class="base-answer-field"><span>Débit annoncé du module</span><input data-answer="5600|5600MT/S|DDR5-5600"></label>
      <label class="base-answer-field"><span>Débit configuré</span><input data-answer="5200|5200MT/S|DDR5-5200"></label>
      <label class="base-answer-field"><span>Le profil 5600 est-il nécessairement actif?</span><select data-answer="NON"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
      <label class="base-answer-field"><span>Peut-on prouver le mode double canal avec ce relevé seul?</span><select data-answer="NON"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier le relevé</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Horloge, débit et bande passante</h2>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Calculez à partir du débit configuré.</strong><small>Pour DDR, utilisez deux transferts par cycle. Pour un canal de 64 bits, utilisez 8 octets par transfert.</small></span>
  </label>

  <div class="base-exercise" data-base-exercise
       data-correct-message="L'horloge et les bandes passantes théoriques sont correctes."
       data-incomplete-message="Remplissez tous les champs."
       data-retry-message="Une division par deux, une largeur en octets ou un nombre de canaux est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Horloge approximative de DDR5-5200</span><input data-answer="2600|2600MHZ|2.6GHZ|2,6GHZ"></label>
      <label class="base-answer-field"><span>Bande passante d'un canal de 64 bits</span><input data-answer="41600|41600MB/S|41.6GB/S|41,6GB/S"></label>
      <label class="base-answer-field"><span>Bande passante de deux canaux indépendants</span><input data-answer="83200|83200MB/S|83.2GB/S|83,2GB/S"></label>
      <label class="base-answer-field"><span>Ces valeurs sont-elles des maxima théoriques?</span><select data-answer="OUI"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les calculs</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Comparer la latence</h2>

<p>Utilisez :</p>

```text
latence CAS en ns ≈ CL × 2 000 ÷ débit DDR en MT/s
```

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Comparez deux profils sans regarder seulement le nombre CL.</strong><small>Arrondissez au dixième de nanoseconde.</small></span>
  </label>

  <div class="base-exercise" data-base-exercise
       data-correct-message="Les deux latences et la conclusion sont correctes."
       data-incomplete-message="Remplissez tous les champs."
       data-retry-message="Recalculez la durée réelle d'un cycle avant de comparer.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>DDR5-5200 CL40</span><input data-answer="15.4|15,4|15.38|15,38"></label>
      <label class="base-answer-field"><span>DDR5-6000 CL36</span><input data-answer="12|12.0|12,0"></label>
      <label class="base-answer-field"><span>Profil à plus faible latence CAS approximative</span><select data-answer="DDR5-6000 CL36"><option value="">Choisir</option><option>DDR5-5200 CL40</option><option>DDR5-6000 CL36</option></select></label>
      <label class="base-answer-field"><span>Une latence CAS plus faible garantit-elle toujours une application plus rapide?</span><select data-answer="NON"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier la comparaison</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Vérifier une compatibilité</h2>

<p>Considérez cette plateforme fictive :</p>

| Élément | Exigence ou limite |
|---|---|
| Processeur | DDR5, deux canaux, jusqu'à DDR5-5600 selon la population |
| Carte mère | Quatre logements UDIMM DDR5; capacité maximale 128 GiB |
| ECC | ECC non pris en charge |
| Mémoire enregistrée | RDIMM non prise en charge |
| Population recommandée pour deux modules | A2 et B2 |

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Évaluez chaque proposition sans confondre capacité et compatibilité.</strong><small>Un débit annoncé supérieur peut nécessiter un profil ou fonctionner à un débit inférieur; une génération ou un type incompatible ne peut pas être corrigé par un réglage.</small></span>
  </label>

  <div class="base-exercise" data-base-exercise
       data-correct-message="Les décisions de compatibilité sont correctes."
       data-incomplete-message="Choisissez une décision pour chaque proposition."
       data-retry-message="Au moins une génération, un type de module, une capacité ou une population est à revoir.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>2 × 16 GiB DDR5-5600 UDIMM, A2/B2</span><select data-answer="COMPATIBLE"><option value="">Choisir</option><option>Compatible</option><option>Incompatible</option></select></label>
      <label class="base-answer-field"><span>2 × 32 GiB DDR4-3200 UDIMM</span><select data-answer="INCOMPATIBLE"><option value="">Choisir</option><option>Compatible</option><option>Incompatible</option></select></label>
      <label class="base-answer-field"><span>4 × 32 GiB DDR5 RDIMM ECC</span><select data-answer="INCOMPATIBLE"><option value="">Choisir</option><option>Compatible</option><option>Incompatible</option></select></label>
      <label class="base-answer-field"><span>2 × 64 GiB DDR5 UDIMM, total 128 GiB</span><select data-answer="À VÉRIFIER|A VERIFIER"><option value="">Choisir</option><option>Compatible</option><option>Incompatible</option><option>À vérifier</option></select></label>
      <label class="base-answer-field"><span>2 × 16 GiB DDR5-6000 UDIMM</span><select data-answer="À VÉRIFIER|A VERIFIER"><option value="">Choisir</option><option>Compatible</option><option>Incompatible</option><option>À vérifier</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les décisions</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Reconnaître les formats et les priorités</h2>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Associez chaque description au terme le plus précis.</strong><small>Il ne s'agit pas encore de recommander un format pour un client particulier.</small></span>
  </label>

  <div class="base-exercise" data-base-exercise
       data-correct-message="Les formats et fonctions sont correctement distingués."
       data-incomplete-message="Choisissez une réponse pour chaque description."
       data-retry-message="Au moins un format ou une fonction est à revoir.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Module de bureau à connecteur de bord</span><select data-answer="DIMM"><option value="">Choisir</option><option>DIMM</option><option>SO-DIMM</option><option>RDIMM</option><option>CAMM2</option><option>LPCAMM2</option></select></label>
      <label class="base-answer-field"><span>Module compact traditionnel pour portable</span><select data-answer="SO-DIMM"><option value="">Choisir</option><option>DIMM</option><option>SO-DIMM</option><option>RDIMM</option><option>CAMM2</option><option>LPCAMM2</option></select></label>
      <label class="base-answer-field"><span>Module enregistré destiné à certaines plateformes serveur</span><select data-answer="RDIMM"><option value="">Choisir</option><option>DIMM</option><option>SO-DIMM</option><option>RDIMM</option><option>CAMM2</option><option>LPCAMM2</option></select></label>
      <label class="base-answer-field"><span>Module à contacts comprimés, fixé à plat</span><select data-answer="CAMM2"><option value="">Choisir</option><option>DIMM</option><option>SO-DIMM</option><option>RDIMM</option><option>CAMM2</option><option>LPCAMM2</option></select></label>
      <label class="base-answer-field"><span>Variante CAMM2 utilisant une mémoire LPDDR remplaçable</span><select data-answer="LPCAMM2"><option value="">Choisir</option><option>DIMM</option><option>SO-DIMM</option><option>RDIMM</option><option>CAMM2</option><option>LPCAMM2</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les formats</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>


<section class="lab-stage" data-lab-stage>
<h2>Préparer la recherche sur la mémoire vive</h2>
<p>Le PC de jeu et de diffusion en continu doit rester un problème à analyser, pas une invitation à choisir la mémoire qui affiche le plus grand nombre. Déterminez quelles preuves permettraient d'évaluer une solution de façon responsable avant de recommander une configuration.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Construisez votre plan de recherche.</strong><small>Dans vos notes, créez une liste de vérification couvrant : soutien du processeur et de la carte mère; capacité; génération DDR et type de module; débit et latence; population des logements; profils pris en charge; contraintes physiques; évolution; coût et garantie. Pour chaque catégorie, nommez le type de documentation technique à consulter. Terminez par une question qui doit recevoir une réponse avant de recommander une configuration de mémoire.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthèse : étendre le cahier des charges - mémoire vive</h2>
<p>Reprenez l'entrée « processeur » du Laboratoire 5 et le plan préparé dans la section « Préparer la recherche sur la mémoire vive ». Ajoutez maintenant la mémoire vive au cahier des charges du PC de jeu et de diffusion en continu. Votre recommandation doit répondre aux besoins connus sans inventer la résolution, la fréquence d'images, la charge de diffusion ou le budget qui restent à confirmer.</p>

| Besoin pertinent | Critères techniques | Compatibilité à vérifier | Recommandation provisoire et question ouverte |
|---|---|---|---|
| Reliez la mémoire au jeu, à la diffusion simultanée, aux applications en arrière-plan ou à l'évolution attendue. | Traitez la capacité, la génération DDR, le débit, la latence, le nombre de modules et l'évolutivité. | Reliez la mémoire au contrôleur du processeur, à la carte mère, aux logements disponibles et au format des modules. | Indiquez ce qui peut déjà être spécifié, ce qui demeure provisoire et la prochaine preuve nécessaire. |

<h3>Réflexion sur le cycle de vie — une phrase maximum par critère</h3>

| Longévité | Stabilité | Efficacité | Maintenabilité |
|---|---|---|---|
| La capacité, la génération et les possibilités d'expansion devraient-elles rester adéquates pendant la durée prévue? | La configuration, la population, les profils et le soutien de la plateforme favorisent-ils un fonctionnement prévisible? | La capacité et le débit utiles justifient-ils la consommation, la chaleur et le coût de la configuration? | Les modules peuvent-ils être diagnostiqués, remplacés et augmentés sans dépendance ou difficulté déraisonnable? |

<p>Dans votre compte rendu, répondez en une phrase par critère. Lorsqu'une réponse n'est pas encore défendable, indiquez la preuve qu'il faudrait obtenir.</p>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Ajoutez l'entrée « mémoire vive » au cahier des charges.</strong><small>Conservez les quatre traces communes et ajoutez la réflexion sur la longévité, la stabilité, l'efficacité et la maintenabilité. Vérifiez aussi si l'orientation de processeur impose une génération, un débit ou un type de module, et signalez toute hypothèse qui dépend encore des réponses du client.</small></span>
  </label>
</div>
</section>

<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Évaluer une source technique : un module de mémoire réel</h2>
<p><strong>Sujet imposé :</strong> trouvez une fiche du fabricant pour un module de mémoire DDR réel qui pourrait être étudié pour le PC de jeu et de diffusion en continu.</p>
<p>Dans votre compte rendu, répondez aux cinq consignes suivantes. <strong>Chaque réponse doit compter au plus deux phrases.</strong></p>
<ol>
  <li><strong>Source et éditeur :</strong> donnez le numéro de pièce exact, le fabricant qui publie la fiche et le lien direct.</li>
  <li><strong>Pertinence :</strong> expliquez pourquoi cette fiche convient pour établir les caractéristiques du module.</li>
  <li><strong>Spécification :</strong> relevez la capacité, la génération DDR, le débit annoncé et le type ou format du module.</li>
  <li><strong>Vérification :</strong> comparez au moins une caractéristique à une deuxième source, à la documentation d'un processeur ou d'une carte mère, ou à la théorie de la séance.</li>
  <li><strong>Nature des énoncés :</strong> formulez et étiquetez clairement un fait, une inférence de compatibilité et une recommandation provisoire pour le PC.</li>
</ol>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez les cinq réponses dans votre compte rendu.</strong><small>La case confirme que chaque réponse respecte la limite de deux phrases et que les liens permettent de retrouver les sources.</small></span></label>
</div>
</section>

<section class="lab-stage client-interview-stage" data-lab-stage>
<h2>Préparation de l'évaluation : entrevue client — 15 minutes</h2>

<div class="admonition warning">
  <p class="admonition-title">Commencez cette activité seulement lorsque l'enseignant l'indique</p>
  <p>Les quinze dernières minutes du laboratoire sont réservées à cette entrevue. Elle fournit les besoins réels qui serviront à votre recommandation évaluée.</p>
</div>

<h3>Former les groupes</h3>

<ul>
  <li>Travaillez en <strong>paires</strong>.</li>
  <li>Si le nombre de personnes est impair, formez un seul <strong>trio</strong>.</li>
  <li>Dans une paire : A interroge B, puis B interroge A.</li>
  <li>Dans un trio : A interroge B, B interroge C, puis C interroge A.</li>
  <li>Chaque personne produira plus tard une recommandation pour la personne qu'elle a interrogée.</li>
</ul>

<h3>Répartition du temps</h3>

<table>
  <thead>
    <tr><th>Étape</th><th>Paires</th><th>Trio</th></tr>
  </thead>
  <tbody>
    <tr><td>Former le groupe et noter les noms</td><td>2 min</td><td>2 min</td></tr>
    <tr><td>Entrevues</td><td>4 min par personne</td><td>environ 2 min 30 par personne</td></tr>
    <tr><td>Reformuler et faire confirmer les besoins</td><td>3 min</td><td>3 min</td></tr>
    <tr><td>Sauvegarder les notes</td><td>2 min</td><td>2 min</td></tr>
  </tbody>
</table>

<h3>Questions obligatoires</h3>

<p>Dans vos notes, inscrivez les réponses de votre client :</p>

<ol>
  <li>Que doit faire le nouvel ordinateur?</li>
  <li>Quels logiciels, jeux, outils de développement ou services seront utilisés?</li>
  <li>Quelle tâche sera la plus exigeante?</li>
  <li>Plusieurs applications exigeantes seront-elles utilisées en même temps?</li>
  <li>Le travail implique-t-il de gros fichiers, des machines virtuelles, de la vidéo, de la 3D, des données ou des outils d'IA locale?</li>
  <li>L'ordinateur doit-il être portable ou peut-il rester sur un bureau?</li>
  <li>Le bruit, la chaleur, la consommation, la taille ou l'apparence sont-ils importants?</li>
  <li>Quels écrans, périphériques et connecteurs doivent être pris en charge?</li>
  <li>Quel matériel ou quelle licence peut être réutilisé?</li>
  <li>Quelles sont les trois priorités principales parmi : performance, portabilité, silence, évolutivité, fiabilité, apparence, efficacité énergétique et durée de vie?</li>
  <li>Si le budget de <strong>2 000 $</strong> ne permet pas tout, que peut-on sacrifier et que faut-il absolument conserver?</li>
  <li>Le budget inclut-il les taxes, l'écran et les périphériques, ou seulement l'ordinateur?</li>
</ol>

<h3>Transformer une réponse vague en exigence utile</h3>

<table>
  <thead>
    <tr><th>Réponse vague</th><th>Question de suivi</th></tr>
  </thead>
  <tbody>
    <tr><td>« Je veux qu'il soit rapide. »</td><td>Quelle tâche vous semble lente aujourd'hui?</td></tr>
    <tr><td>« Il me faut beaucoup de RAM. »</td><td>Quel logiciel ou quel volume de données vous fait penser cela?</td></tr>
    <tr><td>« Je veux jouer. »</td><td>À quels jeux, à quelle résolution et avec quelles attentes de fluidité?</td></tr>
    <tr><td>« Je programme. »</td><td>Avec quels outils, conteneurs ou machines virtuelles?</td></tr>
    <tr><td>« Je veux qu'il dure. »</td><td>Parlez-vous de fiabilité, d'évolution ou de performance suffisante pendant plusieurs années?</td></tr>
  </tbody>
</table>

<div class="admonition info">
  <p class="admonition-title">Pendant l'entrevue</p>
  <p>Ne recommandez pas encore de processeur, de mémoire ou de carte graphique. Votre tâche est de recueillir et confirmer les besoins, pas de défendre une configuration improvisée.</p>
</div>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Confirmez le dossier client.</strong><small>J'ai interrogé la personne qui sera mon client, reformulé ses besoins, obtenu sa confirmation et sauvegardé mes notes pour la tâche évaluée.</small></span>
  </label>
</div>
</section>

<section class="lab-stage lab-optional">
<h2>Autoformation : architecture avancée et réglage de la mémoire</h2>
<p>Les activités suivantes sont facultatives, autocorrigées lorsqu'une vérification est offerte et exclues de la progression principale du laboratoire. Elles ne sont pas requises pour commencer l'entrevue client.</p>
</section>

<section class="lab-stage lab-optional">
<h3>Adressage détaillé de la DRAM</h3>

<div class="lab-tasks">
  <p><strong>Reconstituez l'organisation conceptuelle.</strong> Le mappage exact varie selon la plateforme; utilisez l'ordre étudié dans la séance.</p>

  <div class="base-exercise" data-base-exercise
       data-correct-message="L'organisation conceptuelle de la DRAM est correctement reconstruite."
       data-incomplete-message="Choisissez une réponse pour chaque niveau."
       data-retry-message="Au moins un niveau est placé au mauvais endroit.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Après le contrôleur mémoire</span><select data-answer="CANAL"><option value="">Choisir</option><option>Canal</option><option>Rang</option><option>Banque</option><option>Ligne</option><option>Colonne</option></select></label>
      <label class="base-answer-field"><span>Groupe de puces répondant ensemble</span><select data-answer="RANG"><option value="">Choisir</option><option>Canal</option><option>Rang</option><option>Banque</option><option>Ligne</option><option>Colonne</option></select></label>
      <label class="base-answer-field"><span>Sous-ensemble interne pouvant conserver une ligne active</span><select data-answer="BANQUE"><option value="">Choisir</option><option>Canal</option><option>Rang</option><option>Banque</option><option>Ligne</option><option>Colonne</option></select></label>
      <label class="base-answer-field"><span>Grande portion ouverte avant la sélection fine</span><select data-answer="LIGNE"><option value="">Choisir</option><option>Canal</option><option>Rang</option><option>Banque</option><option>Ligne</option><option>Colonne</option></select></label>
      <label class="base-answer-field"><span>Sélection finale dans la ligne ouverte</span><select data-answer="COLONNE"><option value="">Choisir</option><option>Canal</option><option>Rang</option><option>Banque</option><option>Ligne</option><option>Colonne</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier l'organisation</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>


<section class="lab-stage lab-optional">
<h3>Optimisation d'un profil CPU/RAM simplifié</h3>

<p>Cette activité utilise un modèle pédagogique. Elle ne remplace pas la documentation d'une plateforme ni un test de stabilité réel.</p>

<div class="lab-admin-note">
  <strong>Ordre de décision</strong>
  <p>Éliminez d'abord les profils qui dépassent une limite. Parmi les profils valides, appliquez les priorités du scénario dans l'ordre indiqué. N'additionnez pas des GHz, des GB/s et des nanosecondes dans un score artificiel.</p>
</div>

<h4>Plateforme et charge de travail</h4>

<table>
  <thead>
    <tr><th>Paramètre</th><th>Règle</th></tr>
  </thead>
  <tbody>
    <tr><td>Horloge de base</td><td>100 MHz</td></tr>
    <tr><td>Multiplicateur CPU maximal</td><td>52</td></tr>
    <tr><td>Fréquence CPU maximale</td><td>5 200 MHz</td></tr>
    <tr><td>Ratio contrôleur-mémoire</td><td>1:1 jusqu'à DDR5-6000; au-dessus, 1:2</td></tr>
    <tr><td>Tension DRAM maximale</td><td>1,35 V</td></tr>
    <tr><td>Canaux</td><td>Deux canaux de 64 bits</td></tr>
  </tbody>
</table>

<p>La charge de travail est sensible à la fréquence CPU et à la latence. Après avoir rejeté les profils invalides, appliquez ces priorités :</p>

<ol>
  <li>fréquence CPU la plus élevée;</li>
  <li>ratio 1:1 préféré à 1:2;</li>
  <li>latence CAS approximative la plus faible;</li>
  <li>bande passante comme critère de départage.</li>
</ol>

<table>
  <thead>
    <tr><th>Profil</th><th>Multiplicateur</th><th>Mémoire</th><th>CL</th><th>Ratio</th><th>Tension</th></tr>
  </thead>
  <tbody>
    <tr><td>A</td><td>50</td><td>DDR5-5600</td><td>36</td><td>1:1</td><td>1,25 V</td></tr>
    <tr><td>B</td><td>52</td><td>DDR5-6000</td><td>36</td><td>1:1</td><td>1,35 V</td></tr>
    <tr><td>C</td><td>53</td><td>DDR5-6000</td><td>30</td><td>1:1</td><td>1,35 V</td></tr>
    <tr><td>D</td><td>52</td><td>DDR5-6400</td><td>32</td><td>1:2</td><td>1,40 V</td></tr>
  </tbody>
</table>

<div class="lab-tasks">
  <p><strong>Calculez, éliminez et choisissez.</strong> Montrez les calculs dans vos notes avant de vérifier les réponses.</p>

  <div class="base-exercise" data-base-exercise
       data-correct-message="Les calculs, exclusions et choix final sont corrects."
       data-incomplete-message="Remplissez tous les champs."
       data-retry-message="Revoyez les limites avant de comparer les profils valides.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Fréquence CPU du profil B</span><input data-answer="5200|5200MHZ|5.2GHZ|5,2GHZ"></label>
      <label class="base-answer-field"><span>Horloge mémoire du profil B</span><input data-answer="3000|3000MHZ|3GHZ"></label>
      <label class="base-answer-field"><span>Horloge contrôleur du profil B</span><input data-answer="3000|3000MHZ|3GHZ"></label>
      <label class="base-answer-field"><span>Latence CAS du profil B</span><input data-answer="12|12NS|12.0|12,0"></label>
      <label class="base-answer-field"><span>Bande passante théorique du profil B</span><input data-answer="96000|96000MB/S|96GB/S"></label>
      <label class="base-answer-field"><span>Profil rejeté pour multiplicateur excessif</span><select data-answer="C"><option value="">Choisir</option><option>A</option><option>B</option><option>C</option><option>D</option></select></label>
      <label class="base-answer-field"><span>Profil rejeté pour tension excessive</span><select data-answer="D"><option value="">Choisir</option><option>A</option><option>B</option><option>C</option><option>D</option></select></label>
      <label class="base-answer-field"><span>Meilleur profil valide pour ce scénario</span><select data-answer="B"><option value="">Choisir</option><option>A</option><option>B</option><option>C</option><option>D</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier l'optimisation</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>


<section class="lab-stage lab-optional">
<h3>Générateur de pratique RAM</h3>

<p>Générez des problèmes de débit, de bande passante ou de latence. Le générateur vérifie les étapes numériques sans modifier la progression principale.</p>

<div class="practice-generator ram-practice" data-ram-practice data-lang="fr">
  <div class="practice-controls">
    <label class="base-answer-field">
      <span>Type de problème</span>
      <select data-ram-mode>
        <option value="mixed">Mélangé</option>
        <option value="clock">Horloge et débit</option>
        <option value="bandwidth">Bande passante</option>
        <option value="latency">Latence CAS</option>
        <option value="overclock">CPU et ratio mémoire</option>
      </select>
    </label>
    <button class="lab-button" type="button" data-ram-new>Nouveau problème</button>
  </div>
  <div class="practice-question" data-ram-question aria-live="polite"></div>
  <div class="base-answer-grid" data-ram-fields></div>
  <div class="practice-actions">
    <button class="lab-button" type="button" data-ram-check>Vérifier</button>
    <button class="lab-button secondary" type="button" data-ram-hint>Indice</button>
  </div>
  <p class="base-feedback" data-ram-feedback aria-live="polite"></p>
  <p class="practice-stats" data-ram-stats>Problèmes réussis : 0</p>
</div>
<noscript>
  <div class="lab-no-js-practice">
    <h3>Pratique manuelle de remplacement</h3>
    <p>Conservez les formules, les unités et les étapes d'arrondi dans votre compte rendu.</p>
    <ol>
      <li>Calculez l'horloge mémoire approximative de DDR5-5600.</li>
      <li>Calculez la bande passante théorique de DDR5-5200 pour un canal de 64 bits, puis pour deux canaux indépendants.</li>
      <li>Calculez la latence CAS approximative de DDR5-6000 CL36.</li>
      <li>Avec une horloge de base de 100 MHz, un multiplicateur de 52, de la DDR5-6000 et un rapport contrôleur de 1:2, calculez les fréquences du CPU, de la mémoire et du contrôleur.</li>
    </ol>
    <details><summary>Vérifier les résultats après avoir terminé</summary><ol><li><code>2 800 MHz</code></li><li><code>41 600 MB/s</code>, puis <code>83 200 MB/s</code></li><li><code>12,0 ns</code></li><li>CPU : <code>5 200 MHz</code>; mémoire : <code>3 000 MHz</code>; contrôleur : <code>1 500 MHz</code></li></ol></details>
  </div>
</noscript>
</section>


</div>
</div>

# Laboratoire 7 - Observer et évaluer le démarrage et le micrologiciel

[Retour à la Séance 7](../seances/seance-7.md)

## But du laboratoire

Ce laboratoire vous demande d'observer, sans modifier le poste, les informations que Windows rapporte sur le fabricant, le modèle, le micrologiciel, le mode de démarrage et Secure Boot. Vous utiliserez ensuite ces observations avec la documentation technique pour reconstruire une séquence de démarrage, analyser le cas du poste Orion et décider si une modification ou une mise à jour du micrologiciel est justifiée.

Le laboratoire traite le micrologiciel comme une composante à **évaluer**, et non comme un menu à explorer au hasard. Une information absente, une option inconnue ou une version plus récente ne constitue pas automatiquement un problème ni une recommandation.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- relever en lecture seule le fabricant, le modèle, la version et la date du micrologiciel d'un poste Windows;
- distinguer une observation rapportée par Windows d'une conclusion qui exige la documentation du fabricant;
- reconstruire les principales responsabilités entre micrologiciel, gestionnaire d'amorçage, chargeur du système, noyau et pilotes;
- interpréter des réglages courants du micrologiciel sans les modifier;
- analyser un problème de démarrage en distinguant symptôme, hypothèse, preuve et action sûre;
- déterminer si une mise à jour de micrologiciel est pertinente à partir d'un besoin précis, des notes de version et d'une méthode de récupération;
- évaluer une source technique officielle concernant un modèle réel;
- ajouter des exigences de micrologiciel, de sécurité du démarrage et de récupération au cahier des charges évolutif;
- conserver un compte rendu permanent qui distingue faits, inférences, recommandation provisoire et questions ouvertes.

!!! warning "La progression n'est pas votre compte rendu"
    Les cases et réponses sont conservées seulement dans ce navigateur. Conservez les commandes, sorties, liens, analyses et recommandations dans un document que vous contrôlez.

!!! warning "Aucune modification du micrologiciel"
    Vous ne devez pas entrer dans l'interface de configuration du poste institutionnel, modifier l'ordre de démarrage, désactiver Secure Boot, changer le mode du contrôleur de stockage, activer un profil mémoire, effacer les réglages, retirer la pile, utiliser un cavalier de réinitialisation ni appliquer une mise à jour.

    Toutes les commandes de ce laboratoire sont en lecture seule et doivent être exécutées dans une fenêtre PowerShell normale, sans privilèges d'administrateur.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-7-fr-v2"
  data-gate-template="{done} sur {total} engagements reconnus"
  data-progress-template="{done} sur {total} tâches terminées"
  data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?"
>
  <section class="lab-gate" aria-labelledby="lab-7-gate-title">
    <h2 id="lab-7-gate-title">Entente de travail</h2>
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
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>L'observation du micrologiciel est en lecture seule : ne modifiez aucun réglage et ne lancez aucune mise à jour de BIOS/UEFI pendant ce laboratoire.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>Mode sans JavaScript</strong><p>Cochez chaque engagement pour révéler le laboratoire. Les consignes, commandes, tableaux et activités manuelles restent accessibles, mais la correction automatique, la progression enregistrée et les indices interactifs ne sont pas disponibles. Les réponses repliables permettent de vérifier les activités après les avoir terminées.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 sur 12 tâches terminées</p>
<button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button>
<progress data-lab-progress value="0" max="12">0 sur 12</progress>
</div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer vos notes</h2>
<p>Créez les rubriques suivantes dans votre compte rendu permanent :</p>
<ul>
  <li><strong>contexte du poste;</strong></li>
  <li><strong>observations Windows;</strong></li>
  <li><strong>séquence de démarrage;</strong></li>
  <li><strong>réglages et conséquences;</strong></li>
  <li><strong>cas Orion;</strong></li>
  <li><strong>source technique;</strong></li>
  <li><strong>cahier des charges;</strong></li>
  <li><strong>synthèse.</strong></li>
</ul>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Préparez le compte rendu.</strong><small>Inscrivez « Laboratoire 7 », la date, le poste ou scénario étudié et les huit rubriques demandées.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Observer le poste sans modifier son démarrage</h2>

<div class="lab-command-note">
  <strong>Commandes en lecture seule</strong>
  <p>Ouvrez PowerShell ou Windows Terminal normalement. Si une demande d'élévation apparaît, annulez-la. Conservez les sorties et les messages d'erreur utiles.</p>
</div>

<p>Relevez d'abord le fabricant et le modèle :</p>

```powershell
Get-CimInstance Win32_ComputerSystem |
  Select-Object Manufacturer, Model
```

<p>Relevez ensuite les informations de micrologiciel rapportées par Windows :</p>

```powershell
Get-CimInstance Win32_BIOS |
  Select-Object Manufacturer, SMBIOSBIOSVersion, ReleaseDate
```

<p>Ouvrez enfin <strong>Informations système</strong> :</p>

1. appuyez sur la touche Windows;
2. recherchez <strong>Informations système</strong> ou exécutez <code>msinfo32</code>;
3. repérez <strong>Mode BIOS</strong> et <strong>État du démarrage sécurisé</strong>;
4. ne modifiez aucun réglage et ne redémarrez pas le poste.

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Conservez les résultats bruts.</strong><small>Notez le fabricant, le modèle, le fournisseur du micrologiciel rapporté, la version SMBIOS/BIOS, la date rapportée, le mode BIOS et l'état de Secure Boot. Utilisez « non rapporté » lorsqu'une information manque.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Distinguez observation et conclusion.</strong><small>Rédigez deux faits directement observés, une inférence prudente et deux questions qui exigent encore la documentation du fabricant.</small></span>
  </label>
</div>

!!! example "Exemple de distinction"
    **Observation :** Informations système affiche « Mode BIOS : UEFI ».

    **Inférence raisonnable :** le système a démarré par un chemin UEFI.

    **Conclusion non justifiée :** le micrologiciel est à jour et tous ses réglages sont corrects.
</section>

<section class="lab-stage" data-lab-stage>
<h2>Reconstruire la chaîne de démarrage</h2>

<p>Replacez les responsabilités dans l'ordre conceptuel étudié. L'ordre exact et les noms internes peuvent varier selon la plateforme; l'activité porte sur le transfert général du contrôle.</p>

<div class="base-exercise" data-base-exercise
     data-correct-message="La chaîne de responsabilités est correctement reconstruite."
     data-incomplete-message="Choisissez une réponse pour chaque étape."
     data-retry-message="Au moins une responsabilité est placée au mauvais moment.">
  <div class="base-answer-grid compact">
    <label class="base-answer-field"><span>1. Exécute les premières instructions persistantes</span><select data-answer="MICROLOGICIEL"><option value="">Choisir</option><option>Micrologiciel</option><option>Gestionnaire d'amorçage</option><option>Chargeur du système</option><option>Noyau</option><option>Pilotes du système</option></select></label>
    <label class="base-answer-field"><span>2. Sélectionne une option de démarrage</span><select data-answer="GESTIONNAIRE D'AMORCAGE|GESTIONNAIRE DAMORCAGE"><option value="">Choisir</option><option>Micrologiciel</option><option>Gestionnaire d'amorçage</option><option>Chargeur du système</option><option>Noyau</option><option>Pilotes du système</option></select></label>
    <label class="base-answer-field"><span>3. Place le noyau et les données initiales en mémoire</span><select data-answer="CHARGEUR DU SYSTEME|CHARGEUR DU SYSTÈME"><option value="">Choisir</option><option>Micrologiciel</option><option>Gestionnaire d'amorçage</option><option>Chargeur du système</option><option>Noyau</option><option>Pilotes du système</option></select></label>
    <label class="base-answer-field"><span>4. Prend en charge les ressources principales du système</span><select data-answer="NOYAU"><option value="">Choisir</option><option>Micrologiciel</option><option>Gestionnaire d'amorçage</option><option>Chargeur du système</option><option>Noyau</option><option>Pilotes du système</option></select></label>
    <label class="base-answer-field"><span>5. Fournissent la prise en charge complète des périphériques</span><select data-answer="PILOTES DU SYSTEME|PILOTES DU SYSTÈME"><option value="">Choisir</option><option>Micrologiciel</option><option>Gestionnaire d'amorçage</option><option>Chargeur du système</option><option>Noyau</option><option>Pilotes du système</option></select></label>
  </div>
  <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier la chaîne</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
</div>

<details>
  <summary>Vérification manuelle sans JavaScript</summary>
  <ol><li>Micrologiciel</li><li>Gestionnaire d'amorçage</li><li>Chargeur du système</li><li>Noyau</li><li>Pilotes du système</li></ol>
</details>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Conservez la chaîne reconstruite.</strong><small>Recopiez l'ordre complet dans votre compte rendu et indiquez qu'il s'agit d'un modèle conceptuel dont les détails varient selon la plateforme.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Expliquez un transfert de contrôle.</strong><small>Choisissez deux étapes consécutives et expliquez en deux ou trois phrases ce que la première doit préparer avant de céder le contrôle à la seconde.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Interpréter des réglages sans les modifier</h2>

<p>Pour chaque scénario, identifiez le réglage concerné, une conséquence possible et la preuve nécessaire avant toute modification.</p>

<table>
  <thead><tr><th>Scénario</th><th>Réglage probablement concerné</th><th>Risque d'une modification improvisée</th></tr></thead>
  <tbody>
    <tr><td>Une machine virtuelle refuse d'activer certaines fonctions matérielles.</td><td>Virtualisation matérielle</td><td>Changer un réglage sans vérifier le processeur, l'hyperviseur et la politique du poste ne prouve pas la cause.</td></tr>
    <tr><td>Une clé USB de diagnostic signée n'apparaît pas comme option prioritaire.</td><td>Ordre de démarrage ou menu de démarrage ponctuel</td><td>Modifier l'ordre permanent peut faire démarrer un autre support par erreur. Ce scénario concerne l'ordre de démarrage, et non un refus de signature par Secure Boot.</td></tr>
    <tr><td>Windows ne démarre plus après un changement de mode de stockage.</td><td>Mode du contrôleur de stockage</td><td>Le système installé peut ne pas posséder le pilote ou la configuration attendue.</td></tr>
    <tr><td>Une mémoire annoncée à un débit supérieur fonctionne au réglage de référence.</td><td>Profil mémoire ou paramètres JEDEC</td><td>Un profil peut dépasser les paramètres officiellement pris en charge ou devenir instable.</td></tr>
    <tr><td>Un support amorçable non signé est refusé.</td><td>Secure Boot et politique de confiance</td><td>Désactiver la vérification supprime une protection sans établir pourquoi le support est refusé.</td></tr>
  </tbody>
</table>

<div class="base-exercise" data-base-exercise
     data-correct-message="Les premières vérifications respectent une démarche prudente."
     data-incomplete-message="Choisissez une première vérification pour chaque scénario."
     data-retry-message="Revoyez ce qui peut être observé avant de modifier le micrologiciel.">
  <div class="base-answer-grid compact">
    <label class="base-answer-field"><span>Virtualisation indisponible</span><select data-answer="VERIFIER LE PROCESSEUR ET L'HYPERVISEUR|VÉRIFIER LE PROCESSEUR ET L'HYPERVISEUR"><option value="">Choisir</option><option>Vérifier le processeur et l'hyperviseur</option><option>Activer toutes les options avancées</option><option>Mettre le BIOS à jour immédiatement</option></select></label>
    <label class="base-answer-field"><span>Windows ne démarre plus après un changement de stockage</span><select data-answer="RETABLIR LE REGLAGE DOCUMENTE|RÉTABLIR LE RÉGLAGE DOCUMENTÉ"><option value="">Choisir</option><option>Réinstaller Windows immédiatement</option><option>Rétablir le réglage documenté</option><option>Désactiver Secure Boot</option></select></label>
    <label class="base-answer-field"><span>Support USB refusé par Secure Boot</span><select data-answer="VERIFIER LA SIGNATURE ET LA SOURCE|VÉRIFIER LA SIGNATURE ET LA SOURCE"><option value="">Choisir</option><option>Désactiver Secure Boot</option><option>Vérifier la signature et la source</option><option>Effacer les clés de confiance</option></select></label>
  </div>
  <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les premières actions</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
</div>

<details>
  <summary>Vérification manuelle sans JavaScript</summary>
  <ol><li>Vérifier le processeur et l'hyperviseur.</li><li>Rétablir le réglage documenté.</li><li>Vérifier la signature et la source du support.</li></ol>
</details>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Analysez deux réglages.</strong><small>Pour deux scénarios du tableau, conservez le besoin, le réglage concerné, le risque, la preuve à obtenir et une action réversible ou une raison de ne rien changer.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Diagnostiquer le poste Orion</h2>

<p>Utilisez uniquement les informations suivantes :</p>

<ul>
  <li>une nouvelle trousse DDR5 a été installée;</li>
  <li>au premier démarrage, le voyant DRAM reste allumé environ 90 secondes;</li>
  <li>le poste démarre ensuite normalement;</li>
  <li>les démarrages suivants sont rapides;</li>
  <li>le fabricant propose une version de micrologiciel plus récente avec la seule note « amélioration de la compatibilité de la mémoire »;</li>
  <li>une clé USB de diagnostic est refusée lorsque Secure Boot est actif.</li>
</ul>

<div class="lab-admin-note">
  <strong>Ne confondez pas hypothèse et preuve.</strong>
  <p>L'entraînement initial de la mémoire est une explication plausible du délai, mais le manuel du modèle doit confirmer le comportement du voyant et les durées attendues. Le refus de la clé USB concerne une politique de confiance distincte; il ne prouve pas un défaut de la RAM.</p>
</div>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Construisez une fiche de diagnostic.</strong><small>Inscrivez les observations, deux hypothèses distinctes, la preuve nécessaire pour chacune et l'action la moins risquée qui permettrait de progresser.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Décidez si la mise à jour est justifiée.</strong><small>Rédigez une recommandation provisoire de quatre à six phrases. Elle doit traiter le besoin précis, la faiblesse des notes de version, le modèle exact, la méthode de récupération et les conditions qui pourraient changer votre décision.</small></span>
  </label>
</div>

!!! question "Question de contrôle"
    Si le poste fonctionne normalement après le premier démarrage, la présence d'une version plus récente suffit-elle à recommander une mise à jour?

??? success "Réponse attendue"
    Non. Il faut établir un bénéfice pertinent pour ce modèle et ce problème, vérifier les notes détaillées et les prérequis, puis évaluer le risque et la récupération. Une version plus récente est une observation, pas une recommandation.
</section>

<section class="lab-stage" data-lab-stage>
<h2>Évaluer une source technique officielle</h2>

<p>Recherchez la page de soutien officielle correspondant au fabricant et au modèle observés. Cherchez ensuite une page de version de micrologiciel, un manuel ou une procédure de récupération. Ne téléchargez ni n'exécutez aucun programme de mise à jour.</p>

!!! note "Si le modèle institutionnel n'est pas documenté publiquement"
    Utilisez un modèle fourni par l'enseignant ou un ordinateur personnel que vous pouvez identifier précisément. Indiquez clairement que votre source concerne ce modèle de remplacement et non le poste institutionnel.

<p>Répondez aux cinq parties suivantes, avec un maximum de deux phrases par réponse :</p>

<ol>
  <li><strong>Source et éditeur :</strong> titre exact, fabricant ou organisation, modèle concerné et lien direct.</li>
  <li><strong>Pertinence :</strong> pourquoi cette source peut-elle soutenir la déclaration étudiée?</li>
  <li><strong>Spécification :</strong> relevez une version, une date, un problème corrigé, un prérequis ou une méthode de récupération, avec son contexte.</li>
  <li><strong>Vérification :</strong> comparez cette information avec Windows, une deuxième page officielle, le manuel ou une autre observation.</li>
  <li><strong>Nature des énoncés :</strong> distinguez un fait, une inférence et une recommandation provisoire; indiquez pourquoi aucune recommandation n'est justifiée si les preuves sont insuffisantes.</li>
</ol>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Conservez l'évaluation de la source.</strong><small>Les cinq parties sont complètes, les liens sont directs et les affirmations restent limitées au modèle et à la version réellement documentés.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Tracez la récupération.</strong><small>Notez la méthode de récupération documentée, les fichiers ou supports nécessaires, les prérequis d'alimentation et toute limite que la source ne permet pas de confirmer.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Étendre le cahier des charges évolutif</h2>

<p>Ajoutez une section <strong>Micrologiciel et démarrage</strong> au cahier des charges du PC de jeu et de diffusion en continu commencé au Laboratoire 5.</p>

<table>
  <thead><tr><th>Trace à conserver</th><th>Question directrice</th></tr></thead>
  <tbody>
    <tr><td>Besoin pertinent</td><td>Quel besoin du client rend le micrologiciel, Secure Boot ou la récupération important?</td></tr>
    <tr><td>Critères techniques</td><td>Quelles caractéristiques permettent d'évaluer le soutien des processeurs, de la mémoire, des mises à jour et du démarrage sécurisé?</td></tr>
    <tr><td>Compatibilité</td><td>Quelles versions minimales, dépendances, clés, modes de démarrage ou procédures du fabricant limitent le choix?</td></tr>
    <tr><td>Recommandation provisoire et question ouverte</td><td>Que peut-on défendre maintenant, et quelle preuve pourrait changer la recommandation?</td></tr>
  </tbody>
</table>

<p>Ajoutez ensuite une phrase par critère de cycle de vie :</p>

<ul>
  <li><strong>Longévité :</strong> le fabricant publie-t-il encore des mises à jour et prend-il en charge les composants prévus?</li>
  <li><strong>Stabilité :</strong> quelles preuves soutiennent un démarrage et un fonctionnement prévisibles?</li>
  <li><strong>Efficacité :</strong> une mise à jour ou un réglage apporte-t-il un bénéfice utile qui justifie le temps, le risque et les ressources?</li>
  <li><strong>Maintenabilité :</strong> peut-on identifier la version, restaurer les valeurs par défaut et utiliser une méthode de récupération documentée?</li>
</ul>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Ajoutez la section au cahier des charges.</strong><small>Conservez les quatre traces de décision et les quatre phrases de cycle de vie. N'inventez pas une conclusion lorsque la preuve manque; nommez la preuve nécessaire.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthèse</h2>

<p>Produisez une synthèse de 150 à 250 mots qui répond à la question suivante :</p>

> Comment peut-on évaluer le démarrage et le micrologiciel d'un poste sans confondre une observation, une hypothèse et une raison de modifier la plateforme?

<p>Votre synthèse doit :</p>

<ul>
  <li>situer au moins quatre responsabilités dans la chaîne de démarrage;</li>
  <li>citer deux observations réelles du poste ou du scénario de remplacement;</li>
  <li>expliquer pourquoi Secure Boot et une mise à jour de micrologiciel sont deux décisions distinctes;</li>
  <li>formuler une recommandation provisoire accompagnée d'une question ouverte;</li>
  <li>indiquer une méthode de vérification ou de récupération qui manque encore.</li>
</ul>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Terminez la synthèse.</strong><small>La synthèse relie les observations, les sources, les risques et la recommandation; elle ne se limite pas à une définition du BIOS ou de l'UEFI.</small></span>
  </label>
</div>
</section>

</div>
</div>

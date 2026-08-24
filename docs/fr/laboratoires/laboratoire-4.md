# Laboratoire 4 - Situer et déplacer les données

[Retour à la Séance 4](../seances/seance-4.md)

## But du laboratoire

Ce laboratoire applique l'architecture des micro-ordinateurs à un petit nombre de situations ciblées. Vous distinguerez les couches physiques d'un composant, associerez plusieurs composants à leur rôle, interpréterez un tableau de mémoire adressable et suivrez une lecture entre la RAM et un registre.

Cette page présente le parcours pratique du sujet. L'enseignant peut fixer le point d'arrêt selon les plages d'effort indicatives publiées et le temps nécessaire au questionnaire Teams distinct.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- distinguer PCB, boîtier, puce et connecteur;
- associer CPU, GPU, MCU, SoC et SoM à leur rôle général;
- suivre des adresses hexadécimales consécutives;
- reconstruire des valeurs à partir d'un tableau mémoire;
- associer commande, adresse et valeur au bus approprié;
- expliquer une opération simplifiée de lecture mémoire;
- évaluer brièvement une source technique sur un bus ou un lien d'architecture.

!!! warning "La progression n'est pas votre compte rendu"
    Les réponses sont vérifiées et la progression est conservée localement dans ce navigateur. Gardez néanmoins votre tableau mémoire, vos calculs et les étapes de reconstruction dans vos propres notes.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-4-fr-v3"
  data-gate-template="{done} sur {total} engagements reconnus"
  data-progress-template="{done} sur {total} tâches terminées"
  data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?"
>
  <section class="lab-gate" aria-labelledby="lab-4-agreement-title">
    <h2 id="lab-4-agreement-title">Entente de travail</h2>
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
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Distinguez toujours l'adresse de son contenu et vérifiez largeur, type et boutisme avant de reconstruire une valeur.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>Mode sans JavaScript</strong><p>Cochez chaque engagement pour révéler le laboratoire. Les consignes et les champs restent utilisables, mais la correction automatique, la progression enregistrée et les indices interactifs ne sont pas disponibles.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 sur 7 tâches terminées</p>
<button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button>
<progress data-lab-progress value="0" max="7">0 sur 7</progress>
</div>

<details class="lab-guide">
<summary>Guide : lire un tableau mémoire</summary>
<div class="lab-guide-body">
  <ol>
    <li>Repérez l'adresse de départ.</li>
    <li>Convertissez la largeur en nombre d'octets.</li>
    <li>Relevez exactement ce nombre de cases consécutives.</li>
    <li>Appliquez le boutisme à cette valeur seulement.</li>
    <li>Appliquez enfin le type demandé.</li>
  </ol>
</div>
</details>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer vos notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Créez votre compte rendu.</strong><small>Inscrivez « Laboratoire 4 », la date et les rubriques « couches physiques », « composants », « mémoire » et « bus ».</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Les couches physiques</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Associez chaque description à la bonne couche.</strong><small>Pensez au trajet allant de la carte complète jusqu'au silicium.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les quatre couches physiques sont correctement distinguées." data-incomplete-message="Choisissez une réponse pour chaque description." data-retry-message="Au moins une couche physique est à revoir.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Support rigide portant les pistes et composants</span><select data-answer="PCB"><option value="">Choisir</option><option>PCB</option><option>Boîtier</option><option>Puce</option><option>Connecteur</option></select></label>
      <label class="base-answer-field"><span>Morceau de silicium portant les transistors</span><select data-answer="PUCE"><option value="">Choisir</option><option>PCB</option><option>Boîtier</option><option>Puce</option><option>Connecteur</option></select></label>
      <label class="base-answer-field"><span>Structure protégeant la puce et fournissant les contacts</span><select data-answer="BOÎTIER|BOITIER"><option value="">Choisir</option><option>PCB</option><option>Boîtier</option><option>Puce</option><option>Connecteur</option></select></label>
      <label class="base-answer-field"><span>Élément de la carte recevant une pièce amovible</span><select data-answer="CONNECTEUR"><option value="">Choisir</option><option>PCB</option><option>Boîtier</option><option>Puce</option><option>Connecteur</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les couches</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Les rôles des composants</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Associez chaque rôle au terme le plus précis.</strong><small>Un produit réel peut combiner plusieurs rôles; utilisez la définition donnée dans la séance.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les cinq rôles sont correctement associés." data-incomplete-message="Choisissez un terme pour chaque rôle." data-retry-message="Au moins un rôle de composant est à revoir.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Instructions générales et coordination du système</span><select data-answer="CPU"><option value="">Choisir</option><option>CPU</option><option>GPU</option><option>MCU</option><option>SoC</option><option>SoM</option></select></label>
      <label class="base-answer-field"><span>Nombreuses opérations similaires en parallèle</span><select data-answer="GPU"><option value="">Choisir</option><option>CPU</option><option>GPU</option><option>MCU</option><option>SoC</option><option>SoM</option></select></label>
      <label class="base-answer-field"><span>Contrôle embarqué avec mémoire et périphériques intégrés</span><select data-answer="MCU"><option value="">Choisir</option><option>CPU</option><option>GPU</option><option>MCU</option><option>SoC</option><option>SoM</option></select></label>
      <label class="base-answer-field"><span>Plusieurs fonctions majeures réunies dans un circuit</span><select data-answer="SOC"><option value="">Choisir</option><option>CPU</option><option>GPU</option><option>MCU</option><option>SoC</option><option>SoM</option></select></label>
      <label class="base-answer-field"><span>Petit PCB portant un SoC et des composants de soutien</span><select data-answer="SOM"><option value="">Choisir</option><option>CPU</option><option>GPU</option><option>MCU</option><option>SoC</option><option>SoM</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les rôles</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Tableau de mémoire</h2>
<p>Chaque case contient un octet. Les adresses et les contenus sont en hexadécimal.</p>

<table>
  <thead><tr><th>Adresse</th><th>Contenu</th><th>Adresse</th><th>Contenu</th></tr></thead>
  <tbody>
    <tr><td><code>0200</code></td><td><code>41</code></td><td><code>0208</code></td><td><code>50</code></td></tr>
    <tr><td><code>0201</code></td><td><code>42</code></td><td><code>0209</code></td><td><code>40</code></td></tr>
    <tr><td><code>0202</code></td><td><code>2A</code></td><td><code>020A</code></td><td><code>43</code></td></tr>
    <tr><td><code>0203</code></td><td><code>01</code></td><td><code>020B</code></td><td><code>50</code></td></tr>
    <tr><td><code>0204</code></td><td><code>D6</code></td><td><code>020C</code></td><td><code>55</code></td></tr>
    <tr><td><code>0205</code></td><td><code>FF</code></td><td><code>020D</code></td><td><code>00</code></td></tr>
    <tr><td><code>0206</code></td><td><code>00</code></td><td><code>020E</code></td><td><code>7F</code></td></tr>
    <tr><td><code>0207</code></td><td><code>00</code></td><td><code>020F</code></td><td><code>80</code></td></tr>
  </tbody>
</table>

<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Naviguez dans les adresses.</strong><small>Séparez toujours l'adresse de son contenu.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les adresses et le contenu sont correctement repérés." data-incomplete-message="Remplissez les quatre champs." data-retry-message="Une adresse, une suite ou un contenu est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Contenu à l'adresse <code>0204</code></span><input data-answer="D6|0XD6"></label>
      <label class="base-answer-field"><span>Adresse qui précède <code>020A</code></span><input data-answer="0209|0X0209"></label>
      <label class="base-answer-field"><span>Adresses occupées par 32 bits à partir de <code>0206</code></span><input data-answer="0206,0207,0208,0209|0206;0207;0208;0209" placeholder="séparées par des virgules"></label>
      <label class="base-answer-field"><span>Première adresse après cette valeur</span><input data-answer="020A|0X020A"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les adresses</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Interprétez les valeurs demandées.</strong><small>Utilisez seulement les cases appartenant à chaque valeur.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les valeurs stockées sont correctement reconstruites." data-incomplete-message="Remplissez les six champs." data-retry-message="Une reconstruction ou interprétation est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Entier non signé 16 bits petit-boutiste à <code>0202</code>, en hexa</span><input data-answer="012A|0X012A|12A|0X12A"></label>
      <label class="base-answer-field"><span>Même entier en base 10</span><input inputmode="numeric" data-answer="298"></label>
      <label class="base-answer-field"><span>Entier signé 8 bits à <code>0204</code></span><input inputmode="numeric" data-answer="-42"></label>
      <label class="base-answer-field"><span>Trois caractères ASCII à partir de <code>020A</code></span><input data-answer="CPU"></label>
      <label class="base-answer-field"><span>Réel 32 bits petit-boutiste à <code>0206</code>, en hexa logique</span><input data-answer="40500000|0X40500000"></label>
      <label class="base-answer-field"><span>Même réel en base 10</span><input data-answer="3.25|3,25"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les valeurs</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthèse : suivre une lecture</h2>
<p>Le processeur exécute l'instruction simplifiée <code>LOAD [0202], R1</code>. Utilisez le tableau précédent.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Associez chaque information à son rôle.</strong><small>La lecture copie un octet de la RAM vers le registre.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="La lecture mémoire est correctement suivie." data-incomplete-message="Remplissez les cinq champs." data-retry-message="Une commande, une adresse, une donnée ou une destination est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Opération transportée par le bus de contrôle</span><select data-answer="LIRE"><option value="">Choisir</option><option>Lire</option><option>Écrire</option></select></label>
      <label class="base-answer-field"><span>Valeur transportée par le bus d'adresses</span><input data-answer="0202|0X0202"></label>
      <label class="base-answer-field"><span>Valeur retournée sur le bus de données</span><input data-answer="2A|0X2A"></label>
      <label class="base-answer-field"><span>Destination dans le processeur</span><input data-answer="R1"></label>
      <label class="base-answer-field"><span>Composant qui répond à la demande</span><select data-answer="RAM|MÉMOIRE|MEMOIRE"><option value="">Choisir</option><option>RAM</option><option>GPU</option><option>SSD</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier le transfert</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Évaluer une source technique : un bus ou un lien d'architecture</h2>
<p><strong>Sujet imposé :</strong> trouvez un manuel, une fiche de processeur ou un schéma fonctionnel officiel qui documente un bus ou un lien entre le processeur et la mémoire, la carte graphique ou un autre composant.</p>
<p>Dans votre compte rendu, répondez aux cinq consignes suivantes. <strong>Chaque réponse doit compter au plus deux phrases.</strong></p>
<ol>
  <li><strong>Source et éditeur :</strong> donnez le titre, le fabricant ou l'organisation qui publie le document et le lien direct.</li>
  <li><strong>Pertinence :</strong> expliquez pourquoi cette source convient pour décrire cette plateforme ou cette interface.</li>
  <li><strong>Spécification :</strong> relevez une caractéristique précise du lien, par exemple son nom, sa version, sa largeur, son nombre de voies ou son débit.</li>
  <li><strong>Vérification :</strong> comparez-la à une deuxième source ou au rôle des bus étudié pendant la séance.</li>
  <li><strong>Nature des énoncés :</strong> formulez et étiquetez clairement un fait, une inférence et une recommandation concernant ce lien.</li>
</ol>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez les cinq réponses dans votre compte rendu.</strong><small>La case confirme que chaque réponse respecte la limite de deux phrases et que les liens permettent de retrouver les sources.</small></span></label>
</div>
</section>

<section class="lab-stage lab-optional">
<h2>Pratique facultative : après le laboratoire</h2>
<p>Conservez votre tableau et vos démarches pour la révision. Le travail de recherche sur les jalons des processeurs Intel sera présenté séparément lorsque les spécifications de l'activité seront publiées.</p>
</section>
</div>
</div>

# Laboratoire 3 - Interpréter les représentations internes

[Retour à la Séance 3](../seances/seance-3.md)

## But du laboratoire

Ce laboratoire applique d'abord en classe les conventions qui donnent un sens aux bits : unités, largeur fixe, entiers signés et non signés, texte et boutisme. Les fractions binaires et IEEE 754 simple précision forment ensuite une autoformation obligatoire pouvant servir à l'examen.

Le travail est individuel. Les champs structurés vérifient les étapes mécaniques sans afficher la solution. Les explications, comparaisons et justifications doivent être conservées dans votre compte rendu personnel.

## Objectifs

À la fin du laboratoire et de l'autoformation obligatoire, vous devriez être en mesure de :

- convertir correctement des unités binaires et décimales;
- vérifier si une valeur entre dans une largeur et un type donnés, puis encoder et décoder des entiers signés et non signés;
- interpréter des octets ASCII et UTF-8 simples;
- reconstruire une valeur selon l'ordre gros-boutiste ou petit-boutiste;
- intégrer largeur, type, complément à deux et boutisme dans une même interprétation;
- construire et décoder des valeurs IEEE 754 normalisées, finies et de simple précision après l'autoformation;
- expliquer pourquoi les mêmes bits peuvent produire plusieurs interprétations;
- évaluer brièvement une source technique sur l'encodage UTF-8.

!!! warning "La progression n'est pas votre compte rendu"
    Les réponses et la progression sont conservées seulement dans ce navigateur. Inscrivez les calculs, les tableaux, les bits rejetés, les règles d'arrondi et les explications dans un cahier ou un document numérique que vous contrôlez.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-3-fr-v4"
  data-gate-template="{done} sur {total} engagements reconnus"
  data-progress-template="{done} sur {total} tâches terminées"
  data-self-study-template="{done} sur {total} tâches d'autoformation terminées"
  data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?"
>
  <section class="lab-gate" aria-labelledby="lab-3-agreement-title">
    <h2 id="lab-3-agreement-title">Entente de travail</h2>
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
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Vérifiez la largeur, le type, l'encodage et le boutisme avant d'interpréter une suite d'octets; ne transformez pas une supposition en fait.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>Mode sans JavaScript</strong><p>Cochez chaque engagement pour révéler le laboratoire. Les consignes et les champs restent utilisables, mais la correction automatique, la progression enregistrée et les indices interactifs ne sont pas disponibles. Une série de pratique manuelle remplace le générateur.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 sur 11 tâches terminées</p>
<button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button>
<progress data-lab-progress value="0" max="11">0 sur 11</progress>
</div>

<details class="lab-guide">
<summary>Guide : présenter une représentation interne</summary>
<div class="lab-guide-body">
  <ol>
    <li>Identifiez la valeur ou les octets de départ.</li>
    <li>Indiquez la largeur, le type, l'encodage et le boutisme applicables.</li>
    <li>Montrez les conversions, compléments, champs ou regroupements dans leur ordre.</li>
    <li>Écrivez la représentation finale avec sa base et sa largeur.</li>
    <li>Vérifiez la plage, le nombre de bits et la plausibilité du résultat.</li>
  </ol>
</div>
</details>

<div class="lab-admin-note">
<strong>Parcours en classe et autoformation obligatoire</strong>
<p>Le parcours en classe va de « Préparer vos notes » jusqu'à « Évaluer une source technique : encodage UTF-8 ». La progression principale exclut l'autoformation IEEE 754. Cette autoformation possède son propre indicateur et doit être terminée avant la séance de révision de l'examen.</p>
</div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer vos notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Créez votre compte rendu.</strong><small>Inscrivez « Laboratoire 3 », la date et les rubriques « unités », « entiers », « texte », « boutisme » et « synthèse ». Ajoutez ensuite une rubrique distincte « Autoformation IEEE 754 ».</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Unités et largeur</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Convertissez les unités sans mélanger les conventions.</strong><small>Montrez le multiplicateur utilisé pour chaque conversion.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les quatre conversions d'unités sont correctes." data-incomplete-message="Remplissez les quatre champs." data-retry-message="Au moins une conversion ou convention est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>32 bits en octets</span><input inputmode="numeric" data-answer="4"></label>
      <label class="base-answer-field"><span>2 KiB en octets</span><input inputmode="numeric" data-answer="2048|2,048"></label>
      <label class="base-answer-field"><span>3 kB en octets</span><input inputmode="numeric" data-answer="3000|3,000"></label>
      <label class="base-answer-field"><span>1 MiB en octets</span><input inputmode="numeric" data-answer="1048576|1,048,576"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les unités</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Déterminez les plages et vérifiez si les valeurs entrent.</strong><small>Utilisez les formules de largeur fixe avant de répondre.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les plages et les quatre décisions sont correctes." data-incomplete-message="Remplissez tous les champs." data-retry-message="Une limite ou une décision de plage est à revoir.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Maximum non signé, 8 bits</span><input inputmode="numeric" data-answer="255"></label>
      <label class="base-answer-field"><span>Minimum signé, 8 bits</span><input inputmode="numeric" data-answer="-128"></label>
      <label class="base-answer-field"><span>Maximum signé, 8 bits</span><input inputmode="numeric" data-answer="127"></label>
      <label class="base-answer-field"><span>200 entre en non signé 8 bits?</span><select data-answer="OUI"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
      <label class="base-answer-field"><span>200 entre en signé 8 bits?</span><select data-answer="NON"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
      <label class="base-answer-field"><span>-100 entre en signé 8 bits?</span><select data-answer="OUI"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
      <label class="base-answer-field"><span>-100 entre en non signé 8 bits?</span><select data-answer="NON"><option value="">Choisir</option><option>Oui</option><option>Non</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les plages</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Entiers signés et non signés</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Interprétez le même octet de deux façons.</strong><small>Utilisez la nouvelle configuration <code>11001010</code> et conservez les deux développements dans vos notes.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les deux interprétations de l'octet sont correctes." data-incomplete-message="Remplissez les trois champs." data-retry-message="La forme hexadécimale ou une interprétation est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Hexadécimal</span><input data-answer="CA|0XCA"></label>
      <label class="base-answer-field"><span>Valeur non signée</span><input inputmode="numeric" data-answer="202"></label>
      <label class="base-answer-field"><span>Valeur signée</span><input inputmode="numeric" data-answer="-54"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les interprétations</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Encodez <code>-46</code> comme entier signé de huit bits.</strong><small>Montrez la valeur absolue, l'inversion et l'ajout de 1.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Le complément à deux de -46 est correct." data-incomplete-message="Remplissez toutes les étapes." data-retry-message="Une étape du complément à deux est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>46 sur 8 bits</span><input inputmode="numeric" maxlength="8" data-answer="00101110"></label>
      <label class="base-answer-field"><span>Bits inversés</span><input inputmode="numeric" maxlength="8" data-answer="11010001"></label>
      <label class="base-answer-field"><span>Après ajout de 1</span><input inputmode="numeric" maxlength="8" data-answer="11010010"></label>
      <label class="base-answer-field"><span>Réponse hexadécimale</span><input data-answer="D2|0XD2"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier l'encodage</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Décodez <code>10110100</code> comme entier signé de huit bits.</strong><small>Utilisez la méthode inversion plus 1 et indiquez le signe final.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Le décodage signé est correct." data-incomplete-message="Remplissez toutes les étapes." data-retry-message="Une étape du décodage est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Signe reconnu</span><select data-answer="NÉGATIF|NEGATIF"><option value="">Choisir</option><option>Positif</option><option>Négatif</option></select></label>
      <label class="base-answer-field"><span>Bits inversés</span><input inputmode="numeric" maxlength="8" data-answer="01001011"></label>
      <label class="base-answer-field"><span>Après ajout de 1</span><input inputmode="numeric" maxlength="8" data-answer="01001100"></label>
      <label class="base-answer-field"><span>Grandeur décimale</span><input inputmode="numeric" data-answer="76"></label>
      <label class="base-answer-field"><span>Valeur signée</span><input inputmode="numeric" data-answer="-76"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier le décodage</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Texte et octets</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Distinguez caractères, points de code et octets UTF-8.</strong><small>Utilisez une table Unicode ou UTF-8 seulement après avoir prédit les résultats ASCII familiers.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les caractères et octets sont correctement identifiés." data-incomplete-message="Remplissez tous les champs de texte." data-retry-message="Un code ou une séquence d'octets est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Point de code de <code>A</code></span><input data-answer="U+0041|0041"></label>
      <label class="base-answer-field"><span>Octet UTF-8 de <code>A</code></span><input data-answer="41|0X41"></label>
      <label class="base-answer-field"><span>Octet du saut de ligne LF</span><input data-answer="0A|0X0A"></label>
      <label class="base-answer-field"><span>Point de code de <code>é</code></span><input data-answer="U+00E9|00E9"></label>
      <label class="base-answer-field"><span>Octets UTF-8 de <code>é</code></span><input data-answer="C3,A9|C3A9|C3;A9" placeholder="deux octets"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier le texte</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Boutisme</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Placez les octets dans le bon ordre.</strong><small>Travaillez toujours avec des groupes de deux chiffres hexadécimaux.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les ordres d'octets et la valeur reconstruite sont corrects." data-incomplete-message="Remplissez tous les champs de boutisme." data-retry-message="Un ordre d'octets ou une valeur est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span><code>0x89ABCDEF</code> en gros-boutiste</span><input data-answer="89,AB,CD,EF|89;AB;CD;EF|89ABCDEF"></label>
      <label class="base-answer-field"><span><code>0x89ABCDEF</code> en petit-boutiste</span><input data-answer="EF,CD,AB,89|EF;CD;AB;89|EFCDAB89"></label>
      <label class="base-answer-field"><span>Octets <code>2A 01</code>, petit-boutiste : valeur hexa</span><input data-answer="012A|0X012A|12A|0X12A"></label>
      <label class="base-answer-field"><span>Même valeur en base 10</span><input inputmode="numeric" data-answer="298"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier l'ordre des octets</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>


<section class="lab-stage lab-consolidation" data-lab-stage>
<h2>Synthèse du parcours en classe</h2>
<p>Deux octets consécutifs apparaissent en mémoire dans cet ordre : <code>FE FF</code>. Ils contiennent un entier signé de 16 bits en petit-boutiste.</p>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check data-auto-task disabled><span><strong>Reconstituez et interprétez la valeur.</strong><small>Rétablissez l'ordre logique, puis distinguez les interprétations signée et non signée.</small></span></label>
  <div class="base-exercise" data-base-exercise data-correct-message="La valeur de 16 bits est correctement reconstruite et interprétée." data-incomplete-message="Remplissez tous les champs." data-retry-message="Revoyez l'ordre des octets, la largeur ou le complément à deux.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Octets dans l'ordre logique</span><input data-answer="FF,FE|FF;FE|FFFE"></label>
      <label class="base-answer-field"><span>Hexadécimal 16 bits</span><input data-answer="FFFE|0XFFFE"></label>
      <label class="base-answer-field"><span>Valeur non signée</span><input inputmode="numeric" data-answer="65534"></label>
      <label class="base-answer-field"><span>Valeur signée</span><input inputmode="numeric" data-answer="-2"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier la synthèse</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Expliquez la démarche.</strong><small>Dans vos notes, expliquez pourquoi la largeur, le type signé et le boutisme sont tous nécessaires pour obtenir <code>-2</code>.</small></span></label>
</div>
</section>


<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Évaluer une source technique : encodage UTF-8</h2>
<p><strong>Sujet imposé :</strong> trouvez une source technique faisant autorité qui donne le point de code Unicode et l'encodage UTF-8 du caractère <code>€</code>.</p>
<p>Dans votre compte rendu, répondez aux cinq consignes suivantes. <strong>Chaque réponse doit compter au plus deux phrases.</strong></p>
<ol>
  <li><strong>Source et éditeur :</strong> donnez le titre, l'organisation qui publie le document et le lien direct.</li>
  <li><strong>Pertinence :</strong> expliquez pourquoi cette source convient pour vérifier Unicode ou UTF-8.</li>
  <li><strong>Spécification :</strong> relevez le point de code et la séquence exacte d'octets UTF-8, en hexadécimal.</li>
  <li><strong>Vérification :</strong> confirmez la séquence avec une deuxième source ou avec la structure UTF-8 étudiée pendant la séance.</li>
  <li><strong>Nature des énoncés :</strong> formulez et étiquetez clairement un fait et une inférence, puis soit une recommandation pratique concernant l'encodage de ce caractère, soit une explication indiquant pourquoi aucune recommandation n'est justifiée par les preuves recueillies.</li>
</ol>
<div class="lab-tasks">
  <label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Conservez les cinq réponses dans votre compte rendu.</strong><small>La case confirme que chaque réponse respecte la limite de deux phrases et que les liens permettent de retrouver les sources.</small></span></label>
</div>
</section>

<section class="lab-stage required-self-study">
<h2>Autoformation obligatoire : IEEE 754 simple précision</h2>
<div class="admonition danger"><p class="admonition-title">IMPORTANT — préparation à l'examen</p><p>IEEE 754 peut être évalué à l'examen final. Terminez les six tâches ci-dessous avant la séance de révision. La portée exigée est limitée aux valeurs finies, normalisées et de simple précision.</p></div>
<div class="lab-progress self-study-progress">
  <p data-self-study-progress-text aria-live="polite">0 sur 6 tâches d'autoformation terminées</p>
  <progress data-self-study-progress value="0" max="6">0 sur 6</progress>
</div>
</section>

<section class="lab-stage required-self-study" data-self-study-stage>
<h3>Fractions binaires</h3>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check data-auto-task disabled>
    <span><strong>Reliez les positions fractionnaires aux valeurs décimales.</strong><small>Montrez les puissances négatives de deux utilisées.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les deux conversions fractionnaires sont correctes." data-incomplete-message="Remplissez les trois champs." data-retry-message="Une contribution ou une conversion est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Contributions de <code>11.011</code></span><input data-answer="2;1;0.25;0.125|2;1;0,25;0,125" placeholder="séparées par des points-virgules"></label>
      <label class="base-answer-field"><span><code>11.011</code> en base 10</span><input data-answer="3.375|3,375"></label>
      <label class="base-answer-field"><span><code>0.375</code> en binaire</span><input data-answer="0.011|.011"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les fractions</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage required-self-study" data-self-study-stage>
<h3>Construire un IEEE 754 simple précision</h3>
<p>Construisez la représentation de <code>-10.5</code>. Chaque champ doit être rempli avant la vérification.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check data-auto-task disabled>
    <span><strong>Encodez toutes les étapes jusqu'à l'hexadécimal.</strong><small>Conservez une ligne distincte pour le signe, la normalisation, l'exposant et la fraction.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="La représentation IEEE 754 complète est correcte." data-incomplete-message="Remplissez tous les champs IEEE 754." data-retry-message="Un ou plusieurs champs IEEE 754 sont à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Bit de signe</span><input inputmode="numeric" maxlength="1" data-answer="1"></label>
      <label class="base-answer-field"><span>Partie entière en binaire</span><input inputmode="numeric" data-answer="1010"></label>
      <label class="base-answer-field"><span>Partie fractionnaire</span><input data-answer="0.1|.1"></label>
      <label class="base-answer-field"><span>Valeur binaire réunie</span><input data-answer="1010.1"></label>
      <label class="base-answer-field"><span>Forme normalisée</span><input data-answer="1.0101X2^3|1.0101*2^3" placeholder="1.F x 2^e"></label>
      <label class="base-answer-field"><span>Exposant réel</span><input inputmode="numeric" data-answer="3"></label>
      <label class="base-answer-field"><span>Exposant décalé en base 10</span><input inputmode="numeric" data-answer="130"></label>
      <label class="base-answer-field"><span>Exposant sur 8 bits</span><input inputmode="numeric" maxlength="8" data-answer="10000010"></label>
      <label class="base-answer-field"><span>Fraction sur 23 bits</span><input inputmode="numeric" maxlength="23" data-answer="01010000000000000000000"></label>
      <label class="base-answer-field"><span>Assemblage sur 32 bits</span><input inputmode="numeric" maxlength="32" data-answer="11000001001010000000000000000000"></label>
      <label class="base-answer-field"><span>Réponse hexadécimale</span><input data-answer="C1280000|0XC1280000"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les 32 bits</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
</div>
</section>

<section class="lab-stage required-self-study" data-self-study-stage>
<h3>Décoder un IEEE 754 simple précision</h3>
<p>Décodez <code>0x40D00000</code> sans utiliser un convertisseur avant la vérification.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check data-auto-task disabled>
    <span><strong>Séparez les champs et reconstruisez la valeur décimale.</strong><small>Replacez le 1 implicite avant d'appliquer l'exposant.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Le décodage IEEE 754 complet est correct." data-incomplete-message="Remplissez tous les champs de décodage." data-retry-message="Un ou plusieurs champs du décodage sont à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>32 bits</span><input inputmode="numeric" maxlength="32" data-answer="01000000110100000000000000000000"></label>
      <label class="base-answer-field"><span>Bit de signe</span><input inputmode="numeric" maxlength="1" data-answer="0"></label>
      <label class="base-answer-field"><span>Bits d'exposant</span><input inputmode="numeric" maxlength="8" data-answer="10000001"></label>
      <label class="base-answer-field"><span>Exposant stocké</span><input inputmode="numeric" data-answer="129"></label>
      <label class="base-answer-field"><span>Exposant réel</span><input inputmode="numeric" data-answer="2"></label>
      <label class="base-answer-field"><span>Bits de fraction</span><input inputmode="numeric" maxlength="23" data-answer="10100000000000000000000"></label>
      <label class="base-answer-field"><span>Significande</span><input data-answer="1.101"></label>
      <label class="base-answer-field"><span>Après application de 2^2</span><input data-answer="110.1"></label>
      <label class="base-answer-field"><span>Valeur décimale</span><input data-answer="6.5|6,5"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier le décodage</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check>
    <span><strong>Expliquez l'approximation.</strong><small>Dans vos notes, expliquez pourquoi une fraction binaire répétitive doit être arrondie dans un champ de 23 bits et pourquoi la valeur reconstruite peut différer légèrement de l'entrée décimale.</small></span>
  </label>
</div>
</section>

<section class="lab-stage required-self-study" data-self-study-stage>
<h3>IEEE 754 et boutisme : vérification intégrée</h3>
<p><strong>Consolidation.</strong> Cette nouvelle valeur combine le boutisme et IEEE 754 sans reprendre un exemple résolu dans la séance.</p>
<p>Quatre octets consécutifs sont présentés dans cet ordre : <code>00 00 50 C0</code>. Ils contiennent un réel IEEE 754 de 32 bits en petit-boutiste.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check data-auto-task disabled>
    <span><strong>Reconstituez puis interprétez la valeur.</strong><small>Réordonnez les octets avant de séparer les champs IEEE 754.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="La valeur multi-octet est correctement reconstruite et interprétée." data-incomplete-message="Remplissez les quatre étapes." data-retry-message="Le réordonnancement ou le décodage est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Octets dans l'ordre logique</span><input data-answer="C0,50,00,00|C0;50;00;00|C0500000"></label>
      <label class="base-answer-field"><span>Hexadécimal 32 bits</span><input data-answer="C0500000|0XC0500000"></label>
      <label class="base-answer-field"><span>Binaire 32 bits</span><input inputmode="numeric" maxlength="32" data-answer="11000000010100000000000000000000"></label>
      <label class="base-answer-field"><span>Valeur décimale</span><input data-answer="-3.25|-3,25"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier l'interprétation</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>

  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-self-study-task-check>
    <span><strong>Concluez votre compte rendu.</strong><small>Expliquez pourquoi les quatre octets ne suffisent pas à déterminer leur sens sans connaître le type et le boutisme. Nommez ensuite la vérification qui vous semble la plus utile pour éviter une erreur.</small></span>
  </label>
</div>
</section>

<section class="lab-stage required-self-study">
<h3>Générateur de pratique IEEE 754</h3>
<p>Générez autant de problèmes que nécessaire. Chaque question exige les étapes propres à sa représentation; le générateur indique les champs à revoir sans afficher la solution. Cette pratique ne modifie pas la progression des tâches principales.</p>

<div class="practice-generator" data-internal-practice data-lang="fr">
  <div class="practice-controls">
    <label class="base-answer-field">
      <span>Type de conversion</span>
      <select data-ir-mode>
        <option value="mixed">Mélange de toutes les catégories</option>
        <option value="unsigned">Décoder un entier non signé</option>
        <option value="signed-decode">Décoder un entier signé</option>
        <option value="signed-encode">Encoder un entier signé</option>
        <option value="fraction">Fraction binaire vers base 10</option>
        <option value="ieee-encode">Construire un IEEE 754</option>
        <option value="ieee-decode">Décoder un IEEE 754</option>
        <option value="ascii">ASCII et UTF-8 compatible</option>
        <option value="endian">Boutisme</option>
      </select>
    </label>
    <label class="base-answer-field">
      <span>Niveau</span>
      <select data-ir-level>
        <option value="core" selected>Fondamental</option>
        <option value="extended">Étendu</option>
      </select>
    </label>
    <button class="lab-button secondary" type="button" data-ir-new>Nouvelle question</button>
  </div>

  <p class="practice-question" data-ir-question aria-live="polite"></p>
  <div class="base-answer-grid" data-ir-fields></div>
  <div class="base-exercise-actions">
    <button class="lab-button" type="button" data-ir-check>Vérifier la démarche</button>
    <p class="base-feedback" data-ir-feedback aria-live="polite"></p>
  </div>
  <p class="practice-stats" data-ir-stats>Problèmes réussis : 0</p>
</div>
<noscript>
  <div class="lab-no-js-practice">
    <h3>Pratique manuelle de remplacement</h3>
    <p>Indiquez la largeur, le type, l'encodage ou l'ordre des octets applicable, puis montrez chaque étape.</p>
    <ol>
      <li>Interprétez <code>11010110</code> comme entier non signé sur huit bits.</li>
      <li>Interprétez les mêmes bits comme entier signé en complément à deux.</li>
      <li>Encodez <code>-37</code> comme entier signé sur huit bits.</li>
      <li>Convertissez <code>101.011</code><sub>2</sub> vers la base 10.</li>
      <li>Construisez la représentation IEEE 754 simple précision de <code>10,5</code>.</li>
      <li>Décodez l'octet ASCII/UTF-8 <code>0x47</code>.</li>
      <li>Les octets <code>78 56 34 12</code> contiennent un entier non signé de 32 bits en petit-boutiste. Reconstruisez sa valeur hexadécimale logique.</li>
    </ol>
    <details><summary>Vérifier les résultats après avoir terminé</summary><ol><li><code>214</code></li><li><code>-42</code></li><li><code>11011011</code></li><li><code>5,375</code></li><li><code>0 10000010 01010000000000000000000</code>, soit <code>0x41280000</code></li><li><code>G</code></li><li><code>0x12345678</code></li></ol></details>
  </div>
</noscript>
</section>

<section class="lab-stage required-self-study lab-optional">
<h3>Défis supplémentaires</h3>
<ul>
  <li>Construisez la représentation IEEE 754 simple précision de `6.5`, puis vérifiez-la avec un outil après avoir terminé les huit étapes.</li>
  <li>Décodez une deuxième valeur IEEE 754 fournie par l'enseignant et comparez les deux méthodes de calcul de la significande.</li>
  <li>Déterminez le nombre d'octets UTF-8 nécessaires pour le mot `Café`, puis expliquez pourquoi il diffère du nombre de caractères.</li>
  <li>Inventez une valeur de 32 bits dont l'ordre petit-boutiste est visuellement très différent de l'ordre gros-boutiste, puis échangez-la avec une autre personne.</li>
</ul>
</section>
</div>
</div>

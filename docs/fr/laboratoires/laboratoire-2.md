# Laboratoire 2 - Représenter une valeur en bases 2, 10 et 16

[Retour à la Séance 2](../seances/seance-2.md)

## But du laboratoire

Ce laboratoire vous permet de pratiquer les conversions entre les bases 2, 10 et 16. Vous commencerez par reconnaître les symboles et les positions, puis vous effectuerez des conversions complètes et vérifierez qu'une même valeur est conservée sous trois représentations.

Le travail est individuel. Vous pouvez comparer une méthode avec une autre personne, mais vous devez effectuer vos propres calculs et conserver votre propre démarche.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- reconnaître une écriture valide dans une base donnée;
- développer un nombre à l'aide des puissances de sa base;
- convertir un entier binaire ou hexadécimal vers la base 10;
- convertir un entier décimal vers la base 2 par décomposition en puissances de deux;
- convertir directement entre les bases 2 et 16 par groupes de quatre bits;
- conserver correctement les zéros de position et respecter une largeur imposée;
- vérifier une conversion par une deuxième méthode et expliquer une erreur;
- évaluer brièvement une source technique qui emploie la notation hexadécimale.

!!! warning "La liste de vérification n'est pas votre compte rendu"
    Les cases cochées sont mémorisées seulement dans ce navigateur. Pour chaque tâche, inscrivez vos tableaux, calculs, regroupements, réponses et explications dans un cahier ou dans un document numérique que vous contrôlez.

<div
  class="lab-checklist"
  data-lab-checklist
  data-lab-id="c12-lab-2-fr-v4"
  data-gate-template="{done} sur {total} engagements reconnus"
  data-progress-template="{done} sur {total} tâches terminées"
  data-reset-confirm="Effacer la progression de cette liste de vérification sur ce navigateur?"
>
  <section class="lab-gate" aria-labelledby="lab-2-gate-title">
    <h2 id="lab-2-gate-title">Entente de travail</h2>
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
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Effectuez les conversions demandées vous-même avant d'utiliser la correction automatique; conservez la largeur, les zéros positionnels, la démarche et les unités dans vos notes.</p></div>

  <noscript>
    <div class="lab-no-js-note"><strong>Mode sans JavaScript</strong><p>Cochez chaque engagement pour révéler le laboratoire. Les consignes et les champs restent utilisables, mais la correction automatique, la progression enregistrée et les indices interactifs ne sont pas disponibles. Une série de pratique manuelle remplace le générateur.</p></div>
  </noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress">
<p data-lab-progress-text aria-live="polite">0 sur 22 tâches terminées</p>
<button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button>
<progress data-lab-progress value="0" max="22">0 sur 22</progress>
</div>

<details class="lab-guide">
<summary>Guide : présenter une conversion vérifiable</summary>
<div class="lab-guide-body">
  <ol>
    <li>Écrivez la valeur de départ et sa base.</li>
    <li>Nommez la méthode choisie : développement positionnel, puissances de deux ou regroupement par quatre.</li>
    <li>Montrez les étapes intermédiaires dans leur ordre.</li>
    <li>Écrivez la réponse et sa base.</li>
    <li>Vérifiez que la valeur, l'ordre de grandeur et le nombre de positions sont plausibles.</li>
  </ol>
</div>
</details>

<div class="lab-admin-note">
<strong>Parcours essentiel et consolidation</strong>
<p>Pendant le laboratoire, suivez le parcours de « Préparer vos notes » jusqu'à « Relier trois représentations », puis terminez par « Synthèse ». La section « Diagnostiquer des erreurs » sert de consolidation : faites-la lorsque le parcours essentiel est terminé ou poursuivez-la après la séance. La progression conserve les deux niveaux de travail.</p>
</div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer vos notes</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Créez votre compte rendu personnel.</strong><small>Inscrivez « Laboratoire 2 », la date et trois colonnes intitulées « base 2 », « base 10 » et « base 16 ». Vous utiliserez ces colonnes pour comparer les représentations.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Reconnaître les écritures</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Classez les écritures valides.</strong><small>Pour chacune des écritures suivantes, indiquez si elle est valide dans la base donnée et justifiez toute réponse « invalide » : <code>101011</code><sub>2</sub>, <code>2101</code><sub>2</sub>, <code>708</code><sub>10</sub>, <code>12A</code><sub>10</sub>, <code>7E0</code><sub>16</sub> et <code>FACE</code><sub>16</sub>.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Toutes les classifications sont correctes." data-incomplete-message="Choisissez une réponse dans chaque champ." data-retry-message="Certaines classifications sont à revoir.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span><code>101011</code><sub>2</sub></span><select data-answer="VALIDE"><option value="">Choisir</option><option>Valide</option><option>Invalide</option></select></label>
      <label class="base-answer-field"><span><code>2101</code><sub>2</sub></span><select data-answer="INVALIDE"><option value="">Choisir</option><option>Valide</option><option>Invalide</option></select></label>
      <label class="base-answer-field"><span><code>708</code><sub>10</sub></span><select data-answer="VALIDE"><option value="">Choisir</option><option>Valide</option><option>Invalide</option></select></label>
      <label class="base-answer-field"><span><code>12A</code><sub>10</sub></span><select data-answer="INVALIDE"><option value="">Choisir</option><option>Valide</option><option>Invalide</option></select></label>
      <label class="base-answer-field"><span><code>7E0</code><sub>16</sub></span><select data-answer="VALIDE"><option value="">Choisir</option><option>Valide</option><option>Invalide</option></select></label>
      <label class="base-answer-field"><span><code>FACE</code><sub>16</sub></span><select data-answer="VALIDE"><option value="">Choisir</option><option>Valide</option><option>Invalide</option></select></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les classifications</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
    <small class="base-auto-note">Cette tâche est cochée automatiquement lorsque tous les champs sont corrects.</small>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Réparez deux écritures invalides.</strong><small>Choisissez deux cas invalides de la tâche précédente. Modifiez un seul symbole dans chacun pour produire une écriture valide dans la même base. Il n'est pas nécessaire de conserver la valeur d'origine, puisqu'elle n'était pas définie dans cette base.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Utiliser les valeurs de position</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Construisez un tableau de huit positions binaires.</strong><small>De gauche à droite, inscrivez les puissances de 2 de l'exposant 7 à l'exposant 0, puis leur valeur décimale. Vérifiez que la dernière colonne vaut 1.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Convertissez <code>110101</code><sub>2</sub> vers la base 10.</strong><small>Alignez les bits avec les bonnes puissances, écrivez chaque multiplication, puis additionnez les contributions. Ne conservez pas seulement les positions contenant 1 dans votre première ligne.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Le développement binaire et le total sont corrects." data-incomplete-message="Remplissez toutes les positions, contributions et le total." data-retry-message="Certaines positions ou contributions sont à revoir.">
    <p>Complétez chaque colonne avant de demander la vérification.</p>
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Valeur sous le bit 1</span><input inputmode="numeric" data-answer="32"></label>
      <label class="base-answer-field"><span>Valeur sous le bit 1</span><input inputmode="numeric" data-answer="16"></label>
      <label class="base-answer-field"><span>Valeur sous le bit 0</span><input inputmode="numeric" data-answer="8"></label>
      <label class="base-answer-field"><span>Valeur sous le bit 1</span><input inputmode="numeric" data-answer="4"></label>
      <label class="base-answer-field"><span>Valeur sous le bit 0</span><input inputmode="numeric" data-answer="2"></label>
      <label class="base-answer-field"><span>Valeur sous le bit 1</span><input inputmode="numeric" data-answer="1"></label>
    </div>
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span>Contribution 1</span><input inputmode="numeric" data-answer="32"></label>
      <label class="base-answer-field"><span>Contribution 2</span><input inputmode="numeric" data-answer="16"></label>
      <label class="base-answer-field"><span>Contribution 3</span><input inputmode="numeric" data-answer="0"></label>
      <label class="base-answer-field"><span>Contribution 4</span><input inputmode="numeric" data-answer="4"></label>
      <label class="base-answer-field"><span>Contribution 5</span><input inputmode="numeric" data-answer="0"></label>
      <label class="base-answer-field"><span>Contribution 6</span><input inputmode="numeric" data-answer="1"></label>
      <label class="base-answer-field"><span>Total en base 10</span><input inputmode="numeric" data-answer="53"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier le développement</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Convertissez <code>4C7</code><sub>16</sub> vers la base 10.</strong><small>Écrivez d'abord la valeur décimale de chaque chiffre hexadécimal, puis utilisez les puissances de 16 associées aux trois positions.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Le développement hexadécimal et le total sont corrects." data-incomplete-message="Remplissez toutes les valeurs, contributions et le total." data-retry-message="Certains chiffres, positions ou produits sont à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Valeurs décimales de <code>4, C, 7</code></span><input data-answer="4,12,7|4;12;7" placeholder="ex. 1, 2, 3"></label>
      <label class="base-answer-field"><span>Valeurs de position</span><input data-answer="256,16,1|256;16;1" placeholder="de gauche à droite"></label>
      <label class="base-answer-field"><span>Contributions</span><input data-answer="1024,192,7|1024;192;7" placeholder="de gauche à droite"></label>
      <label class="base-answer-field"><span>Total en base 10</span><input inputmode="numeric" data-answer="1223"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier le développement</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Vérifiez les ordres de grandeur.</strong><small>Pour chaque réponse précédente, donnez une borne inférieure et une borne supérieure raisonnables à partir de la position la plus à gauche. Expliquez pourquoi votre résultat se situe entre les deux.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Passer directement entre le binaire et l'hexadécimal</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Reconstituez la table d'un groupe de quatre bits.</strong><small>Sans la recopier directement, écrivez les configurations de <code>0000</code> à <code>1111</code> et associez-les aux chiffres hexadécimaux de <code>0</code> à <code>F</code>. Comparez ensuite votre table à celle de la Séance 2.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="La table de quatre bits est complète." data-incomplete-message="Remplissez les seize correspondances." data-retry-message="Au moins une correspondance est à revoir.">
    <div class="base-answer-grid compact">
      <label class="base-answer-field"><span><code>0000</code></span><input inputmode="text" maxlength="1" data-answer="0" aria-label="Hexadécimal pour 0000"></label>
      <label class="base-answer-field"><span><code>0001</code></span><input inputmode="text" maxlength="1" data-answer="1" aria-label="Hexadécimal pour 0001"></label>
      <label class="base-answer-field"><span><code>0010</code></span><input inputmode="text" maxlength="1" data-answer="2" aria-label="Hexadécimal pour 0010"></label>
      <label class="base-answer-field"><span><code>0011</code></span><input inputmode="text" maxlength="1" data-answer="3" aria-label="Hexadécimal pour 0011"></label>
      <label class="base-answer-field"><span><code>0100</code></span><input inputmode="text" maxlength="1" data-answer="4" aria-label="Hexadécimal pour 0100"></label>
      <label class="base-answer-field"><span><code>0101</code></span><input inputmode="text" maxlength="1" data-answer="5" aria-label="Hexadécimal pour 0101"></label>
      <label class="base-answer-field"><span><code>0110</code></span><input inputmode="text" maxlength="1" data-answer="6" aria-label="Hexadécimal pour 0110"></label>
      <label class="base-answer-field"><span><code>0111</code></span><input inputmode="text" maxlength="1" data-answer="7" aria-label="Hexadécimal pour 0111"></label>
      <label class="base-answer-field"><span><code>1000</code></span><input inputmode="text" maxlength="1" data-answer="8" aria-label="Hexadécimal pour 1000"></label>
      <label class="base-answer-field"><span><code>1001</code></span><input inputmode="text" maxlength="1" data-answer="9" aria-label="Hexadécimal pour 1001"></label>
      <label class="base-answer-field"><span><code>1010</code></span><input inputmode="text" maxlength="1" data-answer="A" aria-label="Hexadécimal pour 1010"></label>
      <label class="base-answer-field"><span><code>1011</code></span><input inputmode="text" maxlength="1" data-answer="B" aria-label="Hexadécimal pour 1011"></label>
      <label class="base-answer-field"><span><code>1100</code></span><input inputmode="text" maxlength="1" data-answer="C" aria-label="Hexadécimal pour 1100"></label>
      <label class="base-answer-field"><span><code>1101</code></span><input inputmode="text" maxlength="1" data-answer="D" aria-label="Hexadécimal pour 1101"></label>
      <label class="base-answer-field"><span><code>1110</code></span><input inputmode="text" maxlength="1" data-answer="E" aria-label="Hexadécimal pour 1110"></label>
      <label class="base-answer-field"><span><code>1111</code></span><input inputmode="text" maxlength="1" data-answer="F" aria-label="Hexadécimal pour 1111"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier la table</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
    <small class="base-auto-note">Cette tâche est cochée automatiquement lorsque les seize correspondances sont correctes.</small>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Convertissez <code>101111000101</code><sub>2</sub> vers la base 16.</strong><small>Séparez les bits en groupes de quatre à partir de la droite, montrez les groupes et remplacez chacun par un chiffre hexadécimal.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les groupes et la représentation hexadécimale sont corrects." data-incomplete-message="Remplissez les groupes, les chiffres et la réponse finale." data-retry-message="Au moins un groupe ou chiffre est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Groupes binaires</span><input data-answer="1011,1100,0101|1011;1100;0101" placeholder="de gauche à droite"></label>
      <label class="base-answer-field"><span>Chiffres hexadécimaux</span><input data-answer="B,C,5|B;C;5" placeholder="de gauche à droite"></label>
      <label class="base-answer-field"><span>Réponse finale</span><input data-answer="BC5|0XBC5"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les groupes</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Convertissez <code>A05</code><sub>16</sub> vers la base 2.</strong><small>Remplacez chaque chiffre par exactement quatre bits. Conservez le groupe correspondant au zéro du milieu.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les trois groupes et la représentation binaire sont corrects." data-incomplete-message="Remplissez les groupes et la réponse finale." data-retry-message="Au moins un groupe binaire est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Groupe pour <code>A</code></span><input inputmode="numeric" maxlength="4" data-answer="1010"></label>
      <label class="base-answer-field"><span>Groupe pour <code>0</code></span><input inputmode="numeric" maxlength="4" data-answer="0000"></label>
      <label class="base-answer-field"><span>Groupe pour <code>5</code></span><input inputmode="numeric" maxlength="4" data-answer="0101"></label>
      <label class="base-answer-field"><span>Réponse finale</span><input inputmode="numeric" data-answer="101000000101|1010,0000,0101"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les groupes</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Expliquez le rôle des zéros.</strong><small>Dans vos propres mots, expliquez pourquoi on peut ajouter des zéros complètement à gauche d'un entier, mais pas retirer un groupe <code>0000</code> placé entre deux autres groupes.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Construire une représentation binaire</h2>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Représentez <code>45</code><sub>10</sub> en binaire.</strong><small>Utilisez la méthode des puissances de deux. Montrez chaque puissance examinée et chaque reste, puis écrivez la représentation minimale et la représentation sur huit bits.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="La décomposition de 45 et ses représentations sont correctes." data-incomplete-message="Remplissez les puissances, les restes et les représentations." data-retry-message="La décomposition ou une représentation est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Puissances sélectionnées</span><input data-answer="32,8,4,1|32;8;4;1" placeholder="de la plus grande à la plus petite"></label>
      <label class="base-answer-field"><span>Restes après soustraction</span><input data-answer="13,5,1,0|13;5;1;0" placeholder="dans l'ordre"></label>
      <label class="base-answer-field"><span>Binaire minimal</span><input inputmode="numeric" data-answer="101101"></label>
      <label class="base-answer-field"><span>Binaire sur 8 bits</span><input inputmode="numeric" maxlength="8" data-answer="00101101"></label>
      <label class="base-answer-field"><span>Hexadécimal</span><input data-answer="2D|0X2D"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier la construction</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Représentez <code>157</code><sub>10</sub> en binaire sur huit bits.</strong><small>Commencez par prédire le bit situé complètement à gauche. Effectuez ensuite les soustractions et conservez un zéro pour chaque puissance ignorée.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="La décomposition de 157 et ses représentations sont correctes." data-incomplete-message="Remplissez les puissances, les restes et les représentations." data-retry-message="La décomposition ou une représentation est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Puissances sélectionnées</span><input data-answer="128,16,8,4,1|128;16;8;4;1" placeholder="de la plus grande à la plus petite"></label>
      <label class="base-answer-field"><span>Restes après soustraction</span><input data-answer="29,13,5,1,0|29;13;5;1;0" placeholder="dans l'ordre"></label>
      <label class="base-answer-field"><span>Binaire sur 8 bits</span><input inputmode="numeric" maxlength="8" data-answer="10011101"></label>
      <label class="base-answer-field"><span>Hexadécimal</span><input data-answer="9D|0X9D"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier la construction</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Produisez et vérifiez les formes hexadécimales.</strong><small>Regroupez chacune des deux réponses binaires en groupes de quatre. Vérifiez ensuite les valeurs hexadécimales obtenues par un développement en puissances de 16.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Relier trois représentations</h2>
<p>Dans cette section, les trois tâches portent sur une nouvelle valeur, <code>0xB6</code>. Gardez toutes les étapes côte à côte dans vos notes sans recopier la vérification intégrée de la Séance 2.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check data-auto-task disabled>
    <span><strong>Produisez la représentation binaire sur huit bits.</strong><small>Traitez séparément les chiffres <code>B</code> et <code>6</code>, puis réunissez les deux groupes de quatre bits.</small></span>
  </label>
  <div class="base-exercise" data-base-exercise data-correct-message="Les trois représentations de 0xB6 concordent." data-incomplete-message="Remplissez les deux groupes, la représentation et les deux totaux." data-retry-message="Au moins une étape de la vérification croisée est à revoir.">
    <div class="base-answer-grid">
      <label class="base-answer-field"><span>Groupe pour <code>B</code></span><input inputmode="numeric" maxlength="4" data-answer="1011"></label>
      <label class="base-answer-field"><span>Groupe pour <code>6</code></span><input inputmode="numeric" maxlength="4" data-answer="0110"></label>
      <label class="base-answer-field"><span>Représentation sur 8 bits</span><input inputmode="numeric" maxlength="8" data-answer="10110110"></label>
      <label class="base-answer-field"><span>Total par puissances de 2</span><input inputmode="numeric" data-answer="182"></label>
      <label class="base-answer-field"><span>Total par puissances de 16</span><input inputmode="numeric" data-answer="182"></label>
    </div>
    <div class="base-exercise-actions"><button class="lab-button" type="button" data-check-answers>Vérifier les trois formes</button><p class="base-feedback" data-answer-feedback aria-live="polite"></p></div>
    <small class="base-auto-note">Les deux tâches de calcul suivantes servent à documenter séparément les deux démarches dans vos notes.</small>
  </div>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Calculez la valeur décimale à partir du binaire.</strong><small>Développez les huit positions avec des puissances de deux et additionnez les contributions.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Vérifiez directement à partir de l'hexadécimal.</strong><small>Développez <code>B6</code><sub>16</sub> avec des puissances de seize, puis expliquez pourquoi l'égalité des deux résultats constitue une vérification utile.</small></span>
  </label>
</div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Diagnostiquer des erreurs</h2>
<p><strong>Consolidation.</strong> Ces problèmes demandent de repérer et d'expliquer une erreur plutôt que d'exécuter seulement une conversion.</p>
<div class="lab-tasks">
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Corrigez un regroupement commencé du mauvais côté.</strong><small>Une personne a écrit <code>1011 0100</code><sub>2</sub> pour convertir <code>101101</code><sub>2</sub>. Indiquez où les zéros ont été ajoutés, expliquez l'erreur, puis recommencez le regroupement correctement à partir de la droite.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Corrigez la disparition d'une position.</strong><small>Une personne affirme que <code>A05</code><sub>16</sub> et <code>A5</code><sub>16</sub> ont la même valeur parce que le zéro ne contribue pas. Développez les deux nombres avec des puissances de 16 et expliquez ce que le zéro préserve.</small></span>
  </label>
</div>
</section>

<section class="lab-stage source-evaluation-stage" data-lab-stage>
<h2>Évaluer une source technique : notation hexadécimale</h2>
<p><strong>Sujet imposé :</strong> trouvez une documentation technique officielle qui emploie une valeur hexadécimale pour représenter un identifiant, une adresse, un masque, une couleur ou une valeur machine.</p>
<p>Dans votre compte rendu, répondez aux cinq consignes suivantes. <strong>Chaque réponse doit compter au plus deux phrases.</strong></p>
<ol>
  <li><strong>Source et éditeur :</strong> donnez le titre, l'organisation qui publie le document et le lien direct.</li>
  <li><strong>Pertinence :</strong> expliquez pourquoi cette documentation convient pour établir la signification de la valeur choisie.</li>
  <li><strong>Spécification :</strong> relevez la valeur hexadécimale exacte, sa largeur ou son contexte, et ce qu'elle représente.</li>
  <li><strong>Vérification :</strong> confirmez-la avec une deuxième source ou en la convertissant en binaire ou en décimal selon la méthode de la séance.</li>
  <li><strong>Nature des énoncés :</strong> formulez et étiquetez clairement un fait et une inférence, puis soit une recommandation pratique sur l'emploi de cette notation, soit une explication indiquant pourquoi aucune recommandation n'est justifiée par les preuves recueillies.</li>
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
    <span><strong>Créez votre aide-mémoire des méthodes.</strong><small>Pour chacun des six sens de conversion entre les bases 2, 10 et 16, écrivez le nom de la méthode principale et une erreur précise à vérifier.</small></span>
  </label>
  <label class="lab-task">
    <input type="checkbox" data-lab-task-check>
    <span><strong>Faites votre bilan.</strong><small>Nommez la conversion qui vous demande encore le plus d'attention et décrivez une vérification que vous utiliserez la prochaine fois. Comparez ensuite quelques résultats avec la calculatrice en mode Programmeur sans effacer votre démarche.</small></span>
  </label>
</div>
</section>

<section class="lab-stage">
<h2>Générateur de pratique illimitée</h2>
<p>Générez autant de problèmes que nécessaire. Chaque problème exige une démarche adaptée au sens de conversion; le générateur vérifie les champs sans afficher la solution. Une nouvelle question ne modifie pas la progression des tâches principales.</p>

<div class="practice-generator" data-practice-generator data-lang="fr">
  <div class="practice-controls">
    <label class="base-answer-field">
      <span>Type de conversion</span>
      <select data-practice-mode>
        <option value="mixed">Mélange des six directions</option>
        <option value="b2d">Base 2 vers base 10</option>
        <option value="h2d">Base 16 vers base 10</option>
        <option value="d2b">Base 10 vers base 2</option>
        <option value="b2h">Base 2 vers base 16</option>
        <option value="h2b">Base 16 vers base 2</option>
        <option value="d2h">Base 10 vers base 16</option>
      </select>
    </label>
    <label class="base-answer-field">
      <span>Étendue des valeurs</span>
      <select data-practice-difficulty>
        <option value="small">Petites : 1 à 63</option>
        <option value="medium" selected>Moyennes : 1 à 255</option>
        <option value="large">Grandes : 1 à 4 095</option>
      </select>
    </label>
    <button class="lab-button secondary" type="button" data-new-practice>Nouvelle question</button>
  </div>

  <p class="practice-question" data-practice-question aria-live="polite"></p>
  <div class="base-answer-grid" data-practice-fields></div>
  <div class="base-exercise-actions">
    <button class="lab-button" type="button" data-check-practice>Vérifier la démarche</button>
    <p class="base-feedback" data-practice-feedback aria-live="polite"></p>
  </div>
  <p class="practice-stats" data-practice-stats>Problèmes réussis : 0</p>
</div>
<noscript>
  <div class="lab-no-js-practice">
    <h3>Pratique manuelle de remplacement</h3>
    <p>Montrez la démarche et la base de chaque réponse dans votre compte rendu.</p>
    <ol>
      <li>Convertissez <code>10110110</code><sub>2</sub> vers la base 10.</li>
      <li>Convertissez <code>3A7</code><sub>16</sub> vers la base 10.</li>
      <li>Convertissez <code>173</code><sub>10</sub> vers la base 2.</li>
      <li>Convertissez <code>110101101011</code><sub>2</sub> vers la base 16.</li>
      <li>Convertissez <code>202</code><sub>10</sub> vers la base 16 en passant par le binaire.</li>
    </ol>
    <details><summary>Vérifier les résultats après avoir terminé</summary><ol><li><code>182</code><sub>10</sub></li><li><code>935</code><sub>10</sub></li><li><code>10101101</code><sub>2</sub></li><li><code>D6B</code><sub>16</sub></li><li><code>11001010</code><sub>2</sub>, donc <code>CA</code><sub>16</sub></li></ol></details>
  </div>
</noscript>
</section>

<section class="lab-stage lab-optional">
<h2>Pratique facultative : défis supplémentaires</h2>
<p>Lorsque toutes les tâches principales sont terminées, choisissez un ou plusieurs défis.</p>
<ul>
  <li>Convertissez <code>C0FFEE</code><sub>16</sub> en binaire sans passer par la base 10. Prédisez d'abord le nombre de bits que contiendra la réponse.</li>
  <li>Trouvez la plus petite largeur en bits nécessaire pour représenter <code>1000</code><sub>10</sub>, puis donnez sa représentation binaire et hexadécimale.</li>
  <li>Inventez une conversion erronée qui contient exactement une erreur de position ou de regroupement. Échangez seulement la démarche avec une autre personne et demandez-lui de diagnostiquer l'erreur.</li>
  <li>Expliquez pourquoi un chiffre hexadécimal représente quatre bits, alors qu'un symbole d'une base 32 pourrait représenter cinq bits.</li>
</ul>
</section>
</div>
</div>

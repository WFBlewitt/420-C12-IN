# Laboratoire 8 - Concevoir une plateforme PC compatible sous contrainte budgétaire

[Retour à la Séance 8](../seances/seance-8.md)

## But du laboratoire

Vous disposez d'un budget pédagogique de **2 000 $ CA avant taxes** pour compléter une plateforme fondée sur une carte mère fictive réaliste. Vous devez sélectionner un processeur, de la mémoire, une carte graphique, un stockage principal, un boîtier, un refroidisseur, un bloc d'alimentation et une solution Wi-Fi.

La carte mère Atlas B860M Creator est un composant imposé dont le coût est traité séparément. Le budget de 2 000 $ couvre uniquement les huit composants à sélectionner.

Plusieurs configurations peuvent être valides. Votre objectif n'est donc pas seulement de produire une machine qui démarre, mais de recommander la **meilleure configuration défendable pour le client**, en distinguant compatibilité, budget, équilibre des composants et possibilité d'évolution.

!!! info "Prix et produits pédagogiques"
    Les produits, modèles, prix et évaluations de **MeilleurAchat** sont fictifs et figés pour l'activité. Ils ne représentent pas des produits ou des prix de vente actuels.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- extraire les contraintes pertinentes d'une fiche de carte mère;
- consulter un catalogue technique secondaire et relever les preuves nécessaires;
- éliminer des composants incompatibles à partir du socket, du format, de l'interface, des dimensions et de l'alimentation;
- construire plusieurs configurations valides dans un budget imposé;
- distinguer la qualité d'un produit de sa pertinence pour un mandat particulier;
- évaluer une source officielle en distinguant fait, inférence et recommandation;
- mettre à jour le cahier des charges évolutif en tenant compte du cycle de vie;
- justifier une recommandation selon les besoins du client;
- conserver une trace permanente des décisions, preuves et compromis.

!!! warning "La progression n'est pas votre compte rendu"
    Les choix interactifs sont conservés seulement dans ce navigateur. Conservez votre configuration finale, vos calculs, les pages du catalogue consultées et votre justification dans un document que vous contrôlez.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-8-fr-v4" data-gate-template="{done} sur {total} engagements reconnus" data-progress-template="{done} sur {total} tâches terminées" data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?">
<section class="lab-gate" aria-labelledby="lab-8-gate-title">
<h2 id="lab-8-gate-title">Entente de travail</h2>
<p>Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Utilisation assignée</strong><small>J'utiliserai le poste de travail, le réseau et les outils du cours uniquement pour les activités d'apprentissage assignées.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Compte rendu permanent</strong><small>Je conserverai mon travail, mes sources, mes commandes, mes calculs et mon raisonnement dans mon compte rendu permanent.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Incertitude signalée</strong><small>Je signalerai les incertitudes, résultats inattendus, erreurs ou préoccupations de sécurité au lieu de les dissimuler.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Accéder au laboratoire</button><span data-lab-gate-status aria-live="polite">0 sur 3 engagements reconnus</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Utilisez uniquement les données pédagogiques fournies pour la sélection et le budget; distinguez une incompatibilité confirmée d'une vérification encore requise.</p></div>

<noscript>
<div class="lab-no-js-note">
<strong>Mode sans JavaScript</strong>
<p>Téléchargez le catalogue MeilleurAchat et utilisez la fiche de la carte mère, le mandat et la feuille de vérification ci-dessous. Le rapport automatique, la note calculée et les calculs pour 50 postes ne seront pas disponibles; vous devez donc conserver vos calculs et appliquer manuellement les règles de décision.</p>
<h3>Feuille de vérification manuelle</h3>
<table>
<thead><tr><th>Catégorie</th><th>Produit choisi</th><th>Prix</th><th>Page du catalogue</th><th>Vérification à effectuer</th><th>Résultat</th></tr></thead>
<tbody>
<tr><td>Processeur</td><td></td><td></td><td></td><td>Socket et condition de micrologiciel</td><td></td></tr>
<tr><td>Mémoire</td><td></td><td></td><td></td><td>DDR5 UDIMM, capacité et modules</td><td></td></tr>
<tr><td>Carte graphique</td><td></td><td></td><td></td><td>Longueur, épaisseur et connecteur d'alimentation</td><td></td></tr>
<tr><td>Stockage</td><td></td><td></td><td></td><td>NVMe, capacité et format M.2</td><td></td></tr>
<tr><td>Boîtier</td><td></td><td></td><td></td><td>microATX et dégagements physiques</td><td></td></tr>
<tr><td>Refroidissement</td><td></td><td></td><td></td><td>LGA1851, dimensions et capacité</td><td></td></tr>
<tr><td>Bloc d'alimentation</td><td></td><td></td><td></td><td>Puissance, format et connecteurs</td><td></td></tr>
<tr><td>Wi-Fi</td><td></td><td></td><td></td><td>Matériel Wi-Fi réellement fourni</td><td></td></tr>
</tbody>
</table>
<p><strong>Total des huit composants :</strong> ______ $</p>
<p><strong>Solde du budget :</strong> 2 000 $ - ______ $ = ______ $</p>
<h3>Décision manuelle</h3>
<ul>
<li><strong>Corrections requises :</strong> au moins un conflit confirmé, une exigence obligatoire non respectée ou un total supérieur à 2 000 $.</li>
<li><strong>Approuvable avec réserves :</strong> aucun conflit confirmé, mais une preuve obligatoire demeure manquante, notamment la version installée du micrologiciel.</li>
<li><strong>Approuvable :</strong> toutes les exigences obligatoires et les preuves de compatibilité sont confirmées, et le budget est respecté.</li>
</ul>
<p>Dans votre compte rendu, inscrivez le statut retenu, les preuves qui le justifient et toute correction ou vérification encore nécessaire. L'évaluation de source de la section 8 exige toujours une page ou un manuel officiel d'un fabricant réel.</p>
</div>
</noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 sur 12 tâches terminées</p><button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button><progress data-lab-progress value="0" max="12">0 sur 12</progress></div>

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer le compte rendu</h2>
<p>Créez les rubriques : <strong>besoins du client</strong>, <strong>contraintes de la carte mère</strong>, <strong>preuves du catalogue</strong>, <strong>composants rejetés</strong>, <strong>configuration finale</strong>, <strong>budget</strong>, <strong>évaluation d'une source</strong>, <strong>cahier des charges et cycle de vie</strong>, <strong>synthèse intégrée</strong> et <strong>contrôle final</strong>.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Préparez le compte rendu.</strong><small>Inscrivez « Laboratoire 8 », la date et les dix rubriques.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Lire le mandat du client</h2>
<p>Le client veut un PC pour le jeu en 1440p et la diffusion en continu. Il possède déjà écran, clavier, souris et licence Windows.</p>
<ul>
<li>budget maximal : <strong>2 000 $ CA avant taxes</strong>;</li>
<li>au moins <strong>32 Go de mémoire</strong>;</li>
<li>au moins <strong>2 To de stockage NVMe</strong>;</li>
<li>connexion <strong>Wi-Fi</strong> obligatoire;</li>
<li>priorité : performance de jeu, stabilité et mise à niveau réaliste;</li>
<li>l'apparence n'est pas une priorité.</li>
</ul>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Transformez le mandat en critères.</strong><small>Notez quatre exigences obligatoires et deux critères permettant de départager plusieurs configurations valides.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Lire la fiche de la carte mère</h2>
<h3>Atlas B860M Creator</h3>
<table><thead><tr><th>Élément</th><th>Spécification</th></tr></thead><tbody>
<tr><td>Format</td><td>microATX, 244 x 244 mm</td></tr>
<tr><td>Socket / chipset</td><td>Intel LGA1851 / B860</td></tr>
<tr><td>Processeurs</td><td>Intel Core Ultra de bureau LGA1851; Core Ultra 7 265K pris en charge à partir du micrologiciel 1205</td></tr>
<tr><td>Version du micrologiciel installée</td><td>Inconnue — à vérifier avant l'approbation de l'achat</td></tr>
<tr><td>Mémoire</td><td>4 fentes DDR5 UDIMM, double canal, 192 Go maximum; deux modules en A2 et B2</td></tr>
<tr><td>PCIe</td><td>1 x PCIe 5.0 x16; 1 x PCIe 4.0 x4 physique x16; 1 x PCIe 4.0 x1</td></tr>
<tr><td>M.2</td><td>M.2_1 : 2280 PCIe 5.0 x4; M.2_2 : 2242/2260/2280 PCIe 4.0 x4</td></tr>
<tr><td>Stockage SATA</td><td>4 ports SATA; M.2_2 n'en désactive aucun</td></tr>
<tr><td>Réseau</td><td>Ethernet 2,5 Gbit/s; aucun Wi-Fi intégré</td></tr>
<tr><td>Alimentation</td><td>ATX 24 broches + EPS CPU 8 broches</td></tr>
<tr><td>Connecteurs internes</td><td>USB-C avant 10 Gbit/s; 3 connecteurs de ventilateur de boîtier</td></tr>
</tbody></table>
<div class="lab-tasks">
<label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Extrayez les contraintes.</strong><small>Notez le socket, le type et format de RAM, les formats de boîtier possibles, les formats M.2 acceptés et l'absence de Wi-Fi.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Repérez les vérifications conditionnelles.</strong><small>Indiquez quel processeur exige une version minimale du micrologiciel et quelle preuve serait nécessaire avant l'achat.</small></span></label>
</div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Consulter le catalogue MeilleurAchat</h2>

<p><a class="md-button md-button--primary" href="../../../assets/catalogues/catalogue-meilleurachat.pdf" download>Télécharger le catalogue MeilleurAchat (PDF)</a></p>

!!! info "Deux documents, deux rôles"
    La fiche Atlas B860M Creator ci-dessus décrit la plateforme à respecter. Le catalogue MeilleurAchat décrit un inventaire général destiné à plusieurs plateformes. Il contient donc volontairement des produits incompatibles avec cette carte mère.

<p>Avant de construire, repérez au moins une option incompatible dans chacune des catégories suivantes : processeur, mémoire, stockage, boîtier et refroidissement. Pour chaque rejet, notez la page du catalogue et la propriété qui entre en conflit avec la fiche de la carte mère ou le mandat.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Justifiez cinq rejets à partir de deux documents.</strong><small>Chaque justification doit citer une donnée de la fiche Atlas et une donnée du catalogue MeilleurAchat.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Construire et soumettre une configuration</h2>

!!! info "Utilisez uniquement les données fournies"
    Aucune connaissance préalable des performances des cartes graphiques, des SSD ou des refroidisseurs n'est requise. Utilisez la fiche de la carte mère, le mandat et le catalogue MeilleurAchat.

<p>Choisissez un élément dans chaque catégorie. Le total et le solde budgétaire restent visibles pendant la sélection, mais le système ne révèle <strong>aucune erreur, réserve ni note</strong> avant la soumission de la configuration complète.</p>

<p>Lors de la soumission, MeilleurAchat produit un rapport simulant une commande de <strong>50 postes</strong>. Une incompatibilité indique la valeur du matériel touché. Une dépense disproportionnée indique plutôt la prime potentiellement évitable par rapport à une solution adéquate.</p>

<div data-pc-build data-lang="fr" data-budget="2000">
<div class="base-answer-grid">
<label class="base-answer-field"><span>Processeur</span><select data-build-select="cpu"><option value="">Choisir</option><option value="ultra5">Core Ultra 5 225 - 359 $</option><option value="ultra7">Core Ultra 7 265K - 529 $</option><option value="i7">Core i7-14700K - 399 $</option><option value="ryzen7">Ryzen 7 9700X - 429 $</option></select></label>
<label class="base-answer-field"><span>Mémoire</span><select data-build-select="ram"><option value="">Choisir</option><option value="ddr5_32">32 Go DDR5-6000 (2 x 16) - 139 $</option><option value="ddr5_64">64 Go DDR5-6000 (2 x 32) - 239 $</option><option value="single32">32 Go DDR5-6000 (1 x 32) - 129 $</option><option value="ddr4">32 Go DDR4-3600 - 99 $</option><option value="sodimm">32 Go DDR5-5600 SO-DIMM - 119 $</option></select></label>
<label class="base-answer-field"><span>Carte graphique</span><select data-build-select="gpu"><option value="">Choisir</option><option value="rtx5060">RTX 5060 8 Go - 499 $</option><option value="rtx5070">RTX 5070 12 Go - 749 $</option><option value="rx9070">RX 9070 16 Go - 799 $</option><option value="rx7600">RX 7600 8 Go - 379 $</option></select></label>
<label class="base-answer-field"><span>Stockage principal</span><select data-build-select="storage"><option value="">Choisir</option><option value="nvme2">SSD NVMe 2 To PCIe 4.0 - 159 $</option><option value="nvme1">SSD NVMe 1 To PCIe 4.0 - 89 $</option><option value="gen5_2">SSD NVMe 2 To PCIe 5.0 - 269 $</option><option value="sata2">SSD SATA 2 To - 139 $</option><option value="m2230">SSD NVMe 1 To M.2 2230 - 129 $</option></select></label>
<label class="base-answer-field"><span>Boîtier</span><select data-build-select="case"><option value="">Choisir</option><option value="matx">Northstar M300 - 109 $</option><option value="compact">Metro M280 - 89 $</option><option value="itx">Pocket S1 - 149 $</option><option value="atx">Atlas A500 - 129 $</option></select></label>
<label class="base-answer-field"><span>Refroidissement</span><select data-build-select="cooler"><option value="">Choisir</option><option value="tower">Boreal Tower 158 - 59 $</option><option value="low">Boreal Low 67 - 49 $</option><option value="aio">Boreal liquide 240 mm - 139 $</option><option value="am5">Summit Tower - 54 $</option></select></label>
<label class="base-answer-field"><span>Bloc d'alimentation</span><select data-build-select="psu"><option value="">Choisir</option><option value="p550">550 W Bronze - 79 $</option><option value="p650">650 W Gold - 109 $</option><option value="p750">750 W Gold - 129 $</option><option value="p1000">1000 W Gold - 199 $</option><option value="sfx750">750 W Gold SFX - 189 $</option></select></label>
<label class="base-answer-field"><span>Wi-Fi</span><select data-build-select="wifi"><option value="">Choisir</option><option value="included">Wi-Fi 6E intégré - 0 $</option><option value="pcie">Carte PCIe x1 Wi-Fi 6E - 49 $</option><option value="usb">Adaptateur USB Wi-Fi 5 - 29 $</option><option value="none">Aucun matériel Wi-Fi - 0 $</option></select></label>
</div>
<div class="lab-admin-note"><strong>Total : <span data-build-total>0 $</span></strong><p>Solde du budget : <span data-build-remaining>2 000 $</span></p><p data-build-score></p><div data-build-feedback aria-live="polite"><p>Le rapport sera produit seulement après la soumission de la configuration complète.</p></div></div>
<div class="lab-actions"><button class="lab-button" type="button" data-build-check>Soumettre la configuration pour approbation</button></div>
</div>

<h3>Calcul publié de l'indice</h3>
<p>Chaque produit possède une note LaboPerformance sur 10, comparable seulement aux produits de la même catégorie. Les huit notes donnent un maximum de 80 points. Les seuls ajustements de pertinence possibles sont publiés ici :</p>
<ul>
<li><strong>-1 point</strong> : SSD PCIe 5.0 de 2 To, lorsque son supplément de prix apporte peu de valeur au mandat;</li>
<li><strong>-1 point</strong> : bloc de 1 000 W, lorsque sa capacité dépasse largement les exigences de la configuration.</li>
</ul>
<p>La configuration de mémoire à un seul module possède déjà une note de produit inférieure dans le catalogue en raison de sa bande passante initiale réduite; aucune pénalité secrète supplémentaire n'est appliquée.</p>

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check data-build-auto-task disabled><span><strong>Produisez une configuration approuvable.</strong><small>Toutes les catégories doivent être remplies, les exigences respectées et le budget non dépassé.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Chercher une meilleure configuration</h2>
<p>Créez au moins une deuxième configuration approuvable. Comparez les notes de produits, la mémoire, le stockage, l'alimentation, le Wi-Fi, la marge budgétaire, les réserves du rapport et l'évolution future.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Comparez deux configurations.</strong><small>Conservez leurs composants, totaux et rapports, puis expliquez au moins deux compromis.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Diagnostiquer une configuration faible</h2>
<p>Un collègue propose : Core Ultra 5, 64 Go DDR5, RTX 5060, SSD PCIe 5.0 de 2 To, boîtier ATX, refroidissement liquide 240 mm, bloc 1000 W et carte Wi-Fi PCIe.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Améliorez l'allocation du budget.</strong><small>Identifiez au moins trois dépenses surdimensionnées ou peu prioritaires, calculez leur effet sur 50 postes et proposez une configuration plus forte pour le jeu sans dépasser 2 000 $.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Évaluer une source technique réelle</h2>
<p>Choisissez une liste officielle de processeurs pris en charge ou une page de manuel publiée par le fabricant d'une carte mère réelle. Privilégiez un document qui indique une condition de compatibilité, par exemple une version minimale de BIOS ou de micrologiciel. Cette source ne prouve rien au sujet de la carte Atlas fictive; elle sert à analyser comment un fabricant documente une condition de prise en charge.</p>
<p>Répondez aux cinq éléments suivants, avec au plus deux phrases par élément :</p>
<ol>
<li><strong>Source et éditeur :</strong> donnez le titre exact du document, le fabricant et le lien direct.</li>
<li><strong>Pertinence :</strong> expliquez pourquoi cette source peut soutenir la vérification choisie.</li>
<li><strong>Spécification :</strong> relevez une valeur ou une affirmation technique exacte avec son contexte.</li>
<li><strong>Vérification :</strong> comparez-la à une deuxième source officielle, une observation, un calcul ou un principe vu en classe.</li>
<li><strong>Nature des énoncés :</strong> formulez un fait, une inférence et une recommandation pratique, ou expliquez pourquoi aucune recommandation n'est justifiée.</li>
</ol>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Évaluez la source en cinq parties.</strong><small>Conservez le lien direct et séparez clairement ce que le document affirme, ce que vous en déduisez et ce que vous recommandez.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Mettre à jour le cahier des charges évolutif</h2>
<p>Ajoutez une section <strong>Carte mère et logique de construction</strong> au cahier des charges évolutif commencé au Laboratoire 5. Consignez la carte mère imposée, les huit composants retenus, le total, les preuves essentielles de compatibilité, toute condition encore ouverte et une mise à niveau future réaliste.</p>
<p>Ajoutez ensuite une phrase pour chacun des critères de cycle de vie :</p>
<ul>
<li><strong>Longévité :</strong> quelle voie de mise à niveau demeure réaliste, et quelle incertitude de soutien doit rester visible?</li>
<li><strong>Stabilité :</strong> quelles preuves soutiennent un démarrage et un fonctionnement prévisibles?</li>
<li><strong>Efficacité :</strong> la répartition du budget, la puissance et le refroidissement sont-ils proportionnés au mandat?</li>
<li><strong>Maintenabilité :</strong> peut-on identifier les versions, remplacer les pièces standard et documenter une méthode de mise à jour ou de récupération?</li>
</ul>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Mettez à jour le cahier des charges.</strong><small>Conservez la configuration, les preuves, les questions ouvertes, la mise à niveau et les quatre phrases de cycle de vie.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Synthèse intégrée et recommandation finale</h2>
<p>Rédigez une synthèse de 180 à 250 mots destinée au client et ajoutez-la à la section mise à jour du cahier des charges évolutif. Elle doit relier les besoins, les contraintes, les preuves, les compromis et la décision plutôt que présenter une réponse isolée.</p>
<p>Incluez :</p>
<ul>
<li>la liste finale et le total;</li>
<li>la chaîne de preuves de compatibilité reliant la fiche Atlas et le catalogue;</li>
<li>deux compromis et une mise à niveau future réaliste;</li>
<li>une vérification encore ouverte et la preuve nécessaire pour la fermer;</li>
<li>une leçon méthodologique tirée de l'évaluation de la source réelle, sans l'utiliser comme preuve sur la carte Atlas;</li>
<li>au moins deux références précises au catalogue.</li>
</ul>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Rédigez la synthèse intégrée.</strong><small>Expliquez pourquoi votre configuration répond au mandat, ce qui reste à vérifier et comment les preuves soutiennent la recommandation.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage>
<h2>Contrôle final</h2>
<ul class="lab-completion-list"><li>budget respecté;</li><li>socket LGA1851;</li><li>DDR5 UDIMM;</li><li>stockage NVMe 2280 d'au moins 2 To;</li><li>boîtier acceptant microATX et dimensions des composants;</li><li>refroidissement LGA1851 suffisant;</li><li>bloc d'alimentation, format et connecteur GPU adéquats;</li><li>Wi-Fi réellement fourni;</li><li>preuves tirées du catalogue;</li><li>source réelle évaluée en cinq parties;</li><li>cahier des charges et cycle de vie mis à jour;</li><li>synthèse centrée sur le client et incertitudes visibles.</li></ul>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Effectuez le contrôle final.</strong><small>Corrigez toute contradiction entre votre tableau, le rapport MeilleurAchat, votre total, vos preuves, le cahier des charges et votre synthèse.</small></span></label></div>
</section>
</div>
</div>

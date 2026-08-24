# Séance 2 - Bases 2 et 16

## But de la séance

À la Séance 1, nous avons vu qu'un ordinateur représente de l'information, maintient un état et suit des instructions. Il reste maintenant à comprendre comment cette information peut être représentée à l'intérieur d'un système numérique.

Cette séance introduit trois façons d'écrire une même valeur :

- la base 10, que nous utilisons quotidiennement;
- la base 2, adaptée aux états reconnus par les circuits numériques;
- la base 16, qui permet aux humains de lire et de transcrire plus facilement de longues suites de bits.

L'objectif n'est pas seulement d'obtenir une réponse avec une calculatrice. Nous allons apprendre à reconnaître la structure d'un nombre, à effectuer les conversions manuellement et à montrer une démarche qui peut être vérifiée.

## Objectifs

À la fin de cette séance, vous devriez être en mesure de :

- distinguer une valeur de sa représentation et expliquer le principe d'un système de numération positionnel;
- reconnaître les chiffres valides et les notations utilisées en bases 2, 10 et 16;
- expliquer pourquoi les systèmes numériques utilisent couramment la base 2 et pourquoi l'hexadécimal fournit une écriture compacte;
- déterminer la valeur décimale d'un nombre binaire ou hexadécimal;
- représenter un entier décimal en binaire;
- convertir directement entre le binaire et l'hexadécimal en regroupant les bits;
- respecter une largeur imposée et ajouter des zéros à gauche sans modifier la valeur;
- montrer et vérifier la démarche utilisée pour une conversion.

!!! info "Portée de la séance"
    **À maîtriser aujourd'hui :** valeur et représentation, numération positionnelle, chiffres permis, bases 2, 10 et 16, notation `0x`, conversions manuelles, regroupement par quatre bits, largeur et vérification.

    **À reconnaître aujourd'hui :** le lien entre deux états logiques et la représentation binaire dans les circuits numériques.

    **Non exigé :** nombres négatifs, fractions binaires et encodages spécialisés; ces sujets seront introduits dans les séances suivantes.

## Une valeur, plusieurs représentations

Considérez les trois écritures suivantes :

`13`<sub>`10`</sub> &nbsp;&nbsp; `1101`<sub>`2`</sub> &nbsp;&nbsp; `D`<sub>`16`</sub>

Elles semblent différentes, mais elles représentent toutes la même quantité.

La valeur ne change pas. Seuls les symboles et les règles utilisés pour l'écrire changent. C'est comparable à une même distance exprimée en mètres ou en centimètres : l'écriture change, mais pas la distance réelle.

!!! question "Observation de départ"
    Sans effectuer de recherche, examinez les trois représentations ci-dessus.

    1. Laquelle vous est la plus familière?
    2. Que pourraient indiquer les petits nombres `10`, `2` et `16`?
    3. Pourquoi la troisième représentation utilise-t-elle une lettre?
    4. Selon vous, laquelle serait la plus facile à lire si le nombre comportait plusieurs dizaines de chiffres binaires?

    Conservez vos premières réponses. Nous y reviendrons après avoir construit les règles des trois systèmes.

## Représentation et interprétation

Une suite de symboles ne possède pas une valeur unique si nous ne connaissons pas les règles qui permettent de l'interpréter.

Par exemple, l'écriture `10` peut représenter :

- dix en base 10;
- deux en base 2;
- seize en base 16.

Pour éviter l'ambiguïté, nous indiquerons la base en indice :

- `10`<sub>`10`</sub> = `10`;
- `10`<sub>`2`</sub> = `2`;
- `10`<sub>`16`</sub> = `16`.

!!! warning "La base fait partie de l'information"
    Une conversion ne change pas la valeur. Elle produit une nouvelle représentation de cette même valeur.

    Écrire seulement `1010` sans préciser le contexte peut être ambigu. Pendant les exercices, indiquez la base de départ et la base d'arrivée, puis conservez votre démarche.

!!! note "Si 10 en base 16 vaut 16 en base 10 et que cela vous semble étrange"
    Cette confusion est tout à fait normale. Nous connaissons seulement dix chiffres décimaux familiers : de `0` à `9`. Pour obtenir les seize symboles nécessaires en base 16, le système hexadécimal ajoute les lettres `A` à `F`.

    Dans n'importe quelle base, l'écriture `10` signifie **un groupe complet de la base et aucune unité** :

    - `10`<sub>`2`</sub> = `1 × 2 + 0`;
    - `10`<sub>`10`</sub> = `1 × 10 + 0`;
    - `10`<sub>`16`</sub> = `1 × 16 + 0`.

    La prochaine section montre comment les chiffres disponibles et leur position déterminent la valeur d'un nombre.

## La position donne sa valeur au chiffre

Dans notre système décimal, la valeur d'un chiffre dépend de sa position.

Considérez le nombre `555`. Les trois chiffres sont identiques, mais ils ne représentent pas la même quantité :

| Position | Centaines | Dizaines | Unités |
|---|---:|---:|---:|
| Chiffre | 5 | 5 | 5 |
| Valeur de la position | 100 | 10 | 1 |
| Contribution | 500 | 50 | 5 |

Nous pouvons donc décomposer le nombre ainsi :

`555 = 5 × 100 + 5 × 10 + 5 × 1`

Ce principe porte le nom de **numération positionnelle**. Chaque position possède une valeur déterminée par la base utilisée.

### Les puissances comme raccourci

Les valeurs de position en base 10 peuvent être écrites avec des puissances de 10 :

| Position à partir de la droite | Puissance | Valeur |
|---:|---:|---:|
| 0 | 10<sup>0</sup> | 1 |
| 1 | 10<sup>1</sup> | 10 |
| 2 | 10<sup>2</sup> | 100 |
| 3 | 10<sup>3</sup> | 1 000 |

La position la plus à droite commence à zéro, car toute base élevée à la puissance zéro vaut `1`.

??? info "Rappel : que signifie un exposant?"
    Un exposant indique combien de facteurs égaux à la base sont multipliés :

    - 10<sup>3</sup> = 10 × 10 × 10 = 1 000;
    - 10<sup>2</sup> = 10 × 10 = 100;
    - 10<sup>1</sup> = 10.

    En se déplaçant d'une position vers la droite, on divise la valeur de position par la base. Ainsi, 10<sup>0</sup> doit valoir 10 ÷ 10 = 1. Le même raisonnement fonctionne dans toutes les bases : 2<sup>0</sup> et 16<sup>0</sup> valent aussi 1.

Par exemple :

`4 307 = 4 × 10`<sup>`3`</sup>` + 3 × 10`<sup>`2`</sup>` + 0 × 10`<sup>`1`</sup>` + 7 × 10`<sup>`0`</sup>

`4 307 = 4 000 + 300 + 0 + 7`

### Le rôle du zéro

Le zéro peut indiquer qu'une position ne contribue pas à la valeur.

Dans `4 307`, le zéro conserve la position des dizaines. Sans lui, `437` représenterait une autre valeur :

- `4 307` contient quatre milliers, trois centaines, aucune dizaine et sept unités;
- `437` contient quatre centaines, trois dizaines et sept unités.

Le zéro n'ajoute rien à cette position, mais sa présence empêche les autres chiffres de changer de position.

## La même règle dans chaque base

Dans une base quelconque, les positions suivent toujours le même principe :

- la position la plus à droite vaut `1`;
- la suivante vaut la base;
- chaque nouvelle position vers la gauche vaut la position précédente multipliée par la base.

| Base | Valeurs de position, de droite à gauche |
|---:|---|
| 2 | 1, 2, 4, 8, 16, 32… |
| 10 | 1, 10, 100, 1 000… |
| 16 | 1, 16, 256, 4 096… |

Les règles de position restent donc les mêmes. Ce sont les symboles disponibles et la valeur de chaque position qui changent.

## Les chiffres permis

Une base possède exactement le nombre de symboles indiqué par son nom. Elle commence toujours par zéro; le plus grand chiffre possible vaut donc une unité de moins que la base.

| Base | Symboles permis |
|---:|---|
| 2 | `0`, `1` |
| 10 | `0` à `9` |
| 16 | `0` à `9`, puis `A`, `B`, `C`, `D`, `E`, `F` |

Par conséquent :

- `10110` est une écriture possible en base 2;
- `10210` n'est pas valide en base 2, car le chiffre `2` n'y existe pas;
- `A5` est une écriture possible en base 16;
- `1G` n'est pas valide en base 16, car la lettre `G` ne fait pas partie de ses symboles;
- `A5` n'est pas valide en base 10.

!!! question "Vérification de validité"
    Sans effectuer de conversion, déterminez si chaque écriture est valide dans la base indiquée. Pour toute écriture invalide, encerclez le premier symbole impossible et expliquez votre décision.

    1. `110101` en base 2
    2. `12001` en base 2
    3. `908` en base 10
    4. `9F2` en base 16
    5. `BAG` en base 16

    Une écriture valide n'est pas nécessairement une réponse correcte à un problème de conversion. Cette vérification permet seulement de confirmer que tous ses symboles existent dans la base indiquée.

## Pourquoi utiliser la base 2?

Un ordinateur ne pense pas et ne voit pas directement les chiffres `0` et `1`. Ses circuits produisent, conservent et détectent des états physiques, notamment des niveaux de tension électrique.

Dans un circuit numérique, ces états sont interprétés à l'aide de deux catégories logiques :

- l'état logique `0`;
- l'état logique `1`.

Les tensions réelles ne sont pas toujours parfaitement identiques. Elles peuvent varier légèrement à cause du bruit électrique, de la température, de la fabrication des composants ou d'autres conditions physiques.

L'utilisation de deux catégories bien séparées permet aux circuits de reconnaître les états de manière fiable malgré ces petites variations. Elle facilite également la construction des circuits qui effectuent des opérations et conservent de l'information.

!!! warning "0 ne signifie pas toujours « éteint »"
    Il est tentant d'imaginer que `0` signifie toujours « aucune électricité » et que `1` signifie toujours « électricité présente ». Cette comparaison peut aider au début, mais elle n'est pas une règle universelle.

    Les valeurs physiques exactes et leur interprétation dépendent de la technologie utilisée. L'idée importante est que le système distingue deux états logiques de façon prévisible.

## Le bit

Le mot **bit** vient de l'expression anglaise *binary digit*, ou chiffre binaire. Un bit peut prendre l'une de deux valeurs : `0` ou `1`.

Un seul bit permet donc de représenter deux possibilités. En combinant plusieurs bits, le nombre de configurations possibles augmente rapidement.

| Nombre de bits | Configurations possibles | Nombre de configurations |
|---:|---|---:|
| 1 | `0`, `1` | 2 |
| 2 | `00`, `01`, `10`, `11` | 4 |
| 3 | de `000` à `111` | 8 |
| 4 | de `0000` à `1111` | 16 |
| 8 | de `00000000` à `11111111` | 256 |

Avec `n` bits, il est possible de former 2<sup>n</sup> configurations différentes.

Une configuration de bits ne possède toutefois pas une signification unique. Selon les règles utilisées pour l'interpréter, elle peut représenter un nombre, une lettre, une couleur, une instruction, l'état d'un périphérique ou une partie d'une image, d'un son ou d'un programme.

Nous examinerons plusieurs de ces interprétations à la Séance 3. Pour le moment, nous utiliserons les bits pour représenter des nombres entiers.

## Retour au routeur de lettres

À la Séance 1, le routeur programmable utilisait huit destinations, identifiées par les lettres `A` à `H`.

Trois bits permettent justement de former huit configurations :

| Configuration | Destination possible |
|---|---|
| `000` | A |
| `001` | B |
| `010` | C |
| `011` | D |
| `100` | E |
| `101` | F |
| `110` | G |
| `111` | H |

Cette association est une convention. Les bits ne contiennent pas naturellement une lettre : le système doit connaître la règle qui relie chaque configuration à une destination.

!!! question "Construire un code"
    Imaginez un nouveau routeur possédant cinq destinations.

    1. Deux bits suffiraient-ils pour donner un code différent à chaque destination?
    2. Combien de bits faudrait-il au minimum?
    3. Écrivez assez de configurations pour attribuer un code unique aux cinq destinations.
    4. Certaines configurations resteraient-elles inutilisées?

    Conservez votre démarche. Une réponse accompagnée seulement d'un nombre ne montre pas comment vous avez déterminé la capacité du code.

## Du binaire à l'hexadécimal

Les circuits peuvent manipuler efficacement de longues suites de bits, mais ces suites deviennent rapidement difficiles à lire et à recopier pour une personne.

Par exemple, une seule erreur est facile à manquer dans cette représentation :

`1101011010110010`

La base 16 offre une façon plus compacte de représenter exactement les mêmes bits.

## La base 16 : une écriture plus compacte

L'hexadécimal ne remplace pas les bits conservés ou manipulés par le système. Il fournit une notation plus pratique pour les personnes qui doivent les lire.

### Les symboles hexadécimaux

La base 16 nécessite seize symboles différents. Les dix chiffres décimaux habituels ne suffisent donc pas. Les lettres `A` à `F` représentent les six valeurs restantes.

| Valeur décimale | Chiffre hexadécimal |
|---:|:---:|
| 0 à 9 | `0` à `9` |
| 10 | `A` |
| 11 | `B` |
| 12 | `C` |
| 13 | `D` |
| 14 | `E` |
| 15 | `F` |

Le comptage se poursuit ainsi :

`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F, 10`

Après `F`, tous les symboles possibles pour une seule position ont été utilisés. Une nouvelle position est donc nécessaire.

- `A`<sub>`16`</sub> représente `10`<sub>`10`</sub>;
- `F`<sub>`16`</sub> représente `15`<sub>`10`</sub>;
- `10`<sub>`16`</sub> représente `16`<sub>`10`</sub>.

!!! warning "A et 10 ne représentent pas la même valeur"
    En hexadécimal, `A` représente la valeur décimale dix. L'écriture hexadécimale `10` représente plutôt un groupe de seize et aucune unité.

    La lettre fournit le symbole qui manquait pour écrire la valeur dix dans une seule position.

### Pourquoi des groupes de quatre bits?

Quatre bits permettent de former exactement seize configurations : 2<sup>4</sup> = 16.

Un groupe de quatre bits peut donc être associé directement à un chiffre hexadécimal.

| Binaire | Hexadécimal | Décimal |
|:---:|:---:|---:|
| `0000` | `0` | 0 |
| `0001` | `1` | 1 |
| `0010` | `2` | 2 |
| `0011` | `3` | 3 |
| `0100` | `4` | 4 |
| `0101` | `5` | 5 |
| `0110` | `6` | 6 |
| `0111` | `7` | 7 |
| `1000` | `8` | 8 |
| `1001` | `9` | 9 |
| `1010` | `A` | 10 |
| `1011` | `B` | 11 |
| `1100` | `C` | 12 |
| `1101` | `D` | 13 |
| `1110` | `E` | 14 |
| `1111` | `F` | 15 |

Cette correspondance explique pourquoi la conversion entre le binaire et l'hexadécimal peut se faire par regroupement, sans passer par la base 10.

??? question "Pourquoi la base 16 est-elle courante, mais pas la base 32?"
    La base 32 existe. Elle peut utiliser les chiffres `0` à `9`, puis les lettres `A` à `V`, et chaque symbole peut représenter un groupe de cinq bits puisque 2<sup>5</sup> = 32.

    Il s'agit d'un alphabet possible, et non d'une convention universelle. Certains formats de base 32 emploient un autre ensemble de lettres et de chiffres afin de respecter leurs propres besoins de lecture ou de transmission.

    Elle s'accorde toutefois moins bien avec l'organisation habituelle de la mémoire :

    - un chiffre hexadécimal représente exactement quatre bits;
    - deux chiffres hexadécimaux représentent exactement un octet de huit bits;
    - les tailles courantes de 16, 32 et 64 bits deviennent respectivement 4, 8 et 16 chiffres hexadécimaux.

    Un symbole en base 32 représente cinq bits. Comme cinq ne divise pas huit, les groupes traversent souvent les limites des octets. La représentation devient moins naturelle pour lire des adresses, des contenus mémoire ou des valeurs machine.

    L'hexadécimal utilise également seulement six lettres supplémentaires, de `A` à `F`, ce qui limite les risques de confusion lors de la lecture et de la transcription.

    La base 32 n'est donc pas inutile. Elle est employée dans certains codes et formats textuels lorsque la compacité et la facilité de transmission sont plus importantes que l'alignement sur les octets.

    Historiquement, la base 8 a aussi été courante avec des architectures organisées autour de groupes de trois bits. L'hexadécimal est devenu particulièrement pratique avec la généralisation de l'octet de huit bits.

## Pourquoi commencer à droite?

Dans un entier binaire, le bit situé complètement à droite occupe la position des unités, soit 2<sup>0</sup>.

Les quatre positions les plus à droite ont les valeurs suivantes :

| Position | 2<sup>3</sup> | 2<sup>2</sup> | 2<sup>1</sup> | 2<sup>0</sup> |
|---:|---:|---:|---:|---:|
| Valeur | 8 | 4 | 2 | 1 |

Ensemble, ces quatre bits peuvent représenter les valeurs de 0 à 15, exactement comme un chiffre hexadécimal.

Les quatre positions suivantes forment le chiffre hexadécimal placé immédiatement à gauche, et ainsi de suite. Les groupes doivent donc être alignés sur la position des unités, à droite.

Nous continuons à lire le nombre final de gauche à droite. Seule l'opération de regroupement commence à droite.

## Regrouper un entier binaire

Pour convertir un entier binaire en hexadécimal :

1. repérez le bit situé complètement à droite;
2. en vous déplaçant vers la gauche, séparez les bits en groupes de quatre;
3. si le groupe restant à gauche contient moins de quatre bits, ajoutez des zéros à sa gauche;
4. remplacez chaque groupe par le chiffre hexadécimal correspondant.

Exemple :

`1101011010110010`<sub>`2`</sub>

Regroupement :

`1101 0110 1011 0010`

Correspondances :

`D 6 B 2`

Donc :

`1101011010110010`<sub>`2`</sub> = `D6B2`<sub>`16`</sub>

### Ajouter des zéros à gauche

Considérez le nombre binaire suivant :

`101101`<sub>`2`</sub>

En commençant à droite et en comptant quatre bits vers la gauche, nous obtenons :

`10 1101`

Le groupe situé à gauche contient seulement deux bits. Nous ajoutons donc deux zéros à sa gauche pour former un groupe complet :

`0010 1101`

Les zéros ajoutés à gauche ne changent pas la valeur de l'entier. Ils permettent seulement d'aligner correctement les groupes de quatre :

`101101`<sub>`2`</sub> = `2D`<sub>`16`</sub>

## Revenir au binaire

Pour convertir un nombre hexadécimal en binaire, remplacez chaque chiffre hexadécimal par son groupe de quatre bits.

Exemple : `A05`<sub>`16`</sub>

| Chiffre hexadécimal | `A` | `0` | `5` |
|---|:---:|:---:|:---:|
| Groupe binaire | `1010` | `0000` | `0101` |

Donc :

`A05`<sub>`16`</sub> = `101000000101`<sub>`2`</sub>

Le groupe `0000` au milieu doit être conservé. Le supprimer déplacerait les autres bits et changerait la valeur.

## La notation 0x

Dans la documentation technique et plusieurs langages informatiques, le préfixe `0x` indique qu'un nombre est écrit en hexadécimal.

- `0xA` représente la valeur décimale 10;
- `0x10` représente la valeur décimale 16;
- `0xD6B2` représente le même nombre que `D6B2`<sub>`16`</sub>.

Le caractère `x` fait partie du préfixe. Il ne représente pas une multiplication.

!!! question "Lire les groupes"
    Sans convertir toute la suite en base 10 :

    1. séparez `101111000101` en groupes de quatre;
    2. trouvez le chiffre hexadécimal correspondant à chaque groupe;
    3. expliquez pourquoi une suite de douze bits produit exactement trois chiffres hexadécimaux;
    4. déterminez combien de chiffres hexadécimaux seraient nécessaires pour représenter trente-deux bits.

## Convertir vers la base 10

Pour convertir un nombre binaire ou hexadécimal vers la base 10, nous utilisons la valeur de chaque position.

La méthode reste la même dans les deux cas :

1. commencez par la position située complètement à droite;
2. attribuez-lui l'exposant zéro;
3. augmentez l'exposant de un pour chaque déplacement vers la gauche;
4. multipliez chaque chiffre par la puissance de la base associée à sa position;
5. additionnez toutes les contributions.

### Du binaire vers le décimal

Considérons le nombre `10110110`<sub>`2`</sub>.

| Position | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Bit | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 |
| Puissance | 2<sup>7</sup> | 2<sup>6</sup> | 2<sup>5</sup> | 2<sup>4</sup> | 2<sup>3</sup> | 2<sup>2</sup> | 2<sup>1</sup> | 2<sup>0</sup> |
| Valeur | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

Nous écrivons le développement complet :

`1 × 128 + 0 × 64 + 1 × 32 + 1 × 16 + 0 × 8 + 1 × 4 + 1 × 2 + 0 × 1`

Les positions contenant un zéro ne contribuent pas à la somme :

`128 + 32 + 16 + 4 + 2 = 182`

Donc :

`10110110`<sub>`2`</sub> = `182`<sub>`10`</sub>

!!! question "Vérifiez votre compréhension : une vérification rapide"
    Le bit situé complètement à gauche vaut `128`. Puisque d'autres bits valent également `1`, la réponse doit être supérieure à `128`.

    Les huit positions permettent de représenter des valeurs allant de `0` à `255`. Une réponse de `182` est donc plausible.

### De l'hexadécimal vers le décimal

La même méthode fonctionne en base 16. Les positions utilisent maintenant des puissances de seize.

Considérons `2D6`<sub>`16`</sub>. La lettre `D` représente la valeur décimale `13`.

| Position | 2 | 1 | 0 |
|---:|---:|---:|---:|
| Chiffre hexadécimal | `2` | `D` | `6` |
| Valeur du chiffre | 2 | 13 | 6 |
| Puissance | 16<sup>2</sup> | 16<sup>1</sup> | 16<sup>0</sup> |
| Valeur de la position | 256 | 16 | 1 |

Le développement est donc :

`2 × 256 + 13 × 16 + 6 × 1`

`512 + 208 + 6 = 726`

Donc :

`2D6`<sub>`16`</sub> = `726`<sub>`10`</sub>

!!! warning "Convertissez les lettres avant de multiplier"
    Une lettre hexadécimale possède une valeur numérique :

    `A = 10`, `B = 11`, `C = 12`, `D = 13`, `E = 14` et `F = 15`.

    Dans une démarche, écrivez cette valeur explicitement. Une expression comme `D × 16` masque une étape importante du raisonnement.

### Vérifier par le binaire

Nous pouvons également vérifier le résultat en passant par la représentation binaire :

`2D6`<sub>`16`</sub> = `0010 1101 0110`<sub>`2`</sub>

Les bits valant `1` occupent les positions suivantes :

`512 + 128 + 64 + 16 + 4 + 2 = 726`

Les deux méthodes produisent la même valeur.

## Atelier visuel : le tableau des positions

Avant d'activer une colonne, prédisez si elle contribuera à la somme. Construisez ensuite le développement positionnel et inscrivez le total. L'outil vérifiera votre démarche avant de montrer la représentation complète.

<iframe
  src="../../../assets/demos/positional-value-workbench.html?lang=fr"
  title="Atelier interactif des valeurs de position"
  loading="lazy"
  sandbox="allow-scripts"
  style="width: 100%; height: 860px; border: 0;"
></iframe>

??? info "Puissances de deux utiles"
    | Puissance | Valeur | Puissance | Valeur |
    |---:|---:|---:|---:|
    | 2<sup>0</sup> | 1 | 2<sup>8</sup> | 256 |
    | 2<sup>1</sup> | 2 | 2<sup>9</sup> | 512 |
    | 2<sup>2</sup> | 4 | 2<sup>10</sup> | 1 024 |
    | 2<sup>3</sup> | 8 | 2<sup>11</sup> | 2 048 |
    | 2<sup>4</sup> | 16 | 2<sup>12</sup> | 4 096 |
    | 2<sup>5</sup> | 32 | 2<sup>13</sup> | 8 192 |
    | 2<sup>6</sup> | 64 | 2<sup>14</sup> | 16 384 |
    | 2<sup>7</sup> | 128 | 2<sup>15</sup> | 32 768 |

??? info "Puissances de seize utiles"
    | Puissance | Valeur |
    |---:|---:|
    | 16<sup>0</sup> | 1 |
    | 16<sup>1</sup> | 16 |
    | 16<sup>2</sup> | 256 |
    | 16<sup>3</sup> | 4 096 |
    | 16<sup>4</sup> | 65 536 |

!!! question "Montrer la contribution de chaque position"
    Convertissez les nombres suivants vers la base 10 :

    1. `101101`<sub>`2`</sub>
    2. `11001001`<sub>`2`</sub>
    3. `3A`<sub>`16`</sub>
    4. `B04`<sub>`16`</sub>

    Pour chaque nombre, indiquez la valeur de chaque position, écrivez les multiplications, additionnez les contributions et vérifiez si l'ordre de grandeur de votre réponse est plausible.

## Du décimal vers le binaire

Convertir un nombre binaire vers la base 10 signifie additionner les valeurs de position dont le bit vaut `1`.

Pour effectuer le trajet inverse, nous déterminons quelles puissances de deux doivent être combinées pour produire la valeur décimale. Chaque puissance sélectionnée reçoit un bit `1`; chaque position ignorée reçoit un bit `0`.

!!! note "Le cas particulier de zéro"
    La valeur zéro ne nécessite aucune puissance de deux dans sa décomposition :

    `0`<sub>`10`</sub> = `0`<sub>`2`</sub>

    La méthode des puissances de deux présentée ci-dessous s'applique aux entiers strictement positifs.

### La méthode des puissances de deux

Pour représenter un entier décimal en binaire :

1. trouvez la plus grande puissance de deux qui ne dépasse pas le nombre;
2. inscrivez `1` dans cette position et soustrayez sa valeur;
3. examinez chaque puissance suivante en vous déplaçant vers la droite;
4. inscrivez `1` si sa valeur peut être soustraite du reste;
5. inscrivez `0` si sa valeur dépasse le reste;
6. poursuivez jusqu'à la position 2<sup>0</sup>, dont la valeur est `1`.

Les positions contenant `0` doivent être conservées entre le premier et le dernier bit. Elles empêchent les autres bits de changer de valeur positionnelle.

### Exemple complet

Représentons `182`<sub>`10`</sub> en binaire.

La plus grande puissance de deux qui ne dépasse pas `182` est `128`, soit 2<sup>7</sup>.

| Valeur de position | Entre-t-elle dans le reste? | Bit | Nouveau reste |
|---:|:---:|:---:|---:|
| 128 | Oui : `182 - 128` | `1` | 54 |
| 64 | Non | `0` | 54 |
| 32 | Oui : `54 - 32` | `1` | 22 |
| 16 | Oui : `22 - 16` | `1` | 6 |
| 8 | Non | `0` | 6 |
| 4 | Oui : `6 - 4` | `1` | 2 |
| 2 | Oui : `2 - 2` | `1` | 0 |
| 1 | Non | `0` | 0 |

Les bits obtenus, lus de la position la plus grande vers la position des unités, sont `10110110`.

Donc :

`182`<sub>`10`</sub> = `10110110`<sub>`2`</sub>

Pour vérifier la conversion, reprenez les positions contenant `1` :

`128 + 32 + 16 + 4 + 2 = 182`

!!! note "Vérification : le premier bit peut être prédit"
    Repérez les deux puissances de deux entre lesquelles se trouve le nombre.

    Par exemple, `128 ≤ 182 < 256`. La représentation de `182` commence donc à la position `128`. Elle comporte huit positions, et son premier bit vaut `1`.

### Pourquoi faut-il écrire les zéros?

Supposons que nous conservions seulement les positions sélectionnées pour `182` : `11111`.

Cette écriture ne signifie pas « 128, 32, 16, 4 et 2 ». Sans les zéros intermédiaires, les cinq bits occupent plutôt les positions `16`, `8`, `4`, `2` et `1`.

Ainsi :

`11111`<sub>`2`</sub> = `31`<sub>`10`</sub>

Les zéros de `10110110` indiquent que les positions `64`, `8` et `1` ne contribuent pas. Ils sont indispensables pour préserver les autres positions.

### Largeur minimale et largeur imposée

La représentation minimale d'un entier positif commence normalement par `1`. Les zéros inutiles placés complètement à gauche peuvent être omis :

`00101101`<sub>`2`</sub> = `101101`<sub>`2`</sub>

Cependant, un exercice, une variable ou un registre peut imposer une largeur précise. Si une valeur doit être représentée sur huit bits, les zéros de gauche doivent être ajoutés jusqu'à atteindre huit positions :

`45`<sub>`10`</sub> = `101101`<sub>`2`</sub>

Sur huit bits : `00101101`<sub>`2`</sub>

La représentation des entiers signés sera étudiée à la Séance 3. Pour cette séance, les nombres sont des entiers non signés et non négatifs.

### Passer ensuite à l'hexadécimal

Une fois la représentation binaire obtenue, nous pouvons former des groupes de quatre bits :

`182`<sub>`10`</sub> = `10110110`<sub>`2`</sub>

`1011 0110`<sub>`2`</sub> = `B6`<sub>`16`</sub>

Cette méthode permet de passer du décimal à l'hexadécimal en utilisant les deux méthodes déjà étudiées.

??? info "Méthode alternative : les divisions successives"
    Il est également possible de convertir un entier décimal vers une autre base en effectuant des divisions successives.

    Pour convertir vers la base 2 :

    1. divisez le nombre par `2`;
    2. conservez le reste, qui sera `0` ou `1`;
    3. divisez ensuite le quotient par `2`;
    4. poursuivez jusqu'à ce que le quotient soit nul;
    5. lisez les restes du dernier au premier.

    Cette méthode fonctionne avec plusieurs bases, mais elle est considérée comme une méthode complémentaire dans cette séance. La méthode des puissances de deux rend plus visibles les positions et facilite la préparation aux représentations de largeur fixe.

!!! question "Construire puis vérifier"
    Convertissez les valeurs suivantes en binaire :

    1. `23`<sub>`10`</sub>
    2. `45`<sub>`10`</sub>
    3. `100`<sub>`10`</sub>
    4. `157`<sub>`10`</sub>

    Pour chaque conversion, indiquez la plus grande puissance de deux utilisée, montrez chaque soustraction, conservez les zéros correspondant aux positions ignorées et vérifiez le résultat en additionnant les valeurs des positions contenant `1`. Donnez ensuite la représentation hexadécimale obtenue par regroupement.

## Choisir la bonne méthode

Le sens de la conversion détermine la méthode la plus directe.

| Conversion | Méthode principale |
|---|---|
| Base 2 vers base 10 | Additionner les puissances de deux associées aux bits `1` |
| Base 16 vers base 10 | Multiplier chaque chiffre par sa puissance de seize, puis additionner |
| Base 10 vers base 2 | Décomposer la valeur en puissances de deux |
| Base 2 vers base 16 | Regrouper les bits par quatre à partir de la droite |
| Base 16 vers base 2 | Remplacer chaque chiffre par quatre bits |
| Base 10 vers base 16 | Passer par le binaire, puis regrouper les bits par quatre |

Une conversion peut être effectuée par plusieurs chemins. Une deuxième méthode constitue parfois une bonne vérification, mais elle ne remplace pas la démarche principale demandée.

## Erreurs fréquentes à éviter

### Commencer les positions à un au lieu de zéro

La position située complètement à droite correspond toujours à la puissance zéro : 2<sup>0</sup> = 1, 10<sup>0</sup> = 1 et 16<sup>0</sup> = 1.

### Utiliser un symbole absent de la base

Un nombre binaire ne peut contenir que `0` et `1`. Un nombre hexadécimal ne peut pas contenir une lettre située après `F`. Vérifiez les symboles avant de commencer une conversion.

### Confondre un chiffre hexadécimal et sa valeur

En hexadécimal, `A` représente la valeur décimale 10, `F` représente 15 et `10` représente 16.

### Regrouper le binaire à partir du mauvais côté

Pour un entier, les groupes de quatre doivent être alignés sur la position des unités, à droite.

### Supprimer un zéro situé au milieu

Seuls les zéros placés complètement à gauche peuvent être ajoutés ou retirés sans changer la valeur d'un entier. Un zéro situé entre d'autres bits conserve une position importante.

### Donner seulement le résultat

Une réponse peut être correcte par hasard ou provenir d'un outil mal configuré. Une démarche visible permet de vérifier les positions, les puissances, les soustractions, les regroupements et l'interprétation des lettres hexadécimales.

## Synthèse intégrée

!!! question "Une valeur sous trois formes"
    Considérez la valeur hexadécimale `0x5A`.

    1. Remplacez chaque chiffre hexadécimal par quatre bits.
    2. Conservez les deux groupes pour produire une représentation de huit bits.
    3. Convertissez cette représentation binaire vers la base 10 en montrant les valeurs de position.
    4. Vérifiez le résultat en développant directement `5A`<sub>`16`</sub> avec des puissances de seize.
    5. Expliquez comment les deux démarches confirment qu'il s'agit de la même valeur.

    N'utilisez un outil de conversion qu'après avoir terminé les deux démarches manuelles.

## Ce qu'il faut retenir

- Une valeur peut être représentée dans plusieurs bases.
- Dans un système positionnel, chaque position est une puissance de la base.
- Les circuits numériques interprètent couramment deux états logiques, représentés par `0` et `1`.
- Un bit est un chiffre binaire.
- Quatre bits forment seize configurations et correspondent exactement à un chiffre hexadécimal.
- L'hexadécimal rend les longues suites de bits plus compactes pour les humains.
- Une conversion doit conserver la valeur, même lorsque son écriture change.
- Une démarche complète permet de détecter et de corriger les erreurs.

## Passer à la pratique

[Poursuivre avec le Laboratoire 2 - Représenter une valeur en bases 2, 10 et 16](../laboratoires/laboratoire-2.md)

# Séance 8 - Carte mère et logique de montage d’un PC

## But de la séance

À la Séance 7, nous avons suivi le démarrage depuis les premières instructions du micrologiciel jusqu’au chargement du système d’exploitation. Le micrologiciel peut toutefois initialiser uniquement le matériel que la plateforme relie, alimente et prend en charge correctement.

Cette plateforme physique et logique est organisée autour de la **carte mère**.

Une carte mère ne rend pas un processeur, une mémoire, une carte graphique ou un SSD plus puissant par magie. Elle détermine plutôt :

- quels composants peuvent être installés;
- comment ils communiquent;
- quelles ressources ils partagent;
- quels connecteurs sont disponibles;
- quelles limites physiques et électriques doivent être respectées;
- quelles possibilités de mise à niveau resteront réalistes.

Cette séance répond à cinq questions :

> Comment une carte mère organise-t-elle les communications entre le processeur, la mémoire, le stockage et les périphériques?

> Pourquoi un socket compatible ne suffit-il pas toujours à garantir qu’un processeur fonctionnera?

> Comment distinguer la taille physique d’un connecteur PCIe, le nombre de lignes réellement câblées et la génération prise en charge?

> Pourquoi deux connecteurs M.2 qui se ressemblent peuvent-ils accepter des appareils différents?

> Comment vérifier qu’une carte mère, un boîtier, un bloc d’alimentation et les autres composants forment un système réellement montable?

## Objectifs

### Parcours principal

À la fin de la séance et du laboratoire associé, vous devriez être en mesure de :

- expliquer le rôle de la carte mère comme réseau de connexions, de contrôleurs, d’alimentation et de contraintes;
- distinguer socket du processeur, chipset et plateforme;
- expliquer pourquoi la compatibilité d’un processeur dépend du socket, du chipset, du micrologiciel et de la liste de prise en charge du fabricant;
- comparer les formats ATX, microATX et Mini-ITX selon leurs dimensions, leur capacité d’extension et les contraintes du boîtier;
- interpréter les fentes de mémoire, les canaux et les règles de population indiquées dans un manuel;
- distinguer la longueur physique d’une fente PCIe, le nombre de lignes électriques, la génération et la source des lignes;
- interpréter un connecteur M.2 selon sa clé, sa longueur, son interface, ses lignes et les ressources partagées;
- vérifier les principales compatibilités entre carte mère, boîtier, processeur, refroidissement, mémoire, cartes d’extension, stockage et bloc d’alimentation;
- produire une matrice de compatibilité qui distingue les éléments confirmés, les hypothèses et les vérifications encore nécessaires;
- recommander une plateforme adaptée à un besoin sans confondre nombre de connecteurs, performances réelles et possibilité d’évolution.

!!! question "Questions directrices"
    1. **Le composant peut-il être installé?** Format, socket, dimensions, emplacement et connecteur.
    2. **Le composant peut-il fonctionner?** Interface, micrologiciel, génération, lignes, puissance et prise en charge.
    3. **Le système complet reste-t-il cohérent?** Une compatibilité locale ne garantit pas que toutes les pièces fonctionnent ensemble sans partage, obstruction ou limite.

!!! info "Portée de la séance"
    **À maîtriser aujourd’hui :** rôle de la carte mère, chipset, socket, formats ATX, microATX et Mini-ITX, fentes de RAM, PCIe, M.2, connecteurs d’alimentation, compatibilité du boîtier et démarche de vérification.

    **À reconnaître aujourd’hui :** lignes PCIe fournies directement par le processeur ou par le chipset, partage de bande passante, QVL, VRM, connecteurs de ventilateurs, connecteurs du panneau avant et formats de bloc d’alimentation.

    **Pour aller plus loin après le lien du laboratoire :** bifurcation PCIe, topologies détaillées de lignes, étages d’alimentation, limites thermiques du VRM, cartes mères à plusieurs sockets et formats propriétaires. Cette partie est facultative.

## Le problème d’un ensemble de pièces « compatibles »

Considérons un projet de PC destiné au jeu et à la diffusion en continu. La liste provisoire comprend :

- un processeur de bureau récent;
- une trousse de mémoire DDR5;
- une carte graphique pleine longueur occupant plusieurs emplacements;
- deux SSD M.2 NVMe;
- un boîtier compact;
- un bloc d’alimentation modulaire.

Chaque pièce peut être excellente prise séparément. Pourtant, le montage peut échouer si :

- le socket du processeur ne correspond pas;
- la carte mère possède le bon socket mais exige une version de micrologiciel plus récente;
- le boîtier n’accepte pas le format de la carte mère;
- la carte graphique bloque un connecteur ou dépasse la longueur disponible;
- le deuxième SSD désactive un port SATA ou réduit les lignes d’une fente PCIe;
- le refroidisseur entre en collision avec la mémoire;
- le bloc d’alimentation manque du connecteur requis;
- un câble modulaire provenant d’un autre bloc est réutilisé.

La démarche correcte ne consiste donc pas à demander seulement :

> Est-ce que cette pièce est compatible?

Il faut plutôt demander :

> Avec quelle autre pièce, dans quelle configuration, selon quelle source et avec quelles conséquences?

??? question "Vérification : compatibilité locale ou système complet?"
    Une carte graphique PCIe peut être compatible avec la fente principale d’une carte mère, mais rester impossible à installer dans le boîtier à cause de sa longueur ou de son épaisseur. La compatibilité électrique locale ne prouve donc pas la compatibilité physique du système complet.

## La carte mère : une carte de connexions et de contraintes

La **carte mère** est le principal circuit imprimé d’un ordinateur modulaire. Elle porte ou relie notamment :

- le socket du processeur;
- les fentes de mémoire;
- le chipset;
- les fentes PCI Express;
- les connecteurs M.2 et SATA;
- les circuits d’alimentation;
- les connecteurs internes USB, audio et panneau avant;
- les contrôleurs réseau, audio et parfois sans fil;
- les ports d’entrée-sortie arrière;
- la mémoire flash contenant le micrologiciel de plateforme.

Elle ne se contente pas de « tenir les pièces ». Ses pistes, contrôleurs, commutateurs et connecteurs déterminent les chemins possibles entre les composants.

```text
                           ┌───────────────┐
                           │  processeur   │
                           └──────┬────────┘
                  mémoire directe│
             ┌────────────────────┼───────────────────┐
             ▼                    ▼                   ▼
        fentes RAM          PCIe principal      M.2 direct CPU
                                  │
                                  │ lien vers le chipset
                                  ▼
                           ┌───────────────┐
                           │    chipset    │
                           └──────┬────────┘
             ┌────────────────────┼────────────────────┐
             ▼                    ▼                    ▼
          USB / SATA          autres PCIe         réseau / audio
```

Ce schéma est un modèle général. Le nombre de lignes, les contrôleurs intégrés et les chemins précis varient selon le processeur, le chipset et la conception du fabricant.

!!! warning "Le chipset ne contrôle plus nécessairement tout"
    Dans les architectures PC anciennes, on présentait souvent un *northbridge* et un *southbridge*. Sur les plateformes modernes, plusieurs fonctions rapides, notamment le contrôleur mémoire et certaines lignes PCIe, sont généralement intégrées au processeur. Le chipset reste important, mais il ne constitue pas l’unique chemin entre le processeur et tous les périphériques.

<figure markdown="span">
  ![Vue d’une carte mère ATX équipée d’un processeur et de son ventilateur.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Atx_computer_motherboard_with_cpu_and_fan.jpg){ loading=lazy width="760" }
  <figcaption>Une carte mère ATX permet de repérer le socket du processeur, les fentes de mémoire, les fentes d’extension et les connecteurs internes. Image du domaine public, <a href="https://commons.wikimedia.org/wiki/File:Atx_computer_motherboard_with_cpu_and_fan.jpg">Wikimedia Commons</a>.</figcaption>
</figure>

## Le format : dimensions, points de fixation et capacité d’extension

Le **format** (*form factor*) décrit un ensemble de contraintes physiques, notamment :

- les dimensions de la carte;
- la position des points de fixation;
- l’emplacement général du panneau d’entrée-sortie;
- le nombre maximal d’emplacements d’extension disponible;
- la relation avec les boîtiers et certains blocs d’alimentation.

Les formats courants d’un PC de bureau modulaire sont :

| Format | Dimensions nominales courantes | Emplacements d’extension possibles | Compromis typique |
|---|---:|---:|---|
| ATX | 305 × 244 mm | Jusqu’à 7 | Plus d’espace pour les fentes, connecteurs et refroidissement |
| microATX | 244 × 244 mm | Jusqu’à 4 | Système plus compact avec une capacité d’extension réduite |
| Mini-ITX | 170 × 170 mm | 1 | Très compact, mais espace, connecteurs et refroidissement plus contraints |

Ces valeurs décrivent le standard général, pas la quantité garantie de connecteurs sur chaque produit. Une carte ATX peut laisser certains emplacements inutilisés; une carte microATX peut offrir quatre fentes de RAM ou seulement deux.

<figure markdown="span">
  ![Comparaison à l’échelle des formats ATX, microATX, DTX, Mini-ITX et Mini-DTX.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Comparison_ATX_%CE%BCATX_DTX_ITX_mini-DTX.svg){ loading=lazy width="560" }
  <figcaption>Comparaison des dimensions et des positions relatives des formats de cartes mères. Illustration : ScotXW, <a href="https://commons.wikimedia.org/wiki/File:Comparison_ATX_%CE%BCATX_DTX_ITX_mini-DTX.svg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

### Compatibilité descendante du boîtier

Un boîtier ATX accepte souvent des cartes ATX, microATX et Mini-ITX parce que les formats plus petits utilisent un sous-ensemble compatible des positions de fixation. Il faut toutefois vérifier le manuel du boîtier.

L’inverse n’est pas vrai : une carte ATX ne peut pas être placée dans un boîtier conçu uniquement pour Mini-ITX.

### Les entretoises

La carte mère repose sur des **entretoises** métalliques ou plastiques fixées au boîtier. Elles :

- alignent les trous de fixation;
- empêchent le dessous de la carte de toucher directement le châssis;
- maintiennent une distance mécanique stable.

Une entretoise placée là où la carte ne possède pas de trou peut toucher des contacts et provoquer un court-circuit. Le format doit donc être vérifié avant le montage.

??? question "Vérification : une carte plus petite est-elle toujours meilleure?"
    Non. Une carte plus petite facilite un montage compact, mais réduit souvent le nombre de fentes, de connecteurs et l’espace disponible autour des composants. Le choix dépend des besoins, du boîtier, du refroidissement et des mises à niveau prévues.

## Socket, chipset et plateforme

### Rappel : le socket du processeur

À la Séance 5, nous avons distingué le boîtier du processeur, le socket de la carte mère et les dispositions LGA et PGA. Nous avons aussi rencontré quelques familles récentes : Intel LGA1700 et LGA1851, ainsi qu'AMD AM4 et AM5.

Dans cette séance, nous ne cherchons plus seulement à reconnaître ces noms. Nous devons **prouver la compatibilité d'une plateforme**. La première vérification reste simple : le nom exact du socket du processeur doit correspondre à celui de la carte mère.

### Pourquoi le bon socket ne garantit pas le fonctionnement

Un processeur peut physiquement correspondre au socket, mais ne pas être pris en charge à cause :

- du chipset;
- de la conception électrique de la carte;
- de la version du micrologiciel;
- d’une limitation imposée par le fabricant;
- de la génération ou de la famille précise du processeur.

La source décisive est la **liste de processeurs pris en charge** publiée pour le modèle exact de carte mère. Cette liste indique souvent la version minimale du micrologiciel.

```text
compatibilité CPU
= socket correct
+ chipset et conception compatibles
+ version de micrologiciel suffisante
+ processeur présent dans la liste officielle
```

### Le chipset

Le **chipset** regroupe ou coordonne plusieurs fonctions d’entrée-sortie de la plateforme. Selon la génération, il peut fournir :

- des lignes PCIe supplémentaires;
- des ports USB;
- des ports SATA;
- des fonctions réseau ou audio associées;
- des options de gestion, de surcadençage ou de stockage;
- le lien avec certaines fonctions du micrologiciel.

Deux cartes utilisant le même socket peuvent donc offrir des capacités très différentes selon leur chipset et leur conception.

### La plateforme

Dans cette séance, le mot **plateforme** désigne l’ensemble cohérent formé par :

- une famille de processeurs;
- un socket;
- un ou plusieurs chipsets;
- une génération de mémoire;
- des règles de micrologiciel et de compatibilité.

Le nom commercial d’un chipset ne doit pas être interprété isolément. Il faut consulter les spécifications du processeur et de la carte mère.

!!! example "Cas de compatibilité : le socket correspond"
    Une carte mère possède le socket attendu et le processeur s’y installe physiquement. La liste officielle indique pourtant que ce processeur exige une version de micrologiciel plus récente que celle installée.

    **Fait :** le socket correspond.

    **Contrainte :** la carte doit pouvoir démarrer ou être mise à jour par une méthode compatible avec la version actuelle.

    **Question ouverte :** la carte possède-t-elle une fonction de mise à jour sans processeur pris en charge?

## Fentes de mémoire : type, nombre, canal et population

Les fentes de mémoire doivent correspondre au type de module pris en charge. Une fente DDR4 et une fente DDR5 possèdent des détrompeurs différents et ne sont pas interchangeables.

Pour vérifier la mémoire, il faut distinguer :

- la génération prise en charge;
- le format du module;
- la capacité maximale totale;
- la capacité maximale par fente;
- le nombre de fentes;
- le nombre de canaux du contrôleur mémoire;
- les débits pris en charge selon le processeur et la population;
- les règles de placement indiquées dans le manuel;
- les profils JEDEC et les profils facultatifs comme XMP ou EXPO.

### Fentes et canaux ne sont pas synonymes

Une carte mère peut posséder quatre fentes tout en utilisant un contrôleur à deux canaux. Les fentes sont alors réparties entre les canaux.

```text
canal A : A1 ─ A2
canal B : B1 ─ B2
```

Avec deux modules, le manuel peut recommander A2 et B2. Placer les modules dans A1 et A2 peut utiliser un seul canal ou produire une configuration différente.

!!! warning "La couleur des fentes n’est pas une preuve universelle"
    Les couleurs peuvent aider à regrouper les canaux, mais les conventions varient. Utilisez les étiquettes de la carte et le manuel du modèle exact.

??? question "Vérification : quatre fentes signifient-elles quatre canaux?"
    Non. Le nombre de fentes représente les emplacements physiques. Le nombre de canaux dépend du contrôleur mémoire et de la plateforme.

## PCI Express : taille physique, lignes et génération

PCI Express, ou **PCIe**, relie des cartes d’extension et certains périphériques internes au processeur ou au chipset.

Une liaison PCIe utilise un certain nombre de **lignes** (*lanes*). Les configurations courantes comprennent :

- x1;
- x2;
- x4;
- x8;
- x16.

Chaque ligne transporte des données dans les deux directions. Une génération plus récente augmente généralement la capacité par ligne.

### Trois propriétés à distinguer

Une fente possède au moins trois caractéristiques importantes :

1. **sa longueur physique**;
2. **le nombre de lignes réellement câblées**;
3. **la génération prise en charge par le chemin complet**.

Une fente de longueur x16 peut fonctionner électriquement en x4. La longueur permet l’installation physique d’une carte longue, mais ne garantit pas seize lignes.

```text
fente physique x16
┌──────────────────────────────────────────────┐
│ câblage possible : x16, x8, x4 ou autre      │
└──────────────────────────────────────────────┘
```

<figure markdown="span">
  ![Plusieurs fentes PCI Express de longueurs différentes sur une carte mère.](https://commons.wikimedia.org/wiki/Special:Redirect/file/PCI_Express.jpg){ loading=lazy width="720" }
  <figcaption>Les fentes PCIe peuvent avoir des longueurs différentes. La longueur visible ne suffit pas à déterminer le nombre de lignes câblées. Photo : Csendesmark, <a href="https://commons.wikimedia.org/wiki/File:PCI_Express.jpg">Wikimedia Commons</a>, domaine public.</figcaption>
</figure>

### Compatibilité entre générations

PCIe est conçu pour permettre une négociation entre générations compatibles. Une carte plus récente peut souvent fonctionner dans une fente plus ancienne, mais à la génération et au nombre de lignes communs les plus faibles.

Cela ne garantit pas :

- que le boîtier possède l’espace nécessaire;
- que le bloc d’alimentation possède les connecteurs requis;
- que la carte ne bloque pas d’autres fentes;
- que les performances maximales seront atteintes;
- que le micrologiciel et le système d’exploitation prennent en charge toutes les fonctions.

### Lignes du processeur et lignes du chipset

Les lignes PCIe peuvent provenir :

- directement du processeur;
- du chipset, qui communique ensuite avec le processeur par un lien partagé.

Les lignes directes sont souvent réservées à la carte graphique principale et à un ou plusieurs SSD rapides. Les lignes du chipset servent à d’autres fentes, contrôleurs ou connecteurs.

Plusieurs périphériques reliés au chipset peuvent partager la capacité du lien entre le chipset et le processeur. Le nombre total de ports ne représente donc pas toujours une capacité simultanée indépendante.

!!! example "Cas de partage"
    Une carte mère offre une fente PCIe secondaire et un deuxième connecteur M.2. Le manuel précise que l’installation d’un SSD dans ce connecteur réduit la fente secondaire à x2 ou la désactive.

    Les deux connecteurs existent physiquement, mais ils ne sont pas nécessairement utilisables simultanément à pleine capacité.

## M.2 : un format, plusieurs interfaces

**M.2** décrit un format de carte et de connecteur compact. Il ne signifie pas automatiquement « SSD NVMe ».

Un connecteur M.2 peut prendre en charge :

- PCIe/NVMe;
- SATA;
- USB;
- des cartes réseau sans fil;
- d’autres fonctions selon la clé et la conception.

### Longueur des modules

Une désignation comme `2280` décrit les dimensions :

```text
22 mm de largeur × 80 mm de longueur
```

D’autres longueurs existent, par exemple 2230, 2242, 2260 et 22110.

### Clés et détrompeurs

Les encoches du module et du connecteur forment des **clés**. Elles limitent les appareils pouvant être insérés et indiquent certaines possibilités d’interface.

Une correspondance mécanique ne suffit toutefois pas à garantir que la carte mère prend en charge le protocole de l’appareil.

<figure markdown="span">
  ![Connecteur M.2 de clé M sur une carte mère, avec positions de fixation pour modules 2260 et 2280.](https://commons.wikimedia.org/wiki/Special:Redirect/file/M.2_connector_on_a_computer_motherboard.jpg){ loading=lazy width="720" }
  <figcaption>Un connecteur M.2 avec clé M et plusieurs positions de fixation. Photo : Dsimic, <a href="https://commons.wikimedia.org/wiki/File:M.2_connector_on_a_computer_motherboard.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

### Questions à poser pour un SSD M.2

Pour chaque connecteur, vérifiez :

1. quelles longueurs physiques sont acceptées;
2. quelle clé est utilisée;
3. si SATA, PCIe/NVMe ou les deux sont pris en charge;
4. quelle génération PCIe est disponible;
5. combien de lignes sont fournies;
6. si les lignes viennent du processeur ou du chipset;
7. quelles ressources sont partagées;
8. si un dissipateur ou une vis de fixation est fourni;
9. si l’installation entre en conflit avec une carte d’extension.

!!! warning "M.2 ne garantit ni NVMe ni une vitesse précise"
    Le format physique, l’interface et la génération sont des propriétés distinctes. Un SSD M.2 SATA ne devient pas NVMe parce qu’il est installé dans un connecteur qui ressemble à celui d’un SSD PCIe.

## Compatibilité avec le boîtier

Le boîtier doit accepter plus que le seul format de la carte mère.

### Vérifications principales

| Élément | Vérification |
|---|---|
| Carte mère | Format accepté et positions d’entretoises |
| Carte graphique | Longueur, hauteur, épaisseur et nombre d’emplacements arrière |
| Refroidisseur CPU | Hauteur maximale ou dimensions du radiateur |
| Radiateur liquide | Position, longueur, épaisseur et conflit avec RAM ou carte mère |
| Bloc d’alimentation | Format, longueur et espace pour les câbles |
| Stockage | Nombre et format des baies ou supports |
| Panneau avant | USB, USB-C, audio, boutons et connecteurs correspondants |
| Ventilation | Positions de ventilateurs, sens du flux et dégagement |

### L’épaisseur d’une carte d’extension

Une carte graphique peut utiliser une fente PCIe x16 tout en occupant physiquement deux, trois ou davantage d’emplacements du boîtier. Elle peut alors :

- couvrir une fente PCIe voisine;
- bloquer un connecteur M.2;
- gêner des connecteurs SATA;
- limiter le flux d’air;
- entrer en collision avec un radiateur ou une cage de stockage.

### Le panneau avant

Un boîtier peut offrir un port USB-C avant, mais la carte mère doit posséder le connecteur interne correspondant. La présence d’un port extérieur ne crée pas le contrôleur ou l’en-tête interne requis.

!!! question "Vérification : le boîtier accepte ATX, donc tout entre?"
    Non. Le format de la carte mère ne confirme ni la longueur de la carte graphique, ni la hauteur du refroidisseur, ni le format du bloc d’alimentation, ni la présence des connecteurs du panneau avant.

## Compatibilité avec le bloc d’alimentation

Le bloc d’alimentation, ou **PSU**, doit fournir :

- une puissance suffisante;
- les tensions attendues;
- les connecteurs nécessaires;
- un format compatible avec le boîtier;
- une qualité et des protections adaptées au système.

### La puissance totale ne suffit pas

Une étiquette de `750 W` ne confirme pas à elle seule :

- le nombre de connecteurs CPU;
- le type de connecteur de la carte graphique;
- la longueur du bloc;
- la qualité de la régulation;
- la capacité à supporter des pointes de consommation;
- la compatibilité des câbles modulaires.

### Connecteurs courants

| Connecteur | Rôle général |
|---|---|
| ATX 24 broches | Alimentation principale de la carte mère |
| EPS CPU 4+4 ou 8 broches | Alimentation du processeur |
| PCIe 6+2 broches | Alimentation de certaines cartes d’extension |
| Connecteur haute puissance récent pour GPU | Alimentation de certaines cartes graphiques modernes |
| SATA alimentation | SSD, HDD et accessoires SATA |

Le manuel de la carte mère indique les connecteurs d’alimentation requis ou facultatifs. Le fabricant de la carte graphique indique le nombre et le type de connecteurs nécessaires.

!!! danger "Les câbles modulaires ne sont pas universels"
    Deux câbles peuvent posséder un connecteur qui entre dans le bloc d’alimentation tout en utilisant un câblage interne différent. Utilisez uniquement les câbles fournis ou explicitement approuvés pour le modèle exact du bloc d’alimentation.

### Format du bloc

Les boîtiers peuvent prendre en charge des blocs ATX, SFX ou d’autres formats. Un adaptateur mécanique ne résout pas nécessairement les limites de longueur, de refroidissement ou de câblage.

## Construire une matrice de compatibilité

Une matrice rend la décision vérifiable et empêche de perdre une dépendance entre les pièces.

| Relation à vérifier | Preuve attendue | État possible |
|---|---|---|
| CPU ↔ carte mère | Socket, liste CPU, version minimale du micrologiciel | Confirmé / à vérifier / incompatible |
| RAM ↔ CPU ↔ carte mère | Génération, capacité, débits, population, QVL facultative | Confirmé / à vérifier / incompatible |
| Carte mère ↔ boîtier | Format et points de fixation | Confirmé / à vérifier / incompatible |
| GPU ↔ carte mère | Fente, lignes et génération | Confirmé / à vérifier / incompatible |
| GPU ↔ boîtier | Dimensions et emplacements occupés | Confirmé / à vérifier / incompatible |
| GPU ↔ PSU | Puissance, connecteurs et recommandation du fabricant | Confirmé / à vérifier / incompatible |
| SSD M.2 ↔ carte mère | Longueur, clé, interface, lignes et partage | Confirmé / à vérifier / incompatible |
| Refroidisseur ↔ CPU ↔ carte mère ↔ boîtier | Socket, fixation, dégagement et capacité thermique | Confirmé / à vérifier / incompatible |
| Panneau avant ↔ carte mère | En-têtes USB, audio et boutons | Confirmé / à vérifier / incompatible |

### Les trois niveaux de preuve

**Confirmé** signifie qu’une source officielle répond directement à la question pour les modèles exacts.

**À vérifier** signifie qu’une compatibilité semble plausible, mais qu’une dimension, une version, un partage de lignes ou une condition manque encore.

**Incompatible** signifie qu’une contrainte identifiée empêche l’installation ou le fonctionnement prévu.

!!! example "Cas fil rouge : le projet Atlas"
    Le projet **Atlas** vise un PC de jeu et de diffusion en continu dans un boîtier compact. La carte mère microATX accepte le processeur et la DDR5 choisis. Elle possède deux connecteurs M.2 et une fente PCIe x16 principale.

    Il reste pourtant à vérifier :

    - la version minimale du micrologiciel pour le processeur;
    - le placement recommandé des deux modules de RAM;
    - le partage de lignes du deuxième M.2;
    - l’épaisseur de la carte graphique;
    - la hauteur du refroidisseur;
    - le connecteur USB-C du panneau avant;
    - le format et les câbles du bloc d’alimentation.

    Une liste de pièces n’est donc pas encore une recommandation complète.

## Une méthode de sélection en ordre logique

L’ordre suivant réduit les retours en arrière :

1. définir le besoin, le budget et les contraintes physiques;
2. choisir une famille de processeur adaptée;
3. choisir une plateforme et un chipset offrant les fonctions nécessaires;
4. vérifier la liste officielle des processeurs et le micrologiciel;
5. choisir le format de carte mère selon l’extension et le boîtier;
6. vérifier la mémoire et sa population;
7. vérifier les fentes PCIe, les lignes et les conflits;
8. vérifier les connecteurs M.2, SATA et les ressources partagées;
9. vérifier les dimensions du GPU et du refroidissement;
10. dimensionner et vérifier le bloc d’alimentation;
11. vérifier le panneau avant, les ventilateurs et les accessoires;
12. conserver les sources et les questions ouvertes dans la matrice.

Cette méthode n’impose pas qu’un seul composant soit toujours choisi en premier. Elle impose plutôt que chaque décision soit reliée aux contraintes déjà établies.

## Synthèse intégrée

La carte mère transforme un ensemble de composants en plateforme cohérente. Elle fournit :

- des connexions physiques;
- des chemins de communication;
- une distribution de l’alimentation;
- des contrôleurs et des interfaces;
- des limites de format, de lignes et de partage;
- un micrologiciel capable d’initialiser les composants pris en charge.

La compatibilité doit donc être examinée sur plusieurs plans :

```text
compatibilité mécanique
+ compatibilité électrique
+ compatibilité logique
+ compatibilité du micrologiciel
+ compatibilité thermique
+ compatibilité du système complet
```

Un seul « oui » ne suffit pas. Une recommandation solide relie chaque pièce aux autres, cite la documentation exacte et indique ce qui reste à confirmer.

## Erreurs fréquentes à éviter

### Choisir une carte mère seulement par son socket

Le socket est nécessaire, mais il faut aussi vérifier le chipset, la liste de processeurs et la version du micrologiciel.

### Supposer qu’un format plus grand est toujours supérieur

ATX offre souvent davantage d’extension, mais peut être inutile ou incompatible avec un besoin compact.

### Compter les fentes de RAM comme des canaux

Quatre fentes ne signifient pas quatre canaux. Consultez le contrôleur mémoire et le manuel.

### Lire « x16 » seulement à partir de la longueur de la fente

Une fente longue peut être câblée en x8 ou x4.

### Supposer que tous les connecteurs M.2 acceptent tous les SSD M.2

Il faut vérifier la clé, la longueur, l’interface, les lignes et le partage.

### Additionner les ports sans lire les notes de partage

Certains connecteurs désactivent ou réduisent d’autres ressources lorsqu’ils sont utilisés.

### Vérifier la carte mère et oublier le boîtier

La carte graphique, le refroidisseur, le radiateur, le bloc et les câbles possèdent leurs propres dimensions.

### Choisir un bloc uniquement selon les watts

Les connecteurs, la qualité, le format et les câbles sont également essentiels.

### Mélanger des câbles modulaires

Un câble physiquement compatible avec le bloc peut utiliser un brochage différent et endommager le matériel.

### Utiliser une photo comme seule preuve

Une photo aide à identifier les composants, mais le manuel et les spécifications déterminent les fonctions, les lignes et les limites.

## Ce qu’il faut retenir

### Quel est le rôle de la carte mère?

- Elle relie, alimente et organise les composants.
- Elle détermine les interfaces, les chemins et plusieurs limites de la plateforme.
- Elle ne garantit pas à elle seule les performances d’un composant.

### Comment vérifier un processeur?

- Vérifier le socket.
- Vérifier le chipset et la conception de la carte.
- Vérifier la liste officielle de processeurs.
- Vérifier la version minimale du micrologiciel.

### Que faut-il distinguer pour PCIe?

- Longueur physique de la fente.
- Nombre de lignes câblées.
- Génération du chemin.
- Source des lignes et partage possible.

### Que faut-il distinguer pour M.2?

- Format et longueur.
- Clé.
- Interface SATA ou PCIe/NVMe.
- Génération et nombre de lignes.
- Ressources partagées.

### Comment vérifier le montage complet?

- Utiliser une matrice de compatibilité.
- Vérifier les dimensions, connecteurs, lignes, puissance et micrologiciel.
- Consulter les manuels et listes officielles des modèles exacts.
- Nommer les questions encore ouvertes avant de recommander.

## Passer à la pratique

Le Laboratoire 8 vous demandera de lire des fiches techniques et des manuels, d’identifier les chemins et connecteurs d’une carte mère, puis de construire une plateforme de base compatible pour le projet Atlas.

[Continuer vers le Laboratoire 8 - Vérifier la compatibilité d’une plateforme PC](../laboratoires/laboratoire-8.md)

## Pour aller plus loin : alimentation, lignes et validation avancée

Cette section est facultative. Elle n’est pas requise pour le laboratoire principal.

### VRM et alimentation du processeur

Le **module de régulation de tension** ou VRM convertit et stabilise l’alimentation destinée au processeur et à d’autres composants. Le nombre de phases annoncé ne suffit pas à évaluer sa qualité; il faut considérer les composants, le contrôle, le refroidissement et la charge réelle.

### QVL

Une **liste de fournisseurs qualifiés** ou QVL indique des composants testés par le fabricant dans certaines configurations. L’absence d’un module dans la liste ne prouve pas automatiquement son incompatibilité, mais sa présence fournit une preuve supplémentaire pour la configuration testée.

### Bifurcation PCIe

La **bifurcation** permet de diviser certaines lignes fournies par le processeur, par exemple une liaison x16 en deux liaisons x8. Cette fonction dépend du processeur, de la carte mère, du micrologiciel et du câblage.

### Formats propriétaires

Certains ordinateurs préassemblés utilisent des cartes, boîtiers, blocs ou connecteurs propriétaires. Une ressemblance avec ATX ne garantit pas la conformité au standard.

### Validation après le montage

Après un montage autorisé, la validation devrait vérifier :

- l’absence de câble ou pièce en conflit;
- la détection du processeur, de la mémoire et du stockage;
- les températures et ventilateurs;
- le mode et la largeur des liens PCIe;
- la version et les réglages du micrologiciel;
- la stabilité sous une charge appropriée;
- le fonctionnement des ports du panneau avant.

## Sources techniques à consulter

- Manuel et page de spécifications du modèle exact de carte mère.
- Liste officielle de processeurs pris en charge et versions minimales du micrologiciel.
- Documentation du processeur pour la mémoire et les lignes PCIe fournies.
- Manuel du boîtier pour les formats et dégagements.
- Documentation du bloc d’alimentation et de la carte graphique pour la puissance et les connecteurs.
- [PCI-SIG — PCI Express](https://pcisig.com/pci-express)
- [UEFI Forum — UEFI Specifications](https://uefi.org/specifications)
- Pages de fichiers Wikimedia Commons citées sous les images pour les licences et attributions.

# Séance 12 - Du port au périphérique : vérifier une chaîne de connexion

## But de la séance

À la Séance 11, nous avons suivi des données jusqu’à l’image et au son. Cette chaîne se termine souvent par un écran, un casque, un microphone, une caméra, un contrôleur ou un autre périphérique. Or, un appareil ne devient pas utilisable simplement parce que sa fiche entre dans un port.

Une connexion fonctionnelle dépend d’un ensemble de conditions :

- la forme et l’orientation du connecteur;
- le protocole et la génération pris en charge;
- la capacité du port hôte;
- la capacité du câble, de l’adaptateur ou de la station d’accueil;
- la puissance disponible;
- la direction du signal;
- la capacité du périphérique;
- la détection par le système d’exploitation;
- le pilote et la configuration de l’application;
- les besoins d’accessibilité de la personne qui utilise le système.

Cette séance répond à cinq questions :

> Pourquoi deux connecteurs qui se ressemblent peuvent-ils offrir des fonctions très différentes?

> Comment interpréter correctement une connexion USB, particulièrement lorsque le connecteur est USB-C?

> Comment distinguer les principales connexions d’affichage, d’audio, de réseau et de stockage?

> Que font les pilotes et les interruptions lorsqu’un périphérique communique avec le système?

> Comment évaluer un périphérique d’accessibilité sans supposer qu’un seul produit convient à tout le monde?

## Objectifs

À la fin de la séance et du laboratoire associé, vous devriez être en mesure de :

- distinguer fiche, prise, port, câble, adaptateur, concentrateur et station d’accueil;
- séparer la forme physique d’un connecteur de son protocole, de son débit, de sa puissance et de ses fonctions facultatives;
- reconnaître les principales formes USB : Type-A, Type-B, Mini-B, Micro-B et Type-C;
- interpréter les débits USB 2.0, USB 5 Gbit/s, 10 Gbit/s, 20 Gbit/s, 40 Gbit/s et 80 Gbit/s à un niveau approprié;
- expliquer la notation `Gen 1x1`, `Gen 2x1` et `Gen 2x2` dans la documentation USB 3.2;
- expliquer pourquoi un port USB-C ne garantit ni un débit précis, ni une sortie vidéo, ni une puissance de charge précise;
- vérifier une chaîne USB selon le port, le câble, le concentrateur, le périphérique, la puissance et le pilote;
- reconnaître HDMI, DisplayPort, Mini DisplayPort, DVI et VGA et distinguer une connexion numérique d’une connexion analogique;
- reconnaître les connecteurs audio TS, TRS et TRRS et expliquer pourquoi une prise de 3,5 mm ne garantit pas une fonction précise;
- reconnaître le connecteur modulaire 8P8C couramment appelé RJ-45 et le distinguer de la technologie Ethernet;
- distinguer les connecteurs de données et d’alimentation SATA et rappeler les limites du format M.2;
- reconnaître les ports PS/2 et expliquer les précautions liées à cette interface héritée;
- expliquer le rôle de l’identification Plug-and-Play, d’un pilote de classe ou de fabricant et de la signature numérique;
- expliquer le rôle général d’une interruption et reconnaître la différence entre interruptions traditionnelles et interruptions signalées par message;
- appliquer une démarche de diagnostic qui isole une couche à la fois;
- transformer un besoin d’accessibilité en exigences de connexion, de logiciel, de montage, de soutien et de maintenance.

!!! info "Portée de la séance"
    **À maîtriser aujourd’hui :** connecteur et capacité; fiche, prise et port; chaîne complète de connexion; formes USB; USB 2.0 et débits USB 5/10/20/40/80 Gbit/s; notation USB 3.2 `Gen x`; USB-C et fonctions facultatives; puissance USB; HDMI, DisplayPort, DVI et VGA; audio 3,5 mm TS/TRS/TRRS; 8P8C dit RJ-45; SATA et M.2; PS/2; Plug-and-Play; pilotes; interruptions; méthode de diagnostic; périphériques d’accessibilité.

    **À reconnaître aujourd’hui :** USB Power Delivery jusqu’à 240 W dans une chaîne compatible; DisplayPort Alt Mode; câbles certifiés; adaptateurs actifs et passifs; TOSLINK; alimentation par Ethernet; négociation de lien; pilotes de classe; MSI et MSI-X; lignes braille, commutateurs d’accès et commande oculaire.

    **Pour aller plus loin après le lien du laboratoire :** brochages complets, analyseurs de protocole USB, calcul de bande passante vidéo, EDID, HDCP, câblage T568A/T568B, catégories Ethernet détaillées, normes PoE, architecture des contrôleurs d’interruptions et développement de pilotes. Cette partie est facultative.

## Le problème d’une seule prise USB-C

Un portable est relié à une station d’accueil par un câble USB-C. La station comporte :

- un écran externe;
- un SSD externe;
- un port Ethernet;
- un casque;
- une alimentation USB-C.

Le résultat observé est pourtant décevant :

- l’écran fonctionne seulement à une fréquence réduite;
- le SSD copie les fichiers beaucoup plus lentement qu’annoncé;
- le lien Ethernet négocie à 100 Mbit/s;
- le portable se décharge lentement pendant l’utilisation;
- le microphone du casque n’est pas sélectionné.

Toutes les fiches sont insérées correctement. Le problème peut néanmoins se trouver à plusieurs couches :

```text
besoin
  ↓
fonction attendue
  ↓
port de l’hôte
  ↓
câble, adaptateur, concentrateur ou station
  ↓
port et capacité du périphérique
  ↓
détection par le système
  ↓
pilote
  ↓
configuration de l’application
```

La forme du connecteur constitue seulement la première vérification.

## Nommer les objets avant de diagnostiquer

| Terme | Sens dans cette séance |
|---|---|
| Fiche | partie mâle insérée dans une prise |
| Prise ou réceptacle | partie femelle qui reçoit la fiche |
| Connecteur | ensemble mécanique et électrique formé par une fiche ou une prise |
| Port | point de connexion offert par un appareil; il comprend un connecteur et des capacités |
| Câble | conducteurs, blindage, électronique éventuelle et connecteurs reliant deux extrémités |
| Adaptateur | dispositif qui change une forme, une direction ou un protocole; il peut être passif ou actif |
| Concentrateur | dispositif qui partage une connexion entre plusieurs périphériques d’une même famille |
| Station d’accueil | dispositif qui regroupe plusieurs fonctions, contrôleurs, ports et parfois une alimentation |

Un **adaptateur passif** réorganise ou expose des signaux déjà produits par la source. Un **adaptateur actif** contient de l’électronique qui convertit le signal ou le protocole. La présence d’une électronique signifie que la direction, l’alimentation, le débit et la compatibilité doivent être vérifiés.

### Source, récepteur, hôte et périphérique

Dans une chaîne d’affichage, la **source** produit le signal et le **récepteur** le reçoit. Dans une chaîne USB classique, l’**hôte** organise la communication avec les **périphériques**.

Une fiche identique aux deux extrémités ne rend pas une fonction bidirectionnelle. Un câble DisplayPort vers HDMI, un adaptateur USB-C vers HDMI ou un convertisseur audio peut fonctionner dans une seule direction.

!!! warning "La symétrie physique n’est pas une preuve de symétrie fonctionnelle"
    USB-C est réversible mécaniquement, mais la fonction de chaque appareil, la direction de la puissance et les modes pris en charge restent négociés et documentés.

## USB : une famille de connecteurs, de débits et de fonctions

### Les formes de connecteurs

<figure markdown="span">
  ![Illustration à l’échelle des principales formes de connecteurs USB, des anciens types au Type-C.](https://commons.wikimedia.org/wiki/Special:Redirect/file/USB_connector_illustration%2C_to_scale%2C_grouping%2C_all.svg){ loading=lazy width="900" }
  <figcaption>Les formes USB comprennent Type-A, plusieurs formes Type-B, Mini, Micro et Type-C. Illustration : Matthew Wynn, <a href="https://commons.wikimedia.org/wiki/File:USB_connector_illustration,_to_scale,_grouping,_all.svg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

Les formes courantes à reconnaître sont :

| Forme | Emplacement fréquent | Remarque |
|---|---|---|
| USB Type-A | ordinateur, chargeur, concentrateur | forme héritée orientée; peut transporter plusieurs générations |
| USB Type-B standard | imprimante, scanner, équipement audio | forme carrée avec coins supérieurs biseautés |
| Mini-B | anciens appareils photo, contrôleurs et équipements spécialisés | interface héritée encore rencontrée |
| Micro-B | anciens téléphones, disques externes et petits appareils | existe en version USB 2 et en version élargie USB 3 |
| USB Type-C | ordinateurs récents, téléphones, stations, écrans et alimentation | forme réversible; capacités très variables |

Une couleur bleue dans un port Type-A a souvent signalé une capacité USB 3.x, mais la couleur ne constitue pas une preuve universelle. La documentation, le logo certifié et la fiche technique restent plus fiables.

### USB-C décrit la forme, pas la capacité complète

<figure markdown="span">
  ![Illustration de prises et fiches USB-C complètes, limitées à USB 2 et limitées à l’alimentation.](https://commons.wikimedia.org/wiki/Special:Redirect/file/USB_connector_illustration%2C_to_scale%2C_grouping%2C_Type-C.svg){ loading=lazy width="620" }
  <figcaption>Des connecteurs USB-C physiquement compatibles peuvent câbler toutes les fonctions, seulement USB 2 ou seulement l’alimentation. Illustration : Matthew Wynn, <a href="https://commons.wikimedia.org/wiki/File:USB_connector_illustration,_to_scale,_grouping,_Type-C.svg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

Un port ou un câble USB-C peut offrir une combinaison parmi :

- USB 2.0 seulement;
- USB 5, 10, 20, 40 ou 80 Gbit/s;
- alimentation de base;
- USB Power Delivery;
- sortie vidéo DisplayPort Alt Mode;
- transport USB4 de plusieurs protocoles;
- connexion Thunderbolt selon la plateforme;
- aucune donnée dans un câble destiné seulement à l’alimentation.

La question « Est-ce USB-C? » doit donc être suivie par :

> Quel débit, quelles voies, quelle puissance, quel mode vidéo et quelle fonction sont pris en charge par chaque élément de la chaîne?

## Les débits USB et la notation des générations

La documentation USB comporte deux vocabulaires : les noms de spécifications et les indications de performance destinées aux utilisateurs. Le USB-IF recommande de présenter clairement le débit, par exemple **USB 10Gbps**, plutôt que d’utiliser seulement un nom de génération.

| Indication de performance | Nom rencontré dans la documentation | Débit brut nominal maximal |
|---|---|---:|
| High-Speed USB | USB 2.0 | 480 Mbit/s |
| USB 5Gbps | USB 3.2 Gen 1x1 | 5 Gbit/s |
| USB 10Gbps | USB 3.2 Gen 2x1 | 10 Gbit/s |
| USB 20Gbps | USB 3.2 Gen 2x2 | 20 Gbit/s |
| USB 20Gbps ou 40Gbps | certaines mises en œuvre USB4 | 20 ou 40 Gbit/s |
| USB 80Gbps | USB4 Version 2.0 compatible | 80 Gbit/s |

Ces débits sont des plafonds de signalisation, non des débits garantis pour une copie de fichiers. L’encodage, le protocole, le contrôleur, le concentrateur, le stockage, le partage du lien et la charge réduisent le débit utile.

### Comprendre `Gen 1x1`, `Gen 2x1` et `Gen 2x2`

Dans USB 3.2 :

- `Gen 1` correspond à une signalisation de 5 Gbit/s par voie;
- `Gen 2` correspond à une signalisation de 10 Gbit/s par voie;
- `x1` utilise une voie;
- `x2` utilise deux voies.

Ainsi :

```text
Gen 1x1 = 5 Gbit/s × 1 voie = 5 Gbit/s
Gen 2x1 = 10 Gbit/s × 1 voie = 10 Gbit/s
Gen 2x2 = 10 Gbit/s × 2 voies = 20 Gbit/s
```

USB 3.2 Gen 2x2 exige un connecteur Type-C pour utiliser les deux voies. Un câble ou un port limité à une voie réduit la connexion à une capacité commune inférieure.

!!! warning "USB 3.0, 3.1 et 3.2 dans les anciennes fiches"
    Les noms historiques ont été réutilisés lors de révisions de la spécification. Une fiche « USB 3.1 » sans débit précis demeure ambiguë. Cherchez le débit en Gbit/s, le nombre de voies et le modèle exact.

### La règle de la capacité commune

Une connexion se règle généralement sur la meilleure capacité prise en charge par **tous** les éléments nécessaires :

```text
capacité utile possible
= minimum compatible de l’hôte, du port, du câble,
  du concentrateur ou adaptateur, et du périphérique
```

Exemple :

- port de l’ordinateur : USB 20Gbps;
- câble : USB 10Gbps;
- SSD : USB 20Gbps.

La connexion ne peut pas dépasser la capacité de 10 Gbit/s du câble, avant les pertes de protocole et les limites du SSD.

## USB et puissance

USB fournit de l’énergie en plus des données. Il faut distinguer :

- la puissance de base offerte par un port;
- la négociation USB Power Delivery, ou USB PD;
- la puissance maximale du chargeur;
- la puissance admissible du câble;
- la puissance demandée par l’appareil;
- la puissance conservée par une station pour ses propres fonctions.

USB PD 3.1 permet, dans une chaîne Type-C complète et compatible, une puissance allant jusqu’à **240 W**. Cela ne signifie pas que tout port USB-C fournit 240 W.

Le USB-IF demande maintenant que les câbles USB-C vers USB-C certifiés affichent une capacité de puissance de **60 W** ou **240 W**. Les câbles de données certifiés doivent aussi indiquer leur débit, sauf certaines exceptions USB 2.0.

!!! example "Le portable se décharge malgré le chargeur"
    Un chargeur de 100 W alimente une station qui réserve 15 W. Si le câble ou la station limite la puissance, le portable peut recevoir moins que sa demande. Vérifiez la puissance négociée à chaque étape plutôt que le seul nombre imprimé sur le chargeur.

### La direction de la puissance

USB PD peut négocier quelle extrémité fournit l’énergie. Un appareil capable de recevoir de la puissance n’est pas nécessairement capable d’en fournir. Une batterie externe, un écran et un portable peuvent changer de rôle selon la connexion et la négociation.

## USB-C, vidéo et stations d’accueil

DisplayPort Alt Mode utilise certaines voies rapides du connecteur USB-C pour transmettre un signal DisplayPort. Le port de l’hôte, le câble, l’adaptateur et l’écran doivent prendre en charge le chemin requis.

Une station d’accueil peut partager les voies entre :

- vidéo;
- données USB;
- Ethernet;
- stockage;
- autres contrôleurs.

Une combinaison d’écran à haute définition et de périphériques rapides peut donc rencontrer une limite de bande passante interne même si chaque port porte un nom rapide.

USB4 peut transporter dynamiquement plusieurs types de données sur un même lien. La capacité exacte dépend encore des appareils, du câble et de la mise en œuvre.

??? question "Vérification : un câble USB-C de charge peut-il toujours transporter une image?"
    Non. Un câble destiné à l’alimentation ou limité à USB 2 peut ne pas posséder les voies rapides requises pour DisplayPort Alt Mode. Vérifiez les logos, la fiche technique et la documentation des deux appareils.

## Affichage : HDMI, DisplayPort, DVI, VGA et USB-C

<figure markdown="span">
  ![Panneau présentant, de gauche à droite, des prises DisplayPort, HDMI, VGA et DVI.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Kramer_Electronics_SID-X1N-2.jpg){ loading=lazy width="850" }
  <figcaption>Les connecteurs DisplayPort, HDMI, VGA et DVI peuvent apparaître sur un même équipement, mais ils ne transportent pas tous le même type de signal. Photo : © Raimond Spekking, <a href="https://commons.wikimedia.org/wiki/File:Kramer_Electronics_SID-X1N-2.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

| Interface | Signal général | Audio | Usage et limite à reconnaître |
|---|---|---|---|
| HDMI | numérique | généralement oui | téléviseurs, écrans, projecteurs; fonctions et débit varient selon les ports et le câble |
| DisplayPort | numérique | oui | ordinateurs et écrans; versions, débits et fonctions doivent être vérifiés |
| Mini DisplayPort | numérique | oui | même famille logique dans une forme plus petite; également utilisée par certaines anciennes connexions Thunderbolt |
| DVI | numérique, analogique ou les deux selon la variante | généralement non | interface héritée; DVI-D, DVI-I et nombre de liaisons modifient la compatibilité |
| VGA, connecteur DE-15 | analogique | non | interface héritée; conversion depuis une sortie purement numérique exige généralement un convertisseur actif |
| USB-C avec DisplayPort Alt Mode ou USB4 | numérique | oui | la forme USB-C ne garantit pas la sortie vidéo |

### Le mode d’affichage est une combinaison

Une connexion doit transporter une combinaison de :

- dimensions en pixels;
- fréquence de rafraîchissement;
- profondeur de couleur;
- sous-échantillonnage éventuel;
- HDR;
- nombre d’écrans;
- compression éventuelle.

Le port de la carte graphique, le câble, l’adaptateur, la station et l’écran doivent tous accepter la combinaison.

### Le piège du numéro de version

Un numéro comme « HDMI 2.1 » ou « DisplayPort 2.1 » ne suffit pas pour connaître le mode réellement disponible. Vérifiez :

- la capacité du port exact;
- le débit de liaison;
- les fonctions mises en œuvre;
- le mode maximal publié;
- la certification du câble;
- les limites lorsque plusieurs ports sont utilisés.

Au moment de la rédaction, HDMI distingue notamment les câbles **Ultra High Speed** jusqu’à 48 Gbit/s et les câbles **Ultra96** jusqu’à 96 Gbit/s. VESA utilise des certifications comme **DP54** et **DP80** pour indiquer des capacités de câble DisplayPort. Ces noms peuvent évoluer; la base de données de certification et la documentation du fabricant restent les sources à vérifier.

### Adaptateurs et direction

- Un adaptateur DisplayPort vers HDMI peut dépendre d’une sortie compatible ou d’une conversion active.
- Un adaptateur HDMI vers DisplayPort exige généralement de l’électronique active et souvent une alimentation.
- Un adaptateur numérique vers VGA doit convertir un signal numérique en signal analogique.
- Un adaptateur qui change seulement la forme ne crée pas une fonction absente de la source.

!!! warning "Le câble n’augmente pas la capacité du port"
    Un câble certifié pour une capacité élevée ne transforme pas une sortie limitée en sortie plus rapide. Il retire seulement le câble comme goulot d’étranglement possible.

## Audio : même diamètre, fonctions différentes

<figure markdown="span">
  ![Comparaison d’une fiche audio TRS et d’une fiche TRRS de 3,5 mm.](https://commons.wikimedia.org/wiki/Special:Redirect/file/TRS_and_TRRS.jpg){ loading=lazy width="620" }
  <figcaption>Une fiche TRRS possède un contact supplémentaire par rapport à une fiche TRS. Photo : Rx5674, <a href="https://commons.wikimedia.org/wiki/File:TRS_and_TRRS.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</figcaption>
</figure>

Les lettres décrivent les contacts :

- **T** : pointe (*tip*);
- **R** : anneau (*ring*);
- **S** : manchon (*sleeve*).

| Forme | Nombre de contacts | Usage fréquent |
|---|---:|---|
| TS | 2 | signal mono ou commande simple |
| TRS | 3 | stéréo asymétrique, mono symétrique ou autre affectation |
| TRRS | 4 | casque stéréo et microphone, selon le brochage |

Le diamètre et le nombre de contacts ne définissent pas seuls la fonction. Une prise TRS peut être une sortie casque, une entrée ligne, une entrée microphone ou une connexion symétrique selon l’appareil.

### Prises séparées et prise combinée

Les ordinateurs de bureau utilisent souvent :

- vert : sortie ligne ou casque;
- rose : microphone;
- bleu : entrée ligne.

Ces couleurs sont des conventions, non une garantie universelle. Un portable peut employer une prise TRRS combinée. Un casque TRRS branché dans deux prises séparées exige un répartiteur adapté au bon brochage.

Deux brochages TRRS historiques, souvent appelés CTIA/AHJ et OMTP, placent différemment le microphone et la masse. Un appareil mal apparié peut produire un son sans microphone fonctionnel.

### Audio numérique

- **USB audio** présente un périphérique numérique au système d’exploitation.
- **HDMI et DisplayPort** peuvent transporter l’audio avec la vidéo.
- **TOSLINK** transporte un signal audio numérique optique dans certains équipements.
- Une interface audio professionnelle peut utiliser USB, Thunderbolt ou un autre protocole et nécessiter un pilote particulier.

Le périphérique sélectionné dans Windows et dans l’application peut différer. Une connexion physique correcte ne prouve donc pas que la bonne entrée ou sortie est active.

## Réseau : le connecteur 8P8C couramment appelé RJ-45

<figure markdown="span">
  ![Câble réseau à paires torsadées terminé par une fiche modulaire 8P8C couramment appelée RJ-45.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Patch_cable_with_RJ45_connector.jpg){ loading=lazy width="700" }
  <figcaption>La fiche modulaire possède huit positions et huit contacts. Le terme « RJ-45 » est courant en informatique; « 8P8C » décrit plus précisément la forme du connecteur. Photo : www.heimnetzwerke.net, <a href="https://commons.wikimedia.org/wiki/File:Patch_cable_with_RJ45_connector.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</figcaption>
</figure>

Dans le langage courant, **RJ-45** désigne le connecteur modulaire utilisé par l’Ethernet sur paires torsadées. Le terme technique **8P8C** indique huit positions et huit contacts. La norme de câblage, le câble et la technologie transportée restent des propriétés séparées.

Une fiche 8P8C ne prouve pas :

- la catégorie du câble;
- la qualité de terminaison;
- la vitesse du port;
- la vitesse négociée;
- la présence d’alimentation par Ethernet;
- même que le port transporte Ethernet dans tous les équipements spécialisés.

### Vitesse de port et vitesse de lien

Une carte peut annoncer 1 Gbit/s ou 2,5 Gbit/s, mais le lien se négocie selon les deux extrémités et le chemin de câblage.

```text
vitesse négociée
= meilleure capacité commune de la carte, du commutateur,
  du câble, des connecteurs et de la configuration
```

Un lien à 100 Mbit/s peut indiquer une limite du commutateur, un câble défectueux ou incomplet, une paire mal terminée, une configuration ou une capacité ancienne. L’adresse IP n’explique pas la vitesse physique du lien; les protocoles réseau seront approfondis à la Séance 14.

### Alimentation par Ethernet

Power over Ethernet, ou **PoE**, permet à certains équipements compatibles de fournir et de recevoir une alimentation sur le câblage Ethernet. La fiche 8P8C ne garantit pas PoE. Il faut vérifier la norme, la puissance disponible, l’équipement source et le périphérique alimenté.

## Stockage : SATA, M.2 et connexions externes

<figure markdown="span">
  ![Connecteurs SATA de données et d’alimentation côte à côte.](https://commons.wikimedia.org/wiki/Special:Redirect/file/SATA_data_and_power_connectors.jpg){ loading=lazy width="720" }
  <figcaption>SATA sépare le connecteur de données du connecteur d’alimentation. Photo : Bubba73, <a href="https://commons.wikimedia.org/wiki/File:SATA_data_and_power_connectors.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

### SATA

Un appareil SATA interne utilise généralement :

- un connecteur de données à 7 contacts;
- un connecteur d’alimentation à 15 contacts.

Les formes en L réduisent les erreurs d’orientation. Il faut néanmoins éviter de forcer le connecteur et vérifier le loquet, l’espace et le chemin du câble.

La possibilité de branchement à chaud dépend du contrôleur, du système, du boîtier, de l’alimentation et de la configuration. Dans ce cours, ne branchez ni ne débranchez un appareil SATA interne sous tension.

### M.2

<figure markdown="span">
  ![Schéma des clés B et M d’un connecteur M.2.](https://commons.wikimedia.org/wiki/Special:Redirect/file/M2_Edge_Connector_Keying.svg){ loading=lazy width="650" }
  <figcaption>Les encoches B et M réduisent certaines combinaisons incompatibles, mais la clé ne suffit pas à prouver le protocole pris en charge. Illustration : NikNaks, <a href="https://commons.wikimedia.org/wiki/File:M2_Edge_Connector_Keying.svg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</figcaption>
</figure>

Les Séances 8 et 9 ont établi que M.2 décrit une famille de formats et de connecteurs. Une carte M.2 peut utiliser SATA, PCIe/NVMe, USB ou d’autres interfaces selon sa clé et la documentation de l’emplacement.

La compatibilité exige de vérifier :

- la clé;
- la longueur;
- l’interface;
- le protocole;
- le nombre de lignes;
- les ressources partagées;
- la prise en charge par le micrologiciel et le système.

### Stockage externe

Un SSD externe peut contenir un SSD NVMe rapide, mais son débit utile dépend de son pont USB, de son câble, du port, de la température et du système de fichiers. Le mot « NVMe » à l’intérieur du boîtier ne garantit pas le débit externe annoncé.

## PS/2 : une interface héritée encore visible

<figure markdown="span">
  ![Ports PS/2 violet pour clavier et vert pour souris à l’arrière d’un ordinateur.](https://commons.wikimedia.org/wiki/Special:Redirect/file/PS2_keyboard_and_mouse_ports.jpg){ loading=lazy width="620" }
  <figcaption>Les ports PS/2 utilisent un connecteur Mini-DIN à six broches. Le violet et le vert sont des conventions courantes pour le clavier et la souris. Photo : Daniel Beardsmore, <a href="https://commons.wikimedia.org/wiki/File:PS2_keyboard_and_mouse_ports.jpg">Wikimedia Commons</a>, domaine public.</figcaption>
</figure>

PS/2 a été largement utilisé pour les claviers et les souris. Certains postes de laboratoire, équipements industriels et cartes mères actuelles conservent encore cette interface.

À reconnaître :

- connecteur Mini-DIN à six broches;
- violet généralement pour le clavier;
- vert généralement pour la souris;
- port bicolore combiné sur certains appareils;
- prise en charge possible avant le chargement complet des pilotes USB;
- débit et fonctions beaucoup plus limités que les périphériques USB modernes.

### Précautions

Contrairement à USB, PS/2 n’a pas été conçu comme une interface de branchement à chaud universellement sûre. Branchez ou débranchez un périphérique PS/2 lorsque l’ordinateur est éteint, sauf indication explicite du fabricant.

Un adaptateur passif USB-vers-PS/2 ne convertit pas le protocole. Il fonctionne seulement si le clavier ou la souris contient déjà l’électronique capable de communiquer selon les deux protocoles. Sinon, un convertisseur actif est nécessaire.

!!! warning "La couleur reste un indice"
    Un port combiné peut utiliser deux couleurs ou un symbole. Vérifiez le manuel plutôt que d’insérer une fiche en forçant.

## Plug-and-Play : identifier avant de piloter

Lorsqu’un périphérique est connecté, le système doit déterminer ce qui est présent et quel logiciel doit le gérer.

```text
bus ou contrôleur détecte un appareil
        ↓
identifiants de périphérique et de classe
        ↓
gestionnaire Plug-and-Play crée une instance
        ↓
recherche d’un pilote compatible
        ↓
chargement du pilote et attribution de ressources
        ↓
appareil présenté aux applications
```

Windows attribue un **identifiant d’instance** à chaque nœud de périphérique. Les identifiants matériels et compatibles aident à sélectionner un pilote.

### Pilote de classe et pilote de fabricant

Un **pilote de classe** prend en charge une catégorie normalisée, par exemple plusieurs claviers, souris, périphériques de stockage ou appareils audio USB. Un **pilote de fabricant** peut ajouter une fonction particulière, une optimisation ou une interface de gestion.

Le meilleur choix dépend du périphérique et de l’usage. Un pilote générique stable peut suffire; un pilote du fabricant peut être nécessaire pour une fonction spécialisée.

### Signature, fournisseur, version et date

Une fiche de pilote peut indiquer :

- fournisseur;
- version;
- date;
- fichier INF;
- signature numérique;
- classe de périphérique;
- état et code d’erreur.

Une signature aide à vérifier l’origine et l’intégrité du paquet selon les mécanismes Windows. Elle ne prouve pas que le pilote est exempt de défaut ni qu’il s’agit de la version la plus adaptée.

Une date plus récente n’est pas automatiquement préférable. Vérifiez :

- le modèle exact;
- la version du système d’exploitation;
- les notes de version;
- la source officielle;
- la possibilité de retour arrière;
- les politiques du poste géré.

!!! danger "Éviter les outils génériques de mise à jour de pilotes"
    N’installez pas un outil tiers qui promet de « mettre tous les pilotes à jour ». Utilisez Windows Update, la documentation du fabricant du système ou du composant et les procédures approuvées par l’organisation.

## Les interruptions : demander l’attention du processeur

Un périphérique doit signaler qu’un événement demande une intervention : donnée reçue, transfert terminé, touche pressée ou erreur détectée.

Deux méthodes générales existent :

- **scrutation** : le processeur ou le pilote vérifie périodiquement l’état;
- **interruption** : le périphérique signale un événement.

```text
événement matériel
    ↓
interruption ou message
    ↓
contrôleur et système d’exploitation
    ↓
routine courte du pilote
    ↓
travail différé et application informée
```

### Interruptions traditionnelles

Les systèmes historiques utilisaient des lignes IRQ physiques. Une interruption pouvait être déclenchée par niveau ou par front. Certaines lignes pouvaient être partagées selon le bus et la configuration.

### MSI et MSI-X

Les périphériques PCIe modernes utilisent souvent des **interruptions signalées par message**, ou MSI/MSI-X. Le périphérique écrit un message spécial plutôt que d’activer une ligne physique distincte. MSI-X permet plusieurs vecteurs, ce qui aide certains périphériques rapides à répartir leur travail.

Le gestionnaire Plug-and-Play et le pilote négocient et configurent ces ressources. Un numéro d’interruption partagé dans un outil d’observation ne prouve donc pas automatiquement un conflit.

!!! warning "Ne pas modifier les ressources manuellement"
    Le laboratoire observe seulement les périphériques et des scénarios fournis. Ne modifiez pas le Registre, les ressources d’interruption, le pilote ou l’état d’un périphérique.

## Une démarche de diagnostic par couches

Lorsque « le périphérique ne fonctionne pas », suivez un ordre qui limite les changements :

1. **Définir le symptôme exact** : aucune alimentation, aucune détection, débit faible, fonction absente ou application incorrecte.
2. **Vérifier la forme et la direction** : bon port, bon sens, adaptateur dans la bonne direction.
3. **Vérifier l’intégrité physique** : connecteur endommagé, câble plié, loquet, broches, saleté ou jeu mécanique.
4. **Vérifier la puissance** : source, câble, station et besoin du périphérique.
5. **Vérifier les capacités** : génération, voies, mode vidéo, vitesse réseau, signal analogique ou numérique.
6. **Observer la détection du système** : appareil présent, classe, état et identifiant.
7. **Vérifier le pilote** : fournisseur, version, erreur et source officielle.
8. **Vérifier l’application** : périphérique sélectionné, autorisation, format et réglage.
9. **Isoler une variable** : câble connu, autre port compatible, autre périphérique ou autre poste, sans changer plusieurs éléments à la fois.
10. **Conserver la preuve** : résultat, erreur, hypothèse, correction et question ouverte.

### Exemple : casque USB-C sans microphone

- La fiche entre dans le port.
- Le casque reçoit de l’énergie.
- Windows affiche une sortie audio, mais aucune entrée.

Questions à vérifier :

- le port et le casque utilisent-ils un protocole audio compatible?
- le câble transporte-t-il les données ou seulement la puissance?
- le périphérique d’entrée apparaît-il dans Windows?
- une permission de microphone bloque-t-elle l’application?
- l’application a-t-elle sélectionné une autre entrée?
- le fabricant exige-t-il un pilote ou un micrologiciel particulier?

La première correction ne consiste pas automatiquement à réinstaller un pilote.

## Périphériques d’accessibilité

Les périphériques d’accessibilité modifient ou complètent l’entrée et la sortie afin de réduire un obstacle précis. Ils peuvent inclure :

- clavier à grandes touches ou à contraste élevé;
- protège-clavier;
- clavier programmable ou à disposition particulière;
- boule de commande, joystick, pavé tactile ou souris adaptée;
- contacteur unique ou ensemble de contacteurs;
- commande au souffle;
- dispositif de suivi oculaire;
- ligne braille actualisable;
- afficheur tactile ou retour haptique;
- microphone et commande vocale;
- périphérique de sous-titrage ou d’amplification.

<figure markdown="span">
  ![Clavier à grandes touches et joystick utilisé comme dispositif de pointage alternatif.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Assistive_keyboard_and_Joystick.jpg){ loading=lazy width="720" }
  <figcaption>Un clavier à grandes touches et un joystick illustrent deux façons de modifier l’entrée. Photo : Humanblocks, <a href="https://commons.wikimedia.org/wiki/File:Assistive_keyboard_and_Joystick.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

### Évaluer selon le besoin réel

Une recommandation doit être construite avec la personne concernée. Demandez :

- quelle tâche pose un obstacle;
- quels mouvements, perceptions ou méthodes d’entrée sont disponibles;
- quelle fatigue ou précision doit être prise en compte;
- quel environnement et quelle position de travail sont utilisés;
- quelles applications doivent fonctionner;
- quel soutien est disponible.

### Vérifications techniques

| Domaine | Questions |
|---|---|
| Connexion | USB, Bluetooth, port spécialisé, adaptateur ou alimentation nécessaire? |
| Système | version de Windows, pilote, API d’accessibilité ou logiciel compagnon pris en charge? |
| Installation | privilèges d’administration, calibration, profil utilisateur ou service requis? |
| Positionnement | support, angle, distance, fixation et espace physique adaptés? |
| Interaction | latence, force, durée de maintien, répétition et rétroaction configurables? |
| Vie privée | caméra, microphone, données biométriques ou service infonuagique impliqués? |
| Fiabilité | solution de rechange en cas de panne ou de batterie vide? |
| Maintenabilité | câble, batterie, pièce, logiciel, garantie et soutien disponibles? |

<figure markdown="span">
  ![Ligne braille actualisable placée devant un ordinateur portable.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Brno%2C_Universal_Learning_Design%2C_Braille_laptop_2_-_detail.JPG){ loading=lazy width="760" }
  <figcaption>Une ligne braille actualisable traduit une sortie numérique en cellules tactiles et exige une compatibilité logicielle et matérielle. Photo : Michal Klajban (Podzemnik), <a href="https://commons.wikimedia.org/wiki/File:Brno,_Universal_Learning_Design,_Braille_laptop_2_-_detail.JPG">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</figcaption>
</figure>

Une fonction intégrée au système, comme les touches filtres, le clavier visuel, la commande vocale ou la commande oculaire, peut compléter un périphérique. Elle ne remplace pas automatiquement le matériel spécialisé.

!!! warning "Ne pas choisir à la place de la personne"
    Un produit présenté comme « accessible » n’est pas une recommandation complète. La personne doit pouvoir essayer ou valider la méthode, et la décision doit inclure les logiciels, le montage, la formation, le soutien et une solution de rechange.

## Méthode intégrée : prouver une chaîne de connexion

Pour chaque périphérique :

1. **Nommer la fonction exigée** : données, vidéo, audio, réseau, stockage, entrée ou alimentation.
2. **Identifier les rôles** : hôte, source, récepteur et périphérique.
3. **Reconnaître les connecteurs** : forme, orientation et direction.
4. **Vérifier le protocole** : USB, DisplayPort, HDMI, Ethernet, SATA, PS/2 ou autre.
5. **Vérifier la capacité** : débit, voies, mode, puissance, canaux ou définition.
6. **Vérifier chaque intermédiaire** : câble, adaptateur, station et connecteur interne.
7. **Observer le système** : instance Plug-and-Play, état, classe et identifiants.
8. **Vérifier le pilote et l’application** : source, version, sélection et permission.
9. **Vérifier l’accessibilité et l’usage** : position, interaction, rétroaction et solution de rechange.
10. **Conclure avec une limite** : fait confirmé, inférence, recommandation provisoire et preuve manquante.

## Erreurs fréquentes à éviter

### « La fiche entre, donc c’est compatible »

La forme ne prouve ni le protocole, ni le débit, ni la puissance, ni la direction.

### « USB-C signifie rapide »

Un câble ou un port Type-C peut être limité à USB 2, à l’alimentation ou à une fonction particulière.

### « USB 3.2 est toujours 20 Gbit/s »

USB 3.2 inclut 5, 10 et 20 Gbit/s. La notation `Gen` et le nombre de voies doivent être lus.

### « Un chargeur de 100 W donne toujours 100 W au portable »

La station, le câble, la négociation et le besoin de l’appareil limitent la puissance livrée.

### « Un adaptateur est bidirectionnel »

Plusieurs adaptateurs fonctionnent dans une seule direction ou exigent une conversion active.

### « RJ-45 indique la vitesse Ethernet »

Le connecteur ne révèle ni la catégorie du câble, ni le port distant, ni la vitesse négociée.

### « Un pilote signé est nécessairement le meilleur »

La signature est une preuve d’intégrité et d’origine selon le mécanisme utilisé, pas une garantie absolue de qualité ou de pertinence.

### « Deux appareils partagent un IRQ, donc ils sont en conflit »

Les systèmes modernes partagent et routent les interruptions, notamment avec MSI/MSI-X. Un conflit exige des symptômes et des preuves supplémentaires.

### « Un périphérique d’accessibilité convient à toute personne ayant le même diagnostic »

Les tâches, préférences, capacités, environnements et besoins de soutien diffèrent.

## Ce qu’il faut retenir

- Une connexion utilisable est une chaîne, pas seulement une forme de fiche.
- USB-C décrit un connecteur; le débit, la vidéo et la puissance doivent être vérifiés séparément.
- USB 3.2 comprend 5, 10 et 20 Gbit/s; `x1` et `x2` indiquent le nombre de voies.
- USB4 peut offrir 20, 40 ou 80 Gbit/s selon la mise en œuvre, le câble et les appareils.
- La meilleure capacité commune de la chaîne limite le résultat.
- HDMI, DisplayPort, DVI et VGA transportent des signaux et des fonctions différents.
- TS, TRS et TRRS décrivent des contacts, mais la fonction exacte dépend du brochage et de l’appareil.
- Le connecteur Ethernet courant est un 8P8C souvent appelé RJ-45; il ne garantit pas la vitesse du lien.
- SATA sépare données et alimentation; M.2 ne prouve pas à lui seul l’interface ou le protocole.
- PS/2 demeure présent sur certains systèmes et doit généralement être connecté hors tension.
- Plug-and-Play identifie l’appareil et aide Windows à sélectionner un pilote.
- Une interruption permet à un périphérique de signaler un événement; MSI/MSI-X sont courants sur PCIe.
- Le diagnostic doit isoler une couche et conserver les preuves.
- Un périphérique d’accessibilité doit répondre à une tâche et à une personne précises, avec une chaîne complète de soutien.

## Passer à la pratique

Le [Laboratoire 12 - Identifier, vérifier et diagnostiquer une chaîne de périphériques](../laboratoires/laboratoire-12.md) vous demande d’utiliser des images de référence, d’observer les périphériques et pilotes d’un poste sans privilèges d’administration, d’analyser des chaînes USB, d’interpréter un lien Ethernet, de résoudre des cas d’affichage, d’audio et de PS/2 et de recommander un périphérique d’accessibilité selon des exigences vérifiables.

## Pour aller plus loin

### Débits asymétriques USB4

USB4 Version 2.0 peut, dans certaines configurations, réaffecter des voies afin d’offrir une capacité asymétrique plus élevée dans une direction. Cette fonction ne doit pas être présumée à partir d’un connecteur ou d’un logo générique.

### EDID et découverte d’un écran

Un écran fournit des données d’identification et de capacité, souvent appelées EDID. Le système et le pilote les utilisent pour proposer des modes. Un adaptateur, un commutateur ou un câble défectueux peut empêcher une lecture correcte.

### Débit vidéo et compression

Un mode vidéo brut dépend du nombre de pixels, de la fréquence, du nombre de bits et du codage. Des mécanismes comme Display Stream Compression peuvent permettre un mode qui dépasserait autrement la capacité utile du lien.

### Sources techniques utiles

- [USB 3.2 - USB-IF](https://www.usb.org/usb-32-0)
- [USB4 - USB-IF](https://www.usb.org/usb4)
- [Câbles et connecteurs USB-C - USB-IF](https://www.usb.org/cable_connector)
- [USB Power Delivery - USB-IF](https://www.usb.org/usb-charger-pd)
- [FAQ DisplayPort - VESA](https://www.displayport.org/faq/)
- [Câbles HDMI certifiés](https://www.hdmi.org/resource/cables)
- [Classe Win32_PnPEntity - Microsoft Learn](https://learn.microsoft.com/fr-fr/windows/win32/cimwin32prov/win32-pnpentity)
- [Interruptions MSI - Microsoft Learn](https://learn.microsoft.com/fr-fr/windows-hardware/drivers/kernel/enabling-message-signaled-interrupts-in-the-registry)
- [Commande oculaire Windows - Microsoft](https://support.microsoft.com/fr-fr/accessibility/windows/eye-control/get-started-with-eye-control-in-windows)

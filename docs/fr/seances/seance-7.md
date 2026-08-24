# Séance 7 - Du courant au système d’exploitation : ROM, micrologiciel, BIOS et UEFI

## But de la séance

À la Séance 6, nous avons étudié la mémoire vive comme espace de travail du système. Cette mémoire est rapide et de grande capacité, mais elle est **volatile** : au moment où l’ordinateur reçoit du courant, la RAM ne contient encore ni système d’exploitation, ni pilote complet, ni programme utilisateur.

Une question reste donc ouverte :

> Si la RAM est vide au démarrage, où se trouvent les premières instructions exécutées par le processeur?

La réponse nous conduit au **micrologiciel** (*firmware*) de la plateforme. Conservé dans une mémoire non volatile, ce logiciel initialise suffisamment le matériel pour vérifier l’état du système, préparer la mémoire, trouver un programme d’amorçage et lui transférer le contrôle.

Cette séance répond à cinq questions :

> Quelle relation existe-t-il entre ROM, mémoire flash et micrologiciel?

> Que se passe-t-il entre l’appui sur le bouton d’alimentation et le chargement du système d’exploitation?

> Quelle différence faut-il faire entre le BIOS historique, l’UEFI moderne et l’écran de configuration souvent appelé « le BIOS »?

> Comment les réglages du micrologiciel et Secure Boot influencent-ils le démarrage, la compatibilité et la sécurité?

> Quand une mise à jour du micrologiciel est-elle justifiée, et pourquoi comporte-t-elle un risque particulier?

## Objectifs

### Parcours principal

À la fin de la séance et du laboratoire associé, vous devriez être en mesure de :

- expliquer pourquoi un ordinateur a besoin d’un logiciel persistant avant que la RAM et le système d’exploitation soient prêts;
- distinguer ROM, PROM, EPROM, EEPROM, mémoire flash, micrologiciel, BIOS, UEFI et interface de configuration;
- décrire une séquence de démarrage introductive, depuis la mise sous tension jusqu’au transfert du contrôle au chargeur du système d’exploitation;
- expliquer le rôle du POST, de l’initialisation du matériel, des variables non volatiles et de l’ordre de démarrage;
- comparer le démarrage BIOS traditionnel et le démarrage UEFI sans réduire la différence à l’apparence de l’interface;
- expliquer le principe de Secure Boot, ce qu’il vérifie et ce qu’il ne garantit pas;
- interpréter des réglages courants du micrologiciel et prévoir les conséquences possibles d’une modification;
- déterminer si une mise à jour du micrologiciel est pertinente à partir du modèle exact, de la version installée, des notes de version, du problème à résoudre et de la méthode de récupération disponible;
- formuler une recommandation prudente qui distingue bénéfice attendu, compatibilité, risque, preuve et procédure de retour en arrière.

!!! question "Questions directrices"
    1. **Quelle instruction peut être exécutée avant que la RAM contienne un système d’exploitation?**
    2. **Quelle étape possède actuellement le contrôle?** Micrologiciel, gestionnaire d’amorçage, chargeur du système ou noyau?
    3. **Quelle preuve justifie une modification?** Une option visible ou une version plus récente n’est pas, à elle seule, une raison suffisante.

!!! info "Portée de la séance"
    **À maîtriser aujourd’hui :** rôle du micrologiciel, mémoire non volatile, relation entre ROM et mémoire flash, POST et initialisation, séquence de démarrage, réglages du micrologiciel, BIOS traditionnel, UEFI, ordre de démarrage, variables non volatiles, Secure Boot, mise à jour du micrologiciel et gestion du risque.

    **À reconnaître aujourd’hui :** pile RTC, CMOS comme ancienne désignation de certaines données de configuration, partition système EFI, GPT, CSM, Option ROM, capsule de mise à jour, double image de micrologiciel et mécanisme de récupération.

    **Pour aller plus loin après le lien du laboratoire :** phases internes détaillées de l’initialisation UEFI, structure complète des variables Secure Boot, démarrage mesuré, TPM, attestations, microcode du processeur et micrologiciels de périphériques. Cette partie est facultative.

## Le problème du premier programme

Considérons l’état du système juste après la mise sous tension :

- le processeur vient de sortir de réinitialisation;
- la RAM ne contient pas encore les programmes de l’utilisateur;
- le système d’exploitation n’est pas encore chargé;
- les pilotes complets du système d’exploitation ne sont pas disponibles;
- le stockage contient des données persistantes, mais il faut déjà savoir comment y accéder.

Le processeur doit pourtant commencer quelque part. L’architecture de la plateforme définit donc une position initiale ou un mécanisme équivalent qui mène vers du code conservé dans une mémoire **non volatile**.

```text
mise sous tension
      ↓
état de réinitialisation du processeur
      ↓
premières instructions du micrologiciel
      ↓
initialisation progressive du matériel
      ↓
recherche d’une option de démarrage
      ↓
chargeur du système d’exploitation
      ↓
noyau et pilotes du système
```

Ce code persistant n’est pas encore Windows, Linux ou macOS. Il appartient à la plateforme et doit fonctionner avant que le système d’exploitation puisse prendre le relais.

??? question "Vérification : pourquoi le système d’exploitation ne peut-il pas être la première instruction?"
    Parce qu’il se trouve normalement sur un support de stockage et doit être localisé, lu et placé en mémoire. Un logiciel antérieur doit d’abord préparer suffisamment la plateforme pour effectuer ces opérations.

!!! example "Cas fil rouge : le poste Orion"
    Le poste **Orion** vient de recevoir une nouvelle trousse de mémoire DDR5. Au premier démarrage, le voyant **DRAM** reste allumé pendant environ 90 secondes, puis le poste démarre normalement. Les démarrages suivants sont rapides.

    La page de soutien du fabricant propose aussi une version de micrologiciel plus récente, décrite seulement par la formule « amélioration de la compatibilité de la mémoire ». Enfin, une clé USB de diagnostic utilisée par l’équipe technique est refusée lorsque Secure Boot est actif.

    Nous reviendrons à ce cas pour distinguer un comportement d’initialisation normal, un réglage à vérifier, un problème de confiance et une mise à jour réellement justifiée.

## De la ROM au micrologiciel moderne

### ROM : une fonction historique devenue une famille de technologies

**ROM** signifie *read-only memory*. Historiquement, le terme désignait une mémoire dont le contenu était fixé ou difficile à modifier.

Le mot reste utile pour comprendre l’évolution des mémoires non volatiles, mais une carte mère moderne n’utilise généralement pas une puce que l’on ne peut jamais réécrire. Son micrologiciel est habituellement conservé dans une forme de mémoire flash réinscriptible.

| Technologie | Possibilité de programmation | Possibilité d’effacement | Idée principale |
|---|---:|---:|---|
| ROM masquée | À la fabrication | Non | Contenu permanent produit avec la puce |
| PROM | Une fois après fabrication | Non | Programmation unique |
| EPROM | Plusieurs fois | Par rayonnement ultraviolet | La puce devait souvent être retirée |
| EEPROM | Plusieurs fois | Électriquement | Effacement et programmation sans rayonnement UV |
| Mémoire flash | Plusieurs fois | Électriquement, par blocs | Adaptée au stockage moderne de micrologiciels |

<figure markdown="span">
  ![Vue à travers la fenêtre de quartz d’une EPROM AMD 27128, montrant la puce de silicium sensible aux ultraviolets.](https://upload.wikimedia.org/wikipedia/commons/5/58/27128_EPROM_Silicon.jpg){ loading=lazy width="520" }
  <figcaption>Une EPROM effaçable aux ultraviolets. La fenêtre de quartz permettait d’exposer la puce à une source UV avant de la reprogrammer. Photo : Gareth Halfacree, <a href="https://commons.wikimedia.org/wiki/File:27128_EPROM_Silicon.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</figcaption>
</figure>

!!! warning "« ROM » ne signifie pas toujours impossibilité absolue de mise à jour"
    Dans la documentation ou dans la conversation, « ROM du BIOS » peut désigner de manière historique la mémoire non volatile qui contient le micrologiciel. Sur une plateforme moderne, cette mémoire est souvent réinscriptible.

### Micrologiciel : du logiciel lié au matériel

Un **micrologiciel** est un logiciel conservé dans un composant ou une plateforme afin de contrôler, initialiser ou exposer les fonctions d’un matériel.

Une carte mère possède un micrologiciel de plateforme, mais elle n’est pas seule :

- un SSD possède un micrologiciel qui contrôle la mémoire flash et les commandes du lecteur;
- une carte réseau possède un micrologiciel;
- un contrôleur de stockage peut exécuter son propre code;
- un clavier, un écran ou une station d’accueil peuvent recevoir des mises à jour de micrologiciel;
- le processeur peut recevoir des mises à jour de microcode chargées par la plateforme ou le système d’exploitation.

Le micrologiciel n’est donc pas synonyme de BIOS. **BIOS et UEFI sont des environnements de micrologiciel de plateforme**, tandis que le mot micrologiciel couvre beaucoup plus de composants.

<figure markdown="span">
  ![Petite puce de mémoire flash série à huit broches utilisée pour conserver le micrologiciel BIOS d’un ordinateur portable ThinkPad X220.](https://upload.wikimedia.org/wikipedia/commons/5/58/BIOS_chip_MXIC_25L6406E_on_a_ThinkPad_X220_motherboard_%28FRU_04W3286%29.jpg){ loading=lazy width="620" }
  <figcaption>La puce noire à huit broches, à gauche, est une mémoire flash série de 8 Mio utilisée pour conserver le micrologiciel de cette carte mère. Une « puce BIOS » moderne peut donc être physiquement très petite. Photo : Siarhei Besarab, <a href="https://commons.wikimedia.org/wiki/File:BIOS_chip_MXIC_25L6406E_on_a_ThinkPad_X220_motherboard_(FRU_04W3286).jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

### Où se trouvent les réglages?

Les anciennes explications présentent souvent deux puces distinctes :

- une ROM contenant le BIOS;
- une petite mémoire CMOS alimentée par une pile contenant tous les réglages.

Cette représentation aide à comprendre l’origine du vocabulaire, mais elle ne décrit pas fidèlement toutes les plateformes actuelles.

Sur un système moderne :

- le code du micrologiciel se trouve généralement dans une mémoire flash non volatile;
- des réglages et variables peuvent être conservés dans une zone non volatile de la plateforme;
- une pile alimente surtout l’horloge temps réel et peut aider à préserver certains états lorsque l’appareil est débranché;
- retirer la pile ou utiliser un cavalier de réinitialisation peut restaurer des paramètres par défaut, mais le comportement exact dépend de la carte mère.

!!! note "CMOS est souvent un héritage de vocabulaire"
    **CMOS** décrit d’abord une technologie de fabrication de circuits. Dans l’usage historique des PC, « effacer le CMOS » signifie réinitialiser les paramètres du micrologiciel. Pour une analyse technique actuelle, consultez la documentation de la plateforme au lieu de supposer l’architecture exacte de stockage.

<figure markdown="span">
  ![Pile bouton CR2032 installée dans son support sur une carte mère.](https://upload.wikimedia.org/wikipedia/commons/d/d8/CMOS_Battery%2C_Motherboard.jpg){ loading=lazy width="620" }
  <figcaption>La pièce ronde est une pile CR2032, souvent appelée « pile CMOS ». Elle alimente principalement l’horloge temps réel lorsque le poste est débranché; elle n’est pas elle-même la mémoire qui contient le micrologiciel. Photo : Kent Madsen, <a href="https://commons.wikimedia.org/wiki/File:CMOS_Battery,_Motherboard.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>.</figcaption>
</figure>

## La séquence de démarrage : une chaîne de responsabilités

Il n’existe pas une séquence identique pour toutes les machines. Les processeurs, cartes mères, appareils intégrés et systèmes d’exploitation varient. Nous pouvons toutefois construire un modèle introductif fiable.

### 1. Mise sous tension et réinitialisation

L’alimentation stabilise les tensions nécessaires. La plateforme maintient d’abord certaines parties en réinitialisation, puis autorise le processeur à commencer l’exécution depuis son point initial défini.

À cette étape, le système ne dispose pas encore de toutes les fonctions que vous utilisez dans un environnement normal.

### 2. Exécution du micrologiciel de plateforme

Le processeur commence à exécuter le code du micrologiciel. Celui-ci prépare progressivement les ressources nécessaires à la suite du démarrage.

Il peut notamment :

- initialiser le processeur et le jeu de composants;
- configurer le contrôleur mémoire;
- effectuer l’entraînement de la mémoire;
- rendre la RAM utilisable;
- découvrir et initialiser des périphériques essentiels;
- établir des tables et des informations que le système d’exploitation consultera;
- préparer une console d’affichage ou de diagnostic.

La Séance 6 nous aide ici : avant d’utiliser pleinement la RAM, le micrologiciel doit configurer la combinaison **processeur + contrôleur mémoire + carte mère + modules + paramètres**.

### 3. POST et diagnostic initial

Le terme **POST** (*power-on self-test*) désigne les vérifications effectuées pendant la mise sous tension.

Selon la plateforme, le diagnostic peut être communiqué par :

- un message à l’écran;
- une séquence sonore;
- des voyants de diagnostic;
- un afficheur de codes;
- un journal interne;
- une tentative automatique de récupération.

Le POST ne prouve pas que chaque composant est parfait. Il indique plutôt que les vérifications prévues ont progressé suffisamment ou qu’une erreur a été détectée à une étape donnée.

!!! warning "Un code sonore n’a pas de signification universelle"
    La signification dépend du fabricant, du modèle et du micrologiciel. La bonne source est le manuel de la carte mère ou du système, pas une table générique trouvée sans contexte.

!!! example "Retour au poste Orion : panne ou entraînement de la mémoire?"
    Le voyant DRAM et le délai de 90 secondes constituent des **observations**, pas encore un diagnostic. Puisque le poste termine son démarrage et que les démarrages suivants sont rapides, l’entraînement initial de la mémoire est une explication plausible. Il faut toutefois la vérifier dans le manuel ou la documentation du fabricant avant de conclure.

### 4. Application des réglages et découverte du matériel

Le micrologiciel applique des paramètres conservés et détecte les composants nécessaires au démarrage.

Exemples de réglages :

- date et heure;
- ordre de démarrage;
- activation ou désactivation de contrôleurs intégrés;
- mode d’un contrôleur de stockage;
- virtualisation matérielle;
- paramètres de mémoire;
- gestion des ventilateurs;
- options de sécurité;
- Secure Boot;
- paramètres de récupération.

Certaines modifications sont sans danger relatif et facilement réversibles. D’autres peuvent empêcher le système de démarrer, modifier la manière dont un disque est présenté au système d’exploitation ou réduire la sécurité.

### 5. Sélection d’une option de démarrage

Le micrologiciel cherche une option de démarrage selon sa politique et les réglages enregistrés.

Dans un environnement UEFI, le gestionnaire d’amorçage du micrologiciel utilise normalement des variables non volatiles qui décrivent les options et leur ordre. Une option peut pointer vers une application UEFI, notamment un chargeur de système d’exploitation situé sur une partition système EFI.

```text
ordre de démarrage enregistré
      ↓
option 1 valide?
   ├─ oui → charger l’application indiquée
   └─ non → essayer l’option suivante ou lancer la récupération
```

### 6. Transfert au chargeur du système d’exploitation

Lorsque le micrologiciel trouve une option utilisable, il charge et exécute le programme d’amorçage correspondant.

À partir de ce moment, une nouvelle étape possède le contrôle. Le chargeur du système d’exploitation :

- localise le noyau et les fichiers nécessaires;
- charge des composants en mémoire;
- prépare des informations de démarrage;
- transfère finalement le contrôle au noyau.

Le noyau initialise ensuite ses propres pilotes et services. Le micrologiciel n’est donc pas « le système d’exploitation avant le système d’exploitation » : il prépare et remet le contrôle à un autre logiciel.

??? question "Vérification : remettre la chaîne de contrôle en ordre"
    Placez ces éléments du premier au dernier : **noyau**, **micrologiciel de plateforme**, **chargeur du système d’exploitation**, **gestionnaire d’amorçage**.

    **Réponse :** micrologiciel de plateforme → gestionnaire d’amorçage → chargeur du système d’exploitation → noyau.

## BIOS : le sens historique et le sens courant

### Le BIOS traditionnel

**BIOS** signifie *Basic Input/Output System*. Dans le PC traditionnel, il fournissait :

- l’initialisation du matériel;
- des services d’entrée-sortie élémentaires;
- une interface de configuration;
- une méthode d’amorçage fondée sur les conventions historiques du PC.

Dans un démarrage BIOS classique depuis un disque, le micrologiciel lit un petit secteur initial et lui transfère le contrôle. Ce code doit ensuite trouver les étapes suivantes du chargeur.

Cette méthode est liée à des contraintes historiques, notamment la taille limitée du premier secteur et l’usage fréquent du schéma de partitionnement MBR.

### « Entrer dans le BIOS »

Dans le langage courant, une personne dit souvent :

> J’entre dans le BIOS pour changer l’ordre de démarrage.

Sur un ordinateur récent, elle utilise probablement l’**interface de configuration UEFI**. L’expression reste comprise, mais elle mélange :

- le micrologiciel de plateforme;
- la norme ou l’architecture utilisée;
- le programme de configuration affiché à l’écran.

Une interface graphique avec une souris ne suffit pas à prouver qu’un système utilise correctement toutes les fonctions UEFI. Inversement, une interface sobre n’est pas nécessairement un BIOS traditionnel.

## UEFI : une interface et une architecture de démarrage modernes

**UEFI** signifie *Unified Extensible Firmware Interface*.

UEFI définit des interfaces entre le micrologiciel de plateforme et les logiciels qui s’exécutent avant le système d’exploitation. Parmi ses capacités importantes :

- un gestionnaire d’amorçage fondé sur des options conservées dans des variables non volatiles;
- le chargement d’applications et de pilotes UEFI;
- l’utilisation d’une partition système EFI;
- une association courante avec le partitionnement GPT;
- des services accessibles aux chargeurs de système;
- une architecture extensible;
- Secure Boot.

### BIOS traditionnel et UEFI : comparer les mécanismes

| Question | BIOS traditionnel | UEFI |
|---|---|---|
| Comment trouve-t-il le prochain programme? | Suit des conventions d’amorçage historiques, souvent depuis un secteur initial | Utilise un gestionnaire d’amorçage et des options décrivant des fichiers ou applications UEFI |
| Où l’ordre est-il conservé? | Réglages propres au firmware | Variables non volatiles définies par UEFI |
| Partitionnement couramment associé | MBR | GPT et partition système EFI |
| Extensibilité avant le système | Limitée et dépendante des conventions historiques | Applications, pilotes et services UEFI définis |
| Secure Boot | Non défini par le BIOS traditionnel | Fonction définie par UEFI |

!!! warning "UEFI n’est pas simplement un BIOS plus joli"
    L’apparence de l’écran de configuration est un choix du fabricant. La différence essentielle concerne les interfaces, le gestionnaire d’amorçage, les données de démarrage et les fonctions disponibles avant le système d’exploitation.

??? question "Vérification : mécanisme ou apparence?"
    Classez chaque indice.

    1. Le menu accepte la souris.
    2. Le micrologiciel conserve une option qui pointe vers un fichier chargeur sur la partition système EFI.
    3. Le disque utilise GPT.
    4. L’écran de configuration est uniquement textuel.

    **Réponse :** les éléments 1 et 4 décrivent seulement l’apparence de l’interface. L’élément 2 constitue une preuve directe d’un mécanisme UEFI. L’élément 3 est couramment associé à UEFI, mais GPT seul ne décrit pas toute l’architecture de démarrage.

### UEFI, GPT et capacité des disques

On affirme souvent :

> Le BIOS accepte seulement 2,2 To, tandis que l’UEFI accepte 9,4 Zo.

Cette formule mélange plusieurs couches.

La limite souvent associée à environ `2 Tio` vient surtout de l’usage de secteurs logiques de 512 octets avec des champs d’adressage de 32 bits dans le schéma MBR :

```text
2³² secteurs × 512 octets ≈ 2 Tio
```

GPT utilise des structures et des champs d’adressage différents. UEFI est couramment utilisé pour démarrer depuis un disque GPT, mais la capacité réellement prise en charge dépend aussi :

- du système d’exploitation;
- du contrôleur de stockage;
- du format logique et physique des secteurs;
- du pilote;
- du micrologiciel;
- de l’outil de partitionnement.

La bonne conclusion n’est donc pas « UEFI garantit un disque de taille presque illimitée », mais plutôt :

> UEFI et GPT éliminent plusieurs contraintes historiques du démarrage BIOS/MBR, mais la compatibilité réelle doit être vérifiée sur l’ensemble de la plateforme.

## Les réglages du micrologiciel : observer avant de modifier

Une interface de configuration peut présenter des centaines d’options. L’objectif n’est pas de mémoriser chaque menu, mais de relier une option à une conséquence et à une preuve.

### Une méthode en cinq questions

Avant toute modification :

1. **Quel problème ou besoin cherche-t-on à résoudre?**
2. **Quelle option exacte contrôle ce comportement sur ce modèle?**
3. **Quelle valeur est actuellement utilisée?**
4. **Quel effet secondaire pourrait empêcher le démarrage ou modifier la sécurité?**
5. **Comment restaurer l’état antérieur?**

### Exemples de catégories

| Catégorie | Exemple | Risque à prévoir |
|---|---|---|
| Démarrage | Ordre de démarrage, démarrage USB | Charger le mauvais support ou ignorer le disque attendu |
| Stockage | Mode du contrôleur | Rendre un système installé temporairement impossible à démarrer |
| Mémoire | Profil de performance, paramètres automatiques | Instabilité ou échec de l’entraînement mémoire |
| Processeur | Virtualisation, cœurs, limites de puissance | Incompatibilité logicielle, chaleur ou comportement différent |
| Sécurité | Secure Boot, TPM, mot de passe du firmware | Refus d’un chargeur, perte d’accès ou réduction de la protection |
| Périphériques | Contrôleurs, ports, réseau intégré | Disparition d’un composant pour le système d’exploitation |

!!! danger "Ne modifiez pas un poste institutionnel sans autorisation"
    Une observation en lecture seule et une modification de plateforme ne sont pas équivalentes. Un réglage peut affecter le chiffrement, le démarrage, la sécurité ou la disponibilité du poste. Dans le laboratoire, les manipulations doivent rester dans l’environnement prévu et suivre les consignes données.

!!! example "Retour au poste Orion : observer avant de changer"
    Avant de modifier un profil mémoire, l’équipe note la capacité détectée, le débit configuré, l’ordre de démarrage, l’état de Secure Boot et la version du micrologiciel. Ces observations créent un état de référence et évitent d’attribuer ensuite chaque différence à une seule option.

??? question "Vérification : quelle proposition est techniquement prudente?"
    A. Activer immédiatement tous les profils de performance disponibles.

    B. Photographier ou noter l’état actuel, identifier le besoin, consulter le manuel, modifier une seule option autorisée, puis vérifier le résultat.

    C. Réinitialiser tous les réglages dès qu’un démarrage prend plus de temps que prévu.

    **Réponse : B.** La méthode conserve un état de référence, relie la modification à un besoin et permet d’isoler son effet.

## Secure Boot : vérifier avant d’exécuter

### Le problème de confiance avant le système d’exploitation

Avant que l’antivirus et les protections normales du système soient actifs, du code doit déjà s’exécuter. Un chargeur d’amorçage modifié pourrait tenter de prendre le contrôle très tôt.

**Secure Boot** est un mécanisme défini par UEFI qui permet au micrologiciel de vérifier la signature de composants exécutés pendant le démarrage. Le micrologiciel compare les signatures aux informations de confiance et de révocation conservées par la plateforme.

Dans un modèle simplifié :

```text
composant de démarrage
      ↓
signature vérifiable par une autorité approuvée?
   ├─ oui → exécution autorisée selon la politique
   └─ non → refus, avertissement ou récupération
```

Les éléments vérifiés peuvent comprendre :

- des pilotes UEFI;
- des Option ROM;
- des applications UEFI;
- le chargeur du système d’exploitation.

### Ce que Secure Boot apporte

Secure Boot peut réduire le risque qu’un composant de démarrage non approuvé ou modifié s’exécute avant le système d’exploitation.

Il crée une **chaîne de confiance** : chaque étape n’est exécutée que si la politique de la plateforme la considère comme acceptable.

### Ce que Secure Boot ne garantit pas

Secure Boot ne signifie pas :

- que tout le système est exempt de vulnérabilités;
- que tout logiciel signé est sans défaut;
- que les données de l’utilisateur sont chiffrées;
- que le système d’exploitation vérifiera automatiquement chaque application;
- qu’une configuration particulière convient à tous les systèmes;
- que l’option doit être désactivée dès qu’un autre système d’exploitation est utilisé.

Plusieurs systèmes d’exploitation non Windows disposent de chargeurs signés compatibles. La compatibilité dépend de la distribution, du matériel, des clés approuvées et de la configuration.

!!! warning "Désactiver n’est pas diagnostiquer"
    Désactiver Secure Boot peut contourner un refus de démarrage, mais cette action retire une protection. Une démarche responsable identifie d’abord le composant refusé, sa provenance, sa signature et la méthode prise en charge par le fabricant ou l’éditeur.

??? question "Vérification : signature valide ou logiciel parfaitement sûr?"
    Une signature valide établit principalement qu’un composant correspond à un éditeur ou à une autorité approuvée et qu’il n’a pas été modifié depuis sa signature. Elle ne prouve pas l’absence de vulnérabilité ou d’erreur.

!!! example "Retour au poste Orion : la clé USB refusée"
    Le refus ne prouve ni que la clé est malveillante, ni que Secure Boot est défectueux. Il indique que le composant de démarrage présenté ne satisfait pas la politique de confiance actuelle. L’équipe doit identifier l’image utilisée, vérifier sa provenance et chercher une version signée ou une procédure officiellement prise en charge avant d’envisager une modification de sécurité.

## Mettre à jour le micrologiciel : bénéfice ciblé, risque particulier

### Pourquoi mettre à jour?

Une mise à jour peut être justifiée pour :

- corriger une vulnérabilité;
- prendre en charge un nouveau processeur ou un nouveau composant;
- résoudre un problème de stabilité ou de compatibilité documenté;
- corriger un comportement de démarrage;
- améliorer la gestion de la mémoire;
- appliquer une mise à jour de microcode ou de clés de sécurité;
- réparer un défaut explicitement décrit dans les notes de version.

### Pourquoi ne pas mettre à jour automatiquement « parce qu’une version existe »?

Le micrologiciel intervient avant que les outils normaux de récupération soient disponibles. Une image incorrecte ou une interruption peut empêcher la plateforme d’atteindre le système d’exploitation.

Les risques comprennent :

- choix du mauvais modèle ou de la mauvaise révision de carte;
- image corrompue ou non authentique;
- interruption d’alimentation;
- arrêt ou redémarrage pendant l’écriture;
- perte ou réinitialisation de paramètres;
- incompatibilité avec une configuration existante;
- nécessité de suspendre ou de récupérer un chiffrement lié au TPM;
- impossibilité de revenir à une version antérieure;
- échec nécessitant une procédure de récupération matérielle.

??? question "Vérification : la mise à jour d’Orion est-elle déjà justifiée?"
    Le poste démarre maintenant normalement, et les notes de version indiquent seulement « amélioration de la compatibilité de la mémoire » sans nommer le problème, le module ou la plateforme concernés.

    **Conclusion provisoire :** les preuves ne justifient pas encore la mise à jour. Il faut d’abord vérifier si le délai initial correspond au comportement documenté d’entraînement de la mémoire, relever la version actuelle et chercher des notes de version plus précises. Une mise à jour pourrait devenir pertinente si un défaut reproductible correspond à une correction documentée.

### Une démarche de décision

#### 1. Identifier exactement la plateforme

Conservez :

- fabricant et modèle complet;
- révision matérielle, lorsqu’elle existe;
- version actuelle du micrologiciel;
- date de la version;
- système d’exploitation;
- chiffrement ou fonctions de sécurité actives.

#### 2. Lire les notes de version

Cherchez un lien direct entre le problème et la correction annoncée.

Une mention comme « amélioration de la stabilité » est moins précise qu’une note indiquant la correction d’un échec de démarrage avec un processeur ou une mémoire déterminée.

#### 3. Vérifier la source et la méthode

Utilisez la page officielle du fabricant pour le modèle exact. Vérifiez :

- le fichier et, si fourni, sa somme de contrôle;
- la méthode recommandée;
- les prérequis;
- les versions intermédiaires obligatoires;
- la nécessité de restaurer les paramètres par défaut;
- la procédure de sauvegarde ou de récupération;
- l’alimentation requise.

#### 4. Préparer l’échec possible

Selon la plateforme :

- brancher un portable à son adaptateur secteur;
- éviter une période à risque de panne électrique;
- conserver les clés de récupération du chiffrement;
- noter les réglages importants;
- préparer le support de récupération;
- vérifier la présence d’une fonction de récupération, d’un bouton de flashage ou d’une seconde image;
- prévoir une interruption de service.

#### 5. Ne pas interrompre l’écriture

Une fois l’écriture commencée, suivez les instructions du fabricant. N’éteignez pas l’appareil et ne retirez pas le support tant que la procédure ne l’autorise pas.

#### 6. Vérifier après le redémarrage

Confirmez :

- la nouvelle version;
- les paramètres restaurés ou modifiés;
- l’ordre de démarrage;
- Secure Boot et les fonctions de sécurité;
- la détection de la mémoire et du stockage;
- la résolution du problème initial;
- la stabilité du système.

### Mécanismes de récupération

Certaines plateformes réduisent le risque grâce à :

- une zone d’amorçage protégée;
- une image de secours;
- deux puces ou deux banques de micrologiciel;
- un bouton permettant de programmer la mémoire sans démarrage normal;
- une récupération depuis USB;
- une capsule de mise à jour validée et appliquée par le système.

Ces mécanismes ne sont pas universels. Leur présence, leurs limites et leur procédure doivent être vérifiées dans la documentation du modèle exact.

!!! danger "Une mise à jour n’est jamais sans risque"
    Une procédure de récupération réduit le risque, mais ne le supprime pas. La recommandation doit expliquer pourquoi le bénéfice attendu justifie ce risque sur cette plateforme précise.

## Synthèse intégrée : suivre le contrôle et la confiance

Pour analyser un démarrage ou une modification du micrologiciel, utilisez deux fils conducteurs.

### Fil 1 : qui possède le contrôle?

```text
micrologiciel de plateforme
      ↓
gestionnaire d’amorçage
      ↓
chargeur du système d’exploitation
      ↓
noyau
      ↓
pilotes et services
```

À chaque étape, demandez :

- quel programme s’exécute maintenant;
- où il était conservé;
- ce qu’il doit initialiser ou vérifier;
- quelle prochaine étape recevra le contrôle.

### Fil 2 : pourquoi cette étape est-elle digne de confiance?

Demandez :

- le composant provient-il de la bonne source?
- son intégrité peut-elle être vérifiée?
- la plateforme l’autorise-t-elle?
- une révocation ou une mise à jour de sécurité s’applique-t-elle?
- quel mécanisme de récupération existe?

### Méthode d’évaluation d’une modification

1. Définir le besoin ou le défaut observé.
2. Identifier le modèle, la version et l’état actuel.
3. Trouver la documentation officielle.
4. Relier la modification à un effet attendu.
5. Évaluer les conséquences sur le démarrage, le stockage, la mémoire, la sécurité et le chiffrement.
6. Préparer le retour en arrière ou la récupération.
7. Modifier seulement dans un environnement autorisé.
8. Vérifier le résultat et conserver les preuves.

## Erreurs fréquentes à éviter

### Dire que la ROM contient toujours un programme impossible à modifier

Les plateformes modernes utilisent généralement une mémoire flash réinscriptible. Le mot ROM reste surtout historique ou fonctionnel.

### Confondre micrologiciel et pilote du système d’exploitation

Un pilote exécuté par Windows ou Linux et un micrologiciel exécuté par un composant ne jouent pas le même rôle, même s’ils coopèrent pour contrôler le matériel.

### Appeler tout l’écran de configuration « le BIOS »

L’expression est courante, mais une analyse technique doit distinguer BIOS traditionnel, UEFI, micrologiciel et interface de configuration.

### Réduire UEFI à une interface graphique

UEFI définit des interfaces, un gestionnaire d’amorçage, des variables, des services et Secure Boot. L’apparence du menu n’est qu’une implémentation du fabricant.

### Dire que le POST teste complètement chaque composant

Le POST effectue des vérifications prévues par la plateforme. Il ne remplace pas un diagnostic complet.

### Utiliser une table universelle de codes sonores

Les codes dépendent du modèle et du fournisseur. Consultez la documentation exacte.

### Désactiver Secure Boot comme première solution

Cette action peut masquer le vrai problème et réduire la sécurité. Identifiez d’abord le composant et la politique qui causent le refus.

### Mettre à jour seulement parce qu’une version est plus récente

Une recommandation doit relier la mise à jour à un besoin, à des notes de version et à une méthode de récupération.

### Supposer qu’une seconde image élimine le risque

Une fonction de récupération peut elle-même avoir des limites, dépendre d’une procédure précise ou ne pas protéger contre une image destinée au mauvais modèle.

## Ce qu’il faut retenir

### Pourquoi le micrologiciel est-il nécessaire?

- La RAM est vide et volatile au démarrage.
- Le processeur doit commencer par du code persistant fourni par la plateforme.
- Ce code initialise suffisamment le matériel pour trouver et lancer l’étape suivante.

### Comment les termes se relient-ils?

- ROM décrit historiquement une mémoire en lecture seule; les micrologiciels modernes utilisent souvent de la mémoire flash.
- Le micrologiciel est du logiciel lié à un matériel.
- BIOS est l’environnement historique du PC.
- UEFI définit une architecture moderne de démarrage et des interfaces avant le système d’exploitation.
- L’écran de réglages est une interface de configuration, pas une preuve suffisante du mécanisme utilisé.

### Comment le système démarre-t-il?

- Le micrologiciel initialise le processeur, la mémoire et les périphériques essentiels.
- Il effectue des vérifications, applique des réglages et choisit une option de démarrage.
- Il charge une application ou un chargeur, qui charge ensuite le système d’exploitation.

### Que protège Secure Boot?

- Il vérifie les signatures de composants exécutés pendant le démarrage selon la politique de confiance de la plateforme.
- Il réduit le risque de code non approuvé avant le système d’exploitation.
- Il ne garantit ni l’absence de vulnérabilité, ni le chiffrement des données, ni la sécurité complète du système.

### Comment décider d’une mise à jour?

- Identifier précisément le modèle et la version.
- Lire les notes de version et relier la correction à un besoin réel.
- Utiliser la méthode officielle et préparer la récupération.
- Ne jamais interrompre l’écriture.
- Vérifier la version, les réglages, la sécurité et le problème initial après le redémarrage.

## Passer à la pratique

Le Laboratoire 7 vous demande d’observer les informations de micrologiciel rapportées par Windows, de reconstruire une séquence de démarrage, d’interpréter des réglages UEFI et d’évaluer une mise à jour sans modifier le poste institutionnel.

[Continuer vers le Laboratoire 7 - Observer et évaluer le démarrage et le micrologiciel](../laboratoires/laboratoire-7.md)

## Pour aller plus loin : confiance, mesures et composants spécialisés

Cette section est facultative. Elle n’est pas requise pour le laboratoire principal.

### Secure Boot, démarrage de confiance et démarrage mesuré

Ces expressions ne décrivent pas exactement la même fonction.

- **Secure Boot** autorise ou refuse l’exécution de composants selon des signatures et une politique.
- Un mécanisme de **démarrage de confiance** peut prolonger les vérifications à l’intérieur du système d’exploitation.
- Le **démarrage mesuré** enregistre des mesures cryptographiques des étapes dans un TPM afin qu’un autre service puisse évaluer l’état du démarrage.

Une mesure ne bloque pas nécessairement l’exécution. Elle produit une trace vérifiable.

### Microcode

Le microcode aide à mettre en œuvre certaines opérations internes du processeur. Une mise à jour peut être distribuée par le micrologiciel de plateforme ou chargée par le système d’exploitation pendant le démarrage.

Cela explique pourquoi deux machines équipées du même modèle de processeur peuvent recevoir une correction par des chemins différents.

### Option ROM et micrologiciels de périphériques

Des périphériques peuvent fournir du code exécuté avant le système d’exploitation, par exemple pour le démarrage réseau ou un contrôleur de stockage. Dans un environnement Secure Boot, ce code peut également devoir satisfaire la politique de signature.

### Phases internes UEFI

Une implémentation UEFI peut traverser plusieurs phases d’initialisation avant le gestionnaire d’amorçage. Les noms et responsabilités détaillés sont utiles pour le développement de micrologiciel et le diagnostic avancé, mais le parcours principal retient surtout ceci :

> La plateforme construit progressivement un environnement capable d’utiliser la mémoire, de découvrir le matériel, d’appliquer une politique de démarrage et de transférer le contrôle.

## Sources techniques à consulter

Les sources suivantes permettent de vérifier les mécanismes généraux présentés dans cette séance. Pour les réglages, codes de diagnostic, versions et procédures de récupération d’un ordinateur précis, consultez toujours la documentation correspondant au fabricant et au modèle exacts.

- [UEFI Forum — UEFI Specification 2.11](https://uefi.org/specs/UEFI/2.11/)
- [UEFI Forum — Boot Manager](https://uefi.org/specs/UEFI/2.11/03_Boot_Manager.html)
- [Microsoft Learn — Secure Boot](https://learn.microsoft.com/en-ca/windows-hardware/drivers/bringup/secure-boot)
- [Microsoft Learn — Secure Boot and Trusted Boot](https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/trusted-boot)
- [Microsoft Learn — Secure the Windows boot process](https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/secure-the-windows-10-boot-process)
- Documentation officielle du fabricant de la carte mère ou du système pour :
    - les réglages du micrologiciel;
    - les codes ou voyants de diagnostic;
    - les versions et notes de mise à jour;
    - les procédures de récupération;
    - les exigences de compatibilité propres au modèle.

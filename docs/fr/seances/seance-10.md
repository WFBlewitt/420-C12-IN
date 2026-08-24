# Séance 10 - Du matériel aux services : le système d’exploitation

## But de la séance

À la Séance 9, nous avons suivi le stockage depuis le support physique jusqu’au volume et au système de fichiers. Un système de fichiers peut organiser des noms, des dossiers, des métadonnées et de l’espace libre, mais il ne décide pas à lui seul :

- quel programme obtient du temps de processeur;
- quelle zone de mémoire appartient à quel programme;
- qui peut ouvrir ou modifier un fichier;
- comment une application communique avec un écran, un clavier, un disque ou une carte réseau;
- comment plusieurs tâches partagent les mêmes ressources sans se confondre.

Ces responsabilités appartiennent principalement au **système d’exploitation**.

Cette séance répond à cinq questions :

> Comment un système d’exploitation transforme-t-il du matériel général en services utilisables par les applications?

> Comment partage-t-il le processeur, la mémoire, les fichiers et les périphériques?

> Comment un fichier peut-il être retrouvé lorsque ses données occupent plusieurs unités de stockage?

> Pourquoi les systèmes modernes possèdent-ils à la fois des héritages de terminaux textuels, de micro-ordinateurs et d’interfaces graphiques?

> Comment comparer une famille de systèmes d’exploitation selon un besoin plutôt que selon une préférence personnelle?

## Objectifs

À la fin de la séance et du laboratoire associé, vous devriez être en mesure de :

- expliquer le rôle du système d’exploitation comme gestionnaire de ressources et couche d’abstraction;
- distinguer programme, processus, fil d’exécution et service à un niveau introductif;
- interpréter des états et des mesures simples de processus sans conclure à partir d’un seul instantané;
- expliquer l’allocation, l’isolation et la mémoire virtuelle à un niveau conceptuel;
- relier fichier, dossier, métadonnées, unité d’allocation et espace libre;
- suivre une chaîne simplifiée dans une table d’allocation de fichiers;
- expliquer le rôle général d’un pilote de périphérique;
- distinguer terminal, interpréteur de commandes, interface en ligne de commande et commande;
- naviguer dans une arborescence avec des chemins absolus et relatifs;
- situer Unix, Apple DOS, MS-DOS, Xerox Alto, Macintosh, Windows et Linux dans quelques grandes évolutions historiques;
- distinguer **héritage technique**, **influence sur l’interface** et **simple ressemblance**;
- expliquer pourquoi une interface graphique n’est qu’une partie d’un système d’exploitation;
- reconnaître les principales familles actuelles de systèmes de bureau, de serveur et mobiles;
- comparer des systèmes d’exploitation selon la compatibilité, le soutien, la sécurité, les applications, l’administration et le coût total.

!!! info "Portée de la séance"
    **À maîtriser aujourd’hui :** rôle d’un système d’exploitation; processus et ordonnancement à haut niveau; allocation et isolation de la mémoire; fichiers, dossiers et unités d’allocation; table d’allocation simplifiée; pilotes; terminal, shell et ligne de commande; chemins absolus et relatifs; commandes élémentaires de `cmd.exe`; familles Windows, macOS, Linux, Android et iOS/iPadOS; méthode de comparaison selon un besoin.

    **À reconnaître aujourd’hui :** noyau et espace utilisateur; fils d’exécution; services; pagination; mémoire d’échange; permissions; distributions Linux; éditions et cycles de soutien; systèmes sans interface graphique locale; rôle historique de Unix, Apple DOS, MS-DOS, Xerox Alto, Macintosh, Windows NT et Linux; distinction entre filiation technique et influence conceptuelle.

    **Pour aller plus loin après le lien du laboratoire :** algorithmes d’ordonnancement, remplacement de pages, appels système, architectures de noyau, conteneurs, virtualisation et détails internes de NTFS, APFS, ext4 ou Btrfs. Cette partie est facultative.

## Le problème d’un ordinateur qui fait « tout en même temps »

Sur un poste de laboratoire, vous pouvez écouter un fichier audio, télécharger un document, modifier du texte et déplacer une fenêtre presque simultanément. Pourtant :

- le processeur possède un nombre fini de cœurs;
- la mémoire vive possède une capacité finie;
- le stockage et le réseau possèdent une bande passante finie;
- plusieurs applications peuvent demander le même périphérique.

Le système d’exploitation doit donc transformer des ressources limitées en services suffisamment ordonnés, protégés et prévisibles.

```text
applications
    ↓ demandes de services
système d’exploitation
    ├── gestion des processus
    ├── gestion de la mémoire
    ├── gestion des fichiers
    ├── gestion des périphériques
    └── sécurité, comptes et communications
    ↓ commandes adaptées
matériel et micrologiciels
```

Ce modèle ne signifie pas que le système d’exploitation accomplit seul tout le travail. Le processeur exécute les instructions, les contrôleurs déplacent des données et les périphériques réalisent leurs fonctions. Le système d’exploitation coordonne ces éléments et présente des interfaces communes.

??? question "Vérification : le bureau graphique est-il le système d’exploitation?"
    Non. Le bureau, les fenêtres et les menus constituent une interface importante, mais un système d’exploitation comprend aussi le noyau, les services, les pilotes, la gestion des comptes, les systèmes de fichiers et plusieurs outils qui peuvent fonctionner sans interface graphique locale.

## Programme, processus et fil d’exécution

Un **programme** est un ensemble d’instructions et de données conservé dans un fichier. Lorsqu’il est chargé et exécuté, le système crée un **processus** avec notamment :

- un identifiant;
- un espace mémoire;
- des ressources ouvertes;
- un état d’exécution;
- des droits associés à un compte ou à un contexte de sécurité.

Deux processus peuvent exécuter le même programme tout en conservant des données séparées. Par exemple, deux fenêtres d’une application peuvent appartenir à un ou plusieurs processus selon la conception du logiciel.

Un **fil d’exécution** est un chemin d’exécution à l’intérieur d’un processus. Plusieurs fils d’un même processus partagent généralement une partie des ressources du processus. Cette organisation peut améliorer la réactivité ou le parallélisme, mais elle exige une coordination correcte.

<figure markdown="span">

```text
nouveau → prêt → en exécution → attente
             ↑          │          │
             └──────────┴──────────┘
                 ordonnanceur
```

<figcaption>Modèle simplifié des états d’un travail : l’ordonnanceur choisit parmi les fils prêts; une entrée-sortie peut placer un fil en attente avant son retour à l’état prêt. Diagramme original du cours, CC BY 4.0.</figcaption>
</figure>

### L’ordonnancement

Le système d’exploitation choisit quels fils prêts à travailler obtiennent du temps de processeur. Ce choix dépend notamment :

- du nombre de cœurs logiques disponibles;
- de l’état du fil;
- de la priorité;
- des attentes d’entrée-sortie;
- des politiques du système.

Un fil qui attend une lecture de disque n’a pas besoin d’occuper continuellement un cœur. Le système peut exécuter un autre travail pendant l’attente.

!!! warning "Un pourcentage est un instantané"
    Une utilisation élevée du processeur pendant quelques secondes ne prouve pas qu’un processus est défectueux. Conservez le contexte : durée, charge demandée, nombre de cœurs, activité d’entrée-sortie et évolution de la mesure.

## La mémoire : allocation, isolation et mémoire virtuelle

À la Séance 6, nous avons étudié la mémoire vive comme composant. Le système d’exploitation doit maintenant la partager entre plusieurs processus.

Il assure notamment :

- l’**allocation** de régions de mémoire;
- l’**isolation** afin qu’un processus ne lise pas normalement la mémoire privée d’un autre;
- la traduction entre les adresses utilisées par un processus et les emplacements réellement disponibles;
- la récupération de mémoire lorsqu’un processus se termine;
- l’utilisation possible du stockage comme soutien lorsque la pression mémoire augmente.

Chaque processus travaille généralement dans un **espace d’adresses virtuel**. Une adresse vue par le programme n’est donc pas nécessairement une adresse physique directe dans une puce de RAM.

```text
adresse virtuelle du processus
          ↓ traduction et protection
page en mémoire vive ou autre état géré
          ↓
emplacement physique ou donnée à récupérer
```

La **pagination** divise la mémoire en unités gérables. Selon le système et la situation, certaines données peuvent être déplacées ou récupérées depuis un espace de stockage. Cette technique peut permettre au système de continuer à fonctionner, mais le stockage reste beaucoup plus lent que la RAM.

??? question "Vérification : plus de mémoire virtuelle signifie-t-il plus de RAM?"
    Non. La mémoire virtuelle est un mécanisme d’adressage et de gestion. L’utilisation du stockage peut soutenir le système sous pression, mais elle ne transforme pas un SSD en mémoire vive équivalente.

## Les fichiers : noms visibles et unités allouées

À la Séance 9, nous avons distingué disque, partition, volume et système de fichiers. Le système d’exploitation utilise le système de fichiers pour relier :

- un nom et un chemin;
- des métadonnées;
- des droits;
- une taille logique;
- des unités de stockage allouées;
- les données du fichier.

Une **unité d’allocation**, souvent appelée *cluster* dans les systèmes FAT et NTFS, regroupe un ou plusieurs secteurs logiques. Un petit fichier peut occuper une unité entière même si une partie demeure inutilisée.

### Une table d’allocation simplifiée

Dans une famille FAT, une table peut indiquer pour chaque unité :

- qu’elle est libre;
- qu’elle pointe vers l’unité suivante d’un fichier;
- qu’elle termine une chaîne;
- qu’elle est réservée ou défectueuse.

Considérons cette représentation pédagogique :

| Unité | Valeur dans la table | Interprétation |
|---:|---:|---|
| 2 | 7 | continuer à l’unité 7 |
| 3 | libre | disponible |
| 4 | fin | dernière unité d’un fichier |
| 5 | 4 | continuer à l’unité 4 |
| 6 | libre | disponible |
| 7 | 9 | continuer à l’unité 9 |
| 8 | fin | dernière unité d’un fichier |
| 9 | fin | dernière unité d’un fichier |

Si l’entrée de dossier d’un fichier indique une première unité `2`, sa chaîne est :

```text
2 → 7 → 9 → fin
```

Si un autre fichier commence à `5`, sa chaîne est :

```text
5 → 4 → fin
```

Les unités d’un fichier ne doivent donc pas être contiguës. Cette dispersion peut s’appeler **fragmentation**. Elle ne signifie pas automatiquement que le fichier est corrompu.

!!! warning "Le modèle FAT n’explique pas tous les systèmes de fichiers"
    NTFS, APFS, ext4 et d’autres systèmes utilisent des structures plus complexes. La table simplifiée sert à comprendre le problème général : relier un nom logique à des emplacements de stockage et suivre cette relation de façon cohérente.

## Les périphériques et les pilotes

Une application ne devrait pas connaître chaque détail électrique d’une imprimante, d’un GPU ou d’un contrôleur de stockage. Le système d’exploitation fournit des interfaces communes, tandis qu’un **pilote** traduit ou adapte les demandes aux capacités d’un périphérique ou d’une classe de périphériques.

```text
application
    ↓ service du système
système d’exploitation
    ↓ interface de pilote
pilote
    ↓ commandes et données
contrôleur ou périphérique
```

Un pilote peut être fourni par le système, par le fabricant du composant ou par un mécanisme de mise à jour approuvé. Sa présence ne garantit pas à elle seule que le périphérique fonctionne : alimentation, câble, protocole, micrologiciel, permissions et application peuvent aussi intervenir.

Les pilotes, les interruptions et le diagnostic des périphériques seront approfondis à la Séance 12.

## Terminal, shell et commande

Ces termes ne sont pas synonymes.

| Terme | Rôle |
|---|---|
| Terminal | Interface qui affiche une session textuelle et transmet l’entrée |
| Shell ou interpréteur de commandes | Programme qui lit et interprète les commandes |
| Interface en ligne de commande | Mode d’interaction textuel |
| Commande | Instruction donnée au shell ou à un programme |

Sous Windows, **Invite de commandes** exécute généralement `cmd.exe`. PowerShell est un autre shell, avec un modèle d’objets et un langage de script qui seront étudiés à la Séance 15.

<figure markdown="span">
  ![Terminal DEC VT100 avec clavier et écran textuel.](https://commons.wikimedia.org/wiki/Special:Redirect/file/DEC_VT100_terminal.jpg){ loading=lazy width="680" }
  <figcaption>Un terminal comme le DEC VT100 illustre une interface textuelle historique : le terminal fournit l’entrée et l’affichage, tandis que le système exécuté sur l’ordinateur distant fournit le shell et les programmes. Photo : Jason Scott, <a href="https://commons.wikimedia.org/wiki/File:DEC_VT100_terminal.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.</figcaption>
</figure>

### DOS et `cmd.exe`

**MS-DOS** et **FreeDOS** sont des systèmes d’exploitation de la famille DOS. L’Invite de commandes actuelle de Windows reprend plusieurs commandes et conventions historiques, mais `cmd.exe` n’est pas lui-même « DOS ».

Cette distinction permet d’utiliser les ressemblances sans confondre un système d’exploitation historique avec un interpréteur de commandes moderne.

## Chemins absolus et relatifs

Une arborescence décrit des relations parent-enfant :

```text
C:\CoursC12
├── notes
│   ├── seance10.txt
│   └── sources.txt
└── exercices
    └── allocation.txt
```

Un **chemin absolu** part d’une racine ou d’un lecteur :

```text
C:\CoursC12\notes\seance10.txt
```

Un **chemin relatif** dépend du dossier courant. Depuis `C:\CoursC12`, le même fichier peut être désigné par :

```text
notes\seance10.txt
```

Depuis `C:\CoursC12\exercices`, il faut remonter au parent avec `..` :

```text
..\notes\seance10.txt
```

### Commandes élémentaires de l’Invite de commandes

| Commande | Usage général |
|---|---|
| `help` ou `commande /?` | consulter l’aide |
| `cd` | afficher ou changer le dossier courant |
| `dir` | lister le contenu |
| `tree` | afficher une arborescence |
| `type` | afficher un fichier texte |
| `mkdir` | créer un dossier |
| `copy` | copier un fichier |
| `move` | déplacer un fichier |
| `ren` | renommer |
| `del` | supprimer un fichier dans un emplacement contrôlé |
| `rmdir` | supprimer un dossier selon les conditions indiquées |

!!! danger "Limiter les suppressions au dossier de travail"
    Dans le laboratoire, utilisez `del` et `rmdir` uniquement dans le dossier temporaire fourni. Vérifiez le chemin courant avec `cd` et le contenu avec `dir` avant toute suppression. N’utilisez pas de caractères génériques de suppression sauf indication explicite.

## Comment sommes-nous arrivés aux systèmes modernes?

L’histoire des systèmes d’exploitation n’est pas une ligne droite où un produit remplace simplement le précédent. Plusieurs idées se développent en parallèle : systèmes multi-utilisateurs, shells textuels, systèmes de fichiers hiérarchiques, micro-ordinateurs personnels et interfaces graphiques.

L’objectif ici n’est pas de mémoriser des dates. Il s’agit de reconnaître **pourquoi des éléments historiques sont encore visibles dans les systèmes actuels**.

### Unix : processus, fichiers et outils textuels

Unix est développé à partir de la fin des années 1960 aux Bell Labs. Au cours des années 1970, il établit ou popularise un ensemble d’idées qui restent très visibles : processus, utilisateurs et permissions, arborescence de fichiers, shells et petits outils combinables.

Cette histoire aide à expliquer pourquoi un système moderne peut être très complet sans bureau graphique. L’interface textuelle n’est pas un mode « incomplet » : elle peut donner accès aux mêmes services fondamentaux du système par une autre interface.

<figure markdown="span">
  ![Terminal DEC VT100 utilisé comme interface textuelle.](https://commons.wikimedia.org/wiki/Special:Redirect/file/DEC_VT100_terminal.jpg){ loading=lazy width="620" }
  <figcaption>Les systèmes Unix ont longtemps été utilisés par l’intermédiaire de terminaux textuels. Le VT100 montré ici date d’une période où un terminal pouvait donner accès à un ordinateur partagé plus puissant. Photo : Jason Scott, <a href="https://commons.wikimedia.org/wiki/File:DEC_VT100_terminal.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.</figcaption>
</figure>

!!! note "Unix, Unix-like et descendance"
    Il faut distinguer un système **descendant techniquement** d’Unix d’un système **inspiré par ses interfaces et concepts**. Linux est généralement décrit comme un système Unix-like : il réimplémente de nombreux concepts et interfaces de type Unix, mais son noyau n’est pas une continuation du code original d’Unix.

### Micro-ordinateurs : faire fonctionner une machine individuelle

À la fin des années 1970 et au début des années 1980, les micro-ordinateurs imposent un autre contexte. Une seule personne possède maintenant une machine avec peu de mémoire, un processeur relativement simple et souvent des disquettes.

**Apple DOS**, introduit pour l’Apple II avec le lecteur Disk II en 1978, illustre bien cette étape : son rôle central est de rendre le stockage sur disquette exploitable par l’utilisateur et les programmes. L’ordinateur reste très limité par rapport à un système multi-utilisateur contemporain.

<figure markdown="span">
  ![Ordinateur Apple II avec écran.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Apple_II_Computer.jpg){ loading=lazy width="620" }
  <figcaption>L’Apple II représente la génération de micro-ordinateurs personnels pour laquelle des systèmes comme Apple DOS ont rendu le stockage sur disquette directement exploitable. Photo : Maksym Kozlenko, <a href="https://commons.wikimedia.org/wiki/File:Apple_II_Computer.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

**MS-DOS** devient ensuite une famille majeure sur les PC compatibles IBM. Il fournit une interface textuelle, un système de fichiers et des services adaptés au matériel PC de l’époque. Son influence reste visible dans plusieurs commandes et conventions de chemins que nous rencontrons dans `cmd.exe`.

<figure markdown="span">
  ![Ordinateur personnel IBM PC 5150 avec clavier et écran.](https://commons.wikimedia.org/wiki/Special:Redirect/file/IBM_PC_5150.jpg){ loading=lazy width="680" }
  <figcaption>L’IBM PC 5150 illustre le contexte matériel dans lequel PC DOS et MS-DOS se sont répandus au début des années 1980. Image : Boffy b, <a href="https://commons.wikimedia.org/wiki/File:IBM_PC_5150.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</figcaption>
</figure>

### Xerox PARC : la machine graphique comme environnement de travail

Le Xerox Alto, conçu à Xerox PARC au début des années 1970, expérimente un ensemble particulièrement influent : affichage bitmap, souris, fenêtres et manipulation graphique de documents. Il n’est pas le premier système à posséder chacun de ces éléments séparément, et il ne devient pas un ordinateur personnel de masse. Son importance vient plutôt de leur combinaison dans un environnement informatique cohérent.

<figure markdown="span">
  ![Ordinateur Xerox Alto avec écran vertical, clavier et souris.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Xerox_Alto_computer.jpg){ loading=lazy width="700" }
  <figcaption>Le Xerox Alto associe écran bitmap vertical, clavier et souris dans un environnement expérimental qui a fortement influencé les interfaces graphiques ultérieures. Photo : Maksym Kozlenko, <a href="https://commons.wikimedia.org/wiki/File:Xerox_Alto_computer.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

Le Xerox Star commercialise ensuite plusieurs idées apparentées en 1981. Apple développe ses propres interfaces graphiques avec Lisa puis Macintosh; Microsoft développe Windows. Il est plus exact de parler **d’influences, d’échanges d’idées et de développements distincts** que de tracer une simple flèche « Xerox → Apple → Microsoft » comme si le code avait été transmis directement.

!!! warning "Influence n’est pas filiation technique"
    Une interface peut reprendre une idée sans réutiliser le noyau, le code ou l’architecture interne du système qui l’a inspirée. Dans un diagramme historique, une flèche d’influence ne doit donc pas être lue comme une relation parent-enfant entre codes sources.

### Macintosh : rendre le bureau graphique visible au grand public

Le Macintosh lancé en 1984 contribue à diffuser une interaction reposant sur la souris, les fenêtres, les icônes et les menus auprès d’un public beaucoup plus large.

<figure markdown="span">
  ![Macintosh 128K avec écran graphique intégré.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Macintosh_128k.jpg){ loading=lazy width="500" }
  <figcaption>Le Macintosh 128K de 1984 représente une étape importante dans la diffusion commerciale de l’interface graphique à fenêtres et à souris. Photo : All About Apple Museum, <a href="https://commons.wikimedia.org/wiki/File:Macintosh_128k.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/2.5/it/">CC BY-SA 2.5 IT</a>.</figcaption>
</figure>

Cette histoire renforce une distinction importante : **l’interface graphique n’est pas le système d’exploitation entier**. Le système doit encore gérer les processus, la mémoire, les fichiers et les périphériques, que l’utilisateur donne ses commandes avec une souris, un clavier ou un shell.

### Windows : de l’environnement DOS à la famille NT

Les premières versions de Windows apparaissent dans un environnement PC où MS-DOS joue encore un rôle fondamental. Les lignées Windows 3.x puis Windows 95/98/Me conservent un héritage DOS important.

En parallèle, Microsoft développe **Windows NT** comme une architecture distincte orientée vers la protection mémoire, le multitâche préemptif, plusieurs comptes et des besoins professionnels. Windows 2000 et Windows XP marquent la généralisation de la lignée NT sur les postes clients; les Windows modernes appartiennent à cette famille technique.

```text
MS-DOS ──→ Windows 1.x / 2.x / 3.x ──→ Windows 95 / 98 / Me

Windows NT ──→ Windows 2000 ──→ Windows XP ──→ Windows modernes
```

Le diagramme montre **deux lignées historiques simplifiées**, et non une liste de toutes les versions. Il explique surtout pourquoi `cmd.exe` peut conserver des conventions DOS sans que Windows moderne soit lui-même MS-DOS.

### Linux : un noyau Unix-like et des distributions

En 1991, Linus Torvalds commence le noyau Linux. Le projet adopte de nombreuses conventions et interfaces associées au monde Unix, mais il s’agit d’un noyau développé séparément.

Le noyau seul ne forme pas l’expérience complète que l’utilisateur appelle souvent « Linux ». Une distribution assemble notamment :

```text
noyau Linux
+ bibliothèques
+ outils système
+ gestionnaire de paquets
+ services
+ applications
+ environnement graphique éventuel
= distribution Linux
```

Cette organisation explique pourquoi Ubuntu, Debian, Fedora et Red Hat Enterprise Linux peuvent partager le même noyau de famille tout en différant fortement dans leurs politiques de mise à jour, outils, bureaux et objectifs.

### Une carte d’influences et de filiations

```text
Unix ───────────────→ descendants Unix / BSD ───────→ Darwin ──→ macOS / iOS
  │
  └ - - influence et interfaces Unix - - - - - - -→ Linux ──→ distributions
                                                      └────────→ Android (noyau Linux)

Apple II ──→ Apple DOS                    Xerox PARC / Alto
                                               - - - influence GUI - -→ Lisa / Macintosh
MS-DOS ──→ Windows DOS-based                     - - - influence GUI - -→ Windows

Windows NT ───────────────────────────────────────────────→ Windows modernes
```

Dans ce schéma :

- `──→` indique une **filiation ou continuité technique simplifiée**;
- `- -→` indique surtout une **influence conceptuelle ou d’interface**.

La réalité historique est plus riche que ce schéma. Son but est de prévenir deux erreurs : croire que tous les systèmes modernes descendent du même code, ou croire qu’ils se sont développés sans influence mutuelle.

??? question "Vérification : macOS, Linux et Windows ont-ils le même ancêtre technique?"
    Non. macOS possède une base Darwin avec des héritages Unix/BSD et Mach; Linux est un noyau Unix-like développé séparément; Windows moderne appartient à la lignée Windows NT. Ils peuvent offrir des concepts ou interfaces semblables sans partager la même filiation de code.

## Familles de systèmes d’exploitation

Une **famille** regroupe des systèmes qui partagent une histoire, des interfaces ou une base technique. Une famille peut contenir plusieurs éditions, versions ou distributions.

| Contexte | Familles ou systèmes courants à reconnaître | Questions d’évaluation |
|---|---|---|
| Bureau et portable | Windows, macOS, distributions Linux, ChromeOS | applications, matériel, gestion, accessibilité, soutien |
| Serveur et nuage | distributions Linux, Windows Server, Unix et systèmes apparentés | rôles, automatisation, disponibilité, sécurité, compétences |
| Mobile et tablette | Android, iOS, iPadOS | appareil pris en charge, mises à jour, applications, gestion, vie privée |

### Windows

Windows demeure une famille importante sur les postes de travail et dans plusieurs organisations. Une recommandation doit vérifier l’édition, les exigences matérielles, le cycle de soutien, les applications et les politiques de gestion plutôt que se limiter au nom « Windows ».

Windows Server est une famille distincte destinée à des rôles de serveur. Une édition serveur n’est pas automatiquement préférable pour un poste de bureau.

### macOS, iOS et iPadOS

macOS est conçu pour le matériel Mac pris en charge par Apple. iOS et iPadOS visent des appareils mobiles Apple. L’intégration matériel-logiciel peut simplifier certaines validations, mais le modèle exact de l’appareil et la période de soutien doivent toujours être vérifiés.

### Linux et les distributions

**Linux** désigne principalement un noyau. Une **distribution Linux** combine ce noyau avec des outils, un gestionnaire de paquets, des bibliothèques, une politique de mise à jour et souvent un environnement de bureau.

Ubuntu, Debian, Fedora et Red Hat Enterprise Linux illustrent des objectifs et des cycles différents. Une version à soutien prolongé peut être pertinente pour la stabilité, tandis qu’une version plus fréquente peut fournir des composants récents au prix d’un cycle de mise à niveau plus court.

### Android

Android forme un écosystème utilisé par de nombreux fabricants et types d’appareils. La version du système ne constitue qu’une partie de la preuve : le fabricant, le modèle, les correctifs de sécurité et la durée de mise à jour prévue comptent aussi.

!!! info "Paysage vérifié en août 2026"
    Les noms de versions changent plus vite que les principes de comparaison. Au moment de la rédaction, les sources officielles présentent notamment Windows 11 et Windows Server 2025, macOS/iOS/iPadOS 26, Android 17 et Ubuntu 26.04 LTS. Vérifiez toujours les pages officielles de soutien avant une recommandation réelle.

    - [Exigences de Windows 11](https://www.microsoft.com/windows/windows-11-specifications)
    - [Documentation de Windows Server](https://learn.microsoft.com/windows-server/)
    - [Mises à jour de sécurité Apple](https://support.apple.com/fr-ca/100100)
    - [Versions d’Ubuntu](https://ubuntu.com/project/docs/release-team/list-of-releases/)
    - [Fonctions et versions Android](https://developer.android.com/about/versions/17)

## Comparer un système d’exploitation selon un besoin

Une comparaison responsable commence par le mandat, non par une liste de préférences.

1. **Charge de travail :** quelles applications, quels services et quels périphériques?
2. **Compatibilité :** le matériel et les logiciels sont-ils officiellement pris en charge?
3. **Soutien :** pendant combien de temps les correctifs et pilotes seront-ils disponibles?
4. **Administration :** quels outils, compétences, comptes et politiques sont nécessaires?
5. **Sécurité et vie privée :** quelles protections, mises à jour et données sensibles?
6. **Accessibilité :** quelles fonctions intégrées ou technologies d’assistance doivent fonctionner?
7. **Coût total :** licence, matériel, déploiement, formation, soutien et remplacement.
8. **Preuves manquantes :** quelle information pourrait modifier la recommandation?

!!! example "Trois contextes, trois réponses possibles"
    - Un laboratoire qui dépend d’une application Windows spécialisée peut privilégier Windows malgré l’existence d’alternatives gratuites.
    - Un serveur Web administré par une équipe expérimentée avec Linux peut privilégier une distribution à soutien prolongé.
    - Une application mobile destinée à un parc déjà géré par une organisation doit tenir compte de la plateforme, du modèle d’appareil et de la durée de soutien.

Aucun de ces choix n’est universel. La pertinence dépend des exigences et des preuves.

## Synthèse intégrée : ouvrir un fichier média

Lorsqu’une application ouvre un fichier audio et le fait jouer :

1. le processus demande l’ouverture d’un chemin;
2. le système vérifie le compte, les permissions et l’existence du fichier;
3. le système de fichiers relie le nom aux unités de stockage;
4. le pilote de stockage et le contrôleur récupèrent les données;
5. le système attribue de la mémoire au processus;
6. le processeur et, selon le format, un composant spécialisé traitent les données;
7. le pilote audio transmet le flux au périphérique;
8. l’ordonnanceur partage le processeur avec les autres tâches.

L’histoire explique pourquoi cette même chaîne peut être commandée par une interface graphique, un shell ou une application automatisée : **l’interface change, mais les responsabilités fondamentales du système demeurent**.

La Séance 11 suivra plus précisément la chaîne graphique et audio. La Séance 12 examinera les connecteurs, les pilotes et les périphériques qui complètent cette chaîne.

## Erreurs fréquentes à éviter

- **Confondre programme et processus :** un fichier exécutable conservé sur le disque n’est pas l’instance en cours d’exécution.
- **Interpréter un instantané comme une tendance :** une mesure brève ne décrit pas toute la charge.
- **Croire que la mémoire virtuelle est de la RAM supplémentaire équivalente :** le mécanisme dépend aussi du stockage et peut être beaucoup plus lent.
- **Croire qu’un fichier doit être contigu :** un système de fichiers peut suivre plusieurs unités dispersées.
- **Confondre terminal et shell :** le terminal présente la session; le shell interprète les commandes.
- **Appeler `cmd.exe` « DOS » :** les commandes peuvent être apparentées, mais les systèmes ne sont pas identiques.
- **Confondre interface graphique et système d’exploitation :** fenêtres et icônes représentent une interface au-dessus de services plus fondamentaux.
- **Dessiner l’histoire comme une seule lignée :** distinguez filiation technique et influence conceptuelle.
- **Dire que Linux est simplement « Unix moderne » :** Linux est Unix-like mais son noyau a été développé séparément.
- **Comparer les OS par réputation :** commencez par les applications, le matériel, le soutien et les contraintes.
- **Supposer qu’un système gratuit ne coûte rien :** déploiement, administration, formation et soutien font partie du coût total.

## Ce qu’il faut retenir

- Le système d’exploitation coordonne les processus, la mémoire, les fichiers et les périphériques.
- Un processus est une instance en exécution avec un contexte et des ressources.
- La mémoire virtuelle fournit adressage, isolation et gestion; elle ne remplace pas la RAM sans compromis.
- Un système de fichiers relie les noms et métadonnées aux unités de stockage.
- Une table d’allocation simplifiée permet de suivre une chaîne d’unités non contiguës.
- Un pilote adapte les services du système aux capacités d’un périphérique.
- Terminal, shell, interface en ligne de commande et commande désignent des éléments différents.
- Les chemins relatifs dépendent du dossier courant; les chemins absolus partent d’une racine.
- Unix, les micro-ordinateurs DOS et les expériences graphiques de Xerox représentent des traditions différentes qui ont influencé les systèmes modernes.
- Une influence d’interface ne signifie pas que deux systèmes partagent le même code ou la même architecture.
- Windows moderne appartient à la lignée NT; Linux est un noyau Unix-like développé séparément; macOS possède une base Darwin issue notamment de technologies Unix/BSD et Mach.
- Le paysage actuel comprend plusieurs familles de bureau, serveur et mobiles.
- Une recommandation de système d’exploitation doit être reliée à un besoin, à des preuves et à un cycle de soutien.

## Passer à la pratique

Le laboratoire associé vous demande d’observer un poste Windows sans privilèges d’administration, de manipuler une arborescence temporaire, de reconstruire des chaînes d’allocation et de préparer une comparaison formative de systèmes d’exploitation.

[Passer au Laboratoire 10 - Observer les ressources et manipuler un système de fichiers](../laboratoires/laboratoire-10.md)

## Pour aller plus loin

### Noyau et espace utilisateur

Le noyau exécute les fonctions les plus privilégiées : ordonnancement, gestion de mémoire, communication avec plusieurs pilotes et application des protections fondamentales. Les applications ordinaires s’exécutent généralement dans un espace moins privilégié et demandent des services au système.

### Pourquoi les serveurs peuvent fonctionner sans bureau local

Un serveur peut être administré à distance et fournir des services réseau sans écran ni environnement graphique local. Cette conception peut réduire les composants installés, la consommation de ressources et la surface à maintenir, mais elle exige des outils et des compétences d’administration adaptés.

### Les systèmes de fichiers modernes

Les systèmes modernes peuvent ajouter journalisation, sommes de contrôle, instantanés, chiffrement ou structures en arbres. Ces mécanismes dépassent le modèle FAT, mais répondent au même besoin général : conserver une relation cohérente entre les noms, les métadonnées et les données.

## Sources historiques et techniques de référence

- [Computer History Museum - Xerox Alto](https://www.computerhistory.org/revolution/input-output/14/347)
- [The Open Group - The Single UNIX Specification and Unix](https://www.opengroup.org/membership/forums/platform/unix)
- [Apple Open Source - Darwin](https://opensource.apple.com/)
- [Linux kernel documentation](https://www.kernel.org/doc/html/latest/)
- [Microsoft Learn - Windows architecture](https://learn.microsoft.com/windows-hardware/drivers/gettingstarted/windows-architecture)

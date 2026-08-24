# Séance 1 - Aperçu du cours : qu'est-ce qu'un ordinateur?

## But de la séance

Cette première séance présente la structure de **420-C12-IN - Outils et matériels informatiques**, les attentes du cours et la progression des sujets qui seront étudiés. Elle établit aussi le type de réflexion technique qui sera demandé : observer, rechercher, comparer, justifier et communiquer.

Elle introduit ensuite une question qui guidera toute la séance :

> Qu'est-ce qui fait qu'un objet ou un système peut être considéré comme un ordinateur?

Nous commencerons avec des appareils familiers, puis nous remonterons vers quelques idées historiques et théoriques qui permettent de construire une définition plus précise.

## Objectifs

À la fin de cette séance et du laboratoire associé, vous devriez être en mesure de :

- repérer les informations importantes dans le guide de cours et le plan des séances;
- expliquer le lien entre le cours, la compétence `00SF` et le cahier des charges évolutif;
- résumer la progression générale des 19 séances;
- décrire la façon dont la théorie, les activités et les laboratoires seront organisés;
- formuler, puis réviser, une définition personnelle du mot « ordinateur »;
- expliquer, à un niveau introductif, ce que Babbage, Turing et von Neumann apportent à notre compréhension de l'ordinateur;
- trouver des informations de base sur un poste de laboratoire;
- utiliser quelques commandes PowerShell simples pour observer un ordinateur.

!!! info "Portée de la séance"
    **À maîtriser aujourd'hui :** fonctionnement général du cours, compétence `00SF`, distinction entre matériel et logiciel, information, état, instruction, programmabilité, programme enregistré et définition de travail d'un ordinateur.

    **À reconnaître aujourd'hui :** les contributions de Babbage, Lovelace, Turing et du modèle de von Neumann, ainsi que le vocabulaire de départ du cours.

    **Non exigé :** mémoriser des dates historiques précises ou reproduire les modèles historiques dans tous leurs détails.

## But du cours et compétence `00SF`

Le cours développe la compétence suivante :

> `00SF` - Évaluer des composants logiciels et matériels.

Le cours ne consiste donc pas seulement à reconnaître des pièces ou à mémoriser des spécifications. Évaluer une solution informatique demande de pouvoir :

- cerner un besoin, un problème ou un ensemble de contraintes techniques;
- rechercher des composants logiciels et matériels à l'aide de sources appropriées;
- décrire et comparer leurs caractéristiques;
- vérifier leur compatibilité;
- considérer leur coût, leur performance, leur stabilité, leur efficacité, leur longévité et leur maintenabilité;
- formuler une recommandation justifiée;
- communiquer cette recommandation clairement à des publics spécialistes et non spécialistes.

La première séance pose la question la plus fondamentale du cours. Avant d'évaluer ce qui se trouve dans un ordinateur ou ce qu'il peut faire, il faut construire une idée plus précise de ce qu'est un ordinateur.

## Fil rouge du cours : un cahier des charges évolutif

Une cliente ou un client souhaite un PC capable de faire fonctionner des jeux récents tout en diffusant les parties en continu. La demande ne doit pas devenir une simple liste de pièces : elle doit mener à une spécification justifiée, compatible, fiable, maintenable et capable d'évoluer. La demande initiale demeure volontairement incomplète. Les jeux visés, la résolution, la fréquence d'images, la qualité de diffusion, les autres applications, le budget, les périphériques, le bruit acceptable et les attentes de mise à niveau doivent encore être précisés.

À partir du Laboratoire 5, vous ferez progresser un même **cahier des charges évolutif** lorsque chaque nouvelle famille de composants sera étudiée. Chaque ajout conservera quatre traces :

1. **Besoin pertinent** — Quel besoin ou quelle contrainte de l'organisation touche ce composant?
2. **Critères techniques** — Quelles caractéristiques permettront de l'évaluer?
3. **Compatibilité** — De quels autres composants ou choix dépend-il?
4. **Recommandation provisoire et question ouverte** — Quelle orientation est défendable maintenant, et que faut-il encore vérifier?

Une recommandation provisoire n'est pas une supposition présentée comme un fait. Elle indique clairement ce que les informations actuelles permettent de conclure, ce qui demeure incertain et ce qui pourrait obliger à réviser la spécification.

### Réflexion récurrente sur le cycle de vie

Pour chaque composant ajouté à partir du Laboratoire 5, répondez également aux quatre questions suivantes. Écrivez **au plus une phrase par critère**. Si l'information manque, nommez plutôt la preuve qui serait nécessaire pour répondre.

| Critère | Question à se poser |
|---|---|
| **Longévité** | Le composant devrait-il rester adéquat et soutenu pendant la durée d'utilisation prévue? |
| **Stabilité** | Quels éléments favorisent ou menacent un fonctionnement fiable et prévisible dans cette configuration? |
| **Efficacité** | Le rendement nécessaire est-il obtenu avec une consommation, une chaleur, un coût et des ressources raisonnables? |
| **Maintenabilité** | Le composant peut-il être diagnostiqué, remplacé, mis à niveau et soutenu sans difficulté déraisonnable? |

!!! example "Première entrée du cahier des charges"
    Créez une section intitulée « PC de jeu et de diffusion en continu ». Notez les besoins déjà exprimés, puis inscrivez au moins quatre questions à poser avant de choisir des composants. Conservez cette section : elle sera reprise à partir du Laboratoire 5.

## Ce qui sera attendu de vous

Tout au long du cours, vous devrez progressivement apprendre à :

- employer un vocabulaire technique précis;
- expliquer votre raisonnement plutôt que donner seulement une réponse;
- relier vos choix aux besoins et aux contraintes d'une situation;
- consulter des sources techniques et vérifier les informations recueillies;
- participer aux activités et signaler ce qui reste incertain;
- utiliser la rétroaction pour améliorer vos analyses et vos recommandations.

Il n'est pas attendu que vous maîtrisiez déjà le matériel informatique. Le cours commence sans préalable. Il est cependant attendu que vous développiez graduellement votre autonomie et que vous cherchiez à comprendre les principes derrière les technologies étudiées.

## Parcours des 19 séances

Le tableau suivant présente l'ordre dans lequel les sujets seront abordés. Les séances sont cumulatives : ce qui est appris au début du cours servira à comprendre et à évaluer les sujets suivants. Utilisez ce parcours pour anticiper les notions qui pourraient demander davantage de préparation ou de révision.

| Séance | Sujet principal | Ce que nous chercherons à comprendre |
|---:|---|---|
| 1 | Aperçu du cours et nature de l'ordinateur | Comprendre le fonctionnement du cours et construire une première définition réfléchie de l'ordinateur. |
| 2 | Bases 2 et 16 | Comprendre pourquoi les ordinateurs utilisent le binaire et comment l'hexadécimal permet de représenter plus lisiblement les bits. |
| 3 | Représentation des données et boutisme | Examiner comment les nombres, le texte et d'autres données sont codés, puis comment l'ordre des octets peut modifier leur interprétation. |
| 4 | Mémoire adressable et architecture des micro-ordinateurs | Distinguer les couches physiques, situer les niveaux de mémoire et suivre une valeur par son adresse et les bus. |
| 5 | Processeur | Étudier le rôle du processeur et comparer des caractéristiques comme les cœurs, les fils d'exécution, la mémoire cache et le jeu d'instructions. |
| 6 | Mémoire vive | Comprendre le rôle de la mémoire volatile et évaluer la capacité, la vitesse, la latence, la génération et le format. |
| 7 | ROM, BIOS, UEFI et micrologiciel | Suivre le démarrage d'un ordinateur et comprendre le rôle, les réglages et les risques de mise à jour du micrologiciel. |
| 8 | Carte mère et logique de montage | Vérifier la compatibilité entre le processeur, la mémoire, la carte mère, les cartes d'extension, le boîtier et l'alimentation. |
| 9 | Stockage | Comparer les disques durs, SSD, supports amovibles, systèmes de fichiers, sauvegardes et configurations RAID. |
| 10 | Systèmes d'exploitation | Comprendre comment un système d'exploitation gère les processus, la mémoire, les fichiers et les périphériques. |
| 11 | Composants multimédias | Évaluer les besoins liés aux graphiques, aux écrans, au son, aux codecs et à l'accessibilité. |
| 12 | Connecteurs et périphériques | Identifier les principaux connecteurs et analyser la compatibilité, les pilotes et les causes courantes de panne d'un périphérique. |
| 13 | Systèmes sur puce | Comparer les systèmes sur puce aux ordinateurs modulaires selon la performance, la consommation, le coût et la réparabilité. |
| 14 | Introduction aux réseaux | Comprendre le rôle de la carte réseau, des adresses, des protocoles et des services qui permettent aux appareils de communiquer. |
| 15 | PowerShell comme outil de script | Utiliser des commandes, des objets et des pipelines pour observer un système et automatiser une collecte d'informations. |
| 16 | Rétroaction générale sur les travaux | Réinvestir la rétroaction portant sur la recherche, les sources, le vocabulaire, la compatibilité et la justification. |
| 17 | Révision de l'examen final | Relier les notions du cours et s'exercer à interpréter des scénarios, des spécifications et des problèmes techniques. |
| 18 | Examen final | Démontrer l'atteinte de la compétence dans l'épreuve certificative. |
| 19 | Rétroaction sur l'examen | Corriger les principales conceptions erronées et établir un lien avec les cours de systèmes d'exploitation qui suivent. |

## Déroulement habituel d'une séance

La plupart des séances suivent la même structure générale. Vous pouvez vous attendre à une répartition approximativement égale entre la théorie et le laboratoire. Les transitions peuvent toutefois s'adapter aux questions, aux activités et aux difficultés rencontrées.

### Première moitié : théorie

La partie théorique occupe généralement environ la moitié de la séance. Elle peut comprendre :

- des explications et des exemples;
- des questions et des discussions;
- de courtes activités individuelles ou en petits groupes;
- des vérifications de compréhension;
- des liens avec les notions étudiées précédemment.

Les activités intégrées à la théorie ne sont jamais évaluées ni notées. Elles servent à mettre les idées en pratique immédiatement, à vérifier que le groupe suit le raisonnement et à repérer les notions qui demandent une explication supplémentaire.

### Deuxième moitié : laboratoire

La partie laboratoire occupe généralement l'autre moitié de la séance. Les tâches proposées sont liées à la théorie étudiée et servent à :

- consolider la compréhension;
- observer les concepts dans un système réel;
- manipuler des outils, des commandes ou du matériel;
- développer des méthodes de travail pratiques;
- acquérir de l'expérience technique.

La théorie et le laboratoire forment donc deux parties complémentaires d'une même séance. La théorie construit les idées et le vocabulaire; le laboratoire permet de les appliquer et d'en observer les effets.

## Évaluations et échéances

Pendant cette première séance, nous parcourrons ensemble le calendrier des évaluations. Pour chaque évaluation, nous examinerons :

- ce qui sera demandé;
- le format prévu;
- sa pondération;
- son échéance;
- les notions ou les travaux qui permettront de s'y préparer.

L'objectif n'est pas de mémoriser immédiatement toutes les dates, mais de comprendre le rythme du cours, les liens entre les évaluations et les moments où une préparation particulière sera nécessaire.

!!! warning "La règle du double seuil"
    Pour réussir le cours, vous devez satisfaire **deux conditions distinctes** :

    - obtenir la note de passage à chacune des trois évaluations certificatives;
    - obtenir une moyenne finale globale suffisante pour réussir le cours.

    Une bonne moyenne globale ne compense pas l'échec d'une évaluation certificative. Inversement, réussir les trois évaluations certificatives ne suffit pas si la moyenne finale globale est insuffisante.

## Questions, clarifications et FAQ

Les questions font partie du fonctionnement normal du cours. Certaines peuvent recevoir une réponse courte et immédiate. D'autres demandent une explication plus détaillée, une vérification technique ou une recherche supplémentaire.

Lorsqu'une question mérite une réponse développée :

1. la question peut être ajoutée à la [FAQ du site du cours](../faq/index.md);
2. la question sera reformulée au besoin et publiée sans identifier la personne qui l'a posée;
3. la personne qui a posé la question recevra un message lorsque la réponse sera disponible;
4. les mises à jour importantes seront également signalées dans Teams.

Prendre le temps de vérifier une réponse complexe fait partie d'une démarche technique responsable. Une réponse publiée dans la FAQ pourra également aider d'autres personnes qui se posent la même question.

!!! note "Une question peut améliorer le site"
    Une question complexe ne disparaît pas lorsque la séance se termine. Elle peut devenir une réponse vérifiée et persistante qui aide l'ensemble du groupe. La personne qui l'a posée est informée lorsque cette réponse est publiée.

## Rôle du site du cours

Aucun manuel n'est obligatoire pour ce cours. Le site constitue le principal support d'apprentissage et de référence. Il rassemble dans un espace facile à consulter et à rechercher :

- les explications et le vocabulaire importants;
- les pages de séance et les activités;
- les consignes de laboratoire;
- les clarifications et les réponses aux questions fréquentes;
- les renseignements utiles pour préparer les travaux et les évaluations.

Le contenu du site évoluera pendant le cours. Des explications pourront être précisées, des exemples ajoutés et des réponses développées à partir des questions rencontrées en classe. Le site permet ainsi de retrouver l'information plus tard, de revoir une notion et de suivre les ajouts importants sans devoir reconstruire ses ressources à chaque séance.

Le [Guide de cours](../guide-de-cours.md) contient le calendrier des évaluations. Vous devez prendre le temps de le consulter et y revenir régulièrement afin de suivre les échéances. Il est également important de consulter le canal Teams du cours, où seront communiquées les consignes de remise des évaluations ainsi que les mises à jour importantes.

## Défi d'ouverture : où sont les ordinateurs?

Lorsqu'on entend le mot « ordinateur », on pense souvent à un ordinateur de bureau ou à un portable. Pourtant, ces exemples familiers ne nous disent pas exactement ce qui fait qu'un objet est un ordinateur.

Avant de chercher une définition, commençons donc par observer.

!!! question "Exercice d'observation : où sont les ordinateurs?"
    Regardez autour de vous, où que vous soyez : dans le métro, dans un café, à la maison ou en classe.

    Pensez également à ce que vous transportez dans votre sac, dans vos poches ou sur vous.

    Sans faire de recherche, dressez une liste de tout ce que vous pouvez voir et qui, selon vous, pourrait être un ordinateur ou contenir un ordinateur.

    Placez un point d'interrogation à côté des éléments dont vous n'êtes pas certain. Choisissez ensuite l'élément le plus surprenant de votre liste.

    Conservez cette liste. Vous y reviendrez après avoir étudié les idées de Babbage, de Turing et de von Neumann.

### Des exemples de moins en moins évidents

Un ordinateur de bureau et un portable semblent être des réponses faciles. Une tablette ou un téléphone intelligent demandent peut-être déjà un peu plus de réflexion.

Considérez ensuite les objets suivants :

- une montre intelligente;
- une console de jeux;
- un téléviseur intelligent;
- une calculatrice.

Pour le moment, ne cherchez pas une réponse définitive. Notez plutôt les raisons qui vous poussent à inclure ou à exclure chaque objet.

Vous pourriez notamment vous demander :

- Est-ce que l'objet est lui-même un ordinateur, ou contient-il un ordinateur?
- Doit-il avoir un écran, un clavier ou une forme particulière?
- Doit-il pouvoir accomplir plusieurs tâches?
- Doit-il pouvoir recevoir de nouvelles instructions?
- Quelle différence y a-t-il entre un appareil électronique et un ordinateur?

Gardez vos réponses et vos incertitudes. Les prochaines parties de la séance fourniront de nouveaux critères permettant de reprendre cette discussion.

## Babbage, Lovelace et la machine programmable

Au début du XIXe siècle, le mot « ordinateur » désignait encore une personne qui effectuait des calculs. Des tables numériques utilisées en navigation, en astronomie, en ingénierie et dans d'autres domaines étaient calculées et recopiées à la main. Une seule erreur pouvait ensuite être reproduite dans de nombreux exemplaires.

### Babbage et le problème des tables

Charles Babbage a cherché à automatiser ce travail avec une machine mécanique.

![Portrait de Charles Babbage vers 1860](https://commons.wikimedia.org/wiki/Special:Redirect/file/Charles%20Babbage%20-%201860.jpg){ width="360" loading=lazy }

*Charles Babbage, vers 1860, photographe inconnu. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Charles_Babbage_-_1860.jpg), domaine public.*

Sa première grande conception, la **machine à différences** (*Difference Engine*), devait produire automatiquement certaines tables numériques. Des engrenages représentaient les valeurs et transmettaient les résultats d'une étape à la suivante.

C'était une réalisation importante, mais spécialisée. La machine était conçue pour une famille précise de tâches. Pour lui faire accomplir un travail fondamentalement différent, il ne suffisait pas de lui donner une nouvelle liste d'instructions.

Cette distinction est essentielle :

- une machine **automatique** peut accomplir une tâche sans intervention constante;
- une machine **programmable** peut recevoir différentes suites d'instructions et accomplir différents traitements.

### Du métier Jacquard aux instructions

Babbage connaissait le métier Jacquard, utilisé pour produire des tissus à motifs. Une chaîne de cartes perforées contrôlait les mouvements du métier.

![Cartes perforées d'un métier Jacquard](https://commons.wikimedia.org/wiki/Special:Redirect/file/Jacquard.loom.cards.jpg){ width="560" loading=lazy }

*Cartes perforées d'un métier Jacquard. Photo : Gargamelle. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Jacquard.loom.cards.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).*

Le métier restait le même, mais une autre suite de cartes pouvait produire un autre motif. Les instructions étaient donc séparées du mécanisme qui les exécutait.

!!! example "Application : une même machine, des instructions différentes"
    Même métier + autres cartes = autre motif

    Même mécanisme de calcul + autres cartes = autre calcul

    Même ordinateur + autre programme = autre tâche

Cette idée a conduit Babbage à concevoir une machine beaucoup plus ambitieuse : la **machine analytique** (*Analytical Engine*).

### La machine analytique

La machine analytique devait être une machine mécanique programmable, et non une calculatrice limitée à une seule famille de problèmes.

Babbage décrivait plusieurs fonctions concrètes :

| Élément de la machine | Fonction |
|---|---|
| Le « magasin » | Conserver des valeurs qui seraient utilisées plus tard |
| Le « moulin » | Effectuer les opérations demandées |
| Les cartes perforées | Fournir les instructions et les valeurs nécessaires |
| Les mécanismes de sortie | Présenter ou imprimer un résultat |

La machine devait suivre les cartes dans un ordre déterminé, réutiliser des résultats et modifier la suite du traitement selon certaines conditions. Babbage n'a jamais réussi à construire la machine analytique complète, mais sa conception montrait qu'une même machine pouvait, en principe, exécuter plusieurs procédures.

Les instructions seraient toutefois restées sur des cartes externes. L'idée de conserver le programme dans la même mémoire que les données viendra plus tard.

### Ada Lovelace : comprendre ce que la machine pouvait devenir

Ada Lovelace a étudié la conception de Babbage en profondeur. En 1843, elle a traduit un texte consacré à la machine analytique et l'a accompagné de notes beaucoup plus développées que le texte original.

![Portrait d'Ada Lovelace vers 1840](https://commons.wikimedia.org/wiki/Special:Redirect/file/Ada%20Lovelace%20portrait.jpg){ width="360" loading=lazy }

*Ada Lovelace, vers 1840, portrait d'Alfred Edward Chalon. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ada_Lovelace_portrait.jpg), domaine public.*

Lovelace ne s'est pas contentée de décrire les engrenages. Elle a montré comment une tâche complexe pouvait être divisée en une suite précise d'étapes que la machine suivrait. Concevoir la machine et concevoir les instructions devenaient deux problèmes distincts.

Elle a également compris que l'idée dépassait le calcul arithmétique. Si des éléments pouvaient être représentés par des symboles et reliés par des règles, une machine pourrait peut-être les manipuler. Elle a notamment imaginé qu'une telle machine pourrait un jour travailler avec des relations musicales.

La machine analytique ne produisait évidemment pas de musique. L'idée importante était que les nombres manipulés par une machine pourraient représenter autre chose que des quantités.

Lovelace est souvent décrite comme la première programmeuse. Le titre est mémorable, mais ses contributions concrètes sont plus importantes :

- elle a expliqué comment transformer une tâche en une suite d'instructions;
- elle a distingué le fonctionnement de la machine du programme qui la dirige;
- elle a envisagé des usages allant au-delà du calcul numérique.

!!! question "Vérification rapide"
    Dans l'exemple du métier Jacquard, identifiez la machine, les instructions et le résultat.

    Quelle différence fondamentale sépare la machine à différences de la machine analytique?

    Quelle idée de Lovelace permet d'imaginer un ordinateur utilisé pour du texte, des images ou de la musique?

### Idée à retenir

Babbage a montré comment concevoir une machine mécanique générale commandée par des instructions. Lovelace a montré comment penser les procédures que cette machine exécuterait et a entrevu que les symboles traités pourraient représenter bien plus que de simples quantités.

Cette histoire ajoute deux critères à notre réflexion initiale : la capacité de suivre une suite d'instructions et la possibilité de changer le travail accompli en changeant ces instructions.

## Turing : symboles, règles, état et calcul

Babbage et Lovelace nous ont permis de distinguer la machine de la suite d'instructions qui la dirige. Alan Turing pousse cette idée plus loin en proposant une machine théorique extrêmement simple.

Une machine de Turing n'est pas le plan de construction d'un ordinateur réel. C'est un modèle qui aide à répondre à une question : quelles sont les opérations minimales nécessaires pour effectuer un calcul en suivant des règles?

??? info "Donnée, instruction, programme et état"
    Ces quatre mots décrivent des rôles différents :

    - une **donnée** est une information que la machine reçoit, conserve ou transforme;
    - une **instruction** demande une seule action précise;
    - un **programme** est un ensemble organisé d'instructions;
    - l'**état** décrit la situation actuelle conservée par la machine et peut influencer la prochaine instruction.

    Dans le routeur présenté plus loin, chaque direction gauche-droite est une instruction, la suite de directions forme un programme, la lettre visée fait partie des données du problème et la position courante de la bille appartient à l'état de l'exécution.

!!! note "Nuance : un modèle volontairement simple"
    Cette partie n'exige pas de maîtriser la logique symbolique ou des mathématiques avancées. Nous utilisons seulement le symbole `X`, une case vide et quelques actions concrètes afin de visualiser les principes : observer, appliquer une règle, modifier un état et recommencer.

### Le ruban et la tête de lecture-écriture

Le modèle comprend quelques éléments seulement :

| Élément | Rôle dans le modèle |
|---|---|
| Un ruban divisé en cases | Conserver une suite de symboles |
| Une tête de lecture-écriture | Observer une case, écrire un symbole et se déplacer |
| Un état courant | Indiquer ce que la machine est en train de faire |
| Un ensemble de règles | Déterminer la prochaine action |
| Un état d'arrêt | Indiquer que le traitement est terminé |

Pour notre premier exemple, chaque case contient soit le symbole `X`, soit rien.

```text
            tête
              ↓
|  X  |  X  |  X  |     |     |
```

La tête commence sur la première case et applique seulement deux règles :

| Ce que la tête voit | Action |
|---|---|
| `X` | Se déplacer d'une case vers la droite |
| Une case vide | Écrire `X`, puis s'arrêter |

Il n'est pas nécessaire de connaître le binaire ou une notation mathématique pour suivre ce processus. La machine observe une situation, applique la règle correspondante et recommence jusqu'à atteindre l'état d'arrêt.

!!! example "Activité interactive : ajouter une marque"
    Formez une courte ligne de personnes. Chaque personne représente une case du ruban.

    Les trois premières personnes tiennent chacune une petite balle, une boule de papier ou un autre jeton. La personne suivante garde la main vide. Les balles représentent `X`; une main vide représente une case vide.

    Une autre personne joue le rôle de la tête de lecture-écriture. Elle commence devant la première personne et reçoit les deux règles indiquées ci-dessus.

    Avant chaque action, le groupe prédit ce que la tête doit faire. La tête exécute ensuite exactement la règle applicable, sans improviser.

    Lorsque la tête atteint la première main vide, elle y place une balle et s'arrête. La rangée est passée de trois marques à quatre.

    La même activité peut être réalisée sur une table avec des cases en papier et des pièces de monnaie.

### Où se trouve le calcul?

L'activité paraît très simple, mais elle contient déjà les éléments essentiels du modèle :

- les balles et les mains vides représentent des symboles;
- la position de la tête indique la case actuellement examinée;
- l'état courant distingue la recherche de l'arrêt;
- les règles déterminent chaque action;
- la répétition des règles transforme l'état du ruban.

La machine n'a pas besoin de comprendre ce que signifie `X`. Elle doit seulement reconnaître le symbole et appliquer la bonne règle.

### Un ruban « infini »

Le ruban d'une machine de Turing est souvent décrit comme infini. Il ne faut pas imaginer un rouleau de papier qui existe réellement et qui traverse toute la pièce.

Cela signifie plutôt que le modèle ne fixe pas de limite pratique au nombre de cases disponibles. Si le traitement demande une nouvelle case, nous supposons qu'une autre case peut être ajoutée. Cette simplification permet d'étudier les règles du calcul sans être arrêté par la taille d'une feuille ou la quantité de mémoire d'une machine réelle.

### D'une machine spécialisée à une machine universelle

La machine que nous venons d'imiter est spécialisée. Ses règles lui permettent seulement de chercher une main vide, d'y placer une balle et de s'arrêter.

Imaginez maintenant que la même personne reçoive une autre fiche d'instructions :

1. tendez un bras en diagonale vers le haut et sur le côté, loin de l'avant de votre corps;
2. pliez l'autre bras devant votre visage;
3. baissez la tête vers le coude du bras plié;
4. arrêtez-vous.

La fiche ne nomme pas le mouvement et personne n'annonce à l'avance la posture finale. La personne suit simplement les étapes; le résultat devient progressivement reconnaissable pendant l'exécution.

Les deux fiches décrivent deux machines spécialisées différentes :

- une machine qui examine des mains et place une balle;
- une machine qui déplace des bras et une tête selon une séquence précise.

La même personne peut imiter l'une ou l'autre parce qu'elle reçoit la description des règles à suivre. En exécutant successivement deux ensembles d'instructions et en produisant deux comportements différents, elle illustre la notion d'une machine capable de simuler plusieurs machines spécialisées.

C'est l'idée centrale de la **machine de Turing universelle** : une seule machine peut recevoir la description d'une autre machine et reproduire son comportement. La machine universelle ne doit pas être reconstruite pour chaque nouvelle tâche; elle reçoit plutôt un nouveau programme.

La personne au cœur de notre activité n'est pas, au sens strict, une machine de Turing universelle : elle ne dispose ni de ressources ni de temps illimités et ne peut pas matérialiser un ruban infini. L'activité illustre néanmoins l'idée selon laquelle un même exécuteur peut simuler plusieurs processus lorsqu'on lui fournit leurs règles, un principe fondamental de l'informatique moderne.

!!! question "Vérification rapide"
    Dans l'activité des balles, qu'est-ce qui représente le ruban, les symboles, la tête et les règles?

    Pourquoi la machine des balles est-elle spécialisée?

    Qu'est-ce qui doit changer pour que la même personne imite la deuxième machine?

### Idée à retenir

Une machine de Turing transforme des symboles en appliquant mécaniquement des règles simples. Une machine de Turing universelle peut recevoir la description de différentes machines et les simuler.

Nous pouvons maintenant ajouter une nouvelle question à notre définition de l'ordinateur : peut-il recevoir une description d'instructions et exécuter plusieurs processus sans être physiquement reconstruit?

## Le modèle de von Neumann et le programme enregistré

La machine analytique de Babbage séparait le mécanisme de calcul des cartes qui lui fournissaient des instructions. La machine de Turing universelle montrait, de façon théorique, qu'une même machine pouvait simuler plusieurs autres machines lorsqu'elle recevait leur description.

Le modèle du programme enregistré rapproche ces idées des ordinateurs construits dans le monde réel.

### Une idée issue d'un travail collectif

En 1945, un document intitulé *First Draft of a Report on the EDVAC* a décrit une organisation dans laquelle les instructions d'un programme et les données traitées sont conservées dans la même mémoire.

Le rapport a circulé sous le nom de John von Neumann, ce qui explique l'expression **architecture de von Neumann**. L'idée ne vient toutefois pas d'une seule personne. Elle s'est développée dans un travail collectif auquel ont notamment participé J. Presper Eckert, John Mauchly, Herman Goldstine, Arthur Burks et d'autres membres de l'équipe liée à l'EDVAC.

Le nom du modèle reste utile, mais il ne doit pas effacer le caractère collaboratif de son développement.

### Instructions et données dans la même mémoire

Dans ce modèle, la mémoire peut contenir :

- les instructions qui décrivent le travail à effectuer;
- les données sur lesquelles ces instructions doivent agir;
- les résultats produits pendant l'exécution.

Les instructions ne se trouvent donc plus uniquement sur un support externe distinct, comme les cartes prévues pour la machine analytique. Elles peuvent être chargées dans la mémoire de la machine, lues et remplacées comme d'autres informations.

Cette organisation rend possible un cycle général :

> chercher une instruction → l'interpréter → l'exécuter → passer à la suivante

Ce cycle est souvent résumé par les termes **rechercher, décoder, exécuter** (*fetch, decode, execute*).

### Les grandes fonctions du modèle

Pour le moment, nous pouvons considérer les parties du système comme des boîtes noires :

| Fonction | Rôle général |
|---|---|
| Mémoire | Conserver les instructions, les données et les résultats |
| Unité de contrôle | Chercher les instructions et coordonner leur exécution |
| Unité arithmétique et logique | Effectuer les opérations demandées |
| Entrée | Fournir des programmes ou des données au système |
| Sortie | Communiquer les résultats |

L'unité de contrôle et l'unité arithmétique et logique font partie de ce que nous appelons aujourd'hui le processeur. Leur fonctionnement physique sera étudié plus tard dans le cours.

### Activité : une mémoire, deux types de contenu

L'exemple suivant utilise un jeu d'instructions inventé et volontairement simplifié. Il ne représente pas les instructions réelles d'un processeur. Il sert uniquement à rendre visible la différence entre une instruction et une donnée.

| Adresse | Contenu de la mémoire | Type |
|---:|---|---|
| 0 | Copier le contenu de l'adresse 4 vers l'adresse 5 | Instruction |
| 1 | Ajouter le caractère `!` au contenu de l'adresse 5 | Instruction |
| 2 | Arrêter | Instruction |
| 3 | Case inutilisée | Donnée |
| 4 | `BONJOUR` | Donnée |
| 5 | Case vide | Donnée |

!!! example "Exécuter le programme"
    Une personne joue le rôle de l'unité de contrôle. Elle commence à l'adresse 0.

    Avant chaque étape, le groupe lit le contenu de l'adresse courante et prédit ce qui changera en mémoire.

    1. À l'adresse 0, le contenu de l'adresse 4 est copié vers l'adresse 5.
    2. À l'adresse 1, le caractère `!` est ajouté à la valeur placée à l'adresse 5.
    3. À l'adresse 2, l'exécution s'arrête.

    À la fin, l'adresse 5 contient `BONJOUR!`.

Les instructions et le mot `BONJOUR` se trouvent dans le même tableau de mémoire. Ce qui les distingue n'est pas leur emplacement physique, mais la manière dont le système les interprète.

Posez-vous ensuite les questions suivantes :

- En français, la convention typographique demande une espace avant le point d'exclamation : `BONJOUR !`. Comment pourrait-on modifier l'instruction à l'adresse 1 pour ajouter cette espace?
- Pourquoi le caractère d'espacement doit-il être représenté comme une donnée plutôt que comme une absence de contenu?
- Que faudrait-il modifier pour produire `SALUT !`?
- Que faudrait-il modifier pour produire `BONJOUR ?`?
- Quelles parties de la machine resteraient identiques dans ces différents cas?

### De la machine universelle à l'ordinateur généraliste

Le programme enregistré permet à une même machine physique de recevoir différents ensembles d'instructions. Un traitement de texte, un jeu et un outil de calcul n'exigent pas nécessairement trois machines reconstruites différemment. Ils peuvent être des programmes différents chargés et exécutés par le même système.

Cette organisation constitue un lien concret avec l'idée de Turing : le comportement de la machine change lorsque la description des règles qu'elle doit exécuter change.

Un ordinateur réel possède des ressources limitées et son fonctionnement est beaucoup plus complexe que notre tableau. Le modèle explique néanmoins pourquoi le logiciel peut transformer l'usage d'une machine sans modifier sa construction physique.

!!! question "Vérification rapide"
    Où se trouvent les instructions dans l'exemple?

    Où se trouvent les données?

    Quelle différence importante existe entre les cartes de la machine analytique et le programme enregistré?

### Idée à retenir

Le modèle de von Neumann conserve les instructions et les données dans une mémoire commune. Le système cherche une instruction, l'interprète, l'exécute, puis continue.

Cette idée permet à une même machine de changer de comportement lorsqu'elle reçoit un autre programme. Elle constitue l'un des fondements des ordinateurs généralistes modernes.

## Une machine de routage programmable

Les modèles de Turing et de von Neumann décrivent des idées importantes, mais ils peuvent rester difficiles à visualiser. La machine suivante rend une partie de ces idées concrète à l'aide d'une bille et de trois embranchements successifs.

Le dispositif ressemble à un jeu de chute de bille, avec une différence essentielle : **le trajet n'est pas laissé au hasard**. À chaque embranchement, une instruction impose un déplacement vers la gauche ou vers la droite. Après trois instructions, la bille tombe dans l'une des huit destinations, identifiées par les lettres de A à H.

Le mécanisme reste toujours le même. Seule la suite d'instructions change.

!!! example "Activité : programmer un mot"
    Observez le mot cible et les huit destinations avant de modifier le programme.

    Pour chaque lettre du mot, préparez un groupe de trois instructions. Suivez mentalement le trajet de la bille à chaque embranchement avant de lancer la machine.

    Lorsque toutes les instructions sont en place, exécutez le programme complet. Les commandes sont alors verrouillées : chaque bille doit terminer son trajet avant que le programme puisse être corrigé.

    Les lettres obtenues apparaissent seulement lorsque les billes atteignent leurs destinations. Comparez le résultat observé au mot cible, repérez le premier trajet qui doit être revu, puis effacez ou modifiez le programme. Passez au défi suivant lorsque vous êtes satisfait de votre résultat.

<iframe
  src="../../../assets/demos/programmable-letter-router.html?lang=fr"
  title="Machine interactive de routage de lettres"
  loading="lazy"
  sandbox="allow-scripts"
  style="width: 100%; height: 940px; border: 0;"
></iframe>

### Ce que représente la machine

Pendant l'exécution, la **position actuelle** de la bille représente une partie de l'état du système. La prochaine instruction et cette position déterminent ensemble le prochain déplacement. La machine n'a pas besoin de comprendre le mot qu'elle produit; elle applique simplement les instructions dans l'ordre prévu.

Cette activité permet d'observer plusieurs idées déjà rencontrées :

- un même mécanisme peut produire des résultats différents lorsqu'il reçoit un autre programme;
- un programme peut être une longue suite de petites instructions très simples;
- chaque instruction transforme l'état courant du système;
- une erreur dans le programme influence l'exécution jusqu'à ce que celle-ci se termine et que le programme soit modifié;
- un résultat complexe, comme un mot, peut être construit par la répétition d'un processus simple.

La machine est volontairement limitée. Elle ne représente pas toute l'architecture d'un ordinateur, mais elle montre comment une suite enregistrée d'instructions peut contrôler, étape par étape, le comportement d'un mécanisme.

## Synthèse intégrée : qu'est-ce qu'un ordinateur?

Au début de la séance, vous avez dressé une liste d'objets qui pourraient être des ordinateurs ou contenir un ordinateur. Les exemples de Babbage, de Lovelace, de Turing et de von Neumann nous donnent maintenant des critères plus précis pour reprendre cette liste.

### Reprenez votre liste

!!! question "Révisez votre classement"
    Relisez chaque élément de votre liste initiale. Indiquez si vous souhaitez maintenant le conserver, le retirer, l'ajouter à vos incertitudes ou le déplacer entre « est un ordinateur » et « contient un ordinateur ».

    Choisissez ensuite un élément dont votre classement a changé. Justifiez cette nouvelle décision à l'aide d'au moins deux des idées suivantes :

    - il reçoit des entrées ou de l'information;
    - il conserve un état ou des données;
    - il suit des instructions;
    - il transforme de l'information;
    - il produit un résultat ou une sortie;
    - son comportement peut changer lorsque ses instructions changent.

Notre définition ne dépend donc plus de la forme d'un objet, de la présence d'un clavier ou de la taille d'un écran. Nous pouvons utiliser la définition de travail suivante pour la suite du cours :

!!! note "Terminologie : définition de travail"
    **Un ordinateur est un système qui représente de l'information, conserve un état et suit des instructions pour transformer cette information ou produire un résultat.**

Cette définition reste volontairement assez large. La programmabilité existe aussi à différents degrés. Un ordinateur portable peut recevoir une immense variété de programmes, tandis qu'un contrôleur intégré dans un appareil suit un programme beaucoup plus limité. Les deux peuvent effectuer un traitement informatique sans être utilisés ni décrits de la même façon.

### Cas final : le four à micro-ondes

Avant d'ouvrir la réponse, prenez position sur les questions suivantes :

1. Un four à micro-ondes est-il un appareil électronique?
2. Contient-il un système qui lit des entrées, conserve un état et suit des instructions enregistrées?
3. Faut-il alors dire que le four est un ordinateur, ou qu'il contient un ordinateur?

??? note "Réponse à consulter après avoir pris position"
    Un four à micro-ondes numérique moderne contient généralement un **microcontrôleur**, c'est-à-dire un petit ordinateur intégré conçu pour contrôler un appareil précis.

    Ce contrôleur peut notamment :

    - recevoir les entrées des boutons, du clavier et des capteurs de porte;
    - conserver l'état de la minuterie, du niveau de puissance et du mode choisi;
    - exécuter des instructions enregistrées;
    - commander l'affichage, le ventilateur, l'éclairage et les périodes de fonctionnement du magnétron.

    Le magnétron qui produit les micro-ondes n'est pas lui-même un ordinateur. Le four complet est plus utilement décrit comme **un appareil qui contient un ordinateur intégré**. Un ancien modèle commandé uniquement par des mécanismes électriques ou mécaniques pourrait ne pas en contenir.

    Cette distinction s'applique à de nombreux objets. Une automobile, une montre ou un thermostat peut contenir un ou plusieurs ordinateurs sans que l'objet complet soit principalement décrit comme un ordinateur.

### Ce qui a changé

La question n'est plus seulement : « Est-ce que cet objet ressemble à un ordinateur de bureau ou à un portable? »

Nous pouvons maintenant demander :

- Quelles informations le système reçoit-il?
- Quel état conserve-t-il?
- Quelles instructions suit-il?
- Comment ces instructions transforment-elles son état ou produisent-elles un résultat?
- L'objet est-il lui-même un ordinateur généraliste, ou contient-il un ordinateur spécialisé?

Une définition utile ne permet pas seulement de classer des objets familiers. Elle fournit des critères permettant d'expliquer et de défendre ce classement lorsque les exemples deviennent moins évidents.

## Glossaire de départ

Commencez un glossaire personnel. Pour chaque terme, écrivez une courte définition dans vos propres mots et ajoutez un exemple si possible.

Termes suggérés :

- ordinateur;
- matériel;
- logiciel;
- système d'exploitation;
- périphérique;
- processeur;
- mémoire;
- stockage;
- réseau;
- commande;
- script;
- compatibilité;
- spécification technique.

Ce glossaire servira de référence pendant les séances suivantes.

## Lien avec les évaluations

Cette séance prépare les évaluations à venir en installant un vocabulaire précis et une méthode de raisonnement fondée sur l'observation, les instructions, l'état et les résultats produits.

| Élément du cours | Lien avec la séance 1 |
|---|---|
| Évaluations pratiques régulières | Observer un système, employer un vocabulaire précis et expliquer son raisonnement plutôt que donner seulement une réponse |
| Projet certificatif | Décrire le comportement d'un système et justifier une classification ou un choix à l'aide de critères techniques |
| Examen certificatif | Expliquer les liens entre instructions, données, état et programmabilité, puis distinguer un ordinateur généraliste d'un contrôleur intégré |

## Erreurs fréquentes à éviter

- **Réduire un ordinateur à un PC de bureau.** Vérifiez plutôt si le système reçoit de l'information, représente des états, exécute des instructions et peut modifier son comportement selon un programme.
- **Confondre matériel et fonction.** Un boîtier, un écran ou un clavier peut faire partie d'un système informatique sans être, à lui seul, ce qui définit le calcul.
- **Présenter une inférence comme une observation.** Notez d'abord ce que l'outil ou le matériel montre réellement, puis séparez l'interprétation et la recommandation.
- **Croire qu'une définition historique suffit pour tous les systèmes modernes.** Utilisez les modèles historiques pour construire des critères, puis vérifiez leurs limites sur des systèmes embarqués, mobiles et spécialisés.

## Ce qu'il faut retenir

- Un ordinateur représente de l'information, conserve un état et suit des instructions pour produire un résultat.
- Babbage et Lovelace ont contribué à séparer le mécanisme programmable des instructions qui dirigent son travail.
- Une machine de Turing montre comment des règles simples peuvent transformer un état; une machine universelle peut simuler différents processus lorsqu'elle reçoit leurs règles.
- Le modèle de von Neumann conserve les instructions et les données dans une mémoire partagée et exécute les instructions dans un cycle ordonné.
- Un objet peut être un ordinateur généraliste ou contenir un ordinateur spécialisé, comme un microcontrôleur.
- Le cours vise à évaluer des composants et des solutions en observant, comparant et justifiant avec précision.

## Passer à la pratique

La partie pratique de cette séance se trouve sur une page distincte afin que les consignes restent faciles à retrouver pendant le travail en laboratoire.

[Continuer vers le Laboratoire 1 - Découvrir le poste de travail](../laboratoires/laboratoire-1.md)

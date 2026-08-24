# Laboratoire 14 - Observer et diagnostiquer deux échanges réseau

[Retour à la Séance 14](../seances/seance-14.md)

## But du laboratoire

Vous allez observer ou interpréter la configuration réseau d'un poste, distinguer une résolution DNS d'une connexion au service et appliquer une méthode de diagnostic par couches.

Les transcriptions stables intégrées à la page permettent de réaliser tout le parcours exigé. Les commandes en direct sont facultatives lorsque le réseau du laboratoire, le compte ou la politique locale ne permettent pas un test.

## Objectifs

À la fin du laboratoire, vous devriez être en mesure de :

- relever l'état d'une interface et les paramètres IPv4 utiles;
- déterminer si une destination est locale ou distante avec un préfixe fourni;
- distinguer l'échange DNS de la connexion au service;
- interpréter prudemment `ping`, `Resolve-DnsName` et `tracert`;
- diagnostiquer des scénarios simples sans modifier la configuration;
- comparer des besoins de transport et de liaison;
- prolonger le cahier des charges Atlas avec des exigences réseau.

!!! info "Repères de planification"
    Les plages ci-dessous sont des **estimations d'effort pédagogique**, et non des délais garantis. L'enseignant peut ajuster l'ordre, l'étendue, le point d'arrêt ou remplacer un test réel par une transcription.

    - **Parcours prioritaire — environ 80 à 100 minutes d'effort indicatif :** préparer le compte rendu, interpréter l'interface et la configuration IP, décider local ou distant, distinguer les deux échanges et analyser les tests contrôlés.
    - **Consolidation exigée — environ 40 à 60 minutes d'effort indicatif :** diagnostiquer les scénarios, comparer les besoins, évaluer une source et compléter le cahier des charges.
    - **Prolongement facultatif — environ 15 à 25 minutes d'effort indicatif :** répéter les observations avec les commandes approuvées sur le poste réel.

!!! warning "Limites de l'activité"
    N'effectuez aucun balayage, changement d'adresse, désactivation d'interface, modification du pare-feu ou test vers une destination non approuvée. Toutes les commandes exigées sont en lecture seule. Si une demande d'élévation apparaît, annulez-la.

!!! warning "La progression n'est pas votre compte rendu"
    Les cases sont conservées seulement dans ce navigateur. Conservez les commandes, sorties, tableaux, interprétations et questions ouvertes dans un document que vous contrôlez.

<div class="lab-checklist" data-lab-checklist data-lab-id="c12-lab-14-fr-v2" data-gate-template="{done} sur {total} engagements reconnus" data-progress-template="{done} sur {total} tâches terminées" data-reset-confirm="Effacer la progression de ce laboratoire sur ce navigateur?">
<section class="lab-gate" aria-labelledby="lab-14-gate-title">
<h2 id="lab-14-gate-title">Entente de travail</h2>
<p>Lisez chaque engagement. Le laboratoire sera accessible lorsque les trois engagements auront été reconnus.</p>
<div class="lab-acknowledgements">
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Utilisation assignée</strong><small>J'utiliserai le poste de travail, le réseau et les outils du cours uniquement pour les activités d'apprentissage assignées.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Compte rendu permanent</strong><small>Je conserverai mon travail, mes sources, mes commandes, mes calculs et mon raisonnement dans mon compte rendu permanent.</small></span></label>
<label class="lab-task"><input type="checkbox" data-lab-gate-check><span><strong>Incertitude signalée</strong><small>Je signalerai les incertitudes, résultats inattendus, erreurs ou préoccupations de sécurité au lieu de les dissimuler.</small></span></label>
</div>
<div class="lab-actions"><button class="lab-button" type="button" data-lab-unlock disabled>Accéder au laboratoire</button><span data-lab-gate-status aria-live="polite">0 sur 3 engagements reconnus</span></div>
</section>
<div class="admonition warning lab-specific-constraints"><p class="admonition-title">Contraintes propres à ce laboratoire</p><p>Les commandes et transcriptions servent à l'observation et au diagnostic; n'essayez pas de contourner les restrictions du réseau du Cégep.</p></div>

<noscript>
<div class="lab-no-js-note">
<strong>Mode sans JavaScript</strong>
<p>Toutes les consignes et transcriptions restent visibles. La progression enregistrée, le déverrouillage et la réinitialisation ne seront pas disponibles; suivez les tâches dans votre compte rendu permanent.</p>
</div>
</noscript>

<div class="lab-content" data-lab-content hidden>
<div class="lab-progress"><p data-lab-progress-text aria-live="polite">0 sur 11 tâches terminées</p><button class="lab-button secondary" type="button" data-lab-reset>Réinitialiser</button><progress data-lab-progress value="0" max="11">0 sur 11</progress></div>

## Parcours prioritaire

<section class="lab-stage" data-lab-stage>
<h2 tabindex="-1">Préparer le compte rendu</h2>
<p>Créez les rubriques : <strong>contexte</strong>, <strong>interface</strong>, <strong>configuration IP</strong>, <strong>local ou distant</strong>, <strong>DNS</strong>, <strong>connexion au service</strong>, <strong>tests</strong>, <strong>diagnostic</strong>, <strong>source</strong> et <strong>synthèse</strong>.</p>
<p>Dans un travail partagé hors de la classe, masquez une partie des adresses MAC, des adresses IP publiques, des noms d'hôtes et des domaines internes, sauf consigne contraire.</p>
<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Préparez le compte rendu et appliquez la règle de confidentialité.</strong><small>Conservez assez d'information pour rendre le raisonnement vérifiable.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Interpréter l'interface et la liaison</h2>

Analysez la transcription :

```text
Name      InterfaceDescription        Status  LinkSpeed
Ethernet  Intel(R) Ethernet Adapter    Up      1 Gbps
Wi-Fi     Wireless Adapter             Down    0 bps
vEthernet Virtual Ethernet Adapter     Up      10 Gbps
```

Répondez :

1. quelle interface physique possède une liaison active?
2. quelle valeur est une vitesse de liaison et non un débit d'application?
3. pourquoi `vEthernet` ne devrait-il pas être choisi automatiquement comme chemin physique du poste?
4. qu'est-ce que cette sortie ne permet pas de confirmer?

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interprétez l'état des interfaces.</strong><small>Distinguez interface physique, interface virtuelle et preuve manquante.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Interpréter la configuration IP</h2>

```text
InterfaceAlias : Ethernet
IPv4Address    : 192.168.10.25
PrefixLength   : 24
DefaultGateway : 192.168.10.1
DNSServer      : 192.168.10.53
DHCPEnabled    : True
MacAddress     : 00-11-22-33-44-55
```

Conservez les six valeurs et expliquez le rôle de chacune. Indiquez aussi deux conclusions que cette transcription **ne** permet pas encore de tirer.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interprétez la configuration IP.</strong><small>Un champ plausible ne prouve pas que le service correspondant répond.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Décider si une destination est locale ou distante</h2>

Le poste utilise `192.168.10.25/24`. Classez :

| Destination | Locale ou distante? | Justification |
|---|---|---|
| `192.168.10.1` | | |
| `192.168.10.80` | | |
| `192.168.11.5` | | |
| `203.0.113.20` | | |
| `192.168.10.25` | | |

??? success "Vérification"
    Les adresses `192.168.10.1`, `192.168.10.80` et l'adresse du poste appartiennent au préfixe local `/24`. Les adresses `192.168.11.5` et `203.0.113.20` sont distantes.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Classifiez les cinq destinations.</strong><small>Utilisez toujours l'adresse et le préfixe ensemble.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Dessiner les deux échanges</h2>

Dessinez et annotez :

```text
A. résolution du nom
application → résolveur DNS → serveur DNS → enregistrement retourné

B. connexion au service
application → adresse obtenue → interface → passerelle/route → service
```

Étiquetez chaque élément comme **observé**, **fourni**, **inféré** ou **non vérifié**.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Dessinez les deux échanges.</strong><small>Ne placez pas le serveur DNS comme un saut obligatoire vers le service final.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Interpréter trois tests contrôlés</h2>

### Test 1 — passerelle

```text
Pinging 192.168.10.1 with 32 bytes of data:
Reply from 192.168.10.1: bytes=32 time<1ms TTL=64
```

### Test 2 — DNS

```text
Name         Type TTL Section IPAddress
service.test A    300 Answer  203.0.113.20
```

### Test 3 — route

```text
1  192.168.10.1
2  *  *  *
3  198.51.100.8
4  203.0.113.20
```

Pour chaque test, inscrivez :

- ce que le résultat soutient;
- ce qu'il ne confirme pas;
- le prochain test possible.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Interprétez les trois tests.</strong><small>Un astérisque ou un échec ICMP ne constitue pas automatiquement une panne complète.</small></span></label></div>
</section>

## Consolidation exigée

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Diagnostiquer des scénarios</h2>

Pour chaque scénario, indiquez la première responsabilité non confirmée et le prochain test le plus précis.

### Scénario A

```text
Interface Ethernet : Down
Adresse IPv4 : aucune
```

### Scénario B

```text
Interface Ethernet : Up
Adresse IPv4 : 169.254.34.8/16
Passerelle : aucune
```

### Scénario C

```text
Interface Ethernet : Up
Adresse IPv4 : 192.168.10.25/24
Passerelle : 192.168.10.1
Resolve-DnsName service.test : délai dépassé
Test contrôlé vers 203.0.113.20 : réussi
```

### Scénario D

```text
DNS : service.test → 203.0.113.20
Route : destination atteinte
Connexion TCP au port demandé : refusée
```

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Diagnostiquez les quatre scénarios.</strong><small>La conclusion doit rester proportionnelle aux preuves fournies.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Comparer les besoins de transport et de liaison</h2>

### Application 1 — transfert d'un rapport

Le fichier doit arriver complet et dans l'ordre. Un délai supplémentaire modéré est acceptable.

### Application 2 — audio interactif en direct

Une petite perte ponctuelle peut être préférable à une longue attente causée par la retransmission.

Pour chaque application, expliquez quelles propriétés de TCP ou d'UDP sont pertinentes. Ne concluez pas seulement « TCP est fiable » ou « UDP est rapide ».

Choisissez ensuite une liaison pour :

- un poste fixe de diffusion en continu;
- un portable utilisé dans plusieurs locaux.

Considérez mobilité, stabilité, installation, sécurité, interférences et diagnostic.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Comparez les besoins de transport et de liaison.</strong><small>Reliez chaque propriété à l'application ou au contexte.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Évaluer une source technique</h2>

Évaluez une source officielle sur DHCP, DNS, TCP, UDP, Ethernet ou Wi-Fi. Répondez en **au plus deux phrases par partie** :

1. **Source et éditeur**;
2. **Pertinence**;
3. **Spécification**;
4. **Vérification**;
5. **Nature des énoncés**.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Évaluez une source en cinq parties.</strong><small>La source doit soutenir l'énoncé précis que vous vérifiez.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Mettre à jour le cahier des charges et le cycle de vie</h2>

Ajoutez au cahier des charges Atlas :

- besoin pertinent;
- critères techniques;
- compatibilité;
- recommandation provisoire et question ouverte.

Incluez les exigences réseau utiles : interface, liaison filaire ou sans fil, débit approprié, pilotes, sécurité, ports logiques nécessaires et soutien.

Ajoutez une phrase sur la **longévité**, la **stabilité**, l'**efficacité** et la **maintenabilité** de la solution réseau recommandée.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Complétez les exigences Atlas et le cycle de vie.</strong><small>Nommez les preuves encore nécessaires.</small></span></label></div>
</section>

<section class="lab-stage" data-lab-stage markdown="1">
<h2>Rédiger le diagnostic intégré</h2>

Choisissez un scénario et rédigez 140 à 200 mots contenant :

- le symptôme;
- les responsabilités confirmées;
- la première responsabilité incertaine;
- la preuve utilisée;
- le prochain test;
- une conclusion provisoire.

<div class="lab-tasks"><label class="lab-task"><input type="checkbox" data-lab-task-check><span><strong>Rédigez le diagnostic intégré.</strong><small>Ne transformez pas une hypothèse plausible en certitude.</small></span></label></div>
</section>

</div>
</div>

<div data-lab-supplement="c12-lab-14-fr-v2" hidden>
## Prolongement facultatif — observer le poste réel

Utilisez seulement les valeurs et destinations approuvées par l'enseignant.

```powershell
Get-NetAdapter
Get-NetIPConfiguration

$Passerelle = '192.168.10.1' # remplacez seulement par la valeur approuvée
$Nom = 'service.test'         # remplacez seulement par le nom approuvé
$Destination = '203.0.113.20' # remplacez seulement par la destination approuvée

ping $Passerelle
Resolve-DnsName $Nom
tracert $Destination
```

Comparez les sorties réelles aux transcriptions. Cette activité est facultative et ne modifie pas la progression exigée.
</div>

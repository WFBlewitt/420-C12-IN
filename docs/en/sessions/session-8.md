# Session 8 - Motherboard and PC Build Logic

## Purpose of the session

In Session 7, we followed startup from the first firmware instructions to the loading of the operating system. Firmware, however, can initialize only hardware that the platform connects, powers, and supports correctly.

That physical and logical platform is organized around the **motherboard**.

A motherboard does not magically make a processor, memory kit, graphics card, or SSD more powerful. Instead, it determines:

- which components can be installed;
- how they communicate;
- which resources they share;
- which connectors are available;
- which physical and electrical limits must be respected;
- which future upgrades remain realistic.

This Session answers five questions:

> How does a motherboard organize communication among the processor, memory, storage, and peripherals?

> Why is a matching socket not always enough to guarantee that a processor will work?

> How can we distinguish the physical size of a PCIe slot, its electrically connected lane count, and its supported generation?

> Why can two similar-looking M.2 connectors accept different devices?

> How can we verify that a motherboard, case, power supply, and other components form a system that can actually be assembled?

## Objectives

### Main pathway

By the end of the Session and its associated Lab, you should be able to:

- explain the motherboard’s role as a network of connections, controllers, power delivery, and constraints;
- distinguish processor socket, chipset, and platform;
- explain why processor compatibility depends on the socket, chipset, firmware, and manufacturer support list;
- compare ATX, microATX, and Mini-ITX by dimensions, expansion capacity, and case constraints;
- interpret memory slots, channels, and population rules in a manual;
- distinguish PCIe slot length, electrical lane count, generation, and lane source;
- interpret an M.2 connector by key, length, interface, lanes, and shared resources;
- verify the main compatibility relationships among the motherboard, case, processor, cooling, memory, expansion cards, storage, and power supply;
- produce a compatibility matrix that distinguishes confirmed items, assumptions, and remaining checks;
- recommend a platform for a defined need without confusing connector count, actual performance, and upgrade potential.

!!! question "Guiding questions"
    1. **Can the component be installed?** Form factor, socket, dimensions, location, and connector.
    2. **Can the component operate?** Interface, firmware, generation, lanes, power, and support.
    3. **Does the complete system remain coherent?** Local compatibility does not guarantee that all components work together without sharing, obstruction, or another limit.

!!! info "Scope of the session"
    **Master today:** motherboard role, chipset, socket, ATX, microATX and Mini-ITX form factors, RAM slots, PCIe, M.2, power connectors, case compatibility, and the verification method.

    **Recognize today:** PCIe lanes supplied directly by the processor or chipset, bandwidth sharing, QVLs, VRMs, fan headers, front-panel headers, and power-supply form factors.

    **Go further after the Lab link:** PCIe bifurcation, detailed lane topologies, power stages, VRM thermal limits, multi-socket motherboards, and proprietary form factors. This material is optional.

## The problem with a set of “compatible” parts

Consider a gaming and live-streaming PC project. The provisional list includes:

- a recent desktop processor;
- a DDR5 memory kit;
- a full-length graphics card occupying several slots;
- two M.2 NVMe SSDs;
- a compact case;
- a modular power supply.

Each component may be excellent in isolation. The build can still fail if:

- the processor socket does not match;
- the motherboard has the correct socket but requires newer firmware;
- the case does not accept the motherboard form factor;
- the graphics card blocks a connector or exceeds the available length;
- the second SSD disables a SATA port or reduces lanes to a PCIe slot;
- the cooler collides with the memory;
- the power supply lacks a required connector;
- a modular cable from another power supply is reused.

The correct method is therefore not to ask only:

> Is this part compatible?

Instead, ask:

> Compatible with which other part, in which configuration, according to which source, and with what consequences?

??? question "Check: local or complete-system compatibility?"
    A PCIe graphics card may be compatible with the motherboard’s primary slot but still be impossible to install because of its length or thickness. Local electrical compatibility does not prove physical compatibility for the complete system.

## The motherboard: a map of connections and constraints

The **motherboard** is the main printed circuit board of a modular computer. It carries or connects:

- the processor socket;
- memory slots;
- the chipset;
- PCI Express slots;
- M.2 and SATA connectors;
- power-delivery circuits;
- internal USB, audio, and front-panel headers;
- network, audio, and sometimes wireless controllers;
- rear input-output ports;
- the flash memory containing platform firmware.

It does more than hold parts. Its traces, controllers, switches, and connectors determine possible paths among components.

```text
                           ┌───────────────┐
                           │   processor   │
                           └──────┬────────┘
                    direct memory│
             ┌────────────────────┼───────────────────┐
             ▼                    ▼                   ▼
         RAM slots          primary PCIe       direct CPU M.2
                                  │
                                  │ chipset link
                                  ▼
                           ┌───────────────┐
                           │    chipset    │
                           └──────┬────────┘
             ┌────────────────────┼────────────────────┐
             ▼                    ▼                    ▼
          USB / SATA          other PCIe          network / audio
```

This diagram is a general model. Exact lane counts, integrated controllers, and paths vary by processor, chipset, and manufacturer design.

!!! warning "The chipset no longer necessarily controls everything"
    Older PC architecture was often explained through a northbridge and southbridge. On modern platforms, several high-speed functions, especially the memory controller and some PCIe lanes, are normally integrated into the processor. The chipset remains important, but it is not the only route between the processor and every peripheral.

<figure markdown="span">
  ![An ATX motherboard fitted with a processor and cooling fan.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Atx_computer_motherboard_with_cpu_and_fan.jpg){ loading=lazy width="760" }
  <figcaption>An ATX motherboard shows the processor socket, memory slots, expansion slots, and internal connectors. Public-domain image, <a href="https://commons.wikimedia.org/wiki/File:Atx_computer_motherboard_with_cpu_and_fan.jpg">Wikimedia Commons</a>.</figcaption>
</figure>

## Form factor: dimensions, mounting points, and expansion capacity

A **form factor** describes physical constraints including:

- board dimensions;
- mounting-point positions;
- the general location of the rear I/O panel;
- the maximum number of available expansion positions;
- its relationship with cases and some power-supply formats.

Common modular desktop-PC form factors include:

| Form factor | Common nominal dimensions | Possible expansion positions | Typical tradeoff |
|---|---:|---:|---|
| ATX | 305 × 244 mm | Up to 7 | More room for slots, connectors, and cooling |
| microATX | 244 × 244 mm | Up to 4 | Smaller system with reduced expansion capacity |
| Mini-ITX | 170 × 170 mm | 1 | Very compact, but space, connectors, and cooling are more constrained |

These values describe the general standard, not a guaranteed connector count on every product. An ATX board may leave positions unused; a microATX board may provide four RAM slots or only two.

<figure markdown="span">
  ![Scale comparison of ATX, microATX, DTX, Mini-ITX, and Mini-DTX motherboard form factors.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Comparison_ATX_%CE%BCATX_DTX_ITX_mini-DTX.svg){ loading=lazy width="560" }
  <figcaption>Comparison of motherboard dimensions and relative mounting positions. Illustration: ScotXW, <a href="https://commons.wikimedia.org/wiki/File:Comparison_ATX_%CE%BCATX_DTX_ITX_mini-DTX.svg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

### Downward case compatibility

An ATX case often accepts ATX, microATX, and Mini-ITX motherboards because smaller forms use a compatible subset of mounting positions. The case manual must still be checked.

The reverse is not true: an ATX motherboard cannot fit in a case designed only for Mini-ITX.

### Standoffs

The motherboard rests on metal or plastic **standoffs** attached to the case. They:

- align the mounting holes;
- prevent the underside of the board from touching the chassis directly;
- maintain stable mechanical spacing.

A standoff placed where the board has no mounting hole can contact circuitry and cause a short circuit. The form factor and standoff positions must therefore be checked before assembly.

??? question "Check: is a smaller board always better?"
    No. A smaller board supports a compact build but often reduces the number of slots, connectors, and space around components. The choice depends on requirements, case, cooling, and planned upgrades.

## Socket, chipset, and platform

### Recall: the processor socket

In Session 5, we distinguished the processor package, motherboard socket, and LGA and PGA arrangements. We also encountered several recent families: Intel LGA1700 and LGA1851, and AMD AM4 and AM5.

In this Session, the goal is no longer merely to recognize those names. We must **prove platform compatibility**. The first check remains straightforward: the processor's exact socket name must match the motherboard socket.

### Why the right socket does not guarantee operation

A processor may physically fit the socket but remain unsupported because of:

- the chipset;
- the board’s electrical design;
- the installed firmware version;
- a manufacturer limitation;
- the processor’s exact generation or family.

The decisive source is the official **CPU support list** for the exact motherboard model. It often identifies a minimum firmware version.

```text
CPU compatibility
= correct socket
+ compatible chipset and board design
+ sufficient firmware version
+ processor listed by the manufacturer
```

### The chipset

The **chipset** groups or coordinates several platform input-output functions. Depending on generation, it may provide:

- additional PCIe lanes;
- USB ports;
- SATA ports;
- associated networking or audio functions;
- management, overclocking, or storage options;
- links to some firmware functions.

Two boards using the same socket can therefore provide very different capabilities because of their chipset and manufacturer design.

### The platform

In this Session, **platform** means the coherent combination of:

- a processor family;
- a socket;
- one or more chipsets;
- a memory generation;
- firmware and compatibility rules.

A chipset’s marketing name should not be interpreted in isolation. Consult processor and motherboard specifications.

!!! example "Compatibility case: the socket matches"
    A motherboard has the expected socket, and the processor fits physically. The official list nevertheless states that the processor requires firmware newer than the installed version.

    **Fact:** the socket matches.

    **Constraint:** the board must be able to boot or update through a method compatible with its current state.

    **Open question:** does the board provide a firmware-update function that works without a supported processor?

## Memory slots: type, number, channel, and population

Memory slots must match the supported module type. DDR4 and DDR5 slots use different key positions and are not interchangeable.

To verify memory, distinguish:

- supported generation;
- module form factor;
- maximum total capacity;
- maximum capacity per slot;
- number of slots;
- number of memory-controller channels;
- supported transfer rates for the processor and population;
- placement rules in the manual;
- JEDEC profiles and optional profiles such as XMP or EXPO.

### Slots and channels are not synonyms

A motherboard may have four slots while using a two-channel controller. The slots are distributed across the channels.

```text
channel A: A1 ─ A2
channel B: B1 ─ B2
```

With two modules, the manual may recommend A2 and B2. Installing them in A1 and A2 can use one channel or create a different configuration.

!!! warning "Slot colours are not universal proof"
    Colours may help group channels, but conventions vary. Use board labels and the exact model manual.

??? question "Check: do four slots mean four channels?"
    No. Slot count represents physical positions. Channel count depends on the memory controller and platform.

## PCI Express: physical size, lanes, and generation

PCI Express, or **PCIe**, connects expansion cards and some internal devices to the processor or chipset.

A PCIe link uses a number of **lanes**. Common configurations include:

- x1;
- x2;
- x4;
- x8;
- x16.

Each lane carries data in both directions. A newer generation generally increases capacity per lane.

### Three properties to distinguish

A slot has at least three important properties:

1. **physical length**;
2. **electrically connected lane count**;
3. **generation supported by the complete path**.

A physically x16-length slot may operate electrically at x4. Its length permits installation of a long card but does not guarantee sixteen lanes.

```text
physical x16 slot
┌──────────────────────────────────────────────┐
│ possible wiring: x16, x8, x4, or another     │
└──────────────────────────────────────────────┘
```

<figure markdown="span">
  ![Several PCI Express slots of different lengths on a motherboard.](https://commons.wikimedia.org/wiki/Special:Redirect/file/PCI_Express.jpg){ loading=lazy width="720" }
  <figcaption>PCIe slots can have different physical lengths. Visible length alone does not establish the wired lane count. Photo: Csendesmark, <a href="https://commons.wikimedia.org/wiki/File:PCI_Express.jpg">Wikimedia Commons</a>, public domain.</figcaption>
</figure>

### Compatibility across generations

PCIe is designed to negotiate among compatible generations. A newer card can often operate in an older slot, but at the lowest common generation and lane count.

This does not guarantee:

- enough case space;
- suitable power connectors;
- access to neighbouring slots;
- maximum performance;
- support for every function in firmware and the operating system.

### Processor lanes and chipset lanes

PCIe lanes may come:

- directly from the processor;
- from the chipset, which then communicates with the processor over a shared link.

Direct lanes are often assigned to the primary graphics card and one or more fast SSDs. Chipset lanes serve other slots, controllers, or connectors.

Several chipset-connected devices may share the capacity of the chipset-to-processor link. Total port count therefore does not always represent independent simultaneous capacity.

!!! example "Sharing case"
    A motherboard provides a secondary PCIe slot and a second M.2 connector. The manual states that installing an SSD in that connector reduces the secondary slot to x2 or disables it.

    Both connectors exist physically, but they are not necessarily usable simultaneously at full capacity.

## M.2: one form factor, several interfaces

**M.2** describes a compact card and connector form factor. It does not automatically mean “NVMe SSD.”

An M.2 connector may support:

- PCIe/NVMe;
- SATA;
- USB;
- wireless network cards;
- other functions according to its key and design.

### Module length

A designation such as `2280` describes dimensions:

```text
22 mm wide × 80 mm long
```

Other lengths include 2230, 2242, 2260, and 22110.

### Keys and notches

Notches on the module and connector form **keys**. They limit which devices can be inserted and indicate some interface possibilities.

A mechanical match still does not guarantee that the motherboard supports the device’s protocol.

<figure markdown="span">
  ![An M-key M.2 connector on a motherboard with mounting positions for 2260 and 2280 modules.](https://commons.wikimedia.org/wiki/Special:Redirect/file/M.2_connector_on_a_computer_motherboard.jpg){ loading=lazy width="720" }
  <figcaption>An M-key M.2 connector with several mounting positions. Photo: Dsimic, <a href="https://commons.wikimedia.org/wiki/File:M.2_connector_on_a_computer_motherboard.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

### Questions for an M.2 SSD

For each connector, verify:

1. accepted physical lengths;
2. key type;
3. SATA, PCIe/NVMe, or dual support;
4. available PCIe generation;
5. lane count;
6. whether lanes come from the processor or chipset;
7. shared resources;
8. supplied heatsink or mounting screw;
9. physical conflict with an expansion card.

!!! warning "M.2 guarantees neither NVMe nor a particular speed"
    Physical form factor, interface, and generation are separate properties. An M.2 SATA SSD does not become NVMe because it is installed in a connector resembling one used by a PCIe SSD.

## Case compatibility

The case must accept more than the motherboard form factor.

### Main checks

| Item | Check |
|---|---|
| Motherboard | Accepted form factor and standoff positions |
| Graphics card | Length, height, thickness, and rear expansion positions |
| CPU cooler | Maximum height or radiator dimensions |
| Liquid-cooling radiator | Position, length, thickness, and conflict with RAM or motherboard |
| Power supply | Form factor, length, and cable space |
| Storage | Number and form of bays or mounting points |
| Front panel | USB, USB-C, audio, buttons, and corresponding headers |
| Ventilation | Fan positions, airflow direction, and clearance |

### Expansion-card thickness

A graphics card may use one PCIe x16 slot while physically occupying two, three, or more case positions. It can then:

- cover a neighbouring PCIe slot;
- block an M.2 connector;
- obstruct SATA connectors;
- restrict airflow;
- collide with a radiator or storage cage.

### The front panel

A case may provide a front USB-C port, but the motherboard must include the corresponding internal header. An external port does not create the required controller or header.

!!! question "Check: the case accepts ATX, so everything fits?"
    No. Motherboard form factor does not confirm graphics-card length, cooler height, power-supply format, or front-panel connectors.

## Power-supply compatibility

The power supply, or **PSU**, must provide:

- enough power;
- expected voltages;
- required connectors;
- a case-compatible form factor;
- suitable quality and protection for the system.

### Total wattage is not enough

A `750 W` label alone does not confirm:

- CPU connector count;
- graphics-card connector type;
- power-supply length;
- regulation quality;
- ability to handle transient loads;
- modular-cable compatibility.

### Common connectors

| Connector | General role |
|---|---|
| 24-pin ATX | Main motherboard power |
| 4+4-pin or 8-pin CPU EPS | Processor power |
| 6+2-pin PCIe | Power for some expansion cards |
| Recent high-power GPU connector | Power for some modern graphics cards |
| SATA power | SATA SSDs, HDDs, and accessories |

The motherboard manual identifies required or optional board-power connectors. The graphics-card manufacturer identifies the required connector type and count.

!!! danger "Modular cables are not universal"
    Two cables may fit into a power supply while using different internal wiring. Use only cables supplied with or explicitly approved for the exact power-supply model.

### Power-supply form factor

Cases may accept ATX, SFX, or other power-supply forms. A mechanical adapter does not necessarily solve length, cooling, or cabling limits.

## Building a compatibility matrix

A matrix makes the decision verifiable and prevents one dependency from being lost.

| Relationship to verify | Expected evidence | Possible state |
|---|---|---|
| CPU ↔ motherboard | Socket, CPU list, minimum firmware | Confirmed / check required / incompatible |
| RAM ↔ CPU ↔ motherboard | Generation, capacity, rates, population, optional QVL | Confirmed / check required / incompatible |
| Motherboard ↔ case | Form factor and mounting points | Confirmed / check required / incompatible |
| GPU ↔ motherboard | Slot, lanes, and generation | Confirmed / check required / incompatible |
| GPU ↔ case | Dimensions and occupied positions | Confirmed / check required / incompatible |
| GPU ↔ PSU | Power, connectors, and manufacturer recommendation | Confirmed / check required / incompatible |
| M.2 SSD ↔ motherboard | Length, key, interface, lanes, and sharing | Confirmed / check required / incompatible |
| Cooler ↔ CPU ↔ motherboard ↔ case | Socket, mounting, clearance, and thermal capacity | Confirmed / check required / incompatible |
| Front panel ↔ motherboard | USB, audio, and button headers | Confirmed / check required / incompatible |

### Three evidence states

**Confirmed** means an official source directly answers the question for the exact models.

**Check required** means compatibility appears plausible, but a dimension, version, lane-sharing rule, or condition is still missing.

**Incompatible** means an identified constraint prevents the intended installation or operation.

!!! example "Recurring case: Project Atlas"
    **Atlas** is a compact gaming and live-streaming PC. Its microATX motherboard accepts the selected processor and DDR5 memory. It provides two M.2 connectors and a primary PCIe x16 slot.

    The following still require verification:

    - minimum firmware for the processor;
    - recommended placement of the two memory modules;
    - lane sharing for the second M.2 connector;
    - graphics-card thickness;
    - cooler height;
    - front USB-C header;
    - power-supply form factor and cables.

    A parts list is therefore not yet a complete recommendation.

## A logical selection method

The following order reduces rework:

1. define requirements, budget, and physical constraints;
2. choose a suitable processor family;
3. choose a platform and chipset with required functions;
4. verify the official CPU list and firmware;
5. select motherboard form factor according to expansion and case;
6. verify memory and population;
7. verify PCIe slots, lanes, and conflicts;
8. verify M.2, SATA, and shared resources;
9. verify GPU and cooling dimensions;
10. size and verify the power supply;
11. verify front-panel headers, fans, and accessories;
12. preserve sources and open questions in the matrix.

This method does not require one component always to be chosen first. It requires each decision to be connected to established constraints.

## Integrated synthesis

The motherboard transforms a set of components into a coherent platform. It provides:

- physical connections;
- communication paths;
- power distribution;
- controllers and interfaces;
- form-factor, lane, and sharing limits;
- firmware able to initialize supported components.

Compatibility must therefore be examined at several levels:

```text
mechanical compatibility
+ electrical compatibility
+ logical compatibility
+ firmware compatibility
+ thermal compatibility
+ complete-system compatibility
```

One “yes” is not enough. A strong recommendation connects every component to the others, cites exact documentation, and identifies what still needs confirmation.

## Common errors to avoid

### Choosing a motherboard only by its socket

The socket is necessary, but the chipset, CPU support list, and firmware version must also be checked.

### Assuming a larger form factor is always superior

ATX often provides more expansion, but may be unnecessary or incompatible with a compact requirement.

### Counting RAM slots as channels

Four slots do not mean four channels. Check the memory controller and manual.

### Reading “x16” only from slot length

A long slot may be wired as x8 or x4.

### Assuming every M.2 connector accepts every M.2 SSD

Check the key, length, interface, lanes, and resource sharing.

### Adding port counts without reading sharing notes

Some connectors disable or reduce other resources when used.

### Checking the motherboard and forgetting the case

The graphics card, cooler, radiator, power supply, and cables have their own dimensions.

### Choosing a power supply only by wattage

Connectors, quality, form factor, and cables are also essential.

### Mixing modular cables

A cable that physically fits the power supply may use a different pinout and damage hardware.

### Using a photograph as the only evidence

A photograph helps identify parts, but manuals and specifications establish functions, lanes, and limits.

## What to remember

### What is the motherboard’s role?

- It connects, powers, and organizes components.
- It determines interfaces, paths, and several platform limits.
- It does not by itself guarantee component performance.

### How should a processor be verified?

- Check the socket.
- Check the chipset and board design.
- Check the official CPU support list.
- Check the minimum firmware version.

### What must be distinguished for PCIe?

- Physical slot length.
- Electrically connected lanes.
- Path generation.
- Lane source and possible sharing.

### What must be distinguished for M.2?

- Form and length.
- Key.
- SATA or PCIe/NVMe interface.
- Generation and lane count.
- Shared resources.

### How is the complete build verified?

- Use a compatibility matrix.
- Check dimensions, connectors, lanes, power, and firmware.
- Consult manuals and official lists for exact models.
- Name open questions before recommending.

## Put it into practice

Lab 8 will ask you to read specifications and manuals, identify motherboard paths and connectors, and build a compatible core platform for Project Atlas.

[Continue to Lab 8 - Verifying PC Platform Compatibility](../labs/lab-8.md)

## Go further: power delivery, lanes, and advanced validation

This section is optional. It is not required for the main Lab.

### VRM and processor power

A **voltage-regulator module**, or VRM, converts and stabilizes power for the processor and other components. Advertised phase count alone does not establish quality; components, control, cooling, and actual load also matter.

### QVLs

A **qualified vendor list**, or QVL, identifies components tested by a manufacturer in particular configurations. Absence from the list does not automatically prove incompatibility, but inclusion provides additional evidence for the tested configuration.

### PCIe bifurcation

**Bifurcation** divides some processor-supplied lanes, for example splitting an x16 link into two x8 links. It depends on the processor, motherboard, firmware, and wiring.

### Proprietary form factors

Some prebuilt systems use proprietary boards, cases, power supplies, or connectors. Resemblance to ATX does not prove compliance with the standard.

### Validation after assembly

After an authorized build, validation should check:

- absence of cable or component conflicts;
- detection of processor, memory, and storage;
- temperatures and fans;
- PCIe link mode and width;
- firmware version and settings;
- stability under an appropriate load;
- operation of front-panel ports.

## Technical sources to consult

- Manual and specification page for the exact motherboard model.
- Official CPU support list and minimum firmware versions.
- Processor documentation for memory and supplied PCIe lanes.
- Case manual for form factors and clearances.
- Power-supply and graphics-card documentation for power and connectors.
- [PCI-SIG — PCI Express](https://pcisig.com/pci-express)
- [UEFI Forum — UEFI Specifications](https://uefi.org/specifications)
- Wikimedia Commons file pages cited under each image for licences and attribution.

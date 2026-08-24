# Session 12 - From port to peripheral: verifying a connection chain

## Purpose of the session

In Session 11, we followed data to an image and sound. That chain often ends at a display, headset, microphone, camera, controller, or another peripheral. A device does not become usable merely because its plug fits a port.

A working connection depends on several conditions:

- connector shape and orientation;
- supported protocol and generation;
- host-port capability;
- cable, adapter, hub, or dock capability;
- available power;
- signal direction;
- peripheral capability;
- operating-system detection;
- driver and application configuration;
- accessibility needs of the person using the system.

This session answers five questions:

> Why can connectors that look alike provide very different functions?

> How should a USB connection be interpreted, especially when the connector is USB-C?

> How can we distinguish common display, audio, network, and storage connections?

> What do drivers and interrupts do when a peripheral communicates with a system?

> How can an accessibility peripheral be evaluated without assuming that one product suits everyone?

## Objectives

By the end of the session and associated Lab, you should be able to:

- distinguish plug, receptacle, port, cable, adapter, hub, and dock;
- separate connector shape from protocol, throughput, power, and optional functions;
- recognize USB Type-A, Type-B, Mini-B, Micro-B, and Type-C;
- interpret USB 2.0 and USB 5, 10, 20, 40, and 80 Gbit/s capabilities;
- explain `Gen 1x1`, `Gen 2x1`, and `Gen 2x2` in USB 3.2 documentation;
- explain why USB-C guarantees neither a particular data rate, video output, nor charging power;
- verify a USB chain through host, cable, hub or dock, device, power, and driver;
- recognize HDMI, DisplayPort, Mini DisplayPort, DVI, and VGA and distinguish digital from analogue links;
- recognize TS, TRS, and TRRS audio connectors and explain why a 3.5 mm jack does not prove one function;
- recognize the 8P8C modular connector commonly called RJ-45 and distinguish it from Ethernet capability;
- distinguish SATA data and power connectors and recall the limits of M.2 form-factor evidence;
- recognize PS/2 ports and explain precautions associated with this legacy interface;
- explain Plug-and-Play identification, class and manufacturer drivers, and digital signatures;
- explain the general role of an interrupt and recognize traditional line interrupts and message-signalled interrupts;
- apply a layered diagnostic method;
- translate an accessibility need into connection, software, mounting, support, and maintenance requirements.

!!! info "Scope of the session"
    **Master today:** connector and capability; plug, receptacle, and port; complete connection chain; USB connector forms; USB 2.0 and USB 5/10/20/40/80 Gbit/s; USB 3.2 `Gen x` notation; USB-C optional functions; USB power; HDMI, DisplayPort, DVI, and VGA; 3.5 mm TS/TRS/TRRS audio; 8P8C commonly called RJ-45; SATA and M.2; PS/2; Plug-and-Play; drivers; interrupts; troubleshooting method; accessibility peripherals.

    **Recognize today:** USB Power Delivery up to 240 W in a fully compatible chain; DisplayPort Alt Mode; certified cables; active and passive adapters; TOSLINK; Power over Ethernet; link negotiation; class drivers; MSI and MSI-X; refreshable braille displays, switch access, and eye control.

    **Go further after the Lab link:** full pinouts, USB protocol analyzers, video-bandwidth calculation, EDID, HDCP, T568A/T568B wiring, detailed Ethernet categories, PoE standards, interrupt-controller architecture, and driver development. This section is optional.

## The problem with one USB-C receptacle

A laptop connects to a dock through USB-C. The dock connects:

- an external display;
- an external SSD;
- Ethernet;
- a headset;
- USB-C power.

The result is disappointing:

- the display runs at a lower refresh rate than expected;
- the SSD copies far below its advertised speed;
- Ethernet negotiates at 100 Mbit/s;
- the laptop slowly discharges during use;
- the headset microphone is not selected.

Every plug fits, but the problem may occur at many layers:

```text
need
  ↓
required function
  ↓
host port
  ↓
cable, adapter, hub, or dock
  ↓
peripheral port and capability
  ↓
system detection
  ↓
driver
  ↓
application configuration
```

Connector shape is only the first check.

## Name the objects before troubleshooting

| Term | Meaning in this session |
|---|---|
| Plug | male part inserted into a receptacle |
| Receptacle | female part that receives the plug |
| Connector | mechanical and electrical plug or receptacle |
| Port | device connection point, including a connector and capabilities |
| Cable | conductors, shielding, possible electronics, and end connectors |
| Adapter | device that changes shape, direction, or protocol; passive or active |
| Hub | device that shares one connection among several peripherals in the same family |
| Dock | device combining several ports, controllers, and often power delivery |

A **passive adapter** exposes or rearranges signals that already exist. An **active adapter** contains electronics that convert a signal or protocol. Direction, power, throughput, and compatibility must be verified.

### Source, sink, host, and device

In a display chain, the **source** produces a signal and the **sink** receives it. In a conventional USB chain, the **host** organizes communication with **devices**.

Identical plugs at both ends do not make a function bidirectional. DisplayPort-to-HDMI, USB-C-to-HDMI, and some audio converters work in only one direction.

!!! warning "Physical symmetry does not prove functional symmetry"
    USB-C is mechanically reversible, but supported function and power direction are negotiated and documented separately.

## USB: connector forms, rates, and functions

### Connector forms

<figure markdown="span">
  ![Scaled illustration of major USB connector forms, from legacy types to Type-C.](https://commons.wikimedia.org/wiki/Special:Redirect/file/USB_connector_illustration%2C_to_scale%2C_grouping%2C_all.svg){ loading=lazy width="900" }
  <figcaption>USB includes Type-A, several Type-B, Mini, Micro, and Type-C forms. Illustration: Matthew Wynn, <a href="https://commons.wikimedia.org/wiki/File:USB_connector_illustration,_to_scale,_grouping,_all.svg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

| Form | Frequent location | Important note |
|---|---|---|
| USB Type-A | computer, charger, hub | oriented legacy form; several generations may use it |
| USB Type-B | printer, scanner, audio equipment | square body with bevelled upper corners |
| Mini-B | older cameras, controllers, specialized equipment | legacy form still encountered |
| Micro-B | older phones, external drives, small devices | USB 2 and wider USB 3 forms exist |
| USB Type-C | recent computers, phones, docks, displays, power | reversible form; capabilities vary widely |

Blue plastic in a Type-A port often suggested USB 3.x, but colour is not universal proof. Documentation and certified markings are stronger evidence.

### USB-C describes shape, not the complete capability

<figure markdown="span">
  ![Illustration of full-featured, USB-2-only, and power-only USB-C plugs and receptacles.](https://commons.wikimedia.org/wiki/Special:Redirect/file/USB_connector_illustration%2C_to_scale%2C_grouping%2C_Type-C.svg){ loading=lazy width="620" }
  <figcaption>Physically compatible USB-C connectors may wire all functions, only USB 2, or power only. Illustration: Matthew Wynn, <a href="https://commons.wikimedia.org/wiki/File:USB_connector_illustration,_to_scale,_grouping,_Type-C.svg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

A USB-C port or cable may support some combination of:

- USB 2.0 only;
- USB 5, 10, 20, 40, or 80 Gbit/s;
- basic power;
- USB Power Delivery;
- DisplayPort Alt Mode;
- USB4 transport of several protocols;
- Thunderbolt on supported platforms;
- power only, with no data conductors.

Ask not only “Is it USB-C?” but:

> What rate, lanes, power, video mode, and function does every element in the chain support?

## USB rates and generation notation

USB documentation contains specification names and user-facing performance labels. Clear rate labels such as **USB 10Gbps** are more useful than a generation name alone.

| Performance label | Documentation name | Maximum nominal raw signalling rate |
|---|---|---:|
| High-Speed USB | USB 2.0 | 480 Mbit/s |
| USB 5Gbps | USB 3.2 Gen 1x1 | 5 Gbit/s |
| USB 10Gbps | USB 3.2 Gen 2x1 | 10 Gbit/s |
| USB 20Gbps | USB 3.2 Gen 2x2 | 20 Gbit/s |
| USB 20Gbps or 40Gbps | some USB4 implementations | 20 or 40 Gbit/s |
| USB 80Gbps | compatible USB4 Version 2.0 implementation | 80 Gbit/s |

These are signalling ceilings, not guaranteed file-copy rates. Encoding, protocol overhead, controllers, hubs, storage, shared links, and workload reduce useful throughput.

### `Gen 1x1`, `Gen 2x1`, and `Gen 2x2`

In USB 3.2:

- `Gen 1` signals at 5 Gbit/s per lane;
- `Gen 2` signals at 10 Gbit/s per lane;
- `x1` means one lane;
- `x2` means two lanes.

```text
Gen 1x1 = 5 Gbit/s × 1 lane = 5 Gbit/s
Gen 2x1 = 10 Gbit/s × 1 lane = 10 Gbit/s
Gen 2x2 = 10 Gbit/s × 2 lanes = 20 Gbit/s
```

USB 3.2 Gen 2x2 requires Type-C to use both lanes.

!!! warning "Legacy USB 3.0, 3.1, and 3.2 names"
    Historical names were reused during specification revisions. A specification that says only “USB 3.1” is ambiguous. Find the rate in Gbit/s, lane count, and exact model.

### Common-capability rule

```text
possible useful capability
= compatible minimum of host, port, cable,
  hub or adapter, and peripheral
```

A 20 Gbit/s host and SSD connected by a 10 Gbit/s cable cannot exceed the cable’s 10 Gbit/s signalling capability before overhead and device limits.

## USB and power

Separate:

- base port power;
- negotiated USB Power Delivery;
- charger maximum;
- cable power rating;
- device demand;
- power consumed by the dock itself.

USB PD 3.1 allows up to **240 W** in a complete compatible Type-C chain. This does not mean every USB-C port supplies 240 W.

Certified USB-C-to-USB-C cables may carry markings that state **60 W** or **240 W**, and certified data cables may also state their data capability.

!!! example "The laptop discharges even with a charger"
    A 100 W charger powers a dock that retains 15 W. If the cable or dock limits delivery, the laptop may receive less than it requests. Verify negotiated power at each stage rather than the number printed on the charger alone.

### Power direction

USB PD negotiates which side supplies power. A device able to receive power is not necessarily able to supply it.

## USB-C, video, and docks

DisplayPort Alt Mode uses high-speed USB-C lanes to carry DisplayPort. Host port, cable, adapter, and display must support the required path.

A dock may share lanes among video, USB data, Ethernet, storage, and other controllers. Two high-resolution displays plus fast peripherals may therefore meet an internal bandwidth limit even when every port has a high headline rate.

??? question "Check: can every USB-C charging cable carry video?"
    No. A power-focused or USB-2-only cable may omit the high-speed lanes required by DisplayPort Alt Mode.

## Display connections

<figure markdown="span">
  ![Panel containing DisplayPort, HDMI, VGA, and DVI receptacles.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Kramer_Electronics_SID-X1N-2.jpg){ loading=lazy width="850" }
  <figcaption>DisplayPort, HDMI, VGA, and DVI can appear on the same device, but they do not carry identical signals. Photo: © Raimond Spekking, <a href="https://commons.wikimedia.org/wiki/File:Kramer_Electronics_SID-X1N-2.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

| Interface | General signal | Audio | Recognition-level use and limit |
|---|---|---|---|
| HDMI | digital | generally yes | televisions, displays, projectors; port and cable functions vary |
| DisplayPort | digital | yes | computers and displays; verify version, rate, and implemented features |
| Mini DisplayPort | digital | yes | smaller form in the same logical family; also used by some legacy Thunderbolt connections |
| DVI | digital, analogue, or both by variant | generally no | legacy; DVI-D, DVI-I, and link count affect compatibility |
| VGA / DE-15 | analogue | no | legacy; conversion from a digital-only source generally requires active conversion |
| USB-C with DP Alt Mode or USB4 | digital | yes | USB-C shape does not guarantee video output |

A display mode combines pixel dimensions, refresh rate, colour depth, possible chroma subsampling, HDR, number of displays, and possible compression. Every element in the path must support the combination.

A version number such as “HDMI 2.1” or “DisplayPort 2.1” does not by itself prove the exact available mode. Verify the exact port, link rate, implemented features, published mode, cable certification, and simultaneous-use limits.

### Current cable-capability markings

At drafting time, HDMI identifies **Ultra High Speed** cables for capabilities up to 48 Gbit/s and **Ultra96** cables for capabilities up to 96 Gbit/s. VESA uses certifications such as **DP54** and **DP80** for DisplayPort cables. These labels can evolve; verify the certification database and the exact manufacturer documentation rather than relying on connector shape or a generic version number.

### Adapter direction

- DisplayPort-to-HDMI may depend on a compatible source or active conversion.
- HDMI-to-DisplayPort generally requires active electronics and often power.
- Digital-to-VGA requires digital-to-analogue conversion.
- An adapter that changes shape does not create a signal the source does not produce.

## Audio: same diameter, different functions

<figure markdown="span">
  ![Comparison of 3.5 mm TRS and TRRS audio plugs.](https://commons.wikimedia.org/wiki/Special:Redirect/file/TRS_and_TRRS.jpg){ loading=lazy width="620" }
  <figcaption>A TRRS plug has one additional contact compared with TRS. Photo: Rx5674, <a href="https://commons.wikimedia.org/wiki/File:TRS_and_TRRS.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</figcaption>
</figure>

- **T**: tip;
- **R**: ring;
- **S**: sleeve.

| Form | Contacts | Frequent use |
|---|---:|---|
| TS | 2 | mono signal or simple control |
| TRS | 3 | unbalanced stereo, balanced mono, or another assignment |
| TRRS | 4 | stereo headset and microphone, depending on pinout |

Diameter and contact count do not determine function alone. A TRS receptacle may be headphone output, line input, microphone input, or balanced connection.

Desktop systems often use separate green output and pink microphone receptacles, while laptops may use a combined TRRS receptacle. A headset may require a correct splitter and pinout. Historical TRRS arrangements commonly called **CTIA/AHJ** and **OMTP** place microphone and ground contacts differently, so an unmatched device may reproduce audio while its microphone fails. USB audio, HDMI, DisplayPort, and TOSLINK are digital alternatives.

## Network: the 8P8C connector commonly called RJ-45

<figure markdown="span">
  ![Twisted-pair network cable terminated with an 8P8C modular plug commonly called RJ-45.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Patch_cable_with_RJ45_connector.jpg){ loading=lazy width="700" }
  <figcaption>The modular plug has eight positions and eight contacts. “RJ-45” is common computer terminology; 8P8C describes the connector form more precisely. Photo: www.heimnetzwerke.net, <a href="https://commons.wikimedia.org/wiki/File:Patch_cable_with_RJ45_connector.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</figcaption>
</figure>

An 8P8C plug does not prove cable category, termination quality, port speed, negotiated speed, PoE, or even Ethernet in every specialized device.

```text
negotiated speed
= best common capability of adapter, switch,
  cable, connectors, and configuration
```

A 100 Mbit/s link may result from an older switch, damaged or incomplete cable, termination problem, configuration, or another path limit. IP addressing does not determine the physical link speed.

Power over Ethernet is also a separately negotiated and specified capability.

## Storage connections

<figure markdown="span">
  ![SATA data and power connectors side by side.](https://commons.wikimedia.org/wiki/Special:Redirect/file/SATA_data_and_power_connectors.jpg){ loading=lazy width="720" }
  <figcaption>SATA uses separate data and power connectors. Photo: Bubba73, <a href="https://commons.wikimedia.org/wiki/File:SATA_data_and_power_connectors.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

An internal SATA device commonly uses a 7-contact data connector and a 15-contact power connector. Do not connect or disconnect an internal SATA device under power in this course.

<figure markdown="span">
  ![Diagram of B and M keys on an M.2 edge connector.](https://commons.wikimedia.org/wiki/Special:Redirect/file/M2_Edge_Connector_Keying.svg){ loading=lazy width="650" }
  <figcaption>B and M keying prevents some incompatible combinations, but key shape alone does not prove protocol. Illustration: NikNaks, <a href="https://commons.wikimedia.org/wiki/File:M2_Edge_Connector_Keying.svg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</figcaption>
</figure>

M.2 compatibility still requires key, length, interface, protocol, lane count, shared resources, firmware, and operating-system support.

An external “NVMe” SSD can still be limited by its USB bridge, cable, port, temperature, and filesystem.

## PS/2: a legacy interface still encountered

<figure markdown="span">
  ![Purple keyboard and green mouse PS/2 ports on the rear of a computer.](https://commons.wikimedia.org/wiki/Special:Redirect/file/PS2_keyboard_and_mouse_ports.jpg){ loading=lazy width="620" }
  <figcaption>PS/2 uses a six-pin Mini-DIN connector. Purple and green are common keyboard and mouse conventions. Photo: Daniel Beardsmore, <a href="https://commons.wikimedia.org/wiki/File:PS2_keyboard_and_mouse_ports.jpg">Wikimedia Commons</a>, public domain.</figcaption>
</figure>

PS/2 remains on some laboratory, industrial, and current motherboard systems.

Recognize:

- six-pin Mini-DIN connector;
- purple keyboard and green mouse conventions;
- combined dual-colour ports on some systems;
- possible operation before full USB-driver loading;
- much more limited throughput and functionality than modern USB peripherals.

PS/2 was not designed as a universally safe hot-plug interface. Connect or disconnect it while the computer is off unless the manufacturer explicitly states otherwise.

A passive USB-to-PS/2 adapter does not convert protocol. It works only when the keyboard or mouse already supports both protocols; otherwise an active converter is required.

## Plug-and-Play: identify before driving

```text
bus or controller detects device
        ↓
device and class identifiers
        ↓
Plug-and-Play manager creates an instance
        ↓
compatible driver search
        ↓
driver loads and resources are assigned
        ↓
device is presented to applications
```

A **class driver** supports a standardized category. A **manufacturer driver** may add specialized functions or management.

Driver records may include provider, version, date, INF file, digital signature, device class, state, and error code. A signature supports origin and integrity checks; it does not prove that the driver is defect-free or the best available version.

A newer date is not automatically better. Verify exact model, operating-system version, release notes, official source, rollback method, and organizational policy.

!!! danger "Avoid generic driver-updater utilities"
    Do not install third-party software promising to update every driver. Use Windows Update, the system or component manufacturer, and approved organizational procedures.

## Interrupts: requesting processor attention

A device must signal events such as received data, completed transfer, key press, or error.

- **Polling** checks status periodically.
- An **interrupt** signals that an event needs attention.

```text
hardware event
    ↓
interrupt or message
    ↓
controller and operating system
    ↓
short driver routine
    ↓
deferred work and application notification
```

Historical systems used physical IRQ lines. Modern PCIe devices commonly use **message-signalled interrupts**, MSI or MSI-X. MSI-X provides several vectors and can help fast devices distribute work.

A shared interrupt number shown by an observation tool does not by itself prove a conflict.

## A layered troubleshooting method

1. **Define the exact symptom:** no power, no detection, low rate, missing function, or wrong application device.
2. **Check shape and direction:** correct port, orientation, and adapter direction.
3. **Check physical integrity:** damage, latch, pins, dirt, or mechanical play.
4. **Check power:** source, cable, dock, and device demand.
5. **Check capability:** generation, lanes, video mode, link speed, analogue or digital signal.
6. **Observe system detection:** instance, class, state, and identifier.
7. **Check the driver:** provider, version, error, and official source.
8. **Check the application:** selected device, permission, format, and setting.
9. **Isolate one variable:** known cable, another compatible port, device, or workstation.
10. **Preserve evidence:** result, error, hypothesis, correction, and open question.

## Accessibility peripherals

Possible categories include large-key or high-contrast keyboards, keyguards, programmable layouts, trackballs, joysticks, adapted mice, switches, sip-and-puff controls, eye tracking, refreshable braille displays, tactile or haptic output, speech input, and amplification or captioning devices.

<figure markdown="span">
  ![Large-key keyboard and joystick used as an alternative pointing device.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Assistive_keyboard_and_Joystick.jpg){ loading=lazy width="720" }
  <figcaption>A large-key keyboard and joystick illustrate two alternative input approaches. Photo: Humanblocks, <a href="https://commons.wikimedia.org/wiki/File:Assistive_keyboard_and_Joystick.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

A recommendation should be built with the person concerned. Verify task, available movement or perception, fatigue, precision, environment, applications, and support.

| Domain | Questions |
|---|---|
| Connection | USB, Bluetooth, specialized port, adapter, or power? |
| System | supported Windows version, driver, accessibility API, or companion software? |
| Installation | administrator privileges, calibration, profile, or service required? |
| Positioning | suitable mount, angle, distance, and physical space? |
| Interaction | configurable latency, force, hold time, repetition, and feedback? |
| Privacy | camera, microphone, biometric data, or cloud service involved? |
| Reliability | fallback when the device or battery fails? |
| Maintainability | available cable, battery, parts, software, warranty, and support? |

<figure markdown="span">
  ![Refreshable braille display positioned in front of a laptop.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Brno%2C_Universal_Learning_Design%2C_Braille_laptop_2_-_detail.JPG){ loading=lazy width="760" }
  <figcaption>A refreshable braille display converts digital output into tactile cells and requires software and hardware compatibility. Photo: Michal Klajban (Podzemnik), <a href="https://commons.wikimedia.org/wiki/File:Brno,_Universal_Learning_Design,_Braille_laptop_2_-_detail.JPG">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</figcaption>
</figure>

!!! warning "Do not choose for the person"
    An “accessible” product label is not a complete recommendation. Trial or validation with the person must include software, mounting, training, support, and a fallback method.

## Integrated method: prove a connection chain

1. **State the required function:** data, video, audio, network, storage, input, or power.
2. **Identify roles:** host, source, sink, and device.
3. **Recognize connectors:** shape, orientation, and direction.
4. **Verify protocol:** USB, DisplayPort, HDMI, Ethernet, SATA, PS/2, or another family.
5. **Verify capability:** rate, lanes, mode, power, channels, or pixel dimensions.
6. **Check every intermediary:** cable, adapter, dock, and internal connector.
7. **Observe the system:** Plug-and-Play instance, state, class, and identifiers.
8. **Verify driver and application:** source, version, selection, and permissions.
9. **Verify accessibility and use:** position, interaction, feedback, and fallback.
10. **Conclude with a limit:** confirmed fact, inference, provisional recommendation, and missing evidence.

## Common errors to avoid

- A fitting plug does not prove protocol, rate, power, or direction.
- USB-C does not automatically mean fast.
- USB 3.2 includes 5, 10, and 20 Gbit/s capabilities.
- A 100 W charger does not guarantee 100 W reaches the laptop.
- Many adapters are directional.
- “RJ-45” does not prove Ethernet speed.
- A signed driver is not automatically the best driver.
- Shared IRQ values do not automatically prove a conflict.
- One accessibility peripheral does not suit every person with the same diagnosis.

## What to remember

- A usable connection is a chain, not only a connector shape.
- USB-C describes a connector; rate, video, and power require separate verification.
- USB 3.2 includes 5, 10, and 20 Gbit/s; `x1` and `x2` indicate lane count.
- USB4 may provide 20, 40, or 80 Gbit/s depending on implementation, cable, and devices.
- The common compatible capability limits the result.
- HDMI, DisplayPort, DVI, and VGA carry different signals and functions.
- TS, TRS, and TRRS describe contacts; exact function depends on pinout and device.
- The common Ethernet connector is 8P8C, often called RJ-45; it does not guarantee link speed.
- SATA separates data and power; M.2 does not prove protocol.
- PS/2 remains on some systems and should normally be connected while powered off.
- Plug-and-Play identifies devices and helps Windows select a driver.
- Interrupts allow devices to signal events; MSI/MSI-X are common with PCIe.
- Troubleshooting should isolate one layer and preserve evidence.
- An accessibility peripheral must fit a particular task and person, with a complete support chain.

## Put it into practice

[Lab 12 - Identifying, verifying, and troubleshooting a peripheral chain](../labs/lab-12.md) uses reference images, read-only Windows observations, USB-chain analysis, Ethernet interpretation, display, audio, PS/2, driver, interrupt, and accessibility scenarios.

## Go further

### Asymmetric USB4 rates

USB4 Version 2.0 can reallocate lanes in some configurations to provide greater capacity in one direction. Do not infer this feature from a generic connector or logo.

### EDID

A display supplies identification and capability data, often called EDID. Drivers use it to offer modes. An adapter, switch, or faulty cable can interfere with discovery.

### Video rate and compression

A raw video mode depends on pixel count, refresh, bit depth, and transport encoding. Display Stream Compression may allow a mode that otherwise exceeds useful link capacity.

### Useful technical sources

- [USB 3.2 - USB-IF](https://www.usb.org/usb-32-0)
- [USB4 - USB-IF](https://www.usb.org/usb4)
- [USB-C cables and connectors - USB-IF](https://www.usb.org/cable_connector)
- [USB Power Delivery - USB-IF](https://www.usb.org/usb-charger-pd)
- [DisplayPort FAQ - VESA](https://www.displayport.org/faq/)
- [Certified HDMI cables](https://www.hdmi.org/resource/cables)
- [Win32_PnPEntity - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-pnpentity)
- [Message-signalled interrupts - Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/enabling-message-signaled-interrupts-in-the-registry)
- [Get started with eye control in Windows](https://support.microsoft.com/en-us/windows/get-started-with-eye-control-in-windows)

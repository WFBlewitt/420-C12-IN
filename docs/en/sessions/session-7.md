# Session 7 - From Power-On to the Operating System: ROM, Firmware, BIOS, and UEFI

## Purpose of the session

In Session 6, we studied random-access memory as the system's working area. RAM is fast and relatively large, but it is **volatile**: when the computer first receives power, RAM does not yet contain the operating system, complete drivers, or user programs.

That leaves an important question:

> If RAM is empty at startup, where are the processor's first instructions stored?

The answer leads to the platform's **firmware**. Stored in non-volatile memory, this software initializes enough hardware to check the system, prepare memory, find a boot program, and transfer control to it.

This session answers five questions:

> What is the relationship among ROM, flash memory, and firmware?

> What happens between pressing the power button and loading the operating system?

> How do legacy BIOS, modern UEFI, and the setup screen often called “the BIOS” differ?

> How do firmware settings and Secure Boot affect startup, compatibility, and security?

> When is a firmware update justified, and why does it carry a distinctive risk?

## Objectives

### Main pathway

By the end of the session and associated Lab, you should be able to:

- explain why a computer needs persistent software before RAM and the operating system are ready;
- distinguish ROM, PROM, EPROM, EEPROM, flash memory, firmware, BIOS, UEFI, and the setup interface;
- describe an introductory boot sequence from power-on to transfer of control to the operating-system loader;
- explain the roles of POST, hardware initialization, non-volatile variables, and boot order;
- compare legacy BIOS boot and UEFI boot without reducing the difference to interface appearance;
- explain the principle of Secure Boot, what it verifies, and what it does not guarantee;
- interpret common firmware settings and predict possible consequences of a change;
- determine whether a firmware update is appropriate from the exact model, installed version, release notes, problem to solve, and available recovery method;
- make a cautious recommendation that distinguishes expected benefit, compatibility, risk, evidence, and rollback or recovery.

!!! question "Guiding questions"
    1. **What instruction can run before RAM contains an operating system?**
    2. **Which stage currently controls the machine?** Firmware, boot manager, OS loader, or kernel?
    3. **What evidence justifies a change?** A visible option or newer version is not sufficient by itself.

!!! info "Scope of the session"
    **Master today:** purpose of firmware, non-volatile memory, relationship between ROM and flash, POST and initialization, the boot sequence, firmware settings, legacy BIOS, UEFI, boot order, non-volatile variables, Secure Boot, firmware updates, and risk management.

    **Recognize today:** RTC battery, CMOS as a legacy name for some configuration data, EFI System Partition, GPT, CSM, Option ROM, update capsule, dual firmware image, and recovery mechanism.

    **Go further after the Lab link:** detailed UEFI initialization phases, the complete Secure Boot variable structure, measured boot, TPM, attestation, processor microcode, and peripheral firmware. This material is optional.

## The first-program problem

Consider the system immediately after power-on:

- the processor has just left its reset state;
- RAM does not yet contain user programs;
- the operating system has not been loaded;
- the operating system's full drivers are not available;
- storage contains persistent data, but the machine must already know enough to access it.

The processor must nevertheless begin somewhere. The platform architecture therefore defines an initial location or equivalent mechanism that leads to code stored in **non-volatile** memory.

```text
power-on
   ↓
processor reset state
   ↓
first firmware instructions
   ↓
progressive hardware initialization
   ↓
search for a boot option
   ↓
operating-system loader
   ↓
kernel and operating-system drivers
```

This persistent code is not yet Windows, Linux, or macOS. It belongs to the platform and must operate before the operating system can take control.

??? question "Check: why cannot the operating system be the first instruction?"
    It is normally stored on a storage device and must be located, read, and placed into memory. Earlier software must first prepare enough of the platform to perform those operations.

!!! example "Recurring case: the Orion workstation"
    The **Orion** workstation has just received a new DDR5 memory kit. During the first startup, the **DRAM** diagnostic light remains on for about 90 seconds, and then the workstation boots normally. Later startups are quick.

    The manufacturer’s support page also offers a newer firmware version described only as “improved memory compatibility.” Finally, a diagnostic USB drive used by the technical team is refused while Secure Boot is enabled.

    We will return to this case to distinguish normal initialization behaviour, a setting that should be verified, a trust problem, and a firmware update that is genuinely justified.

## From ROM to modern firmware

### ROM: a historical function that became a family of technologies

**ROM** means *read-only memory*. Historically, it described memory whose contents were fixed or difficult to change.

The term remains useful for understanding the development of non-volatile memory, but a modern motherboard normally does not use a chip that can never be rewritten. Its firmware is usually stored in rewritable flash memory.

| Technology | Can be programmed | Can be erased | Main idea |
|---|---:|---:|---|
| Mask ROM | During manufacture | No | Permanent contents produced with the chip |
| PROM | Once after manufacture | No | One-time programming |
| EPROM | More than once | With ultraviolet light | The chip often had to be removed |
| EEPROM | More than once | Electrically | Electrical erasure and programming |
| Flash memory | More than once | Electrically, in blocks | Suited to modern firmware storage |

<figure markdown="span">
  ![View through the quartz window of an AMD 27128 EPROM, showing the ultraviolet-sensitive silicon die.](https://upload.wikimedia.org/wikipedia/commons/5/58/27128_EPROM_Silicon.jpg){ loading=lazy width="520" }
  <figcaption>An ultraviolet-erasable EPROM. Its quartz window allowed the die to be exposed to UV light before reprogramming. Photograph: Gareth Halfacree, <a href="https://commons.wikimedia.org/wiki/File:27128_EPROM_Silicon.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</figcaption>
</figure>

!!! warning "ROM does not always mean absolutely impossible to update"
    In documentation or everyday speech, “BIOS ROM” may historically describe the non-volatile memory containing firmware. On a modern platform, that memory is often rewritable.

### Firmware: software tied to hardware

**Firmware** is software stored in a component or platform to control, initialize, or expose hardware functions.

A motherboard contains platform firmware, but it is not the only example:

- an SSD has firmware that controls flash memory and drive commands;
- a network adapter has firmware;
- a storage controller may execute its own code;
- a keyboard, monitor, or dock may receive firmware updates;
- a processor may receive microcode updates loaded by platform firmware or the operating system.

Firmware is therefore not a synonym for BIOS. **BIOS and UEFI are platform-firmware environments**, while the term firmware covers many more components.

<figure markdown="span">
  ![Small eight-pin serial flash-memory chip used to store the BIOS firmware of a ThinkPad X220 laptop.](https://upload.wikimedia.org/wikipedia/commons/5/58/BIOS_chip_MXIC_25L6406E_on_a_ThinkPad_X220_motherboard_%28FRU_04W3286%29.jpg){ loading=lazy width="620" }
  <figcaption>The black eight-pin component on the left is an 8 MiB serial flash chip used to store this motherboard’s firmware. A modern “BIOS chip” can therefore be physically very small. Photograph: Siarhei Besarab, <a href="https://commons.wikimedia.org/wiki/File:BIOS_chip_MXIC_25L6406E_on_a_ThinkPad_X220_motherboard_(FRU_04W3286).jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

### Where are settings stored?

Older explanations often show two distinct chips:

- ROM containing the BIOS;
- a small battery-backed CMOS memory containing all settings.

That model explains the origin of the vocabulary, but it does not accurately describe every current platform.

On a modern system:

- firmware code is usually stored in non-volatile flash memory;
- settings and variables may be stored in a non-volatile platform area;
- a battery primarily powers the real-time clock and may help preserve some state while unplugged;
- removing the battery or using a reset jumper may restore defaults, but exact behaviour depends on the motherboard.

!!! note "CMOS is often legacy vocabulary"
    **CMOS** first describes a circuit-manufacturing technology. In historical PC usage, “clear the CMOS” means reset firmware settings. For current technical analysis, consult the platform documentation rather than assuming the exact storage architecture.

<figure markdown="span">
  ![CR2032 coin-cell battery installed in its socket on a motherboard.](https://upload.wikimedia.org/wikipedia/commons/d/d8/CMOS_Battery%2C_Motherboard.jpg){ loading=lazy width="620" }
  <figcaption>The round component is a CR2032 cell, often called the “CMOS battery.” It primarily powers the real-time clock while the workstation is unplugged; it is not itself the memory that stores the firmware. Photograph: Kent Madsen, <a href="https://commons.wikimedia.org/wiki/File:CMOS_Battery,_Motherboard.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>.</figcaption>
</figure>

## The boot sequence: a chain of responsibilities

There is no single sequence identical on every machine. Processors, motherboards, integrated devices, and operating systems vary. We can nevertheless build a reliable introductory model.

### 1. Power-on and reset

The power supply stabilizes the required voltages. The platform initially holds parts of the machine in reset, then allows the processor to begin execution at its defined starting point.

At this stage, the system does not yet offer all the functions available in a normal operating environment.

### 2. Platform-firmware execution

The processor begins executing firmware code. The firmware progressively prepares the resources needed for the rest of startup.

It may:

- initialize the processor and chipset;
- configure the memory controller;
- perform memory training;
- make RAM usable;
- discover and initialize essential devices;
- create tables and information the operating system will later use;
- prepare a display or diagnostic console.

Session 6 helps here: before using RAM fully, the firmware must configure the combination of **processor + memory controller + motherboard + modules + settings**.

### 3. POST and initial diagnosis

**POST** means *power-on self-test*. It refers to checks performed while the system powers on.

Depending on the platform, diagnostic information may appear through:

- an on-screen message;
- a beep sequence;
- diagnostic LEDs;
- a code display;
- an internal log;
- an automatic recovery attempt.

POST does not prove that every component is perfect. It means that the planned checks progressed sufficiently or that an error was detected at a particular stage.

!!! warning "A beep code has no universal meaning"
    Meaning depends on the manufacturer, model, and firmware. The correct source is the motherboard or system manual, not a generic table found without context.

!!! example "Return to Orion: failure or memory training?"
    The DRAM light and 90-second delay are **observations**, not yet a diagnosis. Because the workstation eventually boots and later startups are quick, initial memory training is a plausible explanation. It must still be checked against the manufacturer’s manual or support documentation before reaching a conclusion.

### 4. Applying settings and discovering hardware

The firmware applies stored settings and detects components needed for startup.

Examples include:

- date and time;
- boot order;
- enabling or disabling integrated controllers;
- storage-controller mode;
- hardware virtualization;
- memory settings;
- fan management;
- security options;
- Secure Boot;
- recovery settings.

Some changes are relatively low-risk and easily reversible. Others can prevent startup, change how a disk is presented to the operating system, or reduce security.

### 5. Selecting a boot option

The firmware searches for a boot option according to its policy and stored settings.

In a UEFI environment, the firmware boot manager normally uses non-volatile variables describing the options and their order. An option may point to a UEFI application, including an operating-system loader on an EFI System Partition.

```text
stored boot order
   ↓
is option 1 valid?
   ├─ yes → load the specified application
   └─ no  → try the next option or start recovery
```

### 6. Transferring control to the operating-system loader

When the firmware finds a usable option, it loads and executes the corresponding boot program.

A new stage now owns control. The operating-system loader:

- locates the kernel and required files;
- loads components into memory;
- prepares boot information;
- eventually transfers control to the kernel.

The kernel then initializes its own drivers and services. Firmware is therefore not “the operating system before the operating system”; it prepares the platform and hands control to different software.

??? question "Check: put the chain of control in order"
    Place these elements from first to last: **kernel**, **platform firmware**, **operating-system loader**, **boot manager**.

    **Answer:** platform firmware → boot manager → operating-system loader → kernel.

## BIOS: historical and everyday meanings

### Legacy BIOS

**BIOS** means *Basic Input/Output System*. In the traditional PC, it provided:

- hardware initialization;
- basic input/output services;
- a setup interface;
- a boot method based on historical PC conventions.

During classic BIOS disk boot, firmware reads a small initial sector and transfers control to it. That code must then locate later loader stages.

This method is tied to historical constraints, including the limited first-sector size and common use of the MBR partitioning scheme.

### “Entering the BIOS”

In everyday speech, someone may say:

> I entered the BIOS to change the boot order.

On a recent computer, that person is probably using the **UEFI setup interface**. The phrase remains understandable, but it combines:

- the platform firmware;
- the standard or architecture in use;
- the setup program shown on screen.

A graphical mouse-driven interface does not prove that every UEFI function is being used correctly. Conversely, a plain interface is not necessarily legacy BIOS.

## UEFI: a modern boot interface and architecture

**UEFI** means *Unified Extensible Firmware Interface*.

UEFI defines interfaces between platform firmware and software running before the operating system. Important capabilities include:

- a boot manager based on options stored in non-volatile variables;
- loading UEFI applications and drivers;
- use of an EFI System Partition;
- common association with GPT partitioning;
- services available to operating-system loaders;
- an extensible architecture;
- Secure Boot.

### Comparing legacy BIOS and UEFI mechanisms

| Question | Legacy BIOS | UEFI |
|---|---|---|
| How does it find the next program? | Follows historical boot conventions, often from an initial sector | Uses a boot manager and options describing UEFI files or applications |
| Where is the order stored? | Firmware-specific settings | UEFI-defined non-volatile variables |
| Commonly associated partitioning | MBR | GPT and an EFI System Partition |
| Pre-OS extensibility | Limited and dependent on historical conventions | Defined UEFI applications, drivers, and services |
| Secure Boot | Not defined by legacy BIOS | Defined by UEFI |

!!! warning "UEFI is not merely a prettier BIOS"
    Setup-screen appearance is a manufacturer choice. The essential difference concerns interfaces, the boot manager, boot data, and functions available before the operating system.

??? question "Check: mechanism or appearance?"
    Classify each clue.

    1. The menu accepts mouse input.
    2. Firmware stores an option that points to a loader file on the EFI System Partition.
    3. The disk uses GPT.
    4. The setup screen is entirely text based.

    **Answer:** items 1 and 4 describe only interface appearance. Item 2 is direct evidence of a UEFI boot mechanism. Item 3 is commonly associated with UEFI, but GPT alone does not describe the complete boot architecture.

### UEFI, GPT, and disk capacity

A common claim says:

> BIOS supports only 2.2 TB, while UEFI supports 9.4 ZB.

That statement combines several layers.

The limit commonly associated with about `2 TiB` mainly comes from using 512-byte logical sectors with 32-bit addressing fields in MBR:

```text
2³² sectors × 512 bytes ≈ 2 TiB
```

GPT uses different structures and addressing fields. UEFI is commonly used to boot from a GPT disk, but actual supported capacity also depends on:

- the operating system;
- storage controller;
- logical and physical sector format;
- driver;
- firmware;
- partitioning tool.

The responsible conclusion is not “UEFI guarantees an almost unlimited disk”, but:

> UEFI and GPT remove several historical BIOS/MBR boot constraints, while real compatibility must still be verified across the platform.

## Firmware settings: observe before changing

A setup interface may present hundreds of options. The goal is not to memorize every menu, but to connect an option to a consequence and evidence.

### A five-question method

Before making any change:

1. **What problem or requirement are we trying to address?**
2. **Which exact option controls that behaviour on this model?**
3. **What value is currently in use?**
4. **What side effect could prevent startup or alter security?**
5. **How can the previous state be restored?**

### Example categories

| Category | Example | Risk to anticipate |
|---|---|---|
| Boot | Boot order, USB boot | Starting the wrong medium or skipping the expected disk |
| Storage | Controller mode | Making an installed operating system temporarily unbootable |
| Memory | Performance profile, automatic settings | Instability or failed memory training |
| Processor | Virtualization, cores, power limits | Software incompatibility, heat, or changed behaviour |
| Security | Secure Boot, TPM, firmware password | Loader refusal, loss of access, or reduced protection |
| Devices | Controllers, ports, integrated network | A component disappearing from the operating system |

!!! danger "Do not alter an institutional workstation without authorization"
    Read-only observation and a platform change are not equivalent. A setting can affect encryption, startup, security, or availability. In the Lab, activity must remain within the intended environment and follow the stated instructions.

!!! example "Return to Orion: observe before changing"
    Before changing a memory profile, the team records detected capacity, configured speed, boot order, Secure Boot state, and firmware version. These observations create a baseline and prevent every later difference from being attributed to one setting.

??? question "Check: which proposal is technically cautious?"
    A. Immediately enable every available performance profile.

    B. Photograph or record the current state, identify the need, consult the manual, change one authorized setting, and then verify the result.

    C. Reset every setting whenever startup takes longer than expected.

    **Answer: B.** The method preserves a baseline, connects the change to a need, and makes its effect easier to isolate.

## Secure Boot: verify before executing

### The trust problem before the operating system

Before antivirus and normal operating-system protections are active, code must already execute. A modified bootloader could attempt to take control very early.

**Secure Boot** is a mechanism defined by UEFI that allows firmware to verify signatures on components executed during startup. Firmware compares signatures against trust and revocation information stored by the platform.

In a simplified model:

```text
boot component
   ↓
signature verifiable by an approved authority?
   ├─ yes → execution allowed under policy
   └─ no  → refusal, warning, or recovery
```

Verified elements may include:

- UEFI drivers;
- Option ROMs;
- UEFI applications;
- the operating-system loader.

### What Secure Boot provides

Secure Boot can reduce the risk that an unapproved or modified boot component runs before the operating system.

It creates a **chain of trust**: each stage executes only when platform policy accepts it.

### What Secure Boot does not guarantee

Secure Boot does not mean:

- the entire system has no vulnerabilities;
- every signed program is defect-free;
- user data is encrypted;
- the operating system automatically verifies every application;
- one configuration suits every system;
- the feature must be disabled whenever another operating system is used.

Several non-Windows operating systems provide signed compatible loaders. Compatibility depends on the distribution, hardware, approved keys, and configuration.

!!! warning "Disabling is not diagnosing"
    Disabling Secure Boot may bypass a boot refusal, but it removes protection. A responsible process first identifies the refused component, its origin, its signature, and the supported method from the manufacturer or publisher.

??? question "Check: valid signature or perfectly safe software?"
    A valid signature mainly establishes that a component corresponds to an approved publisher or authority and has not changed since signing. It does not prove that the component contains no vulnerability or error.

!!! example "Return to Orion: the refused USB drive"
    Refusal proves neither that the drive is malicious nor that Secure Boot is defective. It indicates that the presented boot component does not satisfy the current trust policy. The team should identify the image, verify its source, and look for a signed version or an officially supported procedure before considering a security change.

## Updating firmware: targeted benefit, distinctive risk

### Why update?

An update may be justified to:

- correct a vulnerability;
- support a new processor or component;
- resolve a documented stability or compatibility problem;
- correct boot behaviour;
- improve memory management;
- apply a microcode or security-key update;
- repair a defect explicitly described in release notes.

### Why not update automatically merely because a version exists?

Firmware operates before normal recovery tools are available. An incorrect image or interruption can prevent the platform from reaching the operating system.

Risks include:

- choosing the wrong model or board revision;
- using a corrupted or unauthentic image;
- losing power;
- shutting down or restarting during writing;
- losing or resetting settings;
- incompatibility with an existing configuration;
- needing to suspend or recover TPM-linked encryption;
- being unable to return to an earlier version;
- requiring a hardware recovery procedure after failure.

??? question "Check: is Orion’s update already justified?"
    The workstation now boots normally, and the release notes say only “improved memory compatibility” without naming the affected problem, module, or platform.

    **Provisional conclusion:** the evidence does not yet justify the update. First verify whether the initial delay matches documented memory-training behaviour, record the current version, and look for more specific release notes. An update could become appropriate if a reproducible fault matches a documented correction.

### A decision process

#### 1. Identify the platform exactly

Record:

- manufacturer and complete model;
- hardware revision, where applicable;
- current firmware version;
- version date;
- operating system;
- active encryption or security features.

#### 2. Read the release notes

Look for a direct link between the observed problem and the announced correction.

A phrase such as “improves stability” is less precise than a note identifying a boot failure with a particular processor or memory configuration.

#### 3. Verify the source and method

Use the manufacturer's official page for the exact model. Check:

- the file and, when supplied, its checksum;
- the recommended method;
- prerequisites;
- required intermediate versions;
- whether defaults must be restored;
- backup or recovery procedure;
- power requirements.

#### 4. Prepare for possible failure

Depending on the platform:

- connect a laptop to its AC adapter;
- avoid a period with elevated power-failure risk;
- retain encryption recovery keys;
- record important settings;
- prepare recovery media;
- verify whether a recovery feature, flash button, or second image exists;
- plan for service interruption.

#### 5. Do not interrupt writing

Once writing has begun, follow the manufacturer's instructions. Do not switch off the device or remove the medium until the procedure permits it.

#### 6. Verify after restart

Confirm:

- the new version;
- restored or changed settings;
- boot order;
- Secure Boot and security functions;
- memory and storage detection;
- resolution of the original problem;
- system stability.

### Recovery mechanisms

Some platforms reduce risk through:

- a protected boot block;
- a backup image;
- two firmware chips or banks;
- a button that can program memory without normal boot;
- USB recovery;
- an authenticated update capsule applied by the system.

These mechanisms are not universal. Their presence, limits, and procedure must be verified in the exact model's documentation.

!!! danger "A firmware update is never risk-free"
    A recovery procedure reduces risk but does not eliminate it. A recommendation must explain why the expected benefit justifies the risk on this exact platform.

## Integrated synthesis: follow control and trust

Use two threads when analysing a boot process or firmware change.

### Thread 1: who has control?

```text
platform firmware
   ↓
boot manager
   ↓
operating-system loader
   ↓
kernel
   ↓
drivers and services
```

At each stage, ask:

- which program is running now;
- where it was stored;
- what it must initialize or verify;
- which next stage receives control.

### Thread 2: why is this stage trusted?

Ask:

- did the component come from the correct source?
- can its integrity be verified?
- does platform policy permit it?
- does a revocation or security update apply?
- what recovery mechanism exists?

### Method for evaluating a change

1. Define the requirement or observed fault.
2. Identify the exact model, version, and current state.
3. Find official documentation.
4. Connect the change to an expected effect.
5. Evaluate consequences for boot, storage, memory, security, and encryption.
6. Prepare rollback or recovery.
7. Modify only in an authorized environment.
8. Verify the result and retain evidence.

## Common errors to avoid

### Saying ROM always contains a program that cannot be changed

Modern platforms normally use rewritable flash memory. ROM is now often a historical or functional term.

### Confusing firmware with an operating-system driver

A driver run by Windows or Linux and firmware executed by a component do not have the same role, even though they cooperate to control hardware.

### Calling the entire setup screen “the BIOS”

The phrase is common, but technical analysis should distinguish legacy BIOS, UEFI, firmware, and the setup interface.

### Reducing UEFI to a graphical interface

UEFI defines interfaces, a boot manager, variables, services, and Secure Boot. Menu appearance is only the manufacturer's implementation.

### Saying POST completely tests every component

POST performs the checks planned by the platform. It does not replace full diagnosis.

### Using a universal beep-code table

Codes depend on the model and provider. Consult exact documentation.

### Disabling Secure Boot as the first solution

That action can hide the actual problem and reduce security. First identify the component and policy causing refusal.

### Updating only because a version is newer

A recommendation must connect the update to a requirement, release notes, and a recovery method.

### Assuming a second image eliminates risk

A recovery feature may itself have limits, depend on an exact procedure, or fail to protect against an image intended for the wrong model.

## What to remember

### Why is firmware necessary?

- RAM is empty and volatile at startup.
- The processor must begin with persistent code provided by the platform.
- That code initializes enough hardware to find and launch the next stage.

### How do the terms relate?

- ROM historically describes read-only memory; modern firmware commonly uses flash memory.
- Firmware is software tied to hardware.
- BIOS is the historical PC environment.
- UEFI defines a modern boot architecture and pre-OS interfaces.
- The setup screen is a configuration interface, not sufficient proof of the mechanism in use.

### How does the system boot?

- Firmware initializes the processor, memory, and essential devices.
- It performs checks, applies settings, and chooses a boot option.
- It loads an application or loader, which then loads the operating system.

### What does Secure Boot protect?

- It verifies signatures on startup components under the platform's trust policy.
- It reduces the risk of unapproved code running before the operating system.
- It does not guarantee the absence of vulnerabilities, data encryption, or total system security.

### How should an update be decided?

- Identify the exact model and version.
- Read release notes and connect the correction to a real requirement.
- Use the official method and prepare recovery.
- Never interrupt writing.
- After restart, verify version, settings, security, and the original problem.

## Put it into practice

Lab 7 asks you to observe firmware information reported by Windows, reconstruct a boot sequence, interpret UEFI settings, and evaluate an update without changing the institutional workstation.

[Continue to Lab 7 - Observing and Evaluating Boot and Firmware](../labs/lab-7.md)

## Go further: trust, measurement, and specialized components

This section is optional. It is not required for the main Lab.

### Secure Boot, Trusted Boot, and measured boot

These phrases do not describe exactly the same function.

- **Secure Boot** permits or refuses components based on signatures and policy.
- A **Trusted Boot** mechanism can extend verification inside the operating system.
- **Measured boot** records cryptographic measurements of stages in a TPM so another service can assess the boot state.

Measurement does not necessarily block execution. It produces a verifiable record.

### Microcode

Microcode helps implement some internal processor operations. An update may be distributed through platform firmware or loaded by the operating system during boot.

This explains why two machines with the same processor model can receive a correction through different paths.

### Option ROMs and peripheral firmware

Devices can provide code executed before the operating system, such as network boot or storage-controller support. In a Secure Boot environment, this code may also need to satisfy signature policy.

### Internal UEFI phases

A UEFI implementation may pass through several initialization phases before the boot manager. The detailed names and responsibilities are useful for firmware development and advanced diagnosis, but the main pathway retains this principle:

> The platform progressively constructs an environment able to use memory, discover hardware, apply boot policy, and transfer control.

## Technical sources to consult

The following sources support verification of the general mechanisms presented in this Session. For the settings, diagnostic codes, versions, and recovery procedures of a specific computer, always consult documentation for the exact manufacturer and model.

- [UEFI Forum — UEFI Specification 2.11](https://uefi.org/specs/UEFI/2.11/)
- [UEFI Forum — Boot Manager](https://uefi.org/specs/UEFI/2.11/03_Boot_Manager.html)
- [Microsoft Learn — Secure Boot](https://learn.microsoft.com/en-ca/windows-hardware/drivers/bringup/secure-boot)
- [Microsoft Learn — Secure Boot and Trusted Boot](https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/trusted-boot)
- [Microsoft Learn — Secure the Windows boot process](https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/secure-the-windows-10-boot-process)
- Official motherboard or system-manufacturer documentation for:
    - firmware settings;
    - diagnostic codes or indicator lights;
    - firmware versions and release notes;
    - recovery procedures;
    - model-specific compatibility requirements.

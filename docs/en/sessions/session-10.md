# Session 10 - From hardware to services: the operating system

## Purpose of the session

In Session 9, we followed storage from the physical medium to the volume and file system. A file system can organize names, folders, metadata, and free space, but it does not decide by itself:

- which program receives processor time;
- which region of memory belongs to which program;
- who may open or modify a file;
- how an application communicates with a display, keyboard, drive, or network adapter;
- how several tasks share the same resources without becoming confused with one another.

These responsibilities belong mainly to the **operating system**.

This session answers five questions:

> How does an operating system turn general-purpose hardware into services that applications can use?

> How does it share the processor, memory, files, and devices?

> How can a file be found when its data occupies several allocation units?

> Why do modern systems preserve legacies from text terminals, personal microcomputers, and graphical-interface experiments?

> How can we compare operating-system families according to a requirement rather than personal preference?

## Objectives

By the end of the session and associated Lab, you should be able to:

- explain the operating system as a resource manager and abstraction layer;
- distinguish program, process, thread, and service at an introductory level;
- interpret simple process states and measurements without drawing a conclusion from one snapshot;
- explain allocation, isolation, and virtual memory conceptually;
- connect file, directory, metadata, allocation unit, and free space;
- follow a simplified chain in a file allocation table;
- explain the general role of a device driver;
- distinguish terminal, command interpreter, command-line interface, and command;
- navigate a directory tree with absolute and relative paths;
- place Unix, Apple DOS, MS-DOS, Xerox Alto, Macintosh, Windows, and Linux within several major historical developments;
- distinguish **technical lineage**, **interface influence**, and **simple resemblance**;
- explain why a graphical interface is only one part of an operating system;
- recognize the main current desktop, server, and mobile operating-system families;
- compare operating systems according to compatibility, support, security, applications, administration, and total cost.

!!! info "Scope of the session"
    **Master today:** purpose of an operating system; processes and scheduling at a high level; memory allocation and isolation; files, directories, and allocation units; a simplified allocation table; drivers; terminal, shell, and command line; absolute and relative paths; elementary `cmd.exe` commands; Windows, macOS, Linux, Android, and iOS/iPadOS families; a requirement-based comparison method.

    **Recognize today:** kernel and user space; threads; services; paging; swap space; permissions; Linux distributions; editions and support cycles; systems without a local graphical interface; the historical roles of Unix, Apple DOS, MS-DOS, Xerox Alto, Macintosh, Windows NT, and Linux; the difference between technical descent and conceptual influence.

    **Go further after the Lab link:** scheduling algorithms, page replacement, system calls, kernel architectures, containers, virtualization, and the internal details of NTFS, APFS, ext4, or Btrfs. This section is optional.

## The problem of a computer doing “everything at once”

On a laboratory workstation, you may play an audio file, download a document, edit text, and move a window almost simultaneously. Yet:

- the processor has a finite number of cores;
- RAM has finite capacity;
- storage and networking have finite bandwidth;
- several applications may request the same device.

The operating system must therefore turn limited resources into services that are sufficiently ordered, protected, and predictable.

```text
applications
    ↓ service requests
operating system
    ├── process management
    ├── memory management
    ├── file management
    ├── device management
    └── security, accounts, and communications
    ↓ adapted commands
hardware and firmware
```

This model does not mean that the operating system does all the work alone. The processor executes instructions, controllers move data, and devices perform their functions. The operating system coordinates these elements and presents common interfaces.

??? question "Check: is the graphical desktop the operating system?"
    No. The desktop, windows, and menus are an important interface, but an operating system also includes the kernel, services, drivers, account management, file systems, and many tools that can operate without a local graphical interface.

## Program, process, and thread

A **program** is a set of instructions and data stored in a file. When it is loaded and executed, the system creates a **process** with, among other things:

- an identifier;
- a memory space;
- open resources;
- an execution state;
- permissions associated with an account or security context.

Two processes may execute the same program while keeping separate data. For example, two application windows may belong to one or several processes depending on the software’s design.

A **thread** is a path of execution inside a process. Several threads in one process generally share some of the process’s resources. This organization may improve responsiveness or parallel work, but it requires correct coordination.

<figure markdown="span">

```text
new → ready → running → waiting
        ↑         │          │
        └─────────┴──────────┘
              scheduler
```

<figcaption>Simplified work-state model: the scheduler selects among ready threads; input/output may place a thread in a waiting state before it returns to ready. Original course diagram, CC BY 4.0.</figcaption>
</figure>

### Scheduling

The operating system selects which ready threads receive processor time. The choice depends partly on:

- the number of available logical cores;
- thread state;
- priority;
- input/output waits;
- system policies.

A thread waiting for a disk read does not need to occupy a core continuously. The system can execute other work while it waits.

!!! warning "A percentage is a snapshot"
    High processor use for a few seconds does not prove that a process is defective. Preserve context: duration, requested workload, core count, input/output activity, and how the measurement changes.

## Memory: allocation, isolation, and virtual memory

In Session 6, we studied RAM as a component. The operating system must now share it among several processes.

Its responsibilities include:

- **allocating** regions of memory;
- **isolating** processes so that one process cannot normally read another process’s private memory;
- translating between addresses used by a process and the locations that are actually available;
- reclaiming memory when a process ends;
- possibly using storage as support when memory pressure rises.

Each process generally works in a **virtual address space**. An address seen by the program is therefore not necessarily a direct physical address in a RAM chip.

```text
process virtual address
          ↓ translation and protection
page in RAM or another managed state
          ↓
physical location or data to retrieve
```

**Paging** divides memory into manageable units. Depending on the system and situation, some data may be moved to or retrieved from storage. This may allow the system to continue operating, but storage remains much slower than RAM.

??? question "Check: does more virtual memory mean more RAM?"
    No. Virtual memory is an addressing and management mechanism. Storage may support the system under pressure, but it does not turn an SSD into equivalent RAM.

## Files: visible names and allocated units

In Session 9, we distinguished disk, partition, volume, and file system. The operating system uses the file system to connect:

- a name and path;
- metadata;
- permissions;
- logical size;
- allocated storage units;
- the file’s data.

An **allocation unit**, often called a *cluster* in FAT and NTFS systems, groups one or more logical sectors. A small file may occupy an entire allocation unit even when part of it remains unused.

### A simplified allocation table

In a FAT-family system, a table can indicate for each unit that it is:

- free;
- pointing to the next unit in a file;
- ending a chain;
- reserved or defective.

Consider this teaching representation:

| Unit | Table value | Interpretation |
|---:|---:|---|
| 2 | 7 | continue at unit 7 |
| 3 | free | available |
| 4 | end | last unit of a file |
| 5 | 4 | continue at unit 4 |
| 6 | free | available |
| 7 | 9 | continue at unit 9 |
| 8 | end | last unit of a file |
| 9 | end | last unit of a file |

If a directory entry reports first unit `2`, the chain is:

```text
2 → 7 → 9 → end
```

If another file begins at `5`, its chain is:

```text
5 → 4 → end
```

A file’s units therefore do not have to be contiguous. This scattering may be called **fragmentation**. It does not automatically mean that the file is corrupt.

!!! warning "The FAT model does not explain every file system"
    NTFS, APFS, ext4, and other systems use more complex structures. The simplified table explains the general problem: connect a logical name to storage locations and follow that relationship consistently.

## Devices and drivers

An application should not need to know every electrical detail of a printer, GPU, or storage controller. The operating system provides common interfaces, while a **driver** translates or adapts requests to the capabilities of a device or device class.

```text
application
    ↓ system service
operating system
    ↓ driver interface
driver
    ↓ commands and data
controller or device
```

A driver may be supplied by the operating system, the component manufacturer, or an approved update mechanism. Its presence alone does not prove that the device will work: power, cable, protocol, firmware, permissions, and application configuration may also matter.

Drivers, interrupts, and device diagnosis will be developed further in Session 12.

## Terminal, shell, and command

These terms are not synonyms.

| Term | Role |
|---|---|
| Terminal | Interface that displays a text session and transmits input |
| Shell or command interpreter | Program that reads and interprets commands |
| Command-line interface | Text-based interaction mode |
| Command | Instruction given to the shell or another program |

On Windows, **Command Prompt** generally runs `cmd.exe`. PowerShell is another shell with an object model and scripting language that will be studied in Session 15.

<figure markdown="span">
  ![DEC VT100 terminal with keyboard and text display.](https://commons.wikimedia.org/wiki/Special:Redirect/file/DEC_VT100_terminal.jpg){ loading=lazy width="680" }
  <figcaption>A terminal such as the DEC VT100 illustrates a historical text interface: the terminal provides input and display while the system running on the remote computer provides the shell and programs. Photo: Jason Scott, <a href="https://commons.wikimedia.org/wiki/File:DEC_VT100_terminal.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.</figcaption>
</figure>

### DOS and `cmd.exe`

**MS-DOS** and **FreeDOS** are DOS-family operating systems. Modern Windows Command Prompt retains several historical commands and conventions, but `cmd.exe` is not itself “DOS.”

This distinction lets us use the similarities without confusing a historical operating system with a modern command interpreter.

## Absolute and relative paths

A directory tree describes parent-child relationships:

```text
C:\CourseC12
├── notes
│   ├── session10.txt
│   └── sources.txt
└── exercises
    └── allocation.txt
```

An **absolute path** starts at a root or drive:

```text
C:\CourseC12\notes\session10.txt
```

A **relative path** depends on the current directory. From `C:\CourseC12`, the same file may be named as:

```text
notes\session10.txt
```

From `C:\CourseC12\exercises`, the path must go to the parent with `..`:

```text
..\notes\session10.txt
```

### Elementary Command Prompt commands

| Command | General use |
|---|---|
| `help` or `command /?` | view help |
| `cd` | display or change current directory |
| `dir` | list contents |
| `tree` | display a directory tree |
| `type` | display a text file |
| `mkdir` | create a directory |
| `copy` | copy a file |
| `move` | move a file |
| `ren` | rename |
| `del` | delete a file in a controlled location |
| `rmdir` | remove a directory under stated conditions |

!!! danger "Restrict deletion to the work folder"
    In the Lab, use `del` and `rmdir` only inside the supplied temporary folder. Check the current path with `cd` and its contents with `dir` before deleting. Do not use deletion wildcards unless explicitly instructed.

## How did we arrive at modern operating systems?

Operating-system history is not a straight line in which one product simply replaces another. Several ideas develop in parallel: multi-user systems, text shells, hierarchical file systems, personal microcomputers, and graphical interfaces.

The goal here is not to memorize dates. It is to recognize **why historical ideas are still visible in current systems**.

### Unix: processes, files, and text tools

Unix was developed beginning in the late 1960s at Bell Labs. During the 1970s, it established or popularized a set of ideas that remain highly visible: processes, users and permissions, hierarchical file systems, shells, and small tools that can be combined.

This history helps explain why a modern system can be fully capable without a graphical desktop. A text interface is not an “incomplete” operating mode: it may expose the same underlying operating-system services through a different interface.

<figure markdown="span">
  ![DEC VT100 terminal used as a text interface.](https://commons.wikimedia.org/wiki/Special:Redirect/file/DEC_VT100_terminal.jpg){ loading=lazy width="620" }
  <figcaption>Unix systems were often accessed through text terminals. The VT100 shown here comes from an era when a terminal could provide access to a more powerful shared computer. Photo: Jason Scott, <a href="https://commons.wikimedia.org/wiki/File:DEC_VT100_terminal.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.</figcaption>
</figure>

!!! note "Unix, Unix-like, and descent"
    Distinguish a system that is **technically descended** from Unix from one **inspired by Unix interfaces and concepts**. Linux is generally described as Unix-like: it reimplements many Unix-style concepts and interfaces, but its kernel is not a continuation of the original Unix source code.

### Personal microcomputers: making one machine usable

In the late 1970s and early 1980s, personal microcomputers created a different context. One user now had a machine with little memory, a comparatively simple processor, and often floppy-disk storage.

**Apple DOS**, introduced for the Apple II with the Disk II drive in 1978, is a useful example: one central role was making floppy storage usable by programs and users. The computer remained extremely constrained compared with a contemporary multi-user system.

<figure markdown="span">
  ![Apple II computer with display.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Apple_II_Computer.jpg){ loading=lazy width="620" }
  <figcaption>The Apple II represents the personal-microcomputer generation for which systems such as Apple DOS made floppy storage directly usable. Photo: Maksym Kozlenko, <a href="https://commons.wikimedia.org/wiki/File:Apple_II_Computer.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

**MS-DOS** later became a major family on IBM-compatible PCs. It provided a text interface, file system, and services suited to PC hardware of its era. Its influence remains visible in several commands and path conventions that we encounter through `cmd.exe`.

<figure markdown="span">
  ![IBM PC 5150 personal computer with keyboard and display.](https://commons.wikimedia.org/wiki/Special:Redirect/file/IBM_PC_5150.jpg){ loading=lazy width="680" }
  <figcaption>The IBM PC 5150 illustrates the hardware context in which PC DOS and MS-DOS spread during the early 1980s. Image: Boffy b, <a href="https://commons.wikimedia.org/wiki/File:IBM_PC_5150.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</figcaption>
</figure>

### Xerox PARC: the graphical computer as a working environment

The Xerox Alto, designed at Xerox PARC in the early 1970s, experimented with a particularly influential combination: a bitmapped display, mouse, windows, and graphical document interaction. It was not the first system to contain each individual element, nor did it become a mass-market personal computer. Its importance lies in combining them into a coherent computing environment.

<figure markdown="span">
  ![Xerox Alto computer with portrait display, keyboard, and mouse.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Xerox_Alto_computer.jpg){ loading=lazy width="700" }
  <figcaption>The Xerox Alto combined a portrait bitmap display, keyboard, and mouse in an experimental environment that strongly influenced later graphical interfaces. Photo: Maksym Kozlenko, <a href="https://commons.wikimedia.org/wiki/File:Xerox_Alto_computer.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</figcaption>
</figure>

The Xerox Star later commercialized related ideas in 1981. Apple developed its own graphical interfaces with Lisa and then Macintosh; Microsoft developed Windows. It is more accurate to speak of **influence, exchange of ideas, and separate development** than to draw a simple “Xerox → Apple → Microsoft” arrow as though source code had simply been passed from one system to another.

!!! warning "Influence is not technical lineage"
    An interface can adopt an idea without reusing the kernel, source code, or internal architecture of the system that inspired it. In a historical diagram, an influence arrow should therefore not be read as a parent-child relationship between codebases.

### Macintosh: bringing the graphical desktop to a broader audience

The Macintosh launched in 1984 helped spread mouse-driven interaction, windows, icons, and menus to a much broader commercial audience.

<figure markdown="span">
  ![Macintosh 128K with integrated graphical display.](https://commons.wikimedia.org/wiki/Special:Redirect/file/Macintosh_128k.jpg){ loading=lazy width="500" }
  <figcaption>The 1984 Macintosh 128K represents an important stage in the commercial spread of window-and-mouse graphical interfaces. Photo: All About Apple Museum, <a href="https://commons.wikimedia.org/wiki/File:Macintosh_128k.jpg">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/2.5/it/">CC BY-SA 2.5 IT</a>.</figcaption>
</figure>

This history reinforces an important distinction: **the graphical interface is not the complete operating system**. The system must still manage processes, memory, files, and devices whether the user issues requests through a mouse, keyboard, or shell.

### Windows: from DOS-based environments to the NT family

Early Windows versions appeared in a PC environment where MS-DOS still played a fundamental role. The Windows 3.x and then Windows 95/98/Me lines retained substantial DOS heritage.

In parallel, Microsoft developed **Windows NT** as a distinct architecture designed around protected memory, pre-emptive multitasking, multiple accounts, and professional requirements. Windows 2000 and Windows XP marked the spread of the NT line to mainstream client systems; modern Windows belongs to this technical family.

```text
MS-DOS ──→ Windows 1.x / 2.x / 3.x ──→ Windows 95 / 98 / Me

Windows NT ──→ Windows 2000 ──→ Windows XP ──→ modern Windows
```

The diagram shows **two simplified historical lines**, not every release. Its main purpose is to explain why `cmd.exe` can preserve DOS conventions without modern Windows itself being MS-DOS.

### Linux: a Unix-like kernel and distributions

In 1991, Linus Torvalds began the Linux kernel. The project adopts many conventions and interfaces associated with Unix, but the kernel was developed separately.

The kernel alone does not create the complete experience that users often call “Linux.” A distribution combines, among other things:

```text
Linux kernel
+ libraries
+ system tools
+ package manager
+ services
+ applications
+ optional graphical environment
= Linux distribution
```

This structure helps explain why Ubuntu, Debian, Fedora, and Red Hat Enterprise Linux can share the same kernel family while differing significantly in update policies, tools, desktops, and goals.

### A map of influence and lineage

```text
Unix ───────────────→ Unix / BSD descendants ─────────→ Darwin ──→ macOS / iOS
  │
  └ - - Unix concepts and interfaces influence - - -→ Linux ──→ distributions
                                                      └────────→ Android (Linux kernel)

Apple II ──→ Apple DOS                    Xerox PARC / Alto
                                               - - GUI influence - -→ Lisa / Macintosh
MS-DOS ──→ DOS-based Windows                     - - GUI influence - -→ Windows

Windows NT ───────────────────────────────────────────────→ modern Windows
```

In this diagram:

- `──→` indicates a **simplified technical lineage or continuity**;
- `- -→` indicates mainly **conceptual or interface influence**.

The real history is richer than this diagram. Its purpose is to prevent two errors: assuming that every modern system descends from the same code, or assuming that the systems developed without influencing one another.

??? question "Check: do macOS, Linux, and Windows share the same technical ancestor?"
    No. macOS has a Darwin base with Unix/BSD and Mach heritage; Linux is a separately developed Unix-like kernel; modern Windows belongs to the Windows NT line. They may offer similar concepts or interfaces without sharing the same code lineage.

## Operating-system families

A **family** groups systems that share a history, interfaces, or technical base. A family may contain several editions, versions, or distributions.

| Context | Common families or systems to recognize | Evaluation questions |
|---|---|---|
| Desktop and laptop | Windows, macOS, Linux distributions, ChromeOS | applications, hardware, management, accessibility, support |
| Server and cloud | Linux distributions, Windows Server, Unix and related systems | roles, automation, availability, security, skills |
| Mobile and tablet | Android, iOS, iPadOS | supported device, updates, applications, management, privacy |

### Windows

Windows remains an important workstation family and is used in many organizations. A recommendation must verify edition, hardware requirements, support cycle, applications, and management policies rather than stopping at the name “Windows.”

Windows Server is a separate family intended for server roles. A server edition is not automatically preferable for a desktop workstation.

### macOS, iOS, and iPadOS

macOS is designed for Mac hardware supported by Apple. iOS and iPadOS target Apple mobile devices. Hardware-software integration may simplify some validation, but the exact device model and support period must still be checked.

### Linux and distributions

**Linux** mainly names a kernel. A **Linux distribution** combines that kernel with tools, a package manager, libraries, an update policy, and often a desktop environment.

Ubuntu, Debian, Fedora, and Red Hat Enterprise Linux illustrate different goals and cycles. A long-term-support release may suit stability, while a more frequent release may provide newer components with a shorter upgrade cycle.

### Android

Android is an ecosystem used by many manufacturers and device types. The system version is only one part of the evidence: manufacturer, model, security patches, and expected update duration also matter.

!!! info "Landscape checked in August 2026"
    Version names change faster than the comparison principles. At drafting time, official sources identify Windows 11 and Windows Server 2025, macOS/iOS/iPadOS 26, Android 17, and Ubuntu 26.04 LTS. Always verify official support pages before a real recommendation.

    - [Windows 11 specifications](https://www.microsoft.com/windows/windows-11-specifications)
    - [Windows Server documentation](https://learn.microsoft.com/windows-server/)
    - [Apple security releases](https://support.apple.com/en-ca/100100)
    - [Ubuntu releases](https://ubuntu.com/project/docs/release-team/list-of-releases/)
    - [Android features and releases](https://developer.android.com/about/versions/17)

## Comparing an operating system for a requirement

A responsible comparison starts with the mandate, not a list of preferences.

1. **Workload:** which applications, services, and devices?
2. **Compatibility:** are the hardware and software officially supported?
3. **Support:** how long will security fixes and drivers be available?
4. **Administration:** which tools, skills, accounts, and policies are required?
5. **Security and privacy:** which protections, updates, and sensitive data?
6. **Accessibility:** which built-in features or assistive technologies must work?
7. **Total cost:** licence, hardware, deployment, training, support, and replacement.
8. **Missing evidence:** what information could change the recommendation?

!!! example "Three contexts, three possible answers"
    - A laboratory dependent on a specialized Windows application may prefer Windows even when free alternatives exist.
    - A Web server administered by a Linux-experienced team may prefer a long-term-support distribution.
    - A mobile application for an already managed device fleet must consider platform, exact device model, and support duration.

None of these choices is universal. Suitability depends on requirements and evidence.

## Integrated synthesis: opening a media file

When an application opens an audio file and plays it:

1. the process requests a path;
2. the system checks the account, permissions, and file existence;
3. the file system connects the name to storage units;
4. the storage driver and controller retrieve the data;
5. the system allocates memory to the process;
6. the processor and, depending on format, specialized hardware process the data;
7. the audio driver sends the stream to the device;
8. the scheduler shares processor time with other tasks.

The history helps explain why the same chain can be controlled through a graphical interface, a shell, or an automated application: **the interface changes, but the operating system’s fundamental responsibilities remain**.

Session 11 will follow the graphics and audio chain more closely. Session 12 will examine the connectors, drivers, and peripherals that complete it.

## Common errors to avoid

- **Confusing program and process:** an executable stored on disk is not the running instance.
- **Treating a snapshot as a trend:** a brief measurement does not describe the whole workload.
- **Believing virtual memory is equivalent additional RAM:** the mechanism also depends on storage and may be much slower.
- **Believing a file must be contiguous:** a file system can follow several scattered units.
- **Confusing terminal and shell:** the terminal presents the session; the shell interprets commands.
- **Calling `cmd.exe` “DOS”:** the commands may be related, but the systems are not identical.
- **Confusing the graphical interface with the operating system:** windows and icons are an interface above more fundamental services.
- **Drawing operating-system history as one lineage:** distinguish technical descent from conceptual influence.
- **Calling Linux simply “modern Unix”:** Linux is Unix-like, but its kernel was developed separately.
- **Comparing operating systems by reputation:** begin with applications, hardware, support, and constraints.
- **Assuming a free system has no cost:** deployment, administration, training, and support contribute to total cost.

## What to remember

- The operating system coordinates processes, memory, files, and devices.
- A process is a running instance with a context and resources.
- Virtual memory provides addressing, isolation, and management; it does not replace RAM without trade-offs.
- A file system connects names and metadata to storage units.
- A simplified allocation table can follow a chain of non-contiguous units.
- A driver adapts system services to a device’s capabilities.
- Terminal, shell, command-line interface, and command name different elements.
- Relative paths depend on the current directory; absolute paths begin at a root.
- Unix, DOS-era microcomputers, and Xerox graphical experiments represent different traditions that influenced modern systems.
- Interface influence does not mean that two systems share the same code or architecture.
- Modern Windows belongs to the NT line; Linux is a separately developed Unix-like kernel; macOS has a Darwin base drawing on Unix/BSD and Mach technologies.
- The current landscape contains several desktop, server, and mobile families.
- An operating-system recommendation must connect a requirement, evidence, and support cycle.

## Put it into practice

The associated Lab asks you to observe a Windows workstation without administrator privileges, manipulate a temporary directory tree, reconstruct allocation chains, and prepare a formative comparison of operating systems.

[Continue to Lab 10 - Observing resources and manipulating a file system](../labs/lab-10.md)

## Go further

### Kernel and user space

The kernel performs the most privileged functions: scheduling, memory management, communication with many drivers, and enforcement of fundamental protections. Ordinary applications generally execute in a less privileged space and request services from the system.

### Why servers can operate without a local desktop

A server may be administered remotely and provide network services without a screen or local graphical environment. This design may reduce installed components, resource use, and maintenance surface, but it requires appropriate administration tools and skills.

### Modern file systems

Modern systems may add journalling, checksums, snapshots, encryption, or tree structures. These mechanisms exceed the FAT model but address the same general need: preserve a coherent relationship among names, metadata, and data.

## Historical and technical reference sources

- [Computer History Museum - Xerox Alto](https://www.computerhistory.org/revolution/input-output/14/347)
- [The Open Group - The Single UNIX Specification and Unix](https://www.opengroup.org/membership/forums/platform/unix)
- [Apple Open Source - Darwin](https://opensource.apple.com/)
- [Linux kernel documentation](https://www.kernel.org/doc/html/latest/)
- [Microsoft Learn - Windows architecture](https://learn.microsoft.com/windows-hardware/drivers/gettingstarted/windows-architecture)

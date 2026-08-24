# Session 1 - Course overview: what is a computer?

## Purpose of the session

This first session introduces the structure of **420-C12-IN - Outils et matériels informatiques**, the expectations of the course, and the sequence of topics that will be studied. It also establishes the kind of technical thinking the course will require: observing, researching, comparing, justifying, and communicating.

It then introduces a question that will guide the rest of the session:

> What makes an object or system a computer?

We will begin with familiar devices and then work backwards towards some historical and theoretical ideas that can help us construct a more precise definition.

## Objectives

By the end of this session and its associated lab, you should be able to:

- locate important information in the Course Guide and Session Schedule;
- explain the connection among the course, competency `00SF`, and the evolving specification;
- summarize the overall progression of the 19 sessions;
- describe how theory, activities, and laboratory work will be organized;
- formulate and then revise your own definition of the word "computer";
- explain, at an introductory level, what Babbage, Turing, and von Neumann contribute to our understanding of computers;
- find basic information about a laboratory workstation;
- use a few simple PowerShell commands to observe a computer.

!!! info "Scope of the session"
    **Master today:** overall course operation, competency `00SF`, the distinction between hardware and software, information, state, instruction, programmability, stored program, and the working definition of a computer.

    **Recognize today:** the contributions of Babbage, Lovelace, Turing, and the von Neumann model, along with the course's starting vocabulary.

    **Not required:** memorizing precise historical dates or reproducing the historical models in every detail.

## Course purpose and competency `00SF`

The course develops the following competency:

> `00SF` - Evaluate software and hardware components.

The course is therefore not only about recognizing parts or memorizing specifications. Evaluating a computer solution requires you to:

- identify a need, problem, or set of technical constraints;
- research software and hardware components using appropriate sources;
- describe and compare their characteristics;
- verify their compatibility;
- consider their cost, performance, stability, efficiency, longevity, and maintainability;
- formulate a justified recommendation;
- communicate that recommendation clearly to specialist and non-specialist audiences.

The first session asks the most fundamental question in the course. Before evaluating what is inside a computer or what it can do, we need to construct a more precise idea of what a computer is.

## Course thread: an evolving specification

A client wants a PC capable of running recent games while live-streaming gameplay. The request must not become a simple parts list: it should lead to a justified, compatible, reliable, maintainable specification that can evolve. The initial request is deliberately incomplete. The intended games, resolution, frame rate, stream quality, other applications, budget, peripherals, acceptable noise, and upgrade expectations still need to be clarified.

Beginning with Lab 5, you will extend the same **evolving specification** as each new component family is studied. Every addition will retain four traces:

1. **Relevant requirement** — Which organizational need or constraint affects this component?
2. **Technical criteria** — Which characteristics will allow it to be evaluated?
3. **Compatibility** — Which other components or choices constrain it?
4. **Provisional recommendation and open question** — Which direction can be defended now, and what must still be verified?

A provisional recommendation is not a guess presented as fact. It states what the current information supports, what remains uncertain, and what could require the specification to be revised.

### Recurring life-cycle reflection

For every component added beginning in Lab 5, also answer the following four questions. Write **no more than one sentence per criterion**. When information is unavailable, identify the evidence needed to answer instead.

| Criterion | Question to ask |
|---|---|
| **Longevity** | Should the component remain adequate and supported for the expected period of use? |
| **Stability** | What supports or threatens reliable, predictable operation in this configuration? |
| **Efficiency** | Is the required performance obtained with reasonable power, heat, cost, and resource use? |
| **Maintainability** | Can the component be diagnosed, replaced, upgraded, and supported without unreasonable difficulty? |

!!! example "First specification entry"
    Create a section titled “Gaming and live-streaming PC.” Record the needs already stated, then write at least four questions that must be answered before components are selected. Keep this section: you will return to it beginning in Lab 5.

## What will be expected of you

Throughout the course, you will progressively learn to:

- use precise technical vocabulary;
- explain your reasoning instead of providing only an answer;
- connect your choices to the needs and constraints of a situation;
- consult technical sources and verify the information you collect;
- participate in activities and identify what remains uncertain;
- use feedback to improve your analyses and recommendations.

You are not expected to have already mastered computer hardware. The course has no prerequisite. You are, however, expected to develop greater independence over time and to seek an understanding of the principles behind the technologies being studied.

## Roadmap of the 19 sessions

The following table shows the order in which topics will be encountered. The sessions are cumulative: material learned early in the course will be used to understand and evaluate later topics. Use this roadmap to anticipate concepts that may require additional preparation or review.

| Session | Main topic | What we will seek to understand |
|---:|---|---|
| 1 | Course overview and the nature of a computer | Understand how the course operates and construct an initial, considered definition of a computer. |
| 2 | Base 2 and base 16 | Understand why computers use binary and how hexadecimal provides a more readable representation of bits. |
| 3 | Data representation and endianness | Examine how numbers, text, and other data are encoded, and how byte order can change their interpretation. |
| 4 | Addressable memory and microcomputer architecture | Distinguish physical layers, place levels in the memory hierarchy, and follow a value using its address and buses. |
| 5 | Processor | Study the processor's role and compare characteristics such as cores, threads, cache, and instruction set. |
| 6 | Random-access memory | Understand the role of volatile memory and evaluate capacity, speed, latency, generation, and form factor. |
| 7 | ROM, BIOS, UEFI, and firmware | Follow the computer startup process and understand the role, settings, and update risks of firmware. |
| 8 | Motherboard and build logic | Verify compatibility among the processor, memory, motherboard, expansion cards, case, and power supply. |
| 9 | Storage | Compare hard drives, SSDs, removable media, file systems, backups, and RAID configurations. |
| 10 | Operating systems | Understand how an operating system manages processes, memory, files, and devices. |
| 11 | Media components | Evaluate graphics, display, audio, codec, and accessibility requirements. |
| 12 | Connectors and peripherals | Identify common connectors and analyze compatibility, drivers, and common causes of device failure. |
| 13 | Systems on a chip | Compare systems on a chip with modular computers in terms of performance, power use, cost, and repairability. |
| 14 | Introduction to networks | Understand the role of network adapters, addressing, protocols, and services that allow devices to communicate. |
| 15 | PowerShell as a scripting tool | Use commands, objects, and pipelines to observe a system and automate information gathering. |
| 16 | General coursework feedback | Apply feedback about research, sources, vocabulary, compatibility, and justification. |
| 17 | Final exam revision | Connect course concepts and practise interpreting scenarios, specifications, and technical problems. |
| 18 | Final exam | Demonstrate achievement of the competency in the certificative examination. |
| 19 | General exam feedback | Correct major misconceptions and connect this course to the operating-system courses that follow. |

## How a session usually operates

Most sessions follow the same general structure. You can expect an approximately equal division between theory and lab work. Transitions can, however, adapt to questions, activities, and difficulties as they arise.

### First half: theory

The theory section generally occupies about half of the session. It may include:

- explanations and examples;
- questions and discussions;
- short individual or small-group activities;
- checks for understanding;
- connections to concepts studied previously.

Activities embedded in the theory section are never assessed or graded. They are used to put ideas into practice immediately, check that the group is following the reasoning, and identify concepts that need further explanation.

### Second half: laboratory work

Laboratory work generally occupies the other half of the session. The tasks are connected to the theory studied and will help you:

- consolidate your understanding;
- observe concepts in a real system;
- work with tools, commands, or hardware;
- develop practical working methods;
- gain technical experience.

Theory and laboratory work are therefore complementary parts of the same session. Theory develops the ideas and vocabulary; laboratory work allows you to apply them and observe their effects.

## Assessments and deadlines

During this first session, we will review the assessment calendar together. For each assessment, we will examine:

- what you will be asked to do;
- its planned format;
- its weighting;
- its deadline;
- the concepts or coursework that will help you prepare for it.

The goal is not to memorize every date immediately, but to understand the pace of the course, the connections among assessments, and the points at which particular preparation will be needed.

!!! warning "The double-threshold rule"
    To pass the course, you must satisfy **two separate conditions**:

    - obtain a passing grade on each of the three certificative assessments;
    - obtain a sufficient overall final average to pass the course.

    A strong overall average does not compensate for failing a certificative assessment. Conversely, passing all three certificative assessments is not sufficient if the overall final average is too low.

## Questions, clarifications, and FAQs

Questions are a normal part of the course. Some can receive a short, immediate answer. Others require a more detailed explanation, technical verification, or additional research.

When a question deserves a developed answer:

1. the question may be added to the [course-site FAQ](../faq/index.md);
2. the question will be reworded if necessary and published without identifying the person who asked it;
3. the person who asked the question will receive a message when the answer is available;
4. significant updates will also be announced in Teams.

Taking time to verify a complex answer is part of responsible technical practice. An answer published in the FAQ may also help other people who have the same question.

!!! note "A question can improve the site"
    A complex question does not disappear when the session ends. It can become a verified, persistent answer that helps the whole group. The person who asked it is notified when that answer is published.

## Role of the course site

No textbook is required for this course. The course site is the principal learning and reference resource. It brings together, in an easily consulted and searchable space:

- important explanations and vocabulary;
- session pages and activities;
- laboratory instructions;
- clarifications and answers to frequently asked questions;
- information useful for preparing coursework and assessments.

The site content will evolve during the course. Explanations may be clarified, examples added, and answers developed in response to questions encountered in class. The site therefore allows you to find information later, review a concept, and follow important additions without rebuilding your resources after every session.

The [Course Guide](../course-guide.md) contains the assessment calendar. You should take time to consult it and return to it regularly so that you can keep track of deadlines. It is also important to consult the course Teams channel, where assessment submission instructions and significant updates will be communicated.

## Opening challenge: where are the computers?

When we hear the word "computer," we often think of a desktop or laptop. These familiar examples, however, do not tell us exactly what makes an object a computer.

Before looking for a definition, let us begin by observing.

!!! question "Observation exercise: where are the computers?"
    Look around you, wherever you are: on the Metro, in a café, at home, or in class.

    Also consider what you are carrying in your bag, in your pockets, or on your body.

    Without doing any research, make a list of everything you can see that you think might be a computer or might contain a computer.

    Put a question mark beside anything you are uncertain about. Then choose the most surprising item on your list.

    Keep the list. You will return to it after studying the ideas of Babbage, Turing, and von Neumann.

### Increasingly less obvious examples

A desktop and a laptop may seem like easy answers. A tablet or smartphone may already require a little more thought.

Now consider the following objects:

- a smartwatch;
- a game console;
- a smart television;
- a calculator.

For now, do not look for a definitive answer. Instead, note the reasons that lead you to include or exclude each object.

You might ask:

- Is the object itself a computer, or does it contain a computer?
- Must it have a screen, keyboard, or particular physical form?
- Must it be able to perform several different tasks?
- Must it be able to receive new instructions?
- What is the difference between an electronic device and a computer?

Keep your answers and uncertainties. The next parts of the session will provide new criteria with which to revisit the discussion.

## Babbage, Lovelace, and the programmable machine

At the beginning of the nineteenth century, the word "computer" still referred to a person who performed calculations. Numerical tables used in navigation, astronomy, engineering, and other fields were calculated and copied by hand. A single mistake could then be reproduced in many copies.

### Babbage and the Problem of Tables

Charles Babbage sought to automate this work using a mechanical machine.

![Portrait of Charles Babbage around 1860](https://commons.wikimedia.org/wiki/Special:Redirect/file/Charles%20Babbage%20-%201860.jpg){ width="360" loading=lazy }

*Charles Babbage, around 1860, unknown photographer. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Charles_Babbage_-_1860.jpg), public domain.*

His first major design, the **Difference Engine**, was intended to produce certain numerical tables automatically. Gears represented values and carried results from one step to the next.

This was an important but specialized achievement. The machine was designed for a particular family of tasks. Giving it a new list of instructions would not be enough to make it perform fundamentally different work.

This distinction is essential:

- an **automatic** machine can perform a task without constant intervention;
- a **programmable** machine can receive different sequences of instructions and perform different processes.

### From the Jacquard loom to instructions

Babbage knew about the Jacquard loom, which was used to produce patterned fabric. A chain of punched cards controlled the loom's movements.

![Punched cards used by a Jacquard loom](https://commons.wikimedia.org/wiki/Special:Redirect/file/Jacquard.loom.cards.jpg){ width="560" loading=lazy }

*Punched cards used by a Jacquard loom. Photograph: Gargamelle. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Jacquard.loom.cards.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).*

The loom remained the same, but a different sequence of cards could produce a different pattern. The instructions were therefore separate from the mechanism that carried them out.

!!! example "Application: one machine, different instructions"
    Same loom + different cards = different fabric

    Same calculating mechanism + different cards = different calculation

    Same computer + different program = different task

This idea led Babbage to design a much more ambitious machine: the **Analytical Engine**.

### The Analytical Engine

The Analytical Engine was intended to be a programmable mechanical machine rather than a calculator restricted to one family of problems.

Babbage described several concrete functions:

| Part of the machine | Function |
|---|---|
| The "store" | Keep values that would be needed later |
| The "mill" | Perform the requested operations |
| Punched cards | Supply the instructions and necessary values |
| Output mechanisms | Present or print a result |

The machine was intended to follow the cards in a determined order, reuse results, and alter the sequence of processing under certain conditions. Babbage never succeeded in constructing the complete Analytical Engine, but its design showed that the same machine could, in principle, carry out several procedures.

The instructions would still have remained on external cards. The idea of keeping the program in the same memory as the data would come later.

### Ada Lovelace: understanding what the machine could become

Ada Lovelace studied Babbage's design in depth. In 1843, she translated a text about the Analytical Engine and accompanied it with notes that were much more extensive than the original text.

![Portrait of Ada Lovelace around 1840](https://commons.wikimedia.org/wiki/Special:Redirect/file/Ada%20Lovelace%20portrait.jpg){ width="360" loading=lazy }

*Ada Lovelace, around 1840, portrait by Alfred Edward Chalon. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ada_Lovelace_portrait.jpg), public domain.*

Lovelace did more than describe the gears. She showed how a complex task could be divided into a precise sequence of steps for the machine to follow. Designing the machine and designing its instructions became two distinct problems.

She also understood that the idea extended beyond arithmetic. If things could be represented using symbols and related through rules, a machine might be able to manipulate them. She imagined, for example, that such a machine might one day work with musical relationships.

The Analytical Engine did not, of course, produce music. The important idea was that the numbers manipulated by a machine might represent something other than quantities.

Lovelace is often described as the first programmer. The title is memorable, but her concrete contributions are more important:

- she explained how to transform a task into a sequence of instructions;
- she distinguished the operation of the machine from the program directing it;
- she imagined uses beyond numerical calculation.

!!! question "Quick check"
    In the Jacquard loom example, identify the machine, the instructions, and the result.

    What fundamental difference separates the Difference Engine from the Analytical Engine?

    Which of Lovelace's ideas allows us to imagine a computer being used for text, images, or music?

### Key idea

Babbage showed how a general mechanical machine could be designed to follow instructions. Lovelace showed how to think about the procedures that machine would carry out and recognized that the symbols it processed could represent far more than simple quantities.

This history adds two criteria to our initial discussion: the ability to follow a sequence of instructions and the possibility of changing the work performed by changing those instructions.

## Turing: Symbols, Rules, State, and Computation

Babbage and Lovelace allowed us to distinguish a machine from the sequence of instructions directing it. Alan Turing takes this idea further by proposing an extremely simple theoretical machine.

A Turing machine is not a construction plan for a real computer. It is a model that helps answer a question: what are the minimum operations needed to perform a computation by following rules?

??? info "Data, instruction, program, and state"
    These four words describe different roles:

    - **data** is information that the machine receives, stores, or transforms;
    - an **instruction** requests one precise action;
    - a **program** is an organized collection of instructions;
    - **state** describes the machine's currently stored situation and can influence the next instruction.

    In the router presented later, each left-right direction is an instruction, the sequence of directions forms a program, the target letter is part of the problem's data, and the ball's current position belongs to the state of the execution.

!!! note "Nuance: a deliberately simple model"
    This section does not require formal symbolic logic or advanced mathematics. We use only the symbol `X`, a blank cell, and a few concrete actions to visualize the principles: observe, apply a rule, change a state, and repeat.

### The tape and read-write head

The model contains only a few elements:

| Element | Role in the model |
|---|---|
| A tape divided into cells | Hold a sequence of symbols |
| A read-write head | Observe a cell, write a symbol, and move |
| A current state | Indicate what the machine is currently doing |
| A set of rules | Determine the next action |
| A halt state | Indicate that processing is complete |

For our first example, each cell contains either the symbol `X` or nothing.

```text
            head
              ↓
|  X  |  X  |  X  |     |     |
```

The head begins on the first cell and applies only two rules:

| What the head sees | Action |
|---|---|
| `X` | Move one cell to the right |
| A blank cell | Write `X`, then halt |

You do not need to know binary or mathematical notation to follow this process. The machine observes a situation, applies the corresponding rule, and repeats until it reaches the halt state.

!!! example "Interactive activity: add one mark"
    Form a short line of people. Each person represents one cell on the tape.

    The first three people each hold a small ball, a ball of paper, or another token. The next person keeps an empty hand. The balls represent `X`; an empty hand represents a blank cell.

    Another person acts as the read-write head. They begin in front of the first person and receive the two rules shown above.

    Before each action, the group predicts what the head should do. The head then performs exactly the applicable rule without improvising.

    When the head reaches the first empty hand, they place a ball in it and halt. The row has changed from three marks to four.

    The same activity can be completed on a table using paper cells and coins.

### Where is the computation?

The activity appears very simple, but it already contains the essential elements of the model:

- the balls and empty hands represent symbols;
- the position of the head indicates the cell currently being examined;
- the current state distinguishes searching from halting;
- the rules determine every action;
- repeated application of the rules transforms the state of the tape.

The machine does not need to understand what `X` means. It only needs to recognize the symbol and apply the correct rule.

### An "Infinite" Tape

The tape of a Turing machine is often described as infinite. We should not imagine a roll of paper that physically exists and crosses the entire room.

Instead, the model places no practical limit on the number of cells available. If processing requires another cell, we assume that another cell can be added. This simplification allows us to study the rules of computation without being stopped by the size of a sheet of paper or the amount of memory in a real machine.

### From a specialized machine to a universal machine

The machine we have just imitated is specialized. Its rules only allow it to search for an empty hand, place a ball in it, and halt.

Now imagine that the same person receives another instruction card:

1. extend one arm diagonally upwards and out to the side, away from the front of your body;
2. bend the other arm in front of your face;
3. lower your head towards the elbow of the bent arm;
4. stop.

The card does not name the movement, and nobody announces the final pose in advance. The person simply follows the steps; the result becomes progressively recognizable during the performance.

The two cards describe two different specialized machines:

- a machine that examines hands and places a ball;
- a machine that moves arms and a head according to a precise sequence.

The same person can imitate either one because they receive the description of the rules to follow. By executing two sets of instructions in succession and producing two different behaviours, they illustrate the idea of one machine being able to simulate several specialized machines.

This is the central idea of a **universal Turing machine**: one machine can receive a description of another machine and reproduce its behaviour. The universal machine does not need to be rebuilt for each new task; instead, it receives a new program.

The person in our activity is not literally a universal Turing machine: they have neither unlimited resources nor unlimited time, and they cannot provide an infinite tape. The activity nevertheless illustrates how one executor can simulate several processes when supplied with their rules, a principle at the heart of modern computing.

!!! question "Quick check"
    In the ball activity, what represents the tape, symbols, head, and rules?

    Why is the ball machine specialized?

    What must change for the same person to imitate the second machine?

### Key idea

A Turing machine transforms symbols by mechanically applying simple rules. A universal Turing machine can receive descriptions of different machines and simulate them.

We can now add another question to our definition of a computer: can it receive a description of instructions and carry out several processes without being physically rebuilt?

## The von Neumann model and the stored program

Babbage's Analytical Engine separated its calculating mechanism from the cards that supplied its instructions. The universal Turing machine showed, in theory, that the same machine could simulate several other machines when given their descriptions.

The stored-program model brings these ideas closer to computers constructed in the real world.

### An idea developed collaboratively

In 1945, a document titled *First Draft of a Report on the EDVAC* described an organization in which program instructions and the data being processed are held in the same memory.

The report circulated under John von Neumann's name, which explains the expression **von Neumann architecture**. The idea did not, however, come from one person alone. It developed through collaborative work involving J. Presper Eckert, John Mauchly, Herman Goldstine, Arthur Burks, and other members of the team connected with the EDVAC.

The name of the model remains useful, but it should not erase the collaborative nature of its development.

### Instructions and data in the same memory

In this model, memory can contain:

- the instructions describing the work to be performed;
- the data on which those instructions act;
- results produced during execution.

Instructions are therefore no longer found only on a separate external medium, like the cards planned for the Analytical Engine. They can be loaded into the machine's memory, read, and replaced like other information.

This organization makes a general cycle possible:

> fetch an instruction → interpret it → execute it → proceed to the next one

This cycle is often summarized as **fetch, decode, execute**.

### The main functions of the model

For now, we can treat the parts of the system as black boxes:

| Function | General role |
|---|---|
| Memory | Hold instructions, data, and results |
| Control unit | Fetch instructions and coordinate their execution |
| Arithmetic and logic unit | Perform the requested operations |
| Input | Supply programs or data to the system |
| Output | Communicate results |

The control unit and arithmetic and logic unit form part of what we now call the processor. Their physical implementation will be studied later in the course.

### Activity: one memory, two types of content

The following example uses an invented and deliberately simplified instruction set. It does not represent the real instructions of a processor. Its purpose is only to make the distinction between an instruction and data visible.

| Address | Memory contents | Type |
|---:|---|---|
| 0 | Copy the contents of address 4 to address 5 | Instruction |
| 1 | Add the character `!` to the contents of address 5 | Instruction |
| 2 | Halt | Instruction |
| 3 | Unused location | Data |
| 4 | `HELLO` | Data |
| 5 | Empty location | Data |

!!! example "Execute the program"
    One person acts as the control unit. They begin at address 0.

    Before each step, the group reads the contents of the current address and predicts what will change in memory.

    1. At address 0, the contents of address 4 are copied to address 5.
    2. At address 1, the character `!` is added to the value placed at address 5.
    3. At address 2, execution halts.

    At the end, address 5 contains `HELLO!`.

The instructions and the word `HELLO` appear in the same memory table. What distinguishes them is not their physical location, but the way the system interprets them.

Then consider the following questions:

- French typographic convention requires a space before an exclamation mark: `BONJOUR !`. How could the instruction at address 1 be changed to add that space?
- Why must a space be represented as a character rather than as an absence of content?
- What would need to change to produce `WELCOME!`?
- What would need to change to produce `HELLO?`?
- Which parts of the machine would remain the same in these different cases?

### From the universal machine to the general-purpose computer

The stored program allows the same physical machine to receive different sets of instructions. A word processor, game, and calculation tool do not necessarily require three machines constructed differently. They can be different programs loaded and executed by the same system.

This organization provides a concrete connection to Turing's idea: the behaviour of the machine changes when the description of the rules it must execute changes.

A real computer has limited resources, and its operation is much more complex than our table. The model nevertheless explains why software can transform the use of a machine without changing its physical construction.

!!! question "Quick check"
    Where are the instructions located in the example?

    Where is the data located?

    What important difference exists between the Analytical Engine's cards and a stored program?

### Key idea

The von Neumann model keeps instructions and data in a shared memory. The system fetches an instruction, interprets it, executes it, and then continues.

This idea allows the same machine to change its behaviour when given a different program. It is one of the foundations of modern general-purpose computers.

## A programmable routing machine

Turing's and von Neumann's models describe important ideas, but those ideas can remain difficult to visualize. The following machine makes part of them concrete by using a ball and three successive branches.

The device resembles a ball-drop game, with one essential difference: **the route is not random**. At each branch, an instruction forces a move to the left or the right. After three instructions, the ball drops into one of eight destinations labelled A through H.

The mechanism always remains the same. Only the sequence of instructions changes.

!!! example "Activity: program a word"
    Observe the target word and all eight destinations before changing the program.

    Prepare one group of three instructions for each letter in the word. Mentally follow the ball through each branch before running the machine.

    Once every instruction is in place, run the complete program. The controls then lock: every ball must finish its route before the program can be corrected.

    The produced letters appear only as the balls reach their destinations. Compare the observed output with the target word, identify the first route that needs revision, and then clear or edit the program. Continue to the next challenge when you are satisfied with your result.

<iframe
  src="../../../assets/demos/programmable-letter-router.html?lang=en"
  title="Interactive programmable letter-routing machine"
  loading="lazy"
  sandbox="allow-scripts"
  style="width: 100%; height: 940px; border: 0;"
></iframe>

### What the machine represents

During execution, the ball's **current position** represents part of the system's state. The next instruction and that position together determine the next movement. The machine does not need to understand the word it produces; it simply applies the instructions in their established order.

The activity makes several earlier ideas visible:

- the same mechanism can produce different results when it receives a different program;
- a program can be a long sequence of very small, simple instructions;
- every instruction transforms the system's current state;
- an error in the program affects execution until it finishes and the program is changed;
- a complex result, such as a word, can be built by repeating a simple process.

The machine is deliberately limited. It does not represent the full architecture of a computer, but it demonstrates how a stored sequence of instructions can control a mechanism's behaviour one step at a time.

## Integrated synthesis: what is a computer?

At the beginning of the session, you listed objects that might be computers or contain computers. The examples from Babbage, Lovelace, Turing, and von Neumann now give us more precise criteria with which to revisit that list.

### Revisit your list

!!! question "Revise your classification"
    Read each item on your original list. Decide whether you now want to keep it, remove it, mark it as uncertain, or move it between "is a computer" and "contains a computer."

    Then choose one item whose classification changed. Justify your new decision using at least two of the following ideas:

    - it receives inputs or information;
    - it maintains a state or holds data;
    - it follows instructions;
    - it transforms information;
    - it produces a result or output;
    - its behaviour can change when its instructions change.

Our definition no longer depends on an object's shape, the presence of a keyboard, or the size of its display. We can use the following working definition for the rest of the course:

!!! note "Terminology: working definition"
    **A computer is a system that represents information, maintains a state, and follows instructions to transform that information or produce a result.**

This definition deliberately remains fairly broad. Programmability also exists in different degrees. A laptop can receive an enormous variety of programs, while a controller built into an appliance follows a much narrower program. Both can perform computation without being used or described in the same way.

### Final case: the microwave oven

Before opening the answer, take a position on the following questions:

1. Is a microwave oven an electronic device?
2. Does it contain a system that reads inputs, maintains a state, and follows stored instructions?
3. Should we therefore say that the oven is a computer, or that it contains a computer?

??? note "Open after taking a position"
    A modern digital microwave oven generally contains a **microcontroller**: a small embedded computer designed to control a particular device.

    That controller may:

    - receive inputs from buttons, the keypad, and door sensors;
    - maintain the state of the timer, power level, and selected mode;
    - execute stored instructions;
    - control the display, fan, light, and periods during which the magnetron operates.

    The magnetron that produces the microwaves is not itself a computer. The complete oven is more usefully described as **an appliance containing an embedded computer**. An older model controlled entirely by electrical or mechanical mechanisms might not contain one.

    The same distinction applies to many objects. A car, watch, or thermostat may contain one or more computers without the complete object being described primarily as a computer.

### What changed?

The question is no longer simply, "Does this object look like a desktop or laptop computer?"

We can now ask:

- What information does the system receive?
- What state does it maintain?
- Which instructions does it follow?
- How do those instructions transform its state or produce a result?
- Is the object itself a general-purpose computer, or does it contain a specialized computer?

A useful definition does more than classify familiar objects. It provides criteria with which to explain and defend that classification when the examples become less obvious.

## Starting glossary

Begin a personal glossary. For each term, write a short definition in your own words and add an example if possible.

Suggested terms:

- computer;
- hardware;
- software;
- operating system;
- peripheral;
- processor;
- memory;
- storage;
- network;
- command;
- script;
- compatibility;
- technical specification.

This glossary will serve as a reference during later sessions.

## Link to assessments

This session prepares for upcoming assessments by establishing precise vocabulary and a reasoning method based on observation, instructions, state, and produced results.

| Course Element | Link to Session 1 |
|---|---|
| Regular practical assessments | Observe a system, use precise vocabulary, and explain reasoning rather than provide only an answer |
| Certificative project | Describe a system's behaviour and justify a classification or choice using technical criteria |
| Certificative exam | Explain relationships among instructions, data, state, and programmability, then distinguish a general-purpose computer from an embedded controller |

## Common errors to avoid

- **Reducing a computer to a desktop PC.** Instead, check whether the system receives information, represents state, executes instructions, and can change behaviour according to a program.
- **Confusing hardware with function.** A case, display, or keyboard may be part of a computer system without being what defines computation by itself.
- **Presenting an inference as an observation.** Record what the tool or hardware actually reports first, then separate interpretation and recommendation.
- **Treating one historical model as a complete definition of every modern system.** Use historical models to build criteria, then test their limits against embedded, mobile, and specialized systems.

## What to remember

- A computer represents information, maintains a state, and follows instructions to produce a result.
- Babbage and Lovelace helped separate a programmable mechanism from the instructions directing its work.
- A Turing machine shows how simple rules can transform a state; a universal machine can simulate different processes when supplied with their rules.
- The von Neumann model holds instructions and data in shared memory and executes instructions through an ordered cycle.
- An object may be a general-purpose computer or contain a specialized computer, such as a microcontroller.
- The course is about evaluating components and solutions through precise observation, comparison, and justification.

## Put it into practice

The practical portion of this session is on a separate page so that its instructions remain easy to find while working in the lab.

[Continue to Lab 1 - Exploring the Workstation](../labs/lab-1.md)

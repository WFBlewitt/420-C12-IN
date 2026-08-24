# Session 2 - Bases 2 and 16

## Purpose of the session

In Session 1, we saw that a computer represents information, maintains state, and follows instructions. We now need to understand how that information can be represented inside a digital system.

This session introduces three ways to write the same value:

- base 10, which we use every day;
- base 2, which is suited to the states recognized by digital circuits;
- base 16, which helps people read and transcribe long sequences of bits more easily.

The goal is not merely to obtain an answer from a calculator. We will learn to recognize the structure of a numeral, perform conversions manually, and show work that can be checked.

## Objectives

By the end of this session, you should be able to:

- distinguish a value from its representation and explain the principle of a positional numeral system;
- recognize valid digits and notation used in bases 2, 10, and 16;
- explain why digital systems commonly use base 2 and why hexadecimal provides a compact notation;
- determine the decimal value of a binary or hexadecimal numeral;
- represent a decimal integer in binary;
- convert directly between binary and hexadecimal by grouping bits;
- respect a required width and add zeros on the left without changing the value;
- show and verify the method used for a conversion.

!!! info "Scope of the session"
    **Master today:** value and representation, positional notation, permitted digits, bases 2, 10, and 16, `0x` notation, manual conversions, four-bit grouping, width, and verification.

    **Recognize today:** the relationship between two logical states and binary representation in digital circuits.

    **Not required:** negative numbers, binary fractions, and specialized encodings; these topics will be introduced in later sessions.

## One value, several representations

Consider these three forms:

`13`<sub>`10`</sub> &nbsp;&nbsp; `1101`<sub>`2`</sub> &nbsp;&nbsp; `D`<sub>`16`</sub>

They look different, but they all represent the same quantity.

The value does not change. Only the symbols and the rules used to write it change. This is comparable to expressing the same distance in metres or centimetres: the written form changes, but the distance itself does not.

!!! question "Opening observation"
    Without doing any research, examine the three representations above.

    1. Which one is most familiar to you?
    2. What might the small numbers `10`, `2`, and `16` indicate?
    3. Why might the third representation use a letter?
    4. Which form do you think would be easiest to read if the number contained several dozen binary digits?

    Keep your initial answers. We will return to them after building the rules for all three systems.

## Representation and interpretation

A sequence of symbols does not have a unique value unless we know the rules used to interpret it.

For example, the written form `10` can represent:

- ten in base 10;
- two in base 2;
- sixteen in base 16.

To avoid ambiguity, we will show the base as a subscript:

- `10`<sub>`10`</sub> = `10`;
- `10`<sub>`2`</sub> = `2`;
- `10`<sub>`16`</sub> = `16`.

!!! warning "The base is part of the information"
    A conversion does not change the value. It produces a new representation of that same value.

    Writing only `1010` without giving any context can be ambiguous. During exercises, identify the starting base and destination base, then keep your work.

!!! note "If 10 in base 16 being equal to 16 in base 10 seems strange"
    That confusion is completely understandable. We are familiar with only ten decimal digits: `0` through `9`. To obtain the sixteen symbols needed in base 16, hexadecimal adds the letters `A` through `F`.

    In any base, the written form `10` means **one complete group of the base and no units**:

    - `10`<sub>`2`</sub> = `1 × 2 + 0`;
    - `10`<sub>`10`</sub> = `1 × 10 + 0`;
    - `10`<sub>`16`</sub> = `1 × 16 + 0`.

    The next section shows how the available digits and their positions determine the value of a numeral.

## Position gives a digit its value

In our decimal system, the value of a digit depends on its position.

Consider the number `555`. The three digits are identical, but they do not represent the same quantity:

| Position | Hundreds | Tens | Units |
|---|---:|---:|---:|
| Digit | 5 | 5 | 5 |
| Positional value | 100 | 10 | 1 |
| Contribution | 500 | 50 | 5 |

We can therefore expand the number as follows:

`555 = 5 × 100 + 5 × 10 + 5 × 1`

This principle is called **positional notation**. Each position has a value determined by the base being used.

### Powers as shorthand

The positional values in base 10 can be written with powers of ten:

| Position from the right | Power | Value |
|---:|---:|---:|
| 0 | 10<sup>0</sup> | 1 |
| 1 | 10<sup>1</sup> | 10 |
| 2 | 10<sup>2</sup> | 100 |
| 3 | 10<sup>3</sup> | 1,000 |

The rightmost position starts at zero because any base raised to the power zero equals `1`.

??? info "Reminder: what does an exponent mean?"
    An exponent indicates how many factors equal to the base are multiplied:

    - 10<sup>3</sup> = 10 × 10 × 10 = 1,000;
    - 10<sup>2</sup> = 10 × 10 = 100;
    - 10<sup>1</sup> = 10.

    Moving one position to the right divides the positional value by the base. Therefore, 10<sup>0</sup> must equal 10 ÷ 10 = 1. The same reasoning works in every base: 2<sup>0</sup> and 16<sup>0</sup> also equal 1.

For example:

`4,307 = 4 × 10`<sup>`3`</sup>` + 3 × 10`<sup>`2`</sup>` + 0 × 10`<sup>`1`</sup>` + 7 × 10`<sup>`0`</sup>

`4,307 = 4,000 + 300 + 0 + 7`

### The role of zero

Zero can indicate that a position contributes nothing to the value.

In `4,307`, the zero preserves the tens position. Without it, `437` would represent a different value:

- `4,307` contains four thousands, three hundreds, no tens, and seven units;
- `437` contains four hundreds, three tens, and seven units.

Zero adds nothing in that position, but its presence prevents the other digits from changing position.

## The same rule in every base

In any base, the positions follow the same principle:

- the rightmost position is worth `1`;
- the next position is worth the base;
- each new position to the left is worth the previous position multiplied by the base.

| Base | Positional values, from right to left |
|---:|---|
| 2 | 1, 2, 4, 8, 16, 32… |
| 10 | 1, 10, 100, 1,000… |
| 16 | 1, 16, 256, 4,096… |

The positional rules remain the same. The available symbols and the value of each position are what change.

## Permitted digits

A base has exactly the number of symbols indicated by its name. It always begins with zero, so its largest possible digit is one less than the base.

| Base | Permitted symbols |
|---:|---|
| 2 | `0`, `1` |
| 10 | `0` through `9` |
| 16 | `0` through `9`, followed by `A`, `B`, `C`, `D`, `E`, `F` |

Consequently:

- `10110` is a possible numeral in base 2;
- `10210` is not valid in base 2 because the digit `2` does not exist there;
- `A5` is a possible numeral in base 16;
- `1G` is not valid in base 16 because the letter `G` is not one of its symbols;
- `A5` is not valid in base 10.

!!! question "Validity check"
    Without performing a conversion, determine whether each form is valid in the stated base. For every invalid form, circle the first impossible symbol and explain your decision.

    1. `110101` in base 2
    2. `12001` in base 2
    3. `908` in base 10
    4. `9F2` in base 16
    5. `BAG` in base 16

    A valid written form is not necessarily a correct answer to a conversion problem. This check confirms only that all of its symbols exist in the stated base.

## Why use base 2?

A computer does not think or directly see the digits `0` and `1`. Its circuits produce, preserve, and detect physical states, including electrical voltage levels.

In a digital circuit, these states are interpreted using two logical categories:

- logical state `0`;
- logical state `1`.

Real voltage levels are not always perfectly identical. They may vary slightly because of electrical noise, temperature, component manufacturing, or other physical conditions.

Using two well-separated categories allows circuits to recognize states reliably despite these small variations. It also makes it practical to construct circuits that perform operations and preserve information.

!!! warning "0 does not always mean off"
    It is tempting to imagine that `0` always means “no electricity” and `1` always means “electricity present.” That comparison can help at first, but it is not a universal rule.

    The exact physical values and their interpretation depend on the technology. The important idea is that the system distinguishes two logical states predictably.

## The bit

The word **bit** comes from *binary digit*. A bit can have one of two values: `0` or `1`.

One bit can therefore represent two possibilities. Combining several bits rapidly increases the number of possible configurations.

| Number of bits | Possible configurations | Number of configurations |
|---:|---|---:|
| 1 | `0`, `1` | 2 |
| 2 | `00`, `01`, `10`, `11` | 4 |
| 3 | `000` through `111` | 8 |
| 4 | `0000` through `1111` | 16 |
| 8 | `00000000` through `11111111` | 256 |

With `n` bits, 2<sup>n</sup> different configurations can be formed.

A bit configuration does not have one inherent meaning. Depending on the rules used to interpret it, it may represent a number, letter, colour, instruction, device state, or part of an image, sound, or program.

We will examine several of these interpretations in Session 3. For now, we will use bits to represent integers.

## Returning to the letter router

In Session 1, the programmable router used eight destinations labelled `A` through `H`.

Three bits provide exactly eight configurations:

| Configuration | Possible destination |
|---|---|
| `000` | A |
| `001` | B |
| `010` | C |
| `011` | D |
| `100` | E |
| `101` | F |
| `110` | G |
| `111` | H |

This association is a convention. The bits do not naturally contain a letter: the system must know the rule connecting each configuration to a destination.

!!! question "Build a code"
    Imagine a new router with five destinations.

    1. Would two bits be enough to give every destination a different code?
    2. What is the minimum number of bits required?
    3. Write enough configurations to assign a unique code to all five destinations.
    4. Would any configurations remain unused?

    Keep your work. A number by itself does not show how you determined the code's capacity.

## From binary to hexadecimal

Circuits can handle long bit sequences efficiently, but those sequences quickly become difficult for a person to read and transcribe.

For example, a single error is easy to miss in this representation:

`1101011010110010`

Base 16 provides a more compact way to represent exactly the same bits.

## Base 16: a more compact notation

Hexadecimal does not replace the bits stored or manipulated by the system. It provides a more convenient notation for people who need to read them.

### Hexadecimal symbols

Base 16 requires sixteen different symbols. The ten familiar decimal digits are therefore not enough. The letters `A` through `F` represent the remaining six values.

| Decimal value | Hexadecimal digit |
|---:|:---:|
| 0 through 9 | `0` through `9` |
| 10 | `A` |
| 11 | `B` |
| 12 | `C` |
| 13 | `D` |
| 14 | `E` |
| 15 | `F` |

Counting continues as follows:

`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F, 10`

After `F`, every possible symbol for a single position has been used. A new position is therefore required.

- `A`<sub>`16`</sub> represents `10`<sub>`10`</sub>;
- `F`<sub>`16`</sub> represents `15`<sub>`10`</sub>;
- `10`<sub>`16`</sub> represents `16`<sub>`10`</sub>.

!!! warning "A and 10 do not represent the same value"
    In hexadecimal, `A` represents the decimal value ten. The hexadecimal form `10` instead represents one group of sixteen and no units.

    The letter provides the missing single-position symbol for the value ten.

### Why groups of four bits?

Four bits provide exactly sixteen configurations: 2<sup>4</sup> = 16.

One group of four bits can therefore correspond directly to one hexadecimal digit.

| Binary | Hexadecimal | Decimal |
|:---:|:---:|---:|
| `0000` | `0` | 0 |
| `0001` | `1` | 1 |
| `0010` | `2` | 2 |
| `0011` | `3` | 3 |
| `0100` | `4` | 4 |
| `0101` | `5` | 5 |
| `0110` | `6` | 6 |
| `0111` | `7` | 7 |
| `1000` | `8` | 8 |
| `1001` | `9` | 9 |
| `1010` | `A` | 10 |
| `1011` | `B` | 11 |
| `1100` | `C` | 12 |
| `1101` | `D` | 13 |
| `1110` | `E` | 14 |
| `1111` | `F` | 15 |

This correspondence explains why binary and hexadecimal can be converted by grouping without passing through base 10.

??? question "Why is base 16 common, but not base 32?"
    Base 32 exists. It can use the digits `0` through `9`, followed by the letters `A` through `V`, and each symbol can represent a group of five bits because 2<sup>5</sup> = 32.

    This is one possible alphabet, not a universal convention. Some base-32 formats use a different set of letters and digits to meet their own readability or transmission requirements.

    However, it aligns less naturally with the usual organization of memory:

    - one hexadecimal digit represents exactly four bits;
    - two hexadecimal digits represent exactly one eight-bit byte;
    - common sizes of 16, 32, and 64 bits become 4, 8, and 16 hexadecimal digits.

    A base-32 symbol represents five bits. Because five does not divide eight, the groups often cross byte boundaries. This makes the notation less natural for reading addresses, memory contents, or machine values.

    Hexadecimal also uses only six additional letters, `A` through `F`, which limits possible confusion while reading or transcribing values.

    Base 32 is not useless. It is used in some codes and textual formats where compactness and ease of transmission matter more than byte alignment.

    Historically, base 8 was also common with architectures organized around groups of three bits. Hexadecimal became especially convenient as the eight-bit byte became standard.

## Why start on the right?

In a binary integer, the bit at the far right occupies the units position, 2<sup>0</sup>.

The four rightmost positions have these values:

| Position | 2<sup>3</sup> | 2<sup>2</sup> | 2<sup>1</sup> | 2<sup>0</sup> |
|---:|---:|---:|---:|---:|
| Value | 8 | 4 | 2 | 1 |

Together, those four bits can represent values from 0 through 15, exactly like one hexadecimal digit.

The next four positions form the hexadecimal digit immediately to the left, and so on. Groups must therefore be aligned with the units position on the right.

We still read the completed number from left to right. Only the grouping operation begins on the right.

## Grouping a binary integer

To convert a binary integer to hexadecimal:

1. locate the bit at the far right;
2. moving toward the left, separate the bits into groups of four;
3. if the remaining group on the left contains fewer than four bits, add zeros to its left;
4. replace each group with the corresponding hexadecimal digit.

Example:

`1101011010110010`<sub>`2`</sub>

Grouping:

`1101 0110 1011 0010`

Correspondence:

`D 6 B 2`

Therefore:

`1101011010110010`<sub>`2`</sub> = `D6B2`<sub>`16`</sub>

### Adding zeros on the left

Consider the following binary numeral:

`101101`<sub>`2`</sub>

Beginning on the right and counting four bits toward the left gives:

`10 1101`

The group on the left contains only two bits. We therefore add two zeros to its left to form a complete group:

`0010 1101`

Zeros added on the left do not change the integer's value. They only align the groups of four correctly:

`101101`<sub>`2`</sub> = `2D`<sub>`16`</sub>

## Returning to binary

To convert a hexadecimal numeral to binary, replace each hexadecimal digit with its four-bit group.

Example: `A05`<sub>`16`</sub>

| Hexadecimal digit | `A` | `0` | `5` |
|---|:---:|:---:|:---:|
| Binary group | `1010` | `0000` | `0101` |

Therefore:

`A05`<sub>`16`</sub> = `101000000101`<sub>`2`</sub>

The `0000` group in the middle must be preserved. Removing it would shift the other bits and change the value.

## The 0x notation

In technical documentation and many programming languages, the prefix `0x` indicates that a number is written in hexadecimal.

- `0xA` represents the decimal value 10;
- `0x10` represents the decimal value 16;
- `0xD6B2` represents the same number as `D6B2`<sub>`16`</sub>.

The character `x` is part of the prefix. It does not represent multiplication.

!!! question "Read the groups"
    Without converting the entire sequence to base 10:

    1. separate `101111000101` into groups of four;
    2. find the hexadecimal digit corresponding to each group;
    3. explain why a twelve-bit sequence produces exactly three hexadecimal digits;
    4. determine how many hexadecimal digits are required to represent thirty-two bits.

## Converting to base 10

To convert a binary or hexadecimal numeral to base 10, we use the value of each position.

The method is the same in both cases:

1. begin with the position at the far right;
2. assign it exponent zero;
3. increase the exponent by one for each move to the left;
4. multiply each digit by the power of the base associated with its position;
5. add all the contributions.

### Binary to decimal

Consider the numeral `10110110`<sub>`2`</sub>.

| Position | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Bit | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 |
| Power | 2<sup>7</sup> | 2<sup>6</sup> | 2<sup>5</sup> | 2<sup>4</sup> | 2<sup>3</sup> | 2<sup>2</sup> | 2<sup>1</sup> | 2<sup>0</sup> |
| Value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

We write the full expansion:

`1 × 128 + 0 × 64 + 1 × 32 + 1 × 16 + 0 × 8 + 1 × 4 + 1 × 2 + 0 × 1`

Positions containing zero do not contribute to the sum:

`128 + 32 + 16 + 4 + 2 = 182`

Therefore:

`10110110`<sub>`2`</sub> = `182`<sub>`10`</sub>

!!! question "Check your understanding: a quick check"
    The bit at the far left is worth `128`. Because other bits are also `1`, the answer must be greater than `128`.

    Eight positions can represent values from `0` through `255`, so an answer of `182` is plausible.

### Hexadecimal to decimal

The same method works in base 16. The positions now use powers of sixteen.

Consider `2D6`<sub>`16`</sub>. The letter `D` represents the decimal value `13`.

| Position | 2 | 1 | 0 |
|---:|---:|---:|---:|
| Hexadecimal digit | `2` | `D` | `6` |
| Digit value | 2 | 13 | 6 |
| Power | 16<sup>2</sup> | 16<sup>1</sup> | 16<sup>0</sup> |
| Positional value | 256 | 16 | 1 |

The expansion is therefore:

`2 × 256 + 13 × 16 + 6 × 1`

`512 + 208 + 6 = 726`

Therefore:

`2D6`<sub>`16`</sub> = `726`<sub>`10`</sub>

!!! warning "Convert letters before multiplying"
    A hexadecimal letter has a numeric value:

    `A = 10`, `B = 11`, `C = 12`, `D = 13`, `E = 14`, and `F = 15`.

    Show this value explicitly in your work. An expression such as `D × 16` hides an important reasoning step.

### Checking through binary

We can also check the result using its binary representation:

`2D6`<sub>`16`</sub> = `0010 1101 0110`<sub>`2`</sub>

The bits equal to `1` occupy these positions:

`512 + 128 + 64 + 16 + 4 + 2 = 726`

Both methods produce the same value.

## Visual workshop: the positional table

Before activating a column, predict whether it contributes to the sum. Then build the positional expansion and enter the total. The tool will check your work before showing the completed representation.

<iframe
  src="../../../assets/demos/positional-value-workbench.html?lang=en"
  title="Interactive positional-value workshop"
  loading="lazy"
  sandbox="allow-scripts"
  style="width: 100%; height: 860px; border: 0;"
></iframe>

??? info "Useful powers of two"
    | Power | Value | Power | Value |
    |---:|---:|---:|---:|
    | 2<sup>0</sup> | 1 | 2<sup>8</sup> | 256 |
    | 2<sup>1</sup> | 2 | 2<sup>9</sup> | 512 |
    | 2<sup>2</sup> | 4 | 2<sup>10</sup> | 1,024 |
    | 2<sup>3</sup> | 8 | 2<sup>11</sup> | 2,048 |
    | 2<sup>4</sup> | 16 | 2<sup>12</sup> | 4,096 |
    | 2<sup>5</sup> | 32 | 2<sup>13</sup> | 8,192 |
    | 2<sup>6</sup> | 64 | 2<sup>14</sup> | 16,384 |
    | 2<sup>7</sup> | 128 | 2<sup>15</sup> | 32,768 |

??? info "Useful powers of sixteen"
    | Power | Value |
    |---:|---:|
    | 16<sup>0</sup> | 1 |
    | 16<sup>1</sup> | 16 |
    | 16<sup>2</sup> | 256 |
    | 16<sup>3</sup> | 4,096 |
    | 16<sup>4</sup> | 65,536 |

!!! question "Show each position's contribution"
    Convert these numerals to base 10:

    1. `101101`<sub>`2`</sub>
    2. `11001001`<sub>`2`</sub>
    3. `3A`<sub>`16`</sub>
    4. `B04`<sub>`16`</sub>

    For each one, identify every positional value, write the multiplications, add the contributions, and check whether the scale of your answer is plausible.

## Decimal to binary

Converting a binary numeral to base 10 means adding the positional values whose bits equal `1`.

To travel in the opposite direction, we determine which powers of two must be combined to produce the decimal value. Each selected power receives a bit `1`; each skipped position receives a bit `0`.

!!! note "The special case of zero"
    The value zero requires no powers of two in its expansion:

    `0`<sub>`10`</sub> = `0`<sub>`2`</sub>

    The powers-of-two method presented below applies to strictly positive integers.

### The powers-of-two method

To represent a decimal integer in binary:

1. find the largest power of two that does not exceed the number;
2. write `1` in that position and subtract its value;
3. examine each following power while moving to the right;
4. write `1` if its value can be subtracted from the remainder;
5. write `0` if its value exceeds the remainder;
6. continue through position 2<sup>0</sup>, whose value is `1`.

Positions containing `0` must be preserved between the first and last bit. They prevent the other bits from changing positional value.

### Complete example

Let us represent `182`<sub>`10`</sub> in binary.

The largest power of two that does not exceed `182` is `128`, or 2<sup>7</sup>.

| Positional value | Does it fit in the remainder? | Bit | New remainder |
|---:|:---:|:---:|---:|
| 128 | Yes: `182 - 128` | `1` | 54 |
| 64 | No | `0` | 54 |
| 32 | Yes: `54 - 32` | `1` | 22 |
| 16 | Yes: `22 - 16` | `1` | 6 |
| 8 | No | `0` | 6 |
| 4 | Yes: `6 - 4` | `1` | 2 |
| 2 | Yes: `2 - 2` | `1` | 0 |
| 1 | No | `0` | 0 |

The bits, read from the largest position toward the units position, are `10110110`.

Therefore:

`182`<sub>`10`</sub> = `10110110`<sub>`2`</sub>

To check the conversion, add the positions containing `1`:

`128 + 32 + 16 + 4 + 2 = 182`

!!! note "Verification: the first bit can be predicted"
    Locate the two powers of two surrounding the number.

    For example, `128 ≤ 182 < 256`. The representation of `182` therefore begins in the `128` position. It has eight positions, and its first bit is `1`.

### Why must the zeros be written?

Suppose we kept only the selected positions for `182`: `11111`.

This form does not mean “128, 32, 16, 4, and 2.” Without the intervening zeros, the five bits instead occupy positions `16`, `8`, `4`, `2`, and `1`.

Thus:

`11111`<sub>`2`</sub> = `31`<sub>`10`</sub>

The zeros in `10110110` indicate that positions `64`, `8`, and `1` do not contribute. They are essential for preserving the other positions.

### Minimum width and required width

The minimum representation of a positive integer normally begins with `1`. Unnecessary zeros at the far left may be omitted:

`00101101`<sub>`2`</sub> = `101101`<sub>`2`</sub>

However, an exercise, variable, or register may require a specific width. If a value must be represented using eight bits, zeros must be added on the left until eight positions are present:

`45`<sub>`10`</sub> = `101101`<sub>`2`</sub>

Using eight bits: `00101101`<sub>`2`</sub>

Signed integer representation will be studied in Session 3. In this session, all numbers are unsigned, non-negative integers.

### Continuing to hexadecimal

Once the binary representation has been obtained, we can form groups of four bits:

`182`<sub>`10`</sub> = `10110110`<sub>`2`</sub>

`1011 0110`<sub>`2`</sub> = `B6`<sub>`16`</sub>

This method converts decimal to hexadecimal by combining the two methods already studied.

??? info "Alternative method: successive division"
    A decimal integer can also be converted to another base using successive division.

    To convert to base 2:

    1. divide the number by `2`;
    2. keep the remainder, which will be `0` or `1`;
    3. divide the quotient by `2`;
    4. continue until the quotient is zero;
    5. read the remainders from last to first.

    This method works with several bases, but it is treated as a supplementary method in this session. The powers-of-two method makes the positions more visible and better prepares us for fixed-width representations.

!!! question "Build and check"
    Convert these values to binary:

    1. `23`<sub>`10`</sub>
    2. `45`<sub>`10`</sub>
    3. `100`<sub>`10`</sub>
    4. `157`<sub>`10`</sub>

    For each conversion, identify the largest power of two used, show every subtraction, preserve the zeros for skipped positions, and check the result by adding the positions containing `1`. Then give the hexadecimal representation obtained by grouping.

## Choosing the correct method

The direction of the conversion determines the most direct method.

| Conversion | Main method |
|---|---|
| Base 2 to base 10 | Add the powers of two associated with bits equal to `1` |
| Base 16 to base 10 | Multiply each digit by its power of sixteen, then add |
| Base 10 to base 2 | Decompose the value into powers of two |
| Base 2 to base 16 | Group bits in fours beginning on the right |
| Base 16 to base 2 | Replace each digit with four bits |
| Base 10 to base 16 | Pass through binary, then group the bits in fours |

A conversion can be performed through several paths. A second method can sometimes provide a useful check, but it does not replace the main method requested.

## Common errors to avoid

### Starting positions at one instead of zero

The position at the far right always corresponds to power zero: 2<sup>0</sup> = 1, 10<sup>0</sup> = 1, and 16<sup>0</sup> = 1.

### Using a symbol that does not exist in the base

A binary numeral can contain only `0` and `1`. A hexadecimal numeral cannot contain a letter after `F`. Check the symbols before beginning a conversion.

### Confusing a hexadecimal digit with its value

In hexadecimal, `A` represents decimal 10, `F` represents 15, and `10` represents 16.

### Grouping binary from the wrong side

For an integer, groups of four must be aligned with the units position on the right.

### Removing a zero in the middle

Only zeros at the far left can be added or removed without changing an integer's value. A zero located between other bits preserves an important position.

### Providing only the result

An answer may be correct by chance or may have come from a misconfigured tool. Visible work allows the positions, powers, subtractions, groupings, and hexadecimal letters to be checked.

## Integrated synthesis

!!! question "One value in three forms"
    Consider the hexadecimal value `0x5A`.

    1. Replace each hexadecimal digit with four bits.
    2. Preserve both groups to produce an eight-bit representation.
    3. Convert that binary representation to base 10 while showing the positional values.
    4. Check the result by directly expanding `5A`<sub>`16`</sub> with powers of sixteen.
    5. Explain how both methods confirm that the forms represent the same value.

    Use a conversion tool only after completing both manual methods.

## What to remember

- One value can be represented in several bases.
- In a positional system, each position is a power of the base.
- Digital circuits commonly interpret two logical states, represented by `0` and `1`.
- A bit is a binary digit.
- Four bits form sixteen configurations and correspond exactly to one hexadecimal digit.
- Hexadecimal makes long bit sequences more compact for people.
- A conversion must preserve the value even when its written form changes.
- Complete work helps detect and correct errors.

## Put it into practice

[Continue to Lab 2 - Representing a Value in Bases 2, 10, and 16](../labs/lab-2.md)

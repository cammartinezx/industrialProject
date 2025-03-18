% 2280
% Computer

# Today

What does a computer look like?

Specifically Von-Neumann

# Parts

1. Input unit
2. Memory unit
3. ALU
4. CU
5. Output

[Let's see what they do]{.fragment}

# 1 Input

<aside  class="notes">
keyboard sends a binary signal

mouse sends directions

Ethernet sends *magic*
</aside>

Accepts coded information from  human operators
or from other computers

# 2 Memory

Information to be processed by the Central Processing unit (CPU)
stored in main memory

# 3 Arithmetic & Logic Unit (ALU)

Performs operations on data

Math and math-adjacent (and/or/not/shift)

# 3 Arithmetic & Logic Unit (ALU)

<aside  class="notes">
Has to go faster than the CPU since it may have to do multiple steps
to calculate something
</aside>

Has access to CPU registers ... but can have it's own registers

Operates MUCH faster than the CPU 

# 4 Control Unit (CU)

<aside  class="notes">
Timing signals to all units to keep them in sync
</aside>

Coordinates all the activities of the system

ALU + CU make the CPU

# 5 Output unit

Results sent to... something.

Displays, printers, ethernets

# What does it look like?

How are they connected (and some have accepted schematic shapes!)

# What *is* an instruction

We've seen them! Programs are stored in memory (they aren't "input")

CPU fetches 1 instruction at a time and executes it

# Control?

<aside  class="notes">
OS is pretty thin in LC3
</aside>

The computer is under full control of the program!

[The program is under control of the OS]{.fragment}

# Summary

CPUs aren't magic.

They have a definite state!

Next time... the next level down!
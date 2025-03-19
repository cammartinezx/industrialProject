% 2280
% ISA and LC3

# Today

What is machine language? What kinds of processors are there?

Intro to LC3

# ISA

<aside class="notes">
The ISA doesn’t state how it should be implemented (in the cpu), but only what it o↵ers to the programmer and what the operations are supposed to do.
</aside>

* The instruction set architecture (ISA) is the part of the processor (CPU) that is visible to the programmer.
* This does not imply the implementation!

# Consider

amd64 (aka x64) is used on both AMD processors and Intel (and more!)

That's the ISA with different implementations

# Commands

<aside class="notes">
I/O has lots of variety
</aside>

The instructions in the ISA may be classified into the following categories:

* **data processing instructions** - arithmetic and logic instructions (eg. add, not)
* **data movement/storage instructions** -  access memory (eg. ld, lea)
* **control instructions** - compare/test and branch (eg. jmp, brp).
* **I/O instructions**, if they exist. I/O devices can be accessed via memory locations and therefore uses data movement/storage instructions.

# 

The number and types of instructions available in the instruction set dictates its complexity. Two classifications are

* Complex Instruction Set Computer (CISC) - those whose ISA has a large collection of instructions with lots of addressing modes.
*  Reduced Instruction Set Computer (RISC) - those whose ISA provides a small collection of instructions with few addressing modes.  
  
# RISC
Dec Alpha, ARC,  Atmel AVR, MIPS, Microchip PIC, and SPARC.

The idea is **simple** commands that we reuse, which run (ideally) in one clock cycle

Might take a few commands to do a simple thing.

# CISC

Idea is that maybe more advanced instructions that are more feature-rich, but can take multiple clock cycles.

But... often commands go unused.

Motorola 68000 family, Intel x86 CPUs

# In reality

We end up somewhere in the middle

# Big ideas

Recall that we said that computers architectures come in basically two types Von Neumann architecture (Princeton), and Harvard architecture.

* Harvard architecture has a separate data bus and instruction bus. This means that transfers can be performed simultaneously on both buses.
* The Von Neumann architecture has a single bus for both data transfers and instruction fetches.

# Von Neumann Advantages

* There is only one main memory (that stores program instructions and data) and can be entirely used by a program.
* Having one bus (for accessing memory) leads to a simpler and cost-effective control unit.
* Data and instruction are accessed in the same way.

[It's easy and simple]{.fragment}

# Harvard Advantages

* Two buses can theoretically lead to execution that is twice as fast versus a von Neumann architecture machine.
* The memories for data and instruction can be of different technologies and sizes.
* Safer in the sense that a program cannot overwrite itself.

[But it's complex]{.fragment}

# For us....

LC-3 is a Von Neumann RISC architecture.

It has a memory address space of 2^16^ addresses (16-bit addresses)

The addressibility is 16 bits. That is, each memory location holds a 16 bit value.

# Memory

![](memory-layout-lc3.jpg){.big-img}

# Registers

* **Registers** are high-speed memory that resides within the CPU.
* There are a very limited number of registers.
* LC-3 has (only) eight general-purpose registers named R0 through R7.
* Each of these eight registers are 16 bits wide.

# Special registers

* PC - The program counter
* IR - The instruction register
* The condition codes

# Instructions

![](lc-3-instrution-set.jpg){.big-img}

# Instruction shape

Each instruction is 16 bits in length with the most significant 4 bits denoting the opcode that specifies the actual instruction

The remaining 12 bits are for the operands and addressing mode(s) used by the instruction

# Generally

<aside class="notes">
Only for a moment, really for reference later
</aside>

* Data processing instructions: ADD, AND, and NOT.
* Data movement/storage instructions: LD, LDI, LDR, LEA, ST, STR, STI.
* Control instructions: BR, JSR/JSRR, JMP, RTI, TRAP

# Commands

<aside class="notes">
A word is 2 bytes

This creates 16 bits of machine language
</aside>

Each instruction (when assembled) yields an instruction word (16 bits in length).
This is the machine language equivalent for the assembly language instruction

Consider:  `Loop ADD R1,R1,#-1 ;decrement counter`

This is an "instruction word"

# Operands

Typical operands may be
* registers - specified by Rn, where n is a value between 0 and 7
* numbers - specified using # for decimals or x for hexadecimals
* labels - symbolic name for a memory location

# The basics

```
; comment

.orig x3000

	lea R0, hello
	puts
	halt

hello: .stringz "Hello World!\n"
.end
```

# What are we looking at?

<aside class="notes">
LEA loads an address from a label
</aside>

* .orig sets stating PC
* `lea` appendix a page 534
* `puts` prints data in `R0` to a `null` character
* `halt` trap code to exit and prints a message
* `hello` is a string
* `.end` end of program

# How do we run it

We "assemble" it, then we can run it in the simulator

# Summary

We saw different ideas on what a processor design should be (RISC/CISC)

Key registers in LC3 computing

Basic (Hello World level) LC3 usage

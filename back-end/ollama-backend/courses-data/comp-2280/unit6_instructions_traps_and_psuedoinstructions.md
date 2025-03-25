% 2280
% LC3 Instructions

# Today

Using machine language

Understanding the parts of LC3, and using basic instructions

# Instruction word

<aside class="notes">
</aside>

Remember the shape of label, opcode, operand, comment

`Loop ADD R1,R1,#-1 ;decrement counter`

What is this stuff? Let's look at it a little out of order...

# Opcodes

aka "commands" or "instructions"

* Data processing instructions: ADD, AND, and NOT.
* Data movement/storage instructions: LD, LDI, LDR, LEA, ST, STR, STI.
* Control instructions: BR, JSR/JSRR, JMP, RTI, TRAP

# Appendix A

Look at it. Print it. Use it.

Page 525 - Let's look at the shape of commands

# Binary

Of course it is. The Opcode is *really just label* for the
binary that will be passed to the processor.

Assembly for humans - machine code for processors.

# opcode operands

We can see what the opcode requires in the datasheet

We can represent decimal numbers with `#12` or Hex with x4

# Numbers? Again?

2s compliment is free-ish. It will do sign extension (`SEXT` in the datasheet)
for us.

# Other operands

* immediate - a constant `x4`
* A register `R3`
* An address... which can be
  * `PC`-relative
  * indirect (stored in the operand)
  * base+offset (think about how we access arrays)

# Labels

We flag *things*

* Data we want to fetch
* Lines of code we want to go back to

# Examples of these commands

From the Hello World...

`lea` (page 534) `LEA DR, LABEL`

We saw `lea R0, hello`

Fetch data at address LABEL, load into destination register DR

# Last part

... comment? Yeah. Do that.

Don't be obvious (Yes, we can see you incrementing)

Tell me what the big idea is.

# But wait, there's more

<aside class="notes">
n+1 because null character
</aside>

Assembler Directives

* `.orig memoryAddress` - starting address of program
* `.end` - denotes end of program
* `.blkw n` - allocate n words of consecutive  storage
* `.fill n` - allocate one word of storage  initialized to value n
* `.stringz characterStringLength_n` - allocate n+1 consecutive locations in memory to store the null-terminated string

# Traps

Traps are a mechanism for user (unprivileged) code to execute privileged OS code.

* Think of Traps as being instructions provided to the programmer as a convenience.
* For LC-3, we do not have an Operating System. Traps provide us a way to do I/O and halt the machine.
* We use traps so much that we give symbolic names to the most useful traps (see table).


# Trap names pg 543

* `HALT` - Trap x25 - Halt execution and print message to console
* `IN` -  Trap x23 - Print a prompt to console, read (and echo) one character from keyboard. Character is stored in low 8-bits of register R0
* `OUT` - Trap x21 - Write the character stored in low 8 bits of R0 to console
* `GETC` - Trap x20 - Read one character from keyboard and store in low 8 bits of R0
* `PUTS` - Trap x22 - Write null-terminated string to console. Prints starting with address in R0

# Trap functions

They are *just code* and but allow us to access I/O (which is a privilege!)

They use *conventions* for which register to use (which also means it has access to our registers, interesting...)

Can affect our Registers (here be dragons)

# Condition Codes

<aside class="notes">
3 1-bit registers!
</aside>

PG 522 for definition. PG 525 there is + on some of the opcodes

Sets flag to Negative, positive, or zero. `BR` (branch) uses this to make a decision

# That's a lot!

Let's stop here for now.

Today we saw opcodes, Assembler Directives, and traps

We know *just enough* to use them!

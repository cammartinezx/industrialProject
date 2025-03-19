% 2280
% Representation

# Data representation

What *is* a number, anyway.

#

Today

* Look at number representation
* Understand how we store them in a computer
* Do math in not base 10

# Binary

What is it, how do we count?

Base 2... what does this mean?

# Base 10

Go from 0 to 9, when we get to 10, we represent that by
adding 1 to the next power of 10.

# Base 2

Go from 0 to 1, when we get to 1, we represent that by
adding 1 to the next power of 2.

# The patterns

<aside class="notes">
Do it!
</aside>

Try writing them out in base 2 and 10 side-by-side

# Why?

<aside class="notes">
The ish hard. 0-0.5v is 0, 2.4v-3v is 1

Space between 0.5 and 2.4 is undefined behaviour, usually just illegal.

There are "bounces" of electricity we ignore
</aside>

Binary seems like a big deal.... why are computers build on it?

* In computers we use 0v and 3v (or 12v or 5v)
* 0ish volts is 0
* 3ish volts is 1
* ish?

# But we don't think in 1s and 0s

We want something more concise!

Base 16! AKA hexadecimal

Go from 0 to 15, when we get to 16, we represent that by
adding 1 to the next power of 16.

[But how do we represent 10 in .... the 16s column?]{.fragment}

# Revisiting that table...

Add base 16 aka hexadecimal or hex to it.

# Easy right?

In the end, they're all numbers. To tell them apart we....

Subscript: $1010_2$ or $1010_b$

Start binary numbers with 0b, and hex with 0x (and the rarely used octal is leading 0)

# Converting to decimal

We can use the powers of 2. Consider $101010_2$ - what are the powers of 2?

$1x2^5 + 0x2^4 + 1x2^3 + 0x2^2 + 1x2^1 + 0x2^0$

$1x2^5 +1x2^3 + 1x2^1$

$32 + 8 + 2 = 42$

# Let's do some math

How would we add? $1010_b + 0011_b$?

# What could possibly go wrong?

We have all numbers ever here, right?

* negative?
* just integers?

# Summary

Today: we talked about simple binary and hex representation for
**positive integers**

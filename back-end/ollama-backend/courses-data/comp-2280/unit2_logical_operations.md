% 2280
% Logical Operations

# Today

AND, OR, NOT....

But... different? In Binary!

# Back to Binary

We've seen some binary operations already

Adding, and not

# But formally

<aside class="notes">
Demo this!
</aside>

Logical not

Any "trues" 1 becomes "false" 0

Any "false" 0 becomes 1

Repeat for each bit

# Adding

Add the two powers of 2, carry a 1 (maybe)

We can only add on fixed sizes, if we "carry" a one past the size, it is
ignored.

# What about subtracting...

<aside class="notes">
Yeah, we added twice!
</aside>

We did a 2s compliment (NOT [aka flip]) + 1

Then added a negative number!

# Complication

Can we add different sizes of numbers?

"We can only add on fixed sizes" from 2 slides ago?

Add 8 bit number to 16 bit?

# Yeah!

Sign extension! Pad 0s or 1s (copy MSB)

$4_{10} = 0100_2 = 0000\;0100_2$

$-4_{10} = 1100_2 = 1111\;1100_2$

# Aside about overflow

We don't always want it! What is

255 + 1 if we have an 8 bit size? 0?

[The computer can tell us if there was an overflow, we can choose to care]{.fragment}

# Aside aside

[Pac-man level 256 glitch](https://pacman.fandom.com/wiki/Map_256_Glitch) was due to
an uncaught overflow

# Logical AND/OR

<aside class="notes">
and for 1010/1020 it's really how it was implemented

Make the truth table
</aside>

You've seen these in 1240, 1010, 1020 - it's the same

Let's make truth tables!

# But we do it bitwise

$$\begin{align}
0000\:1000& \\
\underline{AND\quad 1111\:1011}& \\
0000 1000&
\end{align}$$

# Also with OR

$$\begin{align}
0000\:1000& \\
\underline{OR\quad 1111\:1011}& \\
1111\:1011&
\end{align}$$

# Summary

You know most of this already, but we view it
a little differently!

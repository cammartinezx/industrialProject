% 2280
% More representation

# More numbers

We saw how binary numbers work

Today: What about... negative numbers?

# What tools do we have?

All we have are 0s and 1s (really 0v and 3v...)

[Let's use the top bit for the sign]{.fragment}

# Aside about top bit

This is the "most significant bit" or MSB, and
would change based on the size of numbers we are using.

This therefore, means ... we have a maximum size!

But we knew that, because we don't have an infinite system! So MSB is ok?

# More on MSB

What effect does it have on the range of our numbers? We now *have* a range, after all...

# Idea 1: Sign Magnitude

MSB of 1 means negative. 8 bit numbers.

$1000\:0101_2 = -5_{10}$

Pros: easy! Cons: We'll get there...

# Idea 2: 1s Compliment

Any number with an MSB that's 1 is still negative, but it's the *inverse*

$0000\:0101_2 = 5_{10}$

$1111\:1010_2 = -5_{10}$

Pros: Easy, clear. Logical `not` is a fast operation. Cons: ... soon.

# Let's do more adding

Really subtracting...

# Subtraction in Sign Magnitude

Lets do 8 + (-5) in Sign Magnitude

$$\begin{align}
0000\:1000& \\
\underline{+\quad 1000\:0101}& \\
????&
\end{align}$$

How.... would we do this? No obvious mathematical property

[Lots of special case]{.fragment}

# 0 in Sign Magnitude

Does 1000 0000 == 0000 0000?

*What does it mean?* Do we have a negative zero??

# Subtraction in 1s Compliment

That was a disaster... let's do it in 1s compliment. 8 + (-5) again.

$$\begin{align}
0000\:1000& \\
\underline{+\quad 1111\:1010}& \\
0000 0010&
\end{align}$$

[.... 2?]{.fragment}

# 0 in 1s compliment

Since we just flip.... is 0000 0000 == 1111 1111?

# We don't know circuits yet but

That'd be an insane circuit to make. Too many special cases.

# Ick

To all of that.

# 2s Compliment

That 1s compliment math was off by one... were we onto something there?

# Flip it and add 1

Consider.... -5

`0000 0101`

would flip to

`1111 1010`

And add one

`1111 1011`

# Does math work now?

 8 + (-5) one more time.

$$\begin{align}
0000\:1000& \\
\underline{+\quad 1111\:1011}& \\
0000 0011&
\end{align}$$

With an overflow!

# What about -0?

`0000 0000` flips to 

`1111 1111` and add one....

[`0000 0000`]{.fragment}

# Can we go from -ve to +ve?

$-5_{10} = 1111\:1011_2$

Flip to `0000 0100`

plus one `0000 0101`

# 2s compliment

<aside class="notes">
Literally ... just a not, and adder circuit

Even I can do an adder circuit
</aside>

Makes subtraction easy (which, in turn, would mean easy circuits)

Has 1 zero

# Summary

We now have negative numbers!

Is subtraction not just adding?

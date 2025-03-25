% 2280
% Fractions

# Today


Representing fractions in Binary

# Why have I avoided this

It's uuuuugly. We will look at fixed point in detail, and floating point at a high level

# Fixed point

Move the "binary point" (it's not a decimal point any more!) forward

Thought experiment: storing cents instead of dollars

# Same idea

In decimal, our columns are:

$10^3 10^2 10^1 10^0 . 10^{-1} 10^{-2}$

In binary

$2^3 2^2 2^1 2^0 . 2^{-1} 2^{-2}$

# notably

$2^{-1} = 0.5_{10}$

$2^{-2} = 0.25_{10}$

# So....

$0000\:01.1_2$ is $1.5_{10}$

# Line up the binary point

<aside class="notes">
do it
</aside>

To do math, we do it the same way we'd do decimal.

Line up the point, and ... just do the math normally

# Problems

This takes a lot of space!

Consider (in base 10) 

$42x10^{100} + 82 x 10^{-100}$

We'd need 200 digits do do this! (So, even worse in binary)

# Floating point

New idea.... did you see that scientific notation? Let's do that!

# What would that look like in... a few bits?

From MSB to LSB

* 1 bit sign
* 8 bit exponent
* 23 bit "mantissa" (the number)

# Roughly

1.[mantissa] x 2^exponent-127^ is calculated

..... with some special cases.

# No, I'm not going to calculate one

But what interesting features does it have?

# What problems did we have before?

How many 0s do we have?

$0000\:0000_{16} = 0$ ... ok!

[$1000\:0000_{16} = -0$ ... dang!]{.fragment}

# Other special cases

* exponent 255 (max) and mantissa != 0... NaN
* exponent 255 and mantissa == 0 *and* sign bit 0... +inf
* exponent 255 and mantissa == 0 *and* sign bit 1... -inf

# Math on floating point

Woooweee.

In circuits, some neat math that's possible, but it's never trivial.

We (humans) would likely move to fixed point, normalizing them.

# Summary

Fractional numbers add more complexity! But we have solutions that we've seen before.

# References

[IEEE 754](https://ieeexplore.ieee.org/document/8766229)

[32 bit floating point on Wikipedia (well done page!)](https://en.wikipedia.org/wiki/Single-precision_floating-point_format)

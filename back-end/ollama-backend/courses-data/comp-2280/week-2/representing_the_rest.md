% 2280
% Other data representation

# Today

Other things we need to represent in binary

Letters, and media!

# How do we represent letters?

ASCII! aka American Standard Code for Information Interchange

[What does it look like?](https://www.asciitable.com/)

# You may have seen it?

<aside class="notes">
</aside>

`char` types are *just numbers*, and we can even do math on numbers/chars

This is why `myChar >= 'a' && myChar <= 'z'` works!

# What was the max number there?

`127`.... which is 7 bits `0b111 1111`

# But wait, there's more

[Unicode](https://symbl.cc/en/unicode-table/)
gives us access to other language support

16 bit representation, allowing for *shapes* more than *characters*

# Compatibility?

The first 127 values (7 bit numbers) map to the ASCII values.

# What's an image?

There's actually a lot of variety!

Generally a 2D array of colour codes!

# Wait...

<aside class="notes">
Doodle flattening a 2D array
</aside>

We do we have 2D arrays? What *is* that?

How do we represent that?

# So now we have a 2D array, what's a colour

RGB? Greyscale? Usually an array of 8 bit colours

(Compression and stuff happens in some image types! Interlacing - that's deeper, let's keep it easy)

# Sound?

What *is* sound?

[Wave forms]{.fragment}

# So...

Sound is a bunch of fixed points that describe a wave form at a "bit rate" (which is ... our resolution)

[Of course there are many encodings...]{.fragment}

# Summary

We have seen how to represent letters (in a few ways!) and
some ideas on how to represent images/video/audio

# Crazy bonus reading

Unicode supports [Ogham](https://en.wikipedia.org/wiki/Ogham)
which is "notches in a stone" language. [Amazing](https://en.wikipedia.org/wiki/Ogham_(Unicode_block))

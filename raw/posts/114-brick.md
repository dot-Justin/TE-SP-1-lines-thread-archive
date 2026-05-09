# Post #114

**Author:** brick  
**Date:** 2025-01-12T23:21:40.371Z  
**Post ID:** 735475  

---

<p>Taking a cursory scroll through the file…</p>
<p>Hm, interesting. I’m not really sure what i’m looking at, and i don’t know a ton about USB protocol, but there is a good section of commands in there that are successful and return arrays. The vast majority of the commands sent are returning a pipe error, which is probably worth tossing out. A handful of them are returning i/o errors, and a good  section of them are successful and returning.. arrays? not sure how that works.<br>
there’s a big chunk of commands that work between</p>
<blockquote>
<p>bmRequestType: 0x80, bRequest: 0x08, wValue: 0x00, wIndex: 0x00,<br>
bmRequestType: 0x80, bRequest: 0x08, wValue: 0xf0, wIndex: 0xf0,</p>
</blockquote>
<p>? not sure what this means.<br>
in addition, there’s a giant block that returns “Invalid parameter” punctuated by one pipe error and an entity not found between</p>
<blockquote>
<p>bmRequestType: 0x81, bRequest: 0x00, wValue: 0x00, wIndex: 0x00,<br>
bmRequestType: 0x81, bRequest: 0x0f, wValue: 0xf0, wIndex: 0xf0,</p>
</blockquote>
<p>Everything past that has a pattern of seven I/O errors, and then one pipe error.<br>
Not entirely sure what to make of this, but there are some interesting patterns in here that probably mean something to someone.</p>
<hr>
<aside class="quote no-group" data-username="Virtual_Flannel" data-post="112" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/virtual_flannel/48/14270_2.png" class="avatar"> Virtual_Flannel:</div>
<blockquote>
<p>Was jamming with the PO sync out the other day and realized the audio file must be a 5 track multitrack file with the sync track embedded on the fifth track. I don’t imagine the unit would have the built-in capability to detect tempo of manually added files.</p>
</blockquote>
</aside>
<p>This is a good instinct, but i’m not sure if that’s entirely the case. Some of the later revisions’ manuals indicate that the sync can actually output MIDI over the TRS. perhaps a custom file format? there’s no way that they’re building in a conversion between a 5th click track into midi data on the chip, right? when i get mine, i’ll see if the midi is compatible with my KO2.</p>

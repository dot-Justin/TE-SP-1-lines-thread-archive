# Post #320

**Author:** Duloz  
**Date:** 2025-03-07T01:42:36.160Z  
**Post ID:** 743351  

---

<aside class="quote no-group" data-username="JoseJX" data-post="316" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/j/b782af/48.png" class="avatar"> JoseJX:</div>
<blockquote>
<p><a class="mention" href="/u/duloz">@Duloz</a> I’m curious as to what kind of checks you’re looking at. Are you tracing execution from startup? Or are you just looking at random functions that you’re decompiling? Different tools may see different functions, but it all might just be data as well. Are there signs of functions that would change the USB mode?</p>
</blockquote>
</aside>
<p>In the pseudo C code, there are checks on privilege mode throughout many functions. All point to r3 in terms of the pre pseudo-c decompilation . Tracing all of the sources, they seem to be pointing to the ram sector, so looking for dynamic values.</p>
<p>At the end of the line, r3 is compared to zero, another factor is compared to zero, and a third is compared to eight. This was the last function that i tracked down before going after a different thread. that final function enables irq interrupts.</p>
<p>i then noticed that there were a large number of empty records in the decompiled code followed by many that failed to decompile. I am most curious as to whether this has anything of interest, or if it is just junk</p>

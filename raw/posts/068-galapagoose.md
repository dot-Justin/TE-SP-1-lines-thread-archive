# Post #68

**Author:** Galapagoose  
**Date:** 2025-01-09T07:42:11.815Z  
**Post ID:** 734773  

---

<p>did a little snooping just with voltage &amp; continuity, and a little layered illustrator. came up with this.</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/5/0/506c00920763a7eab4dffe9da8b5c86cbf6801a1.jpeg" data-download-href="https://llllllll.co/uploads/default/506c00920763a7eab4dffe9da8b5c86cbf6801a1" title="te-stem-rev1"><img src="https://llllllll.co/uploads/default/optimized/3X/5/0/506c00920763a7eab4dffe9da8b5c86cbf6801a1_2_361x500.jpeg" alt="te-stem-rev1" data-base62-sha1="btrAF7wG3p874YglExoODq4ArU5" width="361" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/5/0/506c00920763a7eab4dffe9da8b5c86cbf6801a1_2_361x500.jpeg, https://llllllll.co/uploads/default/optimized/3X/5/0/506c00920763a7eab4dffe9da8b5c86cbf6801a1_2_541x750.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/5/0/506c00920763a7eab4dffe9da8b5c86cbf6801a1_2_722x1000.jpeg 2x" data-dominant-color="6B737E"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">te-stem-rev1</span><span class="informations">946×1309 149 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>i think it looks like it is the standard 10pin hookup, though i can’t trace the <code>nRESET</code> signal. it would make sense for these to be the SWD interface with the 3 test points exposed for automated firmware loading. your readings make sense to me, ie. SWDIO rests at +3v3, and SWDCLK rests at 0v (at least in this case). some chips allow you to use these pins as GPIO after boot though - not sure if that’s the case with this family.</p>
<p>i noted the DEC1 &amp; DEC4 pins mentioned in the APPROTECT page above in case we go that route. these are <em>not</em> confirmed, just guesses from the illustrator mockup. would need to measure voltages before trying any attack to confirm the correct attachments. thankfully the other options are immediately close by, so it should be easy to tell. the USB lines are noted as well for no good reason, other than i was having fun with the datasheet.</p>
<p>PLEASE NOTE: the image is reversed for the header (it’s shown from the perspective of the chip-side of the board.</p>
<p>too late for the soldering iron, so debugger connection will have to wait til tomorrow or friday eve if noone beats me to it.</p>

# Post #66

**Author:** Galapagoose  
**Date:** 2025-01-09T05:56:07.991Z  
**Post ID:** 734765  

---

<p>just received mine &amp; am shocked at just how incredibly tiny this thing is. i was expecting TX6 size (which is already tiny) and it’s less than half that size?! truly wild.</p>
<p>was looking at the pcb photos of the debug header &amp; guessed similar to your findings. i’m surprised at the last pin having continuity with 3v3 though. was hoping it was a standard arm 10pin interface:<br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/a/7/a7fd0ccf7dae647d1fa18f3d6e03cecd1f2a0cf6.jpeg" data-download-href="https://llllllll.co/uploads/default/a7fd0ccf7dae647d1fa18f3d6e03cecd1f2a0cf6" title="arm-jtag"><img src="https://llllllll.co/uploads/default/original/3X/a/7/a7fd0ccf7dae647d1fa18f3d6e03cecd1f2a0cf6.jpeg" alt="arm-jtag" data-base62-sha1="nY5TtwxTFmAACx9kJiBvh2yLk6a" width="437" height="321"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">arm-jtag</span><span class="informations">437×321 22.8 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>if the header was only setup for SWD, then i think RTCK being grounded, and TDO/TDI being N/C would make sense. but that last pin really needs to be a signal pin for my hypothesis to work out.</p>
<p>still charging on the bench but hope to dig in more soon.</p>

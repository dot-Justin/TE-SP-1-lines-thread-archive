# Post #127

**Author:** Galapagoose  
**Date:** 2025-01-14T19:56:49.082Z  
**Post ID:** 735811  

---

<p>did a little scoping. i won’t have my jlink for at least a week, so doing what i can!</p>
<p>marked all the decoupling caps. they’re mostly +3v3 (the main supply for the chip), then a few at +1v3 (the on-board LDO outputs) and a single CPU core voltage at +1v14 – note this looks like they’re running the core at a higher voltage than the datasheet suggests probably because they are overclocking the chip to get enough performance.</p>
<p>the DECx caps are marked. i’m very confident of the 1,4 &amp; 6 (which are all that’s needed for the APPROTECT hack) and the others are guesses based on the chip pinout, though they shouldn’t matter.</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/1/8/18f8d572b643ff1db7aee71ab1b4c77217649b7b.jpeg" data-download-href="https://llllllll.co/uploads/default/18f8d572b643ff1db7aee71ab1b4c77217649b7b" title="decoupling-map"><img src="https://llllllll.co/uploads/default/optimized/3X/1/8/18f8d572b643ff1db7aee71ab1b4c77217649b7b_2_690x496.jpeg" alt="decoupling-map" data-base62-sha1="3yUA9R4ksxMGFcGbJaHjwqI6pCj" width="690" height="496" srcset="https://llllllll.co/uploads/default/optimized/3X/1/8/18f8d572b643ff1db7aee71ab1b4c77217649b7b_2_690x496.jpeg, https://llllllll.co/uploads/default/optimized/3X/1/8/18f8d572b643ff1db7aee71ab1b4c77217649b7b_2_1035x744.jpeg 1.5x, https://llllllll.co/uploads/default/original/3X/1/8/18f8d572b643ff1db7aee71ab1b4c77217649b7b.jpeg 2x" data-dominant-color="534440"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">decoupling-map</span><span class="informations">1104×794 165 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>

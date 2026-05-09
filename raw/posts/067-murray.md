# Post #67

**Author:** murray  
**Date:** 2025-01-09T06:14:23.639Z  
**Post ID:** 734768  

---

<aside class="quote no-group" data-username="Galapagoose" data-post="66" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/galapagoose/48/13_2.png" class="avatar"> Galapagoose:</div>
<blockquote>
<p>if the header was only setup for SWD, then i think RTCK being grounded, and TDO/TDI being N/C would make sense. but that last pin really needs to be a signal pin for my hypothesis to work out.</p>
</blockquote>
</aside>
<p>right there with you–i was pretty deflated to find 3.3V on that pin. it might be useful to eyeball the traces coming from the nordicsemi chip to get an idea where the debug pins might be exposed, but might be faster to simply go from pin to pin with a debugger guessing and checking combinations (and probably testing with a dmm to avoid frying the debugger). i’m pretty sure the debug pins are on the bottom right of the chip, but haven’t confirmed the correct footprint:</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/b/8/b8531cd292d75753fe1a884360cb9c1a92934469.jpeg" data-download-href="https://llllllll.co/uploads/default/b8531cd292d75753fe1a884360cb9c1a92934469" title="Screenshot 2025-01-08 at 10.13.31 PM"><img src="https://llllllll.co/uploads/default/optimized/3X/b/8/b8531cd292d75753fe1a884360cb9c1a92934469_2_634x500.jpeg" alt="Screenshot 2025-01-08 at 10.13.31 PM" data-base62-sha1="qiBVbWnnBQRTkiujE45D1sgS4Ah" width="634" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/b/8/b8531cd292d75753fe1a884360cb9c1a92934469_2_634x500.jpeg, https://llllllll.co/uploads/default/optimized/3X/b/8/b8531cd292d75753fe1a884360cb9c1a92934469_2_951x750.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/b/8/b8531cd292d75753fe1a884360cb9c1a92934469_2_1268x1000.jpeg 2x" data-dominant-color="F7F7F7"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">Screenshot 2025-01-08 at 10.13.31 PM</span><span class="informations">1530×1206 101 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div><br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/2/4/241f27d8acfc246abd5450cac005c4bc3b615ee1.jpeg" data-download-href="https://llllllll.co/uploads/default/241f27d8acfc246abd5450cac005c4bc3b615ee1" title="Screenshot 2025-01-08 at 10.13.55 PM"><img src="https://llllllll.co/uploads/default/optimized/3X/2/4/241f27d8acfc246abd5450cac005c4bc3b615ee1_2_690x241.jpeg" alt="Screenshot 2025-01-08 at 10.13.55 PM" data-base62-sha1="59xWfQYJ0G8A6AvndC0Oh5LFamt" width="690" height="241" srcset="https://llllllll.co/uploads/default/optimized/3X/2/4/241f27d8acfc246abd5450cac005c4bc3b615ee1_2_690x241.jpeg, https://llllllll.co/uploads/default/optimized/3X/2/4/241f27d8acfc246abd5450cac005c4bc3b615ee1_2_1035x361.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/2/4/241f27d8acfc246abd5450cac005c4bc3b615ee1_2_1380x482.jpeg 2x" data-dominant-color="EEEEEE"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">Screenshot 2025-01-08 at 10.13.55 PM</span><span class="informations">1712×598 78.4 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>

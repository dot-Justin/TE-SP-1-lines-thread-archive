# Post #549

**Author:** TimK  
**Date:** 2026-01-22T11:36:10.731Z  
**Post ID:** 780450  

---

<aside class="quote no-group" data-username="Galapagoose" data-post="546" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/galapagoose/48/13_2.png" class="avatar"> Galapagoose:</div>
<blockquote>
<p>Perhaps it’s already widely known, but unless I’m mistaken, you’re going to need an SWD programmer to change the firmware on these things, and perhaps do some soldering to attach it.</p>
</blockquote>
</aside>
<p>I too hope this isn’t all the way true. Soldering a header makes it impossible to put the device back together. (As is the case with my current dev unit)</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/8/0/8009f3c9618e45384221fec352c0c780fffc9ff7.jpeg" data-download-href="https://llllllll.co/uploads/default/8009f3c9618e45384221fec352c0c780fffc9ff7" title="TE-SP0_with_SWD_header_web"><img src="https://llllllll.co/uploads/default/optimized/3X/8/0/8009f3c9618e45384221fec352c0c780fffc9ff7_2_666x500.jpeg" alt="TE-SP0_with_SWD_header_web" data-base62-sha1="igGrd94NxDAn2x4NXc7p98v4Tzh" width="666" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/8/0/8009f3c9618e45384221fec352c0c780fffc9ff7_2_666x500.jpeg, https://llllllll.co/uploads/default/optimized/3X/8/0/8009f3c9618e45384221fec352c0c780fffc9ff7_2_999x750.jpeg 1.5x, https://llllllll.co/uploads/default/original/3X/8/0/8009f3c9618e45384221fec352c0c780fffc9ff7.jpeg 2x" data-dominant-color="7D7F79"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">TE-SP0_with_SWD_header_web</span><span class="informations">1000×750 174 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>This right here doesn’t fit in the tiny stem player enclosure!</p>
<p>To avoid soldering, we can program a bootloader using a pogo pin connector or even just 3 jumper wires and steady hands. I have done this before when I forgot the right connector and urgently needed to update firmware on a prototype. <img src="https://llllllll.co/images/emoji/apple/face_with_spiral_eyes.png?v=15" title=":face_with_spiral_eyes:" class="emoji" alt=":face_with_spiral_eyes:" loading="lazy" width="20" height="20"> It’s not fun, but it’s possible and it would only need to work once.</p>
<p>You do need a debugger for this (I use the nRF52840-DK) and you need to completely open up the device since the only access to SWD is at the back of the main PCB.</p>
<p>After a bootloader has been installed (and the TE firmware has been wiped), the device can be closed up again and firmware updates can happen via USB.</p>

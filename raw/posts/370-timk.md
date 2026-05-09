# Post #370

**Author:** TimK  
**Date:** 2025-05-08T11:41:29.811Z  
**Post ID:** 751267  

---

<p>Unfortunately, it’s not that simple. I develop firmware for nRF52840, but I’ve never hacked into other people’s work.</p>
<p>This thread is quite an amazing read with a crazy mix of some very good info and some wild wild speculation (and some classic chatGPT nonsense). I must say that even the wild speculation from people without a firmware or EE background can be valuable for bringing new ideas to the table!</p>
<ol>
<li>
<p>Ikea’s speaker has a completely different chipset. That means it’s irrelevant for this device. We already know from the research done that the firmware is “locked” (APPROTECT enabled), hence the glitching attack. So no, this device is not accessible.</p>
</li>
<li>
<p>OP1repacker is a very cool project, and could definitely be inspiring, but again, made for a very different device. OP-1 runs on an Analog Devices blackfin, which is not even ARM based. (nRF52840 is ARM M4)</p>
</li>
</ol>
<p>I believe our best bet is that <a class="mention" href="/u/elew">@elew</a> and <a class="mention" href="/u/murray">@murray</a> continue the amazing work they’ve already been doing. (So fun to follow!)<br>
I also have a small child, so I understand the predicament, but I do hope the people here doing such great work can continue someday! I will be here to read it all when they do.</p>

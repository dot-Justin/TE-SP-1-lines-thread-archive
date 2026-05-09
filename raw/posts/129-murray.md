# Post #129

**Author:** murray  
**Date:** 2025-01-15T00:03:02.980Z  
**Post ID:** 735866  

---

<aside class="quote no-group" data-username="brick" data-post="128" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/brick/48/70721_2.png" class="avatar"> brick:</div>
<blockquote>
<p>got an email! my stem player should be at my door on friday, can’t wait!<br>
also, I finally got around to taking a look at the APPROTECT bypass writeups; I’m not entirely sure what’s going on there exactly: i do understand that there seems to be some hardware system to load the APPROTECT status value into the access port peripherals, and that they inject a pulse into a power line during some period of the startup sequence to… i’m not sure what. bypass the value load? force a chip reset?</p>
</blockquote>
</aside>
<p>it’s disturbing the cpu at the precise time that it attempts to load the APPROTECT value from flash memory via the memory controller without fully interrupting the boot process.</p>
<aside class="quote no-group" data-username="brick" data-post="128" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/brick/48/70721_2.png" class="avatar"> brick:</div>
<blockquote>
<p>more importantly, what i gather is that the chip’s firmware can be cleared and flashed with new data <em>even with APPROTECT on.</em> so only <em>one</em> person needs to perform the bypass and dump the firmware. then once that firmware is shared, the rest of us can clear and reflash the chip with APPROTECT off, using just the jlink debugger and no hardware bypass giving us room to work! we should be able to make considerable headway once the bypass is performed and firmware is dumped.</p>
</blockquote>
</aside>
<p>yes, that’s right!<br>
<a class="mention" href="/u/tyler">@Tyler</a> mentioned this possibility in an earlier post, too.</p>
<aside class="quote no-group" data-username="Tyler" data-post="48" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/tyler/48/22901_2.png" class="avatar"> Tyler:</div>
<blockquote>
<p>Fingers crossed APPROTECT is disabled, because that would allow us to analyze the binary and potentially inject partial custom code. I think even if it is enabled though, building a new firmware from scratch should always be a possibility. There should be a mass_erase type command through OpenOCD or an nRF toolchain. Would be hard to get started on that without first working out a schematic though.</p>
</blockquote>
</aside>
<p>–</p>
<p>double confirming that APPROTECT is enabled.</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/d/2/d2ce6748acbe41da3e6435f5f807b517f59f19e6.jpeg" data-download-href="https://llllllll.co/uploads/default/d2ce6748acbe41da3e6435f5f807b517f59f19e6" title="20250114_172411"><img src="https://llllllll.co/uploads/default/optimized/3X/d/2/d2ce6748acbe41da3e6435f5f807b517f59f19e6_2_666x500.jpeg" alt="20250114_172411" data-base62-sha1="u4Su8LFYQh3Cvw6vl2UrfByu0Bw" width="666" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/d/2/d2ce6748acbe41da3e6435f5f807b517f59f19e6_2_666x500.jpeg, https://llllllll.co/uploads/default/optimized/3X/d/2/d2ce6748acbe41da3e6435f5f807b517f59f19e6_2_999x750.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/d/2/d2ce6748acbe41da3e6435f5f807b517f59f19e6_2_1332x1000.jpeg 2x" data-dominant-color="5A565F"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">20250114_172411</span><span class="informations">1920×1440 208 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/e/f/efe6295a5516edeb2da7572cd07300381ec4e4f6.png" data-download-href="https://llllllll.co/uploads/default/efe6295a5516edeb2da7572cd07300381ec4e4f6" title="screenshot"><img src="https://llllllll.co/uploads/default/original/3X/e/f/efe6295a5516edeb2da7572cd07300381ec4e4f6.png" alt="screenshot" data-base62-sha1="yefewszmAW77lRTdb1hyPqCXqDk" width="690" height="283" data-dominant-color="050606"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">screenshot</span><span class="informations">1721×706 7.56 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>found my beaglebone black (it has PRU onboard) and going to go ahead and configure it as a fault injector like described in the above links.</p>

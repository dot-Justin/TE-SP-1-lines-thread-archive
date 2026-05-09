# Post #130

**Author:** brick  
**Date:** 2025-01-15T01:31:16.614Z  
**Post ID:** 735893  

---

<aside class="quote no-group" data-username="murray" data-post="129" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/murray/48/64912_2.png" class="avatar"> murray:</div>
<blockquote>
<p>at the precise time that it attempts to load the APPROTECT value</p>
</blockquote>
</aside>
<p>someone asked how he figured out exactly where to inject the fault, and they said</p>
<blockquote>
<p>" Analysis, methodology and experience (I do that since long time…)".</p>
</blockquote>
<p>mans literally  pulled an “it came to me in a dream”</p>
<hr>
<aside class="quote no-group quote-modified" data-username="murray" data-post="129" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/murray/48/64912_2.png" class="avatar"> murray:</div>
<blockquote>
<p><a class="mention" href="/u/tyler">@Tyler</a> mentioned this possibility in an earlier post, too.</p>
<aside class="quote no-group quote-modified" data-username="Tyler" data-post="48" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/tyler/48/22901_2.png" class="avatar"> Tyler:</div>
<blockquote>
<p>[…] There should be a mass_erase type command through OpenOCD or an nRF toolchain. […]</p>
</blockquote>
</aside>
</blockquote>
</aside>
<p>browsing through the writeup shows this at the end of part 1:<br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/e/d/edb62ef8efba63e29a8d3a62fb2192600e273249.png" data-download-href="https://llllllll.co/uploads/default/edb62ef8efba63e29a8d3a62fb2192600e273249" title="image"><img src="https://llllllll.co/uploads/default/optimized/3X/e/d/edb62ef8efba63e29a8d3a62fb2192600e273249_2_517x164.png" alt="image" data-base62-sha1="xUTubjDeAnIIL6myZMoX5xgfec1" width="517" height="164" srcset="https://llllllll.co/uploads/default/optimized/3X/e/d/edb62ef8efba63e29a8d3a62fb2192600e273249_2_517x164.png, https://llllllll.co/uploads/default/optimized/3X/e/d/edb62ef8efba63e29a8d3a62fb2192600e273249_2_775x246.png 1.5x, https://llllllll.co/uploads/default/optimized/3X/e/d/edb62ef8efba63e29a8d3a62fb2192600e273249_2_1034x328.png 2x" data-dominant-color="F4F4F4"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">image</span><span class="informations">1490×474 36.1 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>which tells us the exact command we’d need!</p>
<p>that said, one of the comments indicates it should be possible to dump, clear, and reflash the UICR specifically while altering the APPROTECT value, while leaving the actual flash progmem intact:<br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/1/3/13f8b75bfb0c0a205858f9d2ab417a939108756b.png" data-download-href="https://llllllll.co/uploads/default/13f8b75bfb0c0a205858f9d2ab417a939108756b" title="image"><img src="https://llllllll.co/uploads/default/optimized/3X/1/3/13f8b75bfb0c0a205858f9d2ab417a939108756b_2_517x300.png" alt="image" data-base62-sha1="2QFWwTkMRiTLQX8q0jmYX1EEq4H" width="517" height="300" srcset="https://llllllll.co/uploads/default/optimized/3X/1/3/13f8b75bfb0c0a205858f9d2ab417a939108756b_2_517x300.png, https://llllllll.co/uploads/default/optimized/3X/1/3/13f8b75bfb0c0a205858f9d2ab417a939108756b_2_775x450.png 1.5x, https://llllllll.co/uploads/default/optimized/3X/1/3/13f8b75bfb0c0a205858f9d2ab417a939108756b_2_1034x600.png 2x" data-dominant-color="FAFAFA"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">image</span><span class="informations">1550×900 63.7 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>which nicely enough also gives us the other command as well.</p>
<p>i know we still want to dump the flash for firmware reverse engineering purposes, but doing it this way should leave less room for bricking the device, which is always nice especially for people who only have one [me <img src="https://llllllll.co/images/emoji/apple/dotted_line_face.png?v=15" title=":dotted_line_face:" class="emoji" alt=":dotted_line_face:" loading="lazy" width="20" height="20">].</p>
<hr>
<aside class="quote no-group" data-username="murray" data-post="129" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/murray/48/64912_2.png" class="avatar"> murray:</div>
<blockquote>
<p>found my beaglebone black</p>
</blockquote>
</aside>
<p>nice. i was at microcenter earlier to grab some hdmi cables and  thought i’d go see if they have a beaglebone i could grab while i was there. they do not stock any beaglebones <img src="https://llllllll.co/images/emoji/apple/sob.png?v=15" title=":sob:" class="emoji" alt=":sob:" loading="lazy" width="20" height="20"></p>
<hr>
<p>edit: update. found the exact bit where explains how to clear all with both openOCD and the nRF toolchain:<br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/9/1/9104173320ac4a3dbe17236d3bc518fc04a72c14.png" data-download-href="https://llllllll.co/uploads/default/9104173320ac4a3dbe17236d3bc518fc04a72c14" title="image"><img src="https://llllllll.co/uploads/default/optimized/3X/9/1/9104173320ac4a3dbe17236d3bc518fc04a72c14_2_517x285.png" alt="image" data-base62-sha1="kGRZPLbAZcT2uzq0iv6mVbpARVy" width="517" height="285" srcset="https://llllllll.co/uploads/default/optimized/3X/9/1/9104173320ac4a3dbe17236d3bc518fc04a72c14_2_517x285.png, https://llllllll.co/uploads/default/optimized/3X/9/1/9104173320ac4a3dbe17236d3bc518fc04a72c14_2_775x427.png 1.5x, https://llllllll.co/uploads/default/optimized/3X/9/1/9104173320ac4a3dbe17236d3bc518fc04a72c14_2_1034x570.png 2x" data-dominant-color="F2F2F2"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">image</span><span class="informations">1284×708 33.5 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>

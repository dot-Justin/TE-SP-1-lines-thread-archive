# Post #646

**Author:** TimK  
**Date:** 2026-02-13T21:53:12.277Z  
**Post ID:** 783158  

---

<aside class="quote no-group" data-username="pdrgf" data-post="641" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/p/779978/48.png" class="avatar"> pdrgf:</div>
<blockquote>
<p><a class="mention" href="/u/lzma">@lzma</a> keen to hear how getting a dump goes if you do attempt it! I’d imagine people being able to easily restore the stock firmware alone would massively help with people working on it. (this is assuming a dump can be relatively easily reflashed)</p>
</blockquote>
</aside>
<p>A clean dump should be easy to flash. Once APPROTECT is unset, flashing any binary is a piece of cake. Setting APPROTECT again after flashing is very easy too.</p>
<p>As far as I know, nobody has been able to get an uncorrupted dump by doing the Limited Results voltage glitch on the original stem player PCB. I have done the voltage glitch successfully many, many times on other hardware, but was never successful on the actual stem player PCB.</p>
<p>I don’t think anyone has tried to voltage glitch with a transplanted chip yet, meaning putting it on eg. the nRF52840 dongle, which was super easy to glitch in my experience. If you do want to get to the original firmware, I suggest going this route. Transplanting will not be easy because this chip is semi BGA. (I didn’t have the balls to do it with mine <img src="https://llllllll.co/images/emoji/apple/face_with_peeking_eye.png?v=15" title=":face_with_peeking_eye:" class="emoji" alt=":face_with_peeking_eye:" loading="lazy" width="20" height="20">)</p>
<p>And finally yes, being able to restore the original firmware would be a huge deal!</p>
<aside class="quote no-group" data-username="lzma" data-post="640" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/lzma/48/113178_2.png" class="avatar"> lzma:</div>
<blockquote>
<p>Hardware hacking is not my forte and the glitching attack to bypass APPROTECT was incredible. I might try and reproduce that with my unit so I can have a dump to begin reverse engineering.</p>
</blockquote>
</aside>
<p>If you’re successful I would not mind a copy of that binary. I could verify it on my dev unit in 2 seconds. <img src="https://llllllll.co/images/emoji/apple/smiling_face_with_sunglasses.png?v=15" title=":smiling_face_with_sunglasses:" class="emoji" alt=":smiling_face_with_sunglasses:" loading="lazy" width="20" height="20"></p>

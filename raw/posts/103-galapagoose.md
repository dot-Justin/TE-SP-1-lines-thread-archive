# Post #103

**Author:** Galapagoose  
**Date:** 2025-01-12T01:03:35.468Z  
**Post ID:** 735325  

---

<aside class="quote no-group" data-username="Duloz" data-post="101" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/duloz/48/102833_2.png" class="avatar"> Duloz:</div>
<blockquote>
<p>There is a chip labeled made by TI that I can’t identify between the SoC and the usb port, likely handling power in.</p>
</blockquote>
</aside>
<p>agreed. looks like a pretty standard battery charger <s>/ switch mode power regulator</s>. would handle dynamic switching between battery and usb power &amp; typically connects to the uC with i2c (this is how the device can light side buttons indicating battery charge level).</p>
<p>regarding “2 antennas” above, im not sure what the 2nd is. the unit with linked datasheet would be acting as an external antenna attached directly to the uC.</p>
<p>next to the antenna is the speaker (i assume, never seen one that looks like this) which makes sense with power amp chip on the opposite side of the board.</p>
<p>going to do a little further investigation of the test points this evening. will try and write up my findings.</p>
<p>also, why dont we all post the things we’ve tried as we do them so we’re not repeating work. things that <em>dont</em> work are quite useful to know, and of course you can note if you felt like there was more to be explored but you didnt know what to do (a common experience for me).</p>

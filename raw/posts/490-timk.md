# Post #490

**Author:** TimK  
**Date:** 2026-01-07T09:33:48.703Z  
**Post ID:** 778337  

---

<aside class="quote no-group" data-username="Rubyodingus" data-post="489" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/r/65b543/48.png" class="avatar"> Rubyodingus:</div>
<blockquote>
<p>I cannot find any internal photos of the EP-2350 (ting), This might be dumb, but I wonder if it shares anything with the stem player.</p>
</blockquote>
</aside>
<p>Look for a teardown of EP-133, I’m expecting to see very similar hardware in EP-2350 if not identical. EP-133 shares nothing with the stem player as far as I can tell. The main MCU of the stem player would be way underpowered for that type of device. <em>EDIT: oops I misunderstood and thought you were talking about EP-40!</em></p>
<aside class="quote no-group" data-username="unfound_accident" data-post="487" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/unfound_accident/48/111978_2.png" class="avatar"> unfound_accident:</div>
<blockquote>
<p>Hey, thanks for your great work! I am planning on doing what Ben described and just make the pcb from scratch as a hobby project (not planning to add any high end audio fx features for now, just turning the thing into a usable portable music player first). Could you also DM me the pinout/PCB knowledge you have got so far? would save me some time to focus on PCB design!</p>
</blockquote>
</aside>
<p>Absolutely! I’ll dm you. But don’t expect too much. All the information I have collected relates to building new firmware for this specific hardware. For example, I didn’t bother at all with documenting (passive) component values, understanding trace impedance, etc… I didn’t even draw a full schematic, only the bare minimum needed for working on the firmware.</p>
<p>Secondly, this design is pretty space constrained. If you want to keep all functionality and mechanical hardware this is going to be a decent project. I would looove to know how much work Teenage Engineering actually put into this abandoned project. To me, starting the hardware AND firmware from scratch for an unpaid project like this is just way too much work.</p>
<p>The current hardware is perfectly capable of being a portable music player. For regular audio, you could probably just do 2 channels /16 bit / 44.1 kHz instead of 8 channels / 24bit / 48 kHz. That would make transfer times over USB not great, but much more reasonable. (6.5x faster)</p>
<p>best,<br>
Tim</p>

# Post #317

**Author:** murray  
**Date:** 2025-03-06T21:54:58.409Z  
**Post ID:** 743334  

---

<aside class="quote no-group" data-username="JoseJX" data-post="316" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/j/b782af/48.png" class="avatar"> JoseJX:</div>
<blockquote>
<p><a class="mention" href="/u/murray">@murray</a> I was thinking that perhaps a way to determine how the communication is being done would be to try to snoop P0.08/P0.06 (CMD, CLK) and confirm on the data lines (which do have test points). The protocol itself isn’t that complicated, so bit banging it wouldn’t be unreasonable, but the overhead would be high. It does appear that the eMMC is directly connected to the processor, so it doesn’t look like there’s another flash controller or anything.</p>
</blockquote>
</aside>
<p>thanks for confirming that the emmc is hooked directly up to the processor! and very likely using some kind of bitbanging driver. i’m under a heavy suspicion that my firmware dump isn’t complete–on several of the peripherals there appears to be a suspicious lack of register assignments/references (for example, on the I2S peripheral only TASKS_START and TASKS_STOP are assigned which can’t be right) and in general i find that the code size is just simply a whole lot smaller than i’d expect. additionally on subsequent successful glitches of my instrumented board, the dumps are very obviously wrong and i’m suspecting a hardware issue.</p>
<p>i’ve setup the stem player that <a class="mention" href="/u/duloz">@Duloz</a> sent to me on my test jig and can confirm much better/predictable power behavior of DEC1 and DEC4 after capacitor removal. but i am running into troubles shorting DEC1 and suspect there is still some capacitance on that power line that i need to figure out, i would really like to avoid running into the same position i ended up in last month and want to skip removing DEC6’s capacitor if possible:</p>
<aside class="quote no-group" data-username="murray" data-post="167" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/murray/48/64912_2.png" class="avatar"> murray:</div>
<blockquote>
<p>oh and by the way a <strong>WARNING</strong>:<br>
if you want to continue using your stem player as-is, <strong>DO NOT</strong> remove decoupling capacitor DEC6 from your board. DEC1 and DEC4’s removal kept my device functional, but after removing DEC6 my stem player has all but stopped functioning and the only way that i know my cpu is (might be?) still working is the response from <code>openocd</code> letting me know that APPROTECT is enabled and that it can’t bring up a debugger.</p>
</blockquote>
</aside>
<p>once i’m confident of my dump, i’ll look into emmc-specific handling and instrumenting p0.08 and p0.06–the jumper wires hooked up to my stem player prevents me from hooking it up to the physical controls to trigger playback and thus possible traffic on p0’s cmd and clk.</p>
<aside class="quote no-group" data-username="JoseJX" data-post="316" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/j/b782af/48.png" class="avatar"> JoseJX:</div>
<blockquote>
<p><a class="mention" href="/u/duloz">@Duloz</a> I’m curious as to what kind of checks you’re looking at. Are you tracing execution from startup? Or are you just looking at random functions that you’re decompiling? Different tools may see different functions, but it all might just be data as well. Are there signs of functions that would change the USB mode?</p>
</blockquote>
</aside>
<p>also very curious about this! i was able to see some references to ACL’s in my dump, but this appeared to me related to peripheral memory usage.</p>
<p>if a couple weeks go by and we haven’t gleaned pin assignments or more hints from firmware dumps, i’ll offer up my original stem player board as sacrifice and start removing bga’s to brute-force create a rough schematic.</p>
<aside class="quote no-group" data-username="jaseknighter" data-post="314" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/jaseknighter/48/51189_2.png" class="avatar"> jaseknighter:</div>
<blockquote>
<p>on an ever so slightly more serious note, it occurred to me this morning that it’d be super neato if the player could be rewritten to have a mode that played music sent to it via usb or bluetooth using its built-in speaker.</p>
</blockquote>
</aside>
<p>totally–in general i think it would be a good idea to start brainstorming how folks would want to interact with this thing. sure there’s the obvious one where we preserve its current stem player functionality modified with custom user sounds. but there’s also the potential to use it and its controls as a usb midi device and a bunch of other possibilities yet to be dreamed up.</p>

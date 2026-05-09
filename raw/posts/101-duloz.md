# Post #101

**Author:** Duloz  
**Date:** 2025-01-11T22:45:31.785Z  
**Post ID:** 735302  

---

<p>Can someone confirm below:</p>
<ol>
<li>Plug Stem Player into windows computer</li>
<li>Power it on</li>
</ol>
<p>Expected Result: The computer should play the alert sound for a device being connected.</p>
<p>Approach 2:</p>
<ol>
<li>Plug Stem Player into windows computer</li>
<li>Hold the rocker in the down position (towards the faders)</li>
<li>Hold the function button down</li>
<li>Hold the play button down when all four lights between the function and play button turn on to indicate power</li>
<li>Release the function button</li>
</ol>
<p>Expected result: The Stem Player will begin playing music as soon as it powers on, but the windows alert for a new device is delayed by several seconds.</p>
<p>Edit: Updated Instructions, it is very specific.</p>
<p>Edit 2: it also will not show up running lsusb in linux during this delay.</p>
<p>Edit 3: To clarify…</p>
<aside class="quote no-group" data-username="brick" data-post="96" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/brick/48/70721_2.png" class="avatar"> brick:</div>
<blockquote>
<p>as another thought, since everyone is talking about button combos; given that the usb is tied to the SoC itself, any button combos would need to be using buttons tied to the SoC’s pins. someone who has one currently could be well served by following the button traces; any that <em>don’t</em> lead to the N52840 are guaranteed to not be included for any potential bootloader combo. if there are any that aren’t connected to the chip, it should reduce the possibility space drastically.</p>
</blockquote>
</aside>
<p>I followed the traces visible on the back to the rocker buttons, the volume buttons, and then two lines that run all the way across the top of the device and disappears under the ribbon cable, probably connected to the power cable and play button? The rest of the ribbon connections trace back to the emmc. There is a chip labeled made by TI that I can’t identify between the SoC and the usb port, likely handling power in.</p>
<p>Edit 4: google sheets document with all parts that chatGPT and I could read from the back <a href="https://docs.google.com/spreadsheets/d/1jUDMUMYHk64kJc5kIgoHwVWj_fNWHdiUgfPFLzF0ucE/edit?usp=sharing" class="inline-onebox" rel="noopener nofollow noreferrer ugc">parts list - Google Sheets</a></p>

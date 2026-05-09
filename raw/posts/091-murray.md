# Post #91

**Author:** murray  
**Date:** 2025-01-11T06:23:26.865Z  
**Post ID:** 735195  

---

<aside class="quote no-group quote-modified" data-username="Tyler" data-post="90" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/tyler/48/22901_2.png" class="avatar"> Tyler:</div>
<blockquote>
<aside class="quote no-group" data-username="Duloz" data-post="81" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/duloz/48/102833_2.png" class="avatar"> Duloz:</div>
<blockquote>
<p>I feel like there must be SOMETHING, as i noticed that if you have it plugged in, then hold the function button to power it on, the chime that windows plays when a new device is connected does not occur until you release the function button. this seems promising that it is waiting for some other event when powering on and the button is held down.</p>
</blockquote>
</aside>
<p>I think this is a noteworthy observation. It sounds like holding the function button is changing or preventing the USB mode if it chimes on release. Maybe someone can try this while monitoring the low level USB activity. Does the device still power on when the button is held like this?</p>
</blockquote>
</aside>
<p>it waits to power on and issue usb communication until released–i monitored the usb traffic on linux using <code>udevadm</code> and all i saw were a <code>add</code> and a corresponding <code>bind</code> event. forcing several types of usb storage drivers through <code>udev</code> yielded nothing for me.</p>
<aside class="quote no-group quote-modified" data-username="Tyler" data-post="90" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/tyler/48/22901_2.png" class="avatar"> Tyler:</div>
<blockquote>
<aside class="quote no-group" data-username="Galapagoose" data-post="82" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/galapagoose/48/13_2.png" class="avatar"> Galapagoose:</div>
<blockquote>
<p>how are people “turning on” the device to check for bootloader/mass storage button combos? i’m so used to having a dedicated “reset” button that im unsure how to work without one.</p>
</blockquote>
</aside>
<p>Based on the previous quote, it sounds like it’s just through holding the function button for a few seconds to go between power off/on. I think I saw the same mentioned on one of the manual pictures near the top of thread. Maybe it’s faster to remove the battery connection and then power on via USB if the circuitry allows.</p>
</blockquote>
</aside>
<p>this is what i’ve experienced, shorter press for power-on and long-press for power-off. active power provided over usb has been kind of finicky for me–i have not tried to disconnect the battery and use usb as a constant power source, but may give that a try <s>tomorrow</s> monday evening when my debugger arrives as a bonus activity.</p>

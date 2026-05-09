# Post #90

**Author:** Tyler  
**Date:** 2025-01-11T04:38:25.893Z  
**Post ID:** 735180  

---

<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/3/4/347390f55a69e10c629360ebb3a645356dd84867.png" data-download-href="https://llllllll.co/uploads/default/347390f55a69e10c629360ebb3a645356dd84867" title="Screenshot 2025-01-09 at 7.25.03 PM"><img src="https://llllllll.co/uploads/default/original/3X/3/4/347390f55a69e10c629360ebb3a645356dd84867.png" alt="Screenshot 2025-01-09 at 7.25.03 PM" data-base62-sha1="7u0qxe5tiWr4eDd3TafEUFYUb5B" width="646" height="192"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">Screenshot 2025-01-09 at 7.25.03 PM</span><span class="informations">646×192 12.5 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div><br>
It might be a while before I get to join in on the fun <img src="https://llllllll.co/images/emoji/apple/frowning.png?v=15" title=":frowning:" class="emoji" alt=":frowning:" loading="lazy" width="20" height="20"></p>
<hr>
<aside class="quote no-group" data-username="Duloz" data-post="81" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/duloz/48/102833_2.png" class="avatar"> Duloz:</div>
<blockquote>
<p>I feel like there must be SOMETHING, as i noticed that if you have it plugged in, then hold the function button to power it on, the chime that windows plays when a new device is connected does not occur until you release the function button. this seems promising that it is waiting for some other event when powering on and the button is held down.</p>
</blockquote>
</aside>
<p>I think this is a noteworthy observation. It sounds like holding the function button is changing or preventing the USB mode if it chimes on release. Maybe someone can try this while monitoring the low level USB activity. Does the device still power on when the button is held like this?</p>
<p>It’s also possible that if there is a combination, it could be using a GPIO pin not attached to any physical input, but through one of the test points on the PCB.</p>
<hr>
<aside class="quote no-group" data-username="Galapagoose" data-post="82" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/galapagoose/48/13_2.png" class="avatar"> Galapagoose:</div>
<blockquote>
<p>how are people “turning on” the device to check for bootloader/mass storage button combos? i’m so used to having a dedicated “reset” button that im unsure how to work without one.</p>
</blockquote>
</aside>
<p>Based on the previous quote, it sounds like it’s just through holding the function button for a few seconds to go between power off/on. I think I saw the same mentioned on one of the manual pictures near the top of thread. Maybe it’s faster to remove the battery connection and then power on via USB if the circuitry allows.</p>
<aside class="quote no-group quote-modified" data-username="Galapagoose" data-post="82" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/galapagoose/48/13_2.png" class="avatar"> Galapagoose:</div>
<blockquote>
<p>i looked into the usb side of things but it’s using a custom usb class (likely to include multiple different interfaces) but i dont know how to get more info about how that works. guessing it’s a copy-paste from their other devices so that should help w reversing it, but a little beyond my paygrade.</p>
<p>i actually applied for a job w them years back and they were looking for ppl with Zephyr RTOS experience, so i’m guessing that’s what’s running on here. not sure if that helps decode the usb setup, but thought I’d mention!</p>
</blockquote>
</aside>
<p>That’s an interesting tidbit, maybe we could dig around the Zephyr docs.</p>
<p><s><a href="https://github.com/zephyrproject-rtos/zephyr/releases/tag/zephyr-v2.7.0" rel="noopener nofollow noreferrer ugc">Zephyr 2.7.0</a> looks like it was a major release circa 2021-2022, but hard to say for sure what version they were <em>if</em> they were using it. There are some bluetooth audio improvements mentioned in the patch notes which might make it enticing for a device like this, but is TE a company that learns toward long term stable or cutting-edge?</s></p>
<p>I think I got the dates wrong. Did this come out in 2019?</p>
<hr>
<p>I’m really enjoying the intrigue surrounding the life, death, and resurrection of this device.</p>

# Post #632

**Author:** TimK  
**Date:** 2026-02-12T09:20:37.108Z  
**Post ID:** 783009  

---

<p>I have a very similar experience. My package has not moved since January 23 when UPS last scanned it in Ontario, CA. (I’m in Belgium.) I had already paid my customs/taxes to UPS.<br>
I did hear from others in Europe being able to receive their shipment, but this could be just a matter of being lucky with customs?</p>
<p>I’ve been on the phone with UPS multiple times, they can’t do anything. New Republic’s customer service person has been politely answering my emails, but also says she can’t access their own UPS account, so doesn’t seem to actually do anything. It’s a bit infuriating because nobody can help or even say what is going wrong. If you’re not in the US, I would not recommend ordering from them. <img src="https://llllllll.co/images/emoji/apple/frowning.png?v=15" title=":frowning:" class="emoji" alt=":frowning:" loading="lazy" width="20" height="20"><br>
Meanwhile, all my DigiKey orders shipped via UPS just keep arriving as usual.</p>
<aside class="quote no-group" data-username="pdrgf" data-post="627" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/p/779978/48.png" class="avatar"> pdrgf:</div>
<blockquote>
<p>would a basic nRF52840 board do the job for getting a grip on things before putting down more money? I’ve only ever worked with arduino and dirt cheap esp8266/esp32 boards in the past.</p>
</blockquote>
</aside>
<p>Yes and no. You can’t program an nRF52840 without either loading a bootloader first or using a programmer (J-Link). The nRF52840-DK has a J-Link programmer <em>and</em> an nRF52840 on board! It is also well documented and fully supported by Nordic. If you want to develop for the stem player hardware, I don’t see the point in getting other dev boards. (For other projects, yes nRF52840 is a great chip you can do cool stuff with, any decent dev board will do!)<br>
(If you’re an experienced embedded developer, this doesn’t apply because you could turn any MCU into your own SWD programmer, but then again you probably own a J-link already  ¯\_(ツ)_/¯ )</p>
<aside class="quote no-group" data-username="pdrgf" data-post="627" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/p/779978/48.png" class="avatar"> pdrgf:</div>
<blockquote>
<p>Looks like the entirety of TE’s recent suite of products use chips from the same range; I’m guessing that’s something to do with the communication capabilities, makes me wonder if this device was ever meant to be able to wirelessly communicate with TP-7/TX-6/etc…</p>
</blockquote>
</aside>
<p>Not at all, the stem player only has bluetooth audio through a separate BT module, the BLE stack of the nRF52840 is not used or even accessible at all. I haven’t heard of any other TE products using nRF52840 except for the Choir puppets: <a href="https://github.com/jetztgradnet/Choirama" class="inline-onebox" rel="noopener nofollow noreferrer ugc">GitHub - jetztgradnet/Choirama: Findings about Teenage Engineering Choir (CH-8) · GitHub</a></p>
<p><a class="mention" href="/u/vanveluwen">@vanveluwen</a> I will DM you, I have some stuff to get you started!</p>

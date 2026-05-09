# Post #128

**Author:** brick  
**Date:** 2025-01-14T22:51:27.552Z  
**Post ID:** 735853  

---

<p>got an email! my stem player should be at my door on friday, can’t wait!<br>
also, I finally got around to taking a look at the APPROTECT bypass writeups; I’m not entirely sure what’s going on there exactly: i do understand that there seems to be some hardware system to load the APPROTECT status value into the access port peripherals, and that they inject a pulse into a power line during some period of the startup sequence to… i’m not sure what. bypass the value load? force a chip reset?</p>
<aside class="quote no-group quote-modified" data-username="murray" data-post="126" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/murray/48/64912_2.png" class="avatar"> murray:</div>
<blockquote>
<p>i may have a spare beagle board laying around… when i have a second i’ll take a look. given 5$ in components i bet we could breadboard the injector pretty easily</p>
</blockquote>
</aside>
<p>found the link: <a href="https://limitedresults.com/2021/03/the-pocketglitcher/" rel="noopener nofollow noreferrer ugc">https://limitedresults.com/2021/03/the-pocketglitcher/</a><br>
not only does it have some information about using a beaglebone for this (and has an example of using it for this exploit), it also has a link to a github repo!</p>
<p>honestly a good chunk of these writeups are going over my head, and i can’t if i just don’t understand what he’s saying for much of it, or if he’s being intentionally quite vague on specific details. for some reason i believe it’s the latter. i hope other people can glean more from it all than i did.</p>
<p>more importantly, what i gather is that the chip’s firmware can be cleared and flashed with new data <em>even with APPROTECT on.</em> so only <em>one</em> person needs to perform the bypass and dump the firmware. then once that firmware is shared, the rest of us can clear and reflash the chip with APPROTECT off, using just the jlink debugger and no hardware bypass giving us room to work! we should be able to make considerable headway once the bypass is performed and firmware is dumped.</p>

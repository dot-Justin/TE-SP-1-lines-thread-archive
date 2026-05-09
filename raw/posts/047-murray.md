# Post #47

**Author:** murray  
**Date:** 2024-12-28T02:18:34.813Z  
**Post ID:** 732907  

---

<aside class="quote no-group" data-username="instantjuggler" data-post="45" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/instantjuggler/48/63559_2.png" class="avatar"> instantjuggler:</div>
<blockquote>
<p>i’ve heard of 5 teams trying to crack this device so far… 2 of the teams have failed. everyone is looking for some sort of button combo to boot it into some sort of disk mode where it would mount as a hard drive on a laptop and then you could drag and drop files at will. but i think this is just pure fantasy because that’s what people want to happen. i think your theory about a custom firmware with different audio sounds more likely. but knowing from what i’ve heard from TE talking about their other firmwares, i don’t think there’s any way we’ll be able to load our own music onto the device.</p>
<p>i don’t know anything about firmwares or interfacing with hardware… would there be any chance to start from zero and write a firmware from scratch that would just take the physical components of the device and maybe even just do something like basic file playback? but even as i write that, it sounds impossible.</p>
</blockquote>
</aside>
<p>you’re right–there’s likely no button combo to get this device into disk mode. it’s even possible that the filepaths for the sound data (which are probably on the 4GB emmc) are hardcoded into the firmware.</p>
<p>there is a chance that uploading custom firmware could be done, but it likely depends on whether teenage engineering bothered to enable APPROTECT on the board–APPROTECT is a feature on some of nordicsemi’s soc’s (and is available on the stem player’s soc) which disables debug/programming of the system. getting around APPROTECT requires hardware fault injection detailed by a talented hacker here:<br>
<a href="https://limitedresults.com/2020/06/nrf52-debug-resurrection-approtect-bypass/" class="onebox" target="_blank" rel="noopener nofollow noreferrer ugc">https://limitedresults.com/2020/06/nrf52-debug-resurrection-approtect-bypass/</a></p>
<p>given APPROTECT is disabled, it would be both possible to dump the code stored in flash (given a successfully connected hardware debugger, in a link i shared above) potentially reverse engineering the binary or upload custom firmware (involving writing drivers for both the audio codec and the emmc).</p>

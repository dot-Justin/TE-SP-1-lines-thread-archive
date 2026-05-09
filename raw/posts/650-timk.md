# Post #650

**Author:** TimK  
**Date:** 2026-02-15T12:36:54.861Z  
**Post ID:** 783259  

---

<aside class="quote no-group" data-username="pdrgf" data-post="648" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/p/779978/48.png" class="avatar"> pdrgf:</div>
<blockquote>
<p>if we had a dump of the firmware, how likely is it that one could:</p>
<ul>
<li>flash custom firmware which has the ability to read/write to the eMMC</li>
</ul>
</blockquote>
</aside>
<p>No dump needed for this, I’ve done this a long time ago, see above in this very thread.</p>
<aside class="quote no-group" data-username="pdrgf" data-post="648" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/p/779978/48.png" class="avatar"> pdrgf:</div>
<blockquote>
<ul>
<li>replace/supplement the existing tracks with new music in the same format</li>
</ul>
</blockquote>
</aside>
<p>Same, this has been done. I did decide to change the audio format a little to make it more intuitive.</p>
<aside class="quote no-group" data-username="pdrgf" data-post="648" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/p/779978/48.png" class="avatar"> pdrgf:</div>
<blockquote>
<ul>
<li>re-flash the original dump</li>
</ul>
</blockquote>
</aside>
<p>If there’s a clean dump, this should be trivial. I can’t see why the original binary + UICR couldn’t be loaded onto a device again and restored the original firmware.</p>
<aside class="quote no-group" data-username="pdrgf" data-post="648" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/p/779978/48.png" class="avatar"> pdrgf:</div>
<blockquote>
<ul>
<li>get the full TE firmware experience with custom tracks</li>
</ul>
</blockquote>
</aside>
<p>That’s a much bigger question! That means either recreating the full TE experience plus adding stem upload (which I’m doing) or modifying a clean dump so it can upload new data. (We have seen in an old corrupted fw dump that the song titles are present in the firmware, so this could be tricky.)</p>
<p>I have fully reverse engineered their data format (except for MIDI, PO sync data, still working on that), so I know exactly how audio data should be written to work with their firmware. I have already written my own audio data to memory and played, as well as played their audio data on my own firmware and extracted all original, individual stems as WAV files.This is not news, I have written about this before in this thread. I haven’t played my own audio data on their fw because we don’t have a clean dump (yet?)</p>
<aside class="quote no-group" data-username="lzma" data-post="647" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/lzma/48/113178_2.png" class="avatar"> lzma:</div>
<blockquote>
<p>Thanks for the info! My soldering skills are not too shabby but I doubt I’d be able to pull off that transplant. I have been working with a research lab which has some very expensive machines that help to automate this process though with other chips for embedded devices. Next time I head over there I’ll try and see what their hardware is capable of.</p>
</blockquote>
</aside>
<p>That would be so cool! I honestly don’t think the transplant should be that crazy if you have the right tools. The only reason I haven’t done it is because I don’t have the spares to be able to fail. (And maybe I lost interest in the whole glitching a bit when I started working on my FW)</p>

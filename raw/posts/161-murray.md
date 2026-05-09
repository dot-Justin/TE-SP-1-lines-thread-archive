# Post #161

**Author:** murray  
**Date:** 2025-01-16T19:57:01.408Z  
**Post ID:** 736239  

---

<aside class="quote no-group quote-modified" data-username="brick" data-post="154" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/brick/48/70721_2.png" class="avatar"> brick:</div>
<blockquote>
<aside class="quote no-group" data-username="murray" data-post="150" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/murray/48/64912_2.png" class="avatar"> murray:</div>
<blockquote>
<p>edit: capacitors still need to be removed!(?)</p>
</blockquote>
</aside>
<p>hey quick note before you go to the trouble, limitedresults notes somewhere (I think on the second post?) that to only perform the attack, you don’t need to remove the caps. they did that for analysis’ sake</p>
</blockquote>
</aside>
<hr>
<p>that’s true, but since we don’t have the timing parameters from limitedresults (this is one of the ‘exercises’ they’ve implicitly left up to the reader), we are in a position of performing analysis. hopefully the capacitors won’t smooth out the important features, but if we get stuck they’ll have to go.</p>
<aside class="quote no-group quote-modified" data-username="brick" data-post="154" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/brick/48/70721_2.png" class="avatar"> brick:</div>
<blockquote>
<aside class="quote no-group" data-username="murray" data-post="150" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/murray/48/64912_2.png" class="avatar"> murray:</div>
<blockquote>
<p>what i didn’t think about when doing this is how i’m going to restart the stem player to begin instrumenting the power consumption on cpu startup</p>
</blockquote>
</aside>
<p>they also specifically note on the page about using the beaglebone that the nRF chip is very high efficiency, and can probably be powered by the beaglebone itself, through the chip’s power lines. I think this is probably the best way to power the chip while doing the exploit, at least.</p>
</blockquote>
</aside>
<p>i read this too–the battery is 3.7V and the beaglebone black is a 3.3V system. definitely the easiest route, but the voltage difference may introduce more variables and opportunities for the sytem to act unpredictably.</p>
<aside class="quote no-group quote-modified" data-username="brick" data-post="154" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/brick/48/70721_2.png" class="avatar"> brick:</div>
<blockquote>
<aside class="quote no-group" data-username="murray" data-post="150" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/murray/48/64912_2.png" class="avatar"> murray:</div>
<blockquote>
<p>these stem players were being circulated sometime in 2022 and this vulnernability was fixed with a hardware revision on November 21st 2021</p>
</blockquote>
</aside>
<p>it’s worth noting that the Kano version of the stem player was released in conjunction with <em>Donda</em> (Aug 2021), while the TE version seems intended to be released in conjunction with <em>Jesus is King</em> (Aug 2019). given the development timeline, I don’t think we really need to worry about the hardware revision here.</p>
</blockquote>
</aside>
<p>props to <a class="mention" href="/u/kurtgirdle">@kurtgirdle</a> for taking all the guessing out of this question!</p>
<p>–</p>
<aside class="quote no-group" data-username="brick" data-post="156" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/brick/48/70721_2.png" class="avatar"> brick:</div>
<blockquote>
<p>there’s <em><strong>gotta</strong></em> be a way to load data onto the flash chip through usb, right? like, there’s no way that they’re uploading <em>Jesus is King</em> to the flash chip, through the JTAG, right? how else would they get the media information on there, or edit bpm etc?</p>
</blockquote>
</aside>
<p>they could have used an emmc flash programmer which gets teenage engineering around having to implement a disk storage mode on the stem player. i think it’s important to remember that this thing is a prototype–in my professional experience, customer-facing configuration features are typically the last things to get implemented before a product goes into final release testing (if they’re even planned at all).</p>

# Post #124

**Author:** murray  
**Date:** 2025-01-14T18:09:42.633Z  
**Post ID:** 735788  

---

<aside class="quote no-group" data-username="murray" data-post="47" data-topic="66795" data-full="true">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/murray/48/64912_2.png" class="avatar"> murray:</div>
<blockquote>
<p>APPROTECT requires hardware fault injection detailed by a talented hacker here:<br>
<a href="https://limitedresults.com/2020/06/nrf52-debug-resurrection-approtect-bypass/" rel="noopener nofollow noreferrer ugc">https://limitedresults.com/2020/06/nrf52-debug-resurrection-approtect-bypass/</a></p>
<p>given APPROTECT is disabled, it would be both possible to dump the code stored in flash (given a successfully connected hardware debugger, in a link i shared above) potentially reverse engineering the binary or upload custom firmware (involving writing drivers for both the audio codec and the emmc).</p>
</blockquote>
</aside>
<p>part 2 is a bit more relevant for our use-case, but in either article the fault injection hardware is not disclosed:<br>
<a href="https://limitedresults.com/2020/06/nrf52-debug-resurrection-approtect-bypass-part-2/" class="onebox" target="_blank" rel="noopener nofollow noreferrer ugc">https://limitedresults.com/2020/06/nrf52-debug-resurrection-approtect-bypass-part-2/</a></p>
<p>since we already know that the stem player circuit does not match the reference design nearly as well as the logitech device–next step would be to sketch out a more complete picture of the stem player circuit and determine if the relevant pins are exposed to test points or traces at all.</p>

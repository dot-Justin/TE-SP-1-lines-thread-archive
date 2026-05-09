# Post #330

**Author:** robbie  
**Date:** 2025-03-12T03:50:14.359Z  
**Post ID:** 743999  

---

<aside class="quote no-group" data-username="Duloz" data-post="327" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/duloz/48/102833_2.png" class="avatar"> Duloz:</div>
<blockquote>
<p>" While TIFF is primarily known as a format for images, <mark>it can also be used to carry audio data</mark>, particularly within the context of Digital Cinema Distribution Masters (DCDM) for use in DCPs and ProTools sessions."</p>
</blockquote>
</aside>
<p>Yeah, that appears to be total nonsense. While you <em>could</em> stuff audio (or any random data) into a TIFF, it’d just be using a TIFF as a wrapper around another, separate data format.</p>
<details>
<summary>
Addendum</summary>
<p>God knows why I’m fact-checking AI slop, but here we are. <a href="https://pub.smpte.org/pub/rp428-4/rp0428-4-2010.pdf" rel="noopener nofollow noreferrer ugc">SMPTE 428-4</a>, a part of the standard which defines recommendations for <code>DCDM</code>, states:</p>
<blockquote>
<p>The keywords “shall” and “shall not” indicate requirements strictly to be followed in order to conform to the document and from which no deviation is permitted.</p>
</blockquote>
<p>and:</p>
<blockquote>
<p>Audio essence shall be stored in single channel Broadcast Wave files, one Broadcast Wave file per audio channel.</p>
</blockquote>
<p>There is no mention of TIFF in this document (although TIFF is used elsewhere in the standard for <em>image</em> encoding purposes).</p>
</details>

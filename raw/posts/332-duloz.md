# Post #332

**Author:** Duloz  
**Date:** 2025-03-18T00:01:31.890Z  
**Post ID:** 744678  

---

<p>OK, some notes that might be promising after pushing all the successfully decompiled functions, the following track with my previous expectations of the meaning of the r1 and r3 values (involved in privilege checks):</p>
<p>Maybe related to the fact the the stem player does not enumerate until the power button is released?:<br>
<strong>Holding a specific button</strong> during power-on could set a flag at <code>r1 = 0x8</code>.</p>
<p>Also:</p>
<ul>
<li>When <strong>USB is plugged in</strong>, the firmware might check if a special request is sent.</li>
<li>If <code>f8c3 2500</code> is written, it could <strong>activate USB DFU (Device Firmware Upgrade) mode</strong>.</li>
</ul>
<p>More:<br>
If <code>r3</code> at <code>0x43C</code> is <code>0</code>, the firmware jumps to the bootloader.</p>
<p>Finally:</p>
<ul>
<li>If a firmware verification fails:</li>
</ul>
<pre><code class="lang-auto">429d       cmp   r5, r3
d174       bne.n 0x5dc  ; Jump to alternative mode
</code></pre>
<ul>
<li>If an invalid firmware is detected, the bootloader might <strong>automatically activate</strong>.</li>
</ul>
<h2><a name="p-744678-conclusion-1" class="anchor" href="#p-744678-conclusion-1" aria-label="Heading link"></a>** Conclusion**</h2>
<p><img src="https://llllllll.co/images/emoji/apple/white_check_mark.png?v=15" title=":white_check_mark:" class="emoji" alt=":white_check_mark:" loading="lazy" width="20" height="20"> <strong>Bootloader detected.</strong><br>
<img src="https://llllllll.co/images/emoji/apple/white_check_mark.png?v=15" title=":white_check_mark:" class="emoji" alt=":white_check_mark:" loading="lazy" width="20" height="20"> <strong>Can be activated via register values or button press.</strong><br>
<img src="https://llllllll.co/images/emoji/apple/white_check_mark.png?v=15" title=":white_check_mark:" class="emoji" alt=":white_check_mark:" loading="lazy" width="20" height="20"> <strong>Possible USB-based activation (DFU or mass storage mode).</strong><br>
<img src="https://llllllll.co/images/emoji/apple/white_check_mark.png?v=15" title=":white_check_mark:" class="emoji" alt=":white_check_mark:" loading="lazy" width="20" height="20"> <strong>Failsafe: Corrupted firmware might force bootloader mode.</strong></p>
<p>Lots of stuff dumped in a text file. r1, r2,  and r3 are the keys to the kingdom.</p>
<aside class="onebox googledrive" data-onebox-src="https://drive.google.com/file/d/12Cbq8qeSOhFzUAW1AkBQIDG7oKFxK9wR/view?usp=drive_link">
  <header class="source">

      <a href="https://drive.google.com/file/d/12Cbq8qeSOhFzUAW1AkBQIDG7oKFxK9wR/view?usp=drive_link" target="_blank" rel="noopener nofollow noreferrer ugc">drive.google.com</a>
  </header>

  <article class="onebox-body">
      <a href="https://drive.google.com/file/d/12Cbq8qeSOhFzUAW1AkBQIDG7oKFxK9wR/view?usp=drive_link" target="_blank" rel="noopener nofollow noreferrer ugc"><span class="googledocs-onebox-logo g-drive-logo"></span></a>



<h3><a href="https://drive.google.com/file/d/12Cbq8qeSOhFzUAW1AkBQIDG7oKFxK9wR/view?usp=drive_link" target="_blank" rel="noopener nofollow noreferrer ugc">analysis.txt</a></h3>

<p>Google Drive file.</p>

  </article>

  <div class="onebox-metadata">
    
    
  </div>

  <div style="clear: both"></div>
</aside>


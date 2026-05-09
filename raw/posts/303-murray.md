# Post #303

**Author:** murray  
**Date:** 2025-02-28T21:57:50.256Z  
**Post ID:** 742600  

---

<p>hey folks!</p>
<p>the past week i’ve been poring over the firmware dump and attempting consecutive glitches in order to get some confidence on the binary that has already been extracted from the device. i received an additional, mostly functional stem player on wednesday (thank you thank you <a class="mention" href="/u/duloz">@Duloz</a> !) and plan to perform at least one additional dump on that device.</p>
<p>but first i finally installed kicad and wanted to share the very simple schematic of my automated glitch system in case anyone wants to replicate the effort:</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/c/b/cb963565d2ff941afc52735297bb1ecbe240a851.png" data-download-href="https://llllllll.co/uploads/default/cb963565d2ff941afc52735297bb1ecbe240a851" title="screenshot"><img src="https://llllllll.co/uploads/default/optimized/3X/c/b/cb963565d2ff941afc52735297bb1ecbe240a851_2_444x500.png" alt="screenshot" data-base62-sha1="t30Kj7CqteEE93EvP0cPqRmJxuN" width="444" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/c/b/cb963565d2ff941afc52735297bb1ecbe240a851_2_444x500.png, https://llllllll.co/uploads/default/optimized/3X/c/b/cb963565d2ff941afc52735297bb1ecbe240a851_2_666x750.png 1.5x, https://llllllll.co/uploads/default/optimized/3X/c/b/cb963565d2ff941afc52735297bb1ecbe240a851_2_888x1000.png 2x" data-dominant-color="F4F3DC"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">screenshot</span><span class="informations">1311×1474 103 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>for the code analysis, i am using ghidra along with an svd loader script and svd device file from nordic:</p><aside class="onebox githubrepo" data-onebox-src="https://github.com/leveldown-security/SVD-Loader-Ghidra">
  <header class="source">

      <a href="https://github.com/leveldown-security/SVD-Loader-Ghidra" target="_blank" rel="noopener nofollow noreferrer ugc">github.com</a>
  </header>

  <article class="onebox-body">
    <div class="github-row" data-github-private-repo="false">
  <img width="690" height="344" src="https://opengraph.githubassets.com/a9581d223b2f28fe751f984d83080ea1/leveldown-security/SVD-Loader-Ghidra" class="thumbnail">

  <h3><a href="https://github.com/leveldown-security/SVD-Loader-Ghidra" target="_blank" rel="noopener nofollow noreferrer ugc">GitHub - leveldown-security/SVD-Loader-Ghidra</a></h3>

    <p><span class="github-repo-description">Contribute to leveldown-security/SVD-Loader-Ghidra development by creating an account on GitHub.</span></p>
</div>

  </article>

  <div class="onebox-metadata">
    
    
  </div>

  <div style="clear: both"></div>
</aside>
<p><a href="https://web.archive.org/web/20240102214735/https://leveldown.de/blog/svd-loader/" class="onebox" target="_blank" rel="noopener nofollow noreferrer ugc">https://web.archive.org/web/20240102214735/https://leveldown.de/blog/svd-loader/</a><br>
<a href="https://www.keil.arm.com/packs/nrf_devicefamily" class="onebox" target="_blank" rel="noopener nofollow noreferrer ugc">https://www.keil.arm.com/packs/nrf_devicefamily</a></p>
<p>the most immediately clear takeaway from the disassembled code are the active peripherals. the binary seems to be stripped of all sdk versioning info, logging, and most debug messages. there are some references to kanye’s album metadata which aren’t being obviously referenced in the disassembly.</p>
<p>in an effort to discover a possible legacy nrf sdk version (and concretely relate some of the disassembly to human-readable code), the newest non-nrf connect sdk’s were downloaded and added to the repositories within this set of tools intended for ida pro:</p><aside class="onebox githubrepo" data-onebox-src="https://github.com/DigitalSecurity/nrf5x-tools">
  <header class="source">

      <a href="https://github.com/DigitalSecurity/nrf5x-tools" target="_blank" rel="noopener nofollow noreferrer ugc">github.com</a>
  </header>

  <article class="onebox-body">
    <div class="github-row" data-github-private-repo="false">
  <img width="690" height="344" src="https://opengraph.githubassets.com/2994bbf1fc1c18723ca02218a8f7c136/DigitalSecurity/nrf5x-tools" class="thumbnail">

  <h3><a href="https://github.com/DigitalSecurity/nrf5x-tools" target="_blank" rel="noopener nofollow noreferrer ugc">GitHub - DigitalSecurity/nrf5x-tools: Nordic Semiconductor nRF5x series disassembly...</a></h3>

    <p><span class="github-repo-description">Nordic Semiconductor nRF5x series disassembly tools</span></p>
</div>

  </article>

  <div class="onebox-metadata">
    
    
  </div>

  <div style="clear: both"></div>
</aside>

<p>i couldn’t get a signature match to determine sdk version which naively points to the newer zephyr-based nrf connect sdk for the firmware’s source.</p>
<p>to help make sense of the stem player’s firmware disassembly, i’ve been playing with the nrf connect sdk by writing multiple simple projects, comparing their compiled binaries in ghidra, and then using those comparisons to inform me about common code entry points and call patterns and ultimately how the stem player code might be using the nrf52840’s peripherals. i’ve been able to idenfity some simple functionality like simple configuration of certain peripherals and critical sections indicated by the disabling and enabling of interrupts.</p>
<p>but something i’m still frustratingly unclear on is how the emmc chip is being operated. there is no hardware functionality on the nrf52840 that is capable of emmc interaction and there doesn’t seem to be any onboard hardware emmc drivers on the stem player. many of the nrf52840 peripherals make use of what’s called “EasyDMA” which is a kind of interconnect that allow a sort of shared memory between peripherals without any cpu interaction. my working suspicions are either that the emmc is driven through a custom bitbanging driver or that the emmc is somehow connected to the usb peripheral in hardware and managed by the cpu.</p>
<p>and one last question i’m especially interested in is where the dsp is occurring–the logic for mixing to stereo, forward/reverse playback, etc must be somewhere between the emmc and audio codec on the cpu, but not clear where yet.</p>
<p>(normally i’d think that the spi peripherals [which are active] would be driving the emmc, but spi was dropped from the mmc spec years ago around 4.5, we are on 5.0 with this emmc):</p><aside class="onebox pdf" data-onebox-src="https://media.digikey.com/pdf/Data%20Sheets/Toshiba%20PDFs/THGBMNG5D1LBAIL.pdf">
  <header class="source">

      <a href="https://media.digikey.com/pdf/Data%20Sheets/Toshiba%20PDFs/THGBMNG5D1LBAIL.pdf" target="_blank" rel="noopener nofollow noreferrer ugc">media.digikey.com</a>
  </header>

  <article class="onebox-body">
    <a href="https://media.digikey.com/pdf/Data%20Sheets/Toshiba%20PDFs/THGBMNG5D1LBAIL.pdf" target="_blank" rel="noopener nofollow noreferrer ugc"><span class="pdf-onebox-logo"></span></a>

<h3><a href="https://media.digikey.com/pdf/Data%20Sheets/Toshiba%20PDFs/THGBMNG5D1LBAIL.pdf" target="_blank" rel="noopener nofollow noreferrer ugc">THGBMNG5D1LBAIL.pdf</a></h3>

  <p class="filesize">6.83 MB</p>

  </article>

  <div class="onebox-metadata">
    
    
  </div>

  <div style="clear: both"></div>
</aside>

<p>additionally, at least two scenarios are possible which muddy the waters:</p>
<ol>
<li>the stem player firmware dump is incomplete/corrupt</li>
<li>my disassembly skills are green enough that i’m not seeing where ghidra needs more context to represent a more accurate picture of the firmware dump</li>
</ol>
<p>i’m getting very close to shelving ghidra for a while and resolving to building an accurate schematic of the stem player hardware and beginning work on fully custom firmware.</p>
<p>–</p>
<aside class="quote no-group" data-username="elew" data-post="293" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/elew/48/103639_2.png" class="avatar"> elew:</div>
<blockquote>
<p>what is the md5 of your dump, for FW only – not the user writable parts.</p>
</blockquote>
</aside>
<p>*?</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/4/f/4febe4f7310e7c1e4a3afc90550a9b042acfc6e9.png" data-download-href="https://llllllll.co/uploads/default/4febe4f7310e7c1e4a3afc90550a9b042acfc6e9" title="screenshot_memory_map"><img src="https://llllllll.co/uploads/default/optimized/3X/4/f/4febe4f7310e7c1e4a3afc90550a9b042acfc6e9_2_690x484.png" alt="screenshot_memory_map" data-base62-sha1="bp17xlSp71dnVtMg3xZG7dpzMY9" width="690" height="484" srcset="https://llllllll.co/uploads/default/optimized/3X/4/f/4febe4f7310e7c1e4a3afc90550a9b042acfc6e9_2_690x484.png, https://llllllll.co/uploads/default/optimized/3X/4/f/4febe4f7310e7c1e4a3afc90550a9b042acfc6e9_2_1035x726.png 1.5x, https://llllllll.co/uploads/default/original/3X/4/f/4febe4f7310e7c1e4a3afc90550a9b042acfc6e9.png 2x" data-dominant-color="F4F4F4"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">screenshot_memory_map</span><span class="informations">1079×758 44.9 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>by user writable parts, i’m assuming you mean the code ram and flash, but not the UICR and FICR? maybe it’s easier to speak in offsets–the md5 for my dump of <code>0x0 0x100000</code> is <code>2538e5d28e46398fda879b6c4aecd73b</code>. what do you get?</p>
<p>–</p>
<aside class="quote no-group" data-username="elew" data-post="293" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/elew/48/103639_2.png" class="avatar"> elew:</div>
<blockquote>
<p>We have been able to offload the songs and we are working on reverse engineering the format. Finally got listenable audio today!</p>
</blockquote>
</aside>
<p>this must be some kind of obfuscation–the cirrus cs42l42 expects i2s or tdm which are simple serial formats. do you have any specifics of this “at rest” format on-hand? 24bit? 16bit?</p>

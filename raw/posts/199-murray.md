# Post #199

**Author:** murray  
**Date:** 2025-01-29T18:07:12.180Z  
**Post ID:** 738387  

---

<p>thanks! i hope so too–luckily we’re not fully working in the dark and there are some hints i’ve been using from limitedresults’ blog and the papers i’ve been reading. i’ll edit my post to include those once i’m back at my personal computer.</p>
<p>–<br>
edit:</p>
<p>paper on glitching a nRF52832</p><aside class="onebox githubrepo" data-onebox-src="https://github.com/jontyrudman/voltage-glitch-nrf52-cc254x-paper">
  <header class="source">

      <a href="https://github.com/jontyrudman/voltage-glitch-nrf52-cc254x-paper" target="_blank" rel="noopener nofollow noreferrer ugc">github.com</a>
  </header>

  <article class="onebox-body">
    <div class="github-row" data-github-private-repo="false">
  <img width="690" height="344" src="https://opengraph.githubassets.com/97c811d29a7b2c19f627cb89e4dd93e4/jontyrudman/voltage-glitch-nrf52-cc254x-paper" class="thumbnail">

  <h3><a href="https://github.com/jontyrudman/voltage-glitch-nrf52-cc254x-paper" target="_blank" rel="noopener nofollow noreferrer ugc">GitHub - jontyrudman/voltage-glitch-nrf52-cc254x-paper: Applying Crowbar Voltage Glitches to nRF52 and...</a></h3>

    <p><span class="github-repo-description">Applying Crowbar Voltage Glitches to nRF52 and CC253x/4x Microcontrollers. My final year dissertation and supporting notes.</span></p>
</div>

  </article>

  <div class="onebox-metadata">
    
    
  </div>

  <div style="clear: both"></div>
</aside>

<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/c/a/ca0502f0dbb7e3c9ab5b98bce5fcfc462415b888.png" data-download-href="https://llllllll.co/uploads/default/ca0502f0dbb7e3c9ab5b98bce5fcfc462415b888" title="glitch_delay_distribution"><img src="https://llllllll.co/uploads/default/optimized/3X/c/a/ca0502f0dbb7e3c9ab5b98bce5fcfc462415b888_2_690x407.png" alt="glitch_delay_distribution" data-base62-sha1="sP9bxljxZLtA98i7bKU3grLrEE0" width="690" height="407" srcset="https://llllllll.co/uploads/default/optimized/3X/c/a/ca0502f0dbb7e3c9ab5b98bce5fcfc462415b888_2_690x407.png, https://llllllll.co/uploads/default/original/3X/c/a/ca0502f0dbb7e3c9ab5b98bce5fcfc462415b888.png 1.5x, https://llllllll.co/uploads/default/original/3X/c/a/ca0502f0dbb7e3c9ab5b98bce5fcfc462415b888.png 2x" data-dominant-color="E6E6E6"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">glitch_delay_distribution</span><span class="informations">992×586 50.3 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/c/d/cd248cf38571d5d72117786e06686e1e5cac3f24.png" data-download-href="https://llllllll.co/uploads/default/cd248cf38571d5d72117786e06686e1e5cac3f24" title="glitch_width_distribution"><img src="https://llllllll.co/uploads/default/optimized/3X/c/d/cd248cf38571d5d72117786e06686e1e5cac3f24_2_690x393.png" alt="glitch_width_distribution" data-base62-sha1="tgMbP8kYsxVsHwKwsnaPr8J2ETO" width="690" height="393" srcset="https://llllllll.co/uploads/default/optimized/3X/c/d/cd248cf38571d5d72117786e06686e1e5cac3f24_2_690x393.png, https://llllllll.co/uploads/default/original/3X/c/d/cd248cf38571d5d72117786e06686e1e5cac3f24.png 1.5x, https://llllllll.co/uploads/default/original/3X/c/d/cd248cf38571d5d72117786e06686e1e5cac3f24.png 2x" data-dominant-color="EFEFEF"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">glitch_width_distribution</span><span class="informations">978×558 40.7 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>limitedresults’ blog</p>
<p>referencing my oscilloscope photos above, it looks like i am able to trigger on the same/very-similar cpu behavior as limitedresults:</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/3/a/3a225e1d7f37baf2d2f4e34ad8b608d2b2938316.jpeg" data-download-href="https://llllllll.co/uploads/default/3a225e1d7f37baf2d2f4e34ad8b608d2b2938316" title="image"><img src="https://llllllll.co/uploads/default/original/3X/3/a/3a225e1d7f37baf2d2f4e34ad8b608d2b2938316.jpeg" alt="image" data-base62-sha1="8ihkbDYAp8Kkf2XM4vv9e7QVam2" width="666" height="500"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">image</span><span class="informations">666×500 52.9 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/2/2/22a8344e0e269e56ae543b4c967e635b465544f1.png" data-download-href="https://llllllll.co/uploads/default/22a8344e0e269e56ae543b4c967e635b465544f1" title="image"><img src="https://llllllll.co/uploads/default/original/3X/2/2/22a8344e0e269e56ae543b4c967e635b465544f1.png" alt="image" data-base62-sha1="4WABP9dQiS17scSuqQKmLteotGh" width="690" height="424" data-dominant-color="0A0F1A"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">image</span><span class="informations">1024×630 45.2 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>observing the rigol’s <code>D</code> cursor position indicator, this red box is 16.1us ahead of the trigger:</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/0/0/00e0d511ff8cd50bdef9b765adba49c388d5f199.png" data-download-href="https://llllllll.co/uploads/default/00e0d511ff8cd50bdef9b765adba49c388d5f199" title="image"><img src="https://llllllll.co/uploads/default/original/3X/0/0/00e0d511ff8cd50bdef9b765adba49c388d5f199.png" alt="image" data-base62-sha1="7LHsCrttLasKAiJbdpaZYwKw3f" width="690" height="424" data-dominant-color="09080B"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">image</span><span class="informations">1024×630 40.9 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>limitedresults’ crowbar glitch width appears to be very small–each of the grid squares is 2us of time which is 2000ns. eyeballing it, i would estimate the glitch could be anywhere between ~5-1000ns taking into account the characteristics of the mosfet being used. limitedresults doesn’t share their circuit but does say this within their <a href="https://limitedresults.com/2021/03/the-pocketglitcher/" rel="noopener nofollow noreferrer ugc">pocketglitcher writeup</a>.</p>
<pre><code class="lang-auto">Analog Development
The Analog stage is based on level shifter, Mosfet and resistors, designed to produce a powerful negative glitch (also known as crowbar technique) once triggered by the Pulse_Output (P1_36).
It has to be reliable, able to drive a large amount of current with a very fast response Time Ton.
</code></pre>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/f/5/f5b18ae1482ed6ccc8b0a969279af815cb32a589.png" data-download-href="https://llllllll.co/uploads/default/f5b18ae1482ed6ccc8b0a969279af815cb32a589" title="image"><img src="https://llllllll.co/uploads/default/original/3X/f/5/f5b18ae1482ed6ccc8b0a969279af815cb32a589.png" alt="image" data-base62-sha1="z3vmwzqxMOOQjnm9cg1Ej7spjux" width="690" height="424" data-dominant-color="07080A"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">image</span><span class="informations">1024×630 40.9 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>–</p>
<p>and yes, i had identified a likely location of the memory/register loading at cpu startup (which relates to limitedresults’ recorded behavior in the screenshot with the red box) which i’ve been targeting for my manual glitching. unfortunately since my ‘incident’ (the one above where i was spooked that i fried the stem player), power consumption looks a bit different (DEC1 for example is reading lower than usual). i’ll include these with my measurements of the glitch pulse that my pru code is triggering in a follow-up or edit of this reply.</p>
<p>–</p>
<p>can’t reply, so i’ll update my existing response–</p>
<p>20250130 00:29 pacific time</p>
<p>today i spent some time learning gpib protocol and controlling the tek tds2004c from the beaglebone black over the usb hub. also plotted some measurements of both the pulse generated by my glitch pru code and the resulting voltage drop. you’ll notice the tek 640a has acquired a square wave–i’m using single trigger acquisitions on the probe compensation signal to reliably trigger the pru code on the beaglebone black. the crowbar circuit (consisting of a gpio supplying 3.3V, an n-channel mosfet, a pull-down resistor, and pru pulse input) is on the breadboard.</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/d/a/da84eff8cc14f75a86a4cbc9313bb760d0077715.jpeg" data-download-href="https://llllllll.co/uploads/default/da84eff8cc14f75a86a4cbc9313bb760d0077715" title="20250130_002751"><img src="https://llllllll.co/uploads/default/optimized/3X/d/a/da84eff8cc14f75a86a4cbc9313bb760d0077715_2_666x500.jpeg" alt="20250130_002751" data-base62-sha1="vb6U98spAFr2VWiw2idvqfVJbYp" width="666" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/d/a/da84eff8cc14f75a86a4cbc9313bb760d0077715_2_666x500.jpeg, https://llllllll.co/uploads/default/optimized/3X/d/a/da84eff8cc14f75a86a4cbc9313bb760d0077715_2_999x750.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/d/a/da84eff8cc14f75a86a4cbc9313bb760d0077715_2_1332x1000.jpeg 2x" data-dominant-color="4F5563"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">20250130_002751</span><span class="informations">1920×1440 304 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>and here are some waveforms from the tds2004c and their corresponding glitch parameters (in cycles) which will give you an idea of how the glitch width relates to the shape of each crowbar glitch. top signal (red) is the voltage, bottom signal (blue) is the glitch pulse.</p>
<pre><code class="lang-auto">root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# ./glitch-param-set --delay 0 --width 1
Using /dev/mem.
pulse_delay_cycles: 0, pulse_width_cycles: 1
munmap succeeded
root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# 
</code></pre>
<p>50ns / div<br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/b/9/b992ba4cf8f2c7c7170d8992da0b55a45f50190e.png" data-download-href="https://llllllll.co/uploads/default/b992ba4cf8f2c7c7170d8992da0b55a45f50190e" title="crowbar_1cycle_50ns_window"><img src="https://llllllll.co/uploads/default/optimized/3X/b/9/b992ba4cf8f2c7c7170d8992da0b55a45f50190e_2_503x500.png" alt="crowbar_1cycle_50ns_window" data-base62-sha1="qtEH4EI25eZqgO83zf8QWrGvErs" width="503" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/b/9/b992ba4cf8f2c7c7170d8992da0b55a45f50190e_2_503x500.png, https://llllllll.co/uploads/default/optimized/3X/b/9/b992ba4cf8f2c7c7170d8992da0b55a45f50190e_2_754x750.png 1.5x, https://llllllll.co/uploads/default/optimized/3X/b/9/b992ba4cf8f2c7c7170d8992da0b55a45f50190e_2_1006x1000.png 2x" data-dominant-color="FDFDFD"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">crowbar_1cycle_50ns_window</span><span class="informations">2110×2094 97.1 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>–</p>
<pre><code class="lang-auto">root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# ./glitch-param-set --delay 0 --width 2
Using /dev/mem.
pulse_delay_cycles: 0, pulse_width_cycles: 2
munmap succeeded
root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# 
</code></pre>
<p>50ns / div<br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/0/f/0f74bd4988695ff2b5fdecc29a75e7ca345e10f9.png" data-download-href="https://llllllll.co/uploads/default/0f74bd4988695ff2b5fdecc29a75e7ca345e10f9" title="crowbar_2cycle_50ns_window"><img src="https://llllllll.co/uploads/default/optimized/3X/0/f/0f74bd4988695ff2b5fdecc29a75e7ca345e10f9_2_503x500.png" alt="crowbar_2cycle_50ns_window" data-base62-sha1="2cJh3o0KIwwtsNSVaz4HgoKTTuN" width="503" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/0/f/0f74bd4988695ff2b5fdecc29a75e7ca345e10f9_2_503x500.png, https://llllllll.co/uploads/default/optimized/3X/0/f/0f74bd4988695ff2b5fdecc29a75e7ca345e10f9_2_754x750.png 1.5x, https://llllllll.co/uploads/default/optimized/3X/0/f/0f74bd4988695ff2b5fdecc29a75e7ca345e10f9_2_1006x1000.png 2x" data-dominant-color="FDFDFD"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">crowbar_2cycle_50ns_window</span><span class="informations">2110×2094 104 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>–</p>
<pre><code class="lang-auto">root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# ./glitch-param-set --delay 0 --width 3
Using /dev/mem.
pulse_delay_cycles: 0, pulse_width_cycles: 3
munmap succeeded
root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# 
</code></pre>
<p>50ns / div<br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/3/f/3f509b1cd5657737c02ba444971e9dde6af8bbb8.png" data-download-href="https://llllllll.co/uploads/default/3f509b1cd5657737c02ba444971e9dde6af8bbb8" title="crowbar_3cycle_50ns_window"><img src="https://llllllll.co/uploads/default/optimized/3X/3/f/3f509b1cd5657737c02ba444971e9dde6af8bbb8_2_503x500.png" alt="crowbar_3cycle_50ns_window" data-base62-sha1="926MeDtKMllJbvTBMldBxxaMWkU" width="503" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/3/f/3f509b1cd5657737c02ba444971e9dde6af8bbb8_2_503x500.png, https://llllllll.co/uploads/default/optimized/3X/3/f/3f509b1cd5657737c02ba444971e9dde6af8bbb8_2_754x750.png 1.5x, https://llllllll.co/uploads/default/optimized/3X/3/f/3f509b1cd5657737c02ba444971e9dde6af8bbb8_2_1006x1000.png 2x" data-dominant-color="FDFDFD"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">crowbar_3cycle_50ns_window</span><span class="informations">2110×2094 103 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>–</p>
<pre><code class="lang-auto">root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# ./glitch-param-set --delay 0 --width 5
Using /dev/mem.
pulse_delay_cycles: 0, pulse_width_cycles: 5
munmap succeeded
root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# 
</code></pre>
<p>50ns / div<br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/5/0/502e376109e0d4bcc8aeda6641a4f573faf5eec7.png" data-download-href="https://llllllll.co/uploads/default/502e376109e0d4bcc8aeda6641a4f573faf5eec7" title="crowbar_5cycle_50ns_window"><img src="https://llllllll.co/uploads/default/optimized/3X/5/0/502e376109e0d4bcc8aeda6641a4f573faf5eec7_2_503x500.png" alt="crowbar_5cycle_50ns_window" data-base62-sha1="brjdmYttZLeyzye1o5e43sVckNF" width="503" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/5/0/502e376109e0d4bcc8aeda6641a4f573faf5eec7_2_503x500.png, https://llllllll.co/uploads/default/optimized/3X/5/0/502e376109e0d4bcc8aeda6641a4f573faf5eec7_2_754x750.png 1.5x, https://llllllll.co/uploads/default/optimized/3X/5/0/502e376109e0d4bcc8aeda6641a4f573faf5eec7_2_1006x1000.png 2x" data-dominant-color="FDFDFD"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">crowbar_5cycle_50ns_window</span><span class="informations">2110×2094 111 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>–</p>
<pre><code class="lang-auto">root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# ./glitch-param-set --delay 0 --width 10
Using /dev/mem.
pulse_delay_cycles: 0, pulse_width_cycles: 10
munmap succeeded
root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# 

</code></pre>
<p>100ns / div<br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/1/b/1b893b0cf3b37da36afb27b86c5a0cc3476dbd8d.png" data-download-href="https://llllllll.co/uploads/default/1b893b0cf3b37da36afb27b86c5a0cc3476dbd8d" title="crowbar_10cycle_100ns_window"><img src="https://llllllll.co/uploads/default/optimized/3X/1/b/1b893b0cf3b37da36afb27b86c5a0cc3476dbd8d_2_503x500.png" alt="crowbar_10cycle_100ns_window" data-base62-sha1="3VAUeH8KBUlbikbFniPkyDIVIhD" width="503" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/1/b/1b893b0cf3b37da36afb27b86c5a0cc3476dbd8d_2_503x500.png, https://llllllll.co/uploads/default/optimized/3X/1/b/1b893b0cf3b37da36afb27b86c5a0cc3476dbd8d_2_754x750.png 1.5x, https://llllllll.co/uploads/default/optimized/3X/1/b/1b893b0cf3b37da36afb27b86c5a0cc3476dbd8d_2_1006x1000.png 2x" data-dominant-color="FDFDFD"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">crowbar_10cycle_100ns_window</span><span class="informations">2110×2094 128 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>–</p>
<pre><code class="lang-auto">root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# ./glitch-param-set --delay 0 --width 20
Using /dev/mem.
pulse_delay_cycles: 0, pulse_width_cycles: 20
munmap succeeded
root@BeagleBone:/opt/source/beaglebone-black-glitcher/glitch# 
</code></pre>
<p>100ns / div<br>
<div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/e/8/e8441038c36c96f98b87257975cd2aebbfd874ed.png" data-download-href="https://llllllll.co/uploads/default/e8441038c36c96f98b87257975cd2aebbfd874ed" title="crowbar_20cycle_100ns_window"><img src="https://llllllll.co/uploads/default/optimized/3X/e/8/e8441038c36c96f98b87257975cd2aebbfd874ed_2_503x500.png" alt="crowbar_20cycle_100ns_window" data-base62-sha1="x8IB5BOEgoiwAlWFFxdI6qOx95X" width="503" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/e/8/e8441038c36c96f98b87257975cd2aebbfd874ed_2_503x500.png, https://llllllll.co/uploads/default/optimized/3X/e/8/e8441038c36c96f98b87257975cd2aebbfd874ed_2_754x750.png 1.5x, https://llllllll.co/uploads/default/optimized/3X/e/8/e8441038c36c96f98b87257975cd2aebbfd874ed_2_1006x1000.png 2x" data-dominant-color="FDFDFD"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">crowbar_20cycle_100ns_window</span><span class="informations">2110×2094 128 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>–</p>
<p>anyways, y’all probably get the idea that those signals straighten out and more perfectly oppose each other the wider we make our glitch pulse width. the characteristics we’re seeing are partly due to how fast the beaglebone pru is able to toggle its corresponding gpio and the switching behavior (how fast it reacts to its gate input) of the n-channel mosfet (<a href="https://www.adafruit.com/product/355" rel="noopener nofollow noreferrer ugc">this one</a>). hoping to have this automated glitching system running by this weekend.  when it’s successfully running i’ll post a schematic of the crowbar glitch (it’s stupid simple) and results if i have any. it’s possible either the pru code will need optimizing or the mosfet will need to be switched out for a faster one or both.</p>

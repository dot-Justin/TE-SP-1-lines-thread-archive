# Post #197

**Author:** murray  
**Date:** 2025-01-29T06:54:23.141Z  
**Post ID:** 738311  

---

<p>i had fewer cycles this week and weekend to dedicate to this, but i spent a fair amount of time performing manual triggers and subsequent glitches. i grew discouraged pretty quickly at the potential number of attempts it would take to successfully bypass APPROTECT. so i’ve decided to go down the road of an automated glitching system laid out like the below diagram:</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/f/d/fd857093bed505419889226cada614ab4591f785.png" data-download-href="https://llllllll.co/uploads/default/fd857093bed505419889226cada614ab4591f785" title="automated_glitching_diagram"><img src="https://llllllll.co/uploads/default/optimized/3X/f/d/fd857093bed505419889226cada614ab4591f785_2_690x428.png" alt="automated_glitching_diagram" data-base62-sha1="AaKGZlBV9kExxDFJHOJSdcvmW6F" width="690" height="428" srcset="https://llllllll.co/uploads/default/optimized/3X/f/d/fd857093bed505419889226cada614ab4591f785_2_690x428.png, https://llllllll.co/uploads/default/optimized/3X/f/d/fd857093bed505419889226cada614ab4591f785_2_1035x642.png 1.5x, https://llllllll.co/uploads/default/original/3X/f/d/fd857093bed505419889226cada614ab4591f785.png 2x" data-dominant-color="5E5D5D"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">automated_glitching_diagram</span><span class="informations">1289×800 39.7 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>i’m envisioning that the entire system will be managed by the beaglebone black using python, very similar to limitedresults’ system. chronologically the flow will look something like:</p>
<ol>
<li>glitch pulse delay and width parameters will be programmatically chosen from a given range</li>
<li>those parameters will be set for the glitch pulse</li>
<li>triggers are armed on the 640a and 2004c oscilloscopes using gpib</li>
<li>the script will supply power to the stem player from a gpio pin</li>
<li>when the 640a acquires a trigger during stem player power on, its trigger out will signal to code running on the beaglebone’s first pru to emit a pulse with the given parameters</li>
<li>the pulse will cause an n-channel mosfet to close and pull the stem player’s DEC1 to ground which is known as a “crowbar glitch”</li>
<li>an attempt will be made to attach the j-link to the stem player’s debugger thru openocd and download the firmware</li>
<li>if access to the debugger is successful, quit and wait for a human</li>
<li>if access to the debugger is denied, choose new glitch parameters and try again at step <span class="hashtag-raw">#2</span></li>
</ol>
<p>(the 2004c oscilloscope exists purely to monitor the characteristics of the glitch pulse output since i am short of 640a-compatible probes and the 640a is my only oscilloscope with a hardware trigger output)</p>
<p>here is the in-progress glitching code:</p><aside class="onebox githubrepo" data-onebox-src="https://github.com/resinbeard/beaglebone-black-glitcher">
  <header class="source">

      <a href="https://github.com/resinbeard/beaglebone-black-glitcher" target="_blank" rel="noopener nofollow noreferrer ugc">github.com</a>
  </header>

  <article class="onebox-body">
    <div class="github-row" data-github-private-repo="false">
  <img width="690" height="344" src="https://opengraph.githubassets.com/a369a32dd0fbe413956657e8ff4d8720/resinbeard/beaglebone-black-glitcher" class="thumbnail">

  <h3><a href="https://github.com/resinbeard/beaglebone-black-glitcher" target="_blank" rel="noopener nofollow noreferrer ugc">GitHub - resinbeard/beaglebone-black-glitcher: beaglebone black pru application that waits for a...</a></h3>

    <p><span class="github-repo-description">beaglebone black pru application that waits for a logic signal and outputs a pulse of given delay and width</span></p>
</div>

  </article>

  <div class="onebox-metadata">
    
    
  </div>

  <div style="clear: both"></div>
</aside>

<p>it should be noted that currently the pru is hardcoded to respond to ttl low and to use specific gpio pins. also the pulse delay/width “cycles” are about ~5ns each. i’ll post some measurements when i’m a little bit further along writing the gpib commands to pull plots off my oscilloscopes.</p>
<p>i would have all of the equipment i need for the hardware setup, but i made the mistake of buying a ~$100 national instruments gpib-usb-hs adapter off ebay for the remote arming of the 640a’s trigger from the beaglebone. well not only are 99% of ~$100 national instruments gpib-usb-hs devices on ebay chinese counterfeits, but they won’t work with the linux gpib drivers (they will work on windows). lesson learned after diving through sourceforge issues.</p>
<p>so i went ahead, bit the bullet, and bought a <a href="https://prologix.biz/product/gpib-usb-controller/" rel="noopener nofollow noreferrer ugc">prologix gpib usb controller</a> which will arrive in a few days. it’s worth it to me since i have some function generators and a spectrum analyzer that also have gpib interfaces.</p>

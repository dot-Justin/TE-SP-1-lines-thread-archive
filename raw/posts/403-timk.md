# Post #403

**Author:** TimK  
**Date:** 2025-09-04T21:51:11.669Z  
**Post ID:** 764464  

---

<p>Small update for those who still have hope for this device: there is still a little bit of activity on the discord!</p>
<p>The glitching and dumping of the original firmware has mostly stalled. Maybe <a class="mention" href="/u/elew">@elew</a>  will get to it one day… we’ll see when he has time again!</p>
<p>But meanwhile, <a class="mention" href="/u/josejx">@JoseJX</a> has done phenomenal work decoding the data that was dumped off the flash chip (with a tiny little bit of help from me). We have 24 bit 48kHz stereo WAV files of all stems now. This means we mostly understand the data structure. Still a little bit of work to be done on the metadata that is present along with the stems, but it’s almost there.</p>
<p>I have reverse engineered most of the PCB with help from some people on the discord and I know all signals except maybe 2 or 3.</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/3/a/3a6fbbad7bb3d7c928f2c81338387084aecea8da.jpeg" data-download-href="https://llllllll.co/uploads/default/3a6fbbad7bb3d7c928f2c81338387084aecea8da" title="kicad_view_mcu"><img src="https://llllllll.co/uploads/default/optimized/3X/3/a/3a6fbbad7bb3d7c928f2c81338387084aecea8da_2_690x366.jpeg" alt="kicad_view_mcu" data-base62-sha1="8kX4YZtlH0oSL3kAtHlIR61M7vI" width="690" height="366" srcset="https://llllllll.co/uploads/default/optimized/3X/3/a/3a6fbbad7bb3d7c928f2c81338387084aecea8da_2_690x366.jpeg, https://llllllll.co/uploads/default/optimized/3X/3/a/3a6fbbad7bb3d7c928f2c81338387084aecea8da_2_1035x549.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/3/a/3a6fbbad7bb3d7c928f2c81338387084aecea8da_2_1380x732.jpeg 2x" data-dominant-color="3D2137"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">kicad_view_mcu</span><span class="informations">1920×1019 298 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>I have also been working on a new firmware and have created an eMMC driver for nRF52840 that reads the flash memory at the same speed as the original stem player’s firmware.</p>
<p>I have audio via I2S up and running - I believe in a very similar way as the original - and can play audio over both speaker and headphone out. (I have made my stem player into a weird little synth as a test)</p>
<p>All the buttons and LEDs can be operated.</p>
<p>USB data transfer works too, but there is a bit of an issue: <em>If</em> this ever becomes a fully functional new firmware, data transfer will always be limited to USB2.0 full speed (12 Mbits per sec.)  That’s all  nRF52840 can do. Loading new stems will be slow. To give an example, I can dump the full 1.9GB of flash data in about 1h (!) over USB CDC. I do believe this can be improved, but it will always be kind of a slow device for transferring data.</p>
<p>I haven’t worked at all on the interfacing with the battery charging chip and the BT audio module. (this shouldn’t be too hard since I2S is working and we know all the signals)</p>

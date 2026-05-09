# Post #413

**Author:** TimK  
**Date:** 2025-09-28T19:06:24.392Z  
**Post ID:** 766905  

---

<p>Hi Lucas,</p>
<p>I can’t give people access to the discord since I’m only a guest over there, just like I am here. (where I’m sometimes allowed to post and sometimes I’m not… understandable but annoying !)</p>
<p>I believe JoseJX is an admin at the discord, you could try to contact him.</p>
<p>I am working on documenting all my work. I have compiled a lot of information that could be useful for development. I’d be happy to share it with anyone who wants to develop their own firmware for this thing.</p>
<p>Is there something specific you want to work on?</p>
<p>This is what I haven’t worked on yet:</p>
<ul>
<li>interfacing with the BT audio module (CYBT-353027-02)</li>
<li>interfacing with the battery charger (BQ24232)</li>
<li>Audio effects</li>
<li>PO / MIDI sync</li>
</ul>
<p>If anyone on here is familiar with eMMC programming/ bus timing, I would be interested in picking your brain. My eMMC driver runs at 32 MHz and works well, but when I switch to High Speed mode I’m getting inconsistent data reads. Strangely the THGBMNG5D1LBAIL in stem player allows me to go up to 32MHz without enabling High Speed mode, even though the eMMC standard specifically requires this.</p>
<p>As a little extra for the non devs, here’s a photo of my development unit. <img src="https://llllllll.co/images/emoji/apple/smiling_face_with_sunglasses.png?v=15" title=":smiling_face_with_sunglasses:" class="emoji" alt=":smiling_face_with_sunglasses:" loading="lazy" width="20" height="20"></p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/0/e/0eb31d23172be00f406bcf4d8790cb62c46a8267.jpeg" data-download-href="https://llllllll.co/uploads/default/0eb31d23172be00f406bcf4d8790cb62c46a8267" title="IMG_8153"><img src="https://llllllll.co/uploads/default/optimized/3X/0/e/0eb31d23172be00f406bcf4d8790cb62c46a8267_2_690x459.jpeg" alt="IMG_8153" data-base62-sha1="262qUWyIhIDThhLnwAShoP3ZzXF" width="690" height="459" srcset="https://llllllll.co/uploads/default/optimized/3X/0/e/0eb31d23172be00f406bcf4d8790cb62c46a8267_2_690x459.jpeg, https://llllllll.co/uploads/default/optimized/3X/0/e/0eb31d23172be00f406bcf4d8790cb62c46a8267_2_1035x688.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/0/e/0eb31d23172be00f406bcf4d8790cb62c46a8267_2_1380x918.jpeg 2x" data-dominant-color="4C4C4E"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">IMG_8153</span><span class="informations">1400×933 159 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>

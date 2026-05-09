# Post #207

**Author:** Duloz  
**Date:** 2025-01-31T20:27:09.776Z  
**Post ID:** 738774  

---

<p>This is what i had been leaning into with my script. If you hit it with my tests. if you hit it with my python script.<br>
see if it is of any use to you.</p>
<p>you will get successful responses with some commands w in the  neighborhood of bmRequestType = [0x08]. 0x40 and 0xc0 are supposed to be vendor specific request types, so it might be worth looking around there.</p>
<p>adjustments to lines 100 to 105 changes the query range. It will dump results to a CSV. it requires pyusb (pip3 pyusb). If the stem player turns off, it will save the last position to a json so you can start up again. If you have wireshark running and monitoring USB, i don’t think it will turn off.</p>
<p>This is all just brute force stuff though.</p>
<aside class="onebox googledrive" data-onebox-src="https://drive.google.com/file/d/1aokEFIfM1X4u8FJjYMs8v_SGcPJX-Fzb/view?usp=sharing">
  <header class="source">

      <a href="https://drive.google.com/file/d/1aokEFIfM1X4u8FJjYMs8v_SGcPJX-Fzb/view?usp=sharing" target="_blank" rel="noopener nofollow noreferrer ugc">drive.google.com</a>
  </header>

  <article class="onebox-body">
      <a href="https://drive.google.com/file/d/1aokEFIfM1X4u8FJjYMs8v_SGcPJX-Fzb/view?usp=sharing" target="_blank" rel="noopener nofollow noreferrer ugc"><span class="googledocs-onebox-logo g-drive-logo"></span></a>



<h3><a href="https://drive.google.com/file/d/1aokEFIfM1X4u8FJjYMs8v_SGcPJX-Fzb/view?usp=sharing" target="_blank" rel="noopener nofollow noreferrer ugc">control.py</a></h3>

<p>Google Drive file.</p>

  </article>

  <div class="onebox-metadata">
    
    
  </div>

  <div style="clear: both"></div>
</aside>


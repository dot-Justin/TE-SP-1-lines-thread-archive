# Post #13

**Author:** murray  
**Date:** 2024-04-11T18:19:18.501Z  
**Post ID:** 694741  

---

<p>the next useful step, to me, is to attempt to get the device into a mode/state to acquire a flash dump of the storage connected to the nRF52840 using the nordic development tools over usb. assuming there’s no other evidence of an alternative programming interface, my assumption is that’s how they program/populate the persistent memory at the factory. it may even be possible to decompile the resulting image and shake out some more answers.</p>
<p><a href="https://devzone.nordicsemi.com/f/nordic-q-a/86416/nrf52840-flash-dump" class="onebox" target="_blank" rel="noopener nofollow noreferrer ugc">https://devzone.nordicsemi.com/f/nordic-q-a/86416/nrf52840-flash-dump</a></p><aside class="onebox allowlistedgeneric" data-onebox-src="https://docs.nordicsemi.com/bundle/ug_nrf52840_dk/page/UG/dk/getting_started.html">
  <header class="source">
      <img src="https://docs.nordicsemi.com/assets/img/nordic-favicon.ico" class="site-icon" alt="" width="33" height="33">

      <a href="https://docs.nordicsemi.com/bundle/ug_nrf52840_dk/page/UG/dk/getting_started.html" target="_blank" rel="noopener nofollow noreferrer ugc">docs.nordicsemi.com</a>
  </header>

  <article class="onebox-body">
    <div class="aspect-image" style="--aspect-ratio:690/362;"><img src="https://cdn.zoominsoftware.io/nordic-theme-skin-prod/public/assets/img/Techdocs_blog_1200x630.png" class="thumbnail" alt="" width="690" height="362"></div>

<h3><a href="https://docs.nordicsemi.com/bundle/ug_nrf52840_dk/page/UG/dk/getting_started.html" target="_blank" rel="noopener nofollow noreferrer ugc">Technical Documentation</a></h3>



  </article>

  <div class="onebox-metadata">
    
    
  </div>

  <div style="clear: both"></div>
</aside>

<aside class="onebox allowlistedgeneric" data-onebox-src="https://www.rapid7.com/blog/post/2019/04/23/extracting-firmware-from-microcontrollers-onboard-flash-memory-part-2-nordic-rf-microcontrollers/">
  <header class="source">

      <a href="https://www.rapid7.com/blog/post/2019/04/23/extracting-firmware-from-microcontrollers-onboard-flash-memory-part-2-nordic-rf-microcontrollers/" target="_blank" rel="noopener nofollow noreferrer ugc">Rapid7</a>
  </header>

  <article class="onebox-body">
    <div class="aspect-image" style="--aspect-ratio:690/362;"><img src="https://www.rapid7.com/rapid7-social-card.jpg" class="thumbnail" alt="" width="690" height="362"></div>

<h3><a href="https://www.rapid7.com/blog/post/2019/04/23/extracting-firmware-from-microcontrollers-onboard-flash-memory-part-2-nordic-rf-microcontrollers/" target="_blank" rel="noopener nofollow noreferrer ugc">Hardware Hacking: Extracting Firmware from Nordic RF Micrcontrollers | Rapid7...</a></h3>

  <p>In this blog, we will conduct another firmware extraction exercise dealing with the Nordic RF microcontroller (nRF51822).</p>


  </article>

  <div class="onebox-metadata">
    
    
  </div>

  <div style="clear: both"></div>
</aside>

<p>(just in case it’s not clear–be really careful with these tools. from a brief scan of the nordicsemi’s development resources, it’s possible that teenage engineering is using custom written drivers and overwriting anything important on the flash would <s>hose</s> set back this effort)</p>

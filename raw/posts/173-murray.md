# Post #173

**Author:** murray  
**Date:** 2025-01-20T09:28:09.088Z  
**Post ID:** 736761  

---

<p>sunday evening update–</p>
<p>tonight i connected the tds640a’s trigger output to the beaglebone black and then connected a designated gpio to send a pulse to both oscilloscopes for voltage and timing measurements. it took some perusing documentation, but i ended up with this code which i loaded onto pru0 of the beaglebone:</p>
<pre><code class="lang-auto">#include &lt;stdint.h&gt;
#include &lt;stdbool.h&gt;
#include &lt;pru_cfg.h&gt;
#include "resource_table_empty.h"
#include "prugpio.h"

volatile register uint32_t __R30;
volatile register uint32_t __R31;

void main(void)
{
  bool reset_pulse = false;
  const unsigned long pulse_delay_cycles = 1000;
  const unsigned long pulse_width_cycles = 1000;
  uint32_t gpio_p9_27_in = P9_27;
  uint32_t gpio_p9_30_out = P9_30;

  /* Clear SYSCFG[STANDBY_INIT] to enable OCP master port */
  CT_CFG.SYSCFG_bit.STANDBY_INIT = 0;

  while(1) {
    if( (__R31 &amp; gpio_p9_27_in) == gpio_p9_27_in ) {
      reset_pulse = true;;
    } else {
      if( reset_pulse ) {
        __delay_cycles(pulse_delay_cycles);
        __R30 |= gpio_p9_30_out;
        __delay_cycles(period_width_cycles);
        __R30 &amp;= ~gpio_p9_30_out;
        reset_pulse = false;
      }
    }
  }
  __halt();
}
</code></pre>
<p>successfully triggering on the stem player’s power lines yielded good results (the beaglebone black is peeking out the side on the right):</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/7/1/71411a5dbfb3032e83f61c6133621747bfa4faa1.jpeg" data-download-href="https://llllllll.co/uploads/default/71411a5dbfb3032e83f61c6133621747bfa4faa1" title="20250120_000455"><img src="https://llllllll.co/uploads/default/optimized/3X/7/1/71411a5dbfb3032e83f61c6133621747bfa4faa1_2_666x500.jpeg" alt="20250120_000455" data-base62-sha1="g9Tr4B3AQVpwzO9rQZLG0lAqrPb" width="666" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/7/1/71411a5dbfb3032e83f61c6133621747bfa4faa1_2_666x500.jpeg, https://llllllll.co/uploads/default/optimized/3X/7/1/71411a5dbfb3032e83f61c6133621747bfa4faa1_2_999x750.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/7/1/71411a5dbfb3032e83f61c6133621747bfa4faa1_2_1332x1000.jpeg 2x" data-dominant-color="4B494E"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">20250120_000455</span><span class="informations">1920×1440 259 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>we have a 5us ~3.3V pulse generated at the time of trigger acquisition:</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/f/0/f0f947e4be3c3fbf9d5b7e006cb34bc956b924c2.jpeg" data-download-href="https://llllllll.co/uploads/default/f0f947e4be3c3fbf9d5b7e006cb34bc956b924c2" title="20250120_000511"><img src="https://llllllll.co/uploads/default/optimized/3X/f/0/f0f947e4be3c3fbf9d5b7e006cb34bc956b924c2_2_666x500.jpeg" alt="20250120_000511" data-base62-sha1="ynKFPhC3sLD6rPMRzn8hqd26xkm" width="666" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/f/0/f0f947e4be3c3fbf9d5b7e006cb34bc956b924c2_2_666x500.jpeg, https://llllllll.co/uploads/default/optimized/3X/f/0/f0f947e4be3c3fbf9d5b7e006cb34bc956b924c2_2_999x750.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/f/0/f0f947e4be3c3fbf9d5b7e006cb34bc956b924c2_2_1332x1000.jpeg 2x" data-dominant-color="423E55"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">20250120_000511</span><span class="informations">1920×1440 229 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>and an exaggerated scale of the pulse on channel 3 shows that it coincides with the power line trigger acquisition on channel 1:</p>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/5/c/5c89c05aef435a279dff08a63509cb17df40a38d.jpeg" data-download-href="https://llllllll.co/uploads/default/5c89c05aef435a279dff08a63509cb17df40a38d" title="20250120_000516"><img src="https://llllllll.co/uploads/default/optimized/3X/5/c/5c89c05aef435a279dff08a63509cb17df40a38d_2_666x500.jpeg" alt="20250120_000516" data-base62-sha1="dcD3BYTKEaH46xZNVlasJ3IPvcx" width="666" height="500" srcset="https://llllllll.co/uploads/default/optimized/3X/5/c/5c89c05aef435a279dff08a63509cb17df40a38d_2_666x500.jpeg, https://llllllll.co/uploads/default/optimized/3X/5/c/5c89c05aef435a279dff08a63509cb17df40a38d_2_999x750.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/5/c/5c89c05aef435a279dff08a63509cb17df40a38d_2_1332x1000.jpeg 2x" data-dominant-color="3C3334"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">20250120_000516</span><span class="informations">1920×1440 247 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>manually arming the tds640a is a bit tedious and while i’ll probably manually trigger the first few glitch campaigns, if i don’t make progress then i’ll probably be forced to fully automate this procedure like limitedresults had done. i’m lucky that the tds640a has an obsolete gpib interface because gpib&lt;-&gt;usb adapters are pretty readily available and Tom Verbeure wrote up a nice article on working with his own tds420a from linux using a native instruments gpib-usb-hs dongle:</p>
<aside class="onebox allowlistedgeneric" data-onebox-src="https://tomverbeure.github.io/2020/06/27/Tektronix-TDS420A-Remote-Control-over-GPIB.html">
  <header class="source">

      <a href="https://tomverbeure.github.io/2020/06/27/Tektronix-TDS420A-Remote-Control-over-GPIB.html" target="_blank" rel="noopener nofollow noreferrer ugc" title="07:00AM - 27 June 2020">Electronics etc… – 27 Jun 20</a>
  </header>

  <article class="onebox-body">
    

<h3><a href="https://tomverbeure.github.io/2020/06/27/Tektronix-TDS420A-Remote-Control-over-GPIB.html" target="_blank" rel="noopener nofollow noreferrer ugc">Tektronix TDS 420A Remote Control over GPIB</a></h3>



  </article>

  <div class="onebox-metadata">
    
    
  </div>

  <div style="clear: both"></div>
</aside>

<p>the associated oscilloscopes’ programmers manual looks like single trigger acquisitions are (probably) possible:</p>
<p><a class="attachment" href="/uploads/short-url/da22mL8xe1DvJwqyFGTX7OQoWxO.pdf">tektronix_tds_programmers_manual.pdf</a> (1.7 MB)</p>
<p>after enabling remote arming of the oscilloscope i’d then modify the beaglebone pru code to grab the values for <code>pulse_delay_cycles</code> and <code>pulse_width_cycles</code> from shared memory populated by a userspace program. and lastly, look at the feasibility of running the stem player system from the beaglebone black’s gpio’s (probably using the second pru).</p>
<p>anyways, more immediately i’ll use my next pocket of time i find to think and decide on ideal pulse characteristics which i’ll use to begin my manual glitch campaign on the nordicsemi chip.</p>

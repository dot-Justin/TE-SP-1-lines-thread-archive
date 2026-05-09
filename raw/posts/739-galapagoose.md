# Post #739

**Author:** Galapagoose  
**Date:** 2026-03-08T23:48:40.303Z  
**Post ID:** 785806  

---

<p>re: MIDI clock. just checked on hardware, and a midi clock message is just a 128uS pulse! i tried to reason it out but failed, but it kind of makes sense because midi clock is <code>0xf8</code> which is just <code>11111000</code> in binary.</p>
<p>so theoretically, the pin is hooked up to a UART that is sending <code>0xf8</code> but it could also just be a GPIO with a fixed pulse width. generic midi out should be possible if the pin hooked up to the port is able to be a uart TX pin!</p>

# Post #146

**Author:** Galapagoose  
**Date:** 2025-01-15T22:02:13.985Z  
**Post ID:** 736069  

---

<p>Yes I think this might be my comment being unclear. The USB signal traces connect directly to the uC, but the USB <em>power</em> goes to the battery charger chip, and then onto voltage regulation before powering the chip. This is very typical &amp; doesn’t change the centrality of the uC.</p>
<p>Every connection on the whole board is controlled by the uC directly. There is no other logic chip on the board, and the firmware for the uC is the only variable here (well apart from the storage on the memory chip, but this is almost certainly just the playback data. the firmware will be saved in the chip’s flash).</p>

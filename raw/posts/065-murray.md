# Post #65

**Author:** murray  
**Date:** 2025-01-09T05:49:38.015Z  
**Post ID:** 734762  

---

<p>i managed to open mine up in a way to keep the device powered while the top of the pcb is exposed (carefully prying the battery out of its adhesive, breaking a volume button off its traces in the process [whoops, not whoops]).</p>
<p>probed around for obvious clock signals with an oscilloscope and tested voltage+continuity with a dmm. the traces in the silkscreened box look like either a chip footprint or, if we’re really lucky, some kind of jtag header. from top-left to bottom-right i’ve got:<br>
[ GND ] [GND] [GND] [GND] [3.3V]<br>
[   ?    ] [  ?   ][   ?   ] [  ?   ][3.3V]<br>
GND is continuity with the pcb ground, not necessarily a confirmed ground.</p>
<p>next step for me (or someone else) is to use a debugger to probe around for SWDIO and SWCLK. i lost my debugger in the move to oakland and my daughter is crying so that’s it for me until saturday or something.</p>

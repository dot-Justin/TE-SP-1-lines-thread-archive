# Post #794

**Author:** lynatic  
**Date:** 2026-03-18T00:06:10.476Z  
**Post ID:** 787094  

---

<p>Afaik firmware ≠ storage. There’s a small firmware storage chip inside the SoC and a larger chip that stores the audio files. The SoC has the APPROTECT bit set, meaning the firmware can’t be ready out (basically it has copy-protection) but it can still be overwritten. There is an attack to bypass that protection but it requires an elaborate hardware setup. Some people tried it and bricked their stem player in the process, then gave up.</p>
<p>This is where we are now. Flashing a new firmware doesn’t change the audio files since they’re on a separate chip. Timk is now developing a custom firmware from scratch (would be less of an IP-nightmare to publish anyway).</p>

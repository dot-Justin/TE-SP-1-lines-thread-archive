# Post #227

**Author:** murray  
**Date:** 2025-02-10T19:52:01.486Z  
**Post ID:** 740182  

---

<p>heya! my best advice would be to read the entire topic (i know that it’s kind of long, but it’s the best way to catch up on what’s been considered, done, and planned) and if you feel that there are any gaps jump on in. but other than that and more specifically:</p>
<ol>
<li>if you have some hardware/software skills+tools, it would be beneficial to have a few copies of the firmware binary to compare against each other (and no one to my knowledge has dumped the flash yet, so the more folks working on that the better).</li>
<li>setting up an environment for static code analysis and disassembly of the firmware when we have it. i’m not particularly experienced in reverse-engineering ARM machine code (though i like to think i learn quick). there is a proof of concept set of nRF5x disassembly tools for ida pro on github (<a href="https://github.com/DigitalSecurity/nrf5x-tools" class="inline-onebox" rel="noopener nofollow noreferrer ugc">GitHub - DigitalSecurity/nrf5x-tools: Nordic Semiconductor nRF5x series disassembly tools · GitHub</a>), but they are seven years old and i fully do not expect them to work out of the box. i also don’t have a license to ida pro (i’m attempting to obtain a legal one through edu channels).</li>
</ol>
<p>i will say that if you’re not participating in attempting the firmware dump, it’s probably not worth opening up and modifying your stem player until we have a viable path towards uploading custom data to the device.</p>

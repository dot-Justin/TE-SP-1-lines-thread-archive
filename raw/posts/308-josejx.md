# Post #308

**Author:** JoseJX  
**Date:** 2025-03-01T20:17:00.550Z  
**Post ID:** 742718  

---

<p>I’m new here, so I’m not sure that I can get PMs, but you can reach me at the same name (JoseJX) at reddit until I have more permissions here for anything you don’t want to post publicly yet.</p>
<p>As a broad overview of what’s on the flash:</p>
<ul>
<li>It appears to use 8K sectors</li>
<li>The first 8K are used for album information and track metadata (offset, length in 8K chunks)</li>
<li>The songs themselves appear to be blocked into 2K chunks.</li>
<li>There’s a likely checksum byte at the start of each 2K block (but I don’t have the algorithm for this yet)</li>
<li>There’s 7 bytes of metadata at the end of the 2K block, with time keeping information in the first three bytes and then 4 bytes of presumed LED brightness (maybe, it looks kinda right?)</li>
<li>The track data itself appears to be interleaved by bytes for left and right channels for the track in big endian, but they go through all 4 of the 2K blocks in each sector.</li>
<li>I still have some data that’s out of place, I’ve got a little bit of information bleed which is distorting the audio, but I haven’t figured out where I’ve made a mistake yet.</li>
</ul>

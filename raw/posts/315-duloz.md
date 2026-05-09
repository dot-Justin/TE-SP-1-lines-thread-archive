# Post #315

**Author:** Duloz  
**Date:** 2025-03-06T14:24:14.302Z  
**Post ID:** 743289  

---

<p>I’ve gotten some different results in decompiling between Ghidra and just using a command line decompiler. Each one is able to decompile things that the other didn’t. My next focus is closing those gaps if possible.</p>
<p>It seems like there might be three conditions that need to be met for privilege mode if I am on the right track. Two must be non-zero (possibly those magic button combinations), the third expects an 8 from some variable.</p>

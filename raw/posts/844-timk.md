# Post #844

**Author:** TimK  
**Date:** 2026-04-03T14:57:20.379Z  
**Post ID:** 788973  

---

<p>Yeah, I took a little break from working on my own firmware because I just have too much work right now and I found a way to play my own stems on the original TE firmware, so no custom FW needed for that! (I’ve still been using my own custom firmware and software to load the stems onto the stem player)</p>
<p>To play new audio on the original firmware, we have to fully understand the SP-1 audio format, including all the meta data. I had figured out the audio part months ago and the album meta data is pretty straightforward. All this is documented in the Github repo.<br>
Just this week, I fully reversed the last missing piece: the timing data bytes that allow for all the looping and other time based effects. I’ll test my findings ASAP to make sure I got it right before I publish bad info.</p>
<aside class="quote no-group" data-username="louwrens" data-post="842" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/louwrens/48/110233_2.png" class="avatar"> louwrens:</div>
<blockquote>
<p>The dev you are talking about here is to make something that will encode the stems into the correct format according to the documentation you compiled and shared?</p>
</blockquote>
</aside>
<p>Yes! It seems to me that most people would be perfectly happy to keep using the original TE firmware and just play their own music. Development would be needed to create a tool that can convert 8 channel WAV files (or 4 stereo files) into the SP-1 audio format, add all the metadata and transfer to the player. There is a way to do that and I’ll work on that next when I have time again. Of course, once the data format and the transfer protocol are fully documented, anyone could build a tool to add new stems!</p>
<p>I still think custom FW is pretty cool, and I hope my developer documentation would be helpful for people interested in this. I have also half set up a Discord server for discussion on the software and firmware development, but I haven’t gotten around to finishing it because again, not enough time.. (and I have no clue what I’m doing with that stuff! <img src="https://llllllll.co/images/emoji/apple/face_with_peeking_eye.png?v=15" title=":face_with_peeking_eye:" class="emoji" alt=":face_with_peeking_eye:" loading="lazy" width="20" height="20">)<br>
I’m truly sorry for anyone who is eagerly waiting to start development, I promise I’m going as fast as I can!<br>
And sorry for this wall of text!</p>
<aside class="quote no-group" data-username="CH23" data-post="843" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/ch23/48/115296_2.png" class="avatar"> CH23:</div>
<blockquote>
<p>TExas</p>
</blockquote>
</aside>
<p><img src="https://llllllll.co/images/emoji/apple/joy.png?v=15" title=":joy:" class="emoji" alt=":joy:" loading="lazy" width="20" height="20"> IT ALL MAKES SENSE NOW!</p>

# Post #222

**Author:** brick  
**Date:** 2025-02-09T22:40:32.688Z  
**Post ID:** 740059  

---

<p>if you crack it open, the board should show a revision code. I don’t know mine’s off the top of my head but i could easily check when i’m back home.<br>
i intend to take a look at what kinds of commands the port is responding to, but i need to do a lot more reading into the USB protocol to be able to decipher it. there’s a bruteforce script to try raw USB commands, and a dump of some of the trials in these two posts from <a class="mention" href="/u/duloz">@Duloz</a>:</p>
<aside class="quote no-group quote-modified" data-username="Duloz" data-post="113" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/duloz/48/102833_2.png" class="avatar"> Duloz:</div>
<blockquote>
<p>Probably useless, and maybe more bad news than good. Made a script to brute force usb control transfer commands. Results are in the file.</p>
<p><a href="https://drive.google.com/file/d/1vRb7t_11UlLmWAbJlNx3a8j5V9fw41Ws/view?usp=drive_link" rel="noopener nofollow noreferrer ugc">https://drive.google.com/file/d/1vRb7t_11UlLmWAbJlNx3a8j5V9fw41Ws/view?usp=drive_link</a></p>
</blockquote>
</aside>
<aside class="quote no-group" data-username="Duloz" data-post="207" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/duloz/48/102833_2.png" class="avatar"> Duloz:</div>
<blockquote>
<p>This is what i had been leaning into with my script. If you hit it with my tests. if you hit it with my python script.<br>
see if it is of any use to you.</p>
</blockquote>
</aside>
<hr>
<aside class="quote no-group" data-username="elew" data-post="215" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/elew/48/103639_2.png" class="avatar"> elew:</div>
<blockquote>
<p>Something we <em>didnt</em> consider is the eMMC could have write protect enabled according to spec it seems you can permanently enable it. We won’t know till we finish the exploit (hopefully I can get to tomorrow, waiting for a couple parts)</p>
</blockquote>
</aside>
<p>While this is a potential concern, I don’t see it as being likely. The current released version of the Stem Player has a lot of marketing around it that it’s “a new way to listen to music” and that other people could (theoretically) release music to be on the Stem Player. Unless this was a feature that was dreamed up later, I don’t see why eMMC would be locked, as that would mean that this would be impossible in the future.<br>
But then again, take anything i say with a grain of salt. Fingers crossed i’m right about it though <img src="https://llllllll.co/images/emoji/apple/sob.png?v=15" title=":sob:" class="emoji" alt=":sob:" loading="lazy" width="20" height="20"></p>

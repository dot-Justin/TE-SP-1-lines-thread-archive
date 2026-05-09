# Post #96

**Author:** brick  
**Date:** 2025-01-11T19:38:05.222Z  
**Post ID:** 735278  

---

<p>by golly lines folks, you’ve got me interested. i just ordered one for myself. Count me in on this hacking effort!!</p>
<aside class="quote no-group" data-username="Blazeauga" data-post="52" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/letter_avatar_proxy/v4/letter/b/e47774/48.png" class="avatar"> Blazeauga:</div>
<blockquote>
<p>We should find a capable software engineer online who would take on the project passionately and then crowd fund him a unit to experiment with.</p>
</blockquote>
</aside>
<p>I’m a computer engineer willing to take on the project passionately! Capable? That’s a different question <img src="https://llllllll.co/images/emoji/apple/joy.png?v=15" title=":joy:" class="emoji" alt=":joy:" loading="lazy" width="20" height="20"><br>
I’m still only a computer engineering undergrad, so who knows what i’ll be able to achieve. I am doing a focus on embedded systems though, so this’ll be some great personal project experience.</p>
<aside class="quote no-group" data-username="Galapagoose" data-post="82" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/galapagoose/48/13_2.png" class="avatar"> Galapagoose:</div>
<blockquote>
<p>i got stuck on the jtag header because i dont have a real programmer (just stlink’s which are more locked down and less flexible). setting up a raspi as a jlink but that wont happen for a few days.</p>
</blockquote>
</aside>
<p><s>actually i think i <em>do</em> have a jtag programmer somewhere. got one in a box of assorted DIY euro stuff from a eurorack sales FB group, i may have to dig it out.</s> i think it’s an stlink one, having googled “stlink jtag debugger”. that said, i’ll have access to equipment at my uni when the semester starts back up soon, and there’s no way they won’t have one. i’ll ask a professor.</p>
<hr>
<h2><a name="p-735278-bricks-usual-idle-yapping-incoming-1" class="anchor" href="#p-735278-bricks-usual-idle-yapping-incoming-1" aria-label="Heading link"></a>brick’s usual idle yapping incoming!</h2>
<hr>
<aside class="quote no-group" data-username="Galapagoose" data-post="68" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/galapagoose/48/13_2.png" class="avatar"> Galapagoose:</div>
<blockquote>
<p>USB lines are noted as well</p>
</blockquote>
</aside>
<p>oh hold on… usb data lines go straight to the SoC, and the information says that the chip has a built in usb 2.0 interface. those pins (AD5 and AD7) are… <em>[checks document]</em> well it looks like they’re actually AD4/6, which are, big surprise, usb D- and D+ respectively. So the USB jack is routed to the chip’s built in usb data interface; it’s not just tied to whatever.</p>
<p>This doesn’t really get us closer to anything, but it does confirm that there can be <em>some</em> way to get data from the chip to usb, the question is just how.</p>
<hr>
<p>as another thought, since everyone is talking about button combos; given that the usb is tied to the SoC itself, any button combos would need to be using buttons tied to the SoC’s pins. someone who has one currently could be well served by following the button traces; any that <em>don’t</em> lead to the N52840 are guaranteed to not be included for any potential bootloader combo. if there are any that aren’t connected to the chip, it should reduce the possibility space drastically.</p>
<hr>
<aside class="quote no-group" data-username="robbie" data-post="11" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/robbie/48/75581_2.png" class="avatar"> robbie:</div>
<blockquote>
<p>a Toshiba <a href="https://www.digikey.com/en/products/detail/kioxia-america-inc/THGBMNG5D1LBAIL/9841782" rel="noopener nofollow noreferrer ugc">THGBMNG5</a> 4GB eMMC flash,</p>
</blockquote>
</aside>
<p>audio media is most definitely being stored on this chip. if we’re only looking to put something else on it, a direct modification of the data on this chip would probably be the easiest. it’s likely that the SoC is just pulling direct audio files off the chip, no idea what format they’d be in; but it’s a good idea to check what is being stored on this chip and how, i’d use a file recovery tool. if someone is willing to desolder this chip and hook it up to a usb interface chip it’d be relatively easy to look into, if requiring a hot air station.<br>
on another note, what traces are carrying the audio signal flow? does the flash chip send a digital signal straight to the audio chip or is it run through the SoC ? this would be a good thing to check.</p>
<hr>
<aside class="quote no-group" data-username="Duloz" data-post="95" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/duloz/48/102833_2.png" class="avatar"> Duloz:</div>
<blockquote>
<p>despite it being visible in a normal BT scan.</p>
</blockquote>
</aside>
<p><s>wait, so it <em>is</em> visible in a standard BT scan? i thought it was stated further up in the thread that it <em>wasn’t</em>.<br>
we should probably start noting our models’ hardware revisions, when we note what we’re seeing or finding. it’s possible there’s major firmware revisions in addition to hardware ones between units.</s></p>
<p>edit: ignore anything i’ve said about BT. looking at the manual further up, shows that the BT functionality is for connecting to speakers or headphones. bluetooth on the device is probably configured as an audio streaming source; so any attempts to retrieve data off of this are probably going to hit a dead end.</p>
<hr>
<p>edit 2:</p>
<aside class="quote no-group" data-username="instantjuggler" data-post="34" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/instantjuggler/48/63559_2.png" class="avatar"> instantjuggler:</div>
<blockquote>
<p>Someone just posted the internals over on Reddit:</p>
</blockquote>
</aside>
<p><div class="lightbox-wrapper"><a class="lightbox" href="https://llllllll.co/uploads/default/original/3X/1/a/1ae4a07a383eaa5699f51e575da65877d0e2d7e1.jpeg" data-download-href="https://llllllll.co/uploads/default/1ae4a07a383eaa5699f51e575da65877d0e2d7e1" title="image"><img src="https://llllllll.co/uploads/default/optimized/3X/1/a/1ae4a07a383eaa5699f51e575da65877d0e2d7e1_2_270x375.jpeg" alt="image" data-base62-sha1="3PUfbTFYcc5cIidurdUw5W4kmop" width="270" height="375" srcset="https://llllllll.co/uploads/default/optimized/3X/1/a/1ae4a07a383eaa5699f51e575da65877d0e2d7e1_2_270x375.jpeg, https://llllllll.co/uploads/default/optimized/3X/1/a/1ae4a07a383eaa5699f51e575da65877d0e2d7e1_2_405x562.jpeg 1.5x, https://llllllll.co/uploads/default/optimized/3X/1/a/1ae4a07a383eaa5699f51e575da65877d0e2d7e1_2_540x750.jpeg 2x" data-dominant-color="69655F"><div class="meta"><svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"></use></svg><span class="filename">image</span><span class="informations">722×1000 89.9 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"></use></svg></div></a></div></p>
<p>oh? hold on, that’s strange… this is a <em>second</em> bluetooth chip, specifically <a href="https://www.infineon.com/cms/en/product/wireless-connectivity/airoc-bluetooth-le-bluetooth-multiprotocol/airoc-bluetooth-modules/cybt-353027-02/#!?fileId=8ac78c8c7d0d8da4017d0ee5e2336db4" rel="noopener nofollow noreferrer ugc">an audio transciever</a>.</p>
<hr>
<p>edit 3:</p>
<aside class="quote no-group" data-username="Galapagoose" data-post="66" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/galapagoose/48/13_2.png" class="avatar"> Galapagoose:</div>
<blockquote>
<p>but that last pin really needs to be a signal pin for my hypothesis to work out.</p>
</blockquote>
</aside>
<aside class="quote no-group" data-username="murray" data-post="67" data-topic="66795">
<div class="title">
<div class="quote-controls"></div>
<img alt="" width="24" height="24" src="https://llllllll.co/user_avatar/llllllll.co/murray/48/64912_2.png" class="avatar"> murray:</div>
<blockquote>
<p>right there with you–i was pretty deflated to find 3.3V on that pin</p>
</blockquote>
</aside>
<p>i’m assuming you’re referring to pad/pin 10 here [RESET]. it’s worth noting that these sorts of devices often have their reset pins function as active low; so it would make sense that the pad ties high to 3v3. if you look at the pinout, it also technically notes the pin as “<em><strong>n</strong></em>RESET”. it’s likely tied high through an internal pullup or something, which is why you’re reading 3v3.</p>

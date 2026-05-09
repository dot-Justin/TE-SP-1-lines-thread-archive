# Post #422

**Author:** Ben_Jabituya  
**Date:** 2025-10-21T02:00:32.437Z  
**Post ID:** 769165  

---

<p>Sure on the video, il put a link here once I have it done <img src="https://llllllll.co/images/emoji/apple/slight_smile.png?v=15" title=":slight_smile:" class="emoji" alt=":slight_smile:" loading="lazy" width="20" height="20"> will still be a few weeks once I get time. That’s great you’re able to see they coded it natively in nrf, defo makes things even more confusing why’d they’d pick it! It’s an amazing SoC but just an odd way to implement and not use BLE.</p>
<p>Your schematic and layout is a good starting point for a replacement board. and yes it looks like you and others put some serious time into it but I get how it’s easy to go down rabbit holes once you start lol. I would basically create a copy of the project and delete the mmc chip and swap it for a micro sd reader, the protocol is similar so all the wires are the same although you’d delete 4 of the data wires. I don’t know what sd reader part would work best based but hopefully something can fit. For mcu, something like STM32F413CGU6 would be good if it can support all the gpios needed-a lot of stm32F4s with &gt;1MB flash and 256k sram would work well-this one has a smallish footprint. If you have the pinout from that FPC I don’t mind at least checking a couple of mcu options and showing how I think the peripherals should be wired and setup in Cube IDE.</p>
<p>The Kano version used an stm32H750, I’ve never even opened mine yet but there are teardown videos on YouTube I’ve seen. It seems overkill but I think part of the reason might be USB data transfer-H7 can do USB high speed. Some F4s can do high speed as well I think but you need extra parts. Kano actually just implemented usb badly and it was still slow for them anyway but it’s an option for this; could replace the Nordic chip for a basic spec stm32H7 and keep an emmc on the board as it is now and then do file transfers over usb…the board will be more costly to make though.</p>

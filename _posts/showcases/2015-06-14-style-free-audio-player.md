---
layout: showcase
title: SFAP.js

excerpt: A lightweight style-free audio player.

excerptlong: A smooth user experience hinges on consistency. Every time you break from your brand's styleguide to include an external widget, you're adding inconsistency.

summary: Styling default HTML audio elements is a pain. Thankfully we can use the Web Audio API to recreate our own audio player. One we can style with CSS. One where *we* have control of the markup.

category: showcase
comments: true
featured: true

customJs: audioPlayer.js
customCss: audioPlayer.min.css

audioLinks:
- trackName: The Woodpile
  bandName: Frightened Rabbit
  albumName: Pedestrian Verse
  url: /assets/audio/TheWoodpile.mp3

showcaselink: http://tomhazledine.com/audio/
showcaselinkshort: tomhazledine.com/audio
---

Styling default HTML `<audio>` elements is a pain. We *should* be able to do it with CSS, but sadly at the moment we have to battle the "shadow DOM" to get anywhere. Thankfully we can use the Web Audio API to recreate our own audio player. One we can style with CSS. One where *we* have control of the markup.

The **Style-Free Audio Player (SFAP)** aims to solve this problem.

> You bring the markup, you bring the CSS, SFAP.js brings the functionality.

{% include audioPlayer.html %}

---

{:.noFancyPs}
SFAP.js is all about keeping it simple. Every audio file you want to include in a page gets:

* A play/pause button.
* A *songPlayTimer* element that displays the current playhead position of the audio file in minutes and seconds (MM:SS).
* A *songDuration* element that displays the total length of the audio file in minutes and seconds (MM:SS).
* A HTML range input field that shows a visual representation of the audio file's play progress, and can manually change the play position of the audio file.

Anything else is up to you. As long as those elements are present for each audio file, the player will work.

To try **SFAP.js** for yourself, head over to the [demo site at tomhazledine.com/audioDemo](http://tomhazledine.com/audioDemo/). There you can download the source code and read the installation and usage guides.

---

This started out as a "scratch your own itch" tool for a specific project. I'm open-sourcing it in the hope it might prove useful to others too. There are *a few* audio player tools/plugins out there, but most have too many features for my needs. I like simplicity, and I like any JS I add to my sites to be as lean as possible.

I'm hoping SFAP can be of use to as many people as possible. If you have an improvement or bug-fix or new feature, get in touch! Make a pull request on the [SFAP Github repo](https://github.com/tomhazledine/stylefreeaudio). I'm just getting started with "open source", so I'd be very glad of any help or suggestions or advice.

{% include audioData.html %}
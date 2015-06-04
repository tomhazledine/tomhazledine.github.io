---
layout: post
title: "Getting started with inline SVG icons"

excerptlong: As a typography nerd, using a custom font to serve icons felt really good. It turns out inline SVG icons are better in almost every way.

excerptmini: "We should all be using SVG icon sets"

excerpt: "I've long been an advocate of using icon fonts. They're resolution-independent, light-weight, and stylable with CSS. It turns out they're not the best option: inline SVG icons are better in almost every way."

comments: true
category: article
featured: true
---

<!--![png – font character – svg](/)
with scale-slider?-->

We should all know by now that using raster images for icons is a bad idea. Limiting ourselves to one set resolution is not how we work in a multi-device ecosystem. It's not responsive, it's not performant, it's not nice.

For a while it seemed that Icon Fonts were the answer. They're vector based and therefore resolution-independent. You can style them with CSS. They have smaller filesizes than .JPGs or .PNGs, so they improve a site's performance. A fontfile is one asset to download (more http requests = poorer site performance), so we don't need to mess around with image sprites any more. And on top of all that, iconfont creation can be easily automated with your task-runner of choice: simply drop your icon .SVGs into a folder and you're good to go.

    // Calling an iconfont icon as a pseudo element within CSS.
	.elementName:before {
        font-family:'iconfont';
		content: "\e001"; // The unicode value of the font character you want.
		color: #000; // The icon is text, so you can style it using regular CSS
	}

## If it ain't broke, why fix it?

Lately the winds of change have been blowing. Fewer and fewer big-name sites are using iconfonts, and more and more are publicly coming out in favour of inline SVGs. At first I was sceptical: "that probem's already been solved", I thought. Actually inlining raw SVG code into a site seemed overly complicated, and harder to maintain and automate than an iconfont setup. But was it? And were iconfonts as great as they first appeared?

* ### When iconfonts fail, things get weird.

  Sometimes there's no telling what crazy character a browser will display in place of an icon that hasn't loaded.

* ### There are inexplicable rendering inconsistencies.

  Firefox in particular seemed, like an overly generous grandparent, determined to fatten my icons up. Faux-bold on regular fonts is ugly and annoying, but when it happens to brand assets like icons it's excruciating (and something clients *always* pick up on).

* ### Automation isn't so seamless after all.

  Oh hey, my `npm install` keeps failing. I wonder what the problem is: oh yeah, my `gulp-iconfont` is throwing errors all up in my grill. Again. \#facepalm

By contrast, pure SVG is a much more consistent format. I've been using SVGs within `<img>` tags since 2006, and I've never had any trouble with setting SVGs as CSS background images.

    // SVG CSS background-image.
    .elementName {
        height:1em;
        width:1em;
        background-image: url(path/to/icon.png); // Fallback for browsers that don't like SVG.
        background-image: url(path/to/icon.svg);
    }

## Why SVG icons are better

* good support, with better fallbacks
* in Jekyll even more performant: inline = no requests
* consistent rendering
* in-icon styling
* gulp automation more reliable

## How SVG icons work

* symbols & use
* gulp-svg-sprite

## "gotchas" with SVG icons

## php weirdness

This code 

    <?php include_once("path/to/svg/sprite.svg"); ?>

did not work.

    <?php
    $rawSVG = file_get_contents(get_template_directory_uri() . "/path/to/svg/sprite.svg");
    echo preg_replace( '/fill=("|\')(#)?([a-fA-F0-9]*)("|\')/i', '', $rawSVG )
    ?>

* fill on paths overrides everything

## SVG icons with Jekyll

* Jekyll include
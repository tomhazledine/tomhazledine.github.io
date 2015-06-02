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

## Why icon fonts are good

* style with css
* automate with Gulp
* resolution agnostic
* performant

## Why icon fonts are bad

* unpredictable fallbacks
* rendering inconsistencies
* unpredictable gulp support

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

    include_once("assets/icons/symbol/svg/sprite.symbol.svg");

did not work.

    <?php
    $rawSVG = file_get_contents(get_template_directory_uri() . "/assets/icons/symbol/svg/sprite.symbol.svg");
    echo preg_replace( '/fill=("|\')(#)?([a-fA-F0-9]*)("|\')/i', '', $rawSVG )
    ?>

* fill on paths overrides everything

## SVG icons with Jekyll

* Jekyll include
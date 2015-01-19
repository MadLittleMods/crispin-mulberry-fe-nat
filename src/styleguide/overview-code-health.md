# Code/Project Health

## CSS Specificity Graph

If you are new to specificity graph's or CSS specificity, [this is a great article](https://decadecity.net/blog/2014/11/26/css-specificity-graphs) that explains how to analyze the graph and what a good graph should look like.

 - Lower is better.
 - Saw tooth is expected.
 - Large spikes are not desired.
 - A gradual increase in specificity as location increases is expected and natural.
 - The Y-axis is a specificity sum(not the same as specificity) but works well.

<svg class="specificity-graph" viewBox='0 0 1000 310'></svg>



## Browser Visual Disparity

Here is a list of disparity that is out of our control and will cause a slight devation from pixel-perfection from the design. This list of factors will contribute about 6%(based off of Chrome) of difference even though the design/layout is nearly perfect. Be sure to check out the difference image maps linked to the percentage numbers in the table to understand where the difference is coming from.

 - Slight differences in font. Browsers and OS's render fonts differently from Photoshop. This could also cause different word-breaks.
 	 - In the future, we could possibly mitigate this effect by using solid blocks of the font color in place of the text.
 - Twitter feed embed widget. The current tweets will be different, avatar, etc.
 	 - The twitter feed widget does not work in IE7-8 because [Twitter deprecated support](https://blog.twitter.com/2013/tfw-ie6-ie7-support).
 - Browser differences in native checkboxes, etc

We are doing a straight pixel-to-pixel comparison with a slight pixel color tolerance to try to mitigate the difference in font aliasing. This means that there is barely any room to fudge details.

You can view the difference image maps by clicking the disparity percentages in the table.

<div class="regression-analyses-table-box"></div>

#### Internet Explorer 7

When testing the design for IE7, please use one of following environments:

 - IE11 emulated IE7 document mode in the [`localhost zone`](http://msdn.microsoft.com/en-us/library/ie/ms537183.aspx)
 - Use true IE7 in Windows XP. CSS expressions/dynamic properties are supported in every [zone](http://msdn.microsoft.com/en-us/library/ie/ms537183.aspx) in true IE7.
 - IE11 emulated IE7 document mode in the trusted zone(instructions below)
 	 - Add a site to the `trusted zone` in IE11: `Gear Icon->Internet Options->Security->Trusted sites->Sites button->Uncheck require https:// box at the bottom->Add the url`

The site in IE7 is fully functional in true IE7 and even functions without CSS expressions/dynamic properties. But CSS expressions add some nice UI features, for example icons, that we would normally use pseudo class for in modern browsers.

The reason you have to be in the localhost or trusted zone when using IE11 emulated IE7 document mode is because CSS expressions/dynamic properties are ["no longer supported for the Internet zone" in IE11+"](http://msdn.microsoft.com/en-us/library/ie/dn384050.aspx).



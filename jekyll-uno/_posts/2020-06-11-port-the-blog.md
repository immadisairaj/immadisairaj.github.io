---
title:  "Port The Blog"
date:   2020-06-11 12:07:00 +0530
categories: [Tech]
tags: [Open-Source, Blog]
---

This blog tells why and how I have ported my blog from WordPress to Jekyll hosted in GitHub.

### Did I like WordPress?

Yes, I liked the WordPress blogging site. I had chosen the free version of the site as I was, however, using it to blog. The site had all the custom templates and even have enough storage. I didn't even need to change the code inside if I had to any customizations, everything was dynamic and pretty handy. I also had few blogs hosted there, and now I don't update it anymore. You can check out the site [here][wordpress].

### Personal Website

Initially, I only had a single website only for blogging though I didn't blog much. I had a thought of having my website of my own to show-off my skills. I had forked few of the projects before and tried hosting them in my GitHub Page, I didn't like any and deleted the repository. So, as I have specialization in Flutter but didn't build any *flutter-web* projects, I thought of giving it a try and started building a personal portfolio which looks simple and minimal. The project was done as I expected with minimal UI, though it took time to build it. You can check the project [here][portfolio].

Now I have a personal website hosted in GitHub Pages and also a blog hosted in WordPress which has redirection from both sides.

### Inspiration to port the Blog

I was happy with both the personal website and blog I had. But something was bothering me, which is, both the sites have a different domain. Few of my friends have taken up Jekyll free templates and had their blog sites set up in their GitHub Pages. I had a small doubt that if I can have a complete Jekyll project in a sub-directory inside my website build so both my blog and the personal website would come under the same domain. I started searching in google if I can have a complete website in a sub-directory and after reading many blogs finally got an exact blog which suited my requirement.

### Why Did I choose to port the Blog?

So, before starting to port the blog I had some queries in my mind if that was the right choice or not. I think most of them also might have the same queries if they are planning to port their blogging site. I think mentioning the queries maybe are not helpful, but I had a few reasons why I ported the blog.
- As already said, both the sites can come under the same domain
- I can write blog posts in markdown
- A static site and no special database
- Comments: Have a Disqus platform for it
- Site Tracking: Have Google-Analytics integration

So, who does not want to port if I have all the requirements and just missing the first point?

### How Did I port the Blog?

I had searched for a few free Jekyll templates which suit my taste and includes all that I need and found out a theme [Jekyll-Uno][jekyll-uno]. I downloaded the project and made all the customizations whatever I needed, it took a bit of time as that template was last updated 2 years back and also didn't have proper documentation on how to customize. So, I finished having my blogging website ready to deploy. But, how do I link it in sud-directory of the personal website and have it running? As I told earlier, I found a hack to do that, and you can find all the detailed instruction in the *README* file of [this][personal-site] repository.

Now, I had both the sites under a single domain and this is the very first blog I am writing after I had ported the blog.

[wordpress]: https://immadisairaj.wordpress.com
[portfolio]: https://github.com/immadisairaj/Portfolio
[jekyll-uno]: https://github.com/joshgerdes/jekyll-uno
[personal-site]: https://github.com/immadisairaj/immadisairaj.github.io

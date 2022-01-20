# Website

This website is my personal website hosted at [immadisairaj.github.io](https://immadisairaj.github.io) using [GitHub Pages](https://pages.github.com/)

## Frameworks

### Flutter:

The Portfolio of this website is built using Flutter.

Website Repo: [link](https://github.com/immadisairaj/website)

The root of this repository has the build file of the flutter from the website Project.

### Jekyll:

The blog site uses a Jekyll Theme: Uno

Jekyll Theme: [link](https://github.com/joshgerdes/jekyll-uno)

The Jekyll theme is as a sub-directory `jekyll-uno` of this repository.

## Link Portfolio and Blog

Follow the following to have both the frameworks hosted under same website:

-> Paste the whole build files of Flutter Project in the root of this repository.

-> Create a sub-directory named `jekyll-uno` and copy the content of the theme.

-> Remove `_site` in the `/jekyll-uno/.gitignore`

-> Copy `/jekyll-uno/_sass` into `/_sass`

-> Edit the Jekyll blog like you needed and build the jekyll site.

The instructions are [here](https://github.com/immadisairaj/immadisairaj.github.io/blob/master/jekyll-uno/README.md).

**Note:** Build the jekyll as production in order to have google analytics working

-> Create a symlink of the `/jekyll-uno` to `blog`

```
ln -sv jekyll-uno/_site blog
```

-> Push the whole code into `https://github.com/<username>/<username>.github.io`

Here *username* is your github username

Now, the site will be live with **Flutter** at `/` and **Jekyll** at `/blog` of the site.

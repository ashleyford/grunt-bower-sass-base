# Base Grunt / Bower / SASS Setup #

Simple setup that uses Bower and Grunt to concat and minify SASS and JS files. Work out of the _dev folder adding your JS to the scripts folder and SASS to the style folder.

Grunt watch is setup so just calling grunt will compile the JS and create the CSS files. They will appear in the public folder so you just need to add these to your HTML. 

### How do I get set up? ###

```shell
$ npm install
$ bower install
$ grunt
```

If you need to use libraries from Bower edit the gruntfile.js at line 16 and reference the files in there. For example:

```shell
lib_scripts: [
      '<%= globalConfig.path_dist_bower %>jquery/dist/jquery.min.js',
    ]
```

### What is this repository for? ###

* Base Grunt, Bower, SASS, NPM setup
* Version 0.0.1


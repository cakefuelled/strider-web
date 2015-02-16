# Strider [Web client]

##Running
You'll need [npm](http://nodejs.org/download/) and [grunt](http://gruntjs.com/installing-grunt) for this to work.

First install dependencies:

```
$ npm install -g grunt-cli
$ npm install -g bower
$ npm install
$ bower install
```

Now just open `index.html` in your browser and let the magic happen!

##Adding dependencies
Use **bower** to add any client-side JavaScript:

```
$ bower install <library>
```

Then we need to add it to the Requirejs configuration, luckily **grunt** will do that automatically for us :)

```
$ grunt
```

The default task for grunt takes all the bower components and adds them to the Requirejs paths configuration, so they are available in all the modules.
Now you can simply add the dependency with the bower installed name.

##Contributing
Pull Requests are always welcome, take a look at the existing code to become familiar with our style guide.

##License
Strider is released under the GNU Aferro GPL v3.0 License

If you want to use it for commercial purposes get in touch with us.

# Strider [Web client]

## Running locally
You'll need [npm](http://nodejs.org/download/) and [grunt](http://gruntjs.com/installing-grunt) for this to work.

First install dependencies:

```
$ npm install -g grunt-cli
$ npm install -g bower
$ npm install
$ bower install
```

Now serve your files and load index.html. An easy way is to use `python -m "SimpleHTTPServer"` and navigate to http://localhost:8000/.

You will need a running [Strider Server](https://github.com/cakefuelled/strider-server), and you can follow the instructions in that project to get it up and running.

#### AuthHandler Fix

There is a problem with the angular-auth-interceptor module that may prevent you from loading Strider (with a TypeError in angular-resource.js). If this is the case, after the bower install step, you should replace lines 5-13 in bower_components/angular-auth-interceptor/authHandler.js with the following:

```
return {
	responseError: function (rejection) {
		if (rejection.status === 401) {
			$rootScope.$broadcast('401:unauthorized');
			return $q.reject(rejection);
		}
		return $q.reject(rejection);
	}
}
```

## Deploying
The whole process of compiling and deploying to the production environment is done with **grunt**. At the moment there are two tasks available:

1. `build` Generates a build/ folder with all the necessary files to run the app. Use it to test that everything works.
2. `deploy` Includes `build`, and once the app is built it deploys it to `gh-pages`. You should never push or touch `gh-pages` directly, it's easier and safer to use the Grunt task.

So to deploy your work:

```
$ grunt deploy
```

## Adding dependencies
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

## Contributing
Pull Requests are always welcome, take a look at the existing code to become familiar with our style guide.

## License
Strider is released under the GNU Aferro GPL v3.0 License

If you want to use it for commercial purposes get in touch with us.

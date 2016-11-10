#Node Dev Cheatsheet

###NPM
When setting up a new Node project the first thing you'll need to do is NPM init. This will create the package.json file that will store your project settings. In most cases you can just leave these fields blank and hit enter, although if you're working on a more serious project you might want to fill them in!
```js
//terminal
npm init
```

When working with someone else's code base (one of our startpoints or a cloned Git repo for example) you'll want to use NPM install. This reads and installs the dependencies from an existing package.json file.
```js
//terminal
npm install
```

When using a package in your project you should save it as a dependency. This allows anyone else who might use your code to use NPM install to quickly download all of your dependecies. Some packages won't be used in production (testing libraries for example), so you save these as dev dependencies. If you can remove a dependency without your app breaking then it should probably be installed as a dev dependency.
```js
//terminal
npm install --save package-name
npm install --save-dev package-name
```

NPM allows you to define shorthand scripts to alias frequently used Terminal commands. There are a few predefined scripts (start and test etc.) that NPM expects, but you can define your own too. When you define your own scripts you must prefix them with run in Terminal.
```js
//package.json
"scripts": {
  "test": "node_modules/.bin/mocha client/src/models/specs",
  "start": "node server.js"
  "mon": "nodemon server.js"
}

//terminal
npm test
npm start
npm run mon
```

###Express
You'll need a server to run your app on. I'd recommend Express as it's super lightweight, unopinionated and based on Sinatra, which you learned in Ruby. First we need to install it as a dependency.
```js
//terminal
npm install --save express
```

You can run the commands that we saw earlier manually if you don't want to use NPM scripts.
```js
//terminal
node server.js
//or
nodemon server.js
```

If you want to receive any post requests in your app then you'll need to require and use an additional piece of middleware that comes with express - body-parser. This will allow you to access the body property of incoming requests.
```js
//server.js
var bodyParser = require('body-parser');
app.use(bodyParser.json());
```

###Webpack
You can use Webpack to better structure your project and bundle your JS into a single file, which prevents you from having to use a million script tags in your HTML.  
As long as the bundled script exists then your app will run just fine without Webpack, so we can install it as a dev dependency.
```js
//terminal
npm install --save-dev webpack
```

You have to define a config to tell Webpack where the entry point of your app is, and where to output your bundled code. You can also use source-map while in development so that we can see exactly where any errors might be coming from, instead of everything pointing to bundle.js.
```js
//webpack.config.js
config = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: './build'
  },
  devtool: 'source-map'
}

module.exports = config;
```

You can use the webpack command in Terminal to create a bundle file, or webpack watch (shorthand: webpack -w) to poll for changes and update your bundle.js automatically each time you save a file. You should run this in the client folder because that's where the code that we want to bundle up lives.
```js
//terminal
webpack

webpack watch
//or
webpack -w
```

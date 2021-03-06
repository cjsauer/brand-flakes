[![Circle CI](https://circleci.com/gh/cjsauer/brand-flakes.svg?style=svg)](https://circleci.com/gh/cjsauer/brand-flakes)

# Desired Interface

Personalizing a web page is all about recording actions a user takes by keeping a count of how many times the action occurs, and then retrieving those counts to do something with.

### Authenticating

To use Brand Flakes, we just need to insert this snippet into our application just before the closing `head` tag:

```JavaScript
!function(b,f,l,a,k,e,s){b.BrandFlakesObject=l;b[l]||(b[l]=function(){
(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;e=f.createElement(a);
s=f.getElementsByTagName(a)[0];e.src=k;s.parentNode.insertBefore(e,s)}
(window,document,'BrandFlakes','script','//localhost:3000/public/brand-flakes.min.js');

BrandFlakes('some-app-id', 'some-user-id');
```

Replace `some-app-id` with the application ID given to you when you set up your account, and replace `some-user-id` with a unique identifier for the user currently viewing your website. This will be unique to how you've implemented authentication on your site, but is usually the ID of the user as it stands in your database (primary key, \_id file in Mongo, etc.)

Brand Flakes is now configured and ready to use on your site! See below for some examples on how to use it in response to user actions.

### Gathering metrics

```javascript
<script>
// The user clicked the shopping cart
BrandFlakes.record('shopping-cart-clicked');

// The user visited a page containing "North Face" in the URL
BrandFlakes.record('north-face');

// Metrics can be recorded for ANYTHING at any time
BrandFlakes.record('literally-any-metric-we-want-to-track');
</script>
```

What `'record'` does is just increment the number of times that this action has been recorded. For example, if this is the first time the user has clicked the shopping cart, Brand Flakes will store the value `1` for this key. Every time `'record'` is called from here on, that value is incremented. See below for how to retreive those counts. 

### Retrieving action counts

```javascript
<script>
// Retrieve the number of times the user has visited North Face pages
var northFaceInterest = BrandFlakes.get('north-face');

/*
 * Do something clever with that metric, like set the font size of their favorite products
 */
 WordCloud.setFontSize('North Face', northFaceInterest * 0.2);
 </script>
```

# Syncing between devices

User actions are sent *in real time* to a separate server using the DDP protocol (Meteor) using any kind of user id as the key. This way, actions taken on the desktop version of the website will be reflected when the same user visits the site on mobile, or any other device. Following actions taken on the mobile version of the site are then tracked in the same way, given that the user is logged in or identified in some way.

# Contributors

To get up and running, you'll need a few dependencies installed:

```bash
bower update
npm install -g
```

You can run the server by changing to the `server/` directory and running the `./start` script. Be sure to have [meteor installed](https://www.meteor.com/install).

### Tests

You can run the tests by changing to the server's `app/` directory and running `gagarin`. This will run all tests, including server-side tests, client-side tests (example app, app creation), and the brand-flakes.js script itself. 


### Building

To build the main `brand-flakes.js` script and its dependencies into one minified file, run `gulp build`. This task outputs the minified file into `server/app/public/brand-flakes.min.js`. You may also choose to run `gulp build-dev` which does not minify or uglify the source. Lastly, try `gulp watch` which begins watching for any file changes in the `src/` directory and will call `gulp build-dev` for you automatically. 

From their it will be served for public consumption. The delivery method is identical to how Google Analytics serves its tracking script. See [this post here](http://code.stephenmorley.org/javascript/understanding-the-google-analytics-tracking-code/) to understand how it works. 

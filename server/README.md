#Brand Flakes Server

The `brand-flakes` server is written using the [Meteor framework](https://www.meteor.com/). Follow the [installation instructions](https://www.meteor.com/install) to get set up. 

Then, to run the server you can use the `start` script:

```bash
# Start the server in development mode
./start

# Start the server in production mode
./start --env production
```

The port is automatically set using environment variables in development mode to not conflict with the `example-app`.

#Database

The accompanying MongoDB database stores all user personalization metrics. Here is an example of a metrics document:

```JSON
"some-app-id": {
  "some-user-id": {
    "shopping-cart-clicked": 12,
    "the-north-face": 34,
    "some-other-metric": 42
  },
  "another-user-id": {
    "shopping-cart-clicked": 36,
    "the-north-face": 4,
    "another-random-metric": 112
  }
},
"another-app-id": {
  ...
}
```

Notice how the documents are completely flexible; not every user needs to contain the same metrics as every other user. In other words, metrics only exist for actions that have actually been taken by that user.

#Methods

The Meteor server exposes a few simple methods for storing and retrieving metrics. 

###Authenticate

Authentication is done by passing in the app ID given to an app at creation.

```JavaScript
Meteor.call("authenticate", "app-id", function(err, res) {
  // res is true iff auth succeeded, err contains error otherwise
});
```

###App creation

An app can be created by using the Astronomy package:

```JavaScript
var app = new App({name: 'Example App'});
Meteor.call('apps/insert', app, function(err, res) {
  // res contains the newly inserted apps Mongo ID (not app id)
  // err is undefined iff insertion succeeded. Contains an error object otherwise.
});
```

###Record Action

Increments the count on the given metric for the given user, creating that field if it does not exist:

```JavaScript
Meteor.call("apps/record", "app-id", "some-user-id", "name-of-metric");
```

Note that if we pass in a user or metric that does not exist, it will be created automatically. 

###Reset Metric

Resets the given metric to zero for the given user:

```JavaScript
Meteor.call("apps/resetMetric", "app-id", "some-user-id", "name-of-metric");
```

#Publications

The Meteor server has just one publication: the metrics for the given user id, as shown in the sample JSON above.

```JavaScript
Meteor.subscribe("user-metrics", "app-id", "some-user-id");
```

Note that if the user id we subscribe to does not exist, it will be created and given an empty metrics object. 

#Tests

The test runner in use is [Gagarin](https://github.com/anticoders/gagarin). Follow the instructions in there to get it installed (it's just a node package). You'll also need to install a web driver, there are [instructions](https://github.com/anticoders/gagarin#testing-with-browser) for doing that within Gagarin's readme, and further [instructions](https://devblog.supportbee.com/2014/10/27/setting-up-cucumber-to-run-with-Chrome-on-Linux/) here for installing chromedriver on Ubuntu.

You can then run the tests with `gagarin --verbose` from the app directory.

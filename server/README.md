#Server

The server is written using the [Meteor framework](https://www.meteor.com/). Follow the [installation instructions](https://www.meteor.com/install) to get set up. 

Then, to run the server you can use the `start` script:

```bash
# Start the server in development mode
./start

# Start the server in production mode
./start --env production
```

#Database

The accompanying MongoDB database stores all user personalization metrics. Here is an example of 1 user's metrics:

```JSON
"some-user-id": {
  "shopping-cart-clicked": 12,
  "the-north-face": 34,
  "some-other-metric": 42
}
```

#Methods

The Meteor server exposes a few simple methods for storing and retrieving metrics. 

###Record Action

Increments the count on the given metric for the given user:

```JavaScript
Meteor.call("incrementMetric", "some-user-id", "name-of-metric");
```

###Reset Metric

Resets the given metric to zero for the given user:

```JavaScript
Meteor.call("resetMetric", "some-user-id", "name-of-metric");
```

#Publications

The Meteor server has just one publication: the metrics for the given user id, as shown in the example above.

```JavaScript
Meteor.subscribe("metrics", "some-user-id");
```



#Example app

The example app is the home page of the Meteor server. Just navigate to [localhost:3000](http://localhost:3000) with the server running to check it out. 

Remember: the Meteor app will not be reactive, as it is just simulating the workings of a normal web application. It will serve up the content, including the Brand Flakes JS library, disconnect from the stock DDP server, and then open a completely separate DDP connection to the Meteor server using a custom DDP client. Brand Flakes is not Meteor specific; it is generic to any website. 

###Explanation

The app itself is just a big word cloud and a form for setting your user id. In a normal app, we wouldn't set the user id manually this way. It'd most likely be set by logging in using a traditional username and password, for example. This is just a way to fake it for demonstration purposes. Try setting it to something like "test-user".

Now you can click around on the links in the word cloud. They won't actually do anything, but behind the scenes it is communicating with the Meteor app to record all of the links you've clicked on as metrics. If you refresh the page, the example app pulls those stored metrics from the Meteor app, and enlarges the words you've clicked on the most by multiplying its font size by the metric returned from the server. If you change the user id, you'll see the personalized words for that user.

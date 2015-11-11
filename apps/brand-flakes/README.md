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

#Example app

The `example-app` is a Meteor application. Use the `./start` script to run the `example-app`, making sure that a local `brand-flakes` app is running as well. You don't need to specify separate ports for the two apps; that is handled automatically using environment variables. 

Remember: the example app will not be reactive, as it is just simulating the workings of a normal web application. It will serve up the content, including the Brand Flakes JS library, disconnect from the stock Meteor DDP server, and then open a completely separate DDP connection to the Meteor server using a custom DDP client. Brand Flakes JS is not Meteor specific; it is generic to any website. 

###Explanation

The app itself is just a big word cloud and a form for setting your user id. In a normal app, we wouldn't set the user id manually this way. It'd most likely be set by logging in using a traditional username and password, for example. This is just a way to fake it for demonstration purposes. Try setting it to something like "test-user" and then clicking the `set` button.

Now you can click around on the links in the word cloud. They won't actually do anything, but behind the scenes it is communicating with the `brand-flakes` app to record all of the links you've clicked on as metrics. If you refresh the page, the example app pulls those stored metrics from the Meteor app, and enlarges the words you've clicked on the most by multiplying its font size by the metric returned from the server. If you change the user id, you'll see the personalized words for that user.

#Example app

The example app can be viewed by simply opening `index.html` in your favorite web browser. All functionality is written completely in JavaScript, including its communication to the Meteor server, so it doesn't actually need to be served traditionally itself. Just make sure you follow the instructions in the `/server` directory to get the Meteor app up and running, otherwise this example is not very interesting :)

###Explanation

The app itself is just a big word cloud and a form for setting your user id. In a normal app, we wouldn't set the user id manually this way. It'd most likely be set by logging in using a traditional username and password, for example. This is just a way to fake it for demonstration purposes. Try setting it to something like "test-user".

Now you can click around on the links in the word cloud. They won't actually do anything, but behind the scenes it is communicating with the Meteor app to record all of the links you've clicked on as metrics. If you refresh the page, the example app pulls those stored metrics from the Meteor app, and enlarges the words you've clicked on the most by multiplying its font size by the metric returned from the server. If you change the user id, you'll see the personalized words for that user.

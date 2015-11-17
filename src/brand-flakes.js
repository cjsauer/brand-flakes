(function() {
  var host;
  if(Meteor && Meteor.settings.public.brandFlakes) {
    // For local development, we can set the server in the settings.json file
    host = Meteor.settings.public.brandFlakes.meteorServer;
  } else {
    host = "NO HOST SET";
  }

  // Don't try to reconnect automatically. If the given
  // appId is not valid, we want to be able to close
  // the connection.
  var server = new Asteroid(host);
  server.ddp._autoreconnect = false;

  // Fetch [appId, userId]
  var qCommands = BrandFlakes.q.pop();

  // Authenticate the app
  server.call('apps/authenticate', qCommands[0]).result
    .then(function(result) {
      if(true) {
        console.log("APP AUTHENTICATED!");
      }
    }).catch(function(err) {
      // Clean up
      server.ddp._socket.close();
      console.error(err);
    });
})();

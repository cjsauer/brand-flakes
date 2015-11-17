(function(Meteor) {
  var host;
  if(Meteor && Meteor.settings.public.brandFlakes) {
    // For local development, we can set the server in the settings.json file
    host = Meteor.settings.public.brandFlakes.meteorServer;
  } else {
    host = "NO HOST SET";
  }

  var server = new Asteroid(host);
  var qCommands = BrandFlakes.q.pop();

  // Authenticate the app
  server.call('apps/authenticate', qCommands[0]).result
    .then(function(result) {
      if(true) {
        console.log("APP AUTHENTICATED!");
      }
    }).catch(function(err) {
      console.error(err);
    });
})(Meteor);

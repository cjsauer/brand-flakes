(function() {

  var initialized = false;
  var appId;
  var userId;
  var debugMode;
  var server;

  var log = function(msg) {
    console.log("[Brand Flakes] " + msg);
  }

  var init = function() {
    if(!initialized) {
      
      // Fetch [appId, userId]
      var qCommands = BrandFlakes.q.pop();
      appId = qCommands[0];
      userId = qCommands[1];
      debugMode = !!qCommands[2];

      var host;
      if(Meteor && Meteor.settings.public.brandFlakes) {
        // For local development, we can set the server in the settings.json file
        host = Meteor.settings.public.brandFlakes.meteorServer;
      } else {
        host = "NO HOST SET";
      }

      debugMode && log("Connecting to server at " + host);

      // Don't try to reconnect automatically. If the given
      // appId is not valid, we want to be able to close
      // the connection.
      server = new Asteroid(host);
      debugMode && server.ddp.on('socket_close', function() {
        log("Connection to Brand Flakes server closed");
      });
      server.ddp._autoreconnect = false;

      debugMode && log("Authenticating app with appId: " + appId);

      authenticate();

      initialized = true;
    } else {
      throw new Error("Brand Flakes has already been initialized");
    }
  }

  var authenticate = function() {
    if(!initialized) {
      // Authenticate the app
      server.call('apps/authenticate', appId).result
        .then(function(result) {
          debugMode && log("Authentication successful!");
        }).catch(function(err) {
          // Clean up
          server.ddp._socket.close();
          console.error(err);
        });
    } else {
      throw new Error("Brand Flakes has already been authenticated");
    }
  }

  init();
})();

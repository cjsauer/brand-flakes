describe('brand-flakes.js deliverable', function() {
  var server = meteor();
  var client;

  var sampleAppAppId;

  before(function() {
    // Create a sample app and snag its appId
    return server.execute(function() {
      var sampleApp = new App({
        name: 'Sample App',
        metrics: {
          'some-user-id': {
            'metric-to-get': 42
          }
        }
      });
      sampleApp.save();
      return sampleApp.get('appId');
    }).then(function(id) {
      sampleAppAppId = id;
    });
  });

  // Client navigation HACK
  before(function() {
    return server.execute(function() {
      return process.env.ROOT_URL;
    }).then(function(root_url) {
      client = browser(root_url + '/?appId=' + sampleAppAppId + '&userId=some-user-id', {}, server);
    });
  });

  it('can call record', function(){
    return client.execute(function() {
      BrandFlakes.record('some-metric');
    }).then(function() {
      return server.wait(2000, 'for record to propogate to server', function() {
        var app = Apps.findOne();
        return app.metrics['some-user-id'];
      }).then(function(user) {
        expect(user['some-metric']).to.equal(1);
      });
    });
  });

  it('can call get', function(){
    return client.execute(function() {
      return BrandFlakes.get('metric-to-get');
    }).then(function(metric) {
      expect(metric).to.equal(42);
    });
  });

});

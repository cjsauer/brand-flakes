var fixtures = require('../helpers/fixtures.js');

describe('brand-flakes.js deliverable', function() {
  var server = meteor({
    helpers: fixtures
  });
  var client;

  var sampleAppAppId;

  before(function() {
    // Create a sample app and snag its appId
    return server.createSampleApp().then(function(res) {
      sampleAppAppId = res.appId;
    });
  });

  // Client navigation HACK
  before(function() {
    return server.execute(function() {
      return process.env.ROOT_URL;
    }).then(function(root_url) {
      client = browser(root_url + '/?appId=' + sampleAppAppId + '&userId=some-user-1', {}, server);
    });
  });

  it('can call record', function(){
    return client.execute(function() {
      BrandFlakes.record('some-metric-3');
    }).then(function() {
      return server.wait(2000, 'for record to propogate to server', function() {
        var app = Apps.findOne();
        return app.metrics['some-user-1'];
      }).then(function(user) {
        expect(user['some-metric-3']).to.equal(1);
      });
    });
  });

  it('can call get', function(){
    return client.execute(function() {
      return BrandFlakes.get('some-metric-1');
    }).then(function(metric) {
      expect(metric).to.equal(42);
    });
  });

});

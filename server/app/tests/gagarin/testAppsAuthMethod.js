var fixtures = require('../helpers/fixtures.js');

describe('apps/authenticate', function() {
  var server = meteor({
    helpers: fixtures
  });

  var sampleAppAppId;

  before(function() {
    return server.createSampleApp().then(function(res) {
      sampleAppAppId = res.appId;
    });
  });

  it('checks its arguments', function(){
    return server.execute(function() {
      var badArgCall = function() {
        Meteor.call('apps/authenticate', 42);
      }
      expect(badArgCall).to.throw(/Match error/);
    });
  });

  it('throws if the app does not exist', function(){
    return server.execute(function() {
      var badAppIdCall = function() {
        Meteor.call('apps/authenticate', 'bad-app-id');
      }
      expect(badAppIdCall).to.throw(/invalid-app-id/);
    });
  });

  it('returns true on successful auth', function(){
    return server.execute(function(sampleAppAppId) {
      var res = Meteor.call('apps/authenticate', sampleAppAppId);
      expect(res).to.be.true;
    }, [sampleAppAppId]);
  });
});

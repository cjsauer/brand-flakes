describe('apps/authenticate', function() {
  var server = meteor();

  var sampleAppAppId;

  before(function() {
    return server.execute(function() {
      var app = new App({name: 'Sample App'});
      return app.save();
    }).then(function(appId) {
      sampleAppAppId = appId;
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

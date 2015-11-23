var fixtures = require('../helpers/fixtures.js');

describe('Apps publications', function() {
  var server = meteor({
    helpers: fixtures
  });
  var client = browser(server);

  var sampleAppId;
  var sampleAppAppId;

  before(function() {
    return server.createSampleApp().then(function(res) {
      sampleAppId = res.id;
      sampleAppAppId = res.appId;
    });
  });

  it('should check its arguments', function(){
    /* We have to do publication testing on the client, 
     * so we need to use the uglier promise syntax because
     * Meteor.subscribe is asynchronous.
     */
    return client.promise(function(resolve, reject) {
      Meteor.subscribe('user-metrics', 444, '<-- not valid', {
        onStop: function(err) {
          reject(err);
        },
        onReady: function() {
          expect.fail();
        }
      });
    }).expectError(function(err) {
      expect(err.message).to.contain('Match failed');
    }).then(function() {
      return client.promise(function(resolve, reject) {
        Meteor.subscribe('user-metrics', 'not valid -->', 42, {
          onStop: function(err) {
            reject(err);
          },
          onReady: function() {
            expect.fail();
          }
        });
      });
    }).expectError(function(err) {
      expect(err.message).to.contain('Match failed');
    });
  });

  it('should throw if we provide a bad appId', function(){
    return client.promise(function(resolve, reject) {
      Meteor.subscribe('user-metrics', 'bad-app-id', 'user-id', {
        onStop: function(err) {
          reject(err);
        },
        onReady: function() {
          expect.fail();
        }
      })
    }).expectError(function(err) {
      expect(err.message).to.contain('invalid-app-id');
    });
  });

  it('should return only the correct user\'s metrics', function(){
    return client.promise(function(resolve, reject, sampleAppAppId) {
      var sub = Meteor.subscribe('user-metrics', sampleAppAppId, 'some-user-1', {
        onStop: function(err) {
          /*
           * Since we are stopping manually below, 
           * we need to check that there is actually an error
           * so that we don't reject the promise accidentally.
           */
          if(err) reject(err);
        },
        onReady: function() {
          var app = Apps.findOne({}, {transform: null});
          /*
           * We need to stop the subscription so that it does not
           * interfere with following tests
           */
          sub.stop();
          resolve(app);
        }
      });
    }, [sampleAppAppId]).then(function(app) {
      var goodUser = app.metrics['some-user-1'];
      var badUser = app.metrics['some-user-2'];
      expect(app.appId).to.not.be.ok;
      expect(goodUser).to.be.ok;
      expect(goodUser).to.eql({
        'some-metric-1': 42,
        'some-metric-2': 100
      });
      expect(badUser).to.not.be.ok;
    });
  });

  it('should create and publish empty metrics for a user that does not exist yet', function(){
    return client.promise(function(resolve, reject, sampleAppAppId) {
      var sub = Meteor.subscribe('user-metrics', sampleAppAppId, 'some-user-3', {
        onStop: function(err) {
          if(err) reject(err);
        },
        onReady: function() {
          var app = Apps.findOne({}, {transform: null});
          sub.stop();
          resolve(app);
        }
      });
    }, [sampleAppAppId]).then(function(app) {
      var goodUser = app.metrics['some-user-3'];
      expect(goodUser).to.be.ok;
      expect(goodUser).to.eql({});
    });
  });
});

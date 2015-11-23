var fixtures = require('../helpers/fixtures.js');

describe('apps/record method', function() {
  var server = meteor({
    helpers: fixtures
  });

  var sampleAppId;

  before(function() {
    return server.createSampleApp().then(function(res) {
      sampleAppId = res.id;
    });
  });

  it('checks its arguments', function(){
    return server.execute(function() {
      var badAppIdCall = function() {
        Meteor.call('apps/record', 42);
      }

      var badUserIdCall = function() {
        Meteor.call('apps/record', 'app-id', 42);
      }

      var badMetricCall = function() {
        Meteor.call('apps/record', 'app-id', 'user-id', 42);
      }

      expect(badAppIdCall).to.throw(Error, /Match error/);
      expect(badUserIdCall).to.throw(Error, /Match error/);
      expect(badMetricCall).to.throw(Error, /Match error/);
    });
  });

  it('throws an error if the given app id does not exist', function(){
    return server.execute(function() {
      var nonExistantCall = function() {
        Meteor.call('apps/record', 'im-not-real', 'user-id', 'metric');
      }

      expect(nonExistantCall).to.throw(Meteor.Error, /does not exist/);
    });
  });

  it('successfully increment an existing metric', function(){
    return server.execute(function(sampleAppId) {
      var sampleApp = Apps.findOne(sampleAppId);
      var appId = sampleApp.get('appId');
      var userId = 'some-user-1';
      var metric = 'some-metric-1';

      Meteor.call('apps/record', appId, userId, metric);
      sampleApp.reload();
      expect(sampleApp.metrics[userId][metric]).to.equal(43);
    }, [sampleAppId]);
  });

  it('creates a new metric with value 1 if it does not exist', function(){
    return server.execute(function(sampleAppId) {
      var sampleApp = Apps.findOne(sampleAppId);
      var appId = sampleApp.get('appId');
      var userId = 'sample-user-1';
      var metric = 'new-metric';

      Meteor.call('apps/record', appId, userId, metric);
      sampleApp.reload();
      expect(sampleApp.metrics[userId][metric]).to.equal(1);
    }, [sampleAppId]);
  });

  it('creates a new user and metric with value 1 if it does not exist', function(){
    return server.execute(function(sampleAppId) {
      var sampleApp = Apps.findOne(sampleAppId);
      var appId = sampleApp.get('appId');
      var userId = 'new-user';
      var metric = 'some-metric';

      Meteor.call('apps/record', appId, userId, metric);
      sampleApp.reload();
      expect(sampleApp.metrics[userId][metric]).to.equal(1);
    }, [sampleAppId]);
  });
});

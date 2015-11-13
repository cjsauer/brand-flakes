describe('Apps collection', function() {
  var server = meteor();
  var client = browser(server);

  before(function() {
    return server.execute(function() {
      // Clear all apps
      Apps.remove({});
    }).then(function() {
      return client.promise(function(resolve) {
        // Create a dummy app
        Meteor.call('apps/insert', new App({name: 'Dummy}'}), function(err, res) {
          // Save its ID
          Meteor.dummyId = res;
          resolve(res);
        });
      });
    });
  });

  it('should not be insertable from the client', function(){
    return client.promise(function(resolve, reject) {
      Apps.insert({name: 'not allowed!'}, function(err, res) {
        if(err) {
          reject(err);
        }
      });
    }).expectError(function (err) {
      expect(err.message).to.contain('Access denied');
    });
  });

  it('should not be removable from the client', function(){
    return client.promise(function(resolve, reject) {
      Apps.remove({_id: Meteor.dummyId}, function(err, res) {
        if(err) {
          reject(err);
        }
      });
    }).expectError(function (err) {
      expect(err.message).to.contain('Access denied');
    });
  });

  it('should not be editable from the client', function(){
    return client.promise(function(resolve, reject) {
      Apps.update({_id: Meteor.dummyId}, {$set: {name: 'HAHAHA'}}, function(err, res) {
        if(err) {
          reject(err);
        }
      });
    }).expectError(function (err) {
      expect(err.message).to.contain('Access denied');
    });
  });

  it('the appId field should be immuatable', function() {
    return server.execute(function() {
      var app = new App({name: 'Example App'});
      app.save();
      app.set('appId', 'some-other-id');
      expect(app.save()).to.equal(0);
    });
  });

  describe('events', function() {
    it('should define an empty object for the metrics field by default', function(){
      return server.execute(function() {
        var app = new App({name: 'Example App'});
        app.save();
        expect(app.get('metrics')).to.eql({});
      });
    });

    it('should generate a random app id before insertion', function(){
      return server.execute(function() {
        var app = new App({name: 'Example App'});
        app.save();
        expect(app.get('appId')).not.to.be.undefined;
        expect(app.get('appId').length).to.equal(30);
      });
    });
  });

  describe('validation', function() {

    it('should return true for valid input', function(){
      return server.execute(function() {
        var app = new App({
          name: 'Example App',
          metrics: {
            'some-user-id': {
              'some-app': 10
            }
          }
        });
        expect(app.validate()).to.be.true;
      });
    });

    it('should return false if no name is provided', function(){
      return server.execute(function() {
        var app = new App({});
        expect(app.validate()).to.be.false;
      });
    });

    it('should return false if the name is too long', function(){
      return server.execute(function() {
        var app = new App({
          name: '31characterssssssssssssssssssss'
        });
        expect(app.validate()).to.be.false;
      });
    });

    it('should return false if the name is not a string', function(){
      return server.execute(function() {
        var app = new App({
          name: {oops: 'not a string'}
        });
        expect(app.validate()).to.be.false;
      });
    });

  });
});

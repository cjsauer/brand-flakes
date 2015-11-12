describe('Apps collection', function() {
  var server = meteor();
  var client = browser(server);

  it('should not be defined on the client', function(){
    return client.promise(function(resolve, reject) {
      var apps = Apps;
    }).expectError(function (err) {
      expect(err.message).to.contain('not defined');
    });
  });

  describe('events', function() {
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

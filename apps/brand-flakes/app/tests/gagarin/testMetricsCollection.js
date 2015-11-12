describe('Metrics collection', function() {
  var server = meteor();
  var client = browser(server);

  it('should not be defined on the client', function(){
    return client.promise(function(resolve, reject) {
      var metrics = Metrics;
    }).expectError(function (err) {
      expect(err.message).to.contain('not defined');
    });
  });

  describe('events', function() {
    it('should generate a random app id before insertion', function(){
      return server.execute(function() {
        var metric = new Metric({name: 'Example App'});
        metric.save();
        expect(metric.get('appId')).not.to.be.undefined;
        expect(metric.get('appId').length).to.equal(30);
      });
    });
  });

  describe('validation', function() {

    it('should return true for valid input', function(){
      return server.execute(function() {
        var metric = new Metric({
          name: 'Example App',
          users: {
            'some-user-id': {
              'some-metric': 10
            }
          }
        });
        expect(metric.validate()).to.be.true;
      });
    });

    it('should return false if no name is provided', function(){
      return server.execute(function() {
        var metric = new Metric({});
        expect(metric.validate()).to.be.false;
      });
    });

    it('should return false if the name is too long', function(){
      return server.execute(function() {
        var metric = new Metric({
          name: '31characterssssssssssssssssssss'
        });
        expect(metric.validate()).to.be.false;
      });
    });

    it('should return false if the name is not a string', function(){
      return server.execute(function() {
        var metric = new Metric({
          name: {oops: 'not a string'}
        });
        expect(metric.validate()).to.be.false;
      });
    });

  });
});

describe('apps/insert method', function() {
  var server = meteor();
  var client = browser(server);

  it('should check its arguments', function(){
    return client.promise(function(resolve, reject) {
      Meteor.call('apps/insert', 'a string is not valid!', function(err, res) {
        if(err) {
          reject(err);
        }
      });
    }).expectError(function(err) {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.contain('Match failed');
    });
  });

  it('should throw if the App is not valid', function(){
    return client.promise(function(resolve, reject) {
      var app = new App({/* no fields set */});
      Meteor.call('apps/insert', app, function(err, res) {
        if(err) {
          reject(err);
        }
      });
    }).expectError(function(err) {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.contain('validation-error');
    });
  });

  it('should call save when given valid input', function(){
    return server.execute(function() {
      var app = new App({name: 'Example App'});
      spies.create('save', app, 'save');

      Meteor.call('apps/insert', app);
      expect(spies.save).to.have.been.called;
      spies.restoreAll();
    });
  });
});

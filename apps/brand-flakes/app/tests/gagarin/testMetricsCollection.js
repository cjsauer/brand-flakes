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
});

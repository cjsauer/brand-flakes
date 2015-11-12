describe('Authentication module', function() {
  var server = meteor();

  it('should return true', function(){
    return server.promise(function(resolve) {
      var appId = "my-app-id";
      var appSecret = "my-app-secret";
      resolve(Modules.server.authenticate(appId, appSecret));
    }).then(function(response) {
      expect(response).to.be.true;
    });
  });
});

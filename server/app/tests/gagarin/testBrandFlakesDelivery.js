describe('Delivery of brand-flakes.js script to the client', function() {
  var server = meteor();
  var client = browser(server);

  it('eventually delivers the script to the client', function(){
    return client.promise(function(resolve, reject) {
      // Wait a second for the script to arrive
      setTimeout(function() {
        console.log(BrandFlakes.record);
        resolve(BrandFlakes.record);
      }, 500);
    }).then(function(recordFunction) {
      // If the script was delivered, we expect this function
      // to have been defined at some point
      expect(recordFunction).to.be.ok;
    });
  });
});

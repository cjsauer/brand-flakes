describe('Example app', function() {
  var server = meteor();
  var client = browser(server);

  it('sets the title', function(){
    return client
      .title()
      .then(function(title) {
        expect(title).to.equal("Brand Flakes Example");
      });
  });

  it('sets the userId upon submitting the form', function(){
    return client
      .waitForDOM('#userId')
      .sendKeys("#userId", "some-user-id")
      .click("#userId-submit-btn")
      .waitForDOM("#userId")
      .then(function() {
        return client.execute(function() {
          function getURLParameter(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
          }

          expect(getURLParameter("userId")).to.equal("some-user-id");
        });
      });
  });
});

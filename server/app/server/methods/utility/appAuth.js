Meteor.methods({
  /*
   * Authenticates an app.
   * This basically just checks that an app exists...
   *
   * @param {String} appId The application ID to authenticate
   * @return {Boolean} true iff authentication succeeded
   * @throws {Meteor.Error} iff app with appId does not exist
   */
  'apps/authenticate': function(appId) {
    check(appId, String);
    
    // Find the app
    let app = Apps.findOne({appId});
    if(app) {
      return true;
    } else {
      throw new Meteor.Error('invalid-app-id', 'An app with the given app ID does not exist');
    }
  }
});

Meteor.methods({

  /*
   * Insert a new App into the database
   *
   * @param {App} app Astronomy object of app to insert
   * @return {String} ID of newly inserted app
   * @throws {Match.Error} on invalid arguments
   * @throws {Error} on validation failure
   */
  'apps/insert': function(app) {
    check(app, App);

    // TODO: Check that the user is logged in

    if(app.validate()) {
      return app.save();
    }

    app.throwValidationException();
  }
});

Meteor.methods({

  /*
   * Increment the metric for the given user of the given app
   * @param {String} appId The ID of the app the request is for (NOT the Mongo ID)
   * @param {String} userId The ID of the user that this metric belongs to (NOT a Mongo ID)
   * @param {String} metric The name of the metric to increment
   * @return {Number} The new value of the metric
   * @throws {Meteor.Error} The app with the given appId does not exist
   */
  'apps/incrementMetric': function(appId, userId, metric) {
    check(appId, String);
    check(userId, String);
    check(metric, String);

    // Attempt to find that App
    var app = Apps.findOne({appId: appId});

    if(app) {
      let metrics = app.get('metrics');
      metrics[userId] = metrics[userId] || {}; // Create a new field for this user if needed
      metrics[userId][metric] = metrics[userId][metric] ? metrics[userId][metric] + 1 : 1; // Increment/initialize the metric
      app.set('metrics', metrics);

      if(app.validate()) {
        app.save();
      }
    } else {
      throw new Meteor.Error('invalid-app-id', 'An app with the given app ID does not exist');
    }
  }
});

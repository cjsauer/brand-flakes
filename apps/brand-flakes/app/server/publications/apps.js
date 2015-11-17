/*
 * Publishes metric information for a given user of the App with given appId.
 * If the given userId does not exist in the metrics field, it is created 
 *  and initiialized to an empty object.
 * @param {String} appId The appId of the App for which metrics should be returned
 * @param {String} userId The user ID to fetch metrics for
 * @return {Mongo.Cursor} A cursor for the Apps collection with the following fields: 
 *  {
 *    _id,
 *    metrics: {
 *      userId: {
 *        some-metric-1: 42,
 *        some-metric-2: 3
 *      }
 *    }
 *  }
 */
Meteor.publish('user-metrics', function(appId, userId) {
  check(appId, String);
  check(userId, String);

  var app = Apps.findOne({appId});

  if(app) {

    if(!app.metrics[userId]) {
      console.log("HERERERERERR");
      // Initialize this user's metrics if their are none yet
      app.set('metrics.' + userId, {});
      app.save();
    }

    // Return the cursor
    var options = {};
    options.fields = {};
    options.fields['metrics.' + userId] = 1; // Include only this user's metrics data
    return Apps.find({appId}, options);
  } else {
    this.error(new Meteor.Error('invalid-app-id', 'An app with the given app ID does not exist'));
  }
});

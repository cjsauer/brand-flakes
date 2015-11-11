Meteor.startup(function() {
  /* Simulate being a traditional web server by disconnecting
   * from the DDP server, disabling all live updates.
   */
  Meteor.disconnect();
});

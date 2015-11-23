module.exports = {
  createSampleApp: function() {
    return this.execute(function() {
      var sampleApp = new App({
        name: 'Sample App',
        metrics: {
          'some-user-1': {
            'some-metric-1': 42,
            'some-metric-2': 100
          },
          'some-user-2': {
            'some-metric-3': 12,
          }
        }
      });
      
      var res = {};
      res.id = sampleApp.save();
      res.appId = sampleApp.get('appId');
      return res;
    });
  }
};

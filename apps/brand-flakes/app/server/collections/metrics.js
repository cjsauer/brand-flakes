Metrics = new Mongo.Collection('metrics');

Metric = Astro.Class({
  name: 'Metric',
  collection: Metrics,
  fields: {
    name: 'null',
    appId: {
      type: 'string',
      immutable: true
    },
    users: {
      type: 'object',
      default: function() {
        return {};
      }
    }
  },
  simpleValidators: {
    name: 'required,string,maxLength(30)'
  },
  behaviors: ['timestamp'],
  events: {
    'beforeInsert': function(e) {
      // Set the app id to a random 30 character string
      this.set('appId', Random.id(30));
    }
  }
});

Metrics.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Metrics.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

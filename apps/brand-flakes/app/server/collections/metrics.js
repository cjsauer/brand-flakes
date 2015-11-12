Apps = new Mongo.Collection('apps');

App = Astro.Class({
  name: 'App',
  collection: Apps,
  fields: {
    name: 'null',
    appId: {
      type: 'string',
      immutable: true
    },
    metrics: {
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

Apps.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Apps.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

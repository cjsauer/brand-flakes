Metrics = new Mongo.Collection('metrics');

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

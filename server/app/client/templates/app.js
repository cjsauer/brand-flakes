Template.examplePage.events({
  'click .activity-link': function(event) {
    event.preventDefault();
    BrandFlakes.record(event.target.innerText);
  }
});

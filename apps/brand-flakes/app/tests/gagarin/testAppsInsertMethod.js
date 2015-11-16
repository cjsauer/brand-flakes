describe('apps/insert method', function() {
  var server = meteor();

  it('should check its arguments', function(){
    return server.execute(function() {
      var badArgsCall = function() {
        Meteor.call('apps/insert', 'a string is not valid!');
      }
      
      expect(badArgsCall).to.throw(Error, /Match error/);
    });
  });

  it('should throw if the App is not valid', function(){
    return server.execute(function() {
      var invalidAppCall = function() {
        var app = new App({/* no fields set */});
        Meteor.call('apps/insert', app);
      }
      
      expect(invalidAppCall).to.throw(Error, /validation-error/);
    });
  });

  it('should call save when given valid input', function(){
    return server.execute(function() {
      var app = new App({name: 'Example App'});
      spies.create('save', app, 'save');

      Meteor.call('apps/insert', app);
      expect(spies.save).to.have.been.called;
      spies.restoreAll();
    });
  });
});

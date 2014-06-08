var assert = require('assert');

suite('Posts seeds', function () {
  test('seeded posts', function (done, server) {
    server.eval(function () {
      var docs = Posts.find().fetch();
      emit('docs', docs);
    });

    server.once('docs', function (docs) {
      console.log(docs)
      assert.equal(docs.length, 3);
      done();
    });
  });

});

suite('Posts insert permissons', function() {

  test('not authenticated', function(done, server, client) {
    client.eval(function() {
      Meteor.call('post', {title: 'Google CDNs', url: 'http://google.com'}, function(err, id) {
        emit('inserted', err, id);
      });
    });

    client.on('inserted', function(err, id) {
      assert.equal(err.error, 401);
      done();
    });
  });

  test('authenticated', function(done, server, client) {
    client.eval(function() {
      Accounts.createUser({username: 'bob', password: '123456'}, function(err) {
        Meteor.loginWithPassword('bob', '123456', function(err) {
          Meteor.call('post', {title: 'Google CDNs', url: 'http://google.com'}, function(err, id) {
            emit('authenticatedinsert', err, id);
            });
        });
      });
    });

    client.on('authenticatedinsert', function(err, id) {
      assert.equal(err, null);
      assert.ok(id);
      done();
    });
  });
});

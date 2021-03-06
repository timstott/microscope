Meteor.publish('posts', function (options) {
  optionsAllowed = _.pick(options, 'limit', 'sort');
  check(optionsAllowed, {limit: Match.Integer, sort: Match.Any});

  return Posts.find({}, optionsAllowed);
});

Meteor.publish('singlePost', function (id) {
  check(id, String);
  return Posts.find({_id: id});
});

Meteor.publish('comments', function (postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function () {
  return Notifications.find({});
});

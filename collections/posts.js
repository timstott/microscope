Posts = new Meteor.Collection('posts');

// Posts.allow({
//   insert: function (userId, doc) {
//     return !! userId;
//   }
// });

Meteor.methods({
  post: function (postAttributes) {
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url}),
      post = null,
      postId = null;

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline');

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302,
        'This link has already been posted',
        postWithSameLink._id);
    }

    post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      title: postAttributes.title + (this.isSimulation ? '(client)' : '(server)'),
      userId: user.id,
      author: user.username,
      submitted: new Date().getTime()
    });

    // Latency compensation example
    if (! this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function () {
        future.return();
      }, 3 * 1000);
      future.wait();
    }

    postId = Posts.insert(post);

    return postId;

  }
});

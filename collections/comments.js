Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.userId(),
        post = Posts.findOne(commentAttributes.postId),
        comment = null;


    if (!user)
      throw new Meteor.Error(401, 'You need to login to comment');
    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write something');
    if (!post)
      throw new Meteor.Error(422, 'You need to comment on a post');

    comment = _.extend(_.pick(commentAttributes, 'body', 'postId'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    Posts.update(comment.postId, { $inc: { commentsCount: 1}});

    return Comments.insert(comment);
  }
});

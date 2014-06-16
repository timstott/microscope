Template.commentSubmit.events({
  'submit .comment-form': function(e) {
    e.preventDefault();
    var $body = $(e.target).find('[name=body]'),
        commentAttributes = {
          postId: this.post()._id,
          body:   $body.val()
        };

    Meteor.call('comment', commentAttributes, function(error, id) {
      if (error) {
        Errors.throw(error.reason);

      } else {
        $body.val('');
      }
    });

  }
});

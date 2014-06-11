Template.postEdit.events({
  'submit form': function (e) {
    var currentPostId = this._id,
        postProperties = {
          url: $(e.target).find('[name=url]').val(),
          title: $(e.target).find('[name=title]').val()
        };

    e.preventDefault();

    Posts.update(currentPostId, {$set: postProperties}, function (error) {
      if (error) {
        Errors.throw(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },
  'click .delete': function (e) {
    var currentPostId = this._id;

    e.preventDefault();

    if (confirm("Delete this post?")) {
      Post.remove(currentPostId);
      Router.go('postsList');
    }
  }
});

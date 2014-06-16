Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function () {
    return Meteor.subscribe('posts');
  }
});

Router.map(function () {
  this.route('postsList', {path: '/'});
  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
       Meteor.subscribe('comments', this.params._id);
    },
    data: function() {
      var params = this.params;

      return {
        post: function() { return Posts.findOne(params._id); },
        comments: function() { return Comments.find({postId: params._id}); }
      };
    }
  });
  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function () { return Posts.findOne(this.params._id); }
  });
  this.route('postSubmit', {path: '/submit'});
});

var requireLogin = function (pause) {
  if ( ! Meteor.user() ) {
    if ( Meteor.loggingIn() )
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    pause();
  }

};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(function () { Errors.clearSeen(); });

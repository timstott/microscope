Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function () {
    return [Meteor.subscribe('notifications')];
  }
});

Router.map(function () {
  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function () { return Posts.findOne(this.params._id); }
  });
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
  this.route('postSubmit', {path: '/submit'});
  this.route('postsList', {
    path: '/:postsLimit?'
  });
});

PostsListController = RouteController.extend({
  increment: 5,
  limit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return { limit: this.limit(), sort: {submitted: -1} };
  },
  waitOn: function() {
    Meteor.subscribe('posts', this.findOptions());
  },
  posts: function () {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var nextPath = this.route.path({postsLimit: (this.limit() + this.increment)}),
        hasMore = this.posts().count() === this.limit();

    return {
      posts: this.posts(),
      nextPath: hasMore ? nextPath : null
    };
  }
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

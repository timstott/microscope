Meteor.startup(function () {
  Deps.autorun(function () {
    console.log('There are ' + Posts.find().count() + ' posts');
  });
});

Deps.autorun(function () {
  console.log('We have got ' + Posts.find().count() + ' posts');
});

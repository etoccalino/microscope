Posts = new Meteor.Collection('posts');
Posts.allow({
  insert: function (userId, post) {
    return !! userId;
  }
})

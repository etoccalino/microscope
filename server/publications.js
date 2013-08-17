Meteor.publish('posts', function () {
  return Posts.find();
});

Meteor.publish('userData', function () {
  return Meteor.users.find({
    _id: this.userId,
    fields: {
      profile: true,
    }
  });
});

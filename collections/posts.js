Posts = new Meteor.Collection('posts');

Meteor.methods({
  post: function (postAttributes) {
    var user = Meteor.user()
      , postWithSameLink = Posts.findOne({url: postAttributes.url});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to be logged to post.");

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, "Please fill in the Title.")

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink)
      throw new Meteor.Error(
        302,
        "This URL has already been posted.",
        postWithSameLink._id);

    var post = _.extend(_.pick(postAttributes, ['url', 'title', 'message']), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  }
});

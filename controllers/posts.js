const Post = require('../models/Post')


//-------Create Posts

exports.viewCreatePost = (req, res) => res.render('createPost')

exports.createPost = async(req, res) => {
    const { title, category, content } = req.body
    const media = req.file.path
    const thumbnail = req.file.path
    console.log(req.user)
   await Post.create({ title, category, content, media, thumbnail, ownerID:req.user._id })
    res.redirect("/auth/collabDashboard")
}

//-------Posts de cada user

exports.collabPosts = async (req, res) => {
  const posts = await Post.find({
    ownerID: req.user._id
  })
  res.render("collabDashboard", { posts })
}

//-------Post detail

exports.postDetail = async (req, res) => {
  const { postId } = req.params
  const { user } = req
  const post = await Post.findById(postId)
  const owns = user ? String(user._id) == String(post.ownerID) : null

  res.render("postDetail", { post, owns })
}

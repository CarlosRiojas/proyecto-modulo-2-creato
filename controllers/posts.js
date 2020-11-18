const { session } = require('passport')
const Post = require('../models/Post')
const User = require('../models/User')


//-------Create Posts

exports.viewCreatePost =  async(req, res) => {
  const user = await User.findById(req.user.id)
  res.render('createPost', {user})
}
exports.createPost = async(req, res) => {
    const { title, category, content } = req.body
    const media = req.files[0].path
    const thumbnail = req.files[1].path
    if (thumbnail && media){
      await Post.create({ title, category, content, media, thumbnail, ownerID:req.user._id })
    } else if (thumbnail) {
      await Post.create({ title, category, content, thumbnail, ownerID:req.user._id })
    } else if (media){
      await Post.create({ title, category, content, media, ownerID:req.user._id })
    } else {
      await Post.create({ title, category, content, ownerID:req.user._id })
    }
    res.redirect("/auth/collabDashboard")
}

//-------Posts de cada user

exports.collabPosts = async (req, res) => {
  const user = await User.findById(req.user.id)
  const posts = await Post.find({
    ownerID: req.user._id
  })
  res.render("collabDashboard", { posts, user })
}

//-------Post detail

exports.postDetail = async (req, res) => {
  const { postId } = req.params
  const { user } = req
  const post = await Post.findById(postId)
  const owns = user ? String(user._id) == String(post.ownerID) : null

  res.render("postDetail", { post, owns })
}

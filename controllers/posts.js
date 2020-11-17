const Post = require('../models/Post')

exports.viewCreatePost = (req, res) => res.render('/createPost')

exports.createPost = async(req, res) => {
    const { title, category, content } = req.body
    const media = req.file.path
    await Post.create({ title, category, content, media, ownerID:user._id })
    res.render('/userPosts')
}

exports.userPosts = (req, res) => res.render('/userPosts')

exports.userPosts = async (req, res) => {
  const { user } = req
  const posts = await Post.find({
    ownerID: user._id
  })
  res.render("/userPosts", { posts })
}
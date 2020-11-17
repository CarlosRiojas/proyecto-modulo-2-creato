const Post = require('../models/Post')


//-------Create Posts

exports.viewCreatePost = (req, res) => res.render('createPost')

exports.createPost = async(req, res) => {
    const { title, category, content } = req.body
    const media = req.file.path
    await Post.create({ title, category, content, media, ownerID:user._id })
    res.render('userPosts')
    console.log(user._id)
}

//-------Posts de cada user

exports.userPosts = async (req, res) => {
  const { user } = req
  const posts = await Post.find({
    ownerID: user._id
  })
  res.render("userPosts", { posts })
}

//-------Post detail

exports.postDetail = async (req, res) => {
  const { postId } = req.params
  const { user } = req
  const post = await Post.findById(postId)
  const owns = user ? String(user._id) == String(post.ownerID) : null

  res.render("postDetail", { post, owns })
}
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
    // if (thumbnail && media){
      await Post.create({ title, category, content, media, thumbnail, ownerID:req.user._id })
    // } else if (thumbnail) {
    //   await Post.create({ title, category, content, thumbnail, ownerID:req.user._id })
    // } else if (media){
    //   await Post.create({ title, category, content, media, ownerID:req.user._id })
    // } else {
    //   await Post.create({ title, category, content, ownerID:req.user._id })
    // }
    res.redirect("/auth/profile")
}

//-------Posts de cada user

// exports.collabPosts = async (req, res) => {
//   const user = await User.findById(req.user.id)
//   const posts = await Post.find({
//     ownerID: req.user._id
//   })
//   res.render("collabDashboard", { posts, user })
// }

//-------Post detail

exports.postDetail = async (req, res) => {
  const { postId } = req.params
  const { user } = req
  // const user = await User.findById(req.session.passport.user.id)
  const post = await Post.findById(postId).populate('ownerID')
  const owns = user ? String(user.id) == String(post.ownerID) : null
  // console.log(post.ownerID.name)
  res.render("postDetail", { post, owns, user })
}

//--------------edicion del post

exports.editItem = (req,res) => {
  // const user = await User.findById(req.session.passport.user._id)
  const {postId}= req.params
  const {user} = req
  Post.findById(postId)
  .then(postToEdit => {
  res.render("editPage", {postToEdit, user})
  })
  .catch(error => console.log(`error while editing an item: ${error}`))
  }

exports.postEditItem = (req,res) => {
  const {postId}= req.params
  const {title, category, content, media, thumbnail} = req.body
  Post.findByIdAndUpdate(postId, {title, category, content, media, thumbnail},{new: true})
  .then(updatedPost =>
    res.redirect(`/auth/${updatedPost.postId}`))
    .catch(error => console.log(`error while posting the editing an item: ${error}`))
}

  // const {title,category,thumbnail,media,content}= req.body
  // await Post.findByIdAndUpdate(req.params.postId,{title,category,thumbnail,content,media},{new: true})
  // res.redirect(`/auth/${req.params.postId}`)



  
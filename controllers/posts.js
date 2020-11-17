const Post = require('../models/Post')

exports.viewCreatePost = (req, res) => res.render('/createPost')

exports.createPost = async(req, res) => {
    const { title, category, content } = req.body
    const media = req.file.path
    await Post.create({ title, category, content, media })
    res.render('/userPosts')
}

exports.userPosts = (req, res) => res.render('/userPosts')
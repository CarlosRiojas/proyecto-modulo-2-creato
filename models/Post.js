const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      
    },
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Animals', 'Art', 'Cars', 'Crafts', 'Design', 'Food', 'Sports', 'Technology', 'Other']
    },
    content: String,
    media: String,
    thumbnail: String
//     {
//       type: String,
//       default: '/images/defaultthumbnail.jpg'
// }
}, {
    timestamps: true
})


module.exports = model("Post", postSchema)
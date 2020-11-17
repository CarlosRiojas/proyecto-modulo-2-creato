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
<<<<<<< HEAD
    media: String,
    thumbnail: String
=======
    media: { 
      type: String,
    },
>>>>>>> 71289d436245e29e23d8131a73f03ef8e6cb20df
}, {
    timestamps: true
})


module.exports = model("Post", postSchema)
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        required: true
    },
    author: {
        type: String,
        minLength: 3,
        required: true
    },
    url: {
        type: String,
        minLength: 3,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model("Blog", blogSchema);
export { Blog };

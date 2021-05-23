const mongoose = require("mongoose");

const schema = mongoose.Schema;
const blogschema = new schema({
    title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogschema);

module.exports = Blog;
const {Schema, model} = require('mongoose');
const Joi = require('joi');
const { authorSchema } = require('./author');
const { categorySchema } = require('./category');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: [authorSchema],
        required: true
    },
    category: {
        type: [categorySchema],
        required: true
    },
    publishedYear: {
        type: Number
    },
    summary: {
        type: String
    }
})

const Books = model('book', bookSchema);

function valid(book) {
    const schema = {
        title: Joi.string().required(),
        author: Joi.string().required(),
        category: Joi.string().required(),
        publishedYear: Joi.number(),
        summary: Joi.string()
    }
    return Joi.validate(book, schema);
}

module.exports = {
    Books,
    valid
}
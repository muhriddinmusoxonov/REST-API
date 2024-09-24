const { Schema, model } = require('mongoose');
const Joi = require('joi');

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String
    }
});

const Author = model('author', authorSchema);

function valid(author) {
    const schema = {
        name: Joi.string().required(),
        biography: Joi.string()
    }
    return Joi.validate(author, schema);
}

module.exports = {Author, valid};
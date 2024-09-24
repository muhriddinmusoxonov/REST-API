const { Schema, model } = require('mongoose');
const Joi = require('joi');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const Category = model('category', categorySchema);

function valid(category) {
    const schema = {
        name: Joi.string().required(),
        description: Joi.string()
    }

    return Joi.validate(category, schema);
}

module.exports = {Category, valid};
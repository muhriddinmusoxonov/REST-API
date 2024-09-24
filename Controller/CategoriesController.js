const { valid, Category } = require('../model/category');

const createCategory = async (req, res) => {
    const { error } = await valid(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, description } = req.body;

    const category = new Category({
        name,
        description
    });

    await category.save();
    return res.send(category);
}

const findCategory = async (req, res) => {
    const category = await Category.find();
    if (!category) {
        return res.status(404).send("Hozircha Kategoriyalar yo'q");
    }

    return res.status(200).send(category);
}

const findIdCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).send('Bunday kategoriya topilmadi');
    }

    return res.status(200).send(category);
}

const updateCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).send("Bunday kategoriya mavjud emas");
    }

    const { error } = valid(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, biography } = req.body;

    await category.updateOne({ name, biography });
    res.status(200).send('Updated');
}

const deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        return res.status(404).send("Bunday kategoriya topilmadi");
    }

    return res.send(category);
}

module.exports = {
    createCategory,
    findCategory,
    findIdCategory,
    updateCategory,
    deleteCategory
}
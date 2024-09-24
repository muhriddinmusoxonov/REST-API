const { valid, Author } = require('../model/author');

const createAuthor = async (req, res) => {
    const { error } = await valid(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, biography } = req.body;

    const author = new Author({
        name,
        biography
    });

    await author.save();
    return res.send(author);
}

const findAuthor = async (req, res) => {
    const author = await Author.find();
    if (!author) {
        return res.status(404).send("Hozircha Mualiflar yo'q");
    }

    return res.status(200).send(author);
}

const findIdAuthor = async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (!author) {
        return res.status(404).send('Bunday muallif topilmadi');
    }

    return res.status(200).send(author);
}

const updateAuthor = async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (!author) {
        return res.status(404).send("Bunday author mavjud emas");
    }

    const { error } = valid(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, biography } = req.body;

    await author.updateOne({ name, biography });
    res.status(200).send('Updated');
}

const deleteAuthor = async (req, res) => {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
        return res.status(404).send("Bunday mualif topilmadi");
    }

    return res.send(author);
}

module.exports = {
    createAuthor,
    findIdAuthor,
    findAuthor,
    updateAuthor,
    deleteAuthor
}
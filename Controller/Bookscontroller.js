const { Books, valid } = require('../model/books');
const { Category } = require('../model/category');
const { Author } = require('../model/author');

const getBooks =  async (req, res) => {
    const book = await Books.find();

    if (!book) {
        res.status(404).send('Kitoblar mavjud emas');
    }

    res.send(book);
}

const createBook = async (req, res) => {
    const { error } = valid(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const categor = await Category.findById(req.body.category);

    if (!categor) {
        return res.status(404).send('Bunday kategoriya topilmadi');
    }

    const authore = await Author.findById(req.body.author);
    if (!authore) {
        return res.status(404).send('Bunday muallif topilmadi');
    }

    const { title, author, category, publishedYear, summary } = req.body;

    const book = new Books({
        title,
        author: {
            _id: authore._id,
            name: authore.name
        },
        category: {
            _id: categor._id,
            name: categor.name
        },
        publishedYear,
        summary
    });

    await book.save();
    res.send(book);
}

const findIdBook = async (req, res) => {
    const book = await Books.findById(req.params.id);
    if (!book) {
        return res.status(404).send('Bunday kitob topilmadi');
    }

    return res.status(200).send(book);
}

const findNameBook = async (req, res) => {
    const book = await Books.find({ title: req.params.name });
    if (!book.length) {
        return res.status(404).send('topilmadi')
    }

    res.send(book);
}

const updateBook = async (req, res) => {
    const book = await Books.findById(req.params.id);
    if (!book) {
        return res.status(404).send("Bunday kitob mavjud emas");
    }

    const { error } = valid(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { title, author,category,publishedYear, summary } = req.body;

    await book.updateOne({ title, author, category, publishedYear, summary });
    res.status(200).send('Updated');
}

const deleteBook = async (req, res) => {
    const book = await Books.findByIdAndDelete(req.params.id);
    if (!book) {
        return res.status(404).send("Bunday kitob topilmadi");
    }

    return res.send(book);
}

module.exports = {
    getBooks,
    createBook,
    findIdBook,
    updateBook,
    deleteBook,
    findNameBook
};
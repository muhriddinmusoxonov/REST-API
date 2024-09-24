const { Router } = require('express');
const { getBooks,
    createBook,
    findIdBook,
    updateBook,
    deleteBook,
    findNameBook
} = require('../Controller/Bookscontroller');
const router = Router();

router.get('/', getBooks);
router.post('/', createBook);
router.get('/:id', findIdBook);
router.get('/book/:name', findNameBook)
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
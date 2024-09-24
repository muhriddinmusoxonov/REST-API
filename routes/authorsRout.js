const { Router } = require('express');
const { createAuthor,
    findIdAuthor,
    findAuthor,
    updateAuthor,
    deleteAuthor,
    } = require('../Controller/AuthorsController');
const router = Router();

router.post('/', createAuthor);
router.get('/', findAuthor);
router.get('/:id', findIdAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;
const { Router } = require('express');
const { createCategory, findCategory, findIdCategory, updateCategory, deleteCategory } = require('../Controller/CategoriesController');
const router = Router();

router.post('/', createCategory);
router.get('/', findCategory);
router.get('/:id', findIdCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
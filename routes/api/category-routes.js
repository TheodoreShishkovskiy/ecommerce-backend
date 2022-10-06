const router = require('express').Router();
const { Category, Product } = require('../../models');

//Class info - The `/api/categories` endpoint

router.get('/', (req, res) => {
  //Class info - find all categories
  //Class info - be sure to include its associated Products
// Find all categories and includes Products assoictated
  Category.findByAll ({include: [Product]})
  .then(dataInfo => {
    console.log(dataInfo)
    res.status(200).json(dataInfo)
  }).catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  //Class info - find one category by its `id` value
  //Class info - be sure to include its associated Products
});

router.post('/', (req, res) => {
  //Class info - create a new category
});

router.put('/:id', (req, res) => {
  //Class info - update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  //Class info - delete a category by its `id` value
});

module.exports = router;

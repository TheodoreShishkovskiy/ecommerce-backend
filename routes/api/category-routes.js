const router = require('express').Router();
const { Category, Product } = require('../../models');

//Class info - The `/api/categories` endpoint

router.get('/', (req, res) => {
  //Class info - find all categories
  //Class info - be sure to include its associated Products
// Find all categories and includes Products assoictated
Category.findAll ({include: [Product]})
  .then(dataInfo => {
    console.log(dataInfo)
    res.status(200).json(dataInfo)
  }).catch(err => res.status(400).json(err))
});

router.get('/:id', (req, res) => {
  //Class info - find one category by its `id` value
  //Class info - be sure to include its associated Products
// Finds one category by its id value
Category.findByPk(req.params.id, {include: [Product]})
  .then(dataInfo => {
    console.log(dataInfo)
    res.status(200).json(dataInfo)
  }).catch(err => res.status(400).json(err))
});

router.post('/', (req, res) => {
  //Class info - create a new category
// Creates a new category in the Category Model
Category.create(req.body)
  .then(dataInfo => {
    console.log(dataInfo)
    res.status(200).json(dataInfo)
  }).catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  //Class info - update a category by its `id` value
// Updates one category by its Id value
Category.update (req.body, {where: {id: req.params.id}})
  .then(dataInfo => {
    console.log(dataInfo)
    res.status(200).json(dataInfo)
  }).catch(err => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  //Class info - delete a category by its `id` value
// Delete a Category route by its Id Value
Category.destroy({where: {id: req.params.id}})
  .then(dataInfo => {
    console.log(dataInfo)
    res.status(200).json(dataInfo)
  }).catch(err => res.status(400).json(err))
});

module.exports = router;

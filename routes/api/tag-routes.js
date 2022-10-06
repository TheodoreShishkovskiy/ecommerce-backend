const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
// Find all tags by id including the product data
Tag.findAll ({
  attributes: ['id', 'tag_name'],
  include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}]
})
.then(dataInfo => {
  console.log(dataInfo)
  res.status(200).json(dataInfo)
}).catch(err => res.status(400).json(err))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

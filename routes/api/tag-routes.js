const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { findAll } = require('../../models/Product');

//Class info - The `/api/tags` endpoint

router.get('/', (req, res) => {
  //Class info - find all tags
  //Class info - be sure to include its associated Product data
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
  //Class info - find a single tag by its `id`
  //Class info - be sure to include its associated Product data
// Find one Tag by its id with its assoication to Product Data
Tag.findOne ({where: {id: req.params.id},
  attributes: ['id', 'tage_name'],
  include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}]
})
  .then(dataInfo => {
  console.log(dataInfo)
  res.status(200).json(dataInfo)
}).catch(err => res.status(400).json(err))
});

router.post('/', (req, res) => {
  //Class info - create a new tag
// This will create a new Tag in the Tag Model
Tag.create({tag_name: req.body.tag_name})
  .then(dataInfo => {
  console.log(dataInfo)
  res.status(200).json(dataInfo)
}).catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  //Class info - update a tag's name by its `id` value
// This will update a Tag based on its id value
Tag.update(req.body, {where: {id: req.params.id}})
  .then(dataInfo => {
    console.log(dataInfo)
    res.status(200).json(dataInfo)
  }).catch(err => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  //Class info - delete on tag by its `id` value
});

module.exports = router;

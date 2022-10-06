const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

//Class info - The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  //Class info - find all products
  //Class info - be sure to include its associated Category and Tag data
// Find all Products including its category and tag
Product.findAll ({Include: [Category, Tag]})
 .then(dataInfo => {
  console.log(dataInfo)
  res.status(200).json(dataInfo)
 }).catch(err => res.status(400).json(err))
});

//Class info - get one product
router.get('/:id', (req, res) => {
  //Class info - find a single product by its `id`
  //Class info - be sure to include its associated Category and Tag data
//Finds the Product by its id , which is assoiciated with Tag and Category data
Product.findOne({ 
  where: { id: req.params.id},
  attributes : ['id', 'product_name', 'price', 'stock', 'category_id'],
  include: [
    {model: Category, attributes: ['id', 'category_name']},
    {model: Tag, attributes: ['id', 'tag_name']}
  ]
}).then(dataInfo => {
  console.log(dataInfo)
  res.status(200).json(dataInfo)
}).catch(err => res.status(400).json(err))
});

//Class info - create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      //Class info - if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      //Class info - if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//Class info - update product
router.put('/:id', (req, res) => {
  //Class info - update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      //Class info - find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      //Class info - get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      //Class info - figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      //Class info - run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      //Class info - console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  //Class info - delete one product by its `id` value
Product.destroy({ where: {id: req.params.id}})
  .then(dataInfo => {
    console.log(dataInfo)
    res.status(200).json(dataInfo)
  }).catch(err => res.status(400).json(err))
});

module.exports = router;

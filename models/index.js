// Class info -  import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Class info -  Products belongsTo Category
// This allows all products to belong to the Category model
Product.belongsTo(Category);
// Class info -  Categories have many Products
// Shows that Category model contains many products
Category.hasMany(Product);
// Class info -  Products belongToMany Tags (through ProductTag)
// Product belongs to many Tags
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id'});
// Class info -  Tags belongToMany Products (through ProductTag)
// Tag belongs to many Products
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id'});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

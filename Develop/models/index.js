// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// lets define the relationship between models !!
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id", 
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', 
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, 
  foreignKey: 'tag_id', 
});
// this export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

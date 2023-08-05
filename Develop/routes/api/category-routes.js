const router = require('express').Router();
const e = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories with its associated Products
try {
  const categories = await Category.findAll({
    include: [{medel: Product}] });
    res.status(200).json(categories);
} catch (err) {
  res.status(500).json({message: "category NOT found"});
}
});

router.get('/:id', async (req, res) => {
  // lets find one category by its `id` value with its associated Products
  try { 
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}] });
      if (!category) {
        res.status(404).json({message: "id is NOT found"});
        return;
      }
      res.status(200).json(category)

  } catch (err) {
    res.status(500).json({message: "id is NOT found!!"})
  }
});

router.post('/', async (req, res) => {
  //  this will create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch(err) {
    res.status(400).json({message: "failed to create"});
  }
 
});

router.put('/:id', async (req, res) => {
  // This will update a category by its `id` value
  try{
    const updated = await Category.update(req.body, { where: {id: req.params.id} });
    !updated[0] 
    ? res.status(404).json({ message: 'id not found' }) 
    : res.status(200).json(updated);
  } catch (err){
    res.status(500).json({message: "failed to update"});
  }

});

router.delete('/:id', async(req, res) => {
  // this will delete a category by its `id` value
  try{
    const deleted = await Category.destroy({where:{id: req.params.id} });
    !deleted [0]
    ? res.status(404).json({ message: 'id not found' }) 
    : res.status(200).json(deleted);
  } catch (err) {
    res.status (500).json(err);
  }
});

module.exports = router;

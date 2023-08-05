const router = require('express').Router();
const { constants } = require('buffer');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// lets get all Tags!!
router.get('/', async (req, res) => {
  // this will find all tags and associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({
      message: "Tags NOT found!!"
    });
  }
});

router.get('/:id', async(req, res) => {
  // This will find a single tag by its `id` and its associated product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include:[{model: Product}],
    });
    if (!tagData){
      res.status(404).json({message: "No tag found with this id!!"});
      return;
    }
   res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({message: "Tag was not found!!"});
  }
});

router.post('/', async(req, res) => {
  // Lets create a new tag!!
try {
  const tagData = await Tag.create(req.body);
  res.status(200).json(tagData);
} catch (err){
  res.status(400).json({message: "failed to create a new tag!!"});
}
});

router.put('/:id', async (req, res) => {
  // Lets update a tag's name by its `id` value
try {
  const updated = await Tag.update(req.body, {
where: { id: req.params.id },
  });
  !updated[0]
  ? res.status(404).json({message: "There is not tag with this id!!"})
  :res.status(200).json(updated);

} catch(err) {
  res.status(500).json({message: "Failed to update a tag!!"});
}

});

router.delete('/:id', async (req, res) => {
  // this will delete a tag by its `id` value
try {
  const deleted = await Tag.destroy({where: {id: req.params.id} });
  !deleted[0]
  ?res.status(404).json({message: "There is no tag with id"})
  : res.status(200).json(deleted);
} catch (err) {
  res.status(500).json({ message: "Failed to delete tag!!"});
}
});

module.exports = router;

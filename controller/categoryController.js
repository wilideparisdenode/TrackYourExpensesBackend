const category = require("../model/categoryModel");

async function createcategory(req, res) {
  const { name, description } = req.body;
  try {
    let existing = await category.findOne({ name });
    if (existing) {
      return res.status(300).send(existing);
    }
    const newCategory = new category({ name, description });
    await newCategory.save();
    res.status(200).send(newCategory);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  try {
    const del = await category.findByIdAndDelete(id);
    if (del) {
      res.status(202).send("Category was successfully deleted");
    } else {
      res.status(401).send("Something went wrong");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function viewCategory(req, res) {
  try {
    let cat = await category.find();
    if (cat && cat.length > 0) {
      res.status(200).send(cat);
    } else {
      res.status(404).send({ message: "There are no categories" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  viewCategory,
  deleteCategory,
  createcategory,
};

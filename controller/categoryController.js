const category = require("../model/categoryModel");

async function createcategory(req, res) {
    const { name, description } = req.body;

    try {
        const [data, created] = await category.findOrCreate({
            where: { name },
            defaults: { name, description }
        });

        if (created) {
            res.status(200).send(data); // Send status code before sending response
        } else {
            res.status(300).send(data); // Send status code before sending response
        }
    } catch (error) {
        res.status(500).send({ error: error.message }); // Send proper status and error message
    }
}

async function deleteCategory(req, res) {
    const { id } = req.params;

    try {
        const del = await category.destroy({
            where: { id }
        });

        if (del) {
            res.status(202).send("Category was successfully deleted"); // Corrected spelling
        } else {
            res.status(401).send("Something went wrong");
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function viewCategory(req, res) {
    try {
        let cat = await category.findAll();

        if (cat && cat.length > 0) { // Check if categories exist
            res.status(200).send(cat); // Use status 200 for successful data retrieval
        } else {
            res.status(404).send({ message: "There are no categories" }); // Use 404 for not found
        }
    } catch (error) {
        res.status(500).send({ error: error.message }); // Send error message with proper status code
    }
}

module.exports = {
    viewCategory,
    deleteCategory,
    createcategory
};


const express = require("express");
const { SQL } = require('../../functions/function');
const router = express.Router();

router.get("/products/:category", async (req, res) => {

    const { category } = req.params;

    if (!category) 
        return res.status(400).end(); // Missing Category

    try {
        const products = await SQL("SELECT * FROM products where category = ?",category)

        if (!products)
            return res.status(404).end(); // Product Not Found

        return res.json({
            products,
        });

    } catch (error) {
        
        console.log(error) // Server Error
        return res.status(500).end();
    }

});

router.get("/products", async (req, res) => {

    try {
        const products = await SQL("SELECT * FROM products ",)

        if (!products)
            return res.status(404).end(); // Products Not Found

        return res.json({
            products,
        });

    } catch (error) {

        console.log(error) // Server Error
        return res.status(500).end();
    }

});

module.exports = router;

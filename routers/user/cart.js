
const express = require("express");
const { SQL , VerifyUser } = require("../../functions/function"); // Import functions
const router = express.Router();

router.post("/cart", async (req, res) => {

    const { token , cart } = req.body;

    if (!token || !cart)
        return res.status(400).end(); // Missing Token

    let userinfo

    try {
        userinfo = await VerifyUser(token)
    }
    catch (error) {
        return res.status(401).end(); // invalid User
    }

    try {

        await SQL(`UPDATE users SET cart = ? WHERE id = ?`, [JSON.stringify(cart), userinfo.id]);

        return res.status(200).end(); // Done

    } catch (error) {

        console.log(error) // Server Error
        return res.status(500).end();
    }

});

module.exports = router;
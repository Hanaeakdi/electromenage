
const express = require("express");
const { VerifyUser } = require("../../functions/function"); // Import functions
const router = express.Router();
t
router.post("/info", async (req, res) => {

    const { token } = req.body;

    if (!token)
        return res.status(400).end(); // Missing Token

    let userinfo

    try {
        userinfo = await VerifyUser(token)
    }
    catch (error) {
        return res.status(401).end(); // invalid User
    }

    const cart = JSON.parse(userinfo.cart)

    delete userinfo.cart
    delete userinfo.pass

    try {
        return res.status(200).json({ // Auth
            info: userinfo,
            cart,
        });

    } catch (error) {

        console.log(error) // Server Error
        return res.status(500).end();
    }

});

module.exports = router;
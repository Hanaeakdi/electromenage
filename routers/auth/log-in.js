
const express = require("express");
const router = express.Router();
const { NewToken , SQL } = require("../../functions/function"); // Import functions

router.post("/log-in", async (req, res) => { 
    const { email , pass } = req.body

    if (!email || !pass) 
        return res.status(400).end(); // Missing User or Pass

    let user_data

    try {
        [user_data] = await SQL("SELECT * FROM users WHERE email = ? AND pass = ?", [email, pass])
        
        if (!user_data)
            return res.status(401).end(); // User not Found
    }
    catch (error) {
        return res.status(401).end(); // invalid user
    }

    try {
        res.json({
            token: NewToken({ id: user_data.id, email, pass })
        });
    
    } catch (error) {

        console.log(error) // Server Error
        return res.status(500).end();
    }

});

module.exports = router; // Correctly export the router

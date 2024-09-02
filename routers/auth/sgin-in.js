
const express = require("express");
const router = express.Router();
const { SQL } = require("../../functions/function"); // Import functions

router.post("/sgin-in", async (req, res) => { 
    const { user, email, pass } = req.body

    if (!user || !email || !pass) 
        return res.status(400).end(); // Missing User or Email or Pass

    let user_data

    try {
        [user_data] = await SQL("SELECT * FROM users WHERE email = ? ", [email])
        
        if (user_data)
            return res.status(409).end(); // invalid user
    }
    catch (error) {
        return res.status(409).end(); // invalid user
    }

    try {
        const result = await SQL("INSERT INTO users (user , email, pass) VALUES (?, ?, ?)", [user,email, pass])

        if (!result.insertId) 
            return res.status(500).end(); // SQL Error
        
        return res.status(201).end(); // Done
    
    } catch (error) {

        console.log(error) // Server Error
        return res.status(500).end();
    }

});

module.exports = router; // Correctly export the router

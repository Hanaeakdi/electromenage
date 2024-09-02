
const express = require("express");
const path = require('path'); 
const router = express.Router();
const sanitizeFilename = require('sanitize-filename');

router.get('/image/:tag', (req, res) => {

    const tag = sanitizeFilename(req.params.tag); // Fix Path traversal attacksA

    if (!tag)
        return res.status(400).end();
    
    const imagePath = path.join(__dirname, `../../img/${tag}`); // jpg png

    res.sendFile(imagePath, (err) => {
        if (err)
            return res.status(404).end();
    });

});

module.exports = router;
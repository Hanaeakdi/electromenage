const jwt = require("jsonwebtoken");
const pool = require("./db");  // connection

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const jwtSecret = process.env.JWT_SECRET;

// Send query to SQL Data Base

function SQL(query, params = []){
    
    return new Promise( (resolve, reject) => {
            pool.query(query, params,(err, results) => {
                err ? reject(err) : resolve(results);
            });
    });
}

// Generate Token

function NewToken(pyload){ 
    const token = jwt.sign(pyload, jwtSecret);
    return token
}

// User Verification

function VerifyUser(token) {

    return new Promise((resolve, reject) => {

        jwt.verify(token, jwtSecret, async (err, decoded) => { 

            if (err) {
                reject(" Invalid token ");
                return;
            }

            const { email , pass } = decoded;

            try {

                const [user_data] = await SQL("SELECT * FROM users WHERE email = ? AND pass = ?", [email, pass])

                if (user_data) 
                    resolve(user_data);

                else
                    reject("Invalid User");

            } catch (error) {
                reject(error);
            }

        });
    });
}

module.exports = {
    SQL,
    NewToken,
    VerifyUser
};
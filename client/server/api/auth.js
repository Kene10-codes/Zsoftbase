const express = require("express");
const router = express.Router();
const signupModels = require("../models/signupModel");
const { signupChecks, loginChecks } = require("../authValidation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const { getMaxListeners } = require("../models/signupModel");

//SIGNUP POST ROUTE
router.post("/signup", async (request, response)=> {
    const { error } = signupChecks(request.body);
    if(error) {
        return response.status(400).send(error.details[0].message)
    }

    const existingEmail = await signupModels.findOne({ email: request.body.email });
    if(existingEmail){
        return response.status(400).send("Email already exists");
    }


    const saltPassword = await bcrypt.genSalt(10)
    const hashedPasword = await bcrypt.hash(request.body.password, saltPassword)

    const newUser = new signupModels({
        fullName: request.body.fullName,
        email: request.body.email,
        password: hashedPasword,
        comment: request.body.comment
    })

    newUser.save()
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.json(error)
    })
});


//LOGIN POST REQUEST
router.post("/login", async (request, response) => {
    const { error } = loginChecks(request.body)
    if(error ){
        return response.status(400).send(error.details[0].message)
    }

    const siteUser = await signupModels.findOne({ email: request.body.email })
    if(!siteUser){
        return response.status(400).send("Email not found in our database")
    }

    const correctPassword = await bcrypt.compare(request.body.password, siteUser.password)
    if(!correctPassword){
        return response.status(400).send("Password is incorrect!")
    }

    //JWT TOKEN
    // const sessionToken = jwt.sign({_id: siteUser.id}, process.env.MY_SECRET_TOKEN)
    // response.header("authentication_id", sessionToken).send(sessionToken)
    

    //JWT ASYNCRONOUS METHOD
    jwt.sign({_id: siteUser.id}, 'secretkey', { expiresIn: '30s'}, (error, token) => {
        response.json ({
            message: 'Logged in successfully',
            token
        });

    });
})

// PROFILE DISPLAY ROUTE
router.post("/profile", verifyToken, (request, response) => {
    jwt.verify(request.token, 'secretkey', (error, authData) => {
       if(error) {
           response.status(403).send('Forbidden');
       } else {
        response.json({
            message: "User profile info and logged in.",
            authData
        });
       }
    });
   
});

//FORMAT TOKEN
//AUTHORIZATION: BEARER <ACCESS_TOKEN>

//VERIFY TOKEN
function verifyToken(request, response, next) {
    //GET THE HEADER VALUE
    const bearerHeader = request.headers['authorization'];

    //CHECK IF BEARER IS UNDEFINED
    if(typeof bearerHeader !== 'undefined') {
        //SPLIT AT THE SPACE
        const bearer = bearerHeader.split(' ');
        //GET TOKEN FROM ARRAY
        const bearerToken = bearer[1];
        request.token = bearerToken;
        // CALL NEXT MIDDLEWARE
        next();

    } else {
            // RETURN FORBIDDEN
            response.status(403).send('Forbidden');
    }
}



module.exports = router;
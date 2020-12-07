const express = require("express");
const router = express.Router();
const signupModels = require("../models/signupModel");
const { signupChecks, loginChecks } = require("../authValidation");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { request } = require("express");



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

    // const sessionToken = jwt.sign({_id: siteUser.id}, process.env.MY_SECRET_TOKEN)
    // response.header("authentication_id", sessionToken).send(sessionToken)

    response.send("logged in successfully")
})

module.exports = router;
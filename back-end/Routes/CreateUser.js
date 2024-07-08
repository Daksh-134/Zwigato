const { body, validationResult } = require('express-validator');
const express=require('express')
const router=express.Router()
const user=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const secret = process.env.SECRET;
console.log(secret)
router.post("/CreateUser",[
    body('Email').isEmail(),
    body('Name').isLength({min:5}),
    body('Password','Incorrect password').isLength({min: 5})
],

async(req,res)=>{
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.send({ errors: err.array() });
    }
    const salt=await bcrypt.genSalt(10)
    let secPassword=await bcrypt.hash(req.body.Password,salt)
    try {
        await user.create({
            Name: req.body.Name,
            Password: secPassword,
            Email:req.body.Email,
            Location:req.body.Location
        })
        res.json({success:true})
    } 
    catch (error) {
        console.log(error)
        res.json({success:false})
    }
})

router.post("/loginUser",
async(req,res)=>{
    let Email=req.body.Email;
    try {
        let userData=await user.findOne({Email})
        if(!userData){
            json({ error: "Incorrect Email" });
            return res.status(400)
        }

        const pwdCompare = await bcrypt.compare(req.body.Password,userData.Password)
        if(!pwdCompare){
            json({ error: "Incorrect Password" });
            return res.status(400)
        }

        const data={
            user:{
                id:userData.id
            }
        }
        console.log(secret)
        const authToken = jwt.sign(data,secret);
        return res.json({success:true,authToken:authToken})
    } 

    catch (error) {
        console.log(error)
        return res.json({success:false})
    }
})

module.exports = router;
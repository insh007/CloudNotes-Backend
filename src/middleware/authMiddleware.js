require('dotenv').config()
const {isValidObjectId} = require('mongoose')
const  notesModel = require('../models/notesModel')
const jwt = require('jsonwebtoken')

const authentication = async function(req,res,next){
    try{
        const token = req.headers["x-api-key"]
    
        if(!token)return res.status(400).send({status:false, msg:"Token must be present in the header"})
    
        jwt.verify(token, process.env.JWT_SECRET, function(err, tokenVerify){
            if(err){
                return res.status(401).send({status:false, msg:"unauthentication access"})
            }
            else{
                req.tokenVerify = tokenVerify
                next()
            }
        })
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}

const authorization = async function(req, res, next){
    try{
        const Id = req.params.Id
    
        if(!(isValidObjectId(Id)))return res.status(400).send({status:false, msg:"Invalid mongodb userId"})

        const fetchDetails = await notesModel.findById(Id)
        if(!fetchDetails)return res.status(404).send({status:false, msg:"Data is not found"})
    
        //authorization
        if(fetchDetails.userId != req.tokenVerify.userId)return res.status(403).send({status:false, msg:"you are unauthorized to access"})
        next()
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}

module.exports = {authentication, authorization}
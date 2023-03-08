const notesModel = require('../models/notesModel')
const {isValidString} = require('../validation/validation')

const createNotes = async function(req, res){
    try{
        const data = req.body
        const { title, description } = data
        
        /*------------------------Checking body is empty or not----------------------------------*/
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please provide data in request body" }) }
        
        /*------------------------Checking fileds are present or not-----------------------------*/
        if (!title) { return res.status(400).send({ status: false, message: "title is required" }) }
        if (!description) { return res.status(400).send({ status: false, message: "description is required" }) }
        
        /*-------------------Checking fileds values are valid or not-----------------------------*/
        if (!(isValidString(title))) { return res.status(400).send({ status: false, message: "title is empty" }) }
        if (!(isValidString(description))) { return res.status(400).send({ status: false, message: "description is empty" }) }

        /*--------------- adding userId to data by fetching from request token to provide refrence ---------------*/
        data.userId = req.tokenVerify.userId
        
        /*-------------------Creating data-----------------------------*/
        const createData = await notesModel.create(req.body)
        return res.status(201).send(createData)
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}

const fetchNotes = async function(req, res){
    try{
        /*-------------------Fetching data-----------------------------*/
        const data = await notesModel.find({userId: req.tokenVerify.userId})
        return res.status(200).send({status:true, data:data})
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}

const updateNotes = async function(req, res){
    try{
        const Id = req.params.Id
        const data = req.body
        const { title, description } = data

        /*-------------------Checking fileds values are valid or not-----------------------------*/
        if(title){
            if (!(isValidString(title))) { return res.status(400).send({ status: false, message: "title is empty" }) }
        }
        if(description){
            if (!(isValidString(description))) { return res.status(400).send({ status: false, message: "description is empty" }) }
        }

        /*------------------- Updating the fields -----------------------------*/
        const update = await notesModel.findOneAndUpdate(
            {_id:Id},
            {$set:req.body},
            {new:true}
        )

        return res.status(200).send({status:true, data:update})
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}

const flagDelete = async function(req, res){
    try{
        const Id = req.params.Id

        /*-------------------Deleting data-----------------------------*/
        const flag = await notesModel.findOneAndDelete({_id:Id})

        return res.status(200).send({status:true, data:flag})
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}

module.exports = {fetchNotes, createNotes, updateNotes, flagDelete}
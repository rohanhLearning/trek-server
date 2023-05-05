const Trek = require('../database/schemas/treks.schema');

const getAllTreks = async (req, res) => {
    try{
        const treks = await Trek.find();
        if (!treks){
            return res.json({
                success: false,
                message: "No treks present",
            })
        }
        return res.status(200).json({
            success: true,
            data: treks,
        })
    }catch(e){
        throw new Error(e.message)
    }
}

const getTrekById = async (req, res) => {
    try{
        const trek = await Trek.findById(req.params.id);
        if (!trek){
            return res.json({
                success: false,
                message: "No trek found with this id",
            })
        }
        return res.status(200).json({
            success: true,
            data: trek,
        })
    }catch(e){
        return res.status(400).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const createtrek = async (req, res) => {
    try{
        let trekObject = {
            title: req.body.title,
            venue: req.body.venue,
            difficulty: req.body.difficulty,
            timeRequired: req.body.timeRequired,
        }
        const trek = await Trek.create(trekObject);
        if (!trek){
            return res.json({
                success: false,
                message: "Failed to create trek",
            })
        }
        return res.status(201).json({
            success: true,
            data: trek,
        })
    }catch(e){
        throw new Error(e.message)
    }
}

const editTrek = async (req, res) => {
    try{

        const trek = await Trek.findById(req.params.id);
        if (!trek){
            return res.json({
                success: false,
                message: "No trek found for this id",
            })
        }
        let trekObject = {
            title: req.body.title ? req.body.title : trek.title,
            venue: req.body.venue ? req.body.venue : trek.venue,
            difficulty: req.body.difficulty ? req.body.difficulty : trek.difficulty,
            timeRequired: req.body.timeRequired ? req.body.timeRequired : trek.timeRequired,
        }
        const updatedTrek = await Trek.findByIdAndUpdate(req.params.id, trekObject);
        if (!updatedTrek){
            return res.json({
                success: false,
                message: "Failed to update the trek",
            })
        }
        return res.status(200).json({
            success: true,
            data: trekObject,
        })
    }catch(e){
        throw new Error(e.message)
    }
}

const deletetrek = async (req, res) => {
    try{
        const trek = await Trek.findByIdAndDelete(req.params.id);
        if (!trek){
            return res.json({
                success: false,
                message: "No treks present with this id",
            })
        }
        return res.status(200).json({
            success: true,
            deleted: trek,
        })
    }catch(e){
        throw new Error(e.message)
    }
}
module.exports = {
    getAllTreks, getTrekById, createtrek, edittrek: editTrek, deletetrek,
};
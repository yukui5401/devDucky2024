const mongoose = require('mongoose');
const AIPRedictServices = require('../services/AIPredictServices');
const UserMLResponseSchema = require('../model/AIPredictModel');

const Create = async (req, res, next) => {
    try {
        const newAIPredictionResponse = new UserMLResponseSchema(req.body);
        await newAIPredictionResponse.save();
        res.status(200).json({ message: "AI Prediction Response Created" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const Read = async (req, res, next) => {
    try {
        const allAIPredictionResponses = await UserMLResponseSchema.find();
        res.status(200).json(allAIPredictionResponses);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// GET METHOD BY BEST PROBABILITY

const GetBestProbability = async (req, res, next) => {
    try {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            const bestProbability = await AIPRedictServices.GetBestProbability();
            arr.push(bestProbability);
        }
        res.status(200).json();

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}





module.exports = {
    Create,
    Read
}
//
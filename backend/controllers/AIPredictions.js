const mongoose = require('mongoose');
const UserMLResponseSchema = require('../model/AIPredictModel');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

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

const GetCodeInputSuggestion = async (req, res, next) => {
    const form = new FormData();

    const filePath = "/tmp/devducky.mp3";

    form.append('audio', fs.createReadStream(filePath));

    const response = await axios.post('http://localhost:4000/', form, {
        headers: form.getHeaders(),
    });

    res.status(200).json(response.data);

    // Read a file from the local file system and append it to the form

}



module.exports = {
    Create,
    Read,
    GetCodeInputSuggestion
}
//UserMLResponseSchema.
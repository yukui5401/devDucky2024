const mongoose = require('mongoose');
const { runJslint } = require('../services/LintServices/Javascript/run-js-lint');
const { runPylint } = require('../services/LintServices/Python/run-py-lint');
const { lintTypeScript } = require('../services/LintServices/Typescript/run-ts-lint');
const { LintingSchema } = require('../model/LintingModel');
const LintingModel = mongoose.model("LintingModel", LintingSchema); // Corrected line
const fs = require('fs').promises;
exports.fs = fs;
const path = require('path');

const PostPyLint = async (req, res, next) => {
    try {
        const TEMP_NAME = 'tempPyCode.txt';
        const code = req.body.code;

        // Write the code to the file
        await fs.writeFile(TEMP_NAME, code, 'utf8');

        // Run pylint on the file
        await runPylint(TEMP_NAME);

        const fileContents = await fs.readFile('pylint-report.json', 'utf8');

        const jsonResponse = await JSON.parse(fileContents);

        res.status(200).json(jsonResponse);



    } catch (error) {
        next(error);
    }
}

const PostJsLint = async (req, res, next) => {
    try {

        const TEMP_NAME = 'tempJsCode.txt';
        const code = req.body.code;

        // Write the code to the file
        await fs.writeFile(TEMP_NAME, code, 'utf8');

        // Run pylint on the file
        await runJslint(TEMP_NAME);

        const fileContents = await fs.readFile('eslint-report.json', 'utf8');

        const jsonResponse = await JSON.parse(fileContents);

        res.status(200).json(jsonResponse);

    } catch (error) {
        next(error);
    }
}

const PostTsLint = async (req, res, next) => {
    try {
        const TEMP_NAME = 'tempTsCode.txt';
        const code = req.body.code;

        // Write the code to the file
        await fs.writeFile(TEMP_NAME, code, 'utf8');

        // Run pylint on the file
        await lintTypeScript(TEMP_NAME);

        const fileContents = await fs.readFile('ts-output', 'utf8');

        const jsonResponse = await JSON.parse(fileContents);

        res.status(200).json(jsonResponse);


    } catch (error) {
        next(error);
    }
}

const GetJsLint = async (req, res, next) => {
    try {
        const fileContents = await fs.readFile('eslint-report.json', 'utf8');

        const jsonResponse = await JSON.parse(fileContents);

        res.status(200).json(jsonResponse);
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    PostJsLint,
    PostPyLint,
    PostTsLint
}
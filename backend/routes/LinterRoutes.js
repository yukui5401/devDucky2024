const { PostJsLint, PostTsLint, PostPyLint } = require('../controllers/LinterController');
const express = require('express');
const router = express.Router();

router.post('/linting/pylint', PostPyLint);
router.post('/linting/jslint', PostJsLint);
router.post('/linting/tslint', PostTsLint);

module.exports = router;

const express = require('express');
const { Create, Read, GetCodeInputSuggestion } = require('../controllers/AIPredictions');
const router = express.Router();

router.post('/llm/post', Create);
router.get('/llm/get', Read);
router.get('/llm/generate_cs', GetCodeInputSuggestion);

module.exports = router;

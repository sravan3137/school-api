const express = require('express');
const router = express.Router();
const validateInput = require('../middlewares/validateInput.js');
const {addSchool,listSchools} = require('../controllers/schoolController.js');

router.post('/addSchool', validateInput, addSchool);
router.get('/listSchools', listSchools);

module.exports = router;
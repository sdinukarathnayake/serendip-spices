const express = require('express');
const router = express.Router();
const {createUser, viewAllUsers} = require('../controllers/userController');

router.post('/', createUser);
router.get('/', viewAllUsers);

module.exports = router;
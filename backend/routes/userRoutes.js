const express = require('express');
const router = express.Router();
const {createUser, viewAllUsers, viewUser, viewUserByType, updateUser, deleteUser} = require('../controllers/userController');

router.post('/', createUser);
router.get('/', viewAllUsers);
router.get('/id/:userId', viewUser);
router.get('/type/:type', viewUserByType);
router.put('/id/:userId', updateUser);
router.delete('/id/:userId', deleteUser);

module.exports = router;
const express = require('express');

const {createUser, viewAllUsers, viewUser, updateUser, deleteUser, loginUser} = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', verifyToken, viewAllUsers);
router.get('/:userId', verifyToken, viewUser);
router.put('/:userId', verifyToken, updateUser);
router.delete('/:userId', verifyToken, deleteUser);

module.exports = router;
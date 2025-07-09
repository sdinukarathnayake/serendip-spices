const express = require('express');
const {
  createUser, viewAllUsers, viewUser, updateUser, deleteUser, loginUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', viewAllUsers);
router.get('/:userId', viewUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
const router = require('express').Router();

// Import the user controller
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// Set up GET all and POST at /api/users
router.route('/').get(getUsers).post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// Set up POST and DELETE at /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
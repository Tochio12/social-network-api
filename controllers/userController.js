const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then(async (users) => res.json(users))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // get one user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate({ path: 'friends', select: '-__v' })
            .populate({ path: 'thoughts', select: '-__v' })
            .then(async (user) => 
                !user
                ? res.status(404).json({ message: 'No user found with this id!' })
                : res.json(user)
            )
            .catch((err) => 
                res.status(500).json(err)
            );
    },

    // create user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user found with this id!' })  
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete user
   deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found with this id!' })
            : Thought.deleteMany({ username: user.username })
        )
        .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));
   }, 

    // add friend
    addFriend(req, res) {
        consolelog('adding a friend');
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user found with this id!' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user found with this id!' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

};
const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // get one thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: 'No thought found with this id!' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((data) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: data._id } },
                    { new: true }
                )
            })
            .then((thoughtData => res.status(200).json(thoughtData)))
            .catch((err) => res.status(500).json(err));
    },

    // update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $set: req.body }, 
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No thought found with this id!' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought found with this id!' })
                : User.findOneAndUpdate(
                    { thought: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            )
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'No user found with this id!' })
                : res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // add reaction to thought
    addReaction(req, res) {
        console.log('adding reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought found with this id!' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // remove reaction from thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought found with this id!' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};
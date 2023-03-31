const router = require('express').Router();

// Import the thought controller
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// Set up GET all and POST at /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// Set up POST and DELETE at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// Set up DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
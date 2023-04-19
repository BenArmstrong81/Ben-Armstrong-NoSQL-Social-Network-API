//------Acquire Express package:
const router = require('express').Router();

//------Consts for Thought Functions:
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

//------Api/Thoughts:
router.route('/').get(getAllThoughts).post(createThought);

//------Api/Thoughts/:Id:
router.route('/:Id').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);

//------Api/Thoughts/:ThougthId/Reactions:
router.route('/:thoughtId/reactions').post(addReaction);

//------Api/Thoughts/:ThougthId/Reactions/:ReatcionID:
router.route('/:studentId/assignments/:assignmentId').delete(removeReaction);

//------Exports Thought Routes:
module.exports = router;
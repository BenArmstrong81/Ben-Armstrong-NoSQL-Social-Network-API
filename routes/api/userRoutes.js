//------Acquire Express package:
const router = require('express').Router();

//------Consts for Thought Functions:
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

//------Api/Users:
router.route('/').get(getAllUsers).post(createUser);

//------Api/Users/:UserId:
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

//------Api/Users/:UserId/Friends/:FriendId:
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

//------Exports User Routes:
module.exports = router;
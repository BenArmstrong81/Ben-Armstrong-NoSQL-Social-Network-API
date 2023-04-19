const { User, Thought } = require("../models");

module.exports = {
//------Create a User:
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //------Get a User by ID using FindOne method:
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Sorry No User Found with this ID 🤷‍♂️, Try Agin!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //------Get All Users:
  getAllUsers(req, res) {
    User.find()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
  },

  //------Update a User by ID:
  updateUserById({ params, body }, res) {
    User.findOneAndUpdate(
      {
        _id: params.userId,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Sorry No User Found with this ID 🤷‍♂️, Try Agin!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //------Delete a User by ID using Find One and Remove Method:
  deleteUserById({ params }, res) {
    User.findOneAndRemove({ _id: params.userId })
      .then(async (dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Sorry No User Found with this ID 🤷‍♂️, Try Agin!" });
          return;
        }
        //------BONUS: Remove the User's Associated Thoughts when Deleted:
        await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        res.json({
          message: `User ${dbUserData.username} has been Deleted!`,
        });
      })
      .catch((err) => res.status(400).json(err));
  },

  //------Add Friend:
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Sorry No User Found with this ID 🤷‍♂️, Try Agin!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //------Remove a Friend:
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Sorry No User Found with this ID 🤷‍♂️, Try Agin!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};
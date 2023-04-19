const { User, Thought } = require("../models");

module.exports = {
  //------Create a Thought:
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Sorry No Thought 💭 Found with this ID 🤷‍♂️, Try Agin!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //------Get a Thought by ID:
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Sorry No Thought 💭 Found with this ID 🤷‍♂️, Try Agin!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //------Get All Thoughts:
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //------Update a Thought by ID:
  updateThoughtById(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Sorry No Thought 💭 Found with this ID 🤷‍♂️, Try Agin!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //------Delete a Thought by ID:
  deleteThoughtById(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Sorry No Thought 💭 Found with this ID 🤷‍♂️, Try Agin!" });
          return;
        }
        res.json({
          message: `Successfully Deleted the Thought 💭 of '${dbThoughtData.thoughtText}' with the id: ${req.params.id}`,
        });
      })
      .catch((err) => res.status(400).json(err));
  },

  //------Add a Reaction:
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Sorry No Thought 💭 Found with this ID 🤷‍♂️, Try Agin!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //------Remove a Reaction:
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json({
        message: `Successfully Deleted the Reaction of '${dbThoughtData.thoughtText}' with the id: '${req.params.reactionId}'`,
        parentObject: dbThoughtData,
        reactions: dbThoughtData.reactions
      }))
      .catch((err) => res.json(err)); 
  },
};
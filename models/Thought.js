//------const { Schema, model, Types } = require("mongoose");
const { Schema, model } = require("mongoose");
//------Imports the Reaction Schema:
const reactionSchema = require("./Reaction");

const formatter = (timestamp) => {
    return timestamp.toLocaleString();
  };

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatter,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//--------Gets Total Count of Reactions:
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//--------Creates the Thought model using the ThoughtSchema:
const Thought = model("thought", thoughtSchema);

//--------Exports Thought:
module.exports = Thought;
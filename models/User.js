const { Schema, model } = require("mongoose");
// const { Schema, model, Types } = require("mongoose"); //BEN use model or not??

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Must match a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//--------Gets Total Count of Friends:
userSchema.virtual("friendCount").get(function () {
  if (this.friends === undefined) {
    return 0;
  }
  return this.friends.length;
});

//--------Creates the User model using the UserSchema
const User = model("user", userSchema);

//--------Exports User:
module.exports = User;

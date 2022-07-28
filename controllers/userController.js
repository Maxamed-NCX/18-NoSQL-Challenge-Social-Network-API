const { User, Thought} = require('../models');

const userController = {
  // /api/users
  // get all users
  getAllUser(req, res) {
    try {
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
    }
      catch(err) {
        console.log(err);
        res.sendStatus(400);
      };
  },

  // get one User by id
  getUserById({ params }, res) {
    try {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User located with this id!" });
          return;
        }
        res.json(dbUserData);
      })
    }
      catch(err) {
        console.log(err);
        res.sendStatus(400);
      };
  },

  // create User
  createUser({ body }, res) {
    try {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
    }
      catch(err) {
        res.json(err);
      }
  },

  // update User by id
  updateUser({ params, body }, res) {
    try {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User located with this id!" });
          return;
        }
        res.json(dbUserData);
      })
    }
      catch(err){
         res.json(err);
      }
  },

  //Delete user and users associated thoughts
  deleteUser({ params }, res) {
    try {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No User located with this id!" });
        }
        return Thought.deleteMany({ _id: params.id });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted!" });
      })
    }
      catch(err){
        res.json(err);
      }
  },

  // /api/users/:userid/fiends/:friendId
  addFriend({ params }, res) {
    try {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user located with this id" });
          return;
        }
        res.json(dbUserData);
      })
    }
      catch(err){
        res.status(400).json(err);
      }
  },

  deleteFriend({ params }, res) {
    try {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user located with this id" });
          return;
        }
        res.json(dbUserData);
      })
    }
    catch(err) {
      res.status(400).json(err);
    }
  },
};

module.exports = userController;

const { User, Thought, Reactions } = require("../models");

const reactionController = {
  // /api/thoughts

  // get all thoughts
  getAllreaction(req, res) {
    try {
      reaction
        .find({})
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbreactionData) => res.json(dbreactionData));
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // get one thoughts by id
  getReactionById({ params }, res) {
    try {
      Thought.findOne({ _id: params.id })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbReactionData) => {
          if (!dbReactionData) {
            res
              .status(404)
              .json({ message: "No reactions located with that id!" });
            return;
          }
          res.json(dbReactionData);
        });
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  createReaction({ body }, res) {
    try {
      Reaction.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then((dbReactionData) => {
          if (!dbReactionData) {
            res
              .status(404)
              .json({ message: "No reaction located with this id!" });
            return;
          }
          res.json(dbThoughtData);
        });
    } catch (err) {
      res.json(err);
    }
  },

  // update Thought by id
  updateReaction({ params, body }, res) {
    try {
      reaction
        .findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
        .then((dbReactionData) => {
          if (!dbThoughtData) {
            res
              .status(404)
              .json({ message: "No thoughts located with that id!" });
            return;
          }
          res.json(dbReactionData);
        });
    } catch (err) {
      res.json(err);
    }
  },

  // delete thought by ID
  deleteReaction({ params }, res) {
    try {
      reaction
        .findOneAndDelete({ _id: params.id })
        .then((dbReactionData) => {
          if (!dbReactionData) {
            res
              .status(404)
              .json({ message: "No reaction located with that id!" });
            return;
          }
          return User.findOneAndUpdate(
            { _id: parmas.userId },
            { $pull: { thoughts: params.Id } },
            { new: true }
          );
        })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No User located with this id!" });
            return;
          }
          res.json(dbUserData);
        });
    } catch (err) {
      res.json(err);
    }
  },

  createReaction({ params, body }, res) {
    try {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v")
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res
              .status(404)
              .json({ message: "No thoughts located with this ID." });
            return;
          }
          res.json(dbThoughtData);
        });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteReaction({ params }, res) {
    try {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      ).then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Nope Try Agian!" });
          return;
        }
        res.json(dbThoughtData);
      });
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = thoughtCfdsfontroller;

const { User, Thought } = require("../models");

const thoughtController = {
  // /api/thoughts

  // get all thoughts
  getAllThought(req, res) {
    try {
      Thought.find({})
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData));
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // get one thoughts by id
  getThoughtById({ params }, res) {
    try {
      Thought.findOne({ _id: params.id })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res
              .status(404)
              .json({ message: "No thoughts located with that id!" });
            return;
          }
          res.json(dbThoughtData);
        });
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // Create Thought
  createThought({ body }, res) {
    try {
      Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No user located with this id!" });
            return;
          }
          res.json(dbThoughtData);
        });
    } catch (err) {
      res.json(err);
    }
  },

  // update Thought by id
  updateThought({ params, body }, res) {
    try {
      Thought.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      }).then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thoughts located with that id!" });
          return;
        }
        res.json(dbThoughtData);
      });
    } catch (err) {
      res.json(err);
    }
  },

  // delete thought by ID
  deleteThought({ params }, res) {
    try {
      Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
          console.log("dbThoughtData", dbThoughtData);
          if (!dbThoughtData) {
            res
              .status(404)
              .json({ message: "No thoughts located with that id!" });
            return;
          }
          return User.findOneAndUpdate(
            { _id: dbThoughtData.userId },
            { $pull: { thoughts: params.Id } },
            { new: true }
          );
        })
        .then((dbUserData) => {
          console.log("dbUserData", dbUserData);
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

  // Create Reactions
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
  // update reactions by id
  updateReaction({ params, body }, res) {
    try {
      reactions
        .findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res
              .status(404)
              .json({ message: "No thoughts located with that id!" });
            return;
          }
          console.log(this.updateReaction);
          res.json(dbThoughtData);
        });
    } catch (err) {
      res.json(err);
    }
  },
  // Delete Reactions
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

module.exports = thoughtController;

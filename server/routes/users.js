const router = require("express").Router();
const tokenVerification = require("../middleware/tokenVerification");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  //pobranie wszystkich użytkowników z bd:
  User.find()
    .exec()
    .then(async () => {
      const users = await User.find();
      //konfiguracja odpowiedzi res z przekazaniem listy użytkowników:
      res.status(200).send({ data: users, message: "Lista użytkowników" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

router.get("/profile", tokenVerification, async (req, res) => {
  User.find()
    .exec()
    .then(async () => {
      const id = req.user._id;
      const profile = await User.findOne({_id: id});
      res.status(200).send({ data: profile, message: "Użytkownik" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

router.patch("/profile", tokenVerification, async (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((user) => {
    if(!user) {
      return res.status(404).send();
    }
    res.send(user);
  }).catch((error) => {
    res.status(500).send(error);  
  })
});

router.delete("/", tokenVerification, async (req, res) => {
  User.find()
    .exec()
    .then(async () => {
      const id = req.user._id;
      await User.deleteOne({_id: id})
      res.status(200).send({ message: "Użytkownik usunięty" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

const { body, validationResult } = require("express-validator");

router.post(
  "/flashcards",
  tokenVerification,
  [
    body("word").notEmpty().withMessage("Word is required"),
    body("translation").notEmpty().withMessage("Translation is required"),
  ],
  async (req, res) => {
    try {
      const userId = req.user._id;
      const { word, translation } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      user.flashcards.push({ word, translation });
      await user.save();

      res.status(201).send({ message: "Flashcard added successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);


router.get("/flashcards", tokenVerification, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ flashcards: user.flashcards });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/flashcards/:id", tokenVerification, async (req, res) => {
  try {
    const userId = req.user._id;
    const flashcardId = req.params.id;

    const user = await User.findById(userId);
    console.log(`User: ${user}`);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const updatedFlashcards = user.flashcards.filter(
      (flashcard) => flashcard._id.toString() !== flashcardId
    );

    if (user.flashcards.length === updatedFlashcards.length) {
      return res.status(404).send({ message: "Flashcard not found" });
    }

    user.flashcards = updatedFlashcards;
    await user.save();

    res.status(200).send({ message: "Flashcard deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/flashcards/:id", tokenVerification, async (req, res) => {
  try {
    const userId = req.user._id;
    const flashcardId = req.params.id;
    const { word, translation } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const flashcard = user.flashcards.id(flashcardId);
    if (!flashcard) {
      return res.status(404).send({ message: "Flashcard not found" });
    }

    // Update the flashcard properties
    flashcard.word = word;
    flashcard.translation = translation;

    await user.save();

    res.status(200).send({ message: "Flashcard updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

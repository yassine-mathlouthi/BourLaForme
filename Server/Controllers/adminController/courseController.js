const Course = require("../../Models/course");
const User = require("../../Models/user");

const { BadRequestError, NotFoundError } = require("../../Errors");

// Ajouter un cours
const addCourse = async (req, res) => {
  try {
    console.log(req.file); // Ajout du log pour vérifier l'image reçue

    const {
      name,
      description,
      duration,
      availableSeats,
      coachName,
      schedule,
      level,
      price,
    } = req.body;
    if (
      !name ||
      !availableSeats ||
      !level ||
      !price ||
      !description ||
      !duration ||
      !coachName ||
      !schedule 
    ) {
      throw new BadRequestError("Les champs obligatoires ne sont pas remplis");
    }

    const image = req.file ? req.file.filename : null;
    if (!image) {
      throw new BadRequestError("L'image est requise");
    }

    const newCourse = new Course({
      name,
      description,
      duration,
      availableSeats,
      coachName,
      schedule,
      level,
      price,
      image,
    });
    await newCourse.save();
    res.status(201).json({ message: "Cours ajouté avec succès", newCourse });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// Consulter tous les cours
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la consultation", error: err.message });
  }
};

// Modifier un cours
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { coachName, name, description, duration, availableSeats, schedule } =
      req.body;

    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      throw new NotFoundError("Cours non trouvé");
    }

    res
      .status(200)
      .json({ message: "Cours modifié avec succès", updatedCourse });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// Supprimer un cours
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      throw new NotFoundError("Cours non trouvé");
    }
    res.status(200).json({ message: "Cours supprimé avec succès" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { addCourse, getAllCourses, updateCourse, deleteCourse };

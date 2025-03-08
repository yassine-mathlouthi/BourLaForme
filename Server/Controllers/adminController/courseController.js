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

    // Ajouter l'URL complète de l'image
    const coursesWithImages = courses.map(course => ({
      ...course._doc,
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${course.image}`
    }));

    res.status(200).json(coursesWithImages);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la consultation", error: err.message });
  }
};


// Modifier un cours
// Modifier un cours
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { coachName, name, description, duration, availableSeats, schedule, level, price } = req.body;

    // Vérification de la présence du fichier image
    let image = req.file ? req.file.filename : null;

    // Recherche du cours par ID
    const updatedCourse = await Course.findById(id);
    if (!updatedCourse) {
      throw new NotFoundError("Cours non trouvé");
    }

    // Mise à jour des informations du cours
    updatedCourse.name = name || updatedCourse.name;
    updatedCourse.description = description || updatedCourse.description;
    updatedCourse.duration = duration || updatedCourse.duration;
    updatedCourse.availableSeats = availableSeats || updatedCourse.availableSeats;
    updatedCourse.coachName = coachName || updatedCourse.coachName;
    updatedCourse.schedule = schedule || updatedCourse.schedule;
    updatedCourse.level = level || updatedCourse.level;
    updatedCourse.price = price || updatedCourse.price;

    // Si une nouvelle image est fournie, elle sera mise à jour
    if (image) {
      updatedCourse.image = image;
    }

    // Sauvegarder les changements
    await updatedCourse.save();

    res.status(200).json({ message: "Cours modifié avec succès", updatedCourse });
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

const Course = require('../../Models/course');
const User = require('../../Models/user');

const { BadRequestError, NotFoundError } = require('../../Errors');

// Ajouter un cours
const addCourse = async (req, res) => {
  try {
    const { name, description, duration, availableSeats, coach, schedule, level, price, image } = req.body;
    if (!name || !availableSeats || !level || !price || !description || !duration || !coach || !schedule || !image) {
      throw new BadRequestError("Les champs obligatoires ne sont pas remplis");
    }

    // Vérifier que le coach existe dans la base de données
    const coachExists = await User.findById(coach);
    if (!coachExists) {
      throw new NotFoundError("Coach not found" );
    }

    // Vérifier que l'utilisateur référencé en tant que coach a bien le rôle 'coach'
    if (coachExists.role !== 'coach') {
      throw new BadRequestError("The user must be a coach");
    }

    const newCourse = new Course({ name, description, duration, availableSeats, coach, schedule, level, price, image });
    await newCourse.save();
    res.status(201).json({ message: "Cours ajouté avec succès", newCourse });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// Consulter tous les cours
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('coach', 'prenom nom');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la consultation", error: err.message });
  }
};

// Modifier un cours
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { coach, name, description, duration, availableSeats, schedule } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCourse) {
      throw new NotFoundError("Cours non trouvé");
    }

    // Vérifier que le coach existe dans la base de données (si coach a été modifié)
    if (coach) {
        const coachExists = await User.findById(coach);
        if (!coachExists) {
          throw new NotFoundError( "Coach not found" );
        }
  
        // Vérifier que l'utilisateur référencé en tant que coach a bien le rôle 'coach'
        if (coachExists.role !== 'coach') {
          throw new BadRequestError("The user must be a coach");
        }
  
        // Mettre à jour le coach du cours si valide
        updatedCourse.coach = coach;
      }
  
      // Enregistrer les changements dans le cours si le coach a été modifié
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
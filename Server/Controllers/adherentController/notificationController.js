const Notification = require('../../Models/notification');
const {  NotFoundError } = require("../../Errors");


// Récupérer les notifications d'un adhérent
const getNotificationsForUser = async (req, res) => {
    try {
      const notifications = await Notification.find({ user: req.user.userId }).sort({ createdAt: -1 });
      res.status(200).json({ notifications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Marquer une notification comme lue pour un adhérent
const markNotificationAsReadForUser = async (req, res) => {
  try {
    const { notificationId } = req.params;

   
    // Trouver la notification spécifique à l'adhérent connecté
    const notification = await Notification.findOne({
      _id: notificationId,
      
    });

    if (!notification) {
      throw new NotFoundError('Notification non trouvée ou vous n\'êtes pas autorisé à la modifier');
    }

    // Marquer comme lue pour l'adhérent
    notification.isReadAdherent = true;
    await notification.save();

    res.status(200).json({
    
      message: 'Notification marquée comme lue pour l\'adhérent'
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    
    res.status(statusCode).json({
      success: false,
      message: error.message || "Une erreur est survenue.",
    });
  }
};












  module.exports = {getNotificationsForUser, markNotificationAsReadForUser};
const Notification = require('../../Models/notification');
const {  NotFoundError } = require("../../Errors");


// Récupérer toutes les notifications pour l'admin
const getNotificationsForAdmin = async (req, res) => {
    try {
      const notifications = await Notification.find({ type: 'abonnement_expire' })
        .populate('user', 'prenom nom')
        .sort({ createdAt: -1 });
  
      res.status(200).json({ notifications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };


// Marquer une notification comme lue pour un admin
const markNotificationAsReadForAdmin = async (req, res) => {
  try {
    const { notificationId } = req.params;

    

    // Trouver la notification spécifique 
    const notification = await Notification.findOne({
      _id: notificationId,
    
    });

    if (!notification) {
      throw new NotFoundError('Notification non trouvée ou vous n\'êtes pas autorisé à la modifier');
    }

    // Marquer comme lue pour l'admin
    notification.isReadAdmin = true;
    await notification.save();

    res.status(200).json({
      success: true,
      message: 'Notification marquée comme lue pour l\'administrateur'
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    
    res.status(statusCode).json({
      success: false,
      message: error.message || "Une erreur est survenue.",
    });
  }
};










    module.exports = {getNotificationsForAdmin, markNotificationAsReadForAdmin};
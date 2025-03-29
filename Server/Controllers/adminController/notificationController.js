

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
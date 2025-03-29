
// Récupérer les notifications d'un adhérent
const getNotificationsForUser = async (req, res) => {
    try {
      const notifications = await Notification.find({ user: req.user.userId }).sort({ createdAt: -1 });
      res.status(200).json({ notifications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
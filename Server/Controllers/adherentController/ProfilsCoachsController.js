

// Récupérer tous les coachs avec leurs profils
const getAllCoachs = async (req, res) => {
    try {
      const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;
  
      const coachs = await User.find({ role: 'coach' })
        .select('prenom nom email phone')
        .lean();
  
      const coachIds = coachs.map(coach => coach._id);
  
      // Récupérer les profils des coachs privés
      const privateCoaches = await PrivateCoach.find({ user: { $in: coachIds } })
        .select('user specialty bio image')
        .lean();
  
      // Associer chaque coach avec son profil PrivateCoach
      const privateCoachMap = {};
      privateCoaches.forEach(coach => {
        privateCoachMap[coach.user] = coach;
      });
  
      const formattedCoachs = coachs.map(coach => ({
        ...coach,
        specialty: privateCoachMap[coach._id]?.specialty || null,
        bio: privateCoachMap[coach._id]?.bio || null,
        image: privateCoachMap[coach._id]?.image ? baseUrl + privateCoachMap[coach._id].image : null,
      }));
  
      res.status(200).json({ success: true, coachs: formattedCoachs });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
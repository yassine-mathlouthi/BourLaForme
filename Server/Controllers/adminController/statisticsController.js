const User = require("../../Models/user");
const Subscription = require("../../Models/subscription");
const SubscriptionType = require("../../Models/subscriptionType");
const ReservationCourse = require("../../Models/reservationCourse");
const Course = require("../../Models/course");
const { StatusCodes } = require("http-status-codes");




// Controller function to get statistics about total coaches
const getValidatedCoachesStatistics = async (req, res) => {
  try {
    const totalCoaches = await User.countDocuments({
      role: "coach",
      isValidated: true,
    });

    res.status(200).json({
      
        totalCoaches 
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques des coachs validés:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération des statistiques",
    });
  }
};


//Fonction pour déterminer le nombre total d'abonnements actifs.

const getActiveSubscriptionsStatistics = async (req, res) => {
    try {
      // Compter les abonnements avec le statut "active"
      const activeSubscriptions = await Subscription.countDocuments({
        status: "active",
      });
  
      
      res.status(200).json({
        
        activeSubscriptions,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques des abonnements actifs:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des statistiques",
      });
    }
  };

  //revenu total
  const getGymRevenueStatistics = async (req, res) => {
    try {
      // 1. Calculer le revenu des abonnements
      const subscriptionRevenue = await Subscription.aggregate([
        // Joindre avec SubscriptionType pour récupérer le prix
        {
          $lookup: {
            from: "subscriptiontypes", // Nom de la collection (en minuscules, selon MongoDB)
            localField: "type",
            foreignField: "_id",
            as: "subscriptionType",
          },
        },
        // Décomposer le tableau subscriptionType
        { $unwind: "$subscriptionType" },
        // Grouper pour sommer les prix
        {
          $group: {
            _id: null,
            total: { $sum: "$subscriptionType.price" },
          },
        },
      ]);
  
      // 2. Calculer le revenu des réservations de cours
      const courseRevenue = await ReservationCourse.aggregate([
        // Filtrer uniquement les réservations acceptées
        { $match: { status: "accepted" } },
        // Joindre avec Course pour récupérer le prix
        {
          $lookup: {
            from: "courses", // Nom de la collection
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        // Décomposer le tableau course
        { $unwind: "$course" },
        // Grouper pour sommer les prix
        {
          $group: {
            _id: null,
            total: { $sum: "$course.price" },
          },
        },
      ]);
  
      // Extraire les totaux (ou 0 si aucun résultat)
      const totalSubscriptionRevenue = subscriptionRevenue.length > 0 ? subscriptionRevenue[0].total : 0;
      const totalCourseRevenue = courseRevenue.length > 0 ? courseRevenue[0].total : 0;
  
      // Calculer le revenu total
      const totalRevenue = totalSubscriptionRevenue + totalCourseRevenue;
  
      // Réponse JSON
      res.status(200).json({
        data: {
          totalRevenue,
          subscriptionRevenue: totalSubscriptionRevenue,
          courseRevenue: totalCourseRevenue,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques de revenu:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des statistiques de revenu",
      });
    }
  };

//revenu total par mois
  const getMonthlyRevenueStatistics = async (req, res) => {
    try {
      // 1. Revenu des abonnements par mois
      const subscriptionRevenue = await Subscription.aggregate([
        // Joindre avec SubscriptionType pour récupérer le prix
        {
          $lookup: {
            from: "subscriptiontypes",
            localField: "type",
            foreignField: "_id",
            as: "subscriptionType",
          },
        },
        { $unwind: "$subscriptionType" },
        // Grouper par mois et année basé sur startDate
        {
          $group: {
            _id: {
              year: { $year: "$startDate" },
              month: { $month: "$startDate" },
            },
            total: { $sum: "$subscriptionType.price" },
          },
        },
        // Formater le résultat
        {
          $project: {
            month: {
              $concat: [
                { $toString: "$_id.year" },
                "-",
                { $cond: [{ $lt: ["$_id.month", 10] }, "0", ""] },
                { $toString: "$_id.month" },
              ],
            },
            total: 1,
            _id: 0,
          },
        },
        { $sort: { month: 1 } },
      ]);
  
      // 2. Revenu des réservations de cours par mois
      const courseRevenue = await ReservationCourse.aggregate([
        // Filtrer les réservations acceptées
        { $match: { status: "accepted" } },
        // Joindre avec Course pour récupérer le prix
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        { $unwind: "$course" },
        // Grouper par mois et année basé sur une date implicite (supposons que la réservation est créée à la date du cours)
        {
          $group: {
            _id: {
              year: { $year: "$course.schedule" }, // Utilise la date du cours
              month: { $month: "$course.schedule" },
            },
            total: { $sum: "$course.price" },
          },
        },
        // Formater le résultat
        {
          $project: {
            month: {
              $concat: [
                { $toString: "$_id.year" },
                "-",
                { $cond: [{ $lt: ["$_id.month", 10] }, "0", ""] },
                { $toString: "$_id.month" },
              ],
            },
            total: 1,
            _id: 0,
          },
        },
        { $sort: { month: 1 } },
      ]);
  
      // Fusionner les résultats pour obtenir le revenu total par mois
      const mergedRevenue = {};
      subscriptionRevenue.forEach((item) => {
        mergedRevenue[item.month] = (mergedRevenue[item.month] || 0) + item.total;
      });
      courseRevenue.forEach((item) => {
        mergedRevenue[item.month] = (mergedRevenue[item.month] || 0) + item.total;
      });
  
      // Convertir en tableau pour la réponse
      const monthlyRevenue = Object.keys(mergedRevenue).map((month) => ({
        month,
        total: mergedRevenue[month],
      }));
  
      // Trier par mois
      monthlyRevenue.sort((a, b) => a.month.localeCompare(b.month));
  
      res.status(200).json({
        monthlyRevenue,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques de revenu mensuel:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des statistiques",
      });
    }
  };


//Revenu trimestriel total
  const getQuarterlyRevenueStatistics = async (req, res) => {
    try {
      // 1. Revenu des abonnements par trimestre
      const subscriptionRevenue = await Subscription.aggregate([
        // Joindre avec SubscriptionType pour récupérer le prix
        {
          $lookup: {
            from: "subscriptiontypes",
            localField: "type",
            foreignField: "_id",
            as: "subscriptionType",
          },
        },
        { $unwind: "$subscriptionType" },
        // Grouper par année et trimestre basé sur startDate
        {
          $group: {
            _id: {
              year: { $year: "$startDate" },
              quarter: { $ceil: { $divide: [{ $month: "$startDate" }, 3] } },
            },
            total: { $sum: "$subscriptionType.price" },
          },
        },
        // Formater le résultat pour le trimestre
        {
          $project: {
            period: {
              $concat: [
                { $toString: "$_id.year" },
                "-Q",
                { $toString: "$_id.quarter" },
              ],
            },
            total: 1,
            _id: 0,
          },
        },
        { $sort: { period: 1 } },
      ]);
  
      // 2. Revenu des réservations de cours par trimestre
      const courseRevenue = await ReservationCourse.aggregate([
        // Filtrer les réservations acceptées
        { $match: { status: "accepted" } },
        // Joindre avec Course pour récupérer le prix et la date
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        { $unwind: "$course" },
        // Grouper par année et trimestre basé sur la date du cours (schedule)
        {
          $group: {
            _id: {
              year: { $year: "$course.schedule" },
              quarter: { $ceil: { $divide: [{ $month: "$course.schedule" }, 3] } },
            },
            total: { $sum: "$course.price" },
          },
        },
        // Formater le résultat pour le trimestre
        {
          $project: {
            period: {
              $concat: [
                { $toString: "$_id.year" },
                "-Q",
                { $toString: "$_id.quarter" },
              ],
            },
            total: 1,
            _id: 0,
          },
        },
        { $sort: { period: 1 } },
      ]);
  
      // 3. Fusionner les revenus trimestriels
      const quarterlyRevenueMap = {};
      subscriptionRevenue.forEach((item) => {
        quarterlyRevenueMap[item.period] = (quarterlyRevenueMap[item.period] || 0) + item.total;
      });
      courseRevenue.forEach((item) => {
        quarterlyRevenueMap[item.period] = (quarterlyRevenueMap[item.period] || 0) + item.total;
      });
  
      // Convertir en tableau pour les revenus trimestriels
      const quarterlyRevenue = Object.keys(quarterlyRevenueMap).map((period) => ({
        period,
        total: quarterlyRevenueMap[period],
      }));
      quarterlyRevenue.sort((a, b) => a.period.localeCompare(b.period));
  
      // Réponse JSON
      res.status(200).json({
       quarterlyRevenue,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques de revenu trimestriel:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des statistiques",
      });
    }
  };

//Revenu annuel total
const getYearlyRevenueStatistics = async (req, res) => {
    try {
      // 1. Revenu des abonnements par année
      const subscriptionRevenue = await Subscription.aggregate([
        // Joindre avec SubscriptionType pour récupérer le prix
        {
          $lookup: {
            from: "subscriptiontypes",
            localField: "type",
            foreignField: "_id",
            as: "subscriptionType",
          },
        },
        { $unwind: "$subscriptionType" },
        // Grouper par année basé sur startDate
        {
          $group: {
            _id: { year: { $year: "$startDate" } },
            total: { $sum: "$subscriptionType.price" },
          },
        },
        // Formater le résultat pour l'année
        {
          $project: {
            year: { $toString: "$_id.year" },
            total: 1,
            _id: 0,
          },
        },
        { $sort: { year: 1 } },
      ]);
  
      // 2. Revenu des réservations de cours par année
      const courseRevenue = await ReservationCourse.aggregate([
        // Filtrer les réservations acceptées
        { $match: { status: "accepted" } },
        // Joindre avec Course pour récupérer le prix et la date
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        { $unwind: "$course" },
        // Grouper par année basé sur la date du cours (schedule)
        {
          $group: {
            _id: { year: { $year: "$course.schedule" } },
            total: { $sum: "$course.price" },
          },
        },
        // Formater le résultat pour l'année
        {
          $project: {
            year: { $toString: "$_id.year" },
            total: 1,
            _id: 0,
          },
        },
        { $sort: { year: 1 } },
      ]);
  
      // 3. Fusionner les revenus annuels
      const yearlyRevenueMap = {};
      subscriptionRevenue.forEach((item) => {
        yearlyRevenueMap[item.year] = (yearlyRevenueMap[item.year] || 0) + item.total;
      });
      courseRevenue.forEach((item) => {
        yearlyRevenueMap[item.year] = (yearlyRevenueMap[item.year] || 0) + item.total;
      });
  
      // Convertir en tableau pour les revenus annuels
      const yearlyRevenue = Object.keys(yearlyRevenueMap).map((year) => ({
        year,
        total: yearlyRevenueMap[year],
      }));
      yearlyRevenue.sort((a, b) => a.year.localeCompare(b.year));
  
      // Réponse JSON
      res.status(200).json({
       yearlyRevenue,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques de revenu annuel:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des statistiques",
      });
    }
  };


//Nombre mensuel de nouvelles réservations de cours acceptées
const getMonthlyCourseReservationsStatistics = async (req, res) => {
    try {
      // Compter les réservations acceptées par mois
      const monthlyReservations = await ReservationCourse.aggregate([
        // Filtrer les réservations acceptées
        { $match: { status: "accepted" } },
        // Joindre avec Course pour obtenir la date du cours
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        { $unwind: "$course" },
        // Grouper par mois et année basé sur la date du cours
        {
          $group: {
            _id: {
              year: { $year: "$course.schedule" },
              month: { $month: "$course.schedule" },
            },
            count: { $sum: 1 },
          },
        },
        // Formater le résultat
        {
          $project: {
            month: {
              $concat: [
                { $toString: "$_id.year" },
                "-",
                { $cond: [{ $lt: ["$_id.month", 10] }, "0", ""] },
                { $toString: "$_id.month" },
              ],
            },
            count: 1,
            _id: 0,
          },
        },
        { $sort: { month: 1 } },
      ]);
  
      res.status(200).json({
        monthlyReservations,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques de réservations mensuelles:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des statistiques",
      });
    }
  };


  //Nombre trimestriel de nouvelles réservations de cours acceptées
  const getQuarterlyCourseReservationsStatistics = async (req, res) => {
    try {
      const quarterlyReservations = await ReservationCourse.aggregate([
        // Filtrer les réservations acceptées
        { $match: { status: "accepted" } },
        // Joindre avec Course pour obtenir la date du cours
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        { $unwind: "$course" },
        // Grouper par année et trimestre basé sur la date du cours (schedule)
        {
          $group: {
            _id: {
              year: { $year: "$course.schedule" },
              quarter: { $ceil: { $divide: [{ $month: "$course.schedule" }, 3] } },
            },
            count: { $sum: 1 },
          },
        },
        // Formater le résultat pour le trimestre
        {
          $project: {
            period: {
              $concat: [
                { $toString: "$_id.year" },
                "-Q",
                { $toString: "$_id.quarter" },
              ],
            },
            count: 1,
            _id: 0,
          },
        },
        { $sort: { period: 1 } },
      ]);
  
      res.status(200).json({
        quarterlyReservations,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques trimestrielles des réservations:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des statistiques",
      });
    }
  };

  //Nombre annuel de nouvelles réservations de cours acceptées
  const getYearlyCourseReservationsStatistics = async (req, res) => {
    try {
      const yearlyReservations = await ReservationCourse.aggregate([
        // Filtrer les réservations acceptées
        { $match: { status: "accepted" } },
        // Joindre avec Course pour obtenir la date du cours
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        { $unwind: "$course" },
        // Grouper par année basé sur la date du cours (schedule)
        {
          $group: {
            _id: { year: { $year: "$course.schedule" } },
            count: { $sum: 1 },
          },
        },
        // Formater le résultat pour l'année
        {
          $project: {
            year: { $toString: "$_id.year" },
            count: 1,
            _id: 0,
          },
        },
        { $sort: { year: 1 } },
      ]);
  
      res.status(200).json({
       yearlyReservations,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques annuelles des réservations:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des statistiques",
      });
    }
  };

module.exports = {
  getValidatedCoachesStatistics,
  getActiveSubscriptionsStatistics,
  getGymRevenueStatistics,
  getMonthlyRevenueStatistics,
  getQuarterlyRevenueStatistics,
  getYearlyRevenueStatistics,
  getMonthlyCourseReservationsStatistics,
  getQuarterlyCourseReservationsStatistics,
  getYearlyCourseReservationsStatistics
};
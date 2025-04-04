const express = require('express');
const router = express.Router();
const { getValidatedCoachesStatistics, getActiveSubscriptionsStatistics, getGymRevenueStatistics, getMonthlyRevenueStatistics, getQuarterlyRevenueStatistics, getYearlyRevenueStatistics, getMonthlyCourseReservationsStatistics, getQuarterlyCourseReservationsStatistics, getYearlyCourseReservationsStatistics } = require('../../Controllers/adminController/statisticsController');
const authMiddleware = require("../../Middleware/authentification");

router.get("/totalCoaches", authMiddleware(["admin"]), getValidatedCoachesStatistics);
router.get("/totalActiveSubscriptions", authMiddleware(["admin"]), getActiveSubscriptionsStatistics);
router.get("/totalActiveSubscriptions", authMiddleware(["admin"]), getActiveSubscriptionsStatistics);
router.get("/RevenueStatistics", authMiddleware(["admin"]), getGymRevenueStatistics);
router.get("/MonthlyRevenue", authMiddleware(["admin"]), getMonthlyRevenueStatistics);
router.get("/QuarterlyRevenue", authMiddleware(["admin"]), getQuarterlyRevenueStatistics);
router.get("/YearlyRevenue", authMiddleware(["admin"]), getYearlyRevenueStatistics);
router.get("/MonthlyCourseReservations", authMiddleware(["admin"]), getMonthlyCourseReservationsStatistics);
router.get("/QuarterlyCourseReservations", authMiddleware(["admin"]), getQuarterlyCourseReservationsStatistics);
router.get("/YearlyCourseReservations", authMiddleware(["admin"]), getYearlyCourseReservationsStatistics);



module.exports = router;
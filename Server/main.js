const express = require("express");
const cors = require("cors");
const Connect = require("./BD/connect");
const mongoose = require('mongoose');
require("dotenv").config();
const register = require("./Routes/authRoute/registerRoute");
const login = require("./Routes/authRoute/loginRoute");
const subscriptionTypeRoute = require("./Routes/adminRoute/subscriptionTypeRoute");
const validateUser = require("./Routes/adminRoute/validateUserRoute");
const course = require("./Routes/adminRoute/courseRoute");
const users = require("./Routes/adminRoute/userRoute");
const subscription = require("./Routes/adminRoute/subscriptionRoute");
const reservation = require("./Routes/adherentRoute/reservationCoachRoute");
const demandesCoaching = require("./Routes/coachRoute/demandesCoachingRoute");
const reservationCourse = require("./Routes/adherentRoute/reservationCourseRoute");
const profilsCoachs = require("./Routes/adherentRoute/profilsCoachsRoute");
const followSubscription = require("./Routes/adherentRoute/followSubscriptionRoute");
const CoachProfile = require("./Routes/coachRoute/profilRoute");
const notificationUser = require("./Routes/adherentRoute/notificationRoute");
const notificationUsers = require("./Routes/adminRoute/notificationRoute");
const app = express(); // Initialisation de l'application Express
const startCronJob = require('./Services/planification');


app.use(express.json()); // use :fonction utilise pour ajouter des middlewares / express.json():est une middleware qui fait parser le corp d'une requete http qui est de format json {(key,value)variable} et le rende disponibles dans req.body.
app.use(
  cors({
    origin: "http://localhost:4200", // Allow requests from your frontend
  })
);

app.use('/uploads', express.static('uploads'));

app.use("/api/pourlaforme/auth", register);
app.use("/api/pourlaforme/auth", login);
app.use("/api/pourlaforme/subscriptionTypes", subscriptionTypeRoute);
app.use("/api/pourlaforme/validateUser", validateUser);
app.use("/api/pourlaforme/course", course);
app.use("/api/pourlaforme/users", users);
app.use("/api/pourlaforme/subscription", subscription);
app.use("/api/pourlaforme/reservationCoach", reservation);
app.use("/api/pourlaforme/demandesCoaching", demandesCoaching);
app.use("/api/pourlaforme/reservationCourse", reservationCourse);
app.use("/api/pourlaforme/profilsCoachs", profilsCoachs);
app.use("/api/pourlaforme/followSubscription", followSubscription);
app.use("/api/pourlaforme/CoachProfile", CoachProfile);
app.use("/api/pourlaforme/NotificationsForUser", notificationUser);
app.use("/api/pourlaforme/NotificationsForAdmin", notificationUsers);


const port = 3000;
const start = async () => {
  //start est une fonction asynchrone.
  try {
    await Connect(process.env.MONGO_URI); //démarre le serveur sur le port défini (3000)./await bich matit3ada listar eli min ba3d ela matkamil tous le traitement
    
    // Démarrer la vérification des abonnements
    startCronJob();

    app.listen(port, console.log(`server is listening on port ${port}`)); //bonne pratique pour connaitre le serveur ye5dim ou pas (sa3at si on est connecter lil base de donnes)
  } catch (error) {
    console.log(error);
  }
};
start();

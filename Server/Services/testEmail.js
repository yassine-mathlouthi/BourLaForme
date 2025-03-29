require("dotenv").config();
const { sendEmail } = require('./emailService');

// Tester l'envoi d'un e-mail
(async () => {
  try {
    await sendEmail('fidagh803@gmail.com', 'Test Subject', 'This is a test email.');
    console.log("Test email envoyé avec succès");
  } catch (error) {
    console.error("Erreur lors de l'envoi du test email: ", error.message);
  }
})();
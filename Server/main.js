const express =require("express")
const cors = require('cors');
const Connect = require('./BD/connect')
require('dotenv').config()
const register=require('./Routes/authRoute/registerRoute')
const login=require('./Routes/authRoute/loginRoute')
const subscriptionRoute = require('./Routes/adminRoute/subscriptionTypeRoute');
const validateUser = require('./Routes/adminRoute/validateUserRoute');
const course = require('./Routes/adminRoute/courseRoute');







const app = express(); // Initialisation de l'application Express
app.use(express.json())// use :fonction utilise pour ajouter des middlewares / express.json():est une middleware qui fait parser le corp d'une requete http qui est de format json {(key,value)variable} et le rende disponibles dans req.body.
app.use(cors());


app.use('/api/pourlaforme/auth' , register)
app.use('/api/pourlaforme/auth' , login)
app.use('/api/pourlaforme/subscriptionTypes', subscriptionRoute);
app.use('/api/pourlaforme/validateUser' , validateUser)
app.use('/api/pourlaforme/course' , course)




const port= 3000
const start = async() => {//start est une fonction asynchrone.
    try{
        await Connect(process.env.MONGO_URI)//démarre le serveur sur le port défini (3000)./await bich matit3ada listar eli min ba3d ela matkamil tous le traitement
        app.listen(port, console.log(`server is listening on port ${port}`))//bonne pratique pour connaitre le serveur ye5dim ou pas (sa3at si on est connecter lil base de donnes)
    }catch(error){
        console.log(error)
    }
}
start()
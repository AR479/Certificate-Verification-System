import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path:"../.env"
})

const databaseConnection = () => {
    mongoose.connect("mongodb+srv://arifrazabca:NetflixWeb@cluster0.i9iui.mongodb.net/").then(()=>{
        console.log("mongodb connected successfully");
    }).catch((error)=>{
        console.log(error);
    })
};
export default databaseConnection;
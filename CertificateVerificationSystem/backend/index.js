//step 1
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./Utils/database.js";
    import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import multer from "multer";
import xlsx from "xlsx"
import { Data } from "./models/DataModel.js";

databaseConnection();

dotenv.config({
    path:".env"
})

const app=express();
//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//api
app.use("/api/v1/user",userRoute);

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    // Process the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    console.log('Parsed Data:', data);
    
    // Save the data to MongoDB
    Data.insertMany(data)
        .then(() => res.status(200).send('Data successfully saved to MongoDB'))
        .catch((error) => res.status(500).send('Error saving data to MongoDB: ' + error));
});

app.listen(process.env.PORT,()=>{
    console.log(`server listen at port ${process.env.PORT}`);
});
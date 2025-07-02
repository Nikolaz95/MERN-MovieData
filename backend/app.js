import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errors.js"
import path from "path";
const app = express();

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log(`Shutting down  due to uncaught exceptions`);
    process.exit(1);
})

dotenv.config({ path: 'backend/config/config.env' });

//connecting to database

connectDatabase();

// JSON request bodies
app.use(express.json({ limit: "10mb" }));
// cookieParser
app.use(cookieParser());

//import all routes
import authRoutes from "./routes/auth.js"
import watchListRoutes from "./routes/watchList.js";
import ratingRoutes from "./routes/ratings.js";
import reviewRoutes from "./routes/reviews.js";
import favoritListRoutes from "./routes/favoritList.js";
import favoritActorListRoutes from "./routes/favoritActorList.js";


app.use("/api", authRoutes)
app.use("/api", watchListRoutes);
app.use("/api", ratingRoutes);
app.use("/api", reviewRoutes);
app.use("/api", favoritListRoutes);
app.use("/api", favoritActorListRoutes);

//connecting backend and frontend

if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}

//using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server start on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});


//handle unhandle promise promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err}`);
    console.log(`Shutting down server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});
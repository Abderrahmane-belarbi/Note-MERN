import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import note_router from "./routes/notes.js";
import { connectToDatabase } from "./database/mongo.js";
import rateLimiter from "./middleware/rate_limiter.js";
import path from "path";
dotenv.config();

const app = express();

// middleware
if(process.env.NODE_ENV !== "production"){
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  )
}
app.use(express.json());
app.use(rateLimiter)

app.use("/api/notes", note_router);
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
  });
}


await connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}...`);
  })
});
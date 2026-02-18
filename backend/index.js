import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import note_router from "./routes/notes.js";
import { connectToDatabase } from "./database/mongo.js";
import rateLimiter from "./middleware/rate_limiter.js";
dotenv.config();

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
)
app.use(express.json());
app.use(rateLimiter)

app.use("/api/notes", note_router);
const PORT = process.env.PORT || 3000;

await connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}...`);
  })
});
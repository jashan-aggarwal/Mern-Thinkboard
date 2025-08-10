import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import connectDb from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDb();
app.use(express.json());
app.use(cors({
        origin: "http://localhost:5173",
    })
);
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Server Running at Port: ${port}`);
});

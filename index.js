import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import router
import courseRouter from "./routes/courseroute.js";
import userRoutes from "./routes/userroute.js";
import uploadRoute from "./routes/uploadroute.js";

dotenv.config();
const app = express();
app.use(express.json());

//  path folder root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve folder upload
app.use("/upload", express.static(path.join(__dirname, "upload")));

//  router
app.use("/course", courseRouter);
app.use("/", userRoutes);
app.use("/upload", uploadRoute);

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: "Something broke!",
    error: err.message,
  });
});

//  run server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
  console.log(`Static files available at http://localhost:${PORT}/upload/`);
});

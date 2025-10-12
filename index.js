import express from "express";
import dotenv from "dotenv";
import courseRouter from "./routes/courseroute.js";

dotenv.config();
const app = express();
app.use(express.json());

// pasang router
app.use("/course", courseRouter);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port 8080!");
});

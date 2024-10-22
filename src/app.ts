import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
import mongoose from "mongoose";
import leadRoutes from "./routes/lead";
import campaignRoutes from "./routes/campaign";
import reportRoutes from "./routes/report";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger-spec";

const app: Application = express();
app.use(express.json());

const res = mongoose.connect(process.env.DB_URL!, {
  dbName: "ezyMetrics",
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/leads", leadRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/reports", reportRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port 5000 link :http://localhost:${process.env.PORT}`
  );
});

res
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

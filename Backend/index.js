const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: ".env" });
const appConfig = require("./Config/app.config");
const connectDB = require("./db/connect");
const errorHandler = require("./Middlewares/error.middleware");
const AppError = require("./Utils/appError");

const authRoutes = require("./Routes/auth.route");
const adminRoutes = require("./Routes/admin.route");
const userRoutes = require("./Routes/user.route");
const agentRoutes = require("./Routes/agent.route");
const kycRoutes = require("./Routes/kyc.route");

const PORT = appConfig.port;
app.use(
  cors({
    origin: appConfig.clientUrl,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
connectDB();
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy" });
});
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/kyc", kycRoutes);

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});

import express from "express";
import alertRoutes from "./Routes/AlertRoutes.js";
import { connectDB } from "./Config/DbCon.js";
import envConfig from "./Config/envConfig.js";

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", alertRoutes);

//route for health check
app.get('/', (req, res) => {
    res.status(200).json({
        code: 200,
        success: true,
        status: "Online",
        data: { message: "Home MQTT Server is online" },
    });
});

// Start Express Server
app.listen(envConfig.sub_port, () => {
    console.log(`🚀 Server is running on port ${envConfig.sub_port}`);
});
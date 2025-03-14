import { saveAlertToDB } from "../Service/mongoService.js";
import { connectMQTT } from "../Config/mqttConfig.js";
import envConfig from "../Config/envConfig.js";

const clientId = "home_pubsub_" + Math.random().toString(16).substring(2, 8);
const { topic, qos } = envConfig.mqtt;

// Connect to MQTT Broker
const client = connectMQTT({ clientId });

// Subscribe to MQTT Topic
// client.subscribe(topic, { qos }, (error) => {
//     if (error) {
//         console.error("❌ Subscribe error:", error);
//     } else {
//         console.log(`✅ Subscribed to topic '${topic}'`);
//     }
// });

// Handle Incoming MQTT Messages
// client.on("message", (receivedTopic, message) => {
//     console.log(`📩 Received MQTT Message on ${receivedTopic}: ${message.toString()}`);
// });

// Handle Alert Publishing
export const publishAlert = async (req, res) => {
    try {
        const { patientId, caregiverEmail, alertType, message,alert,mobile } = req.body;

        if (!patientId || !caregiverEmail || !alertType || !message || !alert || !mobile) {
            return res.status(400).json({
                code: 400,
                success: false,
                status: "Bad Request",
                data: { message: "Missing required fields in request body" },
            });
        }

        console.log(`🚨 Alert Received: ${alertType} for Patient ${patientId}`);

        // Save Alert to MongoDB
        await saveAlertToDB({ patientId, caregiverEmail, alertType, message,mobile,alert });

        // Publish Alert to MQTT Broker
        client.publish(topic, JSON.stringify({ patientId,caregiverEmail, alertType, message,alert,mobile }), { qos }, (error) => {
            if (error) {
                console.error("❌ MQTT Publish Error:", error);
                return res.status(500).json({
                    code: 500,
                    success: false,
                    status: "Internal Server Error",
                    data: { message: "Failed to publish MQTT message" },
                });
            }
            console.log(`📡 Alert Published to MQTT: ${topic}`);
            res.status(200).json({
                code: 200,
                success: true,
                status: "OK",
                data: { message: "Alert successfully published to MQTT" },
            });
        });

    } catch (error) {
        console.error("❌ Error handling alert request:", error);
        res.status(500).json({
            code: 500,
            success: false,
            status: "Internal Server Error",
            data: { message: "An error occurred processing the request" },
        });
    }
};

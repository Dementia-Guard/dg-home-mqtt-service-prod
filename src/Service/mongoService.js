import { Alert } from "../Models/Alert.js";

export const saveAlertToDB = async (alertData) => {
    try {
        const alert = new Alert(alertData);
        await alert.save();
        console.log("✅ Alert saved to MongoDB");
    } catch (error) {
        console.error("❌ Error saving alert:", error);
    }
};

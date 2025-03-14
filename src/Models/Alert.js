import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
    {
        patientId: { type: String, required: true },
        caregiverEmail: { type: String, required: true },
        mobile: { type: String, required: true },
        alertType: { type: String, required: true },
        message: { type: String, required: true },
        alert: { type: Boolean, default:true },
    },
    {
        versionKey: '__v',
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

export const Alert = mongoose.model("Alert", alertSchema);
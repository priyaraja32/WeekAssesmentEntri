import mongoose from "mongoose"

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  status: { type: String, enum: ["Active", "Lead", "Inactive"], default: "Lead" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true })

export default mongoose.model("Customer", customerSchema)
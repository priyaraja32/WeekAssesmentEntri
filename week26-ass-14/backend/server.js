import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"

dotenv.config()

const app = express()

connectDB()
app.use(cors({
  origin: ["https://api-crm-assesment.onrender.com", "https://crm-assesment.onrender.com"

  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/customers", customerRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Nexus CRM API Running" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server running on https://api-crm-assesment.onrender.com:" + PORT)
})
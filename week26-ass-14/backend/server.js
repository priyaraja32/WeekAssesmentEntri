import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"

dotenv.config()

const app = express()


const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://crm-assesment-ebon.vercel.app',
    'https://crm-assesment-on.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

app.use(express.json())

//  Routes
app.use("/api/auth", authRoutes)
app.use("/api/customers", customerRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Nexus CRM API Running" })
})

const PORT = process.env.PORT || 5000

//  DB connect 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("MongoDB Connected")
    console.log(" Server running on http://localhost:" + PORT)
  })
}).catch((err) => {
  console.error(" MongoDB Error:", err.message)
  process.exit(1)
})
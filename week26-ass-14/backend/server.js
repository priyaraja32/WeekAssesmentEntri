import { setServers, setDefaultResultOrder } from "dns"  // ✅ Named imports, no variable clash
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"

dotenv.config()

// DNS fix for MongoDB SRV lookup
setServers(["8.8.8.8", "1.1.1.1"])
setDefaultResultOrder("ipv4first")

connectDB()

const app = express()

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://crm-assesment-ebon.vercel.app',
    'https://crm-assesment-on.vercel.app',
    'https://week-assesment-entri.vercel.app',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))

app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/customers", customerRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Nexus CRM API Running" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT)
})
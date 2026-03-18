import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sendResponse from "../utils/sendResponse.js"

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return sendResponse(res, 400, false, "Email already registered")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ name, email, password: hashedPassword })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    )

    sendResponse(res, 201, true, "Registration successful", {
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })

  } catch (error) {
    sendResponse(res, 500, false, error.message)
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return sendResponse(res, 404, false, "User not found")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return sendResponse(res, 401, false, "Invalid credentials")
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    )

    sendResponse(res, 200, true, "Login successful", {
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })

  } catch (error) {
    sendResponse(res, 500, false, error.message)
  }
}
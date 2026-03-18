import Customer from "../models/Customer.js"
import sendResponse from "../utils/sendResponse.js"

export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({ ...req.body, user: req.user.id })
    sendResponse(res, 201, true, "Customer created", customer)
  } catch (error) {
    sendResponse(res, 500, false, error.message)
  }
}

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user.id }).sort({ createdAt: -1 })
    sendResponse(res, 200, true, "Customers fetched", customers)
  } catch (error) {
    sendResponse(res, 500, false, error.message)
  }
}

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )
    if (!customer) return sendResponse(res, 404, false, "Customer not found")
    sendResponse(res, 200, true, "Customer updated", customer)
  } catch (error) {
    sendResponse(res, 500, false, error.message)
  }
}

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    if (!customer) return sendResponse(res, 404, false, "Customer not found")
    sendResponse(res, 200, true, "Customer deleted")
  } catch (error) {
    sendResponse(res, 500, false, error.message)
  }
}
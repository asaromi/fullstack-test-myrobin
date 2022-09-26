const { debug, jwtSecret } = require("../config")

exports.successResponse = (res) => (code, data) => {
  return res.status(code || 200).json({
    success: true,
    data,
  })
}

exports.errorResponse = (res) => (code, error) => {
  if (debug) console.error(error)
  return res.status(error?.code || code).json({
    success: false,
    message: error?.message || "Server Error",
  })
}
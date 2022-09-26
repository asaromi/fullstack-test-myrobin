const { randomBytes, createCipheriv, createDecipheriv } = require("crypto")
const { VUE_APP_DEBUG: DEBUG, VUE_APP_JWT_SECRET: SECRET } = process.env
const [key, alg] = SECRET.split("@")

exports.encrypt = (text) => {
  try {
    console.log(key, alg)
    const iv = randomBytes(16)

    const cipher = createCipheriv(alg, key, iv)
    let encryptedData = cipher.update(text, "utf-8", "hex")
    encryptedData += cipher.final("hex")

    const base64 = Buffer.from(iv, "binary").toString("base64")
    return {
      iv: base64,
      encryptedData,
    }
  } catch (err) {
    if (DEBUG) console.error(err)
    return
  }
}

exports.decrypt = (text) => {
  try {
    const origionalData = Buffer.from(text.iv, "base64")

    const decipher = createDecipheriv(alg, key, origionalData)
    let decryptedData = decipher.update(text.encryptedData, "hex", "utf-8")
    decryptedData += decipher.final("utf-8")
    return decryptedData
  } catch (err) {
    if (DEBUG) console.error(err)
    return
  }
}

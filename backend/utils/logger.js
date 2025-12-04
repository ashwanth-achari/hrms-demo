// For now just wrap console; later you can integrate winston or similar

const logInfo = (...args) => console.log("[INFO]", ...args);
const logError = (...args) => console.error("[ERROR]", ...args);

module.exports = { logInfo, logError };

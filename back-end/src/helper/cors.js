module.exports.corsOptions = (origin, callback) => {
  if (process.env.NODE_ENV === "production") {
    if (origin === process.env.CLIENT_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  } else {
    callback(null, true);
  }
};
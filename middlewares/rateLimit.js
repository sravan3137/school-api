const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200, 
  message: {
    error: "Too many requests, try again later"
  }
});

app.use(limiter);
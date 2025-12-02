const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} at ${new Date()}`);
  next();
};

export default logger;

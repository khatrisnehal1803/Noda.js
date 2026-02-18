module.exports = (req, res, next) => {
  const userOtp = req.headers.otp;   
  const correctOtp = "123456";    

  if (!userOtp) {
    return res.status(401).json({ message: "No OTP Provided" });
  }

  if (userOtp !== correctOtp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  next();
};

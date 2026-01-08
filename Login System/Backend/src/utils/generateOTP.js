exports.generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.otpExpiry = () =>
  new Date(Date.now() + 10 * 60 * 1000);

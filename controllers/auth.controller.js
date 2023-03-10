const {
    requestPasswordReset,
    resetPassword,
  } = require("../services/auth.service");

//Reset password request, Send reset Link

const requestPasswordResetController = async (req, res, next) => {
const email = req.body.email;
await requestPasswordReset(email);

const alertMessage = "We have sent a reset password link to your email. Please check your spam folder.";
const alertScript = `alert('${alertMessage}')`;
res.send(`${alertScript}`);
};

// Reset password

const resetPasswordController = async (req, res, next) => {
const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
);
return res.json(resetPasswordService);
};

module.exports = {
  requestPasswordResetController,
  resetPasswordController,
};
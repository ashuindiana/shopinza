const Errorhandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/user");
const sendToken = require("../Utils/jwtToken");
const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary')

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: 'scale'
  })

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Errorhandler("Please enter email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Errorhandler("Invalid email or Password", 401));
  }

  const isPwdMatched = await user.comparePwd(password);

  if (!isPwdMatched) {
    return next(new Errorhandler("Invalid email or Password", 401));
  }

  sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out successfully",
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User not found", 404));
  }

  //Get reset pwd token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      message,
      subject: "Shopinza Password Recovery",
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new Errorhandler(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new Errorhandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new Errorhandler("Password and confirm password do not match", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//Get user Details
exports.getUserdetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPwdMatched = await user.comparePwd(req.body.oldPassword);

  if (!isPwdMatched) {
    return next(new Errorhandler("Incorrect old Password", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("Passwords do not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//Update profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const image_id = user.avatar.public_id
    await cloudinary.v2.uploader.destroy(image_id)
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: 'scale'
    })
    newUser.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  }

  await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({ success: true });
});

//Get All Users-- Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get Single User detail-- Admin
exports.getUserDetailByAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new Errorhandler(`User with ${req.params.id} not found`, 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update User -- Admin
exports.updateUserRoleByAdmin = catchAsyncErrors(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({ success: true });
});

//Delete User -- Admin
exports.deleteUserByAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new Errorhandler(`User with id: ${req.params.id} not found`, 400)
    );
  }

  await user.remove();
  res.status(200).json({ success: true, message: "user deleted successfully" });
});

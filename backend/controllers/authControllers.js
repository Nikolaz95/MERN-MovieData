import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js"
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import { delete_file, upload_file } from "../utils/claudinary.js"

// Register user =>  /api/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password
    });

    sendToken(user, 201, res)

});


// LogIn user =>  /api/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    console.log("Received email:", email);
    console.log("Received password:", password);

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400))
    }

    //fint user in dataBase
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid email & password", 401))
    }

    //check if password is correct
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email & password", 401))
    }

    sendToken(user, 200, res)

})

// LogOut user =>  /api/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        message: "Logged out",
    });
});


// Upload user avatar =>  /api/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req, res, next) => {
    const avatarResponse = await upload_file(req.body.avatar, "MovieTvShows/avatars");

    //remove previous avatar picture

    if (req?.user?.avatar?.url) {
        await delete_file(req?.user?.avatar?.public_id);
    }

    const user = await User.findByIdAndUpdate(req?.user?._id, {
        avatar: avatarResponse,
    });

    res.status(200).json({
        user
    });
});

// Get current user profile  =>  /api/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req?.user?._id);

    res.status(200).json({
        user,
    });
});

// update password =>  /api/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req?.user?._id).select("+password");
    //check the previous user password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400))
    }

    user.password = req.body.password;
    user.save()

    res.status(200).json({
        success: true,
    });
});


// update User Profile =>  /api/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
    });

    res.status(200).json({
        user,
    });
});


// Delete own account =>  /api/me/deleteAccount
export const deleteOwnAccount = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Remove avatar from cloudinary if it exists
    if (user?.avatar?.public_id) {
        await delete_file(user.avatar.public_id);
    }

    // Remove the token cookie
    res.clearCookie("token");

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "Your account has been deleted successfully."
    });
});


// Get all users - admin   =>  /api/admin/users
export const allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        users,
    });
});

// Get  user detail - admin   =>  /api/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        user,
    });
});


// update User Details - admin  =>  /api/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
    });

    res.status(200).json({
        user,
    });
});

// Delete  user  - admin   =>  /api/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(
            new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
    }


    //remove user avatar from cloudinary
    if (user?.avatar?.public_id) {
        await delete_file(user?.avatar?.public_id);
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
    });
});


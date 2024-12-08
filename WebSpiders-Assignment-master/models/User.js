const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    register_at: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
